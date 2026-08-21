# Fiche 32 — Applications en automatique : suivi de consigne et robustesse

|  |  |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Vandenberghe, *EE236A — Linear Programming* (UCLA), Lecture 11 « Control applications », 18 diapositives |
| **Difficulté** | Application — la modélisation compte plus que la théorie |
| **Temps d'étude estimé** | 1 h 30 |
| **Prérequis** | Fiche 25 (reformulations affines par morceaux), fiche 24 (forme matricielle) |
| **Concepts clés** | Réponse impulsionnelle, matrice de Toeplitz, suivi de consigne, contraintes d'amplitude et de vitesse, conception robuste, formulation compacte, placement de pôles |
| **Poids à l'examen** | Ce sont des exercices de **modélisation** : traduire un cahier des charges physique en LP. La reformulation compacte du cas robuste (concept 5) est le morceau technique. |

## 🎯 Vue d'ensemble

La fiche 24 avait ouvert sur un problème de commande sans le résoudre : « ce problème se formule comme un LP, donc se résout facilement ». Cette leçon montre comment, et pousse l'idée jusqu'à la **conception robuste** — concevoir une commande qui fonctionne pour **toute une famille** de systèmes, et non pour un modèle unique.

Le fil directeur est toujours le même, celui de la fiche 25 :

```
CAHIER DES CHARGES     erreur crête à minimiser, amplitude et vitesse bornées
    ↓  la sortie est LINÉAIRE en la commande :  y = Hu
OBJECTIF ‖Hu − y_des‖∞  →  variable auxiliaire γ  →  LP
    ↓  incertitude sur le modèle
PIRE CAS sur une famille  →  encore un LP, à condition de le formuler COMPACTEMENT
```

## 🟡 Concept 1 — Le modèle : convolution et matrice de Toeplitz

Un système linéaire invariant à une entrée $u(t)$ et une sortie $y(t)$ s'écrit comme une **convolution** avec sa **réponse impulsionnelle** $(h_0,h_1,h_2,\dots)$ :

$$y(t) = h_0u(t) + h_1u(t-1) + h_2u(t-2)+\cdots$$

**Forme matricielle.** En supposant $u(t)=0$ pour $t<0$ et $t>M$, et en posant $y = (y(0),\dots,y(N))$, $u = (u(0),\dots,u(M))$ :

$$y = Hu, \qquad H = \begin{pmatrix} h_0 & 0 & 0 & \cdots & 0\\ h_1 & h_0 & 0 & \cdots & 0\\ h_2 & h_1 & h_0 & \cdots & 0\\ \vdots & & & \ddots & \vdots\\ h_M & h_{M-1} & h_{M-2} & \cdots & h_0\\ \vdots & & & & \vdots\\ h_N & h_{N-1} & h_{N-2} & \cdots & h_{N-M}\end{pmatrix}$$

$H$ est une matrice de **Toeplitz** (constante sur chaque diagonale) et **triangulaire inférieure** : la sortie à l'instant $t$ ne dépend que des entrées **passées**. C'est la causalité, lue sur la structure de la matrice.

**Le point à retenir.** $y$ est une fonction **linéaire** de $u$. Tout ce qui s'exprime en normes $\|\cdot\|_1$ ou $\|\cdot\|_\infty$ de $y$ et de $u$ devient donc justiciable de la fiche 25.

## 🔴 Concept 2 — Le problème de suivi de consigne

**Cahier des charges.** Choisir la séquence d'entrée $u(0),\dots,u(M)$ (avec $M\leq N$) telle que :

- la sortie **minimise l'écart crête** à une sortie désirée $y_{\text{des}}(t)$ : $$\min\ \max_{t=0,\dots,N}\ |y(t)-y_{\text{des}}(t)|$$
- l'entrée respecte une contrainte d'**amplitude** : $|u(t)|\leq U$ pour $t=0,\dots,M$ ;
- l'entrée respecte une contrainte de **vitesse de variation** (*slew rate*) : $|u(t+1)-u(t)|\leq S$ pour $t=0,\dots,M-1$.

D'autres contraintes **linéaires** sur les entrées ou les sorties peuvent s'ajouter sans changer la nature du problème.

**En notation matricielle :**

$$\begin{array}{ll}\text{minimiser} & \|Hu-y_{\text{des}}\|_\infty\\ \text{sous} & \|u\|_\infty\leq U\\ & \|Du\|_\infty\leq S\end{array}$$

où $D$ est la matrice de **différences finies**, de taille $M\times(M+1)$ :

$$D = \begin{pmatrix} -1 & 1 & 0 & \cdots & 0 & 0\\ 0 & -1 & 1 & \cdots & 0 & 0\\ \vdots & & & \ddots & & \vdots\\ 0 & 0 & 0 & \cdots & -1 & 1\end{pmatrix}$$

**Le LP équivalent** (variables $\gamma$ et $u$), par la recette de la fiche 25 :

$$\begin{array}{ll}\text{minimiser} & \gamma\\ \text{sous} & -\gamma\mathbf1 \preceq Hu-y_{\text{des}}\preceq \gamma\mathbf1\\ & -U\mathbf1\preceq u\preceq U\mathbf1\\ & -S\mathbf1\preceq Du\preceq S\mathbf1\end{array}$$

**Exemple numérique du cours.** Horizon d'entrée $M=150$, horizon de sortie $N=200$, contrainte d'amplitude $|u(t)|\leq1{,}1$, contrainte de vitesse $|u(t)-u(t-1)|\leq0{,}25$. La solution optimale sature les deux contraintes par plages entières : l'entrée optimale est en « paliers et rampes », caractéristique des solutions de LP — l'optimum est à un **sommet**, donc un maximum de contraintes y sont actives.

⚠️ **Une seule** variable auxiliaire $\gamma$ suffit, car l'objectif est une norme **infinie** (un maximum). Si le cahier des charges demandait de minimiser l'**erreur totale** $\|Hu-y_{\text{des}}\|_1$, il faudrait un **vecteur** d'auxiliaires — voir fiche 25.

## 🟠 Concept 3 — Suivi robuste, version 1 : deux modèles

**Modèle incertain.** La réponse impulsionnelle peut prendre **deux** valeurs :

$$(h^1_0,h^1_1,h^1_2,\dots) \qquad\text{ou}\qquad (h^2_0,h^2_1,h^2_2,\dots)$$

**Problème robuste** : minimiser l'erreur crête **dans le pire des cas**

$$\min\ \max\big\{\|H_1u-y_{\text{des}}\|_\infty,\ \|H_2u-y_{\text{des}}\|_\infty\big\}$$

sous les mêmes limites d'amplitude et de vitesse. $H_1$ et $H_2$ sont les matrices de Toeplitz des deux réponses impulsionnelles.

**LP équivalent** (variables $\gamma$, $u$) :

$$\begin{array}{ll}\text{minimiser} & \gamma\\ \text{sous} & -\gamma\mathbf1\preceq H_1u-y_{\text{des}}\preceq\gamma\mathbf1\\ & -\gamma\mathbf1\preceq H_2u-y_{\text{des}}\preceq\gamma\mathbf1\\ & Au\preceq b\end{array}$$

(les inégalités $Au\preceq b$ regroupant $-U\mathbf1\preceq u\preceq U\mathbf1$ et $-S\mathbf1\preceq Du\preceq S\mathbf1$).

**Le principe.** Un maximum sur un ensemble **fini** de modèles se traite en **empilant** les contraintes : la même variable $\gamma$ majore l'erreur de chacun. C'est encore la recette du concept 2 de la fiche 25.

## 🔴 Concept 4 — Suivi robuste, version 2 : une famille continue

**Modèle incertain paramétré.**

$$\begin{pmatrix}h_0\\ h_1\\ \vdots\\ h_N\end{pmatrix} = \begin{pmatrix}\bar h_0\\ \bar h_1\\ \vdots\\ \bar h_N\end{pmatrix} + \begin{pmatrix} v_{01} & v_{02} & \cdots & v_{0K}\\ v_{11} & v_{12} & \cdots & v_{1K}\\ \vdots & & & \vdots\\ v_{N1} & v_{N2} & \cdots & v_{NK}\end{pmatrix}\begin{pmatrix}s_1\\ s_2\\ \vdots\\ s_K\end{pmatrix}$$

- $(\bar h_0,\bar h_1,\dots)$ est la réponse impulsionnelle **nominale**, connue ;
- $s_1,\dots,s_K$ sont des paramètres **inconnus** dans $[-1,1]$.

**Problème robuste :**

$$\min_u\ \max_{\|s\|_\infty\leq1}\ \Big\|\Big(\bar H + \sum_{k=1}^K s_kV_k\Big)u - y_{\text{des}}\Big\|_\infty \qquad\text{sous}\qquad Au\preceq b$$

où $\bar H$ et les $V_k$ sont les matrices de Toeplitz construites sur $(\bar h_i)$ et sur les colonnes $(v_{ik})_i$.

**La formulation naïve, et pourquoi elle échoue.** On pourrait énumérer les $2^K$ **sommets** du cube $[-1,1]^K$ (le maximum d'une fonction convexe sur un cube est atteint en un sommet) et empiler les contraintes comme au concept 3 :

$$\min\ \gamma \quad\text{s.c.}\quad -\gamma\mathbf1\preceq\Big(\bar H+\sum_k s_kV_k\Big)u-y_{\text{des}}\preceq\gamma\mathbf1 \ \text{ pour tout } s\in\{-1,+1\}^K, \qquad Au\preceq b$$

C'est correct, mais cela produit **$2^{K+1}(N+1)$ inégalités** : inutilisable dès que $K$ dépasse la dizaine.

## 🔴 Concept 5 — La formulation compacte

Le cours calcule l'erreur du pire cas **explicitement** comme fonction de $u$ :

$$\max_{\|s\|_\infty\leq1}\Big\|\Big(\bar H+\sum_{k=1}^Ks_kV_k\Big)u-y_{\text{des}}\Big\|_\infty = \max_{\|s\|_\infty\leq1}\ \max_{i=0,\dots,N}\Big|\big(\bar Hu-y_{\text{des}}\big)_i + \sum_{k=1}^K s_k(V_ku)_i\Big|$$

On échange les deux maxima, puis on maximise sur $s$ **composante par composante** : pour chaque $i$, le pire $s$ choisit $s_k = \pm1$ de façon à **aligner** chaque terme avec le signe du terme nominal. D'où

$$\boxed{\ \max_{\|s\|_\infty\leq1}\|\cdots\|_\infty = \max_{i=0,\dots,N}\Big(\big|(\bar Hu-y_{\text{des}})_i\big| + \sum_{k=1}^K\big|(V_ku)_i\big|\Big)\ }$$

**LP équivalent** (variables $\gamma$, $u$, et des vecteurs $w_i$ pour $i=1,\dots,K$) :

$$\begin{array}{ll}\text{minimiser} & \gamma\\ \text{sous} & -w_i\preceq V_iu\preceq w_i, \qquad i=1,\dots,K\\ & -\gamma\mathbf1 + \displaystyle\sum_{i=1}^K w_i \ \preceq\ \bar Hu-y_{\text{des}} \ \preceq\ \gamma\mathbf1 - \sum_{i=1}^K w_i\\ & Au\preceq b\end{array}$$

**Ce qui s'est passé.** Les $w_i$ majorent $|V_iu|$ composante par composante — c'est la reformulation de la valeur absolue de la fiche 25. La contrainte centrale dit alors que l'erreur nominale **plus** la somme des marges d'incertitude reste sous $\gamma$. On est passé de $2^K$ blocs de contraintes à **$K+1$** blocs : le problème devient **linéaire en $K$** au lieu d'exponentiel.

**La leçon générale.** Face à un « pire cas » sur une famille continue, ne jamais énumérer : chercher l'expression **explicite** du pire cas, puis la reformuler. C'est exactement l'esprit de l'optimisation robuste.

### Ce que coûte et ce que rapporte la robustesse

Sur l'exemple du cours ($K=6$), la comparaison est nette :

| Conception | Sur le système nominal | Sur le pire système de la famille |
|---|---|---|
| **non robuste** (nominale) | excellente | fortement dégradée |
| **robuste** | un peu moins bonne | **peu dégradée** |

> « Sur le système nominal, la conception robuste fait moins bien que la conception non robuste ; en revanche, la performance ne se dégrade pas beaucoup sur l'ensemble du modèle. »

C'est le compromis fondamental de la robustesse : on **paie** une petite perte au nominal pour **acheter** une garantie sur toute la famille.

## 🟢 Concept 6 — Placement de pôles en commande à faible autorité

**Le cadre.** Un système linéaire autonome

$$\dot z(t) = A(x)z(t), \qquad z(0)=z_0, \qquad A(x) = A_0 + x_1A_1+\dots+x_pA_p \in\mathbb{R}^{n\times n}$$

Les solutions sont de la forme $z_i(t) = \sum_k \rho_{ik}e^{\sigma_kt}\cos(\omega_kt-\phi_{ik})$, où $\lambda_k = \sigma_k\pm j\omega_k$ sont les **valeurs propres** de $A(x)$, et $x\in\mathbb{R}^p$ est le **paramètre de conception**.

**Objectif** : placer les valeurs propres de $A(x)$ dans une région désirée en choisissant $x$.

**La difficulté.** Les valeurs propres sont des fonctions **très compliquées** de $x$ — le problème n'a aucune raison d'être linéaire.

**La parade : la perturbation au premier ordre.** Si $\lambda_i(A_0)$ est une valeur propre **simple**, alors

$$\lambda_i(A(x)) = \lambda_i(A_0) + \sum_{k=1}^p \frac{w_iA_kv_i}{w_iv_i}\,x_k + o(\|x\|)$$

où $w_i$ et $v_i$ sont les vecteurs propres **à gauche** et **à droite** : $w_iA_0 = \lambda_i(A_0)w_i$ et $A_0v_i = \lambda_i(A_0)v_i$.

**Commande à « faible autorité ».** On utilise les approximations linéaires du premier ordre pour les $\lambda_i$ ; on peut alors placer chaque $\lambda_i$ dans une région **polyédrale** en imposant des inégalités **linéaires** sur $x$. On ne s'attend à ce que cela fonctionne que pour de **petits** déplacements des valeurs propres — d'où le nom.

**Exemple du cours : la structure en treillis.** 30 nœuds, 83 barres, régie par

$$M\ddot d(t) + D\dot d(t) + Kd(t) = 0$$

où $d(t)$ est le vecteur des déplacements des nœuds, $M$ la matrice de masse, $D$ celle d'amortissement, $K$ celle de raideur. Pour augmenter l'amortissement, on fixe des amortisseurs externes sur certaines barres :

$$D(x) = D_0 + x_1D_1+\dots+x_pD_p, \qquad x_i>0 \ \text{amortissement ajouté sur la barre } i$$

Le système se réécrit $\dot z = A(x)z$ avec $z = (d,\dot d)$ et

$$A = \begin{pmatrix} 0 & I\\ -M^{-1}K & -M^{-1}D(x)\end{pmatrix}$$

**Le problème de conception** — placer approximativement les valeurs propres avec le **moins d'amortissement externe possible** :

$$\min\ \sum_{i=1}^p x_i \quad\text{s.c.}\quad \lambda_i(M,D(x),K)\in\mathcal{C} \ (i=1,\dots,n), \quad x\succeq0$$

C'est **un LP** si $\mathcal{C}$ est polyédrale et si l'on utilise l'approximation au premier ordre des $\lambda_i$. Le résultat du cours : les valeurs propres sont effectivement repoussées vers la gauche du plan complexe (système mieux amorti), et la solution indique **où placer les amortisseurs** — un vecteur $x$ largement creux, l'un des effets caractéristiques de la minimisation d'une somme sous contrainte de positivité.

### Comment résoudre l'exercice type (protocole)

1. **Identifier les variables de décision** : la séquence de commande $u$, ou le vecteur de conception $x$.
2. **Écrire la relation entrée-sortie sous forme matricielle** : $y = Hu$, avec $H$ de Toeplitz triangulaire inférieure.
3. **Traduire le critère** : « écart crête » $\to\|\cdot\|_\infty$ ; « erreur totale » $\to\|\cdot\|_1$ ; « énergie » $\to\|\cdot\|_2$ (et alors ce n'est **plus** un LP).
4. **Traduire chaque contrainte physique** : amplitude $\to\|u\|_\infty\leq U$ ; vitesse $\to\|Du\|_\infty\leq S$ ; toute limite linéaire s'ajoute librement.
5. **Introduire les auxiliaires** : un scalaire $\gamma$ par norme infinie, un vecteur par norme 1.
6. **Pour le cas robuste** : si la famille est **finie**, empiler les contraintes ; si elle est **continue**, expliciter le pire cas puis reformuler compactement.
7. **Vérifier la taille** : un modèle correct est linéaire en $K$ ; si le nombre de contraintes explose, c'est qu'on a énuméré.

### Exercices progressifs

**Niveau 1** — Écrivez le LP correspondant à $\min\|Hu-y_{\text{des}}\|_\infty$ sous $\|u\|_\infty\leq U$ seulement.

<details><summary>Correction</summary>

$$\min\ \gamma \quad\text{s.c.}\quad -\gamma\mathbf1\preceq Hu-y_{\text{des}}\preceq\gamma\mathbf1,\qquad -U\mathbf1\preceq u\preceq U\mathbf1$$

Variables : $u$ et le scalaire $\gamma$. À $u$ fixé, l'optimum est $\gamma = \|Hu-y_{\text{des}}\|_\infty$.

</details>

**Niveau 2** — Pourquoi $H$ est-elle triangulaire inférieure, et qu'est-ce que cela traduit physiquement ?

<details><summary>Correction</summary>

L'entrée $(i,j)$ de $H$ vaut $h_{i-j}$, nulle dès que $j>i$ car la réponse impulsionnelle n'est définie que pour des indices positifs. La sortie à l'instant $i$ ne dépend donc que des entrées aux instants $j\leq i$ : c'est la **causalité**. Un système non causal (qui « anticipe ») aurait des entrées au-dessus de la diagonale.

</details>

**Niveau 3** — Le cahier des charges devient : minimiser l'**énergie** $\sum_t u(t)^2$ sous une erreur crête bornée par $\gamma_0$. Est-ce encore un LP ?

<details><summary>Correction</summary>

**Non.** L'objectif $\sum_tu(t)^2 = \|u\|_2^2$ est **quadratique**, pas affine par morceaux : la fiche 25 ne s'applique pas. Les contraintes, elles, restent linéaires ($-\gamma_0\mathbf1\preceq Hu-y_{\text{des}}\preceq\gamma_0\mathbf1$ et les limites d'amplitude et de vitesse). On obtient un **programme quadratique** (QP), résoluble mais par d'autres méthodes. *Variante qui redonne un LP :* minimiser $\|u\|_1$ (l'« effort total ») ou $\|u\|_\infty$ (l'« effort de pointe ») sous les mêmes contraintes.

</details>

**Niveau 4 — type feuille d'exercices** — Pour $K=20$ paramètres incertains et $N=200$, comparez le nombre de contraintes de la formulation naïve et de la formulation compacte.

<details><summary>Correction</summary>

**Naïve** : on écrit un bloc de $2(N+1) = 402$ inégalités pour chacun des $2^K = 2^{20}$ sommets du cube, soit

$$402\times1\,048\,576 \approx 4{,}2\times10^8 \ \text{inégalités}$$

— totalement hors de portée.

**Compacte** : $K$ blocs de $2(N+1)$ inégalités pour les $-w_i\preceq V_iu\preceq w_i$, plus un bloc de $2(N+1)$ pour la contrainte centrale, soit

$$402\times(K+1) = 402\times21 = 8\,442 \ \text{inégalités}$$

— un LP de taille très ordinaire, avec $20\times201$ variables auxiliaires supplémentaires.

**Le rapport est d'environ $50\,000$**, et il croît exponentiellement avec $K$. Voilà pourquoi il faut expliciter le pire cas au lieu de l'énumérer.

</details>

## 🔴 Common mistakes

1. **Énumérer les $2^K$ sommets** — correct mais inutilisable ; la formulation compacte est linéaire en $K$.
2. **Mettre une norme 2 dans un LP** — l'énergie $\|u\|_2$ n'est pas affine par morceaux ; seules $\|\cdot\|_1$ et $\|\cdot\|_\infty$ passent.
3. **Oublier que $D$ a $M$ lignes et $M+1$ colonnes** — il y a une différence de moins que d'instants.
4. **Un seul $\gamma$ pour une somme d'erreurs** — la norme infinie prend un scalaire, la norme 1 un vecteur.
5. **Traiter le pire cas comme une moyenne** — le max sur $s$ n'est pas une espérance : il s'obtient en **alignant les signes**, pas en annulant les termes.
6. **Croire la conception robuste meilleure partout** — elle est **moins bonne** au nominal ; son intérêt est la garantie sur toute la famille.
7. **Appliquer le placement de pôles hors du régime de faible autorité** — l'approximation au premier ordre n'est valide que pour de petits déplacements de valeurs propres.

## 📌 Ultimate Review

1. $y = Hu$ avec $H$ de **Toeplitz triangulaire inférieure** — la causalité se lit sur la structure.
2. Suivi de consigne : $\min\|Hu-y_{\text{des}}\|_\infty$ sous $\|u\|_\infty\leq U$ et $\|Du\|_\infty\leq S$, $D$ matrice de différences.
3. LP équivalent : une seule variable $\gamma$, contraintes $-\gamma\mathbf1\preceq Hu-y_{\text{des}}\preceq\gamma\mathbf1$.
4. Robuste sur une famille **finie** : empiler les blocs de contraintes avec le **même** $\gamma$.
5. Robuste sur une famille **continue** : le pire cas vaut $\max_i(|(\bar Hu-y_{\text{des}})_i| + \sum_k|(V_ku)_i|)$.
6. Formulation compacte : auxiliaires $w_i$ avec $-w_i\preceq V_iu\preceq w_i$ ; $K+1$ blocs au lieu de $2^K$.
7. Compromis de robustesse : un peu moins bon au nominal, beaucoup plus stable sur la famille.
8. Placement de pôles : $\lambda_i(A(x))\simeq\lambda_i(A_0)+\sum_k\frac{w_iA_kv_i}{w_iv_i}x_k$ ; région polyédrale $\Rightarrow$ LP, en **faible autorité**.

**Formulas to know**

$$y = Hu \qquad \min\gamma \ \text{s.c.}\ -\gamma\mathbf1\preceq Hu-y_{\text{des}}\preceq\gamma\mathbf1 \qquad \max_{\|s\|_\infty\leq1} = \max_i\Big(|(\bar Hu-y_{\text{des}})_i|+\sum_k|(V_ku)_i|\Big)$$

**Methods to know** : le protocole de modélisation en 7 étapes ; l'explicitation du pire cas par alignement des signes ; le comptage des contraintes naïf contre compact.

## 🧠 Active Recall

**Basic** — Quelle est la structure de la matrice $H$, et que traduit-elle ?

<details><summary>Réponse</summary>

$H$ est de **Toeplitz** (constante sur chaque diagonale, car le système est invariant dans le temps) et **triangulaire inférieure** (car il est **causal** : la sortie à l'instant $t$ ne dépend que des entrées passées). Ses coefficients sont la réponse impulsionnelle.

</details>

**Understanding** — Pourquoi une seule variable auxiliaire $\gamma$ suffit-elle pour l'objectif de suivi ?

<details><summary>Réponse</summary>

Parce que l'objectif est une norme **infinie**, c'est-à-dire **un** maximum : $\gamma$ majore toutes les erreurs à la fois, et l'optimum le fixe à la plus grande. Pour une somme d'erreurs (norme 1), chaque terme aurait besoin de sa propre auxiliaire.

</details>

**Application** — On veut de plus que la sortie reste positive à tout instant. Comment l'ajouter ?

<details><summary>Réponse</summary>

C'est une contrainte **linéaire** en $u$ : $Hu\succeq0$. On l'ajoute au bloc $Au\preceq b$ sous la forme $-Hu\preceq0$, sans changer ni la nature du problème ni le nombre d'auxiliaires. Le cours le note explicitement : « d'autres contraintes linéaires sur les entrées ou les sorties peuvent s'ajouter ».

</details>

**Comparison** — Famille finie et famille continue de modèles : que change la formulation ?

<details><summary>Réponse</summary>

*Finie* ($p$ modèles) : on empile $p$ blocs de contraintes partageant le même $\gamma$ — simple et exact. *Continue* ($s\in[-1,1]^K$) : l'énumération des $2^K$ sommets est exacte mais explose ; il faut **expliciter** le pire cas ($\max_i$ de la somme des valeurs absolues) et introduire $K$ vecteurs auxiliaires, ce qui rend la taille **linéaire** en $K$.

</details>

**Exam-style** — Démontrez la formule du pire cas du concept 5.

<details><summary>Réponse</summary>

$$\max_{\|s\|_\infty\leq1}\Big\|\Big(\bar H+\sum_ks_kV_k\Big)u-y_{\text{des}}\Big\|_\infty = \max_{\|s\|_\infty\leq1}\max_i\Big|(\bar Hu-y_{\text{des}})_i+\sum_ks_k(V_ku)_i\Big|$$

On échange les deux maxima (ils portent sur des variables indépendantes). À $i$ fixé, on maximise $|a + \sum_k s_kb_k|$ pour $|s_k|\leq1$ : le maximum s'obtient en choisissant $s_k = \mathrm{sign}(a)\,\mathrm{sign}(b_k)$, ce qui **aligne** chaque terme avec $a$ et donne $|a| + \sum_k|b_k|$. D'où

$$\max_i\Big(|(\bar Hu-y_{\text{des}})_i| + \sum_k|(V_ku)_i|\Big) \qquad\blacksquare$$

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Relation entrée-sortie ? | $y = Hu$, $H$ de Toeplitz triangulaire inférieure |
| Pourquoi triangulaire inférieure ? | Causalité : la sortie ne dépend que des entrées passées |
| Contrainte d'amplitude ? | $\\|u\\|_\infty\leq U$, soit $-U\mathbf1\preceq u\preceq U\mathbf1$ |
| Contrainte de vitesse (slew rate) ? | $\\|Du\\|_\infty\leq S$, $D$ matrice de différences $M\times(M+1)$ |
| LP du suivi de consigne ? | $\min\gamma$ s.c. $-\gamma\mathbf1\preceq Hu-y_{\text{des}}\preceq\gamma\mathbf1$, plus les limites |
| Robuste sur deux modèles ? | Deux blocs de contraintes, **le même** $\gamma$ |
| Pire cas sur $\\|s\\|_\infty\leq1$ ? | $\max_i(\|(\bar Hu-y_{\text{des}})_i\|+\sum_k\|(V_ku)_i\|)$ |
| Taille de la formulation naïve ? | $2^K$ blocs — exponentielle |
| Taille de la formulation compacte ? | $K+1$ blocs — linéaire en $K$ |
| Prix de la robustesse ? | Un peu moins bon au nominal, bien plus stable sur la famille |
| Perturbation d'une valeur propre simple ? | $\lambda_i(A(x))\simeq\lambda_i(A_0)+\sum_k\frac{w_iA_kv_i}{w_iv_i}x_k$ |
| Quand le placement de pôles est-il un LP ? | Région $\mathcal{C}$ polyédrale + approximation au premier ordre |
| $\\|u\\|_2$ dans l'objectif ? | Ce n'est plus un LP, mais un QP |
