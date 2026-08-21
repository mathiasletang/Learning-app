# Fiche 99 — Martingales et mesures : prix de marché du risque et changement de numéraire

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché · Probabilités |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 27 « Martingales and Measures » |
| **Difficulté** | Must know — le socle théorique de tout le reste du livre |
| **Temps d'étude estimé** | 1 h 50 |
| **Prérequis** | Fiches 86 (Wiener et Itô), 87 (Black-Scholes), 89 (modèle de Black), 97 (option d'échange) |
| **Concepts clés** | Prix de marché du risque, ratio de Sharpe, monde risque-neutre traditionnel, mesure de probabilité, plusieurs variables d'état, théorie d'arbitrage APT, martingale, mesure martingale équivalente, numéraire, monde forward risque-neutre, compte de marché monétaire, obligation zéro-coupon comme numéraire, facteur d'annuité, modèle de Black revisité, option d'échange, changement de numéraire, ratio de numéraire |
| **Poids à l'examen** | $\dfrac{\mu-r}{\sigma}=\lambda$ · $\mu-r=\sum_i\lambda_i\sigma_i$ · **le résultat de mesure martingale équivalente** $f_0=g_0E_g\!\left[\dfrac{f_T}{g_T}\right]$ · $F=E_T(\theta_T)$ · le **changement de numéraire** $\alpha_v=\sigma_v\sigma_w\rho$. |

## 🎯 Vue d'ensemble

```
LA QUESTION D'OUVERTURE   avec des taux STOCHASTIQUES, que veut dire « valorisation
   risque-neutre » ? le rendement espéré est-il le taux à 1 jour ? à 1 an ? à 5 ans ?
   peut-on actualiser un payoff de l'année 5 au taux 5 ans d'aujourd'hui ?

PRIX DE MARCHÉ DU RISQUE   λ = (μ − r)/σ         (le RATIO DE SHARPE)
   Une variable, un λ : μ − r = λσ          Plusieurs : μ − r = Σ λᵢσᵢ
   λ = 0 pour tous  →  MONDE RISQUE-NEUTRE TRADITIONNEL
   Choisir λ = CHOISIR LA MESURE DE PROBABILITÉ

MARTINGALE = processus à DRIFT NUL      dθ = σ dz      ⇒   E(θ_T) = θ₀

MESURE MARTINGALE ÉQUIVALENTE
   g = NUMÉRAIRE. Si λ = σ_g, alors f/g est une MARTINGALE pour TOUT titre f
   →   f₀ = g₀ E_g[ f_T / g_T ]           « monde forward risque-neutre / g »

LES QUATRE NUMÉRAIRES
   COMPTE MONÉTAIRE   g = e^{∫r dt}   →  f₀ = Ê[ e^{−r̄T} f_T ]   actualisation DEDANS
   ZÉRO-COUPON P(t,T) →  f₀ = P(0,T) E_T(f_T)  actualisation DEHORS · F = E_T(θ_T)
   ZÉRO-COUPON P(t,T*)→  le taux FORWARD est une martingale  → CAPS
   ANNUITÉ A(t)       →  le taux de SWAP forward est une martingale → SWAPTIONS

CHANGEMENT DE NUMÉRAIRE    α_v = σ_v σ_w ρ      w = h/g = RATIO DE NUMÉRAIRE
```

**La question posée d'entrée, mot pour mot.** *Le principe de valorisation risque-neutre dit qu'un dérivé se valorise en (a) calculant le payoff espéré en supposant que le rendement espéré du sous-jacent égale le taux sans risque, et (b) actualisant ce payoff au taux sans risque. **Quand les taux sont constants, cela fournit un outil bien défini et non ambigu. Quand les taux sont STOCHASTIQUES, c'est moins net.** Que signifie supposer que le rendement espéré égale le taux sans risque ? Cela veut-il dire (a) que **chaque jour** le rendement espéré est le taux **à un jour**, ou (b) que **chaque année** il est le taux **à un an**, ou (c) que **sur cinq ans** il est le taux **à cinq ans** du début de la période ? Que signifie actualiser au taux sans risque ? Peut-on, par exemple, actualiser un payoff espéré réalisé en année 5 au taux sans risque à 5 ans d'aujourd'hui ?*

> ***Ce chapitre montre qu'il existe DE NOMBREUX mondes risque-neutres différents que l'on peut supposer dans une situation donnée.***

## 🔴 Concept 1 — Le prix de marché du risque

### 1.1 La dérivation

**Le cadre.** Une variable $\theta$ suit :

$$\boxed{\frac{d\theta}{\theta}=m\,dt+s\,dz}\;\text{(27.1)}$$

⚠️ ***$\theta$ n'a PAS besoin d'être le prix d'un actif d'investissement. Cela pourrait être quelque chose d'aussi éloigné des marchés financiers que la TEMPÉRATURE AU CENTRE DE LA NOUVELLE-ORLÉANS.***

<details class="details--riche">
<summary>

**Le portefeuille instantanément sans risque — les six étapes**

</summary>

*Étape 1 — deux dérivés sur la même variable.* $f_1$ et $f_2$ dépendent **seulement** de $\theta$ et $t$, et ne procurent **aucun revenu** :

$$\frac{df_1}{f_1}=\mu_1\,dt+\sigma_1\,dz\qquad\frac{df_2}{f_2}=\mu_2\,dt+\sigma_2\,dz$$

***Le « $dz$ » dans ces processus doit être LE MÊME $dz$ que dans (27.1), parce que c'est la seule source d'incertitude des prix.***

*Étape 2 — les versions discrètes :*

$$\Delta f_1=\mu_1f_1\Delta t+\sigma_1f_1\Delta z\;\text{(27.2)}\qquad\Delta f_2=\mu_2f_2\Delta t+\sigma_2f_2\Delta z\;\text{(27.3)}$$

*Étape 3 — éliminer $\Delta z$.* On forme un portefeuille de **$\sigma_2f_2$ unités du premier** dérivé et **$-\sigma_1f_1$ unités du second** :

$$\Pi=(\sigma_2f_2)f_1-(\sigma_1f_1)f_2\;\text{(27.4)}$$

*Étape 4 — sa variation :*

$$\Delta\Pi=\sigma_2f_2\Delta f_1-\sigma_1f_1\Delta f_2=(\mu_1\sigma_2f_1f_2-\mu_2\sigma_1f_1f_2)\Delta t\;\text{(27.5)}$$

**Les termes en $\Delta z$ se sont annulés** : le portefeuille est instantanément sans risque.

*Étape 5 — il doit donc rapporter $r$ :*

$$\Delta\Pi=r\Pi\,\Delta t\quad\Longrightarrow\quad\mu_1\sigma_2-\mu_2\sigma_1=r\sigma_2-r\sigma_1$$

*Étape 6 — réarranger :*

$$\boxed{\frac{\mu_1-r}{\sigma_1}=\frac{\mu_2-r}{\sigma_2}}\;\text{(27.6)}$$

> ⚠️ **L'observation décisive.** *Le membre de gauche ne dépend que des paramètres de $f_1$, le membre de droite que de ceux de $f_2$. **Ils doivent donc être égaux à une quantité commune $\lambda$, indépendante du dérivé considéré.***

</details>

$$\boxed{\frac{\mu-r}{\sigma}=\lambda}\;\text{(27.8)}\qquad\Longleftrightarrow\qquad\boxed{\mu-r=\lambda\sigma}\;\text{(27.9)}$$

| Élément | Rôle |
|---|---|
| $\lambda$ | le **PRIX DE MARCHÉ DU RISQUE** de $\theta$. *Dans le contexte de la mesure de performance de portefeuille, c'est le **RATIO DE SHARPE***. Il peut dépendre de $\theta$ et de $t$, **mais PAS de la nature du dérivé $f$** |
| $\sigma$ | *peut être interprété grossièrement comme **la QUANTITÉ de risque-$\theta$ présente dans $f$*** |
| $\lambda\sigma$ | la **quantité** de risque multipliée par le **prix** du risque |
| $\mu-r$ | *le rendement espéré, **en excès du taux sans risque**, requis pour compenser ce risque* |

> ⚠️ ***Pour l'absence d'arbitrage, $(\mu-r)/\sigma$ doit à tout instant être LE MÊME pour tous les dérivés dépendant seulement de $\theta$ et de $t$.*** *(27.9) est **analogue au MEDAF**, qui relie le rendement excédentaire espéré d'une action à son risque.*

⚠️ **La subtilité sur le signe de $\sigma$.** *Il est naturel de supposer que $\sigma$, le coefficient de $dz$, est **la volatilité** de $f$. **En fait $\sigma$ peut être NÉGATIF** — ce sera le cas quand $f$ est **négativement** relié à $\theta$ (donc $\partial f/\partial\theta<0$). **C'est la VALEUR ABSOLUE $|\sigma|$ qui est la volatilité.*** Une façon de le comprendre : *le processus de $f$ a **les mêmes propriétés statistiques** quand on remplace $dz$ par $-dz$.*

⚠️ **La condition d'applicabilité.** *(27.8) est vraie pour **tous les actifs D'INVESTISSEMENT** ne procurant aucun revenu et dépendant seulement de $\theta$. **Si $\theta$ est lui-même un tel actif, alors $\lambda=\dfrac{m-r}{s}$. Mais dans d'autres circonstances, cette relation n'est PAS nécessairement vraie.***

<details class="details--riche">
<summary>

**Exemples 27.1 et 27.2 — les deux calculs types**

</summary>

**Exemple 27.1 — le pétrole.** *Un dérivé dont le prix est **positivement** relié au prix du pétrole et ne dépend d'aucune autre variable stochastique procure un rendement espéré de **12 % par an** avec une volatilité de **20 % par an**. Le taux sans risque est **8 %**.*

$$\lambda=\frac{0{,}12-0{,}08}{0{,}2}=\mathbf{0{,}2}$$

⚠️ ***Noter que le pétrole est un actif de CONSOMMATION et non d'investissement : son prix de marché du risque ne peut PAS se calculer par (27.8) en posant $\mu$ = rendement espéré d'un investissement en pétrole et $\sigma$ = volatilité du prix du pétrole.***

**Exemple 27.2 — deux titres sur le taux à 90 jours.** *Le premier a un rendement espéré de **3 %** et une volatilité de **20 %** ; le second a une volatilité de **30 %**. Le taux sans risque instantané est **6 %**.*

*Étape 1 — le prix du risque, depuis le premier titre :*

$$\lambda=\frac{0{,}03-0{,}06}{0{,}2}=\mathbf{-0{,}15}$$

*Étape 2 — le rendement espéré du second, par (27.9) :*

$$\mu=0{,}06+(-0{,}15)\times0{,}3=0{,}06-0{,}045=\mathbf{0{,}015}\ \text{soit }\mathbf{1{,}5\,\%\text{ par an}}$$

> ⚠️ **Le prix du risque est NÉGATIF ici.** *Un titre positivement lié aux taux d'intérêt rapporte **MOINS que le sans risque** : il joue un rôle de **couverture** dans le portefeuille de l'investisseur typique.*

</details>

### 1.2 Les mondes alternatifs

$$\text{Processus général}:\quad df=\mu f\,dt+\sigma f\,dz\qquad\text{avec}\qquad\mu=r+\lambda\sigma$$

| Choix de $\lambda$ | Nom du monde | Processus |
|---|---|---|
| $\boxed{\lambda=0}$ | ***le MONDE RISQUE-NEUTRE TRADITIONNEL*** | $df=rf\,dt+\sigma f\,dz$ |
| $\lambda$ quelconque | un monde **intérieurement cohérent** | $\boxed{df=(r+\lambda\sigma)f\,dt+\sigma f\,dz}\;\text{(27.10)}$ |
| $\lambda$ « réel » | le **MONDE RÉEL**, avec les taux de croissance observés en pratique | — |

> ⚠️ **Les deux phrases à retenir mot pour mot.**
>
> - ***Le prix de marché du risque d'une variable détermine les taux de croissance de TOUS les titres dépendant de cette variable.***
> - ***Quand on passe d'un prix de marché du risque à un autre, les TAUX DE CROISSANCE espérés changent, mais LES VOLATILITÉS RESTENT LES MÊMES.*** *(C'est une propriété générale des variables suivant des processus de diffusion.)*
>
> ***Choisir un prix de marché du risque particulier s'appelle aussi DÉFINIR LA MESURE DE PROBABILITÉ.***

## 🔴 Concept 2 — Plusieurs variables d'état

Soit $n$ variables $\theta_1,\dots,\theta_n$ suivant :

$$\frac{d\theta_i}{\theta_i}=m_i\,dt+s_i\,dz_i\;\text{(27.11)}$$

Le lemme d'Itô multivarié (fiche 86) montre que le prix $f$ d'un titre dépendant des $\theta_i$ a **$n$ composantes stochastiques** :

$$\boxed{\frac{df}{f}=\mu\,dt+\sum_{i=1}^{n}\sigma_i\,dz_i}\;\text{(27.12)}$$

où $\sigma_i\,dz_i$ est **la composante du risque attribuable à $\theta_i$**. Et alors :

$$\boxed{\mu-r=\sum_{i=1}^{n}\lambda_i\sigma_i}\;\text{(27.13)}$$

| Signe de $\lambda_i\sigma_i$ | Interprétation |
|---|---|
| $=0$ | **aucun effet** |
| $>0$ | *les investisseurs exigent un **rendement PLUS ÉLEVÉ** pour compenser le risque venant de $\theta_i$* |
| $<0$ | *la dépendance à $\theta_i$ fait que les investisseurs exigent un rendement **PLUS FAIBLE** — cela survient **quand la variable a pour effet de RÉDUIRE plutôt que d'augmenter les risques du portefeuille de l'investisseur typique*** |

<details class="details--riche">
<summary>

**Exemple 27.3 — une action à trois facteurs**

</summary>

**Données.** Une action dépend de **trois** variables : le prix du **pétrole**, le prix de l'**or**, et la performance d'un **indice boursier**.

| Variable | $\lambda_i$ | $\sigma_i$ | $\lambda_i\sigma_i$ |
|---|---|---|---|
| Pétrole | $0{,}2$ | 0,05 | $+0{,}010$ |
| Or | $\mathbf{-0{,}1}$ | 0,10 | $\mathbf{-0{,}010}$ |
| Indice boursier | $0{,}4$ | 0,15 | $+0{,}060$ |
|  |  | **Total** | $\mathbf{+0{,}060}$ |

$$\text{Rendement excédentaire}=0{,}2\times0{,}05-0{,}1\times0{,}10+0{,}4\times0{,}15=\mathbf{6{,}0\,\%\text{ par an}}$$

⚠️ ***Si d'AUTRES variables que celles considérées affectent le cours, ce résultat reste vrai POURVU QUE leur prix de marché du risque soit NUL.***

> **Noter l'annulation :** l'or, avec $\lambda=-0{,}1$, **retranche** exactement ce que le pétrole ajoute — c'est un actif de couverture.

</details>

**Les liens théoriques.**

| Théorie | Lien |
|---|---|
| **APT** (*arbitrage pricing theory*, **Ross, 1976**) | (27.13) en est **très proche** |
| **MEDAF** en temps continu | **un CAS PARTICULIER** de (27.13). *Le MEDAF soutient qu'un investisseur exige des rendements excédentaires pour **tout risque CORRÉLÉ au risque du marché actions**, mais **aucun** pour les autres risques* |
| **Risque systématique / non systématique** | *si le MEDAF est vrai, **$\lambda_i$ est PROPORTIONNEL à la corrélation entre les variations de $\theta_i$ et le rendement du marché**. **Quand $\theta_i$ n'est pas corrélée au marché, $\lambda_i$ est NUL*** |

## 🔴 Concept 3 — Les martingales et la mesure martingale équivalente

### 3.1 La définition

> ***Une MARTINGALE est un processus stochastique à DRIFT NUL.***

$$\boxed{d\theta=\sigma\,dz}\qquad\Longrightarrow\qquad\boxed{E(\theta_T)=\theta_0}$$

*$\sigma$ peut lui-même être **stochastique** et dépendre de $\theta$ et d'autres variables.*

**La démonstration intuitive.** *Sur un très petit intervalle, la variation de $\theta$ est **normale de moyenne nulle** ; la variation espérée est donc **zéro**. La variation entre 0 et $T$ est **la somme** des variations sur de nombreux petits intervalles : **la variation espérée entre 0 et $T$ doit donc aussi être nulle**.*

*(Formellement : une suite $X_0,X_1,\dots$ est une martingale si $E(X_i\mid X_{i-1},X_{i-2},\dots,X_0)=X_{i-1}$ pour tout $i\geqslant1$.)*

### 3.2 Le résultat de mesure martingale équivalente

**Le cadre.** $f$ et $g$ sont les prix de **titres NÉGOCIÉS** dépendant d'une source d'incertitude unique et ne procurant **aucun revenu**. On pose $\Phi=f/g$.

> *$\Phi$ est **le prix RELATIF de $f$ par rapport à $g$**. On peut le voir comme **mesurant le prix de $f$ en unités de $g$ plutôt qu'en dollars**. **Le titre $g$ s'appelle le NUMÉRAIRE.***

$$\boxed{\begin{array}{l}\textbf{RÉSULTAT DE MESURE MARTINGALE ÉQUIVALENTE}\\[3pt]\text{En l'absence d'arbitrage, }\Phi=f/g\textbf{ est une MARTINGALE pour un certain choix du prix de marché du risque.}\\[3pt]\text{De plus, pour un numéraire }g\text{ donné, }\textbf{LE MÊME choix rend }f/g\textbf{ martingale pour TOUS les titres }f.\\[3pt]\textbf{Ce choix est }\boxed{\lambda=\sigma_g}\textbf{, la VOLATILITÉ DU NUMÉRAIRE.}\end{array}}$$

⚠️ *Noter que **le prix de marché du risque a la même DIMENSION que la volatilité** : tous deux sont « par racine carrée du temps ». **Le choix est donc valide.***

<details class="details--riche">
<summary>

**La démonstration complète — six lignes d'Itô**

</summary>

*Étape 1 — les deux processus dans un monde où $\lambda=\sigma_g$*, par (27.10) :

$$df=(r+\sigma_g\sigma_f)f\,dt+\sigma_ff\,dz$$

$$dg=(r+\sigma_g^2)g\,dt+\sigma_gg\,dz$$

*Étape 2 — passer aux logarithmes par le lemme d'Itô :*

$$d\ln f=\left(r+\sigma_g\sigma_f-\frac{\sigma_f^2}{2}\right)dt+\sigma_f\,dz$$

$$d\ln g=\left(r+\frac{\sigma_g^2}{2}\right)dt+\sigma_g\,dz$$

*Étape 3 — soustraire :*

$$d(\ln f-\ln g)=\left(\sigma_g\sigma_f-\frac{\sigma_f^2}{2}-\frac{\sigma_g^2}{2}\right)dt+(\sigma_f-\sigma_g)\,dz$$

*Étape 4 — reconnaître le carré :*

$$d\ln\frac fg=-\frac{(\sigma_f-\sigma_g)^2}{2}\,dt+(\sigma_f-\sigma_g)\,dz$$

*Étape 5 — repasser de $\ln(f/g)$ à $f/g$ par Itô.* Le terme $-\frac12(\sigma_f-\sigma_g)^2$ est **exactement** la correction d'Itô, qui **s'annule** :

$$\boxed{d\!\left(\frac fg\right)=(\sigma_f-\sigma_g)\frac fg\,dz}\;\text{(27.14)}$$

*Étape 6 — conclusion.* **Le drift est nul : $f/g$ est une MARTINGALE.** ∎

> **On appelle un monde où le prix de marché du risque vaut $\sigma_g$ : un monde ***FORWARD RISQUE-NEUTRE PAR RAPPORT À $g$***.**

</details>

$$\boxed{\frac{f_0}{g_0}=E_g\!\left[\frac{f_T}{g_T}\right]\qquad\Longleftrightarrow\qquad f_0=g_0\,E_g\!\left[\frac{f_T}{g_T}\right]}\;\text{(27.15)}$$

où $E_g$ dénote l'espérance dans le monde forward risque-neutre par rapport à $g$.

⚠️ **L'extension aux titres versant un revenu** *(problème 27.8)* : si $f$ et $g$ versent des revenus aux taux $q_f$ et $q_g$ :

$$\boxed{f_0=g_0\,e^{(q_f-q_g)T}\,E_g\!\left[\frac{f_T}{g_T}\right]}$$

## 🔴 Concept 4 — Les quatre choix de numéraire

### 4.1 Le compte de marché monétaire

**La définition.** *Le compte de marché monétaire en dollars est un titre valant **1 dollar en 0** et gagnant **le taux sans risque instantané $r$** à tout instant. **$r$ peut être stochastique.***

*(Formellement : c'est **la limite quand $\Delta t\to0$** du titre suivant — investi au taux $\Delta t$-périodique initial ; **réinvesti** en $\Delta t$ pour une nouvelle période au **nouveau** taux ; et ainsi de suite.)*

$$dg=rg\,dt\;\text{(27.16)}$$

> ⚠️ ***Le DRIFT de $g$ est stochastique, mais sa VOLATILITÉ est NULLE.*** *Il s'ensuit que $f/g$ est une martingale dans un monde où le prix de marché du risque est **ZÉRO** — **c'est exactement le monde risque-neutre TRADITIONNEL**.*

Avec $g_0=1$ et $g_T=e^{\int_0^Tr\,dt}$ :

$$\boxed{f_0=\hat E\!\left[e^{-\int_0^Tr\,dt}\,f_T\right]}\;\text{(27.18)}\qquad\Longleftrightarrow\qquad\boxed{f_0=\hat E\big[e^{-\bar rT}f_T\big]}\;\text{(27.19)}$$

où $\bar r$ est **la valeur MOYENNE de $r$ entre 0 et $T$**.

> ⚠️ ***Cette équation montre qu'UNE façon de valoriser un dérivé de taux est de SIMULER le taux court $r$ dans le monde risque-neutre traditionnel. À chaque essai on calcule le payoff espéré et ON L'ACTUALISE À LA VALEUR MOYENNE DU TAUX COURT SUR LE CHEMIN SIMULÉ.***

*Quand $r$ est **constant**, (27.19) se réduit à $f_0=e^{-rT}\hat E(f_T)$ — **la relation de valorisation risque-neutre des chapitres antérieurs**.*

### 4.2 L'obligation zéro-coupon comme numéraire

$P(t,T)$ = prix en $t$ d'une obligation zéro-coupon versant **1 dollar en $T$**. Comme $g_T=P(T,T)=1$ et $g_0=P(0,T)$ :

$$\boxed{f_0=P(0,T)\,E_T(f_T)}\;\text{(27.20)}$$

> ⚠️ **LA DIFFÉRENCE CRUCIALE avec (27.19), à retenir absolument.**
>
> - Dans **(27.19)**, ***l'actualisation est À L'INTÉRIEUR de l'opérateur d'espérance*** ;
> - dans **(27.20)**, ***l'actualisation, représentée par le terme $P(0,T)$, est À L'EXTÉRIEUR***.
>
> ***Utiliser $P(t,T)$ comme numéraire SIMPLIFIE donc considérablement les choses pour un titre qui verse un payoff UNIQUEMENT en $T$.***

<details class="details--riche">
<summary>

**Le corollaire majeur : le prix forward est une espérance**

</summary>

**Le cadre.** Soit $\theta$ une variable **qui n'est PAS un taux d'intérêt**. Un contrat forward sur $\theta$ de maturité $T$ verse $\theta_T-K$ en $T$.

*Étape 1 — par (27.20), la valeur du forward :*

$$f_0=P(0,T)\big[E_T(\theta_T)-K\big]$$

*Étape 2 — le prix forward $F$ est le $K$ qui annule $f_0$ :*

$$P(0,T)\big[E_T(\theta_T)-F\big]=0$$

*Étape 3 — la conclusion :*

$$\boxed{F=E_T(\theta_T)}\;\text{(27.21)}$$

> ***Le PRIX FORWARD de n'importe quelle variable (sauf un taux d'intérêt) est SON PRIX SPOT FUTUR ESPÉRÉ dans un monde forward risque-neutre par rapport à $P(t,T)$.***

⚠️ **La comparaison forward / futures, à savoir énoncer.**

| Prix | Espérance dans quel monde ? |
|---|---|
| **FORWARD** | le monde **forward risque-neutre par rapport à $P(t,T)$** |
| **FUTURES** | le monde risque-neutre **TRADITIONNEL** (fiche 89, §17.7) |

**Les deux enseignements combinés :**

1. *(27.20) : **tout titre versant un payoff en $T$** se valorise en calculant son payoff espéré dans le monde forward risque-neutre par rapport à une obligation maturant en $T$, **puis en actualisant au taux sans risque de maturité $T$** ;*
2. *(27.21) : ***il est CORRECT de supposer que l'espérance des variables sous-jacentes égale LEUR VALEUR FORWARD*** en calculant ce payoff espéré.*

</details>

### 4.3 Les taux d'intérêt sous $P(t,T^\ast)$ — le résultat des caps

<details class="details--riche">
<summary>

**Pourquoi le taux forward est une martingale sous $P(t,T^\ast)$**

</summary>

**La définition.** $R(t,T,T^\ast)$ = le **taux forward** vu en $t$ pour la période $[T,T^\ast]$, **exprimé avec une période de composition $T^\ast-T$**. *(Si $T^\ast-T=0{,}5$, composition semestrielle ; si $=0{,}25$, trimestrielle.)*

⚠️ ***Un taux forward se définit DIFFÉREMMENT du forward de la plupart des variables : c'est LE TAUX IMPLIQUÉ PAR LE PRIX FORWARD D'OBLIGATION correspondant.***

*Étape 1 — le prix forward de l'obligation entre $T$ et $T^\ast$ vaut $\dfrac{P(t,T^\ast)}{P(t,T)}$, donc :*

$$1+(T^\ast-T)R(t,T,T^\ast)=\frac{P(t,T)}{P(t,T^\ast)}$$

*Étape 2 — isoler le taux :*

$$R(t,T,T^\ast)=\frac{1}{T^\ast-T}\left[\frac{P(t,T)}{P(t,T^\ast)}-1\right]=\frac{1}{T^\ast-T}\left[\frac{P(t,T)-P(t,T^\ast)}{P(t,T^\ast)}\right]$$

*Étape 3 — reconnaître un rapport $f/g$.* En posant

$$\boxed{f=\frac{1}{T^\ast-T}\big[P(t,T)-P(t,T^\ast)\big]\qquad g=P(t,T^\ast)}$$

**$f$ est bien un portefeuille de titres NÉGOCIÉS** (long une obligation $T$, court une obligation $T^\ast$, à un facteur près), donc le résultat de mesure martingale équivalente s'applique :

$$\boxed{R(0,T,T^\ast)=E_{T^\ast}\big[R(T,T,T^\ast)\big]}\;\text{(27.22)}$$

> ***Le taux forward entre $T$ et $T^\ast$ ÉGALE le taux d'intérêt futur espéré dans un monde forward risque-neutre par rapport à une obligation zéro-coupon maturant en $T^\ast$.***
>
> ⚠️ ***Ce résultat, combiné à (27.20), sera CRITIQUE pour comprendre le modèle de marché standard des CAPS de taux d'intérêt.***

*(Noter la distinction : $R(0,T,T^\ast)$ est le taux **forward vu en 0** ; $R(T,T,T^\ast)$ est le taux **RÉALISÉ** entre $T$ et $T^\ast$.)*

</details>

### 4.4 Le facteur d'annuité — le résultat des swaptions

<details class="details--riche">
<summary>

**Pourquoi le taux de swap forward est une martingale sous $A(t)$**

</summary>

**Le cadre.** Un swap démarrant en $T$ avec paiements en $T_1,T_2,\dots,T_N$ ; on pose $T_0=T$ et un principal de **1 dollar**. Le **taux de swap forward** $s(t)$ est le taux fixe qui donne au swap une valeur nulle.

*Étape 1 — la jambe FIXE vaut $s(t)A(t)$ avec le **facteur d'annuité** :*

$$\boxed{A(t)=\sum_{i=0}^{N-1}(T_{i+1}-T_i)\,P(t,T_{i+1})}$$

*Étape 2 — la jambe VARIABLE.* Le chapitre 7 (fiche 80) montre que **quand le principal est ajouté au dernier paiement, la jambe variable vaut le principal à la date d'initiation**. Donc si l'on ajoute 1 dollar en $T_N$, la jambe variable vaut **1 dollar en $T_0$** :

$$\text{jambe variable en }t=P(t,T_0)-P(t,T_N)$$

*(la valeur de 1 dollar reçu en $T_N$ est $P(t,T_N)$, celle de 1 dollar en $T_0$ est $P(t,T_0)$)*

*Étape 3 — égaler les deux jambes :*

$$s(t)A(t)=P(t,T_0)-P(t,T_N)\quad\Longrightarrow\quad\boxed{s(t)=\frac{P(t,T_0)-P(t,T_N)}{A(t)}}\;\text{(27.23)}$$

*Étape 4 — appliquer le résultat de mesure martingale équivalente* avec $f=P(t,T_0)-P(t,T_N)$ et $g=A(t)$ :

$$\boxed{s(0)=E_A\big[s(T)\big]}\;\text{(27.24)}$$

> ***Dans un monde forward risque-neutre par rapport à $A(t)$, LE TAUX DE SWAP FUTUR ESPÉRÉ EST LE TAUX DE SWAP COURANT.***

*Étape 5 — la formule générale de valorisation :*

$$\boxed{f_0=A(0)\,E_A\!\left[\frac{f_T}{A(T)}\right]}\;\text{(27.25)}$$

⚠️ ***Ce résultat, combiné à (27.24), sera CRITIQUE pour comprendre le modèle de marché standard des SWAPTIONS européennes.***

**Pourquoi $A(t)$ est un numéraire légitime :** c'est un **portefeuille d'obligations zéro-coupon**, donc **un titre négocié**.

</details>

### 4.5 Le tableau de synthèse des numéraires

| Numéraire $g$ | Monde | Formule de valorisation | Ce qui devient une martingale |
|---|---|---|---|
| **Compte monétaire** $e^{\int_0^tr\,ds}$ | risque-neutre **traditionnel** ($\lambda=0$) | $f_0=\hat E\big[e^{-\bar rT}f_T\big]$ — actualisation **dedans** | le prix **actualisé** $f/g$ |
| **Zéro-coupon** $P(t,T)$ | forward risque-neutre / $T$ | $f_0=P(0,T)E_T(f_T)$ — actualisation **dehors** | le **prix forward** : $F=E_T(\theta_T)$ |
| **Zéro-coupon** $P(t,T^\ast)$ | forward risque-neutre / $T^\ast$ | — | le **taux FORWARD** $R(t,T,T^\ast)$ → **CAPS** |
| **Annuité** $A(t)$ | forward risque-neutre / $A$ | $f_0=A(0)E_A\!\left[\frac{f_T}{A(T)}\right]$ | le **taux de SWAP forward** $s(t)$ → **SWAPTIONS** |

## 🟠 Concept 5 — L'extension à plusieurs facteurs

*Avec $n$ facteurs **indépendants**, dans le monde risque-neutre traditionnel :*

$$df=rf\,dt+\sum_{i=1}^{n}\sigma_{f,i}f\,dz_i\qquad dg=rg\,dt+\sum_{i=1}^{n}\sigma_{g,i}g\,dz_i$$

*D'autres mondes cohérents se définissent en posant :*

$$df=\left(r+\sum_{i=1}^{n}\lambda_i\sigma_{f,i}\right)f\,dt+\sum_{i=1}^{n}\sigma_{f,i}f\,dz_i$$

$$dg=\left(r+\sum_{i=1}^{n}\lambda_i\sigma_{g,i}\right)g\,dt+\sum_{i=1}^{n}\sigma_{g,i}g\,dz_i$$

où les $\lambda_i$ sont les **$n$ prix de marché du risque**. **L'un de ces mondes est le monde RÉEL.**

$$\boxed{\text{Un monde est forward risque-neutre par rapport à }g\text{ quand }\lambda_i=\sigma_{g,i}\text{ POUR TOUT }i}$$

> *Le lemme d'Itô, **en utilisant le fait que les $dz_i$ sont non corrélés**, montre que $f/g$ a alors un **drift nul**. **Tous les résultats des deux sections précédentes (de (27.15) en avant) restent donc vrais.***
>
> ⚠️ *La condition d'indépendance **n'est pas critique** : si les facteurs ne sont pas indépendants, **on peut les ORTHOGONALISER**.*

## 🔴 Concept 6 — Le modèle de Black revisité

**L'enjeu.** *Le modèle de Black (fiche 89, §17.8) est un outil populaire pour valoriser des européennes en termes du prix **forward ou futures** du sous-jacent **quand les taux sont constants**. **On est maintenant en position de RELÂCHER cette hypothèse.***

<details class="details--riche">
<summary>

**La dérivation complète du modèle de Black à taux stochastiques**

</summary>

*Étape 1 — appliquer (27.20)* à un call européen de strike $K$ et maturité $T$ :

$$c=P(0,T)\,E_T\big[\max(S_T-K,0)\big]\;\text{(27.26)}$$

*Étape 2 — passer au forward.* Soit $F_0$ et $F_T$ les prix forward en 0 et en $T$ pour un contrat maturant en $T$. **Comme $S_T=F_T$** (le forward converge vers le spot à maturité) :

$$c=P(0,T)\,E_T\big[\max(F_T-K,0)\big]$$

*Étape 3 — supposer $F_T$ LOGNORMALE* dans le monde considéré, avec $\ln F_T$ d'écart-type $\sigma_F\sqrt T$. *(Cela peut venir de ce que le prix forward suit un processus de volatilité constante $\sigma_F$.)* L'annexe du chapitre 14 donne :

$$E_T\big[\max(F_T-K,0)\big]=E_T(F_T)N(d_1)-KN(d_2)\;\text{(27.27)}$$

$$d_1=\frac{\ln[E_T(F_T)/K]+\sigma_F^2T/2}{\sigma_F\sqrt T}\qquad d_2=\frac{\ln[E_T(F_T)/K]-\sigma_F^2T/2}{\sigma_F\sqrt T}$$

*Étape 4 — LE PONT.* Par **(27.21)** :

$$\boxed{E_T(F_T)=E_T(S_T)=F_0}$$

*Étape 5 — le modèle de Black :*

$$\boxed{c=P(0,T)\big[F_0N(d_1)-KN(d_2)\big]}\;\text{(27.28)}$$

$$\boxed{p=P(0,T)\big[KN(-d_2)-F_0N(-d_1)\big]}\;\text{(27.29)}$$

$$d_1=\frac{\ln(F_0/K)+\sigma_F^2T/2}{\sigma_F\sqrt T}\qquad d_2=\frac{\ln(F_0/K)-\sigma_F^2T/2}{\sigma_F\sqrt T}=d_1-\sigma_F\sqrt T$$

> ⚠️ **Les trois affirmations finales, à savoir énoncer.**
>
> 1. ***Le modèle de Black s'applique aux actifs D'INVESTISSEMENT COMME DE CONSOMMATION.***
> 2. ***Il est VRAI QUAND LES TAUX SONT STOCHASTIQUES, pourvu que $F_0$ soit le PRIX FORWARD de l'actif.***
> 3. ***$\sigma_F$ s'interprète comme la volatilité (constante) DU PRIX FORWARD.***

</details>

## 🟠 Concept 7 — L'option d'échange, redémontrée

<details class="details--riche">
<summary>

**La formule de Margrabe par changement de numéraire — l'élégance de la méthode**

</summary>

**Le cadre.** Une option d'échanger un actif d'investissement valant $U$ contre un actif valant $V$. Volatilités $\sigma_U$ et $\sigma_V$, corrélation $\rho$. **Aucun revenu** d'abord.

*Étape 1 — LE CHOIX DÉCISIF : prendre $\boxed{g=U}$ comme numéraire.* En posant $f=V$ dans (27.15) :

$$V_0=U_0\,E_U\!\left[\frac{V_T}{U_T}\right]\;\text{(27.30)}$$

*Étape 2 — appliquer (27.15) à l'option elle-même*, dont le payoff est $f_T=\max(V_T-U_T,0)$ :

$$f_0=U_0\,E_U\!\left[\frac{\max(V_T-U_T,0)}{U_T}\right]=U_0\,E_U\!\left[\max\!\left(\frac{V_T}{U_T}-1,\ 0\right)\right]\;\text{(27.31)}$$

> ⚠️ **C'est tout le tour de force : on a transformé une option sur DEUX actifs en une option sur UN SEUL ratio, de strike 1,0.**

*Étape 3 — la volatilité du ratio :*

$$\boxed{\hat\sigma^2=\sigma_U^2+\sigma_V^2-2\rho\sigma_U\sigma_V}$$

*Étape 4 — appliquer la formule lognormale :*

$$f_0=U_0\left\{E_U\!\left[\frac{V_T}{U_T}\right]N(d_1)-N(d_2)\right\}$$

$$d_1=\frac{\ln(V_0/U_0)+\hat\sigma^2T/2}{\hat\sigma\sqrt T}\qquad d_2=d_1-\hat\sigma\sqrt T$$

*Étape 5 — substituer (27.30) :*

$$\boxed{f_0=V_0N(d_1)-U_0N(d_2)}\;\text{(27.32)}$$

**Le cas avec revenus $q_U$ et $q_V$.** L'extension de (27.15) donne

$$E_U\!\left[\frac{V_T}{U_T}\right]=e^{(q_U-q_V)T}\frac{V_0}{U_0}\qquad f_0=e^{-q_UT}U_0\,E_U\!\left[\max\!\left(\frac{V_T}{U_T}-1,0\right)\right]$$

d'où

$$\boxed{f_0=e^{-q_VT}V_0N(d_1)-e^{-q_UT}U_0N(d_2)}$$

$$d_1=\frac{\ln(V_0/U_0)+(q_U-q_V+\hat\sigma^2/2)T}{\hat\sigma\sqrt T}\qquad d_2=d_1-\hat\sigma\sqrt T$$

**C'est exactement la formule de Margrabe (25.5) de la fiche 97** — et l'on voit ici **pourquoi elle ne contient pas $r$** : on a **utilisé $U$ comme unité de compte**, jamais le compte monétaire.

</details>

## 🔴 Concept 8 — Le changement de numéraire

### 8.1 L'ajustement de drift

**Le cas d'un titre négocié.** Dans un monde où le prix du risque de $dz_i$ est $\lambda_i$ puis $\lambda_i^\ast$ :

$$df=\left(r+\sum_i\lambda_i\sigma_{f,i}\right)f\,dt+\cdots\qquad\text{puis}\qquad df=\left(r+\sum_i\lambda_i^\ast\sigma_{f,i}\right)f\,dt+\cdots$$

> ***L'effet de passer du premier monde au second est donc d'AUGMENTER le taux de croissance espéré du prix de tout titre négocié $f$ de $\displaystyle\sum_{i=1}^{n}(\lambda_i^\ast-\lambda_i)\sigma_{f,i}$.***

**Le cas d'une variable quelconque.** ***Le taux de croissance espéré d'une variable $v$ qui N'EST PAS le prix d'un titre négocié RÉPOND DE LA MÊME FAÇON.*** Il augmente de :

$$\boxed{\alpha_v=\sum_{i=1}^{n}(\lambda_i^\ast-\lambda_i)\,\sigma_{v,i}}\;\text{(27.33)}$$

<details class="details--riche">
<summary>

**Du changement de mesure au ratio de numéraire — le résultat final**

</summary>

*Étape 1 — les deux prix du risque.* En passant d'un numéraire $g$ à un numéraire $h$ :

$$\lambda_i=\sigma_{g,i}\qquad\lambda_i^\ast=\sigma_{h,i}$$

*Étape 2 — définir le **RATIO DE NUMÉRAIRE** :*

$$\boxed{w=\frac hg}$$

*Étape 3 — par le lemme d'Itô* (problème 27.14) :

$$\boxed{\sigma_{w,i}=\sigma_{h,i}-\sigma_{g,i}}$$

*Étape 4 — substituer dans (27.33) :*

$$\boxed{\alpha_v=\sum_{i=1}^{n}\sigma_{w,i}\,\sigma_{v,i}}\;\text{(27.34)}$$

*Étape 5 — la forme compacte :*

$$\boxed{\alpha_v=\sigma_v\,\sigma_w\,\rho}\;\text{(27.35)}$$

où $\sigma_v$ est la volatilité **totale** de $v$, $\sigma_w$ celle de $w$, et $\rho$ **la corrélation instantanée** entre les variations de $v$ et de $w$.

> ⚠️ ***« C'est un résultat SURPRENAMMENT SIMPLE. L'ajustement au taux de croissance espéré d'une variable $v$ quand on change de numéraire est LA COVARIANCE INSTANTANÉE ENTRE LA VARIATION EN POURCENTAGE DE $v$ ET LA VARIATION EN POURCENTAGE DU RATIO DE NUMÉRAIRE. »***
>
> ***Ce résultat servira quand les ajustements de TIMING et les QUANTOS seront considérés au chapitre 29.***

</details>

### 8.2 Le cas particulier : du monde réel au monde risque-neutre

*Un cas particulier est le passage **du monde RÉEL au monde risque-neutre TRADITIONNEL** (où tous les prix du risque sont nuls). Cela correspond, dans (27.33), à un taux de croissance de $v$ qui change de $-\sum_{i=1}^{n}\lambda_i\sigma_{v,i}$.*

> ⚠️ ***C'est le résultat de (27.13) quand $v$ est le prix d'un titre négocié. On a montré que c'est AUSSI vrai quand $v$ n'est PAS le prix d'un titre négocié.***
>
> ***En général, LA FAÇON DONT ON PASSE D'UN MONDE À UN AUTRE EST LA MÊME pour les variables qui ne sont pas des prix de titres négociés que pour celles qui le sont.***

## Comment reconnaître le type d'exercice

| Indice dans l'énoncé | Méthode à déclencher |
|---|---|
| Rendement espéré et volatilité d'un dérivé donnés | $\lambda=\dfrac{\mu-r}{\sigma}$ |
| Un $\lambda$ connu, un autre titre sur la même variable | $\mu=r+\lambda\sigma$ |
| Plusieurs sources de risque | $\mu-r=\sum_i\lambda_i\sigma_i$ |
| « le monde risque-neutre » sans précision | $\lambda=0$ : c'est le monde **traditionnel** |
| Payoff versé **uniquement en $T$** | prendre $P(t,T)$ : $f_0=P(0,T)E_T(f_T)$ |
| « prix forward » demandé | $F=E_T(\theta_T)$ — **sauf pour un taux d'intérêt** |
| « prix futures » demandé | espérance dans le monde **traditionnel** |
| Cap, caplet, taux forward | numéraire $P(t,T^\ast)$ : le **taux forward est une martingale** |
| Swaption, taux de swap | numéraire $A(t)$ : le **taux de swap forward est une martingale** |
| Deux actifs à échanger | prendre **l'un des deux** comme numéraire |
| « quel est l'ajustement de drift ? » | $\alpha_v=\sigma_v\sigma_w\rho$ avec $w=h/g$ |
| Taux stochastiques + option sur forward | **modèle de Black** avec $P(0,T)$ |

## Comment résoudre ce type d'exercice

**A — Un calcul de prix de marché du risque.**

1. Identifier **la** variable sous-jacente et vérifier qu'il n'y en a qu'une.
2. $\lambda=\dfrac{\mu-r}{\sigma}$ à partir d'un titre connu.
3. Vérifier le **signe** : $\lambda<0$ signale un actif de **couverture**.
4. Appliquer $\mu=r+\lambda\sigma$ à l'autre titre.
5. Contrôle : la variable sous-jacente n'a **pas besoin** d'être négociable ; si elle l'est et ne verse rien, $\lambda=(m-r)/s$.

**B — Valoriser par changement de numéraire.**

1. Identifier **quand** le payoff est versé et **de quoi** il dépend.
2. Choisir $g$ de sorte que **le ratio $f/g$ soit simple** — idéalement, que $g_T$ soit **connu** (l'obligation zéro-coupon vaut 1 en $T$) ou que $f_T/g_T$ soit une fonction d'une seule variable.
3. Écrire $f_0=g_0E_g[f_T/g_T]$.
4. Identifier **quelle variable est une martingale** sous cette mesure : elle vaut donc **sa valeur forward d'aujourd'hui**.
5. Si la loi conditionnelle est lognormale, appliquer la formule de type Black.

**C — Un ajustement de drift.**

1. Écrire les deux numéraires $g$ (départ) et $h$ (arrivée).
2. Former le **ratio** $w=h/g$ et calculer sa volatilité $\sigma_w$.
3. Calculer $\sigma_v$ et la corrélation $\rho$ entre $v$ et $w$.
4. $\alpha_v=\sigma_v\sigma_w\rho$ **s'AJOUTE** au taux de croissance espéré de $v$.
5. Contrôle : si $v$ et $w$ sont **non corrélées**, **aucun ajustement**.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Croire que $\theta$ doit être un actif négociable | **non** — cela peut être **la température à La Nouvelle-Orléans** |
| Utiliser $(m-r)/s$ pour un actif de **consommation** | interdit : le pétrole n'est **pas** un actif d'investissement |
| Croire que $\sigma$ est toujours positif | il peut être **négatif** ; c'est $\|\sigma\|$ qui est la volatilité |
| Croire que $\lambda$ dépend du dérivé | **non** — il ne dépend que de $\theta$ et de $t$ |
| Croire que changer de $\lambda$ change les volatilités | **non** — cela ne change que **les drifts** |
| Croire qu'il n'existe qu'un monde risque-neutre | il y en a **une infinité**, un par choix de $\lambda$ |
| Confondre martingale et « rendement nul » | martingale = **drift NUL**, la volatilité peut être quelconque |
| Oublier que $f$ et $g$ doivent être des titres **NÉGOCIÉS** | c'est la condition du résultat |
| Prendre $\lambda=0$ avec un numéraire autre que le compte monétaire | il faut $\lambda=\sigma_g$ |
| Mettre l'actualisation **dedans** avec $P(t,T)$ | elle est **dehors** : $P(0,T)E_T(f_T)$ |
| Mettre l'actualisation **dehors** avec le compte monétaire | elle est **dedans** : $\hat E[e^{-\bar rT}f_T]$ |
| Appliquer $F=E_T(\theta_T)$ à un **taux d'intérêt** | interdit — un taux forward se définit **différemment** |
| Confondre prix **forward** et prix **futures** | forward → monde **forward risque-neutre** ; futures → monde **traditionnel** |
| Croire que le taux de swap est martingale sous $P(t,T)$ | il l'est sous **l'ANNUITÉ $A(t)$** |
| Oublier d'orthogonaliser des facteurs corrélés | le résultat multi-facteurs suppose des $dz_i$ **indépendants** |
| Croire que Black exige des taux constants | **non** — il tient à taux stochastiques si $F_0$ est le **prix forward** |
| Chercher $r$ dans la formule de Margrabe | il n'y est pas : le numéraire est **$U$**, pas le compte monétaire |
| Oublier le signe de $\rho$ dans $\alpha_v=\sigma_v\sigma_w\rho$ | l'ajustement peut être **négatif** |

## 📌 Ultimate Review

| Élément | Formule / valeur |
|---|---|
| **Le problème** | avec des taux stochastiques, « valorisation risque-neutre » est **ambigu** |
| **Processus de la variable** | $d\theta/\theta=m\,dt+s\,dz$ |
| **La contrainte de non-arbitrage** | $\dfrac{\mu_1-r}{\sigma_1}=\dfrac{\mu_2-r}{\sigma_2}$ |
| **Prix de marché du risque** | $\lambda=\dfrac{\mu-r}{\sigma}$ — le **ratio de SHARPE** |
| **Forme équivalente** | $\mu-r=\lambda\sigma$ — quantité × prix du risque |
| **Analogie** | le **MEDAF** |
| **Signe de $\sigma$** | il peut être **négatif** ; $\|\sigma\|$ est la volatilité |
| **Exemple 27.1** | $(0{,}12-0{,}08)/0{,}2=\mathbf{0{,}2}$ |
| **Exemple 27.2** | $\lambda=\mathbf{-0{,}15}$ → second titre à **1,5 %** |
| **Monde traditionnel** | $\boxed{\lambda=0}$, $df=rf\,dt+\sigma f\,dz$ |
| **Monde général** | $df=(r+\lambda\sigma)f\,dt+\sigma f\,dz$ |
| **Ce qui change / ne change pas** | les **drifts** changent, les **volatilités NON** |
| **Autre nom du choix de $\lambda$** | **définir la MESURE de probabilité** |
| **Plusieurs facteurs** | $\mu-r=\sum_i\lambda_i\sigma_i$ |
| **Exemple 27.3** | $0{,}2(0{,}05)-0{,}1(0{,}10)+0{,}4(0{,}15)=\mathbf{6\,\%}$ |
| **Théories liées** | **APT** (Ross, 1976) ; le **MEDAF** en est un cas particulier |
| **MEDAF** | $\lambda_i\propto$ corrélation avec le marché ; **nul** si non corrélé |
| **Martingale** | $d\theta=\sigma\,dz$, drift **NUL** |
| **Sa propriété** | $E(\theta_T)=\theta_0$ |
| **Numéraire** | le titre $g$ servant d'**unité de mesure** |
| **Résultat MME** | avec $\lambda=\sigma_g$, **$f/g$ est martingale pour TOUT $f$** |
| **Sa formule** | $f_0=g_0E_g[f_T/g_T]$ |
| **Le processus obtenu** | $d(f/g)=(\sigma_f-\sigma_g)(f/g)\,dz$ |
| **Nom du monde** | ***forward risque-neutre par rapport à $g$*** |
| **Avec revenus** | $f_0=g_0e^{(q_f-q_g)T}E_g[f_T/g_T]$ |
| **Compte monétaire** | drift **stochastique**, volatilité **NULLE** → $\lambda=0$ |
| **Sa formule** | $f_0=\hat E[e^{-\bar rT}f_T]$ — actualisation **DEDANS** |
| **Son usage** | simuler le **taux court** et actualiser au taux moyen **du chemin** |
| **Zéro-coupon $P(t,T)$** | $f_0=P(0,T)E_T(f_T)$ — actualisation **DEHORS** |
| **Le corollaire** | $F=E_T(\theta_T)$ — **sauf pour un taux d'intérêt** |
| **Forward contre futures** | forward → monde **forward RN** ; futures → monde **traditionnel** |
| **Taux forward** | $R(t,T,T^\ast)=\dfrac{1}{T^\ast-T}\left[\dfrac{P(t,T)}{P(t,T^\ast)}-1\right]$ |
| **Sa martingale** | $R(0,T,T^\ast)=E_{T^\ast}[R(T,T,T^\ast)]$ → **CAPS** |
| **Facteur d'annuité** | $A(t)=\sum_{i=0}^{N-1}(T_{i+1}-T_i)P(t,T_{i+1})$ |
| **Taux de swap forward** | $s(t)=\dfrac{P(t,T_0)-P(t,T_N)}{A(t)}$ |
| **Sa martingale** | $s(0)=E_A[s(T)]$ → **SWAPTIONS** |
| **Formule sous $A$** | $f_0=A(0)E_A[f_T/A(T)]$ |
| **Multi-facteurs** | forward RN quand $\lambda_i=\sigma_{g,i}$ **pour tout $i$** |
| **Facteurs corrélés** | on peut les **ORTHOGONALISER** |
| **Modèle de Black** | $c=P(0,T)[F_0N(d_1)-KN(d_2)]$ |
| **Le pont** | $E_T(F_T)=E_T(S_T)=F_0$ |
| **Sa portée** | actifs d'**investissement ET de consommation**, taux **stochastiques** |
| **Option d'échange, astuce** | prendre $g=U$ → option sur $V/U$ de strike **1,0** |
| **Volatilité du ratio** | $\hat\sigma=\sqrt{\sigma_U^2+\sigma_V^2-2\rho\sigma_U\sigma_V}$ |
| **Le résultat** | $f_0=V_0N(d_1)-U_0N(d_2)$ |
| **Pourquoi pas de $r$** | le numéraire est **$U$**, pas le compte monétaire |
| **Changement de numéraire** | $\alpha_v=\sum_i(\lambda_i^\ast-\lambda_i)\sigma_{v,i}$ |
| **Ratio de numéraire** | $w=h/g$, avec $\sigma_{w,i}=\sigma_{h,i}-\sigma_{g,i}$ |
| **Le résultat final** | $\boxed{\alpha_v=\sigma_v\sigma_w\rho}$ |
| **Son sens** | la **COVARIANCE** entre les variations en % de $v$ et du **ratio de numéraire** |
| **Son usage futur** | les ajustements de **timing** et les **QUANTOS** (chapitre 29) |
| **Cas particulier** | le passage réel → traditionnel vaut **aussi** pour les variables non négociées |

## 🧠 Active Recall

1. Quelles trois questions Hull pose-t-il sur le sens de « valorisation risque-neutre » à taux stochastiques ?
2. Écrire (27.1). $\theta$ doit-il être un actif négociable ? Donner l'exemple de Hull.
3. Pourquoi le $dz$ des deux dérivés est-il le même ?
4. Construire le portefeuille instantanément sans risque et montrer que $\Delta z$ disparaît.
5. Dériver (27.6) et expliquer pourquoi les deux membres doivent être égaux à une constante.
6. Définir le prix de marché du risque. Quel est son autre nom ?
7. Écrire (27.9) et interpréter chacun de ses trois termes.
8. De quoi $\lambda$ dépend-il ? De quoi ne dépend-il pas ?
9. $\sigma$ peut-il être négatif ? Que vaut alors la volatilité ? Pourquoi ?
10. Quand a-t-on $\lambda=(m-r)/s$ ?
11. Refaire l'exemple 27.1 et dire pourquoi on ne peut pas utiliser le pétrole lui-même.
12. Refaire l'exemple 27.2 en entier. Que signifie un $\lambda$ négatif ?
13. Écrire le processus de $f$ dans un monde de prix du risque $\lambda$.
14. Que vaut $\lambda$ dans le monde risque-neutre traditionnel ?
15. Qu'est-ce qui change et qu'est-ce qui ne change pas quand on change de $\lambda$ ?
16. Quel autre nom donne-t-on au choix d'un prix de marché du risque ?
17. Écrire (27.12) et interpréter $\sigma_i\,dz_i$.
18. Écrire (27.13). Que signifie $\lambda_i\sigma_i<0$ ?
19. Refaire l'exemple 27.3 en détaillant les trois contributions.
20. Que se passe-t-il si d'autres variables affectent le cours ?
21. Quelle théorie de 1976 (27.13) généralise-t-elle ?
22. En quoi le MEDAF en est-il un cas particulier ?
23. À quoi $\lambda_i$ est-il proportionnel sous le MEDAF ?
24. Définir une martingale et donner sa propriété essentielle.
25. Démontrer intuitivement que $E(\theta_T)=\theta_0$.
26. Qu'est-ce qu'un numéraire ? Que mesure $f/g$ ?
27. Énoncer le résultat de mesure martingale équivalente en trois parties.
28. Pourquoi le choix $\lambda=\sigma_g$ est-il dimensionnellement valide ?
29. Démontrer le résultat par les six étapes d'Itô.
30. Écrire (27.14) et (27.15).
31. Comment s'appelle le monde où $\lambda=\sigma_g$ ?
32. Comment (27.15) se modifie-t-elle si $f$ et $g$ versent des revenus ?
33. Définir le compte de marché monétaire. Quelle est sa volatilité ? son drift ?
34. Écrire (27.18) et (27.19). Que vaut $\bar r$ ?
35. Décrire la procédure de simulation qui en découle.
36. Que devient (27.19) si $r$ est constant ?
37. Écrire (27.20). Quelle est la différence essentielle avec (27.19) ?
38. Pourquoi $P(t,T)$ simplifie-t-il les choses pour un payoff versé en $T$ ?
39. Dériver (27.21) en trois étapes.
40. Énoncer (27.21) en français et donner la restriction.
41. Comparer les mondes dans lesquels prix forward et prix futures sont des espérances.
42. Quelles sont les deux leçons combinées de (27.20) et (27.21) ?
43. Comment un taux forward se définit-il, et en quoi diffère-t-il des autres forwards ?
44. Exprimer $R(t,T,T^\ast)$ en fonction de $P(t,T)$ et $P(t,T^\ast)$.
45. Quels $f$ et $g$ choisit-on pour montrer que le taux forward est une martingale ?
46. Écrire (27.22) et l'énoncer en français.
47. À quel modèle de marché ce résultat prépare-t-il ?
48. Écrire le facteur d'annuité $A(t)$.
49. Pourquoi la jambe variable d'un swap vaut-elle $P(t,T_0)-P(t,T_N)$ ?
50. Dériver (27.23) puis (27.24).
51. Écrire (27.25). À quel modèle prépare-t-il ?
52. Pourquoi $A(t)$ est-il un numéraire légitime ?
53. Écrire la condition de forward risque-neutralité à $n$ facteurs.
54. Pourquoi l'indépendance des facteurs n'est-elle pas critique ?
55. Dériver le modèle de Black à taux stochastiques en cinq étapes.
56. Quelle égalité constitue le pont de la démonstration ?
57. Citer les trois affirmations finales sur la portée du modèle de Black.
58. Quel numéraire choisit-on pour l'option d'échange, et pourquoi est-ce décisif ?
59. Écrire (27.31) et expliquer la transformation qu'elle réalise.
60. Écrire $\hat\sigma$ puis (27.32).
61. Comment la formule se modifie-t-elle avec des revenus $q_U$ et $q_V$ ?
62. Pourquoi la formule de Margrabe ne contient-elle pas $r$ ?
63. De combien le taux de croissance d'un titre négocié augmente-t-il quand on change de mesure ?
64. Ce résultat vaut-il pour une variable non négociée ?
65. Définir le ratio de numéraire et écrire $\sigma_{w,i}$.
66. Écrire (27.34) puis (27.35).
67. Énoncer le résultat final en français.
68. Que se passe-t-il si $v$ et $w$ sont non corrélées ?
69. À quoi ce résultat servira-t-il au chapitre 29 ?
70. Que dit le cas particulier du passage réel → risque-neutre traditionnel ?

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Le problème posé d'entrée ? | À taux **stochastiques**, « risque-neutre » est **ambigu** |
| $\theta$ doit-il être négociable ? | **NON** — même la **température** convient |
| Pourquoi le même $dz$ ? | C'est la **seule source d'incertitude** |
| Composition du portefeuille sans risque ? | $\sigma_2f_2$ de $f_1$ et $-\sigma_1f_1$ de $f_2$ |
| La contrainte obtenue ? | $\dfrac{\mu_1-r}{\sigma_1}=\dfrac{\mu_2-r}{\sigma_2}$ |
| Prix de marché du risque ? | $\lambda=\dfrac{\mu-r}{\sigma}$ |
| Son autre nom ? | Le **ratio de SHARPE** |
| Forme multiplicative ? | $\mu-r=\lambda\sigma$ |
| Que représente $\sigma$ ? | La **quantité** de risque-$\theta$ dans $f$ |
| Que représente $\lambda$ ? | Le **prix** de ce risque |
| De quoi $\lambda$ dépend-il ? | De $\theta$ et $t$ — **pas du dérivé** |
| $\sigma$ peut-il être négatif ? | **OUI**, si $\partial f/\partial\theta<0$ |
| La volatilité est alors ? | $\|\sigma\|$ |
| Pourquoi ? | Le processus a les mêmes propriétés avec $-dz$ |
| Quand $\lambda=(m-r)/s$ ? | Si $\theta$ est un **actif d'investissement sans revenu** |
| Exemple 27.1 : $\lambda$ du pétrole ? | $(0{,}12-0{,}08)/0{,}2=\mathbf{0{,}2}$ |
| Pourquoi pas via le pétrole lui-même ? | C'est un actif de **CONSOMMATION** |
| Exemple 27.2 : $\lambda$ ? | $\mathbf{-0{,}15}$ |
| Rendement du second titre ? | $0{,}06-0{,}15\times0{,}3=\mathbf{1{,}5\,\%}$ |
| Sens d'un $\lambda$ négatif ? | Le titre **couvre** le portefeuille |
| Monde risque-neutre traditionnel ? | $\lambda=\mathbf{0}$ |
| Processus général ? | $df=(r+\lambda\sigma)f\,dt+\sigma f\,dz$ |
| Ce qui change en changeant de $\lambda$ ? | Les **DRIFTS** |
| Ce qui ne change pas ? | Les **VOLATILITÉS** |
| Autre nom du choix de $\lambda$ ? | **Définir la MESURE de probabilité** |
| Combien de mondes risque-neutres ? | Une **infinité** |
| Formule multi-facteurs ? | $\mu-r=\sum_i\lambda_i\sigma_i$ |
| Sens de $\lambda_i\sigma_i<0$ ? | La variable **RÉDUIT** le risque du portefeuille |
| Exemple 27.3 : total ? | $0{,}010-0{,}010+0{,}060=\mathbf{6\,\%}$ |
| Condition pour les autres variables ? | Leur $\lambda$ doit être **nul** |
| Théorie de 1976 associée ? | L'**APT** de **Ross** |
| Le MEDAF est ? | Un **cas particulier** de (27.13) |
| Sous le MEDAF, $\lambda_i$ ? | Proportionnel à la **corrélation avec le marché** |
| Si non corrélé au marché ? | $\lambda_i=\mathbf0$ |
| Définition d'une martingale ? | Processus à **DRIFT NUL** |
| Sa propriété ? | $E(\theta_T)=\theta_0$ |
| $\sigma$ peut-il être stochastique ? | **OUI** |
| Qu'est-ce qu'un numéraire ? | Le titre servant d'**unité de mesure** |
| Que mesure $f/g$ ? | Le prix de $f$ **en unités de $g$** |
| Le résultat MME ? | $f/g$ est martingale si $\lambda=\sigma_g$ |
| Pour combien de titres $f$ ? | **TOUS** |
| Pourquoi le choix est-il valide ? | Même **dimension** : « par racine du temps » |
| Processus obtenu ? | $d(f/g)=(\sigma_f-\sigma_g)(f/g)dz$ |
| La formule maîtresse ? | $f_0=g_0E_g[f_T/g_T]$ |
| Nom du monde ? | **Forward risque-neutre par rapport à $g$** |
| Avec revenus $q_f$, $q_g$ ? | $f_0=g_0e^{(q_f-q_g)T}E_g[f_T/g_T]$ |
| Volatilité du compte monétaire ? | **ZÉRO** |
| Son drift ? | **Stochastique** ($rg\,dt$) |
| Quel monde en découle ? | Le **TRADITIONNEL** ($\lambda=0$) |
| Sa formule ? | $f_0=\hat E[e^{-\bar rT}f_T]$ |
| Où est l'actualisation ? | **DEDANS** l'espérance |
| Que vaut $\bar r$ ? | La **moyenne** de $r$ sur $[0,T]$ |
| Usage pratique ? | Simuler le **taux court**, actualiser au taux moyen **du chemin** |
| Si $r$ est constant ? | On retrouve $f_0=e^{-rT}\hat E(f_T)$ |
| Formule avec $P(t,T)$ ? | $f_0=P(0,T)E_T(f_T)$ |
| Où est l'actualisation ? | **DEHORS** |
| Pourquoi $g_T=1$ ? | $P(T,T)=1$ par définition |
| Le corollaire du forward ? | $F=E_T(\theta_T)$ |
| La restriction ? | **sauf pour un taux d'intérêt** |
| Le prix FUTURES est l'espérance dans quel monde ? | Le **TRADITIONNEL** |
| Le prix FORWARD ? | Le monde **forward risque-neutre** |
| Que suppose-t-on des sous-jacents ? | Que leur espérance égale leur **valeur FORWARD** |
| Définition d'un taux forward ? | Le taux **impliqué par le prix forward d'obligation** |
| Formule de $R(t,T,T^\ast)$ ? | $\dfrac{1}{T^\ast-T}\left[\dfrac{P(t,T)}{P(t,T^\ast)}-1\right]$ |
| $f$ et $g$ choisis ? | $f=\frac{P(t,T)-P(t,T^\ast)}{T^\ast-T}$ et $g=P(t,T^\ast)$ |
| Le résultat ? | $R(0,T,T^\ast)=E_{T^\ast}[R(T,T,T^\ast)]$ |
| À quoi prépare-t-il ? | Le modèle standard des **CAPS** |
| Facteur d'annuité ? | $A(t)=\sum(T_{i+1}-T_i)P(t,T_{i+1})$ |
| Valeur de la jambe fixe ? | $s(t)A(t)$ |
| Valeur de la jambe variable ? | $P(t,T_0)-P(t,T_N)$ |
| Taux de swap forward ? | $\dfrac{P(t,T_0)-P(t,T_N)}{A(t)}$ |
| Le résultat martingale ? | $s(0)=E_A[s(T)]$ |
| À quoi prépare-t-il ? | Le modèle standard des **SWAPTIONS** |
| Formule sous $A$ ? | $f_0=A(0)E_A[f_T/A(T)]$ |
| Pourquoi $A$ est-il un numéraire ? | C'est un **portefeuille d'obligations** |
| Condition multi-facteurs ? | $\lambda_i=\sigma_{g,i}$ **pour tout $i$** |
| Si les facteurs sont corrélés ? | On les **ORTHOGONALISE** |
| Le pont du modèle de Black ? | $E_T(F_T)=E_T(S_T)=F_0$ |
| Formule du call ? | $P(0,T)[F_0N(d_1)-KN(d_2)]$ |
| Formule du put ? | $P(0,T)[KN(-d_2)-F_0N(-d_1)]$ |
| Vaut-il à taux stochastiques ? | **OUI**, si $F_0$ est le **prix forward** |
| Actifs concernés ? | Investissement **ET** consommation |
| Que représente $\sigma_F$ ? | La volatilité du **prix FORWARD** |
| Numéraire de l'option d'échange ? | **$U$**, l'un des deux actifs |
| Ce que cela transforme ? | Une option sur **deux actifs** en option sur **un ratio** |
| Strike du ratio ? | **1,0** |
| Volatilité du ratio ? | $\sqrt{\sigma_U^2+\sigma_V^2-2\rho\sigma_U\sigma_V}$ |
| Le résultat ? | $f_0=V_0N(d_1)-U_0N(d_2)$ |
| Avec revenus ? | $e^{-q_VT}V_0N(d_1)-e^{-q_UT}U_0N(d_2)$ |
| Pourquoi pas de $r$ ? | Le numéraire est **$U$** |
| Effet d'un changement de mesure sur le drift ? | $+\sum_i(\lambda_i^\ast-\lambda_i)\sigma_{f,i}$ |
| Vaut-il pour une variable non négociée ? | **OUI, exactement pareil** |
| Ratio de numéraire ? | $w=h/g$ |
| Sa volatilité ? | $\sigma_{w,i}=\sigma_{h,i}-\sigma_{g,i}$ |
| L'ajustement, forme somme ? | $\alpha_v=\sum_i\sigma_{w,i}\sigma_{v,i}$ |
| L'ajustement, forme compacte ? | $\boxed{\alpha_v=\sigma_v\sigma_w\rho}$ |
| Son interprétation ? | La **COVARIANCE** entre les variations en % de $v$ et de $w$ |
| Si $v$ et $w$ ne sont pas corrélées ? | **Aucun ajustement** |
| À quoi cela servira-t-il ? | Aux ajustements de **timing** et aux **QUANTOS** |
| Le cas particulier réel → traditionnel ? | Croissance modifiée de $-\sum_i\lambda_i\sigma_{v,i}$ |
