# Fiche 43 — La méthode du sous-gradient

|  |  |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | S. Boyd (avec J. Park), *Subgradient Methods* — notes pour EE364b, Stanford, mai 2014 |
| **Difficulté** | Must know — le premier algorithme du non lisse, et le socle des méthodes d'ordre 1 |
| **Temps d'étude estimé** | 2 h |
| **Prérequis** | Fiche 42 (sous-gradients), fiche 39 (descente de gradient, conditionnement) |
| **Concepts clés** | Itération $x^{(k+1)}=x^{(k)}-\alpha_kg^{(k)}$, méthode non descendante, meilleure valeur trouvée, règles de pas, inégalité de base, convergence en $RG/\sqrt{k}$, pas de Polyak, critère d'arrêt |
| **Poids à l'examen** | La **preuve de convergence** (trois lignes, fondée sur la distance à l'optimum et non sur la valeur) et la **borne $RG/\sqrt k$**, qui explique pourquoi la méthode est lente. Et savoir citer les cinq règles de pas. |

## 🎯 Vue d'ensemble

$$x^{(k+1)} = x^{(k)} - \alpha_k\,g^{(k)}, \qquad g^{(k)}\in\partial f(x^{(k)})$$

C'est la descente de gradient, avec un sous-gradient à la place du gradient. Mais **trois différences en changent complètement la nature** :

|  | Descente de gradient | Méthode du sous-gradient |
|---|---|---|
| Applicabilité | $f$ dérivable | $f$ **non dérivable** |
| Choix du pas | **recherche linéaire** | **fixé à l'avance**, sans regarder les données |
| Nature | méthode de **descente** | **pas** une méthode de descente : $f$ peut **augmenter** |

> **La conséquence à retenir.** Comme la valeur peut monter, on ne peut plus fonder l'analyse sur la décroissance de $f$. La quantité qui décroît, c'est la **distance euclidienne à l'optimum**. Tout le chapitre découle de ce changement de point de vue.

```
GRADIENT     l'analyse suit  f(x⁽ᵏ⁾)      qui décroît
SOUS-GRADIENT l'analyse suit ‖x⁽ᵏ⁾ − x*‖  qui décroît (sous condition sur le pas)
```

## 🟡 Concept 1 — Ce que la méthode gagne et ce qu'elle perd

**Ce qu'elle perd (les notes sont explicites).** Les méthodes de sous-gradient peuvent être **beaucoup plus lentes** que les méthodes de points intérieurs (ou que Newton dans le cas sans contrainte). Ce sont des méthodes du **premier ordre** : leur performance dépend fortement de la **mise à l'échelle et du conditionnement** du problème — alors que Newton et les points intérieurs, méthodes du **second ordre**, n'en sont pas affectés (fiche 39, invariance affine).

**Ce qu'elle gagne.**

- Elle s'applique **immédiatement** à une classe de problèmes bien plus large.
- Son **empreinte mémoire** est très inférieure : on ne forme aucune hessienne, aucun système. Elle sert donc sur des problèmes **extrêmement grands**, hors de portée de Newton ou des points intérieurs.
- Combinée aux techniques de **décomposition** primale ou duale, elle donne parfois un algorithme **distribué** très simple.

> **Repères historiques.** La méthode a été développée par **Shor** et d'autres en Union soviétique dans les années 1960-70. Les références de base sont Shor (1985), Polyak (1987, chapitre 5) et Bertsekas (1999) pour la décomposition.

**La première conséquence pratique.** Comme $f$ peut augmenter, on garde trace de la **meilleure valeur trouvée jusqu'ici** :

$$f_{\text{best}}^{(k)} = \min\{f_{\text{best}}^{(k-1)},\ f(x^{(k)})\} = \min\{f(x^{(1)}),\dots,f(x^{(k)})\}$$

Cette suite est décroissante, donc elle a une limite. **Dans une méthode de descente, ce suivi serait inutile** — le point courant est toujours le meilleur.

⚠️ Deux raisons distinctes font monter l'objectif : **(1)** $-g^{(k)}$ peut ne **pas** être une direction de descente ($f'(x;-g^{(k)})>0$, fiche 42) ; **(2)** même quand elle en est une, le pas — fixé à l'avance — peut être trop grand.

## 🟠 Concept 2 — Les cinq règles de pas

| Règle | Définition | Exemple typique |
|---|---|---|
| **Pas constant** | $\alpha_k=\alpha>0$ | — |
| **Longueur de pas constante** | $\alpha_k = \gamma/\\|g^{(k)}\\|_2$, donc $\\|x^{(k+1)}-x^{(k)}\\|_2=\gamma$ | — |
| **De carré sommable, non sommable** | $\alpha_k\geq0$, $\sum_k\alpha_k^2<\infty$, $\sum_k\alpha_k=\infty$ | $\alpha_k = a/(b+k)$ |
| **Décroissante non sommable** | $\alpha_k\geq0$, $\alpha_k\to0$, $\sum_k\alpha_k=\infty$ | $\alpha_k = a/\sqrt k$ |
| **Longueurs décroissantes non sommables** | $\alpha_k=\gamma_k/\\|g^{(k)}\\|_2$ avec $\gamma_k\to0$, $\sum_k\gamma_k=\infty$ | — |

> **Le trait le plus remarquable de ces règles : elles sont fixées AVANT de lancer l'algorithme.** Elles ne dépendent d'aucune donnée calculée en cours de route. C'est radicalement différent des règles de recherche linéaire des méthodes de descente (fiche 39), qui dépendent entièrement du point courant et de la direction.

**Comment lire les deux conditions $\sum\alpha_k^2<\infty$ et $\sum\alpha_k=\infty$.** La seconde garantit qu'on peut **parcourir une distance infinie** — donc atteindre l'optimum où qu'il soit. La première garantit que le **bruit accumulé** par les pas reste fini — donc qu'on finit par se stabiliser. Les deux ensemble : « aller assez loin, mais s'amortir ».

## 🔴 Concept 3 — Résultats de convergence

| Règle de pas | Résultat |
|---|---|
| **pas constant** ou **longueur constante** | $\displaystyle\lim_{k\to\infty} f_{\text{best}}^{(k)} - f^\star < \epsilon$ — convergence **à $\epsilon$ près**, $\epsilon$ décroissant avec le paramètre |
| **décroissante non sommable**, **de carré sommable non sommable** | $\displaystyle\lim_{k\to\infty}f(x^{(k)}) = f^\star$ — convergence **exacte** |

> *« Il est remarquable qu'un algorithme aussi simple puisse minimiser n'importe quelle fonction convexe dont on sait calculer un sous-gradient en chaque point. »* Et, ajoutent les notes, la preuve de convergence est elle aussi simple.

**Cas dérivable.** Quand $f$ est dérivable, on peut dire un peu plus : la méthode à **pas constant** converge vers la valeur optimale, pourvu que $\alpha$ soit assez petit.

## 🔴 Concept 4 — La preuve de convergence

**Hypothèses (§3.1).**

- il existe un minimiseur $x^\star$ ;
- les sous-gradients sont **bornés** : $\|g^{(k)}\|_2\leq G$ pour tout $k$. C'est le cas si $f$ est **$G$-lipschitzienne** : $|f(u)-f(v)|\leq G\|u-v\|_2$ ;
- on connaît $R$ avec $R\geq\|x^{(1)}-x^\star\|_2$ — une borne sur la distance du point initial à l'ensemble optimal.

**L'inégalité fondamentale (§3.2), à savoir refaire.**

$$\begin{aligned}\|x^{(k+1)}-x^\star\|_2^2 &= \|x^{(k)}-\alpha_kg^{(k)}-x^\star\|_2^2\\ &= \|x^{(k)}-x^\star\|_2^2 - 2\alpha_k\,g^{(k)T}(x^{(k)}-x^\star) + \alpha_k^2\|g^{(k)}\|_2^2\\ &\leq \|x^{(k)}-x^\star\|_2^2 - 2\alpha_k\big(f(x^{(k)})-f^\star\big) + \alpha_k^2\|g^{(k)}\|_2^2\end{aligned}$$

La dernière ligne vient **directement de la définition du sous-gradient** appliquée en $x^\star$ :

$$f^\star = f(x^\star)\geq f(x^{(k)}) + g^{(k)T}(x^\star-x^{(k)}) \ \Longrightarrow\ g^{(k)T}(x^{(k)}-x^\star)\geq f(x^{(k)})-f^\star$$

**Récurrence.** En appliquant l'inégalité de $1$ à $k$, puis en utilisant $\|x^{(k+1)}-x^\star\|_2^2\geq0$ et $\|x^{(1)}-x^\star\|_2\leq R$ :

$$2\sum_{i=1}^k\alpha_i\big(f(x^{(i)})-f^\star\big) \leq R^2 + \sum_{i=1}^k\alpha_i^2\|g^{(i)}\|_2^2 \tag{1}$$

**Passage à la meilleure valeur.** Comme $\sum_i\alpha_i(f(x^{(i)})-f^\star)\geq\big(\sum_i\alpha_i\big)\big(f_{\text{best}}^{(k)}-f^\star\big)$ :

$$f_{\text{best}}^{(k)}-f^\star \leq \frac{R^2+\sum_{i=1}^k\alpha_i^2\|g^{(i)}\|_2^2}{2\sum_{i=1}^k\alpha_i} \tag{2}$$

**L'inégalité de base**, avec $\|g^{(i)}\|_2\leq G$ :

$$\boxed{\ f_{\text{best}}^{(k)}-f^\star \ \leq\ \frac{R^2+G^2\sum_{i=1}^k\alpha_i^2}{2\sum_{i=1}^k\alpha_i}\ } \tag{3}$$

**Toutes les convergences se lisent sur (3).**

| Règle | Borne | Limite |
|---|---|---|
| pas constant $\alpha$ | $\dfrac{R^2+G^2\alpha^2k}{2\alpha k}$ | $\to \dfrac{G^2\alpha}{2}$ — convergence **à $G^2\alpha/2$ près** |
| longueur constante $\gamma$ | $\dfrac{R^2+\gamma^2k}{2\gamma k/G}$ | $\to\dfrac{G\gamma}{2}$ |
| carré sommable non sommable | $\dfrac{R^2+G^2\\|\alpha\\|_2^2}{2\sum_{i\leq k}\alpha_i}$ | $\to0$ : numérateur **borné**, dénominateur **infini** |
| décroissante non sommable | — | $\to0$ (preuve par découpage en deux blocs) |

> **Le mécanisme des deux dernières lignes est limpide** : le numérateur converge vers la constante $R^2+G^2\|\alpha\|_2^2$, tandis que le dénominateur $2\sum_i\alpha_i$ **diverge**. Le quotient tend donc vers zéro. C'est exactement ce que les deux conditions sur les pas ont été conçues pour produire.

## 🔴 Concept 5 — La borne $RG/\sqrt k$, et pourquoi la méthode est lente

**Quelle suite de pas minimise la borne (3) ?** Le membre de droite est une fonction convexe et **symétrique** de $(\alpha_1,\dots,\alpha_k)$ : l'optimum est donc atteint quand tous les $\alpha_i$ sont **égaux**. La borne devient

$$\frac{R^2+G^2k\alpha^2}{2k\alpha}$$

minimisée en $\alpha = \dfrac{R/G}{\sqrt k}$, ce qui donne

$$\boxed{\ f_{\text{best}}^{(k)}-f^\star \ \leq\ \frac{RG}{\sqrt k}\ }$$

**Autrement dit : quel que soit le choix des pas, la borne (3) vaut au moins $RG/\sqrt k$.** Si l'on utilise (3) comme critère d'arrêt, atteindre une précision $\epsilon$ demande **au moins**

$$k \geq \Big(\frac{RG}{\epsilon}\Big)^2 \ \text{ itérations}$$

**Comment lire $RG$.** C'est une borne sur l'incertitude **initiale** $f(x^{(1)})-f^\star$, obtenue en combinant $\|x^{(1)}-x^\star\|_2\leq R$ et la constante de Lipschitz $G$. Donc $RG/\epsilon$ est le **rapport de l'incertitude initiale à l'incertitude finale**, et son **carré** est le nombre minimal d'itérations.

⚠️ **La conclusion des notes est sans appel.** *« Cela nous dit que la méthode du sous-gradient va être très lente… Réduire l'incertitude initiale d'un facteur $1000$ exigera au moins $10^6$ itérations. »*

**À comparer avec la fiche 39.** Le gradient sur une fonction fortement convexe donne une convergence **linéaire** : $\log(1/\epsilon)$ itérations. Newton donne du $\log\log(1/\epsilon)$. Le sous-gradient donne du $1/\epsilon^2$ — c'est un changement de **régime**, pas de constante.

| Méthode | Itérations pour une précision $\epsilon$ |
|---|---|
| Sous-gradient | $(RG/\epsilon)^2$ |
| Gradient (fortement convexe) | $\kappa\log(1/\epsilon)$ |
| Newton | $\text{const} + \log_2\log_2(1/\epsilon)$ |

> **Le prix de la généralité.** Le sous-gradient marche sur **toute** fonction convexe dont on sait produire un sous-gradient — mais il paie cette universalité par un taux en $1/\epsilon^2$. Les méthodes proximales et accélérées (FISTA) cherchent précisément à récupérer un meilleur taux en exploitant une **structure** supplémentaire (par exemple « lisse $+$ non lisse simple »).

## 🟠 Concept 6 — Critère d'arrêt et pas de Polyak

**Un critère d'arrêt (§3.4).** En réarrangeant (1), on obtient une **borne inférieure** sur $f^\star$, calculable après la $k$-ième étape :

$$f^\star \geq l_k = \frac{2\sum_{i=1}^k\alpha_if(x^{(i)}) - R^2 - \sum_{i=1}^k\alpha_i^2\|g^{(i)}\|_2^2}{2\sum_{i=1}^k\alpha_i} \tag{4}$$

La suite $(l_k)$ n'est pas croissante, on garde donc la meilleure : $l_{\text{best}}^{(k)}=\max\{l_1,\dots,l_k\}$, et l'on s'arrête quand $f_{\text{best}}^{(k)}-l_{\text{best}}^{(k)}$ passe sous un seuil.

Cette borne est **meilleure** que (3) et **ne dépend pas de $G$** — mais elle tend vers zéro tout aussi lentement. *Pour cette raison, la méthode du sous-gradient s'utilise en général **sans critère d'arrêt formel** : on fixe un budget d'itérations.*

**Le pas de Polyak (§4.1).** Si la valeur optimale $f^\star$ est **connue**, Polyak propose

$$\alpha_k = \frac{f(x^{(k)})-f^\star}{\|g^{(k)}\|_2^2} \tag{5}$$

**Deux motivations.** *(1)* En approximant $f(x^{(k)}-\alpha g^{(k)})\approx f(x^{(k)})-\alpha\|g^{(k)}\|_2^2$, on remplace le membre de gauche par $f^\star$ et l'on résout en $\alpha$. *(2)* Plus rigoureusement, ce pas **minimise exactement** le membre de droite de l'inégalité fondamentale

$$\|x^{(k)}-x^\star\|_2^2-2\alpha_k(f(x^{(k)})-f^\star)+\alpha_k^2\|g^{(k)}\|_2^2$$

— c'est-à-dire qu'il fait **le plus grand progrès garanti vers l'optimum**.

**Convergence.** En substituant (5) dans (1) :

$$\sum_{i=1}^k\frac{\big(f(x^{(i)})-f^\star\big)^2}{\|g^{(i)}\|_2^2}\leq R^2 \ \Longrightarrow\ \sum_{i=1}^k\big(f(x^{(i)})-f^\star\big)^2 \leq R^2G^2$$

Donc $f(x^{(k)})\to f^\star$, et le nombre d'itérations garantissant une $\epsilon$-sous-optimalité est $k=(RG/\epsilon)^2$ — **exactement l'optimum** de l'analyse du concept 5.

**Et si $f^\star$ est inconnu (§4.2) ?** On l'estime par $f_{\text{best}}^{(k)}-\gamma_k$ avec $\gamma_k>0$, $\gamma_k\to0$, ce qui donne une règle de pas utilisable en pratique.

### Comment résoudre l'exercice type (protocole)

1. **Vérifier que le problème est convexe** et que l'on sait produire **un** sous-gradient (fiche 42, calcul faible).
2. **Estimer $G$** : constante de Lipschitz de $f$, ou borne sur $\|g\|_2$.
3. **Estimer $R$** : borne sur $\|x^{(1)}-x^\star\|_2$.
4. **Choisir la règle de pas** : $\alpha_k=(R/G)/\sqrt k$ si le budget $k$ est fixé d'avance ; $a/\sqrt k$ ou $a/(b+k)$ sinon ; Polyak si $f^\star$ est connu.
5. **Itérer** $x^{(k+1)}=x^{(k)}-\alpha_kg^{(k)}$ en tenant à jour $f_{\text{best}}^{(k)}$ — **ne jamais oublier ce suivi**.
6. **Borner la sous-optimalité** par (3), ou mieux par la borne inférieure (4).
7. **Conclure sur le coût** : $(RG/\epsilon)^2$ itérations, à comparer au coût par itération (très faible : un sous-gradient).

### Exercices progressifs

**Niveau 1** — Pourquoi doit-on suivre $f_{\text{best}}^{(k)}$ dans la méthode du sous-gradient, alors que c'est inutile pour la descente de gradient ?

<details><summary>Correction</summary>

Parce que la méthode du sous-gradient **n'est pas une méthode de descente** : $f(x^{(k+1)})$ peut être **supérieur** à $f(x^{(k)})$, pour deux raisons — $-g^{(k)}$ peut ne pas être une direction de descente, et le pas est fixé à l'avance sans recherche linéaire. Le point courant n'est donc pas nécessairement le meilleur rencontré. Dans une méthode de descente, $f$ décroît à chaque itération : le point courant **est** toujours le meilleur.

</details>

**Niveau 2** — Avec un pas constant $\alpha$, à quelle précision converge la méthode ? Quel $\alpha$ pour garantir $\epsilon$ ?

<details><summary>Correction</summary>

De (3) avec $\alpha_i=\alpha$ :

$$f_{\text{best}}^{(k)}-f^\star \leq \frac{R^2+G^2\alpha^2k}{2\alpha k} \ \xrightarrow[k\to\infty]{}\ \frac{G^2\alpha}{2}$$

La méthode converge donc **à $G^2\alpha/2$ près**, pas jusqu'à l'optimum. Pour garantir une précision $\epsilon$, il faut $\alpha\leq2\epsilon/G^2$ — et les notes précisent qu'on atteint alors $f(x^{(k)})-f^\star\leq G^2\alpha$ en au plus $R^2/(G^2\alpha^2)$ étapes.

*Le compromis :* un $\alpha$ petit donne une meilleure précision finale mais une convergence plus lente. C'est ce compromis que les pas **décroissants** résolvent, en commençant grand et en finissant petit.

</details>

**Niveau 3** — Démontrez l'inégalité fondamentale $\|x^{(k+1)}-x^\star\|_2^2\leq\|x^{(k)}-x^\star\|_2^2-2\alpha_k(f(x^{(k)})-f^\star)+\alpha_k^2\|g^{(k)}\|_2^2$.

<details><summary>Correction</summary>

On développe le carré :

$$\|x^{(k)}-\alpha_kg^{(k)}-x^\star\|_2^2 = \|x^{(k)}-x^\star\|_2^2 - 2\alpha_k\,g^{(k)T}(x^{(k)}-x^\star)+\alpha_k^2\|g^{(k)}\|_2^2$$

Il reste à minorer le terme croisé. Par **définition du sous-gradient** $g^{(k)}\in\partial f(x^{(k)})$, appliquée au point $x^\star$ :

$$f(x^\star)\geq f(x^{(k)})+g^{(k)T}(x^\star-x^{(k)})$$

soit $g^{(k)T}(x^{(k)}-x^\star)\geq f(x^{(k)})-f^\star$. En reportant (avec $\alpha_k>0$, donc le sens de l'inégalité est préservé après multiplication par $-2\alpha_k$), on obtient le résultat. $\blacksquare$

**Ce que la preuve enseigne.** La **seule** propriété utilisée est la définition du sous-gradient — ni différentiabilité, ni forte convexité, ni conditionnement. C'est pourquoi la méthode s'applique si largement, et aussi pourquoi elle est si lente : elle n'exploite rien d'autre.

</details>

**Niveau 4 — type examen** — Montrez que le pas de Polyak minimise le majorant de l'inégalité fondamentale, puis déduisez-en la borne de convergence.

<details><summary>Correction</summary>

**Minimisation.** Le membre de droite, vu comme fonction de $\alpha_k$, est la quadratique

$$q(\alpha) = \|x^{(k)}-x^\star\|_2^2 - 2\alpha\big(f(x^{(k)})-f^\star\big)+\alpha^2\|g^{(k)}\|_2^2$$

convexe en $\alpha$ (coefficient $\|g^{(k)}\|_2^2>0$). Elle est minimisée en

$$q'(\alpha)=0 \iff -2\big(f(x^{(k)})-f^\star\big)+2\alpha\|g^{(k)}\|_2^2=0 \iff \alpha = \frac{f(x^{(k)})-f^\star}{\|g^{(k)}\|_2^2}$$

qui est exactement le pas de Polyak (5). **Il fait donc le plus grand progrès garanti vers $x^\star$ à chaque itération.**

**Convergence.** En substituant ce pas dans (1) :

$$2\sum_{i=1}^k\frac{(f(x^{(i)})-f^\star)^2}{\|g^{(i)}\|_2^2} \leq R^2 + \sum_{i=1}^k\frac{(f(x^{(i)})-f^\star)^2}{\|g^{(i)}\|_2^2}$$

d'où, en soustrayant la somme du membre de droite,

$$\sum_{i=1}^k\frac{(f(x^{(i)})-f^\star)^2}{\|g^{(i)}\|_2^2}\leq R^2$$

et avec $\|g^{(i)}\|_2\leq G$ :

$$\sum_{i=1}^k\big(f(x^{(i)})-f^\star\big)^2 \leq R^2G^2$$

**Lecture.** La série des carrés des sous-optimalités est **bornée**, donc son terme général tend vers zéro : $f(x^{(k)})\to f^\star$. De plus, si toutes les sous-optimalités valaient au moins $\epsilon$, on aurait $k\epsilon^2\leq R^2G^2$, donc

$$k \leq \Big(\frac{RG}{\epsilon}\Big)^2$$

Le pas de Polyak atteint donc **exactement** la borne optimale du concept 5 — c'est en ce sens qu'il est « optimal ».

**Objection naturelle, et sa réponse.** « $f^\star$ est rarement connu. » Les notes répondent que ce n'est pas si vrai : dans les problèmes de **faisabilité** (trouver un point d'une intersection de convexes, résoudre $f(x)\leq0$) la valeur optimale **est** connue et vaut $0$. Et quand elle ne l'est pas, on l'estime par $f_{\text{best}}^{(k)}-\gamma_k$ avec $\gamma_k\to0$.

</details>

## 🔴 Common mistakes

1. **Faire une recherche linéaire** — les pas sont **fixés à l'avance** ; c'est une caractéristique de la méthode, pas une négligence.
2. **Oublier de suivre $f_{\text{best}}^{(k)}$** — le point courant n'est pas le meilleur ; sans ce suivi, on peut renvoyer un point pire que le point initial.
3. **Croire que $-g^{(k)}$ est une direction de descente** — c'est faux dès que $f$ est non dérivable au point courant.
4. **Attendre la convergence exacte avec un pas constant** — on ne converge qu'à $G^2\alpha/2$ près.
5. **Oublier une des deux conditions sur les pas** — $\sum\alpha_k^2<\infty$ **et** $\sum\alpha_k=\infty$ : l'une borne le bruit, l'autre garantit d'aller assez loin.
6. **Espérer une convergence rapide** — le taux est en $1/\epsilon^2$, c'est intrinsèque à la méthode et non un défaut d'implémentation.
7. **Comparer au gradient sans dire pourquoi** — le gradient est plus rapide **parce qu'il exploite la différentiabilité** ; le sous-gradient n'exploite que la définition du sous-gradient.
8. **Utiliser (3) comme critère d'arrêt strict** — elle est très pessimiste ; la borne inférieure (4) est meilleure, mais en pratique on fixe un budget d'itérations.

## 📌 Ultimate Review

1. Itération : $x^{(k+1)} = x^{(k)}-\alpha_kg^{(k)}$ avec $g^{(k)}\in\partial f(x^{(k)})$.
2. Trois différences avec le gradient : s'applique au **non dérivable**, pas **fixés à l'avance**, **pas une méthode de descente**.
3. On suit $f_{\text{best}}^{(k)} = \min_{i\leq k}f(x^{(i)})$, décroissante par construction.
4. **Cinq règles de pas** : constant, longueur constante, de carré sommable non sommable ($a/(b+k)$), décroissante non sommable ($a/\sqrt k$), longueurs décroissantes non sommables.
5. **Convergence** : à $\epsilon$ près pour un pas constant ; **exacte** pour les règles décroissantes non sommables.
6. **L'analyse suit $\|x^{(k)}-x^\star\|_2$**, pas $f(x^{(k)})$ — c'est le point de bascule du chapitre.
7. **Inégalité fondamentale** : $\|x^{(k+1)}-x^\star\|_2^2\leq\|x^{(k)}-x^\star\|_2^2-2\alpha_k(f(x^{(k)})-f^\star)+\alpha_k^2\|g^{(k)}\|_2^2$.
8. **Inégalité de base** (3) : $f_{\text{best}}^{(k)}-f^\star\leq\big(R^2+G^2\sum_i\alpha_i^2\big)/\big(2\sum_i\alpha_i\big)$.
9. **Borne optimale** : pas constants $\alpha=(R/G)/\sqrt k$, d'où $f_{\text{best}}^{(k)}-f^\star\leq RG/\sqrt k$, et $k\geq(RG/\epsilon)^2$.
10. **Pas de Polyak** $\alpha_k = (f(x^{(k)})-f^\star)/\|g^{(k)}\|_2^2$ : minimise le majorant, atteint la borne optimale.
11. **Critère d'arrêt** (4) : borne inférieure calculable sur $f^\star$, indépendante de $G$ — mais en pratique on fixe un budget.

**Formulas to know**

$$x^{(k+1)}=x^{(k)}-\alpha_kg^{(k)} \qquad \|x^{(k+1)}-x^\star\|_2^2\leq\|x^{(k)}-x^\star\|_2^2-2\alpha_k\big(f(x^{(k)})-f^\star\big)+\alpha_k^2\|g^{(k)}\|_2^2$$

$$f_{\text{best}}^{(k)}-f^\star\leq\frac{R^2+G^2\sum_i\alpha_i^2}{2\sum_i\alpha_i} \qquad f_{\text{best}}^{(k)}-f^\star\leq\frac{RG}{\sqrt k} \qquad \alpha_k=\frac{f(x^{(k)})-f^\star}{\|g^{(k)}\|_2^2}$$

**Methods to know** : le protocole en 7 étapes ; la preuve de l'inégalité fondamentale ; la dérivation de la borne $RG/\sqrt k$ ; la motivation du pas de Polyak.

## 🧠 Active Recall

**Basic** — Écrivez l'itération de la méthode du sous-gradient et citez les trois différences avec la descente de gradient.

<details><summary>Réponse</summary>

$x^{(k+1)}=x^{(k)}-\alpha_kg^{(k)}$ avec $g^{(k)}\in\partial f(x^{(k)})$. **(1)** Elle s'applique aux $f$ **non dérivables**. **(2)** Les pas sont **fixés à l'avance**, sans recherche linéaire. **(3)** Ce n'est **pas** une méthode de descente : la valeur de l'objectif peut augmenter.

</details>

**Understanding** — Pourquoi l'analyse de convergence suit-elle la distance à l'optimum plutôt que la valeur de $f$ ?

<details><summary>Réponse</summary>

Parce que $f(x^{(k)})$ **n'est pas monotone** : la méthode n'est pas une méthode de descente, et l'argument habituel (« la valeur décroît à chaque itération ») s'effondre. En revanche, l'inégalité fondamentale montre que $\|x^{(k)}-x^\star\|_2$ décroît dès que le pas est assez petit : c'est **cette** quantité qui fournit un argument de convergence exploitable.

</details>

**Application** — Avec la règle $\alpha_k = a/(b+k)$, la méthode converge-t-elle exactement ?

<details><summary>Réponse</summary>

**Oui.** Cette règle est de **carré sommable non sommable** : $\sum_k\alpha_k^2 = a^2\sum_k1/(b+k)^2<\infty$ (série de Riemann d'exposant $2$) et $\sum_k\alpha_k = a\sum_k1/(b+k)=\infty$ (série harmonique). Dans (3), le numérateur reste **borné** et le dénominateur **diverge** : le quotient tend vers zéro, donc $f_{\text{best}}^{(k)}\to f^\star$.

</details>

**Comparison** — Comparez les nombres d'itérations du sous-gradient, du gradient et de Newton pour une précision $\epsilon$.

<details><summary>Réponse</summary>

| Méthode | Itérations | Régime |
|---|---|---|
| Sous-gradient | $(RG/\epsilon)^2$ | **polynomial en $1/\epsilon$** |
| Gradient (fortement convexe) | $\kappa\log(1/\epsilon)$ | **linéaire** |
| Newton | $\text{const}+\log_2\log_2(1/\epsilon)$ | **quadratique** |

Réduire l'incertitude d'un facteur $1000$ demande $10^6$ itérations au sous-gradient, quelques centaines au gradient, une poignée à Newton. C'est le prix de la généralité : le sous-gradient n'exploite que la définition du sous-gradient.

</details>

**Exam-style** — Établissez la borne $f_{\text{best}}^{(k)}-f^\star\leq RG/\sqrt k$ et interprétez la quantité $RG$.

<details><summary>Réponse</summary>

Partant de (3), on cherche les $\alpha_i$ minimisant $\big(R^2+G^2\sum_i\alpha_i^2\big)\big/\big(2\sum_i\alpha_i\big)$. Cette fonction est convexe et **symétrique** en $(\alpha_1,\dots,\alpha_k)$ : son minimum est donc atteint quand tous les $\alpha_i$ sont **égaux** à un même $\alpha$. La borne devient $(R^2+G^2k\alpha^2)/(2k\alpha)$, minimisée en $\alpha=(R/G)/\sqrt k$, et vaut alors

$$\frac{R^2+G^2k\cdot R^2/(G^2k)}{2k\cdot(R/G)/\sqrt k} = \frac{2R^2}{2R\sqrt k/G} = \frac{RG}{\sqrt k}$$

**Interprétation de $RG$.** C'est une borne sur l'incertitude **initiale** $f(x^{(1)})-f^\star$ : la distance initiale $R$ multipliée par la constante de Lipschitz $G$. Donc $RG/\epsilon$ est le **rapport de réduction d'incertitude** demandé, et son carré donne le nombre minimal d'itérations — d'où $10^6$ itérations pour un facteur $1000$.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Itération du sous-gradient ? | $x^{(k+1)}=x^{(k)}-\alpha_kg^{(k)}$, $g^{(k)}\in\partial f(x^{(k)})$ |
| Est-ce une méthode de descente ? | **Non** — $f$ peut augmenter |
| Que suit-on à chaque itération ? | $f_{\text{best}}^{(k)}=\min_{i\leq k}f(x^{(i)})$ |
| Comment choisit-on les pas ? | **À l'avance**, sans recherche linéaire |
| Les cinq règles de pas ? | Constant ; longueur constante ; carré sommable non sommable ; décroissant non sommable ; longueurs décroissantes non sommables |
| Exemple de règle convergente ? | $\alpha_k=a/\sqrt k$ ou $a/(b+k)$ |
| Que donne un pas constant ? | Convergence **à $G^2\alpha/2$ près** seulement |
| Quelle quantité décroît dans l'analyse ? | $\\|x^{(k)}-x^\star\\|_2$, pas $f(x^{(k)})$ |
| Inégalité fondamentale ? | $\\|x^{(k+1)}-x^\star\\|^2\leq\\|x^{(k)}-x^\star\\|^2-2\alpha_k(f(x^{(k)})-f^\star)+\alpha_k^2\\|g^{(k)}\\|^2$ |
| Sur quoi repose-t-elle ? | La **seule** définition du sous-gradient |
| Hypothèses de l'analyse ? | $\\|g^{(k)}\\|_2\leq G$ ($f$ $G$-lipschitzienne) et $\\|x^{(1)}-x^\star\\|_2\leq R$ |
| Borne de base (3) ? | $\big(R^2+G^2\sum_i\alpha_i^2\big)/\big(2\sum_i\alpha_i\big)$ |
| Pas optimaux et borne associée ? | $\alpha=(R/G)/\sqrt k$, borne $RG/\sqrt k$ |
| Itérations pour une précision $\epsilon$ ? | Au moins $(RG/\epsilon)^2$ |
| Pas de Polyak ? | $\alpha_k=(f(x^{(k)})-f^\star)/\\|g^{(k)}\\|_2^2$ |
| Que minimise le pas de Polyak ? | Le majorant de l'inégalité fondamentale |
| Quand $f^\star$ est-il connu ? | Dans les problèmes de **faisabilité** ($f^\star=0$) |
| Avantages de la méthode ? | Généralité, mémoire minime, décomposition et calcul distribué |
