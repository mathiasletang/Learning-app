# Fiche 17 — Analyse des états financiers : cadre, ratios, DuPont

| | |
|---|---|
| **Matière** | CFA · Level 1 |
| **Source** | Schweser, *QuickSheet 2024*, p. 2–3 |
| **Difficulté** | 🔴 Avancé (le topic le plus volumineux de la source) |
| **Temps d'étude estimé** | 2 h |
| **Prérequis** | Comptabilité générale (bilan, compte de résultat, flux) |
| **Concepts clés** | EPS dilué, classifications de titres, CFO, ratios de liquidité/rotation/rentabilité, cash conversion cycle, DuPont, LIFO/FIFO, impôts différés, leases |
| **Place dans la source** | Le topic qui s'étend sur le plus de colonnes du QuickSheet — pivot de l'examen. |

## 🎯 Vue d'ensemble

Trois strates : le **cadre** (démarche d'analyse, opinions d'audit, reconnaissance du revenu), la **mécanique comptable** (EPS, classifications de titres, flux de trésorerie, stocks, actifs longs, impôts différés, leases, pensions), et la **boîte à ratios** (liquidité, rotation et cash conversion cycle, rentabilité, structure, DuPont).

```
Cadre : 6 étapes d'analyse → opinions d'audit → revenu en 5 étapes
Mécanique : EPS basic/dilué → titres (HFT/AFS/HTM) → CFO direct/indirect → LIFO/FIFO
Ratios : liquidité → rotation → CCC → marges → ROE (DuPont 3 et 5 facteurs)
```

## 🟡 Concept 1 — Le cadre d'analyse

**Démarche en 6 étapes** (p. 2) : objectif et contexte → collecte → traitement → analyse/interprétation → conclusions → mise à jour.

**Opinions d'audit** : *unqualified* (clean — assurance raisonnable, sans anomalies significatives) ; *qualified* (exceptions aux principes comptables) ; *adverse* (états non fidèles) ; *disclaimer* (l'auditeur ne peut pas se prononcer).

**Reconnaissance du revenu en 5 étapes** : identifier le contrat → identifier les obligations de performance → déterminer le prix → l'allouer aux obligations → reconnaître quand elles sont satisfaites.

## 🔴 Concept 2 — EPS basic et dilué

$$\text{basic EPS} = \frac{\text{net income} - \text{preferred dividends}}{\text{wtd. avg. common shares outstanding}}$$

**EPS dilué** : au numérateur, on réintègre les dividendes des préférentielles convertibles et les intérêts de la dette convertible **× (1 − t)** ; au dénominateur, on ajoute les actions issues de la conversion des préférentielles, de la dette convertible et des stock-options :

$$\text{diluted EPS} = \frac{\big[\text{NI} - \text{div. préf.}\big] + \text{div. préf. conv.} + \text{int. dette conv.}(1-t)}{\text{actions moy.} + \text{conv. préf.} + \text{conv. dette} + \text{options}}$$

## 🟠 Concept 3 — Titres, flux et stocks

**Classifications** (p. 2) :

| Classification | Bilan | Résultat |
|---|---|---|
| Held-for-trading | Juste valeur | Dividendes, intérêts, G/L réalisés **et latents** |
| Available-for-sale | Juste valeur | Dividendes, intérêts, G/L réalisés ; latents → OCI |
| Held-to-maturity | Coût amorti | Intérêts, G/L réalisés |

**CFO** : méthode *directe* (encaissements clients − décaissements fournisseurs, charges, intérêts, impôts) ; *indirecte* (résultat net ± éléments non cash, ± gains/pertes de financement ou d'investissement, ± variations du BFR). **FCF = CFO − capex nets.**

**Stocks, prix en hausse et quantités stables ou croissantes** :

| LIFO | FIFO |
|---|---|
| COGS plus élevé | COGS plus bas |
| Marge brute plus basse | Marge brute plus haute |
| Stocks au bilan plus bas | Stocks au bilan plus hauts |

## 🔴 Concept 4 — La boîte à ratios

**Liquidité** : current = actifs courants / passifs courants ; quick = (cash + titres + créances) / passifs courants ; cash ratio = (cash + titres) / passifs courants ; *defensive interval* = (cash + titres + créances) / dépenses cash journalières.

**Rotation et cash conversion cycle** :
$$\text{receivables turnover} = \frac{\text{ventes}}{\text{créances moy.}},\quad \text{DSO} = \frac{365}{\text{receiv. turnover}}$$
$$\text{inventory turnover} = \frac{\text{COGS}}{\text{stock moy.}},\quad \text{payables turnover} = \frac{\text{achats}}{\text{fournisseurs moy.}}$$
$$\text{CCC} = \text{jours de stock} + \text{DSO} - \text{jours fournisseurs}$$

**Rentabilité** : marge brute, opérationnelle (EBIT/CA), nette ; ROA (total capital) = EBIT / capital total moyen. **Structure** : debt-to-equity, total debt ratio ; interest coverage = EBIT/intérêts ; fixed charge coverage = (EBIT + loyers)/(intérêts + loyers).

**Croissance soutenable** : $g = RR \times ROE$, avec $RR = 1 - \dfrac{\text{dividendes déclarés}}{\text{résultat opérationnel après impôt}}$.

## 🔴 Concept 5 — DuPont

**Trois facteurs** :
$$ROE = \underbrace{\frac{NI}{\text{ventes}}}_{\text{marge nette}} \times \underbrace{\frac{\text{ventes}}{\text{actifs}}}_{\text{rotation}} \times \underbrace{\frac{\text{actifs}}{\text{equity}}}_{\text{levier}}$$

**Cinq facteurs (étendu)** :
$$ROE = \frac{NI}{EBT}\times\frac{EBT}{EBIT}\times\frac{EBIT}{CA}\times\frac{CA}{\text{actifs moy.}}\times\frac{\text{actifs moy.}}{\text{equity moy.}}$$
soit : *tax burden × interest burden × EBIT margin × asset turnover × leverage*.

## 🟡 Concept 6 — Sujets d'ajustement

- **Actifs longs** : capitaliser lisse le résultat et gonfle actifs/equity ; passer en charges fait l'inverse. **Réévaluation** : IFRS — gain en résultat seulement pour renverser une dépréciation passée, le surplus en equity (immeubles de placement : tout en résultat) ; US GAAP — interdite.
- **Impôts différés** : DTL si résultat fiscal < résultat comptable (traiter en equity si non susceptible de se renverser) ; DTA si l'inverse (*valuation allowance* si réalisation improbable).
- **Leases** : IFRS preneur — droit d'usage amorti linéairement + dette au PV des loyers ; US GAAP idem sauf amortissement calé sur la dette et, pour l'operating lease, loyer entièrement en charge. Bailleur : finance lease (sort l'actif, créance + produit d'intérêt) vs operating (garde l'actif, loyers en produits + amortissement).
- **Pensions** : cotisations définies — charge de la période ; prestations définies — actif net si surfinancé, passif net sinon.
- **Rémunération en actions** : juste valeur à la date d'attribution, étalée sur le vesting.
- **Modèle pro forma en 8 étapes** : croissance du CA → coût des ventes → SG&A → coûts de financement → impôts → BFR → PP&E/capex → états pro forma.

### Comment traiter une question de ratio sans erreur d'étourderie ?

1. Écrire la formule exacte (numérateur/dénominateur, moyennes vs fins de période — la source utilise des **moyennes** pour les rotations et le ROE étendu).
2. Vérifier l'unité : un turnover est un nombre de fois, sa version « days » vaut 365/turnover.
3. Pour le CCC : additionner stock et clients, **soustraire** fournisseurs.
4. Pour DuPont : contrôler que le produit des facteurs se télescope bien vers NI/equity.

## ⚠️ Common mistakes

1. **Oublier (1 − t) sur les intérêts de dette convertible** dans l'EPS dilué.
2. **Mettre les G/L latents d'un titre AFS en résultat** — ils vont en OCI.
3. **CCC avec un + devant les jours fournisseurs** — ils se retranchent.
4. **Confondre qualified et adverse** — exceptions ponctuelles vs états non fidèles.
5. **Réévaluer un actif sous US GAAP** — interdit ; c'est une option IFRS.
6. **Inventory turnover sur les ventes** — c'est le COGS au numérateur.
7. **DTL/DTA inversés** — taxable < comptable ⟹ passif différé (on paiera plus tard).

## 📌 Ultimate Review

1. Analyse en 6 étapes ; opinions : unqualified/qualified/adverse/disclaimer ; revenu en 5 étapes.
2. Basic EPS = (NI − div. préf.)/actions moyennes ; dilué : réintégrer conversions et options, intérêts × (1−t).
3. HFT (JV, tout en résultat) / AFS (JV, latents en OCI) / HTM (coût amorti).
4. CFO direct vs indirect ; FCF = CFO − capex.
5. LIFO en prix montants : COGS ↑, marge ↓, stocks ↓ (FIFO inverse).
6. CCC = stock + DSO − fournisseurs ; liquidité : current, quick, cash, defensive interval.
7. g = RR × ROE ; DuPont 3 facteurs (marge × rotation × levier) et 5 facteurs (tax × interest × EBIT margin × turnover × leverage).
8. IFRS/GAAP : réévaluation, leases ; DTL/DTA ; pensions sur/sous-financées.

## 🧠 Active Recall

**Basic** — Les trois classifications de titres et leur traitement des gains latents ?
<details><summary>Réponse</summary>

Held-for-trading : latents en résultat. Available-for-sale : latents en OCI. Held-to-maturity : coût amorti, pas de latents reconnus.
</details>

**Understanding** — Pourquoi le DuPont étendu décompose-t-il la marge nette en trois « burdens » ?
<details><summary>Réponse</summary>

NI/EBT (poids de l'impôt) × EBT/EBIT (poids des intérêts) × EBIT/CA (marge opérationnelle) : on voit si un ROE se dégrade par l'impôt, le financement ou l'exploitation — la marge nette seule masque l'origine.
</details>

**Application** — Stock moyen 50, COGS 400, DSO 30 j, jours fournisseurs 40 j. CCC ?
<details><summary>Réponse</summary>

Inventory turnover = 8 ⟹ 365/8 ≈ 45,6 j de stock. CCC ≈ 45,6 + 30 − 40 = 35,6 jours.
</details>

**Exam-style** — En période de hausse des prix, quelle méthode de stock donne le current ratio le plus bas, et pourquoi ?
<details><summary>Réponse</summary>

LIFO : les stocks au bilan sont valorisés aux coûts anciens (plus bas), donc l'actif courant est plus faible à passif courant identique.
</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Opinion « qualified » ? | Exceptions aux principes comptables |
| Numérateur du basic EPS ? | NI − dividendes préférentiels |
| Ajustement dette convertible (EPS dilué) ? | + intérêts × (1 − t) au numérateur |
| Latents d'un titre AFS ? | En OCI |
| FCF ? | CFO − capex nets |
| Quick ratio ? | (Cash + titres + créances)/passifs courants |
| CCC ? | Jours de stock + DSO − jours fournisseurs |
| DuPont 3 facteurs ? | Marge nette × rotation des actifs × levier |
| DuPont 5 facteurs ? | Tax × interest × EBIT margin × turnover × leverage |
| g soutenable ? | RR × ROE |
| Réévaluation sous US GAAP ? | Interdite |
| DTL créée quand ? | Résultat fiscal < résultat comptable |
