# Fiche 92 — Méthodes numériques : arbres, Monte-Carlo, différences finies

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 20 « Basic Numerical Procedures » |
| **Difficulté** | Must know — les trois outils de tout desk quantitatif |
| **Temps d'étude estimé** | 2 h |
| **Prérequis** | Fiches 85, 86, 87, 89, 90 |
| **Concepts clés** | Arbre binomial CRR, grecques par l'arbre, dividendes en montant, arbre à $p=0{,}5$, arbre trinomial, paramètres dépendant du temps, simulation de Monte-Carlo, erreur type, variables antithétiques, variable de contrôle, échantillonnage préférentiel et stratifié, suites quasi-aléatoires, différences finies implicites et explicites, Crank-Nicolson |
| **Poids à l'examen** | Construire un arbre et **tester l'exercice à chaque nœud** · les **grecques par l'arbre** · l'**erreur type** de Monte-Carlo · l'**équivalence** différences finies explicites / arbre trinomial. |

## 🎯 Vue d'ensemble

```
TROIS OUTILS, TROIS DOMAINES
  ARBRES / DIFF. FINIES   AMÉRICAINES et décisions avant maturité — on remonte le temps
  MONTE-CARLO             payoffs dépendant du CHEMIN, ou PLUSIEURS variables — on avance

ARBRE CRR   u = e^{σ√Δt}   d = 1/u   p = (a−d)/(u−d)   a = e^{(r−q)Δt}
GRECQUES    Δ par les nœuds (1,·) · Γ par les nœuds (2,·) · Θ par f_{2,1} − f_{0,0}
MONTE-CARLO erreur type = ω/√M  →  DOUBLER la précision coûte QUATRE fois plus d'essais
DIFF. FINIES  implicite : robuste, système à résoudre · explicite : ≡ ARBRE TRINOMIAL
```

**Le partage des rôles, énoncé d'entrée.** *Monte-Carlo est habituellement utilisé quand **le payoff dépend de l'historique** de la variable sous-jacente, **ou quand il y a plusieurs variables**. Les arbres et les différences finies sont habituellement utilisés pour les **options américaines** et les dérivés où **le détenteur a des décisions à prendre avant maturité**. **En plus de valoriser un dérivé, toutes ces procédures permettent de calculer les grecques.***

## 🔴 Concept 1 — L'arbre binomial : dérivation complète des paramètres

**Le principe de valorisation risque-neutre.** *(1) Supposer que le rendement espéré de **tous les actifs négociés** est le taux sans risque. (2) Valoriser les payoffs en calculant leur **espérance** et en **actualisant au taux sans risque**.*

<details class="details--riche">
<summary>

**Comment $p$, $u$ et $d$ sont déterminés — les trois conditions**

</summary>

> ***Les paramètres $p$, $u$ et $d$ doivent donner les valeurs correctes de la MOYENNE et de la VARIANCE des variations de prix sur un intervalle $\Delta t$.***

*Étape 1 — la condition de moyenne.* En monde risque-neutre, le rendement espéré est $r$ ; l'actif procurant un rendement $q$, **les plus-values doivent fournir $r-q$**. L'espérance en fin d'intervalle doit donc être $Se^{(r-q)\Delta t}$ :

$$Se^{(r-q)\Delta t}=pSu+(1-p)Sd\quad\Longrightarrow\quad\boxed{e^{(r-q)\Delta t}=pu+(1-p)d}\;\text{(20.1)}$$

*Étape 2 — la condition de variance.* La variance de $1+R$ (où $R$ est le rendement en pourcentage) vaut $pu^2+(1-p)d^2-e^{2(r-q)\Delta t}$. *Comme **ajouter une constante ne change pas la variance**, c'est aussi la variance de $R$, qui vaut $\sigma^2\Delta t$.* En utilisant (20.1) :

$$\boxed{e^{(r-q)\Delta t}(u+d)-ud-e^{2(r-q)\Delta t}=\sigma^2\Delta t}\;\text{(20.2)}$$

*Étape 3 — la troisième condition, choisie par Cox, Ross et Rubinstein (1979).*

$$\boxed{u=1/d}\;\text{(20.3)}$$

*Étape 4 — la solution*, en ignorant les termes d'ordre supérieur à $\Delta t$ :

$$\boxed{p=\frac{a-d}{u-d}\quad u=e^{\sigma\sqrt{\Delta t}}\quad d=e^{-\sigma\sqrt{\Delta t}}\quad a=e^{(r-q)\Delta t}}\;\text{(20.4)-(20.7)}$$

*La variable $a$ s'appelle le **facteur de croissance**.*

⚠️ **La vérification esquissée par Hull.** *(20.4) et (20.7) satisfont **exactement** (20.1) et (20.3). En développant $e^x=1+x+x^2/2+\cdots$ et en ignorant les termes d'ordre supérieur à $\Delta t$, on vérifie que (20.2) est satisfaite.*

</details>

**L'arbre des prix.** *À la date $i\Delta t$, on considère **$i+1$** prix :*

$$\boxed{S_0u^jd^{i-j},\qquad j=0,1,\ldots,i}$$

*La relation $u=1/d$ fait que **l'arbre se recombine** : une hausse suivie d'une baisse donne le même prix qu'une baisse suivie d'une hausse.* (Ainsi $S_0u^2d=S_0u$.)

**La remontée, écrite algébriquement.** Avec $f_{i,j}$ la valeur au nœud $(i,j)$ :

$$f_{N,j}=\max\big(K-S_0u^jd^{N-j},0\big)\quad\text{(put)}$$

$$\boxed{f_{i,j}=\max\Big\{K-S_0u^jd^{i-j},\ e^{-r\Delta t}\big[pf_{i+1,j+1}+(1-p)f_{i+1,j}\big]\Big\}}$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que capture cette récurrence, et c'est plus que ce qu'on croit.</span>

⚠️ *Comme les calculs partent de $T$ et remontent, **la valeur en $i\Delta t$ capture non seulement l'effet des possibilités d'exercice anticipé EN $i\Delta t$, mais aussi celui des exercices à TOUTES les dates ultérieures**.*

</div>

<details class="details--riche">
<summary>

**Exercice résolu — un put américain à cinq pas (exemple 20.1)**

</summary>

**Données.** Put américain **5 mois** sur action sans dividende. $S_0=50$, $K=50$, $r=10\,\%$, $\sigma=40\,\%$, $T=0{,}4167$, $q=0$. **Cinq pas** d'un mois : $\Delta t=0{,}0833$.

*Étape 1 — les paramètres.*

$$u=e^{0{,}4\sqrt{0{,}0833}}=\mathbf{1{,}1224}\quad d=\mathbf{0{,}8909}\quad a=e^{0{,}10\times0{,}0833}=\mathbf{1{,}0084}\quad p=\mathbf{0{,}5073}$$

*Étape 2 — un prix quelconque.* Au nœud $(i=4,j=1)$ : $50\times1{,}1224\times0{,}8909^3=\mathbf{39{,}69}$. *Étape 3 — les payoffs terminaux.* $\max(K-S_T,0)$ ; par exemple $50{,}00-35{,}36=\mathbf{14{,}64}$. *Étape 4 — un nœud où l'on n'exerce PAS (nœud E, $S=50$, $t=4\Delta t$).*

$$(0{,}5073\times0+0{,}4927\times5{,}45)e^{-0{,}10\times0{,}0833}=\mathbf{2{,}66}$$

*L'exercice donnerait **zéro** (cours et strike valent tous deux 50) : **il vaut clairement mieux attendre**.* *Étape 5 — un nœud où l'on exerce (nœud A, $S=39{,}69$, $t=4\Delta t$).*

$$\text{continuation}=(0{,}5073\times5{,}45+0{,}4927\times14{,}64)e^{-0{,}008333}=\mathbf{9{,}90}$$

$$\text{exercice}=50{,}00-39{,}69=\mathbf{10{,}31}\ >\ 9{,}90\ \Longrightarrow\ f=\mathbf{10{,}31}$$

*Étape 6 — le piège : un nœud dans la monnaie où l'on n'exerce PAS (nœud B, $S=39{,}69$, $t=3\Delta t$).*

$$\text{exercice}=10{,}31\qquad \text{continuation}=(0{,}5073\times6{,}38+0{,}4927\times14{,}64)e^{-0{,}008333}=\mathbf{10{,}36}$$

> ⚠️ ***Il n'est PAS toujours optimal d'exercer une option quand elle est dans la monnaie.*** La valeur au nœud est **10,36**.

*Étape 7 — la racine.* $\boxed{\mathbf{4{,}49}}$.

**La convergence.**

| Nombre de pas | 5 | 30 | 50 | 100 | 500 |
|---|---|---|---|---|---|
| Prix | 4,49 | **4,263** | **4,272** | **4,278** | **4,283** |

*En pratique **$N=30$ donne habituellement des résultats raisonnables**.*

</details>

## 🔴 Concept 2 — Les grecques par l'arbre

$$\boxed{\Delta=\frac{f_{1,1}-f_{1,0}}{S_0u-S_0d}}\;\text{(20.8)}$$

$$\boxed{\Gamma=\frac{\dfrac{f_{2,2}-f_{2,1}}{S_0u^2-S_0}-\dfrac{f_{2,1}-f_{2,0}}{S_0-S_0d^2}}{h}}\;\text{(20.9)}\qquad h=0{,}5\big(S_0u^2-S_0d^2\big)$$

$$\boxed{\Theta=\frac{f_{2,1}-f_{0,0}}{2\Delta t}}\;\text{(20.10)}\qquad\qquad \mathcal V=\frac{f^\ast-f}{\Delta\sigma}\ \text{(nouvel arbre)}$$

> **La logique du gamma.** *On a **deux estimations du delta** en $2\Delta t$ : l'une à mi-chemin entre les deuxième et troisième nœuds, l'autre entre les premier et deuxième. **Gamma est la variation du delta divisée par la distance $h$ entre les deux prix**.*

⚠️ **Ces formules donnent le delta en $\Delta t$ et le gamma en $2\Delta t$** — *en pratique, **on les utilise aussi comme estimations en zéro***. Raffinement possible signalé en note : *démarrer l'arbre en $-2\Delta t$ avec le cours $S_0$ à cette date*, ce qui donne trois prix en zéro.

⚠️ **Pour véga et rhô, il faut reconstruire l'arbre** avec un paramètre légèrement modifié — *en gardant **le même nombre de pas***.

<details class="details--riche">
<summary>

**Exercice résolu — les grecques du put de l'exemple 20.1**

</summary>

*Étape 1 — delta*, à partir de $f_{1,0}=6{,}96$ et $f_{1,1}=2{,}16$ :

$$\Delta=\frac{2{,}16-6{,}96}{56{,}12-44{,}55}=\frac{-4{,}80}{11{,}57}=\boxed{\mathbf{-0{,}41}}$$

*Étape 2 — gamma*, à partir des nœuds B, C, F ($62{,}99$ / $50{,}00$ / $39{,}69$ portant $0{,}64$ / $3{,}77$ / $10{,}36$). D'abord $h=0{,}5(62{,}99-39{,}69)=\mathbf{11{,}65}$, puis

$$\Gamma=\frac{\dfrac{0{,}64-3{,}77}{62{,}99-50{,}00}-\dfrac{3{,}77-10{,}36}{50{,}00-39{,}69}}{11{,}65}=\frac{-0{,}2410+0{,}6392}{11{,}65}=\boxed{\mathbf{0{,}03}}$$

*Étape 3 — thêta*, à partir des nœuds D ($3{,}77$) et C ($4{,}49$) :

$$\Theta=\frac{3{,}77-4{,}49}{0{,}1667}=\boxed{\mathbf{-4{,}3}\ \text{par an}}=-0{,}012\ \text{par jour calendaire}$$

*Étape 4 — la mise en garde.* ***Ce ne sont que des estimations grossières. Elles s'améliorent progressivement à mesure que le nombre de pas augmente.*** Avec **50 pas** : delta $\mathbf{-0{,}415}$, gamma $\mathbf{0{,}034}$, thêta $\mathbf{-0{,}0117}$ ; par petites perturbations, véga $\mathbf{0{,}123}$ et rhô $\mathbf{-0{,}072}$.

</details>

## 🟠 Concept 3 — Dividendes, arbres alternatifs, paramètres variables

### 3.1 Les dividendes

| Hypothèse | Traitement | L'arbre recombine ? |
|---|---|---|
| **Rendement continu $q$** | valoriser comme une option sur indice | **oui** |
| **Rendements discrets** connus | $u$, $d$, $p$ calculés **comme s'il n'y avait pas de dividende** ; les nœuds **après** détachement portent $S_0(1-\delta_i)u^jd^{i-j}$, où $\delta_i$ est le **rendement cumulé** de tous les détachements avant $i\Delta t$ | **oui** |
| **Montant en dollars** connu | nœuds avant : $S_0u^jd^{i-j}$ ; **après** : $S_0u^jd^{i-j}-D$ | **NON** |

> ⚠️ **Le problème du dividende en montant.** *Si la volatilité est supposée constante, **l'arbre ne se recombine pas**, ce qui signifie que **le nombre de nœuds à évaluer devient très grand**.* C'est pourquoi, pour les options longues, *on suppose souvent par commodité un **rendement continu***.

### 3.2 L'arbre à probabilités égales

*Au lieu d'imposer $u=1/d$, on peut **poser $p=0{,}5$**.* La solution, aux termes d'ordre supérieur près :

$$\boxed{u=e^{(r-q-\sigma^2/2)\Delta t+\sigma\sqrt{\Delta t}}\qquad d=e^{(r-q-\sigma^2/2)\Delta t-\sigma\sqrt{\Delta t}}}$$

|  | Avantage | Inconvénient |
|---|---|---|
| **$p=0{,}5$** | *les probabilités sont **toujours 0,5**, quels que soient $\sigma$ et le nombre de pas* | *il est **moins direct de calculer delta, gamma et rhô**, car **l'arbre n'est plus centré sur $S_0$*** |

> ⚠️ **Le vrai motif technique, en note de Hull.** *Quand les pas sont si grands que $\sigma<(r-q)\sqrt{\Delta t}$, **l'arbre de Cox-Ross-Rubinstein donne des probabilités NÉGATIVES**. **La procédure alternative n'a pas ce défaut.***

<details class="details--riche">
<summary>

**Exercice résolu — un call américain sur devise avec l'arbre à $p=0{,}5$ (exemple 20.6)**

</summary>

**Données.** Call **9 mois** sur devise. $S_0=0{,}79$, $K=0{,}795$, $r=6\,\%$, $r_f=10\,\%$, $\sigma=4\,\%$, $T=0{,}75$, **trois pas** ($\Delta t=0{,}25$).

*Étape 1 — les deux paramètres.*

$$u=e^{(0{,}06-0{,}10-0{,}0016/2)\times0{,}25+0{,}04\sqrt{0{,}25}}=e^{-0{,}0102+0{,}02}=\mathbf{1{,}0098}$$

$$d=e^{-0{,}0102-0{,}02}=\mathbf{0{,}9703}$$

*Étape 2 — l'arbre des changes.* $0{,}79\to0{,}7978$ ou $0{,}7665$ ; puis $0{,}8056$ / $0{,}7740$ / $0{,}7437$ ; puis $0{,}8136$ / $0{,}7817$ / $0{,}7510$ / $0{,}7216$. *Étape 3 — remonter avec $p=0{,}5$ partout.* Valeur de l'option : $\boxed{\mathbf{0{,}0026}}$.

⚠️ **Ici $u$ et $d$ sont tous deux inférieurs à ce que donnerait CRR** : l'arbre **dérive vers le bas** parce que $r<r_f$. C'est visible dans le fait que $ud=e^{-0{,}0204}<1$ — l'arbre **n'est pas centré** sur 0,79.

</details>

### 3.3 L'arbre trinomial

$$\boxed{u=e^{\sigma\sqrt{3\Delta t}}\qquad d=\frac1u}$$

$$\boxed{p_u=\sqrt{\frac{\Delta t}{12\sigma^2}}\left(r-q-\frac{\sigma^2}{2}\right)+\frac16\qquad p_m=\frac23\qquad p_d=-\sqrt{\frac{\Delta t}{12\sigma^2}}\left(r-q-\frac{\sigma^2}{2}\right)+\frac16}$$

*Les calculs sont analogues : **on remonte, et à chaque nœud on compare la valeur d'exercice à la valeur de continuation***

$$e^{-r\Delta t}\big(p_uf_u+p_mf_m+p_df_d\big)$$

> ⚠️ **Le résultat structurel à retenir.** ***L'approche par arbre trinomial se révèle ÉQUIVALENTE à la méthode des différences finies EXPLICITES*** (concept 6).

**Le maillage adaptatif (Figlewski et Gao).** *Un arbre à **haute résolution** ($\Delta t$ petit) est **greffé** sur un arbre à basse résolution. Pour une américaine ordinaire, **la haute résolution est surtout utile près du strike, à la fin de la vie de l'option**.*

### 3.4 Paramètres dépendant du temps

*En pratique $r$, $q$, $r_f$ et $\sigma$ sont **supposés dépendre du temps**, leurs valeurs entre $t$ et $t+\Delta t$ étant **leurs valeurs forward**.*

**Pour $r$ et $q$** — on modifie **seulement $a$**, ce qui *ne change pas la géométrie de l'arbre, puisque $u$ et $d$ n'en dépendent pas* :

$$\boxed{a=e^{[f(t)-g(t)]\Delta t}}\;\text{(20.11)}\qquad\Longrightarrow\qquad p=\frac{e^{[f(t)-g(t)]\Delta t}-d}{u-d}\;\text{(20.12)}$$

*où $f(t)$ est le **taux forward** entre $t$ et $t+\Delta t$ et $g(t)$ la valeur forward de $q$. **Et l'on actualise entre $t$ et $t+\Delta t$ avec $f(t)$**.*

**Pour $\sigma$ — plus délicat.** *Une approche consiste à rendre **les longueurs de pas inversement proportionnelles au taux de variance** : $u$ et $d$ restent alors **toujours les mêmes** et l'arbre **recombine**.* Avec $V=\sigma(T)^2T$ et $N$ pas, on choisit les dates $t_i$ telles que

$$\boxed{\sigma(t_i)^2t_i=\frac{iV}{N}}$$

*La variance entre $t_{i-1}$ et $t_i$ vaut alors **$V/N$ pour tout $i$**.*

## 🔴 Concept 4 — La simulation de Monte-Carlo

<details class="details--riche">
<summary>

**L'idée, illustrée par le calcul de $\pi$ avec des fléchettes**

</summary>

*Un carré de côté **1**, un cercle inscrit de rayon **0,5**. **Lancez des fléchettes au hasard** et calculez le pourcentage tombant dans le cercle.* Aire du carré **1**, aire du cercle $\pi\times0{,}5^2=\pi/4$. *La **proportion** tombant dans le cercle devrait donc être $\pi/4$ : **on estime $\pi$ en multipliant cette proportion par 4**.*

**Au tableur.** A1 et B1 valent `=RAND()` (position horizontale et verticale de la fléchette). C1 vaut

```
=IF((A1-0.5)^2+(B1-0.5)^2<0.5^2, 4, 0)
```

*ce qui met **4** si la fléchette est dans le cercle et **0** sinon.* Répliquer sur 100 lignes, puis moyenne et écart-type. **Résultat d'un tirage : moyenne 3,04, écart-type 1,69.**

> ⚠️ ***Augmenter le nombre d'essais améliore la précision — mais la convergence vers 3,14159 est LENTE.*** C'est tout le problème de Monte-Carlo, quantifié au concept 4.2.

</details>

**La procédure en cinq étapes.**

1. **Tirer une trajectoire aléatoire** pour $S$ en monde risque-neutre.
2. Calculer le **payoff** du dérivé.
3. **Répéter** pour obtenir de nombreuses valeurs de payoff.
4. Calculer la **moyenne** → estimation du payoff espéré en monde risque-neutre.
5. **Actualiser au taux sans risque**.

**La discrétisation.** À partir de $dS=\hat\mu S\,dt+\sigma S\,dz$ :

$$S(t+\Delta t)-S(t)=\hat\mu S(t)\Delta t+\sigma S(t)\varepsilon\sqrt{\Delta t}\;\text{(20.14)}$$

⚠️ **Mais il vaut mieux simuler $\ln S$.** Par le lemme d'Itô,

$$d\ln S=\left(\hat\mu-\frac{\sigma^2}{2}\right)dt+\sigma\,dz\;\text{(20.15)}\quad\Longrightarrow\quad\boxed{S(t+\Delta t)=S(t)\exp\left[\left(\hat\mu-\frac{\sigma^2}{2}\right)\Delta t+\sigma\varepsilon\sqrt{\Delta t}\right]}$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi c'est mieux, et Hull le dit en note.</span>

⚠️ *Cette équation est **exactement vraie**, alors que (20.14) n'est exacte **qu'à la limite $\Delta t\to0$**.* Avec la forme logarithmique, **on peut sauter directement en $T$** si le payoff ne dépend que de $S_T$.

</div>

*Valeurs de $\hat\mu$ : **$r$** pour une action sans dividende, **$r-r_f$** pour un change, etc. **La volatilité est la même en monde risque-neutre que dans le monde réel** (Girsanov, fiche 85).*

<details class="details--riche">
<summary>

**Vérifier Black-Scholes par Monte-Carlo, au tableur (Business Snapshot 20.2)**

</summary>

**Les données en ligne 2.** $S_0=50$, $K=50$, $r=0{,}05$, $\sigma=0{,}3$, $T=0{,}5$. Les cellules D4, E4, F4 calculent $d_1$, $d_2$ et le prix Black-Scholes : **4,817**.

*Étape 1 — le tirage normal.* `NORMSINV(RAND())` donne un tirage de la loi normale centrée réduite. *Étape 2 — la cellule A1 : un tirage de $S_T$.*

```
=$C$2*EXP(($E$2-$F$2*$F$2/2)*$G$2+$F$2*NORMSINV(RAND())*SQRT($G$2))
```

*Étape 3 — la cellule B1 : la valeur actuelle du payoff.*

```
=EXP(-$E$2*$G$2)*MAX(A1-$D$2,0)
```

*Étape 4 — répliquer sur 1 000 lignes**, puis `AVERAGE(B1:B1000)` et `STDEV(B1:B1000)`. *Étape 5 — le résultat.* Moyenne **4,98**, écart-type **7,68** — *pas trop loin du prix Black-Scholes de **4,817***.

</details>

### 4.1 Plusieurs variables et tirages corrélés

Pour $n$ variables : $\theta_i(t+\Delta t)-\theta_i(t)=\hat m_i\theta_i\Delta t+s_i\theta_i\varepsilon_i\sqrt{\Delta t}$ ;(20.18), les $\varepsilon_i$ étant tirés d'une **normale multivariée**.

**Deux variables corrélées.** À partir de $x_1,x_2$ **indépendants** :

$$\boxed{\varepsilon_1=x_1\qquad \varepsilon_2=\rho x_1+\sqrt{1-\rho^2}\,x_2}$$

**$n$ variables — la décomposition de Cholesky.**

$$\varepsilon_1=\alpha_{11}x_1,\qquad \varepsilon_2=\alpha_{21}x_1+\alpha_{22}x_2,\qquad \varepsilon_3=\alpha_{31}x_1+\alpha_{32}x_2+\alpha_{33}x_3,\ \ldots$$

*On choisit les $\alpha_{ij}$ **pas à pas** : $\alpha_{11}=1$ ; $\alpha_{21}$ tel que $\alpha_{21}\alpha_{11}=\rho_{21}$ ; $\alpha_{22}$ tel que $\alpha_{21}^2+\alpha_{22}^2=1$ ; $\alpha_{31}$ tel que $\alpha_{31}\alpha_{11}=\rho_{31}$ ; $\alpha_{32}$ tel que $\alpha_{31}\alpha_{21}+\alpha_{32}\alpha_{22}=\rho_{32}$ ; $\alpha_{33}$ tel que $\alpha_{31}^2+\alpha_{32}^2+\alpha_{33}^2=1$ ; et ainsi de suite.*

> ⚠️ **Un test de cohérence gratuit.** *Si les équations pour les $\alpha$ **n'ont pas de solution réelle**, c'est que **la structure de corrélation supposée est intérieurement incohérente**.*

### 4.2 La précision, et son coût

$$\boxed{\text{erreur type}=\frac{\omega}{\sqrt M}}\qquad\qquad \mu-\frac{1{,}96\,\omega}{\sqrt M}<f<\mu+\frac{1{,}96\,\omega}{\sqrt M}$$

où $\mu$ est la **moyenne** des payoffs actualisés, $\omega$ leur **écart-type** et $M$ le nombre d'essais.

> ⚠️ **La loi d'airain de Monte-Carlo.** ***L'incertitude est inversement proportionnelle à la RACINE CARRÉE du nombre d'essais. Pour DOUBLER la précision, il faut QUADRUPLER le nombre d'essais ; pour la multiplier par 10, il faut multiplier les essais par 100.***

| Exemple | $\mu$ | $\omega$ | $M$ | Erreur type | Intervalle à 95 % | Vraie valeur |
|---|---|---|---|---|---|---|
| **$\pi$** (20.7) | 3,04 | 1,69 | 100 | **0,169** | **2,71 à 3,37** | 3,14159 |
| **Option** (20.8) | 4,98 | 7,68 | 1 000 | **0,24** | **4,51 à 5,45** | 4,817 |

**Les grecques par Monte-Carlo.** *Calculer $\hat f$, puis augmenter $x$ de $\Delta x$ et recalculer $\hat f^\ast$ ; l'estimation est $(\hat f^\ast-\hat f)/\Delta x$.*

> ⚠️ ***Pour minimiser l'erreur type, le nombre d'intervalles $N$, LES TIRAGES ALÉATOIRES UTILISÉS, et le nombre d'essais $M$ doivent être LES MÊMES pour $\hat f$ et $\hat f^\ast$.***

**Échantillonner à travers un arbre.** *Au lieu de tirer dans le processus, on peut utiliser un arbre à $N$ pas et **échantillonner parmi les $2^N$ trajectoires possibles** : à chaque nœud, tirer un nombre entre 0 et 1 et prendre la branche basse s'il est inférieur à $1-p$.*

<details class="details--riche">
<summary>

**Exercice résolu — valoriser une option asiatique par échantillonnage dans l'arbre (exemple 20.9)**

</summary>

**Le produit.** Payoff $\max(S_{\text{moy}}-50,0)$, où $S_{\text{moy}}$ est **le cours moyen sur les 5 mois** (premier et dernier inclus) — une **option asiatique**.

**Dix essais sur l'arbre de l'exemple 20.1** (U = hausse, D = baisse) :

| Essai | Trajectoire | Cours moyen | Payoff |
|---|---|---|---|
| 1 | UUUUD | 64,98 | 14,98 |
| 2 | UUUDD | 59,82 | 9,82 |
| 3 | DDDUU | 42,31 | 0,00 |
| 4 | UUUUU | 68,04 | 18,04 |
| 5 | UUDDU | 55,22 | 5,22 |
| 6 | UDUUD | 55,22 | 5,22 |
| 7 | DDUDD | 42,31 | 0,00 |
| 8 | UUDDU | 55,22 | 5,22 |
| 9 | UUUDU | 62,25 | 12,25 |
| 10 | DDUUD | 45,56 | 0,00 |
|  |  | **Moyenne** | **7,08** |

*Étape finale — actualiser.*

$$7{,}08\,e^{-0{,}1\times5/12}=\boxed{\mathbf{6{,}79}}$$

⚠️ ***Ceci illustre la méthodologie. En pratique il faudrait beaucoup plus de pas et beaucoup plus d'essais pour obtenir une réponse précise.***

**Pourquoi cette option exige Monte-Carlo.** Le payoff dépend de **toute la trajectoire**, pas seulement de $S_T$ : **on ne peut pas remonter un arbre**, car la valeur en un nœud dépendrait du chemin par lequel on y est arrivé.

</details>

**Quand utiliser Monte-Carlo.**

| Avantage | Détail |
|---|---|
| **Dimension** | *plus efficace dès **trois variables stochastiques ou plus** — le temps de calcul croît **approximativement linéairement** avec le nombre de variables, alors qu'il croît **exponentiellement** pour la plupart des autres procédures* |
| **Erreur type** | *c'est l'une des rares méthodes qui **fournit une mesure de sa propre précision*** |
| **Souplesse** | *elle accommode des **payoffs complexes** et des **processus stochastiques complexes*** |
| **Trajectoire** | *utilisable quand **le payoff dépend d'une fonction de toute la trajectoire**, pas seulement de la valeur terminale* |

⚠️ **La limite majeure** : *Monte-Carlo travaille **du début vers la fin**, ce qui la rend **inadaptée aux options américaines*** — des extensions existent (chapitre 26).

## 🟠 Concept 5 — Les six techniques de réduction de variance

> *Simuler naïvement exige **un très grand nombre d'essais**, ce qui est **très coûteux en temps de calcul**. Ces procédures peuvent conduire à des **économies spectaculaires**.*

| Technique | Principe | Pourquoi ça marche |
|---|---|---|
| **Variables antithétiques** | chaque essai calcule **deux** valeurs : $f_1$ avec les tirages $\varepsilon$, $f_2$ avec **$-\varepsilon$** ; on retient $\bar f=(f_1+f_2)/2$ | *quand une valeur est **au-dessus** de la vraie, l'autre tend à être **en dessous**, et réciproquement* ; l'erreur type $\bar\omega/\sqrt M$ est *habituellement **bien inférieure** à celle obtenue avec $2M$ essais aléatoires* |
| **Variable de contrôle** | deux dérivés **similaires** A (à valoriser) et B (**solution analytique connue**) ; **mêmes tirages, même $\Delta t$** : $\boxed{f_A=f_A^\ast-f_B^\ast+f_B}$ ;(20.20) | on **retranche l'erreur de simulation** mesurée sur B |
| **Échantillonnage préférentiel** | ne tirer que les **trajectoires importantes** | *pour un call très hors la monnaie, la plupart des trajectoires donnent **un payoff nul** — **c'est du temps de calcul gaspillé*** |
| **Échantillonnage stratifié** | tirer des valeurs **représentatives** plutôt qu'aléatoires | pour $n$ intervalles équiprobables, la valeur représentative du $i$-ème est $\boxed{N^{-1}\!\left(\dfrac{i-0{,}5}{n}\right)}$ |
| **Appariement des moments** | ajuster les tirages : $\boxed{\varepsilon_i^\ast=\dfrac{\varepsilon_i-m}{s}}$ | les tirages ajustés ont **exactement** moyenne 0 et écart-type 1 |
| **Suites quasi-aléatoires** | suites **à faible discrépance** (Sobol') | l'erreur type devient proportionnelle à $\boldsymbol{1/M}$ **et non $1/\sqrt M$** |

<details class="details--riche">
<summary>

**Deux précisions qui font la différence en pratique**

</summary>

**Échantillonnage préférentiel, mécaniquement.** *Soit $F$ la loi **inconditionnelle** de $S_T$ et $q$ **la probabilité, connue analytiquement**, que $S_T>K$. Alors $G=F/q$ est la loi **conditionnelle** à $S_T>K$. **On tire dans $G$ plutôt que dans $F$, et l'estimation est le payoff actualisé moyen MULTIPLIÉ PAR $q$.***

**Appariement des moments — coût et complémentarité.** *Il **économise du temps de calcul** mais peut **poser des problèmes de mémoire, car chaque nombre tiré doit être stocké jusqu'à la fin**. On l'appelle aussi **rééchantillonnage quadratique**. **Il est souvent utilisé avec les variables antithétiques** : celles-ci appariant **automatiquement tous les moments impairs**, l'objectif devient d'apparier **le second et éventuellement le quatrième**.*

**Quasi-aléatoire contre stratifié.** *Le terme « quasi-aléatoire » est **un abus de langage** : une telle suite est **totalement déterministe**. La différence avec l'échantillonnage stratifié est la **souplesse** : le stratifié **suppose connu d'avance le nombre de tirages**, alors qu'une suite quasi-aléatoire **« comble » en permanence les trous entre les points existants** — **à chaque étape, les points sont approximativement uniformément répartis** dans l'espace des probabilités.*

</details>

## 🔴 Concept 6 — Les différences finies

> **Le principe.** *Résoudre **l'équation différentielle** que le dérivé satisfait, en la **convertissant en équations aux différences** résolues itérativement.*

**Le maillage.** *On divise $[0,T]$ en $N$ intervalles $\Delta t=T/N$, et on choisit $S_{\max}$ **assez élevé pour que le put y soit pratiquement sans valeur** ; $\Delta S=S_{\max}/M$ donne $M+1$ prix. **On choisit $S_{\max}$ pour que l'un des prix de la grille soit le cours courant.*** Le nœud $(i,j)$ correspond à la date $i\Delta t$ et au cours $j\Delta S$.

### 6.1 La méthode implicite

**Les approximations.**

$$\frac{\partial f}{\partial S}\approx\frac{f_{i,j+1}-f_{i,j-1}}{2\Delta S}\;\text{(20.24)}\qquad \frac{\partial f}{\partial t}\approx\frac{f_{i+1,j}-f_{i,j}}{\Delta t}\;\text{(20.25)}\qquad \frac{\partial^2f}{\partial S^2}\approx\frac{f_{i,j+1}+f_{i,j-1}-2f_{i,j}}{\Delta S^2}\;\text{(20.26)}$$

*(20.24) est la **moyenne** des approximations **avant** (20.22) et **arrière** (20.23) — *une approximation plus symétrique*.*

**En substituant dans (20.21) avec $S=j\Delta S$ :**

$$\boxed{a_jf_{i,j-1}+b_jf_{i,j}+c_jf_{i,j+1}=f_{i+1,j}}\;\text{(20.27)}$$

$$a_j=\tfrac12(r-q)j\Delta t-\tfrac12\sigma^2j^2\Delta t\qquad b_j=1+\sigma^2j^2\Delta t+r\Delta t\qquad c_j=-\tfrac12(r-q)j\Delta t-\tfrac12\sigma^2j^2\Delta t$$

**Les trois conditions aux bords.**

$$f_{N,j}=\max(K-j\Delta S,0)\;\text{(20.28)}\qquad f_{i,0}=K\;\text{(20.29)}\qquad f_{i,M}=0\;\text{(20.30)}$$

<details class="details--riche">
<summary>

**Comment on résout, et pourquoi il n'y a pas de matrice à inverser**

</summary>

*Étape 1.* En $i=N-1$, (20.27) donne **$M-1$ équations simultanées** dont **les membres de droite sont connus** (payoffs terminaux), avec $f_{N-1,0}=K$ et $f_{N-1,M}=0$. *Étape 2 — la résolution en cascade.* *Cela **n'implique pas d'inverser une matrice** : l'équation $j=1$ exprime $f_{N-1,2}$ en fonction de $f_{N-1,1}$ ; combinée à elle, l'équation $j=2$ exprime $f_{N-1,3}$ en fonction de $f_{N-1,1}$ ; et ainsi de suite. **La dernière équation $j=M-1$ se résout alors en $f_{N-1,1}$**, d'où l'on déduit tous les autres.* *Étape 3 — l'exercice anticipé.* *Chaque $f_{N-1,j}$ est comparé à $K-j\Delta S$ : si $f_{N-1,j}<K-j\Delta S$, **l'exercice est optimal** et l'on pose $f_{N-1,j}=K-j\Delta S$.* *Étape 4 — répéter* jusqu'à obtenir $f_{0,1},\ldots,f_{0,M-1}$.

**Exercice résolu (exemple 20.10).** Sur le put américain de l'exemple 20.1, avec $M=20$, $N=10$, $\Delta S=5$ *(prix évalué tous les 5 dollars entre 0 et 100, tous les demi-mois)* :

| Quantité | Valeur |
|---|---|
| Américaine, par la grille | **4,07** |
| **Européenne**, par la **même** grille | **3,91** |
| Européenne **vraie** (Black-Scholes) | **4,08** |
| **Estimation par variable de contrôle** | $4{,}07+(4{,}08-3{,}91)=\boxed{\mathbf{4{,}24}}$ |

> ⚠️ **La variable de contrôle s'applique aussi aux différences finies.** *On utilise **la même grille** pour valoriser une option similaire dont **la valorisation analytique est disponible**, puis on applique (20.20).* Ici la correction vaut **+0,17** — plus de 4 % du prix.

</details>

### 6.2 La méthode explicite

> **La simplification.** *On suppose que $\partial f/\partial S$ et $\partial^2f/\partial S^2$ au point $(i,j)$ sont **les mêmes qu'au point $(i+1,j)$**.*

$$\boxed{f_{i,j}=a_j^\ast f_{i+1,j-1}+b_j^\ast f_{i+1,j}+c_j^\ast f_{i+1,j+1}}\;\text{(20.34)}$$

$$a_j^\ast=\frac{-\tfrac12(r-q)j\Delta t+\tfrac12\sigma^2j^2\Delta t}{1+r\Delta t}\quad b_j^\ast=\frac{1-\sigma^2j^2\Delta t}{1+r\Delta t}\quad c_j^\ast=\frac{\tfrac12(r-q)j\Delta t+\tfrac12\sigma^2j^2\Delta t}{1+r\Delta t}$$

> **L'équivalence avec l'arbre trinomial — et elle est littérale.** *Dans (20.34), on peut interpréter les termes comme des **probabilités** :*

| Terme | Interprétation |
|---|---|
| $-\tfrac12(r-q)j\Delta t+\tfrac12\sigma^2j^2\Delta t$ | probabilité que le cours **baisse** de $j\Delta S$ à $(j-1)\Delta S$ |
| $1-\sigma^2j^2\Delta t$ | probabilité qu'il reste **inchangé** |
| $\tfrac12(r-q)j\Delta t+\tfrac12\sigma^2j^2\Delta t$ | probabilité qu'il **monte** |

*Les trois somment à **un**, et donnent une hausse espérée de $(r-q)j\Delta S\Delta t=(r-q)S\Delta t$ — **exactement la hausse espérée en monde risque-neutre**. Le facteur $1/(1+r\Delta t)$ est **l'actualisation**.*

### 6.3 Comparaison, changement de variable, variantes

|  | **Implicite** | **Explicite** |
|---|---|---|
| Résolution | $M-1$ **équations simultanées** par pas | **directe**, nœud par nœud |
| Robustesse | ***très robuste : elle converge TOUJOURS*** vers la solution quand $\Delta S,\Delta t\to0$ | *peut **ne pas converger*** |
| Équivalence | — | **arbre trinomial** |

⚠️ **La règle générale de stabilité.** *Dans les méthodes de différences finies, **$\Delta S$ doit rester proportionnel à $\sqrt{\Delta t}$** quand ils tendent vers zéro.* Et *Hull et White montrent qu'il suffit ici de **construire la grille en $\ln S$ plutôt qu'en $S$** pour assurer la convergence*.

**Le changement de variable.** *Avec un mouvement brownien géométrique, il est **plus efficace numériquement** d'utiliser $Z=\ln S$ :*

$$\boxed{\frac{\partial f}{\partial t}+\left(r-q-\frac{\sigma^2}{2}\right)\frac{\partial f}{\partial Z}+\frac12\sigma^2\frac{\partial^2f}{\partial Z^2}=rf}$$

*La grille évalue alors le dérivé pour des valeurs **également espacées de $Z$** plutôt que de $S$* — **et les coefficients ne dépendent plus de $j$**.

**Deux variantes hybrides.**

| Méthode | Principe |
|---|---|
| ***Hopscotch*** | *on **alterne** entre calculs explicites et implicites en passant d'un nœud à l'autre. À chaque date, on fait d'abord tous les nœuds « explicites » ; **les nœuds « implicites » se traitent alors sans résoudre de système**, puisque les valeurs adjacentes sont déjà calculées* |
| **Crank-Nicolson** | la **moyenne** des méthodes explicite et implicite ; *sa mise en œuvre est **similaire à l'implicite**, et **son avantage est une convergence plus rapide** que l'une ou l'autre* |

**Les applications.** *Les différences finies traitent les mêmes problèmes que les arbres — **américaines comme européennes** — mais **ne peuvent pas facilement traiter les payoffs dépendant de l'historique**. Elles peuvent, **au prix d'une augmentation considérable du temps de calcul**, traiter plusieurs variables d'état : **la grille devient multidimensionnelle**.* Les grecques se calculent **comme pour les arbres** : delta, gamma et thêta **directement** sur la grille ; **véga exige de recalculer** avec une volatilité modifiée.

## Comment reconnaître le type d'exercice

| Signal | Méthode | Pourquoi |
|---|---|---|
| Option **américaine** | **arbre** ou **différences finies** | on remonte le temps → test d'exercice possible |
| Payoff dépendant de **la moyenne**, du **max**, du **chemin** | **Monte-Carlo** | impossible de remonter un arbre |
| **Trois variables ou plus** | **Monte-Carlo** | temps **linéaire** en la dimension |
| « quelle précision ? » | **Monte-Carlo** | $\omega/\sqrt M$ — la seule méthode qui le dit |
| $\sigma<(r-q)\sqrt{\Delta t}$ | arbre à **$p=0{,}5$** | CRR donnerait des probabilités **négatives** |
| Dividende **en montant** | attention | l'arbre **ne recombine pas** |
| « pourquoi l'explicite ne converge pas ? » | **stabilité** | $\Delta S\propto\sqrt{\Delta t}$, ou grille en $\ln S$ |

## Comment résoudre ce type d'exercice

**Protocole arbre — 6 étapes.**

1. $\Delta t=T/N$, puis $u=e^{\sigma\sqrt{\Delta t}}$, $d=1/u$, $a$ selon le sous-jacent, $p=(a-d)/(u-d)$.
2. **Vérifier $0<p<1$**.
3. Prix au nœud $(i,j)$ : $S_0u^jd^{i-j}$.
4. Payoffs terminaux.
5. Remonter : $\max$(exercice, continuation) à **chaque** nœud pour une américaine.
6. Grecques : $\Delta$ par $(1,\cdot)$, $\Gamma$ par $(2,\cdot)$, $\Theta$ par $f_{2,1}-f_{0,0}$ ; **reconstruire l'arbre** pour véga et rhô.

**Protocole Monte-Carlo — 5 étapes.**

1. Écrire le processus **risque-neutre** ($\hat\mu=r$, ou $r-q$, ou $r-r_f$, ou 0 pour un futures).
2. Simuler **$\ln S$**, pas $S$ — c'est **exact**.
3. Calculer le payoff, **actualiser à $r$**, répéter $M$ fois.
4. Reporter **moyenne $\mu$ ET écart-type $\omega$** ; erreur type $=\omega/\sqrt M$.
5. Donner l'**intervalle à 95 %** : $\mu\pm1{,}96\,\omega/\sqrt M$.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Croire qu'on exerce dès que l'option est dans la monnaie | Nœud B : **10,36 &gt; 10,31**, on n'exerce **pas** |
| Simuler $S$ plutôt que $\ln S$ | La forme logarithmique est **exacte**, l'autre non |
| Oublier de reporter l'écart-type d'une simulation | Sans lui, **aucune mesure de précision** |
| Croire qu'on double la précision en doublant $M$ | Il faut **quadrupler** |
| Utiliser des tirages différents pour $\hat f$ et $\hat f^\ast$ | **Mêmes** tirages, **même** $N$, **même** $M$ |
| Utiliser Monte-Carlo pour une américaine | Elle **avance** dans le temps — inadaptée |
| Utiliser un arbre pour une option asiatique | Le payoff dépend **du chemin** |
| Oublier que le dividende en montant casse la recombinaison | Le nombre de nœuds **explose** |
| Prendre CRR quand $\sigma$ est très petite | Probabilités **négatives** — utiliser $p=0{,}5$ |
| Croire que l'explicite converge toujours | **Non** — $\Delta S\propto\sqrt{\Delta t}$, ou grille en $\ln S$ |
| Croire qu'il faut inverser une matrice en implicite | Résolution **en cascade** |
| Oublier la variable de contrôle en différences finies | Elle valait **+0,17** dans l'exemple, soit **4 %** |

## 📌 Ultimate Review

**L'arbre CRR.** $u=e^{\sigma\sqrt{\Delta t}}$, $d=1/u$, $p=\frac{a-d}{u-d}$, $a=e^{(r-q)\Delta t}$ ; prix $S_0u^jd^{i-j}$ ; $f_{i,j}=\max(\text{exercice},e^{-r\Delta t}[pf_{i+1,j+1}+(1-p)f_{i+1,j}])$.

**Les grecques par l'arbre.**

$$\Delta=\frac{f_{1,1}-f_{1,0}}{S_0u-S_0d}\qquad \Gamma=\frac{\frac{f_{2,2}-f_{2,1}}{S_0u^2-S_0}-\frac{f_{2,1}-f_{2,0}}{S_0-S_0d^2}}{0{,}5(S_0u^2-S_0d^2)}\qquad \Theta=\frac{f_{2,1}-f_{0,0}}{2\Delta t}$$

**Les arbres alternatifs.** $p=0{,}5$ : $u,d=e^{(r-q-\sigma^2/2)\Delta t\pm\sigma\sqrt{\Delta t}}$ — **jamais de probabilité négative**. **Trinomial** : $u=e^{\sigma\sqrt{3\Delta t}}$, $p_m=2/3$ — **équivalent aux différences finies explicites**.

**Monte-Carlo.** Simuler $\ln S$ · erreur type $\omega/\sqrt M$ · IC $\mu\pm1{,}96\omega/\sqrt M$ · corrélation : $\varepsilon_2=\rho x_1+\sqrt{1-\rho^2}x_2$, ou **Cholesky** · six réductions de variance, dont **antithétiques** et **variable de contrôle** $f_A=f_A^\ast-f_B^\ast+f_B$.

**Différences finies.** Implicite : $a_jf_{i,j-1}+b_jf_{i,j}+c_jf_{i,j+1}=f_{i+1,j}$, **toujours convergente**. Explicite : $f_{i,j}=a_j^\ast f_{i+1,j-1}+b_j^\ast f_{i+1,j}+c_j^\ast f_{i+1,j+1}$, **= arbre trinomial**. **Crank-Nicolson** : moyenne des deux, **convergence plus rapide**.

**Le partage des rôles.** Monte-Carlo **avance** (européennes, chemins, dimension) ; arbres et différences finies **remontent** (américaines, décisions).

**Les chiffres du chapitre.** Exemple 20.1 : $u=1{,}1224$, $p=\mathbf{0{,}5073}$, prix **4,49** à 5 pas, **4,283** à 500 · grecques : $\Delta=-0{,}41$, $\Gamma=0{,}03$, $\Theta=-4{,}3$/an ; à 50 pas $-0{,}415$, $0{,}034$, $-0{,}0117$, véga **0,123**, rhô **−0,072** · exemple 20.6 : $u=1{,}0098$, valeur **0,0026** · $\pi$ : $3{,}04\pm0{,}331$ → **2,71 à 3,37** · option : $4{,}98\pm0{,}47$ → **4,51 à 5,45**, vraie valeur **4,817** · asiatique : moyenne **7,08**, valeur **6,79** · différences finies : **4,07** / **3,91** / **4,08** → **4,24**.

## 🧠 Active Recall

<details class="details--riche">
<summary>

Comment les trois conditions déterminent-elles $p$, $u$ et $d$ ?

</summary>

**(1) Moyenne** : $e^{(r-q)\Delta t}=pu+(1-p)d$ — la croissance risque-neutre. **(2) Variance** : $e^{(r-q)\Delta t}(u+d)-ud-e^{2(r-q)\Delta t}=\sigma^2\Delta t$. **(3) La convention de Cox, Ross et Rubinstein** : $u=1/d$.

Solution (aux termes d'ordre supérieur à $\Delta t$ près) : $u=e^{\sigma\sqrt{\Delta t}}$, $d=1/u$, $p=(a-d)/(u-d)$ avec $a=e^{(r-q)\Delta t}$ — **le facteur de croissance**.

</details>

<details><summary>Pourquoi l'arbre CRR se recombine-t-il, et pourquoi est-ce important ?</summary>

Parce que $u=1/d$ : une hausse suivie d'une baisse donne $S_0ud=S_0$, **le même prix** qu'une baisse suivie d'une hausse. Le nombre de nœuds à la date $i\Delta t$ est donc **$i+1$** et non $2^i$ : le coût de calcul est **quadratique** au lieu d'**exponentiel**. C'est exactement ce qui se perd avec un **dividende en montant fixe** — d'où l'usage d'un **rendement** pour les options longues.

</details>

<details class="details--riche">
<summary>

Sur l'arbre de l'exemple 20.1, au nœud où $S=39{,}69$ à $t=3\Delta t$, faut-il exercer ?

</summary>

**Non.** L'exercice donnerait $50{,}00-39{,}69=\mathbf{10{,}31}$, mais la continuation vaut

$$(0{,}5073\times6{,}38+0{,}4927\times14{,}64)e^{-0{,}10\times0{,}0833}=\mathbf{10{,}36}$$

> ⚠️ ***Il n'est pas toujours optimal d'exercer une option quand elle est dans la monnaie.***

En revanche, **au nœud suivant** ($t=4\Delta t$, même cours), la continuation ne vaut que **9,90** contre 10,31 d'exercice : **on exerce**.

</details>

<details><summary>Calculer delta, gamma et thêta sur un arbre.</summary>

$$\Delta=\frac{f_{1,1}-f_{1,0}}{S_0u-S_0d}\qquad \Gamma=\frac{\dfrac{f_{2,2}-f_{2,1}}{S_0u^2-S_0}-\dfrac{f_{2,1}-f_{2,0}}{S_0-S_0d^2}}{h},\ h=0{,}5(S_0u^2-S_0d^2)\qquad \Theta=\frac{f_{2,1}-f_{0,0}}{2\Delta t}$$

Sur l'exemple : $\Delta=\frac{2{,}16-6{,}96}{11{,}57}=\mathbf{-0{,}41}$ ; $h=11{,}65$ et $\Gamma=\mathbf{0{,}03}$ ; $\Theta=\frac{3{,}77-4{,}49}{0{,}1667}=\mathbf{-4{,}3}$ par an.

**Véga et rhô exigent de reconstruire l'arbre**, avec **le même nombre de pas**.

</details>

<details class="details--riche">
<summary>

Quand faut-il préférer l'arbre à $p=0{,}5$ à l'arbre CRR ?

</summary>

Quand *les pas sont si grands que $\sigma<(r-q)\sqrt{\Delta t}$* : **l'arbre CRR donne alors des probabilités négatives**, ce que l'arbre alternatif évite. Ses paramètres : $u,d=e^{(r-q-\sigma^2/2)\Delta t\pm\sigma\sqrt{\Delta t}}$, avec $p=0{,}5$ **quels que soient $\sigma$ et le nombre de pas**.

**Son inconvénient** : *il est **moins direct de calculer delta, gamma et rhô**, car **l'arbre n'est plus centré sur $S_0$***.

</details>

<details><summary>Comment traite-t-on un rendement de dividende discret, et un dividende en montant ?</summary>

**Rendement discret** : $u$, $d$, $p$ se calculent **comme s'il n'y avait pas de dividende** ; les nœuds **après** détachement portent $S_0(1-\delta_i)u^jd^{i-j}$, où $\delta_i$ est le **rendement cumulé** de tous les détachements avant $i\Delta t$. **L'arbre recombine.**

**Montant en dollars** : nœuds après détachement à $S_0u^jd^{i-j}-D$. ***L'arbre NE recombine PAS : le nombre de nœuds à évaluer devient très grand.***

</details>

<details class="details--riche">
<summary>

Pourquoi simuler $\ln S$ plutôt que $S$ ?

</summary>

Parce que la récurrence logarithmique

$$S(t+\Delta t)=S(t)\exp\left[\left(\hat\mu-\frac{\sigma^2}{2}\right)\Delta t+\sigma\varepsilon\sqrt{\Delta t}\right]$$

est **exactement vraie**, alors que la forme en $\Delta S$ *n'est exacte **qu'à la limite $\Delta t\to0$***. Conséquence pratique : si le payoff ne dépend que de $S_T$, **on peut sauter directement en $T$ en un seul tirage**.

</details>

<details><summary>Quelle est l'erreur type d'une simulation, et que coûte l'amélioration de la précision ?</summary>

$$\text{erreur type}=\frac{\omega}{\sqrt M},\qquad \text{IC 95 \%}=\mu\pm\frac{1{,}96\,\omega}{\sqrt M}$$

***Pour DOUBLER la précision, il faut QUADRUPLER le nombre d'essais ; pour la multiplier par 10, multiplier les essais par 100.***

Exemple : $\mu=4{,}98$, $\omega=7{,}68$, $M=1\,000$ → erreur type **0,24**, IC **4,51 à 5,45**, contenant bien le prix Black-Scholes de **4,817**.

</details>

<details class="details--riche">
<summary>

Comment tirer $n$ variables normales corrélées ?

</summary>

Pour **deux** : $\varepsilon_1=x_1$, $\varepsilon_2=\rho x_1+\sqrt{1-\rho^2}\,x_2$ à partir de tirages **indépendants**.

Pour **$n$** — **décomposition de Cholesky** : $\varepsilon_i=\sum_{k\le i}\alpha_{ik}x_k$, les $\alpha$ étant déterminés **pas à pas** : $\alpha_{11}=1$ ; $\alpha_{21}\alpha_{11}=\rho_{21}$ ; $\alpha_{21}^2+\alpha_{22}^2=1$ ; etc.

> ⚠️ *Si ces équations **n'ont pas de solution réelle**, **la structure de corrélation supposée est intérieurement incohérente**.*

</details>

<details><summary>Expliquer les techniques des variables antithétiques et de la variable de contrôle.</summary>

**Antithétiques** : chaque essai calcule $f_1$ avec les tirages $\varepsilon$ **et** $f_2$ avec $-\varepsilon$ ; on retient $\bar f=(f_1+f_2)/2$. *Cela fonctionne bien parce que **quand une valeur est au-dessus de la vraie, l'autre tend à être en dessous**.* L'erreur type $\bar\omega/\sqrt M$ est **bien inférieure** à celle de $2M$ essais indépendants.

**Variable de contrôle** : deux dérivés similaires A (à valoriser) et B (**analytique connue**) ; **mêmes tirages, même $\Delta t$** ; puis

$$f_A=f_A^\ast-f_B^\ast+f_B$$

— on **retranche l'erreur de simulation** mesurée sur B. Elle s'applique aussi aux **différences finies** (exemple 20.10, correction de **+0,17**).

</details>

<details><summary>Pourquoi une option asiatique exige-t-elle Monte-Carlo ?</summary>

Parce que son payoff, $\max(S_{\text{moy}}-K,0)$, **dépend de toute la trajectoire**. On ne peut pas **remonter** un arbre : la valeur en un nœud dépendrait **du chemin par lequel on y est arrivé**, alors que la remontée suppose qu'elle ne dépend que du nœud.

On peut néanmoins **échantillonner à travers un arbre** : tirer une trajectoire parmi les $2^N$ possibles, calculer le payoff, répéter. Dans l'exemple à dix essais : moyenne **7,08**, valeur $7{,}08e^{-0{,}1\times5/12}=\mathbf{6{,}79}$.

</details>

<details><summary>Comment la méthode implicite se résout-elle sans inverser de matrice ?</summary>

**En cascade.** *L'équation $j=1$ exprime $f_{N-1,2}$ en fonction de $f_{N-1,1}$ ; combinée à elle, l'équation $j=2$ exprime $f_{N-1,3}$ en fonction de $f_{N-1,1}$ ; et ainsi de suite jusqu'à $j=M-2$. **La dernière équation, $j=M-1$, se résout alors en $f_{N-1,1}$***, d'où l'on remonte tous les autres. On compare ensuite chaque valeur à $K-j\Delta S$ pour l'exercice anticipé.

</details>

<details><summary>En quoi la méthode explicite est-elle un arbre trinomial ?</summary>

Dans $f_{i,j}=a_j^\ast f_{i+1,j-1}+b_j^\ast f_{i+1,j}+c_j^\ast f_{i+1,j+1}$, les numérateurs s'interprètent comme des **probabilités** : $-\frac12(r-q)j\Delta t+\frac12\sigma^2j^2\Delta t$ (baisse), $1-\sigma^2j^2\Delta t$ (inchangé), $\frac12(r-q)j\Delta t+\frac12\sigma^2j^2\Delta t$ (hausse). *Elles **somment à un** et donnent une hausse espérée de $(r-q)S\Delta t$ — **exactement celle du monde risque-neutre**.* Le facteur $1/(1+r\Delta t)$ est l'**actualisation**.

</details>

<details><summary>Comparer méthodes implicite et explicite, et citer les deux variantes hybrides.</summary>

**Implicite** : *très robuste — **elle converge toujours** vers la solution quand $\Delta S$ et $\Delta t$ tendent vers zéro* ; mais il faut résoudre $M-1$ équations par pas. **Explicite** : directe, mais **peut ne pas converger** — remède : garder $\Delta S\propto\sqrt{\Delta t}$, ou **construire la grille en $\ln S$**.

**Hybrides** : ***hopscotch***, qui **alterne** nœud à nœud — *les nœuds implicites se traitent **sans système**, les valeurs adjacentes étant déjà calculées* ; et **Crank-Nicolson**, **moyenne** des deux, dont *l'avantage est une **convergence plus rapide** que l'une ou l'autre*.

</details>

<details><summary>Quand Monte-Carlo est-elle la meilleure méthode, et quelle est sa limite ?</summary>

**Meilleure** dès **trois variables stochastiques ou plus** : *le temps de calcul croît **approximativement linéairement** avec le nombre de variables, alors qu'il croît **exponentiellement** pour la plupart des autres procédures*. Autres avantages : **elle fournit une erreur type**, accommode des **payoffs et processus complexes**, et gère les payoffs **dépendant de toute la trajectoire**.

**La limite** : elle **avance dans le temps**, donc **ne convient pas aux américaines** — des extensions existent (chapitre 26).

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Quand utiliser Monte-Carlo ? | Payoff **dépendant du chemin** ou **plusieurs variables** |
| Quand utiliser arbres et différences finies ? | **Américaines** et décisions avant maturité |
| Les deux conditions sur $p$, $u$, $d$ ? | **Moyenne** et **variance** correctes |
| La troisième condition de CRR ? | $u=1/d$ |
| Formule de $u$ ? de $a$ ? | $e^{\sigma\sqrt{\Delta t}}$ · $e^{(r-q)\Delta t}$ |
| Comment s'appelle $a$ ? | Le **facteur de croissance** |
| Prix au nœud $(i,j)$ ? | $S_0u^jd^{i-j}$ |
| Combien de prix à la date $i\Delta t$ ? | $i+1$ |
| Pourquoi l'arbre recombine-t-il ? | Parce que $u=1/d$ |
| Que capture la valeur en $i\Delta t$ ? | L'exercice en $i\Delta t$ **et à toutes les dates ultérieures** |
| Exerce-t-on toujours quand c'est dans la monnaie ? | **Non** |
| Combien de pas en pratique ? | **$N=30$** donne des résultats raisonnables |
| Formule du delta par l'arbre ? | $\frac{f_{1,1}-f_{1,0}}{S_0u-S_0d}$ |
| Que vaut $h$ dans le gamma ? | $0{,}5(S_0u^2-S_0d^2)$ |
| Formule du thêta ? | $\frac{f_{2,1}-f_{0,0}}{2\Delta t}$ |
| Comment obtenir véga et rhô ? | **Reconstruire** l'arbre, **même nombre de pas** |
| Traitement d'un rendement discret ? | Nœuds $\times(1-\delta_i)$ après détachement |
| Problème du dividende en montant ? | L'arbre **ne recombine pas** |
| Paramètres de l'arbre à $p=0{,}5$ ? | $u,d=e^{(r-q-\sigma^2/2)\Delta t\pm\sigma\sqrt{\Delta t}}$ |
| Son avantage ? | Probabilités **toujours 0,5** |
| Son inconvénient ? | Arbre **non centré** sur $S_0$ |
| Quand CRR échoue-t-il ? | Si $\sigma<(r-q)\sqrt{\Delta t}$ → probabilités **négatives** |
| $u$ d'un arbre trinomial ? | $e^{\sigma\sqrt{3\Delta t}}$ |
| $p_m$ d'un arbre trinomial ? | $\mathbf{2/3}$ |
| À quoi le trinomial équivaut-il ? | Aux différences finies **explicites** |
| Qu'est-ce que le maillage adaptatif ? | Greffer un arbre **fin** sur un arbre **grossier** |
| Comment rendre $r$ et $q$ variables ? | $a=e^{[f(t)-g(t)]\Delta t}$, **géométrie inchangée** |
| Comment rendre $\sigma$ variable ? | Pas de temps tels que $\sigma(t_i)^2t_i=iV/N$ |
| Les cinq étapes de Monte-Carlo ? | Tirer · payoff · répéter · moyenne · **actualiser** |
| Que vaut $\hat\mu$ pour une action ? un change ? | $r$ · $r-r_f$ |
| Pourquoi simuler $\ln S$ ? | La récurrence est **exacte** |
| Formule de l'erreur type ? | $\omega/\sqrt M$ |
| Coût pour doubler la précision ? | **Quadrupler** les essais |
| IC à 95 % ? | $\mu\pm1{,}96\,\omega/\sqrt M$ |
| Tirage de deux normales corrélées ? | $\varepsilon_2=\rho x_1+\sqrt{1-\rho^2}\,x_2$ |
| Nom de la méthode générale ? | La décomposition de **Cholesky** |
| Que signale l'absence de solution réelle ? | Une corrélation **incohérente** |
| Condition pour estimer une grecque par MC ? | **Mêmes tirages**, même $N$, même $M$ |
| Principe des variables antithétiques ? | Utiliser aussi $-\varepsilon$ |
| Formule de la variable de contrôle ? | $f_A=f_A^\ast-f_B^\ast+f_B$ |
| Pourquoi l'échantillonnage préférentiel ? | Éviter les trajectoires à **payoff nul** |
| Valeur représentative du $i$-ème strate ? | $N^{-1}\!\left(\frac{i-0{,}5}{n}\right)$ |
| Formule de l'appariement des moments ? | $\varepsilon_i^\ast=(\varepsilon_i-m)/s$ |
| Son autre nom ? | Rééchantillonnage **quadratique** |
| Avantage des suites quasi-aléatoires ? | Erreur type en $\mathbf{1/M}$ |
| Sont-elles aléatoires ? | **Non** — totalement **déterministes** |
| Équation implicite ? | $a_jf_{i,j-1}+b_jf_{i,j}+c_jf_{i,j+1}=f_{i+1,j}$ |
| Que vaut $b_j$ ? | $1+\sigma^2j^2\Delta t+r\Delta t$ |
| Faut-il inverser une matrice ? | **Non** — résolution **en cascade** |
| Avantage de la méthode implicite ? | Elle **converge toujours** |
| Règle de stabilité générale ? | $\Delta S\propto\sqrt{\Delta t}$ |
| Autre remède à la non-convergence ? | Grille en $\ln S$ |
| EDP après changement de variable ? | $f_t+(r-q-\frac{\sigma^2}2)f_Z+\frac12\sigma^2f_{ZZ}=rf$ |
| Principe de la méthode *hopscotch* ? | **Alterner** explicite et implicite nœud par nœud |
| Qu'est-ce que Crank-Nicolson ? | La **moyenne** des deux méthodes |
| Son avantage ? | **Convergence plus rapide** |
| Limite des différences finies ? | Payoffs **dépendant de l'historique** |
