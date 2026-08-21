# Fiche 317 — Erreurs, avertissements, débogage et profilage

|  |  |
|---|---|
| **Matière** | Code · Langage R |
| **Cours source** | R Core Team, *R Language Definition* 4.6.1 — chapitre 8 « Exception handling » (§8.1 `stop`, §8.2 `warning`, §8.3 `on.exit`, §8.4 options d'erreur) et chapitre 9 « Debugging » (§9.1 `browser`, §9.2 `debug`/`undebug`, §9.3 `trace`/`untrace`, §9.4 `traceback`) |
| **Sources d'appoint** | R Core Team, *Writing R Extensions* 4.6.1 — chapitre 3 « Tidying and profiling R code » (§3.1 mise au propre, §3.2 profilage en vitesse) |
| **Difficulté** | Intermédiaire — peu de concepts, beaucoup de réflexes |
| **Temps d'étude estimé** | 1 h 15 |
| **Prérequis** | Fiches 309, 310, 316 (fonctions, environnements, appels) |
| **Concepts clés** | `stop()`, `warning()`, l'option **`warn`** et ses quatre régimes, `last.warning`, `warnings()`, **`on.exit()`**, options **`error`** et **`warning.expression`**, `browser()`, les **cinq commandes** du débogueur, `debug()` / `undebug()`, `trace()` / `untrace()`, **`.Traceback`** et `traceback()`, **`keep.source`**, `removeSource()`, `dump()`, **`Rprof()`**, `summaryRprof()` |
| **À retenir en priorité** | **Les quatre valeurs de `warn`** · **`on.exit` est exécuté même sur avertissement** · **les cinq commandes `RET c n where Q`** · **`traceback()` après une erreur** · **profiler avant d'optimiser**. |

## 🎯 Vue d'ensemble

```
DEUX MECANISMES  « Functions such as stop or warning can be CALLED DIRECTLY
                   or OPTIONS such as "warn" can be used to control
                   the handling of problems. »

stop()      « HALTS the evaluation of the current expression, PRINTS the
              message argument and RETURNS EXECUTION TO TOP-LEVEL »

warning()   son comportement depend de l'option "warn" :
   warn < 0   les avertissements sont IGNORES
   warn = 0   STOCKES, imprimes APRES la fonction de haut niveau  (defaut)
   warn = 1   imprimes AU MOMENT ou ils surviennent
   warn >= 2  TRANSFORMES EN ERREURS
   a warn = 0 : moins de 10 -> imprimes ; plus de 10 -> un simple compte
                last.warning garde le vecteur ; warnings() y accede

on.exit()   « the effect ... is to STORE THE VALUE OF THE BODY so that it will
              be EXECUTED WHEN THE FUNCTION EXITS »
            « guaranteed to be executed ... EITHER DIRECTLY OR AS THE RESULT
              OF A WARNING »

TROIS OPTIONS  warn  ·  warning.expression  ·  error
               « Expressions installed by options("error") are evaluated
                 BEFORE calls to on.exit are carried out. »

DEBOGUER    browser()  s'arrete ICI        debug(f)  s'arrete a CHAQUE appel
            trace(f)   imprime l'appel     traceback()  la pile APRES l'erreur

CINQ COMMANDES DU DEBOGUEUR
   RET     instruction suivante (debug) / continuer (browser)
   c cont  continuer
   n       instruction suivante -- MARCHE AUSSI depuis le browser
   where   afficher la PILE D'APPELS
   Q       arreter et remonter au sommet IMMEDIATEMENT

PROFILER    Rprof("f.out") ... Rprof(NULL)  puis  summaryRprof()
            echantillonne toutes les 20 ms QUELLE LIGNE DE QUELLE FONCTION
```

**Le problème posé.** *« **The exception handling facilities in R are provided through two mechanisms. Functions such as `stop` or `warning` can be called directly or options such as `"warn"` can be used to control the handling of problems.** »* (§8)

<div class="callout" data-kind="intu">

<span class="callout__lab">Intuition — signaler et régler sont deux choses distinctes.</span>

Le code **signale** (`stop`, `warning`) ; l'utilisateur **décide** ce qui en est fait (`options`). Un même `warning()` peut être ignoré, différé, immédiat ou fatal — **sans que le code change**. C'est ce partage qui permet à `options(warn = 2)` de transformer un script indulgent en script strict, le temps d'un diagnostic.

</div>

## 🔴 Concept 1 — Signaler une erreur

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition (§8.1).</span>

*« **A call to `stop` halts the evaluation of the current expression, prints the message argument and returns execution to top-level.** »*

</div>

**Trois effets en une phrase** : **arrêter**, **afficher**, **revenir au sommet**. Rien de ce qui suit dans la fonction n'est exécuté — c'est ce qui rend le garde-fou du compte en banque efficace (fiche 310) :

```
withdraw = function(amount) {
  if (amount > total)
    stop("You don't have that much money!\n")
  total <<- total - amount        # <- jamais atteinte si le stop se declenche
  ...
}
```

## 🔴 Concept 2 — Avertir, et les quatre régimes de `warn`

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition (§8.2).</span>

*« **The function `warning` takes a single argument that is a character string. The behaviour of a call to `warning` depends on the value of the option `"warn"`.** »*

</div>

| Valeur de `warn` | Comportement |
|---|---|
| **négative** | *« **warnings are ignored** »* |
| **zéro** (le défaut) | *« they are **stored and printed after the top-level function has completed** »* |
| **un** | *« they are **printed as they occur** »* |
| **2 ou plus** | *« **warnings are turned into errors** »* |

> **Le détail du régime par défaut (§8.2).** *« **If `"warn"` is zero (the default), a variable `last.warning` is created and the messages associated with each call to `warning` are stored, sequentially, in this vector.** **If there are fewer than 10 warnings they are printed after the function has finished evaluating. If there are more than 10 then a message indicating how many warnings occurred is printed.** **In either case `last.warning` contains the vector of messages, and `warnings` provides a way to access and print it.** »*

<div class="callout" data-kind="methode">

<span class="callout__lab">Méthode — les deux réglages qui servent en pratique.</span>

- **`options(warn = 1)`** quand on cherche **où** un avertissement se produit : à `warn = 0` il est affiché **après** la fonction de haut niveau, donc **détaché de sa cause**. À `warn = 1` il apparaît **au bon endroit** dans la trace.
- **`options(warn = 2)`** quand on veut **traiter un avertissement comme un bug** : il devient une erreur, donc `traceback()` (concept 5) donne **la pile d'appels complète**.

Et **le seuil de dix** explique le « There were 12 warnings (use `warnings()` to see them) » que tout utilisateur a rencontré : au-delà de dix, R **ne les imprime plus**, il les **compte**. **`warnings()`** les récupère.

</div>

## 🔴 Concept 3 — `on.exit()`

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition (§8.3).</span>

*« **A function can insert a call to `on.exit` at any point in the body of a function. The effect of a call to `on.exit` is to store the value of the body so that it will be executed when the function exits.** **This allows the function to change some system parameters and to ensure that they are reset to appropriate values when the function is finished.** »*

*« **The `on.exit` is guaranteed to be executed when the function exits either directly or as the result of a warning.** »*

*« **An error in the evaluation of the `on.exit` code causes an immediate jump to top-level without further processing of the `on.exit` code.** »*

*« **`on.exit` takes a single argument which is an expression to be evaluated when the function is exited.** »*

</div>

**C'est la garantie qui manquait à l'idiome `oldpar`** de la fiche 314. Le cours de graphiques écrit :

```
oldpar <- par(no.readonly = TRUE)
# ... commandes de trace ...
par(oldpar)
```

⚠️ **Si une commande intermédiaire échoue, la dernière ligne n'est jamais atteinte** — et les réglages de l'utilisateur restent modifiés. `on.exit` supprime ce risque :

```
oldpar <- par(no.readonly = TRUE)
on.exit(par(oldpar))
# ... commandes de trace ...
```

**Le même patron vaut pour tout ce qui doit être rendu** : un périphérique graphique ouvert (`dev.off()`, fiche 314), un `sink()` ouvert (fiche 300), un fichier temporaire, un répertoire de travail changé.

## 🟠 Concept 4 — Les options d'erreur

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition (§8.4).</span>

*« **There are a number of options variables that can be used to control how R handles errors and warnings.** »*

</div>

| Option | Rôle |
|---|---|
| **`warn`** | *« **Controls the printing of warnings.** »* — concept 2 |
| **`warning.expression`** | *« **Sets an expression that is to be evaluated when a warning occurs.** **The normal printing of warnings is suppressed if this option is set.** »* |
| **`error`** | *« **Installs an expression that will be evaluated when an error occurs.** **The normal printing of error messages and warning messages precedes the evaluation of the expression.** »* |

> ⚠️ **L'ordre d'exécution (§8.4).** *« **Expressions installed by `options("error")` are evaluated before calls to `on.exit` are carried out.** »*
>
> **Cela compte** : au moment où l'expression d'erreur s'exécute, **les nettoyages n'ont pas encore eu lieu**. C'est précisément ce qui rend un `options(error = recover)` utile — l'état des cadres d'appel est **encore intact**.

> **L'exemple du manuel (§8.4).** *« **One can use `options(error = expression(q("yes")))` to get R to quit when an error has been signalled. In this case an error will cause R to shut down and the global environment will be saved.** »*
>
> **Usage typique : le script par lots.** En `R CMD BATCH` (fiche 300), un script qui continue après une erreur produit des résultats faux. Cette option le fait **s'arrêter net** — en sauvegardant l'espace de travail pour l'autopsie.

## 🔴 Concept 5 — Les outils de débogage

> **Cadrage (§9).** *« **Debugging code has always been a bit of an art.** R provides several tools that help users find problems in their code. **These tools halt execution at particular points in the code and the current state of the computation can be inspected.** »*
>
> *« **Most debugging takes place either through calls to `browser` or `debug`. Both of these functions rely on the same internal mechanism and both provide the user with a special prompt.** **Any command can be typed at the prompt. The evaluation environment for the command is the currently active environment. This allows you to examine the current state of any variables.** »*

### 5.1 Les cinq commandes spéciales

> **Règle (§9).** *« **There are five special commands that R interprets differently.** »*

| Commande | Effet |
|---|---|
| **`RET`** | *« **Go to the next statement if the function is being debugged. Continue execution if the browser was invoked.** »* |
| **`c`** / **`cont`** | *« **Continue** the execution. »* |
| **`n`** | *« **Execute the next statement in the function.** **This works from the browser as well.** »* |
| **`where`** | *« **Show the call stack** »* |
| **`Q`** | *« **Halt execution and jump to the top-level immediately.** »* |

> ⚠️ **Le collision de noms (§9).** *« **If there is a local variable with the same name as one of the special commands listed above then its value can be accessed by using `get`. A call to `get` with the name in quotes will retrieve the value in the current environment.** »*
>
> Une variable locale nommée `c` ou `n` **est inaccessible directement** dans le débogueur — la lettre est interprétée comme une commande. **`get("c")`** la récupère. C'est exactement l'exemple donné au §9.1.

> ⚠️ **La limite (§9).** *« **The debugger provides access only to interpreted expressions. If a function calls a foreign language (such as C) then no access to the statements in that language is provided. Execution will halt on the next statement that is evaluated in R. A symbolic debugger such as `gdb` can be used to debug compiled code.** »* — voir fiche 320.

### 5.2 `browser()` — s'arrêter ici

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition (§9.1).</span>

*« **A call to the function `browser` causes R to halt execution at that point and to provide the user with a special prompt.** **Arguments to `browser` are ignored.** »*

</div>

```
> foo <- function(s) {
+   c <- 3
+   browser()
+ }
> foo(4)
Called from: foo(4)
Browse[1]> s
[1] 4
Browse[1]> get("c")
[1] 3
```

**L'exemple est choisi pour montrer les deux choses** : on inspecte `s`, l'argument, **dans son environnement d'évaluation** ; et `c`, variable locale, exige **`get("c")`** parce que `c` est une commande du débogueur.

### 5.3 `debug()` — s'arrêter à chaque appel

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition (§9.2).</span>

*« **The debugger can be invoked on any function by using the command `debug(fun)`. Subsequently, each time that function is evaluated the debugger is invoked.** **The debugger allows you to control the evaluation of the statements in the body of the function. Before each statement is executed the statement is printed out and a special prompt provided.** »*

*« **Debugging is turned off by a call to `undebug` with the function as an argument.** »*

</div>

```
> debug(mean.default)
> mean(1:10)
debugging in: mean.default(1:10)
debug: {
    if (na.rm) x <- x[!is.na(x)]
    trim <- trim[1]
    n <- length(c(x, recursive = TRUE))
    ...
}
Browse[1]>
debug: if (na.rm) x <- x[!is.na(x)]
Browse[1]>
debug: trim <- trim[1]
Browse[1]>
debug: n <- length(c(x, recursive = TRUE))
Browse[1]> c
exiting from: mean.default(1:10)
[1] 5.5
```

<div class="callout" data-kind="intu">

<span class="callout__lab">Contrôle — trois choses à remarquer dans cette trace.</span>

1. **`debug(mean.default)`, pas `debug(mean)`** : `mean` est **une générique** (fiche 311), son corps se résume à `UseMethod("mean")`. C'est **la méthode** qu'il faut instrumenter.
2. **Le corps entier s'affiche d'abord**, puis **une instruction à la fois** ; chaque `RET` avance d'une ligne.
3. **`c` termine le pas-à-pas** et laisse la fonction s'achever — d'où le `[1] 5.5` final.

</div>

### 5.4 `trace()` — voir les appels

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition (§9.3).</span>

*« **Another way of monitoring the behaviour of R is through the trace mechanism.** `trace` is called with a single argument that is the name of the function you want to trace. **The name does not need to be quoted but for some functions you will need to quote the name in order to avoid a syntax error.** »*

*« **When `trace` has been invoked on a function then every time that function is evaluated the call to it is printed out.** **This mechanism is removed by calling `untrace`.** »*

</div>

```
> trace("[<-")
> x <- 1:10
> x[3] <- 4
trace: "[<-"(*tmp*, 3, value = 4)
```

> **Cet exemple vaut une démonstration.** Il rend **visible** le mécanisme `` `*tmp*` `` de la fiche 302 : `x[3] <- 4` est **réellement** l'appel `` `[<-`(*tmp*, 3, value = 4) ``. Ce que le manuel décrivait comme *« as if the following had been executed »* est ici **observé**.
>
> Et il illustre la réserve sur les guillemets : `trace([<-)` serait **une erreur de syntaxe** — `[<-` n'est pas un identifiant (fiche 300).

**La différence avec `debug`** : `trace` **n'interrompt pas**. Il affiche l'appel et laisse continuer — utile quand on veut savoir **combien de fois** et **avec quels arguments** une fonction est appelée, sans arrêter le flux.

### 5.5 `traceback()` — la pile après coup

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition (§9.4).</span>

*« **When an error has caused a jump to top-level a special variable called `.Traceback` is placed into the base environment. `.Traceback` is a character vector with one entry for each function call that was active at the time the error occurred. An examination of `.Traceback` can be carried out by a call to `traceback`.** »*

</div>

**C'est le premier réflexe après une erreur inattendue.** Le message d'erreur dit **quoi** ; `traceback()` dit **où**, en remontant toute la chaîne d'appels.

<div class="callout" data-kind="methode">

<span class="callout__lab">Méthode — pourquoi cela résout les erreurs « incompréhensibles ».</span>

Les fiches précédentes ont montré plusieurs pannes **différées** : une classe posée sans vérification qui échoue au premier générique (fiche 311), un `drop` oublié qui casse `colMeans` (fiche 302), un `predict()` aux noms de variables discordants (fiche 313). Dans tous ces cas, **le message ne parle pas de la cause** — mais `traceback()` montre **la chaîne** qui y mène.

</div>

## 🟠 Concept 6 — Mettre au propre

> **Cadrage (*Writing R Extensions* §3).** *« **R code which is worth preserving in a package and perhaps making available for others to use is worth documenting, tidying up and perhaps optimizing.** »*

> **Règle (§3.1).** *« **R treats function code loaded from packages and code entered by users differently.** **By default code entered by users has the source code stored internally, and when the function is listed, the original source is reproduced. Loading code from a package (by default) discards the source code, and the function listing is re-created from the parse tree of the function.** »*
>
> *« **Normally keeping the source code is a good idea, and in particular it avoids comments being removed.** **However, we can make use of the ability to re-create a function listing from its parse tree to produce a tidy version of the function**, for example **with consistent indentation and spaces around operators**. »*

<div class="callout" data-kind="methode">

<span class="callout__lab">Méthode — les deux façons de renoncer à la source (§3.1).</span>

1. *« **The option `keep.source` can be set to `FALSE` before the code is loaded into R.** »*
2. *« **The stored source code can be removed by calling the `removeSource()` function** »* : `myfun <- removeSource(myfun)`.

</div>

**La recette complète (§3.1)** — pour mettre au propre un fichier `myfuns.R`, écrire `tidy.R` :

```
source("myfuns.R", keep.source = FALSE)
dump(ls(all.names = TRUE), file = "new.myfuns.R")
```

*« and run R with this as the source file, for example by **`R --vanilla < tidy.R`** or by pasting into an R session. **Then the file `new.myfuns.R` will contain the functions in alphabetical order in the standard layout.** **Warning : comments in your functions will be lost.** »*

<div class="callout" data-kind="intu">

<span class="callout__lab">Contrôle — décoder ces deux lignes.</span>

`keep.source = FALSE` fait **oublier le texte d'origine** ; les fonctions n'existent plus que comme **arbres syntaxiques** (fiche 316). `ls(all.names = TRUE)` liste **tous** les objets, **y compris ceux dont le nom commence par un point** (fiche 300). `dump()` les réécrit **à partir de l'arbre** — donc dans **la mise en page canonique**. Et `R --vanilla` (fiche 300) garantit qu'aucun fichier de démarrage n'interfère.

</div>

> **La recommandation de style (§3.1).** *« The standard format provides a good starting point for further tidying. **Although the deparsing cannot do so, we recommend the consistent use of the preferred assignment operator `<-` (rather than `=`) for assignment.** Many package authors use **a version of Emacs** … using the **ESS[S]** mode. »*

## 🟠 Concept 7 — Profiler

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition (Writing R Extensions §3.2).</span>

*« **The command `Rprof` is used to control profiling.** **Profiling works by recording at fixed intervals (by default every 20 msecs) which line in which R function is being used, and recording the results in a file (default `Rprof.out` in the working directory). Then the function `summaryRprof` or the command-line utility `R CMD Rprof Rprof.out` can be used to summarize the activity.** »*

*(note 2 : « **For Unix-alikes by default these are intervals of CPU time, and for Windows of elapsed ("wall-clock") time.** »)*

</div>

**Le patron d'usage**, tiré de l'exemple du manuel (d'après **Venables & Ripley, 2002, pp. 225-6**) :

```
Rprof("boot.out")
storm.boot <- boot(rs, storm.bf, R = 4999)   # slow enough to profile
Rprof(NULL)
```

puis

```
R CMD Rprof boot.out
```

**La sortie donne deux tableaux**, et le manuel en explique les colonnes :

> *« **Total seconds : time spent in function and callees.** **Self seconds : time spent in function alone.** »*

| Colonne | Ce qu'elle mesure |
|---|---|
| **total** | le temps passé **dans la fonction et dans ce qu'elle appelle** |
| **self** | le temps passé **dans la fonction seule** |

**La distinction est décisive.** Une fonction peut avoir un `total` de 100 % et un `self` de 0,2 % — c'est le cas de `boot` dans l'exemple : elle **ne fait rien elle-même**, elle appelle. **On optimise ce qui a un `self` élevé.**

*« **This often produces surprising results and can be used to identify bottlenecks or pieces of R code that could benefit from being replaced by compiled code.** »*

> ⚠️ **Trois mises en garde du manuel (§3.2).**
>
> 1. *« **profiling does impose a small performance penalty** »* ;
> 2. *« **the output files can be very large if long runs are profiled at the default sampling interval** »* ;
> 3. *« **Profiling short runs can sometimes give misleading results. R from time to time performs garbage collection to reclaim unused memory, and this takes an appreciable amount of time which profiling will charge to whichever function happens to provoke it.** **It may be useful to compare profiling code immediately after a call to `gc()` with a profiling run without a preceding call to `gc`.** »*
>
> **La troisième est la plus subtile** : le ramasse-miettes est **imputé à la fonction qui l'a déclenché**, laquelle n'y est pour rien. Sur un profil court, cela peut désigner **un coupable innocent**.

*« **More detailed analysis of the output can be achieved by the tools in the CRAN packages `proftools` and `profr` : in particular these allow call graphs to be studied.** »*

<details class="details--riche">
<summary>

**Exercice résolu — diagnostiquer une fonction qui échoue de temps en temps**

</summary>

**Énoncé.** Une fonction appelée dans une boucle plante « une fois sur vingt », avec un message qui ne mentionne pas son code. Quel enchaînement d'outils ?

*Étape 1 — obtenir la pile.* Après l'erreur, **`traceback()`**. *« **`.Traceback` is a character vector with one entry for each function call that was active at the time the error occurred** »* (§9.4). Elle nomme **la chaîne complète**, du haut niveau jusqu'à la fonction fautive — ce que le message d'erreur seul ne dit pas.

*Étape 2 — si l'erreur n'est qu'un avertissement devenu fatal ailleurs.* **`options(warn = 2)`** : *« **if it is 2 (or larger) warnings are turned into errors** »* (§8.2). L'avertissement devient une erreur, donc **traçable** par l'étape 1.

*Étape 3 — si l'avertissement s'affiche loin de sa cause.* **`options(warn = 1)`** : *« **they are printed as they occur** »*. À `warn = 0`, ils sont affichés **après la fonction de haut niveau** — donc détachés du contexte.

*Étape 4 — entrer dans la fonction.* **`debug(mafonction)`** : *« **each time that function is evaluated the debugger is invoked** … **before each statement is executed the statement is printed out** »* (§9.2). On avance par `RET`, on inspecte les variables au prompt — *« **the evaluation environment for the command is the currently active environment** »*.

*Étape 5 — sauter directement au point suspect.* Plutôt que dérouler vingt appels, insérer **`browser()`** sous une condition :

```
if (length(x) == 1) browser()
```

⚠️ *« **Arguments to `browser` are ignored** »* — on ne peut pas lui passer de condition, il faut l'entourer d'un `if`.

*Étape 6 — se repérer dans la pile.* Au prompt, **`where`** — *« **Show the call stack** »*. Et **`Q`** pour *« **halt execution and jump to the top-level immediately** »* si l'on a vu ce qu'on voulait.

*Étape 7 — le piège des noms.* Si la fonction a une variable locale nommée `c` ou `n`, la taper **exécute la commande du débogueur**. *« **its value can be accessed by using `get`** »* → **`get("c")`**.

*Étape 8 — nettoyer.* **`undebug(mafonction)`**, sinon **chaque appel ultérieur** rouvre le débogueur. Et retirer les `browser()` du code : ils sont **invisibles** dans un script qui tourne en batch — où ils bloquent indéfiniment.

*Étape 9 — la protection durable.* Si la fonction modifie un état global (paramètres graphiques, `sink`, répertoire), poser **`on.exit()`** dès le début : *« **guaranteed to be executed when the function exits either directly or as the result of a warning** »* (§8.3). Une erreur ne laissera pas la session dans un état bancal.

</details>

## Comment reconnaître le type d'exercice

| Le signal dans l'énoncé | Ce qu'il faut mobiliser |
|---|---|
| « interrompre avec un message » | **`stop()`** |
| « signaler sans interrompre » | **`warning()`** |
| « mes avertissements arrivent trop tard » | **`options(warn = 1)`** |
| « traiter les avertissements comme des bugs » | **`options(warn = 2)`** |
| « il y avait 12 avertissements » | plus de dix → **`warnings()`** |
| « restaurer un réglage quoi qu'il arrive » | **`on.exit()`** |
| « faire quelque chose à chaque erreur » | **`options(error = ...)`** |
| « arrêter R au premier problème en batch » | `options(error = expression(q("yes")))` |
| « d'où vient cette erreur ? » | **`traceback()`** |
| « s'arrêter à un endroit précis » | **`browser()`**, éventuellement sous un `if` |
| « suivre une fonction pas à pas » | **`debug()`** — puis **`undebug()`** |
| « déboguer une générique » | instrumenter **la méthode**, pas la générique |
| « savoir combien de fois c'est appelé » | **`trace()`** |
| « voir la pile depuis le débogueur » | **`where`** |
| « ma variable s'appelle `c` » | **`get("c")`** |
| « déboguer du code C » | **pas avec ces outils** — `gdb` |
| « uniformiser la présentation du code » | **`keep.source = FALSE`** + **`dump()`** |
| « où mon programme passe-t-il son temps ? » | **`Rprof()`** + **`summaryRprof()`** |
| « quelle fonction optimiser ? » | celle dont le **`self`** est élevé |
| « mon profil accuse une fonction inattendue » | peut-être **le ramasse-miettes** |

## Comment résoudre ce type d'exercice

**Protocole « diagnostiquer une erreur » — 4 étapes.**

1. **`traceback()`** immédiatement après — la chaîne d'appels.
2. Si c'est un avertissement qui dégénère : **`options(warn = 2)`**, puis retour à l'étape 1.
3. **`debug()`** sur la fonction suspecte, ou **`browser()`** sous condition au bon endroit.
4. **`undebug()`** et retirer les `browser()` avant de refermer.

**Protocole « rendre une fonction sûre » — 3 étapes.**

1. **Valider tôt** : `stop()` **avant** toute modification d'état (le patron `withdraw` de la fiche 310).
2. **Poser `on.exit()`** dès qu'un réglage global est touché — *« guaranteed to be executed … either directly or as the result of a warning »*.
3. Ne jamais laisser un `browser()` dans du code livré.

**Protocole « optimiser » — 4 étapes.**

1. **Mesurer d'abord** : `Rprof("f.out")` … `Rprof(NULL)`, puis `summaryRprof()`.
2. Lire **`self`**, pas `total` — le `total` d'une fonction qui délègue ne dit rien.
3. Se méfier des **exécutions courtes** : le ramasse-miettes fausse l'imputation → comparer **avec et sans `gc()`** préalable.
4. Puis seulement, chercher **la vectorisation** (fiche 301), **l'opération « objet entier »** (fiche 308), ou du **code compilé** (fiche 320).

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Croire qu'un `warning` interrompt | seul **`stop`** interrompt |
| Chercher un avertissement là où il s'affiche | à `warn = 0` il est **différé** → `options(warn = 1)` |
| Ignorer « There were 12 warnings » | **`warnings()`** les montre |
| Restaurer un réglage en fin de corps | une erreur **saute la ligne** → **`on.exit()`** |
| Croire `on.exit` exécuté après un avertissement seulement | il l'est **dans les deux cas** |
| Croire l'expression d'erreur exécutée après `on.exit` | elle l'est **avant** |
| Passer un argument à `browser()` | *« **Arguments to `browser` are ignored** »* |
| `debug()` sur une fonction générique | son corps est **`UseMethod`** — déboguer **la méthode** |
| Oublier `undebug()` | **chaque** appel ultérieur rouvre le débogueur |
| Laisser un `browser()` dans un script batch | il **bloque** indéfiniment |
| Taper `c` pour voir une variable nommée `c` | c'est **une commande** → `get("c")` |
| Attendre du débogueur qu'il entre dans du C | *« **no access to the statements in that language** »* → `gdb` |
| `trace()` sur un nom non identifiant | il faut **des guillemets** : `trace("[<-")` |
| Optimiser sans mesurer | **profiler d'abord** |
| Lire `total` au lieu de `self` | `total` inclut **les appelées** |
| Profiler une exécution très courte | le **ramasse-miettes** fausse le résultat |
| Profiler longtemps au pas par défaut | *« **the output files can be very large** »* |
| Croire `dump()` fidèle au source | *« **comments in your functions will be lost** »* |

## 📌 Ultimate Review

**Deux mécanismes.** *« **Functions such as `stop` or `warning` can be called directly or options such as `"warn"` can be used to control the handling of problems.** »* — **le code signale, l'utilisateur décide**.

**`stop`.** *« **halts the evaluation of the current expression, prints the message argument and returns execution to top-level** »*.

**`warning` et l'option `warn`.** **négatif** → *« **ignored** »* · **0** (défaut) → *« **stored and printed after the top-level function has completed** »* · **1** → *« **printed as they occur** »* · **≥ 2** → *« **turned into errors** »*. À `warn = 0` : **moins de dix** → imprimés ; **plus de dix** → *« **a message indicating how many warnings occurred** »* ; dans les deux cas **`last.warning`** contient le vecteur et **`warnings()`** y donne accès.

**`on.exit`.** *« **stores the value of the body so that it will be executed when the function exits** … **allows the function to change some system parameters and to ensure that they are reset** »* · *« **guaranteed to be executed when the function exits either directly or as the result of a warning** »* · *« **an error in the evaluation of the `on.exit` code causes an immediate jump to top-level** »* · **un seul argument** : l'expression à évaluer.

**Trois options.** **`warn`** · **`warning.expression`** — *« **the normal printing of warnings is suppressed if this option is set** »* · **`error`** — *« **the normal printing of error messages … precedes the evaluation of the expression** »*. *« **Expressions installed by `options("error")` are evaluated before calls to `on.exit` are carried out.** »* Exemple : **`options(error = expression(q("yes")))`** — *« **an error will cause R to shut down and the global environment will be saved** »*.

**Le débogueur.** *« **Most debugging takes place either through calls to `browser` or `debug`. Both … rely on the same internal mechanism** … **The evaluation environment for the command is the currently active environment.** »*

**Les cinq commandes.** **`RET`** — instruction suivante en `debug`, **continuer** depuis le browser · **`c`** / **`cont`** — continuer · **`n`** — instruction suivante, *« **works from the browser as well** »* · **`where`** — *« **show the call stack** »* · **`Q`** — *« **halt execution and jump to the top-level immediately** »*. Variable locale homonyme → **`get("c")`**. *« **The debugger provides access only to interpreted expressions** »* — pour le C, **`gdb`**.

**`browser()`.** *« **causes R to halt execution at that point** »* · *« **Arguments to `browser` are ignored** »*.

**`debug()` / `undebug()`.** *« **each time that function is evaluated the debugger is invoked** … **before each statement is executed the statement is printed out** »* · l'exemple du manuel instrumente **`mean.default`**, pas `mean`.

**`trace()` / `untrace()`.** *« **every time that function is evaluated the call to it is printed out** »* · *« **The name does not need to be quoted but for some functions you will need to quote the name** »* · l'exemple `trace("[<-")` **rend visible** le mécanisme `` `*tmp*` `` : `trace: "[<-"(*tmp*, 3, value = 4)`.

**`traceback()`.** *« **when an error has caused a jump to top-level a special variable called `.Traceback` is placed into the base environment** … **one entry for each function call that was active at the time the error occurred** »*.

**Mettre au propre.** *« **code entered by users has the source code stored internally** … **loading code from a package (by default) discards the source code** »* · **`keep.source = FALSE`** ou **`removeSource()`** · la recette : `source("myfuns.R", keep.source = FALSE)` puis `dump(ls(all.names = TRUE), file = "new.myfuns.R")`, lancé par **`R --vanilla < tidy.R`** · *« **comments in your functions will be lost** »* · recommandation : **`<-` plutôt que `=`**.

**Profiler.** **`Rprof("f.out")` … `Rprof(NULL)`**, puis **`summaryRprof()`** ou **`R CMD Rprof`** · *« **recording at fixed intervals (by default every 20 msecs) which line in which R function is being used** »* · **CPU** sur Unix, **temps écoulé** sur Windows · **`Total seconds : time spent in function and callees. Self seconds : time spent in function alone.`** — **optimiser ce qui a un `self` élevé** · *« **often produces surprising results** »* · trois réserves : **pénalité de performance**, **fichiers très volumineux**, et **le ramasse-miettes imputé à qui le déclenche** — d'où l'intérêt de comparer **avec et sans `gc()`** · outils plus fins : **`proftools`** et **`profr`**, *« these allow **call graphs** to be studied »*.

## 🧠 Active Recall

<details><summary>Quels sont les deux mécanismes de gestion des exceptions en R ?</summary>

*« **The exception handling facilities in R are provided through two mechanisms. Functions such as `stop` or `warning` can be called directly or options such as `"warn"` can be used to control the handling of problems.** »* (§8)

**Le partage est net** : le code **signale** (`stop`, `warning`), l'utilisateur **décide** de ce qui en est fait (`options`).

C'est ce qui permet à `options(warn = 2)` de rendre strict un script indulgent **sans en changer une ligne** — les mêmes `warning()` deviennent alors des erreurs, donc traçables par `traceback()`.

</details>

<details class="details--riche">
<summary>

Quels sont les quatre régimes de l'option `warn` ?

</summary>

*« **The behaviour of a call to `warning` depends on the value of the option `"warn"`.** »* (§8.2)

| `warn` | Comportement |
|---|---|
| **négatif** | *« warnings are **ignored** »* |
| **0** (défaut) | *« **stored and printed after the top-level function has completed** »* |
| **1** | *« **printed as they occur** »* |
| **≥ 2** | *« **turned into errors** »* |

Et le détail du défaut : *« **If there are fewer than 10 warnings they are printed after the function has finished evaluating. If there are more than 10 then a message indicating how many warnings occurred is printed. In either case `last.warning` contains the vector of messages, and `warnings` provides a way to access and print it.** »*

**C'est l'explication du fameux « There were 12 warnings (use `warnings()` to see them) ».**

</details>

<details class="details--riche">
<summary>

Que garantit `on.exit()`, et pourquoi est-ce mieux qu'une ligne en fin de fonction ?

</summary>

*« **The effect of a call to `on.exit` is to store the value of the body so that it will be executed when the function exits.** **This allows the function to change some system parameters and to ensure that they are reset to appropriate values when the function is finished.** **The `on.exit` is guaranteed to be executed when the function exits either directly or as the result of a warning.** »* (§8.3)

**Une ligne en fin de corps n'est atteinte que si tout s'est bien passé.** Sur l'idiome `oldpar` de la fiche 314 :

```
oldpar <- par(no.readonly = TRUE)
on.exit(par(oldpar))          # <- execute QUOI QU'IL ARRIVE
```

Sans lui, une erreur au milieu du tracé **laisserait les réglages de l'utilisateur modifiés**.

⚠️ *« **An error in the evaluation of the `on.exit` code causes an immediate jump to top-level** »*.

</details>

<details><summary>Quelles sont les trois options d'erreur, et quel ordre d'exécution faut-il connaître ?</summary>

(§8.4)

| Option | Rôle |
|---|---|
| **`warn`** | *« Controls the printing of warnings »* |
| **`warning.expression`** | une expression évaluée à chaque avertissement — *« **the normal printing of warnings is suppressed** »* |
| **`error`** | une expression évaluée à chaque erreur — *« **the normal printing … precedes the evaluation** »* |

⚠️ **L'ordre** : *« **Expressions installed by `options("error")` are evaluated before calls to `on.exit` are carried out.** »*

**Cela compte** : au moment où l'expression d'erreur s'exécute, **les nettoyages n'ont pas eu lieu** — l'état des cadres est **encore intact**, ce qui rend l'inspection possible.

L'exemple du manuel : `options(error = expression(q("yes")))` — *« **an error will cause R to shut down and the global environment will be saved** »*.

</details>

<details><summary>Quelles sont les cinq commandes spéciales du débogueur ?</summary>

*« **There are five special commands that R interprets differently.** »* (§9)

| Commande | Effet |
|---|---|
| **`RET`** | *« **Go to the next statement if the function is being debugged. Continue execution if the browser was invoked.** »* |
| **`c`** / **`cont`** | *« Continue the execution »* |
| **`n`** | *« Execute the next statement … **This works from the browser as well** »* |
| **`where`** | *« **Show the call stack** »* |
| **`Q`** | *« **Halt execution and jump to the top-level immediately** »* |

⚠️ **Le piège** : *« **If there is a local variable with the same name as one of the special commands … its value can be accessed by using `get`.** »* Une variable locale `c` exige **`get("c")`** — c'est l'exemple même du §9.1.

</details>

<details class="details--riche">
<summary>

Quelle est la différence entre `browser()` et `debug()` ?

</summary>

**`browser()`** *« **causes R to halt execution at that point** »* (§9.1) — **un point d'arrêt posé dans le code**. *« **Arguments to `browser` are ignored** »*, d'où la nécessité d'un `if` pour le conditionner.

**`debug(fun)`** — *« **Subsequently, each time that function is evaluated the debugger is invoked** … **Before each statement is executed the statement is printed out and a special prompt provided.** »* (§9.2) — **un pas-à-pas sur toute la fonction**, à **chaque** appel, jusqu'à `undebug()`.

*« **Both of these functions rely on the same internal mechanism and both provide the user with a special prompt.** »*

⚠️ Dans l'exemple du manuel, c'est **`debug(mean.default)`** et non `debug(mean)` : `mean` est une **générique** dont le corps est `UseMethod("mean")` (fiche 311).

</details>

<details class="details--riche">
<summary>

Que montre l'exemple `trace("[<-")` du manuel, et pourquoi les guillemets ?

</summary>

```
> trace("[<-")
> x <- 1:10
> x[3] <- 4
trace: "[<-"(*tmp*, 3, value = 4)
```

**Il rend visible le mécanisme `` `*tmp*` ``** de la fiche 302 : `x[3] <- 4` **est réellement** l'appel `` `[<-`(*tmp*, 3, value = 4) ``. Ce que le manuel décrivait comme *« as if the following had been executed »* est ici **observé en direct**.

**Les guillemets** : *« **The name does not need to be quoted but for some functions you will need to quote the name in order to avoid a syntax error.** »* (§9.3) — `[<-` n'est pas un identifiant (fiche 300), donc `trace([<-)` serait une erreur de syntaxe.

**La différence avec `debug`** : `trace` **n'interrompt pas** — il affiche l'appel et laisse continuer.

</details>

<details class="details--riche">
<summary>

Qu'est-ce que `.Traceback`, et quand s'en sert-on ?

</summary>

*« **When an error has caused a jump to top-level a special variable called `.Traceback` is placed into the base environment. `.Traceback` is a character vector with one entry for each function call that was active at the time the error occurred. An examination of `.Traceback` can be carried out by a call to `traceback`.** »* (§9.4)

**C'est le premier réflexe après une erreur inattendue** : le message dit **quoi**, `traceback()` dit **où**.

Il est particulièrement utile pour les pannes **différées** rencontrées dans les fiches précédentes — une classe posée sans vérification (fiche 311), un `drop` oublié (fiche 302), un `predict()` mal nommé (fiche 313) — où **le message ne mentionne pas la cause**.

</details>

<details><summary>Comment produit-on une version « propre » d'un fichier de fonctions, et que perd-on ?</summary>

*« **By default code entered by users has the source code stored internally** … **Loading code from a package (by default) discards the source code, and the function listing is re-created from the parse tree.** »* (*Writing R Extensions* §3.1)

**La recette** — un fichier `tidy.R` contenant :

```
source("myfuns.R", keep.source = FALSE)
dump(ls(all.names = TRUE), file = "new.myfuns.R")
```

lancé par **`R --vanilla < tidy.R`**. *« **Then the file `new.myfuns.R` will contain the functions in alphabetical order in the standard layout.** »*

⚠️ **Ce qu'on perd** : *« **Warning : comments in your functions will be lost.** »*

**Chaque morceau a sa raison** : `keep.source = FALSE` fait oublier le texte d'origine ; `ls(all.names = TRUE)` prend **aussi les noms à point** (fiche 300) ; `dump` réécrit **depuis l'arbre syntaxique** (fiche 316) ; `--vanilla` isole des fichiers de démarrage.

L'alternative ponctuelle : **`myfun <- removeSource(myfun)`**.

</details>

<details><summary>Comment profile-t-on du code R, et quelle colonne faut-il lire ?</summary>

```
Rprof("boot.out")
# ... code lent ...
Rprof(NULL)
```

puis **`summaryRprof()`** ou **`R CMD Rprof boot.out`**.

*« **Profiling works by recording at fixed intervals (by default every 20 msecs) which line in which R function is being used** »* (§3.2) — **CPU** sur Unix, **temps écoulé** sur Windows.

**Les deux colonnes** : *« **Total seconds : time spent in function and callees. Self seconds : time spent in function alone.** »*

⚠️ **C'est `self` qu'il faut lire.** Dans l'exemple du manuel, `boot` a un **total de 100 %** et un **self de 0,2 %** : elle ne fait rien elle-même, elle appelle. **Optimiser une fonction à `self` faible n'apporte rien.**

*« **This often produces surprising results and can be used to identify bottlenecks or pieces of R code that could benefit from being replaced by compiled code.** »*

</details>

<details><summary>Quelles précautions le manuel donne-t-il sur le profilage ?</summary>

**Trois** (§3.2) :

1. *« **profiling does impose a small performance penalty** »* ;
2. *« **the output files can be very large if long runs are profiled at the default sampling interval** »* ;
3. *« **Profiling short runs can sometimes give misleading results. R from time to time performs garbage collection to reclaim unused memory, and this takes an appreciable amount of time which profiling will charge to whichever function happens to provoke it.** **It may be useful to compare profiling code immediately after a call to `gc()` with a profiling run without a preceding call to `gc`.** »*

**La troisième est la plus insidieuse** : le ramasse-miettes est **imputé à la fonction qui l'a déclenché**, laquelle n'en est pas responsable. Sur une exécution courte, le profil peut donc **désigner un innocent**.

**Le remède du manuel** : comparer deux profils, l'un précédé d'un `gc()`, l'autre non.

Pour aller plus loin : **`proftools`** et **`profr`**, *« these allow **call graphs** to be studied »*.

</details>

<details><summary>Pourquoi le débogueur de R ne suffit-il pas toujours ?</summary>

*« **The debugger provides access only to interpreted expressions. If a function calls a foreign language (such as C) then no access to the statements in that language is provided. Execution will halt on the next statement that is evaluated in R. A symbolic debugger such as `gdb` can be used to debug compiled code.** »* (§9)

**Les outils de ce chapitre s'arrêtent à la frontière du code compilé.** Un `.Call` s'exécute d'un bloc : on voit ce qui entre et ce qui sort, jamais ce qui se passe dedans.

C'est l'un des coûts de l'interfaçage avec C (fiche 320), et l'une des raisons de **ne descendre en C qu'après avoir profilé** — le code compilé est **plus rapide et moins observable**.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Les deux mécanismes de gestion des exceptions ? | Les **fonctions** (`stop`, `warning`) et les **options** |
| Que fait `stop()` ? | **Arrête**, **affiche**, **revient au sommet** |
| De quoi dépend le comportement de `warning()` ? | De l'option **`warn`** |
| `warn` négatif ? | Les avertissements sont **ignorés** |
| `warn = 0` ? | **Stockés**, imprimés **après** la fonction de haut niveau |
| `warn = 1` ? | Imprimés **au moment où ils surviennent** |
| `warn >= 2` ? | **Transformés en erreurs** |
| Quel est le défaut ? | **0** |
| Le seuil d'affichage à `warn = 0` ? | **Dix** |
| Au-delà, qu'affiche R ? | **Un compte**, pas les messages |
| Où sont-ils conservés ? | **`last.warning`** |
| Comment y accéder ? | **`warnings()`** |
| Que fait `on.exit()` ? | Il **stocke une expression** exécutée **à la sortie** |
| Quand est-elle garantie ? | Sortie **directe** ou **par avertissement** |
| Combien d'arguments prend-il ? | **Un seul** |
| Que se passe-t-il si le code d'`on.exit` échoue ? | **Saut immédiat au sommet** |
| Les trois options d'erreur ? | **`warn`**, **`warning.expression`**, **`error`** |
| Effet de `warning.expression` ? | L'affichage normal est **supprimé** |
| Et de `error` ? | L'affichage normal **précède** l'évaluation |
| Quel ordre entre `options("error")` et `on.exit` ? | **L'expression d'erreur d'abord** |
| Comment quitter R à la première erreur ? | `options(error = expression(q("yes")))` |
| Les deux principaux outils de débogage ? | **`browser`** et **`debug`** |
| Quel environnement au prompt ? | **L'environnement actif** |
| Combien de commandes spéciales ? | **Cinq** |
| Que fait `RET` en mode `debug` ? | **Instruction suivante** |
| Et depuis le browser ? | Il **continue** |
| Que fait `c` ? | **Continuer** |
| Que fait `n` ? | Instruction suivante — **aussi depuis le browser** |
| Que fait `where` ? | Affiche la **pile d'appels** |
| Que fait `Q` ? | **Arrêt immédiat**, retour au sommet |
| Variable locale nommée `c` ? | **`get("c")`** |
| Le débogueur entre-t-il dans le code C ? | **Non** |
| Quel outil pour cela ? | **`gdb`** |
| Que fait `browser()` ? | Il **arrête l'exécution à ce point** |
| Accepte-t-il des arguments ? | **Ils sont ignorés** |
| Que fait `debug(f)` ? | Le débogueur s'ouvre à **chaque appel** |
| Comment l'arrêter ? | **`undebug(f)`** |
| Que faut-il déboguer sur une générique ? | **La méthode**, pas la générique |
| Que fait `trace(f)` ? | Il **imprime l'appel** à chaque évaluation |
| Interrompt-il ? | **Non** |
| Comment l'annuler ? | **`untrace(f)`** |
| Quand faut-il des guillemets ? | Quand le nom **n'est pas un identifiant** |
| Que montre `trace("[<-")` ? | Le mécanisme **`` `*tmp*` ``** |
| Qu'est-ce que `.Traceback` ? | Un **vecteur de caractères** des appels actifs |
| Où est-il placé ? | Dans l'**environnement de base** |
| Comment l'examiner ? | **`traceback()`** |
| Le code utilisateur garde-t-il sa source ? | **Oui**, par défaut |
| Et le code d'un paquet ? | **Non** — reconstruit depuis **l'arbre syntaxique** |
| Comment renoncer à la source ? | **`keep.source = FALSE`** ou **`removeSource()`** |
| Quelle fonction réécrit les objets ? | **`dump()`** |
| Dans quel ordre ? | **Alphabétique**, mise en page standard |
| Que perd-on ? | **Les commentaires** |
| Quel opérateur d'assignation est recommandé ? | **`<-`**, plutôt que `=` |
| Quelle commande contrôle le profilage ? | **`Rprof`** |
| Comment l'arrêter ? | **`Rprof(NULL)`** |
| Le fichier par défaut ? | **`Rprof.out`** |
| L'intervalle par défaut ? | **20 ms** |
| Que mesure-t-on sous Unix ? | Le temps **CPU** |
| Et sous Windows ? | Le temps **écoulé** |
| Comment résumer ? | **`summaryRprof()`** ou **`R CMD Rprof`** |
| Que mesure la colonne `total` ? | La fonction **et ses appelées** |
| Et la colonne `self` ? | La fonction **seule** |
| Laquelle guide l'optimisation ? | **`self`** |
| Trois réserves sur le profilage ? | **Pénalité**, **fichiers volumineux**, **ramasse-miettes** |
| À qui le ramasse-miettes est-il imputé ? | À **celui qui le déclenche** |
| Comment s'en prémunir ? | Comparer **avec et sans `gc()`** |
| Deux paquets d'analyse plus fine ? | **`proftools`** et **`profr`** |
| Que permettent-ils ? | D'étudier les **graphes d'appels** |
