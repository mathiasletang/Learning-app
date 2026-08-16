# Fiche 8 — Taylor et développements limités (rappels une variable)

| | |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Faccanoni, annexe A, p. 177 sq. |
| **Difficulté** | 🟠 Should know (boîte à outils transversale) |
| **Temps d'étude estimé** | 1 h 20 |
| **Prérequis** | Dérivation une variable |
| **Concepts clés** | Linéarisation, polynôme de Taylor, majoration d'erreur, DL, Taylor-Young, équivalents |
| **Poids à l'examen** | Rarement une question isolée, mais l'outil resurgit partout : DL d'ordre 2 en deux variables (fiche 4), études de signe des restrictions (fiches 2 et 6), approximations numériques. |

## 🎯 Vue d'ensemble

Remplacer une fonction compliquée par un polynôme qui lui colle localement : c'est *l'idée* la plus rentable de l'analyse. L'annexe du cours la déroule en une variable — linéarisation (ordre 1), polynôme de Taylor (ordre $n$), contrôle de l'erreur, développements limités — et la fiche 4 l'a déjà étendue à deux variables. Objectif ici : des automatismes de calcul rapides et fiables.

## 🔴 Concept 1 — Linéarisation

**Définition (déf. A.1).** La **linéarisation** de $f$ en $x_0$ :
$$L(x) = f(x_0) + f'(x_0)(x - x_0)$$
— la droite tangente utilisée comme approximation : $f(x) \simeq L(x)$ pour $x \simeq x_0$.

**⚠️ Encadré du cours.** La linéarisation dépend du point ! $L_0$ de $\sqrt{1+x}$ vaut $1 + x/2$, mais $L_3$ vaut $(5+x)/4$ : chacune est meilleure près de *son* point.

**Les deux classiques du cours** (par cœur) :
$$(1+x)^n \simeq 1 + nx \qquad \text{et} \qquad \sin x \simeq x \qquad (x \simeq 0)$$
Applications du cours : $\sqrt[3]{1{,}2} = (1+0{,}2)^{1/3} \simeq 1{,}066$ ; $1{,}002^{100} \simeq 1{,}2$ ; le pendule ; mesurer un angle sans rapporteur (marquer 60 mm sur chaque côté : la corde en mm ≈ l'angle en degrés).

## 🔴 Concept 2 — Polynôme de Taylor et erreur

**Définition (déf. A.3).** Le **polynôme de Taylor** d'ordre $n$ de $f$ en $x_0$ :
$$P_n(x) = \sum_{k=0}^n \frac{f^{(k)}(x_0)}{k!}\,(x - x_0)^k$$
Il copie $f$ jusqu'à la dérivée $n$-ième : $P_n^{(k)}(x_0) = f^{(k)}(x_0)$ pour $k \leq n$.

**Théorème A.6 (erreur d'approximation).**
> Si $|f^{(n+1)}(x)| \leq M$ sur $[a;b]$, alors pour tout $x \in [a;b]$ :
> $$|f(x) - P_n(x)| \leq \frac{(b-a)^{n+1}}{(n+1)!}\, M.$$

**Exemple (du cours).** $\sin x \simeq x$ sur $[-0{,}5;\,0{,}5]$ : l'erreur est $\leq \frac{(0{,}5)^2}{2}\sin(0{,}5) \leq 0{,}06$. Savoir *borner* l'erreur est ce qui distingue une approximation d'une devinette.

## 🟠 Concept 3 — Développements limités et Taylor-Young

**Définition (déf. A.7).** $f$ admet un **DL d'ordre $n$ en $x_0$** s'il existe un polynôme $P_n$ de degré $\leq n$ tel que
$$f(x) = P_n(x - x_0) + o\big((x-x_0)^n\big).$$
Le polynôme, s'il existe, est **unique**.

**Théorème de Taylor-Young (thm. A.8).** Si $f$ est $n$ fois continûment dérivable autour de $x_0$, son DL d'ordre $n$ existe et c'est le polynôme de Taylor :
$$f(x) = \sum_{k=0}^n \frac{f^{(k)}(x_0)}{k!}(x - x_0)^k + o\big((x - x_0)^n\big).$$

**⚠️ Nuance du cours.** La réciproque (« DL d'ordre $n$ ⟹ $n$ fois dérivable ») n'est vraie que pour $n \leq 1$.

**DL usuels en 0** (le kit de survie) :
$$e^x = 1 + x + \frac{x^2}{2} + o(x^2) \qquad \ln(1+x) = x - \frac{x^2}{2} + o(x^2)$$
$$\sin x = x - \frac{x^3}{6} + o(x^3) \qquad \cos x = 1 - \frac{x^2}{2} + o(x^2) \qquad (1+x)^\alpha = 1 + \alpha x + \frac{\alpha(\alpha-1)}{2}x^2 + o(x^2)$$

### Exemples calculés — la mécanique des DL composés

**Exemple 1 — composition.** DL d'ordre 2 de $e^{\sin x}$ en 0 : $\sin x = x + o(x^2)$, donc $e^{\sin x} = 1 + (x + o(x^2)) + \tfrac{(x + o(x^2))^2}{2} + o(x^2) = 1 + x + \tfrac{x^2}{2} + o(x^2)$. On substitue le DL *dans* le DL, en ne gardant que les termes d'ordre $\leq 2$.

**Exemple 2 — quotient et équivalent.** $\lim_{x\to0} \dfrac{\ln(1+x) - x}{x^2}$ : le DL $\ln(1+x) = x - \tfrac{x^2}{2} + o(x^2)$ donne un numérateur $-\tfrac{x^2}{2} + o(x^2)$, d'où la limite $-\tfrac12$. Sans DL, forme indéterminée $\tfrac00$ tenace.

**Exemple 3 — le piège de la somme.** $\lim_{x\to0}\dfrac{\sin x - x}{x^3}$ : *faux* de remplacer $\sin x \sim x$ pour conclure « $0$ » — **les équivalents ne s'additionnent pas** (ici on soustrait justement les termes principaux). *Correct* : DL d'ordre 3, $\sin x - x = -\tfrac{x^3}{6} + o(x^3)$, limite $-\tfrac16$. Règle : dès qu'une somme fait s'annuler les ordres bas, pousser le DL un cran plus loin.

### Exercices progressifs

**🟢 Niveau 1** — DL d'ordre 2 de $\sqrt{1+x}$ en 0, puis estimation de $\sqrt{1{,}1}$.
<details><summary>Correction</summary>

$(1+x)^{1/2} = 1 + \tfrac{x}{2} - \tfrac{x^2}{8} + o(x^2)$. En $x = 0{,}1$ : $1 + 0{,}05 - 0{,}00125 = 1{,}04875$ (exact : $1{,}04881$). L'ordre 2 gagne deux décimales sur la linéarisation.
</details>

**🟡 Niveau 2** — Bornez l'erreur commise en remplaçant $e^x$ par $1 + x + \tfrac{x^2}{2}$ sur $[0;\,0{,}5]$.
<details><summary>Correction</summary>

$f'''(x) = e^x \leq e^{0{,}5} < 1{,}65$ sur l'intervalle ; théorème A.6 : $|f - P_2| \leq \dfrac{(0{,}5)^3}{3!}\cdot 1{,}65 \approx 0{,}034$. **Interprétation** : trois termes suffisent pour deux décimales sûres sur tout l'intervalle.
</details>

**🟠 Niveau 3 — vers la fiche 6** — Soit $g(k) = f(0, k) - f(0,0)$ avec $g(k) = ak^2 + bk^4 + o(k^4)$. Discutez la nature du point selon $a$ et $b$.
<details><summary>Correction</summary>

$a > 0$ : $g > 0$ près de 0 — la restriction monte (compatible minimum). $a < 0$ : elle descend (compatible maximum ou selle). $a = 0$ : le signe passe à $b$ — c'est exactement le cas douteux $\det H = 0$ de la fiche 6, où $x^2 + y^4$ ($b>0$, minimum) et $x^2 - y^4$ ($b<0$, selle) se départagent à l'ordre 4. Le DL est *l'outil* de l'étude directe.
</details>

### Où cela sert dans CE cours

- **Fiche 4** : le DL d'ordre 2 en deux variables $f = f_0 + \nabla f_0 \cdot h + \tfrac12 h^T H h + o(\lVert h\rVert^2)$ est le Taylor-Young bivarié — la hessienne joue le rôle de $f''$.
- **Fiches 2 et 6** : pour trancher le signe d'une restriction $g(t) = f(\gamma(t))$ (limite ou étude directe), un DL de $g$ en $0$ suffit souvent.
- **Équivalents** ($f \sim g$ si $f/g \to 1$, déf. A.12) : accélèrent les calculs de limites d'une variable qui apparaissent après restriction ou passage en polaires.

## ⚠️ Common mistakes

1. **Confondre $\simeq$ et $=$** — une approximation sans contrôle d'erreur n'est pas une égalité ; le théorème A.6 fournit la borne.
2. **Linéariser au mauvais point** — choisir $x_0$ *proche* de la valeur à estimer ET où $f$, $f'$ se calculent exactement.
3. **Tronquer trop tôt** — si le terme d'ordre 1 s'annule (cas typique : point critique !), il *faut* l'ordre 2 ; si l'ordre 2 s'annule, l'ordre suivant, etc.
4. **Sommer des $o(\cdot)$ d'ordres différents** sans aligner : tout ramener au même $o(x^n)$.
5. **Utiliser un équivalent dans une somme** — les équivalents se multiplient et se divisent bien, mais ne s'additionnent pas.

## 📌 Ultimate Review

1. $L(x) = f(x_0) + f'(x_0)(x-x_0)$ ; dépend du point.
2. $(1+x)^n \simeq 1+nx$, $\sin x \simeq x$ — les deux réflexes.
3. $P_n(x) = \sum_{k \leq n} \frac{f^{(k)}(x_0)}{k!}(x-x_0)^k$ ; erreur $\leq \frac{(b-a)^{n+1}}{(n+1)!}M$.
4. Taylor-Young : $C^n$ ⟹ DL d'ordre $n$, unique.
5. Les 5 DL usuels en 0 (exp, ln, sin, cos, $(1+x)^\alpha$).
6. En deux variables : gradient = ordre 1, hessienne = ordre 2.
7. Équivalents : produits/quotients oui, sommes non.

## 🧠 Active Recall

**Basic** — Écrivez le DL d'ordre 2 de $\ln(1+x)$ en 0.
<details><summary>Réponse</summary>

$\ln(1+x) = x - \frac{x^2}{2} + o(x^2)$.
</details>

**Understanding** — Pourquoi le DL d'ordre 2 est-il l'outil naturel au voisinage d'un point critique ?
<details><summary>Réponse</summary>

Au point critique, le terme d'ordre 1 (gradient) est nul : le comportement local de $f - f_0$ est dicté par le terme quadratique $\tfrac12 h^T H h$ — d'où le rôle de la hessienne dans la classification (fiche 6).
</details>

**Application** — Estimez $\sqrt{4{,}1}$ par linéarisation et bornez l'erreur.
<details><summary>Réponse</summary>

$f = \sqrt{x}$ en $x_0 = 4$ : $L(x) = 2 + \frac{x-4}{4}$, donc $\sqrt{4{,}1} \simeq 2{,}025$. Erreur : $|f''| = \frac{1}{4}x^{-3/2} \leq \frac{1}{32}$ sur $[4;4{,}1]$, donc $|f - L| \leq \frac{(0{,}1)^2}{2}\cdot\frac{1}{32} \approx 1{,}6\cdot10^{-4}$.
</details>

**Exam-style** — La restriction $d(k) = f(x_0, y_0 + k) - f(x_0,y_0)$ vaut $k^3 + o(k^3)$. Que concluez-vous sur le point critique ?
<details><summary>Réponse</summary>

$d$ change de signe avec $k$ (négatif pour $k<0$, positif pour $k>0$) : le point n'est pas un extremum — c'est le mécanisme de l'exemple $x^2 + y^3$ de la fiche 6.
</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Linéarisation en $x_0$ ? | $f(x_0) + f'(x_0)(x-x_0)$ |
| $(1+x)^n \simeq$ ? | $1 + nx$ ($x \simeq 0$) |
| Borne d'erreur de $P_n$ ? | $\frac{(b-a)^{n+1}}{(n+1)!}\,\max\lvert f^{(n+1)}\rvert$ |
| DL de $e^x$ ordre 2 ? | $1 + x + x^2/2 + o(x^2)$ |
| DL de $\cos x$ ordre 2 ? | $1 - x^2/2 + o(x^2)$ |
| Taylor-Young ? | $f\in C^n$ ⟹ $f = \sum \frac{f^{(k)}(x_0)}{k!}(x-x_0)^k + o((x-x_0)^n)$ |
| Les équivalents s'additionnent-ils ? | NON — produits et quotients seulement |
| Analogue 2 variables de $f''$ ? | La matrice hessienne |
