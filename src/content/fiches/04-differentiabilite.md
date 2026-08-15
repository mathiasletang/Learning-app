# Fiche 4 — Différentiabilité, plan tangent et hessienne

| | |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Faccanoni, chapitre 3, §3.2–3.3, p. 34–45 |
| **Difficulté** | 🔴 Must know — la question théorique favorite des examens |
| **Temps d'étude estimé** | 1 h 30 |
| **Prérequis** | Fiches 2 et 3 (limites en polaires, dérivées partielles) |
| **Concepts clés** | Différentiabilité, différentielle, plan tangent, Schwarz, hessienne, convexité |
| **Poids à l'examen** | « Montrer que $f$ est (ou n'est pas) différentiable en $(0,0)$ » est un exercice rituel ; la hessienne est l'outil central des fiches 6–7. |

---

## 🎯 Vue d'ensemble

En une variable, dérivable = différentiable = il existe une tangente. En deux variables, **l'équivalence se brise** : les dérivées partielles ne regardent que deux directions, ce qui est trop faible pour garantir un *plan tangent*. La différentiabilité comble ce déficit : elle exige que l'approximation linéaire soit bonne **dans toutes les directions à la fois**. Ce chapitre établit la hiérarchie des régularités, construit le plan tangent, puis monte à l'ordre 2 : dérivées secondes, théorème de Schwarz, hessienne et convexité — les munitions des fiches extrema.

```
        C¹  ⟹  différentiable  ⟹  continue
                     ⟹  dérivable
        (aucune flèche ne se retourne !)

Ordre 2 : dérivées secondes → Schwarz (symétrie) → HESSIENNE
          → DL ordre 2 → convexité/concavité
```

---

## 🔴 Concept 1 — Différentiabilité

**Définition (déf. 3.8).**
> $f$ est **différentiable** en $(x_0,y_0)$ s'il existe deux constantes $A, B$ et une fonction $\varepsilon$ telles que
> $$f(x_0{+}h,\, y_0{+}k) = f(x_0,y_0) + hA + kB + \lVert(h,k)\rVert\,\varepsilon(h,k), \qquad \lim_{(h,k)\to(0,0)} \varepsilon(h,k) = 0.$$

**Intuition.** Il existe un plan (de pentes $A$, $B$) qui colle à la surface à un erreur **négligeable devant la distance** près. Zoomer sur le point doit faire ressembler la surface à un plan.

**Théorème 3.9.** Différentiable ⟹ continue **et** dérivable, avec $A = \partial_x f(x_0,y_0)$, $B = \partial_y f(x_0,y_0)$.

**Théorème 3.10 — LE critère pratique.**
> $f$ (continue et dérivable en $(x_0,y_0)$) est différentiable en $(x_0,y_0)$ **ssi**
> $$\lim_{(h,k)\to(0,0)} \frac{f(x_0{+}h, y_0{+}k) - f(x_0,y_0) - h\,\partial_x f(x_0,y_0) - k\,\partial_y f(x_0,y_0)}{\sqrt{h^2+k^2}} = 0.$$

**Théorème 3.11 — le raccourci.** $f$ de classe $C^1$ au voisinage du point ⟹ $f$ différentiable. **La réciproque est fausse.** Conséquence pratique : polynômes, exp, log, trigo et leurs combinaisons sont différentiables *d'office* sur leur domaine — le travail ne porte que sur les points spéciaux.

### Comment résoudre « f est-elle différentiable en (0,0) ? »

1. **Continuité** en $(0,0)$ (fiche 2). Pas continue ⟹ pas différentiable, terminé.
2. **Dérivées partielles en $(0,0)$** par la définition (fiche 3). Une n'existe pas ⟹ pas différentiable, terminé.
3. **Critère 3.10** : former $\dfrac{f(h,k) - f(0,0) - h\,\partial_x f(0,0) - k\,\partial_y f(0,0)}{\sqrt{h^2+k^2}}$ et étudier sa limite **en polaires** (fiche 2).
4. Limite $= 0$ ⟹ différentiable ; limite inexistante ou $\neq 0$ ⟹ non.

**Exemple (du cours).** $f(x,y) = xy - 2x + 3y$ en $(0,0)$ : $\partial_x f(0,0) = -2$, $\partial_y f(0,0) = 3$, le quotient devient $\frac{hk}{\sqrt{h^2+k^2}} = r\cos\vartheta\sin\vartheta \to 0$. Différentiable. ✓

**Contre-exemple (du cours).** $f(x,y) = \sqrt{x^2+y^2}$ (le cône) en $(0,0)$ : $\partial_x f(0,0) = \lim_h |h|/h$ n'existe pas ⟹ non différentiable. Zoomer sur la pointe d'un cône ne donne jamais un plan.

**Contre-exemple (du cours).** $f = \frac{xy^2}{x^2+y^4}$ (hors origine), $f(0,0)=0$ : dérivable en $(0,0)$ mais pas continue ⟹ pas différentiable. La dérivabilité est *trop faible*.

---

## 🔴 Concept 2 — Différentielle, plan tangent, linéarisation

**Définition (déf. 3.12).** En tout point où $f$ est différentiable, la **différentielle** est
$$\mathrm{d}f(x,y) = \partial_x f(x,y)\,\mathrm{d}x + \partial_y f(x,y)\,\mathrm{d}y.$$

**Définition (déf. 3.13).** L'équation du **plan tangent** au graphe en $(x_0,y_0)$ — c'est aussi la **linéarisation** de $f$ :
$$L(x,y) = f(x_0,y_0) + (x - x_0)\,\partial_x f(x_0,y_0) + (y - y_0)\,\partial_y f(x_0,y_0)$$

### Comment utiliser la linéarisation pour approcher une valeur ?

1. Choisir un point $(x_0,y_0)$ **proche** de la valeur cherchée où tout se calcule facilement.
2. Vérifier la différentiabilité (souvent : $C^1$ visible ⟹ automatique).
3. Calculer $f(x_0,y_0)$, $\partial_x f(x_0,y_0)$, $\partial_y f(x_0,y_0)$, écrire $L$.
4. Évaluer $L$ au point voulu.

**Exemple complet (du cours).** Approcher $f(1{,}1;\, -0{,}1)$ pour $f(x,y) = x e^{xy}$ : en $(1, 0)$, $f = 1$, $\partial_x f = e^{xy} + xye^{xy} \to 1$, $\partial_y f = x^2 e^{xy} \to 1$, donc $L(x,y) = x + y$ et $f(1{,}1; -0{,}1) \approx 1{,}1 - 0{,}1 = 1$ (valeur exacte $\approx 0{,}985$).

**Estimation d'erreurs (prop. 3.14).** Si les mesures ont des incertitudes $r_1, r_2$, alors $|f(x_1,y_1) - f(x_0,y_0)| \leq A r_1 + B r_2$ avec $A, B$ des majorants de $|\partial_x f|, |\partial_y f|$ sur le rectangle d'incertitude — l'outil des exercices de physique/économie appliquée.

---

## 🟡 Concept 3 — Fonctions homogènes et théorème d'Euler

**Définition (déf. 3.15).** $f$ est **homogène de degré $k$** si $f(\lambda x) = \lambda^k f(x)$ pour tout $\lambda > 0$.

**Théorème d'Euler (thm. 3.16).** Si $f$ est homogène de degré $k$ et différentiable :
$$\sum_{i=1}^n x_i\, \partial_{x_i} f(x) = k\, f(x).$$

**Exemple économique (du cours).** Cobb-Douglas à rendements constants $f = x^\alpha y^{1-\alpha}$ : homogène de degré 1, donc $x\,\partial_x f + y\,\partial_y f = f$ — « la production permet exactement de rémunérer les facteurs à leur productivité marginale ».

---

## 🔴 Concept 4 — Dérivées secondes, Schwarz, hessienne

**Définition (déf. 3.17).** Les 4 dérivées secondes en 2 variables : $\partial_{xx} f$, $\partial_{xy} f$, $\partial_{yx} f$, $\partial_{yy} f$ (en général $n^k$ dérivées d'ordre $k$).

**Théorème de Schwarz (thm. 3.18).**
> Si $\partial_{xy} f$ et $\partial_{yx} f$ sont **continues** en $(x_0,y_0)$, alors $\partial_{xy} f(x_0,y_0) = \partial_{yx} f(x_0,y_0)$.

Vérification recommandée en pratique : calculer les deux croisées est un auto-contrôle gratuit de vos calculs.

**Définition (déf. 3.20).**
> La **matrice hessienne** de $f$ en $(x_0, y_0)$ :
> $$H_f(x_0,y_0) = \begin{pmatrix} \partial_{xx}f & \partial_{xy}f \\ \partial_{yx}f & \partial_{yy}f \end{pmatrix}, \qquad \det H_f = \partial_{xx}f\,\partial_{yy}f - (\partial_{xy}f)^2 \ \ (\text{si Schwarz}).$$

**DL d'ordre 2 (déf. 3.19, forme matricielle).** Pour $f \in C^2$ :
$$f(x) = f(x_0) + (x - x_0)^T \nabla f(x_0) + \tfrac12 (x-x_0)^T H_f(x_0)\,(x - x_0) + o(\lVert x - x_0\rVert^2)$$
La hessienne est le « terme d'ordre 2 » : elle dit si la surface se courbe vers le haut, vers le bas, ou en selle — d'où son rôle décisif pour les extrema (fiche 6).

---

## 🟠 Concept 5 — Convexité

**Définition (déf. 3.22).** $f$ est **convexe** sur $D$ convexe si $f\big((1{-}t)P_0 + tP_1\big) \leq (1{-}t)f(P_0) + t f(P_1)$ pour tous $P_0, P_1 \in D$, $t \in [0;1]$ (concave : $\geq$ ; strict : inégalité stricte pour $t \in ]0;1[$).

**Caractérisations (prop. 3.23)** pour $f \in C^2(D)$, $D$ convexe :

| Constat sur $H_f(x,y)$ **partout sur $D$** | Conclusion |
|---|---|
| $\det H_f \geq 0$ et $\partial_{xx} f \geq 0$ (semi-définie positive) | $f$ convexe ⟺ |
| $\det H_f \geq 0$ et $\partial_{xx} f \leq 0$ (semi-définie négative) | $f$ concave ⟺ |
| $\det H_f > 0$ et $\partial_{xx} f > 0$ (définie positive) | $f$ **strictement** convexe ⟹ |
| $\det H_f > 0$ et $\partial_{xx} f < 0$ (définie négative) | $f$ **strictement** concave ⟹ |

⚠️ Les deux dernières lignes sont des implications **à sens unique** : $f(x,y) = x^4 + y^4$ est strictement convexe alors que sa hessienne n'est que semi-définie positive en $(0,0)$ (exemple du cours).

**Interprétation** : $f$ convexe ⟺ le graphe est **au-dessus** de chacun de ses plans tangents (et concave : en dessous) — c'est la première partie de la prop. 3.23.

**Pourquoi c'est précieux** : pour une fonction convexe, tout minimum local est **global** — l'argument qui transformera vos conclusions locales en conclusions globales (fiches 6–7).

---

## ⚠️ Common mistakes

1. **« Dérivable donc continue »** — FAUX en plusieurs variables. La bonne chaîne : $C^1 \Rightarrow$ différentiable $\Rightarrow$ continue et dérivable, sans retour.
2. **Oublier de retrancher le terme linéaire** dans le critère 3.10 — le quotient contient $f - f(0,0) - h\partial_x f - k\partial_y f$, pas seulement $f - f(0,0)$.
3. **Conclure « non strictement convexe » parce que la hessienne n'est pas définie positive** — l'implication stricte ne se retourne pas ($x^4 + y^4$).
4. **Appliquer Schwarz sans continuité des croisées** — l'hypothèse fait partie du théorème.
5. **Confondre différentielle (forme $\mathrm{d}f$) et plan tangent (fonction affine $L$)** — même contenu, objets différents.
6. **Vérifier la convexité en un seul point** — les conditions sur $H_f$ doivent valoir **partout sur $D$**.

---

## 📌 Ultimate Review

1. Hiérarchie : $C^1 \Rightarrow$ différentiable $\Rightarrow$ continue **et** dérivable ; aucune réciproque.
2. Critère : $\lim \frac{f - f_0 - h\partial_x f_0 - k\partial_y f_0}{\sqrt{h^2+k^2}} = 0$ (en polaires).
3. Plan tangent : $L = f_0 + (x{-}x_0)\partial_x f_0 + (y{-}y_0)\partial_y f_0$ ; sert à approcher des valeurs.
4. Estimation d'erreur : $|\Delta f| \leq A r_1 + B r_2$.
5. Euler : $\sum x_i \partial_{x_i} f = k f$ pour $f$ homogène de degré $k$.
6. Schwarz : croisées continues ⟹ égales ; hessienne symétrique.
7. DL ordre 2 : $f_0 + \nabla f_0 \cdot h + \tfrac12 h^T H h + o(\lVert h \rVert^2)$.
8. Convexité ⟺ hessienne SDP partout ⟺ graphe au-dessus des plans tangents ; définie positive ⟹ stricte (sens unique).

**Definitions to know** : différentiabilité (3.8), différentielle (3.12), plan tangent (3.13), homogénéité (3.15), hessienne (3.20), convexité (3.22).
**Methods to know** : le protocole « différentiable en (0,0) ? » en 4 étapes ; l'approximation par linéarisation ; le test de convexité par hessienne.

---

## 🧠 Active Recall

**Basic** — Écrivez l'équation du plan tangent au graphe de $f$ en $(x_0, y_0)$.
<details><summary>Réponse</summary>

$z = f(x_0,y_0) + (x-x_0)\,\partial_x f(x_0,y_0) + (y-y_0)\,\partial_y f(x_0,y_0)$.
</details>

**Understanding** — Pourquoi la dérivabilité ne suffit-elle pas à garantir un plan tangent ?
<details><summary>Réponse</summary>

Les dérivées partielles ne contrôlent la fonction que le long des deux axes. Le « candidat plan » qu'elles définissent peut être démenti dans les directions obliques (voire la fonction peut être discontinue). La différentiabilité impose que l'erreur soit négligeable dans *toutes* les directions.
</details>

**Application** — Estimez $\sqrt{(3{,}02)^2 + (3{,}97)^2}$ par linéarisation.
<details><summary>Réponse</summary>

$f = \sqrt{x^2+y^2}$ en $(3,4)$ : $f = 5$, $\partial_x f = x/f = 3/5$, $\partial_y f = 4/5$. $L(3{,}02;\,3{,}97) = 5 + 0{,}6(0{,}02) + 0{,}8(-0{,}03) = 4{,}988$.
</details>

**Comparison** — Différence entre « $H_f$ semi-définie positive partout » et « définie positive partout » ?
<details><summary>Réponse</summary>

SDP partout ⟺ convexité (équivalence). Définie positive partout ⟹ convexité **stricte**, mais une fonction strictement convexe peut échouer au test ($x^4+y^4$ en $(0,0)$).
</details>

**Exam-style** — $f(x,y) = \frac{x^3}{x^2+y^2}$ hors origine, $f(0,0) = 0$. Différentiable en $(0,0)$ ?
<details><summary>Réponse</summary>

Continuité : $|f| \leq r|\cos^3\vartheta| \leq r \to 0$ ✓. Partielles : $\partial_x f(0,0) = \lim \frac{h^3/h^2}{h} = 1$, $\partial_y f(0,0) = 0$. Critère : $\frac{f(h,k) - h}{\sqrt{h^2+k^2}} = \frac{h^3 - h(h^2+k^2)}{(h^2+k^2)^{3/2}} = \frac{-hk^2}{(h^2+k^2)^{3/2}} = -\cos\vartheta\sin^2\vartheta$ : dépend de $\vartheta$, pas de limite nulle ⟹ **non différentiable** (bien que continue et dérivable).
</details>

---

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Chaîne des régularités ? | $C^1 \Rightarrow$ différentiable $\Rightarrow$ continue et dérivable ; rien ne se retourne |
| Critère de différentiabilité en $(x_0,y_0)$ ? | $\lim \frac{f - f_0 - h\partial_x f_0 - k\partial_y f_0}{\sqrt{h^2+k^2}} = 0$ |
| Raccourci pour prouver la différentiabilité ? | Montrer $f \in C^1$ au voisinage |
| Plan tangent ? | $f_0 + (x{-}x_0)\partial_x f_0 + (y{-}y_0)\partial_y f_0$ |
| Théorème de Schwarz ? | Croisées continues ⟹ $\partial_{xy}f = \partial_{yx}f$ |
| $\det H_f$ (2 variables) ? | $\partial_{xx}f\,\partial_{yy}f - (\partial_{xy}f)^2$ |
| Test de convexité $C^2$ ? | $H_f$ semi-définie positive **partout** sur $D$ convexe |
| Définie positive = ? | $\det H_f > 0$ **et** $\partial_{xx}f > 0$ |
| Euler (degré $k$) ? | $\sum_i x_i \partial_{x_i} f = k f$ |
| Fonction convexe : minimum local ⟹ ? | Minimum global |
