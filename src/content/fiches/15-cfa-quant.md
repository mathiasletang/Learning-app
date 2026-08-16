# Fiche 15 — Méthodes quantitatives : rendements, probabilités, tests

| | |
|---|---|
| **Matière** | CFA · Level 1 |
| **Source** | Schweser, *QuickSheet 2024*, p. 1–2 |
| **Difficulté** | 🟡 Intermédiaire |
| **Temps d'étude estimé** | 2 h |
| **Prérequis** | Statistiques L2 (fiches MIT 18.600/18.650 du parcours en renfort) |
| **Concepts clés** | HPR, moyennes, dispersion, Bayes, portefeuille à 2 actifs, loi normale, TCL, erreurs de type I/II, régression |
| **Place dans la source** | Le topic le plus dense en formules du QuickSheet : deux colonnes pleines, toutes exigibles en calcul direct. |

## 🎯 Vue d'ensemble

Quatre blocs à maîtriser en calcul rapide : **mesurer un rendement** (HPR et ses annualisations), **résumer une distribution** (moyennes, variance, CV), **combiner des actifs** (espérance, variance de portefeuille, corrélation), et **inférer** (loi normale, TCL, tests d'hypothèses, régression simple).

```
Rendement → HPR → annualisé / continu / géométrique
Distribution → moyenne, variance, CV, downside deviation
Portefeuille → E(Rp), var(Rp), corrélation, Roy SFR
Inférence → normale (z) → TCL → erreur standard → tests → régression
```

## 🔴 Concept 1 — Mesures de rendement

**Holding Period Return** (p. 1) :
$$R_t = \frac{P_t - P_{t-1} + D_t}{P_{t-1}} \quad\text{ou}\quad \frac{P_t + D_t}{P_{t-1}} - 1$$

- **Rendement annualisé** : $(1+\text{HPR})^{365/\text{jours}} - 1$.
- **Rendement continu** : $R_{cc} = \ln(1+\text{HPR})$.
- **Moyenne géométrique** (rendements multi-périodes, croissance composée) :
$$\bar{R}_G = \left[(1+R_1)\times\cdots\times(1+R_N)\right]^{1/N} - 1$$
- **Moyenne harmonique** : $N \big/ \sum_{i=1}^{N} (1/X_i)$.
- **Trimmed mean (x %)** : on *exclut* les x/2 % extrêmes de chaque côté ; **winsorized mean** : on les *remplace* par les valeurs seuils.

## 🔴 Concept 2 — Dispersion et rapport au risque

- **Variance d'échantillon** : $s^2 = \dfrac{\sum_{i=1}^{n}(x_i-\bar{x})^2}{n-1}$ ; écart-type = racine carrée.
- **Target downside deviation** — seules comptent les observations *sous* la cible :
$$s_{\text{target}} = \sqrt{\frac{\sum_{X_i < \text{target}} (X_i - \text{target})^2}{n-1}}$$
- **Coefficient de variation** : $CV = s/\bar{X}$ — dispersion *relative*, comparable d'une série à l'autre.
- **Roy's Safety-First Ratio** : $\dfrac{\bar{r}_p - r_{\text{target}}}{\sigma_p}$ — même construction que Sharpe, avec la cible à la place du taux sans risque.

## 🟠 Concept 3 — Probabilités et portefeuille à deux actifs

- **Bayes** : $P(A\mid B) = \dfrac{P(B\mid A)}{P(B)}\times P(A)$.
- **Espérance** : $E(X) = \sum P(x_i)\,x_i$ ; **variance probabiliste** : $\sigma^2(X) = \sum P(x_i)\left[x_i - E(X)\right]^2$.
- **Corrélation** : $\text{corr}(R_i,R_j) = \dfrac{\text{cov}(R_i,R_j)}{\sigma(R_i)\,\sigma(R_j)}$.
- **Portefeuille à deux actifs** (p. 1) :
$$E(R_p) = w_A E(R_A) + w_B E(R_B)$$
$$\text{var}(R_p) = w_A^2\sigma^2(R_A) + w_B^2\sigma^2(R_B) + 2\,w_A w_B\,\sigma(R_A)\,\sigma(R_B)\,\rho(R_A,R_B)$$

### Exercices calculés — rendements et moyennes

**🟢 Niveau 1** — Une action achetée 40, revendue 43 après un dividende de 1. HPR ? Annualisé si la détention a duré 73 jours ?
<details><summary>Correction</summary>

$HPR = \dfrac{43 - 40 + 1}{40} = 10\,\%$. Annualisé : $(1{,}10)^{365/73} - 1 = (1{,}10)^5 - 1 \approx 61{,}1\,\%$. **Interprétation** : annualiser un rendement de 73 jours suppose de le composer cinq fois — d'où l'écart spectaculaire avec $10 \times 5 = 50\,\%$.
</details>

**🟡 Niveau 2** — Rendements annuels : $+50\,\%$ puis $-50\,\%$. Moyenne arithmétique, moyenne géométrique, et laquelle décrit la réalité de l'investisseur ?
<details><summary>Correction</summary>

Arithmétique : $0\,\%$. Géométrique : $\sqrt{1{,}5 \times 0{,}5} - 1 = \sqrt{0{,}75} - 1 \approx -13{,}4\,\%$ par an. Un capital de 100 finit à $100 \times 1{,}5 \times 0{,}5 = 75$ : c'est la **géométrique** qui décrit le rendement composé réellement subi — l'arithmétique surestime toujours (sauf volatilité nulle).
</details>

**🟠 Niveau 3 — piège** — Un portefeuille cible 6 % ; rendements observés : 4 %, 8 %, 5 %, 10 %, 3 % ($n = 5$). Calculez la target downside deviation.
<details><summary>Correction</summary>

*Erreur classique* : inclure les cinq écarts. *Correct* : seules les observations **sous la cible** entrent — 4, 5 et 3 : écarts $-2, -1, -3$. $s_{target} = \sqrt{\dfrac{4 + 1 + 9}{5-1}} = \sqrt{3{,}5} \approx 1{,}87\,\%$. Le dénominateur reste $n - 1 = 4$ (pas le nombre d'observations sous la cible) — deuxième piège du même calcul.
</details>

## 🟠 Concept 4 — Normale, TCL, erreur standard

**Loi normale** : entièrement décrite par moyenne et variance. Intervalles à mémoriser (p. 1) :

| Couverture | Intervalle |
|---|---|
| 68 % | ± 1,00 σ |
| 90 % | ± 1,65 σ |
| 95 % | ± 1,96 σ |
| 99 % | ± 2,58 σ |

- **Z-score** : $z = \dfrac{x-\mu}{\sigma}$ — nombre d'écarts-types à la moyenne.
- **Théorème central limite** : pour $n$ grand, la distribution de la moyenne d'échantillon tend vers une normale de moyenne $\mu$ et de variance $\sigma^2/n$.
- **Erreur standard de la moyenne** : $\sigma_{\bar{x}} = \sigma/\sqrt{n}$ (variance de population connue), $s_{\bar{x}} = s/\sqrt{n}$ (inconnue).
- **Rééchantillonnage** : *jackknife* (moyennes en retirant une observation à la fois) ; *bootstrap* (tirages répétés de taille $n$ **avec remise**).

### Exercices calculés — probabilités et inférence

**🟡 Bayes en situation** — 2 % des fonds sont « stars ». Un signal de sélection détecte 80 % des stars, mais s'allume aussi pour 10 % des fonds ordinaires. Un fonds déclenche le signal : probabilité que ce soit une star ?
<details><summary>Correction</summary>

$P(\text{signal}) = 0{,}02(0{,}8) + 0{,}98(0{,}1) = 0{,}114$. Bayes : $P(\text{star}\mid\text{signal}) = \dfrac{0{,}8}{0{,}114} \times 0{,}02 \approx 14\,\%$. **Interprétation** : même un bon signal reste noyé quand la base est rare — l'erreur d'ignorer le taux de base est exactement ce que Bayes corrige.
</details>

**🟡 Intervalle avec le TCL** — Population $\mu$ inconnue, $\sigma = 12$. Échantillon $n = 36$, $\bar x = 50$. Intervalle à 95 % pour $\mu$ ?
<details><summary>Correction</summary>

Erreur standard : $\sigma_{\bar x} = 12/\sqrt{36} = 2$. Intervalle : $50 \pm 1{,}96 \times 2 = [46{,}1;\ 53{,}9]$. Avec $n = 144$, l'erreur standard tomberait à 1 : quadrupler $n$ divise l'incertitude par 2 — la racine carrée est la leçon du TCL.
</details>

## 🟡 Concept 5 — Tests d'hypothèses

- $H_0$ contient **toujours le signe d'égalité** (=, ≤, ≥) ; $H_a$ est la conclusion si l'on rejette $H_0$.
- **Erreur de type I** : rejeter $H_0$ alors qu'elle est vraie. **Type II** : ne pas rejeter $H_0$ alors qu'elle est fausse.

Statistiques et degrés de liberté (p. 1) :

| Test de | Statistique | d.l. |
|---|---|---|
| Moyenne | t ou z | n − 1 |
| Différence de moyennes | t | n − 1 |
| Moyennes appariées | t | n − 1 |
| Variance | χ² | n − 1 |
| Égalité de variances | F | n₁ − 1, n₂ − 1 |
| Corrélation | t | n − 2 |
| Indépendance | χ² | (r − 1)(c − 1) |
| Pente (significativité) | F | 1, n − 2 |
| Pente (valeur) | t | n − 2 |

## 🟡 Concept 6 — Régression linéaire simple

$$Y_i = b_0 + b_1 X_i + \varepsilon_i$$

Estimateurs : $\hat{b}_1 = \dfrac{\text{Cov}_{XY}}{\sigma_X^2}$, puis $\hat{b}_0 = \bar{Y} - \hat{b}_1\bar{X}$.

**ANOVA** : SST (écarts au $\bar{Y}$, total) = SSR (expliqué par la droite) + SSE (résidus). Et :
$$R^2 = \frac{SSR}{SST} = \text{part de variation de } Y \text{ expliquée par } X.$$

### Comment aborder un calcul de portefeuille à deux actifs ?

1. Écrire les poids ($w_A + w_B = 1$), espérances et écarts-types.
2. $E(R_p)$ : moyenne pondérée, sans piège.
3. $\text{var}(R_p)$ : les deux termes carrés, **plus le terme croisé** $2 w_A w_B \sigma_A \sigma_B \rho$ — c'est lui qui porte la diversification ($\rho < 1$ le réduit).
4. Ne pas oublier la racine si la question demande l'écart-type.

## ⚠️ Common mistakes

1. **Confondre trimmed et winsorized** — exclure n'est pas remplacer.
2. **Oublier le terme croisé** dans la variance de portefeuille, ou y mettre $\rho$ sans les deux écarts-types.
3. **Diviser par $n$** dans la variance d'échantillon — c'est $n-1$.
4. **Inverser les erreurs de type I et II** — type I = rejet à tort (faux positif).
5. **Mettre le signe d'égalité dans $H_a$** — il appartient à $H_0$.
6. **Downside deviation calculée sur toutes les observations** — seules celles sous la cible entrent dans la somme.
7. **Utiliser 1,96 pour 90 %** — 90 % ↔ 1,65 ; 95 % ↔ 1,96 ; 99 % ↔ 2,58.

## 📌 Ultimate Review

1. HPR = (P_t − P_{t−1} + D_t)/P_{t−1} ; annualisé = (1+HPR)^{365/j} − 1 ; continu = ln(1+HPR).
2. Géométrique pour le multi-période ; harmonique = N/Σ(1/X).
3. s² sur n−1 ; CV = s/X̄ ; Roy = (r̄_p − cible)/σ_p.
4. E(Rp) pondérée ; var(Rp) = w²σ² + w²σ² + 2wwσσρ.
5. Normale : 68/90/95/99 ↔ 1/1,65/1,96/2,58 ; z = (x−μ)/σ ; TCL → σ²/n ; erreur standard σ/√n.
6. Type I = rejet à tort ; χ² pour variance et indépendance ; F pour égalité de variances et significativité de la pente.
7. b̂₁ = Cov/σ²_X ; R² = SSR/SST.

## 🧠 Active Recall

**Basic** — Quelle moyenne pour un taux de croissance composé sur plusieurs périodes ?
<details><summary>Réponse</summary>

La moyenne géométrique : $[(1+R_1)\cdots(1+R_N)]^{1/N} - 1$.
</details>

**Understanding** — Pourquoi le CV permet-il de comparer deux séries que l'écart-type seul ne compare pas ?
<details><summary>Réponse</summary>

Il rapporte la dispersion à la moyenne ($s/\bar X$) : la dispersion devient *relative*, donc comparable entre séries d'échelles différentes.
</details>

**Application** — $w_A = 0{,}6$, $w_B = 0{,}4$, $\sigma_A = 10\,\%$, $\sigma_B = 20\,\%$, $\rho = 0{,}5$. Variance du portefeuille ?
<details><summary>Réponse</summary>

$0{,}36(0{,}01) + 0{,}16(0{,}04) + 2(0{,}6)(0{,}4)(0{,}10)(0{,}20)(0{,}5) = 0{,}0036 + 0{,}0064 + 0{,}0048 = 0{,}0148$, soit $\sigma_p \approx 12{,}2\,\%$.
</details>

**Exam-style** — On teste l'égalité des variances de deux échantillons ($n_1 = 25$, $n_2 = 30$). Quelle statistique et quels degrés de liberté ?
<details><summary>Réponse</summary>

Statistique F, avec $n_1 - 1 = 24$ et $n_2 - 1 = 29$ degrés de liberté.
</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Annualiser un HPR de d jours ? | $(1+\text{HPR})^{365/d} - 1$ |
| Rendement continu ? | $\ln(1+\text{HPR})$ |
| Moyenne harmonique ? | $N/\sum(1/X_i)$ |
| Terme croisé de var(Rp) ? | $2 w_A w_B \sigma_A \sigma_B \rho$ |
| Bayes ? | $P(A\mid B) = \frac{P(B\mid A)}{P(B)} P(A)$ |
| 95 % d'une normale ? | ± 1,96 σ (90 % : 1,65 ; 99 % : 2,58) |
| Erreur standard, σ inconnu ? | $s/\sqrt{n}$ |
| Bootstrap vs jackknife ? | Avec remise, taille n / retrait d'une observation à la fois |
| Erreur de type I ? | Rejeter $H_0$ vraie |
| $R^2$ en régression simple ? | SSR/SST |
