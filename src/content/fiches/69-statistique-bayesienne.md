# Fiche 69 — Statistique bayésienne : a priori, a posteriori, Jeffreys et estimateur de Bayes

|  |  |
|---|---|
| **Matière** | Maths · Économétrie |
| **Cours source** | Rigollet, *18.650 Statistics for Applications*, MIT OpenCourseWare, automne 2016 — chapitre 8 « Bayesian Statistics » |
| **Difficulté** | High — l'autre façon de faire de la statistique |
| **Temps d'étude estimé** | 2 h |
| **Prérequis** | Fiche 64 (vraisemblance, information de Fisher), fiche 67 (estimateurs, intervalles de confiance) |
| **Concepts clés** | Approche fréquentiste et bayésienne, loi a priori, loi a posteriori, formule de Bayes, conjugaison bêta-binomiale, a priori non informatif, a priori impropre, a priori de Jeffreys, invariance par reparamétrisation, région de confiance bayésienne, estimateur de Bayes |
| **Poids à l'examen** | Trois choses : la **formule de Bayes** $\pi(\theta\mid X)\propto\pi(\theta)p_n(X\mid\theta)$ et la conjugaison bêta-Bernoulli ; l'**a priori de Jeffreys** et son invariance ; et la distinction **région de confiance bayésienne** / intervalle de confiance. |

## 🎯 Vue d'ensemble

> **L'approche fréquentiste**, celle des fiches 64 à 68 :
>
> - on **observe des données** ;
> - ces données ont été engendrées **aléatoirement** (par la Nature, par des mesures, par la conception d'un sondage…) ;
> - on fait des **hypothèses** sur le processus générateur (i.i.d., données gaussiennes, densité régulière, fonction de régression linéaire…) ;
> - ce processus est associé à un **objet d'intérêt** (un paramètre, une densité…) ;
> - *cet objet était **inconnu mais fixe**, et l'on voulait le trouver : on l'estimait, ou l'on testait une hypothèse à son sujet.*

> **L'approche bayésienne.** *On observe toujours des données, supposées engendrées aléatoirement par un processus associé à un objet fixe. Mais :*
>
> - *on a une **croyance a priori** à son sujet ;*
> - *en utilisant les données, on veut **mettre à jour** cette croyance et la transformer en une **croyance a posteriori**.*

```
FRÉQUENTISTE   θ est FIXE et inconnu → on l'estime
BAYÉSIEN       on modélise notre CROYANCE sur θ comme une loi
     a priori π(θ)  ──── données ────→  a posteriori π(θ|X)
FORMULE        π(θ|X) ∝ π(θ) · p_n(X|θ)
                        ↑          ↑
                    croyance   vraisemblance
ESTIMATEUR     θ̂ = moyenne a posteriori
```

## 🟡 Concept 1 — L'exemple fondateur

> Soit $p$ la **proportion de femmes** dans la population. On échantillonne $n$ personnes au hasard avec remise et l'on note $X_1,\dots,X_n$ leur genre ($1$ pour une femme, $0$ sinon).
>
> *Dans l'approche fréquentiste, on estimait $p$ (par l'EMV), on construisait un intervalle de confiance, on faisait des tests d'hypothèses ($H_0:p=0{,}5$ contre $H_1:p\neq0{,}5$).*
>
> *Avant d'analyser les données, on peut croire que $p$ est vraisemblablement **proche de $1/2$**.*

> **L'approche bayésienne est un outil pour :**
>
> 1. *inclure **mathématiquement** notre croyance a priori dans les procédures statistiques ;*
> 2. *mettre à jour cette croyance a priori en utilisant les données.*

**Comment quantifier la croyance.** *On est sûr à $90\,\%$ que $p$ est entre $0{,}4$ et $0{,}6$, à $95\,\%$ qu'il est entre $0{,}3$ et $0{,}8$, etc. On peut donc **modéliser notre croyance a priori par une loi** pour $p$, **comme si $p$ était aléatoire**.*

> ⚠️ ***En réalité, le vrai paramètre n'est pas aléatoire !** L'approche bayésienne est une façon de modéliser notre **croyance** sur le paramètre en **faisant comme si** il l'était.*

Par exemple $p\sim B(a,a)$ (loi bêta) pour un $a>0$. *Cette loi s'appelle la **loi a priori**.*

**Et après observation.** *$X_1,\dots,X_n$ sont supposées i.i.d. de Bernoulli de paramètre $p$ **conditionnellement à $p$**. Après avoir observé l'échantillon, on met à jour notre croyance en prenant la loi de $p$ **conditionnellement aux données** : c'est la **loi a posteriori**.* Ici,

$$B\left(a+\sum_{i=1}^nX_i,\ a+n-\sum_{i=1}^nX_i\right)$$

## 🔴 Concept 2 — La formule de Bayes

**Le cadre.** On considère une loi de probabilité sur l'espace des paramètres $\Theta$, de densité $\pi(\cdot)$ : la **loi a priori**. Soit $X_1,\dots,X_n$ un échantillon, et $p_n(\cdot\mid\theta)$ la densité jointe de $X_1,\dots,X_n$ **conditionnellement à $\theta$**, où $\theta\sim\pi$. *On suppose généralement les $X_i$ i.i.d. conditionnellement à $\theta$.*

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

La loi conditionnelle de $\theta$ sachant $X_1,\dots,X_n$ est la **loi a posteriori**, de densité $\pi(\cdot\mid X_1,\dots,X_n)$.

</div>

<div class="callout" data-kind="formel">

<span class="callout__lab">Formule de Bayes.</span>

$$\boxed{\ \pi(\theta\mid X_1,\dots,X_n)\ \propto\ \pi(\theta)\,p_n(X_1,\dots,X_n\mid\theta), \qquad \forall\theta\in\Theta\ }$$

*La constante ne dépend pas de $\theta$ :*

$$\pi(\theta\mid X_1,\dots,X_n)=\frac{\pi(\theta)\,p_n(X_1,\dots,X_n\mid\theta)}{\int_\Theta p_n(X_1,\dots,X_n\mid t)\,d\pi(t)}$$

</div>

> **Lisez la formule dans les deux sens.**
>
> - **A posteriori $\propto$ a priori $\times$ vraisemblance.** La croyance finale combine ce qu'on croyait avant et ce que les données disent. Si l'a priori est plat, seule la vraisemblance compte — on retombe sur le maximum de vraisemblance.
> - **Le dénominateur est une simple constante de normalisation.** C'est pourquoi on travaille presque toujours avec le symbole $\propto$ : on identifie la forme fonctionnelle en $\theta$, on reconnaît une loi connue, et la constante se déduit.

⚠️ **Le renversement conceptuel est complet par rapport à la fiche 65.** Le fréquentiste calcule $\mathbb P[\text{données}\mid H_0]$ — la p-valeur. Le bayésien calcule $\mathbb P[\theta\mid\text{données}]$ — la loi a posteriori. Ce sont les deux conditionnements inverses, et passer de l'un à l'autre exige précisément une **loi a priori**, ce que le cadre fréquentiste refuse de fournir.

## 🔴 Concept 3 — L'exemple bêta-Bernoulli en détail

**L'a priori.** $\pi(p)\propto p^{a-1}(1-p)^{a-1}$ pour $p\in(0,1)$ — c'est la densité de $B(a,a)$.

**La vraisemblance.** Sachant $p$, les $X_i$ sont i.i.d. $\mathrm{Ber}(p)$, donc

$$p_n(X_1,\dots,X_n\mid p)=p^{\sum_{i=1}^nX_i}(1-p)^{n-\sum_{i=1}^nX_i}$$

**L'a posteriori.** Par la formule de Bayes,

$$\pi(p\mid X_1,\dots,X_n)\ \propto\ p^{a-1+\sum_iX_i}(1-p)^{a-1+n-\sum_iX_i}$$

On **reconnaît** la forme d'une densité bêta, donc

$$\boxed{\ \pi(\cdot\mid X_1,\dots,X_n)=B\left(a+\sum_{i=1}^nX_i,\ a+n-\sum_{i=1}^nX_i\right)\ }$$

> **C'est le phénomène de conjugaison** : l'a priori est bêta, l'a posteriori aussi. La mise à jour se réduit à **ajouter les succès au premier paramètre et les échecs au second**. Aucune intégrale à calculer — on lit le résultat.
>
> **L'interprétation des paramètres de l'a priori** devient alors très parlante : $B(a,a)$ équivaut à avoir déjà observé $a$ succès et $a$ échecs **fictifs**. Plus $a$ est grand, plus la croyance initiale est ferme et plus il faudra de données pour la déplacer. C'est ce qu'on appelle des « observations équivalentes a priori ».

## 🔴 Concept 4 — Les a priori non informatifs

> **L'idée.** *En cas d'ignorance, ou d'absence d'information a priori, on peut vouloir utiliser un a priori **aussi peu informatif que possible**.*
>
> **Bon candidat** : $\pi(\theta)\propto1$, c'est-à-dire une densité **constante** sur $\Theta$.
>
> - Si $\Theta$ est **borné**, c'est l'a priori **uniforme** sur $\Theta$.
> - Si $\Theta$ est **non borné**, cela **ne définit pas une densité valide** sur $\Theta$ !

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

Un **a priori impropre** sur $\Theta$ est une fonction mesurable, positive, définie sur $\Theta$, **non intégrable**.

*En général, on peut malgré tout définir une loi a posteriori à partir d'un a priori impropre, en utilisant la formule de Bayes.*

</div>

**Les deux exemples.**

- Si $p\sim U(0,1)$ et, sachant $p$, $X_1,\dots,X_n\overset{iid}\sim\mathrm{Ber}(p)$ : $$\pi(p\mid X_1,\dots,X_n)\propto p^{\sum_iX_i}(1-p)^{n-\sum_iX_i} \quad\Longrightarrow\quad B\left(1+\sum_iX_i,\ 1+n-\sum_iX_i\right)$$
- Si $\pi(\theta)=1$ pour tout $\theta\in\mathbb R$ et, sachant $\theta$, $X_1,\dots,X_n\overset{iid}\sim N(\theta,1)$ : $$\pi(\theta\mid X_1,\dots,X_n)\propto\exp\left(-\frac12\sum_{i=1}^n(X_i-\theta)^2\right) \quad\Longrightarrow\quad N\left(\bar X_n,\ \frac1n\right)$$

⚠️ **Le second cas illustre bien le mécanisme.** $\pi(\theta)=1$ sur $\mathbb R$ n'est **pas** une densité — son intégrale est infinie. Pourtant, multipliée par la vraisemblance gaussienne, elle donne une a posteriori parfaitement **propre** : $N(\bar X_n,1/n)$. L'impropriété de l'a priori est « absorbée » par l'intégrabilité de la vraisemblance.

> **Et remarquez le résultat** : la moyenne a posteriori est $\bar X_n$, l'EMV, et la variance $1/n$ reproduit exactement la variance de $\bar X_n$. **Avec un a priori plat, bayésien et fréquentiste coïncident** — ce qui est rassurant, puisque ne rien croire a priori revient à laisser parler les seules données.

## 🔴 Concept 5 — L'a priori de Jeffreys

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

$$\boxed{\ \pi_J(\theta)\ \propto\ \sqrt{\det I(\theta)}\ }$$

*où $I(\theta)$ est la **matrice d'information de Fisher** du modèle statistique associé à $X_1,\dots,X_n$ dans l'approche fréquentiste (lorsqu'elle existe).*

</div>

**Les deux exemples.**

- **Exemple 1** (Bernoulli) : $I(p)=\dfrac{1}{p(1-p)}$ (fiche 64), donc $$\pi_J(p)\propto\frac{1}{\sqrt{p(1-p)}}, \qquad p\in(0,1)$$ *L'a priori est $B(1/2,1/2)$.*
- **Exemple 2** (gaussien de variance connue) : $\pi_J(\theta)\propto1$ pour $\theta\in\mathbb R$ — c'est un **a priori impropre**.

> **Le principe d'invariance par reparamétrisation.** *Si $\eta$ est une reparamétrisation de $\theta$, c'est-à-dire $\eta=\varphi(\theta)$ pour une application bijective $\varphi$, alors la densité $\tilde\pi(\cdot)$ de $\eta$ vérifie*
>
> $$\tilde\pi(\eta)\propto\sqrt{\det\tilde I(\eta)}$$
>
> *où $\tilde I(\eta)$ est l'information de Fisher du modèle paramétré par $\eta$ au lieu de $\theta$.*

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi cette invariance est la justification décisive de Jeffreys.</span>

L'a priori uniforme a un défaut caché : **il n'est pas invariant**. Être « uniforme sur $p$ » n'est pas être « uniforme sur $\log\frac{p}{1-p}$ » — ignorer $p$ n'entraîne pas ignorer son logit. Le choix de la paramétrisation, qui devrait être arbitraire, influencerait alors les conclusions.

L'a priori de Jeffreys, lui, **se transforme correctement** : appliquer $\pi_J$ dans une paramétrisation ou dans une autre donne **la même loi a posteriori**. C'est ce qui en fait le candidat canonique d'a priori non informatif.

⚠️ **Et remarquez la belle circularité** : le fréquentiste utilise $I(\theta)$ pour mesurer la **précision** de son estimateur (fiche 64) ; le bayésien l'utilise pour définir son **ignorance**. Là où l'information est grande, l'a priori de Jeffreys met **plus de masse** — précisément là où les données discrimineront le mieux.

</div>

## 🟠 Concept 6 — Les régions de confiance bayésiennes

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

Pour $\alpha\in(0,1)$, une **région de confiance bayésienne de niveau $\alpha$** est un sous-ensemble aléatoire $R$ de l'espace des paramètres $\Theta$, dépendant de l'échantillon, tel que

$$\mathbb P\big[\theta\in R\mid X_1,\dots,X_n\big]=1-\alpha$$

*Noter que $R$ **dépend de l'a priori** $\pi(\cdot)$.*

> ***« Région de confiance bayésienne » et « intervalle de confiance » sont deux notions distinctes.***

</div>

⚠️ **Cette dernière phrase mérite d'être développée, car c'est le point le plus souvent confondu.**

|  | **Intervalle de confiance** (fiche 67) | **Région bayésienne** |
|---|---|---|
| Ce qui est aléatoire | l'**intervalle** $I$ | le **paramètre** $\theta$ |
| Énoncé | $\mathbb P_\theta[I\ni\theta]\geq1-\alpha$ | $\mathbb P[\theta\in R\mid X]=1-\alpha$ |
| Sur quoi porte la probabilité | la **procédure**, répétée | la **croyance**, ce coup-ci |
| Dépend d'un a priori | non | **oui** |
| Lecture | « $95\,\%$ des intervalles ainsi construits contiendraient $\theta$ » | « je crois à $95\,\%$ que $\theta\in R$ » |

> **La lecture bayésienne est celle que tout le monde croit faire en lisant un intervalle de confiance** — et c'est précisément pourquoi la confusion est si répandue. Mais elle a un prix : elle dépend de l'a priori choisi, donc elle n'est pas « objective ».

## 🔴 Concept 7 — L'estimation bayésienne

> **Le changement de point de vue.** *Le cadre bayésien peut aussi servir à **estimer le vrai paramètre sous-jacent** — donc dans une approche fréquentiste. Dans ce cas, la loi a priori **ne reflète pas une croyance** : c'est un **outil artificiel** servant à définir une **nouvelle classe d'estimateurs**.*

**La construction.** L'échantillon $X_1,\dots,X_n$ est associé à un modèle $\big(E,(\mathbb P_\theta)_{\theta\in\Theta}\big)$. On définit une loi — éventuellement **impropre** — de densité $\pi$ sur $\Theta$, on calcule la densité a posteriori $\pi(\cdot\mid X_1,\dots,X_n)$ associée à $\pi$ vue comme a priori, puis :

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition — estimateur de Bayes.</span>

$$\boxed{\ \hat\theta^{(\pi)}=\int_\Theta\theta\ d\pi(\theta\mid X_1,\dots,X_n)\ }$$

*C'est la **moyenne a posteriori**.*

*L'estimateur bayésien **dépend du choix de l'a priori** $\pi$ — d'où l'exposant.*

</div>

**Les exemples.**

**Exemple 1**, avec a priori $B(a,a)$, $a>0$ :

$$\hat p^{(\pi)}=\frac{a+\sum_{i=1}^nX_i}{2a+n}=\frac{a/n+\bar X_n}{2a/n+1}$$

En particulier, pour $a=1/2$ (**a priori de Jeffreys**) :

$$\hat p^{(\pi_J)}=\frac{1/(2n)+\bar X_n}{1/n+1}$$

**Exemple 2** : $\hat\theta^{(\pi_J)}=\bar X_n$.

> **Les propriétés asymptotiques.** *Dans chacun de ces exemples, l'estimateur de Bayes est **consistant et asymptotiquement normal**.* *En général, les **propriétés asymptotiques de l'estimateur de Bayes ne dépendent pas du choix de l'a priori**.*

> **C'est le résultat qui réconcilie les deux écoles.** Regardez la formule de l'exemple 1 :
>
> $$\hat p^{(\pi)}=\frac{a/n+\bar X_n}{2a/n+1}\ \xrightarrow[n\to\infty]{}\ \bar X_n$$
>
> L'a priori contribue par des termes en $a/n$, qui **s'évanouissent** quand $n$ croît. Autrement dit : **les données finissent toujours par l'emporter sur la croyance initiale**.
>
> **La conséquence pratique.** Le choix de l'a priori compte sur **petit échantillon** — c'est là qu'il régularise, et c'est là qu'il est contestable. Sur grand échantillon, bayésien et fréquentiste **convergent vers la même réponse**. C'est le contenu du théorème de Bernstein-von Mises.

⚠️ **Notez le rôle régularisateur de l'a priori sur petit échantillon.** Si l'on observe $n=3$ succès sur $3$ essais, l'EMV donne $\hat p=1$ — une certitude absurde. L'estimateur de Bayes avec $a=1/2$ donne $\frac{0{,}5+3}{1+3}=0{,}875$, bien plus raisonnable. C'est exactement l'arbitrage biais-variance de la fiche 67 : un peu de biais contre beaucoup de variance en moins.

## Comment résoudre l'exercice type (protocole)

1. **Identifier le modèle** : $p_n(X\mid\theta)$, la vraisemblance.
2. **Choisir l'a priori** $\pi(\theta)$ : informatif (croyance), uniforme, ou **Jeffreys** $\propto\sqrt{\det I(\theta)}$.
3. **Appliquer la formule de Bayes** : $\pi(\theta\mid X)\propto\pi(\theta)p_n(X\mid\theta)$.
4. **Reconnaître la loi** dans l'expression obtenue — la constante de normalisation se déduit.
5. **Calculer l'estimateur de Bayes** : la **moyenne a posteriori**.
6. **Vérifier le comportement asymptotique** : les termes en $1/n$ venant de l'a priori doivent s'évanouir.
7. **Pour une région de confiance** : prendre un ensemble de masse a posteriori $1-\alpha$ — et **ne pas confondre** avec un intervalle de confiance.

### Comment reconnaître qu'il faut utiliser cette méthode ?

| Indice dans l'énoncé | Ce qu'il faut faire |
|---|---|
| « on croit a priori que… » | approche **bayésienne**, a priori informatif |
| « en l'absence d'information » | a priori **uniforme** ou de **Jeffreys** |
| « $\Theta$ non borné et a priori constant » | a priori **impropre** |
| a priori bêta $+$ données Bernoulli | **conjugaison** ⟹ a posteriori bêta |
| a priori plat $+$ données gaussiennes | a posteriori $N(\bar X_n,1/n)$ |
| « quelle est la probabilité que $\theta\in R$ ? » | **région bayésienne**, pas IC |
| « invariance par changement de paramétrisation » | **Jeffreys** |
| « estimateur régularisé sur petit échantillon » | estimateur de **Bayes** |
| « l'a priori influence-t-il le résultat ? » | non **asymptotiquement** |

### Exercices progressifs

**Niveau 1** — Calculez l'a posteriori pour un a priori $B(a,a)$ et des données de Bernoulli.

<details><summary>Correction</summary>

**L'a priori.** $\pi(p)\propto p^{a-1}(1-p)^{a-1}$ sur $(0,1)$.

**La vraisemblance.** Sachant $p$, avec $S=\sum_{i=1}^nX_i$ :

$$p_n(X_1,\dots,X_n\mid p)=p^S(1-p)^{n-S}$$

**La formule de Bayes.**

$$\pi(p\mid X)\ \propto\ p^{a-1}(1-p)^{a-1}\cdot p^S(1-p)^{n-S}=p^{a-1+S}(1-p)^{a-1+n-S}$$

**La reconnaissance.** C'est la forme d'une densité $B(\alpha,\beta)$ avec $\alpha-1=a-1+S$ et $\beta-1=a-1+n-S$, donc

$$\pi(\cdot\mid X)=B\big(a+S,\ a+n-S\big)$$

**L'estimateur de Bayes.** La moyenne d'une $B(\alpha,\beta)$ vaut $\frac{\alpha}{\alpha+\beta}$, donc

$$\hat p^{(\pi)}=\frac{a+S}{(a+S)+(a+n-S)}=\frac{a+S}{2a+n}=\frac{a/n+\bar X_n}{2a/n+1}$$

**La lecture.** C'est une **moyenne pondérée** entre $\bar X_n$ (les données) et $1/2$ (le centre de l'a priori $B(a,a)$), avec un poids $\frac{2a}{2a+n}$ pour l'a priori. Ce poids tend vers $0$ quand $n\to\infty$ : **les données l'emportent**.

**Le phénomène de conjugaison.** A priori bêta $\to$ a posteriori bêta. La mise à jour se réduit à ajouter $S$ succès et $n-S$ échecs aux paramètres. On peut donc lire $B(a,a)$ comme « $a$ succès et $a$ échecs fictifs déjà observés ».

</details>

**Niveau 2** — Qu'est-ce qu'un a priori impropre, et pourquoi est-ce acceptable ?

<details><summary>Correction</summary>

**La définition.** *Un a priori impropre sur $\Theta$ est une fonction mesurable, positive, définie sur $\Theta$, mais **non intégrable**.*

**D'où cela vient.** On cherche un a priori « non informatif », et le candidat naturel est $\pi(\theta)\propto1$ — constant. Si $\Theta$ est **borné**, c'est l'uniforme, parfaitement légitime. Si $\Theta$ est **non borné** — par exemple $\Theta=\mathbb R$ —, alors $\int_{\mathbb R}1\,d\theta=\infty$ : **ce n'est pas une densité**.

**Pourquoi c'est malgré tout acceptable.** *En général, on peut quand même définir une loi a posteriori en utilisant la formule de Bayes.* Ce qui compte est que le **produit** soit intégrable :

$$\pi(\theta\mid X)\propto\pi(\theta)\,p_n(X\mid\theta)$$

Si $\pi\equiv1$ et $p_n(X\mid\theta)$ est intégrable en $\theta$ — ce qui est le cas des vraisemblances usuelles —, l'a posteriori est une **vraie densité**.

**L'exemple du cours.** $\pi(\theta)=1$ sur $\mathbb R$ avec $X_i\overset{iid}\sim N(\theta,1)$ :

$$\pi(\theta\mid X)\propto\exp\left(-\frac12\sum_i(X_i-\theta)^2\right)\propto\exp\left(-\frac n2(\theta-\bar X_n)^2\right)$$

c'est-à-dire $N\big(\bar X_n,\frac1n\big)$ — parfaitement propre, malgré l'a priori impropre.

**Le résultat remarquable.** La moyenne a posteriori vaut $\bar X_n$, exactement l'EMV, et la variance a posteriori $1/n$ reproduit la variance de $\bar X_n$. **Avec un a priori plat, l'inférence bayésienne et l'inférence fréquentiste coïncident.**

⚠️ **La précaution à prendre.** Il faut **toujours vérifier** que l'a posteriori est propre. Il existe des combinaisons a priori impropre / vraisemblance où l'intégrale diverge : on obtient alors une « loi » qui n'en est pas une, et toute conclusion est vide de sens.

</details>

**Niveau 3** — Pourquoi l'a priori de Jeffreys et pas simplement l'uniforme ?

<details><summary>Correction</summary>

**La définition.** $\pi_J(\theta)\propto\sqrt{\det I(\theta)}$, où $I(\theta)$ est l'information de Fisher.

**Le défaut de l'uniforme : il n'est pas invariant.** Supposons qu'on veuille « ne rien croire » sur $p\in(0,1)$ et qu'on prenne $\pi(p)\propto1$. Reparamétrons par le logit $\eta=\log\frac{p}{1-p}$. Par changement de variable, la densité induite sur $\eta$ est

$$\tilde\pi(\eta)=\pi\big(p(\eta)\big)\left\lvert\frac{dp}{d\eta}\right\rvert\propto\frac{e^\eta}{(1+e^\eta)^2}$$

qui n'est **pas** constante. Autrement dit : **être uniforme sur $p$ n'est pas être uniforme sur $\eta$**. Deux personnes prétendant toutes deux « ne rien savoir », l'une raisonnant en $p$ et l'autre en logit, arriveraient à des a posteriori **différents**. C'est incohérent — le choix de la paramétrisation devrait être sans effet.

**Ce que Jeffreys corrige.** *Si $\eta=\varphi(\theta)$ pour une application bijective $\varphi$, alors la densité $\tilde\pi$ de $\eta$ vérifie $\tilde\pi(\eta)\propto\sqrt{\det\tilde I(\eta)}$* — c'est-à-dire que **l'a priori de Jeffreys calculé dans la nouvelle paramétrisation est exactement l'image de celui calculé dans l'ancienne**.

**Pourquoi cela marche.** Sous reparamétrisation, l'information de Fisher se transforme comme $\tilde I(\eta)=I(\theta)\big(\frac{d\theta}{d\eta}\big)^2$, donc $\sqrt{\tilde I(\eta)}=\sqrt{I(\theta)}\big\lvert\frac{d\theta}{d\eta}\big\rvert$ — exactement la règle de changement de variable pour une densité. **Le jacobien est absorbé.**

**Les deux exemples du cours.**

- Bernoulli : $I(p)=\frac{1}{p(1-p)}$, donc $\pi_J(p)\propto\frac{1}{\sqrt{p(1-p)}}$, c'est-à-dire $B(1/2,1/2)$ — une loi en U, qui met **plus de masse près de $0$ et de $1$** que l'uniforme.
- Gaussien de variance connue : $I(\theta)$ constante, donc $\pi_J(\theta)\propto1$ — **impropre**, mais qui redonne l'inférence fréquentiste.

**L'interprétation profonde.** L'a priori de Jeffreys met plus de masse là où l'information de Fisher est **grande**, c'est-à-dire là où les données **discriminent le mieux** entre valeurs voisines du paramètre. Pour Bernoulli, c'est près de $0$ et de $1$ : $I(p)=\frac{1}{p(1-p)}$ y explose (fiche 64). Autrement dit, l'a priori s'adapte à la **géométrie du modèle** plutôt qu'à un système de coordonnées arbitraire.

</details>

**Niveau 4 — type examen** — Comparez l'approche fréquentiste et l'approche bayésienne.

<details><summary>Correction</summary>

|  | **Fréquentiste** | **Bayésien** |
|---|---|---|
| Statut de $\theta$ | **fixe** et inconnu | modélisé **comme s'il était aléatoire** |
| Ce qui est aléatoire | les **données** | les données **et** la croyance sur $\theta$ |
| Point de départ | un modèle $\big(E,(\mathbb P_\theta)\big)$ | un modèle **plus un a priori** $\pi$ |
| Résultat | un **estimateur ponctuel**, un IC, un test | une **loi a posteriori** entière |
| Estimateur | EMV, moments | **moyenne a posteriori** |
| Incertitude | $\mathbb P_\theta[I\ni\theta]\geq1-\alpha$ | $\mathbb P[\theta\in R\mid X]=1-\alpha$ |
| Sur quoi porte la probabilité | la **procédure**, répétée | la **croyance**, ce coup-ci |

**Le point conceptuel décisif.** *En réalité, le vrai paramètre n'est pas aléatoire ! L'approche bayésienne est une façon de modéliser notre **croyance** en faisant comme si il l'était.* La probabilité change donc de nature : elle mesure une **incertitude épistémique** et non plus une fréquence limite.

**La formule qui articule tout.**

$$\pi(\theta\mid X_1,\dots,X_n)\ \propto\ \underbrace{\pi(\theta)}_{\text{croyance}}\cdot\underbrace{p_n(X_1,\dots,X_n\mid\theta)}_{\text{vraisemblance}}$$

Le fréquentiste ne garde que le second facteur — maximiser la vraisemblance, c'est le cas particulier d'un a priori plat.

**Ce que le bayésien apporte.**

1. **Une distribution complète** sur $\theta$, pas seulement un point et un écart-type.
2. Une **régularisation naturelle** sur petit échantillon : $3$ succès sur $3$ donnent $\hat p=1$ en EMV — certitude absurde — contre $0{,}875$ avec l'a priori de Jeffreys.
3. Des énoncés **directement interprétables** : « je crois à $95\,\%$ que $\theta\in R$ » est ce que tout le monde croit lire dans un intervalle de confiance.

**Ce qu'il coûte.**

1. Il faut **choisir un a priori**, et ce choix est contestable — d'où l'effort du cours sur les a priori non informatifs et sur **Jeffreys**, qui règle au moins le problème de l'arbitraire de la paramétrisation.
2. Le calcul de l'a posteriori demande une intégrale, praticable seulement en cas de **conjugaison** ou par méthodes numériques.

**La réconciliation asymptotique — et c'est la conclusion du cours.** *Les propriétés asymptotiques de l'estimateur de Bayes **ne dépendent pas du choix de l'a priori**.* La formule

$$\hat p^{(\pi)}=\frac{a/n+\bar X_n}{2a/n+1}\ \longrightarrow\ \bar X_n$$

le montre : la contribution de l'a priori est d'ordre $1/n$ et s'évanouit. **Les données finissent toujours par l'emporter.**

**La conclusion pratique.** Le débat n'a d'enjeu réel que sur **petit échantillon**, ou quand une information a priori véritable existe — antériorités cliniques, contraintes physiques, jugement d'expert. Sur grand échantillon, les deux écoles donnent la même réponse, et le choix relève de la commodité et de l'interprétation souhaitée.

</details>

## 🔴 Common mistakes

1. **Croire que le vrai paramètre est aléatoire** — *en réalité il ne l'est pas* ; on modélise une **croyance**.
2. **Oublier la constante de normalisation** — elle ne dépend pas de $\theta$, on peut travailler en $\propto$, mais il faut savoir qu'elle existe.
3. **Confondre région de confiance bayésienne et intervalle de confiance** — *deux notions distinctes*.
4. **Utiliser un a priori impropre sans vérifier que l'a posteriori est propre** — l'intégrale peut diverger.
5. **Croire que l'a priori uniforme est non informatif** — il **n'est pas invariant** par reparamétrisation.
6. **Oublier la racine carrée dans Jeffreys** — c'est $\sqrt{\det I(\theta)}$, pas $\det I(\theta)$.
7. **Prendre le mode a posteriori pour l'estimateur de Bayes** — c'est la **moyenne** a posteriori.
8. **Croire que le choix de l'a priori change les conclusions asymptotiques** — il ne les change pas.
9. **Négliger l'effet de l'a priori sur petit échantillon** — c'est là, au contraire, qu'il compte le plus.

## 📌 Ultimate Review

1. **Fréquentiste** : $\theta$ **fixe et inconnu**, on l'estime ou on le teste. **Bayésien** : on a une **croyance a priori**, qu'on **met à jour** par les données.
2. *En réalité le vrai paramètre **n'est pas aléatoire*** ; on modélise une croyance **comme si** il l'était.
3. **Loi a priori** $\pi(\theta)$ sur $\Theta$ ; **loi a posteriori** $\pi(\theta\mid X_1,\dots,X_n)$ = loi conditionnelle de $\theta$ sachant les données.
4. **Formule de Bayes** : $\pi(\theta\mid X)\propto\pi(\theta)p_n(X\mid\theta)$, la constante étant $\int_\Theta p_n(X\mid t)d\pi(t)$.
5. **Conjugaison bêta-Bernoulli** : a priori $B(a,a)$ ⟹ a posteriori $B\big(a+\sum X_i,\ a+n-\sum X_i\big)$.
6. **A priori non informatif** : $\pi(\theta)\propto1$ ; **uniforme** si $\Theta$ borné, **impropre** sinon.
7. **A priori impropre** : positif, mesurable, **non intégrable** ; l'a posteriori peut malgré tout être propre.
8. **Exemples** : $U(0,1)$ + Bernoulli ⟹ $B(1+\sum X_i,1+n-\sum X_i)$ ; $\pi\equiv1$ + $N(\theta,1)$ ⟹ $N\big(\bar X_n,\frac1n\big)$.
9. **A priori de Jeffreys** : $\pi_J(\theta)\propto\sqrt{\det I(\theta)}$ ; Bernoulli ⟹ $B(1/2,1/2)$ ; gaussien ⟹ $\pi_J\propto1$, impropre.
10. **Invariance par reparamétrisation** : si $\eta=\varphi(\theta)$, alors $\tilde\pi(\eta)\propto\sqrt{\det\tilde I(\eta)}$ — c'est la justification de Jeffreys.
11. **Région de confiance bayésienne** : $R$ aléatoire avec $\mathbb P[\theta\in R\mid X]=1-\alpha$ ; **dépend de l'a priori** ; **distincte** d'un intervalle de confiance.
12. **Estimation bayésienne** : l'a priori devient un **outil artificiel** définissant une classe d'estimateurs.
13. **Estimateur de Bayes** : $\hat\theta^{(\pi)}=\int_\Theta\theta\,d\pi(\theta\mid X)$, la **moyenne a posteriori**.
14. **Exemples** : $\hat p^{(\pi)}=\frac{a+\sum X_i}{2a+n}=\frac{a/n+\bar X_n}{2a/n+1}$ ; pour $a=1/2$, $\hat p^{(\pi_J)}=\frac{1/(2n)+\bar X_n}{1/n+1}$ ; $\hat\theta^{(\pi_J)}=\bar X_n$.
15. **Propriétés** : consistant et asymptotiquement normal ; *les propriétés asymptotiques **ne dépendent pas de l'a priori***.

**Formulas to know**

$$\pi(\theta\mid X_1,\dots,X_n)=\frac{\pi(\theta)p_n(X_1,\dots,X_n\mid\theta)}{\int_\Theta p_n(X_1,\dots,X_n\mid t)d\pi(t)}$$

$$B(a,a)\ +\ \mathrm{Ber}(p)\ \Longrightarrow\ B\Big(a+\sum_iX_i,\ a+n-\sum_iX_i\Big) \qquad \pi_J(\theta)\propto\sqrt{\det I(\theta)}$$

$$\hat\theta^{(\pi)}=\int_\Theta\theta\,d\pi(\theta\mid X_1,\dots,X_n) \qquad \hat p^{(\pi)}=\frac{a/n+\bar X_n}{2a/n+1}$$

**Methods to know** : appliquer la formule de Bayes et reconnaître la loi a posteriori ; calculer un a priori de Jeffreys ; calculer une moyenne a posteriori ; vérifier l'évanouissement asymptotique de l'a priori.

## 🧠 Active Recall

**Basic** — Énoncez la formule de Bayes pour la loi a posteriori.

<details><summary>Réponse</summary>

$$\pi(\theta\mid X_1,\dots,X_n)\ \propto\ \pi(\theta)\,p_n(X_1,\dots,X_n\mid\theta)$$

soit, avec la constante de normalisation explicite,

$$\pi(\theta\mid X_1,\dots,X_n)=\frac{\pi(\theta)\,p_n(X_1,\dots,X_n\mid\theta)}{\int_\Theta p_n(X_1,\dots,X_n\mid t)\,d\pi(t)}$$

**En mots** : a posteriori $\propto$ **a priori** $\times$ **vraisemblance**. Le dénominateur ne dépend pas de $\theta$ ; on travaille donc en $\propto$ et l'on reconnaît la loi obtenue.

</details>

**Understanding** — Pourquoi l'a priori de Jeffreys plutôt que l'uniforme ?

<details><summary>Réponse</summary>

Parce que l'a priori uniforme **n'est pas invariant par reparamétrisation**. Être uniforme sur $p$ n'est pas être uniforme sur $\log\frac{p}{1-p}$ : deux personnes prétendant « ne rien savoir », l'une raisonnant en $p$ et l'autre en logit, obtiendraient des a posteriori **différents**. Le choix de la paramétrisation, qui devrait être sans effet, en aurait un.

L'**a priori de Jeffreys** $\pi_J(\theta)\propto\sqrt{\det I(\theta)}$ satisfait le **principe d'invariance** : si $\eta=\varphi(\theta)$ avec $\varphi$ bijective, alors $\tilde\pi(\eta)\propto\sqrt{\det\tilde I(\eta)}$. La raison est que $\sqrt{I}$ se transforme **exactement comme le jacobien** d'un changement de variable de densité.

**Les deux exemples** : Bernoulli ⟹ $\pi_J(p)\propto\frac{1}{\sqrt{p(1-p)}}$, c'est-à-dire $B(1/2,1/2)$ ; gaussien de variance connue ⟹ $\pi_J\propto1$, **impropre**.

**L'interprétation** : Jeffreys met plus de masse là où l'information de Fisher est grande — là où les données discriminent le mieux. Il s'adapte à la **géométrie du modèle** plutôt qu'à un système de coordonnées arbitraire.

</details>

**Application** — On observe $8$ succès sur $10$ essais. Comparez l'EMV et l'estimateur de Bayes avec a priori de Jeffreys.

<details><summary>Réponse</summary>

**L'EMV** (fiche 64) : $\hat p^{MLE}=\bar X_n=\dfrac{8}{10}=\mathbf{0{,}80}$.

**L'estimateur de Bayes** avec l'a priori de Jeffreys, c'est-à-dire $a=1/2$ :

$$\hat p^{(\pi_J)}=\frac{a+\sum_iX_i}{2a+n}=\frac{0{,}5+8}{1+10}=\frac{8{,}5}{11}\approx\mathbf{0{,}773}$$

**La loi a posteriori complète** : $B(0{,}5+8,\ 0{,}5+10-8)=B(8{,}5;\ 2{,}5)$ — dont on peut tirer une **région de confiance bayésienne** et non seulement un point.

**La lecture.** L'estimateur de Bayes **tire légèrement vers le centre** : $0{,}773$ au lieu de $0{,}80$. C'est le **rétrécissement** (*shrinkage*) induit par l'a priori.

**Le cas extrême qui rend l'effet visible.** Avec $3$ succès sur $3$ :

- EMV : $\hat p=1$ — on affirmerait qu'un échec est **impossible**, sur la foi de trois observations. Absurde.
- Bayes ($a=1/2$) : $\frac{0{,}5+3}{1+3}=0{,}875$ — bien plus prudent.

**Et asymptotiquement.** $\hat p^{(\pi_J)}=\frac{1/(2n)+\bar X_n}{1/n+1}\to\bar X_n$ : les deux estimateurs **coïncident** quand $n$ grandit. L'a priori ne compte que sur petit échantillon — ce qui est exactement là où l'on en a besoin.

</details>

**Comparison** — Région de confiance bayésienne et intervalle de confiance : quelle différence ?

<details><summary>Réponse</summary>

Le cours est explicite : *ce sont **deux notions distinctes**.*

|  | **Intervalle de confiance** | **Région bayésienne** |
|---|---|---|
| Énoncé | $\mathbb P_\theta[I\ni\theta]\geq1-\alpha$ | $\mathbb P[\theta\in R\mid X_1,\dots,X_n]=1-\alpha$ |
| Ce qui est aléatoire | l'**intervalle** | le **paramètre** (au sens de la croyance) |
| Conditionnement | aucun — probabilité sur les échantillons | **sachant les données observées** |
| Dépend d'un a priori | non | **oui** |
| Lecture correcte | « $95\,\%$ des intervalles ainsi construits contiendraient $\theta$ » | « je crois à $95\,\%$ que $\theta\in R$ » |

**Le point crucial.** L'intervalle de confiance porte sur la **procédure répétée** : sur de nombreux échantillons, $95\,\%$ des intervalles construits ainsi contiendraient le vrai $\theta$. Il ne dit **rien** sur l'échantillon particulier qu'on a sous les yeux.

La région bayésienne porte sur la **croyance après avoir vu ces données-ci**. C'est l'énoncé que tout le monde croit lire dans un intervalle de confiance — et c'est précisément pour cela que la confusion est si répandue.

**Le prix de l'interprétation naturelle** : $R$ **dépend de l'a priori** choisi. Il n'y a pas de région bayésienne « objective ».

⚠️ **Numériquement, les deux coïncident souvent** — avec un a priori plat et un grand $n$, la région bayésienne et l'intervalle de confiance sont presque identiques. Mais leur **signification** reste différente.

</details>

**Exam-style** — Construisez l'inférence bayésienne complète pour un modèle de Bernoulli.

<details><summary>Réponse</summary>

**1. Le modèle.** $X_1,\dots,X_n\overset{iid}\sim\mathrm{Ber}(p)$ **conditionnellement à $p$**, avec $p\in(0,1)$. On note $S=\sum_iX_i$.

**2. Le choix de l'a priori.** Trois options :

- **informatif** : $p\sim B(a,a)$ si l'on croit $p$ proche de $1/2$ — le cours donne l'exemple « $90\,\%$ sûr que $p\in[0{,}4;0{,}6]$ » ;
- **uniforme** : $p\sim U(0,1)=B(1,1)$ ;
- **Jeffreys** : $\pi_J(p)\propto\frac{1}{\sqrt{p(1-p)}}$, c'est-à-dire $B(1/2,1/2)$, puisque $I(p)=\frac{1}{p(1-p)}$.

**3. La vraisemblance.** $p_n(X\mid p)=p^S(1-p)^{n-S}$.

**4. L'a posteriori, par la formule de Bayes.**

$$\pi(p\mid X)\propto p^{a-1}(1-p)^{a-1}\cdot p^S(1-p)^{n-S}=p^{a+S-1}(1-p)^{a+n-S-1}$$

On **reconnaît** une densité bêta :

$$\pi(\cdot\mid X)=B\big(a+S,\ a+n-S\big)$$

C'est la **conjugaison** : a priori bêta $\to$ a posteriori bêta, la mise à jour consistant simplement à ajouter succès et échecs.

**5. L'estimateur de Bayes** — la moyenne a posteriori :

$$\hat p^{(\pi)}=\frac{a+S}{2a+n}=\frac{a/n+\bar X_n}{2a/n+1}$$

et pour Jeffreys ($a=1/2$) : $\hat p^{(\pi_J)}=\frac{1/(2n)+\bar X_n}{1/n+1}$.

**6. La région de confiance bayésienne.** Tout $R\subset(0,1)$ de masse $1-\alpha$ sous $B(a+S,a+n-S)$ — par exemple l'intervalle entre les quantiles $\alpha/2$ et $1-\alpha/2$. **Ce n'est pas un intervalle de confiance** : c'est une région de **croyance**, et elle dépend de $a$.

**7. Le comportement asymptotique.** *L'estimateur de Bayes est consistant et asymptotiquement normal, et ses propriétés asymptotiques ne dépendent pas de l'a priori.* En effet,

$$\hat p^{(\pi)}=\frac{a/n+\bar X_n}{2a/n+1}\ \xrightarrow[n\to\infty]{}\ \bar X_n=\hat p^{MLE}$$

L'a priori contribue par des termes en $a/n$ qui s'évanouissent.

**Ce qu'il faut savoir commenter.**

- **Sur petit échantillon**, l'a priori **régularise** : $3$ succès sur $3$ donnent $\hat p^{MLE}=1$ (certitude absurde) contre $0{,}875$ pour Bayes. C'est l'arbitrage biais-variance de la fiche 67.
- **Sur grand échantillon**, les deux écoles **convergent**. Le débat n'a d'enjeu que là où les données sont rares — ce qui est aussi là où le choix de l'a priori est le plus contestable.
- **Le bayésien fournit une loi entière**, pas seulement un point : on peut en tirer n'importe quelle probabilité, région, ou décision, sans nouvelle théorie.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Statut de $\theta$ en fréquentiste ? | **Fixe et inconnu** |
| Statut de $\theta$ en bayésien ? | Modélisé **comme s'il était aléatoire** |
| Le vrai paramètre est-il aléatoire ? | **Non** — on modélise une **croyance** |
| Qu'est-ce que la loi a priori ? | La loi quantifiant la croyance **avant** les données |
| Qu'est-ce que la loi a posteriori ? | La loi de $\theta$ **conditionnellement aux données** |
| Formule de Bayes ? | $\pi(\theta\mid X)\propto\pi(\theta)p_n(X\mid\theta)$ |
| Que vaut la constante ? | $\int_\Theta p_n(X\mid t)d\pi(t)$ |
| A priori bêta $+$ Bernoulli ? | A posteriori $B(a+\sum X_i,\ a+n-\sum X_i)$ |
| Nom de ce phénomène ? | La **conjugaison** |
| Comment lire $B(a,a)$ ? | Comme $a$ succès et $a$ échecs **fictifs** |
| A priori non informatif naturel ? | $\pi(\theta)\propto1$ |
| Quand est-il uniforme ? | Si $\Theta$ est **borné** |
| Qu'est-ce qu'un a priori impropre ? | Positif, mesurable, **non intégrable** |
| Peut-on l'utiliser ? | **Oui**, si l'a posteriori est propre |
| $\pi\equiv1$ + $N(\theta,1)$ ? | A posteriori $N(\bar X_n,1/n)$ |
| A priori de Jeffreys ? | $\pi_J(\theta)\propto\sqrt{\det I(\theta)}$ |
| Jeffreys pour Bernoulli ? | $B(1/2,1/2)$ |
| Jeffreys pour le gaussien ? | $\pi_J\propto1$ — **impropre** |
| Quelle propriété justifie Jeffreys ? | L'**invariance par reparamétrisation** |
| Pourquoi l'uniforme échoue-t-il ? | Uniforme sur $p$ $\neq$ uniforme sur $\log\frac{p}{1-p}$ |
| Région de confiance bayésienne ? | $\mathbb P[\theta\in R\mid X]=1-\alpha$ |
| Est-ce un intervalle de confiance ? | **Non** — deux notions **distinctes** |
| De quoi $R$ dépend-il ? | De l'**a priori** |
| Estimateur de Bayes ? | La **moyenne a posteriori** $\int_\Theta\theta\,d\pi(\theta\mid X)$ |
| Sa valeur pour Bernoulli ? | $\frac{a+\sum X_i}{2a+n}=\frac{a/n+\bar X_n}{2a/n+1}$ |
| Sa valeur pour Jeffreys ? | $\frac{1/(2n)+\bar X_n}{1/n+1}$ |
| Ses propriétés asymptotiques ? | Consistant et asymptotiquement normal |
| Dépendent-elles de l'a priori ? | **Non** |
| Quand l'a priori compte-t-il ? | Sur **petit échantillon** |
| Quel rôle y joue-t-il ? | Il **régularise** — rétrécissement vers le centre |
