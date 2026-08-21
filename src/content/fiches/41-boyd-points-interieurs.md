# Fiche 41 — Méthodes de points intérieurs (Boyd, chapitre 11)

|  |  |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Boyd & Vandenberghe, *Convex Optimization*, chapitre 11 « Interior-point methods », p. 561–620 |
| **Difficulté** | Must know — l'aboutissement algorithmique du livre |
| **Temps d'étude estimé** | 2 h 15 |
| **Prérequis** | Fiches 39 et 40 (Newton, système KKT), fiche 38 (dualité, KKT) |
| **Concepts clés** | Barrière logarithmique, chemin central, points duaux associés, saut de dualité $m/t$, méthode de barrière, compromis sur $\mu$, KKT modifiées, phase I, auto-concordance |
| **Poids à l'examen** | Deux résultats à savoir démontrer : **le saut de dualité vaut exactement $m/t$** sur le chemin central, et le **nombre d'étapes de centrage** $\log(m/(t^{(0)}\varepsilon))/\log\mu$. Plus l'interprétation des KKT **relâchées**. |

## 🎯 Vue d'ensemble

On veut enfin résoudre le problème **complet** :

$$\min\ f_0(x) \quad\text{s.c.}\quad f_i(x)\leq0 \ (i=1,\dots,m), \quad Ax=b$$

avec $f_0,\dots,f_m$ convexes et deux fois dérivables.

**L'idée** : remplacer chaque contrainte d'inégalité par un **mur mou** dans l'objectif — une barrière qui devient infinie au bord — puis durcir progressivement ce mur. Chaque problème intermédiaire n'a plus que des **égalités** : c'est le chapitre 10.

```
INDICATRICE I₋(u)   (mur infini, non différentiable)
      ↓  approximée par
BARRIÈRE  −(1/t)·log(−u)   (mur mou, C^∞, de plus en plus raide quand t croît)
      ↓
CENTRAGE : min t·f₀(x) + φ(x)  s.c.  Ax = b        ← Newton du chapitre 10
      ↓  puis  t := μt  et on recommence
SAUT DE DUALITÉ EXACT : f₀(x*(t)) − p* ≤ m/t
```

**La hiérarchie du livre est ainsi complète** : quadratique à égalités (système linéaire) → Newton (suite de quadratiques) → points intérieurs (suite de problèmes à égalités).

## 🟡 Concept 1 — De l'indicatrice à la barrière

On rend d'abord les inégalités **implicites** :

$$\min\ f_0(x) + \sum_{i=1}^m I_-\big(f_i(x)\big) \quad\text{s.c.}\quad Ax=b \tag{11.3}$$

où $I_-(u)=0$ si $u\leq0$ et $+\infty$ sinon. C'est exact, mais l'objectif n'est **pas différentiable** : Newton est inapplicable.

**L'approximation.**

$$\hat I_-(u) = -\frac1t\log(-u), \qquad \mathbf{dom}\,\hat I_- = -\mathbb{R}_{++}$$

avec $t>0$ réglant la précision. Comme $I_-$, la fonction $\hat I_-$ est **convexe et croissante**, et vaut $+\infty$ pour $u>0$. Contrairement à $I_-$, elle est **différentiable et fermée** : elle croît vers $+\infty$ quand $u\to0^-$. **Plus $t$ est grand, meilleure est l'approximation.**

**La barrière logarithmique.**

$$\phi(x) = -\sum_{i=1}^m\log\big(-f_i(x)\big), \qquad \mathbf{dom}\,\phi = \{x \mid f_i(x)<0 \ \forall i\} \tag{11.5}$$

Son domaine est l'ensemble des points **strictement admissibles**. Quel que soit $t>0$, la barrière croît sans borne dès qu'un $f_i(x)\to0$.

**Ses dérivées, à savoir écrire.**

$$\nabla\phi(x) = \sum_{i=1}^m\frac{1}{-f_i(x)}\nabla f_i(x)$$

$$\nabla^2\phi(x) = \sum_{i=1}^m\frac{1}{f_i(x)^2}\nabla f_i(x)\nabla f_i(x)^T + \sum_{i=1}^m\frac{1}{-f_i(x)}\nabla^2f_i(x)$$

*Cas d'un LP $\min c^Tx$ s.c. $Ax\preceq b$ (exemple 11.1).* Avec $d_i = 1/(b_i-a_i^Tx)$ :

$$\nabla\phi(x) = A^Td, \qquad \nabla^2\phi(x) = A^T\mathbf{diag}(d)^2A$$

La hessienne est inversible si et seulement si $\mathbf{rank}\,A=n$.

⚠️ **Le dilemme.** Plus $t$ est grand, plus l'approximation est fidèle — mais plus $f_0+\frac1t\phi$ est **difficile à minimiser par Newton**, sa hessienne variant très vite près du bord. D'où la solution : ne pas prendre $t$ grand d'emblée, mais résoudre une **suite** de problèmes à $t$ croissant, en démarrant chaque minimisation **au point trouvé pour le $t$ précédent**.

## 🔴 Concept 2 — Le chemin central

Il est commode de multiplier l'objectif par $t$ :

$$\min\ t f_0(x)+\phi(x) \quad\text{s.c.}\quad Ax=b \tag{11.6}$$

On note $x^\star(t)$ sa solution. L'ensemble $\{x^\star(t) \mid t>0\}$ s'appelle le **chemin central**, et ses points les **points centraux**.

**Caractérisation.** $x^\star(t)$ est strictement admissible ($Ax^\star(t)=b$, $f_i(x^\star(t))<0$) et il existe $\hat\nu$ tel que

$$0 = t\nabla f_0(x^\star(t)) + \sum_{i=1}^m\frac{1}{-f_i(x^\star(t))}\nabla f_i(x^\star(t)) + A^T\hat\nu \tag{11.7}$$

**Les points duaux associés.** Posons

$$\lambda_i^\star(t) = \frac{1}{-t\,f_i(x^\star(t))} \ (>0), \qquad \nu^\star(t) = \frac{\hat\nu}{t}$$

La condition (11.7) devient exactement la **stationnarité du Lagrangien** en $x^\star(t)$ :

$$\nabla f_0(x^\star(t)) + \sum_i\lambda_i^\star(t)\nabla f_i(x^\star(t)) + A^T\nu^\star(t) = 0$$

Donc $x^\star(t)$ **minimise** le Lagrangien pour ce couple dual, et $(\lambda^\star(t),\nu^\star(t))$ est **dual admissible** ($\lambda^\star(t)\succ0$).

**Le résultat central du chapitre.**

$$g\big(\lambda^\star(t),\nu^\star(t)\big) = f_0(x^\star(t)) + \sum_i\lambda_i^\star(t)f_i(x^\star(t)) + \nu^\star(t)^T(Ax^\star(t)-b) = f_0(x^\star(t)) - \frac{m}{t}$$

(chaque terme $\lambda_i^\star(t)f_i(x^\star(t))$ vaut $-1/t$, et il y en a $m$ ; le terme en $\nu$ est nul). D'où

$$\boxed{\ f_0(x^\star(t)) - p^\star \ \leq\ \frac{m}{t}\ } \tag{11.11}$$

> **Ce résultat est remarquable.** Il ne dit pas seulement que $x^\star(t)\to x^\star$ : il donne un **certificat de sous-optimalité exact et gratuit**. Après un centrage à la valeur $t$, on **sait** qu'on est à $m/t$ près de l'optimum, sans rien calculer de plus. Le paramètre $t$ n'est pas un réglage aveugle : c'est une **précision garantie**.

## 🔴 Concept 3 — La méthode de barrière

**Algorithme 11.1 — méthode de barrière.**

```
donné un point strictement admissible x, t := t⁽⁰⁾ > 0, μ > 1, tolérance ε > 0
répéter
  1. Centrage. Calculer x*(t) en minimisant t·f₀ + φ sous Ax = b,
     en démarrant depuis x.                            ← Newton, chapitre 10
  2. Mise à jour. x := x*(t)
  3. Arrêt. terminer si m/t < ε
  4. Augmentation. t := μ·t
```

**Vocabulaire.** Chaque exécution de l'étape 1 est une **étape de centrage** ou **itération externe** ; les itérations de Newton qu'elle contient sont les **itérations internes**. L'algorithme peut aussi renvoyer $\lambda^\star(t)$ et $\nu^\star(t)$ : un point dual $\varepsilon$-sous-optimal, **certificat** de la qualité de $x$.

**Analyse de convergence (§11.3.3).** Après le centrage initial et $k$ centrages supplémentaires, le saut de dualité vaut $m/(\mu^kt^{(0)})$. La précision $\varepsilon$ est donc atteinte après **exactement**

$$\Big\lceil\frac{\log\big(m/(t^{(0)}\varepsilon)\big)}{\log\mu}\Big\rceil \ \text{ étapes de centrage} \tag{11.13}$$

plus le centrage initial.

**Le compromis sur $\mu$**, qui est *le* point de conception de la méthode :

| $\mu$ | Étapes externes | Itérations de Newton par étape |
|---|---|---|
| **petit** (proche de 1) | **beaucoup** | **peu** — le point de départ est déjà très bon |
| **grand** (10, 100…) | **peu** | **beaucoup** — le point de départ est loin du nouveau centre |

En pratique, le nombre **total** d'itérations de Newton est remarquablement **plat** pour $\mu$ entre $10$ et $100$ : le compromis se compense presque exactement. C'est ce qui rend la méthode robuste — le réglage de $\mu$ n'est pas critique.

⚠️ La méthode exige un point **strictement admissible** pour démarrer. L'obtenir est l'objet de la **phase I** (concept 5).

## 🔴 Concept 4 — Les conditions KKT modifiées

Le pas de Newton du centrage est donné par (fiche 40) :

$$\begin{pmatrix} t\nabla^2f_0(x)+\nabla^2\phi(x) & A^T\\ A & 0\end{pmatrix}\begin{pmatrix}\Delta x_{\text{nt}}\\ \nu_{\text{nt}}\end{pmatrix} = -\begin{pmatrix}t\nabla f_0(x)+\nabla\phi(x)\\ 0\end{pmatrix} \tag{11.14}$$

**La lecture profonde (§11.3.4).** Ce pas s'interprète comme un pas de Newton pour résoudre directement les **conditions KKT modifiées** :

$$\begin{cases}\nabla f_0(x)+\sum_i\lambda_i\nabla f_i(x)+A^T\nu = 0 & \text{(stationnarité)}\\[2pt] -\lambda_i f_i(x) = 1/t, \quad i=1,\dots,m & \text{(complémentarité \textbf{relâchée})}\\[2pt] Ax=b & \text{(admissibilité)}\end{cases} \tag{11.15}$$

**Comparez avec les KKT exactes** (fiche 38) : la seule différence est la deuxième ligne. Les écarts complémentaires $\lambda_if_i(x)=0$ sont remplacés par

$$-\lambda_if_i(x) = \frac1t$$

> **C'est toute l'idée des méthodes de points intérieurs, en une ligne.** On refuse la complémentarité **exacte** — qui force chaque produit à être nul, donc pousse les itérés **sur le bord** où tout se dégrade numériquement — et on la remplace par une complémentarité **relâchée** à hauteur $1/t$. Quand $t\to\infty$, on retrouve les KKT exactes. Le chemin central est précisément le lieu des solutions de ces KKT relâchées.

On peut d'ailleurs éliminer les $\lambda_i$ par $\lambda_i = -1/(t f_i(x))$, ce qui ramène (11.15) à $n+p$ équations en $(x,\nu)$ — et le pas de Newton de ce système est exactement (11.14).

## 🟠 Concept 5 — Phase I : trouver un point strictement admissible

**Le problème.** Étant donné $f_i(x)\leq0$ et $Ax=b$, trouver un point **strictement** admissible — ou établir qu'il n'en existe pas. On suppose disposer d'un $x^{(0)}\in\bigcap_i\mathbf{dom}\,f_i$ avec $Ax^{(0)}=b$.

**Le problème de phase I (11.19).**

$$\begin{array}{ll}\text{minimiser} & s\\ \text{sous} & f_i(x)\leq s, \quad i=1,\dots,m\\ & Ax=b\end{array}$$

de variables $x\in\mathbb{R}^n$ **et** $s\in\mathbb{R}$. La variable $s$ borne l'**infaisabilité maximale** ; le but est de la faire passer sous zéro.

**Pourquoi ça marche.** Ce problème est **toujours strictement admissible** : on prend $x=x^{(0)}$ et n'importe quel $s>\max_if_i(x^{(0)})$. On peut donc lui appliquer la méthode de barrière — sans avoir besoin d'une phase I pour la phase I.

**Trois cas, selon le signe de la valeur optimale $\bar p^\star$.**

| Signe | Conclusion |
|---|---|
| $\bar p^\star<0$ | le système **a** une solution strictement admissible ; **et l'on peut s'arrêter dès que $s<0$**, sans résoudre précisément |
| $\bar p^\star>0$ | le système est **non admissible** (aucun $x$ ne satisfait les inégalités) |
| $\bar p^\star=0$ | cas limite : admissible mais **pas strictement** — la méthode de barrière ne démarre pas |

> **Le point pratique.** Dans le premier cas, on n'optimise pas : on **s'arrête au premier $s<0$ rencontré**. La phase I est un problème de faisabilité déguisé en problème d'optimisation, et il n'y a aucune raison de le résoudre finement.

**Variante (§11.4.2).** On peut aussi utiliser directement la **méthode de Newton à départ non admissible** (fiche 40, §10.3), qui traite en une seule passe l'admissibilité et l'optimisation.

## 🟢 Concept 6 — Complexité et auto-concordance (§11.5)

L'analyse du concept 3 montre que la méthode **converge**, mais ne dit rien du coût **réel** : les problèmes de centrage deviennent-ils de plus en plus durs quand $t$ croît ?

La réponse passe par l'**auto-concordance** (§9.6) : si $tf_0+\phi$ est auto-concordante pour tout $t$, on borne le nombre d'itérations de Newton **par étape de centrage** indépendamment de $t$, et l'on obtient une **borne de complexité polynomiale** sur le nombre total d'itérations de Newton.

> **La conséquence historique.** C'est cette analyse — Nesterov et Nemirovski, à la suite de Karmarkar (1984) — qui a établi que l'optimisation convexe est **résoluble en temps polynomial**, et qui a fait des points intérieurs la méthode dominante pour les LP de grande taille, les SOCP et les SDP.

### Comment résoudre l'exercice type (protocole)

1. **Vérifier la forme** : $f_0,\dots,f_m$ convexes $C^2$, égalités **affines**.
2. **Écrire la barrière** $\phi(x)=-\sum_i\log(-f_i(x))$ et son domaine (les points strictement admissibles).
3. **Calculer $\nabla\phi$ et $\nabla^2\phi$** — pour un LP, $A^Td$ et $A^T\mathbf{diag}(d)^2A$ avec $d_i=1/(b_i-a_i^Tx)$.
4. **Trouver un point strictement admissible** : par inspection, ou par la **phase I**.
5. **Choisir $t^{(0)}$ et $\mu$** ($\mu$ entre $10$ et $100$ en pratique).
6. **Boucle externe** : centrer par Newton (fiche 40), arrêter si $m/t<\varepsilon$, sinon $t:=\mu t$.
7. **Compter les étapes** : $\lceil\log(m/(t^{(0)}\varepsilon))/\log\mu\rceil$.
8. **Fournir le certificat dual** : $\lambda_i^\star(t)=-1/(tf_i(x))$ et $\nu^\star(t)$, qui prouvent la $m/t$-sous-optimalité.

### Exercices progressifs

**Niveau 1** — Un problème a $m=100$ contraintes d'inégalité. Quel $t$ garantit une précision $\varepsilon=10^{-6}$ ?

<details><summary>Correction</summary>

Le saut de dualité sur le chemin central vaut $m/t$, donc il faut

$$\frac{100}{t}\leq10^{-6} \iff t\geq10^8$$

*À noter :* la précision ne dépend **que** de $m/t$, pas de la dimension $n$ ni de la difficulté de $f_0$. C'est ce qui rend le critère d'arrêt si simple.

</details>

**Niveau 2** — Écrivez la barrière logarithmique et son gradient pour $\min c^Tx$ s.c. $Ax\preceq b$.

<details><summary>Correction</summary>

$$\phi(x) = -\sum_{i=1}^m\log(b_i-a_i^Tx), \qquad \mathbf{dom}\,\phi = \{x\mid Ax\prec b\}$$

En posant $d_i = 1/(b_i-a_i^Tx)$ :

$$\nabla\phi(x) = \sum_{i=1}^m d_i\,a_i = A^Td, \qquad \nabla^2\phi(x) = A^T\mathbf{diag}(d)^2A$$

La condition de centralité (11.9) s'écrit alors $tc+A^Td = 0$. La hessienne est inversible si et seulement si $\mathbf{rank}\,A=n$. *C'est exactement la fonction « centre analytique » rencontrée au chapitre 9.*

</details>

**Niveau 3** — Démontrez que le saut de dualité au point $x^\star(t)$ vaut exactement $m/t$.

<details><summary>Correction</summary>

Posons $\lambda_i^\star(t) = \dfrac{1}{-t f_i(x^\star(t))}$, strictement positif puisque $f_i(x^\star(t))<0$, et $\nu^\star(t)=\hat\nu/t$. La condition de centralité (11.7), divisée par $t$, s'écrit

$$\nabla f_0(x^\star(t)) + \sum_i\lambda_i^\star(t)\nabla f_i(x^\star(t)) + A^T\nu^\star(t) = 0$$

donc $x^\star(t)$ **minimise** le Lagrangien $L(\cdot,\lambda^\star(t),\nu^\star(t))$, qui est convexe. Par conséquent

$$g(\lambda^\star(t),\nu^\star(t)) = L\big(x^\star(t),\lambda^\star(t),\nu^\star(t)\big) = f_0(x^\star(t)) + \sum_i\lambda_i^\star(t)f_i(x^\star(t)) + \nu^\star(t)^T\underbrace{(Ax^\star(t)-b)}_{=0}$$

Or $\lambda_i^\star(t)f_i(x^\star(t)) = -1/t$ pour **chaque** $i$, et il y en a $m$ :

$$g(\lambda^\star(t),\nu^\star(t)) = f_0(x^\star(t)) - \frac{m}{t}$$

Par dualité faible, $g\leq p^\star$, d'où $f_0(x^\star(t))-p^\star\leq m/t$. $\blacksquare$

</details>

**Niveau 4 — type examen** — Un LP a $m=1000$ contraintes. On part de $t^{(0)}=1$ et l'on veut $\varepsilon=10^{-8}$. Combien d'étapes de centrage pour $\mu=2$, $\mu=10$, $\mu=100$ ? Commentez.

<details><summary>Correction</summary>

La formule (11.13) donne $\lceil\log(m/(t^{(0)}\varepsilon))/\log\mu\rceil$ avec

$$\frac{m}{t^{(0)}\varepsilon} = \frac{1000}{10^{-8}} = 10^{11}, \qquad \log(10^{11}) = 11\log 10 \approx 25{,}3$$

| $\mu$ | $\log\mu$ | Étapes de centrage |
|---|---|---|
| $2$ | $0{,}69$ | $\lceil 36{,}5\rceil = 37$ |
| $10$ | $2{,}30$ | $\lceil 11{,}0\rceil = 11$ |
| $100$ | $4{,}61$ | $\lceil 5{,}5\rceil = 6$ |

**Commentaire.** Le nombre d'étapes **externes** chute vite avec $\mu$ — mais c'est trompeur : chaque centrage devient plus dur, car le point de départ (le centre précédent) est plus loin du nouveau centre, et Newton y fait davantage d'itérations **internes**. En pratique, le nombre **total** d'itérations de Newton est presque constant pour $\mu$ entre $10$ et $100$ : les deux effets se compensent.

**Ce qu'il faut retenir.** La dépendance en $\varepsilon$ est **logarithmique** : passer de $10^{-8}$ à $10^{-16}$ ne fait qu'ajouter quelques étapes. Et la dépendance en $m$ l'est aussi. C'est ce qui permet aux points intérieurs de résoudre des problèmes à des centaines de milliers de contraintes.

</details>

## 🔴 Common mistakes

1. **Prendre $t$ grand d'emblée** — la hessienne de $tf_0+\phi$ varie violemment près du bord et Newton échoue. Tout l'art est de **faire croître $t$ progressivement**.
2. **Démarrer d'un point non strictement admissible** — le domaine de $\phi$ exige $f_i(x)<0$ **strictement**. D'où la phase I.
3. **Confondre itérations internes et externes** — les externes sont les étapes de centrage ; les internes, les pas de Newton.
4. **Oublier que le saut de dualité est *exact*** — $m/t$ n'est pas une estimation heuristique mais un certificat démontré.
5. **Croire que $m$ est le nombre de variables** — c'est le nombre de **contraintes d'inégalité** ; les égalités et la dimension $n$ n'entrent pas dans $m/t$.
6. **Résoudre finement la phase I** — on s'arrête dès que $s<0$ ; on ne cherche pas $\bar p^\star$.
7. **Croire les KKT modifiées approximatives** — le chemin central les résout **exactement** ; c'est la complémentarité qui est délibérément relâchée à $1/t$.
8. **Régler $\mu$ trop finement** — le coût total est plat entre $10$ et $100$ ; ce n'est pas un paramètre critique.

## 📌 Ultimate Review

1. Barrière logarithmique $\phi(x)=-\sum_i\log(-f_i(x))$, de domaine les points **strictement admissibles** ; elle approxime $\sum_iI_-(f_i(x))$ à $1/t$ près.
2. Problème de centrage : $\min\ tf_0(x)+\phi(x)$ s.c. $Ax=b$ — **que des égalités**, donc Newton du chapitre 10.
3. **Chemin central** $\{x^\star(t)\mid t>0\}$, caractérisé par (11.7).
4. Points duaux associés : $\lambda_i^\star(t)=-1/(tf_i(x^\star(t)))$, $\nu^\star(t)=\hat\nu/t$ — **dual admissibles**.
5. **Saut de dualité exact** : $f_0(x^\star(t))-p^\star\leq m/t$ — un certificat gratuit.
6. **Méthode de barrière** : centrer, tester $m/t<\varepsilon$, faire $t:=\mu t$, recommencer.
7. **Nombre d'étapes de centrage** : $\lceil\log(m/(t^{(0)}\varepsilon))/\log\mu\rceil$ ; compromis sur $\mu$, coût total plat entre $10$ et $100$.
8. **KKT modifiées** : $-\lambda_if_i(x)=1/t$ au lieu de $\lambda_if_i(x)=0$ — la **complémentarité relâchée**.
9. **Phase I** : $\min s$ s.c. $f_i(x)\leq s$, $Ax=b$ ; toujours strictement admissible ; arrêt dès $s<0$ ; $\bar p^\star>0$ signifie non admissible.
10. **Auto-concordance** : donne une borne de complexité **polynomiale** sur le nombre total d'itérations de Newton.

**Formulas to know**

$$\phi(x)=-\sum_{i=1}^m\log(-f_i(x)) \qquad \min\ tf_0(x)+\phi(x) \ \text{ s.c. } Ax=b \qquad f_0(x^\star(t))-p^\star\leq\frac{m}{t}$$

$$\lambda_i^\star(t)=\frac{1}{-t f_i(x^\star(t))} \qquad -\lambda_if_i(x)=\frac1t \qquad \Big\lceil\frac{\log(m/(t^{(0)}\varepsilon))}{\log\mu}\Big\rceil$$

**Methods to know** : le protocole en 8 étapes ; la démonstration du saut $m/t$ ; le calcul du nombre d'étapes de centrage ; la construction du problème de phase I.

## 🧠 Active Recall

**Basic** — Écrivez la barrière logarithmique, son domaine, et le problème de centrage.

<details><summary>Réponse</summary>

$\phi(x)=-\sum_{i=1}^m\log(-f_i(x))$, de domaine $\{x\mid f_i(x)<0\ \forall i\}$ — les points **strictement** admissibles. Problème de centrage : $\min\ tf_0(x)+\phi(x)$ sous $Ax=b$, qui ne comporte que des **égalités** et se résout par Newton (chapitre 10).

</details>

**Understanding** — Pourquoi ne prend-on pas simplement $t$ très grand dès la première itération ?

<details><summary>Réponse</summary>

Parce que $tf_0+\phi$ devient très difficile à minimiser par Newton quand $t$ est grand : sa hessienne **varie très rapidement** près du bord de l'ensemble admissible, et la méthode de Newton s'y comporte mal. On résout donc une **suite** de problèmes à $t$ croissant, en démarrant chaque minimisation au centre précédent — point déjà très proche du nouveau.

</details>

**Application** — Sur le chemin central, quelle relation vérifient $\lambda_i^\star(t)$ et $f_i(x^\star(t))$ ?

<details><summary>Réponse</summary>

$$\lambda_i^\star(t)\,f_i(x^\star(t)) = -\frac1t \qquad\text{pour chaque } i$$

C'est la **complémentarité relâchée** : au lieu d'un produit nul (KKT exactes), chaque produit vaut exactement $-1/t$. En sommant sur les $m$ contraintes, on obtient le saut de dualité $m/t$.

</details>

**Comparison** — KKT exactes et KKT modifiées : qu'est-ce qui change, et pourquoi est-ce une bonne idée ?

<details><summary>Réponse</summary>

Seule la complémentarité change : $\lambda_if_i(x)=0$ devient $-\lambda_if_i(x)=1/t$. Les conditions de stationnarité et d'admissibilité sont identiques.

**Pourquoi c'est une bonne idée :** la complémentarité exacte force, pour chaque $i$, soit $\lambda_i=0$ soit $f_i(x)=0$ — donc pousse les itérés **sur le bord** de l'ensemble admissible, là où la barrière et sa hessienne dégénèrent. La version relâchée maintient les itérés **strictement à l'intérieur** (d'où le nom de la méthode), avec un compromis contrôlé par $t$, et l'on retrouve les KKT exactes à la limite $t\to\infty$.

</details>

**Exam-style** — Décrivez la méthode de barrière et justifiez son critère d'arrêt.

<details><summary>Réponse</summary>

Partant d'un point **strictement admissible** et de $t=t^{(0)}>0$, on répète : **(1)** centrer, c'est-à-dire minimiser $tf_0+\phi$ sous $Ax=b$ par la méthode de Newton du chapitre 10, en démarrant au point courant ; **(2)** poser $x:=x^\star(t)$ ; **(3)** s'arrêter si $m/t<\varepsilon$ ; **(4)** sinon $t:=\mu t$ et recommencer.

*Justification du critère.* Sur le chemin central, le couple $\lambda_i^\star(t)=-1/(tf_i(x^\star(t)))$, $\nu^\star(t)$ est **dual admissible**, et la valeur duale associée vaut exactement $f_0(x^\star(t))-m/t$. Par dualité faible, $f_0(x^\star(t))-p^\star\leq m/t$. Le test $m/t<\varepsilon$ **garantit** donc une $\varepsilon$-sous-optimalité, et l'algorithme peut renvoyer $(\lambda^\star(t),\nu^\star(t))$ comme **certificat** vérifiable.

*Nombre d'étapes.* $\lceil\log(m/(t^{(0)}\varepsilon))/\log\mu\rceil$, plus le centrage initial.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Barrière logarithmique ? | $\phi(x)=-\sum_i\log(-f_i(x))$ |
| Domaine de la barrière ? | Les points **strictement** admissibles, $f_i(x)<0$ |
| Que remplace la barrière ? | L'indicatrice $I_-$, approximée par $-\frac1t\log(-u)$ |
| Problème de centrage ? | $\min\ tf_0(x)+\phi(x)$ s.c. $Ax=b$ |
| Chemin central ? | L'ensemble des $x^\star(t)$, $t>0$ |
| Points duaux associés ? | $\lambda_i^\star(t)=-1/(tf_i(x^\star(t)))$, $\nu^\star(t)=\hat\nu/t$ |
| Saut de dualité sur le chemin central ? | Exactement $m/t$ |
| Critère d'arrêt de la méthode de barrière ? | $m/t<\varepsilon$ |
| Que vaut $m$ ? | Le nombre de contraintes d'**inégalité** |
| Nombre d'étapes de centrage ? | $\lceil\log(m/(t^{(0)}\varepsilon))/\log\mu\rceil$ |
| Effet d'un grand $\mu$ ? | Moins d'étapes externes, plus d'itérations de Newton internes |
| Valeur usuelle de $\mu$ ? | Entre $10$ et $100$ — le coût total y est plat |
| KKT modifiées ? | $-\lambda_if_i(x)=1/t$ au lieu de $\lambda_if_i(x)=0$ |
| Pourquoi relâcher la complémentarité ? | Pour garder les itérés **strictement à l'intérieur** |
| Problème de phase I ? | $\min s$ s.c. $f_i(x)\leq s$, $Ax=b$ |
| Quand arrête-t-on la phase I ? | Dès que $s<0$ |
| $\bar p^\star>0$ en phase I signifie ? | Le système est **non admissible** |
| Que donne l'auto-concordance ? | Une borne de complexité **polynomiale** |
