# Fiche 65 — Tests d'hypothèses paramétriques : niveau, puissance, Wald et rapport de vraisemblance

|  |  |
|---|---|
| **Matière** | Maths · Économétrie |
| **Cours source** | Rigollet, *18.650 Statistics for Applications*, MIT OpenCourseWare, automne 2016 — chapitre 5 « Parametric hypothesis testing » |
| **Difficulté** | Must know — tout test d'économétrie sort de ce chapitre |
| **Temps d'étude estimé** | 2 h 30 |
| **Prérequis** | Fiche 64 (maximum de vraisemblance, information de Fisher), fiche 50 (test de Student en régression), théorème central limite |
| **Concepts clés** | Hypothèse nulle et alternative, région de rejet, erreurs de première et seconde espèce, puissance, niveau asymptotique, statistique de test, p-valeur, paradigme de Neyman-Pearson, lois du khi-deux et de Student, théorème de Cochran, test de Wald, test du rapport de vraisemblance, méthode delta |
| **Poids à l'examen** | Trois choses : la **définition exacte** du niveau, de la puissance et de la p-valeur ; la **statistique de Wald** $n(\hat\theta-\theta_0)^\top I(\hat\theta)(\hat\theta-\theta_0)\to\chi_d^2$ ; et le **rapport de vraisemblance** $2[\ell_n(\hat\theta)-\ell_n(\hat\theta^c)]\to\chi^2_{d-r}$. |

## 🎯 Vue d'ensemble

```
QUESTION   les données contredisent-elles H₀ ?
TEST       ψ ∈ {0,1} :  ψ = 1 ⟹ on REJETTE H₀
NIVEAU     α = risque de rejeter H₀ à tort        ← on le CONTRÔLE
PUISSANCE  1 − β = chance de rejeter H₀ à raison  ← on la MAXIMISE
p-VALEUR   le plus petit α auquel on rejette
DEUX TESTS UNIVERSELS
  Wald                n(θ̂−θ₀)ᵀI(θ̂)(θ̂−θ₀) → χ²_d
  rapport de vrais.   2[ℓₙ(θ̂) − ℓₙ(θ̂ᶜ)]   → χ²_{d−r}
```

### Les deux situations types

**La course Cherry Blossom.** *Le Cherry Blossom Run est une course de 10 miles à Washington. En 2009, il y avait $14\,974$ participants et le temps moyen était de $103{,}5$ minutes.* **Les coureurs étaient-ils plus rapides en 2012 ?** On sélectionne $n$ coureurs de 2012 au hasard et l'on note $X_1,\dots,X_n$ leurs temps. *Les données passées montrent que le temps suit une loi gaussienne, de variance $373$.*

Il y a **beaucoup de façons** dont l'hypothèse $X_1\sim N(103{,}5;373)$ peut être fausse : $\mathbb E[X_1]\neq103{,}5$, ou $\mathrm{var}[X_1]\neq373$, ou $X_1$ pas même gaussienne. *On s'intéresse à une question très spécifique : a-t-on $\mathbb E[X_1]<103{,}5$ ?*

> *En faisant des hypothèses de modélisation — variance inchangée, loi gaussienne —, on **réduit le nombre de façons** dont l'hypothèse peut être rejetée. La seule qui reste est $X_1\sim N(\mu;373)$ avec $\mu<103{,}5$.* On **compare une espérance à un nombre de référence**.

**Les essais cliniques.** On administre un sirop antitussif au groupe test et un placebo au groupe témoin ; $\mu_{\text{drug}}$ et $\mu_{\text{control}}$ sont les nombres espérés d'expectorations par heure. On veut savoir si $\mu_{\text{drug}}<\mu_{\text{control}}$. Avec $X_1,\dots,X_{n_{\text{drug}}}\sim\mathrm{Poiss}(\mu_{\text{drug}})$ et $Y_1,\dots,Y_{n_{\text{control}}}\sim\mathrm{Poiss}(\mu_{\text{control}})$, on **compare deux espérances**, sans nombre de référence.

### L'heuristique et sa correction

> **Heuristique naïve** : *« si $\bar X_n<103{,}5$, alors $\mu<103{,}5$ ».* *Cela pourrait mal tourner si je tombe par hasard sur des coureurs rapides dans mon échantillon.*
>
> **Meilleure heuristique** :
>
> $$\text{« si } \bar X_n<103{,}5-\big(\text{quelque chose qui}\xrightarrow[n\to\infty]{}0\big)\text{, alors } \mu<103{,}5 \text{ »}$$
>
> *Pour rendre cette intuition précise, il faut tenir compte de la **taille des fluctuations aléatoires** de $\bar X_n$ !*

⚠️ **« Quelque chose qui tend vers zéro » est la clé de tout le chapitre.** Ce quelque chose est de l'ordre de $\sigma/\sqrt n$, et c'est le théorème central limite qui en donne la taille exacte. Toute la théorie des tests consiste à **calibrer** ce terme correcteur.

### Les deux exemples numériques

**Exemple 1.** *Une pièce est lancée $80$ fois et Face sort $54$ fois. Peut-on conclure que la pièce est significativement biaisée ?* Avec $n=80$, $X_i\overset{iid}\sim\mathrm{Ber}(p)$, $\bar X_n=54/80=0{,}68$. Si $p=0{,}5$ était vrai, alors par le **TCL et le théorème de Slutsky** :

$$\sqrt n\,\frac{\bar X_n-0{,}5}{\sqrt{0{,}5(1-0{,}5)}}\approx N(0,1) \qquad\text{et ici}\qquad \sqrt{80}\,\frac{0{,}68-0{,}5}{0{,}5}\approx3{,}22$$

> *Conclusion : il paraît tout à fait raisonnable de **rejeter** l'hypothèse $p=0{,}5$.*

**Exemple 2.** *Une pièce est lancée $30$ fois et Face sort $13$ fois.* Avec $\bar X_n=13/30\approx0{,}43$ :

$$\sqrt{30}\,\frac{0{,}43-0{,}5}{0{,}5}\approx-0{,}77$$

> *Le nombre $0{,}77$ est une réalisation plausible d'une variable $Z\sim N(0,1)$. Conclusion : nos données **ne suggèrent pas** que la pièce soit biaisée.*

## 🔴 Concept 1 — La formulation statistique

Soit un échantillon i.i.d. $X_1,\dots,X_n$ et un modèle statistique $\big(E,(\mathbb P_\theta)_{\theta\in\Theta}\big)$. Soient $\Theta_0$ et $\Theta_1$ des sous-ensembles **disjoints** de $\Theta$. On considère les deux hypothèses

$$\begin{cases}H_0:\ \theta\in\Theta_0\\ H_1:\ \theta\in\Theta_1\end{cases}$$

$H_0$ est l'**hypothèse nulle**, $H_1$ l'**hypothèse alternative**. *On veut décider s'il faut **rejeter $H_0$** — chercher dans les données des éléments **contre** $H_0$.*

> **L'asymétrie fondamentale.**
>
> - *$H_0$ et $H_1$ **ne jouent pas un rôle symétrique** : les données ne servent qu'à tenter de **réfuter** $H_0$.*
> - *En particulier, une **absence de preuve** ne signifie pas que $H_0$ est **vraie** — « innocent jusqu'à preuve du contraire ».*

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition — un test.</span>

Un test est une statistique $\psi\in\{0,1\}$ telle que :

- si $\psi=0$, $H_0$ **n'est pas rejetée** ;
- si $\psi=1$, $H_0$ **est rejetée**.

</div>

⚠️ **L'asymétrie est l'erreur d'interprétation la plus répandue en économétrie appliquée.** « Le coefficient n'est pas significatif » ne veut **pas** dire « le coefficient est nul » : cela veut dire qu'on n'a pas assez d'éléments pour l'exclure. Sur un échantillon petit ou bruité, on ne rejette presque jamais — ce n'est pas une preuve de nullité, c'est un manque de **puissance**.

## 🔴 Concept 2 — Erreurs, puissance et niveau

> **Région de rejet** d'un test $\psi$ :
>
> $$R_\psi=\big\{x\in E^n:\psi(x)=1\big\}$$

<div class="callout callout--warn" data-kind="piege">

<span class="callout__lab">Erreur de première espèce</span>

(rejeter $H_0$ alors qu'elle est **vraie**) :

$$\alpha_\psi:\Theta_0\to\mathbb R, \qquad \theta\mapsto\mathbb P_\theta[\psi=1]$$

</div>

<div class="callout callout--warn" data-kind="piege">

<span class="callout__lab">Erreur de seconde espèce</span>

(ne pas rejeter $H_0$ alors que $H_1$ est **vraie**) :

$$\beta_\psi:\Theta_1\to\mathbb R, \qquad \theta\mapsto\mathbb P_\theta[\psi=0]$$

</div>

> **Puissance** d'un test $\psi$ :
>
> $$\pi_\psi=\inf_{\theta\in\Theta_1}\big(1-\beta_\psi(\theta)\big)$$

> **Niveau.** Un test $\psi$ est de **niveau $\alpha$** si
>
> $$\alpha_\psi(\theta)\leq\alpha, \qquad \forall\theta\in\Theta_0$$
>
> Il est de **niveau asymptotique $\alpha$** si
>
> $$\lim_{n\to\infty}\alpha_\psi(\theta)\leq\alpha, \qquad \forall\theta\in\Theta_0$$

**La forme générale.** *En général, un test a la forme*

$$\psi=\mathbf 1\{T_n>c\}$$

*pour une statistique $T_n$ et un seuil $c\in\mathbb R$. $T_n$ est la **statistique de test**, et la région de rejet est $R_\psi=\{T_n>c\}$.*

<div class="callout" data-kind="formel">

<span class="callout__lab">Remarquez les deux définitions asymétriques.</span>

- Le **niveau** est un $\sup$ implicite : la contrainte porte sur **tout** $\theta\in\Theta_0$. On veut que le risque de fausse alerte soit contrôlé quelle que soit la façon dont $H_0$ est vraie.
- La **puissance** est un $\inf$ explicite sur $\Theta_1$ : on mesure le test par son **pire cas** sous l'alternative — la performance dans la configuration la plus difficile à détecter.

**Le compromis.** Abaisser $\alpha$ — être plus prudent — réduit mécaniquement la puissance. Le test trivial $\psi\equiv0$, qui ne rejette jamais, a un niveau **parfait** ($\alpha=0$) et une puissance **nulle**. C'est ce que le concept 5 formalise.

</div>

## 🔴 Concept 3 — L'exemple de la pièce, formalisé

Soient $X_1,\dots,X_n\overset{iid}\sim\mathrm{Ber}(p)$ avec $p\in(0,1)$ inconnu. On veut tester

$$H_0:\ p=1/2 \qquad\text{contre}\qquad H_1:\ p\neq1/2$$

au niveau asymptotique $\alpha\in(0,1)$.

**La statistique de test.** Avec $\hat p_n$ l'EMV (fiche 64) :

$$T_n=\sqrt n\,\frac{\hat p_n-0{,}5}{\sqrt{0{,}5(1-0{,}5)}}$$

**Sous $H_0$**, par le **TCL et le théorème de Slutsky** :

$$\mathbb P\big[\lvert T_n\rvert>q_{\alpha/2}\big]\ \xrightarrow[n\to\infty]{}\ \alpha$$

d'où le test

$$\psi_\alpha=\mathbf 1\big\{\lvert T_n\rvert>q_{\alpha/2}\big\}$$

**L'application aux deux exemples.** Pour $\alpha=5\,\%$, $q_{\alpha/2}=1{,}96$, donc :

- **Exemple 1** ($T_n\approx3{,}22$) : $H_0$ **est rejetée** au niveau asymptotique $5\,\%$.
- **Exemple 2** ($T_n\approx-0{,}77$) : $H_0$ **n'est pas rejetée** au niveau asymptotique $5\,\%$.

> **Question du cours.** *Dans l'exemple 1, pour quel niveau $\alpha$ le test $\psi_\alpha$ ne rejetterait-il **pas** $H_0$ ? Et dans l'exemple 2, à quel niveau $\alpha$ rejetterait-il $H_0$ ?* — c'est exactement ce que la p-valeur répond.

⚠️ **Le rôle de Slutsky mérite d'être noté.** Le TCL seul donne la loi de $\sqrt n(\hat p_n-p)/\sigma$ avec le **vrai** $\sigma$. Le théorème de Slutsky autorise à le remplacer par un estimateur convergent sans changer la loi limite. Ici, sous $H_0$, $\sigma=\sqrt{0{,}5\times0{,}5}$ est **connu** — mais dans le cas général, c'est Slutsky qui légitime la substitution.

## 🔴 Concept 4 — La p-valeur

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

La **p-valeur** (asymptotique) d'un test $\psi_\alpha$ est le **plus petit niveau** (asymptotique) $\alpha$ auquel $\psi_\alpha$ rejette $H_0$. *Elle est aléatoire : elle dépend de l'échantillon.*

</div>

> **La règle d'or.**
>
> $$\boxed{\ \text{p-valeur}\leq\alpha\iff H_0 \text{ est rejetée par } \psi_\alpha \text{ au niveau } \alpha\ }$$
>
> ***Plus la p-valeur est petite, plus on peut rejeter $H_0$ avec confiance.***

**Les deux exemples.**

- **Exemple 1** : p-valeur $=\mathbb P[\lvert Z\rvert>3{,}22]\ll0{,}01$.
- **Exemple 2** : p-valeur $=\mathbb P[\lvert Z\rvert>0{,}77]\approx0{,}44$.

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi la p-valeur est plus informative que la décision binaire.</span>

Le test $\psi_\alpha$ ne rend qu'un verdict à un seuil fixé arbitrairement. La p-valeur rend **le seuil critique lui-même** : elle permet à chaque lecteur d'appliquer son propre $\alpha$. Dans l'exemple 2, une p-valeur de $0{,}44$ dit qu'il faudrait accepter un risque de fausse alerte de $44\,\%$ pour rejeter — autant dire jamais.

</div>

⚠️ **Ce que la p-valeur n'est PAS.** Elle n'est **pas** la probabilité que $H_0$ soit vraie. C'est la probabilité, **sous $H_0$**, d'observer une statistique au moins aussi extrême que celle observée. Confondre $\mathbb P[\text{données}\mid H_0]$ et $\mathbb P[H_0\mid\text{données}]$ est l'erreur classique — et il faut un cadre bayésien pour accéder à la seconde.

## 🟠 Concept 5 — Le paradigme de Neyman-Pearson

> **L'idée.** *Pour des hypothèses données, parmi tous les tests de niveau (asymptotique) $\alpha$, est-il possible d'en trouver un de **puissance maximale** ?*

> **L'exemple qui pose le problème.** *Le test trivial $\psi=0$, qui ne rejette jamais $H_0$, a un niveau **parfait** ($\alpha=0$) mais une **puissance médiocre** ($\pi_\psi=0$).*

> *La théorie de Neyman-Pearson fournit les tests **les plus puissants** à niveau donné.*

> **La logique du paradigme, en une phrase.** On ne peut pas minimiser les deux erreurs à la fois : elles varient en sens inverse. On **fixe donc** la première espèce à un seuil tolérable $\alpha$ — c'est la contrainte —, puis on **maximise la puissance** sous cette contrainte. C'est un problème d'optimisation sous contrainte, au sens exact des fiches 7 et 38.
>
> **Et le choix de $\alpha$ n'est pas statistique, il est décisionnel** : quelle est la conséquence d'un faux positif ? En essai clinique, mettre sur le marché un médicament inefficace est grave — on prend $\alpha$ petit. En exploration de données, manquer une piste coûte plus cher qu'une fausse alerte — on l'assouplit.

## 🔴 Concept 6 — Les lois du khi-deux et de Student

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition — loi $\chi^2$.</span>

Pour un entier positif $d$, la loi du **khi-deux à $d$ degrés de liberté** est la loi de la variable

$$Z_1^2+Z_2^2+\cdots+Z_d^2, \qquad Z_1,\dots,Z_d\overset{iid}\sim N(0,1)$$

</div>

**Exemples et propriétés.**

- Si $Z\sim N_d(0,I_d)$, alors $\lVert Z\rVert_2^2\sim\chi_d^2$.
- La **variance empirique** est $$S_n=\frac1n\sum_{i=1}^n(X_i-\bar X_n)^2=\frac1n\sum_{i=1}^nX_i^2-(\bar X_n)^2$$
- Le **théorème de Cochran** implique que, pour $X_1,\dots,X_n\overset{iid}\sim N(\mu,\sigma^2)$ : $$\boxed{\ \frac{nS_n}{\sigma^2}\sim\chi^2_{n-1}\ }$$
- $\chi_2^2=\mathrm{Exp}(1/2)$.

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition — loi de Student.</span>

Pour un entier positif $d$, la loi de **Student à $d$ degrés de liberté**, notée $t_d$, est la loi de

$$\frac{Z}{\sqrt{V/d}}, \qquad Z\sim N(0,1),\quad V\sim\chi_d^2,\quad Z\perp\!\!\!\perp V$$

</div>

**Exemple.** Si $S_n$ est la variance empirique :

$$\boxed{\ \sqrt{n-1}\,\frac{\bar X_n-\mu}{\sqrt{S_n}}\sim t_{n-1}\ }$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi $n-1$ et pas $n$ ?</span>

Parce que $\bar X_n$ a été **estimée à partir des mêmes données**. Les $n$ écarts $X_i-\bar X_n$ sont liés par une contrainte — leur somme est nulle —, donc ils ne fournissent que $n-1$ directions libres. C'est le contenu précis du théorème de Cochran, et c'est la même comptabilité de degrés de liberté qu'en fiche 50 ($n-p$ pour $p$ paramètres estimés).

**L'indépendance $Z\perp V$ dans la définition de Student est essentielle** : c'est elle qui permet de former le quotient. Cochran la fournit — $\bar X_n$ et $S_n$ sont **indépendants** dans le modèle gaussien, ce qui est un fait remarquable et propre à la gaussienne.

</div>

## 🔴 Concept 7 — Le test de Wald

**Le cadre.** Échantillon i.i.d. de modèle $\big(E,(\mathbb P_\theta)_{\theta\in\Theta}\big)$ avec $\Theta\subseteq\mathbb R^d$, et $\theta_0\in\Theta$ fixé. On teste

$$\begin{cases}H_0:\ \theta=\theta_0\\ H_1:\ \theta\neq\theta_0\end{cases}$$

**Le point de départ.** Soit $\hat\theta^{MLE}$ l'EMV, les conditions techniques de la fiche 64 étant satisfaites. Si $H_0$ est vraie, alors

$$\sqrt n\,I\big(\hat\theta^{MLE}_n\big)^{1/2}\big(\hat\theta_n^{MLE}-\theta_0\big)\ \xrightarrow[n\to\infty]{(d)}\ N_d(0,I_d) \qquad \text{par rapport à } \mathbb P_{\theta_0}$$

**D'où la statistique.** En prenant la norme au carré :

$$\boxed{\ T_n=n\big(\hat\theta_n^{MLE}-\theta_0\big)^\top I\big(\hat\theta_n^{MLE}\big)\big(\hat\theta_n^{MLE}-\theta_0\big)\ \xrightarrow[n\to\infty]{(d)}\ \chi_d^2\ }$$

> **Test de Wald de niveau asymptotique $\alpha\in(0,1)$ :**
>
> $$\psi=\mathbf 1\{T_n>q_\alpha\}$$
>
> où $q_\alpha$ est le quantile d'ordre $(1-\alpha)$ de $\chi_d^2$.

<div class="callout" data-kind="formel">

<span class="callout__lab">Remarque.</span>

*Le test de Wald est **aussi valide** si $H_1$ est de la forme « $\theta>\theta_0$ », « $\theta<\theta_0$ » ou « $\theta=\theta_1$ »…*

</div>

> **La construction est limpide.** Le théorème asymptotique de la fiche 64 dit que $\sqrt n(\hat\theta_n-\theta^\ast)\to N_d(0,I(\theta^\ast)^{-1})$. En **normalisant** par $I^{1/2}$, on obtient une gaussienne standard $N_d(0,I_d)$ ; en prenant la **norme au carré**, on obtient un $\chi^2_d$ par définition même de cette loi. La statistique de Wald est simplement une **distance normalisée** entre l'estimation et la valeur testée.
>
> **Le lien avec la fiche 50** : le test de Student $\hat t_j=(\hat\beta_j-\beta_j)/(\hat\sigma\sqrt{C_{jj}})$ est le cas $d=1$ de Wald, à cela près que la régression normale donne une loi **exacte** de Student, là où Wald ne donne qu'une limite en $\chi^2$.

## 🔴 Concept 8 — Le test du rapport de vraisemblance

**Le cadre.** Modèle $\big(E,(\mathbb P_\theta)_{\theta\in\Theta}\big)$ avec $\Theta\subseteq\mathbb R^d$. L'hypothèse nulle est de la forme

$$H_0:\ (\theta_{r+1},\dots,\theta_d)=\big(\theta^{(0)}_{r+1},\dots,\theta^{(0)}_d\big)$$

pour des nombres fixés — autrement dit, on **contraint $d-r$ des $d$ composantes**.

**Les deux estimateurs.**

$$\hat\theta_n=\underset{\theta\in\Theta}{\mathrm{argmax}}\ \ell_n(\theta) \quad \text{(EMV)}, \qquad \hat\theta_n^c=\underset{\theta\in\Theta_0}{\mathrm{argmax}}\ \ell_n(\theta) \quad \text{(EMV **contraint**)}$$

**La statistique de test.**

$$\boxed{\ T_n=2\Big[\ell_n\big(\hat\theta_n\big)-\ell_n\big(\hat\theta_n^c\big)\Big]\ }$$

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème.</span>

*Si $H_0$ est vraie et si les conditions techniques de l'EMV sont satisfaites, alors*

$$T_n\ \xrightarrow[n\to\infty]{(d)}\ \chi^2_{d-r}$$

</div>

> **Test du rapport de vraisemblance de niveau asymptotique $\alpha$ :** $\psi=\mathbf 1\{T_n>q_\alpha\}$, où $q_\alpha$ est le quantile d'ordre $(1-\alpha)$ de $\chi^2_{d-r}$.

> **L'idée est très intuitive.** $\ell_n(\hat\theta_n)\geq\ell_n(\hat\theta_n^c)$ toujours, puisque le maximum sur $\Theta$ ne peut qu'excéder le maximum sur le sous-ensemble $\Theta_0$. La question est : **de combien** ? Si la contrainte coûte peu en vraisemblance, elle est plausible ; si elle coûte beaucoup, on la rejette.
>
> **Et le nombre de degrés de liberté est le nombre de contraintes** : $d-r$, exactement le nombre de composantes fixées par $H_0$. C'est une règle très générale et facile à retenir.

⚠️ **Le facteur $2$ n'est pas cosmétique.** Il vient d'un développement de Taylor au second ordre de $\ell_n$ autour de $\hat\theta_n$ : le terme dominant est $\frac12(\hat\theta-\hat\theta^c)^\top\nabla^2\ell_n(\hat\theta-\hat\theta^c)$, et le facteur $2$ l'annule pour donner exactement une forme quadratique gaussienne — donc un $\chi^2$. C'est aussi ce qui montre que **Wald et le rapport de vraisemblance sont asymptotiquement équivalents**.

## 🔴 Concept 9 — Tester des hypothèses implicites

**Le cadre.** Soient $X_1,\dots,X_n$ i.i.d. et $\theta\in\mathbb R^d$ un paramètre associé à la loi de $X_1$ — un moment, un paramètre de modèle, etc. Soit $g:\mathbb R^d\to\mathbb R^k$ **continûment dérivable**, avec $k<d$. On teste

$$\begin{cases}H_0:\ g(\theta)=0\\ H_1:\ g(\theta)\neq0\end{cases}$$

*Par exemple $g(\theta)=(\theta_1,\theta_2)$ avec $k=2$, ou $g(\theta)=\theta_1-\theta_2$ avec $k=1$.*

**Étape 1 — un estimateur asymptotiquement normal.** On suppose disposer de $\hat\theta_n$ tel que

$$\sqrt n\big(\hat\theta_n-\theta\big)\ \xrightarrow[n\to\infty]{(d)}\ N_d\big(0,\Sigma(\theta)\big)$$

**Étape 2 — la méthode delta.**

$$\sqrt n\Big(g\big(\hat\theta_n\big)-g(\theta)\Big)\ \xrightarrow[n\to\infty]{(d)}\ N_k\big(0,\Gamma(\theta)\big), \qquad \boxed{\ \Gamma(\theta)=\nabla g(\theta)^\top\Sigma(\theta)\nabla g(\theta)\in\mathbb R^{k\times k}\ }$$

**Étape 3 — normaliser.** Supposons $\Sigma(\theta)$ inversible et $\nabla g(\theta)$ de rang $k$ ; alors $\Gamma(\theta)$ est inversible et

$$\sqrt n\,\Gamma(\theta)^{-1/2}\Big(g\big(\hat\theta_n\big)-g(\theta)\Big)\ \xrightarrow{(d)}\ N_k(0,I_k)$$

**Étape 4 — remplacer $\theta$ par $\hat\theta_n$.** Par le **théorème de Slutsky**, si $\Gamma$ est continue en $\theta$ :

$$\sqrt n\,\Gamma\big(\hat\theta_n\big)^{-1/2}\Big(g\big(\hat\theta_n\big)-g(\theta)\Big)\ \xrightarrow{(d)}\ N_k(0,I_k)$$

**Étape 5 — sous $H_0$**, c'est-à-dire $g(\theta)=0$ :

$$T_n=n\,g\big(\hat\theta_n\big)^\top\Gamma^{-1}\big(\hat\theta_n\big)\,g\big(\hat\theta_n\big)\ \xrightarrow[n\to\infty]{(d)}\ \chi_k^2$$

d'où le test de niveau asymptotique $\alpha$ : $\psi=\mathbf 1\{T_n>q_\alpha\}$ avec $q_\alpha$ le quantile de $\chi^2_k$.

> **La méthode delta est l'outil le plus utile de la statistique asymptotique**, et le mécanisme est un simple développement de Taylor : $g(\hat\theta_n)\approx g(\theta)+\nabla g(\theta)^\top(\hat\theta_n-\theta)$. Une transformation régulière d'un estimateur asymptotiquement normal reste asymptotiquement normale, avec une variance **transportée par le gradient**.
>
> **Ce que le concept ajoute aux tests précédents.** Wald teste $\theta=\theta_0$ ; le rapport de vraisemblance teste que certaines **composantes** valent des valeurs fixées. Ici, on teste **n'importe quelle relation régulière** entre les composantes : $\theta_1=\theta_2$, $\theta_1\theta_2=1$, une élasticité égale à un… C'est le cadre général des **restrictions non linéaires** en économétrie.

## Comment résoudre l'exercice type (protocole)

1. **Formuler** $H_0$ et $H_1$ en termes de $\Theta_0$ et $\Theta_1$ disjoints — et se rappeler qu'ils **ne sont pas symétriques**.
2. **Choisir la statistique de test** $T_n$ et déterminer sa **loi sous $H_0$** (exacte ou asymptotique).
3. **Fixer le niveau $\alpha$** et lire le quantile correspondant.
4. **Calculer** $T_n$ sur les données et comparer au seuil.
5. **Calculer la p-valeur** — plus informative que la décision binaire.
6. **Conclure prudemment** : « on rejette $H_0$ » ou « on ne rejette pas $H_0$ », **jamais** « $H_0$ est vraie ».

### Comment reconnaître qu'il faut utiliser cette méthode ?

| Indice dans l'énoncé | Ce qu'il faut faire |
|---|---|
| « comparer une moyenne à une référence » | test sur une espérance, TCL + Slutsky |
| « comparer deux groupes » | test sur une différence d'espérances |
| variance **connue**, loi gaussienne | statistique en $\sqrt n(\bar X_n-\mu_0)/\sigma$, loi $N(0,1)$ |
| variance **inconnue**, petit échantillon gaussien | **Student** $t_{n-1}$ |
| « la variance vaut-elle $\sigma_0^2$ ? » | **Cochran** : $nS_n/\sigma^2\sim\chi^2_{n-1}$ |
| tester $\theta=\theta_0$ en dimension $d$ | **Wald**, $\chi_d^2$ |
| tester que $d-r$ composantes sont fixées | **rapport de vraisemblance**, $\chi^2_{d-r}$ |
| tester une relation $g(\theta)=0$ | **méthode delta**, $\chi_k^2$ |
| « à quel seuil rejette-t-on ? » | la **p-valeur** |
| « le test est-il optimal ? » | **Neyman-Pearson** |

### Exercices progressifs

**Niveau 1** — Une pièce donne $54$ faces sur $80$ lancers. Testez $p=1/2$ au niveau $5\,\%$.

<details><summary>Correction</summary>

**Les hypothèses.** $H_0:p=1/2$ contre $H_1:p\neq1/2$, au niveau asymptotique $\alpha=5\,\%$.

**La statistique.** Avec $\hat p_n=54/80=0{,}68$ et $\sqrt{0{,}5(1-0{,}5)}=0{,}5$ :

$$T_n=\sqrt{80}\,\frac{0{,}68-0{,}5}{0{,}5}=8{,}944\times0{,}36\approx3{,}22$$

**La décision.** Sous $H_0$, $T_n\approx N(0,1)$ par le TCL et Slutsky. Le quantile est $q_{\alpha/2}=q_{0{,}025}=1{,}96$. Comme

$$\lvert3{,}22\rvert>1{,}96$$

on **rejette $H_0$** au niveau asymptotique $5\,\%$.

**La p-valeur.**

$$\text{p-valeur}=\mathbb P\big[\lvert Z\rvert>3{,}22\big]=2\big(1-\Phi(3{,}22)\big)\approx0{,}0013\ \ll\ 0{,}01$$

On rejetterait donc même au niveau $1\,\%$, et même à $0{,}2\,\%$. *Il paraît tout à fait raisonnable de rejeter l'hypothèse $p=0{,}5$.*

⚠️ **Formulez la conclusion correctement** : « les données sont incompatibles avec une pièce équilibrée », et **non** « la pièce a une probabilité $0{,}68$ de tomber sur face ». Le test rejette une hypothèse ; il n'établit pas une valeur.

</details>

**Niveau 2** — Qu'est-ce que la p-valeur, et pourquoi n'est-elle pas $\mathbb P[H_0\text{ vraie}]$ ?

<details><summary>Correction</summary>

**La définition.** La p-valeur est le **plus petit niveau $\alpha$** auquel le test rejette $H_0$. C'est une variable **aléatoire** : elle dépend de l'échantillon.

**La règle d'or.**

$$\text{p-valeur}\leq\alpha\iff H_0 \text{ est rejetée au niveau } \alpha$$

Plus la p-valeur est petite, plus on rejette avec confiance.

**Ce qu'elle est vraiment.** C'est

$$\mathbb P\big[\text{observer une statistique au moins aussi extrême}\ \big\vert\ H_0\big]$$

— une probabilité **conditionnelle à $H_0$**, calculée **sous** l'hypothèse nulle.

**Pourquoi ce n'est pas $\mathbb P[H_0\mid\text{données}]$.** Ce sont deux conditionnements **inverses**. Passer de l'un à l'autre exige la formule de Bayes :

$$\mathbb P[H_0\mid\text{données}]=\frac{\mathbb P[\text{données}\mid H_0]\,\mathbb P[H_0]}{\mathbb P[\text{données}]}$$

ce qui demande une **probabilité a priori** $\mathbb P[H_0]$ — objet qui n'existe pas dans le cadre fréquentiste, où $\theta$ est un paramètre **fixe**, pas une variable aléatoire. Dire « $H_0$ a $4\,\%$ de chances d'être vraie » n'a **aucun sens** ici.

**L'analogie du procès**, que le cours suggère avec « innocent jusqu'à preuve du contraire » : la p-valeur mesure à quel point les preuves seraient **surprenantes si l'accusé était innocent**. Elle ne mesure pas la probabilité qu'il soit innocent — cela dépendrait aussi du taux de criminalité *a priori*.

**La conséquence pratique.** Une p-valeur de $0{,}44$ (exemple 2) signifie : « si la pièce était équilibrée, on observerait un écart au moins aussi grand $44\,\%$ du temps ». Rien d'étonnant, donc — mais cela ne prouve **pas** que la pièce est équilibrée.

</details>

**Niveau 3** — Construisez le test de Wald et expliquez d'où vient le $\chi^2_d$.

<details><summary>Correction</summary>

**Le point de départ — le théorème de la fiche 64.** Sous les conditions techniques,

$$\sqrt n\big(\hat\theta_n^{MLE}-\theta^\ast\big)\ \xrightarrow{(d)}\ N_d\big(0,I(\theta^\ast)^{-1}\big)$$

**Étape 1 — normaliser.** En multipliant par $I(\theta^\ast)^{1/2}$, la covariance devient $I^{1/2}I^{-1}I^{1/2}=I_d$ :

$$\sqrt n\,I\big(\hat\theta_n\big)^{1/2}\big(\hat\theta_n-\theta_0\big)\ \xrightarrow{(d)}\ N_d(0,I_d) \qquad \text{sous } H_0:\theta=\theta_0$$

(on a remplacé $I(\theta^\ast)$ par $I(\hat\theta_n)$, ce que **Slutsky** autorise par continuité).

**Étape 2 — prendre la norme au carré.** Par définition même de la loi $\chi^2$ — *la loi de $Z_1^2+\cdots+Z_d^2$ pour $Z_i$ i.i.d. $N(0,1)$* —, si $Z\sim N_d(0,I_d)$ alors $\lVert Z\rVert_2^2\sim\chi_d^2$. Donc

$$T_n=\Big\lVert\sqrt n\,I(\hat\theta_n)^{1/2}(\hat\theta_n-\theta_0)\Big\rVert_2^2=n\big(\hat\theta_n-\theta_0\big)^\top I\big(\hat\theta_n\big)\big(\hat\theta_n-\theta_0\big)\ \xrightarrow{(d)}\ \chi_d^2$$

**Étape 3 — le test.** $\psi=\mathbf 1\{T_n>q_\alpha\}$, $q_\alpha$ étant le quantile d'ordre $(1-\alpha)$ de $\chi_d^2$.

**L'interprétation géométrique.** $T_n$ est le **carré d'une distance normalisée** entre $\hat\theta_n$ et $\theta_0$, la normalisation étant faite par l'information de Fisher. Les directions où l'information est **grande** — donc l'estimation précise — pèsent **davantage** dans la distance : un petit écart y est déjà suspect. Les directions mal informées pèsent peu.

**Pourquoi $d$ degrés de liberté** : on teste $d$ composantes simultanément, donc on somme $d$ carrés de gaussiennes standard indépendantes.

**Une remarque du cours à ne pas manquer** : *le test de Wald est aussi valide si $H_1$ est de la forme $\theta>\theta_0$, $\theta<\theta_0$ ou $\theta=\theta_1$*. La statistique ne change pas ; c'est seulement la puissance qui varie selon l'alternative.

**Le lien avec la fiche 50** : en dimension $d=1$, $T_n=n(\hat\theta_n-\theta_0)^2I(\hat\theta_n)$ est le **carré** de la statistique de Student. La différence est que la régression normale donne une loi **exacte** ($t_{n-p}$), tandis que Wald ne fournit qu'une limite asymptotique ($\chi^2_1$).

</details>

**Niveau 4 — type examen** — Comparez le test de Wald et le test du rapport de vraisemblance.

<details><summary>Correction</summary>

|  | **Wald** | **Rapport de vraisemblance** |
|---|---|---|
| Hypothèse testée | $\theta=\theta_0$ (valeur complète) | $(\theta_{r+1},\dots,\theta_d)=(\theta^{(0)}_{r+1},\dots,\theta^{(0)}_d)$ |
| Statistique | $n(\hat\theta_n-\theta_0)^\top I(\hat\theta_n)(\hat\theta_n-\theta_0)$ | $2\big[\ell_n(\hat\theta_n)-\ell_n(\hat\theta_n^c)\big]$ |
| Loi limite | $\chi_d^2$ | $\chi^2_{d-r}$ |
| Degrés de liberté | dimension de $\theta$ | **nombre de contraintes** |
| Ce qu'il faut calculer | l'EMV **libre** et $I(\hat\theta_n)$ | l'EMV **libre** et l'EMV **contraint** |
| Ce qu'il mesure | une **distance** dans l'espace des paramètres | un **coût en vraisemblance** |

**L'idée de Wald.** *À quelle distance $\hat\theta_n$ est-il de $\theta_0$*, mesurée dans la métrique de l'information de Fisher ? Le théorème asymptotique donne $\sqrt nI^{1/2}(\hat\theta_n-\theta_0)\to N_d(0,I_d)$, et la norme au carré donne le $\chi_d^2$.

**L'idée du rapport de vraisemblance.** *Combien coûte la contrainte* ? Comme $\Theta_0\subset\Theta$, on a toujours $\ell_n(\hat\theta_n)\geq\ell_n(\hat\theta_n^c)$. Si l'écart est faible, la contrainte est plausible ; s'il est grand, on rejette. Le nombre de degrés de liberté, $d-r$, est exactement le **nombre de composantes contraintes**.

**Le lien entre les deux — et c'est le point à savoir.** Ils sont **asymptotiquement équivalents**. La raison est un développement de Taylor de $\ell_n$ au second ordre autour de $\hat\theta_n$ : comme $\nabla\ell_n(\hat\theta_n)=0$,

$$\ell_n(\hat\theta_n^c)\approx\ell_n(\hat\theta_n)+\tfrac12(\hat\theta_n^c-\hat\theta_n)^\top\nabla^2\ell_n(\hat\theta_n)(\hat\theta_n^c-\hat\theta_n)$$

d'où

$$2\big[\ell_n(\hat\theta_n)-\ell_n(\hat\theta_n^c)\big]\approx n(\hat\theta_n-\hat\theta_n^c)^\top I(\hat\theta_n)(\hat\theta_n-\hat\theta_n^c)$$

qui est exactement la forme de Wald. **Le facteur $2$ de la statistique du rapport de vraisemblance est là pour annuler le $\frac12$ de Taylor.**

**Comment choisir en pratique.**

- **Wald** est plus simple quand on a déjà l'EMV libre : pas besoin de réoptimiser sous contrainte. Mais il exige de calculer $I(\hat\theta_n)$, et il n'est **pas invariant par reparamétrisation** — tester $\theta=1$ ou $\log\theta=0$ peut donner des réponses différentes à $n$ fini.
- **Le rapport de vraisemblance** est **invariant par reparamétrisation** et généralement mieux calibré en échantillon fini, mais il exige **deux** optimisations.
- **Un troisième test** existe, celui du **score** (multiplicateur de Lagrange), qui ne demande que l'EMV **contraint** — utile quand le modèle libre est difficile à estimer. Les trois sont asymptotiquement équivalents et forment la « trinité » des tests classiques.

**La limite commune, à mentionner.** Les trois reposent sur les **conditions techniques de l'EMV** de la fiche 64 — en particulier que le **support ne dépende pas de $\theta$** et que $\theta^\ast$ ne soit pas sur la **frontière** de $\Theta$. Tester $\sigma^2=0$ ou une probabilité $p=0$ tombe précisément dans le cas exclu, et la loi limite n'est alors plus un $\chi^2$ ordinaire.

</details>

## 🔴 Common mistakes

1. **Conclure « $H_0$ est vraie »** — on ne peut que **ne pas la rejeter** : *innocent jusqu'à preuve du contraire*.
2. **Confondre p-valeur et $\mathbb P[H_0\mid\text{données}]$** — la p-valeur est calculée **sous** $H_0$.
3. **Confondre erreur de première et de seconde espèce** — la première rejette à tort, la seconde manque un effet réel.
4. **Oublier que la puissance est un $\inf$ sur $\Theta_1$** — c'est une performance de **pire cas**.
5. **Croire qu'on peut minimiser les deux erreurs** — elles varient en sens inverse : on **fixe** $\alpha$ et l'on maximise la puissance.
6. **Utiliser $q_\alpha$ au lieu de $q_{\alpha/2}$** pour un test **bilatéral**.
7. **Se tromper de degrés de liberté** — $\chi^2_d$ pour Wald, $\chi^2_{d-r}$ pour le rapport de vraisemblance (**nombre de contraintes**), $\chi^2_k$ pour la méthode delta.
8. **Oublier le facteur $2$** dans la statistique du rapport de vraisemblance.
9. **Utiliser $n$ au lieu de $n-1$** dans les degrés de liberté de Cochran et de Student.
10. **Appliquer ces tests quand $\theta^\ast$ est sur la frontière** — les conditions techniques de l'EMV sont violées.
11. **Interpréter un non-rejet sur un petit échantillon comme une absence d'effet** — c'est un manque de **puissance**.

## 📌 Ultimate Review

1. **Formulation** : $\Theta_0,\Theta_1$ disjoints ; $H_0:\theta\in\Theta_0$ contre $H_1:\theta\in\Theta_1$ ; les données servent **seulement à réfuter $H_0$**.
2. **Test** : $\psi\in\{0,1\}$ ; $\psi=1$ ⟹ rejet. Région de rejet $R_\psi=\{x:\psi(x)=1\}$.
3. **Erreur de 1re espèce** : $\alpha_\psi(\theta)=\mathbb P_\theta[\psi=1]$ sur $\Theta_0$. **De 2e espèce** : $\beta_\psi(\theta)=\mathbb P_\theta[\psi=0]$ sur $\Theta_1$.
4. **Puissance** : $\pi_\psi=\inf_{\theta\in\Theta_1}(1-\beta_\psi(\theta))$.
5. **Niveau $\alpha$** : $\alpha_\psi(\theta)\leq\alpha\ \forall\theta\in\Theta_0$ ; **asymptotique** si $\lim_n\alpha_\psi(\theta)\leq\alpha$.
6. **Forme générale** : $\psi=\mathbf 1\{T_n>c\}$, $T_n$ statistique de test.
7. **Exemple de la pièce** : $T_n=\sqrt n(\hat p_n-0{,}5)/\sqrt{0{,}25}$ ; $\psi_\alpha=\mathbf 1\{\lvert T_n\rvert>q_{\alpha/2}\}$ ; $q_{0{,}025}=1{,}96$.
8. **p-valeur** : plus petit niveau auquel on rejette ; **règle d'or** p-valeur $\leq\alpha\iff$ rejet au niveau $\alpha$ ; **aléatoire**.
9. **Neyman-Pearson** : à niveau $\alpha$ fixé, chercher la **puissance maximale** ; le test trivial $\psi=0$ a un niveau parfait et une puissance nulle.
10. **Loi $\chi^2_d$** : loi de $Z_1^2+\cdots+Z_d^2$ ; si $Z\sim N_d(0,I_d)$, $\lVert Z\rVert^2\sim\chi_d^2$ ; $\chi^2_2=\mathrm{Exp}(1/2)$.
11. **Variance empirique** : $S_n=\frac1n\sum(X_i-\bar X_n)^2$ ; **Cochran** : $nS_n/\sigma^2\sim\chi^2_{n-1}$ dans le modèle gaussien.
12. **Loi de Student** $t_d$ : loi de $Z/\sqrt{V/d}$ avec $Z\sim N(0,1)$, $V\sim\chi_d^2$, $Z\perp V$ ; et $\sqrt{n-1}(\bar X_n-\mu)/\sqrt{S_n}\sim t_{n-1}$.
13. **Wald** : $\sqrt nI(\hat\theta_n)^{1/2}(\hat\theta_n-\theta_0)\to N_d(0,I_d)$, d'où $$T_n=n\big(\hat\theta_n-\theta_0\big)^\top I\big(\hat\theta_n\big)\big(\hat\theta_n-\theta_0\big)\to\chi_d^2$$
14. **Rapport de vraisemblance** : $H_0$ fixe $d-r$ composantes ; $T_n=2[\ell_n(\hat\theta_n)-\ell_n(\hat\theta_n^c)]\to\chi^2_{d-r}$.
15. **Hypothèses implicites** : $H_0:g(\theta)=0$ avec $g:\mathbb R^d\to\mathbb R^k$ ; **méthode delta** $$\sqrt n\big(g(\hat\theta_n)-g(\theta)\big)\to N_k\big(0,\Gamma(\theta)\big), \qquad \Gamma(\theta)=\nabla g(\theta)^\top\Sigma(\theta)\nabla g(\theta)$$ puis $T_n=n\,g(\hat\theta_n)^\top\Gamma^{-1}(\hat\theta_n)g(\hat\theta_n)\to\chi_k^2$.
16. **Wald et rapport de vraisemblance sont asymptotiquement équivalents** — développement de Taylor au second ordre, d'où le facteur $2$.

**Formulas to know**

$$\alpha_\psi(\theta)=\mathbb P_\theta[\psi=1] \qquad \pi_\psi=\inf_{\theta\in\Theta_1}\big(1-\beta_\psi(\theta)\big) \qquad \psi=\mathbf 1\{T_n>c\}$$

$$\frac{nS_n}{\sigma^2}\sim\chi^2_{n-1} \qquad \sqrt{n-1}\,\frac{\bar X_n-\mu}{\sqrt{S_n}}\sim t_{n-1}$$

$$T_n^{\text{Wald}}=n(\hat\theta_n-\theta_0)^\top I(\hat\theta_n)(\hat\theta_n-\theta_0)\to\chi_d^2 \qquad T_n^{\text{RV}}=2\big[\ell_n(\hat\theta_n)-\ell_n(\hat\theta_n^c)\big]\to\chi^2_{d-r}$$

$$\Gamma(\theta)=\nabla g(\theta)^\top\Sigma(\theta)\nabla g(\theta)$$

**Methods to know** : la construction d'un test en six étapes ; la dérivation de la statistique de Wald à partir du théorème asymptotique ; le comptage des degrés de liberté ; la méthode delta.

## 🧠 Active Recall

**Basic** — Définissez les deux types d'erreur, la puissance et le niveau.

<details><summary>Réponse</summary>

**Erreur de première espèce** — rejeter $H_0$ alors qu'elle est **vraie** :

$$\alpha_\psi:\Theta_0\to\mathbb R, \qquad \theta\mapsto\mathbb P_\theta[\psi=1]$$

**Erreur de seconde espèce** — ne pas rejeter $H_0$ alors que $H_1$ est **vraie** :

$$\beta_\psi:\Theta_1\to\mathbb R, \qquad \theta\mapsto\mathbb P_\theta[\psi=0]$$

**Puissance** — la performance de **pire cas** sous l'alternative :

$$\pi_\psi=\inf_{\theta\in\Theta_1}\big(1-\beta_\psi(\theta)\big)$$

**Niveau $\alpha$** : $\alpha_\psi(\theta)\leq\alpha$ pour **tout** $\theta\in\Theta_0$ ; **niveau asymptotique $\alpha$** si $\lim_{n\to\infty}\alpha_\psi(\theta)\leq\alpha$.

</details>

**Understanding** — Pourquoi $H_0$ et $H_1$ ne jouent-ils pas un rôle symétrique ?

<details><summary>Réponse</summary>

Parce que *les données ne servent qu'à tenter de **réfuter** $H_0$*. Le test cherche des éléments **contre** $H_0$ ; il ne cherche jamais à la confirmer.

**La conséquence** : *une absence de preuve ne signifie pas que $H_0$ est vraie* — « innocent jusqu'à preuve du contraire ». On ne peut conclure que « on rejette $H_0$ » ou « on ne rejette pas $H_0$ ».

**La traduction technique** : le **niveau** — le risque de rejeter à tort — est **contrôlé par construction** à $\alpha$. La **puissance** — la chance de rejeter à raison — n'est contrôlée par rien : elle dépend de la taille de l'échantillon et de l'écart réel à $H_0$.

**En pratique**, c'est l'erreur d'interprétation la plus fréquente en économétrie. « Le coefficient n'est pas significatif » ne veut pas dire « le coefficient est nul » : sur un échantillon petit ou bruité, on ne rejette presque jamais — faute de **puissance**, pas faute d'effet.

</details>

**Application** — Un test donne une p-valeur de $0{,}03$. Que conclure aux niveaux $5\,\%$ et $1\,\%$ ?

<details><summary>Réponse</summary>

Par la **règle d'or** : p-valeur $\leq\alpha\iff$ rejet au niveau $\alpha$.

- **Au niveau $5\,\%$** : $0{,}03\leq0{,}05$ ⟹ on **rejette $H_0$**.
- **Au niveau $1\,\%$** : $0{,}03>0{,}01$ ⟹ on **ne rejette pas $H_0$**.

**Ce que cela illustre.** La conclusion **dépend du seuil choisi**, et le seuil est une décision, pas un fait statistique. Un résultat « significatif à $5\,\%$ » et « non significatif à $1\,\%$ » est un résultat **fragile** : il n'y a rien de magique dans $0{,}05$.

**Ce que la p-valeur apporte de plus qu'un verdict.** Elle donne le **seuil critique lui-même**, ce qui permet à chaque lecteur d'appliquer son propre arbitrage. Elle mesure la force de l'évidence, pas seulement sa présence.

⚠️ **Et elle ne dit pas** : « il y a $3\,\%$ de chances que $H_0$ soit vraie ». Elle dit : « **si** $H_0$ était vraie, on observerait un résultat au moins aussi extrême $3\,\%$ du temps ».

</details>

**Comparison** — $\chi^2$ et Student : d'où viennent ces deux lois ?

<details><summary>Réponse</summary>

|  | **$\chi_d^2$** | **$t_d$** |
|---|---|---|
| Définition | $Z_1^2+\cdots+Z_d^2$, $Z_i$ i.i.d. $N(0,1)$ | $Z/\sqrt{V/d}$, $Z\sim N(0,1)$, $V\sim\chi_d^2$, $Z\perp V$ |
| À quoi elle sert | tester une **variance**, ou plusieurs paramètres à la fois | tester une **moyenne** à variance **inconnue** |
| Où elle apparaît | $nS_n/\sigma^2\sim\chi^2_{n-1}$ (Cochran) | $\sqrt{n-1}(\bar X_n-\mu)/\sqrt{S_n}\sim t_{n-1}$ |
| Tests concernés | **Wald**, **rapport de vraisemblance**, méthode delta | test de Student (fiche 50) |

**Le lien entre les deux.** Student est un **quotient** : une gaussienne divisée par la racine d'un $\chi^2$ normalisé et **indépendant**. C'est exactement ce que produit le modèle gaussien : $\bar X_n$ est gaussienne, $nS_n/\sigma^2$ est un $\chi^2_{n-1}$, et le théorème de **Cochran** garantit leur **indépendance**. Le $\sigma$ inconnu se simplifie dans le quotient — c'est tout l'intérêt.

**Pourquoi $n-1$.** Les écarts $X_i-\bar X_n$ sont liés par une contrainte (leur somme est nulle), donc ils n'occupent que $n-1$ dimensions. C'est la même comptabilité qu'en fiche 50, où l'estimation de $p$ paramètres laisse $n-p$ degrés de liberté.

**Et quand $n$ grandit**, $t_{n-1}\to N(0,1)$ : l'incertitude sur $\sigma$ devient négligeable et Student redevient gaussienne. C'est pourquoi les tests asymptotiques du chapitre utilisent directement $N(0,1)$ et $\chi^2$.

</details>

**Exam-style** — Construisez le test du rapport de vraisemblance et justifiez ses degrés de liberté.

<details><summary>Réponse</summary>

**Le cadre.** Modèle $\big(E,(\mathbb P_\theta)_{\theta\in\Theta}\big)$ avec $\Theta\subseteq\mathbb R^d$. L'hypothèse nulle **fixe $d-r$ composantes** :

$$H_0:\ (\theta_{r+1},\dots,\theta_d)=\big(\theta^{(0)}_{r+1},\dots,\theta^{(0)}_d\big)$$

**Les deux estimateurs.**

$$\hat\theta_n=\underset{\theta\in\Theta}{\mathrm{argmax}}\ \ell_n(\theta) \qquad\text{et}\qquad \hat\theta_n^c=\underset{\theta\in\Theta_0}{\mathrm{argmax}}\ \ell_n(\theta)$$

**La statistique.**

$$T_n=2\Big[\ell_n\big(\hat\theta_n\big)-\ell_n\big(\hat\theta_n^c\big)\Big]$$

**Le théorème.** Sous $H_0$ et les conditions techniques de l'EMV, $T_n\xrightarrow{(d)}\chi^2_{d-r}$. Le test de niveau asymptotique $\alpha$ est $\psi=\mathbf 1\{T_n>q_\alpha\}$, avec $q_\alpha$ le quantile d'ordre $1-\alpha$ de $\chi^2_{d-r}$.

**L'idée.** Comme $\Theta_0\subset\Theta$, on a toujours $\ell_n(\hat\theta_n)\geq\ell_n(\hat\theta_n^c)$, donc $T_n\geq0$. La question est : **combien coûte la contrainte** en vraisemblance ? Peu ⟹ elle est plausible. Beaucoup ⟹ on rejette.

**Pourquoi $d-r$ degrés de liberté.** C'est **le nombre de contraintes imposées par $H_0$** — le nombre de composantes fixées. L'argument formel est un développement de Taylor : comme $\nabla\ell_n(\hat\theta_n)=0$,

$$T_n\approx n\big(\hat\theta_n-\hat\theta_n^c\big)^\top I\big(\hat\theta_n\big)\big(\hat\theta_n-\hat\theta_n^c\big)$$

Or $\hat\theta_n-\hat\theta_n^c$ est asymptotiquement gaussien **confiné dans le sous-espace de dimension $d-r$** orthogonal à $\Theta_0$ — les $r$ composantes libres sont estimées de la même façon des deux côtés et ne contribuent pas. La forme quadratique est donc une somme de $d-r$ carrés de gaussiennes standard, c'est-à-dire un $\chi^2_{d-r}$.

**D'où vient le facteur $2$.** Le développement de Taylor produit un $\frac12$ devant la forme quadratique ; le facteur $2$ l'annule exactement, ce qui donne la loi $\chi^2$ pure. Ce n'est donc pas un ajustement empirique.

**Ce que ce calcul montre aussi.** La forme obtenue est **celle de Wald**, avec $\hat\theta_n^c$ à la place de $\theta_0$ : les deux tests sont **asymptotiquement équivalents**.

**Quand préférer le rapport de vraisemblance.** Il est **invariant par reparamétrisation** — contrairement à Wald, qui peut donner des réponses différentes selon qu'on teste $\theta=1$ ou $\log\theta=0$ à $n$ fini — et il est généralement mieux calibré en petit échantillon. Son coût : il faut **deux** optimisations au lieu d'une.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Rôle des données dans un test ? | Tenter de **réfuter $H_0$** — jamais la confirmer |
| Que signifie « ne pas rejeter $H_0$ » ? | **Pas** que $H_0$ est vraie — « innocent jusqu'à preuve du contraire » |
| Définition d'un test ? | Une statistique $\psi\in\{0,1\}$ ; $\psi=1$ ⟹ rejet |
| Région de rejet ? | $R_\psi=\{x\in E^n:\psi(x)=1\}$ |
| Erreur de première espèce ? | $\alpha_\psi(\theta)=\mathbb P_\theta[\psi=1]$ sur $\Theta_0$ |
| Erreur de seconde espèce ? | $\beta_\psi(\theta)=\mathbb P_\theta[\psi=0]$ sur $\Theta_1$ |
| Puissance ? | $\pi_\psi=\inf_{\theta\in\Theta_1}(1-\beta_\psi(\theta))$ |
| Pourquoi un $\inf$ ? | C'est la performance de **pire cas** sous l'alternative |
| Niveau $\alpha$ ? | $\alpha_\psi(\theta)\leq\alpha$ pour **tout** $\theta\in\Theta_0$ |
| Forme générale d'un test ? | $\psi=\mathbf 1\{T_n>c\}$ |
| Statistique du test de la pièce ? | $\sqrt n(\hat p_n-0{,}5)/\sqrt{0{,}25}$ |
| Quantile bilatéral à $5\,\%$ ? | $q_{0{,}025}=1{,}96$ |
| Définition de la p-valeur ? | Le **plus petit niveau** auquel on rejette $H_0$ |
| La règle d'or ? | p-valeur $\leq\alpha\iff$ rejet au niveau $\alpha$ |
| La p-valeur est-elle $\mathbb P[H_0]$ ? | **Non** — elle est calculée **sous** $H_0$ |
| Idée de Neyman-Pearson ? | À niveau $\alpha$ fixé, maximiser la **puissance** |
| Défaut du test trivial $\psi=0$ ? | Niveau parfait, **puissance nulle** |
| Définition de $\chi^2_d$ ? | Loi de $Z_1^2+\cdots+Z_d^2$, $Z_i$ i.i.d. $N(0,1)$ |
| Variance empirique ? | $S_n=\frac1n\sum(X_i-\bar X_n)^2$ |
| Théorème de Cochran ? | $nS_n/\sigma^2\sim\chi^2_{n-1}$ |
| Que vaut $\chi_2^2$ ? | $\mathrm{Exp}(1/2)$ |
| Définition de $t_d$ ? | $Z/\sqrt{V/d}$, $Z\sim N(0,1)$, $V\sim\chi_d^2$, **indépendants** |
| Statistique de Student pour la moyenne ? | $\sqrt{n-1}(\bar X_n-\mu)/\sqrt{S_n}\sim t_{n-1}$ |
| Statistique de Wald ? | $n(\hat\theta_n-\theta_0)^\top I(\hat\theta_n)(\hat\theta_n-\theta_0)$ |
| Sa loi limite ? | $\chi_d^2$ |
| D'où vient ce $\chi^2$ ? | Norme au carré d'un $N_d(0,I_d)$ |
| Statistique du rapport de vraisemblance ? | $2[\ell_n(\hat\theta_n)-\ell_n(\hat\theta_n^c)]$ |
| Sa loi limite ? | $\chi^2_{d-r}$ |
| Que compte $d-r$ ? | Le **nombre de contraintes** de $H_0$ |
| Pourquoi le facteur $2$ ? | Il annule le $\frac12$ du développement de Taylor |
| Formule de la méthode delta ? | $\Gamma(\theta)=\nabla g(\theta)^\top\Sigma(\theta)\nabla g(\theta)$ |
| Loi limite du test implicite ? | $\chi_k^2$, $k$ = dimension de $g$ |
| Wald et rapport de vraisemblance ? | **Asymptotiquement équivalents** |
