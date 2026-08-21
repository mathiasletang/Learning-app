# Fiche 73 — Inférence en petit échantillon et bootstrap

|  |  |
|---|---|
| **Matière** | Maths · Économétrie |
| **Cours source** | Kogan, *15.450 Analytics of Finance*, MIT Sloan / OpenCourseWare, automne 2010 — cours 9 « Small-Sample Inference and Bootstrap » |
| **Difficulté** | High — ce qui reste quand l'asymptotique ne tient plus |
| **Temps d'étude estimé** | 2 h 15 |
| **Prérequis** | Fiche 72 (écarts-types GMM, Newey-West), fiche 52 (AR(1)), fiche 67 (biais, intervalles de confiance) |
| **Concepts clés** | Biais en petit échantillon, biais de Kendall, biais de Stambaugh, simulation de Monte-Carlo, bootstrap, distribution empirique, rééchantillonnage, intervalle de confiance bootstrap, bootstrap paramétrique, correction de biais |
| **Poids à l'examen** | Trois choses : la **formule de Kendall** et le **biais de Stambaugh** ; le **principe** du bootstrap — la distribution empirique traitée comme la vraie ; et la **formule de l'intervalle de confiance bootstrap**, dont l'asymétrie surprend. |

## 🎯 Vue d'ensemble

> **Les limites de l'inférence asymptotique.**
>
> - *Jusqu'ici, notre inférence reposait sur des résultats **asymptotiques** : LGN et TCL.*
> - *L'inférence asymptotique est parfois **difficile à appliquer**, trop compliquée analytiquement.*
> - *En **petit échantillon**, l'inférence asymptotique peut être **peu fiable** :*
>   - *les estimateurs peuvent être **consistants mais biaisés** ;*
>   - *les écarts-types peuvent être **imprécis**, ce qui conduit à des intervalles de confiance et des tailles de test **incorrects**.*

> **Les remèdes par simulation.**
>
> - *Le **bootstrap** peut remplacer l'inférence asymptotique dans les problèmes analytiquement difficiles.*
> - *Le **bootstrap** peut servir à **corriger le biais**.*
> - *La **simulation de Monte-Carlo** permet de comprendre les propriétés des procédures statistiques.*

```
ASYMPTOTIQUE   T → ∞ :  consistance, normalité, écarts-types
EN PRATIQUE    T fini :  biais réel + écarts-types faux
DIAGNOSTIC     MONTE-CARLO — simuler le vrai modèle, mesurer
REMÈDE         BOOTSTRAP — rééchantillonner les DONNÉES observées
     monde réel :  P inconnue → θ̂ = s(x)
     monde boot. :  P̂ connue  → θ̂* = s(x*)
LIMITES        événements rares · biais de sélection · mauvaise spécification
```

## 🔴 Concept 1 — Le biais de l'autocorrélation estimée

**Le problème.** On veut estimer l'autocorrélation d'ordre $1$ d'une série $x_t$ — l'inflation, par exemple — c'est-à-dire $\mathrm{corr}(x_t,x_{t+1})$, par MCO (donc GMM) :

$$x_t=a_0+\rho_1x_{t-1}+\varepsilon_t$$

*On sait que cet estimateur est **consistant** : $\mathrm{plim}_{T\to\infty}\hat\rho_1=\rho_1$. Mais on veut savoir s'il est **biaisé**, c'est-à-dire estimer $\mathbb E(\hat\rho_1)-\rho_1$.*

**L'expérience de Monte-Carlo.** *Simuler indépendamment $N$ séries aléatoires de longueur $T$, chacune suivant un AR(1) de persistance $\rho_1$ et d'erreurs gaussiennes* :

$$x_t=\rho_1x_{t-1}+\varepsilon_t, \qquad \varepsilon_t\sim N(0,1)$$

*Calculer $\hat\rho_1^{(n)}$ pour chaque échantillon simulé, puis estimer le biais*

$$\hat{\mathbb E}(\hat\rho_1)-\rho_1=\frac1N\sum_{n=1}^N\hat\rho_1^{(n)}-\rho_1, \qquad \hat\sigma=\sqrt{\frac1N\sum_{n=1}^N\Big(\hat\rho_1^{(n)}-\hat{\mathbb E}(\hat\rho_1)\Big)^2}$$

**Les résultats sur $100\,000$ simulations.**

| $\rho_1$ | $T$ | Biais moyen |
|---|---|---|
| $0{,}9$ | $50$ | $-0{,}0826\pm0{,}0006$ |
| $0{,}0$ | $50$ | $-0{,}0203\pm0{,}0009$ |
| $0{,}9$ | $100$ | $-0{,}0402\pm0{,}0004$ |
| $0{,}0$ | $100$ | $-0{,}0100\pm0{,}0006$ |

> *Le biais semble **croissant en $\rho_1$** et **décroissant avec la taille d'échantillon**.*

<div class="callout" data-kind="formel">

<span class="callout__lab">Formule analytique de Kendall.</span>

$$\boxed{\ \mathbb E(\hat\rho_1)-\rho_1\approx-\frac{1+3\rho_1}{T}\ }$$

*Quand les formules explicites ne sont pas connues, on peut utiliser le **bootstrap** pour estimer le biais.*

</div>

⚠️ **Le biais est toujours NÉGATIF : l'autocorrélation est systématiquement sous-estimée.** Pour $\rho_1=0{,}9$ et $T=50$, on estime en moyenne $0{,}817$ au lieu de $0{,}9$ — un écart de près de $10\,\%$. Et la formule de Kendall reproduit bien les simulations : $-(1+2{,}7)/50=-0{,}074$ contre $-0{,}0826$ observé, $-1/50=-0{,}020$ contre $-0{,}0203$.

> **La raison intuitive.** La régression estime $\rho_1$ en projetant sur les écarts à la moyenne **empirique** — laquelle est calculée sur les mêmes données. Comme dans le cas de la variance empirique (fiche 65), estimer la moyenne « consomme » de l'information et tire mécaniquement l'estimation vers zéro.

## 🔴 Concept 2 — Le biais de Stambaugh

**Le cadre.** Une régression prédictive — par exemple prévoir les rendements d'actions par le rendement du dividende :

$$r_{t+1}=\alpha+\beta x_t+u_{t+1}$$

$$x_{t+1}=\theta+\rho x_t+\varepsilon_{t+1}$$

$$(u_t,\varepsilon_t)^\top\sim N(0,\Sigma)$$

> **Biais de Stambaugh.**
>
> $$\boxed{\ \mathbb E(\hat\beta-\beta)=\frac{\mathrm{Cov}(u_t,\varepsilon_t)}{\mathrm{Var}(\varepsilon_t)}\ \mathbb E(\hat\rho-\rho)\approx-\frac{1+3\rho}{T}\cdot\frac{\mathrm{Cov}(u_t,\varepsilon_t)}{\mathrm{Var}(\varepsilon_t)}\ }$$
>
> *Dans le cas du rendement du dividende prédisant les rendements d'actions, le biais est **positif** et peut être **substantiel comparé à l'écart-type de $\hat\beta$**.*

> **Le mécanisme, en trois pas.**
>
> 1. Le prédicteur $x_t$ est **très persistant** ($\rho$ proche de $1$), donc $\hat\rho$ souffre du biais de Kendall — **négatif**.
> 2. Les innovations $u_t$ (rendements) et $\varepsilon_t$ (prédicteur) sont **corrélées**. Pour le rendement du dividende $D/P$, une hausse du prix **baisse** $x$ et **augmente** $r$ : la covariance est **négative**.
> 3. Le produit de deux quantités négatives est **positif** : $\hat\beta$ est **surestimé**.
>
> **La conséquence.** On croit détecter de la prévisibilité là où il n'y en a pas nécessairement — et le biais est du même ordre de grandeur que l'écart-type, donc il **suffit à créer une significativité apparente**.

⚠️ **C'est le piège annoncé à la fin de la fiche 72.** Newey-West corrige les **écarts-types** mais **pas le biais du coefficient lui-même**. Ce sont deux problèmes distincts, qui exigent deux remèdes différents.

## 🟠 Concept 3 — L'application empirique au S&P 500

**Les données.** Régression prédictive des rendements excédentaires mensuels du S&P 500 sur le logarithme du rendement du dividende, CRSP, du $31/01/1934$ au $31/12/2008$ :

$$r_{t+1}=\alpha+\beta x_t+u_{t+1}, \qquad x_{t+1}=\theta+\rho x_t+\varepsilon_{t+1}$$

**Les estimations.**

$$\hat\beta=0{,}0089, \qquad \hat\rho=0{,}9936, \qquad SE(\hat\beta)=0{,}005$$

**L'expérience de Monte-Carlo.** *Générer $1\,000$ échantillons avec les paramètres égaux aux estimations empiriques. Utiliser $200$ périodes de **rodage** (*burn-in*) et retenir des échantillons de même longueur que la série historique. Tabuler $\hat\beta$ et les écarts-types de chaque échantillon, en utilisant **Newey-West à $6$ retards**.*

| Grandeur | Valeur |
|---|---|
| Moyenne de $\hat\beta$ | $0{,}013$ |
| **Biais moyen** de $\hat\beta$ | $0{,}004$ |
| Écart-type moyen | $0{,}005$ |
| **Statistique de Student moyenne** | $0{,}75$ |

⚠️ **Lisez les deux dernières lignes ensemble : c'est le résultat le plus important de la fiche.** Le biais ($0{,}004$) est **presque égal** à l'écart-type ($0{,}005$). Autrement dit, **même quand $\beta=0$ exactement**, la régression produit en moyenne un coefficient de $0{,}004$ et un $t$ de Student de $0{,}75$.

> **Et $\hat\rho=0{,}9936$ explique pourquoi.** Le prédicteur est presque une marche aléatoire, donc le biais de Kendall est maximal et le biais de Stambaugh avec lui.
>
> **La conclusion.** Une partie substantielle du $\hat\beta=0{,}0089$ observé pourrait n'être **que du biais**. C'est l'un des arguments centraux du débat sur la prévisibilité des rendements.

## 🔴 Concept 4 — Quand la normalité asymptotique échoue

**Le problème.** On estime la moyenne $\mu$ par la moyenne empirique, et les tests reposent sur

$$\frac{\hat\mu-\mu}{\hat\sigma/\sqrt T}\sim N(0,1)$$

*Cette approximation normale est-elle bonne en échantillon fini si la loi n'est pas gaussienne ?*

**L'exemple log-normal.** $x_t=e^{-\frac12+\varepsilon_t}$ avec $\varepsilon_t\sim N(0,1)$, de sorte que

$$\mu=\mathbb E(x_t)=\mathbb E\big(e^{-\frac12+\varepsilon_t}\big)=1$$

**L'expérience.** $N=100\,000$ simulations, $T=50$, en documentant la loi de $\hat t=\dfrac{\hat\mu-1}{\hat\sigma/\sqrt T}$.

| Quantité | Théorie asymptotique | Estimation Monte-Carlo |
|---|---|---|
| $\mathrm{Var}(\hat t)$ | $1$ | $1{,}2542^2$ |
| $\mathrm{Prob}(\hat t>1{,}96)$ | $0{,}025$ | $\mathbf{0{,}0042}$ |
| $\mathrm{Prob}(\hat t<-1{,}96)$ | $0{,}025$ | $\mathbf{0{,}1053}$ |

⚠️ **Ces deux nombres sont catastrophiques, et il faut comprendre pourquoi.** Un test bilatéral de niveau nominal $5\,\%$ rejette en réalité $0{,}42\,\%+10{,}53\,\%\approx11\,\%$ du temps — **plus du double** — et de façon **massivement asymétrique**.

> **La cause est l'asymétrie de la loi log-normale.** Elle a une longue queue à droite ; la plupart des échantillons de taille $50$ ne contiennent **aucune** grande valeur, donc $\hat\mu$ est **sous-estimée** et $\hat\sigma$ aussi. La statistique $\hat t$ est donc **biaisée vers la gauche** — d'où les $10{,}5\,\%$ dans la queue gauche et à peine $0{,}4\,\%$ à droite.
>
> **La pertinence financière est directe** : les rendements ont des queues épaisses et asymétriques (fiche 53). Toute inférence asymptotique sur des séries courtes est suspecte.

## 🔴 Concept 5 — Le principe du bootstrap

> ***Le bootstrap est une méthode de rééchantillonnage qui permet d'évaluer les propriétés des estimateurs statistiques.***
>
> ***Le bootstrap est en substance une étude de Monte-Carlo qui utilise la distribution EMPIRIQUE comme si elle était la vraie distribution.***

> **Les applications principales.**
>
> - *Évaluer les propriétés distributionnelles d'estimateurs **compliqués**, et faire la **correction de biais** ;*
> - *Améliorer la précision des approximations asymptotiques en petit échantillon — intervalles de confiance, régions de rejet, etc.*

**Le parallèle des deux mondes**, tel que le cours le présente (d'après Efron et Tibshirani) :

| **MONDE RÉEL** | **MONDE BOOTSTRAP** |
|---|---|
| modèle de probabilité **inconnu** $P$ | modèle **estimé** $\hat P$ |
| données observées $x=(x_1,\dots,x_n)$ | échantillon bootstrap $x^\ast=(x_1^\ast,\dots,x_n^\ast)$ |
| paramètre d'intérêt $\theta=\theta(P)$ | paramètre estimé $\hat\theta=\theta(\hat P)$ |
| estimation $\hat\theta=s(x)$ | **réplique bootstrap** $\hat\theta^\ast=s(x^\ast)$ |
| $\mathrm{Biais}_P(\hat\theta,\theta)$ | $\mathrm{Biais}_{\hat P}(\hat\theta^\ast,\hat\theta)$ |

> **L'idée en une phrase.** On ne peut pas répéter l'expérience réelle — on n'a qu'un échantillon. Mais on peut **répéter l'expérience dans un monde dont on connaît tout** : celui où la vraie loi est la loi **empirique**. La relation entre $\hat\theta^\ast$ et $\hat\theta$ dans ce monde artificiel imite la relation entre $\hat\theta$ et $\theta$ dans le monde réel.

**Le cas i.i.d.** Pour un échantillon i.i.d. $x_t$, $t=1,\dots,T$, dont on estime la moyenne $\hat\mu=\hat{\mathbb E}(x_t)$ : *sous la distribution empirique, $x$ prend chacune des valeurs $x_1,\dots,x_T$ avec **probabilité égale**.* Rééchantillonner, c'est donc **tirer avec remise** parmi les observations.

## 🔴 Concept 6 — Les intervalles de confiance bootstrap

> **La procédure**, à partir de $R$ échantillons tirés de la distribution empirique :
>
> 1. *Pour chaque échantillon bootstrapé, calculer $\hat\mu^\ast$ — « $\ast$ » désignant les statistiques calculées sur les échantillons bootstrapés.*
> 2. *Calculer les percentiles à $2{,}5\,\%$ et $97{,}5\,\%$ de la distribution obtenue : $\hat\mu^\ast_{2{,}5\%}$, $\hat\mu^\ast_{97{,}5\%}$.*
> 3. *Approcher la loi de $\hat\mu-\mu$ par la loi simulée de $\hat\mu^\ast-\hat\mu$, et estimer l'intervalle de confiance* $$\boxed{\ \Big(\hat\mu-\big(\hat\mu^\ast_{97{,}5\%}-\hat\mu\big),\ \ \hat\mu-\big(\hat\mu^\ast_{2{,}5\%}-\hat\mu\big)\Big)\ }$$

⚠️ **Regardez attentivement l'étape 3 : les percentiles sont INVERSÉS, et ce n'est pas une coquille.** Le percentile **haut** de $\hat\mu^\ast$ donne la borne **basse** de l'intervalle.

> **Le raisonnement.** On approche la loi de l'erreur $\hat\mu-\mu$ par celle de $\hat\mu^\ast-\hat\mu$. Si l'on constate que $\hat\mu^\ast$ dépasse $\hat\mu$ de $\delta$ dans $2{,}5\,\%$ des cas, alors on estime que $\hat\mu$ dépasse $\mu$ de $\delta$ dans $2{,}5\,\%$ des cas — donc $\mu$ pourrait être **inférieur** à $\hat\mu$ de $\delta$. La borne basse est bien $\hat\mu-\delta$.
>
> **Et cela produit un intervalle asymétrique** quand la loi de l'estimateur l'est — ce que l'approximation normale, symétrique par construction, ne peut jamais faire. C'est précisément l'avantage du bootstrap sur la log-normale du concept 4.

### L'exemple log-normal

*On fixe un échantillon de $50$ observations d'une loi log-normale $\ln x_t\sim N(-1/2,1)$ et l'on calcule*

$$\hat\mu=1{,}1784, \qquad \hat\sigma=1{,}5340$$

*La moyenne de population est $\mu=\mathbb E(x_t)=1$.*

**L'approximation asymptotique** donne

$$\left(\hat\mu-1{,}96\frac{\hat\sigma}{\sqrt T},\ \hat\mu+1{,}96\frac{\hat\sigma}{\sqrt T}\right)=(0{,}7532\ ;\ 1{,}6036)$$

**Le bootstrap sur la statistique de Student** donne une variance de $1{,}1852^2$, à comparer à $1$ (approximation normale) et $1{,}2542^2$ (Monte-Carlo).

> *De façon cohérente avec les résultats de Monte-Carlo, la distribution en petit échantillon des statistiques de Student présente une **asymétrie à gauche**.*

> **Le bootstrap capture donc une bonne partie de l'écart à la normalité**, sans connaître la vraie loi. $1{,}185$ n'est pas $1{,}254$, mais c'est bien plus proche que $1$.

## 🟠 Concept 7 — Le bootstrap paramétrique

> *Le **bootstrap paramétrique** peut traiter les échantillons **non i.i.d.***

**Exemple — un processus AR(1)** $x_t=a_0+a_1x_{t-1}+\varepsilon_t$, dont on veut un intervalle de confiance pour $\hat a_1$ :

> 1. *Estimer les paramètres $\hat a_0$, $\hat a_1$ et les **résidus** $\hat\varepsilon_t$.*
> 2. *Générer $R$ échantillons bootstrap pour $x_t$. Pour chaque échantillon : engendrer une **longue série** selon la dynamique AR(1) avec $\hat a_0,\hat a_1$, en tirant les chocs **avec remise** dans l'échantillon $\hat\varepsilon_1,\dots,\hat\varepsilon_T$ ; ne retenir que les **$T$ dernières** observations (abandonner la période de rodage).*
> 3. *Calculer l'intervalle de confiance comme avec le bootstrap non paramétrique de base, à partir des $R$ échantillons.*

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi « paramétrique ».</span>

On ne rééchantillonne **pas les observations** — elles sont dépendantes, les tirer avec remise détruirait la structure temporelle. On rééchantillonne les **résidus**, qui, eux, sont approximativement i.i.d., et l'on **régénère** la série par le modèle estimé. La structure de dépendance est donc **imposée par le modèle**, la distribution des chocs venant des données.

**Le rodage (*burn-in*) est essentiel** : les premières observations dépendent de la condition initiale arbitraire. En n'en gardant que les $T$ dernières, on part de la loi stationnaire.

</div>

## 🔴 Concept 8 — La correction de biais par bootstrap

> **Le problème.** Estimer le biais en petit échantillon d'une statistique $\theta$ : $\mathbb E[\hat\theta]-\theta_0$.
>
> **L'approche bootstrap.**
>
> $$\boxed{\ \mathbb E\big[\hat\theta\big]-\theta_0\ \approx\ \mathbb E_R\big[\hat\theta^\ast\big]-\hat\theta\ }$$
>
> *où $\mathbb E_R$ désigne la moyenne sur les $R$ échantillons bootstrapés.*
>
> **L'intuition** : *traiter la distribution empirique comme exacte, et calculer le biais moyen sur les échantillons bootstrapés.*

> ⚠️ **La mise en garde du cours.** *En estimant le biais, on peut **ajouter de l'erreur d'échantillonnage**. Corriger le biais **si et seulement s'il est grand comparé à l'écart-type** de $\hat\theta$.*

⚠️ **Cette mise en garde est la décomposition biais-variance de la fiche 67**, appliquée à la correction elle-même. Retirer un biais estimé avec bruit peut **augmenter** le risque quadratique total. La correction ne se justifie que quand le biais domine.

### L'application à la régression prédictive

*Bootstrap paramétrique : $1\,000$ échantillons, $200$ périodes de rodage, échantillons de même longueur que la série historique.*

| Grandeur | Monte-Carlo (vrai modèle) | **Bootstrap** |
|---|---|---|
| Moyenne de $\hat\beta$ | $0{,}013$ | $0{,}0125$ |
| Biais moyen de $\hat\beta$ | $0{,}004$ | $0{,}0036$ |
| Statistique de Student moyenne | $0{,}75$ | $0{,}67$ |

> **Les deux colonnes concordent très bien.** Le bootstrap — qui n'utilise **que les données observées** — retrouve un biais de $0{,}0036$ là où le Monte-Carlo — qui connaît le vrai modèle — trouve $0{,}004$. C'est la validation empirique du principe : *la distribution empirique se comporte comme la vraie*.
>
> **Et la conclusion pour l'économétrie financière est sévère** : sur $\hat\beta=0{,}0089$ estimé, environ $0{,}0036$ — soit **40 %** — serait attribuable au seul biais de petit échantillon.

## 🟡 Concept 9 — Les limites du bootstrap

> **La discussion finale du cours.**
>
> - *La théorie asymptotique est très commode quand elle est disponible, mais **en petit échantillon les résultats peuvent être inexacts**.*
> - *Utiliser les simulations de **Monte-Carlo** pour acquérir de l'intuition.*
> - *Le **bootstrap** est un outil puissant. L'utiliser quand la théorie asymptotique est **indisponible ou suspecte**.*
>
> **Le bootstrap n'est pas une baguette magique :**
>
> - *il **ne fonctionne pas bien** si des **événements rares** sont absents de l'échantillon empirique ;*
> - *il **ne tient pas compte** de biais plus subtils, comme le **biais du survivant** ou la **sélection d'échantillon** ;*
> - *il **ne guérit pas** la **mauvaise spécification du modèle**.*
>
> ***Il ne remplace pas le bon sens !***

⚠️ **La première limite est la plus grave en finance.** Le bootstrap ne peut **rééchantillonner que ce qui a été observé**. Si les vingt années de données ne contiennent aucun krach, aucun échantillon bootstrap n'en contiendra — et l'on conclura à une queue mince. **Le bootstrap ne crée jamais d'événement plus extrême que le pire observé** : c'est exactement la faiblesse de la simulation historique de la fiche 55.

**Les références du cours** : Campbell, Lo et MacKinlay (1997) · **Efron et Tibshirani**, *An Introduction to the Bootstrap* · Davison et Hinkley, *Bootstrap Methods and Their Application* · **Stambaugh (1999)**, « Predictive Regressions », *Journal of Financial Economics*.

## Comment résoudre l'exercice type (protocole)

1. **Identifier le risque** : échantillon court ? prédicteur persistant ? loi asymétrique ou à queues épaisses ?
2. **Si le vrai modèle est connu** : faire un **Monte-Carlo** — simuler, estimer, mesurer biais et couverture.
3. **Si le vrai modèle est inconnu** : faire un **bootstrap** — rééchantillonner les données observées.
4. **Données i.i.d.** : tirer **avec remise** dans les observations.
5. **Données dépendantes** : **bootstrap paramétrique** — estimer le modèle, rééchantillonner les **résidus**, régénérer, jeter le rodage.
6. **Intervalle de confiance** : $\big(\hat\mu-(\hat\mu^\ast_{97{,}5\%}-\hat\mu),\ \hat\mu-(\hat\mu^\ast_{2{,}5\%}-\hat\mu)\big)$ — attention à l'**inversion**.
7. **Correction de biais** : $\mathbb E_R[\hat\theta^\ast]-\hat\theta$, **et seulement si** le biais est grand devant l'écart-type.
8. **Vérifier les limites** : événements rares présents ? biais de sélection ? modèle bien spécifié ?

### Comment reconnaître qu'il faut utiliser cette méthode ?

| Indice dans l'énoncé | Ce qu'il faut faire |
|---|---|
| « échantillon court » | se méfier de l'asymptotique |
| autocorrélation estimée | **biais de Kendall** $-(1+3\rho_1)/T$ |
| régression prédictive, prédicteur persistant | **biais de Stambaugh** |
| loi asymétrique ou à queues épaisses | l'approximation normale échoue |
| « estimateur analytiquement compliqué » | **bootstrap** |
| « corriger le biais » | $\mathbb E_R[\hat\theta^\ast]-\hat\theta$ |
| données **dépendantes** | bootstrap **paramétrique** sur les résidus |
| « la théorie asymptotique est-elle fiable ? » | **Monte-Carlo**, mesurer la couverture |
| événements extrêmes importants | le bootstrap **ne les crée pas** |

### Exercices progressifs

**Niveau 1** — Estimez le biais de $\hat\rho_1$ pour $\rho_1=0{,}8$ et $T=60$, et comparez à l'écart-type.

<details><summary>Correction</summary>

**La formule de Kendall.**

$$\mathbb E(\hat\rho_1)-\rho_1\approx-\frac{1+3\rho_1}{T}=-\frac{1+2{,}4}{60}=-\frac{3{,}4}{60}\approx-0{,}057$$

**L'estimation moyenne** serait donc $0{,}8-0{,}057=0{,}743$ au lieu de $0{,}8$ — une sous-estimation de plus de $7\,\%$.

**La comparaison à l'écart-type.** Pour un AR(1), $SE(\hat\rho_1)\approx\sqrt{(1-\rho_1^2)/T}=\sqrt{0{,}36/60}=\sqrt{0{,}006}\approx0{,}077$.

$$\frac{\text{biais}}{SE}=\frac{0{,}057}{0{,}077}\approx0{,}74$$

**Le biais vaut donc les trois quarts de l'écart-type** — c'est considérable. Un intervalle de confiance centré sur $\hat\rho_1$ est **systématiquement décalé** vers le bas, et sa couverture réelle est bien inférieure au niveau nominal.

**La vérification sur le tableau du cours.** Pour $\rho_1=0{,}9$, $T=50$ : Kendall donne $-(1+2{,}7)/50=-0{,}074$, et la simulation sur $100\,000$ tirages donne $-0{,}0826$. Pour $\rho_1=0$, $T=50$ : $-1/50=-0{,}020$ contre $-0{,}0203$ observé — accord quasi parfait.

⚠️ **La leçon** : sur des séries persistantes et courtes — inflation, taux, ratios de valorisation —, il faut **corriger le biais** avant toute conclusion. Et quand la formule de Kendall ne s'applique pas, *on peut utiliser le bootstrap pour estimer le biais*.

</details>

**Niveau 2** — Expliquez le biais de Stambaugh et pourquoi il est positif pour la prévisibilité par le rendement du dividende.

<details><summary>Correction</summary>

**La formule.**

$$\mathbb E(\hat\beta-\beta)=\frac{\mathrm{Cov}(u_t,\varepsilon_t)}{\mathrm{Var}(\varepsilon_t)}\ \mathbb E(\hat\rho-\rho)\approx-\frac{1+3\rho}{T}\cdot\frac{\mathrm{Cov}(u_t,\varepsilon_t)}{\mathrm{Var}(\varepsilon_t)}$$

**Le mécanisme, en trois pas.**

**1. Le prédicteur est persistant.** Pour le rendement du dividende, $\hat\rho=0{,}9936$ — presque une marche aléatoire. Le biais de Kendall $\mathbb E(\hat\rho-\rho)\approx-(1+3\rho)/T$ est donc **négatif** et **maximal**.

**2. Les innovations sont corrélées négativement.** Le rendement du dividende est $x_t=\ln(D_t/P_t)$. Une hausse **inattendue** du prix $P$ produit simultanément :

- un **rendement élevé** ⟹ $u_{t+1}>0$ ;
- une **baisse** de $D/P$ ⟹ $\varepsilon_{t+1}<0$.

Donc $\mathrm{Cov}(u_t,\varepsilon_t)<0$.

**3. Le produit.** $(-)\times(-)=(+)$ : le biais sur $\hat\beta$ est **positif**. *Le biais est positif, et peut être **substantiel comparé à l'écart-type de $\hat\beta$**.*

**L'ampleur empirique**, sur les données du cours (S&P 500, 1934-2008) :

- $\hat\beta=0{,}0089$ estimé, $SE(\hat\beta)=0{,}005$ ;
- Monte-Carlo : biais moyen $0{,}004$, statistique de Student moyenne $\mathbf{0{,}75}$ **même sous $H_0:\beta=0$**.

**Le biais vaut $80\,\%$ de l'écart-type.** Sur $\hat\beta=0{,}0089$, environ $0{,}004$ pourrait n'être **que du biais** — soit près de la moitié.

⚠️ **Le point de méthode à retenir.** Newey-West (fiche 72) corrige les **écarts-types** ; le biais de Stambaugh affecte le **coefficient**. Ce sont **deux problèmes distincts**, et corriger l'un ne corrige pas l'autre. Le remède au second est le **bootstrap paramétrique** du concept 8, qui retrouve ici un biais de $0{,}0036$ — très proche du $0{,}004$ du Monte-Carlo.

</details>

**Niveau 3** — Expliquez le principe du bootstrap et la formule de l'intervalle de confiance.

<details><summary>Correction</summary>

**Le principe.** *Le bootstrap est une méthode de rééchantillonnage. C'est en substance une étude de Monte-Carlo qui utilise la **distribution empirique comme si elle était la vraie distribution**.*

**Le parallèle des deux mondes.**

| **Monde réel** | **Monde bootstrap** |
|---|---|
| $P$ inconnue | $\hat P$ = loi empirique, **connue** |
| données $x$ | échantillon $x^\ast$ tiré de $\hat P$ |
| $\hat\theta=s(x)$ | $\hat\theta^\ast=s(x^\ast)$ |
| $\mathrm{Biais}_P(\hat\theta,\theta)$ | $\mathrm{Biais}_{\hat P}(\hat\theta^\ast,\hat\theta)$ |

**L'idée.** On ne peut pas répéter l'expérience réelle — on n'a qu'un échantillon. Mais on peut la répéter dans un monde où l'on **connaît tout**, celui de la loi empirique. La relation $\hat\theta^\ast\leftrightarrow\hat\theta$ y imite la relation $\hat\theta\leftrightarrow\theta$ dans le monde réel.

**Concrètement, pour des données i.i.d.** : *sous la distribution empirique, $x$ prend chacune des valeurs $x_1,\dots,x_T$ avec probabilité égale*. Rééchantillonner, c'est **tirer avec remise**.

**La construction de l'intervalle, en trois pas.**

1. Tirer $R$ échantillons et calculer $\hat\mu^\ast$ pour chacun.
2. Prendre les percentiles $\hat\mu^\ast_{2{,}5\%}$ et $\hat\mu^\ast_{97{,}5\%}$.
3. **Approcher la loi de $\hat\mu-\mu$ par celle de $\hat\mu^\ast-\hat\mu$**, d'où $$\Big(\hat\mu-\big(\hat\mu^\ast_{97{,}5\%}-\hat\mu\big),\ \hat\mu-\big(\hat\mu^\ast_{2{,}5\%}-\hat\mu\big)\Big)$$

**Pourquoi les percentiles sont-ils inversés ?** C'est le point qui déroute. Si dans le monde bootstrap $\hat\mu^\ast$ **dépasse** $\hat\mu$ de $\delta$ dans $2{,}5\,\%$ des cas, on en déduit que dans le monde réel $\hat\mu$ **dépasse** $\mu$ de $\delta$ dans $2{,}5\,\%$ des cas — donc que $\mu$ pourrait être **inférieur** de $\delta$. Le percentile **haut** de $\hat\mu^\ast$ donne donc la borne **basse**.

**L'avantage sur la normale.** L'intervalle obtenu est **asymétrique** si la loi de l'estimateur l'est. Sur l'exemple log-normal du cours, l'approximation normale donne $(0{,}7532;1{,}6036)$, symétrique autour de $\hat\mu=1{,}1784$ — alors que la vraie loi de $\hat t$ est fortement **asymétrique à gauche**, comme le Monte-Carlo le montre ($\mathrm{Prob}(\hat t<-1{,}96)=0{,}1053$ contre $0{,}0042$ à droite). Le bootstrap capture cette asymétrie ; la normale ne le peut pas.

</details>

**Niveau 4 — type examen** — Décrivez le bootstrap paramétrique et la correction de biais, avec leurs limites.

<details><summary>Correction</summary>

**Pourquoi une version paramétrique.** *Le bootstrap paramétrique peut traiter les échantillons **non i.i.d.***. Pour des données dépendantes — une série temporelle —, tirer les **observations** avec remise **détruirait la structure temporelle** : l'échantillon bootstrap n'aurait plus aucune autocorrélation.

**La procédure, sur un AR(1)** $x_t=a_0+a_1x_{t-1}+\varepsilon_t$ :

1. *Estimer $\hat a_0$, $\hat a_1$ et les **résidus** $\hat\varepsilon_t$.*
2. *Générer $R$ échantillons : pour chacun, engendrer une **longue** série selon la dynamique AR(1) avec $\hat a_0,\hat a_1$, en tirant les chocs **avec remise** dans $\hat\varepsilon_1,\dots,\hat\varepsilon_T$ ; ne retenir que les **$T$ dernières** observations (abandonner le rodage).*
3. *Calculer l'intervalle comme dans le bootstrap de base.*

**Les deux idées.**

- On rééchantillonne les **résidus** — approximativement i.i.d. — et non les observations. La **dépendance** est réimposée par le modèle, la **distribution des chocs** vient des données.
- Le **rodage** élimine l'effet de la condition initiale arbitraire, de sorte que les $T$ observations retenues proviennent de la loi stationnaire.

**La correction de biais.**

$$\mathbb E\big[\hat\theta\big]-\theta_0\ \approx\ \mathbb E_R\big[\hat\theta^\ast\big]-\hat\theta$$

*Intuition : traiter la distribution empirique comme exacte et calculer le biais moyen sur les échantillons bootstrapés.* On corrige ensuite en retranchant le biais estimé.

**La validation empirique du cours**, sur la régression prédictive du S&P 500 :

|  | Monte-Carlo (vrai modèle) | **Bootstrap** (données seules) |
|---|---|---|
| Moyenne de $\hat\beta$ | $0{,}013$ | $0{,}0125$ |
| Biais | $0{,}004$ | $0{,}0036$ |
| $t$ moyen | $0{,}75$ | $0{,}67$ |

**La concordance est frappante** : le bootstrap, qui n'utilise que l'échantillon observé, retrouve presque exactement ce que le Monte-Carlo obtient en connaissant le vrai modèle.

**Les limites — quatre points, tous dans le cours.**

**1. La mise en garde sur la correction elle-même.** *En estimant le biais, on peut **ajouter de l'erreur d'échantillonnage**. Corriger **seulement si le biais est grand comparé à l'écart-type**.* C'est l'arbitrage biais-variance de la fiche 67 appliqué à la correction : retirer un biais mal estimé peut **augmenter** le risque quadratique.

**2. Les événements rares.** *Le bootstrap ne fonctionne pas bien si des **événements rares sont absents** de l'échantillon empirique.* Il ne peut rééchantillonner que ce qui a été observé : **il ne crée jamais un événement plus extrême que le pire vu**. C'est exactement la limite de la simulation historique de la fiche 55.

**3. Les biais de sélection.** *Il ne tient pas compte de biais plus subtils, comme le **biais du survivant** ou la **sélection d'échantillon**.* Si les fonds disparus sont absents de la base, le bootstrap reproduira fidèlement… un échantillon biaisé.

**4. La mauvaise spécification.** *Il ne guérit pas la mauvaise spécification du modèle.* Le bootstrap paramétrique **régénère par le modèle estimé** : si l'AR(1) est faux, tous les échantillons bootstrap le seront aussi.

> ***Il ne remplace pas le bon sens !***

**La conclusion de méthode.** *La théorie asymptotique est très commode quand elle est disponible, mais en petit échantillon les résultats peuvent être inexacts. Utiliser Monte-Carlo pour acquérir de l'intuition. Utiliser le bootstrap quand la théorie asymptotique est indisponible ou suspecte.*

</details>

## 🔴 Common mistakes

1. **Confondre consistance et absence de biais** — $\hat\rho_1$ est consistant **et** biaisé.
2. **Se tromper de signe pour Kendall** — le biais est **négatif** : l'autocorrélation est sous-estimée.
3. **Croire que Newey-West corrige le biais de Stambaugh** — il corrige les **écarts-types**, pas le coefficient.
4. **Oublier que le biais de Stambaugh est positif** pour le rendement du dividende — deux effets négatifs qui se multiplient.
5. **Inverser la formule de l'intervalle bootstrap** — le percentile **haut** de $\hat\mu^\ast$ donne la borne **basse**.
6. **Rééchantillonner les observations d'une série temporelle** — cela détruit la dépendance ; rééchantillonner les **résidus**.
7. **Oublier le rodage** dans un bootstrap paramétrique.
8. **Corriger un biais petit devant l'écart-type** — on ajoute alors plus de bruit qu'on n'enlève de biais.
9. **Croire que le bootstrap crée des événements extrêmes** — il ne peut que rééchantillonner l'observé.
10. **Croire que le bootstrap corrige la mauvaise spécification** — il ne le fait pas.

## 📌 Ultimate Review

1. **Les limites de l'asymptotique** : estimateurs **consistants mais biaisés** · écarts-types imprécis · intervalles et tailles de test **incorrects**.
2. **Les remèdes** : **Monte-Carlo** pour comprendre · **bootstrap** pour l'inférence et la correction de biais.
3. **Biais de l'autocorrélation** : $\hat\rho_1$ des MCO est consistant mais biaisé **négativement**.
4. **Simulation** ($100\,000$ tirages) : $-0{,}0826$ pour $(\rho_1,T)=(0{,}9;50)$ · $-0{,}0203$ pour $(0;50)$ · $-0{,}0402$ pour $(0{,}9;100)$ · $-0{,}0100$ pour $(0;100)$.
5. **Formule de Kendall** : $\mathbb E(\hat\rho_1)-\rho_1\approx-\frac{1+3\rho_1}{T}$ — croissant en $\rho_1$, décroissant en $T$.
6. **Biais de Stambaugh** : $\mathbb E(\hat\beta-\beta)=\frac{\mathrm{Cov}(u_t,\varepsilon_t)}{\mathrm{Var}(\varepsilon_t)}\mathbb E(\hat\rho-\rho)$ — **positif** pour le rendement du dividende, et substantiel devant $SE(\hat\beta)$.
7. **S&P 500 (1934-2008)** : $\hat\beta=0{,}0089$, $\hat\rho=0{,}9936$, $SE=0{,}005$ ; Monte-Carlo ($1\,000$ tirages, $200$ de rodage, Newey-West à $6$ retards) : moyenne $0{,}013$, **biais $0{,}004$**, $t$ moyen $\mathbf{0{,}75}$.
8. **Échec de la normalité** — log-normale $x_t=e^{-1/2+\varepsilon_t}$, $T=50$ : $\mathrm{Var}(\hat t)=1{,}2542^2$ au lieu de $1$ ; $\mathrm{Prob}(\hat t>1{,}96)=0{,}0042$ et $\mathrm{Prob}(\hat t<-1{,}96)=0{,}1053$ au lieu de $0{,}025$ chacune.
9. **Principe du bootstrap** : *une étude de Monte-Carlo utilisant la **distribution empirique** comme si elle était la vraie*.
10. **Les deux mondes** : $(P,x,\hat\theta=s(x))$ ↔ $(\hat P,x^\ast,\hat\theta^\ast=s(x^\ast))$.
11. **Cas i.i.d.** : tirer **avec remise** — chaque $x_i$ a probabilité $1/T$.
12. **Intervalle bootstrap** : $\big(\hat\mu-(\hat\mu^\ast_{97{,}5\%}-\hat\mu),\ \hat\mu-(\hat\mu^\ast_{2{,}5\%}-\hat\mu)\big)$ — percentiles **inversés**.
13. **Exemple log-normal** : $\hat\mu=1{,}1784$, $\hat\sigma=1{,}5340$, $T=50$ ; IC asymptotique $(0{,}7532;1{,}6036)$ ; variance de $\hat t$ bootstrapée $1{,}1852^2$ contre $1{,}2542^2$ (MC) et $1$ (normale).
14. **Bootstrap paramétrique** : estimer le modèle et les résidus · régénérer en tirant les **résidus** avec remise · **abandonner le rodage** · calculer comme d'habitude.
15. **Correction de biais** : $\mathbb E[\hat\theta]-\theta_0\approx\mathbb E_R[\hat\theta^\ast]-\hat\theta$ ; **corriger seulement si le biais est grand devant l'écart-type**.
16. **Validation** : bootstrap sur la régression prédictive ⟹ biais $0{,}0036$, $t$ moyen $0{,}67$ — très proche du Monte-Carlo.
17. **Limites** : **événements rares absents** · biais du **survivant** et de **sélection** · **mauvaise spécification**. *Il ne remplace pas le bon sens !*

**Formulas to know**

$$\mathbb E(\hat\rho_1)-\rho_1\approx-\frac{1+3\rho_1}{T} \qquad \mathbb E(\hat\beta-\beta)=\frac{\mathrm{Cov}(u_t,\varepsilon_t)}{\mathrm{Var}(\varepsilon_t)}\,\mathbb E(\hat\rho-\rho)$$

$$\Big(\hat\mu-\big(\hat\mu^\ast_{97{,}5\%}-\hat\mu\big),\ \hat\mu-\big(\hat\mu^\ast_{2{,}5\%}-\hat\mu\big)\Big) \qquad \mathbb E\big[\hat\theta\big]-\theta_0\approx\mathbb E_R\big[\hat\theta^\ast\big]-\hat\theta$$

**Methods to know** : conduire un Monte-Carlo de biais ; construire un intervalle bootstrap et justifier l'inversion des percentiles ; mener un bootstrap paramétrique sur une série temporelle ; décider s'il faut corriger un biais.

## 🧠 Active Recall

**Basic** — Quel est le biais de l'autocorrélation estimée ?

<details><summary>Réponse</summary>

**La formule de Kendall.**

$$\mathbb E(\hat\rho_1)-\rho_1\approx-\frac{1+3\rho_1}{T}$$

Le biais est **négatif** — l'autocorrélation est **sous-estimée** —, **croissant en valeur absolue avec $\rho_1$** et **décroissant avec $T$**.

**Les simulations du cours** ($100\,000$ tirages) le confirment :

| $\rho_1$ | $T$ | Biais observé | Kendall |
|---|---|---|---|
| $0{,}9$ | $50$ | $-0{,}0826$ | $-0{,}074$ |
| $0{,}0$ | $50$ | $-0{,}0203$ | $-0{,}020$ |
| $0{,}9$ | $100$ | $-0{,}0402$ | $-0{,}037$ |
| $0{,}0$ | $100$ | $-0{,}0100$ | $-0{,}010$ |

⚠️ $\hat\rho_1$ est **consistant mais biaisé** : les deux notions sont distinctes (fiche 67).

</details>

**Understanding** — Quel est le principe du bootstrap ?

<details><summary>Réponse</summary>

*Le bootstrap est une **méthode de rééchantillonnage**. C'est en substance une **étude de Monte-Carlo qui utilise la distribution empirique comme si elle était la vraie distribution**.*

**Le parallèle des deux mondes.**

| **Monde réel** | **Monde bootstrap** |
|---|---|
| $P$ **inconnue** | $\hat P$ empirique, **connue** |
| $\hat\theta=s(x)$ | $\hat\theta^\ast=s(x^\ast)$ |
| $\mathrm{Biais}_P(\hat\theta,\theta)$ | $\mathrm{Biais}_{\hat P}(\hat\theta^\ast,\hat\theta)$ |

**Le raisonnement.** On ne peut pas répéter l'expérience réelle — on n'a qu'un échantillon. Mais on peut la répéter dans un monde artificiel où l'on **connaît tout**. La relation entre $\hat\theta^\ast$ et $\hat\theta$ y **imite** la relation entre $\hat\theta$ et $\theta$ dans le monde réel.

**Les deux usages principaux** : *évaluer les propriétés distributionnelles d'estimateurs compliqués et corriger le biais* ; *améliorer la précision des approximations asymptotiques en petit échantillon*.

</details>

**Application** — Pourquoi le bootstrap donne-t-il un intervalle asymétrique là où la normale n'en donne jamais ?

<details><summary>Réponse</summary>

**L'intervalle bootstrap.**

$$\Big(\hat\mu-\big(\hat\mu^\ast_{97{,}5\%}-\hat\mu\big),\ \hat\mu-\big(\hat\mu^\ast_{2{,}5\%}-\hat\mu\big)\Big)$$

Les deux demi-largeurs sont $\hat\mu^\ast_{97{,}5\%}-\hat\mu$ et $\hat\mu-\hat\mu^\ast_{2{,}5\%}$ : elles sont **différentes** dès que la loi bootstrapée de $\hat\mu^\ast$ est asymétrique.

**L'intervalle normal**, $\hat\mu\pm1{,}96\,\hat\sigma/\sqrt T$, est **symétrique par construction** — il ne peut jamais capturer l'asymétrie.

**L'illustration du cours.** Pour la log-normale $x_t=e^{-1/2+\varepsilon_t}$ avec $T=50$, la loi de $\hat t$ est fortement **asymétrique à gauche** :

$$\mathrm{Prob}(\hat t>1{,}96)\approx0{,}0042, \qquad \mathrm{Prob}(\hat t<-1{,}96)\approx0{,}1053$$

au lieu de $0{,}025$ de chaque côté. **Un test bilatéral nominal à $5\,\%$ rejette en réalité $11\,\%$ du temps**, presque entièrement du même côté.

**Ce que le bootstrap capture.** La variance de $\hat t$ bootstrapée est $1{,}1852^2$, contre $1{,}2542^2$ pour le Monte-Carlo et $1$ pour l'approximation normale. Le bootstrap récupère donc l'essentiel de l'écart à la normalité, **sans connaître la vraie loi**.

> *Pour la statistique de Student, la distribution bootstrapée est **plus précise** que l'approximation normale asymptotique.*

</details>

**Comparison** — Monte-Carlo et bootstrap : quelle différence ?

<details><summary>Réponse</summary>

|  | **Monte-Carlo** | **Bootstrap** |
|---|---|---|
| Loi utilisée | le **vrai modèle** supposé connu | la loi **empirique** |
| Ce qu'il faut | des paramètres et une forme de loi | **seulement les données** |
| Usage | comprendre les propriétés d'une procédure | **inférence** sur les données réelles |
| Question | « que se passerait-il **si** le modèle était vrai ? » | « que dit **cet échantillon** ? » |

**Monte-Carlo** est un **outil de diagnostic** : on simule le vrai modèle, on mesure biais et couverture, on juge la fiabilité de l'asymptotique. *Utiliser les simulations de Monte-Carlo pour acquérir de l'intuition.*

**Bootstrap** est un **outil d'inférence** : on ne connaît pas le vrai modèle, alors on prend la loi empirique à sa place. *L'utiliser quand la théorie asymptotique est indisponible ou suspecte.*

**La validation croisée du cours.** Sur la régression prédictive du S&P 500 :

|  | Monte-Carlo | Bootstrap |
|---|---|---|
| Biais de $\hat\beta$ | $0{,}004$ | $0{,}0036$ |
| $t$ moyen | $0{,}75$ | $0{,}67$ |

Les deux concordent — ce qui **valide empiriquement** le principe du bootstrap : la loi empirique se comporte bien comme la vraie.

⚠️ **Mais seulement dans la mesure où l'échantillon est représentatif.** Si les événements rares en sont absents, le bootstrap les ignorera ; le Monte-Carlo, lui, les engendrera si le modèle en prévoit.

</details>

**Exam-style** — Quand utiliser le bootstrap, et quelles sont ses limites ?

<details><summary>Réponse</summary>

**Quand l'utiliser.**

1. *Quand la théorie asymptotique est **indisponible*** — estimateur analytiquement trop compliqué pour en dériver la loi.
2. *Quand elle est **suspecte*** — petit échantillon, loi asymétrique ou à queues épaisses, prédicteur très persistant.
3. Pour **corriger un biais** de petit échantillon quand aucune formule analytique n'existe : *quand les formules explicites ne sont pas connues, on peut utiliser le bootstrap pour estimer le biais*.
4. Pour obtenir des intervalles **asymétriques**, que l'approximation normale ne peut pas produire.

**Comment.**

- Données **i.i.d.** : tirer avec remise dans les observations.
- Données **dépendantes** : **bootstrap paramétrique** — estimer le modèle, rééchantillonner les **résidus**, régénérer la série, abandonner le rodage.
- Intervalle : $\big(\hat\mu-(\hat\mu^\ast_{97{,}5\%}-\hat\mu),\ \hat\mu-(\hat\mu^\ast_{2{,}5\%}-\hat\mu)\big)$.
- Biais : $\mathbb E_R[\hat\theta^\ast]-\hat\theta$.

**Les limites — quatre, toutes énoncées par le cours.**

**1. Les événements rares.** *Il ne fonctionne pas bien si des événements rares sont **absents de l'échantillon empirique**.* C'est la limite la plus grave en finance : le bootstrap ne peut rééchantillonner que l'observé, donc **ne crée jamais** d'événement plus extrême que le pire vu. Une base sans krach produira des queues minces — exactement le défaut de la simulation historique (fiche 55).

**2. Les biais de sélection.** *Il ne tient pas compte de biais plus subtils, comme le **biais du survivant** ou la sélection d'échantillon.* Si les fonds disparus manquent, le bootstrap reproduira fidèlement un échantillon biaisé.

**3. La mauvaise spécification.** *Il ne guérit pas la mauvaise spécification du modèle.* Le bootstrap paramétrique **régénère par le modèle estimé** : si le modèle est faux, tous les échantillons le seront.

**4. L'erreur ajoutée par la correction elle-même.** *En estimant le biais, on peut ajouter de l'erreur d'échantillonnage. Corriger **seulement si le biais est grand comparé à l'écart-type**.* C'est l'arbitrage biais-variance : retirer un biais mal estimé peut augmenter le risque total.

> ***Il ne remplace pas le bon sens !***

**La conclusion de méthode.** Le bootstrap est un **outil d'inférence**, pas un correcteur universel. Il traite l'**erreur d'échantillonnage** — l'incertitude due au fait qu'on n'a qu'un échantillon fini. Il ne traite **ni** les erreurs de **modèle**, **ni** les erreurs de **collecte**. Diagnostiquer d'abord la nature du problème, choisir l'outil ensuite.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Les deux défauts de l'asymptotique en petit échantillon ? | Estimateurs **biaisés** · écarts-types **imprécis** |
| Formule de Kendall ? | $\mathbb E(\hat\rho_1)-\rho_1\approx-\frac{1+3\rho_1}{T}$ |
| Signe du biais de l'autocorrélation ? | **Négatif** — elle est sous-estimée |
| Comment varie-t-il ? | Croissant en $\rho_1$, décroissant en $T$ |
| Biais observé pour $(\rho_1,T)=(0{,}9;50)$ ? | $-0{,}0826$ |
| Formule du biais de Stambaugh ? | $\frac{\mathrm{Cov}(u_t,\varepsilon_t)}{\mathrm{Var}(\varepsilon_t)}\mathbb E(\hat\rho-\rho)$ |
| Son signe pour le rendement du dividende ? | **Positif** — deux effets négatifs se multiplient |
| Persistance du rendement du dividende ? | $\hat\rho=0{,}9936$ |
| Biais moyen sur $\hat\beta$ dans l'exemple ? | $0{,}004$, pour un $SE$ de $0{,}005$ |
| Statistique de Student moyenne sous $H_0$ ? | $\mathbf{0{,}75}$ |
| Newey-West corrige-t-il ce biais ? | **Non** — il corrige les écarts-types |
| Loi de l'exemple non gaussien ? | Log-normale $x_t=e^{-1/2+\varepsilon_t}$, de moyenne $1$ |
| $\mathrm{Var}(\hat t)$ observée ? | $1{,}2542^2$ au lieu de $1$ |
| $\mathrm{Prob}(\hat t<-1{,}96)$ ? | $0{,}1053$ au lieu de $0{,}025$ |
| Que montre cette asymétrie ? | La loi de $\hat t$ est **asymétrique à gauche** |
| Définition du bootstrap ? | Monte-Carlo utilisant la **loi empirique** comme vraie |
| Comment rééchantillonner en i.i.d. ? | Tirer **avec remise**, chaque $x_i$ de probabilité $1/T$ |
| Intervalle de confiance bootstrap ? | $\big(\hat\mu-(\hat\mu^\ast_{97{,}5\%}-\hat\mu),\ \hat\mu-(\hat\mu^\ast_{2{,}5\%}-\hat\mu)\big)$ |
| Pourquoi les percentiles sont-ils inversés ? | On approche $\hat\mu-\mu$ par $\hat\mu^\ast-\hat\mu$ |
| Avantage sur l'intervalle normal ? | Il peut être **asymétrique** |
| Variance de $\hat t$ bootstrapée ? | $1{,}1852^2$ — plus proche de $1{,}2542^2$ que de $1$ |
| Que rééchantillonne le bootstrap paramétrique ? | Les **résidus**, pas les observations |
| Pourquoi ? | Tirer les observations **détruirait la dépendance** |
| Pourquoi le rodage ? | Éliminer l'effet de la **condition initiale** |
| Formule de correction de biais ? | $\mathbb E_R[\hat\theta^\ast]-\hat\theta$ |
| Quand corriger ? | Si le biais est **grand devant l'écart-type** |
| Pourquoi cette réserve ? | La correction **ajoute de l'erreur d'échantillonnage** |
| Biais bootstrapé de $\hat\beta$ ? | $0{,}0036$ — proche du $0{,}004$ du Monte-Carlo |
| Première limite du bootstrap ? | Les **événements rares absents** de l'échantillon |
| Deuxième limite ? | Biais du **survivant** et de **sélection** |
| Troisième limite ? | Il ne guérit pas la **mauvaise spécification** |
| La conclusion du cours ? | *Il ne remplace pas le bon sens !* |
