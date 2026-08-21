# Fiche 304 — Facteurs : classification discrète, `tapply()` et tableaux irréguliers

|  |  |
|---|---|
| **Matière** | Code · Langage R |
| **Cours source** | R Core Team, *An Introduction to R* 4.6.1 — chapitre 4 « Ordered and unordered factors » (§4.1 un exemple, §4.2 `tapply()` et tableaux irréguliers, §4.3 facteurs ordonnés) |
| **Sources d'appoint** | *R Language Definition* 4.6.1, §2.3.1 « Factors » ; §3.4.1 « Indexing by vectors » (le piège de l'index facteur) |
| **Difficulté** | Intermédiaire — court chapitre, mais deux pièges majeurs |
| **Temps d'étude estimé** | 1 h |
| **Prérequis** | Fiches 301 à 303 (vecteurs, indexation, attributs) |
| **Concepts clés** | classification discrète, `factor()`, attribut **`levels`**, classe `"factor"`, ordre **alphabétique** des niveaux, `levels()`, affichage particulier, `tapply()`, coercition automatique par `as.factor()`, **tableau irrégulier** (*ragged array*), `ordered()`, classe `c("ordered", "factor")`, `contrasts`, implémentation par entiers |
| **À retenir en priorité** | **Les niveaux sont alphabétiques par défaut** · **`tapply()` = « appliquer par groupe »** · **`sd()` n'est pas l'erreur type** · **ne jamais s'appuyer sur le codage entier**. |

## 🎯 Vue d'ensemble

```
UN FACTEUR      un vecteur qui specifie une CLASSIFICATION DISCRETE (un groupage)
                des composantes d'autres vecteurs DE MEME LONGUEUR

CE QU'IL EST    un vecteur d'ENTIERS + attribut levels + class "factor"
                (mais NE PAS s'appuyer la-dessus : detail d'implementation)

CREER           statef <- factor(state)
LES NIVEAUX     levels(statef)   -> ordre ALPHABETIQUE par defaut
                                    ou celui donne explicitement a factor()

L'OUTIL         tapply(donnees, facteur, fonction)
                « appliquer la fonction a CHAQUE GROUPE defini par les niveaux »
                resultat : un vecteur de la LONGUEUR DE levels, etiquete par eux

TABLEAU IRREGULIER   vecteur + facteur d'etiquetage, sous-classes de tailles
                     POSSIBLEMENT DIFFERENTES  (« ragged array »)

ORDONNE         ordered()  -- identique a factor() SAUF
                  * l'affichage montre l'ordre des niveaux
                  * les CONTRASTES engendres pour les modeles lineaires different

PIEGES          x[facteur]  =  x[as.integer(facteur)]   les NIVEAUX NE SERVENT PAS
                sd()  N'EST PAS  l'erreur type
```

**Le problème posé.** *« A factor is **a vector object used to specify a discrete classification (grouping) of the components of other vectors of the same length**. »* (§4.1) Un facteur ne porte pas les données : il porte **l'appartenance** des données à des groupes. C'est un objet **relationnel** — il n'a de sens que rapporté à un autre vecteur.

<div class="callout" data-kind="intu">

<span class="callout__lab">Intuition — pourquoi ce chapitre paraît mineur et ne l'est pas.</span>

*« While the **"real" application of factors is with model formulae** (see §11.1.1 Contrasts), we here look at a specific example. »* (§4.1) Le cours prévient : ce qu'on voit ici — `tapply()` et des moyennes par groupe — n'est **pas** la raison d'être des facteurs. Leur vraie fonction est de dire à `lm()` et à `aov()` *« cette variable est catégorielle, engendre-lui des indicatrices »* (fiche 313). Le facteur est **le pont entre les données et les modèles**.

</div>

## 🔴 Concept 1 — Créer un facteur, et ce qu'il devient

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition (R Language Definition §2.3.1).</span>

*« Factors are used to describe items that can have **a finite number of values** (gender, social class, etc.). **A factor has a `levels` attribute and class `"factor"`.** Optionally, it may also contain a **`contrasts`** attribute which controls **the parametrisation used when the factor is used in a modeling function**. »*

</div>

**L'exemple qui court dans tout le chapitre (§4.1).** *« Suppose we have a sample of **30 tax accountants from all the states and territories of Australia** and their individual **state of origin** is specified by a character vector of state mnemonics. »*

```
state <- c("tas", "sa",  "qld", "nsw", "nsw", "nt",  "wa",  "wa",
           "qld", "vic", "nsw", "vic", "qld", "qld", "sa",  "tas",
           "sa",  "nt",  "wa",  "vic", "qld", "nsw", "nsw", "wa",
           "sa",  "act", "nsw", "vic", "vic", "act")
```

*« Notice that in the case of **a character vector, "sorted" means sorted in alphabetical order**. »* — la phrase qui explique l'ordre des niveaux au concept 2.

```
statef <- factor(state)
```

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que fait print() (§4.1).</span>

*« The `print()` function handles factors **slightly differently from other objects** »* :

</div>

```
 [1] tas sa  qld nsw nsw nt  wa  wa  qld vic nsw vic qld qld sa
[16] tas sa  nt  wa  vic qld nsw nsw wa  sa  act nsw vic vic act
Levels: act nsw nt qld sa tas vic wa
```

**Trois différences visibles avec un vecteur de caractères** : pas de guillemets ; une ligne **`Levels:`** ; et cette ligne montre **tous** les niveaux, y compris ceux qui n'apparaîtraient pas dans les données affichées.

*« To find out the levels of a factor **the function `levels()` can be used**. »*

```
levels(statef)
# [1] "act" "nsw" "nt"  "qld" "sa"  "tas" "vic" "wa"
```

⚠️ *(Note 1 du §4.1)* *« Readers should note that **there are eight states and territories in Australia** »* — l'Australian Capital Territory, la Nouvelle-Galles du Sud, le Territoire du Nord, le Queensland, l'Australie-Méridionale, la Tasmanie, le Victoria et l'Australie-Occidentale. Le facteur a donc **exactement 8 niveaux pour 30 observations** : c'est bien une classification, pas une identification.

### 1.1 Sous le capot

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que le manuel dit — et ce qu'il interdit d'en faire (§2.3.1).</span>

⚠️ *« Factors are **currently implemented** using **an integer array to specify the actual levels** and **a second array of names that are mapped to the integers**. **Rather unfortunately users often make use of the implementation in order to make some calculations easier. This, however, is an implementation issue and is not guaranteed to hold in all implementations of R.** »*

</div>

Un facteur **est donc**, aujourd'hui, un vecteur d'entiers muni de `levels` et de `class`. On peut le vérifier :

```
unclass(statef)   # montre les codes entiers et l'attribut levels
```

**Mais le manuel demande explicitement de ne pas s'appuyer là-dessus.** La distinction est importante : `unclass()` sert à **comprendre** (fiche 303), pas à **calculer**.

> ⚠️ **Le piège qui découle directement de cette implémentation** (*R Language Definition* §3.4.1, fiche 302). *« **Factor.** The result [de `x[i]` avec `i` facteur] is **identical to `x[as.integer(i)]`**. **The factor levels are never used.** If so desired, use **`x[as.character(i)]`** »*.
>
> Indexer par un facteur indexe donc **par des positions**, que rien à l'écran ne laisse deviner — puisque le facteur **s'affiche avec ses étiquettes**. Le résultat a la bonne longueur et il est faux.

## 🔴 Concept 2 — L'ordre des niveaux

> **Règle (§4.3).** *« **The levels of factors are stored in alphabetical order**, **or in the order they were specified to `factor` if they were specified explicitly.** »*

C'est une règle en deux temps, et la seconde moitié est ce qui sauve :

```
# ordre par defaut : alphabetique
levels(factor(c("moyen", "fort", "faible")))
# "faible" "fort"   "moyen"        <- alphabetique, donc DENUE DE SENS ici

# ordre impose
levels(factor(c("moyen", "fort", "faible"),
              levels = c("faible", "moyen", "fort")))
# "faible" "moyen"  "fort"         <- l'ordre voulu
```

⚠️ **Pourquoi cela compte au-delà de l'esthétique.** L'ordre des niveaux détermine : l'ordre des colonnes d'un `table()`, l'ordre des boîtes d'un `boxplot`, l'ordre des barres d'un graphique — et surtout **quel niveau sert de référence** dans un modèle linéaire (fiche 313). Le premier niveau est celui auquel tous les autres sont comparés. Le laisser à l'alphabet, c'est laisser l'alphabet choisir la modalité de référence.

## 🔴 Concept 3 — `tapply()` : appliquer une fonction par groupe

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition (§4.2).</span>

*« The function `tapply()` is used to **apply a function** — here `mean()` — **to each group of components of the first argument** — here `incomes` — **defined by the levels of the second component** — here `statef` — **as if they were separate vector structures**. **The result is a structure of the same length as the `levels` attribute of the factor** containing the results. »*

</div>

**Les données de revenus (§4.2)**, *« in suitably large units of money »* :

```
incomes <- c(60, 49, 40, 61, 64, 60, 59, 54, 62, 69, 70, 42, 56,
             61, 61, 61, 58, 51, 48, 65, 49, 49, 41, 48, 52, 46,
             59, 46, 58, 43)

incmeans <- tapply(incomes, statef, mean)
```

*« giving a means vector with the components **labelled by the levels** »* :

|  | act | nsw | nt | qld | sa | tas | vic | wa |
|---|---|---|---|---|---|---|---|---|
| **moyenne** | 44,500 | 57,333 | 55,500 | 53,600 | 55,000 | 60,500 | 56,000 | 52,250 |

<div class="callout" data-kind="intu">

<span class="callout__lab">En clair — le mécanisme, tel que le cours le décrit (§4.2).</span>

*« **The values in the vector are collected into groups corresponding to the distinct entries in the factor. The function is then applied to each of these groups individually. The value is a vector of function results, labelled by the levels attribute of the factor.** »*

Trois temps : **regrouper**, **appliquer**, **étiqueter**. C'est le patron de toute l'analyse par sous-groupes en R.

</div>

⚠️ **Le deuxième argument n'a pas besoin d'être un facteur** (note 2, §4.2) : *« Note that `tapply()` **also works in this case when its second argument is not a factor**, e.g. `tapply(incomes, state)`, and **this is true for quite a few other functions, since arguments are coerced to factors when necessary (using `as.factor()`)**. »* Commode — et dangereux, puisque la coercition silencieuse applique **l'ordre alphabétique** du concept 2.

*« The function `tapply()` **can also be used to handle more complicated indexing of a vector by multiple categories**. For example, we might wish to **split the tax accountants by both state and sex**. »*

<details class="details--riche">
<summary>

**Exercice résolu — refaire à la main la moyenne d'un état, et vérifier le tableau du cours**

</summary>

**Énoncé.** Vérifier, sans `tapply()`, que la moyenne de l'état `qld` vaut bien **53,600**.

*Étape 1 — repérer les positions.* Dans `state`, `"qld"` occupe les positions **3, 9, 13, 14, 21**.

*Étape 2 — extraire les revenus correspondants.* C'est exactement une indexation logique (fiche 302) :

```
incomes[state == "qld"]
# 40 62 56 61 49
```

*Étape 3 — sommer.* $40 + 62 + 56 + 61 + 49 = 268$.

*Étape 4 — diviser par l'effectif.* $268 / 5 = \mathbf{53{,}6}$. conforme au tableau du cours.

*Étape 5 — comprendre ce que `tapply()` a fait de plus.* Rien de mystérieux : il a répété les étapes 2 à 4 **pour chacun des huit niveaux**, puis a **étiqueté** le résultat. La formulation du cours — *« as if they were separate vector structures »* — est littérale.

*Étape 6 — le point qui compte.* La boucle sur les niveaux est **écrite par `tapply()`**, comme la boucle sur les éléments est écrite par la vectorisation (fiche 301). Le patron « regrouper, appliquer, étiqueter » remplace ici la boucle `for` imbriquée que l'on écrirait dans un autre langage.

</details>

### 3.1 L'erreur type — et le piège `sd()`

<div class="callout" data-kind="methode">

<span class="callout__lab">Méthode (§4.2).</span>

*« Suppose further we needed to calculate **the standard errors of the state income means**. To do this we need to **write an R function to calculate the standard error for any given vector**. Since there is a builtin function `var()` to calculate the sample variance, such a function is **a very simple one liner** »* :

</div>

```
stdError <- function(x) sqrt(var(x)/length(x))
```

$$\operatorname{se}(\bar x)=\sqrt{\frac{\operatorname{var}(x)}{n}}=\frac{s}{\sqrt n}$$

> ⚠️ **La mise en garde du cours, en une parenthèse.** *« **Note that R's builtin function `sd()` is something different.** »* (§4.2)
>
> **`sd(x)` est l'écart-type de l'échantillon**, soit $s=\sqrt{\operatorname{var}(x)}$ ; **l'erreur type de la moyenne** est $s/\sqrt n$. Les deux diffèrent d'un facteur $\sqrt n$ — sur `nsw` ($n=6$), d'un facteur $2{,}449$. Confondre les deux, c'est publier un intervalle de confiance **deux fois et demie trop large**.

```
incster <- tapply(incomes, statef, stdError)
```

|  | act | nsw | nt | qld | sa | tas | vic | wa |
|---|---|---|---|---|---|---|---|---|
| **erreur type** | 1,5 | 4,3102 | 4,5 | 4,1061 | 2,7386 | 0,5 | 5,244 | 2,6575 |

<div class="callout" data-kind="intu">

<span class="callout__lab">Contrôle — vérifier une valeur du tableau.</span>

Pour `act`, les deux revenus sont **46** et **43**, de moyenne **44,5**. La variance d'échantillon vaut

$$\operatorname{var}=\frac{(46-44{,}5)^2+(43-44{,}5)^2}{2-1}=\frac{2{,}25+2{,}25}{1}=4{,}5$$

et l'erreur type $\sqrt{4{,}5/2}=\sqrt{2{,}25}=\mathbf{1{,}5}$. Même vérification pour `tas` (60 et 61) : $\operatorname{var}=0{,}5$, $\sqrt{0{,}5/2}=\mathbf{0{,}5}$.

</div>

<details class="details--riche">
<summary>

**Exercice du cours — les limites de confiance à 95 % des revenus moyens par état**

</summary>

> **Énoncé (§4.2, textuel).** *« **As an exercise you may care to find the usual 95 % confidence limits for the state mean incomes.** To do this you could use `tapply()` once more **with the `length()` function to find the sample sizes**, and **the `qt()` function to find the percentage points of the appropriate t-distributions**. (You could also investigate R's facilities for t-tests.) »*
>
> ⚠️ **Le cours ne donne pas de corrigé.** Celui qui suit est **une correction pédagogique** construite à partir des indications qu'il fournit (`tapply`, `length`, `qt`) et de la théorie standard de l'intervalle de Student. Les valeurs numériques sont recalculées à partir des données du chapitre.

*Étape 1 — les effectifs, comme le cours le suggère.*

```
n <- tapply(incomes, statef, length)
```

|  | act | nsw | nt | qld | sa | tas | vic | wa |
|---|---|---|---|---|---|---|---|---|
| **effectif** | 2 | 6 | 2 | 5 | 4 | 2 | 5 | 4 |

Contrôle : $2+6+2+5+4+2+5+4 = \mathbf{30}$, l'effectif total.

*Étape 2 — la formule.* L'intervalle de Student à $1-\alpha$ pour une moyenne, l'écart-type étant estimé, est

$$\bar x \;\pm\; t_{1-\alpha/2,\;n-1}\cdot \frac{s}{\sqrt n}$$

où $s/\sqrt n$ est **exactement** ce que calcule `stdError` de l'étape précédente.

*Étape 3 — les points de pourcentage, avec `qt()` comme indiqué.* Le degré de liberté est $n-1$, **différent pour chaque état** — c'est le point délicat de l'exercice.

```
t <- qt(0.975, df = n - 1)
```

| effectif $n$ | 2 | 4 | 5 | 6 |
|---|---|---|---|---|
| $\nu = n-1$ | 1 | 3 | 4 | 5 |
| $t_{0{,}975,\nu}$ | **12,706** | 3,182 | 2,776 | **2,571** |

*Étape 4 — assembler.*

```
bas  <- incmeans - t * incster
haut <- incmeans + t * incster
```

*Étape 5 — deux résultats à lire attentivement.*

**Pour `nsw`** ($n=6$) : $57{,}333 \pm 2{,}571 \times 4{,}3102 = 57{,}333 \pm 11{,}08$, soit $[\,46{,}25\;;\;68{,}41\,]$.

**Pour `act`** ($n=2$) : $44{,}5 \pm 12{,}706 \times 1{,}5 = 44{,}5 \pm 19{,}06$, soit $[\,25{,}44\;;\;63{,}56\,]$.

*Étape 6 — interpréter.* L'erreur type de `act` (**1,5**) est **la plus petite du tableau**, et son intervalle est pourtant **le plus large**. La raison est le facteur $t$ : avec $\nu=1$ degré de liberté, $t_{0{,}975}$ vaut **12,706** au lieu de 2,571. **Deux observations ne suffisent pas** — l'incertitude sur $s$ lui-même écrase tout.

*Étape 7 — la leçon de méthode.* Une petite erreur type n'est pas un signe de précision si l'effectif est minuscule. **`tapply(incomes, statef, length)` doit toujours accompagner `tapply(incomes, statef, mean)`** : un groupe de taille 2 dans un tableau de moyennes est une valeur qu'on ne peut pas commenter.

*Étape 8 — le renvoi du cours.* *« You could also investigate R's facilities for t-tests »* — `t.test()`, qui produit directement l'intervalle. Voir fiche 312.

</details>

## 🟠 Concept 4 — Le tableau irrégulier (*ragged array*)

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition (§4.2).</span>

*« **The combination of a vector and a labelling factor is an example of what is sometimes called a ragged array**, since **the subclass sizes are possibly irregular**. **When the subclass sizes are all the same the indexing may be done implicitly and much more efficiently**, as we see in the next section. »*

</div>

C'est le concept-charnière du chapitre, et il explique **pourquoi les facteurs existent** :

| Structure | Tailles des sous-classes | Comment on indexe |
|---|---|---|
| **Vecteur + facteur** (tableau irrégulier) | **quelconques** | par les **niveaux** — `tapply()` |
| **Tableau (`array`)** | **toutes égales** | **implicitement**, par les dimensions — fiche 305 |

Un tableau à deux dimensions **impose** que chaque groupe ait le même effectif : c'est ce qui permet le calcul d'adresse direct (`dim`, fiche 303) et donc l'efficacité. Un facteur **lève cette contrainte**, au prix d'une indexation explicite. **Le chapitre 5 est la suite naturelle de cette phrase.**

<div class="callout" data-kind="plus">

<span class="callout__lab">Complément (R Language Definition §2.3.2).</span>

Le data frame reprend la même idée : *« A data frame **can contain a list** that is the same length as the other components. The list can contain elements of **differing lengths**, thereby **providing a data structure for ragged arrays**. **However, as of this writing such arrays are not generally handled correctly.** »* — la mise en garde vaut d'être connue avant d'essayer.

</div>

## 🟠 Concept 5 — Facteurs ordonnés

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition (§4.3).</span>

*« Sometimes **the levels will have a natural ordering that we want to record and want our statistical analysis to make use of**. **The `ordered()` function creates such ordered factors but is otherwise identical to `factor`.** »*

</div>

> **Règle — les deux seules différences (§4.3).** *« **For most purposes the only difference between ordered and unordered factors is that the former are printed showing the ordering of the levels, but the contrasts generated for them in fitting linear models are different.** »*

|  | `factor()` | `ordered()` |
|---|---|---|
| Création | identique | identique |
| **Affichage** | `Levels: a b c` | `Levels: a < b < c` |
| **Contrastes** en modèle linéaire | traitement (indicatrices) | **différents** — polynomiaux |
| Classe (*R Language Definition* §2.3.1) | `"factor"` | **`c("ordered", "factor")`** |

> ⚠️ **Ne pas se laisser tromper par « the only difference ».** La seconde différence est **considérable**. Les contrastes déterminent **la paramétrisation** du modèle : avec un facteur non ordonné, les coefficients comparent chaque niveau **au niveau de référence** ; avec un facteur ordonné, ils décrivent une **tendance** (linéaire, quadratique…) le long des niveaux. Ce ne sont pas les mêmes coefficients, ni les mêmes hypothèses. Voir fiche 313 (§11.1.1 « Contrasts »).

*« A factor may be **purely nominal** or may have **ordered categories**. In the latter case, **it should be defined as such** »* (*R Language Definition* §2.3.1) — le manuel dit **doit**, pas *peut*.

## Comment reconnaître le type d'exercice

| Le signal dans l'énoncé | Ce qu'il faut mobiliser |
|---|---|
| « une variable catégorielle », « des groupes » | un **facteur** — `factor()` |
| « la moyenne par état », « par catégorie » | **`tapply(donnees, facteur, fonction)`** |
| « les effectifs par groupe » | `tapply(..., length)` — ou `table()` |
| « mes barres sont dans le mauvais ordre » | les niveaux sont **alphabétiques** → argument `levels =` |
| « quel niveau sert de référence ? » | **le premier** — donc celui que l'alphabet a choisi |
| « faible / moyen / fort » | des catégories **ordonnées** → **`ordered()`** |
| « les coefficients de mon modèle sont bizarres » | facteur **ordonné** → **contrastes polynomiaux** |
| « l'erreur type de la moyenne » | $s/\sqrt n$ — **`sqrt(var(x)/length(x))`**, pas `sd()` |
| « un intervalle de confiance par groupe » | `tapply(..., length)` + **`qt(0.975, n-1)`** |
| « des groupes de tailles inégales » | un **tableau irrégulier** — vecteur + facteur |
| « des groupes de tailles égales » | un **tableau** (`array`) — indexation implicite, fiche 305 |
| « croiser deux variables catégorielles » | `tapply()` accepte **plusieurs** facteurs |
| « mon sous-ensemble est faux et de bonne longueur » | **indexation par un facteur** → `as.character()` |

## Comment résoudre ce type d'exercice

**Protocole « analyser par groupes » — 5 étapes.**

1. **Construire le facteur** — et **fixer l'ordre des niveaux** si l'alphabet ne convient pas.
2. **`tapply(x, f, length)`** d'abord : connaître **les effectifs** avant de commenter les moyennes.
3. **`tapply(x, f, mean)`**, ou toute autre statistique.
4. Pour la dispersion, écrire **la fonction dont on a besoin** — le cours montre qu'un one-liner suffit — et se souvenir que **`sd()` n'est pas l'erreur type**.
5. **Vérifier que le résultat a autant d'éléments que de niveaux** : *« a structure of the same length as the `levels` attribute »*.

**Protocole « choisir entre `factor` et `ordered` » — 3 étapes.**

1. Les catégories ont-elles **un ordre naturel** ? Non → `factor()`.
2. Oui, et cet ordre doit-il **entrer dans l'analyse** ? Oui → `ordered()`, en donnant `levels =` **dans le bon ordre**.
3. Vérifier l'affichage : `Levels: a < b < c` confirme l'ordre enregistré.

**Protocole « intervalle de confiance par groupe » — 4 étapes.**

1. `n <- tapply(x, f, length)` — **les degrés de liberté diffèrent d'un groupe à l'autre**.
2. `se <- tapply(x, f, function(v) sqrt(var(v)/length(v)))`.
3. `t <- qt(0.975, df = n - 1)` — **vectorisé sur `n`** (fiche 301).
4. `moyenne ± t * se`, puis **relire les groupes de petit effectif** : $t_{0{,}975,1}=12{,}7$.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Laisser l'ordre alphabétique des niveaux | *« or in the order they were **specified to `factor`** »* → argument `levels =` |
| Croire que l'ordre des niveaux n'est qu'esthétique | il fixe **la modalité de référence** d'un modèle |
| Utiliser `sd()` comme erreur type | l'erreur type est **$s/\sqrt n$** |
| Commenter des moyennes sans les effectifs | `tapply(..., length)` **d'abord** |
| Croire une petite erreur type synonyme de précision | avec $n=2$, $t_{0{,}975}=\mathbf{12{,}7}$ |
| Indexer par un facteur | c'est **`x[as.integer(f)]`** → `x[as.character(f)]` |
| Calculer sur les codes entiers d'un facteur | *« an **implementation issue** … **not guaranteed** »* |
| Convertir un facteur numérique par `as.numeric()` | cela rend **les codes**, pas les étiquettes |
| Croire `ordered()` purement cosmétique | il change **les contrastes** du modèle |
| Oublier `levels =` avec `ordered()` | sans lui, l'ordre reste **alphabétique** |
| Passer un vecteur de caractères à `tapply()` sans y penser | il est **coercé** par `as.factor()` — donc **ordre alphabétique** |
| Attendre d'un tableau irrégulier l'efficacité d'un `array` | *« when the subclass sizes are all the same the indexing may be done **implicitly and much more efficiently** »* |
| Confondre le nombre de niveaux et le nombre d'observations | 8 niveaux, **30** observations |

## 📌 Ultimate Review

**Définition.** *« A factor is **a vector object used to specify a discrete classification (grouping) of the components of other vectors of the same length**. »* Il porte **l'appartenance**, pas les données.

**Sa vraie fonction.** *« The **"real" application of factors is with model formulae** »* — les contrastes, fiche 313. `tapply()` n'en est qu'une illustration.

**Structure.** Attribut **`levels`** + classe **`"factor"`** (+ **`contrasts`** en option). Implémenté par **un tableau d'entiers** et un tableau de noms — *« an implementation issue and **is not guaranteed** »*.

**Création et affichage.** `factor(x)` · `levels(f)` pour lire les niveaux · `print()` traite les facteurs **différemment** : pas de guillemets, et une ligne **`Levels:`** listant **tous** les niveaux.

**L'ordre des niveaux.** *« stored in **alphabetical order**, or **in the order they were specified to `factor` if they were specified explicitly** »*. Pour les caractères, *« "sorted" means sorted in **alphabetical order** »*. L'ordre commande l'affichage, les tableaux, les graphiques — **et la modalité de référence** d'un modèle.

**`tapply()`.** *« apply a function … **to each group of components of the first argument, defined by the levels of the second**, **as if they were separate vector structures** »*. Résultat : *« a structure of **the same length as the `levels` attribute** »*, **étiqueté par les niveaux**. Mécanisme en trois temps : **regrouper, appliquer, étiqueter**. Le deuxième argument **n'a pas besoin d'être un facteur** — il est coercé par **`as.factor()`**. Accepte **plusieurs catégories**.

**Erreur type.** `stdError <- function(x) sqrt(var(x)/length(x))` — *« **R's builtin function `sd()` is something different** »*. Écart d'un facteur $\sqrt n$.

**Les chiffres du chapitre.** **30** comptables, **8** états et territoires · moyennes : act **44,500** · nsw **57,333** · nt **55,500** · qld **53,600** · sa **55,000** · tas **60,500** · vic **56,000** · wa **52,250** · erreurs types : **1,5** · 4,3102 · **4,5** · 4,1061 · 2,7386 · **0,5** · 5,244 · 2,6575 · effectifs : 2, 6, 2, 5, 4, 2, 5, 4.

**Tableau irrégulier.** *« The combination of **a vector and a labelling factor** … since **the subclass sizes are possibly irregular** »*. Quand les sous-classes sont **de même taille**, *« the indexing may be done **implicitly and much more efficiently** »* — c'est le tableau (fiche 305).

**Facteurs ordonnés.** **`ordered()`** — *« otherwise **identical** to `factor` »*. Deux différences : **l'affichage montre l'ordre** (`a < b < c`) et **les contrastes engendrés en modèle linéaire diffèrent**. Classe **`c("ordered", "factor")`**. *« In the latter case, **it should be defined as such** »*.

## 🧠 Active Recall

<details><summary>Qu'est-ce qu'un facteur, exactement ? Et quelle est sa « vraie » raison d'être selon le cours ?</summary>

*« A factor is **a vector object used to specify a discrete classification (grouping) of the components of other vectors of the same length**. »* (§4.1)

Deux points dans cette définition : il **classe** (il ne mesure pas), et il classe **les composantes d'autres vecteurs de même longueur** — c'est un objet **relationnel**, sans intérêt seul.

**Sa vraie fonction** : *« While the **"real" application of factors is with model formulae** (see Contrasts), **we here look at a specific example**. »* Le chapitre 4 est une illustration ; les facteurs existent pour dire aux fonctions de modélisation qu'une variable est catégorielle.

</details>

<details><summary>Comment sont ordonnés les niveaux d'un facteur, et pourquoi est-ce important ?</summary>

*« **The levels of factors are stored in alphabetical order**, **or in the order they were specified to `factor` if they were specified explicitly.** »* (§4.3)

**Pourquoi cela compte** : l'ordre des niveaux détermine l'ordre d'un `table()`, l'ordre des boîtes d'un `boxplot`, l'ordre des barres — et surtout **quel niveau sert de référence** dans un modèle linéaire. Le premier niveau est celui auquel les autres sont comparés.

Sur des catégories comme `faible/moyen/fort`, l'ordre alphabétique donne `faible, fort, moyen` — **dénué de sens**. La correction est l'argument **`levels =`**.

</details>

<details class="details--riche">
<summary>

Expliquer ce que fait `tapply(incomes, statef, mean)`, en reprenant les mots du cours.

</summary>

*« The function `tapply()` is used to **apply a function**, here `mean()`, **to each group of components of the first argument**, here `incomes`, **defined by the levels of the second component**, here `statef`, **as if they were separate vector structures**. **The result is a structure of the same length as the `levels` attribute of the factor** containing the results. »* (§4.2)

Et la description du mécanisme : *« **The values in the vector are collected into groups** corresponding to the distinct entries in the factor. **The function is then applied to each of these groups individually.** **The value is a vector of function results, labelled by the levels attribute of the factor.** »*

Trois temps : **regrouper, appliquer, étiqueter**.

</details>

<details class="details--riche">
<summary>

Le deuxième argument de `tapply()` doit-il être un facteur ?

</summary>

Non. Note 2 du §4.2 : *« Note that `tapply()` **also works in this case when its second argument is not a factor**, e.g. `tapply(incomes, state)`, and **this is true for quite a few other functions, since arguments are coerced to factors when necessary (using `as.factor()`)**. »*

⚠️ **Mais c'est un confort risqué** : la coercition silencieuse crée un facteur **aux niveaux alphabétiques**. Si l'ordre importe — et il importe dès qu'un graphique ou un modèle suit — il faut construire le facteur **explicitement**, avec `levels =`.

</details>

<details class="details--riche">
<summary>

Pourquoi le cours écrit-il que `sd()` « is something different » ?

</summary>

Parce que la fonction demandée est **l'erreur type de la moyenne** :

```
stdError <- function(x) sqrt(var(x)/length(x))
```

$$\operatorname{se}(\bar x)=\frac{s}{\sqrt n} \qquad\text{alors que}\qquad \texttt{sd}(x)=s$$

Les deux diffèrent d'un facteur **$\sqrt n$**. Sur `nsw` ($n=6$), `sd` vaudrait $4{,}3102\times\sqrt 6 = 10{,}56$ contre une erreur type de **4,3102**. Confondre les deux produit un intervalle de confiance **2,45 fois trop large**.

C'est aussi pourquoi le cours fait **écrire** la fonction : elle n'existe pas en standard.

</details>

<details class="details--riche">
<summary>

Vérifier à la main l'erreur type de l'état `act`.

</summary>

Les deux revenus de `act` sont **46** et **43** (positions 26 et 30), de moyenne **44,5**.

$$\operatorname{var}=\frac{(46-44{,}5)^2+(43-44{,}5)^2}{2-1}=\frac{2{,}25+2{,}25}{1}=4{,}5$$

$$\operatorname{se}=\sqrt{\frac{4{,}5}{2}}=\sqrt{2{,}25}=\mathbf{1{,}5}$$

conforme au tableau du cours. Même contrôle pour `tas` (60 et 61) : $\operatorname{var}=0{,}5$ et $\operatorname{se}=\sqrt{0{,}25}=\mathbf{0{,}5}$.

</details>

<details><summary>Pourquoi l'état ayant la plus petite erreur type a-t-il l'intervalle de confiance le plus large ?</summary>

`act` a l'erreur type **la plus petite du tableau** (1,5) et l'intervalle **le plus large**.

La raison est le **degré de liberté**. L'intervalle est $\bar x \pm t_{0{,}975,\,n-1}\cdot \operatorname{se}$, et pour $n=2$ :

$$t_{0{,}975,\,1}=\mathbf{12{,}706} \qquad\text{contre}\qquad t_{0{,}975,\,5}=2{,}571$$

Donc $44{,}5 \pm 12{,}706 \times 1{,}5 = 44{,}5 \pm 19{,}06$, soit $[\,25{,}44\,;\,63{,}56\,]$ — bien plus large que $[\,46{,}25\,;\,68{,}41\,]$ pour `nsw`.

**La leçon** : deux observations ne suffisent pas. **`tapply(x, f, length)` doit toujours accompagner `tapply(x, f, mean)`.**

*(Correction pédagogique : le cours pose cet exercice au §4.2 sans en donner la solution.)*

</details>

<details><summary>Qu'est-ce qu'un tableau irrégulier, et qu'est-ce qui le distingue d'un tableau ordinaire ?</summary>

*« **The combination of a vector and a labelling factor is an example of what is sometimes called a ragged array**, since **the subclass sizes are possibly irregular**. **When the subclass sizes are all the same the indexing may be done implicitly and much more efficiently**, as we see in the next section. »* (§4.2)

|  | Tailles des sous-classes | Indexation |
|---|---|---|
| Vecteur + facteur | **quelconques** | **explicite**, par les niveaux |
| Tableau (`array`) | **toutes égales** | **implicite**, par les dimensions |

Un `array` **impose** l'égalité des effectifs, ce qui permet un calcul d'adresse direct via `dim` (fiche 303) — d'où l'efficacité. Le facteur **lève cette contrainte**, au prix d'une indexation explicite.

</details>

<details class="details--riche">
<summary>

Quelles sont les différences entre `factor()` et `ordered()` ?

</summary>

*« **The `ordered()` function creates such ordered factors but is otherwise identical to `factor`.** For most purposes **the only difference** between ordered and unordered factors is that **the former are printed showing the ordering of the levels**, but **the contrasts generated for them in fitting linear models are different**. »* (§4.3)

1. **L'affichage** : `Levels: a < b < c` au lieu de `Levels: a b c`.
2. **Les contrastes** en modèle linéaire — ce qui est **tout sauf mineur** : avec un facteur non ordonné, les coefficients comparent chaque niveau au **niveau de référence** ; avec un facteur ordonné, ils décrivent une **tendance** le long des niveaux.

Et la classe diffère : **`c("ordered", "factor")`** (*R Language Definition* §2.3.1), qui ajoute *« it **should** be defined as such »* quand l'ordre existe.

</details>

<details><summary>Que se passe-t-il si on indexe un vecteur par un facteur ?</summary>

*« **Factor.** The result is **identical to `x[as.integer(i)]`**. **The factor levels are never used.** If so desired, use **`x[as.character(i)]`** or a similar construction. »* (*R Language Definition* §3.4.1)

C'est le piège le plus vicieux du chapitre : le facteur **s'affiche avec ses étiquettes** mais **vaut ses codes entiers**. On indexe donc **par des positions 1, 2, 3…** que rien à l'écran ne laisse deviner. Le résultat a **la bonne longueur** et il est **faux**.

Le remède est **`as.character()`**.

</details>

<details><summary>Peut-on s'appuyer sur le fait qu'un facteur est un vecteur d'entiers ?</summary>

Non, et le manuel est explicite : *« Factors are **currently implemented** using an integer array to specify the actual levels and a second array of names that are mapped to the integers. **Rather unfortunately users often make use of the implementation in order to make some calculations easier. This, however, is an implementation issue and is not guaranteed to hold in all implementations of R.** »* (*R Language Definition* §2.3.1)

`unclass(f)` **montre** les codes — c'est l'outil pédagogique du §3.4 d'*An Introduction to R* — mais montrer n'est pas **calculer avec**.

⚠️ Le corollaire pratique le plus coûteux : sur un facteur dont les étiquettes sont des nombres, **`as.numeric(f)` rend les codes, pas les valeurs**. Il faut `as.numeric(as.character(f))`.

</details>

<details class="details--riche">
<summary>

Combien y a-t-il de niveaux dans `statef`, et pourquoi le cours le précise-t-il en note ?

</summary>

**Huit** — `act`, `nsw`, `nt`, `qld`, `sa`, `tas`, `vic`, `wa` — pour **30** observations.

Le cours ajoute en note 1 : *« Readers should note that **there are eight states and territories in Australia** »*. La précision sert à confirmer que **tous** les niveaux possibles sont représentés : le facteur n'a pas de niveau vide, et l'échantillon couvre l'ensemble du territoire.

Elle rappelle surtout la distinction **niveaux / observations** : un facteur classe **beaucoup** d'observations dans **peu** de catégories. Si les deux nombres étaient proches, ce ne serait pas une classification mais une identification — et `tapply()` n'aurait aucun sens.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Qu'est-ce qu'un facteur ? | Un vecteur qui **classe** les composantes d'autres vecteurs **de même longueur** |
| Sa « vraie » application selon le cours ? | Les **formules de modèle** — les contrastes |
| Ses deux attributs obligatoires ? | **`levels`** et **`class = "factor"`** |
| Un attribut optionnel ? | **`contrasts`** |
| Comment le créer ? | **`factor(x)`** |
| Comment lire ses niveaux ? | **`levels(f)`** |
| Comment `print()` traite-t-il un facteur ? | **Sans guillemets**, avec une ligne **`Levels:`** |
| L'ordre par défaut des niveaux ? | **Alphabétique** |
| Comment l'imposer ? | L'argument **`levels =`** de `factor()` |
| Pourquoi cet ordre compte-t-il ? | Il fixe la **modalité de référence** d'un modèle |
| Pour un vecteur de caractères, « trié » signifie ? | **Par ordre alphabétique** |
| Combien de niveaux dans l'exemple ? | **8** états et territoires |
| Pour combien d'observations ? | **30** comptables |
| À quoi sert `tapply()` ? | **Appliquer une fonction à chaque groupe** défini par les niveaux |
| Ses trois arguments dans l'exemple ? | `incomes`, `statef`, `mean` |
| Longueur du résultat ? | Celle de **l'attribut `levels`** |
| Comment est-il étiqueté ? | **Par les niveaux** |
| Les trois temps du mécanisme ? | **Regrouper**, **appliquer**, **étiqueter** |
| Le 2ᵉ argument doit-il être un facteur ? | **Non** — coercé par **`as.factor()`** |
| Quel risque cela crée-t-il ? | Des niveaux en **ordre alphabétique** |
| `tapply()` accepte-t-il plusieurs catégories ? | **Oui** |
| La formule de l'erreur type ? | **`sqrt(var(x)/length(x))`** |
| Que vaut-elle en notation mathématique ? | $s/\sqrt n$ |
| `sd()` est-elle l'erreur type ? | **Non** — c'est **$s$** |
| Facteur entre les deux ? | **$\sqrt n$** |
| Moyenne de `qld` ? | **53,600** |
| Moyenne de `act` ? | **44,500** |
| Erreur type de `act` ? | **1,5** |
| Erreur type de `tas` ? | **0,5** |
| Erreur type la plus grande ? | **5,244** (`vic`) |
| Effectif de `act` ? | **2** |
| Effectif de `nsw` ? | **6** |
| Quelle fonction pour les effectifs ? | **`tapply(x, f, length)`** |
| Quelle fonction pour les points de Student ? | **`qt()`** |
| Degré de liberté d'un groupe de taille `n` ? | **`n - 1`** |
| $t_{0{,}975}$ pour $\nu=1$ ? | **12,706** |
| $t_{0{,}975}$ pour $\nu=5$ ? | **2,571** |
| Pourquoi `act` a-t-il l'intervalle le plus large ? | **Un seul degré de liberté** |
| La formule de l'intervalle ? | $\bar x \pm t_{1-\alpha/2,\,n-1}\cdot s/\sqrt n$ |
| Autre piste suggérée par le cours ? | Les **facilités de test t** de R |
| Qu'est-ce qu'un tableau irrégulier ? | **Un vecteur + un facteur d'étiquetage** |
| Pourquoi « irrégulier » ? | Les **tailles des sous-classes** peuvent différer |
| Que gagne-t-on si elles sont égales ? | Une indexation **implicite et bien plus efficace** |
| Quelle structure permet cela ? | Le **tableau** (`array`) — fiche 305 |
| Un data frame peut-il porter un tableau irrégulier ? | Oui, via une **liste** — mais *« not generally handled correctly »* |
| Comment créer un facteur ordonné ? | **`ordered()`** |
| En quoi diffère-t-il de `factor()` ? | *« **otherwise identical** »* |
| Sa première différence ? | **L'affichage montre l'ordre** : `a < b < c` |
| Sa seconde différence ? | Les **contrastes** en modèle linéaire |
| Sa classe ? | **`c("ordered", "factor")`** |
| Le manuel dit-il « peut » ou « doit » ? | *« **it should be defined as such** »* |
| Comment est implémenté un facteur ? | Un tableau **d'entiers** + un tableau de **noms** |
| Peut-on s'appuyer dessus ? | **Non** — *« an implementation issue … not guaranteed »* |
| Que rend `x[f]` avec `f` facteur ? | **`x[as.integer(f)]`** — les niveaux ne servent pas |
| Comment indexer par les étiquettes ? | **`x[as.character(f)]`** |
| Que rend `as.numeric(f)` sur des étiquettes numériques ? | **Les codes**, pas les valeurs |
| La bonne conversion ? | **`as.numeric(as.character(f))`** |
| Comment voir un facteur « à nu » ? | **`unclass(f)`** |
