# Fiche 20 — Equity : marchés, efficience, DDM et multiples

| | |
|---|---|
| **Matière** | CFA · Level 1 |
| **Source** | Schweser, *QuickSheet 2024*, p. 4–5 |
| **Difficulté** | 🟡 Intermédiaire |
| **Temps d'étude estimé** | 1 h 30 |
| **Prérequis** | Actualisation, CAPM pour $k_e$ (fiche 19) |
| **Concepts clés** | Marge, indices, ordres, EMH, Porter, PESTLE, DDM (Gordon, multi-étapes), multiples de prix |
| **Place dans la source** | Deux volets distincts dans le QuickSheet : microstructure des marchés, puis évaluation des actions. |

## 🎯 Vue d'ensemble

Deux volets. **Marchés** : achat sur marge, construction d'indices, types d'ordres, structures d'échange, les trois formes de l'efficience. **Évaluation** : analyse d'industrie (Porter, PESTLE), puis les modèles d'actualisation des dividendes et les multiples.

```
Marchés : marge → indices → ordres → quote/order/brokered → EMH faible/semi-forte/forte
Industrie : définir → mesurer → Porter (5 forces) → PESTLE → stratégies
Valeur : V₀ = D/(k−g) (Gordon) → multi-étapes → P/E, P/B, P/S, P/CF
```

## 🟠 Concept 1 — Marge et indices

**Achat sur marge** (p. 4) : facteur de levier = 1 / % de marge ; rendement levé = HPR × facteur de levier.

**Prix d'appel de marge** :
$$P_{\text{call}} = P_0\,\frac{1 - \text{marge initiale}}{1 - \text{marge de maintenance}}$$

**Indices** : *price-weighted* = Σ prix / diviseur ajusté ; *value-weighted* = (Σ prix × titres courants / Σ prix × titres de base) × valeur de base.

## 🟡 Concept 2 — Ordres, structures et marchés efficients

**Instructions** (p. 4) : d'exécution (comment — market, limit) ; de validité (quand — stop, day, fill-or-kill) ; de règlement (clearing — préciser vente à découvert ou titres détenus).

**Structures** : *quote-driven* (face à des dealers) ; *order-driven* (appariement par règles) ; *brokered* (courtiers cherchent la contrepartie).

**Marché qui fonctionne bien** : efficience opérationnelle (coûts de transaction minimaux) + informationnelle (les prix intègrent vite l'information).

**Les trois formes de l'EMH** :

| Forme | Les prix intègrent… | Conséquence |
|---|---|---|
| Faible | L'information de marché passée | L'analyse technique ne bat pas le marché |
| Semi-forte | + toute l'information publique | L'analyse fondamentale non plus |
| Forte | + l'information privée | Même l'initié ne peut pas surperformer |

## 🟡 Concept 3 — Analyse d'industrie

**Démarche** (p. 4) : définir l'industrie → taille, croissance, rentabilité → structure (Porter) → influences externes (PESTLE) → stratégies des firmes.

**Cinq forces de Porter** : rivalité existante ; menace d'entrée ; menace des substituts ; pouvoir des acheteurs ; pouvoir des fournisseurs.
**PESTLE** : Political, Economic, Social, Technological, Legal, Environmental.
**Stratégies concurrentielles** : domination par les coûts ; différenciation ; focalisation (niche).

## 🔴 Concept 4 — Dividend Discount Models

**Un horizon d'une période** :
$$V_0 = \frac{D_1}{1+k_e} + \frac{P_1}{1+k_e}$$
⚠ Utiliser le dividende **attendu** $D_1$ (note explicite de la source).

**Croissance constante (Gordon)** :
$$V_0 = \frac{D_0(1+g_c)}{k_e - g_c} = \frac{D_1}{k_e - g_c}$$

**Multi-étapes (croissance supranormale)** : actualiser les dividendes de la phase rapide un à un, puis la valeur terminale $P_n = \dfrac{D_{n+1}}{k_e - g_c}$ actualisée.

**Relation critique $k_e$ vs $g_c$** (p. 5) : l'écart se creuse → la valeur **baisse** ; il se resserre → elle **monte** ; de petites variations de l'écart produisent de grands mouvements de valeur. Hypothèses : dividendes versés, $g_c$ constant, et $k_e > g_c$ (sinon la formule n'a pas de sens).

**Earnings multiplier** :
$$\frac{P_0}{E_1} = \frac{D_1/E_1}{k - g} = \frac{\text{payout ratio}}{k - g}$$

## 🟠 Concept 5 — Multiples de prix

- **Leading P/E** = prix / BPA prévisionnel 12 mois ; **trailing P/E** = prix / BPA des 12 derniers mois.
- **P/B** = prix / valeur comptable par action ; **P/S** = prix / CA par action ; **P/CF** = prix / cash-flow par action.

### Comment mener une évaluation DDM multi-étapes ?

1. Projeter les dividendes de la phase de croissance rapide ($D_1, \dots, D_n$).
2. Calculer la valeur terminale au premier dividende « stable » : $P_n = D_{n+1}/(k_e - g_c)$.
3. Actualiser **tous** les flux (dividendes et $P_n$) à $k_e$.
4. Contrôles : $k_e > g_c$ en phase terminale ; $D_{n+1}$ (et non $D_n$) au numérateur de $P_n$.

## ⚠️ Common mistakes

1. **Utiliser $D_0$ dans Gordon** — le numérateur est $D_1 = D_0(1+g_c)$.
2. **Valeur terminale avec $D_n$** — c'est $D_{n+1}$, le premier dividende de la phase stable.
3. **Appliquer Gordon quand $k_e \le g_c$** — la formule exige $k_e > g_c$.
4. **Confondre leading et trailing P/E** — prévisionnel vs réalisé.
5. **Croire la forme faible battue par l'analyse technique** — c'est précisément ce qu'elle exclut.
6. **Marge : oublier que le levier joue dans les deux sens** — rendement levé = HPR × (1/marge), pertes comprises.

## 📌 Ultimate Review

1. Levier = 1/marge ; prix d'appel = P₀(1 − marge initiale)/(1 − marge de maintenance).
2. Price-weighted : Σprix/diviseur ; value-weighted : capitalisations relatives × base.
3. Ordres : exécution / validité / clearing ; marchés : quote-driven, order-driven, brokered.
4. EMH : faible (technique inutile), semi-forte (fondamentale inutile), forte (même l'initié).
5. Porter : rivalité, entrée, substituts, acheteurs, fournisseurs ; PESTLE ; stratégies : coûts, différenciation, niche.
6. Gordon : V₀ = D₁/(kₑ − g_c), kₑ > g_c ; multi-étapes : dividendes + P_n = D_{n+1}/(kₑ − g_c).
7. P/E leading vs trailing ; P/B, P/S, P/CF ; P₀/E₁ = payout/(k − g).

## 🧠 Active Recall

**Basic** — Écrivez le modèle de Gordon et ses trois hypothèses critiques.
<details><summary>Réponse</summary>

$V_0 = D_1/(k_e - g_c)$. Hypothèses : l'action verse des dividendes ; $g_c$ constant pour toujours ; $k_e > g_c$.
</details>

**Understanding** — Pourquoi un resserrement de l'écart $k_e - g_c$ fait-il fortement monter la valeur ?
<details><summary>Réponse</summary>

L'écart est le dénominateur : quand il tend vers zéro, $V_0$ explose — d'où la sensibilité extrême de la valeur à de petites variations de $k_e$ ou $g_c$.
</details>

**Application** — $D_0 = 2$, $g_c = 4\,\%$, $k_e = 9\,\%$. Valeur de Gordon ?
<details><summary>Réponse</summary>

$D_1 = 2{,}08$ ; $V_0 = 2{,}08/0{,}05 = 41{,}6$.
</details>

**Exam-style** — Marge initiale 50 %, maintenance 25 %, achat à 40. Prix d'appel de marge ?
<details><summary>Réponse</summary>

$40 \times \frac{1-0{,}5}{1-0{,}25} = 40 \times \frac{0{,}5}{0{,}75} \approx 26{,}67$.
</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Facteur de levier sur marge ? | 1 / % de marge |
| Prix d'appel de marge ? | P₀(1 − marge init.)/(1 − maintenance) |
| Indice price-weighted ? | Σ prix / diviseur ajusté |
| EMH semi-forte : que devient l'analyse fondamentale ? | Sans excès de rendement possible |
| Cinq forces de Porter ? | Rivalité, entrée, substituts, acheteurs, fournisseurs |
| Gordon ? | D₁/(kₑ − g_c), avec kₑ > g_c |
| Valeur terminale multi-étapes ? | P_n = D_{n+1}/(kₑ − g_c) |
| P₀/E₁ ? | Payout ratio / (k − g) |
| Leading vs trailing P/E ? | BPA prévisionnel vs BPA passé |
