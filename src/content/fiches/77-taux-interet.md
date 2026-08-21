# Fiche 77 — Taux d'intérêt : capitalisation, courbe zéro, forwards, duration

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 4 « Interest Rates » |
| **Difficulté** | Must know — les taux interviennent dans la valorisation de **presque tous** les dérivés |
| **Temps d'étude estimé** | 2 h |
| **Prérequis** | Fiche 74 |
| **Concepts clés** | Taux du Trésor, LIBOR, repo, taux sans risque, fréquence de capitalisation, capitalisation continue, taux zéro-coupon, prix d'obligation, rendement, taux au pair, *bootstrap*, taux forward, FRA, duration, duration modifiée, convexité, théories de la structure par terme |
| **Poids à l'examen** | Les **conversions** $R_c\leftrightarrow R_m$ · le **bootstrap** complet · $R_F=\frac{R_2T_2-R_1T_1}{T_2-T_1}$ · la **duration** et $\Delta B=-BD\Delta y$. |

## 🎯 Vue d'ensemble

```
MESURER    la fréquence de capitalisation = l'UNITÉ du taux (comme km vs miles)
           R_c = m ln(1 + R_m/m)        R_m = m(e^{R_c/m} − 1)
CONSTRUIRE prix des obligations → BOOTSTRAP → courbe zéro
DÉRIVER    courbe zéro → taux FORWARD  →  FRA (et, ch. 7, les swaps)
SENSIBILISER  ΔB/B = −D Δy + ½ C (Δy)²
EXPLIQUER  anticipations · segmentation · PRÉFÉRENCE POUR LA LIQUIDITÉ
```

**La convention du livre.** *Dans ce livre, les taux d'intérêt seront mesurés en capitalisation continue sauf mention contraire.* Les conventions de décompte des jours (*day count*) sont **ignorées** dans tout ce chapitre — elles arrivent aux chapitres 6 et 7.

## 🟡 Concept 1 — Les types de taux

| Taux | Définition | Risque de crédit |
|---|---|---|
| **Trésor** (*Treasury*) | ce qu'un investisseur gagne sur les bons et obligations d'État — l'État empruntant **dans sa propre devise** | *On suppose habituellement qu'un gouvernement ne fera jamais défaut sur une obligation libellée dans sa propre devise* → **totalement sans risque** |
| **LIBOR** | *London Interbank Offered Rate* : taux auquel les banques sont prêtes à faire de **gros dépôts de gros** auprès d'autres banques ; publié une fois par jour par la British Bankers' Association, toutes devises majeures, maturités **jusqu'à 12 mois** | faible — il faut typiquement une notation **AA** pour recevoir des dépôts au LIBOR |
| **LIBID** | *London Interbank **Bid** Rate* : taux auquel les banques **acceptent** des dépôts | LIBID **&lt; LIBOR**, petit écart |
| **Repo** | l'opérateur détenant des titres les **vend** maintenant et les **rachète** plus tard un peu plus cher ; l'écart est l'intérêt | *très faible si l'opération est bien structurée* : en cas de défaut de l'emprunteur, le prêteur **garde les titres** ; en cas de défaut du prêteur, le propriétaire **garde le cash** |

**Repo overnight** (renégocié chaque jour) est le plus courant ; les arrangements plus longs sont des **term repos**. Le marché interbancaire du LIBOR est le **marché des eurodevises** — *hors du contrôle d'un quelconque gouvernement*.

### 1.1 Quel est le vrai taux sans risque ?

⚠️ **Les traders de dérivés n'utilisent PAS les taux du Trésor.** Ils les jugent **artificiellement bas** pour trois raisons :

1. les bons et obligations du Trésor **doivent être achetés** par les institutions financières pour satisfaire diverses **exigences réglementaires** → la demande monte, le prix monte, **le rendement baisse** ;
2. le **capital réglementaire** exigé d'une banque pour porter du Trésor est **nettement plus faible** que pour d'autres instruments pourtant très peu risqués ;
3. aux États-Unis, les titres du Trésor bénéficient d'un **traitement fiscal favorable** — ils ne sont **pas imposés au niveau des États**.

**Ce que les institutions utilisent.** Traditionnellement le **LIBOR** : pour une institution notée AA, c'est le **coût d'opportunité du capital à court terme** — elle emprunte aux cotations LIBOR des autres et prête aux siennes. *Les taux LIBOR ne sont pas totalement exempts de risque de crédit* (une AA peut faire défaut en trois mois), mais ils en sont **proches en conditions normales de marché**. Au-delà d'un an, la courbe LIBOR sans risque est prolongée par les **futures eurodollars** et les **swaps de taux**.

⚠️ **La crise a changé la pratique.** *Les banques sont devenues très réticentes à se prêter entre elles pendant la crise et les taux LIBOR ont flambé. Beaucoup d'opérateurs utilisent maintenant le taux **OIS** (overnight indexed swap) comme approximation du taux sans risque* (section 7.8) — **plus proche du sans-risque que le LIBOR**. Le livre continue néanmoins, **pour la commodité de l'exposé**, à supposer le LIBOR sans risque.

## 🔴 Concept 2 — Mesurer un taux : la fréquence de capitalisation

> *Une déclaration d'une banque selon laquelle le taux sur les dépôts à un an est de 10 % par an semble simple et sans ambiguïté. En réalité, sa signification précise dépend de la façon dont le taux est mesuré.*

**100 dollars placés un an à « 10 % »** :

| Fréquence | Valeur au bout d'un an |
|---|---|
| Annuelle ($m=1$) | **110,00** |
| Semestrielle ($m=2$) | **110,25** |
| Trimestrielle ($m=4$) | **110,38** |
| Mensuelle ($m=12$) | **110,47** |
| Hebdomadaire ($m=52$) | **110,51** |
| Quotidienne ($m=365$) | **110,52** |
| **Continue** | **110,52** |

> **L'image à retenir.** *La fréquence de capitalisation définit les unités dans lesquelles un taux est mesuré. La différence entre une fréquence et une autre est analogue à la différence entre des kilomètres et des miles : ce sont deux unités de mesure différentes.* Ainsi **10,25 % annuel = 10 % semestriel** : le même taux, deux unités.

**Les formules.** Montant $A$, $n$ années, taux $R$ :

$$m\ \text{fois par an}:\ A\left(1+\frac Rm\right)^{mn};	ext{(4.1)}\qquad\qquad \text{continu}:\ Ae^{Rn};	ext{(4.2)}$$

Quand $m=1$, on parle parfois de **taux annuel équivalent**. Les actuaires appellent le taux continu la **force d'intérêt**.

> **Capitaliser** sur $n$ années à taux continu $R$ = multiplier par $e^{Rn}$ · **actualiser** = multiplier par $e^{-Rn}$. *Pour la plupart des usages pratiques, la capitalisation continue peut être considérée comme équivalente à la capitalisation quotidienne.*

**Les deux conversions à connaître par cœur.**

$$\boxed{R_c=m\ln\!\left(1+\frac{R_m}{m}\right)};	ext{(4.3)}\qquad\qquad\boxed{R_m=m\left(e^{R_c/m}-1\right)};	ext{(4.4)}$$

<details><summary>**Exercices résolus — les deux sens de conversion (exemples 4.1 et 4.2)**</summary>

**Exemple 4.1 — vers le continu.** Taux coté **10 % par an, capitalisation semestrielle**. *Étape 1.* Identifier : $m=2$, $R_m=0{,}1$. *Étape 2.* Appliquer (4.3) : $R_c=2\ln\!\left(1+\dfrac{0{,}1}{2}\right)=2\ln(1{,}05)$. *Étape 3.* $\ln(1{,}05)=0{,}048790$ → $R_c=\mathbf{0{,}09758}$, soit **9,758 % par an**. *Contrôle de sens.* Le continu est **inférieur** au semestriel — normal : capitaliser plus souvent produit plus, donc il faut un **taux nominal plus faible** pour le même résultat.

**Exemple 4.2 — vers le discret.** Un prêteur cote **8 % par an en capitalisation continue**, mais les intérêts sont **payés trimestriellement**. *Étape 1.* $m=4$, $R_c=0{,}08$. *Étape 2.* Appliquer (4.4) : $R_m=4\left(e^{0{,}08/4}-1\right)=4\left(e^{0{,}02}-1\right)$. *Étape 3.* $e^{0{,}02}=1{,}020201$ → $R_m=4\times0{,}020201=\mathbf{0{,}0808}$, soit **8,08 % par an**. *Étape 4 — traduire en flux.* Sur un prêt de **1 000 dollars** : $1\,000\times\dfrac{0{,}0808}{4}=\mathbf{20{,}20}$ dollars **par trimestre**.

</details>

## 🔴 Concept 3 — Taux zéro-coupon et prix des obligations

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

Le **taux zéro-coupon à $n$ ans** est le taux gagné sur un investissement qui **commence aujourd'hui, dure $n$ ans**, et dont **tout** l'intérêt et le principal sont réalisés **à la fin**. **Aucun paiement intermédiaire.** Synonymes : taux *spot* à $n$ ans, taux *zéro* à $n$ ans.

</div>

*Exemple : un taux zéro 5 ans continu de 5 % signifie que 100 dollars deviennent $100e^{0{,}05\times5}=\mathbf{128{,}40}$.*

⚠️ **La plupart des taux directement observables sur le marché ne sont PAS des taux zéro purs.** Le prix d'une obligation d'État 5 ans à coupon 6 % ne détermine pas à lui seul le taux zéro 5 ans, *parce qu'une partie du rendement est réalisée sous forme de coupons **avant** la fin de l'année 5*.

**Prix théorique d'une obligation = valeur actuelle de tous ses flux.** *Les traders utilisent parfois le même taux d'actualisation pour tous les flux, mais une approche plus exacte consiste à utiliser un **taux zéro différent pour chaque flux**.*

**Courbe zéro du Trésor (continue).**

| Maturité (ans) | 0,5 | 1,0 | 1,5 | 2,0 |
|---|---|---|---|---|
| Taux zéro (%) | 5,0 | 5,8 | 6,4 | 6,8 |

**Obligation 2 ans, principal 100, coupon 6 % semestriel** (3 dollars tous les 6 mois) :

$$B=3e^{-0{,}05\times0{,}5}+3e^{-0{,}058\times1}+3e^{-0{,}064\times1{,}5}+103e^{-0{,}068\times2}=\mathbf{98{,}39}$$

### 3.1 Rendement et taux au pair

> **Rendement** (*yield*) : le **taux d'actualisation unique** qui, appliqué à tous les flux, donne un prix égal au prix de marché.

Si le prix de marché est justement 98,39, le rendement continu $y$ résout

$$3e^{-0{,}5y}+3e^{-y}+3e^{-1{,}5y}+103e^{-2y}=98{,}39\ \Longrightarrow\ y=\mathbf{6{,}76\,\%}$$

*Cette équation se résout par une procédure itérative (« essais-erreurs »)* — Hull suggère en note **Newton-Raphson** : $y_{i+1}=y_i-f(y_i)/f'(y_i)$.

> **Taux au pair** (*par yield*) : le **taux de coupon** qui rend le prix de l'obligation égal à sa **valeur nominale**. (Coupons supposés semestriels.)

Avec les mêmes taux zéro, on cherche $c$ tel que

$$\frac c2e^{-0{,}05\times0{,}5}+\frac c2e^{-0{,}058}+\frac c2e^{-0{,}064\times1{,}5}+\left(100+\frac c2\right)e^{-0{,}068\times2}=100$$

$$\Longrightarrow\ c=\mathbf{6{,}87\,\%}\ \text{par an, capitalisation semestrielle}\ (=6{,}75\,\%\ \text{en continu})$$

**La formule générale.** Soit $d$ la valeur actuelle de **1 dollar reçu à maturité**, $A$ la valeur d'une **annuité versant 1 dollar à chaque date de coupon**, $m$ le nombre de coupons par an :

$$100=\frac{cA}{m}+100d\qquad\Longrightarrow\qquad\boxed{c=\frac{(100-100d)\,m}{A}}$$

*Vérification : $m=2$, $d=e^{-0{,}068\times2}=0{,}87284$, $A=3{,}70027$ → $c=\dfrac{12{,}716\times2}{3{,}70027}=\mathbf{6{,}87}$*

⚠️ **Trois taux, trois objets différents.** Le **zéro** décrit un placement sans flux intermédiaire ; le **rendement** est une moyenne implicite propre à **une** obligation donnée ; le **taux au pair** est le **coupon** qui met le prix à 100. Ne jamais les substituer l'un à l'autre.

## 🔴 Concept 4 — Le *bootstrap* : construire la courbe zéro

**Deux sources.** Les **strips** (obligations zéro-coupon créées synthétiquement quand les traders vendent séparément les coupons et le principal d'une obligation du Trésor) — ou, plus courant, la méthode ***bootstrap*** à partir des bons et des obligations à coupon.

**Les données.**

| Principal | Maturité (ans) | Coupon annuel | Prix |
|---|---|---|---|
| 100 | 0,25 | 0 | 97,5 |
| 100 | 0,50 | 0 | 94,9 |
| 100 | 1,00 | 0 | 90,0 |
| 100 | 1,50 | 8 | 96,0 |
| 100 | 2,00 | 12 | 101,6 |

*(La moitié du coupon annoncé est supposée versée tous les 6 mois.)*

<details><summary>**Le bootstrap complet, ligne par ligne**</summary>

*Étape 1 — les trois zéro-coupon, directement.* Chacun transforme un prix en 100 :

$$100=97{,}5\,e^{0{,}25R}\Rightarrow R=\frac{-\ln(0{,}975)}{0{,}25}=\mathbf{10{,}127\,\%}$$

$$100=94{,}9\,e^{0{,}5R}\Rightarrow R=\mathbf{10{,}469\,\%}\qquad 100=90{,}0\,e^{R}\Rightarrow R=\mathbf{10{,}536\,\%}$$

*Étape 2 — l'obligation à 1,5 an.* Ses flux : **4** à 6 mois, **4** à 1 an, **104** à 1,5 an. Les deux premiers s'actualisent avec des taux **déjà connus** ; seul le dernier contient l'inconnue :

$$4e^{-0{,}10469\times0{,}5}+4e^{-0{,}10536\times1}+104e^{-1{,}5R}=96$$

*Étape 3 — isoler.* $3{,}7959+3{,}6003+104e^{-1{,}5R}=96\Rightarrow e^{-1{,}5R}=\mathbf{0{,}85196}$ *Étape 4 — extraire.* $R=-\dfrac{\ln(0{,}85196)}{1{,}5}=\mathbf{0{,}10681}$, soit **10,681 %**. *C'est le seul taux zéro compatible avec le taux 6 mois, le taux 1 an et les données.*

*Étape 5 — l'obligation à 2 ans.* Flux : **6** à 0,5, 1 et 1,5 an, **106** à 2 ans.

$$6e^{-0{,}10469\times0{,}5}+6e^{-0{,}10536}+6e^{-0{,}10681\times1{,}5}+106e^{-2R}=101{,}6\ \Rightarrow\ R=\mathbf{0{,}10808}$$

**Le résultat.**

| Maturité (ans) | 0,25 | 0,50 | 1,00 | 1,50 | 2,00 |
|---|---|---|---|---|---|
| Taux zéro continu (%) | 10,127 | 10,469 | 10,536 | 10,681 | 10,808 |

**Le principe en une phrase.** À chaque étape, **une seule inconnue** — le taux zéro de la maturité la plus longue — parce que tous les flux antérieurs s'actualisent avec des taux déjà déterminés. On « se hisse » de proche en proche : *bootstrap*.

</details>

**Les conventions d'interpolation.** *Une hypothèse courante est que la courbe zéro est **linéaire** entre les points obtenus.* Ainsi le taux 1,25 an vaut $0{,}5\times10{,}536+0{,}5\times10{,}681=\mathbf{10{,}6085\,\%}$. *On suppose aussi généralement que la courbe est **horizontale avant le premier point et après le dernier**.*

⚠️ **En pratique, les maturités ne tombent pas rond.** *L'approche souvent utilisée par les analystes consiste à interpoler entre les **données de prix** avant de calculer la courbe zéro.* Exemple du livre : si une obligation 2,3 ans à coupon 6 % vaut 98 et une 2,7 ans à 6,5 % vaut 99, on suppose qu'une **2,5 ans à 6,25 % vaudrait 98,5**.

## 🔴 Concept 5 — Les taux forward

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

Les **taux forward** sont les taux d'intérêt **implicites dans les taux zéro actuels** pour des périodes futures.

</div>

**Courbe LIBOR et forwards implicites.**

| Année $n$ | Taux zéro $n$ ans (%) | Taux forward de l'année $n$ (%) |
|---|---|---|
| 1 | 3,0 | — |
| 2 | 4,0 | **5,0** |
| 3 | 4,6 | **5,8** |
| 4 | 5,0 | **6,2** |
| 5 | 5,3 | **6,5** |

**La vérification élémentaire.** 3 % la première année **puis** 5 % la deuxième :

$$100e^{0{,}03}e^{0{,}05}=\mathbf{108{,}33}\qquad\text{et}\qquad 100e^{0{,}04\times2}=\mathbf{108{,}33}\ \checkmark$$

> **Le résultat général.** *Quand les taux sont capitalisés en continu et que des taux de périodes successives sont combinés, le taux équivalent global est simplement la **moyenne** du taux sur toute la période.* Ici : 3 % puis 5 % font **4 %** en moyenne sur deux ans. *Ce résultat n'est qu'approximativement vrai quand les taux ne sont pas capitalisés en continu.*

**Les deux écritures de la formule.**

$$\boxed{R_F=\frac{R_2T_2-R_1T_1}{T_2-T_1}};	ext{(4.5)}\qquad\qquad\boxed{R_F=R_2+(R_2-R_1)\frac{T_1}{T_2-T_1}};	ext{(4.6)}$$

*Application : forward de l'année 4 — $T_1=3$, $T_2=4$, $R_1=0{,}046$, $R_2=0{,}05$ → $R_F=\dfrac{0{,}20-0{,}138}{1}=\mathbf{0{,}062}$.*

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que (4.6) révèle.</span>

Courbe **croissante** ($R_2>R_1$) → $\boxed{R_F>R_2}$ : le forward finissant en $T_2$ **dépasse** le zéro $T_2$. Courbe **décroissante** → $R_F<R_2$. **Le forward est toujours « au-delà » du zéro, dans le sens de la pente.**

</div>

**Le taux forward instantané.** En faisant tendre $T_2\to T_1=T$ dans (4.6) :

$$\boxed{R_F=R+T\frac{\partial R}{\partial T}}\qquad\text{et, en posant }P(0,T)=e^{-RT},\qquad \boxed{R_F=-\frac{\partial}{\partial T}\ln P(0,T)}$$

### 5.1 Verrouiller un taux forward — la construction explicite

⚠️ **C'est le point qui rend tout le reste valorisable :** une grande institution peut **verrouiller sans coût** un taux forward, simplement en empruntant et prêtant au LIBOR.

| Objectif | Opérations | Flux | Vérification |
|---|---|---|---|
| **Gagner** le forward de l'année 2 (5 %) | emprunter 100 à 3 % **1 an**, placer à 4 % **2 ans** | $-100e^{0{,}03}=-103{,}05$ en $t=1$ ; $+100e^{0{,}08}=+108{,}33$ en $t=2$ | $108{,}33=103{,}05\,e^{0{,}05}$ |
| **Payer** le forward de l'année 4 (6,2 %) | emprunter 100 à 5 % **4 ans**, placer à 4,6 % **3 ans** | $+100e^{0{,}138}=+114{,}80$ en $t=3$ ; $-100e^{0{,}20}=-122{,}14$ en $t=4$ | $122{,}14=114{,}80\,e^{0{,}062}$ |

> **Le pari sur la courbe.** Un investisseur qui pense que les taux futurs **différeront** des forwards d'aujourd'hui a de nombreuses stratégies attractives — les *yield curve plays*. Avec la courbe ci-dessus : **emprunter à 1 an et placer à 5 ans**, en renouvelant l'emprunt chaque année. *Si les taux restent à peu près les mêmes, cette stratégie rapporte environ **2,3 % par an**, puisqu'on reçoit 5,3 % et qu'on paie 3 %.* L'investisseur **spécule** que les taux futurs seront différents des forwards (ici 5 %, 5,8 %, 6,2 %, 6,5 %).

⚠️ **Orange County — le prix de ce pari.** Robert Citron, trésorier du comté, a mené ces stratégies **avec grand succès en 1992 et 1993** ; le profit devint une contribution importante au budget et **il fut réélu** — *personne n'écouta son adversaire qui disait sa stratégie trop risquée*. En 1994 il **amplifia** : investissement massif en ***inverse floaters*** (qui versent un taux **fixe moins un taux variable**) et **levier** par emprunts sur le marché repo. *Si les taux courts étaient restés stables ou avaient baissé, il aurait continué de bien faire. En fait, les taux ont fortement monté en 1994.* **Le 1ᵉʳ décembre 1994, Orange County annonce une perte de 1,5 milliard de dollars** et se place en faillite quelques jours plus tard.

## 🔴 Concept 6 — Les accords de taux futur (FRA)

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

Un **FRA** est un accord **de gré à gré** garantissant qu'un certain taux s'appliquera à un emprunt ou un prêt d'un certain principal **sur une période future spécifiée**. L'hypothèse sous-jacente est que l'emprunt ou le prêt se ferait **normalement au LIBOR**.

</div>

**Notation.** X prête à Y entre $T_1$ et $T_2$.

| Symbole | Sens |
|---|---|
| $R_K$ | taux **convenu** dans le FRA |
| $R_F$ | taux **forward LIBOR** pour $[T_1,T_2]$, calculé **aujourd'hui** |
| $R_M$ | taux LIBOR **réellement observé** en $T_1$ pour $[T_1,T_2]$ |
| $L$ | **principal** notionnel |

⚠️ **Rupture de convention.** $R_K$, $R_F$ et $R_M$ sont mesurés avec une **fréquence de capitalisation reflétant la longueur de la période** : semestrielle si $T_2-T_1=0{,}5$, trimestrielle si $=0{,}25$. **Pas en continu** — *cela correspond à la pratique de marché usuelle pour les FRA*. Seul $R_2$ (l'actualisation) reste continu.

**Les flux.** X gagnerait normalement $R_M$ ; le FRA lui fait gagner $R_K$. Le supplément (possiblement négatif) est $R_K-R_M$ :

$$\text{vers X en }T_2:\ \boxed{L(R_K-R_M)(T_2-T_1)};	ext{(4.7)}\qquad\text{vers Y en }T_2:\ \boxed{L(R_M-R_K)(T_2-T_1)};	ext{(4.8)}$$

> **La deuxième lecture, la plus utile.** *Un FRA est un accord où X **reçoit** l'intérêt au taux **fixe** $R_K$ et **paie** l'intérêt au **LIBOR réalisé** $R_M$*, et réciproquement pour Y. C'est **exactement** la structure d'un swap à une seule période — d'où le chapitre 7.

**Règlement anticipé.** *Habituellement les FRA sont réglés en $T_1$ plutôt qu'en $T_2$* ; le payoff doit alors être **actualisé** :

$$\text{payoff en }T_1\ \text{pour X}=\frac{L(R_K-R_M)(T_2-T_1)}{1+R_M(T_2-T_1)}$$

<details><summary>**Exercice résolu — un FRA sur 3 mois dans 3 ans (exemple 4.3)**</summary>

**Énoncé.** Une entreprise entre dans un FRA lui assurant de **recevoir 4 % fixe** sur **100 millions**, pour une période de **3 mois commençant dans 3 ans**. C'est un échange : elle **paie le LIBOR**, **reçoit 4 %**. Le LIBOR 3 mois s'avère être **4,5 %**.

*Étape 1 — identifier les paramètres.* $L=100$ M, $R_K=0{,}04$, $R_M=0{,}045$, $T_2-T_1=0{,}25$, $T_1=3$ ans. *Étape 2 — appliquer (4.7).*

$$100\,000\,000\times(0{,}04-0{,}045)\times0{,}25=\mathbf{-125\,000}\ \text{dollars}$$

*Étape 3 — dater.* Ce flux tombe au point **3,25 ans**. Il est **négatif** : le prêteur reçoit 4 % alors que le marché offre 4,5 %. *Étape 4 — actualiser au règlement anticipé (3 ans).*

$$-\frac{125\,000}{1+0{,}045\times0{,}25}=-\frac{125\,000}{1{,}01125}=\mathbf{-123\,609}\ \text{dollars}$$

*Étape 5 — la contrepartie.* $+125\,000$ au point 3,25 ans, ou $+123\,609$ au point 3 ans.

⚠️ *Tous les taux de cet exemple sont exprimés en capitalisation **trimestrielle**.* L'actualisation utilise $1+R_M(T_2-T_1)$, **pas** une exponentielle : c'est cohérent avec la convention de marché.

</details>

### 6.1 Valorisation d'un FRA

> **Le point de départ.** *Un FRA vaut toujours zéro quand $R_K=R_F$.* Pourquoi ? **Parce qu'une grande institution peut verrouiller le taux forward sans aucun coût** (concept 5.1). Il est d'ailleurs *habituel que $R_K$ soit fixé égal à $R_F$ à l'initiation*.

**La construction.** Comparez deux FRA identiques sauf le taux reçu : l'un donne $R_F$ (valeur **zéro**), l'autre $R_K$. La différence de valeur est la valeur actuelle de la différence d'intérêts :

$$\boxed{V_{\text{FRA}}=L(R_K-R_F)(T_2-T_1)e^{-R_2T_2}};	ext{(4.9)}\qquad\text{(on reçoit }R_K)$$

$$\boxed{V_{\text{FRA}}=L(R_F-R_K)(T_2-T_1)e^{-R_2T_2}};	ext{(4.10)}\qquad\text{(on paie }R_K)$$

> **La règle de valorisation, en deux points — c'est elle qui servira pour les swaps.** **1.** Calculer le payoff **en supposant que les taux forward se réalisent** (c'est-à-dire $R_M=R_F$). **2.** **Actualiser** ce payoff au taux sans risque.

<details><summary>**Exercice résolu — valoriser un FRA hors du marché (exemple 4.4)**</summary>

**Énoncé.** Courbe LIBOR du concept 5. On **reçoit 6 %** (capitalisation **annuelle**) et on **paie le LIBOR** sur **100 millions**, entre la fin de l'année 1 et la fin de l'année 2.

*Étape 1 — le forward, dans la bonne unité.* Le forward de l'année 2 est **5 % en continu**. Comme $T_2-T_1=1$ an, la convention FRA impose la **capitalisation annuelle** :

$$R_F=e^{0{,}05}-1=\mathbf{0{,}05127}$$

*Étape 2 — vérifier le sens.* On reçoit $6\,\% > 5{,}127\,\%$ : le FRA est **favorable**, sa valeur doit être **positive**. *Étape 3 — appliquer (4.9).* $L=10^8$, $R_K=0{,}06$, $T_2-T_1=1$, $R_2=0{,}04$ (zéro 2 ans), $T_2=2$ :

$$V=100\,000\,000\times(0{,}06-0{,}05127)\times1\times e^{-0{,}04\times2}=873\,000\times0{,}92312=\mathbf{805\,800}\ \text{dollars}$$

⚠️ **Le piège d'unité, ici en pleine lumière.** Utiliser 5 % au lieu de 5,127 % donnerait $100\,000\,000\times0{,}01\times0{,}92312=923\,120$ — une erreur de **15 %**. $R_K$ et $R_F$ doivent être dans **la même unité de capitalisation** ; $R_2$, lui, reste **continu** parce qu'il ne sert qu'à actualiser.

</details>

## 🔴 Concept 7 — Duration

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition intuitive.</span>

*La duration d'une obligation est une mesure du temps que le porteur doit attendre en moyenne avant de recevoir les paiements.* Une obligation zéro-coupon de $n$ ans a une duration de **$n$ ans** ; une obligation à coupon de $n$ ans a une duration **inférieure à $n$**, parce qu'une partie des flux arrive **avant**.

</div>

Avec des flux $c_i$ aux dates $t_i$ et un rendement continu $y$ :

$$B=\sum_{i=1}^n c_ie^{-yt_i};	ext{(4.11)}\qquad\qquad \boxed{D=\frac{\sum_{i=1}^n t_ic_ie^{-yt_i}}{B}=\sum_{i=1}^n t_i\left[\frac{c_ie^{-yt_i}}{B}\right]};	ext{(4.12)}$$

<div class="callout" data-kind="intu">

<span class="callout__lab">Lecture.</span>

Le crochet est la **part du prix** apportée par le flux de la date $t_i$. **La duration est donc une moyenne pondérée des dates de paiement**, la somme des poids valant 1.

</div>

⚠️ **Toute l'actualisation se fait au rendement $y$ de l'obligation** — *on n'utilise pas un taux zéro différent pour chaque flux*, contrairement au concept 3. C'est une définition **auto-référencée** à l'obligation.

**La relation clé.** Pour une petite variation $\Delta y$ : $\Delta B\approx\dfrac{dB}{dy}\Delta y=-\Delta y\sum c_it_ie^{-yt_i}$, d'où

$$\boxed{\Delta B=-BD\,\Delta y};	ext{(4.15)}\qquad\qquad\boxed{\frac{\Delta B}{B}=-D\,\Delta y};	ext{(4.16)}$$

*(Notez la relation **négative** : quand les rendements montent, les prix baissent.)* *(4.16) est une relation approchée entre variations en pourcentage du prix et variations du rendement. Elle est facile à utiliser, et c'est la raison pour laquelle la duration — proposée pour la première fois par **Macaulay en 1938** — est devenue une mesure si populaire.*

<details><summary>**Exercice résolu — duration d'une obligation 3 ans à coupon 10 % (tableau 4.6)**</summary>

**Données.** Nominal **100**, coupon **10 %** semestriel (donc **5** tous les 6 mois), rendement **12 % continu**.

| Date (ans) | Flux | Valeur actuelle | Poids | Date × poids |
|---|---|---|---|---|
| 0,5 | 5 | 4,709 | 0,050 | 0,025 |
| 1,0 | 5 | 4,435 | 0,047 | 0,047 |
| 1,5 | 5 | 4,176 | 0,044 | 0,066 |
| 2,0 | 5 | 3,933 | 0,042 | 0,083 |
| 2,5 | 5 | 3,704 | 0,039 | 0,098 |
| 3,0 | 105 | 73,256 | 0,778 | 2,333 |
| **Total** | **130** | **94,213** | **1,000** | **2,653** |

*Étape 1.* Chaque valeur actuelle : $5e^{-0{,}12\times0{,}5}=4{,}709$, etc. *Étape 2.* La somme de la colonne 3 est le **prix** : $B=\mathbf{94{,}213}$. *Étape 3.* Les poids = colonne 3 divisée par 94,213 ; ils somment à 1. *Étape 4.* La duration est la somme de la dernière colonne : $D=\mathbf{2{,}653}$ ans.

⚠️ **Le poids du remboursement final domine tout** : 0,778, soit **78 %** de la duration. C'est pourquoi la duration d'une obligation à coupon reste proche de sa maturité tant que le coupon est modeste.

**Test de précision (exemple 4.5).** $\Delta B=-94{,}213\times2{,}653\times\Delta y=-249{,}95\,\Delta y$. Pour **+10 points de base** ($\Delta y=+0{,}001$) : $\Delta B=-0{,}250$, donc $B\to93{,}963$. Calcul exact à $y=12{,}1\,\%$ :

$$5e^{-0{,}121\times0{,}5}+\cdots+105e^{-0{,}121\times3}=\mathbf{93{,}963}$$

**Identique à trois décimales.**

</details>

### 7.1 Duration modifiée et duration en dollars

Si $y$ est exprimé avec une fréquence $m$ (et non en continu), (4.15) devient $\Delta B=-\dfrac{BD}{1+y/m}\Delta y$, ce qui motive :

$$\boxed{D^\ast=\frac{D}{1+y/m}}\qquad\Longrightarrow\qquad\boxed{\Delta B=-BD^\ast\Delta y};	ext{(4.17)}$$

**Et la *duration en dollars*** $D^{\ast\ast}=D^\ast\times B$, de sorte que $\Delta B=-D^{\ast\ast}\Delta y$.

<details><summary>**Exercice résolu — duration modifiée (exemple 4.6)**</summary>

*Étape 1 — convertir le rendement.* $y=12\,\%$ continu → semestriel : $R_2=2(e^{0{,}06}-1)=\mathbf{12{,}3673\,\%}$. *Étape 2 — duration modifiée.*

$$D^\ast=\frac{2{,}653}{1+0{,}123673/2}=\frac{2{,}653}{1{,}0618365}=\mathbf{2{,}499}$$

*Étape 3 — la sensibilité.* $\Delta B=-94{,}213\times2{,}4985\times\Delta y=-235{,}39\,\Delta y$. *Étape 4 — prédiction pour +10 pb.* $\Delta B=-0{,}235$ → $B\to\mathbf{93{,}978}$. *Étape 5 — vérification exacte.* À $12{,}4673\,\%$ semestriel, le prix vaut effectivement **93,978**. *La duration modifiée donne une bonne précision pour de petites variations de rendement.*

⚠️ **Le bon réflexe.** Duration **de Macaulay** avec $y$ **continu** → (4.15). Duration **modifiée** avec $y$ **discret** → (4.17). Mélanger les deux introduit une erreur de l'ordre de $y/m$, soit ici **6 %**.

</details>

### 7.2 Portefeuilles d'obligations

*La duration d'un portefeuille est la **moyenne pondérée** des durations des obligations qui le composent, les poids étant **proportionnels aux prix**.* Les équations (4.15) à (4.17) s'appliquent avec $B$ = valeur du portefeuille.

⚠️ **L'hypothèse implicite, et elle est forte.** *Quand la duration est utilisée pour des portefeuilles, on suppose implicitement que les rendements de **toutes** les obligations varient d'à peu près le **même montant**. Quand les maturités diffèrent largement, cela n'arrive que s'il y a un **déplacement parallèle** de la courbe zéro.* Il faut donc lire (4.15)-(4.17) comme estimant l'effet d'un **petit déplacement parallèle** $\Delta y$.

> **L'immunisation.** *En choisissant un portefeuille tel que la duration des actifs égale la duration des passifs (duration nette nulle), une institution financière élimine son exposition aux petits déplacements parallèles de la courbe. Mais elle reste exposée aux déplacements **grands** ou **non parallèles**.*

## 🟠 Concept 8 — Convexité

**Le problème.** Deux portefeuilles de **même duration** ont la **même pente à l'origine** — donc la même sensibilité aux petites variations. Pour de **grandes** variations, ils divergent : l'un a plus de **courbure** que l'autre.

$$\boxed{C=\frac1B\frac{d^2B}{dy^2}=\frac{\sum_{i=1}^n c_it_i^2e^{-yt_i}}{B}}$$

Par développement de Taylor, $\Delta B=\dfrac{dB}{dy}\Delta y+\dfrac12\dfrac{d^2B}{dy^2}\Delta y^2$, d'où

$$\boxed{\frac{\Delta B}{B}=-D\,\Delta y+\frac12\,C\,(\Delta y)^2}$$

| Structure des flux, à duration donnée | Convexité |
|---|---|
| Paiements **étalés régulièrement** sur une longue période | **maximale** |
| Paiements **concentrés** autour d'une date | **minimale** |

> **L'immunisation renforcée.** *En choisissant un portefeuille d'actifs et de passifs de duration nette **nulle** et de convexité nette **nulle**, une institution financière peut s'immuniser contre des déplacements parallèles **relativement grands** de la courbe zéro. Elle reste cependant exposée aux déplacements **non parallèles**.*

## 🟠 Concept 9 — Les théories de la structure par terme

| Théorie | Thèse | Implication |
|---|---|---|
| **Anticipations** (*expectations*) | *les taux longs devraient refléter les taux courts futurs anticipés* — précisément, **le forward égale le taux zéro futur anticipé** | courbe croissante ⟺ hausse anticipée |
| **Segmentation** (*market segmentation*) | *il n'y a **pas nécessairement** de relation entre taux courts, moyens et longs* ; un gros investisseur (fonds de pension) investit sur une maturité donnée et **n'en change pas facilement** | chaque segment a **son** offre et sa demande |
| **Préférence pour la liquidité** — *la plus séduisante* | les investisseurs **préfèrent préserver leur liquidité** et placer à court terme ; les emprunteurs **préfèrent emprunter à taux fixe longtemps** | $\boxed{\text{forwards}>\text{taux zéro futurs anticipés}}$ et courbe **croissante la plupart du temps** |

⚠️ **L'argument empirique décisif.** La préférence pour la liquidité *est aussi cohérente avec le résultat empirique selon lequel les courbes de taux sont plus souvent croissantes que décroissantes*.

<details><summary>**Le mécanisme bancaire qui engendre la préférence pour la liquidité**</summary>

**Le point de départ.** Une banque affiche :

| Maturité | Taux de dépôt | Taux de crédit immobilier |
|---|---|---|
| 1 an | **3 %** | **6 %** |
| 5 ans | **3 %** | **6 %** |

On suppose que le marché juge une hausse des taux **aussi probable** qu'une baisse : ces taux sont donc « **justes** » au sens de la théorie des anticipations — placer 1 an et réinvestir quatre fois donne le **même rendement espéré** qu'un placement 5 ans.

*Étape 1 — le choix du déposant.* Déposer à 3 % pour 1 an ou pour 5 ans ? **Un an** — *cela vous donne plus de flexibilité financière, cela immobilise vos fonds moins longtemps*. *Étape 2 — le choix de l'emprunteur.* Emprunter à 6 % pour 1 an ou pour 5 ans ? **Cinq ans** — *cela fixe votre taux d'emprunt pour cinq ans et vous expose à moins de risque de refinancement*. *Étape 3 — le déséquilibre.* La banque se retrouve avec des **passifs courts** et des **actifs longs** : une **inadéquation actif/passif**. *Étape 4 — quantifier le risque.* Si les taux **baissent**, elle finance des prêts à 6 % avec des dépôts coûtant **moins de 3 %** : la marge nette d'intérêt **augmente**. S'ils **montent**, elle **diminue**. **Une hausse de 3 points ramènerait la marge nette d'intérêt à zéro.** *Étape 5 — la riposte de la gestion actif-passif.* Relever le **taux à 5 ans des deux côtés** :

| Maturité | Taux de dépôt | Taux de crédit |
|---|---|---|
| 1 an | 3 % | 6 % |
| 5 ans | **4 %** | **7 %** |

Les dépôts 5 ans deviennent **relativement plus attractifs**, les crédits 1 an aussi. Certains clients basculent ; si le déséquilibre persiste, on relève encore. *Finalement le déséquilibre disparaît.* *Étape 6 — la conclusion théorique.* **Le résultat net du comportement de toutes les banques est la théorie de la préférence pour la liquidité.** *Les taux longs tendent à être plus élevés que ne le prédiraient les taux courts futurs anticipés. La courbe est croissante la plupart du temps. Elle n'est décroissante que lorsque le marché anticipe une chute marquée des taux courts.*

**Le prix de l'échec.** *Aux États-Unis, la faillite des Savings and Loans dans les années 1980 et celle de Continental Illinois en 1984 résultaient en grande partie du fait qu'ils n'avaient pas adossé les maturités de leurs actifs et de leurs passifs. Les deux faillites ont coûté très cher aux contribuables américains.*

</details>

⚠️ **Le risque de liquidité est distinct du risque de taux — et il tue plus vite.** Une institution finançant des prêts à taux fixe 5 ans par des dépôts de gros à **3 mois** peut parfaitement **couvrir son risque de taux** (par des swaps). *Elle a néanmoins un risque de liquidité : les déposants de gros peuvent, pour une raison quelconque, perdre confiance et refuser de continuer à lui fournir des fonds courts. L'institution, même dotée de fonds propres adéquats, connaîtra alors un grave problème de liquidité qui peut causer sa chute.*

> **Northern Rock.** Elle avait choisi de financer une grande partie de son portefeuille hypothécaire par des dépôts de gros, certains à **3 mois seulement**. *À partir de septembre 2007, les déposants sont devenus nerveux et ont refusé de renouveler leur financement* — au terme de chaque période de 3 mois, ils refusaient de replacer. Incapable de financer ses actifs, elle fut **reprise par l'État britannique début 2008**. **Bear Stearns** et **Lehman Brothers** ont connu des problèmes de liquidité similaires, pour la même raison.

## Comment reconnaître le type d'exercice

| Signal | Ce qu'on demande | Outil |
|---|---|---|
| Un taux + une fréquence, on en veut une autre | **conversion** | $R_c=m\ln(1+R_m/m)$ · $R_m=m(e^{R_c/m}-1)$ |
| Une courbe zéro + des flux | **prix** | actualiser **chaque flux avec son propre taux zéro** |
| Un prix de marché, on cherche « le » taux | **rendement** | équation non linéaire, Newton-Raphson |
| « quel coupon met le prix à 100 ? » | **taux au pair** | $c=(100-100d)m/A$ |
| Une liste d'obligations de maturités croissantes | ***bootstrap*** | une inconnue par ligne, du plus court au plus long |
| Deux taux zéro, on veut le taux d'une période intermédiaire | **forward** | $R_F=\frac{R_2T_2-R_1T_1}{T_2-T_1}$ |
| « recevoir fixe, payer LIBOR » sur une période future | **FRA** | payoff $L(R_K-R_M)(T_2-T_1)$ ; valeur (4.9) |
| « de combien varie le prix si le rendement monte de X pb ? » | **duration** | $\Delta B=-BD\Delta y$ (ou $-BD^\ast\Delta y$) |
| Grande variation de rendement | **convexité** | $\frac{\Delta B}B=-D\Delta y+\frac12C(\Delta y)^2$ |

## Comment résoudre ce type d'exercice

**Protocole *bootstrap* — 4 étapes.**

1. Trier les instruments par **maturité croissante**.
2. Traiter d'abord tous les **zéro-coupon** : $R=-\dfrac{\ln(P/F)}{T}$.
3. Pour chaque obligation à coupon, écrire prix = somme des flux actualisés ; **tous les taux sauf le dernier sont déjà connus** → une seule inconnue.
4. Isoler $e^{-RT}$, puis $R=-\ln(\cdot)/T$. Passer à la maturité suivante.

**Protocole duration — 5 étapes.**

1. Calculer chaque **valeur actuelle** $c_ie^{-yt_i}$ (attention : au **rendement**, pas aux taux zéro).
2. Sommer → $B$.
3. Poids $w_i=c_ie^{-yt_i}/B$ ; **vérifier $\sum w_i=1$**.
4. $D=\sum t_iw_i$.
5. Si $y$ est **discret**, diviser par $1+y/m$ pour obtenir $D^\ast$ avant d'appliquer $\Delta B=-BD^\ast\Delta y$.

<details><summary>**Exercice résolu — enchaîner bootstrap, forward et FRA**</summary>

**Question.** Avec la courbe LIBOR (3,0 · 4,0 · 4,6 · 5,0 · 5,3 %), quelle est la valeur d'un FRA où l'on **paie 5 % annuel** et **reçoit le LIBOR** sur 50 millions entre la fin de l'année 3 et la fin de l'année 4 ?

*Étape 1 — le forward de l'année 4.* $T_1=3$, $T_2=4$, $R_1=0{,}046$, $R_2=0{,}05$ :

$$R_F=\frac{0{,}05\times4-0{,}046\times3}{4-3}=\frac{0{,}200-0{,}138}{1}=\mathbf{0{,}062}\ \text{(continu)}$$

*Étape 2 — convertir dans l'unité du FRA.* Période d'un an → capitalisation **annuelle** :

$$R_F^{\text{ann}}=e^{0{,}062}-1=\mathbf{0{,}063962}$$

*Étape 3 — identifier le sens.* On **paie** $R_K=0{,}05$ et on reçoit le LIBOR, dont le forward est **6,3962 %** : le contrat est **favorable**, on applique (4.10). *Étape 4 — appliquer (4.10).*

$$V=50\,000\,000\times(0{,}063962-0{,}05)\times1\times e^{-0{,}05\times4}=697\,100\times0{,}818731=\mathbf{570\,740}\ \text{dollars}$$

*Étape 5 — contrôle de cohérence.* Le signe est **positif** comme prévu à l'étape 3, et l'actualisation utilise le **zéro 4 ans** ($R_2=5\,\%$), pas le forward — ce sont deux rôles distincts.

</details>

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Comparer deux taux sans regarder leur **fréquence** | 10,25 % annuel **=** 10 % semestriel : convertir d'abord |
| Actualiser tous les flux d'une obligation au **même** taux zéro | Un **taux zéro par échéance** — c'est l'approche exacte |
| Confondre **rendement**, **taux zéro** et **taux au pair** | Trois objets distincts (concept 3) |
| Dans le *bootstrap*, chercher **deux** inconnues à la fois | Une seule par ligne, en allant du **plus court au plus long** |
| Écrire $R_F=\frac{R_2-R_1}{T_2-T_1}$ | C'est $\frac{R_2T_2-R_1T_1}{T_2-T_1}$ — les taux sont **pondérés par les durées** |
| Utiliser $R_F$ **continu** dans un payoff de FRA | Le convertir dans la fréquence de la **période** ($e^{R_c}-1$ pour 1 an) |
| Actualiser le payoff d'un FRA au **taux forward** | Actualiser au **zéro sans risque** $R_2$ |
| Appliquer $\Delta B=-BD\Delta y$ avec un $y$ **discret** | Utiliser $D^\ast=D/(1+y/m)$ |
| Croire que la duration protège contre **tous** les mouvements de taux | Seulement les **petits déplacements parallèles** |
| Négliger la convexité pour une grosse variation | Ajouter $\frac12C(\Delta y)^2$ |
| Croire que couvrir le risque de taux supprime le risque de **liquidité** | Northern Rock était couverte en taux — elle est morte de liquidité |
| Prendre le taux du Trésor comme taux sans risque des dérivés | Il est **artificiellement bas** (réglementation, capital, fiscalité) |

## 📌 Ultimate Review

**Les conversions.** $R_c=m\ln(1+R_m/m)$ · $R_m=m(e^{R_c/m}-1)$ · capitaliser $\times e^{Rn}$, actualiser $\times e^{-Rn}$.

**Les prix.** $B=\sum c_ie^{-R_it_i}$ (taux zéro par échéance) · rendement : **un seul** $y$ · taux au pair : $c=(100-100d)m/A$.

**Les forwards.** $R_F=\dfrac{R_2T_2-R_1T_1}{T_2-T_1}=R_2+(R_2-R_1)\dfrac{T_1}{T_2-T_1}$ · instantané : $R_F=R+T\partial R/\partial T=-\partial_T\ln P(0,T)$.

**Les FRA.** Payoff $L(R_K-R_M)(T_2-T_1)$ en $T_2$ · valeur $L(R_K-R_F)(T_2-T_1)e^{-R_2T_2}$ · **règle** : supposer les forwards réalisés, puis actualiser au sans-risque.

**Les sensibilités.** $D=\sum t_i\frac{c_ie^{-yt_i}}{B}$ · $\Delta B=-BD\Delta y$ · $D^\ast=\frac{D}{1+y/m}$ · $C=\frac{\sum c_it_i^2e^{-yt_i}}{B}$ · $\frac{\Delta B}{B}=-D\Delta y+\frac12C(\Delta y)^2$.

**Les chiffres du chapitre.** Courbe zéro 5,0/5,8/6,4/6,8 → prix **98,39**, rendement **6,76 %**, taux au pair **6,87 %** · bootstrap : **10,127 · 10,469 · 10,536 · 10,681 · 10,808** · forwards LIBOR : **5,0 · 5,8 · 6,2 · 6,5** · duration **2,653**, $B=94{,}213$, $BD=249{,}95$, $D^\ast=2{,}499$, $BD^\ast=235{,}39$ · FRA exemple 4.4 : **805 800** · Orange County **1,5 Md** · Macaulay **1938**.

**Les trois théories.** Anticipations · segmentation · **préférence pour la liquidité** (la plus séduisante, forwards **au-dessus** des taux futurs anticipés, courbe croissante le plus souvent).

## 🧠 Active Recall

<details><summary>Pourquoi les traders de dérivés n'utilisent-ils pas les taux du Trésor comme taux sans risque ?</summary>

Parce qu'ils les jugent **artificiellement bas**, pour trois raisons : (1) les institutions **doivent** en acheter pour des raisons **réglementaires**, ce qui pousse le prix à la hausse et le rendement à la baisse ; (2) le **capital réglementaire** exigé pour les porter est bien **inférieur** à celui exigé pour d'autres instruments peu risqués ; (3) aux États-Unis ils bénéficient d'un **traitement fiscal favorable** (non imposés au niveau des États). Ils ont traditionnellement utilisé le **LIBOR** ; depuis la crise, beaucoup sont passés au taux **OIS**, plus proche du sans-risque.

</details>

<details><summary>Convertir 10 % semestriel en continu, puis 8 % continu en trimestriel.</summary>

$R_c=2\ln(1+0{,}1/2)=2\ln(1{,}05)=\mathbf{9{,}758\,\%}$ — **inférieur**, car capitaliser en continu produit plus. $R_4=4(e^{0{,}08/4}-1)=4(e^{0{,}02}-1)=\mathbf{8{,}08\,\%}$ — **supérieur**. Sur 1 000 dollars : **20,20** par trimestre.

</details>

<details><summary>Expliquer le principe du bootstrap en une phrase, puis calculer le taux zéro 1,5 an de l'exemple.</summary>

**Principe :** à chaque étape, l'obligation la plus longue n'introduit **qu'une seule inconnue** — son propre taux zéro — parce que tous ses flux antérieurs s'actualisent avec des taux **déjà déterminés**.

**Calcul :** $4e^{-0{,}10469\times0{,}5}+4e^{-0{,}10536}+104e^{-1{,}5R}=96$ → $104e^{-1{,}5R}=88{,}604$ → $e^{-1{,}5R}=0{,}85196$ → $R=-\dfrac{\ln 0{,}85196}{1{,}5}=\mathbf{10{,}681\,\%}$.

</details>

<details><summary>Zéro 3 ans = 4,6 %, zéro 4 ans = 5,0 %. Calculer le forward de l'année 4 et dire pourquoi il dépasse 5 %.</summary>

$$R_F=\frac{0{,}05\times4-0{,}046\times3}{1}=\mathbf{6{,}2\,\%}$$

Il dépasse le zéro 4 ans **parce que la courbe est croissante**. La formule (4.6), $R_F=R_2+(R_2-R_1)\frac{T_1}{T_2-T_1}$, le montre directement : $R_2>R_1$ implique $R_F>R_2$. **La moyenne monte parce que le dernier terme tire vers le haut.**

</details>

<details><summary>Pourquoi un FRA vaut-il zéro quand $R_K=R_F$ ?</summary>

Parce qu'une grande institution peut **verrouiller le taux forward sans aucun coût**, par un simple couple emprunt/placement au LIBOR. Exemple : emprunter 100 à 3 % **1 an** et placer à 4 % **2 ans** produit $-103{,}05$ en $t=1$ et $+108{,}33$ en $t=2$, soit exactement **5 %** sur la deuxième année. Puisque ce résultat est **gratuit**, un contrat qui le promet ne peut valoir que **zéro** — et *il est d'ailleurs habituel de fixer $R_K=R_F$ à l'initiation*.

</details>

<details><summary>Énoncer la règle de valorisation d'un FRA en deux points, et dire pourquoi elle est importante.</summary>

**1.** Calculer le payoff **en supposant que les taux forward se réalisent** ($R_M=R_F$). **2.** **Actualiser** ce payoff au **taux sans risque**.

Elle est importante parce qu'un **swap est un portefeuille de FRA** : le chapitre 7 valorisera les swaps **exactement** par cette règle. Elle transforme un problème d'anticipation de taux en un simple calcul d'actualisation.

</details>

<details><summary>Une obligation vaut 94,213 avec une duration de 2,653 et un rendement continu de 12 %. Prédire le prix si le rendement monte de 10 pb, puis dire quelle formule utiliser si le rendement était semestriel.</summary>

$\Delta B=-94{,}213\times2{,}653\times0{,}001=\mathbf{-0{,}250}$ → $B\to\mathbf{93{,}963}$ (le calcul exact donne 93,963).

Si le rendement est **semestriel** (12,3673 %), il faut la **duration modifiée** : $D^\ast=\dfrac{2{,}653}{1{,}0618}=2{,}499$, d'où $\Delta B=-94{,}213\times2{,}499\times0{,}001=-0{,}235$ → $B\to\mathbf{93{,}978}$.

</details>

<details><summary>Contre quoi la duration protège-t-elle, et contre quoi ne protège-t-elle pas ?</summary>

Elle protège contre les **petits déplacements parallèles** de la courbe zéro — car son usage sur un portefeuille suppose implicitement que **tous les rendements bougent du même montant**, ce qui, pour des maturités très différentes, ne se produit que lors d'un déplacement parallèle. Une duration nette **nulle** annule cette exposition. Elle ne protège **ni** contre les mouvements **grands** (il faut la convexité) **ni** contre les mouvements **non parallèles** (rien dans ce chapitre n'y répond).

</details>

<details><summary>Exposer le mécanisme bancaire qui produit la préférence pour la liquidité.</summary>

À taux « justes » (3 % dépôt et 6 % crédit, aux deux maturités), le **déposant choisit 1 an** (flexibilité) et l'**emprunteur choisit 5 ans** (pas de risque de refinancement). La banque se retrouve avec des **passifs courts** et des **actifs longs** : une hausse de **3 points** ramènerait sa marge nette d'intérêt **à zéro**. Pour rééquilibrer, elle **relève le taux 5 ans des deux côtés** (4 % et 7 %). **Toutes les banques faisant de même, les taux longs finissent au-dessus de ce que prédiraient les taux courts anticipés** — et la courbe est croissante la plupart du temps.

</details>

<details><summary>Northern Rock avait couvert son risque de taux. Pourquoi a-t-elle fait faillite ?</summary>

Par **risque de liquidité**, qui est distinct du risque de taux. Elle finançait son portefeuille hypothécaire par des **dépôts de gros à 3 mois**. À partir de septembre 2007, *les déposants sont devenus nerveux et ont refusé de renouveler* : au terme de chaque période de 3 mois ils ne replaçaient plus. *Même dotée de fonds propres adéquats*, elle ne pouvait plus financer ses actifs — reprise par l'État britannique début 2008. **Bear Stearns** et **Lehman Brothers** ont subi le même mécanisme.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| LIBOR ? | Taux auquel les banques font de **gros dépôts** auprès d'autres banques |
| Notation typiquement requise pour le LIBOR ? | **AA** |
| LIBID ? | Taux auquel les banques **acceptent** des dépôts — **&lt; LIBOR** |
| Maturités du LIBOR ? | Jusqu'à **12 mois** |
| Repo ? | Vente de titres + rachat plus cher — l'écart est l'**intérêt** |
| Pourquoi le repo est-il peu risqué ? | Défaut de l'emprunteur → on **garde les titres** |
| Trois raisons du biais des taux du Trésor ? | Achats **réglementaires** · **capital** requis faible · **fiscalité** favorable |
| Quel taux depuis la crise ? | Le taux **OIS** |
| Que définit la fréquence de capitalisation ? | Les **unités** dans lesquelles le taux est mesuré |
| 10 % semestriel = ? annuel | **10,25 %** |
| $R_c$ à partir de $R_m$ ? | $m\ln(1+R_m/m)$ |
| $R_m$ à partir de $R_c$ ? | $m(e^{R_c/m}-1)$ |
| Autre nom du taux continu ? | La **force d'intérêt** |
| Taux zéro-coupon à $n$ ans ? | Tout l'intérêt réalisé **à la fin**, **aucun** flux intermédiaire |
| Prix théorique d'une obligation ? | VA de tous les flux, **un taux zéro par échéance** |
| Rendement d'une obligation ? | Le **taux unique** qui redonne le prix de marché |
| Taux au pair ? | Le **coupon** qui met le prix **à 100** |
| Formule du taux au pair ? | $c=(100-100d)m/A$ |
| Que sont les *strips* ? | Zéro-coupon **synthétiques** (coupons vendus séparément du principal) |
| Principe du bootstrap ? | Une **seule inconnue** par instrument, du plus court au plus long |
| Taux zéro 1,5 an de l'exemple ? | **10,681 %** |
| Interpolation usuelle de la courbe zéro ? | **Linéaire** entre points, **horizontale** aux deux bouts |
| Formule du taux forward ? | $R_F=\dfrac{R_2T_2-R_1T_1}{T_2-T_1}$ |
| Courbe croissante : $R_F$ vs $R_2$ ? | $R_F>R_2$ |
| Taux forward instantané ? | $R_F=R+T\,\partial R/\partial T=-\partial_T\ln P(0,T)$ |
| Comment verrouiller un forward ? | Emprunter à une maturité, **placer** à l'autre |
| *Yield curve play* ? | Parier que les taux futurs **différeront** des forwards |
| Perte d'Orange County ? | **1,5 milliard** (1ᵉʳ décembre 1994) |
| *Inverse floater* ? | Verse **fixe moins variable** |
| Qu'est-ce qu'un FRA ? | Accord OTC fixant un taux pour une **période future** |
| Payoff d'un FRA (côté receveur du fixe) ? | $L(R_K-R_M)(T_2-T_1)$ en $T_2$ |
| Quand un FRA est-il réglé ? | Souvent en $T_1$ — payoff **actualisé** par $1+R_M(T_2-T_1)$ |
| Valeur d'un FRA ? | $L(R_K-R_F)(T_2-T_1)e^{-R_2T_2}$ |
| Règle de valorisation en deux points ? | Supposer les **forwards réalisés**, puis **actualiser au sans-risque** |
| Un FRA vaut zéro quand… ? | $R_K=R_F$ |
| Duration d'un zéro-coupon $n$ ans ? | **$n$ ans** |
| Définition de la duration ? | **Moyenne pondérée** des dates, poids = part du prix |
| À quel taux actualise-t-on pour la duration ? | Au **rendement** $y$ de l'obligation |
| Relation clé de la duration ? | $\Delta B=-BD\,\Delta y$ |
| Duration modifiée ? | $D^\ast=D/(1+y/m)$ |
| Duration en dollars ? | $D^{\ast\ast}=D^\ast B$ |
| Duration d'un portefeuille ? | Moyenne pondérée **par les prix** |
| Hypothèse implicite pour un portefeuille ? | Déplacement **parallèle** de la courbe |
| Formule de la convexité ? | $C=\dfrac{\sum c_it_i^2e^{-yt_i}}{B}$ |
| Développement avec convexité ? | $\dfrac{\Delta B}B=-D\Delta y+\dfrac12C(\Delta y)^2$ |
| Quand la convexité est-elle maximale ? | Paiements **étalés** sur une longue période |
| Duration et convexité nulles : protégé contre quoi ? | Déplacements parallèles **même grands** — **pas** les non parallèles |
| Théorie des anticipations ? | Le **forward** égale le taux zéro futur **anticipé** |
| Théorie de la segmentation ? | **Aucune** relation nécessaire entre les maturités |
| Préférence pour la liquidité ? | Forwards **au-dessus** des taux anticipés → courbe **croissante** |
| Qui a proposé la duration, et quand ? | **Macaulay**, **1938** |
| Cause de la chute de Northern Rock ? | Refus de **renouveler** des dépôts de gros à 3 mois |
