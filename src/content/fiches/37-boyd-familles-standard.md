# Fiche 37 — Les familles standard : LP, QP, SOCP, GP, SDP (Boyd, §4.3–4.7)

|  |  |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Boyd & Vandenberghe, *Convex Optimization*, §4.3 à §4.7, p. 146–182 |
| **Difficulté** | Fondamental — la carte des problèmes que l'on sait résoudre |
| **Temps d'étude estimé** | 2 h |
| **Prérequis** | Fiche 36 (forme standard convexe), fiche 34 (cône du second ordre, cône PSD) |
| **Concepts clés** | LP, QP, QCQP, SOCP, programmation géométrique, forme conique, SDP, optimisation vectorielle, optimum de Pareto, scalarisation |
| **Poids à l'examen** | La compétence évaluée est le **classement** : reconnaître à quelle famille appartient un problème, et savoir le ramener à la plus simple possible. Un problème correctement classé est un problème résolu — les solveurs font le reste. |

## 🎯 Vue d'ensemble

Le chapitre 4 se termine par un catalogue de **familles emboîtées**, de la plus simple à la plus générale. Chacune se résout par des algorithmes dédiés, d'autant plus rapides que la famille est étroite.

```
LP  ⊂  QP  ⊂  QCQP  ⊂  SOCP  ⊂  SDP        (chaîne principale)
                              GP  →  convexe par changement de variable log
                       forme conique : le cadre qui les unifie tous
```

**La compétence à acquérir** n'est pas de connaître les algorithmes, mais de **placer un problème dans cette chaîne le plus à gauche possible**. Un problème écrit en SDP alors qu'il est un LP se résout des milliers de fois plus lentement.

## 🟡 Concept 1 — Programmes linéaires (§4.3)

Quand l'objectif **et** toutes les contraintes sont **affines**, le problème est un **programme linéaire** :

$$\begin{array}{ll}\text{minimiser} & c^Tx+d\\ \text{sous} & Gx\preceq h\\ & Ax=b\end{array} \tag{4.27}$$

avec $G\in\mathbb{R}^{m\times n}$ et $A\in\mathbb{R}^{p\times n}$. Les LP sont évidemment des problèmes convexes.

La constante $d$ ne change ni l'ensemble optimal ni l'argmin : on l'omet souvent. Les deux formes particulières habituelles (fiches 24 et 26) :

| Forme | Écriture |
|---|---|
| **forme d'inégalités** | $\min c^Tx$ s.c. $Ax\preceq b$ |
| **forme standard** | $\min c^Tx$ s.c. $Ax=b$, $x\succeq0$ |

*(Les fiches 24 à 33 sont entièrement consacrées à cette famille : géométrie, dualité, simplexe, réseaux, nombres entiers.)*

## 🟠 Concept 2 — Programmes quadratiques (§4.4)

**QP** — objectif quadratique **convexe**, contraintes **affines** :

$$\begin{array}{ll}\text{minimiser} & \tfrac12x^TPx+q^Tx+r\\ \text{sous} & Gx\preceq h\\ & Ax=b\end{array} \tag{4.34}$$

avec $P\in\mathbf{S}^n_+$. *On minimise une quadratique convexe sur un polyèdre.*

⚠️ La condition $P\succeq0$ est ce qui fait la convexité (§3.1.4, exemple 3.2). Avec $P$ indéfinie, le problème est un « QP non convexe » — objet nettement plus difficile, sans rapport avec cette famille.

**QCQP** — on autorise en plus des contraintes quadratiques convexes :

$$\begin{array}{ll}\text{minimiser} & \tfrac12x^TP_0x+q_0^Tx+r_0\\ \text{sous} & \tfrac12x^TP_ix+q_i^Tx+r_i\leq0, \quad i=1,\dots,m\\ & Ax=b\end{array}$$

avec $P_i\in\mathbf{S}^n_+$. On minimise alors une quadratique convexe sur une intersection d'**ellipsoïdes**. Les QCQP contiennent les QP (prendre $P_i=0$), donc aussi les LP.

**L'exemple canonique : les moindres carrés.** Minimiser

$$\|Ax-b\|_2^2 = x^TA^TAx - 2b^TAx + b^Tb$$

est un QP **sans contrainte**. On l'appelle aussi régression ou approximation au sens des moindres carrés, et il se résout analytiquement par les équations normales $A^TAx=A^Tb$.

## 🔴 Concept 3 — Programmes coniques du second ordre (§4.4.2)

$$\begin{array}{ll}\text{minimiser} & f^Tx\\ \text{sous} & \|A_ix+b_i\|_2 \leq c_i^Tx+d_i, \quad i=1,\dots,m\\ & Fx = g\end{array} \tag{4.36}$$

avec $A_i\in\mathbb{R}^{n_i\times n}$ et $F\in\mathbb{R}^{p\times n}$. Une contrainte de la forme

$$\|Ax+b\|_2\leq c^Tx+d$$

s'appelle **contrainte conique du second ordre** : elle exprime que le vecteur affine $(Ax+b,\ c^Tx+d)$ appartient au **cône du second ordre** (fiche 34).

**Les cas particuliers, à savoir reconnaître.**

| Si… | on retrouve |
|---|---|
| $c_i=0$ pour tout $i$ | un **QCQP** (les contraintes deviennent $\\|A_ix+b_i\\|_2\leq d_i$, des boules) |
| $A_i=0$ pour tout $i$ | un **LP** (les contraintes deviennent affines) |

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi le SOCP compte.</span>

Il capture d'un coup les normes euclidiennes, les contraintes d'ellipsoïde, les quotients quadratiques et une bonne partie de l'optimisation **robuste** — tout en restant très efficacement résoluble par points intérieurs. C'est le bon niveau de généralité pour la plupart des applications d'ingénierie.

</div>

## 🟠 Concept 4 — Programmation géométrique (§4.5)

C'est la famille la plus surprenante : elle **n'est pas convexe** telle qu'écrite, et le devient par un changement de variable.

**Monôme.** Une fonction $f:\mathbb{R}^n\to\mathbb{R}$ de domaine $\mathbb{R}^n_{++}$ définie par

$$f(x) = c\,x_1^{a_1}x_2^{a_2}\cdots x_n^{a_n} \tag{4.41}$$

avec $c>0$ et $a_i\in\mathbb{R}$ **quelconques** (fractionnaires ou négatifs autorisés). Le **coefficient**, lui, doit être **strictement positif**.

⚠️ Boyd signale explicitement le conflit de vocabulaire : en algèbre, un monôme a des exposants entiers positifs. Ici, seul le coefficient est contraint.

**Posynôme.** Une **somme** de monômes :

$$f(x) = \sum_{k=1}^K c_k\,x_1^{a_{1k}}x_2^{a_{2k}}\cdots x_n^{a_{nk}}, \qquad c_k>0 \tag{4.42}$$

**Programme géométrique (GP).**

$$\begin{array}{ll}\text{minimiser} & f_0(x)\\ \text{sous} & f_i(x)\leq1, \quad i=1,\dots,m\\ & h_i(x)=1, \quad i=1,\dots,p\end{array} \tag{4.43}$$

où $f_0,\dots,f_m$ sont des **posynômes** et $h_1,\dots,h_p$ des **monômes**. Le domaine est $\mathbb{R}^n_{++}$ : la contrainte $x\succ0$ est **implicite**.

**La mise en forme convexe (§4.5.3).** On pose $y_i=\log x_i$, donc $x_i=e^{y_i}$. Un monôme devient

$$f(e^{y_1},\dots,e^{y_n}) = c\,(e^{y_1})^{a_1}\cdots(e^{y_n})^{a_n} = e^{a^Ty+b}, \qquad b=\log c$$

c'est-à-dire l'**exponentielle d'une fonction affine**. Un posynôme devient une somme de telles exponentielles, et en prenant le **logarithme** de l'objectif et des contraintes, on obtient

$$\begin{array}{ll}\text{minimiser} & \log\sum_k e^{a_{0k}^Ty+b_{0k}}\\ \text{sous} & \log\sum_k e^{a_{ik}^Ty+b_{ik}} \leq 0\\ & g_i^Ty+h_i = 0\end{array}$$

soit un problème **convexe** : l'objectif et les contraintes sont des **log-sum-exp** de fonctions affines (fiche 35), et les égalités sont affines.

> **La double transformation à retenir.** Changement de variable $x = e^y$ **et** transformation croissante $\log$ de l'objectif et des contraintes — les deux mécanismes de la fiche 36, appliqués ensemble. C'est l'exemple le plus spectaculaire de « la convexité est une propriété de l'écriture ».

## 🔴 Concept 5 — Forme conique et programmation semi-définie (§4.6)

**Problème sous forme conique (4.49)** — objectif linéaire, une seule contrainte d'inégalité **affine** au sens d'un cône propre $K$ :

$$\begin{array}{ll}\text{minimiser} & c^Tx\\ \text{sous} & Fx+g \preceq_K 0\\ & Ax=b\end{array}$$

Quand $K$ est l'**orthant positif**, on retrouve exactement un **LP**. On peut donc voir les problèmes coniques comme la généralisation des LP dans laquelle l'inégalité composante par composante est remplacée par une inégalité **généralisée**.

**Programmation semi-définie (SDP).** Lorsque $K=\mathbf{S}^k_+$, le problème conique s'écrit

$$\begin{array}{ll}\text{minimiser} & c^Tx\\ \text{sous} & x_1F_1+\dots+x_nF_n+G \preceq 0\\ & Ax=b\end{array} \tag{4.50}$$

avec $G,F_1,\dots,F_n\in\mathbf{S}^k$ et $A\in\mathbb{R}^{p\times n}$. L'inégalité est une **inégalité matricielle linéaire** (LMI, exemple 2.10 — fiche 34).

> **Le fait qui situe le SDP.** *Si les matrices $G,F_1,\dots,F_n$ sont toutes **diagonales**, la LMI équivaut à $n$ inégalités linéaires, et le SDP se réduit à un LP.* Un SDP est donc littéralement « un LP dont les nombres sont devenus des matrices ». C'est la façon la plus économique de retenir ce qu'est un SDP.

**La chaîne complète.**

$$\text{LP} \subset \text{QP} \subset \text{QCQP} \subset \text{SOCP} \subset \text{SDP}$$

Chaque inclusion s'obtient en écrivant les contraintes de la classe plus étroite comme un cas particulier de la plus large — par exemple une contrainte SOC $\|Ax+b\|_2\leq c^Tx+d$ s'écrit comme une LMI par complément de Schur.

## 🟠 Concept 6 — Optimisation vectorielle et optimalité de Pareto (§4.7)

**Le problème (4.56).**

$$\begin{array}{ll}\text{minimiser (par rapport à } K) & f_0(x)\\ \text{sous} & f_i(x)\leq0, \quad i=1,\dots,m\\ & h_i(x)=0, \quad i=1,\dots,p\end{array}$$

où $K\subseteq\mathbb{R}^q$ est un **cône propre** et $f_0:\mathbb{R}^n\to\mathbb{R}^q$ est à valeurs **vectorielles**. La seule différence avec la forme standard est là : l'objectif a plusieurs composantes, que l'on compare via $\preceq_K$.

**L'ensemble des valeurs atteignables** est $\mathcal{O} = \{f_0(x)\mid x\text{ admissible}\}$.

**Deux situations, celles de la fiche 34.**

- Si $\mathcal{O}$ possède un **élément minimum**, le problème a une solution **optimale** au sens fort : un point qui bat tous les autres sur **tous** les objectifs à la fois. C'est rare.
- Sinon — le cas usuel — on s'intéresse aux **éléments minimaux**.

**Optimalité de Pareto.** Un point admissible $x$ est **Pareto optimal** (ou **efficace**) si $f_0(x)$ est un élément **minimal** de $\mathcal{O}$. Autrement dit :

$$\text{pour tout } y \text{ admissible}, \qquad f_0(y)\preceq_K f_0(x) \ \Longrightarrow\ f_0(y) = f_0(x)$$

*Tout point admissible au moins aussi bon que $x$ a exactement la même valeur d'objectif.* On ne peut améliorer un critère qu'en dégradant un autre.

**Scalarisation (§4.7.4).** C'est la technique standard pour produire des points Pareto optimaux. On choisit $\lambda\succ_{K^\star}0$ — un vecteur **strictement positif au sens de l'inégalité duale** — et l'on résout le problème **scalaire**

$$\begin{array}{ll}\text{minimiser} & \lambda^Tf_0(x)\\ \text{sous} & f_i(x)\leq0,\quad h_i(x)=0\end{array} \tag{4.60}$$

Toute solution $x$ est alors **Pareto optimale** pour le problème vectoriel — c'est exactement la caractérisation duale des éléments minimaux de la fiche 34.

⚠️ **La réciproque exige la convexité, et reste incomplète.** Pour un problème **convexe**, tout point Pareto optimal s'obtient par scalarisation avec un $\lambda\succeq_{K^\star}0$ **non nul** — mais pas nécessairement avec $\lambda\succ_{K^\star}0$. Certains points du front de Pareto ne sont donc atteints qu'avec des poids **nuls** sur certains objectifs. Et pour un problème **non convexe**, la scalarisation peut manquer des points Pareto optimaux entiers — ceux situés dans les « creux » du front.

> **En pratique.** Faire varier $\lambda$ dans le simplexe et résoudre (4.60) à chaque fois **trace le front de Pareto**. C'est la méthode de base en optimisation multi-objectif : compromis rendement/risque en finance, coût/performance en ingénierie, ajustement/régularité en statistique.

### Comment résoudre l'exercice type (protocole de classement)

1. **Mettre en forme standard convexe** (fiche 36) : objectif convexe, inégalités convexes, égalités affines.
2. **Regarder l'objectif** : affine ? quadratique convexe ? autre ?
3. **Regarder les contraintes** : affines ? quadratiques convexes ? normes euclidiennes ? LMI ?
4. **Classer le plus à gauche possible** dans la chaîne LP ⊂ QP ⊂ QCQP ⊂ SOCP ⊂ SDP.
5. **Si des monômes ou des posynômes apparaissent** avec des contraintes $\leq1$ et des variables positives : c'est un **GP** — passer en $y=\log x$.
6. **Si l'objectif est vectoriel** : optimisation vectorielle — chercher les points **Pareto optimaux** par scalarisation.
7. **Vérifier qu'aucune réécriture ne simplifie la classe** : une contrainte de norme au carré, une valeur absolue, un maximum peuvent souvent redescendre d'un cran (fiche 25).

### Le tableau de reconnaissance

| Objectif | Contraintes | Famille |
|---|---|---|
| affine | affines | **LP** |
| quadratique convexe | affines | **QP** |
| quadratique convexe | quadratiques convexes | **QCQP** |
| affine | $\\|A_ix+b_i\\|_2\leq c_i^Tx+d_i$ | **SOCP** |
| posynôme | posynômes $\leq1$, monômes $=1$, $x\succ0$ | **GP** |
| affine | LMI $\sum_ix_iF_i+G\preceq0$ | **SDP** |
| vectoriel | quelconques convexes | **optimisation vectorielle** |

### Exercices progressifs

**Niveau 1** — Classez : $\min\ \|Ax-b\|_2^2$ s.c. $x\succeq0$.

<details><summary>Correction</summary>

Objectif quadratique convexe ($P = 2A^TA\succeq0$), contraintes affines ($-x\preceq0$) : c'est un **QP**. On ne peut pas descendre à un LP, l'objectif n'étant pas affine. *(Ce problème s'appelle les moindres carrés à variables positives — NNLS — et sert en séparation de sources et en déconvolution.)*

</details>

**Niveau 2** — Classez : $\min\ \|Ax-b\|_2$ s.c. $\|x\|_1\leq1$.

<details><summary>Correction</summary>

L'objectif est une **norme euclidienne**, non affine et non quadratique. On passe en forme épigraphe : $\min t$ s.c. $\|Ax-b\|_2\leq t$ — une contrainte **conique du second ordre**. La contrainte $\|x\|_1\leq1$ se linéarise en $2^n$ inégalités, ou mieux, avec $n$ auxiliaires : $-u\preceq x\preceq u$, $\mathbf1^Tu\leq1$ (fiche 25). On obtient donc un **SOCP**. *(C'est la formulation « LASSO contraint ».)*

</details>

**Niveau 3** — Montrez que $\min\ x_1^{-1}x_2^{-2}$ s.c. $x_1+x_2\leq1$, $x\succ0$ est un GP, et donnez sa forme convexe.

<details><summary>Correction</summary>

**GP ?** L'objectif $x_1^{-1}x_2^{-2}$ est un **monôme** (coefficient $1>0$, exposants $-1$ et $-2$ — négatifs, ce qui est autorisé), donc un posynôme. La contrainte $x_1+x_2\leq1$ est un **posynôme $\leq1$** . Le domaine $x\succ0$ est implicite . C'est bien un **GP**.

**Forme convexe.** Avec $y_i=\log x_i$ :

$$\text{objectif} : \log\big(e^{-y_1-2y_2}\big) = -y_1-2y_2 \qquad \text{(affine !)}$$

$$\text{contrainte} : \log\big(e^{y_1}+e^{y_2}\big)\leq0$$

Le problème convexe équivalent est donc

$$\min\ -y_1-2y_2 \quad\text{s.c.}\quad \log(e^{y_1}+e^{y_2})\leq0$$

— objectif **affine**, contrainte **log-sum-exp** convexe. *À noter : le logarithme d'un **monôme** devient toujours affine ; seuls les posynômes à plusieurs termes donnent du log-sum-exp.*

</details>

**Niveau 4 — type examen** — Montrez que la contrainte conique du second ordre $\|Ax+b\|_2\leq c^Tx+d$ s'écrit comme une LMI, et concluez sur l'inclusion SOCP $\subset$ SDP.

<details><summary>Correction</summary>

Par le **complément de Schur** : pour $t>0$, une matrice par blocs vérifie

$$\begin{pmatrix} tI & u\\ u^T & t\end{pmatrix}\succeq0 \iff t\geq0 \ \text{ et } \ t^2 \geq u^Tu \iff t\geq\|u\|_2$$

(le complément de Schur du bloc $tI$ est $t-u^T(tI)^{-1}u = t - \|u\|_2^2/t$, positif ssi $t^2\geq\|u\|_2^2$).

En posant $u = Ax+b$ et $t = c^Tx+d$, la contrainte devient

$$\begin{pmatrix} (c^Tx+d)I & Ax+b\\ (Ax+b)^T & c^Tx+d\end{pmatrix} \succeq 0$$

et cette matrice dépend **affinement** de $x$ : c'est une **LMI**. $\blacksquare$

**Conclusion.** Toute contrainte SOC est une LMI, donc tout SOCP est un SDP. L'inclusion est **stricte** : le SDP capture des contraintes spectrales (par exemple $\lambda_{\max}(A(x))\leq t$) qu'aucun SOCP n'exprime.

**La morale du protocole de classement.** Un SOCP *peut* s'écrire en SDP, mais il ne *doit* pas : les solveurs SOC exploitent une structure bien plus étroite et vont beaucoup plus vite. Classer le plus à gauche possible n'est pas une élégance, c'est une question de temps de calcul.

</details>

## 🔴 Common mistakes

1. **Écrire un QP avec $P$ indéfinie** — la convexité exige $P\succeq0$ ; sinon on quitte la famille et le problème devient difficile.
2. **Croire qu'un monôme a des exposants entiers** — en GP, les exposants sont quelconques ; c'est le **coefficient** qui doit être $>0$.
3. **Oublier la contrainte implicite $x\succ0$ d'un GP** — sans elle, $\log x$ n'a pas de sens et la transformation s'effondre.
4. **Écrire les contraintes d'un GP avec un second membre autre que $1$** — la forme standard est $f_i(x)\leq1$ et $h_i(x)=1$, pas $\leq0$.
5. **Classer trop à droite** — écrire un LP en SDP est correct mais coûte des ordres de grandeur en temps de calcul.
6. **Confondre optimal et Pareto optimal** — l'optimal (élément **minimum**) bat tous les autres sur tous les critères ; le Pareto optimal (élément **minimal**) est seulement non dominé.
7. **Croire que la scalarisation atteint tout le front de Pareto** — il faut la convexité, et même alors certains points n'apparaissent qu'avec des poids $\lambda$ ayant des composantes **nulles**.
8. **Prendre $\lambda$ au hasard** — la scalarisation exige $\lambda\succ_{K^\star}0$, c'est-à-dire strictement positif au sens du **cône dual**.

## 📌 Ultimate Review

1. **LP** : objectif et contraintes **affines**, $\min c^Tx+d$ s.c. $Gx\preceq h$, $Ax=b$.
2. **QP** : objectif quadratique convexe ($P\succeq0$), contraintes affines — une quadratique sur un **polyèdre**.
3. **QCQP** : contraintes quadratiques convexes en plus — une quadratique sur une intersection d'**ellipsoïdes**.
4. **SOCP** : $\min f^Tx$ s.c. $\|A_ix+b_i\|_2\leq c_i^Tx+d_i$. $c_i=0\Rightarrow$ QCQP ; $A_i=0\Rightarrow$ LP.
5. **GP** : posynômes $\leq1$, monômes $=1$, $x\succ0$. Non convexe tel quel ; convexe après $y=\log x$ **et** passage au $\log$ — on obtient des **log-sum-exp**.
6. Monôme $=cx_1^{a_1}\cdots x_n^{a_n}$ avec $c>0$ et $a_i$ **quelconques** ; posynôme $=$ somme de monômes.
7. **Forme conique** : $\min c^Tx$ s.c. $Fx+g\preceq_K0$, $Ax=b$ — LP généralisé.
8. **SDP** : $K=\mathbf{S}^k_+$, contrainte LMI $\sum_ix_iF_i+G\preceq0$. Matrices **diagonales** $\Rightarrow$ on retombe sur un LP.
9. Chaîne : $\text{LP}\subset\text{QP}\subset\text{QCQP}\subset\text{SOCP}\subset\text{SDP}$ — classer le plus à **gauche** possible.
10. **Pareto optimal** : $f_0(x)$ est un élément **minimal** de $\mathcal{O}$. **Scalarisation** : $\min\lambda^Tf_0(x)$ avec $\lambda\succ_{K^\star}0$ donne toujours un point Pareto optimal ; la réciproque exige la convexité et $\lambda\succeq_{K^\star}0$ non nul.

**Formulas to know**

$$\|A_ix+b_i\|_2\leq c_i^Tx+d_i \qquad f(x)=cx_1^{a_1}\cdots x_n^{a_n},\ c>0 \qquad x_1F_1+\dots+x_nF_n+G\preceq0 \qquad \min\ \lambda^Tf_0(x)$$

**Methods to know** : le protocole de classement en 7 étapes ; le tableau de reconnaissance ; la mise en forme convexe d'un GP ; le complément de Schur pour passer d'une contrainte SOC à une LMI.

## 🧠 Active Recall

**Basic** — Donnez la forme générale d'un QP et la condition qui le rend convexe.

<details><summary>Réponse</summary>

$\min\ \tfrac12x^TPx+q^Tx+r$ s.c. $Gx\preceq h$, $Ax=b$. La convexité exige $P\in\mathbf{S}^n_+$, c'est-à-dire $P\succeq0$ — la hessienne de l'objectif est constante et vaut $P$ (exemple 3.2).

</details>

**Understanding** — Pourquoi un programme géométrique devient-il convexe après le changement $y=\log x$ ?

<details><summary>Réponse</summary>

Un monôme $cx_1^{a_1}\cdots x_n^{a_n}$ devient $e^{a^Ty+b}$ avec $b=\log c$ : l'exponentielle d'une **affine**. Un posynôme devient une somme de telles exponentielles, et son logarithme est un **log-sum-exp** de fonctions affines, **convexe** (fiche 35). Les contraintes $f_i\leq1$ deviennent $\log f_i\leq0$, et les égalités monomiales deviennent **affines**. Les deux transformations de la fiche 36 — changement de variable et transformation croissante — agissent ensemble.

</details>

**Application** — Le problème $\min\ \max_i(a_i^Tx+b_i)$ s.c. $Cx\preceq d$ : quelle famille ?

<details><summary>Réponse</summary>

**LP.** L'objectif n'est pas affine, mais la forme épigraphe le rend affine (fiche 25) :

$$\min\ t \quad\text{s.c.}\quad a_i^Tx+b_i\leq t \ \ \forall i, \qquad Cx\preceq d$$

Objectif affine en $(x,t)$, contraintes affines : c'est un LP. *Réflexe : ne jamais classer sur l'écriture brute, toujours après réécriture.*

</details>

**Comparison** — SOCP et SDP : lequel est plus général, et pourquoi ne pas toujours utiliser le plus général ?

<details><summary>Réponse</summary>

Le **SDP** est plus général : toute contrainte SOC s'écrit comme une LMI par complément de Schur, alors que le SDP capture en plus les contraintes spectrales. Mais résoudre un SOCP comme un SDP est **beaucoup plus lent** : les solveurs SOC exploitent la structure très particulière du cône du second ordre. Classer le plus à gauche possible est une exigence de performance, pas d'élégance.

</details>

**Exam-style** — Définissez l'optimalité de Pareto, et énoncez ce que garantit exactement la scalarisation.

<details><summary>Réponse</summary>

*Pareto optimal.* $x$ admissible est Pareto optimal si $f_0(x)$ est un élément **minimal** de $\mathcal{O}=\{f_0(y)\mid y \text{ admissible}\}$ : pour tout $y$ admissible, $f_0(y)\preceq_Kf_0(x)$ entraîne $f_0(y)=f_0(x)$.

*Scalarisation.* Pour tout $\lambda\succ_{K^\star}0$, toute solution de $\min\lambda^Tf_0(x)$ sous les mêmes contraintes est **Pareto optimale** — c'est la caractérisation duale des éléments minimaux (§2.6.3).

*Réciproque.* Pour un problème **convexe**, tout point Pareto optimal est solution d'un tel problème pour un $\lambda\succeq_{K^\star}0$ **non nul** — mais pas forcément avec $\lambda$ strictement positif. Pour un problème non convexe, la réciproque est fausse : certains points Pareto optimaux échappent complètement à la scalarisation.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| LP ? | $\min c^Tx+d$ s.c. $Gx\preceq h$, $Ax=b$ — tout est affine |
| QP ? | Objectif quadratique convexe ($P\succeq0$), contraintes affines |
| QCQP ? | Objectif **et** contraintes quadratiques convexes |
| SOCP ? | $\min f^Tx$ s.c. $\\|A_ix+b_i\\|_2\leq c_i^Tx+d_i$ |
| SOCP avec $c_i=0$ ? | Un QCQP |
| SOCP avec $A_i=0$ ? | Un LP |
| Monôme (au sens GP) ? | $cx_1^{a_1}\cdots x_n^{a_n}$, $c>0$, exposants **quelconques** |
| Posynôme ? | Somme de monômes |
| Forme standard d'un GP ? | $\min f_0$ s.c. $f_i\leq1$ (posynômes), $h_i=1$ (monômes), $x\succ0$ |
| Comment rend-on un GP convexe ? | $y=\log x$, puis $\log$ de l'objectif et des contraintes $\to$ log-sum-exp |
| Problème sous forme conique ? | $\min c^Tx$ s.c. $Fx+g\preceq_K0$, $Ax=b$ |
| SDP ? | Forme conique avec $K=\mathbf{S}^k_+$ : LMI $\sum_ix_iF_i+G\preceq0$ |
| SDP à matrices diagonales ? | Se réduit à un **LP** |
| La chaîne d'inclusions ? | LP ⊂ QP ⊂ QCQP ⊂ SOCP ⊂ SDP |
| Pareto optimal ? | $f_0(x)$ est un élément **minimal** de l'ensemble des valeurs atteignables |
| Scalarisation ? | $\min\lambda^Tf_0(x)$ avec $\lambda\succ_{K^\star}0$ — donne un point Pareto optimal |
| La scalarisation atteint-elle tout le front ? | Non — il faut la convexité, et même alors certains points exigent $\lambda$ avec des zéros |
