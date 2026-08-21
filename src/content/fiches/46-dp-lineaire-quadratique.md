# Fiche 46 — Problèmes linéaire-quadratiques et gestion de stock

|  |  |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Bertsekas, *6.231 Dynamic Programming*, MIT OpenCourseWare, automne 2015 — cours 4 |
| **Difficulté** | Must know — les deux problèmes stochastiques qu'on sait résoudre entièrement à la main |
| **Temps d'étude estimé** | 2 h |
| **Prérequis** | Fiche 44 (algorithme DP), fiche 9 (matrices symétriques, définie positive) |
| **Concepts clés** | Régulateur linéaire-quadratique, équation de Riccati, politique linéaire, équivalent certain, régime stationnaire, gestion de stock, coût de rupture et de stockage, politique à niveau de recomplètement |
| **Poids à l'examen** | Deux résultats structurels à savoir démontrer par récurrence : **LQ $\Rightarrow$ politique linéaire et coût quadratique**, et **convexité $\Rightarrow$ politique à seuil $S_k$**. Ce sont les deux seuls cas où la DP continue se mène analytiquement. |

## 🎯 Vue d'ensemble

La DP est en général un algorithme numérique : on tabule $J_k$ sur tout l'espace d'états. Deux familles échappent à cette fatalité, parce que la **forme fonctionnelle de $J_k$ se propage à rebours**.

```
LINÉAIRE-QUADRATIQUE   J_k quadratique  →  reste quadratique  →  politique LINÉAIRE
GESTION DE STOCK       J_k convexe      →  reste convexe      →  politique à SEUIL S_k
```

Dans les deux cas, on ne calcule plus une table mais **quelques nombres** : les matrices $K_k$ de l'équation de Riccati, ou les seuils $S_k$. C'est ce qui fait de ces deux modèles les chevaux de bataille de la macroéconomie dynamique, du contrôle et de la recherche opérationnelle.

## 🔴 Concept 1 — Le problème linéaire-quadratique

**Système linéaire.**

$$x_{k+1} = A_kx_k + B_ku_k + w_k$$

**Coût quadratique.**

$$\mathbb{E}_{w_k,\ k=0,\dots,N-1}\Big[x_N'Q_Nx_N + \sum_{k=0}^{N-1}\big(x_k'Q_kx_k + u_k'R_ku_k\big)\Big]$$

avec $Q_k\succeq0$ et $R_k\succ0$ (au sens (semi-)défini positif). Les $w_k$ sont **indépendants et centrés**.

⚠️ La distinction $Q_k\succeq0$ mais $R_k\succ0$ n'est pas cosmétique : $R_k$ **strictement** définie positive garantit que la minimisation en $u_k$ a une solution **unique** et que la matrice à inverser dans la formule du gain est régulière. On peut ne pas pénaliser certains états ($Q_k$ singulière), jamais la commande.

**Algorithme DP.**

$$J_N(x_N) = x_N'Q_Nx_N$$

$$J_k(x_k) = \min_{u_k}\ \mathbb{E}\Big[x_k'Q_kx_k+u_k'R_ku_k + J_{k+1}\big(A_kx_k+B_ku_k+w_k\big)\Big]$$

> **Les faits clés (le cours les appelle « key facts »).**
>
> - $J_k(x_k)$ est **quadratique** ;
> - la politique optimale $\{\mu_0^\star,\dots,\mu_{N-1}^\star\}$ est **linéaire** : $\mu_k^\star(x_k) = L_kx_k$ ;
> - un grand nombre de variantes se traitent de la même façon.

## 🔴 Concept 2 — L'équation de Riccati

**Le résultat, à vérifier par récurrence.**

$$\mu_k^\star(x_k) = L_kx_k, \qquad J_k(x_k) = x_k'K_kx_k + \text{constante}$$

où les **gains** $L_k$ valent

$$L_k = -\big(B_k'K_{k+1}B_k+R_k\big)^{-1}B_k'K_{k+1}A_k$$

et où les matrices $K_k$, **symétriques semi-définies positives**, sont données par

$$K_N = Q_N$$

$$\boxed{\ K_k = A_k'\Big(K_{k+1}-K_{k+1}B_k\big(B_k'K_{k+1}B_k+R_k\big)^{-1}B_k'K_{k+1}\Big)A_k + Q_k\ }$$

**C'est l'équation de Riccati en temps discret.** *Tout comme la DP, elle part du temps terminal $N$ et progresse à rebours.*

> **Ce qui a changé de nature.** On est passé d'une récurrence sur des **fonctions** $J_k$ à une récurrence sur des **matrices** $K_k$ de taille $n\times n$. C'est une réduction de dimension spectaculaire : on ne tabule plus rien.

**Équivalent certain.** *La propriété d'équivalence certaine est vérifiée* : la politique optimale est **la même** que si l'on remplaçait $w_k$ par son espérance $\mathbb{E}\{w_k\}=0$.

⚠️ **L'équivalent certain est une propriété rare, pas une règle générale.** Elle signifie qu'on peut concevoir la commande comme si le système était déterministe. Elle tient ici parce que le bruit est **additif**, **centré** et **indépendant** de l'état et de la commande. Le concept 4 montrera qu'elle tombe dès que le bruit entre dans les **matrices** du système.

## 🟠 Concept 3 — Comportement asymptotique et régime stationnaire

**Hypothèses.** Système et coût par étape **stationnaires** ($A_k=A$, $B_k=B$, $Q_k=Q$, $R_k=R$), plus deux hypothèses techniques : **commandabilité** de $(A,B)$ et **observabilité** de $(A,C)$ où $Q=C'C$.

**Le résultat.** L'équation de Riccati **converge** :

$$\lim_{k\to-\infty}K_k = K$$

où $K$ est **définie positive** et l'**unique** solution (dans la classe des matrices semi-définies positives) de l'**équation algébrique de Riccati**

$$K = A'\Big(K - KB\big(B'KB+R\big)^{-1}B'K\Big)A + Q$$

**Le contrôleur stationnaire optimal** $\mu^\star(x)=Lx$ avec

$$L = -\big(B'KB+R\big)^{-1}B'KA$$

est **stabilisant** : la matrice $A+BL$ du système en boucle fermée

$$x_{k+1}=(A+BL)x_k+w_k$$

vérifie $\lim_{k\to\infty}(A+BL)^k=0$.

> **La lecture.** Loin de l'horizon terminal, le gain optimal ne dépend plus du temps : on obtient un **contrôleur stationnaire**, calculé une fois pour toutes en résolvant une équation matricielle. Et ce contrôleur **stabilise** le système, même si $A$ seule ne l'était pas. C'est le résultat fondateur du contrôle optimal linéaire.

### Preuve graphique dans le cas scalaire

En posant $P_k = K_{N-k}$ (on renverse le temps pour parler de convergence quand $k\to\infty$), l'équation de Riccati scalaire s'écrit

$$P_{k+1} = A^2\Big(P_k - \frac{B^2P_k^2}{B^2P_k+R}\Big)+Q = F(P_k), \qquad F(P) = \frac{A^2RP}{B^2P+R}+Q$$

**Ce que le graphe montre.** $F$ est croissante, concave, de valeur $F(0)=Q$ et d'asymptote horizontale $A^2R/B^2+Q$. Son intersection avec la première bissectrice donne les points fixes $P=F(P)$ : *il y a **deux** solutions stationnaires, dont **une seule est positive***. C'est celle-là qui est la limite, et la monotonie de $F$ garantit la convergence de $P_k$ vers elle depuis toute condition initiale positive.

> **Le mécanisme à retenir** : $F$ croissante et concave, un unique point fixe positif, donc convergence monotone. C'est le même argument que pour toute récurrence scalaire $P_{k+1}=F(P_k)$ — et il se généralise en dimension quelconque sous les hypothèses de commandabilité et d'observabilité.

## 🟠 Concept 4 — Matrices de système aléatoires

**Le cadre.** Supposons que $\{A_0,B_0\},\dots,\{A_{N-1},B_{N-1}\}$ ne soient **pas connues** mais soient des matrices **aléatoires indépendantes**, elles-mêmes indépendantes des $w_k$.

**Algorithme DP.**

$$J_k(x_k) = \min_{u_k}\ \mathbb{E}_{w_k,A_k,B_k}\Big[x_k'Q_kx_k+u_k'R_ku_k+J_{k+1}\big(A_kx_k+B_ku_k+w_k\big)\Big]$$

**La politique reste linéaire**, $\mu_k^\star(x_k)=L_kx_k$, mais les formules gagnent des espérances :

$$L_k = -\Big(R_k+\mathbb{E}\{B_k'K_{k+1}B_k\}\Big)^{-1}\mathbb{E}\{B_k'K_{k+1}A_k\}$$

$$K_k = \mathbb{E}\{A_k'K_{k+1}A_k\} - \mathbb{E}\{A_k'K_{k+1}B_k\}\Big(R_k+\mathbb{E}\{B_k'K_{k+1}B_k\}\Big)^{-1}\mathbb{E}\{B_k'K_{k+1}A_k\}+Q_k$$

**Deux propriétés se perdent.**

> - *L'équivalence certaine **peut ne pas** être vérifiée.*
> - *L'équation de Riccati **peut ne pas** converger vers un régime stationnaire.*

**Pourquoi.** Dans le cas scalaire, $P_{k+1}=\tilde F(P_k)$ avec

$$\tilde F(P) = \frac{\mathbb{E}\{A^2\}RP}{\mathbb{E}\{B^2\}P+R}+Q+\frac{TP^2}{\mathbb{E}\{B^2\}P+R}, \qquad T = \mathbb{E}\{A^2\}\mathbb{E}\{B^2\}-\big(\mathbb{E}\{A\}\big)^2\big(\mathbb{E}\{B\}\big)^2$$

Le terme supplémentaire en $TP^2$ change tout : si $T>0$ — c'est-à-dire dès que $A$ ou $B$ est réellement aléatoire — $\tilde F$ cesse d'être bornée et peut **n'avoir aucun point fixe**, auquel cas $P_k\to\infty$.

> **L'interprétation.** $T$ mesure la **variabilité** des matrices du système. Une incertitude **additive** (le bruit $w_k$) se moyenne et ne coûte rien à la conception ; une incertitude **multiplicative** (sur $A$ et $B$) déstabilise. C'est la différence entre « je ne sais pas où je serai poussé » et « je ne sais pas comment le système réagit à mes commandes » — la seconde est bien plus grave.

## 🔴 Concept 5 — Gestion de stock

**Le modèle.** $x_k$ le stock, $u_k$ la quantité achetée, $w_k$ la demande :

$$x_{k+1}=x_k+u_k-w_k, \qquad k=0,\dots,N-1$$

**Le coût à minimiser.**

$$\mathbb{E}\Big[\sum_{k=0}^{N-1}\big(c\,u_k + H(x_k+u_k)\big)\Big]$$

où

$$H(x+u) = \mathbb{E}\big\{r(x+u-w)\big\}$$

est le **coût espéré de rupture et de stockage**, avec par exemple, pour $p>0$ et $h>0$,

$$r(x) = p\max(0,-x)+h\max(0,x)$$

<div class="callout" data-kind="methode">

<span class="callout__lab">Comment lire $r$.</span>

Si le stock final $x$ est **négatif** (rupture), on paie $p$ par unité manquante ; s'il est **positif**, on paie $h$ par unité stockée. C'est une fonction **convexe affine par morceaux**, la même forme qu'à la fiche 25 — un maximum de deux fonctions affines : $r(x)=\max\{-px,\ hx\}$.

</div>

**Algorithme DP.**

$$J_N(x_N)=0, \qquad J_k(x_k)=\min_{u_k\geq0}\Big[c\,u_k+H(x_k+u_k)+\mathbb{E}\big\{J_{k+1}(x_k+u_k-w_k)\big\}\Big]$$

## 🔴 Concept 6 — La politique optimale à niveau de recomplètement

**Le changement de variable décisif.** Posons $y = x_k+u_k$, le **stock après commande**. Comme $u_k\geq0$, cela revient à $y\geq x_k$, et l'algorithme se réécrit

$$J_k(x_k) = \min_{u_k\geq0}\Big[cu_k+H(x_k+u_k)+\mathbb{E}\{J_{k+1}(x_k+u_k-w_k)\}\Big] = \min_{y\geq x_k} G_k(y) - c\,x_k$$

où

$$\boxed{\ G_k(y) = c\,y + H(y) + \mathbb{E}\big\{J_{k+1}(y-w)\big\}\ }$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que le changement de variable accomplit.</span>

La minimisation portait sur $u_k$ avec un terme $cx_k$ mélangé dedans ; elle porte maintenant sur le **niveau visé** $y$, la seule contrainte étant $y\geq x_k$. La fonction $G_k$ **ne dépend plus de $x_k$** — celui-ci n'apparaît que dans la contrainte et dans le terme constant $-cx_k$.

</div>

**Le résultat.** Si $G_k$ est **convexe** et $\lim_{|x|\to\infty}G_k(x)\to\infty$, alors

$$\mu_k^\star(x_k) = \begin{cases} S_k-x_k & \text{si } x_k<S_k\\[2pt] 0 & \text{si } x_k\geq S_k\end{cases}$$

où **$S_k$ minimise $G_k(y)$**.

**C'est une politique à niveau de recomplètement** (*base-stock policy*) : *si le stock est sous le seuil $S_k$, on commande juste ce qu'il faut pour l'y ramener ; sinon on ne commande rien.*

**Pourquoi c'est immédiat une fois $G_k$ convexe.** Minimiser une fonction convexe sur $[x_k,+\infty[$ : si le minimiseur libre $S_k$ est dans l'intervalle ($x_k\leq S_k$), on le prend ; sinon la fonction est croissante sur tout l'intervalle et l'optimum est au bord, $y=x_k$, c'est-à-dire $u_k=0$.

**La justification complète.** On montre, en supposant $H$ **convexe** et $c<p$, que $J_k$ est **convexe pour tout $k$** et que $\lim_{|x|\to\infty}J_k(x)\to\infty$ — par une récurrence inductive graphique à rebours.

⚠️ **La condition $c<p$ est indispensable et parle d'elle-même** : le coût d'achat unitaire doit être **inférieur** au coût de rupture unitaire. Sinon il serait toujours moins cher de ne rien commander et de subir les ruptures — le problème n'aurait aucun intérêt, et la coercivité tomberait.

### Comment résoudre l'exercice type (protocole)

1. **Reconnaître la structure** : dynamique linéaire $+$ coût quadratique $\to$ LQ ; stock $+$ coût convexe de rupture et stockage $\to$ recomplètement.
2. **Dans le cas LQ** : poser $J_k(x)=x'K_kx+\text{cte}$, initialiser $K_N=Q_N$.
3. **Dérouler Riccati à rebours** pour obtenir les $K_k$, puis les gains $L_k=-(B_k'K_{k+1}B_k+R_k)^{-1}B_k'K_{k+1}A_k$.
4. **Si le problème est stationnaire et l'horizon long** : résoudre directement l'équation **algébrique** de Riccati et utiliser le gain constant $L$.
5. **Dans le cas stock** : poser $y=x_k+u_k$ et former $G_k(y)=cy+H(y)+\mathbb{E}\{J_{k+1}(y-w)\}$.
6. **Vérifier la convexité et la coercivité** de $G_k$ ($H$ convexe, $c<p$).
7. **Calculer $S_k=\arg\min G_k$** et énoncer la politique à seuil.
8. **Vérifier l'équivalent certain** avant de l'invoquer : il tient pour un bruit additif centré, pas pour des matrices aléatoires.

### Exercices progressifs

**Niveau 1** — Pourquoi exige-t-on $R_k\succ0$ et non seulement $R_k\succeq0$ ?

<details><summary>Correction</summary>

Parce que la minimisation en $u_k$ porte sur la quadratique

$$u_k'\big(B_k'K_{k+1}B_k+R_k\big)u_k + 2u_k'B_k'K_{k+1}A_kx_k + \cdots$$

et que la formule du gain exige d'**inverser** $B_k'K_{k+1}B_k+R_k$. Avec $K_{k+1}\succeq0$, le premier terme est seulement semi-défini positif : c'est $R_k\succ0$ qui garantit la **stricte** définie positivité de la somme, donc l'inversibilité, donc l'unicité du minimiseur.

*Autrement dit :* on peut ne pas pénaliser certaines directions de l'état ($Q_k$ singulière est admise), mais on doit **toujours** pénaliser strictement la commande — sinon une commande infinie serait gratuite.

</details>

**Niveau 2** — Que signifie l'équivalence certaine, et pourquoi tient-elle dans le cas LQ standard ?

<details><summary>Correction</summary>

**Elle signifie que la politique optimale est la même que si l'on remplaçait $w_k$ par son espérance $\mathbb{E}\{w_k\}=0$** — donc qu'on peut concevoir la commande comme si le système était **déterministe**.

**Pourquoi elle tient ici.** Le bruit est **additif** : dans $J_{k+1}(A_kx_k+B_ku_k+w_k)$ avec $J_{k+1}$ quadratique, le développement fait apparaître un terme croisé en $w_k$ dont l'espérance est **nulle** ($w_k$ centré et indépendant), et un terme en $\mathbb{E}\{w_k'K_{k+1}w_k\}$ qui est une **constante** ne dépendant ni de $x_k$ ni de $u_k$. Le bruit n'influence donc **pas l'argmin** : il ne fait qu'ajouter une constante au coût.

</details>

**Niveau 3** — Sur le système scalaire $x_{k+1}=ax_k+bu_k+w_k$ avec coût $\sum(qx_k^2+ru_k^2)+q_Nx_N^2$, écrivez la récurrence de Riccati et le gain.

<details><summary>Correction</summary>

Tout est scalaire. $K_N=q_N$, puis

$$K_k = a^2\Big(K_{k+1}-\frac{b^2K_{k+1}^2}{b^2K_{k+1}+r}\Big)+q = \frac{a^2rK_{k+1}}{b^2K_{k+1}+r}+q$$

et le gain

$$L_k = -\frac{b\,K_{k+1}a}{b^2K_{k+1}+r}, \qquad \mu_k^\star(x_k)=L_kx_k$$

*Lecture des cas limites.* Si $r\to\infty$ (commande très chère) : $L_k\to0$, on ne commande pas. Si $r\to0$ : $L_k\to-a/b$, donc $x_{k+1}=ax_k-\tfrac{a}{b}\,b\,x_k+w_k = w_k$ — on ramène l'état à zéro en un pas, ce que permet une commande gratuite.

*Régime stationnaire.* $K$ est le point fixe positif de $K = \dfrac{a^2rK}{b^2K+r}+q$, soit $b^2K^2+K(r-a^2r-b^2q)-qr=0$, dont une seule racine est positive.

</details>

**Niveau 4 — type examen** — Démontrez que la politique optimale de gestion de stock est à seuil, en supposant $G_k$ convexe et coercive.

<details><summary>Correction</summary>

**Étape 1 — réécriture.** Avec $y=x_k+u_k$ et $u_k\geq0$, donc $y\geq x_k$ :

$$c\,u_k+H(x_k+u_k)+\mathbb{E}\{J_{k+1}(x_k+u_k-w)\} = \underbrace{c\,y+H(y)+\mathbb{E}\{J_{k+1}(y-w)\}}_{G_k(y)} - c\,x_k$$

(on a écrit $cu_k = cy-cx_k$). Donc

$$J_k(x_k)=\min_{y\geq x_k}G_k(y)-c\,x_k$$

**Étape 2 — minimiser une convexe sur une demi-droite.** Soit $S_k$ un minimiseur global de $G_k$ (il existe par coercivité, et l'ensemble des minimiseurs est un intervalle par convexité). Deux cas :

- **si $x_k<S_k$** : le minimiseur libre $S_k$ appartient à $[x_k,+\infty[$, donc $y^\star=S_k$, c'est-à-dire $u_k^\star=S_k-x_k>0$ ;
- **si $x_k\geq S_k$** : par convexité, $G_k$ est **croissante** à droite de son minimiseur, donc sur tout $[x_k,+\infty[$ ; l'optimum est au bord, $y^\star=x_k$, c'est-à-dire $u_k^\star=0$.

D'où

$$\mu_k^\star(x_k)=\begin{cases}S_k-x_k & x_k<S_k\\ 0 & x_k\geq S_k\end{cases} \qquad\blacksquare$$

**Ce que la preuve enseigne.** Toute la difficulté est reportée sur **la convexité de $G_k$**, elle-même conséquence de la convexité de $J_{k+1}$ — d'où la récurrence : $H$ convexe et $c<p$ entraînent $J_k$ convexe pour tout $k$. **La structure de la politique optimale est une conséquence directe d'une propriété de convexité qui se propage à rebours** : exactement le même mécanisme que dans le cas LQ, où c'est la forme quadratique qui se propage.

**La portée pratique.** On n'a pas besoin de tabuler $J_k$ : il suffit de connaître les $N$ nombres $S_0,\dots,S_{N-1}$. Une politique à niveau de recomplètement est ce qu'utilisent réellement les systèmes de gestion de stock.

</details>

## 🔴 Common mistakes

1. **Prendre $R_k\succeq0$** — il faut $R_k\succ0$ pour l'inversibilité et l'unicité.
2. **Croire que l'équivalence certaine est générale** — elle tombe dès que les matrices du système sont aléatoires (concept 4).
3. **Dérouler Riccati dans le sens du temps** — elle part de $K_N=Q_N$ et va **à rebours**, comme la DP.
4. **Oublier la constante dans $J_k$** — $J_k(x)=x'K_kx+\text{cte}$, la constante venant de $\mathbb{E}\{w'K w\}$ ; elle ne change pas l'argmin mais change la valeur.
5. **Chercher un régime stationnaire sans hypothèses** — il faut système et coût stationnaires, plus commandabilité et observabilité.
6. **Oublier la contrainte $u_k\geq0$** en gestion de stock — c'est elle qui donne $y\geq x_k$, donc la structure à seuil.
7. **Confondre le seuil $S_k$ avec la quantité commandée** — on commande $S_k-x_k$, pas $S_k$.
8. **Oublier la condition $c<p$** — sans elle, $J_k$ n'est plus coercive et la politique à seuil n'a plus de sens.

## 📌 Ultimate Review

1. **LQ** : $x_{k+1}=A_kx_k+B_ku_k+w_k$, coût $x_N'Q_Nx_N+\sum(x_k'Q_kx_k+u_k'R_ku_k)$, $Q_k\succeq0$, $R_k\succ0$, $w_k$ indépendants centrés.
2. **Faits clés** : $J_k$ **quadratique**, politique **linéaire** $\mu_k^\star(x_k)=L_kx_k$.
3. **Gain** $L_k=-(B_k'K_{k+1}B_k+R_k)^{-1}B_k'K_{k+1}A_k$ ; **Riccati** $K_N=Q_N$ puis $K_k=A_k'(K_{k+1}-K_{k+1}B_k(\cdot)^{-1}B_k'K_{k+1})A_k+Q_k$, **à rebours**.
4. **Équivalent certain** : la politique est la même qu'avec $w_k$ remplacé par $\mathbb{E}\{w_k\}=0$.
5. **Régime stationnaire** : sous commandabilité et observabilité, $K_k\to K$, unique solution semi-définie positive de l'équation **algébrique** de Riccati ; le contrôleur $L$ **stabilise** ($(A+BL)^k\to0$).
6. Cas scalaire : $P_{k+1}=F(P_k)$ avec $F(P)=\frac{A^2RP}{B^2P+R}+Q$ — deux points fixes, **un seul positif**.
7. **Matrices aléatoires** : la politique reste linéaire, mais l'équivalence certaine **et** la convergence de Riccati **peuvent tomber** ; le terme $TP^2$ mesure la variabilité multiplicative.
8. **Stock** : $x_{k+1}=x_k+u_k-w_k$, coût $\sum(cu_k+H(x_k+u_k))$ avec $H(y)=\mathbb{E}\{r(y-w)\}$ et $r(x)=p\max(0,-x)+h\max(0,x)$.
9. **Changement de variable** $y=x_k+u_k$ : $J_k(x_k)=\min_{y\geq x_k}G_k(y)-cx_k$ avec $G_k(y)=cy+H(y)+\mathbb{E}\{J_{k+1}(y-w)\}$.
10. **Politique à niveau de recomplètement** : commander $S_k-x_k$ si $x_k<S_k$, rien sinon, où $S_k=\arg\min G_k$ — valable si $G_k$ est convexe et coercive ($H$ convexe, $c<p$).

**Formulas to know**

$$L_k=-\big(B_k'K_{k+1}B_k+R_k\big)^{-1}B_k'K_{k+1}A_k \qquad K_k=A_k'\Big(K_{k+1}-K_{k+1}B_k\big(B_k'K_{k+1}B_k+R_k\big)^{-1}B_k'K_{k+1}\Big)A_k+Q_k$$

$$G_k(y)=cy+H(y)+\mathbb{E}\{J_{k+1}(y-w)\} \qquad \mu_k^\star(x_k)=\max\{S_k-x_k,\ 0\}$$

**Methods to know** : le protocole en 8 étapes ; la récurrence de Riccati à rebours ; le changement de variable $y=x_k+u_k$ ; la preuve de la politique à seuil.

## 🧠 Active Recall

**Basic** — Quels sont les deux « faits clés » du problème linéaire-quadratique ?

<details><summary>Réponse</summary>

**(1)** La fonction de coût-à-venir $J_k(x_k)$ est **quadratique** — de la forme $x_k'K_kx_k+\text{constante}$. **(2)** La politique optimale est **linéaire** en l'état : $\mu_k^\star(x_k)=L_kx_k$. Les matrices $K_k$ obéissent à l'équation de Riccati en temps discret, déroulée **à rebours** depuis $K_N=Q_N$.

</details>

**Understanding** — Pourquoi la forme quadratique se propage-t-elle à rebours ?

<details><summary>Réponse</summary>

Parce qu'à chaque étape on minimise, en $u_k$, une **quadratique convexe** : le coût par étape est quadratique, et $J_{k+1}$ l'est par hypothèse de récurrence. Une quadratique convexe se minimise analytiquement, le minimiseur est **linéaire** en $x_k$, et la **valeur** du minimum est encore **quadratique** en $x_k$. La forme fonctionnelle est donc **stable** par l'opérateur de Bellman — c'est exactement ce qui rend le problème résoluble à la main.

</details>

**Application** — En gestion de stock, quel changement de variable révèle la structure de la politique optimale ?

<details><summary>Réponse</summary>

Poser $y = x_k+u_k$, le **stock après commande**. La contrainte $u_k\geq0$ devient $y\geq x_k$, et le problème s'écrit $J_k(x_k)=\min_{y\geq x_k}G_k(y)-cx_k$ avec $G_k(y)=cy+H(y)+\mathbb{E}\{J_{k+1}(y-w)\}$. La fonction $G_k$ **ne dépend plus de $x_k$**, qui n'intervient que dans la contrainte : minimiser une convexe sur une demi-droite donne immédiatement la politique à seuil.

</details>

**Comparison** — Bruit additif et matrices de système aléatoires : qu'est-ce qui change ?

<details><summary>Réponse</summary>

Avec un bruit **additif** centré, la politique optimale est celle du problème déterministe (**équivalence certaine**) et l'équation de Riccati converge sous commandabilité et observabilité.

Avec des matrices $A_k,B_k$ **aléatoires**, la politique reste linéaire mais les formules gagnent des espérances, l'**équivalence certaine peut tomber**, et l'équation de Riccati **peut ne pas converger** — le terme supplémentaire $TP^2$, avec $T=\mathbb{E}\{A^2\}\mathbb{E}\{B^2\}-(\mathbb{E}\{A\})^2(\mathbb{E}\{B\})^2$, mesure cette variabilité multiplicative. Ne pas savoir où l'on sera poussé est bénin ; ne pas savoir comment le système réagit ne l'est pas.

</details>

**Exam-style** — Énoncez la politique optimale de gestion de stock et ses conditions de validité.

<details><summary>Réponse</summary>

$$\mu_k^\star(x_k)=\begin{cases}S_k-x_k & \text{si } x_k<S_k\\ 0 & \text{si } x_k\geq S_k\end{cases}, \qquad S_k=\arg\min_y G_k(y)$$

avec $G_k(y)=cy+H(y)+\mathbb{E}\{J_{k+1}(y-w)\}$.

**Conditions.** $G_k$ doit être **convexe** et **coercive** ($G_k(x)\to\infty$ quand $|x|\to\infty$). On l'obtient en supposant $H$ **convexe** et $c<p$ — le coût unitaire d'achat inférieur au coût unitaire de rupture — ce qui entraîne par récurrence que $J_k$ est convexe et coercive pour tout $k$.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Système LQ ? | $x_{k+1}=A_kx_k+B_ku_k+w_k$ |
| Conditions sur $Q_k$ et $R_k$ ? | $Q_k\succeq0$ et $R_k\succ0$ |
| Forme de $J_k$ en LQ ? | Quadratique : $x_k'K_kx_k+\text{constante}$ |
| Forme de la politique optimale ? | **Linéaire** : $\mu_k^\star(x_k)=L_kx_k$ |
| Gain $L_k$ ? | $-(B_k'K_{k+1}B_k+R_k)^{-1}B_k'K_{k+1}A_k$ |
| Initialisation de Riccati ? | $K_N=Q_N$, puis à rebours |
| Équivalence certaine ? | La politique est la même qu'avec $w_k$ remplacé par $\mathbb{E}\{w_k\}=0$ |
| Hypothèses du régime stationnaire ? | Système et coût stationnaires, commandabilité de $(A,B)$, observabilité de $(A,C)$ |
| Propriété du contrôleur stationnaire ? | Il **stabilise** : $(A+BL)^k\to0$ |
| Riccati scalaire ? | $F(P)=\frac{A^2RP}{B^2P+R}+Q$ — deux points fixes, un seul positif |
| Matrices aléatoires : que perd-on ? | L'équivalence certaine et la convergence de Riccati |
| Dynamique du stock ? | $x_{k+1}=x_k+u_k-w_k$ |
| Coût de rupture et de stockage ? | $r(x)=p\max(0,-x)+h\max(0,x)$, convexe |
| Changement de variable clé ? | $y=x_k+u_k$, le stock **après commande** |
| Définition de $G_k$ ? | $G_k(y)=cy+H(y)+\mathbb{E}\{J_{k+1}(y-w)\}$ |
| Politique optimale de stock ? | Commander $S_k-x_k$ si $x_k<S_k$, rien sinon |
| Que vaut $S_k$ ? | Le minimiseur de $G_k$ |
| Conditions de validité ? | $G_k$ convexe et coercive : $H$ convexe et $c<p$ |
