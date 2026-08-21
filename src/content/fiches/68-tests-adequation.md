# Fiche 68 — Tests d'adéquation : Glivenko-Cantelli, Kolmogorov-Smirnov et khi-deux

|  |  |
|---|---|
| **Matière** | Maths · Économétrie |
| **Cours source** | Rigollet, *18.650 Statistics for Applications*, MIT OpenCourseWare, automne 2016 — chapitre 6 « Testing goodness of fit » |
| **Difficulté** | Must know — c'est ici qu'on vérifie que le modèle tient |
| **Temps d'étude estimé** | 2 h 15 |
| **Prérequis** | Fiche 65 (tests, niveau, p-valeur), fiche 64 (maximum de vraisemblance), fiche 62 (mouvement brownien) |
| **Concepts clés** | Fonction de répartition empirique, théorème de Glivenko-Cantelli, théorème de Donsker, pont brownien, test de Kolmogorov-Smirnov, statistique pivotale, Cramér-Von Mises, Anderson-Darling, test de Kolmogorov-Lilliefors, graphique quantile-quantile, test du khi-deux d'adéquation |
| **Poids à l'examen** | Trois choses : **Glivenko-Cantelli et Donsker**, et le rôle du pont brownien ; le caractère **pivotal** de la statistique de Kolmogorov-Smirnov ; et les **degrés de liberté $K-d-1$** du test du khi-deux. |

## 🎯 Vue d'ensemble

Soit $X$ une variable aléatoire. Étant données des copies i.i.d. de $X$, on veut répondre à des questions du type :

- *$X$ a-t-elle la loi $N(0,1)$ ?* (cf. la loi de Student)
- *$X$ a-t-elle la loi $U([0,1])$ ?* (cf. la p-valeur sous $H_0$)
- *$X$ a-t-elle la fonction de masse $p_1=0{,}3$, $p_2=0{,}5$, $p_3=0{,}2$ ?*

> *Ce sont tous des **tests d'adéquation** : on veut savoir si la loi supposée est un bon ajustement pour les données.*
>
> ***Caractéristique essentielle des tests d'adéquation : aucune modélisation paramétrique.***

```
LA QUESTION   la loi supposée décrit-elle bien les données ?
OUTIL         la fonction de répartition EMPIRIQUE F_n
GARANTIE 1    Glivenko-Cantelli : sup|F_n − F| → 0   (consistance)
GARANTIE 2    Donsker : √n sup|F_n − F| → sup|pont brownien|  (loi)
TEST 1        Kolmogorov-Smirnov — loi continue, statistique PIVOTALE
TEST 2        khi-deux — loi discrète ou données regroupées, χ²_{K−d−1}
PIÈGE         estimer les paramètres invalide Donsker !
```

⚠️ **Ces tests répondent à la question laissée ouverte par la fiche 67.** Le modèle statistique y était supposé **bien spécifié** : la vraie loi appartient à la famille choisie. C'est une **hypothèse**, et c'est ici qu'on la teste.

## 🔴 Concept 1 — La fonction de répartition empirique

**Rappel.** Pour $X_1,\dots,X_n$ i.i.d. réelles, la fonction de répartition de $X_1$ est

$$F(t)=\mathbb P[X_1\leq t], \qquad \forall t\in\mathbb R$$

*Elle **caractérise entièrement** la loi de $X_1$.*

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

La **fonction de répartition empirique** de l'échantillon est

$$F_n(t)=\frac1n\sum_{i=1}^n\mathbf 1\{X_i\leq t\}=\frac{\#\{i=1,\dots,n:X_i\leq t\}}{n}, \qquad \forall t\in\mathbb R$$

</div>

**Par la loi des grands nombres**, pour tout $t\in\mathbb R$ :

$$F_n(t)\ \xrightarrow[n\to\infty]{\text{p.s.}}\ F(t)$$

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème de Glivenko-Cantelli</span>

*le théorème fondamental de la statistique*.

$$\boxed{\ \sup_{t\in\mathbb R}\big\lvert F_n(t)-F(t)\big\rvert\ \xrightarrow[n\to\infty]{\text{p.s.}}\ 0\ }$$

</div>

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi ce nom, et pourquoi ce théorème est plus fort que la LGN.</span>

La LGN donne la convergence **pour chaque $t$ fixé** ; Glivenko-Cantelli donne la convergence **uniforme en $t$** — le pire écart, sur toute la droite réelle, tend vers zéro.

**C'est ce qui justifie toute la statistique non paramétrique** : la fonction de répartition caractérisant la loi, et $F_n$ convergeant **uniformément** vers $F$, l'échantillon détermine asymptotiquement la loi **sans aucune hypothèse de modèle**. On n'a plus besoin de supposer Poisson, gaussienne ou quoi que ce soit.

</div>

## 🔴 Concept 2 — Donsker et le pont brownien

**Par le théorème central limite**, pour tout $t\in\mathbb R$ :

$$\sqrt n\big(F_n(t)-F(t)\big)\ \xrightarrow[n\to\infty]{(d)}\ N\Big(0,\ F(t)\big(1-F(t)\big)\Big)$$

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème de Donsker.</span>

*Si $F$ est **continue**, alors*

$$\boxed{\ \sqrt n\,\sup_{t\in\mathbb R}\big\lvert F_n(t)-F(t)\big\rvert\ \xrightarrow[n\to\infty]{(d)}\ \sup_{0\leq t\leq1}\lvert B(t)\rvert\ }$$

*où $B$ est un **pont brownien** sur $[0,1]$.*

</div>

> **Le rapport entre les deux théorèmes est celui entre LGN et TCL.** Glivenko-Cantelli dit que l'écart uniforme **tend vers zéro** ; Donsker dit **à quelle vitesse** — en $1/\sqrt n$ — et donne la **loi limite** de l'écart renormalisé.
>
> **Pourquoi un pont brownien.** $\mathbf 1\{X_i\leq t\}$ est une variable de Bernoulli de paramètre $F(t)$, donc la variance ponctuelle est $F(t)(1-F(t))$ — nulle en $t=-\infty$ et $t=+\infty$, maximale au milieu. Le processus limite est donc un mouvement brownien **contraint à s'annuler aux deux extrémités** : c'est exactement la définition du **pont brownien**. La contrainte vient de $F_n(-\infty)=F(-\infty)=0$ et $F_n(+\infty)=F(+\infty)=1$ — les deux fonctions coïncident **exactement** aux bords.

⚠️ **L'hypothèse de continuité de $F$ est essentielle**, et elle sera au cœur des concepts 5 et 7.

## 🔴 Concept 3 — Le test de Kolmogorov-Smirnov

**Le cadre.** $X_1,\dots,X_n$ i.i.d. réelles de fonction de répartition **inconnue** $F$, et $F^0$ une fonction de répartition **continue** donnée. On teste

$$H_0:\ F=F^0 \qquad\text{contre}\qquad H_1:\ F\neq F^0$$

*Si $F=F^0$, alors $F_n(t)\approx F^0(t)$ pour tout $t$.*

> **La statistique de test.**
>
> $$T_n=\sup_{t\in\mathbb R}\sqrt n\,\big\lvert F_n(t)-F^0(t)\big\rvert$$
>
> *Par le théorème de Donsker, si $H_0$ est vraie, alors $T_n\xrightarrow{(d)}Z$, où $Z$ a une **loi connue** — le supremum d'un pont brownien.*

> **Test KS de niveau asymptotique $\alpha$ :**
>
> $$\delta_\alpha^{KS}=\mathbf 1\{T_n>q_\alpha\}$$
>
> *où $q_\alpha$ est le quantile d'ordre $(1-\alpha)$ de $Z$, obtenu dans des tables.*
>
> **p-valeur du test KS** : $\mathbb P[Z>T_n\mid T_n]$.

## 🟠 Concept 4 — La formule pratique

> *En pratique, comment calculer $T_n$ ?*

**L'observation géométrique.** $F^0$ est **croissante et continue** ; $F_n$ est **constante par morceaux**, avec des sauts en $t_i=X_i$. Le supremum de l'écart est donc atteint **aux points de saut**.

Soit $X_{(1)}\leq X_{(2)}\leq\cdots\leq X_{(n)}$ l'échantillon **réordonné**. Juste à gauche de $X_{(i)}$, $F_n$ vaut $\frac{i-1}{n}$ ; en $X_{(i)}$ et juste à droite, elle vaut $\frac in$. Il y a donc **deux candidats par saut**, et

$$\boxed{\ T_n=\sqrt n\max_{i=1,\dots,n}\max\left\{\frac in-F^0\big(X_{(i)}\big),\ F^0\big(X_{(i)}\big)-\frac{i-1}{n}\right\}\ }$$

> **Le calcul est donc élémentaire** : trier l'échantillon, évaluer $F^0$ en chaque point, et prendre le maximum de $2n$ nombres. C'est une raison majeure du succès du test.

## 🔴 Concept 5 — Le caractère pivotal

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

*$T_n$ est une **statistique pivotale** : si $H_0$ est vraie, la loi de $T_n$ **ne dépend pas de la loi des $X_i$**, et elle est facile à reproduire par simulation.*

</div>

**La démonstration, en deux lignes.** Posons $U_i=F^0(X_i)$ et soit $G_n$ la fonction de répartition empirique de $U_1,\dots,U_n$. *Si $H_0$ est vraie, alors $U_1,\dots,U_n\overset{iid}\sim U([0,1])$* — c'est la transformation intégrale de probabilité — et

$$T_n=\sup_{0\leq x\leq1}\sqrt n\,\big\lvert G_n(x)-x\big\rvert$$

> **Voilà tout l'intérêt.** La loi de $T_n$ sous $H_0$ est **la même quelle que soit $F^0$** : gaussienne, exponentielle, Cauchy — peu importe. Une **seule table** de quantiles sert pour tous les tests d'adéquation. C'est ce qui rend le test universel.

**La procédure par simulation**, si l'on ne dispose pas de table. Pour un grand entier $M$ :

- *Simuler $M$ copies i.i.d. $T_n^1,\dots,T_n^M$ de $T_n$* — c'est possible **précisément parce que la loi ne dépend d'aucun paramètre inconnu** ;
- *Estimer le quantile $q_\alpha(n)$ d'ordre $(1-\alpha)$ par le quantile empirique $\hat q_\alpha^{(n,M)}$ de $T_n^1,\dots,T_n^M$.*

**Test de niveau approché $\alpha$** : $\delta_\alpha=\mathbf 1\{T_n>\hat q_\alpha^{(n,M)}\}$, et

$$\text{p-valeur}\approx\frac{\#\{j=1,\dots,M:T_n^j>T_n\}}{M}$$

*Ces quantiles sont souvent précalculés dans une table.*

## 🟡 Concept 6 — D'autres distances, d'autres tests

*On veut mesurer la **distance entre deux fonctions**, $F_n(t)$ et $F(t)$. Il y a d'autres façons de le faire, qui conduisent à d'autres tests.*

| Test | Distance |
|---|---|
| **Kolmogorov-Smirnov** | $d(F_n,F)=\displaystyle\sup_{t\in\mathbb R}\lvert F_n(t)-F(t)\rvert$ |
| **Cramér-Von Mises** | $d^2(F_n,F)=\displaystyle\int_{\mathbb R}\big[F_n(t)-F(t)\big]^2dt$ |
| **Anderson-Darling** | $d^2(F_n,F)=\displaystyle\int_{\mathbb R}\frac{\big[F_n(t)-F(t)\big]^2}{F(t)\big(1-F(t)\big)}dt$ |

<div class="callout" data-kind="methode">

<span class="callout__lab">Comment choisir — chaque distance a une sensibilité différente.</span>

- **KS** ne regarde que le **pire écart** : sensible à un décalage local, mais aveugle à de nombreux petits écarts.
- **Cramér-Von Mises** **intègre** l'écart au carré : elle prend en compte tout le domaine, donc détecte mieux des désaccords diffus.
- **Anderson-Darling** pondère par $\frac{1}{F(1-F)}$, qui **explose aux extrémités** : elle est donc bien plus sensible aux **queues** de distribution. C'est le test de choix quand ce sont les événements extrêmes qui comptent — donc en finance (fiche 55).

</div>

## 🔴 Concept 7 — Les tests composites et l'erreur classique

> *Que faire si l'on veut tester « $X$ a-t-elle une loi gaussienne ? » sans connaître les paramètres ?*

**L'idée simple — le remplacement.** Calculer

$$\sup_{t\in\mathbb R}\Big\lvert F_n(t)-\Phi_{\hat\mu,\hat\sigma^2}(t)\Big\rvert \qquad\text{où}\qquad \hat\mu=\bar X_n,\quad \hat\sigma^2=S_n^2$$

et $\Phi_{\hat\mu,\hat\sigma^2}$ est la fonction de répartition de $N(\hat\mu,\hat\sigma^2)$.

> ⚠️ *Dans ce cas, **le théorème de Donsker n'est plus valide**. C'est une erreur **courante et grave** !*

⚠️ **Pourquoi l'erreur est grave, et pourquoi elle est si tentante.** En estimant $\mu$ et $\sigma^2$ **sur les mêmes données**, on **rapproche artificiellement** $\Phi_{\hat\mu,\hat\sigma^2}$ de $F_n$ : la gaussienne ajustée est, par construction, celle qui colle le mieux à l'échantillon. La statistique est donc **systématiquement trop petite**, la loi limite n'est plus celle du supremum d'un pont brownien, et l'on **rejette beaucoup trop rarement** — on croit valider la normalité alors qu'on a seulement mesuré à quel point on a bien ajusté.

> C'est le même mécanisme que la perte de degrés de liberté en fiche 50 : estimer des paramètres sur les données **consomme de l'information**, et il faut en tenir compte.

> **La solution — le test de Kolmogorov-Lilliefors.** *On calcule à la place les quantiles de la statistique*
>
> $$\sup_{t\in\mathbb R}\Big\lvert F_n(t)-\Phi_{\hat\mu,\hat\sigma^2}(t)\Big\rvert$$
>
> ***Ils ne dépendent pas de paramètres inconnus !***

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi cela fonctionne.</span>

La statistique de Lilliefors reste **pivotale** : sa loi sous $H_0$ ne dépend ni de $\mu$ ni de $\sigma^2$, parce que la standardisation par $\hat\mu$ et $\hat\sigma$ élimine ces deux paramètres. On peut donc tabuler ses quantiles une fois pour toutes — mais ce sont des quantiles **différents** de ceux de Kolmogorov-Smirnov, et **plus petits**, précisément pour compenser l'ajustement.

</div>

## 🟡 Concept 8 — Les graphiques quantile-quantile

> - *Ils fournissent une façon **visuelle** de faire un test d'adéquation.*
> - *Ce n'est **pas un test formel**, mais une vérification rapide et facile pour voir si une loi est plausible.*
> - *L'idée : vérifier visuellement si le graphe de $F_n$ est proche de celui de $F$, ou de façon équivalente si le graphe de $F_n^{-1}$ est proche de celui de $F^{-1}$.*
> - *Il est plus commode de vérifier si les points* $$\left(F^{-1}\Big(\frac1n\Big),F_n^{-1}\Big(\frac1n\Big)\right),\ \left(F^{-1}\Big(\frac2n\Big),F_n^{-1}\Big(\frac2n\Big)\right),\ \dots,\ \left(F^{-1}\Big(\frac{n-1}{n}\Big),F_n^{-1}\Big(\frac{n-1}{n}\Big)\right)$$ *sont proches de la droite $y=x$.*
>
> *$F_n$ n'est techniquement pas inversible, mais on définit $F_n^{-1}(i/n)=X_{(i)}$, la $i$-ième plus grande observation.*

> **Ce qu'un QQ-plot montre que le test ne dit pas : *où* ça cloche.** Un test rend un verdict ; le graphique montre la **forme** du désaccord. Points au-dessus de la droite dans la queue droite et en dessous dans la queue gauche ⟹ **queues plus épaisses** que la loi supposée. Courbure systématique ⟹ **asymétrie**. C'est précisément le diagnostic recommandé en fiche 53 pour les résidus standardisés d'un GARCH.

## 🔴 Concept 9 — Le test du khi-deux, cas fini

**Le cadre.** Soient $X_1,\dots,X_n$ i.i.d. sur un espace **fini** $E=\{a_1,\dots,a_K\}$, de loi $\mathbb P$, et $(\mathbb P_\theta)_{\theta\in\Theta}$ une famille paramétrique de lois sur $E$. *Exemple : sur $E=\{1,\dots,K\}$, la famille des lois binomiales $(\mathrm{Bin}(K,p))_{p\in(0,1)}$.*

Pour $j=1,\dots,K$ et $\theta\in\Theta$, on pose

$$p_j(\theta)=\mathbb P_\theta[Y=a_j] \ \text{ où } Y\sim\mathbb P_\theta, \qquad\text{et}\qquad p_j=\mathbb P[X_1=a_j]$$

**Les hypothèses.**

$$H_0:\ \mathbb P\in(\mathbb P_\theta)_{\theta\in\Theta} \qquad\text{contre}\qquad H_1:\ \mathbb P\notin(\mathbb P_\theta)_{\theta\in\Theta}$$

> *Tester $H_0$, c'est tester si le **modèle statistique** $\big(E,(\mathbb P_\theta)_{\theta\in\Theta}\big)$ **s'ajuste aux données** — par exemple si les données proviennent bien d'une loi binomiale.*
>
> $H_0$ équivaut à : $p_j=p_j(\theta)$ pour tout $j$, pour un certain $\theta\in\Theta$.

**La construction.** Soit $\hat\theta$ l'**EMV de $\theta$ sous $H_0$**, et

$$\hat p_j=\frac1n\sum_{i=1}^n\mathbf 1\{X_i=a_j\}=\frac{\#\{i:X_i=a_j\}}{n}$$

> **L'idée.** *Si $H_0$ est vraie, alors $p_j=p_j(\theta)$, donc $\hat p_j$ et $p_j(\hat\theta)$ sont **tous deux de bons estimateurs de $p_j$**. Par conséquent $\hat p_j\approx p_j(\hat\theta)$ pour tout $j$.*

> **La statistique de test.**
>
> $$\boxed{\ T_n=n\sum_{j=1}^K\frac{\big(\hat p_j-p_j(\hat\theta)\big)^2}{p_j(\hat\theta)}\ }$$

> **Le théorème.** *Sous certaines hypothèses techniques, si $H_0$ est vraie,*
>
> $$T_n\ \xrightarrow[n\to\infty]{(d)}\ \chi^2_{K-d-1}$$
>
> *où $d$ est la dimension du paramètre $\theta$ ($\Theta\subseteq\mathbb R^d$ et $d<K-1$).*

**Test de niveau asymptotique $\alpha$** : $\delta_\alpha=\mathbf 1\{T_n>q_\alpha\}$, avec $q_\alpha$ le quantile d'ordre $(1-\alpha)$ de $\chi^2_{K-d-1}$. **p-valeur** : $\mathbb P[Z>T_n\mid T_n]$ où $Z\sim\chi^2_{K-d-1}$ indépendant de $T_n$.

⚠️ **Le compte des degrés de liberté, $K-d-1$, est LA question d'examen.** Il se lit en trois temps :

> - $K$ classes ⟹ $K$ fréquences observées ;
> - moins $1$ pour la contrainte $\sum_j\hat p_j=1$ — les fréquences ne sont pas libres ;
> - moins $d$ pour les $d$ paramètres **estimés sur les données**.
>
> C'est **exactement** la même comptabilité que le $n-p$ de la fiche 50 et le $n-1$ de Cochran en fiche 65 : **chaque paramètre estimé consomme un degré de liberté**. Et la condition $d<K-1$ garantit qu'il en reste au moins un.
>
> **Notez aussi la normalisation par $p_j(\hat\theta)$** : l'écart $\hat p_j-p_j(\hat\theta)$ est divisé par sa variance approchée, ce qui rend chaque terme comparable à un carré de gaussienne standard — d'où le $\chi^2$.

## 🟠 Concept 10 — Le test du khi-deux, cas infini

*Si $E$ est infini — $E=\mathbb N$, $E=\mathbb R$… —, on **partitionne** $E$ en $K$ classes disjointes :*

$$E=A_1\cup\cdots\cup A_K$$

et l'on définit, pour $\theta\in\Theta$ et $j=1,\dots,K$ :

$$p_j(\theta)=\mathbb P_\theta[Y\in A_j] \ \text{ pour } Y\sim\mathbb P_\theta, \qquad p_j=\mathbb P[X_1\in A_j], \qquad \hat p_j=\frac{\#\{i:X_i\in A_j\}}{n}$$

$\hat\theta$ étant obtenu comme précédemment. La statistique et la loi limite sont **inchangées** :

$$T_n=n\sum_{j=1}^K\frac{\big(\hat p_j-p_j(\hat\theta)\big)^2}{p_j(\hat\theta)}\ \xrightarrow[n\to\infty]{(d)}\ \chi^2_{K-d-1}$$

> **Les questions pratiques**, telles que le cours les pose : *choix de $K$ ? choix des classes $A_1,\dots,A_K$ ? calcul de $p_j(\theta)$ ?*

**L'exemple du cours.** Soit $E=\mathbb N$ et $H_0:\mathbb P\in(\mathrm{Poiss}(\lambda))_{\lambda>0}$. *Si l'on s'attend à ce que $\lambda$ ne dépasse pas un certain $\lambda_{\max}$, on peut choisir*

$$A_1=\{0\},\quad A_2=\{1\},\quad\dots,\quad A_{K-1}=\{K-2\},\quad A_K=\{K-1,K,K+1,\dots\}$$

*avec $K$ assez grand pour que $p_K(\lambda_{\max})\approx0$.*

> **La construction est astucieuse.** Les petites valeurs, fréquentes, ont chacune leur classe ; toute la **queue** est regroupée dans une classe finale $A_K$ de probabilité négligeable. On respecte ainsi la contrainte pratique — chaque classe doit contenir assez d'observations pour que l'approximation $\chi^2$ soit valable — sans perdre la résolution là où les données sont nombreuses.

⚠️ **Le regroupement en classes est une perte d'information, et c'est le prix du test du khi-deux.** Deux lois différentes ayant les mêmes probabilités de classe seront indiscernables. Sur des données **continues**, Kolmogorov-Smirnov est donc préférable — il utilise toute l'information de l'échantillon, sans découpage arbitraire.

## Comment résoudre l'exercice type (protocole)

1. **Identifier la nature de $H_0$** : loi **entièrement spécifiée** (test simple) ou **famille paramétrique** (test composite) ?
2. **Identifier la nature des données** : continues ⟹ Kolmogorov-Smirnov · discrètes ou regroupées ⟹ khi-deux.
3. **Test simple, données continues** : calculer $T_n$ par la formule des statistiques d'ordre, comparer à la table KS.
4. **Test composite** : **ne pas** utiliser la table KS ; utiliser **Kolmogorov-Lilliefors** ou le khi-deux.
5. **Khi-deux** : estimer $\hat\theta$ par maximum de vraisemblance **sous $H_0$**, calculer $\hat p_j$ et $p_j(\hat\theta)$, former $T_n$, comparer à $\chi^2_{K-d-1}$.
6. **Compter les degrés de liberté** : $K$ classes $-\,1$ (contrainte de somme) $-\,d$ (paramètres estimés).
7. **Compléter par un QQ-plot** — il montre **où** le modèle échoue.

### Comment reconnaître qu'il faut utiliser cette méthode ?

| Indice dans l'énoncé | Ce qu'il faut faire |
|---|---|
| « ces données suivent-elles la loi $F^0$ ? » | **Kolmogorov-Smirnov** |
| « … une loi gaussienne ? » (paramètres inconnus) | **Kolmogorov-Lilliefors**, pas KS |
| données **discrètes** ou en **classes** | test du **khi-deux** |
| « le modèle s'ajuste-t-il ? » | khi-deux d'adéquation |
| « combien de degrés de liberté ? » | $K-d-1$ |
| « les queues sont-elles bien modélisées ? » | **Anderson-Darling** |
| « vérification visuelle rapide » | **QQ-plot** |
| « simuler la loi de la statistique » | elle est **pivotale** — c'est possible |
| « peut-on estimer les paramètres puis appliquer KS ? » | **non** — Donsker tombe |

### Exercices progressifs

**Niveau 1** — Que disent Glivenko-Cantelli et Donsker, et quel est leur rapport ?

<details><summary>Correction</summary>

**Glivenko-Cantelli** — *le théorème fondamental de la statistique* :

$$\sup_{t\in\mathbb R}\big\lvert F_n(t)-F(t)\big\rvert\ \xrightarrow{\text{p.s.}}\ 0$$

La fonction de répartition empirique converge **uniformément** vers la vraie.

**Donsker** — si $F$ est **continue** :

$$\sqrt n\,\sup_{t\in\mathbb R}\big\lvert F_n(t)-F(t)\big\rvert\ \xrightarrow{(d)}\ \sup_{0\leq t\leq1}\lvert B(t)\rvert$$

où $B$ est un **pont brownien**.

**Leur rapport est celui de la LGN au TCL.**

|  | LGN / Glivenko-Cantelli | TCL / Donsker |
|---|---|---|
| Ponctuel | $F_n(t)\to F(t)$ | $\sqrt n(F_n(t)-F(t))\to N(0,F(1-F))$ |
| Uniforme | $\sup_t\lvert F_n-F\rvert\to0$ | $\sqrt n\sup_t\lvert F_n-F\rvert\to\sup\lvert B\rvert$ |
| Ce qu'il donne | la **convergence** | la **vitesse** et la **loi** |

**Pourquoi ils comptent.** Glivenko-Cantelli justifie qu'on **peut** apprendre la loi sans modèle paramétrique — c'est le fondement de la statistique non paramétrique. Donsker fournit la **loi limite** qui permet de construire un **test**, en calibrant le seuil de rejet.

</details>

**Niveau 2** — Pourquoi la statistique de Kolmogorov-Smirnov est-elle pivotale, et pourquoi est-ce précieux ?

<details><summary>Correction</summary>

**La démonstration.** Posons $U_i=F^0(X_i)$. Sous $H_0$, $X_i$ a pour fonction de répartition $F^0$, donc par la **transformation intégrale de probabilité**,

$$U_i\overset{iid}\sim U([0,1])$$

Soit $G_n$ la fonction de répartition empirique des $U_i$. Comme $F^0$ est continue et croissante, $\{X_i\leq t\}\iff\{U_i\leq F^0(t)\}$, et en posant $x=F^0(t)$ :

$$T_n=\sup_{t\in\mathbb R}\sqrt n\big\lvert F_n(t)-F^0(t)\big\rvert=\sup_{0\leq x\leq1}\sqrt n\big\lvert G_n(x)-x\big\rvert$$

**Le membre de droite ne dépend plus de $F^0$.** La loi de $T_n$ sous $H_0$ est donc **la même quelle que soit la loi testée**.

**Pourquoi c'est précieux — trois raisons.**

1. **Une seule table** de quantiles sert pour tous les tests d'adéquation : gaussienne, exponentielle, Cauchy, n'importe quoi.
2. **On peut simuler** la loi de $T_n$ — tirer $M$ échantillons uniformes et former les $T_n^j$ — précisément parce qu'aucun paramètre inconnu n'intervient. D'où la procédure du concept 5.
3. Le test est **exactement calibré**, sans approximation liée à la loi particulière testée.

⚠️ **Et c'est exactement ce qu'on perd dans le cas composite.** Si l'on estime $\hat\mu$ et $\hat\sigma^2$ sur les données, $\Phi_{\hat\mu,\hat\sigma^2}(X_i)$ n'est plus uniforme — les $U_i$ deviennent dépendants —, et **Donsker tombe**. Il faut alors la table de **Lilliefors**, différente et plus petite.

</details>

**Niveau 3** — Pourquoi le test du khi-deux a-t-il $K-d-1$ degrés de liberté ?

<details><summary>Correction</summary>

**Le décompte, en trois temps.**

**1. On part de $K$ fréquences.** $\hat p_1,\dots,\hat p_K$ : $K$ quantités observées.

**2. On retire $1$ pour la contrainte de somme.** $\sum_{j=1}^K\hat p_j=1$ **par construction**. Les fréquences ne sont pas libres : connaître $K-1$ d'entre elles détermine la dernière. Il ne reste que $K-1$ directions libres.

**3. On retire $d$ pour les paramètres estimés.** Le vecteur $\big(p_1(\hat\theta),\dots,p_K(\hat\theta)\big)$ est ajusté aux données via $\hat\theta\in\mathbb R^d$. Les écarts $\hat p_j-p_j(\hat\theta)$ sont donc **contraints dans $d$ directions supplémentaires** : l'EMV a rendu ces directions « nulles au premier ordre ».

**Total** : $K-1-d$ directions libres, donc $T_n\to\chi^2_{K-d-1}$.

**La condition $d<K-1$** garantit qu'il reste au moins un degré de liberté. Si $d=K-1$, le modèle a autant de paramètres que la loi générale : il s'ajuste parfaitement et il n'y a **rien à tester**.

**Le principe général, à retenir.** C'est la même comptabilité que partout :

| Contexte | Degrés de liberté |
|---|---|
| Variance empirique (Cochran, fiche 65) | $n-1$ (moyenne estimée) |
| Régression (fiche 50) | $n-p$ ($p$ coefficients estimés) |
| Khi-deux d'adéquation | $K-d-1$ (somme $+$ $d$ paramètres) |
| Rapport de vraisemblance (fiche 65) | $d-r$ (nombre de contraintes) |

**Chaque paramètre estimé sur les données consomme un degré de liberté.**

⚠️ **L'erreur classique** est d'utiliser $K-1$ en oubliant les paramètres estimés. Le seuil est alors **trop élevé** et l'on rejette trop rarement — on croit valider un modèle qu'on a simplement bien ajusté.

</details>

**Niveau 4 — type examen** — Pourquoi ne peut-on pas estimer les paramètres puis appliquer Kolmogorov-Smirnov ?

<details><summary>Correction</summary>

**La tentation.** On veut tester « $X$ est-elle gaussienne ? » sans connaître $\mu$ ni $\sigma^2$. L'idée naturelle est de les estimer par $\hat\mu=\bar X_n$ et $\hat\sigma^2=S_n^2$, puis de calculer

$$\sup_{t\in\mathbb R}\Big\lvert F_n(t)-\Phi_{\hat\mu,\hat\sigma^2}(t)\Big\rvert$$

et de comparer à la table de Kolmogorov-Smirnov.

> ⚠️ *Dans ce cas, le théorème de Donsker n'est plus valide. **C'est une erreur courante et grave !***

**Pourquoi Donsker tombe — deux raisons liées.**

**1. La perte du caractère pivotal.** L'argument du concept 5 reposait sur $U_i=F^0(X_i)\overset{iid}\sim U([0,1])$. Ici $F^0$ est remplacée par $\Phi_{\hat\mu,\hat\sigma^2}$, qui **dépend de tout l'échantillon**. Les variables $\Phi_{\hat\mu,\hat\sigma^2}(X_i)$ ne sont **ni uniformes ni indépendantes** — chacune a été « recalibrée » à l'aide des autres.

**2. Le rapprochement artificiel.** $\Phi_{\hat\mu,\hat\sigma^2}$ est, par construction, la gaussienne qui **colle le mieux** à l'échantillon : on a choisi $\hat\mu$ et $\hat\sigma^2$ pour cela. L'écart $\sup_t\lvert F_n-\Phi_{\hat\mu,\hat\sigma^2}\rvert$ est donc **systématiquement plus petit** que si l'on avait utilisé les vrais $\mu,\sigma^2$.

**La conséquence pratique, et elle est grave.** La statistique étant trop petite, on **rejette beaucoup trop rarement** : on conclut à la normalité alors qu'on a seulement constaté qu'on avait bien ajusté une gaussienne. Le vrai niveau du test est très inférieur au niveau nominal, donc la **puissance s'effondre**. Le modèle est validé à tort — et tout ce qui repose dessus (intervalles de confiance, tests de Student, VaR paramétrique) est faux.

**La solution : le test de Kolmogorov-Lilliefors.** *On calcule à la place les quantiles de la statistique $\sup_t\lvert F_n(t)-\Phi_{\hat\mu,\hat\sigma^2}(t)\rvert$ ; **ils ne dépendent pas de paramètres inconnus**.*

**Pourquoi cela marche.** Cette statistique reste **pivotale** — mais avec une **autre loi** que celle de KS. La raison est la propriété d'**invariance par location-échelle** de la famille gaussienne : si $X_i\sim N(\mu,\sigma^2)$, alors $(X_i-\hat\mu)/\hat\sigma$ a une loi qui ne dépend **ni de $\mu$ ni de $\sigma$**. Les quantiles sont donc tabulables une fois pour toutes, et ils sont **plus petits** que ceux de KS — exactement pour compenser l'ajustement.

**Les autres voies.**

- Le test du **khi-deux**, qui gère nativement l'estimation de $\theta$ en retirant $d$ degrés de liberté. C'est la même correction, exprimée autrement.
- Une **estimation sur des données indépendantes** de celles du test — le découpage apprentissage / validation.

**Le principe général qu'il faut savoir énoncer.** *Estimer des paramètres sur les données consomme de l'information, et tout test qui l'ignore est biaisé en faveur du modèle.* On le retrouve sous trois formes : $-1$ dans Cochran, $-p$ en régression, $-d$ dans le khi-deux — et sous la forme d'une **table différente** pour Lilliefors.

</details>

## 🔴 Common mistakes

1. **Utiliser la table de Kolmogorov-Smirnov après avoir estimé les paramètres** — *erreur courante et grave* : il faut **Lilliefors**.
2. **Oublier l'hypothèse de continuité de $F$** dans le théorème de Donsker.
3. **Confondre Glivenko-Cantelli et Donsker** — le premier donne la convergence, le second la vitesse et la loi.
4. **Se tromper de degrés de liberté au khi-deux** — c'est $K-d-1$, pas $K-1$.
5. **Oublier la condition $d<K-1$** — sinon il ne reste aucun degré de liberté.
6. **Oublier de normaliser par $p_j(\hat\theta)$** dans la statistique du khi-deux.
7. **Appliquer le khi-deux avec des classes trop peu peuplées** — l'approximation $\chi^2$ exige assez d'observations par classe.
8. **Croire qu'un QQ-plot est un test** — c'est un diagnostic **visuel**, sans niveau ni p-valeur.
9. **Utiliser KS quand les queues comptent** — il ne voit que le pire écart, souvent au centre ; préférer **Anderson-Darling**.
10. **Chercher le supremum de $\lvert F_n-F^0\rvert$ ailleurs qu'aux points de saut** — il y est toujours atteint.

## 📌 Ultimate Review

1. **Test d'adéquation** : la loi supposée s'ajuste-t-elle aux données ? Caractéristique : **aucune modélisation paramétrique**.
2. **Fonction de répartition empirique** : $F_n(t)=\frac1n\sum_i\mathbf 1\{X_i\leq t\}$ ; $F$ **caractérise entièrement** la loi.
3. **LGN** : $F_n(t)\to F(t)$ p.s. pour chaque $t$. **Glivenko-Cantelli** : $\sup_t\lvert F_n(t)-F(t)\rvert\to0$ p.s. — *théorème fondamental de la statistique*.
4. **TCL** : $\sqrt n(F_n(t)-F(t))\to N(0,F(t)(1-F(t)))$.
5. **Donsker** ($F$ **continue**) : $\sqrt n\sup_t\lvert F_n-F\rvert\to\sup_{0\leq t\leq1}\lvert B(t)\rvert$, $B$ **pont brownien**.
6. **Kolmogorov-Smirnov** : $H_0:F=F^0$ ; $T_n=\sup_t\sqrt n\lvert F_n(t)-F^0(t)\rvert\to Z$ ; $\delta_\alpha^{KS}=\mathbf 1\{T_n>q_\alpha\}$ ; p-valeur $\mathbb P[Z>T_n\mid T_n]$.
7. **Formule pratique** : $T_n=\sqrt n\max_i\max\{\frac in-F^0(X_{(i)}),\ F^0(X_{(i)})-\frac{i-1}{n}\}$ — le sup est atteint **aux sauts**.
8. **Caractère pivotal** : $U_i=F^0(X_i)\sim U([0,1])$ sous $H_0$, donc $T_n=\sup_{0\leq x\leq1}\sqrt n\lvert G_n(x)-x\rvert$ — **loi indépendante de $F^0$**.
9. **Simulation** : $M$ copies de $T_n$, quantile empirique, p-valeur $\approx\#\{j:T_n^j>T_n\}/M$.
10. **Autres distances** : **Cramér-Von Mises** $\int(F_n-F)^2$ · **Anderson-Darling** $\int\frac{(F_n-F)^2}{F(1-F)}$, sensible aux **queues**.
11. **Cas composite** : remplacer les paramètres par leurs estimations **invalide Donsker** — *erreur courante et grave*.
12. **Kolmogorov-Lilliefors** : recalculer les quantiles de $\sup_t\lvert F_n(t)-\Phi_{\hat\mu,\hat\sigma^2}(t)\rvert$ ; ils **ne dépendent d'aucun paramètre inconnu**.
13. **QQ-plot** : tracer $\big(F^{-1}(i/n),F_n^{-1}(i/n)\big)$ avec $F_n^{-1}(i/n)=X_{(i)}$, et comparer à $y=x$. **Pas un test formel**.
14. **Khi-deux, cas fini** : $p_j(\theta)=\mathbb P_\theta[Y=a_j]$, $\hat p_j=\#\{i:X_i=a_j\}/n$, $\hat\theta$ EMV sous $H_0$, et $$T_n=n\sum_{j=1}^K\frac{\big(\hat p_j-p_j(\hat\theta)\big)^2}{p_j(\hat\theta)}\ \xrightarrow{(d)}\ \chi^2_{K-d-1}$$
15. **Degrés de liberté** : $K$ classes $-\,1$ (somme) $-\,d$ (paramètres estimés) ; condition $d<K-1$.
16. **Cas infini** : partitionner $E=A_1\cup\cdots\cup A_K$, même statistique, même loi limite.
17. **Questions pratiques** : choix de $K$, choix des classes, calcul de $p_j(\theta)$. Exemple Poisson : $A_j=\{j-1\}$ et $A_K=\{K-1,K,\dots\}$ avec $p_K(\lambda_{\max})\approx0$.

**Formulas to know**

$$F_n(t)=\frac1n\sum_{i=1}^n\mathbf 1\{X_i\leq t\} \qquad \sup_t\lvert F_n(t)-F(t)\rvert\xrightarrow{\text{p.s.}}0$$

$$\sqrt n\sup_t\lvert F_n-F\rvert\xrightarrow{(d)}\sup_{0\leq t\leq1}\lvert B(t)\rvert \qquad T_n^{KS}=\sup_t\sqrt n\big\lvert F_n(t)-F^0(t)\big\rvert$$

$$T_n^{\chi^2}=n\sum_{j=1}^K\frac{\big(\hat p_j-p_j(\hat\theta)\big)^2}{p_j(\hat\theta)}\ \xrightarrow{(d)}\ \chi^2_{K-d-1}$$

**Methods to know** : le calcul pratique de $T_n$ par les statistiques d'ordre ; la démonstration du caractère pivotal ; le décompte des degrés de liberté ; le diagnostic par QQ-plot.

## 🧠 Active Recall

**Basic** — Énoncez le théorème de Glivenko-Cantelli et celui de Donsker.

<details><summary>Réponse</summary>

**Glivenko-Cantelli** — *le théorème fondamental de la statistique* :

$$\sup_{t\in\mathbb R}\big\lvert F_n(t)-F(t)\big\rvert\ \xrightarrow[n\to\infty]{\text{p.s.}}\ 0$$

La convergence est **uniforme en $t$**, plus forte que la convergence ponctuelle donnée par la LGN.

**Donsker** — si $F$ est **continue** :

$$\sqrt n\,\sup_{t\in\mathbb R}\big\lvert F_n(t)-F(t)\big\rvert\ \xrightarrow[n\to\infty]{(d)}\ \sup_{0\leq t\leq1}\lvert B(t)\rvert$$

où $B$ est un **pont brownien** sur $[0,1]$ — un mouvement brownien contraint à s'annuler en $0$ et en $1$, ce qui traduit $F_n=F$ exactement aux deux extrémités.

</details>

**Understanding** — Que signifie « statistique pivotale » et pourquoi est-ce utile ?

<details><summary>Réponse</summary>

Une statistique est **pivotale** si **sa loi sous $H_0$ ne dépend pas de la loi des données**.

**Pour Kolmogorov-Smirnov.** En posant $U_i=F^0(X_i)$, on a sous $H_0$ que $U_i\overset{iid}\sim U([0,1])$ (transformation intégrale de probabilité), donc

$$T_n=\sup_{0\leq x\leq1}\sqrt n\big\lvert G_n(x)-x\big\rvert$$

où $G_n$ est la fonction de répartition empirique des $U_i$. **$F^0$ a disparu.**

**Les trois bénéfices.**

1. **Une seule table** de quantiles pour tous les tests d'adéquation.
2. **On peut simuler** la loi de $T_n$ — tirer $M$ échantillons uniformes — puisque aucun paramètre inconnu n'intervient.
3. Le test est **exactement calibré**, quelle que soit la loi testée.

⚠️ **Et c'est ce qu'on perd dans le cas composite** : si les paramètres sont estimés sur les données, les $U_i$ ne sont plus ni uniformes ni indépendants, et Donsker tombe.

</details>

**Application** — On teste si des données suivent une loi de Poisson en les regroupant en $6$ classes. Combien de degrés de liberté ?

<details><summary>Réponse</summary>

**Le décompte.**

- $K=6$ classes ;
- $-1$ pour la contrainte $\sum_j\hat p_j=1$ ;
- $-d=-1$ pour le paramètre $\lambda$ estimé (la loi de Poisson a **un** paramètre).

$$K-d-1=6-1-1=\mathbf 4 \qquad\Longrightarrow\qquad T_n\ \xrightarrow{(d)}\ \chi^2_4$$

**Le test.** $\delta_\alpha=\mathbf 1\{T_n>q_\alpha\}$, avec $q_\alpha$ le quantile d'ordre $1-\alpha$ de $\chi^2_4$ ; à $5\,\%$, $q_{0{,}05}\approx9{,}49$.

**La vérification de la condition.** $d<K-1$, soit $1<5$ .

**Le choix des classes**, selon la recommandation du cours : $A_1=\{0\}$, $A_2=\{1\}$, …, $A_5=\{4\}$, $A_6=\{5,6,7,\dots\}$ — les petites valeurs isolées, toute la queue regroupée. On choisit $K$ assez grand pour que $p_K(\lambda_{\max})\approx0$.

⚠️ **L'erreur à éviter** : utiliser $\chi^2_5$ en oubliant le paramètre estimé. Le seuil serait alors $11{,}07$ au lieu de $9{,}49$, et l'on rejetterait trop rarement.

</details>

**Comparison** — Kolmogorov-Smirnov ou khi-deux : lequel choisir ?

<details><summary>Réponse</summary>

|  | **Kolmogorov-Smirnov** | **Khi-deux** |
|---|---|---|
| Données | **continues** ($F$ continue) | discrètes ou **regroupées** |
| Découpage | aucun | **classes à choisir** |
| Information utilisée | **toute** l'information de l'échantillon | seulement les fréquences de classes |
| Paramètres estimés | **interdit** (⟹ Lilliefors) | **géré** par $-d$ degrés de liberté |
| Loi limite | $\sup\lvert$pont brownien$\rvert$ | $\chi^2_{K-d-1}$ |
| Statistique pivotale | **oui** | asymptotiquement |

**KS** est préférable sur données **continues avec loi entièrement spécifiée** : il n'y a pas de perte d'information par regroupement, et la statistique est exactement pivotale.

**Le khi-deux** est préférable sur données **discrètes**, ou dès qu'il faut **estimer des paramètres** — il traite ce cas nativement, en retirant $d$ degrés de liberté, là où KS exige de changer de table.

**Les inconvénients respectifs.** KS ne regarde que le **pire écart** — souvent situé au centre —, donc il est peu sensible aux queues ; Anderson-Darling corrige ce défaut. Le khi-deux impose des **choix arbitraires** (nombre et bornes des classes) qui influencent le résultat, et il perd de l'information par regroupement.

**En pratique**, on combine : un test formel, un **QQ-plot** pour voir *où* le modèle échoue.

</details>

**Exam-style** — Construisez le test du khi-deux d'adéquation et justifiez sa loi limite.

<details><summary>Réponse</summary>

**Le cadre.** $X_1,\dots,X_n$ i.i.d. sur $E=\{a_1,\dots,a_K\}$ de loi $\mathbb P$, et $(\mathbb P_\theta)_{\theta\in\Theta}$ une famille paramétrique avec $\Theta\subseteq\mathbb R^d$. On teste

$$H_0:\ \mathbb P\in(\mathbb P_\theta)_{\theta\in\Theta} \qquad\text{contre}\qquad H_1:\ \mathbb P\notin(\mathbb P_\theta)_{\theta\in\Theta}$$

c'est-à-dire : *le modèle statistique s'ajuste-t-il aux données ?* De façon équivalente, $p_j=p_j(\theta)$ pour tout $j$ et un certain $\theta$.

**La construction, en trois étapes.**

1. Estimer $\hat\theta$ par **maximum de vraisemblance sous $H_0$**.
2. Calculer les fréquences observées $\hat p_j=\#\{i:X_i=a_j\}/n$ et les probabilités ajustées $p_j(\hat\theta)$.
3. *Si $H_0$ est vraie, $\hat p_j$ et $p_j(\hat\theta)$ sont **tous deux de bons estimateurs de $p_j$**, donc ils doivent être proches.* D'où $$T_n=n\sum_{j=1}^K\frac{\big(\hat p_j-p_j(\hat\theta)\big)^2}{p_j(\hat\theta)}$$

**Pourquoi cette forme — la normalisation.** $n\hat p_j$ suit approximativement une binomiale de variance $np_j(1-p_j)\approx np_j$ pour $p_j$ petit. Diviser l'écart au carré par $p_j(\hat\theta)$ rend donc chaque terme comparable au **carré d'une gaussienne standard**. La somme de tels carrés est, par définition, un $\chi^2$ (fiche 65).

**Pourquoi $K-d-1$ degrés de liberté.**

- **$K$** fréquences observées ;
- **$-1$** : elles somment à $1$ par construction, donc une seule est déterminée par les autres ;
- **$-d$** : l'EMV $\hat\theta$ ajuste le modèle dans $d$ directions supplémentaires, annulant les écarts au premier ordre dans ces directions.

D'où $T_n\xrightarrow{(d)}\chi^2_{K-d-1}$, sous la condition $d<K-1$ — sinon il ne reste aucun degré de liberté et il n'y a rien à tester.

**Le test.** $\delta_\alpha=\mathbf 1\{T_n>q_\alpha\}$ avec $q_\alpha$ le quantile d'ordre $1-\alpha$ de $\chi^2_{K-d-1}$ ; p-valeur $\mathbb P[Z>T_n\mid T_n]$, $Z\sim\chi^2_{K-d-1}$.

**Le cas infini.** Si $E$ est infini, on **partitionne** $E=A_1\cup\cdots\cup A_K$ et l'on remplace $\{X_i=a_j\}$ par $\{X_i\in A_j\}$. La statistique et la loi limite sont **inchangées**.

**Les trois questions pratiques**, que le cours pose explicitement : *choix de $K$ ? choix des classes ? calcul de $p_j(\theta)$ ?* Pour Poisson, le cours recommande $A_1=\{0\},\dots,A_{K-1}=\{K-2\}$, $A_K=\{K-1,K,\dots\}$ avec $K$ assez grand pour que $p_K(\lambda_{\max})\approx0$.

**Ce qu'il faut ajouter en critique.** Le regroupement en classes est une **perte d'information** : deux lois ayant les mêmes probabilités de classe sont indiscernables. Et les choix de $K$ et des bornes influencent le résultat — trop de classes et l'approximation $\chi^2$ échoue faute d'observations ; trop peu et la puissance s'effondre. Sur données continues, Kolmogorov-Smirnov est préférable.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Caractéristique des tests d'adéquation ? | **Aucune modélisation paramétrique** |
| Fonction de répartition empirique ? | $F_n(t)=\frac1n\sum_i\mathbf 1\{X_i\leq t\}$ |
| Que dit la LGN pour $F_n$ ? | $F_n(t)\to F(t)$ p.s. pour chaque $t$ |
| Théorème de Glivenko-Cantelli ? | $\sup_t\lvert F_n(t)-F(t)\rvert\to0$ p.s. |
| Son surnom ? | Le **théorème fondamental de la statistique** |
| Théorème de Donsker ? | $\sqrt n\sup_t\lvert F_n-F\rvert\to\sup_{[0,1]}\lvert B\rvert$ |
| Quelle hypothèse exige-t-il ? | $F$ **continue** |
| Quel processus limite ? | Le **pont brownien** |
| Pourquoi un pont et pas un brownien ? | $F_n=F$ exactement aux deux extrémités |
| Statistique de Kolmogorov-Smirnov ? | $T_n=\sup_t\sqrt n\lvert F_n(t)-F^0(t)\rvert$ |
| Où le sup est-il atteint ? | Aux **points de saut** de $F_n$ |
| Formule pratique ? | $\sqrt n\max_i\max\{\frac in-F^0(X_{(i)}),\ F^0(X_{(i)})-\frac{i-1}{n}\}$ |
| Que signifie « pivotale » ? | La loi sous $H_0$ ne dépend pas de celle des données |
| Pourquoi $T_n$ est-elle pivotale ? | $U_i=F^0(X_i)\sim U([0,1])$ sous $H_0$ |
| p-valeur du test KS ? | $\mathbb P[Z>T_n\mid T_n]$ |
| Distance de Cramér-Von Mises ? | $\int(F_n-F)^2dt$ |
| Distance d'Anderson-Darling ? | $\int\frac{(F_n-F)^2}{F(1-F)}dt$ |
| Que privilégie Anderson-Darling ? | Les **queues** de distribution |
| Que se passe-t-il si l'on estime les paramètres ? | **Donsker n'est plus valide** — erreur grave |
| Pourquoi la statistique devient-elle trop petite ? | La loi ajustée colle par construction aux données |
| Quel test utiliser alors ? | **Kolmogorov-Lilliefors** |
| Pourquoi ses quantiles existent-ils ? | Ils ne dépendent d'aucun paramètre inconnu |
| Qu'est-ce qu'un QQ-plot ? | Un diagnostic **visuel**, pas un test formel |
| Que trace-t-on ? | $\big(F^{-1}(i/n),X_{(i)}\big)$, comparé à $y=x$ |
| Comment définit-on $F_n^{-1}(i/n)$ ? | $X_{(i)}$, la $i$-ième plus grande observation |
| Hypothèses du test du khi-deux ? | $H_0:\mathbb P\in(\mathbb P_\theta)$ contre $H_1:\mathbb P\notin(\mathbb P_\theta)$ |
| Statistique du khi-deux ? | $n\sum_j\frac{(\hat p_j-p_j(\hat\theta))^2}{p_j(\hat\theta)}$ |
| Sa loi limite ? | $\chi^2_{K-d-1}$ |
| Que compte $K-d-1$ ? | $K$ classes $-1$ (somme) $-d$ (paramètres estimés) |
| Quelle condition sur $d$ ? | $d<K-1$ |
| Comment traiter un espace infini ? | **Partitionner** en $K$ classes disjointes |
| Découpage recommandé pour Poisson ? | $\{0\},\{1\},\dots,\{K-2\},\{K-1,K,\dots\}$ |
