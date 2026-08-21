# Fiche 98 — Modèles alternatifs et procédures numériques avancées

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché · Méthodes numériques |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 26 « More on Models and Numerical Procedures » |
| **Difficulté** | Must know — le pont entre le smile et la valorisation des exotiques |
| **Temps d'étude estimé** | 2 h |
| **Prérequis** | Fiches 87 (Black-Scholes), 91 (smiles), 92 (méthodes numériques), 94 (GARCH), 97 (exotiques) |
| **Concepts clés** | Processus de Lévy, modèle CEV, modèle mixte saut-diffusion de Merton, processus de Poisson, modèle variance-gamma, volatilité stochastique, modèle de Heston, modèle IVF (fonction de volatilité implicite), formule de Dupire, obligation convertible, arbre avec défaut, dérivés dépendant du chemin, valeurs représentatives et interpolation, barrière interne et externe, maillage adaptatif, arbres à deux actifs corrélés, Longstaff-Schwartz, paramétrisation de la frontière d'exercice |
| **Poids à l'examen** | La **taxonomie** diffusion / saut-diffusion / saut pur · $dS=(r-q)S\,dt+\sigma S^\alpha dz$ · la **série de Poisson** de Merton · l'**arbre du convertible** avec la branche de défaut · la **régression de Longstaff-Schwartz**. |

## 🎯 Vue d'ensemble

```
LE PROBLÈME POSÉ D'ENTRÉE
  La surface de volatilité donne la BONNE volatilité pour une VANILLE de strike 40
  et 1 an (27 %). Elle est TOTALEMENT INAPPROPRIÉE pour une option à BARRIÈRE
  de même strike et même maturité.  →  il faut d'AUTRES PROCESSUS

LES TROIS FAMILLES (processus de Lévy)
  DIFFUSION            changements continus              CEV
  SAUT-DIFFUSION MIXTE continu + sauts                   MERTON
  SAUT PUR             tout est saut                     VARIANCE-GAMMA

VOLATILITÉ STOCHASTIQUE   dV = a(V_L − V)dt + ξ V^α dz_V     Heston si α = 0,5
IVF (arbre implicite)     σ(S,t) par la formule de DUPIRE — ajustement EXACT des vanilles

PROCÉDURES NUMÉRIQUES
  CONVERTIBLE     ajouter une BRANCHE DE DÉFAUT     max[min(Q₁,Q₂), Q₃]
  CHEMIN          valeurs REPRÉSENTATIVES de F à chaque nœud + INTERPOLATION
  BARRIÈRE        barrière INTERNE / EXTERNE · nœuds SUR la barrière · maillage adaptatif
  DEUX ACTIFS     transformer · arbre non rectangulaire · AJUSTER LES PROBABILITÉS
  AMÉRICAINES MC  LONGSTAFF-SCHWARTZ (moindres carrés) · frontière paramétrée
```

**Le problème central, énoncé par Hull.** *Le chapitre 19 a expliqué comment les traders surmontent les faiblesses du mouvement brownien géométrique **en utilisant des surfaces de volatilité**. Une surface détermine la volatilité appropriée à substituer dans Black-Scholes pour valoriser une option **plain vanilla**. ***Malheureusement, elle ne dit presque RIEN de la volatilité à utiliser pour les options EXOTIQUES.*** Supposons que la surface indique que la bonne volatilité pour une vanille à un an de strike 40 dollars est **27 %** : **c'est susceptible d'être totalement inapproprié pour valoriser une option à barrière** de même strike et même durée de vie.*

> *Les processus alternatifs de cette section **ajustent mieux les prix de marché des vanilles** que le mouvement brownien géométrique. **On peut de ce fait avoir plus confiance en eux pour valoriser les exotiques.***

## 🔴 Concept 1 — Les alternatives à Black-Scholes-Merton

### 1.1 La taxonomie

| Famille | Description | Nom |
|---|---|---|
| Le prix change **continûment**, mais suivant un processus autre que le brownien géométrique | **modèle de DIFFUSION** | CEV |
| Changements continus **superposés à des SAUTS** | **modèle MIXTE SAUT-DIFFUSION** | Merton |
| **Tous** les changements de prix sont des sauts | **modèle de SAUT PUR** | variance-gamma |

> *Ces types de processus sont connus collectivement sous le nom de **processus de LÉVY**. Grossièrement, **un processus de Lévy est un processus stochastique en temps continu à ACCROISSEMENTS INDÉPENDANTS ET STATIONNAIRES**.*

### 1.2 Le modèle CEV (élasticité de variance constante)

$$\boxed{dS=(r-q)S\,dt+\sigma S^\alpha\,dz}$$

où $\sigma$ est un paramètre de volatilité et $\alpha$ une **constante positive** *(Cox et Ross, 1976)*.

| Valeur de $\alpha$ | Comportement de la volatilité | Loi engendrée | Smile |
|---|---|---|---|
| $\alpha=1$ | constante | **c'est le mouvement brownien géométrique** | — |
| $\alpha<1$ | **augmente quand le prix BAISSE** | **queue gauche lourde**, queue droite moins lourde | **celui des ACTIONS** |
| $\alpha>1$ | **augmente quand le prix MONTE** | **queue droite lourde**, queue gauche moins lourde | volatilité implicite **croissante** en $K$ — parfois observé sur les **options sur futures** |

⚠️ **Le mécanisme d'auto-renforcement.** *Quand $\alpha<1$ : **quand le prix baisse, la volatilité augmente, ce qui rend des prix ENCORE PLUS BAS plus probables ; quand le prix monte, la volatilité diminue, ce qui rend des prix plus élevés MOINS probables**.*

<details class="details--riche">
<summary>

**Les formules de valorisation CEV — les deux régimes**

</summary>

**Cas $0<\alpha<1$ :**

$$c=S_0e^{-qT}\big[1-\chi^2(a;b+2,c)\big]-Ke^{-rT}\chi^2(c;b,a)$$

$$p=Ke^{-rT}\big[1-\chi^2(c;b,a)\big]-S_0e^{-qT}\chi^2(a;b+2,c)$$

**Cas $\alpha>1$ :**

$$c=S_0e^{-qT}\big[1-\chi^2(c;-b,a)\big]-Ke^{-rT}\chi^2(a;2-b,c)$$

$$p=Ke^{-rT}\big[1-\chi^2(a;2-b,c)\big]-S_0e^{-qT}\chi^2(c;-b,a)$$

avec

$$\boxed{a=\frac{\big[Ke^{-(r-q)T}\big]^{2(1-\alpha)}}{(1-\alpha)^2v}\qquad b=\frac{1}{1-\alpha}\qquad c=\frac{S_0^{2(1-\alpha)}}{(1-\alpha)^2v}}$$

$$\boxed{v=\frac{\sigma^2}{2(r-q)(\alpha-1)}\Big[e^{2(r-q)(\alpha-1)T}-1\Big]}$$

où $\chi^2(z;k,v)$ est **la probabilité cumulée qu'une variable suivant une loi du khi-deux NON CENTRÉE, de paramètre de non-centralité $v$ et de $k$ degrés de liberté, soit inférieure à $z$**.

> ⚠️ ***Le modèle CEV est particulièrement utile pour valoriser les options exotiques sur ACTIONS. Ses paramètres se choisissent pour ajuster au mieux les prix des vanilles en MINIMISANT LA SOMME DES CARRÉS DES ÉCARTS entre prix du modèle et prix de marché.***

</details>

### 1.3 Le modèle mixte saut-diffusion de Merton

| Symbole | Définition |
|---|---|
| $\lambda$ | **nombre MOYEN de sauts par an** |
| $k$ | **taille moyenne d'un saut**, mesurée en **pourcentage** du prix de l'actif |

*La probabilité d'un saut sur $\Delta t$ est $\lambda\Delta t$. **Le taux de croissance moyen du prix dû aux sauts est donc $\lambda k$.*** Le processus risque-neutre :

$$\boxed{\frac{dS}{S}=(r-q-\lambda k)\,dt+\sigma\,dz+dp}$$

où $dz$ est un processus de Wiener, $dp$ **le processus de Poisson générant les sauts**, et $\sigma$ la volatilité du mouvement brownien géométrique. ***$dz$ et $dp$ sont supposés INDÉPENDANTS.***

> **La logique du drift :** on **retranche $\lambda k$** pour que le rendement espéré **TOTAL** (diffusion + sauts) reste égal à $r-q$.

<details class="details--riche">
<summary>

**Le cas normal-lognormal : la formule en série de Poisson**

</summary>

**Le cas particulier important** : le **logarithme** de la taille du saut en pourcentage est **normal**, d'écart-type $s$. Merton montre que le prix d'une option européenne s'écrit :

$$\boxed{\sum_{n=0}^{\infty}\frac{e^{-\lambda'T}(\lambda'T)^n}{n!}\,f_n}\qquad\text{avec}\qquad\boxed{\lambda'=\lambda(1+k)}$$

où $f_n$ est **le prix Black-Scholes-Merton** avec :

| Paramètre | Valeur |
|---|---|
| Rendement de dividende | $q$ |
| **Taux de variance** | $\boxed{\sigma^2+\dfrac{ns^2}{T}}$ |
| **Taux sans risque** | $\boxed{r-\lambda k+\dfrac{n\gamma}{T}}$ avec $\gamma=\ln(1+k)$ |

> ⚠️ ***Ce modèle engendre des queues gauche ET droite plus lourdes que Black-Scholes-Merton. Il peut servir à valoriser les options de CHANGE.*** *(Rappel de la fiche 91 : le smile des devises est un **sourire symétrique**.)*

**La lecture de la série :** on conditionne sur **le nombre $n$ de sauts** ; conditionnellement à $n$ sauts, la loi reste **lognormale** avec une variance augmentée de $ns^2$ ; on pondère par la **probabilité de Poisson** d'observer exactement $n$ sauts.

</details>

<details class="details--riche">
<summary>

**Simuler les sauts : la Table 26.1**

</summary>

*Quand les sauts sont générés par un processus de Poisson, **la probabilité d'exactement $m$ sauts en un temps $t$** est :*

$$\boxed{\frac{e^{-\lambda t}(\lambda t)^m}{m!}}$$

*($\lambda t$ est le **nombre moyen** de sauts sur la période.)*

**Exemple :** $\lambda=0{,}5$ saut par an, sur **2 ans** donc $\lambda t=1$ :

$$P(m)=\frac{e^{-1}\times1^m}{m!}\qquad\Rightarrow\qquad P(0)=e^{-1}=0{,}3679$$

| Nombre de sauts $m$ | Probabilité exacte | Probabilité cumulée |
|---|---|---|
| 0 | 0,3679 | 0,3679 |
| 1 | 0,3679 | 0,7358 |
| 2 | 0,1839 | 0,9197 |
| 3 | 0,0613 | 0,9810 |
| 4 | 0,0153 | 0,9963 |
| 5 | 0,0031 | 0,9994 |
| 6 | 0,0005 | 0,9999 |
| 7 | 0,0001 | 1,0000 |
| 8 | 0,0000 | 1,0000 |

*(Calculable avec la fonction POISSON d'Excel.)*

**La procédure de simulation, à chaque essai :**

| Étape | Contenu |
|---|---|
| **1** | déterminer **le NOMBRE de sauts** : tirer un uniforme sur $[0,1]$ et utiliser la table comme **table de correspondance** — entre 0 et 0,3679 aucun saut ; entre 0,3679 et 0,7358 un saut ; entre 0,7358 et 0,9197 deux sauts ; etc. |
| **2** | déterminer **la TAILLE de chaque saut** : tirer dans la loi de taille de saut **une fois par saut survenu** |
| **3** | échantillonner **SÉPARÉMENT** la composante de **diffusion** (comme fiche 92) et la composante de **saut** |
| **4** | ***s'assurer que le rendement espéré GLOBAL (des deux composantes) est le taux sans risque*** — c'est pourquoi le drift de la diffusion est $r-q-\lambda k$ |

</details>

### 1.4 Le modèle variance-gamma

*Un exemple de modèle de **saut pur** qui devient assez populaire* (Madan, Carr et Chang, 1998).

**Le processus gamma.** On définit $g$ comme la variation sur une durée $T$ d'une variable suivant un processus gamma **de taux moyen 1 et de taux de variance $v$**.

> ⚠️ ***Un processus gamma est un processus de SAUT PUR où de PETITS sauts surviennent TRÈS FRÉQUEMMENT et de GRANDS sauts seulement OCCASIONNELLEMENT.***

$$\boxed{\text{densité de }g\ :\ \frac{g^{T/v-1}e^{-g/v}}{v^{T/v}\,\Gamma(T/v)}}$$

*(Calculable dans Excel par `GAMMADIST(g, T/v, v, FALSE)` pour la densité, `TRUE` pour la cumulée.)*

**Le conditionnement.** En monde risque-neutre, **conditionnellement à $g$**, $\ln S_T$ est **normal** :

$$\boxed{\text{moyenne conditionnelle}=\ln S_0+(r-q)T+\omega+\theta g}\qquad\boxed{\text{écart-type conditionnel}=\sigma\sqrt g}$$

$$\boxed{\omega=\frac{T}{v}\ln\!\left(1-\theta v-\frac{\sigma^2v}{2}\right)}$$

**Les trois paramètres** :

| Paramètre | Rôle |
|---|---|
| $v$ | le **taux de variance** du processus gamma |
| $\sigma$ | la **volatilité** |
| $\theta$ | un paramètre définissant l'**ASYMÉTRIE** : $\theta=0$ → $\ln S_T$ **symétrique** ; $\theta<0$ → **asymétrie négative** (comme les actions) ; $\theta>0$ → asymétrie positive |

⚠️ *Noter que **tous ces paramètres sont susceptibles de CHANGER quand on passe du monde réel au monde risque-neutre** — contrairement aux modèles de **diffusion pure** où la volatilité reste la même.*

<details class="details--riche">
<summary>

**La simulation en trois étapes, et l'interprétation de $g$**

</summary>

**Les cellules de départ** : E1 à E7 contiennent $T$, $v$, $\theta$, $\sigma$, $r$, $q$, $S_0$ ; E8 contient $\omega$ :

```
= $E$1 * LN(1 - $E$3*$E$2 - $E$4*$E$4*$E$2/2) / $E$2
```

| Étape | Formule Excel |
|---|---|
| **1 — tirer $g$** | `= GAMMAINV(RAND(); $E$1/$E$2; $E$2)` en A1…A10000 |
| **2 — tirer $z$**, normal de moyenne $\theta g$ et d'écart-type $\sigma\sqrt g$ | `= A1*$E$3 + SQRT(A1)*$E$4*NORMSINV(RAND())` en B1…B10000 |
| **3 — calculer $S_T$** | `= $E$7*EXP(($E$5-$E$6)*$E$1 + B1 + $E$8)` en C1…C10000 |

$$\boxed{S_T=S_0\exp\big[(r-q)T+\omega+z\big]}$$

> ⚠️ **L'interprétation économique de $g$, à retenir.** ***$g$ définit le RYTHME AUQUEL L'INFORMATION ARRIVE pendant la durée $T$.*** *Si $g$ est **grand**, beaucoup d'information arrive et le tirage normal a une **moyenne et une variance relativement grandes**. Si $g$ est **petit**, peu d'information arrive et le tirage a une **moyenne et une variance petites**. **$T$ est la mesure de temps usuelle ; $g$ est parfois appelé le TEMPS ÉCONOMIQUE, ou le temps ajusté du flux d'information.***

**Le comportement du modèle.** *La figure 26.1 compare la loi variance-gamma ($S_0=100$, $T=0{,}5$, $v=0{,}5$, $\theta=0{,}1$, $\sigma=0{,}2$, $r=q=0$) à la lognormale de même volatilité 20 %. **La variance-gamma a des queues PLUS LOURDES.***

| Propriété du smile variance-gamma | Détail |
|---|---|
| Forme | **en U** — pas nécessairement symétrique |
| Maturités courtes | **très prononcé** |
| Maturités longues | il **« s'éteint »** |
| Ajustement | possible sur les vanilles **actions OU change** |

</details>

## 🔴 Concept 2 — La volatilité stochastique

### 2.1 Le cas déterministe d'abord

Si la volatilité est une **fonction connue du temps** :

$$\boxed{dS=(r-q)S\,dt+\sigma(t)S\,dz}\;\text{(26.1)}$$

> ⚠️ ***Les formules de Black-Scholes-Merton sont alors CORRECTES, pourvu que le taux de variance soit fixé égal au taux de variance MOYEN pendant la vie de l'option.***

**L'exemple chiffré.** Volatilité **20 % les 6 premiers mois**, **30 % les 6 suivants**. Le taux de variance moyen :

$$0{,}5\times0{,}20^2+0{,}5\times0{,}30^2=0{,}5\times0{,}04+0{,}5\times0{,}09=\mathbf{0{,}065}$$

$$\sqrt{0{,}065}=0{,}255=\mathbf{25{,}5\ \%}$$

⚠️ **Le piège à éviter :** ***on moyenne les VARIANCES, pas les volatilités*** — la moyenne des volatilités donnerait 25,0 %, ce qui est faux.

### 2.2 Le vrai modèle à deux variables d'état

$$\boxed{\frac{dS}{S}=(r-q)\,dt+\sqrt V\,dz_S}\;\text{(26.2)}\qquad\boxed{dV=a(V_L-V)\,dt+\xi V^\alpha\,dz_V}\;\text{(26.3)}$$

où $a$, $V_L$, $\xi$ et $\alpha$ sont des constantes. *$V$ est **le taux de VARIANCE** de l'actif ; il a un drift qui **le ramène vers $V_L$ au rythme $a$**.*

<details class="details--riche">
<summary>

**Le résultat de Hull et White (1987) — le cas non corrélé**

</summary>

> ***Quand la volatilité est stochastique mais NON CORRÉLÉE au prix de l'actif, le prix d'une option européenne est LE PRIX BLACK-SCHOLES-MERTON INTÉGRÉ SUR LA LOI DE PROBABILITÉ DU TAUX DE VARIANCE MOYEN pendant la vie de l'option.***

$$\boxed{\int_0^\infty c(\bar V)\,g(\bar V)\,d\bar V}$$

où $\bar V$ est la valeur **moyenne** du taux de variance, $c$ le prix Black-Scholes exprimé comme fonction de $\bar V$, et $g$ la **densité de $\bar V$ en monde risque-neutre**. *Ce résultat est **indépendant du processus suivi par le taux de variance**.*

**La conséquence, à connaître :**

| Moneyness | Effet de Black-Scholes |
|---|---|
| **À la monnaie ou proche** | **SURÉVALUE** |
| **Très dans la monnaie ou très en dehors** | **SOUS-ÉVALUE** |

*Ce modèle est **cohérent avec le profil de volatilités implicites observé pour les options de CHANGE** (fiche 91, §19.2) — le **sourire symétrique**.*

**Le cas corrélé.** *Il est **plus compliqué**. Les prix s'obtiennent par **Monte-Carlo**. Dans le cas particulier $\alpha=0{,}5$, **Hull et White fournissent un développement en série et HESTON un résultat ANALYTIQUE** (1993). **Le profil obtenu quand la volatilité est NÉGATIVEMENT corrélée au prix est similaire à celui observé pour les ACTIONS** (fiche 91, §19.3) — le **skew décroissant**.*

**Le lien avec GARCH.** *EWMA et GARCH(1,1) (fiche 94) sont des **approches alternatives** de caractérisation d'un modèle de volatilité stochastique. **Duan** (1995) montre qu'il est possible d'utiliser **GARCH(1,1) comme base d'un modèle de valorisation d'options intérieurement cohérent**.*

**L'impact pratique, quantifié.**

| Horizon / mesure | Impact |
|---|---|
| Options de **moins d'un an**, en **absolu** | *assez **petit*** (mais **en pourcentage, il peut être assez grand** pour les options très en dehors de la monnaie) |
| Options **plus longues** | *progressivement **plus grand*** |
| **Performance de la couverture en delta** | ***généralement TRÈS grand*** — c'est pourquoi les traders surveillent leur exposition par le **vega** |

</details>

## 🟠 Concept 3 — Le modèle IVF (fonction de volatilité implicite)

**La motivation.** *Les modèles précédents peuvent être **approximativement** ajustés aux vanilles. **Les institutions veulent parfois aller plus loin et utiliser un modèle qui fournit un ajustement EXACT.*** **La raison pratique :** *si la banque n'utilise pas un tel modèle, **il y a un danger que ses propres traders passent leur temps à ARBITRER les modèles internes de la banque**.*

*Développé en **1994** par **Derman et Kani**, **Dupire**, et **Rubinstein**. Connu sous le nom de **modèle IVF** ou **modèle d'arbre implicite**. **Il fournit un ajustement EXACT aux prix d'options européennes observés un jour donné, QUELLE QUE SOIT LA FORME de la surface de volatilité.***

$$\boxed{dS=\big[r(t)-q(t)\big]S\,dt+\sigma(S,t)S\,dz}$$

où $r(t)$ est le **taux forward instantané** pour un contrat maturant en $t$ et $q(t)$ le rendement de dividende en fonction du temps. **$\sigma(S,t)$ est fonction de $S$ ET de $t$**, choisie pour que le modèle valorise toutes les européennes de façon cohérente avec le marché.

**La formule de Dupire** (également Andersen et Brotherton-Ratcliffe) :

$$\boxed{\big[\sigma(K,T)\big]^2=2\,\frac{\partial c_{\text{mkt}}/\partial T+q(T)c_{\text{mkt}}+K\big[r(T)-q(T)\big]\,\partial c_{\text{mkt}}/\partial K}{K^2\big(\partial^2c_{\text{mkt}}/\partial K^2\big)}}\;\text{(26.4)}$$

où $c_{\text{mkt}}(K,T)$ est le **prix de marché** d'un call européen de strike $K$ et maturité $T$. *Si un nombre suffisamment grand de prix de calls est disponible, cette équation permet d'estimer la fonction $\sigma(S,t)$.* *Un **lissage** de la surface observée est typiquement nécessaire.*

| Implémentation | Auteurs |
|---|---|
| (26.4) + **différences finies implicites** | Andersen et Brotherton-Ratcliffe |
| **Arbre implicite** cohérent avec les prix d'options | Derman-Kani et Rubinstein |

<details class="details--riche">
<summary>

**Ce que l'IVF fait bien — et ce qu'il rate**

</summary>

*En pratique, **le modèle IVF est RECALIBRÉ QUOTIDIENNEMENT** aux prix des vanilles. **C'est un outil pour valoriser les exotiques de façon cohérente avec les vanilles.***

**Le raisonnement (fiche 91) :** *les vanilles **définissent la loi de probabilité risque-neutre du prix de l'actif à TOUS les instants futurs**. Il s'ensuit que **le modèle IVF obtient CORRECTEMENT la loi risque-neutre à tous les instants futurs**.*

| Type d'option | Verdict |
|---|---|
| Payoff à **UN SEUL instant** (all-or-nothing, asset-or-nothing) | **correctement valorisée** |
| Payoff dépendant de **PLUSIEURS instants** (composées, barrières) | ***le modèle n'obtient PAS nécessairement correctement la loi JOINTE du prix à deux instants ou plus : ces exotiques peuvent être MAL valorisées*** |

**Le test empirique de Hull et Suo.** *En supposant que tous les prix de dérivés sont déterminés par un modèle de volatilité stochastique, ils trouvent que **le modèle IVF fonctionne raisonnablement bien pour les options COMPOSÉES, mais donne parfois des ERREURS SÉRIEUSES pour les options à BARRIÈRE**.*

</details>

## 🔴 Concept 4 — Les obligations convertibles

### 4.1 Le produit et le rôle du risque de crédit

> ***Des obligations émises par une entreprise où le détenteur a l'option de les échanger contre l'action de l'entreprise à certaines dates futures.***

| Terme | Définition |
|---|---|
| **Ratio de conversion** | le **nombre d'actions** obtenues pour une obligation (peut être fonction du temps) |
| **Clause de rappel** (*callable*) | *les obligations sont **presque toujours** rappelables : l'émetteur a le droit de les racheter à certaines dates à des prix prédéterminés* |
| **Droit de conversion après rappel** | ***le détenteur a TOUJOURS le droit de convertir une fois l'obligation rappelée*** |

> ⚠️ ***La clause de rappel est donc habituellement un moyen de FORCER la conversion PLUS TÔT que le détenteur ne l'aurait autrement choisi.*** *Parfois l'option de rappel de l'émetteur est **conditionnelle** au fait que le cours dépasse un certain niveau.*

**Le rôle du crédit.** ***Si le risque de crédit est ignoré, on obtient de MAUVAIS prix, parce que les coupons et le principal sont SURÉVALUÉS.***

| Modèle | Principe |
|---|---|
| **Ingersoll (1977)** | comme Merton (1974, fiche 95) : brownien géométrique pour **les ACTIFS TOTAUX** de l'émetteur ; capitaux propres, dette convertible et autre dette modélisés comme **créances contingentes sur la valeur des actifs**. Le crédit est pris en compte car **les créanciers ne sont remboursés intégralement que si la valeur des actifs dépasse ce qui leur est dû** |
| **Le modèle simple, largement utilisé en pratique** | modéliser **le COURS DE L'ACTION** : brownien géométrique, **sauf qu'il y a une probabilité $\lambda\Delta t$ de DÉFAUT sur chaque courte période**. ***En cas de défaut, le cours tombe à ZÉRO et il y a un recouvrement sur l'obligation.*** $\lambda$ est **l'intensité de défaut risque-neutre** (fiche 95) |

### 4.2 L'arbre avec branche de défaut

À chaque nœud, **trois** issues au lieu de deux :

| Issue | Probabilité |
|---|---|
| Hausse proportionnelle $u$ | $p_u$ |
| Baisse proportionnelle $d$ | $p_d$ |
| **DÉFAUT**, le cours tombant à **zéro** | $\lambda\Delta t$, plus précisément $\boxed{1-e^{-\lambda\Delta t}}$ |

Les paramètres, **choisis pour apparier les deux premiers moments** :

$$\boxed{p_u=\frac{a-de^{-\lambda\Delta t}}{u-d}\qquad p_d=\frac{ue^{-\lambda\Delta t}-a}{u-d}\qquad u=e^{\sqrt{(\sigma^2-\lambda)\Delta t}}\qquad d=\frac1u}$$

avec $a=e^{(r-q)\Delta t}$.

> ⚠️ **Noter le $\sigma^2-\lambda$ sous la racine** : une partie de la variance totale est déjà fournie par **le saut à zéro**, il faut donc la **retrancher** de la volatilité de diffusion.

**La règle de remontée** — trois valeurs à comparer à chaque nœud :

$$\boxed{\max\big[\min(Q_1,Q_2),\ Q_3\big]}$$

| Symbole | Signification |
|---|---|
| $Q_1$ | la valeur donnée par **la remontée** (ni convertie ni rappelée) |
| $Q_2$ | le **prix de rappel** |
| $Q_3$ | la valeur **si conversion** |

*La logique : **on teste d'abord si la conversion est optimale, puis si l'émetteur peut améliorer sa position en RAPPELANT ; si oui, on suppose le rappel et on RE-TESTE si la conversion est optimale**.*

<details class="details--riche">
<summary>

**Exemple 26.1 — l'arbre du convertible entièrement reconstruit**

</summary>

**Données.** Obligation **zéro-coupon à 9 mois** émise par XYZ, valeur faciale **100 dollars**, échangeable contre **2 actions** à tout moment pendant les 9 mois, **rappelable à 113** à tout moment. $S_0=50$, $\sigma=30\,\%$, **pas de dividende**, $\lambda=1\,\%$ par an, taux sans risque **5 %** pour toutes maturités, **recouvrement 40 %** (l'obligation vaut **40** en cas de défaut).

*Étape 1 — les paramètres de l'arbre*, avec $\Delta t=0{,}25$ (3 pas) :

$$u=e^{\sqrt{(0{,}09-0{,}01)\times0{,}25}}=e^{\sqrt{0{,}02}}=\mathbf{1{,}1519}\qquad d=1/u=\mathbf{0{,}8681}$$

$$a=e^{0{,}05\times0{,}25}=\mathbf{1{,}0126}\qquad p_u=\mathbf{0{,}5167}\qquad p_d=\mathbf{0{,}4808}$$

$$\text{probabilité de défaut}=1-e^{-0{,}01\times0{,}25}=\mathbf{0{,}002497}$$

*Aux trois nœuds de défaut, **le cours est zéro et l'obligation vaut 40**.*

*Étape 2 — l'arbre des cours :*

| Date | Cours |
|---|---|
| $t=0$ | 50,00 |
| $t=0{,}25$ | 43,41 · 57,60 |
| $t=0{,}50$ | 37,68 · 50,00 · 66,34 |
| $t=0{,}75$ | 32,71 · 43,41 · 57,60 · 76,42 |

*Étape 3 — les nœuds finaux.* *Aux nœuds **G** (76,42) et **H** (57,60), **l'obligation doit être convertie** et vaut **deux fois le cours** : 152,85 et 115,19. Aux nœuds **I** (43,41) et **J** (32,71), **elle ne doit pas être convertie** et vaut **100**.*

*Étape 4 — le nœud E ($t=0{,}5$, $S=50$), détaillé.* Converti : $2\times50=100$. Non converti :

- probabilité **0,5167** d'aller en **H**, où l'obligation vaut **115,19** ;
- probabilité **0,4808** d'aller en **I**, où elle vaut **100** ;
- probabilité **0,002497** de **défaut**, où elle vaut **40**. $$(0{,}5167\times115{,}19+0{,}4808\times100+0{,}002497\times40)\,e^{-0{,}05\times0{,}25}=\mathbf{106{,}36}$$ *C'est **plus que 100** : **il ne vaut pas la peine de convertir en E**. Et l'émetteur **ne rappellerait pas** en E, car cela reviendrait à **offrir 113 pour une obligation valant 106,36**.*

*Étape 5 — le nœud D ($t=0{,}5$, $S=66{,}34$).* Non converti : **132,79**. **Mais l'obligation est RAPPELÉE, ce qui FORCE la conversion et RÉDUIT la valeur au nœud à $2\times66{,}34=\mathbf{132{,}69}$.**

*Étape 6 — le nœud B ($t=0{,}25$, $S=57{,}596$).* Converti : $2\times57{,}596=115{,}19$. Non converti : **118,31**. *Le détenteur choisirait donc de **ne pas convertir**. **Mais à ce stade l'émetteur RAPPELLE pour 113, et le détenteur décide alors que convertir vaut mieux qu'être rappelé.** La valeur en B est donc **115,19**.*

*Étape 7 — les nœuds F et C.*

$$F=(0{,}5167\times100+0{,}4808\times100+0{,}002497\times40)e^{-0{,}0125}=\mathbf{98{,}61}$$

$$C=(0{,}5167\times106{,}36+0{,}4808\times98{,}61+0{,}002497\times40)e^{-0{,}0125}=\mathbf{101{,}20}$$

*(conversion en C : $2\times43{,}41=86{,}81$, **moins avantageux**)*

*Étape 8 — le nœud A :*

$$(0{,}5167\times115{,}19+0{,}4808\times101{,}20+0{,}002497\times40)e^{-0{,}0125}=\boxed{\mathbf{106{,}93}}$$

**La valeur du convertible est sa valeur au nœud initial : 106,93.**

</details>

**Les extensions et la limite.**

> *Quand des **intérêts** sont versés, il faut en tenir compte : **à chaque nœud, en valorisant l'obligation sur l'hypothèse qu'elle n'est pas convertie, la valeur actuelle de tout intérêt payable au pas de temps suivant doit être INCLUSE**.*
>
> *L'intensité risque-neutre $\lambda$ s'estime à partir **des prix d'obligations ou des spreads de CDS**. Dans une implémentation plus générale, $\lambda$, $\sigma$ et $r$ sont **fonctions du temps** : cela se traite par un **arbre TRINOMIAL** plutôt que binomial.*
>
> ⚠️ ***Un inconvénient du modèle présenté : la probabilité de défaut est INDÉPENDANTE DU COURS DE L'ACTION.*** *D'où la suggestion d'une implémentation par **différences finies implicites** où $\lambda$ est fonction du cours **et** du temps — Andersen et Buffum suggèrent $\lambda$ **inversement proportionnelle à $S^\alpha$**.

## 🔴 Concept 5 — Les dérivés dépendant du chemin

### 5.1 Les deux conditions

> ***Un dérivé dépendant du chemin est un dérivé dont le payoff dépend du CHEMIN suivi par le prix, pas seulement de sa valeur finale.*** *Les asiatiques et les lookbacks en sont des exemples.*

**Le problème de Monte-Carlo** : *le temps de calcul pour atteindre la précision requise peut être **inacceptablement élevé**, et **les dérivés de style AMÉRICAIN dépendant du chemin ne se traitent pas facilement**.*

**Les deux conditions pour que la méthode par arbre fonctionne** *(Hull et White, 1993)* :

$$\boxed{\begin{array}{l}\textbf{1. Le payoff doit dépendre d'UNE SEULE fonction }F\text{ du chemin suivi.}\\[2pt]\textbf{2. On doit pouvoir calculer }F\text{ en }\tau+\Delta t\text{ à partir de }F\text{ en }\tau\textbf{ et du prix en }\tau+\Delta t.\end{array}}$$

> **L'avantage :** *la procédure **peut traiter les dérivés AMÉRICAINS dépendant du chemin** et est **computationnellement PLUS EFFICACE que Monte-Carlo** même pour les européens.*

<details class="details--riche">
<summary>

**L'illustration : un lookback flottant AMÉRICAIN**

</summary>

**Données.** Put lookback flottant américain sur action sans dividende : $S_0=50$, $\sigma=40\,\%$, $r=10\,\%$, vie **3 mois**, arbre binomial à **3 pas**. Donc $\Delta t=0{,}08333$, $u=1{,}1224$, $d=0{,}8909$, $a=1{,}0084$, $p=0{,}5073$.

*Le payoff si exercé en $\tau$ : **le montant par lequel le maximum atteint entre 0 et $\tau$ dépasse le cours courant**.*

**La structure de l'arbre.** À chaque nœud on empile **trois niveaux de nombres** :

1. le **cours** ;
2. les **maximums possibles** atteignables sur les chemins menant au nœud ;
3. les **valeurs du dérivé** correspondant à chacun de ces maximums.

*Aux nœuds finaux, la valeur est simplement **maximum moins cours réel**.*

**Le nœud A, où le cours est 50.** Le maximum atteint jusque-là est **soit 56,12, soit 50**.

*Cas 1 — le maximum vaut 50.*

| Mouvement | Nouveau maximum | Valeur du dérivé |
|---|---|---|
| Hausse | 56,12 | **0** |
| Baisse | reste **50** | **5,45** |

$$\text{valeur sans exercice}=(0\times0{,}5073+5{,}45\times0{,}4927)e^{-0{,}1\times0{,}08333}=\mathbf{2{,}66}$$

***Il n'est clairement pas intéressant d'exercer** : le payoff serait **zéro** (le maximum égale le cours).*

*Cas 2 — le maximum vaut 56,12.*

$$(0\times0{,}5073+11{,}57\times0{,}4927)e^{-0{,}1\times0{,}08333}=\mathbf{5{,}65}$$

*L'exercice donne $56{,}12-50=\mathbf{6{,}12}$ : **c'est la stratégie OPTIMALE**.*

**En remontant ainsi tout l'arbre, la valeur du lookback américain est 5,47.**

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi le lookback ne pose pas de problème :</span>

*le nombre de valeurs alternatives du maximum à un nœud d'un arbre à $n$ pas **n'est jamais supérieur à $n$**.*

</div>

</details>

### 5.2 La généralisation : valeurs représentatives et interpolation

*L'approche est faisable **quand le nombre de valeurs alternatives de $F$ à chaque nœud ne croît pas trop vite**. **Heureusement, elle peut être ÉTENDUE au cas où il y a un très grand nombre de valeurs possibles.***

| Étape | Contenu |
|---|---|
| **1** | **Travailler VERS L'AVANT** dans l'arbre pour établir les **valeurs MAXIMALE et MINIMALE de $F$ à chaque nœud**. *(La condition 2 garantit que celles des nœuds de $\tau+\Delta t$ se déduisent simplement de celles de $\tau$.)* |
| **2** | **Choisir des valeurs REPRÉSENTATIVES de $F$ à chaque nœud.** *Règle simple : le **maximum**, le **minimum**, et un certain nombre d'autres valeurs **également espacées** entre les deux* |
| **3** | En **remontant** l'arbre, valoriser le dérivé **pour chacune des valeurs représentatives** |
| **4** | **Quand la valeur est requise pour une AUTRE valeur du chemin, on la calcule par INTERPOLATION** entre les valeurs connues |

<details class="details--riche">
<summary>

**Le nœud X d'un call asiatique — le calcul exemplaire**

</summary>

**Données.** Average price call, $S_0=50$, $K=50$, $r=10\,\%$, $\sigma=40\,\%$, $T=1$ an, **20 pas** : $\Delta t=0{,}05$, $u=1{,}0936$, $d=0{,}9144$, $p=0{,}5056$, $1-p=0{,}4944$. **La fonction de chemin $F$ est la MOYENNE ARITHMÉTIQUE.**

**La géométrie locale.** Le nœud **X** est le nœud central à $t=0{,}2$ (fin du 4ᵉ pas) ; **Y** et **Z** sont les deux nœuds à $t=0{,}25$ accessibles depuis X.

| Nœud | Cours | Moyenne **min** | Moyenne **max** | Quatre valeurs représentatives |
|---|---|---|---|---|
| **X** | 50,00 | 46,65 | 53,83 | 46,65 · 49,04 · 51,44 · 53,83 |
| **Y** | 54,68 | 47,99 | 57,39 | 47,99 · 51,12 · 54,26 · 57,39 |
| **Z** | 45,72 | 43,88 | 52,48 | 43,88 · 46,75 · 49,61 · 52,48 |

*( **Les cours initial ET final sont inclus dans le calcul de la moyenne** — d'où le diviseur 6 après 5 pas.)*

*Étape 1 — le cas où la moyenne en X vaut 51,44, branche HAUTE.* La nouvelle moyenne en Y :

$$\frac{5\times51{,}44+54{,}68}{6}=\frac{311{,}88}{6}=\mathbf{51{,}98}$$

*Étape 2 — interpoler en Y.* On connaît la valeur de l'option en Y pour les moyennes **51,12** (valeur **8,101**) et **54,26** (valeur **8,635**) :

$$\frac{(51{,}98-51{,}12)\times8{,}635+(54{,}26-51{,}98)\times8{,}101}{54{,}26-51{,}12}=\frac{7{,}426+18{,}470}{3{,}14}=\mathbf{8{,}247}$$

*Étape 3 — la branche BASSE.* La nouvelle moyenne en Z :

$$\frac{5\times51{,}44+45{,}72}{6}=\frac{302{,}92}{6}=\mathbf{50{,}49}$$

et l'interpolation donne **4,182**.

*Étape 4 — la valeur en X pour la moyenne 51,44 :*

$$(0{,}5056\times8{,}247+0{,}4944\times4{,}182)\,e^{-0{,}1\times0{,}05}=\boxed{\mathbf{6{,}206}}$$

*Les autres valeurs en X se calculent de même ; une fois toutes les valeurs à $t=0{,}2$ obtenues, on passe aux nœuds à $t=0{,}15$.*

**La convergence :**

| Configuration | Valeur |
|---|---|
| 20 pas, 4 moyennes par nœud | **7,17** |
| 60 pas, 100 moyennes par nœud | **5,58** |
| Approximation analytique, moyenne continue (fiche 97) | **5,62** |

> ⚠️ ***L'avantage clé de la méthode : elle traite les options AMÉRICAINES.*** *Les calculs sont identiques, sauf qu'**on teste l'exercice anticipé à chaque nœud POUR CHACUNE des valeurs alternatives de la fonction de chemin**. (En pratique, la décision d'exercice dépend **à la fois** de la valeur du chemin **et** du prix de l'actif.)*

| Version **américaine** du même call asiatique | Valeur |
|---|---|
| 20 pas, 4 moyennes | **7,77** |
| 60 pas, 100 moyennes | **6,17** |

⚠️ *L'efficacité est **quelque peu améliorée** si l'interpolation est **QUADRATIQUE** plutôt que linéaire.*

*(Note : le texte du chapitre 26 renvoie à « l'exemple 25.2 de la section 25.12 » pour cette option asiatique ; dans le chapitre 25 c'est **l'exemple 25.3**. Simple décalage de numérotation.)*

</details>

## 🔴 Concept 6 — Les barrières, numériquement

### 6.1 Le problème de convergence

*En principe, beaucoup de barrières se valorisent par les arbres du chapitre 20 : **pour une up-and-out, on valorise comme une option ordinaire sauf que, lorsqu'un nœud AU-DESSUS de la barrière est rencontré, on met la valeur à ZÉRO**.*

> ⚠️ ***Les arbres TRINOMIAUX marchent mieux que les binomiaux, mais même pour eux la convergence est TRÈS LENTE avec l'approche simple. La raison : LA BARRIÈRE SUPPOSÉE PAR L'ARBRE EST DIFFÉRENTE DE LA VRAIE BARRIÈRE.***

| Terme | Définition |
|---|---|
| **Barrière INTERNE** | celle formée par les nœuds **juste à l'INTÉRIEUR** de la vraie barrière (**plus près du centre** de l'arbre) |
| **Barrière EXTERNE** | celle formée par les nœuds **juste à l'EXTÉRIEUR** (**plus loin du centre**) |

*Les calculs usuels supposent **implicitement que la barrière EXTERNE est la vraie**, parce que les conditions de barrière sont d'abord utilisées aux nœuds sur cette barrière. **Quand le pas de temps est $\Delta t$, l'espacement vertical entre nœuds est d'ordre $\sqrt{\Delta t}$.***

**Le remède 1 — l'interpolation :**

| Étape | Contenu |
|---|---|
| 1 | calculer le prix en supposant que **la barrière INTERNE est la vraie** |
| 2 | calculer le prix en supposant que **la barrière EXTERNE est la vraie** |
| 3 | **interpoler** entre les deux prix |

### 6.2 Le remède 2 — placer les nœuds SUR la barrière

<details class="details--riche">
<summary>

**Le choix de $u$ et de $N$, et les probabilités trinomiales**

</summary>

**Le principe.** Dans un arbre trinomial il y a trois mouvements : monter de $u$, rester identique, descendre de $d=1/u$. ***On peut TOUJOURS choisir $u$ de sorte que des nœuds tombent SUR la barrière.*** La condition :

$$H=S_0u^N\qquad\Longleftrightarrow\qquad\ln H=\ln S_0+N\ln u$$

pour un entier $N$ **positif ou négatif**.

*Rappel (fiche 92) : la valeur suggérée pour $u$ dans un trinomial est $e^{\sigma\sqrt{3\Delta t}}$, donc $\ln u=\sigma\sqrt{3\Delta t}$. **La bonne règle est de choisir $\ln u$ AUSSI PROCHE QUE POSSIBLE de cette valeur, tout en respectant la condition ci-dessus** :*

$$\boxed{\ln u=\frac{\ln H-\ln S_0}{N}\qquad\text{avec}\qquad N=\text{int}\!\left[\frac{\ln H-\ln S_0}{\sigma\sqrt{3\Delta t}}+0{,}5\right]}$$

où $\text{int}(x)$ est la **partie entière** de $x$. *(Le $+0{,}5$ réalise un **arrondi au plus proche**.)*

**Les probabilités**, choisies pour apparier les deux premiers moments du rendement :

$$\boxed{p_u=\frac{(r-q-\sigma^2/2)\Delta t}{2\ln u}+\frac{\sigma^2\Delta t}{2(\ln u)^2}}$$

$$\boxed{p_m=1-\frac{\sigma^2\Delta t}{(\ln u)^2}}$$

$$\boxed{p_d=-\frac{(r-q-\sigma^2/2)\Delta t}{2\ln u}+\frac{\sigma^2\Delta t}{2(\ln u)^2}}$$

*(Contrôle : $p_u+p_m+p_d=1$ , et $p_u-p_d=\dfrac{(r-q-\sigma^2/2)\Delta t}{\ln u}$ donne le drift correct.)*

</details>

### 6.3 Le remède 3 — le maillage adaptatif

*Les méthodes précédentes **marchent raisonnablement quand le prix initial n'est PAS proche de la barrière**. **Quand il en est proche**, on utilise le **modèle de maillage adaptatif** (Figlewski et Gao, 1999 ; fiche 92).*

> ***L'idée : l'efficacité de calcul peut être améliorée en GREFFANT UN ARBRE FIN SUR UN ARBRE GROSSIER, pour obtenir une modélisation plus détaillée du prix DANS LES RÉGIONS OÙ ON EN A LE PLUS BESOIN.***

| Étape | Contenu |
|---|---|
| **Géométrie** | arrangée de sorte que **les nœuds tombent SUR les barrières** |
| **Probabilités** | choisies, comme toujours, pour apparier **les deux premiers moments** |
| **1** | **remonter d'abord l'arbre GROSSIER** de la manière habituelle |
| **2** | calculer la valeur aux **nœuds supplémentaires** |
| **3** | **remonter l'arbre FIN** |

## 🟠 Concept 7 — Les options sur deux actifs corrélés

*Un problème numérique délicat : les **américaines** dépendant de deux actifs **dont les prix sont corrélés**. Trois approches.*

### 7.1 Le principe de base : deux variables NON corrélées

*Il est **relativement facile** de construire un arbre en trois dimensions pour deux variables **non corrélées** : on construit un arbre bidimensionnel pour chaque variable, puis on les **combine**. **Les probabilités des branches de l'arbre 3D sont le PRODUIT des probabilités correspondantes des arbres 2D.***

| Branche | Probabilité |
|---|---|
| $S_1$ monte, $S_2$ monte | $p_1p_2$ |
| $S_1$ monte, $S_2$ baisse | $p_1(1-p_2)$ |
| $S_1$ baisse, $S_2$ monte | $(1-p_1)p_2$ |
| $S_1$ baisse, $S_2$ baisse | $(1-p_1)(1-p_2)$ |

### 7.2 Approche A — transformer les variables

<details class="details--riche">
<summary>

**La transformation de Hull-White qui décorrèle**

</summary>

**Les processus risque-neutres :**

$$dS_1=(r-q_1)S_1\,dt+\sigma_1S_1\,dz_1\qquad dS_2=(r-q_2)S_2\,dt+\sigma_2S_2\,dz_2$$

avec une corrélation instantanée $\rho$ entre $dz_1$ et $dz_2$, d'où

$$d\ln S_1=(r-q_1-\sigma_1^2/2)\,dt+\sigma_1\,dz_1\qquad d\ln S_2=(r-q_2-\sigma_2^2/2)\,dt+\sigma_2\,dz_2$$

*Étape 1 — définir deux nouvelles variables **non corrélées** :*

$$\boxed{x_1=\sigma_2\ln S_1+\sigma_1\ln S_2\qquad x_2=\sigma_2\ln S_1-\sigma_1\ln S_2}$$

*Étape 2 — leurs processus :*

$$dx_1=\big[\sigma_2(r-q_1-\sigma_1^2/2)+\sigma_1(r-q_2-\sigma_2^2/2)\big]dt+\sigma_1\sigma_2\sqrt{2(1+\rho)}\,dz_A$$

$$dx_2=\big[\sigma_2(r-q_1-\sigma_1^2/2)-\sigma_1(r-q_2-\sigma_2^2/2)\big]dt+\sigma_1\sigma_2\sqrt{2(1-\rho)}\,dz_B$$

où $dz_A$ et $dz_B$ sont des processus de Wiener **NON CORRÉLÉS**.

> **La logique :** la **somme** absorbe la corrélation positive ($1+\rho$), la **différence** la corrélation négative ($1-\rho$) ; les deux combinaisons sont orthogonales.

*Étape 3 — modéliser $x_1$ et $x_2$ par **deux arbres binomiaux séparés**.* Sur $\Delta t$, $x_i$ a une probabilité $p_i$ de **monter de $h_i$** et $1-p_i$ de **descendre de $h_i$** ; $h_i$ et $p_i$ sont choisis pour donner les **deux premiers moments** corrects. **Comme ils sont non corrélés, les deux arbres se combinent en un seul arbre 3D.**

*Étape 4 — revenir aux prix à chaque nœud, par les relations inverses :*

$$\boxed{S_1=\exp\!\left(\frac{x_1+x_2}{2\sigma_2}\right)\qquad S_2=\exp\!\left(\frac{x_1-x_2}{2\sigma_1}\right)}$$

</details>

### 7.3 Approche B — l'arbre non rectangulaire de Rubinstein

*Rubinstein (1994) suggère un **arrangement NON RECTANGULAIRE des nœuds**. Depuis un nœud $(S_1,S_2)$, il y a une chance de **0,25** d'aller vers chacun de :*

$$(S_1u_1,S_2A)\qquad(S_1u_1,S_2B)\qquad(S_1d_1,S_2C)\qquad(S_1d_1,S_2D)$$

$$u_1=\exp\!\big[(r-q_1-\sigma_1^2/2)\Delta t+\sigma_1\sqrt{\Delta t}\big]\qquad d_1=\exp\!\big[(r-q_1-\sigma_1^2/2)\Delta t-\sigma_1\sqrt{\Delta t}\big]$$

$$A=\exp\!\big[(r-q_2-\sigma_2^2/2)\Delta t+\sigma_2\sqrt{\Delta t}\big(\rho+\sqrt{1-\rho^2}\big)\big]$$

$$B=\exp\!\big[(r-q_2-\sigma_2^2/2)\Delta t+\sigma_2\sqrt{\Delta t}\big(\rho-\sqrt{1-\rho^2}\big)\big]$$

$$C=\exp\!\big[(r-q_2-\sigma_2^2/2)\Delta t-\sigma_2\sqrt{\Delta t}\big(\rho-\sqrt{1-\rho^2}\big)\big]$$

$$D=\exp\!\big[(r-q_2-\sigma_2^2/2)\Delta t-\sigma_2\sqrt{\Delta t}\big(\rho+\sqrt{1-\rho^2}\big)\big]$$

> ⚠️ ***Quand la corrélation est nulle, cette méthode est ÉQUIVALENTE à la construction de deux arbres séparés par la méthode alternative (l'arbre à $p=0{,}5$) de la fiche 92.***

### 7.4 Approche C — ajuster les probabilités

*L'approche la plus simple : **construire d'abord sans corrélation, puis AJUSTER les probabilités à chaque nœud**. On utilise pour chaque actif la **méthode alternative** de construction (fiche 92), **qui a la propriété que toutes les probabilités valent 0,5**.*

**Table 26.2 — combinaison sans corrélation :**

|  | $S_2$ baisse | $S_2$ monte |
|---|---|---|
| **$S_1$ monte** | 0,25 | 0,25 |
| **$S_1$ baisse** | 0,25 | 0,25 |

**Table 26.3 — probabilités ajustées pour une corrélation $\rho$ :**

|  | $S_2$ baisse | $S_2$ monte |
|---|---|---|
| **$S_1$ monte** | $\boxed{0{,}25(1-\rho)}$ | $\boxed{0{,}25(1+\rho)}$ |
| **$S_1$ baisse** | $\boxed{0{,}25(1+\rho)}$ | $\boxed{0{,}25(1-\rho)}$ |

> **Le contrôle :** la somme vaut bien **1** ; les marginales restent **0,5** ; et l'espérance du produit des signes vaut $\rho$. *(Idée proposée par Hull et White dans le contexte des arbres de taux, 1994.)*

## 🔴 Concept 8 — Monte-Carlo et options américaines

**Le dilemme.** *Monte-Carlo est **bien adapté** aux options dépendant du chemin et à celles ayant **plusieurs variables stochastiques**. **Les arbres et les différences finies sont bien adaptés aux AMÉRICAINES.*** ***Que faire si une option est À LA FOIS dépendante du chemin ET américaine ? Ou américaine ET dépendante de plusieurs variables ?***

### 8.1 L'approche des moindres carrés (Longstaff-Schwartz)

> ***Le principe : utiliser une analyse par MOINDRES CARRÉS pour déterminer la meilleure relation d'ajustement entre LA VALEUR DE CONTINUER et les valeurs des variables pertinentes, à chaque instant où une décision d'exercice anticipé doit être prise.***

<details class="details--riche">
<summary>

**L'exemple de Longstaff-Schwartz, entièrement recalculé**

</summary>

**Le problème.** Put américain **à 3 ans** sur action sans dividende, **exerçable à la fin des années 1, 2 et 3**. $r=6\,\%$ (continu), $S_0=1{,}00$, $K=1{,}10$. **Huit chemins simulés** *(pour l'illustration seulement ; en pratique on en simulerait beaucoup plus)*.

**Table 26.4 — les chemins :**

| Chemin | $t=0$ | $t=1$ | $t=2$ | $t=3$ |
|---|---|---|---|---|
| 1 | 1,00 | 1,09 | 1,08 | 1,34 |
| 2 | 1,00 | 1,16 | 1,26 | 1,54 |
| 3 | 1,00 | 1,22 | 1,07 | 1,03 |
| 4 | 1,00 | 0,93 | 0,97 | 0,92 |
| 5 | 1,00 | 1,11 | 1,56 | 1,52 |
| 6 | 1,00 | 0,76 | 0,77 | 0,90 |
| 7 | 1,00 | 0,92 | 0,84 | 1,01 |
| 8 | 1,00 | 0,88 | 1,22 | 1,34 |

**Table 26.5 — flux si exercice possible SEULEMENT en $t=3$** : payoffs $\max(1{,}10-S_3,0)$ → chemin 3 : **0,07** · chemin 4 : **0,18** · chemin 6 : **0,20** · chemin 7 : **0,09** ; les autres **0**.

**RÉGRESSION EN $t=2$.**

*Étape 1 — sélectionner les chemins DANS LA MONNAIE en $t=2$* : chemins **1, 3, 4, 6, 7** ($S<1{,}10$).

*Étape 2 — les données.* $S$ : **1,08 · 1,07 · 0,97 · 0,77 · 0,84**. $V$ (valeur de continuer, **actualisée en $t=2$**) : $0{,}00$ · $0{,}07e^{-0{,}06}$ · $0{,}18e^{-0{,}06}$ · $0{,}20e^{-0{,}06}$ · $0{,}09e^{-0{,}06}$.

*Étape 3 — ajuster $V=a+bS+cS^2$* en minimisant $\sum_{i=1}^{5}(V_i-a-bS_i-cS_i^2)^2$ :

$$\boxed{V=-1{,}070+2{,}983\,S-1{,}813\,S^2}$$

*Étape 4 — comparer :*

| Chemin | Valeur de **continuer** | Valeur d'**exercer** | Décision |
|---|---|---|---|
| 1 | 0,0369 | 0,02 | **continuer** |
| 3 | 0,0461 | 0,03 | **continuer** |
| **4** | 0,1176 | **0,13** | **EXERCER** |
| **6** | 0,1520 | **0,33** | **EXERCER** |
| **7** | 0,1565 | **0,26** | **EXERCER** |

**Table 26.6 — flux si exercice possible en $t=2$ ou $t=3$** : chemin 3 → 0,07 en $t=3$ ; chemin 4 → **0,13 en $t=2$** ; chemin 6 → **0,33 en $t=2$** ; chemin 7 → **0,26 en $t=2$**.

**RÉGRESSION EN $t=1$.**

*Étape 1 — chemins dans la monnaie* : **1, 4, 6, 7, 8**. $S$ : **1,09 · 0,93 · 0,76 · 0,92 · 0,88**.

*Étape 2 — les continuations actualisées en $t=1$*, lues dans la table 26.6 : $0{,}00$ · $0{,}13e^{-0{,}06}$ · $0{,}33e^{-0{,}06}$ · $0{,}26e^{-0{,}06}$ · $0{,}00$.

*Étape 3 — la régression :*

$$\boxed{V=2{,}038-3{,}335\,S+1{,}356\,S^2}$$

*Étape 4 — comparer :*

| Chemin | **Continuer** | **Exercer** | Décision |
|---|---|---|---|
| 1 | 0,0139 | 0,01 | **continuer** |
| **4** | 0,1092 | **0,17** | **EXERCER** |
| **6** | 0,2866 | **0,34** | **EXERCER** |
| **7** | 0,1175 | **0,18** | **EXERCER** |
| **8** | 0,1533 | **0,22** | **EXERCER** |

**Table 26.7 — les flux finaux** : $t=1$ → 0,17 (ch. 4) · 0,34 (ch. 6) · 0,18 (ch. 7) · 0,22 (ch. 8) ; $t=3$ → 0,07 (ch. 3).

*Étape 5 — la valeur de l'option* : actualiser chaque flux à $t=0$ et **prendre la moyenne** :

$$\frac18\big(0{,}07e^{-0{,}06\times3}+0{,}17e^{-0{,}06}+0{,}34e^{-0{,}06}+0{,}18e^{-0{,}06}+0{,}22e^{-0{,}06}\big)=\boxed{\mathbf{0{,}1144}}$$

⚠️ ***Comme 0,1144 est SUPÉRIEUR à 0,10 (la valeur intrinsèque immédiate $1{,}10-1{,}00$), il n'est PAS optimal d'exercer l'option immédiatement.***

</details>

**Les extensions de la méthode :**

- *si l'option est exerçable **à tout moment**, on approxime en considérant **un grand nombre de points d'exercice** (comme le fait un arbre binomial) ;*
- *la relation entre $V$ et $S$ peut être **plus compliquée** — par exemple **cubique** plutôt que quadratique ;*
- *la méthode s'utilise quand la décision dépend de **plusieurs variables d'état** : on **suppose une forme fonctionnelle** et on estime les paramètres par moindres carrés.*

### 8.2 La paramétrisation de la frontière d'exercice (Andersen)

> ***On PARAMÈTRE la frontière d'exercice anticipé et on détermine les valeurs optimales des paramètres ITÉRATIVEMENT, en partant de la FIN de la vie de l'option et en remontant.***

<details class="details--riche">
<summary>

**La même option, par la seconde méthode**

</summary>

**La paramétrisation.** La frontière en $t$ est un **cours critique $S^\ast(t)$** : *si le cours est **en dessous** de $S^\ast(t)$ on exerce ; s'il est **au-dessus**, on n'exerce pas.* Trivialement, $S^\ast(3)=\mathbf{1{,}10}$.

**Déterminer $S^\ast(2)$.** On essaie chaque valeur candidate et on calcule **la valeur moyenne de l'option en $t=2$** :

| $S^\ast(2)$ | Ce qui change | **Valeur moyenne en $t=2$** |
|---|---|---|
| $<0{,}77$ | aucun exercice en $t=2$ | 0,0636 |
| **0,77** | le chemin 6 exerce à **0,33** | 0,0813 |
| **0,84** | le chemin 7 exerce aussi, à **0,26** | **0,1032** ← **le maximum** |
| 0,97 | le chemin 4 exerce à **0,13** (au lieu de $0{,}18e^{-0{,}06}$) | 0,0982 |
| 1,07 | le chemin 3 exerce à **0,03** | 0,0938 |
| 1,08 | le chemin 1 exerce à **0,02** | 0,0963 |

$$\boxed{S^\ast(2)=0{,}84}\qquad\text{(plus précisément, } 0{,}84\leqslant S^\ast(2)<0{,}97\text{)}$$

**Déterminer $S^\ast(1)$**, en utilisant $S^\ast(2)=0{,}84$ :

| $S^\ast(1)$ | Ce qui change | **Valeur moyenne en $t=1$** |
|---|---|---|
| $<0{,}76$ | aucun exercice en $t=1$ | $0{,}1032\,e^{-0{,}06}=0{,}0972$ |
| 0,76 | le chemin 6 exerce à **0,34** | 0,1008 |
| **0,88** | le chemin 8 exerce aussi, à **0,22** | **0,1283** ← **le maximum** |
| 0,92 | le chemin 7 exerce à **0,18** | 0,1202 |
| 0,93 | le chemin 4 exerce à **0,17** | 0,1215 |
| 1,09 | le chemin 1 exerce à **0,01** | 0,1228 |

$$\boxed{S^\ast(1)=0{,}88}\qquad\text{(plus précisément, } 0{,}88\leqslant S^\ast(1)<0{,}92\text{)}$$

*La valeur de l'option en $t=0$ sans exercice immédiat :*

$$0{,}1283\,e^{-0{,}06\times1}=\boxed{\mathbf{0{,}1208}}$$

**C'est supérieur à 0,10 : on n'exerce pas immédiatement.**

⚠️ **La procédure réelle.** *En pratique, **des DIZAINES DE MILLIERS de simulations** servent à déterminer la frontière. **Une fois la frontière obtenue, LES CHEMINS SONT JETÉS et une NOUVELLE simulation de Monte-Carlo utilisant cette frontière est menée pour valoriser l'option.*** *Notre exemple est simple en ce que la frontière se définit entièrement par le cours ; dans des situations plus compliquées **il faut faire des hypothèses sur la façon de paramétrer la frontière**.*

</details>

### 8.3 Les bornes supérieures

> ⚠️ ***Les DEUX approches présentées tendent à SOUS-ÉVALUER les américaines, parce qu'elles supposent une frontière d'exercice SOUS-OPTIMALE.***

*Cela a conduit **Andersen et Broadie** (2004) à proposer une procédure fournissant une **BORNE SUPÉRIEURE** du prix. **Elle s'utilise conjointement avec n'importe quel algorithme produisant une borne inférieure et localise la vraie valeur d'une américaine PLUS PRÉCISÉMENT que l'algorithme seul.***

## Comment reconnaître le type d'exercice

| Indice dans l'énoncé | Méthode à déclencher |
|---|---|
| $dS=(r-q)S\,dt+\sigma S^\alpha dz$ | **CEV** : lire le signe de $\alpha-1$ pour le smile |
| « $\lambda$ sauts par an », « taille moyenne $k$ » | **Merton** : drift $r-q-\lambda k$, série de **Poisson** |
| « probabilité de $m$ sauts » | $e^{-\lambda t}(\lambda t)^m/m!$ |
| « processus gamma », « temps économique » | **variance-gamma** : conditionner sur $g$, puis normal |
| Volatilité **connue** fonction du temps | moyenner les **VARIANCES**, pas les volatilités |
| Volatilité stochastique **non corrélée** | intégrer Black-Scholes sur la loi de $\bar V$ |
| Volatilité corrélée, $\alpha=0{,}5$ | **Heston** (analytique) |
| « ajustement EXACT des vanilles » | le modèle **IVF** et la formule de **Dupire** |
| Obligation échangeable + rappelable | **convertible** : arbre avec **branche de défaut**, $\max[\min(Q_1,Q_2),Q_3]$ |
| Payoff dépendant d'une **moyenne** ou d'un **extremum**, avec exercice anticipé | **valeurs représentatives** + interpolation |
| Barrière + convergence lente | **interner/externer** · **nœuds sur la barrière** · **maillage adaptatif** |
| Deux actifs corrélés | **transformer** ($x_1$, $x_2$) · **Rubinstein** · **ajuster les probabilités** |
| Américaine + Monte-Carlo | **Longstaff-Schwartz** ou **frontière paramétrée** |

## Comment résoudre ce type d'exercice

**A — Un arbre de convertible.**

1. $u=e^{\sqrt{(\sigma^2-\lambda)\Delta t}}$, $d=1/u$, $a=e^{(r-q)\Delta t}$.
2. $p_u=\dfrac{a-de^{-\lambda\Delta t}}{u-d}$, $p_d=\dfrac{ue^{-\lambda\Delta t}-a}{u-d}$, $p_{\text{déf}}=1-e^{-\lambda\Delta t}$.
3. Valeurs terminales : $\max(\text{ratio}\times S,\ \text{valeur faciale})$ selon la conversion optimale.
4. Remontée : $Q_1=(p_uV_u+p_dV_d+p_{\text{déf}}\times\text{recouvrement})e^{-r\Delta t}$.
5. Appliquer $\max[\min(Q_1,\text{prix de rappel}),\ \text{ratio}\times S]$.
6. Contrôle : la valeur doit dépasser à la fois la valeur obligataire nue **et** la valeur de conversion.

**B — Un arbre avec fonction de chemin.**

1. Vérifier les **deux conditions**.
2. **Balayage AVANT** : min et max de $F$ à chaque nœud.
3. Choisir $k$ valeurs représentatives **également espacées** entre min et max.
4. **Remontée** : pour chaque valeur représentative, calculer $F$ après chaque branche, **interpoler** la valeur au nœud enfant, actualiser.
5. Pour une **américaine**, tester l'exercice **pour chaque valeur représentative**.

**C — Longstaff-Schwartz.**

1. Simuler $M$ chemins ; calculer les payoffs à maturité.
2. À la date d'exercice la plus tardive avant maturité : **sélectionner les chemins DANS LA MONNAIE seulement**.
3. Régresser la **continuation actualisée** sur $1$, $S$, $S^2$.
4. **Comparer** valeur ajustée (continuer) et valeur intrinsèque (exercer) ; mettre à jour les flux.
5. **Remonter** date par date.
6. Actualiser tous les flux à 0 et **moyenner**. Comparer à la valeur intrinsèque initiale.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Utiliser la volatilité implicite d'une vanille pour une exotique | c'est **le problème central du chapitre** : elle est **inappropriée** |
| Croire que $\alpha<1$ donne une queue **droite** lourde | non : $\alpha<1$ → **queue GAUCHE lourde**, le smile des **actions** |
| Oublier le $-\lambda k$ dans le drift de Merton | il compense la croissance apportée par les **sauts** |
| Prendre $\lambda$ au lieu de $\lambda'=\lambda(1+k)$ dans la série | c'est bien $\lambda'$ qui pondère |
| Croire que les paramètres variance-gamma sont les mêmes en réel et en risque-neutre | **ils changent tous** — contrairement aux diffusions pures |
| Moyenner les **volatilités** quand $\sigma(t)$ est déterministe | moyenner les **VARIANCES** : $\sqrt{0{,}5(0{,}04)+0{,}5(0{,}09)}=25{,}5\,\%$, pas 25 % |
| Croire que l'IVF valorise tout correctement | il obtient la loi **marginale** correcte, **pas la loi JOINTE** : erreurs sur les **barrières** |
| Ignorer le risque de crédit sur un convertible | coupons et principal **surévalués** |
| Oublier de retrancher $\lambda$ sous la racine de $u$ | $u=e^{\sqrt{(\sigma^2-\lambda)\Delta t}}$ — le saut fournit déjà de la variance |
| Tester la conversion **avant** le rappel seulement | il faut $\max[\min(Q_1,Q_2),Q_3]$ : rappeler **puis re-tester** la conversion |
| Croire que le rappel réduit toujours la valeur pour le détenteur | il **force la conversion** : en D, 132,79 → **132,69** ; en B, 118,31 → **115,19** |
| Omettre $S_0$ et $S_T$ du calcul de la moyenne asiatique | ils sont **inclus** — d'où le diviseur 6 après 5 pas |
| Utiliser la barrière **externe** sans le savoir | c'est ce que fait l'arbre **par défaut** ; interpoler ou **placer les nœuds sur la barrière** |
| Prendre $\ln u=\sigma\sqrt{3\Delta t}$ quand il faut des nœuds sur la barrière | il faut $\ln u=\dfrac{\ln H-\ln S_0}{N}$ avec $N$ arrondi |
| Multiplier les probabilités quand les actifs sont **corrélés** | le produit ne vaut que pour des variables **non corrélées** |
| Régresser sur **tous** les chemins dans Longstaff-Schwartz | **seulement les chemins DANS LA MONNAIE** |
| Comparer la continuation **simulée** à l'exercice | comparer la valeur **AJUSTÉE par la régression**, pas la réalisation |
| Croire que Longstaff-Schwartz donne la valeur exacte | il **SOUS-ÉVALUE** (frontière sous-optimale) — d'où les bornes d'Andersen-Broadie |

## 📌 Ultimate Review

| Élément | Formule / valeur |
|---|---|
| **Le problème** | la surface de volatilité **ne dit rien** de la volatilité des exotiques |
| **Les trois familles** | **diffusion** · **saut-diffusion mixte** · **saut pur** = processus de **Lévy** |
| **CEV** | $dS=(r-q)S\,dt+\sigma S^\alpha dz$ |
| **$\alpha=1$** | mouvement brownien géométrique |
| **$\alpha<1$** | vol ↑ quand $S$ ↓ → **queue gauche lourde** → smile **actions** |
| **$\alpha>1$** | vol ↑ quand $S$ ↑ → smile croissant → **options sur futures** |
| **Loi utilisée** | **khi-deux NON CENTRÉE** $\chi^2(z;k,v)$ |
| **Merton** | $\dfrac{dS}{S}=(r-q-\lambda k)dt+\sigma dz+dp$ |
| **Formule** | $\sum_n\dfrac{e^{-\lambda'T}(\lambda'T)^n}{n!}f_n$, $\lambda'=\lambda(1+k)$ |
| **Variance de $f_n$** | $\sigma^2+ns^2/T$ |
| **Taux de $f_n$** | $r-\lambda k+n\gamma/T$, $\gamma=\ln(1+k)$ |
| **Effet** | queues **gauche ET droite** lourdes → options de **change** |
| **Poisson** | $P(m)=e^{-\lambda t}(\lambda t)^m/m!$ ; $\lambda t=1$ → $P(0)=0{,}3679$ |
| **Variance-gamma** | processus de **saut pur** : petits sauts fréquents, grands sauts rares |
| **Conditionnement** | $\ln S_T\mid g$ est **normal**, moyenne $\ln S_0+(r-q)T+\omega+\theta g$, écart-type $\sigma\sqrt g$ |
| **$\omega$** | $\dfrac Tv\ln(1-\theta v-\sigma^2v/2)$ |
| **Trois paramètres** | $v$ (variance du gamma) · $\sigma$ (volatilité) · $\theta$ (**asymétrie**) |
| **Sens de $g$** | le **rythme d'ARRIVÉE DE L'INFORMATION** — le **temps économique** |
| **Smile variance-gamma** | **en U**, prononcé à court terme, s'éteint à long terme |
| **$\sigma(t)$ déterministe** | moyenner les **VARIANCES** : $0{,}5(0{,}04)+0{,}5(0{,}09)=0{,}065\to25{,}5\,\%$ |
| **Volatilité stochastique** | $dV=a(V_L-V)dt+\xi V^\alpha dz_V$ |
| **Cas non corrélé** | $\int_0^\infty c(\bar V)g(\bar V)d\bar V$ |
| **Conséquence** | Black-Scholes **surévalue** à la monnaie, **sous-évalue** aux extrêmes |
| **Cas $\alpha=0{,}5$ corrélé** | résultat analytique de **HESTON** (1993) |
| **Corrélation négative** | le skew des **actions** |
| **IVF** | $\sigma(S,t)$ par la **formule de Dupire** (26.4) |
| **Ce qu'il fait bien** | la loi **marginale** à tous instants ; **binaires correctement** valorisées |
| **Ce qu'il rate** | la loi **JOINTE** ; erreurs sur les **barrières** |
| **Convertible : $u$** | $e^{\sqrt{(\sigma^2-\lambda)\Delta t}}$ |
| **Convertible : $p_u$** | $\dfrac{a-de^{-\lambda\Delta t}}{u-d}$ |
| **Probabilité de défaut** | $1-e^{-\lambda\Delta t}$ |
| **Règle du nœud** | $\max[\min(Q_1,Q_2),Q_3]$ |
| **Exemple 26.1** | $u=1{,}1519$, $p_u=0{,}5167$, $p_d=0{,}4808$, $p_{\text{déf}}=0{,}002497$ |
| **Sa valeur** | **106,93** |
| **Nœud E** | roll 106,36 &gt; conversion 100 → **106,36** |
| **Nœud D** | roll 132,79, **rappelé** → conversion **132,69** |
| **Nœud B** | roll 118,31, **rappelé** → conversion **115,19** |
| **Chemin : condition 1** | payoff dépend d'**UNE** fonction $F$ |
| **Chemin : condition 2** | $F(\tau+\Delta t)$ calculable de $F(\tau)$ et du prix |
| **Lookback américain** | valeur **5,47** ; en A, exercice à **6,12** bat 5,65 |
| **Généralisation** | balayage **AVANT** pour min/max, **valeurs représentatives**, **interpolation** |
| **Nœud X asiatique** | moyenne 51,44 → 51,98 en Y (**8,247**) et 50,49 en Z (**4,182**) → **6,206** |
| **Convergence asiatique** | 20 pas/4 moy : **7,17** ; 60/100 : **5,58** ; analytique **5,62** |
| **Version américaine** | **7,77** puis **6,17** |
| **Barrière : problème** | l'arbre suppose la barrière **EXTERNE** ; erreur d'ordre $\sqrt{\Delta t}$ |
| **Remède 1** | interpoler entre barrière **interne** et **externe** |
| **Remède 2** | $\ln u=\dfrac{\ln H-\ln S_0}{N}$, $N=\text{int}\!\left[\dfrac{\ln H-\ln S_0}{\sigma\sqrt{3\Delta t}}+0{,}5\right]$ |
| **Remède 3** | **maillage adaptatif** quand $S_0$ est **proche** de la barrière |
| **Deux actifs non corrélés** | probabilités = **produit** |
| **Transformation** | $x_1=\sigma_2\ln S_1+\sigma_1\ln S_2$, $x_2=\sigma_2\ln S_1-\sigma_1\ln S_2$ |
| **Volatilités transformées** | $\sigma_1\sigma_2\sqrt{2(1\pm\rho)}$ |
| **Rubinstein** | arbre **non rectangulaire**, quatre branches à **0,25** |
| **Ajustement des probabilités** | $0{,}25(1\pm\rho)$ |
| **Longstaff-Schwartz** | régresser la **continuation** sur $1,S,S^2$, **chemins dans la monnaie seulement** |
| **Régression $t=2$** | $V=-1{,}070+2{,}983S-1{,}813S^2$ → exercer **4, 6, 7** |
| **Régression $t=1$** | $V=2{,}038-3{,}335S+1{,}356S^2$ → exercer **4, 6, 7, 8** |
| **Valeur obtenue** | **0,1144** &gt; 0,10 → **ne pas exercer immédiatement** |
| **Frontière paramétrée** | $S^\ast(3)=1{,}10$, $S^\ast(2)=\mathbf{0{,}84}$, $S^\ast(1)=\mathbf{0{,}88}$ |
| **Sa valeur** | $0{,}1283e^{-0{,}06}=\mathbf{0{,}1208}$ |
| **Procédure réelle** | déterminer la frontière, **JETER les chemins**, refaire une simulation |
| **Le biais commun** | les deux méthodes **SOUS-ÉVALUENT** |
| **Le remède** | les **bornes supérieures** d'Andersen et Broadie (2004) |

## 🧠 Active Recall

1. Pourquoi la surface de volatilité ne suffit-elle pas pour valoriser une exotique ?
2. Citer les trois familles de processus alternatifs et leur nom collectif.
3. Écrire le processus CEV. Que se passe-t-il quand $\alpha=1$ ?
4. Décrire le mécanisme d'auto-renforcement quand $\alpha<1$.
5. À quel type de smile chaque régime de $\alpha$ correspond-il ?
6. Quelle loi apparaît dans les formules CEV ? Que valent $a$, $b$, $c$, $v$ ?
7. Écrire le processus de Merton et expliquer le terme $-\lambda k$.
8. Écrire la formule en série de Merton. Que vaut $\lambda'$ ?
9. Quels sont la variance et le taux sans risque de $f_n$ ?
10. Quel effet ce modèle a-t-il sur les queues ? Pour quel marché convient-il ?
11. Écrire la probabilité de $m$ sauts en un temps $t$. Recalculer la table 26.1.
12. Décrire la procédure de simulation des sauts.
13. Pourquoi le drift de diffusion vaut-il $r-q-\lambda k$ ?
14. Qu'est-ce qu'un processus gamma ?
15. Écrire la densité de $g$ et son équivalent Excel.
16. Écrire la moyenne et l'écart-type conditionnels de $\ln S_T$ ainsi que $\omega$.
17. Quels sont les trois paramètres du variance-gamma et le rôle de chacun ?
18. Que se passe-t-il pour ces paramètres au passage réel → risque-neutre ?
19. Décrire les trois étapes de la simulation variance-gamma.
20. Quelle est l'interprétation économique de $g$ ?
21. Décrire la forme du smile variance-gamma selon la maturité.
22. Que faut-il moyenner quand $\sigma$ est une fonction connue du temps ? Refaire l'exemple 20 %/30 %.
23. Écrire (26.2) et (26.3). Que représente $V$ ?
24. Énoncer le résultat de Hull-White pour le cas non corrélé.
25. Quelles sont les deux conséquences sur les erreurs de Black-Scholes ?
26. À quel marché ce cas correspond-il ? Et le cas corrélé négativement ?
27. Qui a fourni un résultat analytique pour $\alpha=0{,}5$ ?
28. Quel est le lien avec GARCH ? Qui l'a établi ?
29. Comparer l'impact de la volatilité stochastique sur les prix et sur la couverture en delta.
30. Pourquoi une banque veut-elle un ajustement exact des vanilles ?
31. Écrire le processus de l'IVF et la formule de Dupire.
32. Quelles options l'IVF valorise-t-il correctement ? Lesquelles pas ? Pourquoi ?
33. Qu'ont trouvé Hull et Suo en testant l'IVF ?
34. Qu'est-ce qu'un ratio de conversion ? Une clause de rappel ?
35. Pourquoi la clause de rappel force-t-elle la conversion ?
36. Que se passe-t-il si l'on ignore le risque de crédit d'un convertible ?
37. Comparer le modèle d'Ingersoll et le modèle simplifié.
38. Écrire les quatre paramètres de l'arbre avec défaut. Pourquoi $\sigma^2-\lambda$ ?
39. Écrire la règle de remontée et définir $Q_1$, $Q_2$, $Q_3$.
40. Refaire l'exemple 26.1 : les paramètres, l'arbre des cours.
41. Détailler le calcul au nœud E et la double conclusion.
42. Que se passe-t-il aux nœuds D et B ?
43. Quelle est la valeur du convertible ?
44. Comment traiter les intérêts ? Les paramètres variables dans le temps ?
45. Quel est le défaut du modèle, et quel remède est proposé ?
46. Énoncer les deux conditions pour la méthode par arbre.
47. Quels sont les deux avantages sur Monte-Carlo ?
48. Décrire la structure d'un nœud dans l'arbre du lookback.
49. Refaire les deux calculs au nœud A et conclure.
50. Pourquoi le lookback ne pose-t-il pas de problème de croissance ?
51. Décrire les quatre étapes de la généralisation.
52. Pourquoi le premier balayage se fait-il VERS L'AVANT ?
53. Recalculer la nouvelle moyenne en Y et en Z depuis 51,44.
54. Refaire l'interpolation en Y.
55. Calculer la valeur en X.
56. Quelles valeurs obtient-on avec 20/4 puis 60/100 ? Comparer à l'analytique.
57. Comment traiter la version américaine ? Quelles valeurs obtient-on ?
58. Quel type d'interpolation améliore l'efficacité ?
59. Distinguer barrière interne et externe. Laquelle l'arbre suppose-t-il ?
60. Quel est l'ordre de grandeur de l'erreur ?
61. Décrire les trois étapes du remède par interpolation.
62. Écrire la condition sur $u$ pour que les nœuds tombent sur la barrière, et le choix de $N$.
63. Écrire les trois probabilités trinomiales.
64. Quand utilise-t-on le maillage adaptatif, et comment procède-t-on ?
65. Comment combine-t-on deux arbres pour des variables non corrélées ?
66. Écrire la transformation $x_1$, $x_2$ et les volatilités correspondantes.
67. Écrire les relations inverses donnant $S_1$ et $S_2$.
68. Décrire l'arbre non rectangulaire de Rubinstein.
69. À quoi équivaut-il quand $\rho=0$ ?
70. Écrire les tables 26.2 et 26.3.
71. Vérifier que les probabilités ajustées somment à 1 et que les marginales restent 0,5.
72. Quel est le dilemme entre Monte-Carlo et les arbres ?
73. Énoncer le principe de Longstaff-Schwartz.
74. Quels chemins sélectionne-t-on pour la régression ?
75. Refaire la régression en $t=2$ et la table de décision.
76. Refaire la régression en $t=1$ et la table de décision.
77. Calculer la valeur finale de l'option et conclure.
78. Citer trois extensions de la méthode.
79. Énoncer le principe de la frontière paramétrée.
80. Recalculer $S^\ast(2)$ en balayant les six candidats.
81. Recalculer $S^\ast(1)$ et la valeur finale.
82. Que fait-on des chemins une fois la frontière déterminée ?
83. Pourquoi les deux méthodes sous-évaluent-elles ?
84. Que proposent Andersen et Broadie, et à quoi cela sert-il ?

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Problème de la surface de volatilité ? | Elle ne dit rien de la volatilité des **exotiques** |
| Nom collectif des processus alternatifs ? | Les processus de **LÉVY** |
| Définition d'un processus de Lévy ? | Accroissements **indépendants et stationnaires** |
| Modèle de diffusion type ? | Le **CEV** |
| Modèle mixte type ? | Celui de **Merton** |
| Modèle de saut pur type ? | Le **variance-gamma** |
| Processus CEV ? | $dS=(r-q)S\,dt+\sigma S^\alpha dz$ |
| $\alpha=1$ ? | Le mouvement **brownien géométrique** |
| $\alpha<1$ ? | Vol ↑ quand $S$ ↓ → **queue gauche lourde** |
| Smile correspondant ? | Celui des **ACTIONS** |
| $\alpha>1$ ? | Vol ↑ quand $S$ ↑ → smile **croissant en $K$** |
| Marché correspondant ? | Les options sur **futures** |
| Loi des formules CEV ? | Khi-deux **NON CENTRÉE** |
| Auteurs du CEV ? | **Cox et Ross** (1976) |
| Drift de Merton ? | $r-q-\lambda k$ |
| Pourquoi le $-\lambda k$ ? | Compenser la croissance apportée par les **sauts** |
| Que vaut $\lambda$ ? | Nombre **moyen de sauts par an** |
| Que vaut $k$ ? | Taille **moyenne d'un saut** en % |
| Formule en série ? | $\sum_n\frac{e^{-\lambda'T}(\lambda'T)^n}{n!}f_n$ |
| Que vaut $\lambda'$ ? | $\lambda(1+k)$ |
| Variance de $f_n$ ? | $\sigma^2+ns^2/T$ |
| Taux de $f_n$ ? | $r-\lambda k+n\gamma/T$ |
| Que vaut $\gamma$ ? | $\ln(1+k)$ |
| Effet sur les queues ? | Les **DEUX** plus lourdes |
| Marché visé ? | Les options de **CHANGE** |
| Probabilité de $m$ sauts ? | $e^{-\lambda t}(\lambda t)^m/m!$ |
| $\lambda=0{,}5$ sur 2 ans, $P(0)$ ? | $e^{-1}=\mathbf{0{,}3679}$ |
| $P(1)$ ? | **0,3679** (identique) |
| Cumulée jusqu'à 2 sauts ? | **0,9197** |
| Comment simuler le nombre de sauts ? | Uniforme + **table de correspondance** |
| Processus gamma ? | **Petits sauts fréquents**, grands sauts **rares** |
| Auteurs du variance-gamma ? | **Madan, Carr et Chang** (1998) |
| Loi de $\ln S_T$ conditionnellement à $g$ ? | **Normale** |
| Moyenne conditionnelle ? | $\ln S_0+(r-q)T+\omega+\theta g$ |
| Écart-type conditionnel ? | $\sigma\sqrt g$ |
| Que vaut $\omega$ ? | $\frac Tv\ln(1-\theta v-\sigma^2v/2)$ |
| Rôle de $v$ ? | Le **taux de variance** du gamma |
| Rôle de $\theta$ ? | L'**ASYMÉTRIE** ($\theta<0$ → actions) |
| Les paramètres changent-ils en risque-neutre ? | **OUI, tous** |
| Interprétation de $g$ ? | Le **rythme d'arrivée de l'INFORMATION** |
| Autre nom pour $g$ ? | Le **temps ÉCONOMIQUE** |
| Forme du smile variance-gamma ? | **En U**, pas forcément symétrique |
| À court terme ? à long terme ? | **Très prononcé** · il **s'éteint** |
| $\sigma(t)$ déterministe : que moyenner ? | Les **VARIANCES** |
| 20 % puis 30 % sur 6 mois chacun ? | $0{,}065\to\mathbf{25{,}5\,\%}$ |
| Modèle à volatilité stochastique ? | $dV=a(V_L-V)dt+\xi V^\alpha dz_V$ |
| Que représente $V$ ? | Le taux de **VARIANCE** |
| Cas non corrélé (Hull-White) ? | $\int_0^\infty c(\bar V)g(\bar V)d\bar V$ |
| Ce résultat dépend-il du processus de $V$ ? | **NON** |
| Black-Scholes à la monnaie ? | **SURÉVALUE** |
| Black-Scholes aux extrêmes ? | **SOUS-ÉVALUE** |
| Marché correspondant ? | Le **change** (sourire symétrique) |
| Corrélation négative → ? | Le skew des **ACTIONS** |
| Solution analytique pour $\alpha=0{,}5$ ? | **HESTON** (1993) |
| GARCH comme modèle de prix ? | **Duan** (1995) |
| Impact sur les prix &lt; 1 an ? | Assez **petit en absolu** |
| Impact sur le delta hedging ? | **Très grand** |
| Que surveillent les traders ? | Le **vega** |
| Que fait l'IVF ? | Un ajustement **EXACT** des vanilles |
| Autre nom ? | Le modèle d'**arbre implicite** |
| Auteurs, année ? | **Derman-Kani, Dupire, Rubinstein**, **1994** |
| Raison pratique de son usage ? | Éviter que les traders **arbitrent les modèles internes** |
| Formule de $\sigma(K,T)^2$ ? | Celle de **Dupire** (26.4) |
| Ce que l'IVF obtient correctement ? | La loi **MARGINALE** à tous instants |
| Ce qu'il rate ? | La loi **JOINTE** à deux instants |
| Options mal valorisées ? | **Composées** et surtout **BARRIÈRES** |
| Ratio de conversion ? | Nombre d'**actions par obligation** |
| Les convertibles sont-ils rappelables ? | **Presque toujours** |
| Peut-on convertir après rappel ? | **Toujours OUI** |
| Fonction du rappel ? | **FORCER la conversion plus tôt** |
| Si l'on ignore le crédit ? | Coupons et principal **surévalués** |
| Modèle d'Ingersoll ? | Créances contingentes sur les **ACTIFS** |
| Modèle simple ? | Modéliser **le COURS**, avec saut à **zéro** |
| Que vaut $u$ ? | $e^{\sqrt{(\sigma^2-\lambda)\Delta t}}$ |
| Pourquoi $\sigma^2-\lambda$ ? | Le saut fournit **déjà** de la variance |
| Que vaut $p_u$ ? | $\frac{a-de^{-\lambda\Delta t}}{u-d}$ |
| Probabilité de défaut ? | $1-e^{-\lambda\Delta t}$ |
| Règle du nœud ? | $\max[\min(Q_1,Q_2),Q_3]$ |
| Que sont $Q_1$, $Q_2$, $Q_3$ ? | Remontée · **prix de rappel** · conversion |
| Ex. 26.1 : $u$, $p_u$, $p_d$ ? | **1,1519** · **0,5167** · **0,4808** |
| Ex. 26.1 : $p_{\text{déf}}$ ? | **0,002497** |
| Valeur en cas de défaut ? | **40** |
| Nœud E : roll et conversion ? | **106,36** contre 100 → **106,36** |
| Nœud D ? | Roll **132,79**, rappelé → **132,69** |
| Nœud B ? | Roll **118,31**, rappelé → **115,19** |
| Valeur du convertible ? | **106,93** |
| Comment gérer les paramètres variables ? | Un arbre **TRINOMIAL** |
| Défaut du modèle ? | $\lambda$ **indépendante du cours** |
| Remède d'Andersen-Buffum ? | $\lambda$ inversement proportionnelle à $S^\alpha$ |
| Condition 1 de la méthode par chemin ? | Payoff dépendant d'**une seule** fonction $F$ |
| Condition 2 ? | $F(\tau+\Delta t)$ calculable de $F(\tau)$ et du prix |
| Avantage sur Monte-Carlo ? | Traite les **AMÉRICAINES**, et plus **efficace** |
| Structure d'un nœud lookback ? | Cours · **maximums possibles** · valeurs |
| Nœud A, maximum 50 ? | Valeur **2,66**, exercice **0** |
| Nœud A, maximum 56,12 ? | Valeur 5,65, exercice **6,12** → **exercer** |
| Valeur du lookback américain ? | **5,47** |
| Combien de maximums à un nœud ? | Jamais plus de **$n$** |
| Sens du premier balayage ? | **VERS L'AVANT** |
| Que cherche-t-il ? | Les **min et max** de $F$ à chaque nœud |
| Choix des valeurs représentatives ? | Min, max, et des valeurs **également espacées** |
| Comment obtient-on les autres valeurs ? | Par **INTERPOLATION** |
| Nœud X, moyenne 51,44, branche haute ? | $(5\times51{,}44+54{,}68)/6=\mathbf{51{,}98}$ |
| Branche basse ? | **50,49** |
| Valeur interpolée en Y ? | **8,247** |
| Valeur en X ? | **6,206** |
| Asiatique 20 pas / 4 moyennes ? | **7,17** |
| 60 pas / 100 moyennes ? | **5,58** |
| Analytique continue ? | **5,62** |
| Version américaine (60/100) ? | **6,17** |
| Interpolation qui améliore ? | La **QUADRATIQUE** |
| Barrière interne ? | Nœuds **plus près du centre** |
| Barrière externe ? | Nœuds **plus loin du centre** |
| Laquelle l'arbre suppose-t-il ? | L'**EXTERNE** |
| Ordre de l'espacement vertical ? | $\sqrt{\Delta t}$ |
| Remède 1 ? | **Interpoler** entre les deux barrières |
| Remède 2 ? | Placer les **nœuds SUR la barrière** |
| Condition sur $u$ ? | $H=S_0u^N$ |
| Choix de $N$ ? | $\text{int}\!\left[\frac{\ln H-\ln S_0}{\sigma\sqrt{3\Delta t}}+0{,}5\right]$ |
| Que vaut $p_m$ ? | $1-\frac{\sigma^2\Delta t}{(\ln u)^2}$ |
| Remède 3 ? | Le **maillage adaptatif** |
| Quand l'utiliser ? | Quand $S_0$ est **PROCHE** de la barrière |
| Auteurs ? | **Figlewski et Gao** (1999) |
| Probabilités d'un arbre 3D non corrélé ? | Le **PRODUIT** des probabilités 2D |
| Transformation décorrélante ? | $x_1=\sigma_2\ln S_1+\sigma_1\ln S_2$ · $x_2=\sigma_2\ln S_1-\sigma_1\ln S_2$ |
| Volatilité de $x_1$ ? | $\sigma_1\sigma_2\sqrt{2(1+\rho)}$ |
| Volatilité de $x_2$ ? | $\sigma_1\sigma_2\sqrt{2(1-\rho)}$ |
| Retour à $S_1$ ? | $\exp\!\left(\frac{x_1+x_2}{2\sigma_2}\right)$ |
| Arbre de Rubinstein ? | **Non rectangulaire**, quatre branches à **0,25** |
| Équivalent quand $\rho=0$ ? | Deux arbres à $p=0{,}5$ **séparés** |
| Probabilité ajustée, mouvements **concordants** ? | $0{,}25(1+\rho)$ |
| Probabilité, mouvements **discordants** ? | $0{,}25(1-\rho)$ |
| Le dilemme ? | MC pour le **chemin**, arbres pour l'**américain** |
| Principe de Longstaff-Schwartz ? | Régresser la **valeur de continuer** |
| Quels chemins régresser ? | Ceux **DANS LA MONNAIE** seulement |
| Forme de régression ? | $V=a+bS+cS^2$ |
| Régression $t=2$ ? | $-1{,}070+2{,}983S-1{,}813S^2$ |
| Chemins exercés en $t=2$ ? | **4, 6, 7** |
| Régression $t=1$ ? | $2{,}038-3{,}335S+1{,}356S^2$ |
| Chemins exercés en $t=1$ ? | **4, 6, 7, 8** |
| Valeur de l'option ? | **0,1144** |
| Conclusion ? | $0{,}1144>0{,}10$ → **ne pas exercer** |
| Trois extensions ? | Plus de dates · forme **cubique** · plusieurs **variables d'état** |
| Seconde méthode ? | **Paramétrer la frontière d'exercice** |
| Auteur ? | **Andersen** (2000) |
| $S^\ast(3)$ ? | **1,10** |
| $S^\ast(2)$ optimal ? | **0,84** (valeur 0,1032) |
| $S^\ast(1)$ optimal ? | **0,88** (valeur 0,1283) |
| Valeur en $t=0$ ? | $0{,}1283e^{-0{,}06}=\mathbf{0{,}1208}$ |
| Que fait-on après avoir la frontière ? | **Jeter les chemins** et **refaire** une simulation |
| Biais des deux méthodes ? | Elles **SOUS-ÉVALUENT** |
| Pourquoi ? | Frontière d'exercice **sous-optimale** |
| Le remède ? | Les **bornes supérieures** d'Andersen-Broadie (2004) |
