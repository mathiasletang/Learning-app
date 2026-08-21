# Fiche 102 — Modèles du taux court : Vasicek, CIR, Ho-Lee, Hull-White et arbres trinomiaux

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché · Modèles de taux |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 30 « Interest Rate Derivatives: Models of the Short Rate » |
| **Difficulté** | Must know — les modèles de structure par terme, et leur mise en arbre |
| **Temps d'étude estimé** | 2 h |
| **Prérequis** | Fiches 92 (arbres), 99 (martingales), 100 (modèles standard de taux), 101 (ajustements) |
| **Concepts clés** | Taux court instantané, modèle de structure par terme, modèle d'équilibre, retour à la moyenne, Rendleman-Bartter, Vasicek, Cox-Ingersoll-Ross, duration $\hat D$, modèle sans arbitrage, Ho-Lee, Hull-White, Black-Derman-Toy, Black-Karasinski, Hull-White à deux facteurs, arbre trinomial de taux, branchements non standard, induction avant, calibration, *outside model hedging* |
| **Poids à l'examen** | $P(t,T)=A(t,T)e^{-B(t,T)r(t)}$ · $dr=[\theta(t)-ar]dt+\sigma dz$ · $\Delta R=\sigma\sqrt{3\Delta t}$ et $j_{\max}=\lceil0{,}184/(a\Delta t)\rceil$ · **les deux étapes** de la construction de l'arbre. |

## 🎯 Vue d'ensemble

```
LA LIMITE DES MODÈLES DU CHAPITRE 28
  ils supposent une LOI LOGNORMALE à un instant futur, mais NE DÉCRIVENT PAS
  comment les taux ÉVOLUENT dans le temps → inutilisables pour les AMÉRICAINES
  et les STRUCTURED NOTES.  Remède : un MODÈLE DE STRUCTURE PAR TERME

LE POINT DE DÉPART   P(t,T) = Ê[e^{−r̄(T−t)}]      R(t,T) = −ln P(t,T)/(T−t)
  ⇒ une fois le processus de r défini, TOUT est déterminé

ÉQUILIBRE (la courbe est une SORTIE)
  Rendleman-Bartter   dr = μ r dt + σ r dz          ⚠️ PAS de retour à la moyenne
  Vasicek             dr = a(b−r)dt + σ dz          r peut devenir NÉGATIF
  CIR                 dr = a(b−r)dt + σ√r dz        r reste POSITIF
  Les deux derniers : P(t,T) = A(t,T) e^{−B(t,T) r(t)}   « modèles AFFINES »

SANS ARBITRAGE (la courbe est une ENTRÉE) — le drift devient FONCTION DU TEMPS
  Ho-Lee            dr = θ(t)dt + σ dz                       θ(t) ≈ F_t(0,t)
  Hull-White        dr = [θ(t) − a r]dt + σ dz               = Ho-Lee + RETOUR À LA MOYENNE
  Black-Derman-Toy  d ln r = [θ(t) − a(t) ln r]dt + σ(t)dz   a(t) = −σ'(t)/σ(t) ⚠️ LIÉS
  Black-Karasinski  idem mais a et σ INDÉPENDANTS

L'ARBRE TRINOMIAL EN DEUX ÉTAPES
  1. arbre pour R* (drift −aR*, valeur initiale 0)   ΔR = σ√(3Δt)   j_max = ⌈0,184/(aΔt)⌉
  2. DÉPLACER les nœuds de α_i par INDUCTION AVANT pour coller à la courbe initiale
```

**La limite énoncée d'entrée.** *Les modèles présentés jusqu'ici supposent que la loi de probabilité d'un taux, d'un prix d'obligation ou d'une autre variable **à un instant futur** est lognormale. ***Ils ont des LIMITES : ils ne fournissent PAS de description de la façon dont les taux ÉVOLUENT DANS LE TEMPS. En conséquence, ils ne peuvent PAS servir à valoriser les dérivés de taux de style AMÉRICAIN ni les structured notes.***

> *Un **MODÈLE DE STRUCTURE PAR TERME** est un modèle **décrivant l'évolution de TOUS les taux zéro-coupon**.* *Note importante : **quand on utilise un modèle de structure par terme, on n'a PAS besoin de faire les ajustements de convexité, de timing et de quanto du chapitre 29** (fiche 101) — le modèle les produit automatiquement.*

## 🔴 Concept 1 — Le cadre : du taux court à toute la courbe

**Le taux court** $r$ en $t$ est *le taux qui s'applique à une période de temps **infinitésimalement courte** en $t$* — le ***taux court INSTANTANÉ***.

> ⚠️ ***Les prix d'obligations, d'options et de dérivés ne dépendent QUE du processus suivi par $r$ DANS UN MONDE RISQUE-NEUTRE. LE PROCESSUS DE $r$ DANS LE MONDE RÉEL EST HORS SUJET.***

Par (27.19) *(fiche 99)*, la valeur en $t$ d'un dérivé versant $f_T$ en $T$ :

$$\boxed{\hat E\big[e^{-\bar r(T-t)}f_T\big]}\;\text{(30.1)}\qquad\Longrightarrow\qquad\boxed{P(t,T)=\hat E\big[e^{-\bar r(T-t)}\big]}\;\text{(30.2)}$$

et comme $P(t,T)=e^{-R(t,T)(T-t)}$ :

$$\boxed{R(t,T)=-\frac{1}{T-t}\ln P(t,T)=-\frac{1}{T-t}\ln\hat E\big[e^{-\bar r(T-t)}\big]}\;\text{(30.4)-(30.5)}$$

> ⚠️ ***« Cette équation permet d'obtenir la structure par terme à tout instant donné à partir de la valeur de $r$ à cet instant et du processus risque-neutre de $r$. Elle montre que, UNE FOIS LE PROCESSUS DE $r$ DÉFINI, TOUT — la courbe zéro initiale ET son évolution dans le temps — EST DÉTERMINÉ. »***

## 🔴 Concept 2 — Les modèles d'équilibre

**La démarche.** *Les modèles d'équilibre partent d'**hypothèses sur des variables économiques** et en **dérivent un processus pour le taux court $r$** ; ils explorent ensuite **ce que ce processus implique** sur les prix d'obligations et d'options.*

**Le modèle à un facteur.** $dr=m(r)\,dt+s(r)\,dz$, où $m$ et $s$ sont fonctions de $r$ **mais indépendantes du temps**.

> ⚠️ ***L'hypothèse d'un facteur unique n'est PAS aussi restrictive qu'elle en a l'air : un modèle à un facteur implique que TOUS les taux bougent DANS LA MÊME DIRECTION sur tout court intervalle, MAIS PAS qu'ils bougent tous DU MÊME MONTANT. La forme de la courbe peut donc CHANGER avec le temps.***

| Modèle | $m(r)$ | $s(r)$ |
|---|---|---|
| **Rendleman et Bartter** | $\mu r$ | $\sigma r$ |
| **Vasicek** | $a(b-r)$ | $\sigma$ |
| **Cox, Ingersoll et Ross (CIR)** | $a(b-r)$ | $\sigma\sqrt r$ |

### 2.1 Rendleman-Bartter et le retour à la moyenne

$$\boxed{dr=\mu r\,dt+\sigma r\,dz}$$

*$r$ suit un **mouvement brownien géométrique** — le même processus que celui supposé pour un cours d'action au chapitre 14. Il se représente par un **arbre binomial** comme au chapitre 12.*

> ⚠️ ***« L'hypothèse que le taux court se comporte comme un cours d'action est un point de départ naturel MAIS LOIN D'ÊTRE IDÉAL. Une différence importante : LES TAUX SEMBLENT ÊTRE RAMENÉS VERS UN NIVEAU MOYEN DE LONG TERME. Ce phénomène s'appelle LE RETOUR À LA MOYENNE. »***

| Niveau de $r$ | Drift induit par le retour à la moyenne |
|---|---|
| **$r$ élevé** | **NÉGATIF** |
| **$r$ faible** | **POSITIF** |

**Les arguments économiques, à savoir citer.** *« **Il y a des arguments économiques CONVAINCANTS en faveur du retour à la moyenne. Quand les taux sont ÉLEVÉS, l'économie tend à RALENTIR et la demande de fonds des emprunteurs est FAIBLE : les taux baissent. Quand les taux sont BAS, la demande de fonds tend à être ÉLEVÉE et les taux tendent à MONTER.** »*

⚠️ **Le modèle de Rendleman-Bartter n'incorpore PAS le retour à la moyenne.**

### 2.2 Vasicek et CIR

$$\boxed{\text{Vasicek}\ :\ dr=a(b-r)\,dt+\sigma\,dz}\qquad\boxed{\text{CIR}\ :\ dr=a(b-r)\,dt+\sigma\sqrt r\,dz}$$

*Vasicek : le taux court est **tiré vers un niveau $b$ au rythme $a$**, superposé à un terme stochastique **normalement distribué** $\sigma\,dz$. CIR : **même drift de retour à la moyenne**, mais **l'écart-type est proportionnel à $\sqrt r$** — **quand le taux court augmente, l'écart-type augmente**.*

<details class="details--riche">
<summary>

**Les formules de prix d'obligation — la forme AFFINE commune**

</summary>

$$\boxed{P(t,T)=A(t,T)\,e^{-B(t,T)\,r(t)}}\;\text{(30.6)}$$

**VASICEK :**

$$\boxed{B(t,T)=\frac{1-e^{-a(T-t)}}{a}}\;\text{(30.7)}$$

$$\boxed{A(t,T)=\exp\left[\frac{\big(B(t,T)-T+t\big)\big(a^2b-\sigma^2/2\big)}{a^2}-\frac{\sigma^2B(t,T)^2}{4a}\right]}\;\text{(30.8)}$$

*Cas limite : quand $a=0$, $B(t,T)=T-t$ et $A(t,T)=\exp\!\big[\sigma^2(T-t)^3/6\big]$.*

**CIR :** même forme $P=Ae^{-Br}$, mais avec $\gamma=\sqrt{a^2+2\sigma^2}$ :

$$\boxed{B(t,T)=\frac{2\big(e^{\gamma(T-t)}-1\big)}{(\gamma+a)\big(e^{\gamma(T-t)}-1\big)+2\gamma}}$$

$$\boxed{A(t,T)=\left[\frac{2\gamma\,e^{(a+\gamma)(T-t)/2}}{(\gamma+a)\big(e^{\gamma(T-t)}-1\big)+2\gamma}\right]^{2ab/\sigma^2}}$$

</details>

### 2.3 Les propriétés communes

$$\frac{\partial P(t,T)}{\partial r(t)}=-B(t,T)\,P(t,T)\;\text{(30.9)}\qquad\Longrightarrow\qquad R(t,T)=-\frac{\ln A(t,T)}{T-t}+\frac{B(t,T)}{T-t}\,r(t)$$

> ⚠️ **Les trois conséquences, à énoncer précisément :**
>
> 1. *toute la structure par terme en $t$ se détermine **comme fonction de $r(t)$** une fois $a$, $b$, $\sigma$ choisis ;*
> 2. *$R(t,T)$ dépend **LINÉAIREMENT** de $r(t)$ : **la valeur de $r(t)$ détermine LE NIVEAU** de la structure ;*
> 3. ***la FORME de la structure en $t$ est INDÉPENDANTE de $r(t)$, mais dépend de $t$*** — elle peut être **croissante, décroissante, ou légèrement « bossue »** (figure 30.2).

<details class="details--riche">
<summary>

**La duration $\hat D$ adaptée à Vasicek et CIR**

</summary>

**La duration usuelle** $D$ *(fiche 77)* se définit par $\dfrac{\Delta Q}{Q}=-D\,\Delta y$ pour un **déplacement PARALLÈLE** $\Delta y$. La mesure alternative $\hat D$ :

$$\boxed{\frac{\Delta Q}{Q}=-\hat D\,\Delta r\qquad\Longleftrightarrow\qquad\frac{\partial Q}{\partial r}=-\hat D\,Q}$$

⚠️ *Pour un zéro-coupon $P(t,T)$, (30.9) donne directement* $\boxed{\hat D=B(t,T)}$.

**L'exemple chiffré.** *Zéro-coupon à **4 ans** : $D=4$, donc un déplacement parallèle de **10 points de base** fait baisser le prix d'environ **0,4 %**. Avec Vasicek et $a=0{,}1$ :*

$$\hat D=B(0,4)=\frac{1-e^{-0{,}1\times4}}{0{,}1}=\mathbf{3{,}29}$$

*Une hausse de 10 pb du **taux COURT** fait donc baisser le prix d'environ **0,329 %**.*

> ⚠️ ***« La sensibilité du prix aux mouvements du TAUX COURT est INFÉRIEURE à celle aux déplacements PARALLÈLES de la courbe, À CAUSE DE L'IMPACT DU RETOUR À LA MOYENNE. »***

**L'agrégation.** Pour un portefeuille de $n$ zéro-coupon de principaux $c_i$ :

$$\hat D=\frac1Q\frac{\partial Q}{\partial r}=\sum_{i=1}^{n}\frac{c_iP(t,T_i)}{Q}\hat D_i$$

*Le $\hat D$ d'une obligation à coupon est donc **une moyenne pondérée** des $\hat D$ des zéro-coupon sous-jacents — exactement comme la duration usuelle.*

**Les processus des prix d'obligations.** *Le taux de croissance espéré de $P(t,T)$ dans le monde risque-neutre est $r(t)$ — puisque $P(t,T)$ est **le prix d'un titre négocié**. Par Itô, le coefficient de $dz$ est $\sigma\,\partial P/\partial r$ pour Vasicek et $\sigma\sqrt r\,\partial P/\partial r$ pour CIR, d'où :*

$$\boxed{\text{Vasicek}:\ dP=rP\,dt-\sigma B(t,T)P\,dz}$$

$$\boxed{\text{CIR}:\ dP=rP\,dt-\sigma\sqrt{r}\,B(t,T)P\,dz}$$

**Comparer les deux modèles.** *Pour comparer à un même $r$, on utilise les **mêmes $a$ et $b$**, mais $\sigma_{\text{vas}}$ doit valoir approximativement $\sigma_{\text{cir}}\sqrt r$. **Exemple : si $r=4\,\%$ et $\sigma_{\text{vas}}=0{,}01$, la valeur appropriée de $\sigma_{\text{cir}}$ est $0{,}01/\sqrt{0{,}04}=\mathbf{0{,}05}$.*** *Vasicek donne des rendements **plus bas** que CIR.*

|  | **Vasicek** | **CIR** |
|---|---|---|
| Taux négatifs ? | **POSSIBLES** | **IMPOSSIBLES** |
| Pourquoi ? | terme $\sigma\,dz$ **normal** | *quand les taux approchent zéro, **la variabilité devient très petite***. **Le taux zéro lui-même est impossible si $2ab>\sigma^2$** |

</details>

### 2.4 À quoi servent les modèles d'équilibre

> ⚠️ *Pour **valoriser des dérivés**, il est important que le modèle **colle EXACTEMENT à la structure par terme courante** (§3). ***MAIS quand on mène une simulation de Monte-Carlo sur une LONGUE période pour de l'analyse de scénarios, les modèles d'équilibre sont des OUTILS UTILES.*** Un fonds de pension ou un assureur qui s'intéresse à la valeur de son portefeuille **dans 20 ans** estimera probablement que **la forme précise de la structure par terme d'aujourd'hui a relativement peu d'incidence sur ses risques.*

**Les deux approches d'estimation, et leur différence essentielle :**

| Approche | Ce qu'elle donne |
|---|---|
| Ajuster sur les **variations passées du taux court** (régression linéaire, maximum de vraisemblance) | des paramètres du **MONDE RÉEL** |
| Ajuster sur les **prix d'obligations** du marché | des paramètres du **MONDE RISQUE-NEUTRE** |

> *Pour une **analyse de scénarios**, on veut modéliser le taux court **dans le monde RÉEL**. Mais on veut **aussi** connaître **la structure par terme complète** à différents instants — et pour cela **il faut des paramètres RISQUE-NEUTRES**.*
>
> ⚠️ ***« Quand on passe du monde réel au monde risque-neutre, LA VOLATILITÉ du taux court NE CHANGE PAS, mais LE DRIFT si. »*** *Pour déterminer le changement de drift, il faut **estimer le PRIX DE MARCHÉ DU RISQUE DE TAUX**.*

**L'estimation d'Ahmad et Wilmott.** *Ils comparent la pente de la courbe zéro au drift réel du taux court. **Leur estimation de la moyenne de long terme du prix de marché du risque de taux, pour les taux américains, est d'environ $-1{,}2$.** Il y a une variation considérable dans le temps : **pendant les conditions de marché tendues, quand le « facteur de PEUR » est élevé (par exemple pendant la crise de 2007-2009), le prix de marché du risque de taux était un nombre négatif BIEN PLUS GRAND que $-1{,}2$.***

<details class="details--riche">
<summary>

**Exemples 30.2 et 30.3 — passer du réel au risque-neutre et réciproquement**

</summary>

**Exemple 30.2 — VASICEK, du RÉEL au RISQUE-NEUTRE.**

*Étape 1 — estimer sur données hebdomadaires* (10 ans), avec la version discrète $\Delta r=a(b-r)\Delta t+\sigma\varepsilon\sqrt{\Delta t}$. Par régression de $\Delta r$ sur $r$, ou par **maximum de vraisemblance** avec la fonction :

$$\sum_{i=1}^{m}\left[-\ln(\sigma^2\Delta t)-\frac{\big[r_i-r_{i-1}-a(b-r_{i-1})\Delta t\big]^2}{\sigma^2\Delta t}\right]\qquad\Delta t=\frac{1}{52}$$

*Étape 2 — les résultats :* $a=0{,}2$, $b=0{,}04$, $\sigma=0{,}01$. *(Le taux court **revient à 4,0 % à un rythme de 20 %** ; la volatilité **proportionnelle** du taux court est **1 % divisée par le taux court**.)*

*Étape 3 — passer au risque-neutre.* Le **drift proportionnel** est $a(b-r)/r$ et la volatilité proportionnelle $\sigma/r$. Par le chapitre 27, **le drift proportionnel DIMINUE de $\lambda\sigma/r$** quand on passe au risque-neutre :

$$dr=\big[a(b-r)-\lambda\sigma\big]dt+\sigma\,dz=a(b^\ast-r)\,dt+\sigma\,dz\qquad\text{avec}\qquad\boxed{b^\ast=b-\frac{\lambda\sigma}{a}}$$

*Étape 4 — appliquer $\lambda=-1{,}2$ :*

$$b^\ast=0{,}04+\frac{1{,}2\times0{,}01}{0{,}2}=\mathbf{0{,}10}$$

*Les équations (30.6) à (30.8) avec $b=b^\ast$ donnent alors **toute la structure par terme à tout instant de la simulation**.*

⚠️ **Le fait marquant :** le niveau de retour à la moyenne passe de **4 %** dans le monde réel à **10 %** dans le monde risque-neutre — l'écart est **énorme**.

**Exemple 30.3 — CIR, du RISQUE-NEUTRE au RÉEL.**

*Étape 1 — ajuster sur les prix d'obligations* en minimisant la somme des carrés des écarts : $a=0{,}15$, $b=0{,}06$, $\sigma=0{,}05$. **Ce sont des paramètres RISQUE-NEUTRES.**

*Étape 2 — passer au réel.* Le drift proportionnel est $a(b-r)/r$ et la volatilité $\sigma/\sqrt r$. **Le drift proportionnel AUGMENTE de $\lambda\sigma/\sqrt r$** :

$$\boxed{dr=\big[a(b-r)+\lambda\sigma\sqrt r\big]dt+\sigma\sqrt r\,dz}$$

*Étape 3 :* on simule le taux court **dans le monde réel** avec ce processus, et **à tout instant on détermine les taux longs par le processus RISQUE-NEUTRE et les résultats analytiques**. Là encore on peut poser $\lambda=-1{,}2$.

⚠️ *Note de Hull : pour CIR, **il peut être commode de supposer $\lambda$ proportionnel à $\sqrt r$ ou à $1/\sqrt r$**, pour **préserver la forme fonctionnelle du drift**.*

</details>

## 🔴 Concept 3 — Les modèles sans arbitrage

### 3.1 La différence essentielle

> ⚠️ ***« L'inconvénient des modèles d'équilibre est qu'ils NE COLLENT PAS AUTOMATIQUEMENT à la structure par terme d'aujourd'hui. La plupart des traders trouvent cela insatisfaisant. Non sans raison, ils soutiennent qu'ils peuvent avoir TRÈS PEU CONFIANCE dans le prix d'une option sur obligation quand le modèle utilisé NE VALORISE PAS CORRECTEMENT L'OBLIGATION SOUS-JACENTE. UNE ERREUR DE 1 % SUR LE PRIX DE L'OBLIGATION PEUT CONDUIRE À UNE ERREUR DE 25 % SUR LE PRIX DE L'OPTION. »***

$$\boxed{\begin{array}{l}\textbf{Modèle d'ÉQUILIBRE}\ :\ \text{la structure par terme d'aujourd'hui est une }\textbf{SORTIE}\\[3pt]\textbf{Modèle SANS ARBITRAGE}\ :\ \text{elle est une }\textbf{ENTRÉE}\end{array}}$$

**La conséquence sur le drift.** *Dans un modèle d'équilibre, le drift du taux court **n'est habituellement PAS fonction du temps**. Dans un sans arbitrage, **il l'est EN GÉNÉRAL — parce que la forme de la courbe zéro initiale GOUVERNE LE CHEMIN MOYEN suivi par le taux court dans le futur** :*

| Forme de la courbe entre $t_1$ et $t_2$ | Drift de $r$ entre ces dates |
|---|---|
| Fortement **croissante** | **POSITIF** |
| Fortement **décroissante** | **NÉGATIF** |

> ***Certains modèles d'équilibre se convertissent en modèles sans arbitrage EN INCLUANT UNE FONCTION DU TEMPS DANS LE DRIFT du taux court.***

### 3.2 Ho-Lee (1986) — le premier

$$\boxed{dr=\theta(t)\,dt+\sigma\,dz}\;\text{(30.10)}$$

*où $\sigma$, l'écart-type instantané du taux court, est **constant**, et $\theta(t)$ une fonction du temps choisie pour coller à la structure initiale. **$\theta(t)$ définit la DIRECTION MOYENNE dans laquelle $r$ bouge en $t$ — ce qui est INDÉPENDANT DU NIVEAU de $r$.***

⚠️ *Ho et Lee ont présenté le modèle sous forme d'un **arbre binomial de PRIX D'OBLIGATIONS** à deux paramètres : l'écart-type du taux court et le prix de marché du risque. **Leur paramètre de prix du risque est HORS SUJET quand le modèle sert à valoriser des dérivés de taux.***

$$\boxed{\theta(t)=F_t(0,t)+\sigma^2t}\;\text{(30.11)}$$

où $F(0,t)$ est **le taux forward instantané** de maturité $t$ vu en 0, et l'indice $t$ dénote une dérivée partielle.

> ***En approximation, $\theta(t)$ égale $F_t(0,t)$. Cela signifie que LA DIRECTION MOYENNE dans laquelle le taux court bougera est APPROXIMATIVEMENT LA PENTE DE LA COURBE FORWARD INSTANTANÉE.***

**Le prix d'une obligation :**

$$\boxed{P(t,T)=A(t,T)\,e^{-r(t)(T-t)}}\qquad\boxed{\ln A(t,T)=\ln\frac{P(0,T)}{P(0,t)}+(T-t)F(0,t)-\tfrac12\sigma^2t(T-t)^2}\;\text{(30.12)}$$

⚠️ *Ces équations définissent le prix d'un zéro-coupon **à une date FUTURE $t$** en fonction du **taux court en $t$** et des **prix d'obligations d'AUJOURD'HUI** — ces derniers se calculant de la structure par terme courante.*

### 3.3 Hull-White (1990) — la référence

$$\boxed{dr=\big[\theta(t)-ar\big]\,dt+\sigma\,dz}\;\text{(30.13)}\qquad\Longleftrightarrow\qquad dr=a\left[\frac{\theta(t)}{a}-r\right]dt+\sigma\,dz$$

**Les deux lectures équivalentes, à connaître :**

| Lecture | Énoncé |
|---|---|
| **1** | **le modèle de HO-LEE AVEC RETOUR À LA MOYENNE au rythme $a$** |
| **2** | **le modèle de VASICEK avec un NIVEAU DE RETOUR DÉPENDANT DU TEMPS** : en $t$, le taux court revient vers $\theta(t)/a$ au rythme $a$ |

⚠️ ***Ho-Lee est le cas particulier $a=0$.** Le modèle a **la même traçabilité analytique** que Ho-Lee.*

$$\boxed{\theta(t)=F_t(0,t)+aF(0,t)+\frac{\sigma^2}{2a}\big(1-e^{-2at}\big)}\;\text{(30.14)}$$

> *Le dernier terme est habituellement **assez petit**. En l'ignorant, l'équation implique que le drift de $r$ en $t$ est $F_t(0,t)+a[F(0,t)-r]$. ***Cela montre qu'EN MOYENNE $r$ SUIT LA PENTE de la courbe forward instantanée initiale ; quand il s'en écarte, IL Y REVIENT au rythme $a$.***

**Les prix d'obligations :**

$$\boxed{P(t,T)=A(t,T)e^{-B(t,T)r(t)}}\;\text{(30.15)}\qquad\boxed{B(t,T)=\frac{1-e^{-a(T-t)}}{a}}\;\text{(30.16)}$$

$$\boxed{\ln A(t,T)=\ln\frac{P(0,T)}{P(0,t)}+B(t,T)F(0,t)-\frac{1}{4a^3}\sigma^2\big(e^{-aT}-e^{-at}\big)^2\big(e^{2at}-1\big)}\;\text{(30.17)}$$

### 3.4 Les modèles lognormaux

<details class="details--riche">
<summary>

**Black-Derman-Toy (1990) et Black-Karasinski (1991)**

</summary>

**Black-Derman-Toy.** *Proposé sous forme d'un **arbre binomial** pour un processus de taux court **LOGNORMAL**. Le processus stochastique correspondant est :*

$$\boxed{d\ln r=\big[\theta(t)-a(t)\ln r\big]dt+\sigma(t)\,dz}\qquad\text{avec}\qquad\boxed{a(t)=-\frac{\sigma'(t)}{\sigma(t)}}$$

|  | Verdict |
|---|---|
| **Avantage sur Ho-Lee et Hull-White** | ***le taux ne peut PAS devenir négatif*** : le processus de Wiener peut rendre $\ln r$ négatif, **mais $r$ lui-même reste toujours positif** |
| **Inconvénient 1** | **aucune propriété analytique** |
| **Inconvénient 2 — plus SÉRIEUX** | ***la façon dont l'arbre est construit IMPOSE UNE RELATION entre $\sigma(t)$ et $a(t)$. Le taux de retour n'est POSITIF que si la volatilité du taux court est une fonction DÉCROISSANTE du temps.*** |

*En pratique, la version la plus utile est celle où $\sigma(t)$ est **constante** : $a$ est alors **nul**, il n'y a **plus de retour à la moyenne**, et le modèle se réduit à*

$$d\ln r=\theta(t)\,dt+\sigma\,dz$$

*— **une version LOGNORMALE de Ho-Lee**.

**Black-Karasinski.** *Une extension où **le taux de retour et la volatilité sont déterminés INDÉPENDAMMENT l'un de l'autre*** :

$$d\ln r=\big[\theta(t)-a(t)\ln r\big]dt+\sigma(t)\,dz$$

*identique à BDT **sauf qu'il n'y a plus de relation entre $a(t)$ et $\sigma(t)$**. En pratique, on les suppose souvent constants :*

$$\boxed{d\ln r=\big[\theta(t)-a\ln r\big]dt+\sigma\,dz}\;\text{(30.18)}$$

***Pas de traçabilité analytique**, mais l'arbre trinomial du §5 détermine simultanément $\theta(t)$ et représente le processus.*

</details>

<details class="details--riche">
<summary>

**Le modèle Hull-White à DEUX facteurs**

</summary>

$$\boxed{df(r)=\big[\theta(t)+u-af(r)\big]dt+\sigma_1\,dz_1}\;\text{(30.19)}$$

$$\boxed{du=-bu\,dt+\sigma_2\,dz_2}\qquad\text{avec }u(0)=0$$

| Élément | Rôle |
|---|---|
| $\theta(t)$ | comme toujours, choisie pour **coller à la structure initiale** |
| $u$ | **une COMPOSANTE STOCHASTIQUE du niveau de retour de $f(r)$**, qui revient elle-même vers **zéro** au rythme $b$ |
| $a$, $b$, $\sigma_1$, $\sigma_2$ | constantes ; $dz_1$ et $dz_2$ de corrélation instantanée $\rho$ |

> ⚠️ ***« Ce modèle fournit un profil PLUS RICHE de mouvements de la structure par terme et un profil PLUS RICHE de volatilités que les modèles à un facteur. »***

</details>

## 🟠 Concept 4 — Les options sur obligations et les structures de volatilité

### 4.1 La formule analytique

*Pour **Vasicek, Ho-Lee et Hull-White**, le prix en 0 d'un call de maturité $T$ sur un zéro-coupon maturant en $s$ :*

$$\boxed{c=L\,P(0,s)\,N(h)-K\,P(0,T)\,N(h-\sigma_P)}\;\text{(30.20)}$$

$$\boxed{p=K\,P(0,T)\,N(-h+\sigma_P)-L\,P(0,s)\,N(-h)}$$

$$\boxed{h=\frac{1}{\sigma_P}\ln\frac{L\,P(0,s)}{P(0,T)K}+\frac{\sigma_P}{2}}$$

où $L$ est le principal de l'obligation et $K$ le strike.

| Modèle | $\sigma_P$ |
|---|---|
| **Vasicek et Hull-White** | $\boxed{\dfrac{\sigma}{a}\Big[1-e^{-a(s-T)}\Big]\sqrt{\dfrac{1-e^{-2aT}}{2a}}}$ |
| **Ho-Lee** | $\boxed{\sigma(s-T)\sqrt T}$ |

> ⚠️ ***« (30.20) est ESSENTIELLEMENT LE MÊME que le modèle de Black du §28.1. La volatilité du prix forward de l'obligation est $\sigma_P/\sqrt T$, et l'écart-type du logarithme du prix de l'obligation en $T$ est $\sigma_P$. »***
>
> *Comme un **cap ou un floor** est un portefeuille d'options sur zéro-coupon (fiche 100), **il peut donc être valorisé ANALYTIQUEMENT** avec ces équations.*

*Il existe aussi des formules pour CIR : elles font intervenir des **intégrales de la loi du khi-deux non centrée**.*

### 4.2 Les options sur obligations à COUPON

> ⚠️ ***« Dans un modèle à UN facteur de $r$, TOUS les zéro-coupon montent quand $r$ baisse et TOUS baissent quand $r$ monte. En conséquence, un modèle à un facteur permet d'exprimer une option EUROPÉENNE sur une obligation à COUPON comme LA SOMME D'OPTIONS EUROPÉENNES SUR ZÉRO-COUPON. »***

| Étape | Contenu |
|---|---|
| **1** | Calculer $r^\ast$, **la valeur CRITIQUE de $r$** pour laquelle le prix de l'obligation à coupon égale **le strike** de l'option, à la maturité $T$ |
| **2** | Calculer les prix d'options européennes de maturité $T$ sur **chacun des zéro-coupon** composant l'obligation. **Les strikes de ces options égalent les valeurs qu'auront les zéro-coupon en $T$ QUAND $r=r^\ast$** |
| **3** | Le prix de l'option sur l'obligation à coupon est **la SOMME** des prix calculés à l'étape 2 |

*Applicable à **Vasicek, CIR, Ho-Lee et Hull-White**. **Comme une swaption européenne peut être vue comme une option sur obligation à coupon** (Business Snapshot 28.2, fiche 100), **elle peut être valorisée par cette procédure**.*

### 4.3 Les structures de volatilité

**Figure 30.5 — volatilité du taux forward à 3 mois en fonction de la maturité** *(courbe zéro supposée plate)* :

| Modèle | Profil |
|---|---|
| **Ho-Lee** | **LA MÊME pour toutes les maturités** — la volatilité est **plate** |
| **Hull-White à un facteur** | *l'effet du retour à la moyenne fait de la volatilité une **fonction DÉCROISSANTE** de la maturité* |
| **Hull-White à deux facteurs** *(paramètres choisis convenablement)* | **un profil « BOSSU »** — *cohérent avec les preuves empiriques et les volatilités de caps implicites du §28.2* |

## 🔴 Concept 5 — La construction de l'arbre trinomial

### 5.1 Les arbres de taux : ce qui change par rapport aux actions

> ***Un arbre de taux est une représentation en temps discret du processus du taux court, exactement comme un arbre de cours l'est pour une action. Si le pas est $\Delta t$, **les taux sur l'arbre sont les taux $\Delta t$-périodiques composés en continu**. L'hypothèse usuelle est que **le taux $\Delta t$-périodique $R$ suit LE MÊME processus stochastique que le taux instantané $r$**.***
>
> ⚠️ ***« LA DIFFÉRENCE PRINCIPALE entre arbres de taux et arbres de cours est LA FAÇON DONT L'ACTUALISATION EST FAITE. Dans un arbre de cours, le taux d'actualisation est habituellement le même à chaque nœud. DANS UN ARBRE DE TAUX, LE TAUX D'ACTUALISATION VARIE DE NŒUD EN NŒUD. »***

**Pourquoi TRINOMIAL ?** *« **L'avantage principal d'un arbre trinomial est qu'il fournit UN DEGRÉ DE LIBERTÉ SUPPLÉMENTAIRE, rendant plus facile la représentation de caractéristiques comme LE RETOUR À LA MOYENNE.** »* *Rappel (fiche 92) : **utiliser un arbre trinomial équivaut à utiliser la méthode des différences finies EXPLICITE**.*

<details class="details--riche">
<summary>

**Figure 30.6 — l'illustration à deux pas, entièrement recalculée**

</summary>

**Le cadre.** Arbre à **deux pas**, $\Delta t=1$ an. Probabilités **haut / milieu / bas = 0,25 / 0,50 / 0,25** à chaque nœud. Le dérivé verse, à la fin du second pas :

$$\max\big[100(R-0{,}11),\ 0\big]$$

*Étape 1 — les nœuds finaux.* Au nœud **E**, $R=14\,\%$ :

$$100\times(0{,}14-0{,}11)=\mathbf{3}$$

*(et 1 au nœud F où $R=12\,\%$, 0 ailleurs)*

*Étape 2 — le nœud B, où le taux à 1 an est **12 %** :*

$$\big[0{,}25\times3+0{,}5\times1+0{,}25\times0\big]e^{-0{,}12\times1}=1{,}25\times0{,}88692=\mathbf{1{,}11}$$

*Étape 3 — le nœud C, où le taux est **10 %** :*

$$\big(0{,}25\times1+0{,}5\times0+0{,}25\times0\big)e^{-0{,}10\times1}=\mathbf{0{,}23}$$

*Étape 4 — le nœud initial A, taux **10 %** :*

$$\big(0{,}25\times1{,}11+0{,}5\times0{,}23+0{,}25\times0\big)e^{-0{,}10\times1}=\boxed{\mathbf{0{,}35}}$$

⚠️ **Noter que 12 % a servi à actualiser en B et 10 % en C — c'est toute la différence avec un arbre d'actions.**

</details>

**Les trois branchements (figure 30.7)** :

| Type | Description | Usage |
|---|---|---|
| **(a)** | « **monter d'un / tout droit / descendre d'un** » | le branchement **usuel** |
| **(b)** | « **monter de deux / monter d'un / tout droit** » | *incorporer le retour à la moyenne quand les taux sont **TRÈS BAS*** |
| **(c)** | « **tout droit / descendre d'un / descendre de deux** » | *incorporer le retour à la moyenne quand les taux sont **TRÈS HAUTS*** |

### 5.2 Première étape — l'arbre pour $R^\ast$

*On construit d'abord un arbre pour une variable $R^\ast$ **initialement nulle** suivant :*

$$\boxed{dR^\ast=-aR^\ast\,dt+\sigma\,dz}$$

⚠️ ***Ce processus est SYMÉTRIQUE autour de $R^\ast=0$.*** En ignorant les termes d'ordre supérieur à $\Delta t$ :

$$E\big[R^\ast(t+\Delta t)-R^\ast(t)\big]=-aR^\ast(t)\Delta t\qquad\text{Var}=\sigma^2\Delta t$$

$$\boxed{\Delta R=\sigma\sqrt{3\Delta t}}\qquad\text{— « un bon choix du point de vue de la MINIMISATION DE L'ERREUR »}$$

**Le choix du branchement.** Avec $(i,j)$ le nœud où $t=i\Delta t$ et $R^\ast=j\Delta R$ :

$$\boxed{j_{\max}=\text{le plus petit entier}>\frac{0{,}184}{a\Delta t}\qquad j_{\min}=-j_{\max}}$$

> *Au-delà de $j_{\max}$ on **bascule du branchement (a) vers (c)** ; en deçà de $j_{\min}$, **de (a) vers (b)**. **Hull et White montrent que les probabilités sont TOUJOURS POSITIVES avec ce choix.***
>
> ⚠️ *Les probabilités restent positives **pour tout $j_{\max}$ entre $0{,}184/(a\Delta t)$ et $0{,}816/(a\Delta t)$**. **Changer le branchement au PREMIER nœud possible se révèle le plus efficace en calcul.***

<details class="details--riche">
<summary>

**Les neuf formules de probabilités**

</summary>

**Les trois équations à satisfaire** au nœud $(i,j)$, pour apparier moyenne, variance et somme :

$$p_u\Delta R-p_d\Delta R=-aj\Delta R\,\Delta t$$

$$p_u\Delta R^2+p_d\Delta R^2=\sigma^2\Delta t+a^2j^2\Delta R^2\Delta t^2$$

$$p_u+p_m+p_d=1$$

**Branchement (a) — usuel :**

$$\boxed{p_u=\tfrac16+\tfrac12\big(a^2j^2\Delta t^2-aj\Delta t\big)\quad p_m=\tfrac23-a^2j^2\Delta t^2\quad p_d=\tfrac16+\tfrac12\big(a^2j^2\Delta t^2+aj\Delta t\big)}$$

**Branchement (b) — taux très bas :**

$$\boxed{p_u=\tfrac16+\tfrac12\big(a^2j^2\Delta t^2+aj\Delta t\big)\quad p_m=-\tfrac13-a^2j^2\Delta t^2-2aj\Delta t\quad p_d=\tfrac76+\tfrac12\big(a^2j^2\Delta t^2+3aj\Delta t\big)}$$

**Branchement (c) — taux très hauts :**

$$\boxed{p_u=\tfrac76+\tfrac12\big(a^2j^2\Delta t^2-3aj\Delta t\big)\quad p_m=-\tfrac13-a^2j^2\Delta t^2+2aj\Delta t\quad p_d=\tfrac16+\tfrac12\big(a^2j^2\Delta t^2-aj\Delta t\big)}$$

**L'illustration (figure 30.8) :** $\sigma=0{,}01$, $a=0{,}1$, $\Delta t=1$ an.

$$\Delta R=0{,}01\sqrt3=\mathbf{0{,}0173}\qquad j_{\max}=\lceil0{,}184/0{,}1\rceil=\lceil1{,}84\rceil=\mathbf{2}\qquad j_{\min}=\mathbf{-2}$$

| Nœud | $j$ | $R^\ast$ (%) | Branchement | $p_u$ | $p_m$ | $p_d$ |
|---|---|---|---|---|---|---|
| **E** | $+2$ | **3,464** | **(c)** | **0,8867** | 0,0266 | 0,0867 |
| B, F | $+1$ | 1,732 | (a) | 0,1217 | 0,6566 | 0,2217 |
| A, C, G | 0 | 0,000 | (a) | 0,1667 | 0,6666 | 0,1667 |
| D, H | $-1$ | $-1{,}732$ | (a) | 0,2217 | 0,6566 | 0,1217 |
| **I** | $-2$ | $\mathbf{-3{,}464}$ | **(b)** | 0,0867 | 0,0266 | **0,8867** |

> ⚠️ **Les deux propriétés remarquables.**
>
> 1. ***Les probabilités à chaque nœud ne dépendent QUE de $j$*** : celles du nœud B sont **les mêmes** que celles du nœud F.
> 2. ***L'arbre est SYMÉTRIQUE*** : les probabilités en D sont **l'image miroir** de celles en B.

</details>

### 5.3 Seconde étape — déplacer les nœuds

> ***La seconde étape convertit l'arbre de $R^\ast$ en arbre de $R$, en DÉPLAÇANT les nœuds de sorte que la structure par terme initiale soit EXACTEMENT appariée.***

$$\alpha(t)=R(t)-R^\ast(t)\qquad\alpha_i=\alpha(i\Delta t)$$

⚠️ *Les $\alpha(t)$ pour $\Delta t\to0$ se calculent **analytiquement** de (30.14) : $\alpha(t)=F(0,t)+\dfrac{\sigma^2}{2a^2}\big(1-e^{-at}\big)^2$. **Mais on veut un arbre à $\Delta t$ FINI qui apparie EXACTEMENT — on utilise donc une PROCÉDURE ITÉRATIVE.***

$$\boxed{Q_{i,j}=\text{la valeur actuelle d'un titre versant 1 dollar SI le nœud }(i,j)\text{ est atteint, et zéro sinon}}$$

> ⚠️ ***Les $\alpha_i$ et $Q_{i,j}$ se calculent par INDUCTION AVANT (forward induction) de sorte que la structure initiale soit appariée exactement.***

<details class="details--riche">
<summary>

**L'illustration complète de la seconde étape**

</summary>

**La courbe zéro (Table 30.1), taux continus :**

| Maturité | 0,5 | 1,0 | 1,5 | 2,0 | 2,5 | 3,0 |
|---|---|---|---|---|---|---|
| **Taux (%)** | 3,430 | **3,824** | 4,183 | **4,512** | 4,812 | 5,086 |

*Étape 1 — le nœud initial.* $Q_{0,0}=1{,}0$. **$\alpha_0$ est choisi pour donner le bon prix d'un zéro-coupon maturant en $\Delta t$ : c'est donc simplement le taux $\Delta t$-périodique initial.** Comme $\Delta t=1$ :

$$\boxed{\alpha_0=\mathbf{0{,}03824}}$$

*Étape 2 — les $Q$ au pas 1.* Il y a une probabilité **0,1667** d'atteindre $(1,1)$ et le taux d'actualisation du premier pas est **3,824 %** :

$$Q_{1,1}=0{,}1667\,e^{-0{,}03824}=\mathbf{0{,}1604}$$

$$Q_{1,0}=0{,}6666\,e^{-0{,}03824}=\mathbf{0{,}6417}\qquad Q_{1,-1}=\mathbf{0{,}1604}$$

*Étape 3 — déterminer $\alpha_1$.* Il est choisi pour donner le bon prix d'un zéro-coupon maturant en $2\Delta t$. Comme $\Delta R=0{,}01732$, le prix vu au nœud B est $e^{-(\alpha_1+0{,}01732)}$, au nœud C $e^{-\alpha_1}$, au nœud D $e^{-(\alpha_1-0{,}01732)}$. Le prix vu en A :

$$Q_{1,1}e^{-(\alpha_1+0{,}01732)}+Q_{1,0}e^{-\alpha_1}+Q_{1,-1}e^{-(\alpha_1-0{,}01732)}\;\text{(30.21)}$$

*Étape 4 — égaler au prix de marché.* La courbe donne $P(0,2)=e^{-0{,}04512\times2}=\mathbf{0{,}9137}$ :

$$e^{-\alpha_1}\big(0{,}1604\,e^{-0{,}01732}+0{,}6417+0{,}1604\,e^{0{,}01732}\big)=0{,}9137$$

$$\alpha_1=\ln\frac{0{,}1604e^{-0{,}01732}+0{,}6417+0{,}1604e^{0{,}01732}}{0{,}9137}=\boxed{\mathbf{0{,}05205}}$$

> ***Le nœud central au pas $\Delta t$ dans l'arbre de $R$ correspond donc à un taux de 5,205 %.***

*Étape 5 — les taux au pas 1 :* B $=0{,}05205+0{,}01732=\mathbf{6{,}937\,\%}$, C $=\mathbf{5{,}205\,\%}$, D $=\mathbf{3{,}473\,\%}$.

*Étape 6 — les $Q$ au pas 2, en RÉUTILISANT les $Q$ précédents.* Le nœud **F** ($j=1$ au pas 2) **n'est atteignable que depuis B et C**, de taux **6,937 %** et **5,205 %**, avec les probabilités **0,6566** (B→F, branche du milieu depuis $j=1$) et **0,1667** (C→F, branche haute depuis $j=0$) :

$$Q_{2,1}=0{,}6566\,e^{-0{,}06937}\times0{,}1604+0{,}1667\,e^{-0{,}05205}\times0{,}6417=0{,}0983+0{,}1015=\boxed{\mathbf{0{,}1998}}$$

*Les autres :* $Q_{2,2}=0{,}0182$, $Q_{2,0}=0{,}4736$, $Q_{2,-1}=0{,}2033$, $Q_{2,-2}=0{,}0189$.

*Étape 7 :* on calcule $\alpha_2$, puis les $Q_{3,j}$, puis $\alpha_3$, et ainsi de suite.

**L'arbre final de $R$ (figure 30.9)** :

| Nœud | A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|---|
| **$R$ (%)** | 3,824 | 6,937 | 5,205 | 3,473 | **9,716** | 7,984 | 6,252 | 4,520 | **2,788** |

</details>

### 5.4 Les formules générales

$$\boxed{P_{m+1}=\sum_{j=-n_m}^{n_m}Q_{m,j}\exp\big[-(\alpha_m+j\Delta R)\Delta t\big]}\;\text{(30.22)}$$

$$\boxed{\alpha_m=\frac{\ln\sum_{j=-n_m}^{n_m}Q_{m,j}e^{-j\Delta R\Delta t}-\ln P_{m+1}}{\Delta t}}$$

$$\boxed{Q_{m+1,j}=\sum_kQ_{m,k}\,q(k,j)\exp\big[-(\alpha_m+k\Delta R)\Delta t\big]}$$

où $n_m$ est le nombre de nœuds de chaque côté du nœud central en $m\Delta t$, et $q(k,j)$ la probabilité de passer de $(m,k)$ à $(m+1,j)$.

### 5.5 L'extension aux autres modèles

*La procédure s'étend aux modèles de la forme générale :*

$$\boxed{df(r)=\big[\theta(t)-af(r)\big]dt+\sigma\,dz}\;\text{(30.23)}$$

*où $f$ est une fonction **MONOTONE** de $r$. **Cette famille a la propriété de pouvoir coller à N'IMPORTE QUELLE structure par terme.***

| Choix de $f$ | Modèle obtenu |
|---|---|
| $f(r)=r$ | **HULL-WHITE** (30.13) |
| $f(r)=\ln r$ | **BLACK-KARASINSKI** (30.18) |

<details class="details--riche">
<summary>

**La procédure modifiée, et l'exemple Black-Karasinski**

</summary>

*Étape 1 — poser $x=f(R)$, d'où $dx=[\theta(t)-ax]dt+\sigma\,dz$.*

*Étape 2 — construire un arbre pour $x^\ast$* (même processus avec $\theta(t)=0$ et valeur initiale nulle) — **procédure identique** à la figure 30.8.

*Étape 3 — déplacer les nœuds de $\alpha_i$.* Avec $g$ **la fonction INVERSE de $f$**, le taux $\Delta t$-périodique au $j$-ième nœud en $m\Delta t$ est $g(\alpha_m+j\Delta x)$, et :

$$\boxed{P_{m+1}=\sum_{j=-n_m}^{n_m}Q_{m,j}\exp\big[-g(\alpha_m+j\Delta x)\Delta t\big]}\;\text{(30.24)}$$

⚠️ ***Cette équation se résout par une procédure numérique comme NEWTON-RAPHSON*** (elle n'a plus de solution explicite). La valeur $\alpha_0$ vaut $f\big(R(0)\big)$.

$$Q_{m+1,j}=\sum_kQ_{m,k}\,q(k,j)\exp\big[-g(\alpha_m+k\Delta x)\Delta t\big]$$

**L'exemple (figure 30.10) :** Black-Karasinski avec $a=0{,}22$, $\sigma=0{,}25$, $\Delta t=0{,}5$, courbe de la table 30.1.

| Nœud | A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|---|
| $x$ | $-3{,}373$ | $-2{,}875$ | $-3{,}181$ | $-3{,}487$ | $-2{,}430$ | $-2{,}736$ | $-3{,}042$ | $-3{,}349$ | $-3{,}655$ |
| **$R$ (%)** | 3,430 | 5,642 | 4,154 | 3,058 | **8,803** | 6,481 | 4,772 | 3,513 | **2,587** |

⚠️ **Noter : les taux restent tous POSITIVES, puisque $R=e^x$.**

</details>

### 5.6 Le choix de $f(r)$

|  | $f(r)=r$ (Hull-White) | $f(r)=\ln r$ (Black-Karasinski) |
|---|---|---|
| **Avantage principal** | **traçabilité ANALYTIQUE** | **les taux sont TOUJOURS POSITIFS** |
| **Inconvénient** | **taux négatifs possibles** — *dans beaucoup de circonstances la probabilité est très petite, mais **certains analystes sont réticents à utiliser un modèle où il y a la MOINDRE chance de taux négatifs*** | **aucune** traçabilité analytique |
| **Autre avantage** | — | *les traders **pensent naturellement en termes de $\sigma$ issus d'un modèle LOGNORMAL** plutôt que normal* |
| **Performance d'ajustement** | *dans la plupart des cas, **les deux modèles semblent se valoir** pour ajuster les caps et swaptions* | idem |

⚠️ **Le problème des pays à TAUX BAS.**

- *Le modèle **normal** est insatisfaisant : quand le taux court initial est bas, **la probabilité de taux négatifs futurs n'est plus négligeable**.*
- *Le modèle **lognormal** est insatisfaisant : **la volatilité des taux est habituellement BIEN PLUS GRANDE quand les taux sont bas** (une volatilité de **100 %** peut convenir quand le taux court est très bas, contre **20 %** quand il vaut 4 % ou plus).*
- ***« Un modèle qui semble bien marcher est celui où $f(r)$ est choisie comme une fonction CONTINUE, PROPORTIONNELLE À $\ln r$ quand $r$ est très bas et PROPORTIONNELLE À $r$ sinon. »***

### 5.7 Combiner arbres et résultats analytiques

<details class="details--riche">
<summary>

**Les formules corrigées pour un arbre à $\Delta t$ fini**

</summary>

> ⚠️ ***« Il est important de reconnaître que LE TAUX SUR L'ARBRE EST LE TAUX $\Delta t$-PÉRIODIQUE $R$. CE N'EST PAS LE TAUX COURT INSTANTANÉ $r$. »***

$$\boxed{P(t,T)=\hat A(t,T)\,e^{-\hat B(t,T)R}}\;\text{(30.25)}$$

$$\boxed{\ln\hat A(t,T)=\ln\frac{P(0,T)}{P(0,t)}-\frac{B(t,T)}{B(t,t+\Delta t)}\ln\frac{P(0,t+\Delta t)}{P(0,t)}-\frac{\sigma^2}{4a}\big(1-e^{-2at}\big)B(t,T)\big[B(t,T)-B(t,t+\Delta t)\big]}\;\text{(30.26)}$$

$$\boxed{\hat B(t,T)=\frac{B(t,T)}{B(t,t+\Delta t)}\,\Delta t}\;\text{(30.27)}$$

*(Pour Ho-Lee, on pose $\hat B(t,T)=T-t$.)*

> ⚠️ ***« Les prix d'obligations doivent donc être calculés avec (30.25), ET NON avec (30.15). »***

**Le test de validation.** Sur la courbe de la table 30.2 (rates de 5,018 % à 3 jours jusqu'à 7,490 % à 10 ans), un **put européen à 3 ans sur un zéro-coupon versant 100 dans 9 ans**, strike **63**, $a=0{,}1$, $\sigma=0{,}01$ :

| Nombre de pas | Arbre | Analytique |
|---|---|---|
| 10 | 1,8468 | **1,8093** |
| 30 | 1,8172 | 1,8093 |
| 50 | 1,8057 | 1,8093 |
| 100 | 1,8128 | 1,8093 |
| 200 | 1,8090 | 1,8093 |
| **500** | **1,8091** | **1,8093** |

⚠️ ***« Cet exemple fournit un BON TEST de l'implémentation du modèle parce que LA PENTE DE LA COURBE ZÉRO CHANGE BRUSQUEMENT juste après l'expiration de l'option. De petites erreurs dans la construction et l'usage de l'arbre sont susceptibles d'avoir un GRAND effet sur les valeurs obtenues. »***

*(Note : Hull numérote **deux** exemples différents « Example 30.1 » dans ce chapitre — celui de la duration $\hat D=3{,}29$ et celui-ci.)*

**L'arbre pour une américaine (figure 30.11).** *Call **américain à 1,5 an** sur une obligation à **10 ans**, quatre pas, modèle **lognormal** avec $a=5\,\%$ et $\sigma=20\,\%$. Obligation de principal 100, coupon **5 % semestriel** ; courbe plate à **5 %** ; strike **105** (un **prix COTÉ**). **Le prix d'obligation affiché sur l'arbre est le prix CASH ; le strike cash se calcule comme le strike coté PLUS les intérêts courus.***

| Nombre de pas | Prix de l'option |
|---|---|
| 4 | **0,672** |
| 100 | **0,703** |

⚠️ *« **Noter que le prix de l'obligation à 10 ans NE PEUT PAS être calculé analytiquement quand le modèle lognormal est supposé. Il est calculé NUMÉRIQUEMENT en remontant un arbre BIEN PLUS GRAND que celui montré.** »*

</details>

## 🟠 Concept 6 — La calibration et la couverture

### 6.1 Calibrer

> ***Calibrer = déterminer les paramètres de volatilité $a$ et $\sigma$ à partir de données de marché sur des options activement négociées*** *(cotations de courtiers sur caps et swaptions, tables 28.1 et 28.2) — les **instruments de calibration**.*

**La mesure d'ajustement populaire :**

$$\boxed{\sum_{i=1}^{n}(U_i-V_i)^2}$$

où $U_i$ est **le prix de marché** du $i$-ième instrument et $V_i$ **le prix donné par le modèle**.

> ⚠️ ***« Le nombre de paramètres de volatilité NE DOIT PAS être supérieur au nombre d'instruments de calibration. »***

<details class="details--riche">
<summary>

**Rendre $\sigma$ fonction du temps, et la fonction de pénalité**

</summary>

*Si $a$ est constant et $\sigma$ une **fonction en escalier** : $\sigma(t)=\sigma_0$ pour $t\leqslant t_1$, $\sigma(t)=\sigma_i$ pour $t_i<t\leqslant t_{i+1}$, $\sigma(t)=\sigma_n$ pour $t>t_n$ — il y a alors **$n+2$ paramètres** : $a,\sigma_0,\sigma_1,\dots,\sigma_n$.*

*La minimisation s'accomplit par la procédure de **LEVENBERG-MARQUARDT**. Quand $a$ ou $\sigma$ dépendent du temps, **une FONCTION DE PÉNALITÉ est souvent ajoutée pour que les fonctions soient « bien élevées »** :*

$$\boxed{\sum_{i=1}^{n}(U_i-V_i)^2+\sum_{i=1}^{n}w_{1,i}(\sigma_i-\sigma_{i-1})^2+\sum_{i=1}^{n-1}w_{2,i}(\sigma_{i-1}+\sigma_{i+1}-2\sigma_i)^2}$$

| Terme | Ce qu'il pénalise |
|---|---|
| **2ᵉ** | les **grands CHANGEMENTS** de $\sigma$ d'un palier au suivant |
| **3ᵉ** | la forte **COURBURE** de $\sigma$ |

*Les $w_{1,i}$ et $w_{2,i}$ appropriés **se choisissent par expérimentation**, pour fournir un niveau raisonnable de lissage.*

**Le choix des instruments.** ***« Les instruments de calibration choisis doivent être AUSSI SIMILAIRES QUE POSSIBLE à l'instrument à valoriser. »*** *Exemple : pour une **swaption bermudienne** à 10 ans exerçable à toute date de paiement entre l'année 5 et l'année 9 sur un swap maturant à 10 ans, **les instruments les plus pertinents sont les swaptions européennes $5\times5$, $6\times4$, $7\times3$, $8\times2$ et $9\times1$**. (Une swaption $n\times m$ est une option de $n$ ans d'entrer dans un swap durant $m$ ans **au-delà de la maturité de l'option**.)*

**Le compromis, à savoir énoncer :**

|  | Avantage | Inconvénient |
|---|---|---|
| $a$ ou $\sigma$ fonctions du temps | *le modèle s'ajuste **PLUS PRÉCISÉMENT** aux prix des instruments actifs* | ***la structure de volatilité devient NON STATIONNAIRE : la structure par terme de volatilité donnée par le modèle DANS LE FUTUR risque d'être TRÈS DIFFÉRENTE de celle du marché AUJOURD'HUI*** |

**L'approche alternative : les $\sigma$ implicites.** *Utiliser **tous** les instruments pour calculer des paramètres $a$ et $\sigma$ « **globalement optimaux** » ; **$a$ est ensuite FIGÉ à sa valeur optimale**. **Le modèle s'utilise alors comme Black-Scholes-Merton : il y a une relation biunivoque entre prix d'options et paramètre $\sigma$.** On convertit les tables 28.1 et 28.2 en **tables de $\sigma$ IMPLICITES**.*

⚠️ *La procédure : **les volatilités de Black sont converties en PRIX par le modèle de Black ; une procédure itérative implique ensuite le paramètre $\sigma$ du modèle de structure par terme À PARTIR DU PRIX.*** Les $\sigma$ implicites **ne sont PAS** les volatilités implicites de Black.

</details>

### 6.2 Couvrir — l'*outside model hedging*

*Les approches du §28.5 (fiche 100) s'appliquent : deltas, gammas et vegas se calculent **en faisant de petits changements à la courbe zéro ou à l'environnement de volatilité et en recalculant** la valeur du portefeuille.*

> ⚠️ **LE PRINCIPE LE PLUS IMPORTANT DE LA SECTION.**
>
> ***« Bien qu'UN facteur soit souvent supposé pour VALORISER les dérivés de taux, IL N'EST PAS APPROPRIÉ DE SUPPOSER UN SEUL FACTEUR POUR SE COUVRIR. Par exemple, les deltas calculés doivent tenir compte de BEAUCOUP de mouvements différents de la courbe, PAS SEULEMENT ceux qui sont possibles sous le modèle choisi. »***
>
> ***La pratique consistant à tenir compte de changements qui NE PEUVENT PAS survenir sous le modèle considéré, aussi bien que de ceux qui le peuvent, s'appelle l'*** ***OUTSIDE MODEL HEDGING*** ***— et c'est LA PRATIQUE STANDARD des traders.***
>
> ⚠️ ***« La réalité est que des modèles à un facteur relativement simples, S'ILS SONT UTILISÉS AVEC SOIN, donnent habituellement des prix RAISONNABLES pour les instruments, mais LES BONNES PROCÉDURES DE COUVERTURE DOIVENT, EXPLICITEMENT OU IMPLICITEMENT, SUPPOSER PLUSIEURS FACTEURS. »***

*L'exemple analogue : **le modèle de Black-Scholes-Merton suppose une volatilité CONSTANTE — mais les traders calculent régulièrement le vega et se couvrent contre les changements de volatilité**.*

## Comment reconnaître le type d'exercice

| Indice dans l'énoncé | Méthode à déclencher |
|---|---|
| « $dr=a(b-r)dt+\sigma dz$ » | **Vasicek** : $P=Ae^{-Br}$ avec (30.7)-(30.8) |
| « $\sigma\sqrt r$ » | **CIR** : $\gamma=\sqrt{a^2+2\sigma^2}$, taux **toujours positifs** |
| « $\mu r\,dt+\sigma r\,dz$ » | **Rendleman-Bartter** : pas de retour à la moyenne |
| « la courbe initiale doit être appariée exactement » | un modèle **SANS ARBITRAGE** |
| « $\theta(t)$ » dans le drift | Ho-Lee ($a=0$) ou **Hull-White** |
| « $d\ln r$ » | **BDT** (si $a$ et $\sigma$ liés) ou **Black-Karasinski** |
| « sensibilité au taux COURT » | $\hat D=B(t,T)$, **pas** la duration usuelle |
| Option sur zéro-coupon, Vasicek/Ho-Lee/Hull-White | la formule analytique (30.20) avec le bon $\sigma_P$ |
| Option sur obligation à **coupon** | la procédure en **trois étapes** : $r^\ast$, options sur chaque zéro, somme |
| Construire un arbre | $\Delta R=\sigma\sqrt{3\Delta t}$, $j_{\max}=\lceil0{,}184/(a\Delta t)\rceil$, puis les deux étapes |
| « déterminer $\alpha_i$ » | **induction AVANT** avec les $Q_{i,j}$ |
| Modèle lognormal sur arbre | poser $x=\ln R$, résoudre (30.24) par **Newton-Raphson** |
| « calibrer » | minimiser $\sum(U_i-V_i)^2$, avec pénalité si $\sigma(t)$ |
| « comment couvrir ? » | ***outside model hedging*** — plusieurs facteurs |

## Comment résoudre ce type d'exercice

**A — Un prix d'obligation sous Vasicek ou CIR.**

1. Identifier $a$, $b$, $\sigma$ et $r(t)$.
2. Calculer $B(t,T)$ avec la formule du **bon** modèle.
3. Calculer $A(t,T)$.
4. $P=Ae^{-Br}$, puis $R(t,T)=-\ln P/(T-t)$.
5. Contrôle : $R$ doit être **linéaire** en $r$.

**B — Construire un arbre de Hull-White.**

1. $\Delta R=\sigma\sqrt{3\Delta t}$ et $j_{\max}=$ **le plus petit entier** $>0{,}184/(a\Delta t)$.
2. Pour chaque $j$, choisir le branchement : **(c)** si $j=j_{\max}$, **(b)** si $j=j_{\min}$, **(a)** sinon.
3. Calculer $p_u,p_m,p_d$ avec le jeu de formules correspondant ; **contrôler qu'elles somment à 1 et sont positives**.
4. $\alpha_0=$ le taux $\Delta t$-périodique initial ; $Q_{0,0}=1$.
5. Boucler : $Q_{m,j}\to\alpha_m$ par (30.22), puis $\alpha_m\to Q_{m+1,j}$.
6. Contrôle : à chaque pas, l'arbre doit **reproduire exactement** $P(0,(m+1)\Delta t)$.

**C — Passer du monde réel au monde risque-neutre.**

1. Estimer $a$, $b$, $\sigma$ sur données historiques (régression ou maximum de vraisemblance).
2. Identifier le prix de marché du risque $\lambda$ (≈ $-1{,}2$ pour les taux américains).
3. Vasicek : $b^\ast=b-\lambda\sigma/a$ ; le drift devient $a(b^\ast-r)$.
4. **La volatilité NE CHANGE PAS.**
5. Utiliser le processus **risque-neutre** pour toute valorisation, le **réel** pour la simulation de scénarios.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Croire que les modèles du ch. 28 décrivent l'évolution des taux | **non** — d'où l'impossibilité des **américaines** |
| Modéliser $r$ dans le monde réel pour valoriser | seul le processus **RISQUE-NEUTRE** compte |
| Croire qu'un modèle à un facteur impose des déplacements parallèles | **non** — même **direction**, pas même **montant** |
| Utiliser Rendleman-Bartter en pensant avoir du retour à la moyenne | il n'en a **PAS** |
| Croire que Vasicek exclut les taux négatifs | **il les permet** ; c'est **CIR** qui les exclut |
| Comparer Vasicek et CIR au même $\sigma$ | il faut $\sigma_{\text{vas}}\approx\sigma_{\text{cir}}\sqrt r$ |
| Utiliser un modèle d'équilibre pour valoriser une option | **1 % d'erreur sur l'obligation → 25 % sur l'option** |
| Oublier que le drift d'un modèle sans arbitrage dépend du temps | c'est la **courbe initiale** qui l'impose |
| Croire que BDT permet de choisir $a$ et $\sigma$ librement | **ils sont LIÉS** : $a(t)=-\sigma'(t)/\sigma(t)$ |
| Croire que $\sigma$ constante dans BDT donne du retour à la moyenne | **non** — $a=0$, c'est un **Ho-Lee lognormal** |
| Utiliser (30.15) pour les prix sur un arbre | il faut **(30.25)** avec $\hat A$ et $\hat B$ |
| Confondre le taux de l'arbre et le taux instantané | c'est le taux **$\Delta t$-PÉRIODIQUE $R$** |
| Prendre $j_{\max}$ trop grand ou trop petit | il doit être dans $\big]0{,}184/(a\Delta t),\ 0{,}816/(a\Delta t)\big[$ ; le **premier possible** est le plus efficace |
| Utiliser le branchement (a) partout | les probabilités deviendraient **négatives** aux extrémités |
| Calculer les $\alpha_i$ analytiquement pour un arbre fini | il faut la **procédure itérative** par induction avant |
| Recalculer tous les chemins pour les $Q$ | utiliser la **récurrence** sur les $Q$ précédents |
| Résoudre (30.24) analytiquement | elle exige **Newton-Raphson** |
| Utiliser plus de paramètres que d'instruments de calibration | interdit |
| Rendre $\sigma(t)$ très flexible sans pénalité | la structure de volatilité devient **non stationnaire** |
| Couvrir avec un seul facteur | ***outside model hedging*** — les bonnes couvertures supposent **plusieurs** facteurs |

## 📌 Ultimate Review

| Élément | Formule / valeur |
|---|---|
| **La limite du ch. 28** | pas de description de l'**évolution** → pas d'**américaines** |
| **Modèle de structure par terme** | décrit l'évolution de **TOUS** les taux zéro |
| **Bonus** | pas besoin des ajustements **convexité / timing / quanto** |
| **Le taux court** | le taux sur une période **infinitésimale** |
| **Ce qui compte** | **seul** le processus **RISQUE-NEUTRE** |
| **Prix d'obligation** | $P(t,T)=\hat E[e^{-\bar r(T-t)}]$ |
| **Taux zéro** | $R(t,T)=-\frac{1}{T-t}\ln\hat E[e^{-\bar r(T-t)}]$ |
| **Un facteur implique** | même **direction**, pas même **montant** |
| **Rendleman-Bartter** | $dr=\mu r\,dt+\sigma r\,dz$ — **pas** de retour à la moyenne |
| **Retour à la moyenne** | $r$ élevé → drift **négatif** ; $r$ bas → drift **positif** |
| **L'argument économique** | taux hauts → économie ralentit → demande faible → taux baissent |
| **Vasicek** | $dr=a(b-r)dt+\sigma dz$ |
| **CIR** | $dr=a(b-r)dt+\sigma\sqrt r\,dz$ |
| **Forme commune** | $P(t,T)=A(t,T)e^{-B(t,T)r(t)}$ — modèles **affines** |
| **$B$ de Vasicek** | $\dfrac{1-e^{-a(T-t)}}{a}$ |
| **$\gamma$ de CIR** | $\sqrt{a^2+2\sigma^2}$ |
| **$R(t,T)$** | **LINÉAIRE** en $r(t)$ |
| **Ce que $r(t)$ détermine** | le **NIVEAU** de la courbe, pas sa **FORME** |
| **La duration adaptée** | $\hat D=B(t,T)$ |
| **L'exemple** | $B(0,4)=3{,}29$ contre $D=4$ |
| **Pourquoi moins** | l'impact du **retour à la moyenne** |
| **Taux négatifs** | **possibles** sous Vasicek, **impossibles** sous CIR |
| **Taux zéro impossible sous CIR si** | $2ab>\sigma^2$ |
| **Comparer les $\sigma$** | $\sigma_{\text{vas}}\approx\sigma_{\text{cir}}\sqrt r$ ; ex. $0{,}01/\sqrt{0{,}04}=0{,}05$ |
| **Usage des modèles d'équilibre** | **analyse de scénarios** à long horizon |
| **Ajuster sur l'historique** | paramètres du **monde RÉEL** |
| **Ajuster sur les prix** | paramètres **RISQUE-NEUTRES** |
| **Ce qui change de monde à monde** | le **DRIFT** ; **PAS** la volatilité |
| **Prix du risque de taux (Ahmad-Wilmott)** | ≈ $\mathbf{-1{,}2}$, bien plus négatif en crise |
| **Exemple 30.2** | $b^\ast=b-\lambda\sigma/a=0{,}04+0{,}06=\mathbf{0{,}10}$ |
| **Exemple 30.3 (CIR, réel)** | drift $+\lambda\sigma\sqrt r$ |
| **Équilibre contre sans arbitrage** | courbe = **SORTIE** contre **ENTRÉE** |
| **L'argument des traders** | 1 % d'erreur sur l'obligation → **25 %** sur l'option |
| **Ho-Lee** | $dr=\theta(t)dt+\sigma dz$ |
| **Son $\theta(t)$** | $F_t(0,t)+\sigma^2t\ \approx\ F_t(0,t)$ |
| **Sa lecture** | $r$ suit **la PENTE de la courbe forward instantanée** |
| **Hull-White** | $dr=[\theta(t)-ar]dt+\sigma dz$ |
| **Ses deux lectures** | **Ho-Lee + retour à la moyenne** · **Vasicek à niveau variable $\theta(t)/a$** |
| **Son $\theta(t)$** | $F_t(0,t)+aF(0,t)+\frac{\sigma^2}{2a}(1-e^{-2at})$ |
| **BDT** | $d\ln r=[\theta(t)-a(t)\ln r]dt+\sigma(t)dz$ |
| **Sa contrainte** | $a(t)=-\sigma'(t)/\sigma(t)$ |
| **Black-Karasinski** | idem mais $a$ et $\sigma$ **indépendants** |
| **Hull-White 2 facteurs** | $u$ est une **composante stochastique du niveau de retour** |
| **Option sur zéro-coupon** | $LP(0,s)N(h)-KP(0,T)N(h-\sigma_P)$ |
| **$\sigma_P$ de Hull-White** | $\frac{\sigma}{a}[1-e^{-a(s-T)}]\sqrt{\frac{1-e^{-2aT}}{2a}}$ |
| **$\sigma_P$ de Ho-Lee** | $\sigma(s-T)\sqrt T$ |
| **Option sur obligation à coupon** | **3 étapes** : $r^\ast$, options sur chaque zéro, **somme** |
| **Volatilité du forward 3 mois** | Ho-Lee **plate** · Hull-White 1F **décroissante** · Hull-White 2F **bossue** |
| **Ce que sont les taux de l'arbre** | les taux **$\Delta t$-périodiques**, pas instantanés |
| **La différence avec un arbre d'actions** | **le taux d'actualisation VARIE de nœud en nœud** |
| **Pourquoi trinomial** | un **degré de liberté supplémentaire** pour le retour à la moyenne |
| **Figure 30.6** | B $=1{,}11$ · C $=0{,}23$ · **A $=0{,}35$** |
| **Espacement** | $\Delta R=\sigma\sqrt{3\Delta t}$ |
| **Le seuil de branchement** | $j_{\max}=$ plus petit entier $>0{,}184/(a\Delta t)$ |
| **L'illustration** | $\sigma=0{,}01$, $a=0{,}1$, $\Delta t=1$ → $\Delta R=0{,}0173$, $j_{\max}=2$ |
| **Probabilités en $j=0$** | $1/6$, $2/3$, $1/6$ |
| **Probabilités en $j=2$ (type c)** | **0,8867** · 0,0266 · 0,0867 |
| **Deux propriétés de l'arbre** | probabilités fonction **de $j$ seul** · arbre **symétrique** |
| **Le déplacement** | $\alpha(t)=R(t)-R^\ast(t)$ |
| **$Q_{i,j}$** | la VA d'un titre versant **1 si le nœud est atteint** |
| **La méthode** | **INDUCTION AVANT** |
| **$\alpha_0$** | le taux $\Delta t$-périodique **initial**, ici **3,824 %** |
| **$Q_{1,1}$** | $0{,}1667e^{-0{,}03824}=\mathbf{0{,}1604}$ |
| **$\alpha_1$** | **0,05205** |
| **$Q_{2,1}$** | **0,1998** |
| **Extension** | $df(r)=[\theta(t)-af(r)]dt+\sigma dz$, $f$ **monotone** |
| **$f(r)=r$** | Hull-White · **$f(r)=\ln r$** |
| **Résolution de (30.24)** | **NEWTON-RAPHSON** |
| **Avantage de $f=r$** | traçabilité **analytique** |
| **Avantage de $f=\ln r$** | taux **toujours positifs** |
| **Le remède en taux bas** | $f$ **proportionnelle à $\ln r$ en bas, à $r$ ailleurs** |
| **Prix sur arbre** | **(30.25)**, pas (30.15) |
| **Le test de convergence** | 1,8091 (500 pas) contre **1,8093** analytique |
| **L'américaine de la figure 30.11** | **0,672** (4 pas) puis **0,703** (100 pas) |
| **Mesure de calibration** | $\sum(U_i-V_i)^2$ |
| **L'algorithme** | **Levenberg-Marquardt** |
| **La pénalité** | pénaliser les **changements** et la **courbure** de $\sigma$ |
| **Instruments à choisir** | les **plus similaires** à l'instrument à valoriser |
| **Le prix de la flexibilité** | volatilité **NON STATIONNAIRE** |
| **La pratique de couverture** | ***OUTSIDE MODEL HEDGING*** |
| **Le principe** | valoriser à **un facteur**, couvrir à **plusieurs** |

## 🧠 Active Recall

1. Quelle est la limite des modèles du chapitre 28 ? Quels produits ne peut-on pas valoriser ?
2. Qu'est-ce qu'un modèle de structure par terme ? Quel bonus offre-t-il ?
3. Définir le taux court instantané. Quel monde importe pour son processus ?
4. Écrire (30.1), (30.2) et (30.5).
5. Que permet (30.5), et quelle affirmation Hull en tire-t-il ?
6. Quelle est la démarche d'un modèle d'équilibre ?
7. Pourquoi l'hypothèse d'un facteur unique n'est-elle pas si restrictive ?
8. Écrire les trois modèles d'équilibre avec leur $m(r)$ et $s(r)$.
9. Écrire le modèle de Rendleman-Bartter. Quel est son défaut ?
10. Définir le retour à la moyenne et donner l'argument économique de Hull.
11. Écrire Vasicek et CIR. Quelle différence sur l'écart-type ?
12. Écrire $P(t,T)$, $B(t,T)$ et $A(t,T)$ pour Vasicek.
13. Que devient $B$ quand $a=0$ ?
14. Écrire $\gamma$, $B$ et $A$ pour CIR.
15. Écrire (30.9) et en déduire $R(t,T)$.
16. Quelles sont les trois conséquences sur la structure par terme ?
17. Quelles formes peut prendre la courbe ?
18. Définir $\hat D$. Que vaut-elle pour un zéro-coupon ?
19. Refaire l'exemple de la duration à 4 ans et interpréter l'écart.
20. Comment agréger les $\hat D$ d'un portefeuille ?
21. Écrire les processus de $P(t,T)$ sous Vasicek et CIR.
22. Comment comparer les $\sigma$ des deux modèles ? Faire le calcul avec $r=4\,\%$.
23. Lequel permet des taux négatifs ? Quelle condition exclut le taux zéro sous CIR ?
24. À quoi les modèles d'équilibre servent-ils utilement ?
25. Quelle est la différence entre ajuster sur l'historique et sur les prix ?
26. Qu'est-ce qui change et ne change pas quand on change de monde ?
27. Que vaut le prix de marché du risque de taux selon Ahmad et Wilmott ?
28. Écrire la fonction de vraisemblance de l'exemple 30.2.
29. Dériver $b^\ast$ et le calculer avec $\lambda=-1{,}2$.
30. Refaire l'exemple 30.3 : passer de CIR risque-neutre à CIR réel.
31. Énoncer la différence essentielle entre équilibre et sans arbitrage.
32. Citer l'argument des traders sur l'erreur de 1 %.
33. Pourquoi le drift dépend-il du temps dans un modèle sans arbitrage ?
34. Écrire Ho-Lee et son $\theta(t)$. Quelle en est l'interprétation ?
35. Écrire $P(t,T)$ et $\ln A(t,T)$ pour Ho-Lee.
36. Écrire Hull-White et donner ses deux lectures.
37. Écrire son $\theta(t)$ et interpréter en ignorant le dernier terme.
38. Écrire $B(t,T)$ et $\ln A(t,T)$ pour Hull-White.
39. Écrire BDT. Quelle contrainte lie $a(t)$ et $\sigma(t)$ ?
40. Quels sont ses avantages et ses deux inconvénients ?
41. Que devient BDT quand $\sigma$ est constante ?
42. Écrire Black-Karasinski et dire ce qui le distingue de BDT.
43. Écrire le modèle Hull-White à deux facteurs. Quel est le rôle de $u$ ?
44. Écrire (30.20) et les deux expressions de $\sigma_P$.
45. À quel modèle du chapitre 28 (30.20) est-elle essentiellement identique ?
46. Comment valoriser un cap avec ces formules ?
47. Décrire la procédure en trois étapes pour une obligation à coupon.
48. Pourquoi cette décomposition n'est-elle possible qu'à un facteur ?
49. Comparer les profils de volatilité des trois modèles de la figure 30.5.
50. Qu'est-ce qu'un arbre de taux ? Quels taux y figurent ?
51. Quelle est la différence principale avec un arbre d'actions ?
52. Pourquoi utilise-t-on un trinomial ? À quelle méthode équivaut-il ?
53. Refaire les trois calculs de la figure 30.6.
54. Décrire les trois branchements et leur usage.
55. Écrire le processus de $R^\ast$ et ses deux premiers moments.
56. Que vaut $\Delta R$, et pourquoi ce choix ?
57. Que vaut $j_{\max}$ ? Dans quel intervalle peut-il être choisi ?
58. Écrire les trois équations à satisfaire pour les probabilités.
59. Écrire les trois jeux de formules de probabilités.
60. Refaire l'illustration : $\Delta R$, $j_{\max}$, et les probabilités en $j=1$ et $j=2$.
61. Citer les deux propriétés remarquables de l'arbre de $R^\ast$.
62. Que vaut $\alpha(t)$ ? Que représente $Q_{i,j}$ ?
63. Pourquoi ne pas calculer les $\alpha$ analytiquement ?
64. Comment détermine-t-on $\alpha_0$ ?
65. Calculer $Q_{1,1}$, $Q_{1,0}$ et $Q_{1,-1}$.
66. Dériver $\alpha_1$ et donner sa valeur.
67. Quels sont les trois taux au pas 1 ?
68. Calculer $Q_{2,1}$ à partir des $Q$ précédents.
69. Écrire les trois formules générales (30.22) et suivantes.
70. Écrire la famille étendue (30.23). Quelle propriété a-t-elle ?
71. Quels modèles obtient-on pour $f=r$ et $f=\ln r$ ?
72. Écrire (30.24). Comment la résout-on ?
73. Que vaut $\alpha_0$ dans le cas général ?
74. Lire la figure 30.10 : quelle est la plage de taux obtenue ?
75. Comparer les avantages de $f=r$ et $f=\ln r$.
76. Quel est le problème dans les pays à taux bas, pour chacun des deux ?
77. Quel remède Hull propose-t-il ?
78. Pourquoi faut-il (30.25) et non (30.15) sur un arbre ?
79. Écrire $\hat A$ et $\hat B$.
80. Décrire le test de convergence de la table 30.3.
81. Pourquoi cet exemple est-il un bon test ?
82. Quelles valeurs donne l'arbre américain à 4 et 100 pas ?
83. Qu'est-ce que calibrer ? Quels instruments utilise-t-on ?
84. Écrire la mesure d'ajustement et la contrainte sur le nombre de paramètres.
85. Écrire la fonction de pénalité et le rôle de ses deux termes.
86. Quels instruments choisir pour une bermudienne 10 ans exerçable de 5 à 9 ans ?
87. Quel est l'avantage et l'inconvénient de rendre $\sigma$ variable ?
88. Décrire l'approche des $\sigma$ implicites et la procédure de conversion.
89. Qu'est-ce que l'*outside model hedging* ?
90. Énoncer le principe final de Hull sur valorisation et couverture.

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Limite des modèles du ch. 28 ? | Pas de description de l'**évolution** des taux |
| Produits impossibles à valoriser ? | Les **américaines** et les *structured notes* |
| Modèle de structure par terme ? | Décrit l'évolution de **TOUS** les taux zéro |
| Bonus d'un tel modèle ? | Plus besoin des ajustements **convexité / timing / quanto** |
| Taux court instantané ? | Le taux sur une période **infinitésimale** |
| Quel monde compte ? | Le **RISQUE-NEUTRE** seulement |
| Formule du prix d'obligation ? | $P(t,T)=\hat E[e^{-\bar r(T-t)}]$ |
| Ce que $r$ détermine ? | **TOUT** : courbe initiale **et** évolution |
| Un facteur implique quoi ? | Même **direction**, **pas** même montant |
| Rendleman-Bartter ? | $dr=\mu r\,dt+\sigma r\,dz$ |
| Son défaut ? | **Aucun retour à la moyenne** |
| Drift si $r$ élevé ? | **Négatif** |
| L'argument économique ? | Taux hauts → économie ralentit → demande faible → taux baissent |
| Vasicek ? | $dr=a(b-r)dt+\sigma dz$ |
| CIR ? | $dr=a(b-r)dt+\sigma\sqrt r\,dz$ |
| Forme commune du prix ? | $P=A(t,T)e^{-B(t,T)r(t)}$ |
| $B$ de Vasicek ? | $\dfrac{1-e^{-a(T-t)}}{a}$ |
| $B$ si $a=0$ ? | $T-t$ |
| $\gamma$ de CIR ? | $\sqrt{a^2+2\sigma^2}$ |
| $R(t,T)$ dépend de $r$ comment ? | **LINÉAIREMENT** |
| Ce que $r$ fixe ? | Le **NIVEAU**, pas la **FORME** |
| Formes possibles de la courbe ? | **Croissante · décroissante · bossue** |
| Duration adaptée ? | $\hat D=B(t,T)$ |
| $B(0,4)$ avec $a=0{,}1$ ? | **3,29** contre $D=4$ |
| Pourquoi plus petit ? | Le **retour à la moyenne** |
| Processus de $P$ sous Vasicek ? | $rP\,dt-\sigma B(t,T)P\,dz$ |
| Comparer les $\sigma$, $r=4\,\%$ ? | $\sigma_{\text{cir}}=0{,}01/\sqrt{0{,}04}=\mathbf{0{,}05}$ |
| Taux négatifs sous Vasicek ? | **POSSIBLES** |
| Sous CIR ? | **IMPOSSIBLES** |
| Taux zéro impossible sous CIR si ? | $2ab>\sigma^2$ |
| Usage utile des modèles d'équilibre ? | L'**analyse de scénarios** longue |
| Ajuster sur l'historique donne ? | Des paramètres du **monde RÉEL** |
| Ajuster sur les prix donne ? | Des paramètres **RISQUE-NEUTRES** |
| Ce qui change de monde à monde ? | Le **DRIFT** |
| Ce qui ne change pas ? | La **VOLATILITÉ** |
| Prix du risque de taux (US) ? | ≈ $\mathbf{-1{,}2}$ |
| En période de crise ? | **Bien plus négatif** |
| Vasicek : $b^\ast$ ? | $b-\lambda\sigma/a$ |
| Ex. 30.2 : $b^\ast$ ? | $0{,}04+0{,}06=\mathbf{0{,}10}$ |
| Ex. 30.3 : drift réel de CIR ? | $a(b-r)+\lambda\sigma\sqrt r$ |
| Équilibre : la courbe est ? | Une **SORTIE** |
| Sans arbitrage : la courbe est ? | Une **ENTRÉE** |
| L'argument des traders ? | 1 % d'erreur sur l'obligation → **25 %** sur l'option |
| Pourquoi le drift dépend du temps ? | La **courbe initiale** gouverne le chemin moyen |
| Ho-Lee ? | $dr=\theta(t)dt+\sigma dz$ |
| Année et auteurs ? | **Ho et Lee, 1986** — le **premier** sans arbitrage |
| Son $\theta(t)$ ? | $F_t(0,t)+\sigma^2t$ |
| Son interprétation ? | $r$ suit la **PENTE de la courbe forward** |
| Hull-White ? | $dr=[\theta(t)-ar]dt+\sigma dz$ |
| Lecture 1 ? | **Ho-Lee + retour à la moyenne** |
| Lecture 2 ? | **Vasicek à niveau de retour variable** $\theta(t)/a$ |
| Ho-Lee est le cas ? | $a=0$ |
| $\theta(t)$ de Hull-White ? | $F_t(0,t)+aF(0,t)+\frac{\sigma^2}{2a}(1-e^{-2at})$ |
| BDT ? | $d\ln r=[\theta(t)-a(t)\ln r]dt+\sigma(t)dz$ |
| Sa contrainte gênante ? | $a(t)=-\sigma'(t)/\sigma(t)$ |
| Son avantage ? | Taux **toujours positifs** |
| Si $\sigma$ constante dans BDT ? | $a=0$ : un **Ho-Lee LOGNORMAL** |
| Black-Karasinski ? | Idem BDT mais $a$ et $\sigma$ **indépendants** |
| Hull-White 2 facteurs : rôle de $u$ ? | Une **composante stochastique du niveau de retour** |
| Vers quoi $u$ revient-il ? | **Zéro**, au rythme $b$ |
| Call sur zéro-coupon ? | $LP(0,s)N(h)-KP(0,T)N(h-\sigma_P)$ |
| $\sigma_P$ de Hull-White ? | $\frac{\sigma}{a}[1-e^{-a(s-T)}]\sqrt{\frac{1-e^{-2aT}}{2a}}$ |
| $\sigma_P$ de Ho-Lee ? | $\sigma(s-T)\sqrt T$ |
| Formules pour CIR ? | Elles font intervenir le **khi-deux non centré** |
| Obligation à coupon : étape 1 ? | Trouver **$r^\ast$**, le taux critique |
| Étape 2 ? | Options sur **chaque zéro**, strikes = valeurs si $r=r^\ast$ |
| Étape 3 ? | **Sommer** |
| Pourquoi ça marche ? | **Un seul facteur** → tous les prix bougent ensemble |
| Volatilité du forward 3 mois, Ho-Lee ? | **Plate** |
| Hull-White 1 facteur ? | **Décroissante** |
| Hull-White 2 facteurs ? | **BOSSUE** |
| Quels taux figurent sur l'arbre ? | Les taux **$\Delta t$-périodiques** |
| Différence avec un arbre d'actions ? | Le taux d'actualisation **varie de nœud en nœud** |
| Pourquoi trinomial ? | Un **degré de liberté supplémentaire** |
| Équivalent numérique ? | Les différences finies **EXPLICITES** |
| Fig. 30.6 : nœud B ? | **1,11** |
| Nœud C ? | **0,23** |
| Nœud A ? | **0,35** |
| Branchement (a) ? | Monter d'un / droit / descendre d'un |
| Branchement (b) ? | Pour les taux **TRÈS BAS** |
| Branchement (c) ? | Pour les taux **TRÈS HAUTS** |
| Processus de $R^\ast$ ? | $dR^\ast=-aR^\ast dt+\sigma dz$ |
| Sa valeur initiale ? | **ZÉRO** |
| Espacement $\Delta R$ ? | $\sigma\sqrt{3\Delta t}$ |
| Pourquoi ce choix ? | **Minimisation de l'erreur** |
| $j_{\max}$ ? | Plus petit entier $>0{,}184/(a\Delta t)$ |
| Intervalle admissible ? | $\big]0{,}184/(a\Delta t),\ 0{,}816/(a\Delta t)\big[$ |
| Lequel est le plus efficace ? | Le **premier possible** |
| $\sigma=0{,}01$, $a=0{,}1$, $\Delta t=1$ : $\Delta R$ ? | **0,0173** |
| Et $j_{\max}$ ? | **2** |
| Probabilités en $j=0$ ? | $1/6$, $2/3$, $1/6$ |
| En $j=1$ ? | 0,1217 · 0,6566 · 0,2217 |
| En $j=2$ ? | **0,8867** · 0,0266 · 0,0867 |
| Les probabilités dépendent de ? | **$j$ seul** |
| L'arbre est ? | **SYMÉTRIQUE** |
| Que vaut $\alpha(t)$ ? | $R(t)-R^\ast(t)$ |
| Que représente $Q_{i,j}$ ? | La VA d'un titre versant **1 au nœud $(i,j)$** |
| La méthode de calcul ? | L'**INDUCTION AVANT** |
| Que vaut $\alpha_0$ ? | Le taux $\Delta t$-périodique **initial** |
| Dans l'exemple ? | **3,824 %** |
| $Q_{1,1}$ ? | **0,1604** |
| $Q_{1,0}$ ? | **0,6417** |
| $P(0,2)$ ? | **0,9137** |
| $\alpha_1$ ? | **0,05205** |
| Taux en B, C, D ? | 6,937 · 5,205 · 3,473 % |
| $Q_{2,1}$ ? | **0,1998** |
| Combien de nœuds y mènent ? | **Deux** : B et C |
| Famille étendue ? | $df(r)=[\theta(t)-af(r)]dt+\sigma dz$ |
| Condition sur $f$ ? | **MONOTONE** |
| Sa propriété ? | Elle colle à **n'importe quelle** courbe |
| $f(r)=r$ ? | **Hull-White** |
| $f(r)=\ln r$ ? | **Black-Karasinski** |
| Résolution de (30.24) ? | **NEWTON-RAPHSON** |
| $\alpha_0$ dans le cas général ? | $f(R(0))$ |
| Avantage de $f=r$ ? | Traçabilité **analytique** |
| Son inconvénient ? | Taux **négatifs** possibles |
| Avantage de $f=\ln r$ ? | Taux **toujours positifs** |
| Autre avantage ? | Les traders pensent en $\sigma$ **lognormaux** |
| Problème du normal en taux bas ? | Taux négatifs **non négligeables** |
| Problème du lognormal ? | La volatilité est **bien plus grande** quand les taux sont bas |
| Le remède ? | $f\propto\ln r$ en bas, $\propto r$ ailleurs |
| Quelle formule sur un arbre ? | **(30.25)** avec $\hat A$ et $\hat B$ |
| $\hat B(t,T)$ ? | $\dfrac{B(t,T)}{B(t,t+\Delta t)}\Delta t$ |
| Test de convergence, 500 pas ? | **1,8091** contre **1,8093** |
| Pourquoi un bon test ? | La **pente de la courbe change brusquement** après l'expiration |
| Américaine, 4 pas ? | **0,672** |
| À 100 pas ? | **0,703** |
| Mesure de calibration ? | $\sum(U_i-V_i)^2$ |
| Contrainte ? | Pas plus de paramètres que d'**instruments** |
| Algorithme ? | **Levenberg-Marquardt** |
| Rôle du 2ᵉ terme de pénalité ? | Pénaliser les **changements** de $\sigma$ |
| Du 3ᵉ ? | Pénaliser la **courbure** |
| Instruments pour une bermudienne 5-9 ans ? | Les swaptions **5×5, 6×4, 7×3, 8×2, 9×1** |
| Qu'est-ce qu'une swaption $n\times m$ ? | Option de $n$ ans sur un swap de $m$ ans **au-delà** |
| Prix de la flexibilité de $\sigma(t)$ ? | Volatilité **NON STATIONNAIRE** |
| Approche des $\sigma$ implicites ? | Figer $a$, impliquer $\sigma$ **des PRIX** |
| Les $\sigma$ implicites sont-ils les volatilités de Black ? | **NON** |
| Qu'est-ce que l'*outside model hedging* ? | Tenir compte de mouvements **impossibles sous le modèle** |
| Le principe final ? | Valoriser à **un** facteur, couvrir à **plusieurs** |
| L'analogie ? | Black-Scholes suppose $\sigma$ constante, **mais on calcule le vega** |
