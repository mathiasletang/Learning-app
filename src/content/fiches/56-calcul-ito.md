# Fiche 56 — Calcul d'Itô : lemme, isométrie, martingales et théorème de Girsanov

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché |
| **Cours source** | *18.S096 Topics in Mathematics with Applications in Finance*, MIT OpenCourseWare, automne 2013 — cours 18 « Itô Calculus » |
| **Difficulté** | Must know — l'outil sans lequel Black-Scholes n'existe pas |
| **Temps d'étude estimé** | 2 h 30 |
| **Prérequis** | Fiche 53 (mouvement brownien, brownien géométrique), développement de Taylor, espérance conditionnelle |
| **Concepts clés** | Non-dérivabilité du brownien, règle $(dB_t)^2=dt$, lemme d'Itô, intégrale d'Itô, processus adapté, martingale, isométrie d'Itô, exponentielle stochastique, mesures équivalentes, dérivée de Radon-Nikodym, théorème de Girsanov |
| **Poids à l'examen** | Trois choses à savoir faire de mémoire : **écrire et appliquer** le lemme d'Itô ; calculer $\int_0^TB_t\,dB_t$ et expliquer pourquoi il « viole » le théorème fondamental ; trouver le processus vérifiant $dX_t=\sigma X_t\,dB_t$. |

## 🎯 Vue d'ensemble

Le cours précédent a établi qu'*une trajectoire brownienne n'est **nulle part dérivable** avec probabilité $1$*. Autrement dit, la dérivée

$$\frac{dB_t}{dt}$$

**n'existe pas**. Or, quand on étudie le mouvement brownien — ou qu'on l'utilise comme modèle —, on a très fréquemment besoin d'estimer la variation d'une fonction du type $f(B_t)$ sur une durée infinitésimale.

```
PROBLÈME    dB_t/dt n'existe pas → la règle de la chaîne est inutilisable
IDÉE        décrire df en fonction de dB_t, pas de dB_t/dt
OBSTACLE    dans Taylor, le terme (ΔB_t)² N'EST PAS négligeable : E[(ΔB_t)²] = Δt
RÈGLE       (dB_t)² = dt        ← toute la théorie tient dans cette substitution
RÉSULTAT    df(B_t) = f'(B_t) dB_t + ½ f''(B_t) dt      ← lemme d'Itô
```

> **Ce qu'il faut comprendre d'emblée.** Le calcul d'Itô n'est pas une généralisation cosmétique du calcul ordinaire : il en **change une règle**. Le terme de second ordre, négligeable partout ailleurs, survit ici — et c'est exactement ce terme $\frac12f''\,dt$ qui produira le $-\sigma^2/2$ de la fiche 53 et toute la formule de Black-Scholes.

## 🔴 Concept 1 — Pourquoi la règle de la chaîne échoue

**Ce qu'on voudrait écrire.** Si $\frac{dB_t}{dt}$ existait, la règle de la chaîne donnerait

$$df=\frac{dB_t}{dt}\cdot f'(B_t)\,dt$$

*Nous savons déjà que cette formule n'a aucun sens.*

**Le contournement naturel.** Une façon de tourner le problème est de décrire la différence $df$ **en termes de la différence $dB_t$**. L'équation devient

$$df=f'(B_t)\,dB_t \tag{1.1}$$

*Cette nouvelle formule a au moins un sens, puisqu'elle n'a plus besoin de $\frac{dB_t}{dt}$. Le seul problème, c'est qu'elle **ne marche pas tout à fait**.*

**Pourquoi.** Considérons le développement de Taylor de $f$ :

$$f(x+\Delta x)-f(x)=(\Delta x)\cdot f'(x)+\frac{(\Delta x)^2}{2}f''(x)+\frac{(\Delta x)^3}{6}f'''(x)+\cdots$$

Pour en déduire l'équation (1.1), il faudrait pouvoir affirmer que **le terme significatif est le premier**, $(\Delta x)\cdot f'(x)$, et que tous les autres sont d'ordre de grandeur plus petit. Est-ce vrai pour $\Delta x=\Delta B_t$ ?

$$\Delta f=(\Delta B_t)\cdot f'(B_t)+\frac{(\Delta B_t)^2}{2}f''(B_t)+\frac{(\Delta B_t)^3}{6}f'''(B_t)+\cdots$$

> **Le point décisif.** Considérons le terme $(\Delta B_t)^2$. Comme $B_t$ est un mouvement brownien, on sait que
>
> $$E\big[(\Delta B_t)^2\big]=\Delta t$$
>
> Puisqu'une variation de $B_t$ s'accompagne nécessairement d'une variation de $t$, **le deuxième terme n'est plus négligeable**.

⚠️ **Comparez les ordres de grandeur.** Pour une fonction ordinaire, $\Delta x\sim\Delta t$ et donc $(\Delta x)^2\sim(\Delta t)^2$, négligeable. Pour le brownien, $\Delta B_t\sim\sqrt{\Delta t}$ — c'est précisément ce qui le rend non dérivable — et donc $(\Delta B_t)^2\sim\Delta t$ : **du même ordre que le terme dominant**. En revanche $(\Delta B_t)^3\sim(\Delta t)^{3/2}$, qui est bien négligeable. Le développement s'arrête donc **exactement à l'ordre 2**, ni plus ni moins.

## 🔴 Concept 2 — Le lemme d'Itô

> *La théorie du calcul d'Itô nous dit essentiellement qu'on peut faire la **substitution***
>
> $$\boxed{\ (\Delta B_t)^2=\Delta t\ }$$
>
> *et que les termes restants sont négligeables.*

L'équation devient alors

$$\Delta f=(\Delta B_t)\cdot f'(B_t)+\frac{\Delta t}{2}f''(B_t)+\cdots$$

soit, en termes d'infinitésimaux :

$$\boxed{\ df(B_t)=f'(B_t)\,dB_t+\frac12f''(B_t)\,dt\ } \tag{1.2}$$

<div class="callout" data-kind="formel">

<span class="callout__lab">lemme d'Itô</span>

*Cette équation, connue sous le nom de , est l'équation principale du calcul d'Itô.*

</div>

**Le cas de deux variables.** Pour une fonction régulière $f(t,x)$ dont on veut la différentielle de $f(t,B_t)$, le calcul classique donnerait

$$df=\frac{\partial f}{\partial t}dt+\frac{\partial f}{\partial x}dx$$

mais en calcul d'Itô on obtient

$$df(t,B_t)=\frac{\partial f}{\partial t}dt+\frac{\partial f}{\partial x}dB_t+\frac12\frac{\partial^2f}{\partial x^2}(dB_t)^2=\left(\frac{\partial f}{\partial t}+\frac12\frac{\partial^2f}{\partial x^2}\right)dt+\frac{\partial f}{\partial x}dB_t$$

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 1.1 — lemme d'Itô.</span>

*Soit $f(t,x)$ une fonction régulière de deux variables, et soit $X_t$ un processus stochastique vérifiant $dX_t=\mu_t\,dt+\sigma_t\,dB_t$ pour un mouvement brownien $B_t$. Alors*

$$\boxed{\ df(t,X_t)=\left(\frac{\partial f}{\partial t}+\mu_t\frac{\partial f}{\partial x}+\frac12\sigma_t^2\frac{\partial^2f}{\partial x^2}\right)dt+\sigma_t\frac{\partial f}{\partial x}\,dB_t\ }$$

</div>

**Démonstration.**

$$df(t,X_t)=\frac{\partial f}{\partial t}dt+\frac{\partial f}{\partial x}dX_t+\frac12\frac{\partial^2f}{\partial x^2}(dX_t)^2$$

$$=\left(\frac{\partial f}{\partial t}+\mu_t\frac{\partial f}{\partial x}+\frac12\sigma_t^2\frac{\partial^2f}{\partial x^2}\right)dt+\sigma_t\frac{\partial f}{\partial x}dB_t+\ldots\,dt\,dB_t+\ldots(dt)^2$$

*On peut ignorer les termes $dt\,dB_t$ et $(dt)^2$.* $\blacksquare$

### La table de multiplication d'Itô

| $\times$ | $dt$ | $dB_t$ |
|---|---|---|
| **$dt$** | $0$ | $0$ |
| **$dB_t$** | $0$ | $dt$ |

> **Toute la mécanique du calcul tient dans cette table.** On développe $(dX_t)^2=(\mu_t\,dt+\sigma_t\,dB_t)^2=\mu_t^2(dt)^2+2\mu_t\sigma_t\,dt\,dB_t+\sigma_t^2(dB_t)^2$, et seuls survivent les $\sigma_t^2\,dt$. C'est la seule chose à retenir mécaniquement pour appliquer le lemme.

⚠️ **Le terme $\frac12\sigma_t^2\frac{\partial^2f}{\partial x^2}$ est le « terme d'Itô ».** Il n'a **aucun** équivalent en calcul classique. Son signe dépend de la **convexité** de $f$ : pour $f$ convexe ($f''>0$), il **ajoute** de la dérive ; pour $f$ concave — comme $\log$ —, il en **retire**. C'est exactement le $-\sigma^2/2$ de la fiche 53.

## 🔴 Concept 3 — L'intégrale d'Itô et les exemples fondamentaux

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 1.2.</span>

*On définit l'intégration comme l'**inverse de la différentiation** :*

$$F(t,B_t)=\int f(t,B_t)\,dB_t+\int g(t,B_t)\,dt \qquad\Longleftrightarrow\qquad dF=f(t,B_t)\,dB_t+g(t,B_t)\,dt$$

</div>

### Exemple (i) — le brownien avec dérive

Le processus $X_t=\mu t+\sigma B_t$ est le **mouvement brownien de dérive $\mu$ et de variance $\sigma$**. Pour ce processus,

$$dX_t=\mu\,dt+\sigma\,dB_t$$

### Exemple (ii) — le calcul de $\int_0^TB_t\,dB_t$

Considérons $f(x)=\frac12x^2$. Comme $f'(x)=x$ et $f''(x)=1$, le lemme d'Itô donne

$$df(B_t)=B_t\,dB_t+\frac12\,dt$$

Autrement dit, en intégrant de $0$ à $T$ :

$$\frac12B_T^2=\int_0^TB_t\,dB_t+\int_0^T\frac12\,dt=\int_0^TB_t\,dB_t+\frac T2$$

ce qui implique

$$\boxed{\ \int_0^TB_t\,dB_t=\frac12B_T^2-\frac T2\ }$$

<div class="callout" data-kind="formel">

<span class="callout__lab">Remarquez comment ceci « viole » le théorème fondamental du calcul.</span>

En calcul ordinaire, $\int_0^Tx\,dx=\frac12T^2$ tout court. Ici apparaît un terme correctif $-\frac T2$, sorti tout droit du terme d'Itô.

</div>

⚠️ **Ce terme n'est pas un artefact : il est indispensable.** Sans lui, $\int_0^TB_t\,dB_t=\frac12B_T^2\geq0$ serait **toujours positive**, et son espérance strictement positive — ce qui contredirait la propriété de martingale du concept 6. Avec le $-\frac T2$ : $E\big[\frac12B_T^2-\frac T2\big]=\frac T2-\frac T2=0$.

### Exemple (iii) — l'exponentielle

Soit $f(t,x)=\exp(\mu t+\sigma x)$. On a $\frac{\partial f}{\partial t}=\mu f$, $\frac{\partial f}{\partial x}=\sigma f$ et $\frac{\partial^2f}{\partial x^2}=\sigma^2f$, donc

$$df(t,B_t)=\Big(\mu+\frac12\sigma^2\Big)f(t,B_t)\,dt+\sigma f(t,B_t)\,dB_t$$

### Exemple (iv) — une fonction des deux variables

Soit $f(t,x)=t^2+x^2$ et $X_t=\mu t+\sigma B_t$. Alors $\frac{\partial f}{\partial t}=2t$, $\frac{\partial f}{\partial x}=2x$, $\frac{\partial^2f}{\partial x^2}=2$, d'où

$$df(t,X_t)=2t\,dt+2X_t\,dX_t+(dX_t)^2=2t\,dt+2X_t(\mu\,dt+\sigma\,dB_t)+\sigma^2\,dt$$

$$=\big(2t+2\mu X_t+\sigma^2\big)dt+2\sigma X_t\,dB_t$$

## 🔴 Concept 4 — L'exponentielle stochastique

> **La question.** Trouver le processus $X_t(t,B_t)$ tel que
>
> $$dX_t=\sigma X_t\cdot dB_t$$
>
> c'est-à-dire un processus **sans aucune dérive**, dont l'accroissement est proportionnel à sa valeur.

**La réponse.** Il suffit de reprendre l'exemple (iii) et de poser $\mu=-\frac12\sigma^2$, de sorte que le coefficient $\big(\mu+\frac12\sigma^2\big)$ s'annule :

$$\boxed{\ X_t(t,B_t)=\exp\Big(-\frac12\sigma^2t+\sigma B_t\Big)\ }$$

> **Ce processus s'appelle l'exponentielle stochastique** (ou exponentielle de Doléans-Dade), et il est **partout** en finance.
>
> **Le lien direct avec la fiche 53.** C'est exactement la solution du brownien géométrique $dS/S=\mu\,dt+\sigma\,dB$ : $S_t=S_0\exp\big((\mu-\frac{\sigma^2}{2})t+\sigma B_t\big)$. Le terme $-\sigma^2/2$ dans la dérive du logarithme, qu'on avait justifié par l'inégalité de Jensen, est ici **produit mécaniquement** par le lemme d'Itô.
>
> **Et son autre rôle :** c'est la densité de Radon-Nikodym du théorème de Girsanov, au concept 8.

⚠️ **La conséquence contre-intuitive à retenir.** $X_t$ a une **espérance constante** $E[X_t]=1$ (c'est une martingale), mais sa **médiane décroît** : $\exp(-\frac12\sigma^2t)$ tend vers $0$. Presque toute trajectoire finit par s'écraser, mais quelques-unes deviennent gigantesques et maintiennent la moyenne. C'est le mécanisme exact de la « *volatility drag* ».

## 🟠 Concept 5 — Les trois questions et le choix d'Itô

Une fois le lemme acquis, le cours annonce le programme :

> 1. *Étant donné $g(t,B_t)=\int a\,dB_t+\int b\,dt$ pour certaines fonctions $a$ et $b$, existe-t-il une façon simple de décrire la **variance** de $g$ ?*
> 2. *Étant donné $g(t,B_t)$ comme ci-dessus, quand $g$ est-elle une **martingale** ?*
> 3. *Supposons $b=0$. Quand $g(t,B_t)$ est-elle **normalement distribuée** au temps $t$ ?*

**La remarque sur les autres calculs.** *La théorie du calcul peut être étendue aux mouvements browniens de plusieurs façons différentes, toutes « correctes » — autrement dit, il peut exister plusieurs versions du calcul d'Itô. Par exemple, il existe une théorie du calcul où*

$$df=f'(B_t)\,dB_t-\frac12f''(B_t)\,dt$$

> ***Cependant, l'intégrale d'Itô est la plus naturelle** dans le contexte de la façon dont la variable temporelle s'insère dans la théorie, parce que **le fait que nous ne puissions pas voir le futur** est la base de toute la théorie.*

⚠️ **Ce n'est pas un argument esthétique, c'est un argument financier.** L'intégrale d'Itô évalue l'intégrande à l'instant **initial** de chaque petit intervalle : $\sum_i g(t_i)(B_{t_{i+1}}-B_{t_i})$. C'est précisément le modèle d'une stratégie de trading — on choisit sa position **avant** d'observer le mouvement du prix. Une autre convention (évaluer au milieu, comme Stratonovich) reviendrait à supposer qu'on connaît déjà une partie du mouvement à venir : mathématiquement licite, **financièrement absurde**. C'est aussi ce qui fait que l'intégrale d'Itô est une martingale, et pas les autres.

## 🔴 Concept 6 — Propriétés : normalité, adaptation, martingale

### La normalité pour un intégrande déterministe

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème.</span>

*Soit $B(t)$ un mouvement brownien et $\Delta(t)$ une fonction du temps **non aléatoire**. Supposons qu'un processus $I(t)$ vérifie*

$$dI=\Delta(s)\,dB_s, \quad\text{c'est-à-dire}\quad I(t)=\int_0^t\Delta(s)\,dB_s$$

*avec $I(0)=0$. Alors pour chaque $t\geq0$, la variable aléatoire $I(t)$ est **normalement distribuée**.*

</div>

> *Ce premier théorème peut être vu comme une extension du fait que la **somme de variables normales indépendantes** est une variable normale.* En effet, $\int_0^t\Delta(s)\,dB_s$ est une limite de sommes $\sum_i\Delta(t_i)(B_{t_{i+1}}-B_{t_i})$ : des combinaisons linéaires à coefficients **constants** d'accroissements gaussiens indépendants.

### Les processus adaptés

*Que se passe-t-il si l'on autorise $\Delta(t)$ à être une fonction **aléatoire** du temps ?*

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 2.1.</span>

*Soit $X_t$ un processus stochastique. Un processus $\Delta_t$ est dit **adapté** (relativement à $X_t$) si, pour tout $t\geq0$, la variable aléatoire $\Delta_t$ ne dépend que des $X_s$ pour $s\leq t$.*

</div>

**Exemple 2.2.** Soit $X_t$ un processus stochastique.

| Processus | Adapté ? |
|---|---|
| $\Delta(t)=X_t$ | **oui** |
| $\Delta(t)=\min\{X_t,c\}$ ($c$ constante) | **oui** |
| $\Delta(t)=\max_{0\leq t\leq T}X_t$ | **non** |
| $X_\tau$ pour $\tau$ un **temps d'arrêt** | **oui** |

> **L'interprétation financière, donnée par le cours.** *Supposons qu'on modélise le prix d'une action par un processus stochastique et qu'on cherche une stratégie d'espérance de rendement positive. Considérons une stratégie simple où, à chaque instant $t$, on achète ou vend une action, donc $\Delta_t=1$ ou $-1$. Notre stratégie **n'a de sens que si $\Delta_t$ est un processus adapté** — sinon elle contredit le fait que nous ne pouvons pas voir le futur.*

⚠️ **Le troisième exemple est le plus instructif.** $\max_{0\leq t\leq T}X_t$ n'est pas adapté parce que, pour le connaître à l'instant $t<T$, il faudrait déjà savoir ce qui va se passer jusqu'à $T$. En revanche, le **maximum courant** $\max_{0\leq s\leq t}X_s$, lui, est parfaitement adapté. La différence porte sur la borne supérieure : $T$ ou $t$.

### Le théorème de martingale

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 2.3.</span>

*Soit $B_t$ un mouvement brownien. Alors, pour tous les processus **adaptés** $g(t,B_t)$, l'intégrale*

$$\int g(t,B_t)\,dB_s$$

*est une **martingale**, tant que $g$ est une « fonction raisonnable » — formellement, si $g\in L^2$ (de carré intégrable).*

</div>

**Exemple 2.4.** Le processus $B_t$ est lui-même adapté. Rappelons que

$$\int_0^tB_s\,dB_s=\frac12B_t^2-\frac t2, \qquad E[B_t^2]=t$$

d'où

$$E\left[\int_0^tB_s\,dB_s\right]=\frac t2-\frac t2=0$$

Plus généralement, pour $t_1<t_2$ :

$$E\left[\int_{t_1}^{t_2}B_s\,dB_s\ \Big\vert\ \mathcal F_{t_1}\right]=E\left[\frac12B_{t_2}^2-\frac{t_2}{2}\ \Big\vert\ \mathcal F_{t_1}\right]-\left(\frac12B_{t_1}^2-\frac{t_1}{2}\right)$$

$$=\frac12(t_2-t_1)+\frac12B_{t_1}^2-\frac{t_2}{2}-\frac12B_{t_1}^2+\frac{t_1}{2}=0$$

*Ceci confirme le théorème ci-dessus pour $\Delta(t)=B_t$.*

> **Le calcul repose sur une seule identité** : $E[B_{t_2}^2\mid\mathcal F_{t_1}]=B_{t_1}^2+(t_2-t_1)$, elle-même conséquence de l'indépendance des accroissements. Le brownien « accumule » de la variance à raison de $1$ par unité de temps, et le terme $-t/2$ de l'intégrale d'Itô **compense exactement** cette accumulation.

⚠️ **La propriété de martingale est la raison financière d'être du calcul d'Itô.** Une martingale est un processus « sans dérive » : $E[M_T\mid\mathcal F_t]=M_t$. Le théorème dit qu'**aucune stratégie adaptée** ne peut créer de dérive à partir d'un brownien — impossible de gagner en moyenne en pariant sur un jeu équitable, quelle que soit l'ingéniosité de la stratégie, tant qu'elle ne voit pas le futur. C'est le fondement de l'absence d'opportunité d'arbitrage.

## 🔴 Concept 7 — L'isométrie d'Itô

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 2.5 — isométrie d'Itô.</span>

*Soit $B_t$ un mouvement brownien. Alors, pour tous les processus adaptés $\Delta(t)$ :*

$$\boxed{\ E\left[\left(\int_0^t\Delta(s)\,dB_s\right)^2\right]=E\left[\int_0^t\Delta(s)^2\,ds\right]\ }$$

</div>

**Exemple 2.6.** Soit $\Delta(t)=1$. Le membre de gauche vaut

$$E\left[\left(\int_0^t\Delta(s)\,dB_s\right)^2\right]=E[B_t^2]=t$$

et le membre de droite

$$E\left[\int_0^t\Delta(s)^2\,ds\right]=E[t]=t \qquad\checkmark$$

> *Notons que $E\big[\int_0^t\Delta(s)\,dB_s\big]=0$ par le théorème de martingale. **L'isométrie d'Itô nous dit donc comment calculer la variance de cette intégrale.***

> **C'est la réponse à la question (1) du programme.** Comme l'espérance est nulle, la variance **est** le moment d'ordre 2. L'isométrie transforme donc un calcul de variance sur une intégrale **stochastique** — objet difficile — en une intégrale **ordinaire** de $\Delta^2$. C'est l'outil de calcul le plus utilisé de tout le calcul d'Itô.

⚠️ **Le nom « isométrie » est littéral.** L'application $\Delta\mapsto\int_0^t\Delta\,dB$ **préserve la norme** : la norme $L^2(\Omega)$ de l'intégrale égale la norme $L^2(dt\times\mathbb P)$ de l'intégrande. C'est cette propriété qui permet de **construire** l'intégrale d'Itô par prolongement continu depuis les processus simples — l'isométrie n'est pas seulement un outil de calcul, c'est la fondation de la définition.

## 🔴 Concept 8 — Le changement de mesure et le théorème de Girsanov

> *Un processus stochastique avec dérive peut-il aussi être vu comme un processus **sans** dérive ? Cette question modestement paradoxale n'est pas une simple curiosité. Elle a de nombreuses conséquences importantes, dont la plus immédiate est la découverte que presque toute question sur le mouvement brownien avec dérive peut être **reformulée** comme une question parallèle sur le mouvement brownien standard.* (Steele, *Stochastic calculus and financial applications*)

**Le cadre.** Un processus stochastique **est** une distribution de probabilité sur un ensemble de trajectoires. Un **changement de mesure** est une méthode de transformation de cette distribution en une autre. On fixe un temps final $T$, toutes les trajectoires sont définies sur $0\leq t\leq T$, et l'on adopte une vue plus abstraite : un processus $X$ est une fonction $X:\Omega\to[0,T]$, où $\mathbb P$ est une distribution sur $\Omega$ qui décrit la loi des trajectoires par $X^{-1}$, c'est-à-dire $\mathbb P(A)=\mathbb P(X^{-1}(A))$ pour tout ensemble de trajectoires $A$.

**La construction.** Soit $Z$ une variable aléatoire **positive** vérifiant $\int Z(\omega)\,d\mathbb P(\omega)=1$. On définit un nouveau processus $\tilde X$ de distribution

$$\tilde{\mathbb P}(A)=\int_AZ(\omega)\,d\mathbb P(\omega)$$

Comme $Z$ est positive,

$$\mathbb P(A)>0\ \Longleftrightarrow\ \tilde{\mathbb P}(A)>0 \qquad \forall A \tag{3.1}$$

*Donc l'ensemble des trajectoires « observées » sous $\mathbb P$ et sous $\tilde{\mathbb P}$ est **le même**.*

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition 3.1.</span>

*Deux distributions $\mathbb P$ et $\tilde{\mathbb P}$ sont **équivalentes** si (3.1) est vérifiée.*

</div>

*En changeant de mesure, on fixe l'ensemble $\Omega$ des trajectoires possibles et l'on transforme $\mathbb P$ en une autre distribution équivalente. **L'espace sous-jacent est le même, seul le point de vue change.*** Ce n'est pas vrai des transformations générales : par exemple, la loi du **carré** d'un brownien $B(t)^2$ n'est **pas** équivalente à celle de $B(t)$.

> **La fonction $Z$ est la dérivée de Radon-Nikodym** de $\tilde{\mathbb P}$ par rapport à $\mathbb P$ :
>
> $$Z=\frac{d\tilde{\mathbb P}}{d\mathbb P}$$

**Pourquoi c'est important.** *Théoriquement, cela fournit un outil pour comprendre la relation entre deux processus différents mais équivalents. Pratiquement aussi, car convertir une distribution en une autre peut révéler des intuitions cachées. Par exemple, **en finance, on peut convertir un processus non martingale en une martingale par changement de mesure**, ce qui donne une méthode de **valorisation des produits dérivés**.*

⚠️ **Retenez la phrase précédente : c'est le principe de toute la valorisation risque-neutre.** On ne change pas le monde, on change la **mesure de probabilité** sous laquelle on le regarde — de sorte que les prix actualisés deviennent des martingales. Le prix d'un dérivé devient alors une simple espérance sous cette nouvelle mesure. L'**équivalence** est essentielle : elle garantit que les scénarios impossibles restent impossibles, donc qu'aucun arbitrage n'est créé.

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 3.2 — Girsanov, version simple.</span>

*Soit $(\Omega,\mathbb P)$ un espace de probabilité et $X:\Omega\to[0,T]$ un processus stochastique qui est un **mouvement brownien de dérive $\mu$** sous la distribution induite par $(\Omega,\mathbb P)$. Écrivons $X(t)=\mu t+W(t)$ avec $W$ brownien standard sous $\mathbb P$, et considérons la distribution $\tilde{\mathbb P}$ définie par*

$$\frac{d\tilde{\mathbb P}}{d\mathbb P}(\omega)=e^{-\mu W(T)-\mu^2T/2}$$

*Alors $X$ est un mouvement brownien **sans dérive** sous la distribution induite par $(\Omega,\tilde{\mathbb P})$.*

</div>

> **Reconnaissez la densité !** $e^{-\mu W(T)-\mu^2T/2}$ est exactement l'**exponentielle stochastique** du concept 4, avec $\sigma=-\mu$. Sa valeur en $T$ est la densité qui « redresse » la dérive. Et c'est bien une densité valide : $E_{\mathbb P}\big[e^{-\mu W(T)}\big]=e^{\mu^2T/2}$ pour $W(T)\sim N(0,T)$, donc $E_{\mathbb P}[Z]=e^{\mu^2T/2}e^{-\mu^2T/2}=1$.

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 3.3 — Girsanov, version générale.</span>

*Soit $(\Omega,\mathbb P)$ un espace de probabilité et $X:\Omega\to[0,T]$ un processus stochastique qui est un mouvement brownien **sans dérive** sous $(\Omega,\mathbb P)$. Soit $\theta(t)$ un processus **adapté borné**, et considérons la distribution $\tilde{\mathbb P}$ définie par*

$$\frac{d\tilde{\mathbb P}}{d\mathbb P}(\omega)=\exp\left(-\int_0^T\theta(u)\,dX(u)-\frac12\int_0^T\theta(u)^2\,du\right)$$

*Alors le processus défini par*

$$Y(t)=X(t)+\int_0^t\theta(u)\,du$$

*est un mouvement brownien sous la distribution induite par $(\Omega,\tilde{\mathbb P})$.*

</div>

> **Lisez le théorème dans le bon sens.** On part d'un brownien **sans** dérive sous $\mathbb P$. Sous $\tilde{\mathbb P}$, c'est le processus **avec** la dérive ajoutée $\int_0^t\theta(u)\,du$ qui devient un brownien standard. Autrement dit : **changer de mesure revient à ajouter ou retirer une dérive**, et rien d'autre. La volatilité, elle, est **invariante** par changement de mesure — un fait fondamental en finance, puisque c'est ce qui rend le prix d'une option indépendant de la dérive du sous-jacent, mais totalement dépendant de sa volatilité.

⚠️ **La condition « $\theta$ adapté borné » n'est pas décorative.** Il faut que $\theta$ soit adapté (on ne voit pas le futur) et suffisamment intégrable pour que la densité soit d'espérance $1$ — sinon $\tilde{\mathbb P}$ n'est pas une probabilité et le théorème tombe. La condition affaiblie usuelle est celle de **Novikov**.

**Une remarque finale du cours :** *nous avons évité toute technicité dans ces notes. **Formaliser la théorie du calcul d'Itô demande un solide bagage en théorie de la mesure.***

**Références citées** : Wilmott, Howison et Dewynne, *The mathematics of financial derivatives* · Shreve, *Stochastic calculus for finance II* · Steele, *Stochastic calculus and financial applications*.

## Comment résoudre l'exercice type (protocole)

1. **Identifier le processus sous-jacent** : $dX_t=\mu_t\,dt+\sigma_t\,dB_t$ — repérer $\mu_t$ et $\sigma_t$.
2. **Identifier la fonction** $f(t,x)$ à laquelle on applique le lemme.
3. **Calculer les trois dérivées partielles** : $\frac{\partial f}{\partial t}$, $\frac{\partial f}{\partial x}$, $\frac{\partial^2f}{\partial x^2}$.
4. **Appliquer le lemme** : $$df=\Big(\frac{\partial f}{\partial t}+\mu_t\frac{\partial f}{\partial x}+\frac12\sigma_t^2\frac{\partial^2f}{\partial x^2}\Big)dt+\sigma_t\frac{\partial f}{\partial x}dB_t$$
5. **Lire la dérive et la diffusion** séparément — le coefficient de $dt$ et celui de $dB_t$.
6. **Si l'on cherche une martingale** : annuler le coefficient de $dt$.
7. **Si l'on cherche une variance** : appliquer l'**isométrie d'Itô**.
8. **Si l'on veut supprimer une dérive** : appliquer **Girsanov**.

### Comment reconnaître qu'il faut utiliser cette méthode ?

| Indice dans l'énoncé | Ce qu'il faut faire |
|---|---|
| « différentielle de $f(t,X_t)$ » | **lemme d'Itô**, ne pas oublier le terme en $\frac12\sigma^2f''$ |
| « montrer que … est une martingale » | vérifier que le coefficient de $dt$ est **nul** |
| « variance de $\int\Delta\,dB$ » | **isométrie d'Itô** : $E\big[\int\Delta^2ds\big]$ |
| « loi de $\int\Delta\,dB$ » avec $\Delta$ déterministe | **normale**, de variance $\int\Delta^2ds$ |
| « ce processus dépend-il du futur ? » | vérifier l'**adaptation** |
| « trouver $X$ tel que $dX=\sigma X\,dB$ » | **exponentielle stochastique** $\exp(-\frac12\sigma^2t+\sigma B_t)$ |
| « éliminer la dérive », « mesure risque-neutre » | **Girsanov** |
| « équivalent » pour deux mesures | $\mathbb P(A)>0\Leftrightarrow\tilde{\mathbb P}(A)>0$ |

### Exercices progressifs

**Niveau 1** — Appliquez le lemme d'Itô à $f(x)=x^3$ pour $X_t=B_t$.

<details><summary>Correction</summary>

**Étape 1 — les dérivées.** $f'(x)=3x^2$, $f''(x)=6x$.

**Étape 2 — le lemme (forme 1.2).**

$$df(B_t)=f'(B_t)\,dB_t+\frac12f''(B_t)\,dt=3B_t^2\,dB_t+3B_t\,dt$$

**Étape 3 — la forme intégrale.**

$$B_T^3=3\int_0^TB_t^2\,dB_t+3\int_0^TB_t\,dt$$

**Le contraste avec le calcul ordinaire.** On aurait écrit $dx^3=3x^2dx$ tout court. Le terme $3B_t\,dt$ est **entièrement dû à Itô** : il vient de $\frac12\cdot6B_t\cdot(dB_t)^2=3B_t\,dt$.

**Vérification par les espérances.** $\int_0^TB_t^2\,dB_t$ est une martingale nulle en $0$, donc d'espérance nulle. Il reste $E[B_T^3]=3\int_0^TE[B_t]\,dt=0$ — ce qui est correct, la loi de $B_T$ étant symétrique.

</details>

**Niveau 2** — Pourquoi $\int_0^TB_t\,dB_t\neq\frac12B_T^2$ ?

<details><summary>Correction</summary>

**Le calcul.** Avec $f(x)=\frac12x^2$, le lemme d'Itô donne $df(B_t)=B_t\,dB_t+\frac12\,dt$, donc en intégrant

$$\frac12B_T^2=\int_0^TB_t\,dB_t+\frac T2 \qquad\Longrightarrow\qquad \int_0^TB_t\,dB_t=\frac12B_T^2-\frac T2$$

**La raison structurelle.** Le terme $-\frac T2$ vient du terme d'Itô $\frac12f''(B_t)(dB_t)^2=\frac12\,dt$, lui-même conséquence de $(\Delta B_t)^2=\Delta t$. Le brownien accumule de la variation quadratique à raison de $1$ par unité de temps ; l'intégrale doit en tenir compte.

**Le contrôle par l'espérance — c'est l'argument décisif.** Par le théorème 2.3, $\int_0^TB_t\,dB_t$ est une **martingale nulle en $0$**, donc d'espérance nulle. Or

$$E\Big[\frac12B_T^2\Big]=\frac T2\ \neq\ 0$$

La formule naïve ne peut donc **pas** être correcte : elle donnerait une intégrale stochastique d'espérance strictement positive, ce qui reviendrait à gagner en moyenne à un jeu équitable. Le terme $-\frac T2$ rétablit exactement $E\big[\frac12B_T^2-\frac T2\big]=0$.

**La formulation à retenir.** Le théorème fondamental du calcul est « violé » précisément parce que le brownien a une **variation quadratique non nulle** — c'est la même propriété qui le rend non dérivable.

</details>

**Niveau 3** — Trouvez le processus vérifiant $dX_t=\sigma X_t\,dB_t$, et calculez $E[X_t]$ et $\mathrm{Var}(X_t)$.

<details><summary>Correction</summary>

**Étape 1 — la forme candidate.** L'exemple (iii) du cours donne, pour $f(t,x)=\exp(\mu t+\sigma x)$ :

$$df(t,B_t)=\Big(\mu+\frac12\sigma^2\Big)f\,dt+\sigma f\,dB_t$$

**Étape 2 — annuler la dérive.** On veut le coefficient de $dt$ nul, donc $\mu+\frac12\sigma^2=0$, soit $\mu=-\frac12\sigma^2$ :

$$X_t=\exp\Big(-\frac12\sigma^2t+\sigma B_t\Big)$$

**Étape 3 — l'espérance.** Comme $\sigma B_t\sim N(0,\sigma^2t)$, on utilise $E[e^Y]=e^{m+v/2}$ pour $Y\sim N(m,v)$ :

$$E[X_t]=e^{-\sigma^2t/2}\cdot E[e^{\sigma B_t}]=e^{-\sigma^2t/2}\cdot e^{\sigma^2t/2}=1$$

$X_t$ est bien une **martingale** d'espérance constante $1$ — conforme au théorème 2.3, puisque $dX_t=\sigma X_t\,dB_t$ n'a pas de terme en $dt$.

**Étape 4 — la variance.**

$$E[X_t^2]=E\big[e^{-\sigma^2t+2\sigma B_t}\big]=e^{-\sigma^2t}\cdot e^{2\sigma^2t}=e^{\sigma^2t}$$

$$\mathrm{Var}(X_t)=e^{\sigma^2t}-1$$

**L'interprétation, qui est le vrai enseignement.** $E[X_t]=1$ pour tout $t$, mais $\mathrm{Var}(X_t)$ **explose exponentiellement**. Et la médiane, elle, vaut $e^{-\sigma^2t/2}\to0$ : **presque toute trajectoire tend vers zéro**, tandis que quelques trajectoires très rares deviennent immenses et maintiennent la moyenne à $1$.

C'est le mécanisme exact de la « *volatility drag* » de la fiche 53, et l'illustration la plus nette de la différence entre **espérance** et **trajectoire typique** — une distinction cruciale pour tout ce qui touche à l'investissement à long terme.

</details>

**Niveau 4 — type examen** — Énoncez l'isométrie d'Itô, expliquez son nom, et servez-vous-en pour calculer $\mathrm{Var}\big(\int_0^ts\,dB_s\big)$.

<details><summary>Correction</summary>

**L'énoncé.** Pour tout processus adapté $\Delta(t)$,

$$E\left[\left(\int_0^t\Delta(s)\,dB_s\right)^2\right]=E\left[\int_0^t\Delta(s)^2\,ds\right]$$

**Pourquoi cela donne la variance.** Par le théorème 2.3, $\int_0^t\Delta(s)\,dB_s$ est une martingale nulle en $0$, donc d'**espérance nulle**. La variance est donc égale au moment d'ordre 2, c'est-à-dire au membre de gauche.

**Pourquoi le nom « isométrie ».** L'application

$$\Delta\ \longmapsto\ \int_0^t\Delta(s)\,dB_s$$

envoie l'espace $L^2(dt\times\mathbb P)$ des intégrandes dans $L^2(\Omega)$ des variables aléatoires, en **préservant exactement la norme** :

$$\Big\lVert\int_0^t\Delta\,dB\Big\rVert_{L^2(\Omega)}^2=\lVert\Delta\rVert_{L^2(dt\times\mathbb P)}^2$$

Ce n'est pas seulement joli : c'est ce qui permet de **construire** l'intégrale d'Itô. On la définit d'abord sur les processus simples (constants par morceaux), où elle est évidente ; l'isométrie garantit alors qu'elle se prolonge **de façon unique et continue** à tout $L^2$ par densité.

**Le calcul demandé.** Ici $\Delta(s)=s$, une fonction **déterministe** :

$$\mathrm{Var}\left(\int_0^ts\,dB_s\right)=E\left[\int_0^ts^2\,ds\right]=\int_0^ts^2\,ds=\frac{t^3}{3}$$

**Bonus — la loi complète.** L'intégrande étant **non aléatoire**, le premier théorème du concept 6 s'applique : l'intégrale est **normalement distribuée**. Avec l'espérance nulle et la variance calculée :

$$\int_0^ts\,dB_s\ \sim\ N\Big(0,\ \frac{t^3}{3}\Big)$$

**La méthode générale à retenir.** Pour toute intégrale d'Itô, la chaîne de raisonnement est toujours la même :

1. **espérance** $=0$ — par le théorème de martingale (si l'intégrande est adapté) ;
2. **variance** — par l'isométrie d'Itô, qui la ramène à une intégrale ordinaire ;
3. **loi** — normale si et seulement si l'intégrande est **déterministe** ; sinon on ne connaît en général que les deux premiers moments.

</details>

## 🔴 Common mistakes

1. **Oublier le terme $\frac12\sigma^2\frac{\partial^2f}{\partial x^2}$** — c'est *le* terme d'Itô, celui qui distingue tout ce calcul du calcul ordinaire.
2. **Écrire $df=f'(B_t)\,dB_t$** — c'est l'équation (1.1), et le cours dit explicitement qu'elle *ne marche pas tout à fait*.
3. **Croire que $(\Delta B_t)^3$ compte aussi** — non : $\Delta B_t\sim\sqrt{\Delta t}$, donc $(\Delta B_t)^3\sim(\Delta t)^{3/2}$, négligeable. Le développement s'arrête **exactement** à l'ordre 2.
4. **Oublier le $\sigma_t$ devant $\frac{\partial f}{\partial x}dB_t$** dans le lemme général.
5. **Écrire $\int_0^TB_t\,dB_t=\frac12B_T^2$** — il manque le $-\frac T2$.
6. **Croire que toute intégrale d'Itô est gaussienne** — seulement si l'intégrande est **déterministe**.
7. **Utiliser un intégrande non adapté** — $\max_{0\leq t\leq T}X_t$ n'est pas adapté ; $\max_{0\leq s\leq t}X_s$ l'est.
8. **Croire que Girsanov change la volatilité** — il ne change que la **dérive** ; la volatilité est invariante.
9. **Oublier de vérifier $E[Z]=1$** — sans cela $\tilde{\mathbb P}$ n'est pas une probabilité.
10. **Confondre « équivalent » et « égal »** — deux mesures équivalentes ont les mêmes ensembles négligeables, pas les mêmes probabilités.
11. **Confondre espérance et trajectoire typique** — pour l'exponentielle stochastique, $E[X_t]=1$ alors que presque toute trajectoire tend vers $0$.

## 📌 Ultimate Review

1. **Le problème** : une trajectoire brownienne est **nulle part dérivable**, $dB_t/dt$ n'existe pas.
2. **Le blocage de Taylor** : $E[(\Delta B_t)^2]=\Delta t$, donc le terme de second ordre **n'est pas négligeable** ; $\Delta B_t\sim\sqrt{\Delta t}$.
3. **La règle fondatrice** : $(\Delta B_t)^2=\Delta t$, tout le reste est négligeable.
4. **Lemme d'Itô, cas simple** : $df(B_t)=f'(B_t)\,dB_t+\frac12f''(B_t)\,dt$.
5. **Cas $f(t,B_t)$** : $df=\big(\frac{\partial f}{\partial t}+\frac12\frac{\partial^2f}{\partial x^2}\big)dt+\frac{\partial f}{\partial x}dB_t$.
6. **Théorème 1.1 — cas général** : pour $dX_t=\mu_t\,dt+\sigma_t\,dB_t$, $$df(t,X_t)=\Big(\frac{\partial f}{\partial t}+\mu_t\frac{\partial f}{\partial x}+\frac12\sigma_t^2\frac{\partial^2f}{\partial x^2}\Big)dt+\sigma_t\frac{\partial f}{\partial x}dB_t$$
7. **Table de multiplication** : $(dB_t)^2=dt$, $dt\,dB_t=0$, $(dt)^2=0$.
8. **Intégration** = inverse de la différentiation.
9. **Exemples** : brownien avec dérive $dX_t=\mu\,dt+\sigma\,dB_t$ · $\int_0^TB_t\,dB_t=\frac12B_T^2-\frac T2$ · $f=e^{\mu t+\sigma x}$ ⟹ $df=(\mu+\frac{\sigma^2}{2})f\,dt+\sigma f\,dB_t$ · $f=t^2+x^2$ ⟹ $df=(2t+2\mu X_t+\sigma^2)dt+2\sigma X_t\,dB_t$.
10. **Exponentielle stochastique** : $dX_t=\sigma X_t\,dB_t\iff X_t=\exp\big(-\frac12\sigma^2t+\sigma B_t\big)$ ; $E[X_t]=1$, médiane $\to0$.
11. **Pourquoi Itô et pas une autre convention** : *le fait que nous ne puissions pas voir le futur est la base de toute la théorie*.
12. **Intégrande déterministe** ⟹ l'intégrale est **normalement distribuée**.
13. **Processus adapté** : $\Delta_t$ ne dépend que des $X_s$, $s\leq t$. Adaptés : $X_t$, $\min\{X_t,c\}$, $X_\tau$ pour $\tau$ temps d'arrêt. **Non adapté** : $\max_{0\leq t\leq T}X_t$.
14. **Théorème 2.3** : pour tout $g$ adapté et $L^2$, $\int g\,dB$ est une **martingale**.
15. **Isométrie d'Itô** : $E\big[(\int_0^t\Delta\,dB_s)^2\big]=E\big[\int_0^t\Delta^2\,ds\big]$ — donne la **variance**.
16. **Changement de mesure** : $Z>0$ avec $\int Z\,d\mathbb P=1$, $\tilde{\mathbb P}(A)=\int_AZ\,d\mathbb P$ ; **équivalence** $\mathbb P(A)>0\Leftrightarrow\tilde{\mathbb P}(A)>0$ ; $Z=d\tilde{\mathbb P}/d\mathbb P$ est la **dérivée de Radon-Nikodym**.
17. **Girsanov simple** : $X$ brownien de dérive $\mu$ sous $\mathbb P$ ; avec $d\tilde{\mathbb P}/d\mathbb P=e^{-\mu W(T)-\mu^2T/2}$, $X$ est sans dérive sous $\tilde{\mathbb P}$.
18. **Girsanov général** : $X$ brownien sans dérive sous $\mathbb P$, $\theta$ adapté borné, $d\tilde{\mathbb P}/d\mathbb P=\exp\big(-\int_0^T\theta\,dX-\frac12\int_0^T\theta^2du\big)$ ⟹ $Y(t)=X(t)+\int_0^t\theta(u)du$ est un brownien sous $\tilde{\mathbb P}$.
19. **L'usage en finance** : *convertir un processus non martingale en martingale par changement de mesure donne une méthode de valorisation des dérivés*.

**Formulas to know**

$$(dB_t)^2=dt \qquad df(B_t)=f'(B_t)\,dB_t+\frac12f''(B_t)\,dt \qquad \int_0^TB_t\,dB_t=\frac12B_T^2-\frac T2$$

$$df(t,X_t)=\Big(\frac{\partial f}{\partial t}+\mu_t\frac{\partial f}{\partial x}+\frac{\sigma_t^2}{2}\frac{\partial^2f}{\partial x^2}\Big)dt+\sigma_t\frac{\partial f}{\partial x}dB_t \qquad X_t=e^{-\frac12\sigma^2t+\sigma B_t}$$

$$E\left[\left(\int_0^t\Delta\,dB_s\right)^2\right]=E\left[\int_0^t\Delta^2\,ds\right] \qquad Z=\frac{d\tilde{\mathbb P}}{d\mathbb P}$$

**Methods to know** : le protocole en 8 étapes ; la dérivation du lemme par Taylor ; le calcul de $\int_0^TB_t\,dB_t$ et sa vérification par l'espérance ; la recherche d'une martingale en annulant la dérive ; le calcul de variance par isométrie.

## 🧠 Active Recall

**Basic** — Énoncez le lemme d'Itô dans sa forme générale.

<details><summary>Réponse</summary>

Pour $f(t,x)$ régulière et $X_t$ vérifiant $dX_t=\mu_t\,dt+\sigma_t\,dB_t$ :

$$df(t,X_t)=\left(\frac{\partial f}{\partial t}+\mu_t\frac{\partial f}{\partial x}+\frac12\sigma_t^2\frac{\partial^2f}{\partial x^2}\right)dt+\sigma_t\frac{\partial f}{\partial x}\,dB_t$$

Le **terme d'Itô** est $\frac12\sigma_t^2\frac{\partial^2f}{\partial x^2}$ : il n'a aucun équivalent en calcul classique et vient de la règle $(dB_t)^2=dt$.

</details>

**Understanding** — Pourquoi le terme de second ordre du développement de Taylor survit-il ici ?

<details><summary>Réponse</summary>

Parce que le brownien vérifie

$$E\big[(\Delta B_t)^2\big]=\Delta t$$

c'est-à-dire $\Delta B_t\sim\sqrt{\Delta t}$ en ordre de grandeur — et c'est précisément cette « racine carrée » qui rend le brownien **non dérivable**.

Dans le développement

$$\Delta f=(\Delta B_t)f'+\frac{(\Delta B_t)^2}{2}f''+\frac{(\Delta B_t)^3}{6}f'''+\cdots$$

- le premier terme est d'ordre $\sqrt{\Delta t}$ ;
- le deuxième est d'ordre $\Delta t$ — **pas négligeable**, puisqu'une variation de $B_t$ s'accompagne nécessairement d'une variation de $t$ ;
- le troisième est d'ordre $(\Delta t)^{3/2}$ — **négligeable**.

Pour une fonction ordinaire, $\Delta x\sim\Delta t$ et le second terme serait en $(\Delta t)^2$, négligeable comme d'habitude. Le développement s'arrête donc ici **exactement à l'ordre 2**, ni plus ni moins.

</details>

**Application** — Retrouvez l'équation du brownien géométrique à partir du lemme d'Itô.

<details><summary>Réponse</summary>

**Le point de départ.** $S_t$ vérifie $dS_t=\mu S_t\,dt+\sigma S_t\,dB_t$, c'est-à-dire $\mu_t=\mu S_t$ et $\sigma_t=\sigma S_t$.

**La fonction.** $f(t,x)=\log x$, d'où $\frac{\partial f}{\partial t}=0$, $\frac{\partial f}{\partial x}=\frac1x$, $\frac{\partial^2f}{\partial x^2}=-\frac{1}{x^2}$.

**Le lemme.**

$$d(\log S_t)=\left(0+\mu S_t\cdot\frac{1}{S_t}+\frac12\sigma^2S_t^2\cdot\Big(-\frac{1}{S_t^2}\Big)\right)dt+\sigma S_t\cdot\frac{1}{S_t}\,dB_t$$

$$=\Big(\mu-\frac{\sigma^2}{2}\Big)dt+\sigma\,dB_t$$

**L'intégration.**

$$\log S_t=\log S_0+\Big(\mu-\frac{\sigma^2}{2}\Big)t+\sigma B_t \qquad\Longrightarrow\qquad S_t=S_0\exp\Big(\Big(\mu-\frac{\sigma^2}{2}\Big)t+\sigma B_t\Big)$$

> **Voilà d'où vient le $-\sigma^2/2$ de la fiche 53.** Il n'était pas un ajustement *ad hoc* justifié par l'inégalité de Jensen : c'est **exactement** le terme d'Itô, avec le signe négatif dû à la **concavité** du logarithme ($f''<0$).

</details>

**Comparison** — Isométrie d'Itô et théorème de martingale : que donne chacun ?

<details><summary>Réponse</summary>

Les deux portent sur $\int_0^t\Delta(s)\,dB_s$ avec $\Delta$ **adapté**, et ils sont **complémentaires**.

|  | **Théorème 2.3 (martingale)** | **Théorème 2.5 (isométrie)** |
|---|---|---|
| Ce qu'il donne | l'**espérance** : $E\big[\int_0^t\Delta\,dB\big]=0$ | la **variance** : $E\big[\int_0^t\Delta^2ds\big]$ |
| Contenu | l'intégrale d'un processus adapté est une **martingale** | l'application $\Delta\mapsto\int\Delta\,dB$ **préserve la norme $L^2$** |
| Condition | $\Delta$ adapté, $\Delta\in L^2$ | $\Delta$ adapté |

**Comment ils s'articulent.** C'est parce que l'espérance est nulle (théorème 2.3) que le moment d'ordre 2 **est** la variance — et c'est l'isométrie qui le calcule. Le cours le dit explicitement : *l'isométrie d'Itô nous dit comment calculer la variance de cette intégrale*.

**Et le troisième maillon.** Si en plus $\Delta$ est **déterministe**, on connaît la **loi entière** : c'est une gaussienne $N\big(0,\int_0^t\Delta(s)^2ds\big)$.

**Le rôle plus profond de l'isométrie.** Au-delà du calcul, c'est elle qui **construit** l'intégrale d'Itô : on la définit sur les processus simples, et l'isométrie garantit son prolongement unique et continu à tout $L^2$.

</details>

**Exam-style** — Expliquez le changement de mesure et le théorème de Girsanov, et dites pourquoi c'est le fondement de la valorisation des dérivés.

<details><summary>Réponse</summary>

**La question de départ**, telle que Steele la pose : *un processus stochastique avec dérive peut-il aussi être vu comme un processus sans dérive ?*

**Le mécanisme.** Un processus stochastique **est** une distribution de probabilité sur des trajectoires. Étant donné $Z>0$ avec $\int Z\,d\mathbb P=1$, on définit

$$\tilde{\mathbb P}(A)=\int_AZ(\omega)\,d\mathbb P(\omega)$$

$Z$ est la **dérivée de Radon-Nikodym** $d\tilde{\mathbb P}/d\mathbb P$. Comme $Z>0$,

$$\mathbb P(A)>0\ \Longleftrightarrow\ \tilde{\mathbb P}(A)>0$$

— les deux mesures sont **équivalentes**. *L'ensemble des trajectoires observées est le même ; l'espace sous-jacent est le même, seul le point de vue change.*

**Girsanov, version générale.** $X$ brownien sans dérive sous $\mathbb P$, $\theta$ adapté borné,

$$\frac{d\tilde{\mathbb P}}{d\mathbb P}=\exp\left(-\int_0^T\theta(u)\,dX(u)-\frac12\int_0^T\theta(u)^2\,du\right)$$

Alors $Y(t)=X(t)+\int_0^t\theta(u)\,du$ est un **brownien sous $\tilde{\mathbb P}$**.

**Le contenu du théorème en une phrase.** Changer de mesure équivalente revient exactement à **ajouter ou retirer une dérive**. La **volatilité est invariante**.

**Pourquoi c'est le fondement de la valorisation.** Le cours le dit directement : *en finance, on peut convertir un processus non martingale en une martingale par changement de mesure, et cela donne une méthode de valorisation des produits dérivés.*

Le raisonnement complet :

1. Sous la mesure réelle $\mathbb P$, le prix actualisé d'un actif risqué **n'est pas** une martingale : il a une dérive, la prime de risque.
2. Par Girsanov, on choisit $\theta$ pour **annuler exactement cette prime**. Sous la nouvelle mesure $\tilde{\mathbb P}$ — dite **risque-neutre** —, tout actif actualisé devient une martingale.
3. Le prix d'un dérivé de flux terminal $H$ est alors une simple **espérance** : $V_0=E_{\tilde{\mathbb P}}\big[e^{-rT}H\big]$.

**Les deux points qui font la solidité du raisonnement.**

- **L'équivalence est essentielle.** Elle garantit que les événements de probabilité nulle restent de probabilité nulle : aucun scénario n'est créé ni détruit, donc **aucun arbitrage** n'est introduit. C'est la condition technique qui donne son sens économique au théorème.
- **La volatilité est invariante, la dérive ne l'est pas.** C'est la raison profonde pour laquelle le prix d'une option **ne dépend pas** du rendement espéré du sous-jacent — un fait déroutant au premier abord — mais dépend crucialement de sa **volatilité**. Deux investisseurs en total désaccord sur la performance future d'une action doivent néanmoins s'accorder sur le prix de l'option, dès lors qu'ils s'accordent sur sa volatilité.

⚠️ **La condition « $\theta$ adapté borné » n'est pas décorative** : adapté parce qu'on ne voit pas le futur, borné (ou sous condition de Novikov) pour que la densité soit bien d'espérance $1$ et $\tilde{\mathbb P}$ une vraie probabilité.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Le brownien est-il dérivable ? | **Nulle part**, avec probabilité $1$ |
| Ordre de grandeur de $\Delta B_t$ ? | $\sqrt{\Delta t}$ |
| La règle fondatrice d'Itô ? | $(\Delta B_t)^2=\Delta t$ |
| Pourquoi le terme d'ordre 2 survit ? | $E[(\Delta B_t)^2]=\Delta t$, du même ordre que le terme dominant |
| Pourquoi l'ordre 3 est négligeable ? | $(\Delta B_t)^3\sim(\Delta t)^{3/2}$ |
| Lemme d'Itô, cas simple ? | $df(B_t)=f'(B_t)dB_t+\frac12f''(B_t)dt$ |
| Lemme d'Itô, cas général ? | $\big(\frac{\partial f}{\partial t}+\mu_t\frac{\partial f}{\partial x}+\frac{\sigma_t^2}{2}\frac{\partial^2f}{\partial x^2}\big)dt+\sigma_t\frac{\partial f}{\partial x}dB_t$ |
| Table de multiplication ? | $(dB_t)^2=dt$, $dt\,dB_t=0$, $(dt)^2=0$ |
| Signe du terme d'Itô ? | Celui de $f''$ — positif si $f$ convexe, négatif si concave |
| $\int_0^TB_t\,dB_t=?$ | $\frac12B_T^2-\frac T2$ |
| Pourquoi le $-T/2$ ? | Sinon l'intégrale ne serait pas d'espérance nulle |
| $df$ pour $f=e^{\mu t+\sigma x}$ ? | $(\mu+\frac{\sigma^2}{2})f\,dt+\sigma f\,dB_t$ |
| Processus tel que $dX=\sigma X\,dB$ ? | $\exp(-\frac12\sigma^2t+\sigma B_t)$ |
| Son espérance ? | $E[X_t]=1$ — c'est une martingale |
| Son comportement typique ? | La **médiane** $e^{-\sigma^2t/2}$ tend vers $0$ |
| Pourquoi la convention d'Itô ? | *Nous ne pouvons pas voir le futur* |
| Quand $\int\Delta\,dB$ est-elle gaussienne ? | Si $\Delta$ est **déterministe** |
| Définition d'un processus adapté ? | $\Delta_t$ ne dépend que des $X_s$ pour $s\leq t$ |
| $\max_{0\leq t\leq T}X_t$ est-il adapté ? | **Non** |
| $X_\tau$ pour $\tau$ temps d'arrêt ? | **Oui**, adapté |
| Théorème de martingale ? | $\int g\,dB$ est une martingale pour tout $g$ adapté et $L^2$ |
| Isométrie d'Itô ? | $E\big[(\int_0^t\Delta\,dB)^2\big]=E\big[\int_0^t\Delta^2ds\big]$ |
| À quoi sert-elle ? | À calculer la **variance** d'une intégrale d'Itô |
| Pourquoi le mot « isométrie » ? | L'application $\Delta\mapsto\int\Delta\,dB$ préserve la norme $L^2$ |
| Deux mesures équivalentes ? | $\mathbb P(A)>0\Leftrightarrow\tilde{\mathbb P}(A)>0$ |
| Dérivée de Radon-Nikodym ? | $Z=d\tilde{\mathbb P}/d\mathbb P$, positive et d'espérance $1$ |
| Que change Girsanov ? | La **dérive** seulement — la volatilité est invariante |
| Girsanov, version générale ? | $Y(t)=X(t)+\int_0^t\theta(u)du$ est un brownien sous $\tilde{\mathbb P}$ |
| Densité de Girsanov ? | $\exp\big(-\int_0^T\theta\,dX-\frac12\int_0^T\theta^2du\big)$ |
| Son usage en finance ? | Rendre martingale un processus qui ne l'est pas ⟹ **valorisation des dérivés** |
