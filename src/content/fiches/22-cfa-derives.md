# Fiche 22 — Dérivés : arbitrage, forwards, options, parité

| | |
|---|---|
| **Matière** | CFA · Level 1 |
| **Source** | Schweser, *QuickSheet 2024*, p. 6 |
| **Difficulté** | 🟡 Intermédiaire |
| **Temps d'étude estimé** | 1 h 20 |
| **Prérequis** | Actualisation, notion de position longue/courte |
| **Concepts clés** | Loi du prix unique, pricing risque-neutre, valeur d'un forward, FRA, swaps, valeur intrinsèque, facteurs des options, put-call parity |
| **Place dans la source** | Topic charnière : deux principes (arbitrage, valeur vs prix), une formule de forward, la table des facteurs et la parité. |

## 🎯 Vue d'ensemble

Tout le topic découle de deux idées : la **loi du prix unique** (mêmes flux ⟹ même prix) et le **pricing risque-neutre** (un portefeuille au payoff certain doit rapporter le taux sans risque). Elles donnent la valeur d'un forward, la réplication d'un swap par des FRA, et la **put-call parity**.

```
Arbitrage → prix unique → payoff certain = taux sans risque
Forward : prix fixé pour valeur nulle à t=0 → valeur variable ensuite
Futures = forwards standardisés + appel de marge quotidien
Swap = série de FRA de PV nulle à l'initiation
Options : intrinsèque → facteurs → put-call parity c + X(1+Rf)⁻ᵀ = S + p
```

## 🔴 Concept 1 — Arbitrage, valeur et prix

**Loi du prix unique** (p. 6) : deux actifs aux flux futurs identiques en tout état du monde ont le même prix. Deux actifs risqués combinés en un portefeuille au **payoff certain** doivent rapporter le **taux sans risque** — d'où le pricing **risque-neutre** des dérivés.

**Valeur vs prix** : le *prix* d'un forward/future/swap est fixé au contrat pour que la **valeur initiale soit nulle** ; la *valeur* évolue ensuite, gains et pertes symétriques entre long et short.

**Valeur d'un forward à la date $t$** :
$$V_t(T) = \big[S_t + PV_t(\text{coûts}) - PV_t(\text{bénéfices})\big] - F_0(T)\,(1+R_f)^{-(T-t)}$$

**Futures vs forwards** : les futures sont des forwards standardisés, cotés en bourse, avec règlement quotidien en cash des gains/pertes (*mark-to-market*).

**FRA** : forward pour emprunter/prêter à un taux fixé à une date future. **Swap de taux** : réplicable par une série de FRA dont les valeurs actuelles somment à zéro à l'initiation.

## 🔴 Concept 2 — Options : positions et valeur intrinsèque

**Expositions** (p. 6) : acheteur d'un call — long sur l'actif ; vendeur d'un call — short ; acheteur d'un put — short ; vendeur d'un put — long.

$$\text{intrinsèque du call} = \max(0,\; S - X)\qquad \text{intrinsèque du put} = \max(0,\; X - S)$$

**Américaine vs européenne** : exercice à tout moment jusqu'à l'échéance vs à l'échéance seulement.

**Facteurs** (table de la source) :

| Hausse de… | Call | Put |
|---|---|---|
| Prix de l'actif | ↑ | ↓ |
| Prix d'exercice | ↓ | ↑ |
| Taux sans risque | ↑ | ↓ |
| Volatilité | ↑ | ↑ |
| Temps restant | ↑ | ↑ * |
| Coûts de détention | ↑ | ↓ |
| Bénéfices de détention | ↓ | ↑ |

\* Sauf certains puts européens très en dedans.

## 🔴 Concept 3 — Put-call parity

Pour des options européennes :
$$c + X(1+R_f)^{-T} = S + p$$

Chaque instrument s'en déduit :
$$S = c - p + X(1+R_f)^{-T} \qquad p = c - S + X(1+R_f)^{-T}$$
$$c = S + p - X(1+R_f)^{-T} \qquad X(1+R_f)^{-T} = S + p - c$$

**Parité forward** : remplacer $S$ par $F_0(T)(1+R_f)^{-T}$ dans n'importe laquelle des relations (à $t = 0$).

### Exercices calculés

**🟢 Niveau 1 — intrinsèque** — Call de strike 50 sur une action à 47 : intrinsèque ? Et le put de même strike ?
<details><summary>Correction</summary>

Call : $\max(0, 47 - 50) = 0$ (hors de la monnaie). Put : $\max(0, 50 - 47) = 3$. Toute valeur de marché du call au-dessus de 0 est de la valeur temps pure.
</details>

**🟡 Niveau 2 — valeur d'un forward en cours de vie** — Forward sur un actif sans coûts ni bénéfices, $F_0(T) = 105$, $R_f = 5\,\%$. À mi-vie ($T - t = 0{,}5$ an), le spot vaut 104. Valeur pour le long ?
<details><summary>Correction</summary>

$V_t = S_t - F_0(T)(1+R_f)^{-(T-t)} = 104 - 105(1{,}05)^{-0{,}5} = 104 - 102{,}47 \approx +1{,}53$. Le long gagne : le spot a monté plus vite que l'actualisation du prix contractuel ne l'exigeait. Le short a exactement $-1{,}53$ — jeu à somme nulle.
</details>

**🟠 Niveau 3 — arbitrage par la parité** — $S = 60$, $c = 8$, $p = 4$, $X = 58$, $(1+R_f)^{-T} = 0{,}95$. Y a-t-il arbitrage ?
<details><summary>Correction</summary>

Membre gauche : $c + X(1+R_f)^{-T} = 8 + 55{,}1 = 63{,}1$. Membre droit : $S + p = 64$. Écart 0,9 : le portefeuille call + obligation est **trop bon marché** — l'acheter et vendre action + put encaisse 0,9 sans risque (payoffs identiques à l'échéance). En examen, l'écart signé indique le sens de l'arbitrage.
</details>

### Comment retrouver un prix manquant par la parité ?

1. Écrire $c + X(1+R_f)^{-T} = S + p$ : à gauche le call + l'obligation zéro-coupon, à droite l'action + le put.
2. Isoler l'inconnue par simple algèbre.
3. Contrôle : les deux membres sont des portefeuilles au même payoff à l'échéance — s'ils diffèrent, il y a arbitrage.

## ⚠️ Common mistakes

1. **Confondre prix et valeur d'un forward** — le prix est contractuel et fixe ; la valeur part de zéro et fluctue.
2. **Intrinsèque du put écrite $\max(0, S - X)$** — c'est $X - S$ pour le put.
3. **Croire l'acheteur d'un put long sur l'actif** — il est **short** ; c'est le *vendeur* du put qui est long.
4. **Actualisation oubliée sur $X$** dans la parité — c'est $X(1+R_f)^{-T}$, pas $X$.
5. **Le temps augmente toujours la valeur d'un put européen** — exception : certains puts très en dedans.
6. **Appliquer la parity à des américaines** — la relation de la source vaut pour des européennes.

## 📌 Ultimate Review

1. Prix unique : mêmes flux ⟹ même prix ; payoff certain ⟹ taux sans risque (risque-neutre).
2. Prix fixé pour valeur nulle en t=0 ; V_t(T) = [S_t + PV(coûts) − PV(bénéfices)] − F₀(T)(1+R_f)^{−(T−t)}.
3. Futures = forwards standardisés à règlement quotidien ; swap = série de FRA de PV nulle.
4. Intrinsèques : call max(0, S−X), put max(0, X−S) ; expositions : call long/short, put short/long.
5. Volatilité ↑ ⟹ call ↑ et put ↑ ; taux ↑ ⟹ call ↑, put ↓.
6. c + X(1+R_f)^{−T} = S + p ; version forward : S → F₀(T)(1+R_f)^{−T}.

## 🧠 Active Recall

**Basic** — Écrivez la put-call parity et nommez les deux portefeuilles égaux.
<details><summary>Réponse</summary>

$c + X(1+R_f)^{-T} = S + p$ : call + zéro-coupon de nominal X d'un côté, action + put de l'autre.
</details>

**Understanding** — Pourquoi les dérivés se pricent-ils en risque-neutre ?
<details><summary>Réponse</summary>

Parce qu'on peut combiner des actifs risqués en un portefeuille au payoff **certain** ; un payoff certain doit rapporter le taux sans risque, sinon arbitrage — les préférences pour le risque disparaissent du prix.
</details>

**Application** — $S = 50$, $p = 4$, $X = 52$, $(1+R_f)^{-T} = 0{,}96$. Prix du call européen ?
<details><summary>Réponse</summary>

$c = S + p - X(1+R_f)^{-T} = 50 + 4 - 49{,}92 = 4{,}08$.
</details>

**Exam-style** — Les taux sans risque montent, tout le reste égal. Effet sur calls et puts ?
<details><summary>Réponse</summary>

Valeur des calls ↑, valeur des puts ↓ (table des facteurs de la source).
</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Loi du prix unique ? | Flux identiques ⟹ prix identiques |
| Valeur initiale d'un forward ? | Zéro (le prix contractuel est fixé pour cela) |
| V_t d'un forward ? | [S_t + PV(coûts) − PV(bénéfices)] − F₀(T)(1+R_f)^{−(T−t)} |
| Futures vs forward ? | Standardisé, coté, mark-to-market quotidien |
| Swap de taux ? | Série de FRA, PV totale nulle à l'initiation |
| Intrinsèque d'un put ? | max(0, X − S) |
| Acheteur d'un put : exposition ? | Short sur l'actif |
| Volatilité ↑ ? | Call ↑ et put ↑ |
| Put-call parity ? | c + X(1+R_f)^{−T} = S + p |
| Parité forward ? | S remplacé par F₀(T)(1+R_f)^{−T} |
