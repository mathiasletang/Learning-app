# Fiche 23 — Alternatifs : structures, frais, hedge funds, réel

| | |
|---|---|
| **Matière** | CFA · Level 1 |
| **Source** | Schweser, *QuickSheet 2024*, p. 6 |
| **Difficulté** | 🟢 Fondamental |
| **Temps d'étude estimé** | 1 h |
| **Prérequis** | Aucun |
| **Concepts clés** | Cycle de vie, hiérarchie de juste valeur, restrictions de rachat, frais (2 et 20, hurdles, waterfalls), stratégies de hedge funds, private capital, contango/backwardation |
| **Place dans la source** | Dernier topic du QuickSheet : presque exclusivement du vocabulaire à restituer, une formule (prix futures des commodities). |

## 🎯 Vue d'ensemble

Un topic de **structures et de vocabulaire** : comment vit un fonds (trois phases), comment on valorise (trois niveaux de juste valeur), comment on sort (lockup, notice, gate), comment le gérant est payé (2 et 20, hurdles, high water mark, waterfalls), puis le tour des classes : hedge funds, private capital, immobilier, commodities, infrastructure.

```
Vie du fonds : commitment → deployment → distribution
Valorisation : Level 1 (marché actif) → 2 (observables) → 3 (non observables)
Sortie : lockup → notice (30–90 j) → gate
Frais : 2 % AUM + 20 % perf → hurdles hard/soft → HWM → clawback → waterfalls
Classes : HF (4 familles) · private capital (LBO, VC) · immobilier · commodities · infra
```

## 🟠 Concept 1 — Cycle de vie, valorisation, rachat

**Trois phases** (p. 6) : *capital commitment* (identification, appels de capital auprès des partenaires) ; *capital deployment* (financement et implication dans les projets) ; *capital distribution* (les succès génèrent revenus et flux).

**Hiérarchie de juste valeur** : Level 1 — marché actif, prix cotés ; Level 2 — inputs observables ou modèles ; Level 3 — inputs non observables, peu ou pas de transactions.

**Restrictions de rachat** : *lockup* (pas de rachat après l'investissement initial, ou pénalités) ; *notice period* (délai d'exécution, typiquement 30–90 jours) ; *gate* (restriction temporaire des rachats).

## 🔴 Concept 2 — Structures de frais

- **« 2 et 20 »** : 2 % de frais de gestion + 20 % de performance. Assiette des frais de gestion : **AUM pour les hedge funds, capital engagé pour le private equity**.
- **Hard hurdle** : la performance n'est facturée que sur le rendement **au-delà** du hurdle ; **soft hurdle** : sur **tout** le rendement, mais seulement si le hurdle est dépassé.
- **High water mark** : pas de frais de performance tant que la valeur n'excède pas le précédent sommet.
- **Clawback** : les LP récupèrent des frais de performance si des gains antérieurs se renversent.
- **Waterfalls** : *deal-by-deal* (américain) — distribution des profits vente par vente ; *whole-of-fund* (européen) — les LP récupèrent d'abord mise initiale + hurdle.

## 🟡 Concept 3 — Le tour des classes

**Hedge funds, quatre familles de stratégies** (p. 6) :

| Famille | Stratégies |
|---|---|
| Event-driven | Merger arbitrage ; distressed/restructuring ; activiste ; situations spéciales |
| Relative value | Arbitrage de convertibles ; fixed income spécifique et général ; multi-stratégie |
| Equity | Market neutral ; fundamental growth/value ; long/short ; short bias |
| Opportunistic | Macro ; managed futures |

**Private capital** : LBO — *management buyout* (dirigeants en place) vs *buy-in* (nouveaux) ; **venture capital** par stades — formatif (angel, seed, early), later (production, ventes), mezzanine (préparer l'IPO). **Sorties** : trade sale, IPO, recapitalisation, vente secondaire, write-off.

**Immobilier** : résidentiel, commercial, REIT, whole loans, prêts à la construction.

**Commodities** : *contango* — futures > spot ; *backwardation* — futures < spot ; et :
$$\text{futures} \approx \text{spot}\,(1 + R_f) + \text{coûts de stockage} - \text{convenience yield}$$

**Infrastructure** : actifs longs d'usage public (transport, utilities, communications, social) ; *brownfield* (existant) vs *greenfield* (à construire).

### Comment traiter une question de frais de performance ?

1. Identifier l'assiette de la management fee (AUM ou capital engagé selon le véhicule).
2. Hurdle : hard (au-delà seulement) ou soft (tout, si franchi) ?
3. Vérifier le high water mark : la valeur dépasse-t-elle le précédent sommet ?
4. En private equity, repérer le waterfall (deal-by-deal vs whole-of-fund) et un éventuel clawback.

## ⚠️ Common mistakes

1. **Management fee du private equity sur l'AUM** — elle porte sur le **capital engagé** (l'AUM vaut pour les hedge funds).
2. **Confondre hard et soft hurdle** — l'assiette diffère : excédent seul vs rendement entier.
3. **Contango/backwardation inversés** — contango : futures **au-dessus** du spot.
4. **Confondre notice period et lockup** — délai d'exécution d'un rachat vs interdiction initiale de racheter.
5. **Classer merger arbitrage en relative value** — c'est une stratégie event-driven.
6. **Greenfield = existant** — non : greenfield est à construire, brownfield existe déjà.

## 📌 Ultimate Review

1. Phases : commitment (appels), deployment (financement), distribution (flux).
2. Juste valeur : L1 prix cotés actifs ; L2 observables/modèles ; L3 non observables.
3. Rachats : lockup, notice 30–90 j, gate.
4. 2 et 20 ; assiette AUM (HF) vs capital engagé (PE) ; hard/soft hurdle ; HWM ; clawback ; waterfall américain vs européen.
5. HF : event-driven, relative value, equity, opportunistic.
6. VC : formatif (angel/seed/early) → later → mezzanine ; sorties : trade sale, IPO, recap, secondaire, write-off.
7. Contango futures > spot ; backwardation < ; futures ≈ spot(1+R_f) + stockage − convenience yield.
8. Brownfield existant, greenfield à construire.

## 🧠 Active Recall

**Basic** — Les trois phases du cycle de vie d'un investissement alternatif ?
<details><summary>Réponse</summary>

Capital commitment (identification et appels de capital), capital deployment (financement et implication), capital distribution (revenus et flux des succès).
</details>

**Understanding** — Pourquoi un high water mark protège-t-il l'investisseur ?
<details><summary>Réponse</summary>

Le gérant ne facture pas deux fois la même performance : après une baisse, aucun frais de performance tant que le fonds n'a pas dépassé son précédent sommet.
</details>

**Application** — Fonds à soft hurdle de 5 %, performance de 8 %, frais de performance 20 %. Assiette et frais ?
<details><summary>Réponse</summary>

Hurdle franchi (8 > 5) : le soft hurdle facture sur **tout** le rendement — 20 % × 8 % = 1,6 %. (Un hard hurdle n'aurait facturé que 20 % × 3 % = 0,6 %.)
</details>

**Exam-style** — Un marché de commodities affiche des futures sous le spot. Nom de la situation et signe du convenience yield suggéré par la formule ?
<details><summary>Réponse</summary>

Backwardation. Avec futures ≈ spot(1+R_f) + stockage − convenience yield, il faut un convenience yield élevé (supérieur à R_f × spot + stockage) pour tirer le futures sous le spot.
</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Trois phases du cycle de vie ? | Commitment, deployment, distribution |
| Level 3 de juste valeur ? | Inputs non observables, peu de transactions |
| Gate ? | Restriction temporaire des rachats |
| Assiette de la management fee en PE ? | Capital engagé (AUM pour les HF) |
| Soft hurdle ? | Frais sur tout le rendement, si hurdle franchi |
| Waterfall européen ? | LP d'abord remboursés (mise + hurdle) |
| Merger arbitrage : famille ? | Event-driven |
| Stade mezzanine du VC ? | Préparation de l'IPO |
| Contango ? | Futures > spot |
| Formule du prix futures ? | ≈ spot(1+R_f) + stockage − convenience yield |
| Greenfield ? | Infrastructure à construire |
