# Fiche 18 — Corporate Issuers : gouvernance, investissement, WACC

| | |
|---|---|
| **Matière** | CFA · Level 1 |
| **Source** | Schweser, *QuickSheet 2024*, p. 3 |
| **Difficulté** | 🟡 Intermédiaire |
| **Temps d'étude estimé** | 1 h |
| **Prérequis** | Actualisation (fiche 15), compte de résultat (fiche 17) |
| **Concepts clés** | Gouvernance, capital allocation, NPV/IRR, ROIC, options réelles, WACC, théories de structure du capital |
| **Place dans la source** | Topic compact : deux formules d'évaluation (NPV, WACC) entourées de classifications. |

## 🎯 Vue d'ensemble

Le topic relie la **gouvernance** (qui décide), la **décision d'investissement** (NPV, IRR, ROIC, options réelles) et le **financement** (WACC, théories de la structure du capital). Le fil : une entreprise alloue du capital à des projets qui créent de la valeur si leur rendement dépasse le coût du capital.

```
Gouvernance : parties prenantes → comités du conseil
Investir : types de projets → étapes → NPV / IRR / ROIC → options réelles
Financer : WACC → MM sans impôt → MM avec impôt → tradeoff → pecking order
```

## 🟡 Concept 1 — Gouvernance et projets

**Parties prenantes** (p. 3) : actionnaires, conseil d'administration, dirigeants, salariés, créanciers, fournisseurs.
**Comités clés du conseil** : audit ; nomination/gouvernance ; rémunération.

**Types de projets d'investissement** : *going concern* (maintenir, réduire les coûts) ; *regulatory/compliance* (sécurité, environnement) ; *expansion* (croître) ; *other* (hors du métier existant).

**Étapes administratives de l'allocation du capital** : générer les idées → analyser les propositions → construire le budget d'investissement de la firme → suivre les décisions et post-auditer.

## 🔴 Concept 2 — NPV, IRR, ROIC

$$NPV = CF_0 + \frac{CF_1}{(1+k)^1} + \frac{CF_2}{(1+k)^2} + \cdots + \frac{CF_n}{(1+k)^n}$$

**IRR** : le taux d'actualisation qui annule la NPV.

$$ROIC = \frac{\text{net operating profit after tax}}{\text{valeur comptable moyenne du capital total}}$$

**Options réelles** (p. 3) : *timing* (retarder) ; *abandonment* (sortir) ; *expansion* (investissement de suite) ; *flexibility* (changer prix ou intrants) ; *fundamental* (payoff dépendant du prix d'un sous-jacent).

## 🔴 Concept 3 — WACC et structure du capital

$$WACC = w_d\,\big[k_d(1-t)\big] + w_{ps}\,k_{ps} + w_{ce}\,k_s$$

Seule la dette porte l'ajustement fiscal $(1-t)$ : ses intérêts sont déductibles.

**Théories** (p. 3) :

| Théorie | Conclusion |
|---|---|
| MM sans impôts | La structure du capital est **sans effet** sur la valeur |
| MM avec impôts, sans coûts de détresse | 100 % de dette maximise la valeur |
| Static tradeoff | La valeur monte avec la dette, puis baisse quand les coûts de détresse dépassent l'avantage fiscal |
| Pecking order | Préférence : financement interne, puis dette, puis actions externes |

### Comment décider avec NPV et IRR ?

1. Poser tous les flux, y compris $CF_0$ (négatif).
2. Actualiser au coût du capital $k$ (le WACC si le projet est au risque moyen de la firme).
3. NPV > 0 ⟹ le projet crée de la valeur ; l'IRR est le $k$ qui rend la NPV nulle.
4. Contrôler la cohérence : si $k <$ IRR, la NPV doit être positive.

## ⚠️ Common mistakes

1. **Appliquer (1 − t) aux actions préférentielles ou ordinaires** dans le WACC — seuls les intérêts de la dette sont déductibles.
2. **Confondre MM sans et avec impôts** — l'irrélevance ne vaut que sans impôts ; avec impôts (sans détresse), c'est 100 % dette.
3. **Oublier le post-audit** dans les étapes d'allocation du capital.
4. **ROIC sur la valeur de marché** — la source le définit sur la valeur **comptable** moyenne du capital.
5. **Classer un investissement de mise aux normes en « expansion »** — c'est regulatory/compliance.

## 📌 Ultimate Review

1. Comités clés : audit, nomination/gouvernance, rémunération.
2. Projets : going concern, regulatory, expansion, other ; étapes : idées → analyse → budget → post-audit.
3. NPV = Σ CF_t/(1+k)^t (avec CF₀) ; IRR annule la NPV ; ROIC = NOPAT/capital comptable moyen.
4. Options réelles : timing, abandonment, expansion, flexibility, fundamental.
5. WACC = w_d k_d(1−t) + w_ps k_ps + w_ce k_s.
6. MM sans impôt (neutre) → MM avec impôt (100 % dette) → tradeoff (optimum intérieur) → pecking order (interne > dette > equity).

## 🧠 Active Recall

**Basic** — Écrivez le WACC et précisez où intervient l'impôt.
<details><summary>Réponse</summary>

$WACC = w_d k_d(1-t) + w_{ps}k_{ps} + w_{ce}k_s$ — l'impôt ne réduit que le coût de la dette.
</details>

**Understanding** — Que change l'introduction des coûts de détresse financière chez MM ?
<details><summary>Réponse</summary>

Sans eux (mais avec impôts), l'avantage fiscal pousse à 100 % de dette. Avec eux, un optimum intérieur apparaît : c'est la théorie du static tradeoff.
</details>

**Application** — CF₀ = −100, CF₁ = 60, CF₂ = 60, k = 10 %. NPV ?
<details><summary>Réponse</summary>

$-100 + 60/1{,}1 + 60/1{,}21 \approx -100 + 54{,}55 + 49{,}59 = 4{,}14 > 0$ : projet créateur de valeur (et IRR > 10 %).
</details>

**Exam-style** — Une firme préfère autofinancer, puis émettre de la dette, et n'émet d'actions qu'en dernier recours. Quelle théorie décrit ce comportement ?
<details><summary>Réponse</summary>

Le pecking order : interne, puis dette, puis actions externes.
</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Trois comités clés du conseil ? | Audit, nomination/gouvernance, rémunération |
| IRR ? | Taux qui annule la NPV |
| ROIC ? | NOPAT / capital total comptable moyen |
| Option réelle « timing » ? | Retarder l'investissement |
| WACC ? | w_d k_d(1−t) + w_ps k_ps + w_ce k_s |
| MM avec impôts, sans détresse ? | 100 % dette maximise la valeur |
| Static tradeoff ? | Avantage fiscal vs coûts de détresse : optimum intérieur |
| Pecking order ? | Interne > dette > actions externes |
