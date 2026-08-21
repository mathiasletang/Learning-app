# Fiche 63 — Équations différentielles stochastiques et équation de la chaleur

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché |
| **Cours source** | *18.S096 Topics in Mathematics with Applications in Finance*, MIT OpenCourseWare, automne 2013 — cours 21 « Stochastic Differential Equations » |
| **Difficulté** | Must know — comment on résout effectivement les modèles de la finance |
| **Temps d'étude estimé** | 2 h 15 |
| **Prérequis** | Fiche 56 (lemme d'Itô, intégrale stochastique), fiche 62 (mouvement brownien), fiche 57 (Black-Scholes) |
| **Concepts clés** | Équation différentielle stochastique, forme intégrale, condition de Lipschitz, identification des coefficients, brownien géométrique, processus d'Ornstein-Uhlenbeck, retour à la moyenne, différences finies, Monte-Carlo, méthode des arbres, équation de la chaleur, solution fondamentale, superposition |
| **Poids à l'examen** | Trois choses : la **méthode d'identification des coefficients** appliquée au brownien géométrique ; la **résolution d'Ornstein-Uhlenbeck** par facteur intégrant ; et la **solution fondamentale** de l'équation de la chaleur. |

## 🎯 Vue d'ensemble

> **Le problème.** On veut résoudre des équations différentielles de la forme
>
> $$dX=\mu\big(t,X(t)\big)\,dt+\sigma\big(t,X(t)\big)\,dB(t)$$
>
> pour des fonctions $\mu$ et $\sigma$ données et un mouvement brownien $B(t)$.

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition d'une solution.</span>

Une fonction — ou une trajectoire — $X$ est **solution** de l'équation ci-dessus si elle satisfait

$$X(T)=X(0)+\int_0^T\mu\big(t,X(t)\big)\,dt+\int_0^T\sigma\big(t,X(t)\big)\,dB(t)$$

</div>

```
FORME        dX = μ(t,X) dt + σ(t,X) dB
             ↑ dérive             ↑ diffusion
EXISTENCE    Lipschitz + croissance ⟹ solution unique
RÉSOLUTION   identification des coefficients (2 cas fermés)
             — brownien géométrique : X = x₀ e^{(μ−σ²/2)t + σB}
             — Ornstein-Uhlenbeck   : retour à la moyenne
SINON        différences finies · Monte-Carlo · arbres
BONUS        l'équation de la chaleur, et sa solution fermée
```

> **La citation de Steele que le cours reprend.** *Les équations différentielles stochastiques fournissent un **lien entre la théorie des probabilités** et les domaines bien plus anciens et développés des **équations différentielles ordinaires et aux dérivées partielles**. De merveilleuses conséquences circulent **dans les deux sens**. Le modélisateur stochastique bénéficie de siècles de développement des sciences physiques, et de nombreux résultats classiques de la physique mathématique — voire des mathématiques pures — peuvent recevoir de nouvelles interprétations intuitives.*

⚠️ **Ce pont est exactement celui de la fiche 57.** L'EDP de Black-Scholes se ramène par changement de variables à l'**équation de la chaleur**, étudiée depuis Fourier. Le concept 8 en donne la solution explicite.

## 🔴 Concept 1 — Existence et unicité

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 1.1 (existence et unicité).</span>

*Si les coefficients de l'équation différentielle stochastique*

$$dX=\mu\big(t,X(t)\big)dt+\sigma\big(t,X(t)\big)dB(t), \qquad X(0)=x_0, \quad 0\leq t\leq T$$

*satisfont une **condition de Lipschitz en la variable d'espace***

$$\big\lvert\mu(t,x)-\mu(t,y)\big\rvert^2+\big\lvert\sigma(t,x)-\sigma(t,y)\big\rvert^2\leq K\lvert x-y\rvert^2$$

*et la **condition de croissance spatiale***

$$\big\lvert\mu(t,x)\big\rvert^2+\big\lvert\sigma(t,x)\big\rvert^2\leq K\big(1+\lvert x\rvert^2\big)$$

*alors il existe une solution **continue et adaptée** $X(t)$ vérifiant une borne $L^2$. De plus, si $X(t)$ et $Y(t)$ sont deux solutions continues vérifiant cette borne, alors*

$$\mathbb P\big(X(t)=Y(t) \text{ pour tout } t\in[0,T]\big)=1$$

</div>

> *La démonstration est assez technique. Grâce à ce théorème, on sait que **la plupart des EDS ont effectivement une solution**.*

⚠️ **Les deux conditions ont chacune un rôle précis, et ce sont les mêmes qu'en EDO.**

> - **Lipschitz** ⟹ l'**unicité**. Sans elle, deux trajectoires partant du même point peuvent bifurquer — c'est le contre-exemple classique $\dot x=\sqrt x$ avec $x(0)=0$, qui admet $x\equiv0$ **et** $x=t^2/4$.
> - **Croissance** ⟹ l'**existence globale**, c'est-à-dire l'absence d'explosion en temps fini. Sans elle, $\dot x=x^2$ diverge avant $T$.
>
> **Et les mots « continue et **adaptée** » sont essentiels** : la solution ne doit dépendre que du passé du brownien (fiche 56). C'est ce qui rend l'intégrale $\int_0^T\sigma\,dB$ bien définie et martingale.

## 🔴 Concept 2 — L'identification des coefficients : le brownien géométrique

> *L'une des équations différentielles stochastiques les plus naturelles et les plus importantes est*
>
> $$dX(t)=\mu X(t)\,dt+\sigma X(t)\,dB(t), \qquad X(0)=x_0>0$$
>
> *où $-\infty<\mu<\infty$ et $\sigma>0$ sont des constantes.*

**La méthode.** *Faisons semblant de ne pas connaître la solution et cherchons-en une de la forme $X(t)=f(t,B(t))$.*

**Étape 1 — appliquer le lemme d'Itô** (fiche 56) à $f(t,B(t))$ :

$$dX(t)=\left(\frac{\partial f}{\partial t}+\frac12\frac{\partial^2f}{\partial x^2}\right)dt+\frac{\partial f}{\partial x}\,dB(t)$$

**Étape 2 — identifier terme à terme** avec $dX=\mu X\,dt+\sigma X\,dB$, c'est-à-dire avec $\mu f\,dt+\sigma f\,dB$ :

$$\mu f=\frac{\partial f}{\partial t}+\frac12\frac{\partial^2f}{\partial x^2} \qquad\text{et}\qquad \sigma f=\frac{\partial f}{\partial x}$$

**Étape 3 — résoudre la seconde équation**, qui est la plus simple. $\partial f/\partial x=\sigma f$ donne

$$f(t,x)=e^{\sigma x+g(t)}$$

pour une fonction $g$ à déterminer.

**Étape 4 — reporter dans la première.** Avec $\frac{\partial f}{\partial t}=g'(t)f$ et $\frac{\partial^2f}{\partial x^2}=\sigma^2f$ :

$$\mu f=g'(t)f+\frac{\sigma^2}{2}f \qquad\Longrightarrow\qquad g'(t)=\mu-\frac{\sigma^2}{2}$$

**Étape 5 — conclure.** En intégrant et en ajustant la constante par $X(0)=x_0$ :

$$f(t,x)=x_0\,e^{\sigma x+(\mu-\sigma^2/2)t} \qquad\Longrightarrow\qquad \boxed{\ X(t)=x_0\,e^{(\mu-\sigma^2/2)t+\sigma B(t)}\ }$$

> **La méthode est remarquablement simple, et c'est ce qui la rend utile.** On postule une forme, on applique Itô, et l'on **identifie les coefficients de $dt$ et de $dB$ séparément** — c'est légitime par l'unicité de la décomposition d'un processus d'Itô (fiche 57, étape 3 de la dérivation de Black-Scholes). Le système d'EDP obtenu est ici trivial à résoudre.
>
> **Et le $-\sigma^2/2$ apparaît naturellement**, comme constante d'intégration de $g'$. Il n'est ni postulé ni justifié par Jensen : il **tombe du calcul**. C'est la troisième fois qu'on le rencontre — fiches 53, 56, et ici.

## 🔴 Concept 3 — Le processus d'Ornstein-Uhlenbeck

Soient $\alpha$ et $\sigma$ des constantes positives, et considérons l'EDS

$$dX(t)=-\alpha X(t)\,dt+\sigma\,dB(t), \qquad X(0)=x_0$$

> *Ornstein et Uhlenbeck ont utilisé les premiers une version de cette équation pour étudier le **comportement des gaz**. Elle a été appliquée — ou redécouverte — dans une grande variété de contextes. Cette EDS présente le comportement de **retour à la moyenne** (quand $\alpha>0$).*

**La méthode d'identification échoue ici**, on essaie donc une autre fonction test :

$$X(t)=a(t)\left(x_0+\int_0^tb(s)\,dB(s)\right), \qquad a(0)=1$$

**Étape 1 — différencier.** En dérivant chaque membre :

$$dX(t)=X(t)\,\frac{a'(t)}{a(t)}\,dt+a(t)b(t)\,dB(t)$$

où l'on suppose $a(t)>0$ pour tout $t$.

**Étape 2 — identifier** avec l'EDS donnée :

$$-\alpha=\frac{a'(t)}{a(t)} \qquad\text{et}\qquad \sigma=a(t)b(t)$$

**Étape 3 — résoudre.** $a'/a=-\alpha$ avec $a(0)=1$ donne $a(t)=e^{-\alpha t}$, puis $b(t)=\sigma e^{\alpha t}$.

**Étape 4 — conclure.**

$$\boxed{\ X(t)=x_0e^{-\alpha t}+\sigma\int_0^te^{\alpha(s-t)}\,dB(s)\ }$$

<div class="callout" data-kind="methode">

<span class="callout__lab">Comment lire cette solution — c'est le processus le plus utile de la finance des taux.</span>

- Le premier terme $x_0e^{-\alpha t}$ est le **souvenir de la condition initiale**, qui s'efface exponentiellement. Après un temps $1/\alpha$, il ne reste plus qu'un tiers de l'écart initial.
- Le second terme est une **moyenne pondérée des chocs passés**, avec des poids $e^{\alpha(s-t)}$ qui **décroissent géométriquement** vers le passé : les chocs récents pèsent le plus.

**C'est l'AR(1) en temps continu** (fiche 52). Le paramètre $\alpha$ joue le rôle de $-\log\phi$, et $1/\alpha$ est le temps caractéristique de retour à la moyenne. Ce n'est pas une coïncidence : le cours de la fiche 52 citait explicitement *« taux d'intérêt — processus d'Ornstein-Uhlenbeck ; modèle de Vasicek »* parmi les exemples d'AR(1).

</div>

**Les moments s'en déduisent immédiatement.** L'intégrale d'Itô d'un intégrande **déterministe** est gaussienne centrée (fiche 56), donc

$$E[X(t)]=x_0e^{-\alpha t}\ \xrightarrow[t\to\infty]{}\ 0$$

et par l'**isométrie d'Itô** :

$$\mathrm{Var}\big(X(t)\big)=\sigma^2\int_0^te^{2\alpha(s-t)}ds=\frac{\sigma^2}{2\alpha}\big(1-e^{-2\alpha t}\big)\ \xrightarrow[t\to\infty]{}\ \frac{\sigma^2}{2\alpha}$$

⚠️ **La variance **converge** au lieu de croître — c'est toute la différence avec le brownien.** Le brownien a $\mathrm{Var}(B(t))=t\to\infty$ ; ici la variance se stabilise à $\sigma^2/(2\alpha)$. Le processus admet donc une **loi stationnaire** $N(0,\sigma^2/2\alpha)$ : c'est un processus **stationnaire** au sens de la fiche 52, contrairement au brownien qui est $I(1)$.

## 🟡 Concept 4 — Différences finies

> *La plupart des EDP et des EDS **n'ont pas de solution en forme fermée**. On recourt alors à des méthodes numériques : **différences finies**, **méthode des arbres**, ou **simulation de Monte-Carlo**.*

**Exemple 2.1.** On veut résoudre $u'(x)=5u(x)+2$ avec $u(0)=0$, pour calculer $u(1)$.

**Étape 1.** Choisir une petite valeur $h$. On calcule la valeur approchée de $u$ aux points $x=0,h,2h,3h,\dots,kh$ avec $kh=1$. *On espère que la valeur numérique approche la vraie valeur quand $h$ diminue.* Prenons $h=1/2$.

**Étape 2.** Utiliser la formule de Taylor :

$$u\big((i+1)h\big)\approx u(ih)+h\cdot u'(ih)=u(ih)+h\cdot\big(5u(ih)+2\big) \tag{2.1}$$

*$u((i+1)h)$ se calcule donc approximativement à partir de $u(ih)$, et l'on peut poursuivre de proche en proche.*

**Le calcul avec $h=1/2$ :**

$$u\Big(\tfrac12\Big)\approx u(0)+\tfrac12u'(0)=0+\tfrac12(5\cdot0+2)=1$$

$$u(1)\approx u\Big(\tfrac12\Big)+\tfrac12u'\Big(\tfrac12\Big)=1+\tfrac12(5\cdot1+2)=\frac92$$

**L'extension aux EDP.** *La méthode s'étend facilement : pour une fonction $u(x,y)$ de deux variables, on calcule $u$ aux points d'intersection d'une grille fine, $u(ih,jh)$ pour $i,j=0,1,2,\dots$*

> ⚠️ *Cette méthode **ne peut pas s'appliquer directement** aux EDS. La raison est que, pour une EDS, l'équation correspondant à (2.1) fait intervenir des **variables aléatoires**.*

**C'est le point de blocage.** Le schéma d'Euler classique demande de connaître $u'(ih)$ ; pour une EDS, l'accroissement $\Delta B$ est aléatoire et inconnu. Il faut donc soit **tirer** ces accroissements — c'est Monte-Carlo —, soit **énumérer** leurs valeurs possibles — c'est la méthode des arbres.

## 🟠 Concept 5 — La simulation de Monte-Carlo

> *La simulation de Monte-Carlo est une méthode qui simule un espace de probabilité en prenant des **échantillons indépendants** de cet espace selon la loi de probabilité.*

Elle résout le blocage précédent. Soit une EDS de la forme

$$df(t,B_t)=g(t,B_t)\,dB_t+h(t,B_t)\,dt$$

> **L'observation clé.** *Si l'on **connaît déjà** la trajectoire $B_t$, l'équation devient une **EDP** — et l'on peut alors utiliser la méthode des différences finies.*

**Les trois étapes.**

1. **Choisir une trajectoire aléatoire** $B_t$ selon la loi de probabilité.
2. **Utiliser cette trajectoire** et la méthode des différences finies pour résoudre l'EDS **pour ce tirage particulier**.
3. **Répéter** les étapes 1 et 2 un grand nombre de fois.

*Cela fournit une loi de probabilité du processus $f(t,B_t)$. La simulation de Monte-Carlo repose sur l'idée que la distribution obtenue **converge** vers celle du processus stochastique solution de l'EDS.*

> **La logique de la méthode, en une phrase.** On **conditionne sur la trajectoire du hasard** : une fois $B_t$ fixé, tout redevient déterministe. On calcule le résultat trajectoire par trajectoire, puis on moyenne. C'est exactement la logique du concept 9 de la fiche 55 — et c'est ce qui rend Monte-Carlo indispensable en grande dimension et pour les produits dépendants du chemin.

## 🟡 Concept 6 — La méthode des arbres

> *La méthode des arbres utilise l'idée que **le mouvement brownien peut être vu comme limite d'une marche aléatoire simple**.*

Supposons qu'on veuille calculer la valeur de $f(t,B_t)$ en $t=T$, avec

$$df(t,B_t)=g(t,B_t)\,dB_t+h(t,B_t)\,dt$$

**La construction.** On prend des points d'échantillonnage $t_0,t_1,t_2,\dots$ du domaine temporel $[0,T]$, et *on **remplace les occurrences de $B_t$** dans l'EDS par une **marche aléatoire simple** qui monte ou descend d'un pas pendant chaque intervalle $[t_i,t_{i+1}]$ — le pas étant choisi de façon appropriée. Cela donne une façon **inductive** de trouver approximativement la loi de $f(T,B_T)$.*

> *Hull illustre comment ces méthodes sont utilisées dans les applications financières.*

> **C'est l'arbre binomial de la fiche 57**, et le lien est exact : la fiche 62 a montré que $Z(t/n)=Y_t/\sqrt n$ converge vers le brownien. Le « pas choisi de façon appropriée » est précisément $\sqrt{\Delta t}$.
>
> **Arbres contre Monte-Carlo.** L'arbre **énumère** toutes les trajectoires possibles de la marche discrétisée et les pondère exactement ; Monte-Carlo en **tire** un échantillon. L'arbre est exact sur la grille mais son coût explose exponentiellement en dimension ; Monte-Carlo a une erreur en $1/\sqrt N$ **indépendante de la dimension**. D'où le critère de choix de la fiche 57.

## 🔴 Concept 7 — L'équation de la chaleur

> *Notre dernier sujet est une EDP bien connue, l'**équation de la chaleur**. Il est bien connu que **l'équation de Black-Scholes peut être transformée en équation de la chaleur** après un changement de variables approprié.*

Soit $u(x,t)$ une fonction de deux variables, l'espace et le temps. L'**équation de la chaleur unidimensionnelle** (équation de diffusion) est

$$\boxed{\ \frac{\partial u}{\partial t}=\frac{\partial^2u}{\partial x^2}\ }$$

> *C'est l'une des rares équations aux dérivées partielles qui soit **très bien comprise**, et qui admette une **solution en forme fermée**.*

**Exemple 3.1.** *Soit $u(x,t)$ la température dans une barre longue, fine et uniforme dont les côtés sont parfaitement isolés, de sorte que sa température ne varie qu'avec la distance $x$ le long de la barre et avec le temps $t$. Alors $u(x,t)$ satisfait l'équation de la chaleur — d'où le nom.*

**Le problème.** Résoudre des problèmes à valeur initiale

$$u(0,x)=u_0(x) \qquad (-\infty<x<\infty)$$

### Observation 1 — la linéarité

> *L'équation de la chaleur est **linéaire** : si $u_1(x,t)$ et $u_2(x,t)$ la satisfont, alors $(u_1+u_2)(x,t)$ aussi. Plus généralement, si l'on dispose d'une famille de solutions $u_s(x,t)$ indexée par $s\in\mathbb R$, alors*
>
> $$\int_{-\infty}^\infty u_s(x,t)\cdot c(s)\,ds$$
>
> *est aussi une solution, tant que l'intégrale existe et est dérivable à l'ordre voulu. **Cela signifie qu'on peut superposer les solutions de problèmes « faciles » pour obtenir la solution d'un problème plus général.***

### Observation 2 — la solution fondamentale

> *Le problème « facile » qu'on va utiliser est celui dont la valeur initiale est une **fonction delta de Dirac**.* Avec $u_0=\delta$, c'est-à-dire $u(0,x)=\delta(x)$, la solution est
>
> $$\boxed{\ u_\delta(x,t)=\frac{1}{2\sqrt{\pi t}}\,e^{-x^2/(4t)} \qquad (-\infty<x<\infty,\ t>0)\ }$$

> *Noter que la solution **« converge vers » la fonction de Dirac** quand $t$ tend vers zéro. Noter aussi que, pour une valeur fixée $t>0$, c'est une **densité de probabilité** de variable normale.*

⚠️ **C'est la densité de $N(0,2t)$**, et le lien avec le brownien est direct : la fiche 62 donne $B(t)\sim N(0,t)$, de densité $\frac{1}{\sqrt{2\pi t}}e^{-x^2/(2t)}$. L'équation de la chaleur $\partial_tu=\partial_x^2u$ correspond à $\sqrt2\,B(t)$ — la constante de diffusion $1$ au lieu de $\frac12$. C'est la même équation à un facteur d'échelle près.

> **Le lien profond** : *l'équation de la chaleur **est** l'équation d'évolution de la densité du mouvement brownien.* Diffusion de la chaleur et diffusion des particules sont le même phénomène — c'est ce qu'Einstein a établi en 1905 (fiche 62), et c'est ce que la citation de Steele annonçait.

> **Exercice 3.2.** *Dérivez la solution ci-dessus en utilisant $\xi=\frac{x}{\sqrt t}$ et $U(\xi)=t^{1/2}u(x,t)$, et en réécrivant l'équation de la chaleur comme une **équation différentielle ordinaire**.*

### La superposition

Étant donné $u_0$, on peut la voir comme une superposition de fonctions de Dirac :

$$u_0(x)=\int_{-\infty}^\infty\delta(x-s)\,u_0(s)\,ds$$

On considère alors la fonction obtenue en superposant les solutions correspondantes :

$$\boxed{\ u(x,t)=\int_{-\infty}^\infty u_\delta(x-s,t)\cdot u_0(s)\,ds\ }$$

*(une telle fonction n'est pas nécessairement bien définie, l'intégrale pouvant ne pas exister).*

Cependant, *si $u_0$ est « raisonnable », on peut montrer que*

$$\frac{\partial u}{\partial t}(x,t)=\int_{-\infty}^\infty\frac{\partial u_\delta}{\partial t}(x-s,t)u_0(s)ds \quad\text{et}\quad \frac{\partial^2u}{\partial x^2}(x,t)=\int_{-\infty}^\infty\frac{\partial^2u_\delta}{\partial x^2}(x-s,t)u_0(s)ds \tag{3.1}$$

*ce qui implique que $u(x,t)$ satisfait aussi l'équation de la chaleur. Comme $u(x,0)=u_0(x)$, on voit que $u(x,t)$ **résout le problème à valeur initiale**, tant que la condition initiale est « raisonnable ».*

> **La stratégie complète, en trois mouvements.** (1) Résoudre le cas le plus **singulier** possible — une masse de Dirac. (2) Utiliser la **linéarité** pour superposer. (3) Vérifier qu'on peut **dériver sous l'intégrale**. C'est la méthode de la **fonction de Green**, et c'est l'une des idées les plus fécondes de toute l'analyse.
>
> **Et l'intégrale finale est une convolution** : $u(\cdot,t)=u_\delta(\cdot,t)\ast u_0$. Résoudre l'équation de la chaleur, c'est **lisser la condition initiale par une gaussienne d'écart-type $\sqrt{2t}$** — d'où la régularisation instantanée : à partir de $t>0$, la solution est indéfiniment dérivable, aussi irrégulière que soit $u_0$.

**Références du cours** : Wilmott, Howison et Dewynne, *The mathematics of financial derivatives* · Shreve, *Stochastic calculus for finance II* · Steele, *Stochastic calculus and financial applications* · **Hull**, *Options, futures, and other derivatives*.

## Comment résoudre l'exercice type (protocole)

1. **Écrire l'EDS** sous la forme $dX=\mu(t,X)dt+\sigma(t,X)dB$ et identifier dérive et diffusion.
2. **Vérifier les hypothèses** de Lipschitz et de croissance ⟹ existence et unicité.
3. **Chercher une forme fermée** : postuler $X(t)=f(t,B(t))$, appliquer Itô, **identifier les coefficients** de $dt$ et $dB$.
4. **Si l'identification directe échoue** — cas où $\sigma$ ne dépend pas de $X$ —, essayer la forme produit $X(t)=a(t)\big(x_0+\int_0^tb(s)dB(s)\big)$.
5. **Calculer les moments** : espérance par la martingalité, variance par l'**isométrie d'Itô**.
6. **Si aucune forme fermée** : différences finies (EDP), **Monte-Carlo** (tirer les trajectoires), ou **arbres** (énumérer).
7. **Si l'énoncé mène à une EDP parabolique** : la ramener à l'**équation de la chaleur** par changement de variables, et appliquer la solution fondamentale.

### Comment reconnaître qu'il faut utiliser cette méthode ?

| Indice dans l'énoncé | Ce qu'il faut faire |
|---|---|
| $dX=\mu X\,dt+\sigma X\,dB$ | **brownien géométrique** ⟹ $x_0e^{(\mu-\sigma^2/2)t+\sigma B(t)}$ |
| $dX=-\alpha X\,dt+\sigma\,dB$ | **Ornstein-Uhlenbeck** ⟹ retour à la moyenne |
| « retour à la moyenne », taux d'intérêt | **Ornstein-Uhlenbeck / Vasicek** |
| « la solution existe-t-elle ? » | **Lipschitz** + croissance |
| « pas de forme fermée » | numérique : différences finies · Monte-Carlo · arbres |
| « produit dépendant du chemin », grande dimension | **Monte-Carlo** |
| « exercice anticipé » | **arbres** ou différences finies |
| $\partial_tu=\partial_x^2u$ | **équation de la chaleur** ⟹ solution fondamentale gaussienne |
| condition initiale quelconque | **superposition** / convolution |

### Exercices progressifs

**Niveau 1** — Résolvez $dX=\mu X\,dt+\sigma X\,dB$ par identification des coefficients.

<details><summary>Correction</summary>

**Étape 1.** On cherche $X(t)=f(t,B(t))$. Le lemme d'Itô donne

$$dX=\Big(\frac{\partial f}{\partial t}+\frac12\frac{\partial^2f}{\partial x^2}\Big)dt+\frac{\partial f}{\partial x}\,dB$$

**Étape 2 — identification.** L'EDS s'écrit $dX=\mu f\,dt+\sigma f\,dB$, d'où

$$\mu f=\frac{\partial f}{\partial t}+\frac12\frac{\partial^2f}{\partial x^2}, \qquad \sigma f=\frac{\partial f}{\partial x}$$

**Étape 3.** La seconde équation, $\partial f/\partial x=\sigma f$, s'intègre en $x$ :

$$f(t,x)=e^{\sigma x+g(t)}$$

**Étape 4.** Alors $\partial f/\partial t=g'(t)f$ et $\partial^2f/\partial x^2=\sigma^2f$, donc la première équation devient

$$\mu f=g'(t)f+\frac{\sigma^2}{2}f \qquad\Longrightarrow\qquad g'(t)=\mu-\frac{\sigma^2}{2}$$

**Étape 5.** En intégrant, $g(t)=(\mu-\frac{\sigma^2}{2})t+\log x_0$ pour respecter $X(0)=f(0,0)=x_0$ :

$$X(t)=x_0\,e^{(\mu-\sigma^2/2)t+\sigma B(t)}$$

**Le contrôle par l'espérance.** $\sigma B(t)\sim N(0,\sigma^2t)$ donne $E[e^{\sigma B(t)}]=e^{\sigma^2t/2}$, donc

$$E[X(t)]=x_0e^{(\mu-\sigma^2/2)t}e^{\sigma^2t/2}=x_0e^{\mu t} \qquad\checkmark$$

C'est bien le rendement espéré $\mu$ annoncé par l'EDS.

⚠️ **Mais la médiane vaut $x_0e^{(\mu-\sigma^2/2)t}$**, strictement inférieure. C'est la *volatility drag* de la fiche 53 : si $\sigma^2/2>\mu$, plus d'une trajectoire sur deux perd de l'argent malgré un rendement espéré positif.

</details>

**Niveau 2** — Résolvez l'équation d'Ornstein-Uhlenbeck et calculez ses moments.

<details><summary>Correction</summary>

**L'équation.** $dX=-\alpha X\,dt+\sigma\,dB$, $X(0)=x_0$, avec $\alpha,\sigma>0$.

**Pourquoi l'identification directe échoue.** Chercher $X=f(t,B)$ donnerait $\sigma=\partial f/\partial x$, donc $f=\sigma x+g(t)$, et la première équation imposerait $-\alpha f=g'(t)$ — impossible, puisque le membre de gauche dépend de $x$ et le membre de droite non.

**La forme produit.** On pose

$$X(t)=a(t)\Big(x_0+\int_0^tb(s)\,dB(s)\Big), \qquad a(0)=1,\ a(t)>0$$

En différenciant (règle du produit, le second facteur étant à variation quadratique nulle contre $a$ déterministe) :

$$dX(t)=X(t)\frac{a'(t)}{a(t)}dt+a(t)b(t)\,dB(t)$$

**L'identification.** $-\alpha=\dfrac{a'(t)}{a(t)}$ et $\sigma=a(t)b(t)$, d'où $a(t)=e^{-\alpha t}$ et $b(t)=\sigma e^{\alpha t}$ :

$$X(t)=x_0e^{-\alpha t}+\sigma\int_0^te^{\alpha(s-t)}\,dB(s)$$

**L'espérance.** L'intégrale d'Itô d'un intégrande adapté est une martingale nulle en $0$ (fiche 56), donc d'espérance nulle :

$$E[X(t)]=x_0e^{-\alpha t}\ \xrightarrow[t\to\infty]{}\ 0$$

**La variance, par l'isométrie d'Itô.**

$$\mathrm{Var}\big(X(t)\big)=\sigma^2\int_0^te^{2\alpha(s-t)}ds=\sigma^2e^{-2\alpha t}\cdot\frac{e^{2\alpha t}-1}{2\alpha}=\frac{\sigma^2}{2\alpha}\big(1-e^{-2\alpha t}\big)$$

qui **converge** vers $\dfrac{\sigma^2}{2\alpha}$.

**La loi.** L'intégrande $e^{\alpha(s-t)}$ étant **déterministe**, l'intégrale est **gaussienne** (fiche 56) :

$$X(t)\sim N\Big(x_0e^{-\alpha t},\ \tfrac{\sigma^2}{2\alpha}(1-e^{-2\alpha t})\Big)\ \xrightarrow[t\to\infty]{}\ N\Big(0,\tfrac{\sigma^2}{2\alpha}\Big)$$

**La lecture.** Contrairement au brownien, dont la variance croît sans borne, l'OU **se stabilise** : il a une **loi stationnaire**. C'est un processus stationnaire au sens de la fiche 52 — l'analogue continu exact de l'AR(1) —, avec $1/\alpha$ pour temps caractéristique de retour à la moyenne. C'est pourquoi il modélise les taux d'intérêt, les spreads et les ratios de valorisation, et non les prix d'actions.

</details>

**Niveau 3** — Pourquoi la méthode des différences finies ne s'applique-t-elle pas directement aux EDS, et comment Monte-Carlo résout-il le problème ?

<details><summary>Correction</summary>

**Le principe des différences finies.** Pour une EDO $u'=F(u)$, la formule de Taylor donne le schéma

$$u\big((i+1)h\big)\approx u(ih)+h\cdot F\big(u(ih)\big)$$

Tout est **déterministe** : connaissant $u(ih)$, on calcule $u((i+1)h)$ exactement.

**Le blocage pour une EDS.** Le schéma correspondant s'écrit

$$X\big((i+1)h\big)\approx X(ih)+\mu\big(ih,X(ih)\big)h+\sigma\big(ih,X(ih)\big)\Delta B_i$$

Le terme $\Delta B_i=B((i+1)h)-B(ih)$ est une **variable aléatoire** $N(0,h)$ : elle est **inconnue**. Le cours le dit exactement : *l'équation correspondante fait intervenir des variables aléatoires*.

Le schéma ne définit donc pas **un** nombre mais une **loi** — et cette loi ne se propage pas de proche en proche comme un nombre.

**La solution de Monte-Carlo : conditionner sur le hasard.** L'observation clé du cours est que *si l'on **connaît déjà** la trajectoire $B_t$, l'équation devient une EDP* — donc redevient déterministe.

D'où les trois étapes :

1. **Tirer** une trajectoire $B_t$ selon sa loi (accroissements i.i.d. $N(0,h)$).
2. Pour **ce** tirage, appliquer les différences finies : tout est déterministe, on obtient une valeur.
3. **Répéter** un grand nombre de fois, et former la distribution empirique.

**Pourquoi cela converge.** Chaque tirage produit un échantillon de la loi de $f(T,B_T)$ ; la loi des grands nombres fait converger la distribution empirique vers la vraie loi. L'erreur décroît en $1/\sqrt N$, **indépendamment de la dimension** (fiche 55).

**L'alternative : la méthode des arbres.** Au lieu de **tirer** les $\Delta B_i$, on **énumère** leurs valeurs possibles en remplaçant le brownien par une marche aléatoire à deux issues par pas. C'est exact sur la grille et cela donne la loi complète, mais le nombre de nœuds explose en dimension.

**Le critère de choix.** Petite dimension et besoin de la loi complète ⟹ **arbres**. Grande dimension, dépendance au chemin ⟹ **Monte-Carlo**.

</details>

**Niveau 4 — type examen** — Expliquez la méthode de résolution de l'équation de la chaleur et son lien avec la finance.

<details><summary>Correction</summary>

**L'équation.** $\dfrac{\partial u}{\partial t}=\dfrac{\partial^2u}{\partial x^2}$, avec condition initiale $u(0,x)=u_0(x)$ sur $\mathbb R$.

**La méthode, en trois mouvements.**

**1. La linéarité.** Si $u_1$ et $u_2$ sont solutions, $u_1+u_2$ l'est aussi. Plus généralement, pour une famille $u_s(x,t)$ indexée par $s\in\mathbb R$,

$$\int_{-\infty}^\infty u_s(x,t)\,c(s)\,ds$$

est encore solution. *On peut donc **superposer** les solutions de problèmes « faciles » pour résoudre un problème général.*

**2. Le problème « facile » : la masse de Dirac.** Avec $u(0,x)=\delta(x)$, la solution est

$$u_\delta(x,t)=\frac{1}{2\sqrt{\pi t}}e^{-x^2/(4t)}$$

C'est la **densité de $N(0,2t)$** — pour $t$ fixé, c'est une loi de probabilité ; et quand $t\to0$, elle **converge vers $\delta$**.

**3. La superposition.** En écrivant $u_0(x)=\int\delta(x-s)u_0(s)\,ds$, on pose

$$u(x,t)=\int_{-\infty}^\infty u_\delta(x-s,t)\,u_0(s)\,ds$$

Si $u_0$ est « raisonnable », on peut **dériver sous l'intégrale** (3.1), donc $u$ satisfait l'équation ; et $u(x,0)=u_0(x)$. Le problème est résolu.

**C'est la méthode de la fonction de Green**, et l'intégrale est une **convolution** : $u(\cdot,t)=u_\delta(\cdot,t)\ast u_0$. Résoudre l'équation de la chaleur, c'est **lisser la condition initiale par une gaussienne** d'écart-type $\sqrt{2t}$.

**Les liens avec la finance — trois niveaux.**

**1. Black-Scholes est une équation de la chaleur.** Le cours l'annonce : *il est bien connu que l'équation de Black-Scholes peut être transformée en équation de la chaleur après un changement de variables approprié*. C'est le point 4 du concept 6 de la fiche 57. La **formule fermée** du call n'est rien d'autre que la solution fondamentale gaussienne appliquée à la condition finale $\max(S-K,0)$ — d'où les $N(d_1)$ et $N(d_2)$.

**2. Le noyau gaussien est la densité du brownien.** La fiche 62 donne $B(t)\sim N(0,t)$. L'équation de la chaleur est **l'équation d'évolution de la densité du brownien** : diffusion thermique et diffusion des particules sont le même phénomène — ce qu'Einstein a établi en 1905. La citation de Steele qui ouvre le cours annonce précisément ce pont : *de merveilleuses conséquences circulent dans les deux sens*.

**3. La superposition est la valorisation risque-neutre.** L'intégrale

$$u(x,t)=\int u_\delta(x-s,t)u_0(s)\,ds$$

est **exactement** $E[u_0(X_t)]$ où $X_t$ est le processus de diffusion. C'est la formule $f_t=e^{-r(T-t)}E_Q[f_T]$ de la fiche 57, et c'est le **théorème de Feynman-Kac** : la solution d'une EDP parabolique **est** une espérance le long des trajectoires du processus associé.

**Ce qu'il faut savoir conclure.** Les deux routes de la fiche 57 — résoudre l'EDP, ou calculer l'espérance risque-neutre — ne sont pas deux méthodes concurrentes : ce sont **les deux faces d'un même théorème**. Le noyau de la chaleur est la densité de transition du brownien, et la convolution est l'espérance. C'est ce que la citation de Steele voulait dire.

**La conséquence pratique** : la régularisation instantanée. Aussi irrégulière que soit $u_0$ — et $\max(S-K,0)$ n'est pas dérivable en $K$ —, la convolution gaussienne rend $u(\cdot,t)$ indéfiniment dérivable dès que $t>0$. C'est pourquoi le prix d'une option est lisse alors que son payoff a un angle.

</details>

## 🔴 Common mistakes

1. **Oublier $X(0)$ dans la forme intégrale** — c'est $X(T)=X(0)+\int\mu\,dt+\int\sigma\,dB$.
2. **Écrire $X(t)=x_0e^{\mu t+\sigma B(t)}$** — il manque $-\frac{\sigma^2}{2}t$.
3. **Confondre espérance et médiane du brownien géométrique** — $x_0e^{\mu t}$ contre $x_0e^{(\mu-\sigma^2/2)t}$.
4. **Essayer l'identification directe sur Ornstein-Uhlenbeck** — elle échoue ; il faut la forme produit.
5. **Croire que la variance de l'OU croît sans borne** — elle converge vers $\sigma^2/(2\alpha)$.
6. **Appliquer les différences finies directement à une EDS** — l'accroissement $\Delta B$ est **aléatoire**.
7. **Oublier de vérifier Lipschitz et la croissance** — sans elles, ni unicité ni existence globale.
8. **Se tromper sur la solution fondamentale** — c'est $\frac{1}{2\sqrt{\pi t}}e^{-x^2/(4t)}$, densité de $N(0,2t)$, pas de $N(0,t)$.
9. **Oublier que la superposition demande de dériver sous l'intégrale** — c'est la condition (3.1).
10. **Confondre arbres et Monte-Carlo** — les arbres **énumèrent**, Monte-Carlo **tire**.

## 📌 Ultimate Review

1. **EDS** : $dX=\mu(t,X)dt+\sigma(t,X)dB$ ; **forme intégrale** $X(T)=X(0)+\int_0^T\mu\,dt+\int_0^T\sigma\,dB$.
2. **Théorème 1.1** : **Lipschitz** $\lvert\mu(t,x)-\mu(t,y)\rvert^2+\lvert\sigma(t,x)-\sigma(t,y)\rvert^2\leq K\lvert x-y\rvert^2$ et **croissance** $\lvert\mu\rvert^2+\lvert\sigma\rvert^2\leq K(1+\lvert x\rvert^2)$ ⟹ solution continue adaptée, **unique** p.s.
3. **Identification des coefficients** : postuler $X=f(t,B)$, appliquer Itô, égaler les coefficients de $dt$ et de $dB$.
4. **Brownien géométrique** : $\sigma f=\partial_xf$ ⟹ $f=e^{\sigma x+g(t)}$ ; puis $g'=\mu-\frac{\sigma^2}{2}$ ⟹ $$X(t)=x_0e^{(\mu-\sigma^2/2)t+\sigma B(t)}$$
5. **Ornstein-Uhlenbeck** : $dX=-\alpha X\,dt+\sigma\,dB$ ; forme produit $X=a(t)\big(x_0+\int_0^tb\,dB\big)$ ; $a'/a=-\alpha$ et $ab=\sigma$ ⟹ $$X(t)=x_0e^{-\alpha t}+\sigma\int_0^te^{\alpha(s-t)}dB(s)$$
6. **Ses moments** : $E[X(t)]=x_0e^{-\alpha t}\to0$ ; $\mathrm{Var}=\frac{\sigma^2}{2\alpha}(1-e^{-2\alpha t})\to\frac{\sigma^2}{2\alpha}$ ; loi **stationnaire** $N(0,\frac{\sigma^2}{2\alpha})$.
7. **Origine** : Ornstein et Uhlenbeck, comportement des **gaz** ; **retour à la moyenne** quand $\alpha>0$ ; l'AR(1) en temps continu.
8. **Différences finies** : $u((i+1)h)\approx u(ih)+h\,u'(ih)$ ; s'étend aux EDP par grille ; **inapplicable directement aux EDS** (variables aléatoires).
9. **Monte-Carlo, 3 étapes** : tirer une trajectoire $B_t$ · résoudre par différences finies pour ce tirage · répéter.
10. **Son principe** : conditionner sur le hasard rend le problème déterministe.
11. **Arbres** : remplacer $B_t$ par une **marche aléatoire simple** à deux issues par pas ; méthode **inductive**.
12. **Équation de la chaleur** : $\partial_tu=\partial_x^2u$ ; l'une des rares EDP à solution fermée.
13. **Linéarité** : toute superposition $\int u_s(x,t)c(s)ds$ est solution.
14. **Solution fondamentale** : $u_\delta(x,t)=\frac{1}{2\sqrt{\pi t}}e^{-x^2/(4t)}$, densité de $N(0,2t)$, tendant vers $\delta$ quand $t\to0$.
15. **Superposition** : $u(x,t)=\int_{-\infty}^\infty u_\delta(x-s,t)u_0(s)ds$ — une **convolution**, sous réserve de dériver sous l'intégrale.
16. **Le lien avec Black-Scholes** : l'EDP s'y ramène par changement de variables ; le noyau gaussien **est** la densité du brownien ; la superposition **est** l'espérance risque-neutre.

**Formulas to know**

$$X(T)=X(0)+\int_0^T\mu\,dt+\int_0^T\sigma\,dB \qquad X(t)=x_0e^{(\mu-\sigma^2/2)t+\sigma B(t)}$$

$$X(t)=x_0e^{-\alpha t}+\sigma\int_0^te^{\alpha(s-t)}dB(s) \qquad \mathrm{Var}=\frac{\sigma^2}{2\alpha}\big(1-e^{-2\alpha t}\big)$$

$$\frac{\partial u}{\partial t}=\frac{\partial^2u}{\partial x^2} \qquad u_\delta(x,t)=\frac{1}{2\sqrt{\pi t}}e^{-x^2/(4t)} \qquad u(x,t)=\int u_\delta(x-s,t)u_0(s)ds$$

**Methods to know** : l'identification des coefficients en cinq étapes ; la forme produit pour Ornstein-Uhlenbeck ; le calcul des moments par martingalité et isométrie ; la méthode de la fonction de Green.

## 🧠 Active Recall

**Basic** — Écrivez la forme générale d'une EDS et sa forme intégrale.

<details><summary>Réponse</summary>

**Forme différentielle :**

$$dX=\mu\big(t,X(t)\big)\,dt+\sigma\big(t,X(t)\big)\,dB(t)$$

**Forme intégrale** — c'est elle qui a un sens rigoureux, la forme différentielle n'étant qu'une notation :

$$X(T)=X(0)+\int_0^T\mu\big(t,X(t)\big)\,dt+\int_0^T\sigma\big(t,X(t)\big)\,dB(t)$$

La première intégrale est ordinaire ; la seconde est une **intégrale d'Itô** (fiche 56), qui exige que $X$ soit **adapté**.

</details>

**Understanding** — Pourquoi la méthode d'identification des coefficients fonctionne-t-elle ?

<details><summary>Réponse</summary>

Parce que **la décomposition d'un processus d'Itô est unique**. Si l'on écrit un même processus de deux façons,

$$A_1\,dt+C_1\,dB=A_2\,dt+C_2\,dB$$

alors nécessairement $A_1=A_2$ et $C_1=C_2$. C'est le même argument que l'étape 3 de la dérivation de Black-Scholes (fiche 57).

**La méthode en découle.** On postule $X(t)=f(t,B(t))$, on applique Itô pour obtenir

$$dX=\Big(\frac{\partial f}{\partial t}+\frac12\frac{\partial^2f}{\partial x^2}\Big)dt+\frac{\partial f}{\partial x}dB$$

et l'on **identifie** avec l'EDS donnée. On obtient un système de deux EDP — souvent facile, parce que l'équation en $\partial f/\partial x$ s'intègre directement.

⚠️ **Elle a une limite** : elle suppose que la solution est une fonction de $(t,B_t)$ **seulement**. Pour Ornstein-Uhlenbeck, cette hypothèse est fausse — la solution dépend de toute l'histoire du brownien, à travers $\int_0^te^{\alpha s}dB(s)$. D'où la nécessité de la forme produit.

</details>

**Application** — Que devient le processus d'Ornstein-Uhlenbeck quand $t\to\infty$ ?

<details><summary>Réponse</summary>

$$X(t)=x_0e^{-\alpha t}+\sigma\int_0^te^{\alpha(s-t)}dB(s)$$

**L'espérance** tend vers $0$ : $E[X(t)]=x_0e^{-\alpha t}\to0$. Le souvenir de la condition initiale **s'efface exponentiellement**, avec un temps caractéristique $1/\alpha$.

**La variance converge** : $\mathrm{Var}(X(t))=\frac{\sigma^2}{2\alpha}(1-e^{-2\alpha t})\to\frac{\sigma^2}{2\alpha}$.

**La loi limite** est donc $N\big(0,\frac{\sigma^2}{2\alpha}\big)$ : c'est la **loi stationnaire** du processus.

⚠️ **C'est le contraste décisif avec le brownien.** Celui-ci a $\mathrm{Var}(B(t))=t\to\infty$ et n'admet aucune loi stationnaire : il est $I(1)$ au sens de la fiche 52. L'OU, lui, est **stationnaire** — c'est l'analogue continu exact de l'AR(1) avec $\lvert\phi\rvert<1$.

**D'où son usage.** Taux d'intérêt (modèle de **Vasicek**), écarts de crédit, taux de change réels, ratios de valorisation — toutes des grandeurs **économiquement bornées**. Jamais les prix d'actions, qui n'ont pas de niveau d'équilibre.

</details>

**Comparison** — Différences finies, Monte-Carlo, arbres : que discrétise chacune ?

<details><summary>Réponse</summary>

|  | **Différences finies** | **Monte-Carlo** | **Arbres** |
|---|---|---|---|
| Ce qui est discrétisé | l'**EDP** (grille espace-temps) | l'**espérance** (échantillonnage) | le **processus** (marche aléatoire) |
| Traite le hasard comment ? | ne le traite pas directement | on le **tire** | on l'**énumère** |
| Résultat | la solution sur la grille | une distribution empirique | la loi exacte sur l'arbre |
| Coût en dimension | **exponentiel** | **indépendant** ($1/\sqrt N$) | exponentiel |
| Dépendance au chemin | difficile | **naturelle** | possible |
| Exercice anticipé | **naturel** | difficile | **naturel** |

**Le blocage commun.** Les différences finies seules **ne s'appliquent pas** à une EDS, puisque l'accroissement $\Delta B$ y est aléatoire.

**Les deux contournements.** Monte-Carlo **conditionne sur le hasard** — une fois la trajectoire tirée, tout redevient déterministe et les différences finies s'appliquent. Les arbres **remplacent le hasard par une marche aléatoire finie**, justifiée par le fait que le brownien en est la limite (fiche 62).

**Le critère pratique**, identique à celui de la fiche 55 : au-delà de trois ou quatre facteurs, seul **Monte-Carlo** reste praticable.

</details>

**Exam-style** — Résolvez complètement le brownien géométrique et commentez chaque étape.

<details><summary>Réponse</summary>

**L'équation.** $dX(t)=\mu X(t)dt+\sigma X(t)dB(t)$, $X(0)=x_0>0$, $\mu\in\mathbb R$, $\sigma>0$.

**Étape 0 — vérifier l'existence.** $\mu(t,x)=\mu x$ et $\sigma(t,x)=\sigma x$ sont **linéaires**, donc lipschitziennes de constante $\max(\mu^2,\sigma^2)$ et à croissance au plus linéaire. Le théorème 1.1 s'applique : la solution **existe et est unique**.

**Étape 1 — postuler et appliquer Itô.** On cherche $X(t)=f(t,B(t))$ ; le lemme d'Itô donne

$$dX=\Big(\frac{\partial f}{\partial t}+\frac12\frac{\partial^2f}{\partial x^2}\Big)dt+\frac{\partial f}{\partial x}dB$$

**Étape 2 — identifier.** Par unicité de la décomposition d'Itô :

$$\mu f=\frac{\partial f}{\partial t}+\frac12\frac{\partial^2f}{\partial x^2}, \qquad \sigma f=\frac{\partial f}{\partial x}$$

**Étape 3 — résoudre la diffusion d'abord.** C'est le bon ordre : l'équation $\partial_xf=\sigma f$ est une EDO en $x$ à $t$ fixé, d'où

$$f(t,x)=e^{\sigma x+g(t)}$$

**Étape 4 — reporter dans la dérive.** $\partial_tf=g'(t)f$, $\partial_x^2f=\sigma^2f$, donc

$$\mu f=g'(t)f+\frac{\sigma^2}{2}f \qquad\Longrightarrow\qquad g'(t)=\mu-\frac{\sigma^2}{2}$$

**Étape 5 — intégrer et ajuster.** $g(t)=(\mu-\frac{\sigma^2}{2})t+\log x_0$ pour que $f(0,0)=x_0$, d'où

$$\boxed{X(t)=x_0e^{(\mu-\sigma^2/2)t+\sigma B(t)}}$$

**Les commentaires attendus.**

**1. Le $-\sigma^2/2$ n'est pas postulé, il est calculé.** Il apparaît comme constante d'intégration de $g'$, et il vient directement du terme $\frac12\partial_x^2f$ du lemme d'Itô — donc, en remontant, de $(dB)^2=dt$ démontré en fiche 62.

**2. Espérance et médiane divergent.**

$$E[X(t)]=x_0e^{\mu t}, \qquad \text{médiane}(X(t))=x_0e^{(\mu-\sigma^2/2)t}$$

Le rendement **espéré** est bien $\mu$, comme l'EDS l'annonce, mais la trajectoire **typique** croît à $\mu-\sigma^2/2$. Si $\sigma^2/2>\mu$, plus d'une trajectoire sur deux perd de l'argent malgré une espérance croissante — c'est la *volatility drag*.

**3. Le prix reste strictement positif**, puisque c'est une exponentielle. C'est la raison de modéliser la **variation en pourcentage** plutôt que la variation absolue : un brownien arithmétique deviendrait négatif.

**4. La loi est log-normale** : $\log X(t)\sim N\big(\log x_0+(\mu-\frac{\sigma^2}{2})t,\ \sigma^2t\big)$. C'est exactement la densité utilisée sous $Q$ en fiche 57, avec $\mu$ remplacé par $r$.

**5. Le cas particulier $\mu=0$** donne l'**exponentielle stochastique** $x_0e^{-\sigma^2t/2+\sigma B(t)}$, la martingale de la fiche 56 — et c'est la réponse à la question par laquelle se terminait le cours 17 : non, ce n'est pas $e^{\sigma B_t}$.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Forme générale d'une EDS ? | $dX=\mu(t,X)dt+\sigma(t,X)dB$ |
| Forme intégrale ? | $X(T)=X(0)+\int_0^T\mu\,dt+\int_0^T\sigma\,dB$ |
| Condition de Lipschitz ? | $\lvert\mu(t,x)-\mu(t,y)\rvert^2+\lvert\sigma(t,x)-\sigma(t,y)\rvert^2\leq K\lvert x-y\rvert^2$ |
| Condition de croissance ? | $\lvert\mu\rvert^2+\lvert\sigma\rvert^2\leq K(1+\lvert x\rvert^2)$ |
| Ce que garantit chacune ? | Lipschitz ⟹ **unicité** ; croissance ⟹ **existence globale** |
| Principe de l'identification des coefficients ? | Postuler $X=f(t,B)$, appliquer Itô, égaler $dt$ et $dB$ |
| Pourquoi est-ce légitime ? | **Unicité** de la décomposition d'un processus d'Itô |
| Les deux équations pour le brownien géométrique ? | $\mu f=\partial_tf+\frac12\partial_x^2f$ et $\sigma f=\partial_xf$ |
| Solution du brownien géométrique ? | $x_0e^{(\mu-\sigma^2/2)t+\sigma B(t)}$ |
| D'où sort le $-\sigma^2/2$ ? | De $g'(t)=\mu-\frac{\sigma^2}{2}$, via le terme d'Itô |
| Équation d'Ornstein-Uhlenbeck ? | $dX=-\alpha X\,dt+\sigma\,dB$ |
| Qui l'a introduite, et pourquoi ? | Ornstein et Uhlenbeck, pour le comportement des **gaz** |
| Quelle forme test utilise-t-on ? | $X=a(t)\big(x_0+\int_0^tb(s)dB(s)\big)$, $a(0)=1$ |
| Les deux équations d'identification ? | $a'/a=-\alpha$ et $ab=\sigma$ |
| Solution d'Ornstein-Uhlenbeck ? | $x_0e^{-\alpha t}+\sigma\int_0^te^{\alpha(s-t)}dB(s)$ |
| Son espérance ? | $x_0e^{-\alpha t}\to0$ |
| Sa variance ? | $\frac{\sigma^2}{2\alpha}(1-e^{-2\alpha t})\to\frac{\sigma^2}{2\alpha}$ |
| Sa loi stationnaire ? | $N\big(0,\frac{\sigma^2}{2\alpha}\big)$ |
| Son analogue discret ? | L'**AR(1)** de la fiche 52 |
| Schéma de différences finies ? | $u((i+1)h)\approx u(ih)+h\,u'(ih)$ |
| Pourquoi échoue-t-il sur une EDS ? | L'accroissement $\Delta B$ est **aléatoire** |
| Les trois étapes de Monte-Carlo ? | Tirer $B_t$ · résoudre par différences finies · répéter |
| Idée de la méthode des arbres ? | Le brownien est **limite d'une marche aléatoire** |
| Équation de la chaleur ? | $\partial u/\partial t=\partial^2u/\partial x^2$ |
| Solution fondamentale ? | $\frac{1}{2\sqrt{\pi t}}e^{-x^2/(4t)}$ |
| Quelle loi est-ce ? | La densité de $N(0,2t)$ |
| Vers quoi tend-elle en $t\to0$ ? | La fonction **delta de Dirac** |
| Formule de superposition ? | $u(x,t)=\int u_\delta(x-s,t)u_0(s)ds$ |
| Quelle opération est-ce ? | Une **convolution** — lissage gaussien |
| Quelle condition la justifie ? | Pouvoir **dériver sous l'intégrale** |
| Lien avec Black-Scholes ? | L'EDP s'y ramène par **changement de variables** |
