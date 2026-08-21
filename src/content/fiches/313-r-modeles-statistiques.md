# Fiche 313 — Modèles statistiques : formules, `lm`, `aov`, `glm`, `nls`

|  |  |
|---|---|
| **Matière** | Code · Langage R |
| **Cours source** | R Core Team, *An Introduction to R* 4.6.1 — chapitre 11 « Statistical models in R » (§11.1 formules, §11.1.1 contrastes, §11.2 modèles linéaires, §11.3 fonctions extractrices, §11.4 analyse de variance, §11.5 mise à jour, §11.6 modèles linéaires généralisés, §11.7 moindres carrés non linéaires et maximum de vraisemblance, §11.8 modèles non standard) |
| **Difficulté** | Avancé — le chapitre le plus dense du manuel |
| **Temps d'étude estimé** | 2 h 15 |
| **Prérequis** | Fiches 304, 306, 309, 311, 312 (facteurs, data frames, fonctions, S3, tests) |
| **Concepts clés** | **formule** `~`, opérateurs `+ - : %in% * / ^ I()`, **contrastes** de traitement et polynomiaux, `lm()`, argument **`data =`**, **fonctions extractrices**, `anova()`, `aov()` et **strates d'erreur**, **l'ordre des termes**, `update()` et le point, `glm()`, **familles et liens**, LD50, quasi-vraisemblance, `nls()`, `nlm()`, `optim()`, erreurs types par la **hessienne** |
| **À retenir en priorité** | **La sortie est minimale — on interroge par des extractrices** · **`I()` isole** · **les contrastes par défaut de R diffèrent de S** · **l'ordre des termes compte dans une table d'ANOVA** · les **deux formules d'erreur type** selon qu'on minimise une SSE ou une log-vraisemblance. |

## 🎯 Vue d'ensemble

```
LE PATRON       formule + fonction d'ajustement + fonctions EXTRACTRICES
                « the basic output is MINIMAL, and one needs to ASK FOR THE
                  DETAILS by calling extractor functions »

UNE FORMULE     reponse ~ terme1 + terme2 - terme3 ...
                1 = l'ordonnee a l'origine, INCLUSE PAR DEFAUT ; -1 ou +0 l'ote

LES OPERATEURS  +   inclure          -    retirer
                :   produit tensoriel (interaction)
                %in% imbrication      *    A + B + A:B
                /   A + B %in% A      ^n   interactions jusqu'a l'ordre n
                I() ISOLER : a l'interieur, sens ARITHMETIQUE normal

POURQUOI « : » ET NON « . » ?   « the period is A VALID NAME CHARACTER in R »

CONTRASTES      facteur NON ordonne -> k-1 indicatrices, reference = 1er niveau
                facteur ORDONNE     -> k-1 polynomes orthogonaux
                defaut R : c("contr.treatment", "contr.poly")
                defaut S : contr.helmert   <- DIFFERENCE DELIBEREE

AJUSTER         lm(formule, data = df)        aov(formule, data = df)
                glm(formule, family = ..., data = df)
                nls(y ~ SSmicmen(x, Vm, K), df)     nlm(fn, p = ...)

EXTRAIRE        coef  resid  fitted  predict  summary  anova  deviance
                vcov  plot  formula  step  add1  drop1  effects  family

METTRE A JOUR   update(ancien, . ~ . + x6)   -- le POINT = « la partie correspondante »
                update(fm6, sqrt(.) ~ .)     -- transformer la reponse

ATTENTION       « only for ORTHOGONAL EXPERIMENTS will the ORDER OF INCLUSION
                  be INCONSEQUENTIAL »
```

**Le problème posé.** *« **The requirements for fitting statistical models are sufficiently well defined to make it possible to construct general tools that apply in a broad spectrum of problems.** R provides **an interlocking suite of facilities** that make fitting statistical models very simple. **As we mention in the introduction, the basic output is minimal, and one needs to ask for the details by calling extractor functions.** »* (§11)

<div class="callout" data-kind="intu">

<span class="callout__lab">Intuition — la promesse du §1.3 est ici tenue.</span>

La fiche 300 citait : *« R will give **minimal output** and **store the results in a fit object** for subsequent interrogation by further R functions »*. Ce chapitre est le lieu où cette philosophie se déploie : **une formule** décrit le modèle, **une fonction** l'ajuste et rend **un objet**, **des génériques** (fiche 311) l'interrogent.

</div>

⚠️ *« This section **presumes the reader has some familiarity with statistical methodology**, in particular with regression analysis and the analysis of variance. Later we make some **rather more ambitious presumptions**. »* (§11)

## 🔴 Concept 1 — Le modèle de référence et la formule

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition (§11.1).</span>

*« **The template for a statistical model is a linear regression model with independent, homoscedastic errors** »* :

$$y_i=\sum_{j=0}^{p}\beta_j x_{ij}+e_i,\qquad e_i\sim \mathrm{NID}(0,\sigma^2),\quad i=1,\dots,n$$

*« In matrix terms this would be written »*

$$y = X\beta + e$$

*« where **`y` is the response vector**, **`X` is the model matrix or design matrix** and has columns $x_0, x_1, \dots, x_p$, **the determining variables**. **Very often $x_0$ will be a column of ones defining an intercept term.** »*

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition (§11.1).</span>

*« **The operator `~` is used to define a model formula in R.** The form, for an ordinary linear model, is »*

```
response ~ op_1 term_1 op_2 term_2 op_3 term_3 ...
```

- **`response`** : *« a vector or matrix, (or expression evaluating to a vector or matrix) »* ;
- **`op_i`** : *« an operator, **either `+` or `-`**, implying **the inclusion or exclusion of a term** (**the first is optional**) »* ;
- **`term_i`** : *« **a vector or matrix expression, or `1`** ; **a factor** ; or **a formula expression consisting of factors, vectors or matrices connected by formula operators**. »*

⚠️ *« **In all cases each term defines a collection of columns either to be added to or removed from the model matrix. A `1` stands for an intercept column and is by default included in the model matrix unless explicitly removed.** »*

</div>

## 🔴 Concept 2 — Le catalogue des formules

> **Exemples (§11.1).** *« Suppose `y`, `x`, `x0`, `x1`, `x2`, … are **numeric variables**, `X` is **a matrix** and `A`, `B`, `C`, … are **factors**. »*

| Formule | Modèle |
|---|---|
| `y ~ x` · `y ~ 1 + x` | *« Both imply **the same simple linear regression** … The first has **an implicit intercept term**, and the second **an explicit one**. »* |
| `y ~ 0 + x` · `y ~ -1 + x` · `y ~ x - 1` | *« Simple linear regression of `y` on `x` **through the origin** (that is, **without an intercept term**). »* |
| `log(y) ~ x1 + x2` | *« Multiple regression of **the transformed variable** `log(y)` on `x1` and `x2` (with an implicit intercept). »* |
| `y ~ poly(x,2)` · `y ~ 1 + x + I(x^2)` | *« **Polynomial regression of degree 2.** **The first form uses orthogonal polynomials, and the second uses explicit powers, as basis.** »* |
| `y ~ X + poly(x,2)` | *« model matrix consisting of **the matrix `X`** as well as polynomial terms in `x` to degree 2 »* |
| `y ~ A` | *« **Single classification analysis of variance** … with classes determined by `A` »* |
| `y ~ A + x` | *« **Single classification analysis of covariance** … with covariate `x` »* |
| `y ~ A*B` · `y ~ A + B + A:B` · `y ~ B %in% A` · `y ~ A/B` | *« **Two factor non-additive model.** The **first two** specify **the same crossed classification** and the **second two** specify **the same nested classification**. **In abstract terms all four specify the same model subspace.** »* |
| `y ~ (A + B + C)^2` · `y ~ A*B*C - A:B:C` | *« Three factor experiment but with a model containing **main effects and two factor interactions only**. **Both formulae specify the same model.** »* |
| `y ~ A*x` · `y ~ A/x` · `y ~ A/(1 + x) - 1` | *« **Separate simple linear regression models of `y` on `x` within the levels of `A`, with different codings.** **The last form produces explicit estimates of as many different intercepts and slopes as there are levels in `A`.** »* |
| `y ~ A*B + Error(C)` | *« An experiment with **two treatment factors** and **error strata determined by factor `C`** — for example **a split plot experiment**. »* |

<div class="callout" data-kind="intu">

<span class="callout__lab">En clair — la leçon des lignes 8 et 9.</span>

Plusieurs écritures **différentes** décrivent **le même sous-espace de modèle** mais **pas le même codage** : *« with different codings »*. Les prédictions sont identiques ; **les coefficients ne le sont pas**, et leur interprétation non plus. `y ~ A/(1 + x) - 1` est la forme qui donne *« **explicit estimates of as many different intercepts and slopes as there are levels in `A`** »* — c'est-à-dire des coefficients **lisibles directement**, plutôt que des écarts à une référence.

</div>

## 🔴 Concept 3 — La grammaire des opérateurs

<div class="callout" data-kind="formel">

<span class="callout__lab">Notation (§11.1).</span>

*« The formula operators are **similar in effect to the Wilkinson and Rogers notation** used by such programs as **Glim and Genstat**. **One inevitable change is that the operator `.` becomes `:` since the period is a valid name character in R.** »*

*« The notation is summarized below (**based on Chambers & Hastie, 1992, p. 29**) »* :

</div>

| Écriture | Signification |
|---|---|
| `Y ~ M` | *« `Y` is **modeled as** `M`. »* |
| `M_1 + M_2` | *« **Include** `M_1` and `M_2`. »* |
| `M_1 - M_2` | *« Include `M_1` **leaving out terms of** `M_2`. »* |
| `M_1 : M_2` | *« **The tensor product** of `M_1` and `M_2`. **If both terms are factors, then the "subclasses" factor.** »* |
| `M_1 %in% M_2` | *« **Similar to `M_1:M_2`, but with a different coding.** »* |
| `M_1 * M_2` | `M_1 + M_2 + M_1:M_2` |
| `M_1 / M_2` | `M_1 + M_2 %in% M_1` |
| `M^n` | *« **All terms in `M` together with "interactions" up to order `n`** »* |
| `I(M)` | *« **Insulate `M`.** **Inside `M` all operators have their normal arithmetic meaning**, and **that term appears in the model matrix**. »* |

> ⚠️ **La raison du `:` est une leçon de langage.** Dans la notation de Wilkinson et Rogers, l'interaction se note par un point. En R, **le point est un caractère de nom ordinaire** (fiche 300) : `A.B` serait lu comme **un identifiant**, pas comme une interaction. Le changement est donc *« inevitable »* — imposé par la syntaxe des noms, pas par un choix de style.

> **Règle — l'isolation par `I()` (§11.1).** *« Note that **inside the parentheses that usually enclose function arguments all operators have their normal arithmetic meaning**. **The function `I()` is an identity function used to allow terms in model formulae to be defined using arithmetic operators.** »*

**C'est le point le plus piégeux du chapitre.** Dans une formule, `+`, `*`, `^`, `-` **ne sont pas** des opérations arithmétiques :

| Écriture | Ce qu'elle signifie **dans une formule** |
|---|---|
| `y ~ x1 + x2` | deux **termes** — et non la somme `x1 + x2` |
| `y ~ x^2` | `x` **et ses interactions jusqu'à l'ordre 2**, soit `x` seul |
| `y ~ I(x^2)` | le **carré arithmétique** de `x`, comme colonne |
| `y ~ I(x1 + x2)` | la **somme** des deux variables, comme **une seule** colonne |

> ⚠️ **La remarque finale du §11.1, souvent négligée.** *« **Note particularly that the model formulae specify the columns of the model matrix, the specification of the parameters being implicit.** **This is not the case in other contexts, for example in specifying nonlinear models.** »*
>
> Une formule décrit **des colonnes**, pas **des paramètres**. C'est pourquoi le nombre de coefficients d'un modèle à facteurs n'est pas lisible sur la formule — il dépend des **contrastes**.

## 🔴 Concept 4 — Les contrastes : comment un facteur devient des colonnes

> **Cadrage (§11.1.1).** *« **We need at least some idea how the model formulae specify the columns of the model matrix.** This is easy if we have **continuous variables**, as **each provides one column** (and the intercept will provide a column of ones if included). »*

> **Règle — le cas d'un facteur à $k$ niveaux (§11.1.1).** *« **The answer differs for unordered and ordered factors.** »*
>
> - *« For **unordered factors** $k-1$ **columns are generated for the indicators of the second, …, $k$-th levels** of the factor. (**Thus the implicit parameterization is to contrast the response at each level with that at the first.**) »*
> - *« For **ordered factors** the $k-1$ columns are **the orthogonal polynomials on $1,\dots,k$, omitting the constant term**. »*

**Voilà la seconde différence entre `factor()` et `ordered()`** annoncée en fiche 304 — *« the contrasts generated for them in fitting linear models are different »*. Elle est ici explicitée : **indicatrices** contre **polynômes orthogonaux**.

> ⚠️ **Deux complications (§11.1.1).** *« **First, if the intercept is omitted in a model that contains a factor term, the first such term is encoded into $k$ columns giving the indicators for all the levels.** »* *« **Second, the whole behavior can be changed by the `options` setting for `contrasts`.** »*

```
options(contrasts = c("contr.treatment", "contr.poly"))   # le defaut de R
```

> ⚠️ **La différence avec S, et pourquoi elle existe (§11.1.1).** *« The main reason for mentioning this is that **R and S have different defaults for unordered factors, S using Helmert contrasts**. So **if you need to compare your results to those of a textbook or paper which used S-Plus, you will need to set** »* :
>
> ```
> options(contrasts = c("contr.helmert", "contr.poly"))
> ```
>
> *« **This is a deliberate difference, as treatment contrasts (R's default) are thought easier for newcomers to interpret.** »*
>
> **C'est une source majeure de résultats « qui ne correspondent pas au livre ».** Les prédictions sont identiques ; **les coefficients diffèrent**, parce que la paramétrisation diffère.

*« We have still not finished, as **the contrast scheme to be used can be set for each term in the model using the functions `contrasts` and `C`**. »*

*« We have not yet considered **interaction terms : these generate the products of the columns introduced for their component terms**. »*

> ⚠️ **La règle de marginalité, à retenir (§11.1.1).** *« Although the details are complicated, **model formulae in R will normally generate the models that an expert statistician would expect, provided that marginality is preserved**. **Fitting, for example, a model with an interaction but not the corresponding main effects will in general lead to surprising results, and is for experts only.** »*

## 🔴 Concept 5 — `lm()` et les fonctions extractrices

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition (§11.2).</span>

*« The basic function for fitting ordinary multiple models is **`lm()`** »* :

</div>

```
fitted.model <- lm(formula, data = data.frame)
fm2 <- lm(y ~ x1 + x2, data = production)
```

> ⚠️ **L'argument `data =` (§11.2).** *« The important (**but technically optional**) parameter `data = production` specifies that **any variables needed to construct the model should come first from the `production` data frame**. **This is the case regardless of whether data frame `production` has been attached on the search path or not.** »*
>
> **C'est ce qui rend `attach()` inutile ici** (fiche 306). Le `data =` est **plus sûr** : il dit explicitement où chercher, et ne dépend pas de l'état du chemin de recherche.

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition (§11.3).</span>

*« **The value of `lm()` is a fitted model object ; technically a list of results of class `"lm"`.** Information about the fitted model can then be **displayed, extracted, plotted and so on by using generic functions that orient themselves to objects of class `"lm"`**. »*

</div>

**La liste complète du cours** : `add1`, `alias`, `anova`, `coef`, `deviance`, `drop1`, `effects`, `family`, `formula`, `kappa`, `labels`, `plot`, `predict`, `print`, `proj`, `residuals`, `step`, `summary`, `vcov`.

| Fonction | Ce qu'elle rend (§11.3) |
|---|---|
| `anova(obj1, obj2)` | *« **Compare a submodel with an outer model** and produce an analysis of variance table. »* |
| `coef(obj)` | *« Extract the **regression coefficient (matrix)** »* — forme longue **`coefficients()`** |
| `deviance(obj)` | *« **Residual sum of squares**, weighted if appropriate »* |
| `formula(obj)` | *« Extract **the model formula** »* |
| `plot(obj)` | *« Produce **four plots**, showing residuals, fitted values and some diagnostics »* |
| `predict(obj, newdata=df)` | *« **The data frame supplied must have variables specified with the same labels as the original.** »* |
| `print(obj)` | *« a **concise** version … **Most often used implicitly** »* |
| `residuals(obj)` | *« the (matrix of) residuals, weighted as appropriate »* — forme courte **`resid()`** |
| `step(obj)` | *« **Select a suitable model by adding or dropping terms and preserving hierarchies.** The model with **the smallest value of AIC** … is returned »* |
| `summary(obj)` | *« Print **a comprehensive summary** of the results »* |
| `vcov(obj)` | *« the **variance-covariance matrix** of the main parameters »* |

<div class="callout" data-kind="intu">

<span class="callout__lab">En clair.</span>

Ces noms sont **des génériques** (fiche 311). `coef` s'écrit `function(object, ...) UseMethod("coef")` — c'est l'exemple même que donnait le §10.9. **Le même verbe fonctionne sur un `lm`, un `glm`, un `aov`, un `nls`.** C'est ce que le §11 appelle *« an interlocking suite of facilities »*.

</div>

## 🟠 Concept 6 — `aov()`, les strates d'erreur et l'ordre des termes

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition (§11.4).</span>

*« The model fitting function **`aov(formula, data=data.frame)`** operates at the simplest level **in a very similar way to `lm()`**, and **most of the generic functions** listed … **apply**. »*

*« It should be noted that **in addition `aov()` allows an analysis of models with multiple error strata** such as **split plot experiments**, or **balanced incomplete block designs with recovery of inter-block information**. »*

</div>

```
response ~ mean.formula + Error(strata.formula)
```

*« In the simplest case, **`strata.formula` is simply a factor**, when it defines **a two strata experiment, namely between and within the levels of the factor**. »*

```
fm <- aov(yield ~ v + n*p*k + Error(farms/blocks), data = farm.data)
```

*« would typically be used to describe an experiment with **mean model `v + n*p*k`** and **three error strata**, namely **"between farms"**, **"within farms, between blocks"** and **"within blocks"**. »*

<div class="callout" data-kind="intu">

<span class="callout__lab">Contrôle — d'où viennent les trois strates.</span>

`Error(farms/blocks)` se développe, par la règle `M_1 / M_2` = `M_1 + M_2 %in% M_1`, en **`farms + blocks %in% farms`** — deux termes, donc **deux strates explicites**, plus **la strate résiduelle** (« within blocks »). Total : **trois**. La grammaire du concept 3 s'applique **aussi** dans `Error()`.

</div>

### 6.1 Ce que dit vraiment une table d'ANOVA

> ⚠️ **Règle (§11.4.1).** *« Note also that **the analysis of variance table (or tables) are for a sequence of fitted models**. **The sums of squares shown are the decrease in the residual sums of squares resulting from an inclusion of that term in the model at that place in the sequence.** **Hence only for orthogonal experiments will the order of inclusion be inconsequential.** »*

**C'est l'avertissement le plus important du chapitre.** Une table d'ANOVA par défaut est **séquentielle** : chaque ligne mesure ce que le terme apporte **sachant ceux qui le précèdent**. Changer l'ordre des termes dans la formule **change les sommes de carrés** — sauf si le plan est **orthogonal**.

*« For **multistratum experiments** the procedure is **first to project the response onto the error strata, again in sequence, and to fit the mean model to each projection**. »*

<div class="callout" data-kind="methode">

<span class="callout__lab">Méthode — la voie plus sûre (§11.4.1).</span>

*« **A more flexible alternative to the default full ANOVA table is to compare two or more models directly using the `anova()` function** »* :

```
anova(fitted.model.1, fitted.model.2, ...)
```

*« The display is then an ANOVA table **showing the differences between the fitted models when fitted in sequence**. **The fitted models being compared would usually be an hierarchical sequence.** **This does not give different information to the default, but rather makes it easier to comprehend and control.** »*

**« Easier to comprehend and control » est l'argument** : en comparant deux modèles **explicites**, on sait exactement ce qui est testé — au lieu de dépendre de l'ordre d'écriture des termes.

</div>

## 🟠 Concept 7 — `update()` et le point

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition (§11.5).</span>

*« **The `update()` function is largely a convenience function that allows a model to be fitted that differs from one previously fitted usually by just a few additional or removed terms.** »*

```
new.model <- update(old.model, new.formula)
```

*« In the `new.formula` **the special name consisting of a period, `.`, only, can be used to stand for "the corresponding part of the old model formula"**. »*

</div>

```
fm05 <- lm(y ~ x1 + x2 + x3 + x4 + x5, data = production)
fm6  <- update(fm05, . ~ . + x6)      # AJOUTER un regresseur
smf6 <- update(fm6, sqrt(.) ~ .)      # TRANSFORMER la reponse
```

<div class="callout" data-kind="intu">

<span class="callout__lab">Contrôle — lire les deux points.</span>

Dans `. ~ . + x6`, le point **de gauche** est **la réponse `y`**, le point **de droite** est **tout le prédicteur** `x1 + … + x5`. Dans `sqrt(.) ~ .`, le point de gauche est repris **à l'intérieur d'une fonction** : la réponse devient `sqrt(y)`.

C'est exactement le `update(fm, . ~ . - Run)` de l'annexe A (fiche 300) — « même réponse, mêmes prédicteurs, **moins `Run`** ».

</div>

> ⚠️ **Le détail qui économise du travail (§11.5).** *« **Note especially that if the `data=` argument is specified on the original call to the model fitting function, this information is passed on through the fitted model object to `update()` and its allies.** »*

> ⚠️ **L'autre sens du point (§11.5).** *« **The name `.` can also be used in other contexts, but with slightly different meaning.** For example `fmfull <- lm(y ~ . , data = production)` **would fit a model with response `y` and regressor variables all other variables in the data frame `production`**. »*
>
> **Deux sens à ne pas confondre** : dans `update()`, le point est **« la partie correspondante de l'ancienne formule »** ; dans une formule neuve avec `data =`, il est **« toutes les autres variables du data frame »**.

*« Other functions for exploring incremental sequences of models are **`add1()`, `drop1()` and `step()`**. »*

## 🔴 Concept 8 — Les modèles linéaires généralisés

> **Cadrage (§11.6).** *« **Generalized linear modeling is a development of linear models to accommodate both non-normal response distributions and transformations to linearity in a clean and straightforward way.** »*

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition — les quatre hypothèses (§11.6).</span>

1. *« There is **a response, `y`, of interest** and **stimulus variables** $x_1, x_2,\dots$ whose values **influence the distribution of the response**. »*
2. *« **The stimulus variables influence the distribution of `y` through a single linear function, only.** This linear function is called **the linear predictor** »* $$\eta=\beta_1x_1+\beta_2x_2+\dots+\beta_px_p$$ *« hence **$x_i$ has no influence on the distribution of `y` if and only if $\beta_i = 0$**. »*
3. *« **The distribution of `y` is of the form** »* $$f_Y(y;\mu,\varphi)=\exp\left[\frac{A}{\varphi}\bigl\{y\,\lambda(\mu)-\gamma(\lambda(\mu))\bigr\}+\tau(y,\varphi/A)\right]$$ *« where **$\varphi$ is a scale parameter (possibly known), and is constant for all observations**, **$A$ represents a prior weight, assumed known but possibly varying with the observations**, and **$\mu$ is the mean of `y`**. **So it is assumed that the distribution of `y` is determined by its mean and possibly a scale parameter as well.** »*
4. *« **The mean, $\mu$, is a smooth invertible function of the linear predictor** »* : $\mu = m(\eta)$, $\eta = m^{-1}(\mu) = \ell(\mu)$, *« and **this inverse function, $\ell(\cdot)$, is called the link function** »*.

*« These assumptions are **loose enough to encompass a wide class of models** useful in statistical practice, **but tight enough to allow the development of a unified methodology** of estimation and inference, at least approximately. »* Références citées : **McCullagh & Nelder (1989)** et **Dobson (1990)**.

</div>

### 8.1 Familles et liens

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition (§11.6.1).</span>

*« The class of generalized linear models handled by facilities supplied in R includes **gaussian, binomial, poisson, inverse gaussian and gamma** response distributions and also **quasi-likelihood models where the response distribution is not explicitly specified**. **In the latter case the variance function must be specified as a function of the mean**, but in other cases **this function is implied by the response distribution**. »*

</div>

| Famille | Fonctions de lien disponibles |
|---|---|
| **`binomial`** | `logit`, `probit`, `log`, `cloglog` |
| **`gaussian`** | `identity`, `log`, `inverse` |
| **`Gamma`** | `identity`, `inverse`, `log` |
| **`inverse.gaussian`** | `1/mu^2`, `identity`, `inverse`, `log` |
| **`poisson`** | `identity`, `log`, `sqrt` |
| **`quasi`** | `logit`, `probit`, `cloglog`, `identity`, `inverse`, `log`, `1/mu^2`, `sqrt` |

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition (§11.6.1).</span>

*« **The combination of a response distribution, a link function and various other pieces of information that are needed to carry out the modeling exercise is called the family of the generalized linear model.** »*

</div>

### 8.2 `glm()`

```
fitted.model <- glm(formula, family = family.generator, data = data.frame)
```

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition (§11.6.2).</span>

*« **The only new feature is the `family.generator`**, which is the instrument by which the family is described. **It is the name of a function that generates a list of functions and expressions that together define and control the model and estimation process.** »*

*« **Where there is a choice of links, the name of the link may also be supplied with the family name, in parentheses as a parameter.** In the case of the `quasi` family, **the variance function may also be specified in this way**. »*

</div>

> ⚠️ **La famille gaussienne (§11.6.2).** *« A call such as `glm(y ~ x1 + x2, family = gaussian, data = sales)` **achieves the same result as `lm(y ~ x1+x2, data=sales)` but much less efficiently.** **Note how the gaussian family is not automatically provided with a choice of links, so no parameter is allowed.** **If a problem requires a gaussian family with a nonstandard link, this can usually be achieved through the `quasi` family.** »*

<details class="details--riche">
<summary>

**Exemple travaillé du cours — la cécité à Kalythos et l'estimation de la DL50**

</summary>

> **Énoncé (§11.6.2, d'après Silvey 1970).** *« On the Aegean island of Kalythos **the male inhabitants suffer from a congenital eye disease, the effects of which become more marked with increasing age**. Samples of islander males of various ages were tested for blindness. »*

| Âge | 20 | 35 | 45 | 55 | 70 |
|---|---|---|---|---|---|
| **Nombre testé** | 50 | 50 | 50 | 50 | 50 |
| **Nombre d'aveugles** | 6 | 17 | 26 | 37 | 44 |

*« The problem we consider is **to fit both logistic and probit models to this data**, and **to estimate for each model the LD50, that is the age at which the chance of blindness for a male inhabitant is 50 %**. »*

*Étape 1 — le modèle.* *« If `y` is the number of blind at age `x` and `n` the number tested, **both models have the form** »*

$$y \sim B\bigl(n,\;F(\beta_0+\beta_1 x)\bigr)$$

*« where **for the probit case, $F(z)=\Phi(z)$ is the standard normal distribution function**, and **in the logit case (the default), $F(z)=e^z/(1+e^z)$**. »*

*Étape 2 — la quantité cherchée.* *« In both cases **the LD50 is** »*

$$\mathrm{LD}_{50} = -\beta_0/\beta_1$$

*« that is, **the point at which the argument of the distribution function is zero** »* — car $F(0) = 0{,}5$ pour les deux fonctions considérées, $\Phi$ étant symétrique et $e^0/(1+e^0) = 1/2$.

*Étape 3 — mettre les données en data frame.*

```
kalythos <- data.frame(x = c(20,35,45,55,70), n = rep(50,5),
                       y = c(6,17,26,37,44))
```

*Étape 4 — les trois formes de réponse admises.* Le cours les énumère : *« **If the response is a vector it is assumed to hold binary data, and so must be a 0/1 vector.** **If the response is a two-column matrix it is assumed that the first column holds the number of successes for the trial and the second holds the number of failures.** **If the response is a factor, its first level is taken as failure (0) and all other levels as "success" (1).** »*

*Étape 5 — choisir la deuxième.* *« Here we need the second of these conventions, **so we add a matrix to our data frame** »* :

```
kalythos$Ymat <- cbind(kalythos$y, kalythos$n - kalythos$y)
```

⚠️ **La deuxième colonne est le nombre d'échecs**, `n - y`, **pas** le nombre testé. C'est l'erreur la plus fréquente sur cette convention.

*Étape 6 — ajuster les deux modèles.*

```
fmp <- glm(Ymat ~ x, family = binomial(link = probit), data = kalythos)
fml <- glm(Ymat ~ x, family = binomial,                data = kalythos)
```

*« **Since the logit link is the default the parameter may be omitted on the second call.** »*

*Étape 7 — regarder.* `summary(fmp)` et `summary(fml)`. *« **Both models fit (all too) well.** »* — la parenthèse est du cours : cinq points, deux paramètres, un ajustement excellent n'a rien d'un exploit.

*Étape 8 — la DL50, par une fonction d'une ligne.*

```
ld50 <- function(b) -b[1]/b[2]
ldp <- ld50(coef(fmp)); ldl <- ld50(coef(fml)); c(ldp, ldl)
```

*« **The actual estimates from this data are 43.663 years and 43.601 years respectively.** »*

*Étape 9 — interpréter l'écart.* **Six centièmes d'année** séparent les deux liens, soit environ **trois semaines** sur une échelle de 20 à 70 ans. Logit et probit **diffèrent surtout dans les queues** ; au centre de la courbe — et la DL50 **est** le centre — ils coïncident presque. **Le choix du lien est ici sans conséquence pratique**, et c'est une information utile.

*Étape 10 — le patron à retenir.* `coef()` extrait, une fonction d'une ligne transforme. La quantité d'intérêt n'était **pas** un coefficient : elle s'en déduit. C'est le *« interrogation by further R functions »* du §1.3.

</details>

### 8.3 Poisson et quasi-vraisemblance

> **Règle (§11.6.2).** *« **With the Poisson family the default link is the log**, and **in practice the major use of this family is to fit surrogate Poisson log-linear models to frequency data, whose actual distribution is often multinomial.** **This is a large and important subject we will not discuss further here.** »*

*« Occasionally genuinely Poisson data arises in practice and **in the past it was often analyzed as gaussian data after either a log or a square-root transformation**. **As a graceful alternative to the latter**, a Poisson generalized linear model may be fitted as »* :

```
fmod <- glm(y ~ A + B + x, family = poisson(link = sqrt), data = worm.counts)
```

> **Règle — la quasi-vraisemblance (§11.6.2).** *« For all families **the variance of the response will depend on the mean** and **will have the scale parameter as a multiplier**. **The form of dependence of the variance on the mean is a characteristic of the response distribution** ; for example for the Poisson distribution $\operatorname{Var}[y]=\mu$. »*
>
> *« For quasi-likelihood estimation and inference **the precise response distribution is not specified, but rather only a link function and the form of the variance function as it depends on the mean**. **Since quasi-likelihood estimation uses formally identical techniques to those for the gaussian distribution, this family provides a way of fitting gaussian models with non-standard link functions or variance functions.** »*

**L'exemple du cours** — une régression non linéaire ramenée à un GLM :

$$y=\frac{\theta_1 z_1}{z_2-\theta_2}+e \qquad\Longleftrightarrow\qquad y=\frac{1}{\beta_1x_1+\beta_2x_2}+e$$

*« where $x_1 = z_2/z_1$, $x_2 = -1/z_1$, $\beta_1 = 1/\theta_1$ and $\beta_2 = \theta_2/\theta_1$ »*.

```
nlfit <- glm(y ~ x1 + x2 - 1,
             family = quasi(link = inverse, variance = constant),
             data = biochem)
```

<div class="callout" data-kind="intu">

<span class="callout__lab">Contrôle — vérifier la réécriture.</span>

En partant de $\dfrac{\theta_1z_1}{z_2-\theta_2}$, on divise numérateur et dénominateur par $\theta_1 z_1$ :

$$\frac{\theta_1z_1}{z_2-\theta_2}=\frac{1}{\dfrac{z_2-\theta_2}{\theta_1z_1}}=\frac{1}{\dfrac{1}{\theta_1}\cdot\dfrac{z_2}{z_1}+\dfrac{\theta_2}{\theta_1}\cdot\left(-\dfrac{1}{z_1}\right)}=\frac{1}{\beta_1x_1+\beta_2x_2}$$

conforme aux substitutions annoncées. **Le lien `inverse` est exactement ce qui absorbe le $1/(\cdot)$**, et `- 1` retire l'ordonnée à l'origine puisque le dénominateur n'a pas de constante.

</div>

## 🟠 Concept 9 — Modèles non linéaires

> **Cadrage (§11.7).** *« Certain forms of nonlinear model can be fitted by Generalized Linear Models. But **in the majority of cases we have to approach the nonlinear curve fitting problem as one of nonlinear optimization**. **R's nonlinear optimization routines are `optim()`, `nlm()` and `nlminb()`.** »*
>
> ⚠️ *« **Unlike linear regression for example, there is no guarantee that the procedure will converge on satisfactory estimates. All the methods require initial guesses about what parameter values to try, and convergence may depend critically upon the quality of the starting values.** »*

<details class="details--riche">
<summary>

**Exemple travaillé du cours — Michaelis-Menten par `nlm()` puis par `nls()`**

</summary>

> **Énoncé (§11.7.1, d'après Bates & Watts 1988, p. 51).** *« One way to fit a nonlinear model is by **minimizing the sum of the squared errors (SSE)**. **This method makes sense if the observed errors could have plausibly arisen from a normal distribution.** »*

```
x <- c(0.02, 0.02, 0.06, 0.06, 0.11, 0.11, 0.22, 0.22, 0.56, 0.56, 1.10, 1.10)
y <- c(76, 47, 97, 107, 123, 139, 159, 152, 191, 201, 207, 200)

fn <- function(p) sum((y - (p[1] * x)/(p[2] + x))^2)
```

*Étape 1 — reconnaître le modèle.* $\hat y = \dfrac{V_m x}{K + x}$ : c'est **le modèle de Michaelis-Menten**, comme le cours le dira plus bas. `p[1]` est $V_m$ (l'asymptote), `p[2]` est $K$ (l'abscisse à mi-hauteur).

*Étape 2 — trouver des valeurs de départ.* *« **One way to find sensible starting values is to plot the data, guess some parameter values, and superimpose the model curve using those values.** »*

```
plot(x, y)
xfit <- seq(.02, 1.1, .05)
yfit <- 200 * xfit/(0.1 + xfit)
lines(spline(xfit, yfit))
```

*« **We could do better, but these starting values of 200 and 0.1 seem adequate.** »* — $200$ parce que les $y$ plafonnent autour de 200, $0{,}1$ parce que la moitié de ce plateau est atteinte vers $x\approx0{,}1$. **Les deux paramètres se lisent sur le graphique.**

*Étape 3 — ajuster.*

```
out <- nlm(fn, p = c(200, 0.1), hessian = TRUE)
```

*« After the fitting, **`out$minimum` is the SSE**, and **`out$estimate` are the least squares estimates** of the parameters. »*

*Étape 4 — les erreurs types.*

```
sqrt(diag(2*out$minimum/(length(y) - 2) * solve(out$hessian)))
```

*« **The 2 which is subtracted in the line above represents the number of parameters.** **A 95 % confidence interval would be the parameter estimate ± 1.96 SE.** »*

<div class="callout" data-kind="intu">

<span class="callout__lab">Contrôle — d'où vient cette formule.</span>

`out$minimum` est la **SSE**, donc $\hat\sigma^2 = \mathrm{SSE}/(n-p)$ avec $n = 12$ et $p = 2$ : c'est le `out$minimum/(length(y) - 2)`. Le facteur **2** vient de ce que `fn` est la **somme des carrés** et non sa moitié : sa hessienne vaut approximativement $2\,J^{\mathsf T}J$, donc $(J^{\mathsf T}J)^{-1} = 2\,H^{-1}$. D'où $\widehat{\operatorname{Cov}} = \hat\sigma^2\cdot 2\,H^{-1}$, et l'écart-type est la racine de la diagonale. **Comparer avec le concept 9.1 : la formule du maximum de vraisemblance n'a pas ce facteur.**

</div>

*Étape 5 — superposer l'ajustement.*

```
plot(x, y)
xfit <- seq(.02, 1.1, .05)
yfit <- 212.68384222 * xfit/(0.06412146 + xfit)
lines(spline(xfit, yfit))
```

*Étape 6 — la voie professionnelle.* *« **The standard package `stats` provides much more extensive facilities for fitting non-linear models by least squares. The model we have just fitted is the Michaelis-Menten model**, so we can use »* :

```
df  <- data.frame(x = x, y = y)
fit <- nls(y ~ SSmicmen(x, Vm, K), df)
fit
# Nonlinear regression model
#   model: y ~ SSmicmen(x, Vm, K)
#    data: df
#           Vm            K
# 212.68370711   0.06412123
# residual sum-of-squares: 1195.449
```

**`SSmicmen`** est un **modèle auto-démarrant** : il calcule lui-même ses valeurs initiales. Les étapes 2 et 3 disparaissent.

*Étape 7 — le résumé complet.*

```
Parameters:
    Estimate Std. Error t value Pr(>|t|)
Vm 2.127e+02  6.947e+00  30.615 3.24e-11
K  6.412e-02  8.281e-03   7.743 1.57e-05

Residual standard error: 10.93 on 10 degrees of freedom

Correlation of Parameter Estimates:
      Vm
K 0.7651
```

<div class="callout" data-kind="intu">

<span class="callout__lab">Contrôle — trois vérifications.</span>

- **Degrés de liberté** : $n - p = 12 - 2 = \mathbf{10}$.
- **Valeurs $t$** : $212{,}7/6{,}947 = \mathbf{30{,}62}$ et $0{,}06412/0{,}008281 = \mathbf{7{,}74}$.
- **Écart-type résiduel** : $\sqrt{1195{,}449/10} = \sqrt{119{,}54} = \mathbf{10{,}93}$.

Et les estimations de `nlm` (**212,68384**, **0,06412146**) et de `nls` (**212,68371**, **0,06412123**) **coïncident à cinq chiffres significatifs** — deux algorithmes différents, un même optimum.

</div>

*Étape 8 — lire la corrélation.* **0,7651** entre $\hat V_m$ et $\hat K$ : les deux paramètres sont **fortement liés**. Surestimer l'asymptote se compense en surestimant la constante de demi-saturation. C'est une information que `summary` d'un `lm` ne donne pas d'office, et que `nls` affiche **parce qu'elle compte** en non linéaire.

</details>

### 9.1 Maximum de vraisemblance

> **Cadrage (§11.7.2).** *« **Maximum likelihood is a method of nonlinear model fitting that applies even if the errors are not normal.** The method **finds the parameter values which maximize the log likelihood, or equivalently which minimize the negative log-likelihood**. »* Exemple *« from Dobson (1990), pp. 108-111 … **which clearly could also be fit by `glm()`** »*.

```
x <- c(1.6907, 1.7242, 1.7552, 1.7842, 1.8113, 1.8369, 1.8610, 1.8839)
y <- c( 6, 13, 18, 28, 52, 53, 61, 60)
n <- c(59, 60, 62, 56, 63, 59, 62, 60)

fn <- function(p)
  sum( - (y*(p[1]+p[2]*x) - n*log(1+exp(p[1]+p[2]*x))
          + log(choose(n, y)) ))

out <- nlm(fn, p = c(-50, 20), hessian = TRUE)
```

*« After the fitting, **`out$minimum` is the negative log-likelihood**, and **`out$estimate` are the maximum likelihood estimates**. »*

```
sqrt(diag(solve(out$hessian)))
```

> ⚠️ **La comparaison des deux formules d'erreur type est le point à retenir.**
>
> | Méthode | Ce que `fn` minimise | Erreur type |
> |---|---|---|
> | **Moindres carrés** (§11.7.1) | la **SSE** | `sqrt(diag(2*out$minimum/(n-p) * solve(out$hessian)))` |
> | **Maximum de vraisemblance** (§11.7.2) | la **log-vraisemblance négative** | **`sqrt(diag(solve(out$hessian)))`** |
>
> **Pourquoi la seconde est plus simple** : la hessienne d'une log-vraisemblance négative **est l'information observée**, dont l'inverse **est** la matrice de covariance asymptotique. Aucun facteur d'échelle n'est nécessaire. Dans le cas des moindres carrés, il faut **estimer $\sigma^2$** et corriger le facteur 2.
>
> ⚠️ **Utiliser la mauvaise formule donne des erreurs types fausses sans aucun message.**

*« **A 95 % confidence interval would be the parameter estimate ± 1.96 SE.** »*

## 🟢 Concept 10 — Les modèles non standard

> **Panorama (§11.8).** *« We conclude this chapter with **just a brief mention of some of the other facilities available in R** »* :

| Famille de modèles | Fonctions et paquets |
|---|---|
| **Modèles mixtes** | *« The recommended **`nlme`** package provides **`lme()` and `nlme()`** for linear and non-linear mixed-effects models, that is **regressions in which some of the coefficients correspond to random effects**. **These functions make heavy use of formulae.** »* |
| **Régressions locales** | **`loess()`** — *« fits a nonparametric regression by using a locally weighted regression … useful for **highlighting a trend in messy data** or for **data reduction** »*. Dans le paquet **`stats`**, *« together with code for **projection pursuit regression** »* |
| **Régression robuste** | *« resistant to the influence of **extreme outliers** »* : **`lqs`** dans **`MASS`** — *« state-of-art algorithms for **highly-resistant** fits »* — et **`rlm`**, *« less resistant but **statistically more efficient** »* |
| **Modèles additifs** | **`avas`** et **`ace`** (paquet `acepack`), **`bruto`** et **`mars`** (paquet `mda`) ; extension GAM dans **`gam`** et **`mgcv`** |
| **Modèles à base d'arbres** | *« seek to **bifurcate the data, recursively, at critical points** … to partition the data into groups **as homogeneous as possible within, and as heterogeneous as possible between** »* · **`tree()`**, paquets **`rpart`** et **`tree`** · *« **Models are again specified in the ordinary linear model form** »* |

> **La phrase qui justifie les arbres (§11.8).** *« **The results often lead to insights that other data analysis methods tend not to yield.** »*

## Comment reconnaître le type d'exercice

| Le signal dans l'énoncé | Ce qu'il faut mobiliser |
|---|---|
| « régresser `y` sur `x` » | **`lm(y ~ x, data = df)`** |
| « sans constante », « par l'origine » | **`y ~ x - 1`**, `y ~ 0 + x`, `y ~ -1 + x` |
| « une régression polynomiale » | **`poly(x, 2)`** (orthogonaux) ou **`I(x^2)`** (puissances) |
| « le carré de `x` » | **`I(x^2)`** — `x^2` seul signifie autre chose |
| « la somme de deux variables comme prédicteur » | **`I(x1 + x2)`** |
| « analyse de variance à un facteur » | **`y ~ A`** |
| « analyse de covariance » | **`y ~ A + x`** |
| « avec interaction » | **`y ~ A*B`** = `A + B + A:B` |
| « effets principaux et interactions d'ordre 2 » | **`(A+B+C)^2`** ou `A*B*C - A:B:C` |
| « classification emboîtée » | **`%in%`** ou **`/`** |
| « une droite par niveau de `A` » | **`y ~ A/(1 + x) - 1`** pour des estimations explicites |
| « toutes les autres variables » | **`y ~ .`** avec `data =` |
| « plan en parcelles divisées » | **`Error(strata)`** dans `aov()` |
| « mes coefficients ne collent pas au livre » | les **contrastes** — S utilise **Helmert** |
| « la table d'ANOVA change si je réordonne » | c'est **normal** hors plan orthogonal |
| « comparer deux modèles » | **`anova(m1, m2)`** — *« easier to comprehend and control »* |
| « ajouter une variable au modèle précédent » | **`update(m, . ~ . + x6)`** |
| « transformer la réponse » | **`update(m, sqrt(.) ~ .)`** |
| « réponse binaire, proportion » | **`glm(..., family = binomial)`** |
| « des comptages » | **`family = poisson`** — lien **log** par défaut |
| « nombre de succès et d'échecs » | une **matrice à deux colonnes** : succès, **échecs** |
| « la dose à 50 % » | **$-\beta_0/\beta_1$** |
| « seulement le lien et la variance sont connus » | **`family = quasi(link = , variance = )`** |
| « modèle non linéaire » | **`nls()`**, ou `nlm()`/`optim()` |
| « des valeurs de départ » | **les lire sur un graphique** |
| « les erreurs types de `nlm` » | **deux formules** — SSE ou log-vraisemblance |
| « résister aux valeurs aberrantes » | **`lqs`** ou **`rlm`** (paquet `MASS`) |
| « effets aléatoires » | **`lme()`/`nlme()`** |

## Comment résoudre ce type d'exercice

**Protocole « ajuster et exploiter un modèle linéaire » — 5 étapes.**

1. **Écrire la formule** : réponse à gauche, termes à droite ; se demander si l'ordonnée à l'origine doit y être.
2. **Ajuster** avec **`data =`** — jamais en s'appuyant sur `attach()`.
3. **Interroger** : `summary()`, `coef()`, `resid()`, `fitted()`, **`plot()`** (les quatre diagnostics).
4. **Comparer** : `anova(m1, m2)` sur une **séquence hiérarchique**, plutôt que de lire la table par défaut.
5. **Itérer** avec `update()`, `add1()`, `drop1()`, `step()`.

**Protocole « écrire une formule sans se tromper » — 4 étapes.**

1. Se rappeler que **`+ - * / ^` ne sont pas arithmétiques** dans une formule.
2. Tout calcul arithmétique doit être **enveloppé dans `I()`** — ou fait avant.
3. Vérifier **la marginalité** : pas d'interaction sans les effets principaux correspondants.
4. Vérifier **l'ordonnée à l'origine** — présente par défaut, retirée par `-1` ou `+0`.

**Protocole « ajuster un GLM » — 5 étapes.**

1. Identifier **la loi de la réponse** → la famille.
2. Identifier **le lien** — souvent le défaut convient (logit pour `binomial`, log pour `poisson`).
3. Mettre la réponse **sous la bonne forme** : 0/1, matrice succès-échecs, ou facteur.
4. `glm(formule, family = famille(link = ...), data = df)`.
5. **Extraire ce qui intéresse** — souvent une **transformation** des coefficients, comme $-\beta_0/\beta_1$.

**Protocole « ajuster un modèle non linéaire » — 5 étapes.**

1. Chercher d'abord **une reparamétrisation linéaire** ou un **GLM** — l'exemple de la quasi-vraisemblance le montre.
2. Sinon, **tracer les données** et lire des valeurs de départ sur le graphique.
3. Préférer **`nls()`** avec un modèle **auto-démarrant** (`SSmicmen`…) quand il existe.
4. En passant par `nlm()`/`optim()`, **poser `hessian = TRUE`** et choisir **la bonne formule d'erreur type**.
5. **Vérifier la convergence** : *« there is **no guarantee** that the procedure will converge on satisfactory estimates »*.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Écrire `y ~ x^2` pour un terme carré | c'est **`I(x^2)`** |
| Écrire `y ~ x1 + x2` pour la somme des deux | c'est **`I(x1 + x2)`** |
| Oublier que l'ordonnée à l'origine est implicite | la retirer par **`-1`** ou **`+0`** |
| Écrire `A.B` pour une interaction | c'est **`A:B`** — le point est **un caractère de nom** |
| Ajuster une interaction sans les effets principaux | **viole la marginalité** — *« for experts only »* |
| Comparer ses coefficients à un manuel S-Plus | **contrastes différents** → `contr.helmert` |
| Croire l'ordre des termes indifférent | *« **only for orthogonal experiments** »* |
| Lire la table d'ANOVA par défaut sans réfléchir | préférer **`anova(m1, m2)`** |
| Compter sur `attach()` au lieu de `data =` | `data =` fonctionne **quel que soit le chemin de recherche** |
| Donner à `predict()` des variables aux noms différents | *« **must have variables specified with the same labels** »* |
| Mettre `n` en seconde colonne de la matrice binomiale | c'est **`n - y`**, les **échecs** |
| Passer un lien à `family = gaussian` | *« **no parameter is allowed** »* |
| Utiliser `glm(..., family = gaussian)` au lieu de `lm` | *« **much less efficiently** »* |
| Oublier `variance =` avec `quasi` | *« **the variance function must be specified** »* |
| Appliquer la formule SSE des erreurs types à une log-vraisemblance | **deux formules distinctes** |
| Lancer `nlm` sans valeurs de départ réfléchies | *« **convergence may depend critically** upon … starting values »* |
| Supposer la convergence acquise | *« **there is no guarantee** »* |
| Croire le point d'`update()` et celui de `y ~ .` identiques | *« **slightly different meaning** »* |

## 📌 Ultimate Review

**Le patron.** Formule → fonction d'ajustement → **fonctions extractrices**. *« the basic output is **minimal**, and one needs to **ask for the details** by calling extractor functions »*.

**Le modèle de référence.** $y = X\beta + e$, $e_i \sim \mathrm{NID}(0,\sigma^2)$ ; `X` est **la matrice du modèle**, $x_0$ **une colonne de uns**.

**La formule.** `response ~ op_1 term_1 op_2 term_2 …` · opérateurs **`+`** ou **`-`** (le premier **optionnel**) · un terme est **un vecteur/matrice ou `1`**, **un facteur**, ou **une expression de formule** · **`1` est inclus par défaut sauf retrait explicite**.

**Les opérateurs (Chambers & Hastie 1992, p. 29).** **`:`** produit tensoriel — le point de Wilkinson-Rogers, changé *« since **the period is a valid name character in R** »* · **`%in%`** — comme `:` **mais codage différent** · **`*`** = `M1 + M2 + M1:M2` · **`/`** = `M1 + M2 %in% M1` · **`^n`** = tous les termes **et interactions jusqu'à l'ordre `n`** · **`I()`** = **isoler**, sens arithmétique normal.

**Contrastes.** Facteur **non ordonné** → $k-1$ **indicatrices** des niveaux $2,\dots,k$, *« **contrast the response at each level with that at the first** »* · facteur **ordonné** → $k-1$ **polynômes orthogonaux** sur $1,\dots,k$ · **sans ordonnée à l'origine, le premier facteur reçoit $k$ colonnes** · défaut R **`c("contr.treatment", "contr.poly")`**, défaut S **Helmert** — *« **a deliberate difference** »* · réglage par terme via **`contrasts`** et **`C`** · les interactions **multiplient les colonnes** · **préserver la marginalité**.

**`lm()`.** `lm(formula, data = df)` · **`data =`** est *« technically optional »* mais décisif : il agit *« **regardless of whether the data frame has been attached** »* · la valeur est **une liste de classe `"lm"`**.

**Extractrices.** `anova` `coef`/`coefficients` `deviance` (**SCR**) `formula` `plot` (**quatre diagnostics**) `predict` ( **mêmes noms de variables**) `print` `residuals`/`resid` `step` (**plus petit AIC**) `summary` `vcov` · plus `add1` `alias` `drop1` `effects` `family` `kappa` `labels` `proj`.

**`aov()`.** Comme `lm()`, plus **les strates d'erreur multiples** : `response ~ mean.formula + Error(strata.formula)` · `Error(farms/blocks)` → **trois strates** · **la table d'ANOVA est séquentielle** : *« the sums of squares shown are **the decrease in the residual sums of squares resulting from an inclusion of that term … at that place in the sequence** »*, donc *« **only for orthogonal experiments will the order of inclusion be inconsequential** »* · préférer **`anova(m1, m2, …)`**, *« **easier to comprehend and control** »*.

**`update()`.** `update(old, . ~ . + x6)` — le point est *« **the corresponding part of the old model formula** »* · `sqrt(.) ~ .` transforme la réponse · **`data =` est transmis** par l'objet ajusté · dans `y ~ .` **avec `data =`**, le point signifie **toutes les autres variables**.

**GLM — quatre hypothèses.** Une réponse `y` ; **un seul prédicteur linéaire** $\eta = \sum\beta_ix_i$, d'où *« $x_i$ **has no influence … if and only if** $\beta_i = 0$ »* ; une loi de **famille exponentielle** de paramètre d'échelle $\varphi$ **constant** et de poids $A$ **connu** ; **$\mu = m(\eta)$**, dont l'inverse $\ell$ est **la fonction de lien**.

**Familles et liens.** `binomial` (**logit** par défaut, probit, log, cloglog) · `gaussian` (**aucun paramètre de lien admis**) · `Gamma` · `inverse.gaussian` · `poisson` (**log** par défaut) · **`quasi`** ( **la fonction de variance doit être spécifiée**). *« **The combination of a response distribution, a link function and various other pieces of information … is called the family.** »*

**Réponse binomiale — trois formes.** **vecteur 0/1** · **matrice à deux colonnes : succès, échecs** · **facteur** dont *« the first level is taken as failure »*.

**Kalythos.** $y \sim B(n, F(\beta_0+\beta_1x))$ · $\mathrm{LD}_{50} = -\beta_0/\beta_1$ · estimations **43,663** (probit) et **43,601** (logit) · *« Both models fit (**all too**) well. »*

**Non linéaire.** **`optim()`, `nlm()`, `nlminb()`** · *« **no guarantee that the procedure will converge** … **convergence may depend critically upon the quality of the starting values** »* · valeurs de départ **lues sur un graphique** · **`nls()`** et les modèles auto-démarrants (**`SSmicmen`**) · Michaelis-Menten : $V_m = 212{,}68$, $K = 0{,}06412$, **SCR 1195,449**, écart-type résiduel **10,93** sur **10** degrés de liberté, corrélation **0,7651**.

⚠️ **Les deux formules d'erreur type.** SSE : `sqrt(diag(2*out$minimum/(length(y)-2) * solve(out$hessian)))` — *« **the 2 which is subtracted … represents the number of parameters** »* · log-vraisemblance négative : **`sqrt(diag(solve(out$hessian)))`** · IC à 95 % : **estimation ± 1,96 SE**.

**Non standard.** **`nlme`** (mixtes) · **`loess`** et *projection pursuit* (dans `stats`) · **`lqs`** et **`rlm`** (`MASS`) · **`acepack`**, **`mda`**, **`gam`**, **`mgcv`** (additifs) · **`rpart`** et **`tree`** (arbres) — *« **insights that other data analysis methods tend not to yield** »*.

## 🧠 Active Recall

<details><summary>Quelle est la philosophie d'ajustement de modèle en R, et d'où vient-elle ?</summary>

*« R provides **an interlocking suite of facilities** that make fitting statistical models very simple. **As we mention in the introduction, the basic output is minimal, and one needs to ask for the details by calling extractor functions.** »* (§11)

C'est la promesse du §1.3 (fiche 300), tenue : *« R will give **minimal output** and **store the results in a fit object** for subsequent interrogation by further R functions »*.

**Trois temps** : une **formule** décrit le modèle ; une **fonction d'ajustement** rend **un objet** ; des **génériques** (fiche 311) l'interrogent — `summary`, `coef`, `resid`, `anova`, `predict`.

Le mot *« interlocking »* est important : les mêmes verbes fonctionnent sur `lm`, `glm`, `aov`, `nls`.

</details>

<details class="details--riche">
<summary>

Pourquoi l'interaction se note-t-elle `:` en R et non `.` ?

</summary>

*« The formula operators are **similar in effect to the Wilkinson and Rogers notation** used by such programs as Glim and Genstat. **One inevitable change is that the operator `.` becomes `:` since the period is a valid name character in R.** »* (§11.1)

**Le point est un caractère d'identifiant en R** (fiche 300) : `A.B` serait lu comme **un nom de variable**, exactement comme `data.frame` ou `is.na`. Le parseur ne pourrait pas distinguer un nom d'une interaction.

Le changement est donc **imposé par la syntaxe des noms**, non choisi — d'où *« inevitable »*. C'est aussi la même racine que le piège de nommage des méthodes S3 (fiche 311) : `gen.cl`.

</details>

<details class="details--riche">
<summary>

Que signifie `y ~ x^2`, et comment obtient-on vraiment le carré de `x` ?

</summary>

`y ~ x^2` signifie *« **all terms in `M` together with "interactions" up to order `n`** »* — donc, `x` étant un seul terme, cela revient à **`y ~ x`**. **Aucun carré n'est introduit.**

Pour le carré arithmétique, il faut **isoler** : *« **`I(M)` : Insulate `M`. Inside `M` all operators have their normal arithmetic meaning, and that term appears in the model matrix.** »*

```
y ~ 1 + x + I(x^2)     # regression polynomiale de degre 2, puissances explicites
y ~ poly(x, 2)         # la meme, en polynomes ORTHOGONAUX
```

⚠️ La même règle vaut pour `+`, `*`, `-` : `y ~ I(x1 + x2)` est **une** colonne, la somme ; `y ~ x1 + x2` est **deux** termes.

Et *« inside the parentheses that usually enclose function arguments **all operators have their normal arithmetic meaning** »* — d'où `log(y) ~ x` qui fonctionne sans `I()`.

</details>

<details class="details--riche">
<summary>

Comment un facteur à *k* niveaux devient-il des colonnes de la matrice du modèle ?

</summary>

*« **The answer differs for unordered and ordered factors.** »* (§11.1.1)

- **Non ordonné** : *« $k-1$ **columns are generated for the indicators of the second, …, $k$-th levels** … **Thus the implicit parameterization is to contrast the response at each level with that at the first.** »*
- **Ordonné** : *« the $k-1$ columns are **the orthogonal polynomials on $1,\dots,k$, omitting the constant term** »*.

**C'est la seconde différence entre `factor()` et `ordered()`** annoncée en fiche 304.

⚠️ Deux complications : *« **if the intercept is omitted in a model that contains a factor term, the first such term is encoded into $k$ columns** giving the indicators for **all** the levels »* ; et *« **the whole behavior can be changed by the `options` setting for `contrasts`** »*.

Et les interactions *« **generate the products of the columns** introduced for their component terms »*.

</details>

<details><summary>Pourquoi mes coefficients ne correspondent-ils pas à ceux d'un manuel écrit avec S-Plus ?</summary>

*« The main reason for mentioning this is that **R and S have different defaults for unordered factors, S using Helmert contrasts**. So **if you need to compare your results to those of a textbook or paper which used S-Plus, you will need to set** »* (§11.1.1) :

```
options(contrasts = c("contr.helmert", "contr.poly"))
```

Le défaut de R est `c("contr.treatment", "contr.poly")`.

*« **This is a deliberate difference, as treatment contrasts (R's default) are thought easier for newcomers to interpret.** »*

⚠️ **Les prédictions sont identiques** — c'est le même sous-espace de modèle. **Seuls les coefficients diffèrent**, parce que la paramétrisation diffère. Un coefficient de traitement se lit « écart au premier niveau » ; un coefficient de Helmert, non.

</details>

<details><summary>Pourquoi l'ordre des termes change-t-il une table d'ANOVA ?</summary>

*« Note also that **the analysis of variance table (or tables) are for a sequence of fitted models. The sums of squares shown are the decrease in the residual sums of squares resulting from an inclusion of that term in the model at that place in the sequence.** **Hence only for orthogonal experiments will the order of inclusion be inconsequential.** »* (§11.4.1)

La table est **séquentielle** : chaque ligne mesure ce que le terme apporte **sachant tous ceux qui le précèdent**. Si deux prédicteurs sont corrélés, ce qu'ils apportent dépend de l'ordre dans lequel on les entre.

**Le remède du cours** : *« **A more flexible alternative … is to compare two or more models directly using the `anova()` function** … **This does not give different information to the default, but rather makes it easier to comprehend and control.** »* En comparant deux modèles explicites, **on sait ce qu'on teste**.

</details>

<details class="details--riche">
<summary>

Que fait le point dans `update()` ? Et dans `y ~ .` ?

</summary>

**Dans `update()`** : *« the special name consisting of **a period, `.`, only**, can be used to stand for **"the corresponding part of the old model formula"** »* (§11.5).

```
fm6  <- update(fm05, . ~ . + x6)    # meme reponse, memes predicteurs, PLUS x6
smf6 <- update(fm6, sqrt(.) ~ .)    # reponse TRANSFORMEE, memes predicteurs
```

**Dans une formule neuve avec `data =`** : *« The name `.` can also be used in other contexts, **but with slightly different meaning** »* :

```
fmfull <- lm(y ~ . , data = production)   # TOUTES les autres variables du data frame
```

**Deux sens distincts** : « la partie correspondante de l'ancienne formule » contre « toutes les autres colonnes ».

Et le détail utile : *« **if the `data=` argument is specified on the original call … this information is passed on through the fitted model object to `update()`** »*.

</details>

<details><summary>Énoncer les quatre hypothèses d'un modèle linéaire généralisé.</summary>

(§11.6)

1. *« There is **a response, `y`, of interest** and **stimulus variables** whose values **influence the distribution of the response**. »*
2. *« The stimulus variables influence the distribution of `y` **through a single linear function, only** »* — **le prédicteur linéaire** $\eta = \beta_1x_1+\dots+\beta_px_p$, d'où *« $x_i$ **has no influence … if and only if** $\beta_i = 0$ »*.
3. *« **The distribution of `y` is of the form** »* d'une famille exponentielle, où *« **$\varphi$ is a scale parameter (possibly known), and is constant for all observations** »*, *« **$A$ represents a prior weight, assumed known but possibly varying** »*, et *« **$\mu$ is the mean of `y`** »*. Donc *« **the distribution of `y` is determined by its mean and possibly a scale parameter as well** »*.
4. *« **The mean, $\mu$, is a smooth invertible function of the linear predictor** »* : $\mu = m(\eta)$, et **$\ell = m^{-1}$ est la fonction de lien**.

*« **loose enough to encompass a wide class of models** … **tight enough to allow … a unified methodology** »*.

</details>

<details><summary>Quelles sont les trois formes admises pour la réponse d'un modèle binomial ?</summary>

*« To fit a binomial model using `glm()` there are **three possibilities for the response** »* (§11.6.2) :

1. *« **If the response is a vector it is assumed to hold binary data, and so must be a 0/1 vector.** »*
2. *« **If the response is a two-column matrix it is assumed that the first column holds the number of successes for the trial and the second holds the number of failures.** »*
3. *« **If the response is a factor, its first level is taken as failure (0) and all other levels as "success" (1).** »*

Sur Kalythos, c'est la deuxième qui convient :

```
kalythos$Ymat <- cbind(kalythos$y, kalythos$n - kalythos$y)
```

⚠️ **La seconde colonne est `n - y`, le nombre d'échecs** — pas `n`. C'est l'erreur la plus fréquente, et elle ne produit **aucun message** : le modèle s'ajuste, sur des données fausses.

</details>

<details><summary>Comment estime-t-on la DL50, et que vaut-elle sur les données de Kalythos ?</summary>

Le modèle est $y \sim B\bigl(n, F(\beta_0+\beta_1x)\bigr)$, avec $F = \Phi$ (probit) ou $F(z) = e^z/(1+e^z)$ (logit, **le défaut**).

*« In both cases **the LD50 is $-\beta_0/\beta_1$**, that is, **the point at which the argument of the distribution function is zero**. »* — car $F(0) = 0{,}5$ dans les deux cas.

```
fmp <- glm(Ymat ~ x, family = binomial(link = probit), data = kalythos)
fml <- glm(Ymat ~ x, family = binomial,                data = kalythos)
ld50 <- function(b) -b[1]/b[2]
c(ld50(coef(fmp)), ld50(coef(fml)))
```

*« **The actual estimates from this data are 43.663 years and 43.601 years respectively.** »*

**Six centièmes d'année d'écart** — environ trois semaines. Logit et probit diffèrent **dans les queues**, non au centre ; et la DL50 **est** le centre. Le choix du lien est ici sans conséquence.

</details>

<details class="details--riche">
<summary>

À quoi sert la famille `quasi`, et que doit-on lui spécifier ?

</summary>

*« For quasi-likelihood estimation and inference **the precise response distribution is not specified, but rather only a link function and the form of the variance function as it depends on the mean**. **Since quasi-likelihood estimation uses formally identical techniques to those for the gaussian distribution, this family provides a way of fitting gaussian models with non-standard link functions or variance functions.** »* (§11.6.2)

⚠️ **Il faut spécifier la fonction de variance** : *« **In the latter case the variance function must be specified as a function of the mean** »*.

L'exemple du cours ramène une régression **non linéaire** à un GLM :

```
nlfit <- glm(y ~ x1 + x2 - 1,
             family = quasi(link = inverse, variance = constant),
             data = biochem)
```

Le lien **`inverse`** absorbe le $1/(\cdot)$ du modèle $y = 1/(\beta_1x_1+\beta_2x_2)$, et **`- 1`** retire la constante puisque le dénominateur n'en a pas.

</details>

<details><summary>Comment trouve-t-on des valeurs de départ pour un ajustement non linéaire ?</summary>

*« **One way to find sensible starting values is to plot the data, guess some parameter values, and superimpose the model curve using those values.** »* (§11.7.1)

```
plot(x, y)
xfit <- seq(.02, 1.1, .05)
yfit <- 200 * xfit/(0.1 + xfit)
lines(spline(xfit, yfit))
```

*« **We could do better, but these starting values of 200 and 0.1 seem adequate.** »*

**Les deux valeurs se lisent sur le graphique** : $200$ est le plateau des $y$, $0{,}1$ l'abscisse à mi-plateau — ce sont précisément $V_m$ et $K$ du modèle de Michaelis-Menten.

⚠️ Et l'avertissement du §11.7 : *« **there is no guarantee that the procedure will converge on satisfactory estimates** … **convergence may depend critically upon the quality of the starting values** »*.

**La voie plus sûre** est `nls()` avec un modèle **auto-démarrant** : `nls(y ~ SSmicmen(x, Vm, K), df)` calcule ses propres valeurs initiales.

</details>

<details><summary>Pourquoi les erreurs types se calculent-elles différemment selon qu'on minimise une SSE ou une log-vraisemblance ?</summary>

| Méthode | `fn` minimise | Erreur type |
|---|---|---|
| **Moindres carrés** | la **SSE** | `sqrt(diag(2*out$minimum/(length(y)-2) * solve(out$hessian)))` |
| **Maximum de vraisemblance** | la **log-vraisemblance négative** | **`sqrt(diag(solve(out$hessian)))`** |

**La raison** : la hessienne d'une **log-vraisemblance négative** est **l'information observée**, dont l'inverse **est** directement la covariance asymptotique — aucun facteur d'échelle.

Pour les moindres carrés, il faut deux corrections : estimer $\hat\sigma^2 = \mathrm{SSE}/(n-p)$ — d'où le `out$minimum/(length(y) - 2)`, où *« **the 2 … represents the number of parameters** »* — et compenser le facteur **2** dû à ce que `fn` est la somme des carrés et non sa moitié.

⚠️ **Se tromper de formule donne des erreurs types fausses sans aucun message.** Dans les deux cas, *« **A 95 % confidence interval would be the parameter estimate ± 1.96 SE** »*.

</details>

<details class="details--riche">
<summary>

Vérifier la cohérence de la sortie de `nls` sur l'exemple de Michaelis-Menten.

</summary>

```
Parameters:
    Estimate Std. Error t value Pr(>|t|)
Vm 2.127e+02  6.947e+00  30.615 3.24e-11
K  6.412e-02  8.281e-03   7.743 1.57e-05
Residual standard error: 10.93 on 10 degrees of freedom
residual sum-of-squares: 1195.449
```

**Trois contrôles.**

- **Degrés de liberté** : $n - p = 12 - 2 = \mathbf{10}$.
- **Valeurs $t$** : $212{,}7 / 6{,}947 = \mathbf{30{,}62}$ ; $0{,}06412 / 0{,}008281 = \mathbf{7{,}74}$.
- **Écart-type résiduel** : $\sqrt{1195{,}449/10} = \sqrt{119{,}54} = \mathbf{10{,}93}$.

Et les deux méthodes concordent : `nlm` donne **212,68384** / **0,06412146**, `nls` donne **212,68371** / **0,06412123** — **cinq chiffres significatifs communs**.

⚠️ La **corrélation de 0,7651** entre les deux estimations signale qu'elles sont **fortement liées** : surestimer l'asymptote se compense en surestimant $K$.

</details>

<details class="details--riche">
<summary>

Que sont les strates d'erreur, et combien `Error(farms/blocks)` en produit-il ?

</summary>

*« **`aov()` allows an analysis of models with multiple error strata** such as **split plot experiments**, or **balanced incomplete block designs with recovery of inter-block information** »* (§11.4), via

```
response ~ mean.formula + Error(strata.formula)
```

```
fm <- aov(yield ~ v + n*p*k + Error(farms/blocks), data = farm.data)
```

*« would typically be used to describe an experiment with mean model `v + n*p*k` and **three error strata**, namely **"between farms"**, **"within farms, between blocks"** and **"within blocks"** »*.

**Pourquoi trois** : par la règle `M_1 / M_2` = `M_1 + M_2 %in% M_1`, `farms/blocks` se développe en **`farms + blocks %in% farms`** — deux strates explicites — **plus la strate résiduelle**. La grammaire des formules s'applique **aussi dans `Error()`**.

*« In the simplest case, **`strata.formula` is simply a factor**, when it defines **a two strata experiment** »*.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Comment R rend-il ses résultats de modèle ? | **Sortie minimale** + **fonctions extractrices** |
| L'opérateur qui définit une formule ? | **`~`** |
| Les deux opérateurs de terme ? | **`+`** (inclure) et **`-`** (retirer) |
| L'ordonnée à l'origine est-elle implicite ? | **Oui** — le terme `1` |
| Trois façons de l'ôter ? | `y ~ 0 + x` · `y ~ -1 + x` · `y ~ x - 1` |
| Que signifie `M_1 : M_2` ? | Le **produit tensoriel** — l'interaction |
| Que signifie `M_1 * M_2` ? | `M_1 + M_2 + M_1:M_2` |
| Que signifie `M_1 / M_2` ? | `M_1 + M_2 %in% M_1` |
| Que signifie `M^n` ? | Tous les termes + **interactions jusqu'à l'ordre `n`** |
| Que fait `I(M)` ? | Il **isole** — sens arithmétique normal |
| Pourquoi `:` et non `.` ? | Le point est **un caractère de nom** en R |
| Que signifie `y ~ x^2` ? | **`y ~ x`** — pas de carré |
| Comment obtenir le carré ? | **`I(x^2)`** |
| Deux formes de régression polynomiale ? | `poly(x,2)` (orthogonaux) · `1 + x + I(x^2)` (puissances) |
| Que décrit `y ~ A` ? | Une **analyse de variance** à un facteur |
| Et `y ~ A + x` ? | Une **analyse de covariance** |
| Combien d'écritures pour un modèle à deux facteurs non additif ? | **Quatre** — même sous-espace, codages différents |
| Que produit `y ~ A/(1 + x) - 1` ? | Des **ordonnées et pentes explicites** par niveau |
| Combien de colonnes pour un facteur non ordonné à $k$ niveaux ? | **$k-1$** indicatrices |
| Quelle est la référence ? | Le **premier niveau** |
| Et pour un facteur ordonné ? | **$k-1$ polynômes orthogonaux** |
| Que se passe-t-il sans ordonnée à l'origine ? | Le premier facteur reçoit **$k$ colonnes** |
| Le défaut de contrastes en R ? | `c("contr.treatment", "contr.poly")` |
| Le défaut en S ? | **Helmert** |
| Est-ce un oubli ? | **Non** — *« a deliberate difference »* |
| Deux fonctions pour régler un terme ? | **`contrasts`** et **`C`** |
| Que génèrent les interactions ? | Les **produits des colonnes** |
| Quelle règle préserver ? | La **marginalité** |
| La fonction de base d'ajustement linéaire ? | **`lm()`** |
| Que fait `data =` ? | Cherche les variables **d'abord dans ce data frame** |
| Dépend-il du chemin de recherche ? | **Non** |
| De quelle classe est le résultat ? | **`"lm"`** — une **liste** |
| Que rend `deviance()` ? | La **somme des carrés résiduels** |
| Combien de graphiques rend `plot()` ? | **Quatre** |
| Que doit respecter `predict(newdata=)` ? | **Les mêmes noms de variables** |
| Sur quel critère `step()` choisit-il ? | Le **plus petit AIC** |
| Que rend `vcov()` ? | La **matrice de variance-covariance** |
| La forme courte de `residuals` ? | **`resid`** |
| La forme longue de `coef` ? | **`coefficients`** |
| Que permet `aov()` en plus de `lm()` ? | Les **strates d'erreur multiples** |
| La syntaxe des strates ? | `reponse ~ moyenne + Error(strates)` |
| Combien de strates pour `Error(farms/blocks)` ? | **Trois** |
| Comment se lit une table d'ANOVA ? | **Séquentiellement** |
| Quand l'ordre est-il sans effet ? | Pour un **plan orthogonal** |
| L'alternative recommandée ? | **`anova(m1, m2)`** |
| Pourquoi ? | *« **easier to comprehend and control** »* |
| Que signifie le point dans `update()` ? | La **partie correspondante** de l'ancienne formule |
| Et dans `y ~ .` avec `data =` ? | **Toutes les autres variables** |
| `data =` est-il transmis à `update()` ? | **Oui** |
| Trois fonctions d'exploration incrémentale ? | `add1()` · `drop1()` · `step()` |
| Qu'est-ce que le prédicteur linéaire ? | $\eta = \beta_1x_1+\dots+\beta_px_p$ |
| Quand $x_i$ est-il sans influence ? | **Si et seulement si $\beta_i = 0$** |
| Qu'est-ce que la fonction de lien ? | **L'inverse** de $\mu = m(\eta)$ |
| Le paramètre $\varphi$ ? | **Un paramètre d'échelle**, constant |
| Le poids $A$ ? | **Connu**, éventuellement variable |
| Qu'est-ce qu'une « famille » ? | **Loi + lien + information de contrôle** |
| Le lien par défaut de `binomial` ? | **logit** |
| Ses autres liens ? | probit · log · cloglog |
| Le lien par défaut de `poisson` ? | **log** |
| Quel lien peut-on passer à `gaussian` ? | **Aucun** |
| Comment faire un gaussien à lien non standard ? | Par la famille **`quasi`** |
| Que faut-il spécifier avec `quasi` ? | La **fonction de variance** |
| `glm(family = gaussian)` contre `lm` ? | Même résultat, *« **much less efficiently** »* |
| Les trois formes de réponse binomiale ? | Vecteur **0/1** · matrice **succès/échecs** · **facteur** |
| Que contient la 2ᵉ colonne de la matrice ? | Le nombre d'**échecs** |
| La formule de la DL50 ? | **$-\beta_0/\beta_1$** |
| Pourquoi ? | Le point où **l'argument de $F$ est nul** |
| Les deux estimations sur Kalythos ? | **43,663** (probit) et **43,601** (logit) |
| Que dit le cours de l'ajustement ? | *« Both models fit (**all too**) well. »* |
| Les trois routines d'optimisation ? | **`optim()`**, **`nlm()`**, **`nlminb()`** |
| Y a-t-il garantie de convergence ? | **Non** |
| De quoi dépend-elle ? | De **la qualité des valeurs de départ** |
| Comment trouver ces valeurs ? | **Tracer** et deviner sur le graphique |
| La fonction dédiée aux moindres carrés non linéaires ? | **`nls()`** |
| Qu'est-ce que `SSmicmen` ? | Un modèle **auto-démarrant** (Michaelis-Menten) |
| Que vaut $V_m$ ? | **212,68** |
| Que vaut $K$ ? | **0,06412** |
| La somme des carrés résiduels ? | **1195,449** |
| L'écart-type résiduel et ses df ? | **10,93** sur **10** |
| La corrélation des estimations ? | **0,7651** |
| L'erreur type en moindres carrés ? | `sqrt(diag(2*min/(n-2) * solve(hessian)))` |
| Que représente le 2 soustrait ? | Le **nombre de paramètres** |
| L'erreur type en maximum de vraisemblance ? | **`sqrt(diag(solve(hessian)))`** |
| Pourquoi plus simple ? | La hessienne **est** l'information observée |
| L'intervalle à 95 % ? | Estimation **± 1,96 SE** |
| Le paquet des modèles mixtes ? | **`nlme`** — `lme()` et `nlme()` |
| La régression locale ? | **`loess()`**, dans `stats` |
| Deux fonctions de régression robuste ? | **`lqs`** et **`rlm`** (paquet `MASS`) |
| Deux paquets d'arbres ? | **`rpart`** et **`tree`** |
| Ce que les arbres apportent ? | *« **insights that other methods tend not to yield** »* |
