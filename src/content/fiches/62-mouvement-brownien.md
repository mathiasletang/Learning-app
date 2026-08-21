# Fiche 62 — Le mouvement brownien : principe de réflexion et variation quadratique

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché |
| **Cours source** | *18.S096 Topics in Mathematics with Applications in Finance*, MIT OpenCourseWare, automne 2013 — cours 17 « Stochastic Processes II » |
| **Difficulté** | Must know — c'est ici que $(dB)^2=dt$ est démontré |
| **Temps d'étude estimé** | 2 h |
| **Prérequis** | Fiche 61 (marche aléatoire, temps d'arrêt), loi normale et fonction de répartition |
| **Concepts clés** | Processus à temps continu, mouvement brownien standard, processus de Wiener, limite de marches aléatoires, maximum courant, propriété de Markov forte, principe de réflexion, non-dérivabilité, variation quadratique, brownien avec dérive |
| **Poids à l'examen** | Trois choses : les **trois propriétés** définissant le brownien ; le **principe de réflexion** $\mathbb P(M(t)\geq a)=2\mathbb P(B(t)>a)$ avec sa démonstration ; et le **théorème de variation quadratique**, qui *est* la justification de $(dB)^2=dt$. |

## 🎯 Vue d'ensemble

**Le passage au temps continu, et sa difficulté.** *Dans la plupart des cas, il est **difficile de décrire exactement** la distribution de probabilité d'un processus à temps continu. C'était déjà difficile en temps discret, mais on décrivait alors la loi en termes des **accroissements** $X_{k+1}-X_k$ ; c'est impossible en temps continu.*

> **La stratégie adoptée.** *Une autre voie, couramment employée, consiste à d'abord **décrire les propriétés** satisfaites par la distribution, puis à **montrer qu'il existe** une distribution satisfaisant ces propriétés. Malheureusement, la seconde partie — la construction effective — demande un travail non trivial qui dépasse le cadre de ce cours.*

```
TEMPS DISCRET (fiche 61)      TEMPS CONTINU (cette fiche)
marche aléatoire        →     mouvement brownien
Σ Y_i,  Y_i = ±1        →     B(t), accroissements N(0, t−s)
                        →     NOUVEAU : nulle part dérivable
                        →     NOUVEAU : variation quadratique = T
                        →     d'où (dB)² = dt, et tout le calcul d'Itô
```

## 🟡 Concept 1 — Le cadre formel

*Pour définir formellement un processus stochastique, il faut un **espace de probabilité sous-jacent** $(\Omega,\mathbb P)$. Un processus stochastique $X$ est alors une **application de l'univers $\Omega$ vers l'espace des fonctions réelles** définies sur $[0,\infty)$.* La probabilité que le processus suive une trajectoire appartenant à un ensemble $A$ se calcule donc par $\mathbb P(X^{-1}(A))$.

> *Lorsqu'il n'y a **qu'un seul** processus, il est plus commode de considérer directement $\Omega$ comme l'espace de toutes les trajectoires possibles ; $\mathbb P$ décrit alors directement la loi du processus. La vue plus abstraite — un univers $\Omega$ séparé — est utile lorsqu'il y a **plusieurs processus** en jeu, par exemple **lors d'un changement de mesure**.*

On note $\omega$ un élément de $\Omega$, c'est-à-dire une trajectoire possible du processus.

⚠️ **La parenthèse sur le changement de mesure n'est pas anodine** : c'est exactement le cadre du théorème de Girsanov (fiche 56). Deux mesures $\mathbb P$ et $\tilde{\mathbb P}$ **équivalentes** vivent sur le **même** $\Omega$ — le même ensemble de trajectoires — et ne diffèrent que par la pondération. C'est pour rendre cela dicible qu'on sépare $\Omega$ du processus.

## 🔴 Concept 2 — Le mouvement brownien standard

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 2.1.</span>

*Il existe une distribution de probabilité sur l'ensemble des fonctions **continues** $B:\mathbb R\to\mathbb R$ satisfaisant les conditions suivantes :* **(i)** $B(0)=0$ ; **(ii) (stationnarité)** pour tous $0\leq s<t$, la loi de $B(t)-B(s)$ est la **loi normale de moyenne $0$ et de variance $t-s$** ; **(iii) (accroissements indépendants)** les variables $B(t_i)-B(s_i)$ sont **mutuellement indépendantes** si les intervalles $[s_i,t_i]$ **ne se recouvrent pas**.

</div>

On appelle **trajectoire brownienne** une instance particulière de trajectoire tirée selon cette loi.

**Les noms.** Ce processus est aussi appelé **processus de Wiener**, d'après Norbert Wiener, qui fut professeur au MIT. *La première personne à l'avoir effectivement considéré est **Bachelier**, qui a utilisé le mouvement brownien pour évaluer actions et options dans sa thèse écrite en **1900**.*

> **Comparez avec la proposition 2.1 de la fiche 61** : $E[X_k]=0$, accroissements indépendants, accroissements stationnaires. Ce sont **exactement** les mêmes trois propriétés. Le mouvement brownien est la marche aléatoire dont on a fait tendre le pas vers zéro — et la seule chose ajoutée est que la loi des accroissements est **précisément gaussienne**, ce que le théorème central limite impose de toute façon à la limite.

**Exemple 2.2.**

- **(i)** *En 1827, le botaniste **Robert Brown**, observant au microscope des particules issues de grains de pollen dans l'eau, nota que les particules se déplaçaient sans pouvoir en déterminer le mécanisme. Bien des décennies plus tard, **Albert Einstein** publia en **1905** un article expliquant en détail que le mouvement observé par Brown résultait du déplacement du pollen par les molécules d'eau individuelles.*
- **(ii)** *Les prix d'actions peuvent aussi être modélisés par des mouvements browniens standard.*

⚠️ **Notez la chronologie, elle est frappante.** Bachelier applique le brownien aux marchés financiers en **1900** — cinq ans **avant** l'article d'Einstein qui en donne l'explication physique. La finance mathématique précède ici la physique statistique.

## 🟠 Concept 3 — Le brownien comme limite de marches aléatoires

*Une façon de penser au mouvement brownien standard est comme **limite de marches aléatoires simples**.* Considérons une marche aléatoire simple $\{Y_0,Y_1,\dots\}$ dont les accroissements sont de moyenne $0$ et de variance $1$. Soit $Z$ la fonction **affine par morceaux** de $[0,1]$ dans $\mathbb R$ définie par

$$Z\Big(\frac tn\Big)=\frac{Y_t}{\sqrt n}, \qquad t=0,1,\dots,n$$

et affine entre ces points.

*Quand on prend des valeurs de $n$ de plus en plus grandes, la loi de la trajectoire $Z$ se rapproche de celle du mouvement brownien standard.* En effet, la loi de $Z(1)=Y_n/\sqrt n$ converge vers $N(0,1)$ par le **théorème central limite** ; plus généralement, la loi de $Z(t)$ converge vers $N(0,t)$.

> **La normalisation en $\sqrt n$ est le point technique décisif** — c'est elle qui fixe l'échelle. Si l'on divisait par $n$, tout s'écraserait sur $0$ ; si l'on ne divisait pas, tout exploserait. Le facteur $\sqrt n$ est le **seul** qui donne une limite non triviale, et il vient directement du théorème central limite.
>
> **Sa conséquence** : $B(t)$ est d'ordre de grandeur $\sqrt t$. On retrouvera cette échelle partout — dans le principe de réflexion, dans la non-dérivabilité, et dans $(dB)^2=dt$.

## 🔴 Concept 4 — Trois faits sur le mouvement brownien

> **Les faits énoncés par le cours.**
>
> 1. *Il **traverse l'axe des abscisses une infinité de fois**.*
> 2. *Il a une relation très étroite avec la courbe $x=y^2$ (il ne s'en écarte pas trop).*
> 3. *Il n'est **nulle part dérivable**.*

> **Le fait 2 est la traduction géométrique de l'échelle $\sqrt t$.** La courbe $x=y^2$ est $t=B^2$, c'est-à-dire $\lvert B(t)\rvert=\sqrt t$ : la parabole couchée est l'**enveloppe naturelle** de la trajectoire. Le brownien ne s'en écarte que d'un facteur logarithmique — c'est le contenu précis de la loi du logarithme itéré.

**L'argument de modélisation que le cours en tire.** *Dans la vie réelle, on ne peut observer la valeur d'un processus qu'à une certaine résolution temporelle — on ne prend qu'un nombre fini de points. Le fait ci-dessus implique que le mouvement brownien standard est un modèle **raisonnable**, au moins en ce sens : l'observation réelle converge vers le processus théorique sous-jacent à mesure que l'on prend des intervalles de temps plus petits, **tant que les observations en temps discret se comportent comme une marche aléatoire simple**.*

⚠️ **La dernière subordonnée est la clause qui limite tout.** La justification vaut si et seulement si les rendements haute fréquence se comportent comme des accroissements i.i.d. centrés. En pratique, ils ne le font pas : regroupement de volatilité et queues épaisses (fiche 53). C'est précisément pourquoi les fiches 53 et 57 doivent ajouter GARCH et les sauts.

## 🔴 Concept 5 — Le maximum courant et le principe de réflexion

> **La question du cours.** *Supposons qu'on utilise le mouvement brownien comme modèle du prix quotidien d'une action. Quelle est la loi de l'**amplitude de la journée** — la valeur maximale et minimale sur une journée ?*

On définit le **maximum courant**

$$M(t)=\max_{0\leq s\leq t}B(s)$$

bien défini puisque $B$ est **continue** et $[0,t]$ **compact**. On note $\Phi$ la fonction de répartition de la loi normale standard.

<div class="callout" data-kind="formel">

<span class="callout__lab">Proposition 2.3.</span>

$$\boxed{\ \mathbb P\big(M(t)\geq a\big)=2\,\mathbb P\big(B(t)>a\big)=2-2\Phi\Big(\frac{a}{\sqrt t}\Big)\ }$$

</div>

**Démonstration.** Soit $\tau_a=\min_s\{s:B(s)=a\}$ ; c'est un **temps d'arrêt** (fiche 61). Pour tous $0\leq s<t$,

$$\mathbb P\big(B(t)-B(s)>0\big)=\mathbb P\big(B(t)-B(s)<0\big)$$

par symétrie de la loi normale centrée. On en déduit

$$\mathbb P\big(B(t)-B(\tau_a)>0\ \big\vert\ \tau_a<t\big)=\mathbb P\big(B(t)-B(\tau_a)<0\ \big\vert\ \tau_a<t\big)$$

> *On a supposé ici que la loi de $B(t)-B(\tau_a)$ **n'est pas affectée** par le conditionnement sur $\{\tau_a<t\}$. C'est ce qu'on appelle la **propriété de Markov forte** du mouvement brownien.*

Comme $B(\tau_a)=a$ par continuité, cela se réécrit

$$\mathbb P\big(B(t)>a\mid\tau_a<t\big)=\mathbb P\big(B(t)<a\mid\tau_a<t\big)=\tfrac12$$

*ce qu'on appelle aussi le **principe de réflexion**.*

**Conclusion.** Par continuité, l'événement $\{B(t)>a\}$ **implique** $\{\tau_a<t\}$ — pour dépasser $a$, il faut l'avoir touché. Donc

$$\mathbb P\big(B(t)>a\big)=\mathbb P\big(B(t)>a\mid\tau_a<t\big)\cdot\mathbb P(\tau_a<t)=\tfrac12\,\mathbb P\big(M(t)\geq a\big)$$

d'où $\mathbb P(M(t)\geq a)=2\mathbb P(B(t)>a)$. Et comme $B(t)\sim N(0,t)$ :

$$\mathbb P\big(B(t)>a\big)=1-\Phi\Big(\frac{a}{\sqrt t}\Big) \qquad\Longrightarrow\qquad \mathbb P\big(M(t)\geq a\big)=2-2\Phi\Big(\frac{a}{\sqrt t}\Big) \qquad\blacksquare$$

> **L'idée du principe de réflexion, en une image.** Une fois que la trajectoire a **touché** le niveau $a$, elle repart « de zéro » depuis $a$ — c'est la propriété de Markov forte. Par symétrie, elle a **autant de chances** de finir au-dessus qu'en dessous de $a$. À chaque trajectoire finissant en dessous correspond donc, par **réflexion** autour du niveau $a$ après $\tau_a$, une trajectoire finissant au-dessus, et **réciproquement**. D'où le facteur $2$.

⚠️ **La propriété de Markov forte est une hypothèse forte, et le cours le signale honnêtement** (*« on a supposé ici que… »*). La propriété de Markov ordinaire vaut à un instant **déterministe** ; la version **forte** l'étend aux temps d'**arrêt** — donc à des instants aléatoires. Elle est vraie pour le brownien, mais elle demande une démonstration.

> **L'usage financier direct.** Cette formule donne le prix des **options barrière** : « payer si l'actif a touché $a$ à un moment quelconque avant $T$ ». Ces produits dépendent du **chemin entier**, pas seulement du prix final — d'où la nécessité de connaître la loi de $M(t)$ et non seulement celle de $B(t)$.

## 🔴 Concept 6 — La non-dérivabilité

<div class="callout" data-kind="formel">

<span class="callout__lab">Proposition 2.4.</span>

*Pour chaque $t\geq0$, le mouvement brownien est **presque sûrement non dérivable** en $t$.*

</div>

**Démonstration.** Fixons $t_0$ et supposons $B$ dérivable en $t_0$. Alors il existe des constantes $A$ et $\varepsilon_0$ telles que, pour tout $0<\varepsilon<\varepsilon_0$,

$$B(t)-B(t_0)\leq A\varepsilon \qquad\text{pour tout } 0<t-t_0\leq\varepsilon$$

Notons $E_{\varepsilon,A}$ cet événement et $E_A=\bigcup_\varepsilon E_{\varepsilon,A}$. Alors

$$\mathbb P(E_{\varepsilon,A})=\mathbb P\big(M(\varepsilon)\leq A\varepsilon\big)=1-\Big[2-2\Phi\big(A\sqrt\varepsilon\big)\Big]=2\Phi\big(A\sqrt\varepsilon\big)-1$$

en appliquant la proposition 2.3 avec $a=A\varepsilon$, puisque $\frac{A\varepsilon}{\sqrt\varepsilon}=A\sqrt\varepsilon$. Le membre de droite **tend vers zéro** quand $\varepsilon\to0$, car $\Phi(0)=\frac12$. Donc $\mathbb P(E_A)=0$, et par **additivité dénombrable** il ne peut exister aucune constante $A$ vérifiant ce qui précède — il suffit de considérer les valeurs entières de $A$. $\blacksquare$

> **Le cœur de l'argument tient dans un rapport d'échelles.** Être dérivable, c'est être borné par $A\varepsilon$ — **linéairement** — sur un petit intervalle de longueur $\varepsilon$. Or le brownien fluctue d'un ordre $\sqrt\varepsilon$. Le rapport
>
> $$\frac{A\varepsilon}{\sqrt\varepsilon}=A\sqrt\varepsilon\ \longrightarrow\ 0$$
>
> signifie que la contrainte de dérivabilité devient **infiniment plus serrée** que les fluctuations réelles. Aucune trajectoire n'y résiste.

> **Le résultat plus fort.** *Dvoretsky, Erdős et Kakutani ont en fait démontré un énoncé plus fort : le mouvement brownien est **nulle part dérivable avec probabilité $1$**. Donc une trajectoire brownienne est **continue mais nulle part dérivable** !* La démonstration est un peu plus délicate et demande le **lemme de Borel-Cantelli**.

⚠️ **Ne confondez pas les deux énoncés.** La proposition 2.4 dit : *pour chaque $t$ fixé*, non-dérivabilité presque sûre — l'ensemble exceptionnel dépend de $t$. Dvoretsky-Erdős-Kakutani dit : *presque sûrement, pour tout $t$* — un seul ensemble exceptionnel, de probabilité nulle. Le second est strictement plus fort, et c'est lui qui justifie la phrase d'ouverture de la fiche 56 : *une trajectoire brownienne est nulle part dérivable avec probabilité $1$*.

## 🔴 Concept 7 — La variation quadratique

<div class="callout" data-kind="formel">

<span class="callout__lab">Théorème 2.5 (variation quadratique).</span>

*Pour une partition $\Pi=\{t_0,t_1,\dots,t_j\}$ d'un intervalle $[0,T]$, notons $\lvert\Pi\rvert=\max_i(t_{i+1}-t_i)$. Un mouvement brownien $B_t$ satisfait, avec probabilité $1$ :*

$$\boxed{\ \lim_{\lvert\Pi\rvert\to0}\sum_i\big(B_{t_{i+1}}-B_{t_i}\big)^2=T\ }$$

</div>

**Démonstration** (cas des pas uniformes). La somme

$$\sum_i\big(B_{t_{i+1}}-B_{t_i}\big)^2$$

est une **somme de variables aléatoires i.i.d.** de moyenne $t_{i+1}-t_i$ — puisque $B_{t_{i+1}}-B_{t_i}\sim N(0,t_{i+1}-t_i)$ — et de **moment d'ordre 2 fini**. Par la **loi des grands nombres**, quand $\max_i\{t_{i+1}-t_i\}\to0$,

$$\sum_i\big(B_{t_{i+1}}-B_{t_i}\big)^2=T$$

avec probabilité $1$. $\blacksquare$

### Pourquoi ce théorème est remarquable

> *Supposons qu'au lieu d'un mouvement brownien on prenne une fonction $f$ **continûment dérivable**. Alors*
>
> $$\sum_i\big\lvert f(t_{i+1})-f(t_i)\big\rvert^2=\sum_i(t_{i+1}-t_i)^2f'(s_i)^2\leq\max_{s\in[0,T]}f'(s)^2\cdot\sum_i(t_{i+1}-t_i)^2$$
>
> $$\leq\max_{s\in[0,T]}f'(s)^2\cdot\max_i\{t_{i+1}-t_i\}\cdot T$$
>
> *Quand $\max_i\{t_{i+1}-t_i\}\to0$, cette quantité **tend vers zéro**.*

> *Cela montre donc que **le mouvement brownien fluctue beaucoup**. Ce qui précède se résume par l'équation différentielle*
>
> $$\boxed{\ (dB)^2=dt\ }$$
>
> *Comme on le verra au cours suivant, ce fait aura des implications très intéressantes.*

⚠️ **Voici la justification rigoureuse de la règle posée en fiche 56.** Le contraste est complet :

|  | Fonction $C^1$ | Mouvement brownien |
|---|---|---|
| Variation quadratique sur $[0,T]$ | $\to0$ | $=T$ |
| Ordre de $\lvert\Delta f\rvert$ | $\Delta t$ | $\sqrt{\Delta t}$ |
| $\sum(\Delta f)^2$ | $\sum(\Delta t)^2\to0$ | $\sum\Delta t=T$ |

Pour une fonction ordinaire, élever au carré tue tout : $(\Delta t)^2$ sommé sur $1/\Delta t$ termes donne $\Delta t\to0$. Pour le brownien, $(\sqrt{\Delta t})^2=\Delta t$ sommé sur $1/\Delta t$ termes donne **exactement $T$**. Le carré des accroissements ne disparaît pas — il **s'accumule en temps**.

> **Et c'est de là que sort tout le calcul d'Itô.** Le terme de second ordre du développement de Taylor, négligeable partout ailleurs, survit ici, produit le terme $\frac12f''\,dt$ du lemme d'Itô, puis le $-\sigma^2/2$ de Black-Scholes.

## 🟡 Concept 8 — Le brownien avec dérive

**Exemple 2.6.** Soit $B(t)$ un mouvement brownien et $\mu$ un réel fixé. Le processus

$$X(t)=B(t)+\mu t$$

s'appelle **mouvement brownien de dérive $\mu$**. Par définition, $E[X(t)]=\mu t$.

> **La question du cours.** *Avec le temps qui passe, quel terme va **dominer** : $B(t)$ ou $\mu t$ ?*
>
> **La réponse.** *On peut montrer que $\mu t$ **domine** le comportement de $X(t)$. Par exemple, pour tout $\varepsilon>0$ fixé, après un temps suffisamment long, le mouvement brownien sera **toujours** compris entre les droites $y=(\mu-\varepsilon)t$ et $y=(\mu+\varepsilon)t$.*

> **C'est encore l'échelle $\sqrt t$ qui décide.** Le terme de dérive croît en $t$, le bruit en $\sqrt t$. Le rapport $\frac{B(t)}{\mu t}\sim\frac{\sqrt t}{\mu t}=\frac{1}{\mu\sqrt t}\to0$ : à long terme, **la dérive gagne toujours**, aussi petite soit-elle.
>
> **La leçon financière** est celle de la fiche 61 : *si l'on a un avantage sur son adversaire, aussi petit soit-il, on gagnera à long terme*. Mais « à long terme » peut être très long : il faut $t\gg1/\mu^2$ pour que la dérive émerge du bruit. C'est pourquoi distinguer le talent de la chance dans une performance de gestion demande des décennies de données.

## 🟠 Concept 9 — Vers le calcul stochastique

> *Quel est le principal avantage du monde continu sur le monde discret ? La beauté, bien sûr. Un avantage plus pratique est la **puissante boîte à outils du calcul différentiel**. Malheureusement, nous avons vu qu'il est **impossible de dériver** le mouvement brownien. De façon surprenante, il existe une théorie du **calcul généralisé** capable de traiter les mouvements browniens et d'autres processus à temps continu.*

**La question finale du cours.** *Comme discuté au cours précédent, pour modéliser le prix d'une action, il est plus raisonnable de supposer que la **variation en pourcentage** suit une loi normale. Cela s'écrit sous la forme de l'équation différentielle*

$$dS_t=\sigma S_t\,dB_t$$

*Peut-on écrire la loi de $S_t$ en fonction de celle de $B_t$ ? Est-ce $S_t=e^{\sigma B_t}$ ? **De façon surprenante, la réponse est non.***

> **La réponse est dans la fiche 56.** Ce n'est pas $e^{\sigma B_t}$ mais
>
> $$S_t=\exp\Big(-\tfrac12\sigma^2t+\sigma B_t\Big)$$
>
> l'**exponentielle stochastique**. Le terme correctif $-\frac12\sigma^2t$ est exactement le terme d'Itô, produit par la règle $(dB)^2=dt$ démontrée au concept 7.
>
> **Vérifiez que $e^{\sigma B_t}$ ne peut pas convenir** : son espérance vaut $E[e^{\sigma B_t}]=e^{\sigma^2t/2}$, qui **croît**. Or $dS_t=\sigma S_t\,dB_t$ n'a aucun terme en $dt$ : le processus doit être une martingale, donc d'espérance **constante**. Le facteur $e^{-\sigma^2t/2}$ est précisément ce qui rétablit $E[S_t]=1$.

## Comment résoudre l'exercice type (protocole)

1. **Vérifier les trois propriétés** : $B(0)=0$, accroissements $N(0,t-s)$, indépendance sur intervalles disjoints.
2. **Ramener toute loi à un accroissement** : $B(t)-B(s)\sim N(0,t-s)$ et se normaliser en $\frac{B(t)-B(s)}{\sqrt{t-s}}\sim N(0,1)$.
3. **Pour une question sur le maximum ou une barrière** : appliquer le **principe de réflexion**, $\mathbb P(M(t)\geq a)=2-2\Phi(a/\sqrt t)$.
4. **Pour une question de régularité** : rappeler que le brownien est continu mais **nulle part dérivable**.
5. **Pour une somme de carrés d'accroissements** : c'est la **variation quadratique**, elle vaut $T$.
6. **Pour une différentielle** : appliquer $(dB)^2=dt$, $dt\,dB=0$, $(dt)^2=0$, puis le lemme d'Itô (fiche 56).
7. **Pour un comportement de long terme** : comparer les ordres $t$ (dérive) et $\sqrt t$ (bruit) — la dérive gagne toujours.

### Comment reconnaître qu'il faut utiliser cette méthode ?

| Indice dans l'énoncé | Ce qu'il faut faire |
|---|---|
| « accroissements indépendants et gaussiens » | **mouvement brownien** |
| « limite de marches aléatoires » | normalisation en $\sqrt n$ |
| « maximum sur $[0,t]$ », « a-t-il touché $a$ ? » | **principe de réflexion** |
| « option barrière » | loi de $M(t)$, pas seulement de $B(t)$ |
| « la trajectoire est-elle dérivable ? » | **non**, nulle part |
| « somme des carrés des accroissements » | **variation quadratique** $=T$ |
| « comparer dérive et bruit » | $t$ contre $\sqrt t$ — la dérive domine |
| « solution de $dS=\sigma S\,dB$ » | $\exp(-\frac12\sigma^2t+\sigma B_t)$, **pas** $e^{\sigma B_t}$ |

### Exercices progressifs

**Niveau 1** — Calculez $\mathbb P(B(4)>3)$ et $\mathbb P(M(4)\geq3)$.

<details><summary>Correction</summary>

**La loi de $B(4)$.** Par la propriété (ii) avec $s=0$ : $B(4)-B(0)=B(4)\sim N(0,4)$, donc $\frac{B(4)}{2}\sim N(0,1)$.

**Première probabilité.**

$$\mathbb P\big(B(4)>3\big)=\mathbb P\Big(\frac{B(4)}{2}>1{,}5\Big)=1-\Phi(1{,}5)\approx1-0{,}9332=\mathbf{0{,}0668}$$

**Deuxième probabilité**, par le principe de réflexion :

$$\mathbb P\big(M(4)\geq3\big)=2\,\mathbb P\big(B(4)>3\big)=2\times0{,}0668=\mathbf{0{,}1336}$$

ou directement $2-2\Phi(3/\sqrt4)=2-2\Phi(1{,}5)=2-1{,}8664=0{,}1336$.

**L'interprétation.** Il y a **deux fois plus** de chances que le brownien ait **touché** $3$ à un moment donné avant $t=4$ que de chances qu'il s'y **trouve** en $t=4$. C'est logique : beaucoup de trajectoires touchent $3$ puis redescendent.

**Et le facteur exactement $2$** vient de la symétrie : après avoir touché $3$, la trajectoire a exactement une chance sur deux de finir au-dessus.

</details>

**Niveau 2** — Pourquoi le brownien n'est-il pas dérivable ? Donnez l'argument d'échelle.

<details><summary>Correction</summary>

**L'argument d'échelle, en trois lignes.**

- Être **dérivable** en $t_0$ signifie que l'accroissement est borné **linéairement** : $\lvert B(t_0+\varepsilon)-B(t_0)\rvert\leq A\varepsilon$ pour un $A$ fixé et $\varepsilon$ petit.
- Or l'accroissement est de loi $N(0,\varepsilon)$, donc d'ordre de grandeur $\sqrt\varepsilon$.
- Le rapport $\dfrac{A\varepsilon}{\sqrt\varepsilon}=A\sqrt\varepsilon\to0$ : la contrainte de dérivabilité devient **infiniment plus serrée** que les fluctuations réelles.

**La formalisation du cours.** Avec $E_{\varepsilon,A}$ l'événement « $B(t)-B(t_0)\leq A\varepsilon$ pour tout $0<t-t_0\leq\varepsilon$ », le principe de réflexion donne

$$\mathbb P(E_{\varepsilon,A})=\mathbb P\big(M(\varepsilon)\leq A\varepsilon\big)=2\Phi(A\sqrt\varepsilon)-1\ \xrightarrow[\varepsilon\to0]{}\ 2\Phi(0)-1=0$$

Donc $\mathbb P(E_A)=0$ pour chaque $A$, et par additivité dénombrable sur les $A$ entiers, la dérivabilité est de probabilité nulle. $\blacksquare$

**La leçon.** La non-dérivabilité n'est pas une pathologie exotique : c'est la **conséquence directe** de l'échelle $\sqrt t$, elle-même conséquence directe du théorème central limite. Un processus à accroissements indépendants de variance proportionnelle au temps **ne peut pas** être dérivable.

**Et c'est bien pourquoi le calcul d'Itô existe** (fiche 56) : $dB_t/dt$ n'existant pas, il faut une théorie qui décrive $df$ en termes de $dB_t$ plutôt que de $dB_t/dt$.

</details>

**Niveau 3** — Démontrez que la variation quadratique d'une fonction $C^1$ est nulle, et concluez.

<details><summary>Correction</summary>

**Le calcul.** Par le théorème des accroissements finis, il existe $s_i\in[t_i,t_{i+1}]$ tel que $f(t_{i+1})-f(t_i)=(t_{i+1}-t_i)f'(s_i)$. Donc

$$\sum_i\big\lvert f(t_{i+1})-f(t_i)\big\rvert^2=\sum_i(t_{i+1}-t_i)^2f'(s_i)^2\leq\max_{s\in[0,T]}f'(s)^2\cdot\sum_i(t_{i+1}-t_i)^2$$

Puis, en majorant un facteur de chaque carré par le pas maximal :

$$\sum_i(t_{i+1}-t_i)^2\leq\max_i\{t_{i+1}-t_i\}\cdot\sum_i(t_{i+1}-t_i)=\lvert\Pi\rvert\cdot T$$

d'où

$$\sum_i\big\lvert f(t_{i+1})-f(t_i)\big\rvert^2\leq\max_{s\in[0,T]}f'(s)^2\cdot\lvert\Pi\rvert\cdot T\ \xrightarrow[\lvert\Pi\rvert\to0]{}\ 0$$

$f'$ étant continue sur le compact $[0,T]$, son maximum est fini. $\blacksquare$

**Le contraste avec le brownien.** Le théorème 2.5 donne $\sum_i(B_{t_{i+1}}-B_{t_i})^2\to T\neq0$.

|  | $C^1$ | Brownien |
|---|---|---|
| $\lvert\Delta f\rvert$ | $\sim\Delta t$ | $\sim\sqrt{\Delta t}$ |
| $(\Delta f)^2$ | $\sim(\Delta t)^2$ | $\sim\Delta t$ |
| Somme sur $\sim1/\Delta t$ termes | $\sim\Delta t\to0$ | $\sim T$ |

**La conclusion, et c'est tout le sujet.** Le brownien **fluctue beaucoup** — assez pour que le carré de ses accroissements s'accumule au lieu de disparaître. C'est ce que résume $(dB)^2=dt$ : dans un développement de Taylor, le terme de second ordre **survit** au passage à la limite. C'est la seule différence entre le calcul d'Itô et le calcul ordinaire, et elle suffit à engendrer le lemme d'Itô, l'exponentielle stochastique et Black-Scholes.

**Un corollaire à mentionner.** Comme la variation quadratique est non nulle, la **variation totale** $\sum\lvert B_{t_{i+1}}-B_{t_i}\rvert$ est **infinie**. C'est pour cela qu'on ne peut pas définir $\int f\,dB$ comme une intégrale de Stieltjes ordinaire — il faut la construction $L^2$ et l'isométrie d'Itô de la fiche 56.

</details>

**Niveau 4 — type examen** — Énoncez et démontrez le principe de réflexion, puis donnez une application financière.

<details><summary>Correction</summary>

**Énoncé (proposition 2.3).** Avec $M(t)=\max_{0\leq s\leq t}B(s)$ :

$$\mathbb P\big(M(t)\geq a\big)=2\,\mathbb P\big(B(t)>a\big)=2-2\Phi\Big(\frac{a}{\sqrt t}\Big)$$

**Démonstration.**

*Étape 1 — le temps d'atteinte.* Soit $\tau_a=\min_s\{s:B(s)=a\}$. C'est un **temps d'arrêt** : savoir qu'on a touché $a$ avant $s$ ne demande que d'observer la trajectoire jusqu'à $s$ (fiche 61).

*Étape 2 — la symétrie.* Pour $0\leq s<t$, $B(t)-B(s)\sim N(0,t-s)$ est de loi **symétrique**, donc

$$\mathbb P\big(B(t)-B(s)>0\big)=\mathbb P\big(B(t)-B(s)<0\big)=\tfrac12$$

*Étape 3 — la propriété de Markov forte.* On étend cette symétrie à l'instant **aléatoire** $\tau_a$ :

$$\mathbb P\big(B(t)-B(\tau_a)>0\mid\tau_a<t\big)=\mathbb P\big(B(t)-B(\tau_a)<0\mid\tau_a<t\big)=\tfrac12$$

Le cours signale que c'est une hypothèse : *on a supposé que la loi de $B(t)-B(\tau_a)$ n'est pas affectée par le conditionnement*. C'est la **propriété de Markov forte** — vraie pour le brownien, mais qui demande une preuve.

*Étape 4 — la conclusion.* Comme $B(\tau_a)=a$ par continuité, l'étape 3 se lit

$$\mathbb P\big(B(t)>a\mid\tau_a<t\big)=\tfrac12$$

Par continuité encore, $\{B(t)>a\}\subset\{\tau_a<t\}$ : pour dépasser $a$, il faut l'avoir touché. Donc

$$\mathbb P\big(B(t)>a\big)=\mathbb P\big(B(t)>a\mid\tau_a<t\big)\cdot\mathbb P(\tau_a<t)=\tfrac12\,\mathbb P\big(M(t)\geq a\big)$$

et $B(t)\sim N(0,t)$ donne $\mathbb P(B(t)>a)=1-\Phi(a/\sqrt t)$, d'où le résultat. $\blacksquare$

**L'image à retenir.** À chaque trajectoire qui touche $a$ puis **finit en dessous**, on associe son image **réfléchie** autour du niveau $a$ après $\tau_a$, qui finit **au-dessus**. La correspondance est bijective et préserve la probabilité — d'où le facteur exactement $2$.

**Les applications financières.**

**1. Les options barrière.** Un *knock-out* cesse d'exister si le sous-jacent touche une barrière ; un *knock-in* n'existe que s'il la touche. Leur valorisation demande **exactement** $\mathbb P(M(t)\geq a)$ — la loi du prix final ne suffit pas, il faut la loi du **maximum sur le chemin**. C'est le premier exemple de produit véritablement **dépendant du chemin**.

**2. La probabilité de ruine et les appels de marge.** « Quelle est la probabilité que mon portefeuille perde $20\,\%$ **à un moment quelconque** de l'année ? » n'est pas « quelle est la probabilité qu'il ait perdu $20\,\%$ **à la fin** de l'année ». Le principe de réflexion dit que la première est environ **deux fois** la seconde. Un investisseur qui ne raisonne que sur la valeur finale sous-estime d'un facteur $2$ le risque de déclencher un appel de marge ou une clause de sauvegarde.

**3. Le calibrage des seuils de risque.** Une VaR calculée sur la valeur de fin de période (fiche 55) ignore le chemin. La VaR « intra-période » lui est supérieure d'un facteur voisin de $2$ dans le cas gaussien sans dérive.

**La limite du résultat, qu'il faut mentionner.** Il vaut pour un brownien **sans dérive**. Avec une dérive $\mu$, la formule se complique — elle fait intervenir un second terme exponentiel — mais la méthode reste la même : réflexion plus changement de mesure de Girsanov (fiche 56) pour éliminer la dérive.

</details>

## 🔴 Common mistakes

1. **Oublier que la variance de $B(t)-B(s)$ est $t-s$ et non $1$** — il faut normaliser par $\sqrt{t-s}$.
2. **Oublier la normalisation en $\sqrt n$** dans la limite de marches aléatoires — sans elle, aucune limite non triviale.
3. **Confondre $\mathbb P(B(t)>a)$ et $\mathbb P(M(t)\geq a)$** — la seconde vaut **deux fois** la première.
4. **Appliquer le principe de réflexion à un brownien avec dérive** — il vaut pour le brownien standard.
5. **Croire que le brownien est dérivable « presque partout »** — il n'est dérivable **nulle part**.
6. **Confondre les deux énoncés de non-dérivabilité** — « pour chaque $t$, p.s. » (prop. 2.4) est plus faible que « p.s., pour tout $t$ » (Dvoretsky-Erdős-Kakutani).
7. **Croire que la variation quadratique est nulle** — elle vaut $T$, et c'est tout l'objet du chapitre.
8. **Confondre variation quadratique et variation totale** — la première vaut $T$, la seconde est **infinie**.
9. **Écrire $S_t=e^{\sigma B_t}$** pour $dS_t=\sigma S_t\,dB_t$ — il manque $-\frac12\sigma^2t$.
10. **Croire que le bruit domine la dérive à long terme** — c'est l'inverse : $\sqrt t$ contre $t$.

## 📌 Ultimate Review

1. **En temps continu**, on ne peut pas décrire la loi par les accroissements ; on **énonce les propriétés** puis on démontre l'existence.
2. **Cadre formel** : $(\Omega,\mathbb P)$, $X:\Omega\to\{$fonctions sur $[0,\infty)\}$, $\mathbb P(X^{-1}(A))$ ; l'univers abstrait sert au **changement de mesure**.
3. **Théorème 2.1** — le brownien standard existe, à trajectoires **continues**, avec : $B(0)=0$ · $B(t)-B(s)\sim N(0,t-s)$ · accroissements **indépendants** sur intervalles disjoints.
4. **Noms** : processus de **Wiener** (MIT) ; première application par **Bachelier (1900)** ; explication physique par **Einstein (1905)** du phénomène observé par **Brown (1827)**.
5. **Limite de marches aléatoires** : $Z(t/n)=Y_t/\sqrt n$, affine par morceaux ; $Z(1)\to N(0,1)$ par le TCL, $Z(t)\to N(0,t)$.
6. **Trois faits** : traverse l'axe une **infinité** de fois · reste proche de la courbe $x=y^2$ (échelle $\sqrt t$) · **nulle part dérivable**.
7. **Maximum courant** : $M(t)=\max_{0\leq s\leq t}B(s)$, bien défini par continuité sur un compact.
8. **Principe de réflexion** : $\mathbb P(M(t)\geq a)=2\mathbb P(B(t)>a)=2-2\Phi(a/\sqrt t)$.
9. **Sa preuve** : $\tau_a$ temps d'arrêt · symétrie de l'accroissement · **propriété de Markov forte** · $\{B(t)>a\}\subset\{\tau_a<t\}$.
10. **Proposition 2.4** : pour chaque $t$, $B$ est p.s. non dérivable ; $\mathbb P(E_{\varepsilon,A})=2\Phi(A\sqrt\varepsilon)-1\to0$.
11. **L'argument d'échelle** : $A\varepsilon/\sqrt\varepsilon=A\sqrt\varepsilon\to0$ — la contrainte linéaire est trop serrée pour des fluctuations en $\sqrt\varepsilon$.
12. **Dvoretsky, Erdős et Kakutani** : p.s. **nulle part** dérivable ; preuve par **Borel-Cantelli**.
13. **Théorème 2.5** : $\lim_{\lvert\Pi\rvert\to0}\sum_i(B_{t_{i+1}}-B_{t_i})^2=T$ p.s., par la **loi des grands nombres**.
14. **Contraste $C^1$** : $\sum\lvert f(t_{i+1})-f(t_i)\rvert^2\leq\max f'^2\cdot\lvert\Pi\rvert\cdot T\to0$.
15. **Conclusion** : $(dB)^2=dt$ — la règle fondatrice du calcul d'Itô (fiche 56).
16. **Brownien avec dérive** : $X(t)=B(t)+\mu t$, $E[X(t)]=\mu t$ ; **$\mu t$ domine** ; asymptotiquement entre $(\mu-\varepsilon)t$ et $(\mu+\varepsilon)t$.
17. **Question finale** : la solution de $dS_t=\sigma S_t\,dB_t$ **n'est pas** $e^{\sigma B_t}$ mais $\exp(-\frac12\sigma^2t+\sigma B_t)$.

**Formulas to know**

$$B(t)-B(s)\sim N(0,t-s) \qquad Z(t/n)=Y_t/\sqrt n \qquad M(t)=\max_{0\leq s\leq t}B(s)$$

$$\mathbb P\big(M(t)\geq a\big)=2\mathbb P\big(B(t)>a\big)=2-2\Phi\Big(\frac{a}{\sqrt t}\Big) \qquad \lim_{\lvert\Pi\rvert\to0}\sum_i(B_{t_{i+1}}-B_{t_i})^2=T$$

$$(dB)^2=dt \qquad X(t)=B(t)+\mu t \qquad S_t=\exp\big(-\tfrac12\sigma^2t+\sigma B_t\big)$$

**Methods to know** : la preuve du principe de réflexion en quatre étapes ; l'argument d'échelle de la non-dérivabilité ; le calcul de la variation quadratique d'une fonction $C^1$ ; la comparaison $t$ contre $\sqrt t$.

## 🧠 Active Recall

**Basic** — Donnez les trois propriétés définissant le mouvement brownien standard.

<details><summary>Réponse</summary>

Il existe une loi sur les fonctions **continues** $B:\mathbb R\to\mathbb R$ telle que : **(i)** $B(0)=0$ ; **(ii) stationnarité** : pour $0\leq s<t$, $B(t)-B(s)\sim N(0,t-s)$ ; **(iii) accroissements indépendants** : les $B(t_i)-B(s_i)$ sont mutuellement indépendants si les intervalles $[s_i,t_i]$ ne se recouvrent pas.

⚠️ Ce sont **exactement** les trois propriétés de la marche aléatoire simple (fiche 61) — moyenne nulle, indépendance, stationnarité des accroissements — avec en plus la spécification **gaussienne** de la loi, que le théorème central limite impose de toute façon à la limite.

</details>

**Understanding** — Que dit le théorème de variation quadratique, et pourquoi est-il central ?

<details><summary>Réponse</summary>

**L'énoncé.** Pour toute suite de partitions de $[0,T]$ de pas $\lvert\Pi\rvert\to0$ :

$$\sum_i\big(B_{t_{i+1}}-B_{t_i}\big)^2\ \longrightarrow\ T \qquad \text{avec probabilité } 1$$

**La preuve.** La somme est une somme de variables i.i.d. de moyenne $t_{i+1}-t_i$ (car $B_{t_{i+1}}-B_{t_i}\sim N(0,t_{i+1}-t_i)$) et de moment d'ordre 2 fini ; la **loi des grands nombres** donne la convergence vers $\sum_i(t_{i+1}-t_i)=T$.

**Pourquoi c'est central.** Pour une fonction $C^1$, la même somme **tend vers zéro** :

$$\sum_i\lvert f(t_{i+1})-f(t_i)\rvert^2\leq\max f'^2\cdot\lvert\Pi\rvert\cdot T\to0$$

Le brownien **fluctue assez** pour que le carré des accroissements s'accumule au lieu de disparaître. Cela se résume par

$$(dB)^2=dt$$

C'est la **règle fondatrice** du calcul d'Itô : le terme de second ordre du développement de Taylor survit, produit le terme $\frac12f''dt$ du lemme d'Itô, puis le $-\sigma^2/2$ de Black-Scholes.

</details>

**Application** — Quelle est la probabilité qu'un brownien touche le niveau $2$ avant $t=1$ ?

<details><summary>Réponse</summary>

C'est $\mathbb P(M(1)\geq2)$, donné par le principe de réflexion :

$$\mathbb P\big(M(1)\geq2\big)=2-2\Phi\Big(\frac{2}{\sqrt1}\Big)=2-2\Phi(2)=2-2\times0{,}9772=\mathbf{0{,}0456}$$

soit environ **$4{,}6\,\%$**.

**À comparer** avec $\mathbb P(B(1)>2)=1-\Phi(2)=0{,}0228$, soit $2{,}3\,\%$ : il y a **deux fois plus** de chances de **toucher** $2$ que de s'y **trouver** à la fin.

**Pourquoi.** Beaucoup de trajectoires touchent $2$ puis redescendent ; par la propriété de Markov forte, elles ont exactement une chance sur deux de finir de chaque côté.

⚠️ **C'est un calcul d'option barrière**, et une correction de risque essentielle : un investisseur qui ne raisonne que sur la valeur de fin de période **sous-estime d'un facteur $2$** la probabilité de franchir un seuil critique en cours de route.

</details>

**Comparison** — Marche aléatoire et mouvement brownien : que garde-t-on, qu'ajoute-t-on ?

<details><summary>Réponse</summary>

|  | **Marche aléatoire** (fiche 61) | **Mouvement brownien** |
|---|---|---|
| Temps | discret | **continu** |
| Accroissements | $Y_i=\pm1$ i.i.d. centrées | $N(0,t-s)$ |
| Moyenne nulle | oui | oui |
| Accroissements indépendants | oui | oui |
| Accroissements stationnaires | oui | oui |
| Dérivabilité | sans objet | **nulle part** |
| Variation quadratique | — | **$=T$** |
| Trajectoires | escalier | **continues** partout |

**Ce qu'on garde** : les trois propriétés structurelles. Le lien est explicite — $Z(t/n)=Y_t/\sqrt n$ converge en loi vers le brownien, par le théorème central limite.

**Ce qu'on ajoute** : la **continuité** des trajectoires, et avec elle deux phénomènes qui n'ont aucun analogue discret — la **non-dérivabilité** et la **variation quadratique** égale à $T$. Ce sont eux qui rendent nécessaire, et possible, le calcul d'Itô.

**Ce qu'on perd** : la possibilité de tout calculer élémentairement. En discret, une somme finie suffit ; en continu, il faut la théorie de la mesure — ce que le cours reconnaît d'emblée en admettant l'existence sans la démontrer.

</details>

**Exam-style** — Expliquez pourquoi $(dB)^2=dt$ et ce que cela change.

<details><summary>Réponse</summary>

**D'où vient la règle.** Elle est la traduction infinitésimale du **théorème de variation quadratique** :

$$\lim_{\lvert\Pi\rvert\to0}\sum_i\big(B_{t_{i+1}}-B_{t_i}\big)^2=T \qquad \text{p.s.}$$

Autrement dit, la somme des carrés des accroissements **converge vers la longueur de l'intervalle**, et non vers zéro.

**La preuve, en une ligne.** Chaque $(B_{t_{i+1}}-B_{t_i})^2$ est une variable de moyenne $t_{i+1}-t_i$ ; ces variables sont **i.i.d.** par les propriétés (ii) et (iii) ; la **loi des grands nombres** fait converger la somme vers $\sum_i(t_{i+1}-t_i)=T$.

**Le contraste, qui est l'essentiel.** Pour $f$ continûment dérivable,

$$\sum_i\lvert f(t_{i+1})-f(t_i)\rvert^2\leq\max_{[0,T]}f'^2\cdot\lvert\Pi\rvert\cdot T\ \longrightarrow\ 0$$

|  | $C^1$ | Brownien |
|---|---|---|
| $\lvert\Delta f\rvert$ | $\sim\Delta t$ | $\sim\sqrt{\Delta t}$ |
| $(\Delta f)^2$ | $\sim(\Delta t)^2$ | $\sim\Delta t$ |
| Somme ($\sim1/\Delta t$ termes) | $\to0$ | $\to T$ |

**Ce que cela change — trois conséquences en cascade.**

**1. Le lemme d'Itô.** Dans $\Delta f=f'\Delta B+\frac12f''(\Delta B)^2+\cdots$, le terme de second ordre **ne disparaît pas** : il donne $\frac12f''\,dt$. D'où (fiche 56)

$$df(t,X_t)=\Big(\frac{\partial f}{\partial t}+\mu_t\frac{\partial f}{\partial x}+\frac12\sigma_t^2\frac{\partial^2f}{\partial x^2}\Big)dt+\sigma_t\frac{\partial f}{\partial x}dB_t$$

**2. Le $-\sigma^2/2$ partout.** Appliqué à $\log$, concave, le terme d'Itô est **négatif** : la solution de $dS=\sigma S\,dB$ est $\exp(-\frac12\sigma^2t+\sigma B_t)$ et non $e^{\sigma B_t}$ — c'est la question par laquelle le cours se termine, et sa réponse surprenante.

**3. Black-Scholes.** Dans la dérivation de la fiche 57, $(dS)^2=\sigma^2S^2dt$ produit le terme $\frac12\sigma^2S^2\frac{\partial^2f}{\partial S^2}$ de l'EDP. Sans lui, il n'y aurait ni prix d'option ni couverture.

**Le corollaire technique à ajouter.** Variation quadratique non nulle implique **variation totale infinie** : $\sum\lvert B_{t_{i+1}}-B_{t_i}\rvert=\infty$. C'est pourquoi $\int f\,dB$ ne peut **pas** être définie comme une intégrale de Stieltjes ordinaire, et pourquoi il faut la construction $L^2$ fondée sur l'**isométrie d'Itô**.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Pourquoi ne décrit-on pas la loi par les accroissements en continu ? | C'est **impossible** ; on énonce des propriétés puis on prouve l'existence |
| À quoi sert l'univers abstrait $\Omega$ ? | Aux situations à plusieurs processus — **changement de mesure** |
| Propriété (i) du brownien ? | $B(0)=0$ |
| Propriété (ii) ? | $B(t)-B(s)\sim N(0,t-s)$ |
| Propriété (iii) ? | Accroissements **indépendants** sur intervalles disjoints |
| Autre nom du brownien standard ? | Processus de **Wiener** |
| Qui l'a appliqué le premier à la finance ? | **Bachelier**, thèse de 1900 |
| Qui a expliqué le phénomène physique ? | **Einstein**, 1905 — observé par **Brown**, 1827 |
| Normalisation de la marche aléatoire ? | $Z(t/n)=Y_t/\sqrt n$ |
| Vers quoi converge $Z(t)$ ? | $N(0,t)$ |
| Les trois faits sur le brownien ? | Traverse l'axe infiniment souvent · proche de $x=y^2$ · nulle part dérivable |
| Que signifie « proche de $x=y^2$ » ? | L'échelle naturelle est $\lvert B(t)\rvert\approx\sqrt t$ |
| Définition du maximum courant ? | $M(t)=\max_{0\leq s\leq t}B(s)$ |
| Pourquoi $M(t)$ est-il bien défini ? | $B$ **continue** sur le **compact** $[0,t]$ |
| Principe de réflexion ? | $\mathbb P(M(t)\geq a)=2\mathbb P(B(t)>a)=2-2\Phi(a/\sqrt t)$ |
| Quelle propriété la preuve utilise-t-elle ? | La **propriété de Markov forte** |
| Pourquoi le facteur $2$ ? | Après avoir touché $a$, une chance sur deux de finir de chaque côté |
| Que dit la proposition 2.4 ? | Pour chaque $t$, $B$ est **p.s. non dérivable** en $t$ |
| L'argument d'échelle ? | $A\varepsilon/\sqrt\varepsilon=A\sqrt\varepsilon\to0$ |
| Qui a prouvé le résultat fort ? | **Dvoretsky, Erdős et Kakutani** |
| Quel outil leur preuve demande-t-elle ? | Le lemme de **Borel-Cantelli** |
| Théorème de variation quadratique ? | $\lim_{\lvert\Pi\rvert\to0}\sum_i(B_{t_{i+1}}-B_{t_i})^2=T$ |
| Par quel théorème le démontre-t-on ? | La **loi des grands nombres** |
| Variation quadratique d'une fonction $C^1$ ? | **Zéro** |
| Résumé différentiel ? | $(dB)^2=dt$ |
| Variation **totale** du brownien ? | **Infinie** |
| Brownien avec dérive ? | $X(t)=B(t)+\mu t$, $E[X(t)]=\mu t$ |
| Quel terme domine à long terme ? | $\mu t$ — la **dérive** |
| Entre quelles droites finit-il ? | $y=(\mu-\varepsilon)t$ et $y=(\mu+\varepsilon)t$ |
| Solution de $dS_t=\sigma S_t\,dB_t$ ? | $\exp(-\frac12\sigma^2t+\sigma B_t)$, **pas** $e^{\sigma B_t}$ |
