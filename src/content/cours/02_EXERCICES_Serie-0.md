# Série 0 — Remise en route

**Objectif :** vérifier que les outils sont revenus avant d'attaquer Boyd.
**Durée :** 2 à 3 heures. **Aucune calculatrice, aucun logiciel.**

Fais les dix exercices d'affilée, puis corrige. Note ton score.

> **8/10 ou plus** → tu es prêt, passe à la phase 1 du parcours.
> **Moins de 8** → reprends Strang 18.06, leçons sur les matrices symétriques et les formes quadratiques (2 jours), puis refais cette série.

---

## Énoncés

### Exercice 1 — Gradient et hessienne d'une forme quadratique

Soit
$$f(x) = \tfrac{1}{2}x^TAx - b^Tx + 3, \qquad A=\begin{pmatrix}4&1\\1&2\end{pmatrix},\quad b=\begin{pmatrix}1\\-1\end{pmatrix}$$

1. Écris $f(x_1,x_2)$ explicitement.
2. Calcule $\nabla f(x)$ sous forme matricielle.
3. Calcule $\nabla f$ au point $(1,1)$.
4. Calcule $\nabla^2 f(x)$.

---

### Exercice 2 — Semi-définie positive ou non ?

Pour chacune, dis si elle est définie positive, semi-définie positive, ou ni l'un ni l'autre. **Justifie.**

$$M_1=\begin{pmatrix}2&-1\\-1&2\end{pmatrix}\qquad M_2=\begin{pmatrix}1&3\\3&1\end{pmatrix}\qquad M_3=\begin{pmatrix}1&-1\\-1&1\end{pmatrix}$$

*Piège volontaire : ne te fie pas au signe des coefficients.*

---

### Exercice 3 — Convexité par la hessienne

$$f(x_1,x_2)=x_1^2+3x_2^2-2x_1x_2$$

$f$ est-elle convexe ? Strictement convexe ? Justifie par la hessienne.

---

### Exercice 4 — Taylor à l'ordre 2

Soit $f(x)=\ln(1+e^x)$ (c'est la fonction *softplus*, omniprésente en optimisation et en apprentissage).

1. Calcule $f(0)$, $f'(0)$, $f''(0)$.
2. Écris le développement de Taylor à l'ordre 2 en $0$.
3. $f$ est-elle convexe sur $\mathbb{R}$ ?

---

### Exercice 5 — Valeurs propres

Trouve les valeurs propres de $A=\begin{pmatrix}3&1\\1&3\end{pmatrix}$, puis déduis-en $\lambda_{\max}$, $\lambda_{\min}$, et si $A\succ 0$.

---

### Exercice 6 — Normes

Pour $x=(3,-4,0)^T$, calcule $\|x\|_1$, $\|x\|_2$, $\|x\|_\infty$.
Vérifie l'inégalité $\|x\|_\infty \leq \|x\|_2 \leq \|x\|_1$ et explique en une phrase pourquoi elle est toujours vraie.

---

### Exercice 7 — Ensembles de niveau

Soit $f(x_1,x_2)=x_1^2+4x_2^2$.

1. Décris géométriquement l'ensemble $\{x \mid f(x)\leq 4\}$.
2. Cet ensemble est-il convexe ?
3. Sans calcul : les ensembles de niveau d'une fonction convexe sont-ils toujours convexes ? Et la réciproque est-elle vraie ?

---

### Exercice 8 — Cobb-Douglas (application économique)

Soit la fonction de production $f(K,L)=K^{a}L^{b}$ avec $K,L>0$ et $a,b>0$.

1. Calcule la hessienne.
2. Montre que $\det \nabla^2 f = ab(1-a-b)\,K^{2a-2}L^{2b-2}$.
3. À quelle condition sur $a$ et $b$ la fonction est-elle concave ?
4. Quel nom porte cette condition en économie ?

---

### Exercice 9 — Convexité par composition

Vraies ou fausses ? Justifie chacune.

1. $f(x)=e^{x^2}$ est convexe sur $\mathbb{R}$.
2. $f(x)=1/x$ est convexe sur $\mathbb{R}_{++}$.
3. $f(x)=\ln x$ est convexe sur $\mathbb{R}_{++}$.
4. Si $g$ est convexe et $h$ est convexe croissante, alors $h\circ g$ est convexe.

---

### Exercice 10 — Le piège

$f(x_1,x_2)=x_1x_2$ est-elle convexe ? Concave ? Justifie.

---
---

# Corrigés

Ne les lis qu'après avoir tout tenté.

---

### Corrigé 1

**1.** On développe :
$$\tfrac12 x^TAx = \tfrac12(4x_1^2 + 2x_1x_2 + 2x_2^2) = 2x_1^2 + x_1x_2 + x_2^2$$
(le terme croisé apparaît deux fois : $a_{12}x_1x_2 + a_{21}x_2x_1 = 2x_1x_2$, puis le $\tfrac12$ le ramène à $x_1x_2$).

Et $b^Tx = x_1 - x_2$. Donc
$$\boxed{f(x_1,x_2)=2x_1^2+x_1x_2+x_2^2-x_1+x_2+3}$$

**2.** Pour $A$ **symétrique**, la formule à connaître par cœur :
$$\nabla\left(\tfrac12 x^TAx\right)=Ax, \qquad \nabla(b^Tx)=b$$
D'où $\boxed{\nabla f(x)=Ax-b}$.

*Attention : si $A$ n'était pas symétrique, on aurait $\tfrac12(A+A^T)x$.*

**3.** $\nabla f(1,1) = \begin{pmatrix}4&1\\1&2\end{pmatrix}\begin{pmatrix}1\\1\end{pmatrix}-\begin{pmatrix}1\\-1\end{pmatrix} = \begin{pmatrix}5\\3\end{pmatrix}-\begin{pmatrix}1\\-1\end{pmatrix}=\boxed{\begin{pmatrix}4\\4\end{pmatrix}}$

**4.** $\boxed{\nabla^2 f(x)=A}$, **constante**. C'est la signature des formes quadratiques : la hessienne ne dépend pas de $x$.

---

### Corrigé 2

Méthode la plus rapide en dimension 2 : calculer trace et déterminant. Pour une matrice symétrique $2\times2$, $\lambda_1\lambda_2=\det$ et $\lambda_1+\lambda_2=\text{tr}$.

**$M_1$** : $\text{tr}=4$, $\det=4-1=3$. Les deux valeurs propres ont un produit $>0$ et une somme $>0$, donc toutes deux $>0$.
Valeurs propres exactes : $1$ et $3$. → **définie positive** ($M_1\succ 0$).

**$M_2$** : $\text{tr}=2$, $\det=1-9=-8<0$. Déterminant négatif ⟹ valeurs propres de signes opposés ($4$ et $-2$).
→ **ni définie ni semi-définie positive**.
*C'est le piège : tous les coefficients sont positifs, et pourtant la matrice n'est pas SDP.*

**$M_3$** : $\text{tr}=2$, $\det=1-1=0$. Valeurs propres $0$ et $2$.
→ **semi-définie positive mais pas définie** ($M_3\succeq 0$, $M_3\not\succ 0$).
Vérification directe : $z^TM_3z=(z_1-z_2)^2\geq 0$, nul dès que $z_1=z_2$.

---

### Corrigé 3

$$\nabla^2 f=\begin{pmatrix}2&-2\\-2&6\end{pmatrix}$$

$\text{tr}=8>0$ et $\det=12-4=8>0$ ⟹ les deux valeurs propres sont strictement positives (elles valent $4\pm2\sqrt2$, soit environ $1{,}17$ et $6{,}83$).

La hessienne est **définie positive partout** (elle est constante), donc $f$ est **strictement convexe**.

*Rappel du critère : $\nabla^2f\succeq 0$ partout ⟺ $f$ convexe. $\nabla^2f\succ 0$ partout ⟹ $f$ strictement convexe (l'implication réciproque est fausse : $x^4$ est strictement convexe mais sa dérivée seconde s'annule en 0).*

---

### Corrigé 4

**1.** $f(0)=\ln 2$.

$f'(x)=\dfrac{e^x}{1+e^x}=\sigma(x)$ — c'est la fonction **logistique**. Donc $f'(0)=1/2$.

$f''(x)=\sigma(x)(1-\sigma(x))$, donc $f''(0)=\tfrac12\cdot\tfrac12=\tfrac14$.

**2.**
$$f(h)\approx \ln 2+\tfrac{h}{2}+\tfrac{h^2}{8}$$

**3.** $\sigma(x)\in(0,1)$ pour tout $x$, donc $f''(x)=\sigma(1-\sigma)>0$ partout. **$f$ est strictement convexe sur $\mathbb{R}$.**

*Remarque : cette fonction est l'approximation lisse de $\max(0,x)$. Elle revient sans arrêt en régression logistique et en optimisation.*

---

### Corrigé 5

$\det(A-\lambda I)=(3-\lambda)^2-1=0 \Rightarrow 3-\lambda=\pm1 \Rightarrow \lambda\in\{2,4\}$.

$\lambda_{\max}=4$, $\lambda_{\min}=2$. Toutes deux $>0$ donc $\boxed{A\succ 0}$.

*Astuce à retenir : pour $\begin{pmatrix}a&c\\c&a\end{pmatrix}$, les valeurs propres sont toujours $a\pm c$, de vecteurs propres $(1,1)$ et $(1,-1)$.*

---

### Corrigé 6

$\|x\|_1=3+4+0=7$
$\|x\|_2=\sqrt{9+16+0}=5$
$\|x\|_\infty=\max(3,4,0)=4$

Vérification : $4\leq 5\leq 7$. ✓

**Pourquoi toujours vrai :**
- $\|x\|_\infty\leq\|x\|_2$ : le carré du plus grand terme est inférieur à la somme de tous les carrés.
- $\|x\|_2\leq\|x\|_1$ : en élevant au carré, $\sum x_i^2 \leq \left(\sum|x_i|\right)^2$ car le membre de droite contient en plus tous les doubles produits, qui sont $\geq 0$.

---

### Corrigé 7

**1.** $x_1^2+4x_2^2\leq 4$ se réécrit $\dfrac{x_1^2}{4}+\dfrac{x_2^2}{1}\leq 1$ : c'est le **disque elliptique plein** de demi-axes $2$ (horizontal) et $1$ (vertical).

**2.** Oui, convexe.

**3.** **Les ensembles de niveau (sous-niveau) d'une fonction convexe sont toujours convexes.** Preuve en une ligne : si $f(x)\leq\alpha$ et $f(y)\leq\alpha$, alors pour $\theta\in[0,1]$,
$$f(\theta x+(1-\theta)y)\leq\theta f(x)+(1-\theta)f(y)\leq\theta\alpha+(1-\theta)\alpha=\alpha$$

**La réciproque est fausse.** Une fonction dont tous les sous-niveaux sont convexes s'appelle **quasi-convexe**, et ce n'est pas la même chose. Contre-exemple : $f(x)=\sqrt{|x|}$ a des sous-niveaux qui sont des intervalles (donc convexes), mais $f$ n'est pas convexe.

*C'est une distinction importante en économie : les préférences convexes correspondent à une utilité **quasi-concave**, pas nécessairement concave.*

---

### Corrigé 8

**1.** Avec $f=K^aL^b$ :
$$f_K=aK^{a-1}L^b,\quad f_{KK}=a(a-1)K^{a-2}L^b$$
$$f_{LL}=b(b-1)K^aL^{b-2},\quad f_{KL}=abK^{a-1}L^{b-1}$$

**2.**
$$\det\nabla^2 f=f_{KK}f_{LL}-f_{KL}^2 = ab(a-1)(b-1)K^{2a-2}L^{2b-2}-a^2b^2K^{2a-2}L^{2b-2}$$
$$=K^{2a-2}L^{2b-2}\cdot ab\left[(a-1)(b-1)-ab\right]$$
Or $(a-1)(b-1)-ab = ab-a-b+1-ab = 1-a-b$. D'où
$$\boxed{\det\nabla^2 f=ab(1-a-b)K^{2a-2}L^{2b-2}}$$

**3.** Concavité ⟺ $\nabla^2f\preceq 0$ ⟺ $f_{KK}\leq0$ **et** $\det\nabla^2f\geq0$.
- $f_{KK}=a(a-1)K^{a-2}L^b\leq 0 \iff a\leq 1$
- $\det\geq0 \iff 1-a-b\geq0 \iff a+b\leq 1$ (puisque $a,b>0$)

La seconde condition implique la première. Donc :
$$\boxed{f \text{ concave} \iff a+b\leq 1}$$

**4.** C'est la condition de **rendements d'échelle non croissants** ($a+b<1$ : décroissants ; $a+b=1$ : constants).

*Ce résultat est le pont exact entre ton cours de micro et le chapitre 3 de Boyd : « rendements décroissants » et « hessienne semi-définie négative » sont le même énoncé.*

---

### Corrigé 9

**1. VRAI.** $g(x)=x^2$ est convexe, $h(u)=e^u$ est convexe **et croissante**. La règle de composition donne $h\circ g$ convexe.
*Vérification directe : $f''(x)=(4x^2+2)e^{x^2}>0$.*

**2. VRAI.** $f''(x)=2/x^3>0$ pour $x>0$.
*Attention : c'est faux sur $\mathbb{R}_{--}$, où $1/x$ est concave. Le domaine fait partie de l'énoncé.*

**3. FAUX.** $f''(x)=-1/x^2<0$ : $\ln$ est **concave**. C'est d'ailleurs pour cela qu'elle sert d'utilité type en économie.

**4. VRAI.** C'est la règle de composition scalaire. **La croissance de $h$ est indispensable.** Contre-exemple si on l'enlève : $g(x)=x^2$ convexe, $h(u)=-u$ convexe (linéaire) mais décroissante ; $h(g(x))=-x^2$ est concave.

---

### Corrigé 10

$$\nabla^2 f=\begin{pmatrix}0&1\\1&0\end{pmatrix}$$

$\det=-1<0$, donc valeurs propres de signes opposés : $+1$ et $-1$.

La hessienne est **indéfinie** ⟹ $f$ n'est **ni convexe ni concave**.

Vérification concrète : le long de la direction $(1,1)$, $f(t,t)=t^2$ est convexe ; le long de $(1,-1)$, $f(t,-t)=-t^2$ est concave. La surface est une **selle de cheval**.

*Remarque économique importante : $f(x_1,x_2)=x_1x_2$ est pourtant une fonction d'utilité Cobb-Douglas parfaitement classique. Elle n'est pas concave, mais elle est **quasi-concave** sur $\mathbb{R}^2_{++}$ — ses courbes d'indifférence délimitent des ensembles convexes. C'est exactement la distinction du corrigé 7. En microéconomie, on n'a besoin que de la quasi-concavité, pas de la concavité.*

---

## Barème et suite

| Score | Diagnostic | Suite |
|---|---|---|
| **9–10** | Les outils sont en place | Phase 1 du parcours, et tu peux même accélérer sur Dossal |
| **7–8** | Solide, quelques rouilles | Phase 1 normalement |
| **5–6** | Il manque des morceaux | Strang 18.06 (matrices symétriques, formes quadratiques), 2–3 jours, puis refais la série |
| **< 5** | Reprends les bases | Strang 18.06 en entier + MIT 18.02 sur gradient/hessienne, 2 semaines |

**Les exercices qui comptent le plus sont les n° 2, 3 et 8.** Si tu les as réussis, la mécanique « hessienne → convexité » est acquise, et c'est elle qui te servira tous les jours dans Boyd.
