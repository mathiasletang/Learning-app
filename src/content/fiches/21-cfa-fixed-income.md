# Fiche 21 — Fixed Income : pricing, rendements, duration, crédit

| | |
|---|---|
| **Matière** | CFA · Level 1 |
| **Source** | Schweser, *QuickSheet 2024*, p. 5–6 |
| **Difficulté** | 🔴 Avancé |
| **Temps d'étude estimé** | 2 h |
| **Prérequis** | Actualisation (fiche 15) |
| **Concepts clés** | Full/flat price, YTM et mesures de rendement, spreads, taux forward, duration (Macaulay, modifiée, effective), convexité, risque de crédit, titrisation |
| **Place dans la source** | Deuxième topic le plus long du QuickSheet, du vocabulaire obligataire jusqu'aux ABS. |

## 🎯 Vue d'ensemble

Cinq strates : **décrire** un titre (caractéristiques, structures de flux, options incorporées), **le placer** sur un marché (émission, repos), **le pricer** (full/flat, accrued, matrix pricing), **mesurer** rendement et risque de taux (YTM et variantes, spreads, forwards, duration/convexité), **juger** le crédit (les C de l'analyse, notations, titrisation).

```
Titre : émetteur, maturité, pair, coupon, séniorité, contingences
Flux : bullet / amortissable / sinking fund / floating
Prix : full = PV × (1+YTM/m)^(t/T) → flat = full − accrued
Risque de taux : réinvestissement vs prix → Macaulay → modifiée → convexité
Crédit : 5 C bottom-up → expected loss = PD × LGD → IG vs HY → ABS
```

## 🟡 Concept 1 — Décrire une obligation

**Caractéristiques** (p. 5) : émetteur (souverains, corporates, collectivités, agences, supranationaux, véhicules dédiés) ; maturité (money market ≤ 1 an, capital market > 1 an) ; valeur au pair ; coupon (fixe ou flottant — diviser par la **périodicité** pour le taux périodique) ; séniorité (senior > junior/subordonné) ; contingences (callable, putable, convertible).

**Structures de flux** : *bullet* (principal au terme) ; *fully amortizing* (paiements égaux, intérêt + principal) ; *partially amortizing* (+ balloon final) ; *sinking fund* (calendrier de remboursement anticipé) ; *floating-rate* (référence + marge).

**Options incorporées** (p. 5) :

| Option | Détenteur du droit | Effet (source) |
|---|---|---|
| Callable | Émetteur (rembourse tôt) | Rendement ↑, duration ↓ |
| Putable | Porteur (revend à l'émetteur) | Rendement ↓, duration ↓ |
| Convertible | Porteur (échange en actions) | — |
| Warrants | Porteur (achète l'action au prix d'exercice) | Généralement détachables |

**Marchés** : domestic / foreign (émetteur étranger, monnaie locale) / eurobond (hors de tout pays, monnaie tierce) / global (les deux). **Émission** : underwritten (les banques achètent tout) ; best efforts (courtage) ; shelf registration (enregistrer, vendre au fil du temps). **Repo** : emprunt court garanti par un titre ; repo rate = écart annualisé vente/rachat ; haircut = 1 − 1/marge initiale.

## 🔴 Concept 2 — Pricing et mesures de rendement

**Full price** (p. 6) :
$$\text{full} = PV_{\text{dernier coupon}} \times \left(1 + \frac{YTM}{m}\right)^{t/T}$$
avec $t$ = jours depuis le dernier coupon, $T$ = jours de la période. **Accrued interest** = coupon × t/T. **Flat = full − accrued** — les obligations cotent en flat.

**Matrix pricing** : pour un titre illiquide, estimer le rendement à partir de titres de même qualité, interpolation linéaire sur la maturité.

**Rendements** : effective yield (dépend de la périodicité ; YTM = effective pour l'annuel) ; base semestrielle : YTM = 2 × taux semestriel ; current yield = coupon annuel / prix ; simple yield = current ± amortissement ; yield to call ; **yield to worst** = le plus bas des YTC et du YTM. Money market : base *discount* ou *add-on*, 360 ou 365 jours ; **bond-equivalent yield** = add-on annualisé sur 365 jours.

**Prix, coupon, rendement** : relation inverse prix/rendement ; coupon < rendement ⟹ décote, coupon > rendement ⟹ prime ; le prix converge vers le pair (*constant-yield trajectory*) ; **coupon plus bas et maturité plus longue ⟹ sensibilité plus grande**.

**Spreads** : G (vs État), I (vs swap), Z (toute la courbe), **OAS** (Z-spread corrigé des options incorporées).
**FRN** : quoted margin (contractuelle) vs required/discount margin (celle qui ramène au pair) — qualité en baisse ⟹ required > quoted.
**Forwards** : « 1y3y » = taux 3 ans dans 1 an ; exemple de la source : $(1+S_2)^2 = (1+S_1)(1+1y1y)$.

## 🔴 Concept 3 — Duration et convexité

**Risque de taux, deux composantes opposées** (p. 5) : risque de **réinvestissement** (horizon long) vs risque de **prix** (horizon court). L'horizon qui les équilibre exactement est la **duration de Macaulay** — moyenne pondérée des dates de flux.

**Duration modifiée** — variation approchée du prix pour 1 % de YTM :
$$D_{\text{mod}} = \frac{D_{\text{Mac}}}{1+r} \approx \frac{V_- - V_+}{2 V_0\,\Delta y}$$

**Correction de convexité** :
$$\%\Delta \text{prix} = -D\,\Delta y + \tfrac12\,C\,(\Delta y)^2,\qquad C \approx \frac{V_- + V_+ - 2V_0}{(\Delta YTM)^2\,V_0}$$

**Duration effective** — obligatoire dès qu'il y a option incorporée :
$$D_{\text{eff}} = \frac{V_- - V_+}{2 V_0\,\Delta\text{courbe}}$$

## 🟠 Concept 4 — Crédit et titrisation

**Analyse bottom-up, les 5 C** : capacity, capital, collateral, covenants, character. **Top-down** : conditions, country, currency.

$$\text{Expected loss} = \text{probabilité de défaut} \times \text{loss given default}$$

**Notations** : investment grade ≥ Baa3/BBB− ; non-investment grade ≤ Ba1/BB+ ; CFR (émetteur) vs CCR (titre). Secured (collatéral dédié, senior) vs unsecured (créance générale).

**Titrisation** (p. 5–6) : RMBS (agency = prêts conformes ; nonagency ⟹ rehaussement de crédit) ; rehaussement interne : excess spread, surdimensionnement, structure en cascade. Risque de **prépaiement** : *contraction* (remboursements plus rapides) et *extension* (plus lents). CMO (adossés à des pass-throughs ; sequential-pay ou PAC/support) ; CMBS (non-recourse) ; ABS cartes de crédit ; CDO (avec gestionnaire de collatéral).

### Comment estimer la variation de prix d'une obligation ?

1. Calculer ou lire $D$ (modifiée — ou **effective** si le titre a une option).
2. Premier ordre : $-D \times \Delta y$.
3. Ajouter $\tfrac12 C (\Delta y)^2$ — la convexité **améliore** l'estimation, dans les deux sens de variation.
4. Contrôle de cohérence : hausse de taux ⟹ baisse de prix, et l'approximation linéaire surestime la baisse (la convexité la tempère).

## ⚠️ Common mistakes

1. **Coter en full price** — les obligations cotent en **flat** ; le full sert au règlement.
2. **Confondre les deux risques de taux** — horizon court : risque de prix ; horizon long : réinvestissement ; ils s'annulent à l'horizon = duration de Macaulay.
3. **Duration modifiée sur un callable** — option incorporée ⟹ duration **effective**.
4. **Oublier le ½ dans le terme de convexité.**
5. **Yield to worst = YTM** — c'est le **minimum** de tous les YTC et du YTM.
6. **Inverser contraction et extension** — prépaiements rapides = contraction ; lents = extension.
7. **Croire qu'un gros coupon rend le titre plus sensible** — c'est le coupon **bas** (et la maturité longue) qui accroît la sensibilité.

## 📌 Ultimate Review

1. Money market ≤ 1 an ; coupon / périodicité = taux périodique ; callable (émetteur), putable (porteur).
2. Full = PV × (1+YTM/m)^{t/T} ; accrued = coupon × t/T ; flat = full − accrued.
3. YTM semestriel ×2 ; current = coupon/prix ; YTW = min(YTC, YTM) ; BEY = add-on 365 j.
4. Spreads : G, I, Z, OAS ; FRN : required > quoted si la qualité baisse.
5. (1+S₂)² = (1+S₁)(1+1y1y).
6. D_Mac (équilibre des risques) → D_mod = D_Mac/(1+r) ≈ (V₋−V₊)/(2V₀Δy) → %Δprix = −DΔy + ½C(Δy)².
7. 5 C ; EL = PD × LGD ; IG ≥ BBB− ; rehaussement interne : excess spread, overcollateralization, waterfall.

## 🧠 Active Recall

**Basic** — Full price, accrued interest, flat price : définitions et relation.
<details><summary>Réponse</summary>

Full = PV au dernier coupon × (1+YTM/m)^{t/T} ; accrued = coupon × (jours courus / jours de la période) ; flat = full − accrued. La cote de marché est la flat.
</details>

**Understanding** — Pourquoi la duration de Macaulay est-elle « l'horizon d'immunisation » ?
<details><summary>Réponse</summary>

Une hausse de taux fait baisser le prix mais améliore le réinvestissement des coupons. À l'horizon égal à la duration de Macaulay, les deux effets se compensent exactement.
</details>

**Application** — $V_- = 102$, $V_+ = 98{,}2$, $V_0 = 100$, $\Delta y = 1\,\%$. Duration approchée ? Variation estimée pour +50 pb ?
<details><summary>Réponse</summary>

$D \approx (102 - 98{,}2)/(2 \times 100 \times 0{,}01) = 1{,}9$. Pour $\Delta y = +0{,}5\,\%$ : $\approx -1{,}9 \times 0{,}5\,\% = -0{,}95\,\%$ (avant convexité).
</details>

**Exam-style** — Un RMBS non-agency et un agency : lequel exige un rehaussement de crédit et citez deux formes internes.
<details><summary>Réponse</summary>

Le non-agency (prêts non conformes). Rehaussements internes : excess spread, surdimensionnement (ou structure en cascade).
</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Callable : effet sur rendement et duration ? | Rendement ↑, duration ↓ |
| Haircut d'un repo ? | 1 − 1/marge initiale |
| Flat price ? | Full − accrued (c'est la cote) |
| Yield to worst ? | Min des YTC et du YTM |
| OAS ? | Z-spread corrigé des options incorporées |
| D_mod vs D_Mac ? | D_mod = D_Mac/(1+r) |
| %Δprix avec convexité ? | −DΔy + ½C(Δy)² |
| Quand la duration effective ? | Dès qu'il y a option incorporée |
| Expected loss ? | PD × LGD |
| Limite investment grade ? | Baa3/BBB− |
| Contraction vs extension ? | Prépaiements rapides / lents |
