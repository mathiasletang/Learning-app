# Fiche 19 — Portfolio Management : frontière, CAPM, biais

| | |
|---|---|
| **Matière** | CFA · Level 1 |
| **Source** | Schweser, *QuickSheet 2024*, p. 4 |
| **Difficulté** | 🟡 Intermédiaire |
| **Temps d'étude estimé** | 1 h 40 |
| **Prérequis** | Espérance/variance de portefeuille (fiche 15) |
| **Concepts clés** | IPS, frontière efficiente, risque systématique, CAPM/SML, Sharpe, Treynor, alpha de Jensen, biais comportementaux |
| **Place dans la source** | Le seul topic du QuickSheet illustré par trois graphiques (frontière, CML, SML). |

## 🎯 Vue d'ensemble

Du client au marché : l'**IPS** fixe objectifs et contraintes ; la **frontière de Markowitz** donne les meilleurs portefeuilles risqués ; le **CAPM** dit ce qu'un actif doit rapporter à l'équilibre compte tenu de son seul risque **systématique** ; les mesures **ajustées du risque** évaluent la gestion ; les **biais** expliquent les écarts de comportement.

```
IPS (objectifs + contraintes)
→ frontière efficiente (meilleur rendement à risque donné)
→ risque total = systématique + non systématique
→ SML/CAPM : E(Ri) = RFR + βi[E(Rmkt) − RFR]
→ au-dessus de la SML : sous-évalué · en dessous : surévalué
→ Sharpe/M² (risque total) vs Treynor/Jensen (risque systématique)
```

## 🟡 Concept 1 — L'Investment Policy Statement

**Objectifs** : rendement ; tolérance au risque.
**Contraintes** (p. 4) : liquidité ; horizon ; fiscalité ; cadre légal et réglementaire ; circonstances particulières.

## 🔴 Concept 2 — Frontière efficiente et risque systématique

La **frontière de Markowitz** est l'ensemble des portefeuilles offrant le rendement le plus élevé à chaque niveau de risque. L'investisseur choisit le point de tangence avec ses courbes d'indifférence (plus il est tolérant au risque, plus il se place à droite).

**Décomposition du risque** (p. 4) :
$$\text{risque total} = \text{systématique} + \text{non systématique}$$

Le risque non systématique se **diversifie** ; le marché ne rémunère que le risque **systématique** (covariance avec le marché — sur l'axe de la SML, $\text{cov}_{mkt,mkt} = \sigma^2_{mkt}$).

## 🔴 Concept 3 — CAPM, SML et titres mal évalués

$$E(R_i) = RFR + \beta_i\big[E(R_{mkt}) - RFR\big]$$

La SML trace cette relation rendement exigé / risque systématique. **Lecture des écarts** (p. 4) :

- Un titre dont le rendement estimé se place **au-dessus** de la SML est **sous-évalué** (il rapporte plus que son risque ne l'exige) — à acheter.
- **En dessous** : **surévalué**.

## 🟠 Concept 4 — Mesures ajustées du risque

| Mesure | Risque au dénominateur |
|---|---|
| Sharpe ratio, M² | Risque **total** (σ) |
| Treynor, alpha de Jensen | Risque **systématique** (β) |

Le Treynor d'un portefeuille P est la pente de la droite RFR→P dans le plan (β, rendement) ; l'alpha de Jensen est l'écart vertical entre P et la SML.

## 🟠 Concept 5 — Biais comportementaux

**Erreurs cognitives — persévérance des croyances** : conservatisme, confirmation, représentativité, illusion de contrôle, rétrospection (*hindsight*).
**Erreurs cognitives — traitement de l'information** : ancrage et ajustement, comptabilité mentale, cadrage, disponibilité.
**Biais émotionnels** : aversion aux pertes, excès de confiance, défaut de self-control, statu quo, dotation (*endowment*), aversion au regret.

### Exercices calculés

**🟢 Niveau 1 — CAPM direct** — RFR 2 %, prime de marché 6 %, β = 0,8. Rendement exigé ?
<details><summary>Correction</summary>

$E(R) = 2 + 0{,}8 \times 6 = 6{,}8\,\%$. (Attention à l'énoncé : « prime de marché » = $E(R_{mkt}) - RFR$ déjà calculée ; si on donne $E(R_{mkt}) = 8\,\%$, la prime est $8 - 2 = 6$.)
</details>

**🟡 Niveau 2 — mesures ajustées** — Portefeuille : rendement 11 %, σ 20 %, β 1,25. Marché : 9 %, σ 15 %. RFR 3 %. Sharpe et Treynor du portefeuille et du marché ; un investisseur non diversifié doit-il préférer ce portefeuille au marché ?
<details><summary>Correction</summary>

Sharpe : portefeuille $(11-3)/20 = 0{,}40$ ; marché $(9-3)/15 = 0{,}40$. Treynor : portefeuille $(11-3)/1{,}25 = 6{,}4$ ; marché $(9-3)/1 = 6$. Le portefeuille bat le marché **par unité de risque systématique** (Treynor) mais fait jeu égal en risque total (Sharpe) : son risque spécifique consomme l'avantage. Pour un investisseur **non diversifié** (risque total pertinent), indifférence ; pour une poche d'un ensemble diversifié, le portefeuille est préférable.
</details>

**🟠 Niveau 3 — alpha de Jensen** — Même portefeuille (β 1,25, rendement réalisé 11 %), marché 9 %, RFR 3 %. Alpha ?
<details><summary>Correction</summary>

Rendement exigé par le CAPM : $3 + 1{,}25(9-3) = 10{,}5\,\%$. $\alpha = 11 - 10{,}5 = +0{,}5\,\%$ : au-dessus de la SML — surperformance ajustée du risque systématique, cohérente avec le Treynor supérieur.
</details>

### Comment choisir entre Sharpe et Treynor ?

1. Demander : le portefeuille évalué est-il l'essentiel de la richesse de l'investisseur (risque total pertinent) ou une poche d'un ensemble diversifié (seul le systématique compte) ?
2. Cas 1 → Sharpe ou M² ; cas 2 → Treynor ou alpha de Jensen.
3. Vérifier la cohérence des classements : deux portefeuilles bien diversifiés se classent pareil sous les deux familles ; un portefeuille concentré peut avoir un bon Treynor et un mauvais Sharpe.

## ⚠️ Common mistakes

1. **« Au-dessus de la SML = surévalué »** — c'est l'inverse : au-dessus, le titre offre plus que l'équilibre, il est sous-évalué.
2. **Attendre une rémunération du risque diversifiable** — seul le systématique est payé.
3. **Sharpe avec β ou Treynor avec σ** — Sharpe/M² : risque total ; Treynor/Jensen : systématique.
4. **Classer l'aversion aux pertes en biais cognitif** — c'est un biais émotionnel ; l'ancrage, lui, est cognitif (traitement de l'information).
5. **Oublier des contraintes de l'IPS** — les cinq : liquidité, horizon, fiscalité, légal/réglementaire, circonstances particulières.

## 📌 Ultimate Review

1. IPS : 2 objectifs (rendement, risque), 5 contraintes.
2. Frontière efficiente : rendement max à risque donné ; choix au point de tangence avec l'indifférence.
3. Risque total = systématique + non systématique ; seul le premier est rémunéré.
4. CAPM : E(Ri) = RFR + βi[E(Rmkt) − RFR] ; SML = sa représentation.
5. Au-dessus de la SML : sous-évalué ; en dessous : surévalué.
6. Sharpe/M² sur σ ; Treynor/Jensen sur β.
7. Biais : cognitifs (persévérance ; traitement de l'info) vs émotionnels.

## 🧠 Active Recall

**Basic** — Énoncez le CAPM et le nom de sa représentation graphique.
<details><summary>Réponse</summary>

$E(R_i) = RFR + \beta_i[E(R_{mkt}) - RFR]$ ; la Security Market Line.
</details>

**Understanding** — Pourquoi le marché ne rémunère-t-il pas le risque non systématique ?
<details><summary>Réponse</summary>

Parce qu'il disparaît par diversification : un investisseur diversifié ne le porte pas, donc l'équilibre n'a aucune raison de le payer.
</details>

**Application** — RFR = 3 %, E(Rmkt) = 9 %, β = 1,2. Rendement estimé de 11 %. Le titre est-il bien évalué ?
<details><summary>Réponse</summary>

Exigé : $3 + 1{,}2(6) = 10{,}2\,\%$. Estimé 11 % > 10,2 % : le titre se place au-dessus de la SML — sous-évalué.
</details>

**Exam-style** — Un investisseur refuse de vendre un titre parce qu'il l'a « toujours eu en portefeuille », et surévalue ce qu'il possède. Quels biais ?
<details><summary>Réponse</summary>

Statu quo et effet de dotation (endowment) — deux biais émotionnels.
</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Deux objectifs de l'IPS ? | Rendement ; tolérance au risque |
| Cinq contraintes de l'IPS ? | Liquidité, horizon, fiscalité, légal, circonstances particulières |
| Frontière efficiente ? | Rendement max pour chaque niveau de risque |
| CAPM ? | RFR + β(E(Rmkt) − RFR) |
| Titre au-dessus de la SML ? | Sous-évalué |
| Sharpe vs Treynor ? | Risque total (σ) vs systématique (β) |
| Alpha de Jensen ? | Écart vertical à la SML |
| Ancrage : cognitif ou émotionnel ? | Cognitif (traitement de l'information) |
| Aversion aux pertes ? | Biais émotionnel |
