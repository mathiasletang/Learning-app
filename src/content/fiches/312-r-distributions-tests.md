# Fiche 312 — Lois de probabilité, exploration d'une distribution et tests classiques

|  |  |
|---|---|
| **Matière** | Code · Langage R |
| **Cours source** | R Core Team, *An Introduction to R* 4.6.1 — chapitre 8 « Probability distributions » (§8.1 R comme jeu de tables statistiques, §8.2 examiner la distribution d'un jeu de données, §8.3 tests à un et deux échantillons) |
| **Difficulté** | Intermédiaire — peu de langage, beaucoup de fonctions à savoir nommer |
| **Temps d'étude estimé** | 1 h 30 |
| **Prérequis** | Fiches 301, 304, 306, 307 (vecteurs, facteurs, listes, `scan()`) |
| **Concepts clés** | les **quatre préfixes** `d`, `p`, `q`, `r`, le nom du premier argument, `lower.tail`, `log.p`, `log`, **fonction de hasard cumulée**, `summary()`, `fivenum()`, `stem()`, `hist()`, `density()` et **la largeur de bande**, `rug()`, `ecdf()`, `qqnorm()` / `qqline()` / `qqplot()`, `ppoints()`, `shapiro.test()`, `ks.test()`, `boxplot()`, **`t.test()` de Welch**, `var.test()`, `var.equal = TRUE`, `wilcox.test()` |
| **À retenir en priorité** | **`d`/`p`/`q`/`r` + nom de la loi** · **`t.test()` fait du Welch par défaut** · **`lower.tail = FALSE`** pour la queue droite · **le piège du `ks.test` à paramètres estimés**. |

## 🎯 Vue d'ensemble

```
QUATRE PREFIXES, UN NOM DE LOI
   d + nom   la DENSITE            1er argument : x
   p + nom   la REPARTITION P(X<=x) 1er argument : q
   q + nom   les QUANTILES          1er argument : p
   r + nom   la SIMULATION          1er argument : n
   (sauf rhyper, rsignrank, rwilcox : nn)

ARGUMENTS COMMUNS   pxxx et qxxx : lower.tail , log.p
                    dxxx         : log

EXPLORER UNE DISTRIBUTION
   les nombres    summary()   fivenum()   stem()
   la forme       hist()  +  lines(density(...))  +  rug()
   la repartition plot(ecdf(x), do.points=FALSE, verticals=TRUE)
   la normalite   qqnorm() ; qqline()      qqplot() contre une loi choisie
   les tests      shapiro.test()           ks.test()

DEUX ECHANTILLONS
   voir        boxplot(A, B)      deux ecdf superposees      qqplot(A, B)
   moyennes    t.test(A, B)                 <- WELCH par defaut
               t.test(A, B, var.equal=TRUE) <- t classique
   variances   var.test(A, B)               <- exige la NORMALITE
   sans loi    wilcox.test(A, B)            <- loi continue commune
               ks.test(A, B)                <- ecart vertical maximal des ecdf

OU SONT LES TESTS ?  « all "classical" tests ... are in package stats
                       WHICH IS NORMALLY LOADED »
```

**Le problème posé.** *« **One convenient use of R is to provide a comprehensive set of statistical tables.** »* (§8.1) Avant d'être un langage, R est ici **un formulaire** : les tables de la loi normale, de Student, du khi-deux — et de quinze autres — sont des fonctions, disponibles dans les quatre directions.

<div class="callout" data-kind="intu">

<span class="callout__lab">Intuition — pourquoi quatre fonctions par loi et pas une.</span>

Une table imprimée ne se lit que dans **un sens** : on entre par $x$ et on lit $P(X\le x)$. R fournit **les quatre trajets** — densité, répartition, quantile, simulation —, et c'est ce qui rend inutile toute table papier : $\texttt{qnorm}$ **inverse** $\texttt{pnorm}$, $\texttt{rnorm}$ **échantillonne**, $\texttt{dnorm}$ donne l'ordonnée de la courbe.

</div>

## 🔴 Concept 1 — Les quatre préfixes

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition (§8.1).</span>

*« Functions are provided to evaluate **the cumulative distribution function $P(X\le x)$**, **the probability density function** and **the quantile function** (given $q$, **the smallest $x$ such that $P(X\le x) > q$**), and **to simulate from the distribution**. »*

</div>

> **Règle (§8.1).** *« **Prefix the name given here by `d` for the density, `p` for the CDF, `q` for the quantile function and `r` for simulation (random deviates).** **The first argument is `x` for `dxxx`, `q` for `pxxx`, `p` for `qxxx` and `n` for `rxxx`** (**except for `rhyper`, `rsignrank` and `rwilcox`, for which it is `nn`**). »*

| Préfixe | Ce qu'il calcule | 1ᵉʳ argument |
|---|---|---|
| **`d`** | la **densité** | **`x`** |
| **`p`** | la **fonction de répartition**, $P(X\le x)$ | **`q`** |
| **`q`** | la **fonction quantile** | **`p`** |
| **`r`** | une **simulation** | **`n`** ( **`nn`** pour `rhyper`, `rsignrank`, `rwilcox`) |

> ⚠️ **Le nom du premier argument n'est pas décoratif.** Pour `pnorm` il s'appelle **`q`** et pour `qnorm` il s'appelle **`p`** — l'inverse de ce que l'initiale du préfixe suggère. C'est logique : `pnorm` **reçoit un quantile** et rend une probabilité ; `qnorm` **reçoit une probabilité** et rend un quantile. Cela compte dès qu'on nomme les arguments.

### 1.1 Le tableau des lois

| Loi | Nom R | Arguments supplémentaires |
|---|---|---|
| bêta | `beta` | `shape1`, `shape2`, `ncp` |
| binomiale | `binom` | `size`, `prob` |
| Cauchy | `cauchy` | `location`, `scale` |
| khi-deux | `chisq` | `df`, `ncp` |
| exponentielle | `exp` | `rate` |
| F (Fisher) | `f` | `df1`, `df2`, `ncp` |
| gamma | `gamma` | `shape`, `scale` |
| géométrique | `geom` | `prob` |
| hypergéométrique | `hyper` | `m`, `n`, `k` |
| log-normale | `lnorm` | `meanlog`, `sdlog` |
| logistique | `logis` | `location`, `scale` |
| binomiale négative | `nbinom` | `size`, `prob` |
| normale | `norm` | `mean`, `sd` |
| Poisson | `pois` | `lambda` |
| rang signé | `signrank` | `n` |
| Student | `t` | `df`, `ncp` |
| uniforme | `unif` | `min`, `max` |
| Weibull | `weibull` | `shape`, `scale` |
| Wilcoxon | `wilcox` | `m`, `n` |

⚠️ *« **In not quite all cases is the non-centrality parameter `ncp` currently available** : see the on-line help for details. »*

**Au-delà du tableau (§8.1)** : *« there are functions **`ptukey` and `qtukey`** for **the distribution of the studentized range** of samples from a normal distribution, and **`dmultinom` and `rmultinom`** for the multinomial distribution. **Further distributions are available in contributed packages, notably `SuppDists`.** »*

### 1.2 Les arguments communs, et pourquoi ils existent

> **Règle (§8.1).** *« **The `pxxx` and `qxxx` functions all have logical arguments `lower.tail` and `log.p`**, and **the `dxxx` ones have `log`**. »*

<div class="callout" data-kind="methode">

<span class="callout__lab">Méthode — ce que cela permet (§8.1).</span>

*« This allows, e.g., getting **the cumulative (or "integrated") hazard function**, $H(t) = -\log(1-F(t))$, by*

```
- pxxx(t, ..., lower.tail = FALSE, log.p = TRUE)
```

*or **more accurate log-likelihoods** (by `dxxx(..., log = TRUE)`), **directly**. »*

</div>

**Le mot important est « directly ».** L'intérêt n'est pas la concision mais **la précision numérique** :

- `lower.tail = FALSE` rend $1 - F(t)$ **calculé directement**, et non par soustraction. Quand $F(t)$ vaut $0{,}999999999$, la soustraction perd presque tous les chiffres significatifs ; le calcul direct les garde.
- `log.p = TRUE` rend **le logarithme**, calculé sans passer par la probabilité — indispensable quand celle-ci vaut $10^{-300}$ et **sous-passerait** en zéro.
- `log = TRUE` sur une densité donne des **log-vraisemblances plus précises**, ce qui importe dès qu'on somme des centaines de termes.

<div class="callout" data-kind="intu">

<span class="callout__lab">Contrôle — vérifier la formule du hasard cumulé.</span>

Par définition $H(t) = -\log\bigl(1-F(t)\bigr)$, où $1-F(t) = P(X>t)$ est **la queue supérieure**. Or `pxxx(t, lower.tail = FALSE)` **est** cette queue, et `log.p = TRUE` en donne le logarithme. Le signe moins devant l'appel complète la formule.

</div>

**Les deux exemples du cours (§8.1) :**

```
## valeur p bilaterale pour une loi de Student
2*pt(-2.43, df = 13)

## point superieur a 1 % pour une loi F(2, 7)
qf(0.01, 2, 7, lower.tail = FALSE)
```

<div class="callout" data-kind="intu">

<span class="callout__lab">Contrôle — lire ces deux lignes.</span>

La première : $P(T \le -2{,}43)$ pour $13$ degrés de liberté, **doublé** — la loi de Student étant **symétrique**, la valeur $p$ bilatérale est deux fois la queue inférieure au point négatif. La seconde : `lower.tail = FALSE` inverse le sens, donc `qf(0.01, ..., lower.tail = FALSE)` rend le point tel que **1 % de la masse est au-dessus** — le « point supérieur à 1 % ». Sans cet argument, on obtiendrait le point à 1 % **par le bas**.

</div>

*« See the on-line help on **`RNG`** for how random-number generation is done in R. »*

## 🔴 Concept 2 — Examiner la distribution d'un échantillon

> **Cadrage (§8.2).** *« Given a (univariate) set of data we can examine its distribution in **a large number of ways**. **The simplest is to examine the numbers.** »*

### 2.1 Les résumés numériques

```
attach(faithful)
summary(eruptions)
#    Min. 1st Qu.  Median    Mean 3rd Qu.    Max.
#   1.600   2.163   4.000   3.488   4.454   5.100

fivenum(eruptions)
# [1] 1.6000 2.1585 4.0000 4.4585 5.1000
```

*« **Two slightly different summaries are given by `summary` and `fivenum`** and a display of the numbers by **`stem`** (a **"stem and leaf" plot**). »*

<div class="callout" data-kind="intu">

<span class="callout__lab">En clair — pourquoi « slightly different ».</span>

Les deux rendent minimum, quartiles, médiane et maximum ; les valeurs diffèrent légèrement (**2,163 contre 2,1585**, **4,454 contre 4,4585**). `summary` utilise la définition de quantile par défaut de R, `fivenum` **le résumé de Tukey** (les « charnières »), qui se calcule autrement. Ni l'un ni l'autre n'est faux — ce sont **deux conventions**.

⚠️ Et `summary` donne **la moyenne** ; `fivenum` **non**. Sur ces données, moyenne **3,488** contre médiane **4,000** : l'écart signale déjà une distribution **non symétrique**.

</div>

<details class="details--riche">
<summary>

**Le diagramme à tiges et feuilles du cours, et comment le lire**

</summary>

```
> stem(eruptions)

  The decimal point is 1 digit(s) to the left of the |

  16 | 070355555588
  18 | 000022233333335577777777888822335777888
  20 | 00002223378800035778
  22 | 0002335578023578
  24 | 00228
  26 | 23
  28 | 080
  30 | 7
  32 | 2337
  34 | 250077
  36 | 0000823577
  38 | 2333335582225577
  40 | 0000003357788888002233555577778
  42 | 03335555778800233333555577778
  44 | 02222335557780000000023333357778888
  46 | 0000233357700000023578
  48 | 00000022335800333
  50 | 0370
```

*Étape 1 — lire l'échelle.* *« The decimal point is **1 digit(s) to the left of the `|`** »* : la tige `16` se lit **1,6**, la tige `50` se lit **5,0**.

*Étape 2 — lire une ligne.* `16 | 070355555588` signifie douze observations comprises entre 1,60 et 1,69 : 1,60 · 1,67 · 1,60 · 1,63 · 1,65 (×5) · 1,68 (×2).

*Étape 3 — voir la forme.* Deux zones denses — autour de **1,8-2,2** et autour de **4,0-4,8** — séparées par une zone presque vide entre **2,6 et 3,4**. **La distribution est bimodale.**

*Étape 4 — la conséquence.* Le cours l'énonce plus loin : *« **This distribution is obviously far from any standard distribution.** »* Aucun ajustement d'une loi usuelle n'a de sens **sur l'ensemble** — d'où l'idée de n'en étudier **qu'un mode**.

*Étape 5 — pourquoi ce diagramme et pas un histogramme.* *« **A stem-and-leaf plot is like a histogram** »*, mais il **conserve les chiffres** : on y lit les valeurs individuelles, et donc les arrondis, les répétitions, les valeurs aberrantes. C'est un histogramme **qui n'a rien perdu**.

</details>

### 2.2 Les vues graphiques

```
hist(eruptions)
## des classes plus fines, et un trace de densite
hist(eruptions, seq(1.6, 5.2, 0.2), prob = TRUE)
lines(density(eruptions, bw = 0.1))
rug(eruptions)   # montrer les points de donnees reels
```

> **Trois précisions du cours (§8.2).**
>
> - *« **More elegant density plots can be made by `density`** »*.
> - *« **The bandwidth `bw` was chosen by trial-and-error as the default gives too much smoothing (it usually does for "interesting" densities).** »*
> - *« **Better automated methods of bandwidth choice are available, and in this example `bw = "SJ"` gives a good result.** »*

**La largeur de bande est le paramètre décisif d'une estimation de densité.** Trop grande, elle lisse les deux modes en un seul — c'est précisément ce que fait le défaut ici, et le cours en avertit. Trop petite, elle transforme le bruit en structure. Le cours donne les deux voies : **l'essai** (`bw = 0.1`) et **une règle automatique** (`bw = "SJ"`).

⚠️ **`prob = TRUE` est indispensable** avant de superposer une densité : sans lui, l'histogramme affiche des **effectifs**, et la courbe de densité — d'intégrale 1 — serait invisible à côté.

**La fonction de répartition empirique :**

```
plot(ecdf(eruptions), do.points = FALSE, verticals = TRUE)
```

### 2.3 Ajuster une loi à un mode

<div class="callout" data-kind="methode">

<span class="callout__lab">Méthode (§8.2).</span>

*« **This distribution is obviously far from any standard distribution. How about the right-hand mode, say eruptions of longer than 3 minutes? Let us fit a normal distribution and overlay the fitted CDF.** »*

</div>

```
long <- eruptions[eruptions > 3]
plot(ecdf(long), do.points = FALSE, verticals = TRUE)
x <- seq(3, 5.4, 0.01)
lines(x, pnorm(x, mean = mean(long), sd = sqrt(var(long))), lty = 3)
```

<div class="callout" data-kind="intu">

<span class="callout__lab">Contrôle — lire les trois arguments de pnorm.</span>

`x` est le vecteur de quantiles (le premier argument, nommé `q`) ; `mean` et `sd` sont **estimés sur l'échantillon**. Et `sd = sqrt(var(long))` : le cours passe par **`var`** puis la racine — équivalent à `sd(long)`, mais explicite sur ce qui est calculé. `lty = 3` trace **en pointillé**, pour distinguer l'ajustement des données.

</div>

**Les diagrammes quantile-quantile :**

```
par(pty = "s")            # une region de trace CARREE
qqnorm(long); qqline(long)
```

*« **This shows a reasonable fit but a shorter right tail than one would expect from a normal distribution.** »*

⚠️ `par(pty = "s")` **n'est pas cosmétique** dans un Q-Q : une région carrée est ce qui permet de juger l'alignement sur la diagonale **sans distorsion d'échelle**. Et il faudra le restaurer (fiche 314).

**La comparaison avec une loi connue (§8.2) :**

```
x <- rt(250, df = 5)
qqnorm(x); qqline(x)
```

*« which will **usually (if it is a random sample) show longer tails than expected for a normal** »*.

```
qqplot(qt(ppoints(250), df = 5), x, xlab = "Q-Q plot for t dsn")
qqline(x)
```

*« **We can make a Q-Q plot against the generating distribution** »* — c'est-à-dire comparer l'échantillon **à la loi dont il sort**, et non à la normale. **`ppoints(250)`** fabrique les 250 probabilités théoriques, `qt(...)` les convertit en quantiles de Student.

### 2.4 Les tests de normalité

```
shapiro.test(long)
#   Shapiro-Wilk normality test
#   data:  long
#   W = 0.9793, p-value = 0.01052

ks.test(long, "pnorm", mean = mean(long), sd = sqrt(var(long)))
#   One-sample Kolmogorov-Smirnov test
#   data:  long
#   D = 0.0661, p-value = 0.4284
#   alternative hypothesis: two.sided
```

> ⚠️ **La mise en garde du cours, à ne jamais oublier (§8.2).** *« (**Note that the distribution theory is not valid here as we have estimated the parameters of the normal distribution from the same sample.**) »*
>
> Le test de Kolmogorov-Smirnov suppose la loi de référence **entièrement spécifiée à l'avance**. Ici, `mean` et `sd` viennent **des données testées** : l'ajustement est meilleur qu'il ne devrait, la statistique $D$ est **trop petite**, et la valeur $p$ **trop grande**. Le test est **conservateur au mauvais sens** — il accepte trop facilement.
>
> **C'est ce qui explique la contradiction apparente** entre les deux résultats : Shapiro-Wilk rejette ($p = 0{,}0105$), Kolmogorov-Smirnov non ($p = 0{,}428$). Le premier est **conçu** pour des paramètres estimés ; le second ne l'est pas.

## 🔴 Concept 3 — Comparer deux échantillons

> **Cadrage (§8.3).** *« So far we have compared a single sample to a normal distribution. **A much more common operation is to compare aspects of two samples.** **Note that in R, all "classical" tests including the ones used below are in package `stats` which is normally loaded.** »*

**Les données du cours** — *« on the latent heat of the fusion of ice (cal/gm) from Rice (1995, p. 490) »* :

```
A <- scan()
79.98 80.04 80.02 80.04 80.03 80.03 80.04 79.97
80.05 80.03 80.02 80.00 80.02

B <- scan()
80.02 79.94 79.98 79.97 79.97 80.03 79.95 79.97

boxplot(A, B)
```

⚠️ **Noter l'usage de `scan()` sans argument** : c'est l'idiome de la fiche 307 — `stdin()` désigne **le fichier de script**, donc les données suivent directement dans le source.

*« **The plot indicates that the first group tends to give higher results than the second.** »*

### 3.1 Comparer les moyennes

```
t.test(A, B)
#         Welch Two Sample t-test
#   data:  A and B
#   t = 3.2499, df = 12.027, p-value = 0.00694
#   alternative hypothesis: true difference in means is not equal to 0
#   95 percent confidence interval:
#    0.01385526 0.07018320
#   sample estimates:
#   mean of x mean of y
#    80.02077  79.97875
```

> ⚠️ **La phrase décisive (§8.3).** *« which does indicate **a significant difference, assuming normality**. **By default the R function does not assume equality of variances in the two samples.** »*
>
> **`t.test(A, B)` fait du Welch, pas du Student classique.** C'est ce que révèle le titre de la sortie, et surtout **le degré de liberté non entier : `df = 12.027`**. Un $t$ classique aurait $n_A + n_B - 2 = 13 + 8 - 2 = \mathbf{19}$ degrés de liberté. **Le df fractionnaire est la signature de Welch.**

### 3.2 Vérifier l'égalité des variances

```
var.test(A, B)
#         F test to compare two variances
#   data:  A and B
#   F = 0.5837, num df = 12, denom df = 7, p-value = 0.3938
#   alternative hypothesis: true ratio of variances is not equal to 1
#   95 percent confidence interval:
#    0.1251097 2.1052687
#   sample estimates:
#   ratio of variances
#            0.5837405
```

*« We can use **the F test to test for equality in the variances, provided that the two samples are from normal populations** … which shows **no evidence of a significant difference**, and so **we can use the classical t-test that assumes equality of the variances**. »*

<div class="callout" data-kind="intu">

<span class="callout__lab">Contrôle — vérifier les degrés de liberté.</span>

`num df = 12` et `denom df = 7` : ce sont $n_A - 1 = 13-1 = 12$ et $n_B - 1 = 8-1 = 7$. Cela confirme au passage que **A a 13 valeurs et B en a 8**.

</div>

### 3.3 Le t classique

```
t.test(A, B, var.equal = TRUE)
#         Two Sample t-test
#   data:  A and B
#   t = 3.4722, df = 19, p-value = 0.002551
#   95 percent confidence interval:
#    0.01669058 0.06734788
```

<div class="callout" data-kind="intu">

<span class="callout__lab">Contrôle — la cohérence de toute la section.</span>

Le degré de liberté vaut maintenant **19**, soit $13 + 8 - 2$.

Et l'intervalle est **centré sur la différence des moyennes** : $\frac{0{,}01669058 + 0{,}06734788}{2} = 0{,}04201923$, tandis que $80{,}02077 - 79{,}97875 = 0{,}04202$. Les deux sorties se recoupent.

**L'intervalle de Welch est plus large** ($0{,}0563$ contre $0{,}0507$) et la valeur $p$ plus grande ($0{,}0069$ contre $0{,}0026$) : ne pas supposer l'égalité des variances **coûte de la puissance**. C'est le prix d'une hypothèse en moins.

</div>

### 3.4 Sans hypothèse de loi

```
wilcox.test(A, B)
#         Wilcoxon rank sum test with continuity correction
#   data:  A and B
#   W = 89, p-value = 0.007497
#   alternative hypothesis: true location shift is not equal to 0
#
#   Warning message:
#   Cannot compute exact p-value with ties in: wilcox.test(A, B)
```

> **Règle (§8.3).** *« **All these tests assume normality of the two samples.** **The two-sample Wilcoxon (or Mann-Whitney) test only assumes a common continuous distribution under the null hypothesis.** »*

> ⚠️ **L'avertissement est une information, pas une nuisance (§8.3).** *« **Note the warning : there are several ties in each sample, which suggests strongly that these data are from a discrete distribution (probably due to rounding).** »*
>
> Le test suppose une loi **continue** — donc **aucune égalité** entre observations. Les ex æquo présents prouvent que l'hypothèse est violée. Le cours en tire une **conclusion sur les données** : elles sont arrondies au centième. **L'avertissement du logiciel devient un diagnostic statistique.**

**Comparer graphiquement, et le test de Kolmogorov-Smirnov à deux échantillons :**

```
plot(ecdf(A), do.points = FALSE, verticals = TRUE, xlim = range(A, B))
plot(ecdf(B), do.points = FALSE, verticals = TRUE, add = TRUE)

ks.test(A, B)
#         Two-sample Kolmogorov-Smirnov test
#   data:  A and B
#   D = 0.5962, p-value = 0.05919
#
#   Warning message:
#   cannot compute correct p-values with ties in: ks.test(A, B)
```

*« **The Kolmogorov-Smirnov test is of the maximal vertical distance between the two ecdfs, assuming a common continuous distribution.** »* — **même avertissement d'ex æquo, même cause**.

⚠️ **`xlim = range(A, B)`** avant `add = TRUE` : sans lui, la seconde courbe pourrait sortir du cadre fixé par la première. C'est le `range` de la fiche 301, ici employé sur **deux** vecteurs à la fois — `max`/`min` acceptant plusieurs arguments.

<details class="details--riche">
<summary>

**Exercice résolu — reconstituer le raisonnement complet du §8.3**

</summary>

**Énoncé.** À partir des deux séries de mesures de chaleur latente, retracer la démarche du cours : quelles questions, dans quel ordre, et pourquoi.

*Étape 1 — regarder avant de tester.* `boxplot(A, B)`. *« The plot indicates that **the first group tends to give higher results than the second**. »* **On formule l'hypothèse à partir du graphique**, on ne la teste pas encore.

*Étape 2 — le test le plus robuste d'abord.* `t.test(A, B)` sans option. Résultat : $t = 3{,}2499$, $\mathrm{df} = 12{,}027$, $p = 0{,}00694$. **Différence significative** — *« assuming normality »*.

*Étape 3 — comprendre ce qui vient d'être fait.* Le `df = 12,027` **non entier** signale Welch : *« **By default the R function does not assume equality of variances** »*. R a choisi, sans le demander, **la variante prudente**.

*Étape 4 — peut-on faire mieux ?* Si les variances sont égales, le test classique est **plus puissant**. On teste donc l'hypothèse : `var.test(A, B)` → $F = 0{,}5837$, $p = 0{,}3938$. *« **provided that the two samples are from normal populations** »* — le test F **ajoute** une hypothèse de normalité.

*Étape 5 — appliquer le test classique.* `t.test(A, B, var.equal = TRUE)` → $t = 3{,}4722$, $\mathrm{df} = 19$, $p = 0{,}002551$.

*Étape 6 — comparer les deux conclusions.*

|  | Welch | Classique |
|---|---|---|
| df | **12,027** | **19** |
| $t$ | 3,2499 | 3,4722 |
| $p$ | 0,00694 | **0,002551** |
| Largeur de l'IC | 0,0563 | **0,0507** |

**La même conclusion, avec plus de puissance** — au prix d'une hypothèse supplémentaire, elle-même vérifiée sous une autre hypothèse. **La chaîne d'hypothèses s'allonge à mesure qu'on gagne en précision.**

*Étape 7 — se passer de la normalité.* `wilcox.test(A, B)` → $W = 89$, $p = 0{,}007497$. *« **only assumes a common continuous distribution** »*. **Conclusion inchangée** — ce qui est rassurant : le résultat ne dépend pas de la normalité.

*Étape 8 — lire l'avertissement.* *« there are **several ties in each sample**, which **suggests strongly that these data are from a discrete distribution (probably due to rounding)** »*. Les données sont au **centième** près. L'hypothèse de continuité est violée — pour Wilcoxon **comme** pour Kolmogorov-Smirnov, qui émet le même avertissement.

*Étape 9 — le dernier regard.* Deux `ecdf` superposées, et `ks.test(A, B)` → $D = 0{,}5962$, $p = 0{,}05919$. **Non significatif au seuil de 5 %** — le KS à deux échantillons teste **toute différence de loi**, pas seulement un décalage de position ; il est donc **moins puissant** contre une alternative de décalage. Trois tests, trois valeurs $p$, une seule conclusion à formuler prudemment.

*Étape 10 — la leçon de méthode.* Le cours ne présente pas un test, mais **une démarche** : voir, tester au plus robuste, vérifier si l'on peut resserrer, confirmer sans hypothèse de loi, **et lire les avertissements comme des résultats**.

</details>

## Comment reconnaître le type d'exercice

| Le signal dans l'énoncé | Ce qu'il faut mobiliser |
|---|---|
| « la probabilité que $X \le a$ » | **`p` + nom de loi** |
| « la valeur telle que 5 % soient au-dessus » | **`q` + nom**, avec **`lower.tail = FALSE`** |
| « tracer la courbe de densité théorique » | **`d` + nom** |
| « simuler un échantillon » | **`r` + nom** |
| « une valeur $p$ bilatérale » | **2 ×** la queue, si la loi est **symétrique** |
| « une probabilité minuscule » | **`log.p = TRUE`** — sinon sous-passement |
| « la fonction de hasard cumulée » | `-pxxx(t, lower.tail = FALSE, log.p = TRUE)` |
| « une log-vraisemblance » | **`dxxx(..., log = TRUE)`** |
| « résumer un échantillon » | **`summary()`**, **`fivenum()`**, **`stem()`** |
| « la forme de la distribution » | **`hist()`** + `density()` + `rug()` |
| « ma densité estimée n'a qu'un mode » | la **largeur de bande** est trop grande |
| « la répartition empirique » | **`ecdf()`** |
| « est-ce normal ? » — visuellement | **`qqnorm()` / `qqline()`** |
| « est-ce normal ? » — formellement | **`shapiro.test()`** |
| « comparer à une loi donnée » | **`ks.test(x, "pnorm", ...)`** |
| « comparer à la loi qui a engendré » | `qqplot(qt(ppoints(n), df), x)` |
| « comparer deux moyennes » | **`t.test(A, B)`** — Welch par défaut |
| « les variances sont-elles égales ? » | **`var.test()`** — exige la normalité |
| « un df non entier » | c'est **Welch** |
| « sans hypothèse de normalité » | **`wilcox.test()`** |
| « comparer deux lois entières » | **`ks.test(A, B)`** |
| « avertissement d'ex æquo » | les données sont **discrètes ou arrondies** |

## Comment résoudre ce type d'exercice

**Protocole « lire une table statistique » — 4 étapes.**

1. **Choisir le préfixe** selon ce qu'on cherche : `d` densité, `p` probabilité, `q` quantile, `r` simulation.
2. **Ajouter le nom de la loi** et **ses paramètres** (colonne « arguments supplémentaires »).
3. **Choisir la queue** : `lower.tail = FALSE` pour la queue droite — plus précis qu'un `1 - p`.
4. Si la probabilité risque d'être extrême, **passer en logarithme** (`log.p`, `log`).

**Protocole « explorer une distribution » — 5 étapes.**

1. **Les nombres** : `summary()` — et comparer **moyenne et médiane** pour détecter l'asymétrie.
2. **Le détail** : `stem()`, qui conserve les chiffres et révèle arrondis et multimodalité.
3. **La forme** : `hist(..., prob = TRUE)` + `lines(density(..., bw = ...))` + `rug()`. **Toujours régler la bande.**
4. **La répartition** : `plot(ecdf(x), do.points = FALSE, verticals = TRUE)`.
5. **La normalité** : `qqnorm()`/`qqline()` d'abord — puis `shapiro.test()` si un chiffre est exigé.

**Protocole « comparer deux échantillons » — 5 étapes.**

1. **Regarder** : `boxplot(A, B)`, deux `ecdf` superposées, `qqplot(A, B)`.
2. **`t.test(A, B)`** — c'est **du Welch**, donc l'hypothèse la plus faible.
3. Si l'on veut le test classique : **`var.test()`** d'abord, puis `t.test(..., var.equal = TRUE)`.
4. **`wilcox.test(A, B)`** pour se passer de la normalité.
5. **Lire les avertissements** : les ex æquo disent quelque chose **sur les données**.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Confondre `pnorm` et `qnorm` | `p` **rend** une probabilité, `q` **rend** un quantile |
| Nommer `p = ` le premier argument de `pnorm` | il s'appelle **`q`** |
| Utiliser `n` pour `rhyper`, `rsignrank`, `rwilcox` | c'est **`nn`** |
| Écrire `1 - pnorm(x)` | **`pnorm(x, lower.tail = FALSE)`** est plus précis |
| Calculer `log(dnorm(x))` | **`dnorm(x, log = TRUE)`** évite le sous-passement |
| Oublier `lower.tail = FALSE` pour un point supérieur | on obtient le point **inférieur** |
| Croire `summary` et `fivenum` identiques | *« **slightly different** »* — deux conventions de quantile |
| Se fier au `bw` par défaut de `density` | *« **gives too much smoothing** »* — essayer, ou `bw = "SJ"` |
| Superposer une densité sans `prob = TRUE` | l'histogramme est en **effectifs** |
| Faire un Q-Q sans région carrée | `par(pty = "s")` — sinon l'alignement est illisible |
| Utiliser `ks.test` avec des paramètres estimés | *« **the distribution theory is not valid** »* |
| Croire `t.test(A, B)` classique | c'est **du Welch** — voir le **df non entier** |
| Utiliser `var.test` sans penser à la normalité | *« **provided that the two samples are from normal populations** »* |
| Ignorer un avertissement d'ex æquo | il révèle des données **discrètes ou arrondies** |
| Croire `wilcox.test` sans hypothèse | il suppose **une loi continue commune** |
| Superposer deux `ecdf` sans `xlim` | la seconde peut **sortir du cadre** |
| Chercher à charger un paquet pour les tests | ils sont dans **`stats`**, *« normally loaded »* |

## 📌 Ultimate Review

**Les quatre préfixes.** **`d`** densité (1ᵉʳ arg. **`x`**) · **`p`** répartition $P(X\le x)$ (1ᵉʳ arg. **`q`**) · **`q`** quantile — *« the **smallest $x$** such that $P(X\le x) > q$ »* (1ᵉʳ arg. **`p`**) · **`r`** simulation (1ᵉʳ arg. **`n`**, **`nn`** pour `rhyper`, `rsignrank`, `rwilcox`).

**Les dix-neuf lois.** `beta` `binom` `cauchy` `chisq` `exp` `f` `gamma` `geom` `hyper` `lnorm` `logis` `nbinom` `norm` `pois` `signrank` `t` `unif` `weibull` `wilcox` · **`ncp` n'est pas partout disponible** · en plus : **`ptukey`/`qtukey`** (étendue studentisée), **`dmultinom`/`rmultinom`** ; ailleurs, **`SuppDists`**.

**Arguments communs.** `pxxx` et `qxxx` : **`lower.tail`**, **`log.p`** · `dxxx` : **`log`** · usage : **fonction de hasard cumulée** $H(t) = -\log(1-F(t))$ par `-pxxx(t, lower.tail = FALSE, log.p = TRUE)`, et **log-vraisemblances plus exactes** par `dxxx(..., log = TRUE)` — *« **directly** »*, donc **sans perte de précision**.

**Deux exemples.** `2*pt(-2.43, df = 13)` — valeur $p$ **bilatérale** · `qf(0.01, 2, 7, lower.tail = FALSE)` — **point supérieur à 1 %**. Génération aléatoire : voir **`RNG`**.

**Résumés numériques.** **`summary`** (avec la **moyenne**) · **`fivenum`** (résumé de Tukey, *« slightly different »*) · **`stem`** — un histogramme **qui conserve les chiffres**. Sur `eruptions` : min **1,600**, médiane **4,000**, moyenne **3,488**, max **5,100** ; `fivenum` donne **2,1585** et **4,4585** là où `summary` donne **2,163** et **4,454**.

**Graphiques.** `hist(x, seq(...), prob = TRUE)` + `lines(density(x, bw = ...))` + **`rug(x)`** · *« the default **gives too much smoothing** (it usually does for "interesting" densities) »*, et **`bw = "SJ"`** est cité comme bon choix ici · `plot(ecdf(x), do.points = FALSE, verticals = TRUE)` · **`par(pty = "s")`** avant un Q-Q · `qqnorm` / `qqline` / `qqplot` / **`ppoints`**.

**Tests d'ajustement.** **`shapiro.test(long)`** → $W = 0{,}9793$, $p = 0{,}01052$ · **`ks.test(long, "pnorm", ...)`** → $D = 0{,}0661$, $p = 0{,}4284$ · *« **the distribution theory is not valid here as we have estimated the parameters of the normal distribution from the same sample** »* — d'où la divergence entre les deux.

**Où sont les tests.** *« all "classical" tests … are in **package `stats` which is normally loaded** »*.

**Deux échantillons.** **`boxplot(A, B)`** pour voir · **`t.test(A, B)`** → **Welch**, $t = 3{,}2499$, **df = 12,027**, $p = 0{,}00694$ — *« **By default the R function does not assume equality of variances** »* · **`var.test(A, B)`** → $F = 0{,}5837$, df **12** et **7**, $p = 0{,}3938$, *« **provided that the two samples are from normal populations** »* · **`t.test(A, B, var.equal = TRUE)`** → $t = 3{,}4722$, **df = 19**, $p = 0{,}002551$ · **`wilcox.test(A, B)`** → $W = 89$, $p = 0{,}007497$, *« **only assumes a common continuous distribution** »* · **`ks.test(A, B)`** → $D = 0{,}5962$, $p = 0{,}05919$, *« **the maximal vertical distance between the two ecdfs** »*.

**Moyennes.** $\bar A = 80{,}02077$, $\bar B = 79{,}97875$, différence $0{,}04202$ — centre des deux intervalles de confiance.

⚠️ **L'avertissement des ex æquo.** *« there are **several ties in each sample**, which **suggests strongly that these data are from a discrete distribution (probably due to rounding)** »* — **un message du logiciel qui est un résultat statistique**.

## 🧠 Active Recall

<details><summary>Quels sont les quatre préfixes, et quel est le premier argument de chacun ?</summary>

*« **Prefix the name … by `d` for the density, `p` for the CDF, `q` for the quantile function and `r` for simulation (random deviates).** **The first argument is `x` for `dxxx`, `q` for `pxxx`, `p` for `qxxx` and `n` for `rxxx`** (**except for `rhyper`, `rsignrank` and `rwilcox`, for which it is `nn`**). »* (§8.1)

| Préfixe | Calcule | 1ᵉʳ argument |
|---|---|---|
| `d` | la **densité** | `x` |
| `p` | $P(X\le x)$ | **`q`** |
| `q` | le **quantile** | **`p`** |
| `r` | une **simulation** | `n` (ou `nn`) |

⚠️ **Le croisement est délibéré** : `pnorm` **reçoit** un quantile, `qnorm` **reçoit** une probabilité. Le nom de l'argument décrit **ce qui entre**, le préfixe **ce qui sort**.

</details>

<details><summary>Comment obtient-on la fonction de hasard cumulée, et pourquoi pas par soustraction ?</summary>

*« This allows, e.g., getting **the cumulative (or "integrated") hazard function**, $H(t) = -\log(1-F(t))$, by*

```
- pxxx(t, ..., lower.tail = FALSE, log.p = TRUE)
```

*or **more accurate log-likelihoods** (by `dxxx(..., log = TRUE)`), **directly**. »* (§8.1)

**Pourquoi pas `-log(1 - pxxx(t))`.** Le mot du cours est **« directly »**, et l'enjeu est **numérique** :

- quand $F(t) \approx 0{,}999999999$, la soustraction $1 - F(t)$ **perd presque tous les chiffres significatifs** ; `lower.tail = FALSE` calcule la queue **sans soustraire** ;
- quand cette queue vaut $10^{-320}$, elle **sous-passe** en zéro et le logarithme vaut $-\infty$ ; `log.p = TRUE` rend **le logarithme directement**, sans passer par la probabilité.

</details>

<details><summary>Lire les deux exemples du §8.1.</summary>

```
2*pt(-2.43, df = 13)                  # valeur p bilaterale
qf(0.01, 2, 7, lower.tail = FALSE)    # point superieur a 1 % d'une F(2,7)
```

**Le premier** : `pt(-2.43, df = 13)` est $P(T \le -2{,}43)$, la queue **inférieure**. La loi de Student étant **symétrique**, la valeur $p$ bilatérale est **le double**.

**Le second** : sans `lower.tail = FALSE`, `qf(0.01, 2, 7)` rendrait le point tel que **1 % de la masse est en dessous**. L'argument **inverse le sens** : on obtient le point tel que 1 % est **au-dessus** — le « point supérieur à 1 % », soit le quantile à 99 %.

</details>

<details class="details--riche">
<summary>

Quelle différence entre `summary()` et `fivenum()` ?

</summary>

*« **Two slightly different summaries are given by `summary` and `fivenum`** »* (§8.2).

```
summary(eruptions)
#    Min. 1st Qu.  Median    Mean 3rd Qu.    Max.
#   1.600   2.163   4.000   3.488   4.454   5.100
fivenum(eruptions)
# [1] 1.6000 2.1585 4.0000 4.4585 5.1000
```

**Deux différences.** (1) Les quartiles diffèrent — **2,163 contre 2,1585**, **4,454 contre 4,4585** : `summary` utilise la définition de quantile par défaut de R, `fivenum` **les charnières de Tukey**. Ni l'un ni l'autre n'est faux. (2) **`summary` donne la moyenne**, `fivenum` non.

⚠️ Et la comparaison **moyenne 3,488 / médiane 4,000** signale déjà une distribution **non symétrique** — ce que `stem()` confirmera en montrant **deux modes**.

</details>

<details class="details--riche">
<summary>

Que dit le cours de la largeur de bande de `density()` ?

</summary>

⚠️ *« **The bandwidth `bw` was chosen by trial-and-error as the default gives too much smoothing (it usually does for "interesting" densities).** **Better automated methods of bandwidth choice are available, and in this example `bw = "SJ"` gives a good result.** »* (§8.2)

**C'est le paramètre décisif.** Trop grand, il **lisse les deux modes en un seul** — exactement ce que fait le défaut sur `eruptions`, dont la bimodalité est le fait saillant. Trop petit, il transforme le bruit en structure.

Deux voies : **l'essai** (`bw = 0.1` ici) ou **une règle automatique** (`bw = "SJ"`).

⚠️ Et `hist(..., prob = TRUE)` est requis avant `lines(density(...))` : sinon l'histogramme est en **effectifs** et la densité, d'intégrale 1, sera invisible.

</details>

<details><summary>Pourquoi le cours n'ajuste-t-il une loi normale qu'à une partie des données ?</summary>

Parce que *« **This distribution is obviously far from any standard distribution.** »* — `stem()` révèle **deux modes**, séparés par une zone presque vide entre 2,6 et 3,4.

*« **How about the right-hand mode, say eruptions of longer than 3 minutes ? Let us fit a normal distribution and overlay the fitted CDF.** »* (§8.2)

```
long <- eruptions[eruptions > 3]
plot(ecdf(long), do.points = FALSE, verticals = TRUE)
x <- seq(3, 5.4, 0.01)
lines(x, pnorm(x, mean = mean(long), sd = sqrt(var(long))), lty = 3)
```

**La leçon de méthode** : on n'ajuste pas une loi unimodale à des données bimodales. **On isole d'abord le mode**, puis on ajuste. Le filtrage se fait par indexation logique (fiche 302).

</details>

<details><summary>Pourquoi Shapiro-Wilk rejette-t-il la normalité et Kolmogorov-Smirnov non ?</summary>

Les deux résultats du cours :

```
shapiro.test(long)   W = 0.9793, p-value = 0.01052   -> rejette a 5 %
ks.test(long, "pnorm", mean = mean(long), sd = sqrt(var(long)))
                     D = 0.0661, p-value = 0.4284    -> ne rejette pas
```

⚠️ **La cause est donnée par le cours lui-même** : *« (**Note that the distribution theory is not valid here as we have estimated the parameters of the normal distribution from the same sample.**) »*

Le test de Kolmogorov-Smirnov suppose la loi de référence **entièrement spécifiée d'avance**. Ici `mean` et `sd` viennent **des données testées** : l'ajustement est **artificiellement bon**, $D$ **trop petit**, $p$ **trop grand**. Shapiro-Wilk, lui, **est conçu** pour des paramètres estimés.

**En cas de désaccord, c'est Shapiro-Wilk qu'il faut croire ici.**

</details>

<details class="details--riche">
<summary>

Quel test `t.test(A, B)` effectue-t-il par défaut, et à quoi le voit-on ?

</summary>

⚠️ *« **By default the R function does not assume equality of variances in the two samples.** »* (§8.3)

C'est **le test de Welch**, et deux indices le montrent dans la sortie :

1. le **titre** : `Welch Two Sample t-test` ;
2. surtout, **le degré de liberté non entier** : `df = 12.027`.

Un $t$ classique aurait $n_A + n_B - 2 = 13 + 8 - 2 = \mathbf{19}$ degrés de liberté — c'est bien ce qu'affiche `t.test(A, B, var.equal = TRUE)`.

**Le df fractionnaire est la signature de Welch**, et le moyen le plus rapide de savoir quel test on a réellement lancé.

</details>

<details><summary>Comparer les deux versions du test t sur les données du cours. Que coûte l'hypothèse en moins ?</summary>

|  | Welch | Classique (`var.equal = TRUE`) |
|---|---|---|
| df | **12,027** | **19** |
| $t$ | 3,2499 | 3,4722 |
| $p$ | 0,00694 | **0,002551** |
| IC à 95 % | $[0{,}01386\,;\,0{,}07018]$ | $[0{,}01669\,;\,0{,}06735]$ |
| Largeur | 0,0563 | **0,0507** |

**Même conclusion, puissance différente.** Ne pas supposer l'égalité des variances **coûte des degrés de liberté**, donc élargit l'intervalle et augmente la valeur $p$.

**Contrôle de cohérence** : les deux intervalles sont centrés sur $\frac{0{,}01669+0{,}06735}{2} = 0{,}04202$, qui est bien $80{,}02077 - 79{,}97875$.

Et le chemin pour passer de l'un à l'autre est `var.test(A, B)` → $p = 0{,}3938$, *« **no evidence of a significant difference** »*.

</details>

<details class="details--riche">
<summary>

Que suppose `wilcox.test`, et que signifie son avertissement ?

</summary>

*« **All these tests assume normality of the two samples. The two-sample Wilcoxon (or Mann-Whitney) test only assumes a common continuous distribution under the null hypothesis.** »* (§8.3)

Résultat : $W = 89$, $p = 0{,}007497$ — **même conclusion** que le test $t$, sans hypothèse de normalité.

⚠️ **L'avertissement est un résultat** : *« Note the warning : **there are several ties in each sample, which suggests strongly that these data are from a discrete distribution (probably due to rounding)**. »*

Le test suppose une loi **continue**, donc **aucune égalité** entre observations. Les ex æquo prouvent que l'hypothèse est violée — et le cours en tire une **conclusion sur les données** : elles sont arrondies au centième. **Le même avertissement apparaît pour `ks.test(A, B)`, pour la même raison.**

</details>

<details class="details--riche">
<summary>

Que teste `ks.test` à deux échantillons, et pourquoi sa valeur p est-elle plus grande ici ?

</summary>

*« **The Kolmogorov-Smirnov test is of the maximal vertical distance between the two ecdfs, assuming a common continuous distribution.** »* (§8.3)

```
ks.test(A, B)   D = 0.5962, p-value = 0.05919
```

**Non significatif à 5 %**, alors que le test $t$ donnait $p = 0{,}0026$ et Wilcoxon $p = 0{,}0075$.

**La raison est la nature de l'alternative.** Le KS teste **toute différence entre les deux lois** — forme, dispersion, position. Contre une alternative précise de **décalage de position**, il est donc **moins puissant** qu'un test conçu pour elle. Un test général paie sa généralité en puissance.

⚠️ Et le même avertissement d'ex æquo s'applique : *« cannot compute correct p-values with ties »*.

</details>

<details><summary>Comment compare-t-on graphiquement deux échantillons ?</summary>

Le cours donne **trois** voies (§8.3) :

1. **Boîtes à moustaches** : `boxplot(A, B)` — *« We have already seen a pair of boxplots. »*
2. **Deux répartitions empiriques superposées** :

```
plot(ecdf(A), do.points = FALSE, verticals = TRUE, xlim = range(A, B))
plot(ecdf(B), do.points = FALSE, verticals = TRUE, add = TRUE)
```

3. **`qqplot`** — *« `qqplot` will perform a Q-Q plot of the two samples »*.

⚠️ **`xlim = range(A, B)` est indispensable** : la première courbe fixe le cadre, et sans un domaine couvrant **les deux** échantillons, la seconde en sortirait. Noter que `range` accepte **plusieurs vecteurs** (fiche 301) — il rend `c(min, max)` de l'ensemble.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Le préfixe de la densité ? | **`d`** |
| De la fonction de répartition ? | **`p`** |
| De la fonction quantile ? | **`q`** |
| De la simulation ? | **`r`** |
| Premier argument de `dxxx` ? | **`x`** |
| De `pxxx` ? | **`q`** |
| De `qxxx` ? | **`p`** |
| De `rxxx` ? | **`n`** |
| Les trois exceptions à `n` ? | `rhyper` · `rsignrank` · `rwilcox` → **`nn`** |
| Définition de la fonction quantile ? | Le **plus petit $x$** tel que $P(X\le x) > q$ |
| Nom R de la loi normale ? | **`norm`** — `mean`, `sd` |
| De la loi de Student ? | **`t`** — `df`, `ncp` |
| De la loi F ? | **`f`** — `df1`, `df2`, `ncp` |
| Du khi-deux ? | **`chisq`** — `df`, `ncp` |
| De la binomiale ? | **`binom`** — `size`, `prob` |
| De la loi de Poisson ? | **`pois`** — `lambda` |
| De l'exponentielle ? | **`exp`** — `rate` |
| De l'uniforme ? | **`unif`** — `min`, `max` |
| Le paramètre `ncp` est-il partout ? | **Non** |
| Deux fonctions hors tableau ? | **`ptukey`/`qtukey`**, **`dmultinom`/`rmultinom`** |
| Un paquet pour d'autres lois ? | **`SuppDists`** |
| Les deux arguments de `pxxx` et `qxxx` ? | **`lower.tail`** et **`log.p`** |
| L'argument de `dxxx` ? | **`log`** |
| La formule du hasard cumulé ? | $H(t) = -\log(1-F(t))$ |
| Comment le calculer ? | `-pxxx(t, lower.tail = FALSE, log.p = TRUE)` |
| Pourquoi pas par soustraction ? | **Perte de précision** et **sous-passement** |
| Valeur $p$ bilatérale d'un $t$ ? | **2 ×** la queue — la loi est symétrique |
| Point supérieur à 1 % d'une F(2,7) ? | `qf(0.01, 2, 7, lower.tail = FALSE)` |
| Où lire comment R tire au hasard ? | L'aide de **`RNG`** |
| Deux résumés à cinq nombres ? | **`summary()`** et **`fivenum()`** |
| Lequel donne la moyenne ? | **`summary()`** |
| Pourquoi diffèrent-ils ? | **Deux conventions** de quantile |
| Qu'est-ce que `stem()` ? | Un diagramme **à tiges et feuilles** |
| Son avantage sur l'histogramme ? | Il **conserve les chiffres** |
| Que révèle-t-il sur `eruptions` ? | Une distribution **bimodale** |
| Moyenne et médiane de `eruptions` ? | **3,488** et **4,000** |
| Que faut-il avant `lines(density(...))` ? | **`prob = TRUE`** dans `hist` |
| Que fait `rug()` ? | Il **montre les points de données** |
| Le défaut de `bw` est-il bon ? | **Non** — *« too much smoothing »* |
| Une bonne règle automatique ? | **`bw = "SJ"`** |
| Tracer la répartition empirique ? | `plot(ecdf(x), do.points=FALSE, verticals=TRUE)` |
| Que faire avant un Q-Q ? | **`par(pty = "s")`** |
| Les deux fonctions du Q-Q normal ? | **`qqnorm()`** et **`qqline()`** |
| Comparer à une loi choisie ? | **`qqplot(qt(ppoints(n), df), x)`** |
| Que fabrique `ppoints(n)` ? | Les **probabilités théoriques** |
| Le test de normalité de R ? | **`shapiro.test()`** |
| Son résultat sur `long` ? | $W = 0{,}9793$, $p = 0{,}01052$ |
| Le test d'ajustement à une loi ? | **`ks.test(x, "pnorm", ...)`** |
| Son résultat sur `long` ? | $D = 0{,}0661$, $p = 0{,}4284$ |
| Pourquoi ce désaccord ? | Les paramètres sont **estimés sur le même échantillon** |
| Où sont les tests classiques ? | Le paquet **`stats`**, *« normally loaded »* |
| Que fait `t.test(A, B)` par défaut ? | Le test de **Welch** |
| À quoi le voit-on ? | Au **df non entier** — 12,027 |
| Son résultat ? | $t = 3{,}2499$, $p = 0{,}00694$ |
| Le test d'égalité des variances ? | **`var.test()`** |
| Que suppose-t-il ? | Deux populations **normales** |
| Son résultat ? | $F = 0{,}5837$, $p = 0{,}3938$ |
| Ses degrés de liberté ? | **12** et **7** — soit $n-1$ de chaque |
| Le test $t$ classique ? | **`t.test(A, B, var.equal = TRUE)`** |
| Son df ? | **19** — soit $13+8-2$ |
| Son résultat ? | $t = 3{,}4722$, $p = 0{,}002551$ |
| Que coûte l'hypothèse en moins ? | De la **puissance** — IC plus large |
| Les deux moyennes ? | **80,02077** et **79,97875** |
| Leur différence ? | **0,04202** — le centre des deux IC |
| Le test sans normalité ? | **`wilcox.test()`** |
| Que suppose-t-il ? | Une **loi continue commune** |
| Son résultat ? | $W = 89$, $p = 0{,}007497$ |
| Que teste `ks.test` à deux échantillons ? | L'**écart vertical maximal** des deux ecdf |
| Son résultat ? | $D = 0{,}5962$, $p = 0{,}05919$ |
| Pourquoi est-il moins concluant ? | Il teste **toute différence**, donc moins puissant |
| Que signalent les avertissements d'ex æquo ? | Des données **discrètes ou arrondies** |
| Que faut-il avec deux `ecdf` superposées ? | **`xlim = range(A, B)`** |
