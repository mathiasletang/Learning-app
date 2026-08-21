# Fiche 85 — Arbres binomiaux et valorisation risque-neutre

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 12 « Binomial Trees » (d'après Cox, Ross et Rubinstein, 1979) |
| **Difficulté** | Must know — le chapitre qui introduit **la valorisation risque-neutre** |
| **Temps d'étude estimé** | 1 h 45 |
| **Prérequis** | Fiches 78, 82, 83 |
| **Concepts clés** | Portefeuille sans risque, delta, absence d'arbitrage, probabilité risque-neutre, arbre à plusieurs pas, options américaines, calage de la volatilité, $u=e^{\sigma\sqrt{\Delta t}}$, théorème de Girsanov, mesures $P$ et $Q$, options sur indices, devises et futures |
| **Poids à l'examen** | Construire un arbre, **remonter** en calculant $f=e^{-r\Delta t}[pf_u+(1-p)f_d]$, **tester l'exercice anticipé** à chaque nœud · savoir que **la probabilité réelle n'intervient jamais**. |

## 🎯 Vue d'ensemble

```
IDÉE       deux titres, deux issues  →  on peut TOUJOURS construire un portefeuille sans risque
DELTA      Δ = (f_u − f_d)/(S₀u − S₀d)      nb d'actions par option vendue
PRIX       f = e^{−rΔt}[ p f_u + (1 − p) f_d ]        p = (a − d)/(u − d)
CALAGE     u = e^{σ√Δt}   d = 1/u   a = e^{rΔt}
AMÉRICAINE à chaque nœud :  f = max( valeur de continuation , payoff d'exercice )
AUTRES     a = e^{(r−q)Δt} (indice) · e^{(r−r_f)Δt} (devise) · a = 1 (futures)
```

**Pourquoi ce chapitre est important — les trois raisons de Hull.** *Premièrement, il explique la **nature des arguments d'absence d'arbitrage** utilisés pour valoriser les options. Deuxièmement, il présente la **procédure numérique** par arbre binomial, largement utilisée pour les options américaines et d'autres dérivés. Troisièmement, il introduit un principe très important, la **valorisation risque-neutre**.*

> **Et l'annonce du chapitre 14.** *À la limite, quand le pas de temps devient petit, ce modèle est **le même** que le modèle de Black-Scholes-Merton.* L'appendice du chapitre démontre la convergence.

## 🔴 Concept 1 — Un pas, un portefeuille sans risque

**Le cadre minimal.** Action à **20** aujourd'hui ; dans **3 mois** elle vaudra **22** ou **18**. On veut valoriser un **call européen** de strike **21**. Ses payoffs : **1** si l'action monte, **0** si elle baisse. Taux sans risque **12 %**.

> **La seule hypothèse nécessaire est qu'il n'existe pas d'opportunité d'arbitrage.** *On construit un portefeuille d'action et d'option tel qu'il n'y ait **aucune incertitude** sur sa valeur dans 3 mois. On argue alors que, **le portefeuille étant sans risque, son rendement doit égaler le taux sans risque**. Cela permet de calculer le coût de sa constitution, donc le prix de l'option.*
>
> ⚠️ ***Comme il y a deux titres — l'action et l'option — et seulement deux issues possibles, il est TOUJOURS possible de constituer le portefeuille sans risque.*** C'est cette coïncidence de dimensions qui fait fonctionner tout le chapitre.

<details><summary>**Exercice résolu — le calcul complet, pas à pas**</summary>

*Étape 1 — poser le portefeuille.* **Long $\Delta$ actions, short 1 call.** *Étape 2 — écrire sa valeur dans les deux états.*

$$\text{hausse}:\ 22\Delta-1\qquad\qquad\text{baisse}:\ 18\Delta-0=18\Delta$$

*Étape 3 — annuler le risque.* Égaler les deux :

$$22\Delta-1=18\Delta\ \Longrightarrow\ 4\Delta=1\ \Longrightarrow\ \boxed{\Delta=0{,}25}$$

*Étape 4 — vérifier.* Hausse : $22\times0{,}25-1=\mathbf{4{,}5}$. Baisse : $18\times0{,}25=\mathbf{4{,}5}$. **Identique dans les deux cas** . *Étape 5 — actualiser au taux sans risque.*

$$4{,}5\,e^{-0{,}12\times0{,}25}=4{,}5\times0{,}97045=\mathbf{4{,}367}$$

*Étape 6 — identifier le coût de constitution.* $20\times0{,}25-f=5-f$. *Étape 7 — résoudre.* $5-f=4{,}367\ \Longrightarrow\ \boxed{f=0{,}633}$.

**Pourquoi c'est le seul prix possible.** *Si l'option valait plus de 0,633, le portefeuille coûterait moins de 4,367 et **rapporterait plus que le taux sans risque**. Si elle valait moins, **shorter le portefeuille** donnerait un moyen d'**emprunter à moins que le taux sans risque**.*

</details>

**La généralisation.** L'action passe de $S_0$ à $S_0u$ ($u>1$) ou $S_0d$ ($d<1$) ; l'option vaut alors $f_u$ ou $f_d$.

$$\boxed{\Delta=\frac{f_u-f_d}{S_0u-S_0d}}\;\text{(12.1)}$$

*C'est le **rapport de la variation du prix de l'option à la variation du prix de l'action** entre les deux nœuds.*

En égalant le coût $S_0\Delta-f$ à la valeur actualisée $(S_0u\Delta-f_u)e^{-rT}$ et en substituant (12.1) :

$$\boxed{f=e^{-rT}\big[p\,f_u+(1-p)f_d\big]}\;\text{(12.2)}\qquad\qquad\boxed{p=\frac{e^{rT}-d}{u-d}}\;\text{(12.3)}$$

**Vérification sur l'exemple.** $u=1{,}1$, $d=0{,}9$, $r=0{,}12$, $T=0{,}25$ :

$$p=\frac{e^{0{,}03}-0{,}9}{0{,}2}=\frac{1{,}03045-0{,}9}{0{,}2}=\mathbf{0{,}6523}\qquad f=e^{-0{,}03}(0{,}6523\times1)=\mathbf{0{,}633}\ \checkmark$$

> ⚠️ **Le résultat le plus contre-intuitif du chapitre.** *La formule (12.2) **ne fait pas intervenir les probabilités** de hausse ou de baisse. On obtient le même prix que la probabilité de hausse soit 0,5 ou 0,9. **C'est surprenant et semble contre-intuitif** : il est naturel de croire qu'une probabilité de hausse plus grande augmente la valeur d'un call. **Ce n'est pas le cas.***
>
> **La raison.** *Nous ne valorisons **pas** l'option en termes absolus. Nous calculons sa valeur **en termes du prix de l'action sous-jacente**. **Les probabilités de mouvements futurs sont déjà incorporées dans le prix de l'action** : il n'y a pas à en tenir compte une seconde fois.*

## 🔴 Concept 2 — La valorisation risque-neutre

> **Le principe.** *Pour valoriser un dérivé, **on peut faire l'hypothèse que les investisseurs sont neutres au risque** — c'est-à-dire qu'ils n'augmentent pas le rendement exigé pour compenser un risque accru. **Le monde où nous vivons n'est évidemment pas neutre au risque.** Il se trouve pourtant que **supposer un monde risque-neutre donne le bon prix de l'option pour le monde où nous vivons**, aussi bien que pour un monde risque-neutre. **Presque miraculeusement, cela contourne le problème que nous ne savons pratiquement rien de l'aversion au risque des acheteurs et vendeurs d'options.***

**L'objection naturelle, et sa réponse.** *Les options sont des investissements risqués ; les préférences pour le risque ne devraient-elles pas affecter leur prix ? **La réponse est que, lorsqu'on valorise une option en termes du prix de l'action sous-jacente, les préférences pour le risque sont sans importance. Quand les investisseurs deviennent plus averses au risque, les prix des actions baissent — mais les formules reliant les prix d'options aux prix d'actions restent les mêmes.***

**Les deux propriétés d'un monde risque-neutre.**

1. *Le **rendement espéré** d'une action (ou de tout investissement) est le **taux sans risque**.*
2. *Le **taux d'actualisation** du payoff espéré d'une option est le **taux sans risque**.*

**La preuve que $p$ est bien une probabilité risque-neutre.** Avec $p$ comme probabilité de hausse :

$$\mathbb E(S_T)=pS_0u+(1-p)S_0d=pS_0(u-d)+S_0d$$

et en substituant (12.3) :

$$\boxed{\mathbb E(S_T)=S_0e^{rT}}\;\text{(12.4)}$$

*L'action croît donc **en moyenne au taux sans risque** quand $p$ est la probabilité de hausse : elle se comporte **exactement** comme on l'attendrait dans un monde risque-neutre.*

> **L'énoncé général.** *La valorisation risque-neutre est un résultat général très important : **en supposant le monde risque-neutre, on obtient le bon prix d'un dérivé dans TOUS les mondes, pas seulement dans un monde risque-neutre**. Nous l'avons montré pour un modèle binomial simple ; **on peut montrer que le résultat est vrai quelles que soient les hypothèses faites sur l'évolution du prix de l'action**.*

**La recette en trois temps.** *Calculer les **probabilités risque-neutres** des différentes issues · calculer le **payoff espéré** du dérivé · **actualiser au taux sans risque**.*

<details><summary>**Exercice résolu — retrouver 0,633 par la voie risque-neutre**</summary>

*Étape 1 — poser l'équation de croissance risque-neutre.* Le rendement espéré doit être **12 %** :

$$22p+18(1-p)=20e^{0{,}12\times0{,}25}$$

*Étape 2 — simplifier.* $4p=20e^{0{,}03}-18=20\times1{,}03045-18=2{,}609$. *Étape 3 — résoudre.* $p=\mathbf{0{,}6523}$ — **identique** à (12.3) . *Étape 4 — payoff espéré.* $0{,}6523\times1+0{,}3477\times0=\mathbf{0{,}6523}$. *Étape 5 — actualiser.* $0{,}6523\,e^{-0{,}03}=\mathbf{0{,}633}$ .

⚠️ **Le taux d'actualisation du monde réel, lui, est inconnaissable — et gigantesque.** Hull le calcule en note : *sachant que la bonne valeur est 0,633, on peut déduire que le taux d'actualisation correct dans le monde réel est **42,58 %***, car $0{,}633=0{,}7041\,e^{-0{,}4258\times0{,}25}$ (avec une probabilité réelle de 0,7). **C'est précisément ce que la valorisation risque-neutre permet d'éviter de connaître.**

</details>

## 🔴 Concept 3 — Arbres à plusieurs pas

**Le principe.** *Appliquer répétitivement les résultats précédents, **en remontant** de la fin vers le début.*

<details><summary>**Exercice résolu — l'arbre à deux pas (figures 12.3 et 12.4)**</summary>

**Données.** $S_0=20$ ; à chaque pas $\pm10\,\%$ ; pas de **3 mois** ; $r=12\,\%$ ; call **6 mois**, $K=21$.

*Étape 1 — les prix de l'action.*

|  | Pas 0 | Pas 1 | Pas 2 |
|---|---|---|---|
| Haut |  | **22** | **24,2** (D) |
| Milieu | **20** (A) |  | **19,8** (E) |
| Bas |  | **18** (C) | **16,2** (F) |

*Étape 2 — les payoffs terminaux.* D : $24{,}2-21=\mathbf{3{,}2}$ · E et F : **hors la monnaie**, donc **0**. *Étape 3 — le nœud C.* Il mène à E ou F, **tous deux à zéro** → $f_C=\mathbf{0}$. *Étape 4 — le nœud B.* $u=1{,}1$, $d=0{,}9$, $r=0{,}12$, $\Delta t=0{,}25$ → $p=0{,}6523$ :

$$f_B=e^{-0{,}03}(0{,}6523\times3{,}2+0{,}3477\times0)=\mathbf{2{,}0257}$$

*Étape 5 — le nœud A.*

$$f_A=e^{-0{,}03}(0{,}6523\times2{,}0257+0{,}3477\times0)=\mathbf{1{,}2823}$$

⚠️ **Pourquoi $p$ est le même partout ici.** *Cet exemple a été construit de sorte que $u$ et $d$ soient **identiques à chaque nœud** et que les **pas soient de même longueur**. La probabilité risque-neutre calculée par (12.3) est donc **la même à chaque nœud**.* Ce n'est pas automatique — c'est une propriété du calage $u=e^{\sigma\sqrt{\Delta t}}$.

</details>

**Les formules générales**, avec un pas $\Delta t$ :

$$f=e^{-r\Delta t}\big[pf_u+(1-p)f_d\big]\;\text{(12.5)}\qquad p=\frac{e^{r\Delta t}-d}{u-d}\;\text{(12.6)}$$

En substituant deux fois, on obtient la forme **directe** :

$$\boxed{f=e^{-2r\Delta t}\big[p^2f_{uu}+2p(1-p)f_{ud}+(1-p)^2f_{dd}\big]}\;\text{(12.10)}$$

> *Les quantités $p^2$, $2p(1-p)$ et $(1-p)^2$ sont **les probabilités d'atteindre les nœuds terminaux** haut, milieu et bas. **Le prix de l'option est son payoff espéré en monde risque-neutre, actualisé au taux sans risque** — et ce reste vrai quel que soit le nombre de pas.*

<details><summary>**Exercice résolu — un put européen à deux pas (figure 12.7)**</summary>

**Données.** Put européen **2 ans**, $K=52$, $S_0=50$. Deux pas de **1 an**, $\pm20\,\%$, $r=5\,\%$.

*Étape 1 — les paramètres.* $u=1{,}2$, $d=0{,}8$, $\Delta t=1$ :

$$p=\frac{e^{0{,}05}-0{,}8}{0{,}4}=\frac{1{,}05127-0{,}8}{0{,}4}=\mathbf{0{,}6282}$$

*Étape 2 — les prix terminaux.* $72$, $48$, $32$. *Étape 3 — les payoffs.* $f_{uu}=\mathbf{0}$ · $f_{ud}=52-48=\mathbf{4}$ · $f_{dd}=52-32=\mathbf{20}$. *Étape 4 — la formule directe (12.10).*

$$f=e^{-0{,}1}\big(0{,}6282^2\times0+2\times0{,}6282\times0{,}3718\times4+0{,}3718^2\times20\big)=0{,}90484\times4{,}6333=\mathbf{4{,}1923}$$

*Étape 5 — contrôle par la remontée pas à pas.*

$$f_{\text{haut}}=e^{-0{,}05}(0{,}6282\times0+0{,}3718\times4)=\mathbf{1{,}4147}$$

$$f_{\text{bas}}=e^{-0{,}05}(0{,}6282\times4+0{,}3718\times20)=\mathbf{9{,}4636}$$

$$f=e^{-0{,}05}(0{,}6282\times1{,}4147+0{,}3718\times9{,}4636)=\mathbf{4{,}1923}\ \checkmark$$

</details>

## 🔴 Concept 4 — Les options américaines

> **La procédure.** *Remonter l'arbre de la fin vers le début, en **testant à chaque nœud si l'exercice anticipé est optimal**. La valeur aux nœuds terminaux est la même que pour l'européenne. Aux nœuds antérieurs, la valeur est **le plus grand** de :*
>
> $$\boxed{f=\max\Big(\underbrace{e^{-r\Delta t}[pf_u+(1-p)f_d]}_{\text{valeur de continuation}},\ \underbrace{\text{payoff d'exercice immédiat}}_{K-S\ \text{ou}\ S-K}\Big)}$$

<details><summary>**Exercice résolu — le même put, en américain (figure 12.8)**</summary>

**Mêmes données.** Les prix de l'action, leurs probabilités et les valeurs terminales sont **inchangés**.

*Étape 1 — nœud B ($S=60$).* Continuation $=\mathbf{1{,}4147}$ ; exercice $=52-60=\mathbf{-8}$, **négatif**. *L'exercice anticipé n'est clairement pas optimal* → $f_B=\mathbf{1{,}4147}$. *Étape 2 — nœud C ($S=40$).* Continuation $=\mathbf{9{,}4636}$ ; exercice $=52-40=\mathbf{12}$. **L'exercice est optimal** → $f_C=\mathbf{12}$. *Étape 3 — nœud A ($S=50$).*

$$e^{-0{,}05}(0{,}6282\times1{,}4147+0{,}3718\times12{,}0)=\mathbf{5{,}0894}$$

Exercice immédiat $=52-50=2$ → **non optimal**. *Étape 4 — le résultat.* $\boxed{P=5{,}0894}$ contre $p=4{,}1923$ pour l'européenne : la **prime d'exercice anticipé** vaut **0,897**.

⚠️ **Le nœud C est celui qui fait toute la différence.** C'est là — et seulement là — que l'exercice est optimal, et c'est ce **12 au lieu de 9,4636** qui remonte jusqu'à la racine.

</details>

## 🔴 Concept 5 — Le delta, et pourquoi il faut le réajuster

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

*Le **delta** d'une option est le **rapport de la variation du prix de l'option à la variation du prix de l'action**. C'est **le nombre d'unités de l'action qu'il faut détenir pour chaque option vendue** afin de créer un portefeuille sans risque.* Construire ce portefeuille s'appelle la **couverture en delta**. **Le delta d'un call est positif, celui d'un put négatif.**

</div>

**Sur l'arbre du call (figure 12.4).**

| Position dans l'arbre | Calcul | $\Delta$ |
|---|---|---|
| Premier pas | $\dfrac{2{,}0257-0}{22-18}$ | $\mathbf{0{,}5064}$ |
| Second pas, **après hausse** | $\dfrac{3{,}2-0}{24{,}2-19{,}8}$ | $\mathbf{0{,}7273}$ |
| Second pas, **après baisse** | $\dfrac{0-0}{19{,}8-16{,}2}$ | $\mathbf{0}$ |

**Sur l'arbre du put (figure 12.7).**

| Position | Calcul | $\Delta$ |
|---|---|---|
| Premier pas | $\dfrac{1{,}4147-9{,}4636}{60-40}$ | $\mathbf{-0{,}4024}$ |
| Second pas, après hausse | $\dfrac{0-4}{72-48}$ | $\mathbf{-0{,}1667}$ |
| Second pas, après baisse | $\dfrac{4-20}{48-32}$ | $\mathbf{-1{,}0000}$ |

> ⚠️ **La conséquence pratique, énoncée dès maintenant.** ***Le delta change avec le temps.*** *Pour maintenir une couverture sans risque avec une option et le sous-jacent, il faut donc **ajuster périodiquement** sa détention d'actions.* C'est exactement le sujet du chapitre 18.

## 🔴 Concept 6 — Caler la volatilité : le choix de $u$ et $d$

**La question.** *Faut-il caler la volatilité dans le monde **réel** ou dans le monde **risque-neutre** ? **Cela n'a pas d'importance** : pour un $\Delta t$ petit et des valeurs particulières de $u$ et $d$, la volatilité supposée est **la même dans les deux mondes**.*

**Dans le monde réel**, avec $p^\ast$ la probabilité de hausse et $\mu$ le rendement espéré :

$$p^\ast S_0u+(1-p^\ast)S_0d=S_0e^{\mu\Delta t}\ \Longrightarrow\ \boxed{p^\ast=\frac{e^{\mu\Delta t}-d}{u-d}}\;\text{(12.11)}$$

**La volatilité** est définie de sorte que $\sigma\sqrt{\Delta t}$ soit l'**écart-type du rendement** sur un court intervalle $\Delta t$, la variance étant $\sigma^2\Delta t$. Sur l'arbre :

$$p^\ast u^2+(1-p^\ast)d^2-\big[p^\ast u+(1-p^\ast)d\big]^2=\sigma^2\Delta t\;\text{(12.12)}$$

*(Justification de Hull en note : le rendement vaut $u-1$ ou $d-1$ ; **retrancher 1 ne change pas la variance**, donc c'est la variance d'une variable valant $u$ avec probabilité $p^\ast$ et $d$ sinon, calculée par $\mathbb E(X^2)-[\mathbb E(X)]^2$.)*

En substituant (12.11) dans (12.12) :

$$e^{\mu\Delta t}(u+d)-ud-e^{2\mu\Delta t}=\sigma^2\Delta t$$

*En ignorant les termes en $\Delta t^2$ et les puissances supérieures*, une solution est :

$$\boxed{u=e^{\sigma\sqrt{\Delta t}}}\;\text{(12.13)}\qquad\qquad\boxed{d=e^{-\sigma\sqrt{\Delta t}}=\frac1u}\;\text{(12.14)}$$

**Ce sont les valeurs proposées par Cox, Ross et Rubinstein (1979).**

**Et dans le monde risque-neutre ?** L'espérance est $S_0e^{r\Delta t}$ et la variance du rendement vaut $e^{r\Delta t}(u+d)-ud-e^{2r\Delta t}$ ; *en substituant les mêmes $u$ et $d$, on trouve **$\sigma^2\Delta t$** aux termes d'ordre supérieur près.*

> ⚠️ **Le résultat conceptuel majeur — le théorème de Girsanov, annoncé ici.** *Cette analyse montre que, **lorsqu'on passe du monde réel au monde risque-neutre, le rendement espéré de l'action change, mais sa volatilité reste la même** (au moins à la limite $\Delta t\to0$). C'est une illustration d'un résultat général important : **quand on passe d'un monde avec un ensemble de préférences pour le risque à un monde avec un autre ensemble, les taux de croissance espérés changent, mais les volatilités restent inchangées.***
>
> *Passer d'un ensemble de préférences à un autre s'appelle **changer de mesure**. La mesure du monde réel est la **mesure $P$**, celle du monde risque-neutre la **mesure $Q$**.* Avec la notation du chapitre : $p$ est la probabilité sous **$Q$**, $p^\ast$ sous **$P$**.

**Les quatre formules qui définissent l'arbre.**

$$u=e^{\sigma\sqrt{\Delta t}}\qquad d=\frac1u\qquad \boxed{p=\frac{a-d}{u-d}}\;\text{(12.15)}\qquad \boxed{a=e^{r\Delta t}}\;\text{(12.16)}$$

<details><summary>**Exercice résolu — le put américain avec un vrai calage (figure 12.10)**</summary>

**Données.** $S_0=50$, $K=52$, $r=5\,\%$, **2 ans**, **deux pas** ($\Delta t=1$), $\sigma=30\,\%$.

*Étape 1 — les paramètres.*

$$u=e^{0{,}3\times1}=\mathbf{1{,}3499}\qquad d=\frac1{1{,}3499}=\mathbf{0{,}7408}\qquad a=e^{0{,}05}=\mathbf{1{,}0513}$$

$$p=\frac{1{,}0513-0{,}7408}{1{,}3499-0{,}7408}=\frac{0{,}3105}{0{,}6091}=\mathbf{0{,}5097}$$

*(Le livre imprime « 1,053 » au numérateur — coquille sans effet : le résultat 0,5097 est celui de $a=1{,}0513$.)*

*Étape 2 — l'arbre des prix.* $50\to67{,}49\to\mathbf{91{,}11}$ · $50\to67{,}49\to\mathbf{50}$ (et $50\to37{,}04\to50$) · $50\to37{,}04\to\mathbf{27{,}44}$. *Étape 3 — les payoffs terminaux.* $91{,}11\to\mathbf{0}$ · $50\to52-50=\mathbf{2}$ · $27{,}44\to52-27{,}44=\mathbf{24{,}56}$. *Étape 4 — nœud haut ($S=67{,}49$).* Continuation $=e^{-0{,}05}(0{,}5097\times0+0{,}4903\times2)=\mathbf{0{,}93}$ ; exercice **négatif** → $\mathbf{0{,}93}$. *Étape 5 — nœud bas ($S=37{,}04$).* Continuation $=e^{-0{,}05}(0{,}5097\times2+0{,}4903\times24{,}56)=\mathbf{12{,}42}$ ; exercice $=52-37{,}04=\mathbf{14{,}96}$ → **on exerce**, valeur $\mathbf{14{,}96}$. *Étape 6 — la racine.*

$$e^{-0{,}05}(0{,}5097\times0{,}93+0{,}4903\times14{,}96)=\mathbf{7{,}43}$$

⚠️ **Notez la différence avec la figure 12.8 (7,43 contre 5,0894).** *Elle vient de ce que l'on avait pris $u=1{,}2$ et $d=0{,}8$ arbitrairement, au lieu de les caler sur $\sigma=30\,\%$.* **Le calage n'est pas un détail : il change le prix de 46 %.**

*Et l'option est bien **exercée à la fin du premier pas si le nœud bas est atteint**.*

</details>

## 🟠 Concept 7 — Augmenter le nombre de pas

> *Le modèle présenté est **irréaliste de simplicité** : un analyste ne peut espérer qu'une approximation très grossière avec un ou deux pas.* En pratique, *on divise la vie de l'option en **30 pas ou plus**. Avec 30 pas, il y a **31 prix terminaux** et **$2^{30}$, soit environ un milliard, de trajectoires** implicitement considérées.*

**Les équations ne changent pas** — seulement $\Delta t$. *Exemple avec **cinq** pas au lieu de deux, sur les mêmes données :*

$$\Delta t=\frac25=0{,}4\qquad u=e^{0{,}3\sqrt{0{,}4}}=\mathbf{1{,}2089}\qquad d=\mathbf{0{,}8272}\qquad a=e^{0{,}02}=\mathbf{1{,}0202}\qquad p=\mathbf{0{,}5056}$$

**La convergence, chiffrée.**

| Nombre de pas | Prix du put **américain** |
|---|---|
| 2 | **7,428** |
| 5 | **7,671** |
| 500 | **7,47** |

*Le put **européen** de mêmes paramètres vaut **6,76** avec 500 pas — **exactement** la valeur donnée par la formule de Black-Scholes-Merton.*

> **Le lien avec le chapitre 14.** *À mesure que le nombre de pas augmente (donc que $\Delta t$ diminue), le modèle binomial fait **les mêmes hypothèses** sur le comportement du prix de l'action que le modèle de Black-Scholes-Merton. Le prix d'une option européenne **converge** vers le prix Black-Scholes-Merton.*

## 🔴 Concept 8 — Options sur d'autres actifs : une seule chose change

> **Le principe.** *On construit et utilise les arbres **exactement de la même façon** que pour les actions, **sauf que l'équation de $p$ change**.* La formule (12.2) reste vraie : la valeur à un nœud, **avant** de considérer l'exercice anticipé, est $p$ fois la valeur en cas de hausse plus $1-p$ fois celle en cas de baisse, **actualisée au taux sans risque**.

$$\boxed{u=e^{\sigma\sqrt{\Delta t}},\quad d=\frac1u,\quad p=\frac{a-d}{u-d}\quad\text{— seul }a\text{ change}}$$

| Sous-jacent | Raisonnement | $a$ |
|---|---|---|
| **Action sans dividende** | croissance risque-neutre au taux $r$ | $e^{r\Delta t}$ |
| **Action à rendement $q$** | *le rendement total est $r$ ; les dividendes en fournissent $q$ ; **les plus-values doivent donc fournir $r-q$*** | $e^{(r-q)\Delta t}$ |
| **Indice** | même hypothèse qu'au chapitre 5 : dividende au taux $q$ | $e^{(r-q)\Delta t}$ |
| **Devise** | *une devise étrangère est un actif procurant un rendement au taux sans risque étranger* | $e^{(r-r_f)\Delta t}$ |
| **Futures** | ***il ne coûte rien de prendre une position sur un futures : en monde risque-neutre, un prix futures doit avoir un taux de croissance espéré NUL*** | $\mathbf{1}$ |

<details><summary>**Trois exercices résolus — indice, devise, futures**</summary>

**Exemple 12.1 — call européen sur indice.** Indice **810**, $\sigma=20\,\%$, $q=2\,\%$, $r=5\,\%$, call **6 mois** $K=800$, **deux pas**.

$$\Delta t=0{,}25\quad u=e^{0{,}20\sqrt{0{,}25}}=e^{0{,}1}=\mathbf{1{,}1052}\quad d=\mathbf{0{,}9048}$$

$$a=e^{(0{,}05-0{,}02)\times0{,}25}=e^{0{,}0075}=\mathbf{1{,}0075}\qquad p=\frac{1{,}0075-0{,}9048}{1{,}1052-0{,}9048}=\mathbf{0{,}5126}$$

*Arbre :* $810\to895{,}19\to\mathbf{989{,}34}$ · milieu **810** · $810\to732{,}92\to\mathbf{663{,}17}$. *Payoffs :* $\mathbf{189{,}34}$ · $\mathbf{10}$ · $\mathbf{0}$. *Remontée :* nœud haut $=e^{-0{,}0125}(0{,}5126\times189{,}34+0{,}4874\times10)=\mathbf{100{,}66}$ ; nœud bas $=e^{-0{,}0125}(0{,}5126\times10)=\mathbf{5{,}06}$ ; racine $=e^{-0{,}0125}(0{,}5126\times100{,}66+0{,}4874\times5{,}06)=\boxed{\mathbf{53{,}39}}$.

**Exemple 12.2 — call américain sur devise.** AUD à **0,6100** USD, $\sigma=12\,\%$, $r_{\text{AUD}}=7\,\%$, $r_{\text{USD}}=5\,\%$, call **3 mois** $K=0{,}6000$, **trois pas**.

$$\Delta t=0{,}08333\quad u=e^{0{,}12\sqrt{0{,}08333}}=\mathbf{1{,}0352}\quad d=\mathbf{0{,}9660}$$

$$a=e^{(0{,}05-0{,}07)\times0{,}08333}=\mathbf{0{,}9983}\qquad p=\frac{0{,}9983-0{,}9660}{1{,}0352-0{,}9660}=\mathbf{0{,}4673}$$

Valeur de l'option : $\boxed{\mathbf{0{,}019}}$. **Ici $a<1$** parce que $r_f>r$ : le prix de la devise **décroît** en espérance risque-neutre.

**Exemple 12.3 — put américain sur futures.** Prix futures **31**, $\sigma=30\,\%$, $r=5\,\%$, put **9 mois** $K=30$, **trois pas**.

$$\Delta t=0{,}25\quad u=e^{0{,}3\sqrt{0{,}25}}=e^{0{,}15}=\mathbf{1{,}1618}\quad d=\mathbf{0{,}8607}\quad a=\mathbf{1}$$

$$p=\frac{1-0{,}8607}{1{,}1618-0{,}8607}=\frac{0{,}1393}{0{,}3011}=\mathbf{0{,}4626}$$

Valeur de l'option : $\boxed{\mathbf{2{,}84}}$. **$a=1$ mais on actualise quand même à $e^{-r\Delta t}$.** La croissance espérée du **prix futures** est nulle ; l'actualisation du **payoff** reste au taux sans risque. Ne jamais confondre les deux rôles de $r$.

</details>

## Comment reconnaître le type d'exercice

| Signal | Ce qu'on demande | Outil |
|---|---|---|
| Deux prix futurs donnés directement | $u$ et $d$ **imposés** | $p=(a-d)/(u-d)$ |
| Une **volatilité** donnée | **caler** l'arbre | $u=e^{\sigma\sqrt{\Delta t}}$, $d=1/u$ |
| « combien d'actions pour couvrir ? » | **delta** | $(f_u-f_d)/(S_0u-S_0d)$ |
| Option **américaine** | tester à chaque nœud | $\max(\text{continuation},\text{exercice})$ |
| Un rendement de dividende $q$ | **indice** ou action à rendement | $a=e^{(r-q)\Delta t}$ |
| Deux taux, deux devises | **change** | $a=e^{(r-r_f)\Delta t}$ |
| Un prix **futures** | **futures** | $a=1$ |
| « et si la probabilité réelle était 0,9 ? » | **piège** | **le prix ne change pas** |

## Comment résoudre ce type d'exercice

**Protocole arbre complet — 6 étapes.**

1. Calculer $\Delta t=T/n$, puis $u=e^{\sigma\sqrt{\Delta t}}$, $d=1/u$, $a$ **selon le sous-jacent**, $p=(a-d)/(u-d)$.
2. **Vérifier $0<p<1$** — sinon il y a une erreur (ou un arbitrage dans les données).
3. Construire l'arbre des prix : le nœud $(i,j)$ vaut $S_0u^jd^{i-j}$.
4. Calculer les **payoffs terminaux**.
5. **Remonter** : à chaque nœud, $e^{-r\Delta t}[pf_u+(1-p)f_d]$ ; pour une **américaine**, prendre le **max** avec le payoff d'exercice.
6. **Contrôler** : le prix américain doit être $\ge$ le prix européen, et le call américain sans dividende doit **égaler** l'européen (fiche 83).

**Protocole delta — 2 étapes.**

1. Repérer les **deux nœuds** atteints depuis le nœud courant.
2. $\Delta=\dfrac{f_{\text{haut}}-f_{\text{bas}}}{S_{\text{haut}}-S_{\text{bas}}}$ — **positif** pour un call, **négatif** pour un put.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Utiliser la probabilité **réelle** de hausse | Elle n'intervient **jamais** — elle est déjà dans $S_0$ |
| Actualiser au rendement espéré de l'action | On actualise **toujours** au taux **sans risque** |
| Oublier le test d'exercice à un nœud intermédiaire | Une **américaine** se teste à **chaque** nœud |
| Choisir $u$ et $d$ arbitrairement quand $\sigma$ est donnée | $u=e^{\sigma\sqrt{\Delta t}}$ — l'écart de prix atteint **46 %** dans l'exemple |
| Écrire $\sqrt{\Delta t}$ comme $\Delta t$ dans $u$ | C'est bien **$\sigma\sqrt{\Delta t}$** |
| Prendre $a=e^{r\Delta t}$ pour un futures | **$a=1$** — croissance risque-neutre nulle |
| Ne pas actualiser un arbre sur futures | On actualise **quand même** à $e^{-r\Delta t}$ |
| Oublier que $r_f$ se **retranche** pour une devise | $a=e^{(r-r_f)\Delta t}$, et $a<1$ si $r_f>r$ |
| Croire que le delta est constant | Il **change** à chaque nœud et à chaque instant |
| Croire que la volatilité change avec la mesure | **Girsanov** : la **dérive** change, **pas** la volatilité |

## 📌 Ultimate Review

**Les quatre formules de l'arbre.**

$$u=e^{\sigma\sqrt{\Delta t}}\qquad d=\frac1u\qquad p=\frac{a-d}{u-d}\qquad f=e^{-r\Delta t}\big[pf_u+(1-p)f_d\big]$$

**Le paramètre $a$ selon le sous-jacent.** Action : $e^{r\Delta t}$ · rendement $q$ ou indice : $e^{(r-q)\Delta t}$ · devise : $e^{(r-r_f)\Delta t}$ · **futures : $1$**.

**Le delta.** $\Delta=\dfrac{f_u-f_d}{S_0u-S_0d}$ — nombre d'actions par option **vendue** ; il **change dans le temps**.

**Américaine.** $f=\max(\text{continuation},\text{exercice immédiat})$, testé à **chaque** nœud.

**Les trois piliers conceptuels.** (i) Deux titres, deux issues → **portefeuille sans risque toujours constructible**. (ii) **La probabilité réelle n'intervient pas** — elle est déjà dans $S_0$. (iii) **Girsanov** : changer de mesure change la **dérive**, pas la **volatilité** ; mesure $P$ (réelle) contre mesure $Q$ (risque-neutre).

**Les chiffres du chapitre.** Exemple canonique : $\Delta=0{,}25$, portefeuille **4,5**, $f=\mathbf{0{,}633}$, $p=\mathbf{0{,}6523}$, taux d'actualisation réel implicite **42,58 %** · arbre à deux pas : **2,0257** puis **1,2823** · put européen **4,1923**, américain **5,0894** · put calé ($\sigma=30\,\%$) : $u=1{,}3499$, $p=0{,}5097$, **7,43** · convergence **7,428 / 7,671 / 7,47** ; européen **6,76** $=$ Black-Scholes · indice : $p=0{,}5126$, **53,39** · devise : $p=0{,}4673$, **0,019** · futures : $p=0{,}4626$, **2,84**.

## 🧠 Active Recall

<details><summary>Pourquoi peut-on **toujours** construire un portefeuille sans risque dans un arbre à un pas ?</summary>

Parce qu'*il y a **deux titres** — l'action et l'option — et seulement **deux issues possibles***. On a donc **une inconnue** ($\Delta$) et **une équation** (égalité des valeurs finales) : le système a toujours une solution. C'est cette coïncidence de dimensions qui rend le marché **complet** et fait fonctionner tout l'argument d'absence d'arbitrage.

</details>

<details><summary>Action à 20 → 22 ou 18 ; call $K=21$ ; $r=12\,\%$ ; 3 mois. Trouver $\Delta$ puis $f$.</summary>

$22\Delta-1=18\Delta\Rightarrow\Delta=\mathbf{0{,}25}$. Portefeuille : $22(0{,}25)-1=18(0{,}25)=\mathbf{4{,}5}$ dans les deux cas. Valeur actuelle : $4{,}5e^{-0{,}03}=\mathbf{4{,}367}$. Coût de constitution $=20(0{,}25)-f=5-f$. Donc $f=5-4{,}367=\boxed{0{,}633}$.

</details>

<details><summary>Le prix de l'option change-t-il si la probabilité réelle de hausse passe de 0,5 à 0,9 ?</summary>

**Non.** *La formule (12.2) ne fait pas intervenir les probabilités de hausse ou de baisse.* La raison : *nous ne valorisons pas l'option en termes absolus mais **en termes du prix de l'action sous-jacente**. **Les probabilités de mouvements futurs sont déjà incorporées dans le prix de l'action** : il n'y a pas à en tenir compte une seconde fois.*

</details>

<details><summary>Qu'est-ce que la valorisation risque-neutre, et pourquoi est-ce « presque miraculeux » ?</summary>

C'est l'hypothèse que *les investisseurs n'augmentent pas le rendement exigé pour compenser un risque accru*. Dans un tel monde : **(1)** le rendement espéré de tout actif est $r$ ; **(2)** on actualise au taux $r$.

Le miracle : *supposer un monde risque-neutre donne **le bon prix pour le monde où nous vivons**, et cela **contourne le problème que nous ne savons pratiquement rien de l'aversion au risque** des acheteurs et vendeurs.* Preuve dans l'exemple : le taux d'actualisation correct **du monde réel** serait **42,58 %** — un nombre inconnaissable dont on n'a jamais besoin.

</details>

<details><summary>Prouver que $p=(e^{rT}-d)/(u-d)$ est bien une probabilité risque-neutre.</summary>

$$\mathbb E(S_T)=pS_0u+(1-p)S_0d=pS_0(u-d)+S_0d$$

En substituant $p$ :

$$\mathbb E(S_T)=S_0\big(e^{rT}-d\big)+S_0d=S_0e^{rT}$$

*L'action croît donc **en moyenne au taux sans risque** : elle se comporte exactement comme dans un monde risque-neutre.*

</details>

<details><summary>Comment valorise-t-on une option américaine sur un arbre ?</summary>

*On remonte de la fin vers le début en **testant à chaque nœud si l'exercice anticipé est optimal**.* Les valeurs terminales sont celles de l'européenne ; à chaque nœud antérieur, on prend **le plus grand** de la **valeur de continuation** $e^{-r\Delta t}[pf_u+(1-p)f_d]$ et du **payoff d'exercice immédiat**. Dans l'exemple, seul le nœud $S=40$ voit l'exercice optimal ($12>9{,}4636$) — et c'est ce seul nœud qui fait passer le prix de **4,1923** à **5,0894**.

</details>

<details><summary>Calculer les deltas du put de la figure 12.7 et en tirer la conclusion pratique.</summary>

Premier pas : $\dfrac{1{,}4147-9{,}4636}{60-40}=\mathbf{-0{,}4024}$. Second pas, après hausse : $\dfrac{0-4}{72-48}=\mathbf{-0{,}1667}$ ; après baisse : $\dfrac{4-20}{48-32}=\mathbf{-1{,}0000}$.

**Conclusion :** le delta **change dans le temps**. *Pour maintenir une couverture sans risque, il faut **ajuster périodiquement** sa position en actions* — c'est le sujet du chapitre 18.

</details>

<details><summary>Comment cale-t-on $u$ et $d$ sur la volatilité, et pourquoi cela ne dépend-il pas de la mesure ?</summary>

On impose que la variance du rendement sur l'arbre égale $\sigma^2\Delta t$. En substituant $p^\ast=(e^{\mu\Delta t}-d)/(u-d)$, on obtient $e^{\mu\Delta t}(u+d)-ud-e^{2\mu\Delta t}=\sigma^2\Delta t$, dont une solution (en ignorant les termes en $\Delta t^2$) est

$$u=e^{\sigma\sqrt{\Delta t}},\qquad d=e^{-\sigma\sqrt{\Delta t}}=1/u$$

**Cox, Ross et Rubinstein, 1979.** Le même calcul avec $r$ au lieu de $\mu$ redonne $\sigma^2\Delta t$ : *quand on passe du monde réel au monde risque-neutre, **le rendement espéré change mais la volatilité reste la même***. C'est le **théorème de Girsanov**.

</details>

<details><summary>Que sont les mesures $P$ et $Q$ ?</summary>

$P$ est la **mesure du monde réel** — celle sous laquelle l'action croît au rendement espéré $\mu$, avec probabilité de hausse $p^\ast$. $Q$ est la **mesure risque-neutre** — celle sous laquelle l'action croît au taux $r$, avec probabilité de hausse $p$. *Passer de l'une à l'autre s'appelle **changer de mesure** ; cela **modifie les taux de croissance espérés mais laisse les volatilités inchangées**.*

</details>

<details><summary>Pourquoi le put calé sur $\sigma=30\,\%$ vaut-il 7,43 alors qu'il valait 5,0894 avec $u=1{,}2$ ?</summary>

Parce que $u=1{,}2$ et $d=0{,}8$ étaient **arbitraires**. Le calage donne $u=e^{0{,}3}=\mathbf{1{,}3499}$ et $d=\mathbf{0{,}7408}$ — un arbre **beaucoup plus large**, donc une volatilité implicite bien supérieure, donc une option plus chère. **Écart : +46 %.** *Le calage n'est pas un raffinement : c'est ce qui fait que l'arbre représente le vrai sous-jacent.*

</details>

<details><summary>Comment adapter l'arbre à un indice, à une devise, à un futures ?</summary>

**Une seule chose change : $a$.** Indice ou action à rendement $q$ : $a=e^{(r-q)\Delta t}$ — *le rendement total est $r$, les dividendes en fournissent $q$, donc les plus-values doivent fournir $r-q$*. Devise : $a=e^{(r-r_f)\Delta t}$ — *une devise est un actif procurant un rendement au taux sans risque étranger*. **Futures : $a=1$** — *il ne coûte rien de prendre une position, donc en monde risque-neutre le prix futures a une croissance espérée **nulle***. $u$, $d$ et l'actualisation à $e^{-r\Delta t}$ sont **inchangés dans tous les cas**.

</details>

<details><summary>Combien de trajectoires un arbre à 30 pas considère-t-il, et vers quoi le prix converge-t-il ?</summary>

**$2^{30}$, soit environ un milliard** de trajectoires, pour **31 prix terminaux**. *À mesure que $\Delta t$ diminue, le modèle binomial fait **les mêmes hypothèses** que Black-Scholes-Merton*, et le prix d'une option **européenne converge** vers le prix de la formule fermée. Vérification chiffrée : le put européen à 500 pas vaut **6,76**, exactement la valeur de Black-Scholes-Merton ; l'américain vaut **7,47**.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Quelle est la seule hypothèse nécessaire ? | **Pas d'opportunité d'arbitrage** |
| Pourquoi peut-on toujours couvrir ? | **Deux titres**, **deux issues** |
| Formule du delta ? | $\Delta=\dfrac{f_u-f_d}{S_0u-S_0d}$ |
| Que représente le delta ? | Nombre d'**actions par option vendue** |
| Signe du delta d'un call ? d'un put ? | **Positif** / **négatif** |
| Le delta est-il constant ? | **Non** — il change à chaque nœud |
| Formule du prix à un nœud ? | $f=e^{-r\Delta t}[pf_u+(1-p)f_d]$ |
| Formule de $p$ ? | $p=\dfrac{a-d}{u-d}$ |
| La probabilité réelle intervient-elle ? | **Jamais** |
| Pourquoi ? | Elle est **déjà incorporée dans $S_0$** |
| Les deux propriétés d'un monde risque-neutre ? | Rendement espéré $=r$ · actualisation à $r$ |
| Que vaut $\mathbb E(S_T)$ sous $Q$ ? | $S_0e^{rT}$ |
| La recette risque-neutre en trois temps ? | Probabilités $Q$ → payoff espéré → **actualiser à $r$** |
| Taux d'actualisation réel de l'exemple ? | **42,58 %** |
| Formule directe à deux pas ? | $e^{-2r\Delta t}[p^2f_{uu}+2p(1-p)f_{ud}+(1-p)^2f_{dd}]$ |
| Que sont $p^2$, $2p(1-p)$, $(1-p)^2$ ? | Les probabilités des **nœuds terminaux** |
| Règle pour une américaine ? | $\max(\text{continuation},\text{exercice})$ à **chaque** nœud |
| Put européen / américain de l'exemple ? | **4,1923** / **5,0894** |
| Calage de $u$ ? | $u=e^{\sigma\sqrt{\Delta t}}$ |
| Calage de $d$ ? | $d=1/u=e^{-\sigma\sqrt{\Delta t}}$ |
| Qui a proposé ce calage ? | **Cox, Ross et Rubinstein (1979)** |
| Que vaut $a$ pour une action ? | $e^{r\Delta t}$ |
| Pour un indice ou un rendement $q$ ? | $e^{(r-q)\Delta t}$ |
| Pour une devise ? | $e^{(r-r_f)\Delta t}$ |
| Pour un futures ? | $\mathbf{a=1}$ |
| Pourquoi $a=1$ pour un futures ? | Entrer coûte **zéro** → croissance risque-neutre **nulle** |
| Actualise-t-on quand même sur un arbre de futures ? | **Oui**, à $e^{-r\Delta t}$ |
| Que dit le théorème de Girsanov ? | Changer de mesure change la **dérive**, **pas** la volatilité |
| Qu'est-ce que la mesure $P$ ? $Q$ ? | Monde **réel** / monde **risque-neutre** |
| Combien de pas en pratique ? | **30 ou plus** |
| Trajectoires implicites avec 30 pas ? | Environ **un milliard** ($2^{30}$) |
| Vers quoi converge le prix européen ? | Le prix de **Black-Scholes-Merton** |
| Put américain à 2 / 5 / 500 pas ? | **7,428** / **7,671** / **7,47** |
| Put européen à 500 pas ? | **6,76** — identique à Black-Scholes |
| $p$ de l'exemple sur indice ? | **0,5126**, valeur **53,39** |
| $p$ de l'exemple sur devise ? | **0,4673**, valeur **0,019** |
| $p$ de l'exemple sur futures ? | **0,4626**, valeur **2,84** |
