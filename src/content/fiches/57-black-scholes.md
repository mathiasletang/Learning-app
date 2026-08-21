# Fiche 57 — Valorisation risque-neutre et formule de Black-Scholes

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché |
| **Cours source** | Strela (Morgan Stanley et MIT), *18.S096 Topics in Mathematics with Applications in Finance*, MIT OpenCourseWare, automne 2013 — cours 19 « Risk Neutral Pricing / Black-Scholes Formula » |
| **Difficulté** | Must know — le résultat le plus important de la finance moderne |
| **Temps d'étude estimé** | 2 h 30 |
| **Prérequis** | Fiche 56 (lemme d'Itô, Girsanov), fiche 53 (brownien géométrique) |
| **Concepts clés** | Portefeuille répliquant, arbitrage, arbre binomial, probabilité risque-neutre, mesure martingale, équation de Black-Scholes, équation de la chaleur, formule de Black-Scholes, $d_1$ et $d_2$, densité log-normale, delta-couverture |
| **Poids à l'examen** | Trois choses : la **dérivation** de l'EDP de Black-Scholes par réplication ; le fait que le prix **ne dépende pas de $\mu$** et savoir l'expliquer ; et la **formule fermée** avec ses $d_1,d_2$. |

## 🎯 Vue d'ensemble

> **L'exemple des deux chevaux.** Une course à deux chevaux : le premier a $20\,\%$ de chances de gagner, le second $80\,\%$. Les parieurs ont misé $10\,000$ dollars sur le premier et $50\,000$ dollars sur le second.
>
> **Si la cote est fixée à $4$ contre $1$ :**
>
> - le bookmaker peut gagner $10\,000$ dollars (si le premier cheval gagne) ;
> - le bookmaker peut perdre $2\,500$ dollars (si le second gagne) ;
> - il **espère** faire $0{,}2\times(10\,000)+0{,}8\times(-2\,500)=0$.
>
> **Si la cote est fixée à $5$ contre $1$ :**
>
> - le bookmaker **ne perd ni ne gagne d'argent, quel que soit le cheval qui gagne**.

⚠️ **Comparez les deux lignes : c'est toute la leçon du chapitre.** À $4$ contre $1$, le bookmaker gagne zéro **en espérance**, sous les probabilités **réelles** — mais il est **exposé** : il peut perdre. À $5$ contre $1$, il gagne zéro **dans tous les cas** : son livre est **sans risque**.

> Et quelles probabilités la cote $5$ contre $1$ reflète-t-elle ? Ni $20\,\%$ ni $80\,\%$, mais $\frac{10\,000}{60\,000}=\frac16$ et $\frac{50\,000}{60\,000}=\frac56$ — **proportionnelles aux montants misés, pas aux vraies chances**. Ces probabilités-là, qui n'ont rien à voir avec la réalité mais qui annulent tout risque, **sont la mesure risque-neutre**.

```
IDÉE       répliquer exactement le payoff avec actions + cash
ARBITRAGE  deux portefeuilles de même payoff ont le même prix
BINOMIAL   f₀ = e^{-r dt}[q f₁ + (1-q) f₂]   avec q ≠ p (la vraie proba)
CONTINU    f_t = e^{-r(T-t)} E_Q[f_T]        Q = mesure martingale
EDP        ∂f/∂t + ½σ²S² ∂²f/∂S² + rS ∂f/∂S - rf = 0
SOLUTION   C = S N(d₁) - K e^{-r(T-t)} N(d₂)
```

## 🟡 Concept 1 — Les produits dérivés et les trois affirmations

| Produit | Ce qu'il paye en $T$ |
|---|---|
| **Contrat à terme (*forward*)** | $S-K$ |
| **Option d'achat européenne (*call*)** | $\max(S-K,0)$ |
| **Option de vente européenne (*put*)** | $\max(K-S,0)$ |
| **Option digitale** | $1$ si $S>K$, $0$ sinon |

> **Les trois affirmations fondatrices du cours.**
>
> - *Étant donné le prix actuel de l'action et des hypothèses sur la **dynamique** du prix, il n'y a **aucune incertitude** sur le prix d'un dérivé.*
> - *Le prix est défini **uniquement par le prix de l'action**, et **non par les préférences de risque** des participants au marché.*
> - *L'appareil mathématique permet de calculer le prix actuel d'un dérivé **et ses risques**, étant données certaines hypothèses sur le marché.*

⚠️ **La deuxième affirmation est la plus surprenante et la plus importante.** Deux investisseurs en désaccord total sur l'avenir de l'action — l'un pense qu'elle va doubler, l'autre qu'elle va s'effondrer — doivent néanmoins s'accorder sur le prix de l'option, dès lors qu'ils s'accordent sur sa **volatilité**. Le concept 6 explique pourquoi.

## 🔴 Concept 2 — Le portefeuille répliquant

**La tentation naïve.** Considérons un contrat à terme qui paye $S-K$ dans un temps $dt$. On pourrait croire que son prix d'exercice $K$ doit être défini par la probabilité de transition du « **monde réel** » $p$ :

$$p(S_1-K)+(1-p)(S_2-K)=pS_1+(1-p)S_2-K$$

$$K_0=pS_1+(1-p)S_2$$

Si $p=1/2$, alors $K_0=\frac{S_1+S_2}{2}$.

**Pourquoi c'est faux — l'argument d'arbitrage.** Considérons la stratégie suivante :

1. **Emprunter $S_0$ dollars** pour acheter l'action. Entrer dans le contrat à terme de prix d'exercice $K_0$.
2. Dans un temps $dt$, **livrer l'action** en échange de $K_0$ et **rembourser** $S_0e^{r\,dt}$ dollars.

- Si $K_0>S_0e^{r\,dt}$, on a réalisé un **profit sans risque** de $K_0-S_0e^{r\,dt}$.
- Si $K_0<S_0e^{r\,dt}$, on a **certainement perdu** de l'argent (il suffit d'inverser la stratégie pour gagner).

> **Conclusion — le principe central du chapitre.** *Le prix actuel d'une créance dérivée est déterminé par le **prix actuel d'un portefeuille qui réplique exactement le payoff** du dérivé à maturité.*

⚠️ **La probabilité réelle $p$ a complètement disparu.** Le seul prix compatible avec l'absence d'arbitrage est $K_0=S_0e^{r\,dt}$, qui ne fait intervenir que le prix comptant et le taux sans risque. C'est la première apparition du phénomène : **la réplication tue les probabilités réelles**.

## 🔴 Concept 3 — L'arbre binomial à un pas

**Le cadre.** L'économie comprend une action $S$, un compte monétaire sans risque $B$ de taux d'intérêt $r$, et une créance dérivée $f$. Seuls deux résultats sont possibles en un temps $dt$ :

$$(S_0,\ B_0,\ f_0)\ \longrightarrow\ \begin{cases}(S_1,\ B_0e^{r\,dt},\ f_1) & \text{avec probabilité } p\\[3pt] (S_2,\ B_0e^{r\,dt},\ f_2) & \text{avec probabilité } 1-p\end{cases}$$

**La réplication.** Pour une créance dérivée générale $f$, on cherche $a$ et $b$ tels que

$$f_1=aS_1+bB_0e^{r\,dt}, \qquad f_2=aS_2+bB_0e^{r\,dt}$$

Alors, par absence d'arbitrage,

$$f_0=aS_0+bB_0$$

**La solution.** On voit facilement que

$$a=\frac{f_1-f_2}{S_1-S_2}, \qquad b=\frac{S_1f_2-S_2f_1}{(S_1-S_2)B_0e^{r\,dt}}$$

d'où

$$f_0=e^{-r\,dt}\left[S_0e^{r\,dt}\,\frac{f_1-f_2}{S_1-S_2}+\frac{S_1f_2-S_2f_1}{S_1-S_2}\right]$$

**La réécriture décisive.** *On doit remarquer que*

$$f_0=e^{-r\,dt}\left[f_1\frac{S_0e^{r\,dt}-S_2}{S_1-S_2}+f_2\frac{S_1-S_0e^{r\,dt}}{S_1-S_2}\right]$$

c'est-à-dire

$$\boxed{\ f_0=e^{-r\,dt}\big(f_1q+f_2(1-q)\big)\ } \qquad\text{où}\qquad q=\frac{S_0e^{r\,dt}-S_2}{S_1-S_2},\quad 0<q<1$$

**Et de plus :**

$$S_1q+S_2(1-q)=e^{r\,dt}S_0$$

> **Lisez ces deux dernières lignes ensemble.** $q$ est un nombre entre $0$ et $1$ : c'est donc **une probabilité**. Sous cette probabilité, deux choses sont vraies :
>
> - le prix du dérivé est l'**espérance actualisée** de son payoff ;
> - le prix **espéré de l'action** croît exactement au **taux sans risque** — l'action ne rapporte aucune prime de risque.
>
> D'où le nom : **probabilité risque-neutre**. Elle décrit un monde où personne n'exige de compensation pour le risque.

⚠️ **$q$ n'est PAS $p$**, et $q$ ne dépend **pas** de $p$. Regardez la formule : $q$ ne contient que $S_0$, $S_1$, $S_2$ et $r$. La vraie probabilité $p$ n'intervient **nulle part** — exactement comme dans l'exemple des deux chevaux, où la cote sans risque était déterminée par les mises, non par les chances réelles.

## 🔴 Concept 4 — Le cas continu

> **La formule générale de valorisation.**
>
> $$\boxed{\ f_t=e^{-r(T-t)}E_Q[f_T]\ }$$
>
> *où $Q$ est la **mesure risque-neutre (martingale)**, sous laquelle*
>
> $$S_0=e^{-rt}E_Q[S_t]$$

> **La deuxième ligne définit $Q$ et donne son autre nom.** Dire que $S_0=e^{-rt}E_Q[S_t]$, c'est dire que le **prix actualisé** $e^{-rt}S_t$ est une **martingale** sous $Q$ (fiche 56). C'est la version continue de $S_1q+S_2(1-q)=e^{r\,dt}S_0$.
>
> **Et le lien avec Girsanov est direct.** Passer de la mesure réelle à $Q$, c'est **changer la dérive** du brownien — de $\mu$ à $r$ — sans toucher à la volatilité. C'est exactement ce que fait le théorème de Girsanov, et c'est pourquoi la fiche 56 annonçait : *convertir un processus non martingale en une martingale par changement de mesure donne une méthode de valorisation des dérivés*.

## 🔴 Concept 5 — La dérivation de l'équation de Black-Scholes

**L'hypothèse.** L'action a une dynamique **log-normale** :

$$dS=\mu S\,dt+\sigma S\,dW$$

où $dW$ est normalement distribué de moyenne $0$ et d'écart-type $\sqrt{dt}$ — c'est-à-dire que $W$ est un **mouvement brownien**.

**L'objectif.** Trouver un **portefeuille répliquant** tel que

$$df=a\,dS+b\,dB$$

**Étape 1 — appliquer la formule d'Itô.**

$$df(S,t)=\frac{\partial f}{\partial t}dt+\frac{\partial f}{\partial S}dS+\frac12\frac{\partial^2f}{\partial S^2}(dS)^2, \qquad (dS)^2=\sigma^2S^2\,dt$$

*(analogue à un développement de Taylor du premier ordre, jusqu'au terme en $dt$).*

**Étape 2 — substituer.** En remplaçant $dS$, $df$, $dB=rB\,dt$ et $(dS)^2$ dans $df=a\,dS+b\,dB$ :

$$\left[\frac{\partial f}{\partial t}+\frac{\partial f}{\partial S}\mu S+\frac12\frac{\partial^2f}{\partial S^2}\sigma^2S^2\right]dt+\frac{\partial f}{\partial S}\sigma S\,dW=\big(a\mu S+brB\big)dt+a\sigma S\,dW$$

**Étape 3 — comparer les termes.** L'égalité doit valoir pour le terme en $dW$ et pour le terme en $dt$ séparément :

$$\boxed{\ a=\frac{\partial f}{\partial S}\ } \qquad\text{et}\qquad brB=\frac{\partial f}{\partial t}+\frac12\frac{\partial^2f}{\partial S^2}\sigma^2S^2$$

> **La première identité est le « **delta** ».** $a=\partial f/\partial S$ est le **nombre d'actions à détenir** pour répliquer le dérivé — la **stratégie de couverture** (*delta-hedging*). Ce n'est pas un sous-produit : c'est la moitié du résultat, et celle que les salles de marché utilisent au quotidien.

**Étape 4 — l'argument déterministe.** $bB=f-aS$ est **déterministe**, et comme $dB=rB\,dt$ :

$$d(f-aS)=r(f-aS)\,dt$$

**Étape 5 — substituer une dernière fois** $df=\frac{\partial f}{\partial t}dt+\frac{\partial f}{\partial S}dS+\frac12\frac{\partial^2f}{\partial S^2}\sigma^2S^2\,dt$ et $a=\frac{\partial f}{\partial S}$. Les termes en $dS$ **s'annulent**, et l'on obtient l'**équation de Black-Scholes** :

$$\boxed{\ \frac{\partial f}{\partial t}+\frac12\sigma^2S^2\frac{\partial^2f}{\partial S^2}+rS\frac{\partial f}{\partial S}-rf=0\ }$$

> *Fischer Black et Myron Scholes — article de **1973**. Myron Scholes et Robert Merton — **prix Nobel 1997**.*

> **Le cœur de l'argument, en une phrase.** En détenant $a=\partial f/\partial S$ actions contre le dérivé, on **annule exactement le terme en $dW$** : le portefeuille $f-aS$ devient **sans risque**, et doit donc croître au taux sans risque $r$. Toute la démonstration tient dans cette annulation.

## 🔴 Concept 6 — Ce que dit l'équation

> - *N'importe quel dérivé **négociable** satisfait l'équation.*
> - ***Il n'y a aucune dépendance en la dérive réelle $\mu$.***
> - *On dispose d'une **stratégie de couverture** (portefeuille répliquant).*
> - *Par un **changement de variables**, l'équation de Black-Scholes se transforme en **équation de la chaleur** :* $$\frac{\partial u}{\partial\tau}=\frac{\partial^2u}{\partial x^2}$$

⚠️ **« Aucune dépendance en $\mu$ » est le point le plus contre-intuitif de toute la finance.** Regardez l'équation : $\mu$ n'y figure pas. Il a disparu à l'étape 3, absorbé par la couverture.

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi ?</span>

Parce que le portefeuille répliquant contient déjà $a$ actions. Si l'action monte plus vite que prévu, le dérivé gagne — mais la couverture aussi, exactement de la même manière. Les deux effets se compensent, et la dérive s'annule. **Seule la volatilité $\sigma$ survit**, parce qu'elle est ce que la couverture ne peut **pas** neutraliser.

**C'est la traduction en EDP du résultat de la fiche 56** : un changement de mesure modifie la dérive mais **laisse la volatilité invariante**.

</div>

> **La transformation en équation de la chaleur** n'est pas une curiosité : elle donne accès à tout l'arsenal analytique et numérique développé pour la diffusion thermique depuis Fourier — dont la solution en forme fermée du concept 8.

## 🟠 Concept 7 — Conditions aux limites et conditions finales

> *Les conditions aux limites et finales sont déterminées par le **payoff** du dérivé spécifique.*

**Pour un call européen :**

$$C(S,T)=\max(S-K,0), \qquad C(0,t)=0, \qquad C(\infty,t)\sim S$$

**Pour un put européen :**

$$P(S,T)=\max(K-S,0), \qquad P(0,t)=Ke^{-r(T-t)}, \qquad P(\infty,t)=0$$

> **Chaque condition a un sens économique immédiat.**
>
> - $C(0,t)=0$ : si l'action ne vaut rien, elle ne vaudra jamais rien (le zéro est absorbant pour un brownien géométrique) — le call est sans valeur.
> - $C(\infty,t)\sim S$ : pour $S$ très grand, l'exercice est certain et le call vaut à peu près l'action.
> - $P(0,t)=Ke^{-r(T-t)}$ : si l'action ne vaut rien, le put paiera $K$ à coup sûr en $T$ ; sa valeur aujourd'hui est donc $K$ **actualisé**.
>
> **L'EDP est la même pour tous les dérivés ; c'est la condition finale qui distingue un call d'un put, d'un forward ou d'une digitale.** Autrement dit : une seule équation, une infinité de produits.

## 🔴 Concept 8 — La formule de Black-Scholes

> *Pour un call ou un put européen, l'équation peut être résolue **analytiquement** :*
>
> $$\boxed{\ C_t=S\,N(d_1)-Ke^{-r(T-t)}N(d_2)\ }$$
>
> $$\boxed{\ P_t=Ke^{-r(T-t)}N(-d_2)-S\,N(-d_1)\ }$$
>
> *où*
>
> $$d_1=\frac{\ln(S/K)+(r+\sigma^2/2)(T-t)}{\sigma\sqrt{T-t}}, \qquad d_2=\frac{\ln(S/K)+(r-\sigma^2/2)(T-t)}{\sigma\sqrt{T-t}}$$
>
> $$N(x)=\frac{1}{\sqrt{2\pi}}\int_{-\infty}^xe^{-u^2/2}\,du$$

**Noter que $d_2=d_1-\sigma\sqrt{T-t}$.**

<div class="callout" data-kind="methode">

<span class="callout__lab">Comment lire la formule du call.</span>

C'est une **différence de deux termes**, tous deux interprétables.

- $Ke^{-r(T-t)}N(d_2)$ : la valeur actuelle du prix d'exercice, multipliée par $N(d_2)$ = la **probabilité risque-neutre d'exercice**, c'est-à-dire $Q(S_T>K)$.
- $S\,N(d_1)$ : la valeur actuelle de l'action qu'on recevra, pondérée par $N(d_1)$. Et $N(d_1)$ est **exactement le delta** $\partial C/\partial S$ du concept 5 — le nombre d'actions à détenir en couverture.

Autrement dit : *« je reçois l'action si j'exerce, je paye $K$ si j'exerce », chaque branche étant pondérée par la probabilité risque-neutre appropriée.*

</div>

⚠️ **Ne confondez pas $d_1$ et $d_2$.** Ils diffèrent par le signe devant $\sigma^2/2$ — et c'est encore le terme d'Itô de la fiche 56. $N(d_2)$ est une probabilité d'exercice ; $N(d_1)$ est un delta. Les intervertir donne un prix faux et une couverture fausse.

**La parité call-put** en découle immédiatement, puisque $N(x)+N(-x)=1$ :

$$C_t-P_t=S-Ke^{-r(T-t)}$$

qui est aussi, mécaniquement, la valeur du **contrat à terme** de prix d'exercice $K$.

## 🔴 Concept 9 — La formulation risque-neutre de Black-Scholes

> **La valorisation risque-neutre.**
>
> $$f_t=e^{-r(T-t)}E_Q[f_T]$$
>
> *où $Q$ est la mesure risque-neutre sous laquelle*
>
> $$\boxed{\ dS=rS\,dt+\sigma S\,dW\ }$$

**Et la densité qui en résulte.** Sous $Q$, la loi de $S_T$ sachant $S_t$ est **log-normale** :

$$\text{PDF}(S_T)=\frac{1}{S_T\,\sigma\sqrt{2\pi(T-t)}}\exp\left(-\frac{\big(\ln(S_T/S_t)-(r-\sigma^2/2)(T-t)\big)^2}{2\sigma^2(T-t)}\right)$$

> **Comparez avec l'équation réelle $dS=\mu S\,dt+\sigma S\,dW$ : le seul changement est $\mu\to r$.** C'est tout ce que fait le passage à la mesure risque-neutre — et c'est exactement l'énoncé de Girsanov de la fiche 56.
>
> **Et retrouvez le $-\sigma^2/2$ dans l'exposant** : c'est le terme d'Itô du logarithme, calculé en fiche 56. La densité log-normale sous $Q$ est donc celle de $S_t\exp\big((r-\frac{\sigma^2}{2})(T-t)+\sigma(W_T-W_t)\big)$.

> **Les deux routes vers le même prix.** On peut soit **résoudre l'EDP** avec ses conditions aux limites (approche de Black et Scholes), soit **calculer l'espérance** $e^{-r(T-t)}E_Q[\max(S_T-K,0)]$ en intégrant la densité log-normale (approche martingale). Les deux donnent la même formule : c'est le **théorème de Feynman-Kac** qui les relie.

## 🟡 Concept 10 — Quand la formule fermée n'existe pas

<div class="callout" data-kind="methode">

<span class="callout__lab">méthodes numériques</span>

*Pour des options plus compliquées ou des hypothèses plus générales, il faut recourir aux :*

- **méthodes de différences finies** ;
- **méthodes d'arbres** (équivalentes à un schéma explicite) ;
- **simulations de Monte-Carlo**.

</div>

| Méthode | Ce qu'elle discrétise | Bien adaptée à |
|---|---|---|
| **Différences finies** | l'**EDP** | options à exercice anticipé, faible dimension |
| **Arbres** | le **processus** | pédagogie, options américaines, faible dimension |
| **Monte-Carlo** | l'**espérance** $E_Q$ | grande dimension, produits **dépendants du chemin** |

> **Le critère de choix est la dimension.** Les différences finies et les arbres coûtent exponentiellement cher en nombre de sous-jacents ; Monte-Carlo a une erreur en $1/\sqrt N$ **indépendante de la dimension**. Au-delà de trois ou quatre facteurs, Monte-Carlo est le seul praticable — c'est exactement l'argument de la fiche 55.

> **La conclusion du cours.** *Les services financiers modernes font usage de : **EDP**, **méthodes numériques**, **calcul stochastique**, **simulations**, **statistiques**, et bien, bien plus.*

## Comment résoudre l'exercice type (protocole)

1. **Identifier le payoff** $f_T$ du dérivé — c'est la **condition finale** de l'EDP.
2. **Poser la dynamique** : $dS=\mu S\,dt+\sigma S\,dW$ sous la mesure réelle.
3. **Choisir la route** : EDP (si l'on veut une couverture ou un schéma numérique) ou espérance risque-neutre (si l'on veut un prix).
4. **Route EDP** : appliquer Itô, former le portefeuille $f-aS$ avec $a=\partial f/\partial S$, écrire $\frac{\partial f}{\partial t}+\frac12\sigma^2S^2\frac{\partial^2f}{\partial S^2}+rS\frac{\partial f}{\partial S}-rf=0$, ajouter les conditions aux limites.
5. **Route martingale** : remplacer $\mu$ par $r$, écrire $f_t=e^{-r(T-t)}E_Q[f_T]$ et intégrer la densité log-normale.
6. **Pour un call ou un put** : appliquer directement la formule fermée, en calculant $d_1$ puis $d_2=d_1-\sigma\sqrt{T-t}$.
7. **Vérifier** : le prix ne doit **pas** contenir $\mu$ ; la parité call-put doit être satisfaite ; les cas limites ($S\to0$, $S\to\infty$, $T\to t$) doivent redonner le payoff.

### Comment reconnaître qu'il faut utiliser cette méthode ?

| Indice dans l'énoncé | Ce qu'il faut faire |
|---|---|
| « prix d'un dérivé sans arbitrage » | **portefeuille répliquant** |
| deux états possibles | **arbre binomial**, $q=(S_0e^{rdt}-S_2)/(S_1-S_2)$ |
| « probabilité risque-neutre » | celle sous laquelle $E[S]$ croît au taux $r$ |
| « combien d'actions détenir ? » | le **delta** $a=\partial f/\partial S$, soit $N(d_1)$ pour un call |
| « le prix dépend-il du rendement espéré ? » | **non** — $\mu$ n'apparaît pas dans l'EDP |
| call ou put européen, dynamique log-normale | **formule fermée** de Black-Scholes |
| payoff exotique ou dépendant du chemin | **Monte-Carlo** sous $Q$ |
| exercice anticipé possible | **différences finies** ou **arbre** |

### Exercices progressifs

**Niveau 1** — Dans l'arbre binomial, montrez que $q$ ne dépend pas de la probabilité réelle $p$, et interprétez.

<details><summary>Correction</summary>

**La formule.**

$$q=\frac{S_0e^{r\,dt}-S_2}{S_1-S_2}$$

Elle ne contient que $S_0$, $S_1$, $S_2$ et $r$ : **$p$ n'y figure pas**.

**Pourquoi.** $q$ vient de la **réplication**, pas d'un calcul de probabilité. On a construit $a$ et $b$ tels que le portefeuille reproduise $f$ **dans les deux états**. Un portefeuille qui reproduit le payoff dans **tous** les cas a la même valeur que le dérivé quelles que soient les chances de chaque état.

**L'interprétation.** $q$ est la probabilité **implicite** dans les prix de marché, celle sous laquelle

$$S_1q+S_2(1-q)=e^{r\,dt}S_0$$

c'est-à-dire sous laquelle l'action rapporte **exactement le taux sans risque** : aucune prime de risque.

**Le retour aux deux chevaux.** À la cote $5$ contre $1$, le bookmaker ne risque rien, et les probabilités implicites $\frac16$ et $\frac56$ sont **proportionnelles aux mises** ($10\,000$ et $50\,000$ sur $60\,000$), non aux vraies chances de $20\,\%$ et $80\,\%$. Le prix « juste » n'est pas celui qui annule l'espérance de gain sous les vraies probabilités — c'est celui qui **annule le risque**.

</details>

**Niveau 2** — Pourquoi le prix d'une option ne dépend-il pas du rendement espéré $\mu$ de l'action ?

<details><summary>Correction</summary>

**Le fait.** L'équation de Black-Scholes

$$\frac{\partial f}{\partial t}+\frac12\sigma^2S^2\frac{\partial^2f}{\partial S^2}+rS\frac{\partial f}{\partial S}-rf=0$$

ne contient **pas** $\mu$. Il a disparu à l'étape 3 de la dérivation.

**Le mécanisme.** Le portefeuille répliquant contient $a=\partial f/\partial S$ actions. En formant $f-aS$, les termes en $dS$ — donc en $\mu\,dt$ **et** en $\sigma\,dW$ — s'annulent **exactement**. Il reste un portefeuille **sans risque**, qui doit donc croître au taux $r$, quelle que soit la dérive de l'action.

**L'intuition financière.** Si l'action monte plus vite que prévu, le call gagne — mais la position en actions du portefeuille de couverture gagne exactement autant. Le vendeur d'option **est couvert** : sa performance ne dépend pas de la direction du sous-jacent. Il n'a donc aucune raison de facturer une prime pour la dérive.

**Ce qui survit et pourquoi.** $\sigma$ reste, parce que la couverture est **continûment réajustée** mais ne peut pas neutraliser l'**amplitude** des mouvements. Plus l'action bouge, plus la couverture coûte cher à maintenir — et c'est ce coût que la prime rémunère.

**La formulation en termes de mesure (fiche 56).** Passer de $\mathbb P$ à $Q$ change la **dérive** ($\mu\to r$) mais **laisse la volatilité invariante**. Comme le prix est $e^{-r(T-t)}E_Q[f_T]$, il ne peut dépendre que de ce qui survit au changement de mesure : $\sigma$, pas $\mu$.

**La conséquence pratique.** Deux investisseurs en désaccord complet sur l'avenir de l'action doivent s'accorder sur le prix de l'option — dès lors qu'ils s'accordent sur sa volatilité. C'est pourquoi les marchés d'options cotent, de fait, des **volatilités** et non des prix.

</details>

**Niveau 3** — Calculez le prix d'un call avec $S=100$, $K=100$, $r=5\,\%$, $\sigma=20\,\%$, $T-t=1$ an.

<details><summary>Correction</summary>

**Étape 1 — $d_1$.**

$$d_1=\frac{\ln(100/100)+(0{,}05+0{,}02)\times1}{0{,}20\times1}=\frac{0+0{,}07}{0{,}20}=0{,}35$$

(en utilisant $\sigma^2/2=0{,}04/2=0{,}02$).

**Étape 2 — $d_2$.**

$$d_2=d_1-\sigma\sqrt{T-t}=0{,}35-0{,}20=0{,}15$$

**Étape 3 — les probabilités normales.**

$$N(0{,}35)\approx0{,}6368, \qquad N(0{,}15)\approx0{,}5596$$

**Étape 4 — le prix.**

$$C=S\,N(d_1)-Ke^{-r(T-t)}N(d_2)=100\times0{,}6368-100\times e^{-0{,}05}\times0{,}5596$$

$$=63{,}68-100\times0{,}9512\times0{,}5596=63{,}68-53{,}22=\mathbf{10{,}46}$$

**Les lectures à en tirer.**

- $N(d_1)=0{,}6368$ est le **delta** : pour couvrir la vente d'un call, il faut détenir environ $0{,}64$ action.
- $N(d_2)=0{,}5596$ est la **probabilité risque-neutre d'exercice** : $56\,\%$ de chances que $S_T>K$.
- Le call à la monnaie vaut $10{,}5\,\%$ du sous-jacent pour un an et $20\,\%$ de volatilité — un ordre de grandeur utile à mémoriser.

**Vérification par la parité.**

$$P=C-S+Ke^{-r(T-t)}=10{,}46-100+95{,}12=5{,}58$$

Le put vaut moins que le call, ce qui est correct : à la monnaie, le taux d'intérêt positif favorise le call, puisqu'on paye $K$ **plus tard**.

</details>

**Niveau 4 — type examen** — Dérivez complètement l'équation de Black-Scholes et expliquez chaque étape.

<details><summary>Correction</summary>

**Étape 0 — les hypothèses.** L'action suit $dS=\mu S\,dt+\sigma S\,dW$ avec $W$ brownien ; le compte monétaire suit $dB=rB\,dt$ ; on cherche un portefeuille répliquant $df=a\,dS+b\,dB$.

**Étape 1 — le lemme d'Itô** (fiche 56) appliqué à $f(S,t)$ :

$$df=\frac{\partial f}{\partial t}dt+\frac{\partial f}{\partial S}dS+\frac12\frac{\partial^2f}{\partial S^2}(dS)^2, \qquad (dS)^2=\sigma^2S^2\,dt$$

Le terme en $(dS)^2$ est celui qui n'existe pas en calcul ordinaire ; il vient de $(dW)^2=dt$.

**Étape 2 — développer en $dt$ et $dW$.**

$$df=\left[\frac{\partial f}{\partial t}+\mu S\frac{\partial f}{\partial S}+\frac12\sigma^2S^2\frac{\partial^2f}{\partial S^2}\right]dt+\sigma S\frac{\partial f}{\partial S}\,dW$$

et, du côté du portefeuille,

$$a\,dS+b\,dB=(a\mu S+brB)\,dt+a\sigma S\,dW$$

**Étape 3 — identifier les coefficients.** Deux processus d'Itô sont égaux si et seulement si leurs coefficients en $dt$ **et** en $dW$ coïncident (unicité de la décomposition semi-martingale) :

$$\text{terme en }dW:\quad \sigma S\frac{\partial f}{\partial S}=a\sigma S \quad\Longrightarrow\quad \boxed{a=\frac{\partial f}{\partial S}}$$

$$\text{terme en }dt:\quad brB=\frac{\partial f}{\partial t}+\frac12\sigma^2S^2\frac{\partial^2f}{\partial S^2}$$

*(le terme $\mu S\,\partial f/\partial S$ des deux côtés s'annule, puisque $a=\partial f/\partial S$ — **c'est ici que $\mu$ disparaît**).*

**Étape 4 — l'argument sans risque.** $bB=f-aS$ est un montant investi au taux sans risque, donc **déterministe** au premier ordre. Comme $dB=rB\,dt$ :

$$d(f-aS)=r(f-aS)\,dt$$

**Étape 5 — conclure.** Le membre de gauche vaut $df-a\,dS$ ; en y substituant Itô et $a=\partial f/\partial S$, les termes en $dS$ **s'annulent** et il reste

$$\left[\frac{\partial f}{\partial t}+\frac12\sigma^2S^2\frac{\partial^2f}{\partial S^2}\right]dt=r\left(f-S\frac{\partial f}{\partial S}\right)dt$$

$$\boxed{\ \frac{\partial f}{\partial t}+\frac12\sigma^2S^2\frac{\partial^2f}{\partial S^2}+rS\frac{\partial f}{\partial S}-rf=0\ }$$

**Ce qu'il faut savoir commenter.**

1. **L'idée en une phrase** : détenir $\partial f/\partial S$ actions **annule le terme aléatoire** ; le reste, étant sans risque, doit croître au taux $r$.
2. **$\mu$ a disparu** — le prix ne dépend pas des anticipations sur le sous-jacent, seulement de sa volatilité.
3. **$a=\partial f/\partial S$ est le delta** — la dérivation ne donne pas seulement un prix, elle donne la **stratégie de couverture** qui le justifie.
4. **L'EDP est universelle** : *n'importe quel dérivé négociable la satisfait*. Ce sont les **conditions finales** qui distinguent un call ($\max(S-K,0)$) d'un put ($\max(K-S,0)$) ou d'une digitale.
5. **Par changement de variables, elle devient l'équation de la chaleur** $\partial u/\partial\tau=\partial^2u/\partial x^2$ — d'où la solubilité analytique pour call et put.

**Les hypothèses implicites, à mentionner en critique.** Réajustement **continu** de la couverture, absence de coûts de transaction, volatilité **constante**, trajectoires **continues** (aucun saut), possibilité d'emprunter et de vendre à découvert sans limite. Aucune n'est vraie en pratique : les sauts de la fiche 53 et les queues épaisses expliquent le « *smile* » de volatilité observé sur les marchés, c'est-à-dire le fait que la volatilité implicite dépende du prix d'exercice — ce que le modèle interdit.

</details>

## 🔴 Common mistakes

1. **Utiliser la probabilité réelle $p$** pour valoriser — c'est $q$, la probabilité risque-neutre, qui intervient ; elle ne dépend pas de $p$.
2. **Croire que le prix dépend de $\mu$** — $\mu$ n'apparaît nulle part dans l'EDP ni dans la formule.
3. **Confondre $N(d_1)$ et $N(d_2)$** — $N(d_1)$ est le **delta**, $N(d_2)$ la **probabilité risque-neutre d'exercice**.
4. **Se tromper de signe devant $\sigma^2/2$** — $+$ dans $d_1$, $-$ dans $d_2$ ; et $d_2=d_1-\sigma\sqrt{T-t}$.
5. **Oublier d'actualiser $K$** — c'est $Ke^{-r(T-t)}$ et non $K$ dans la formule.
6. **Oublier le terme d'Itô $\frac12\sigma^2S^2\frac{\partial^2f}{\partial S^2}$** dans la dérivation.
7. **Croire que la mesure risque-neutre décrit le monde réel** — elle ne décrit rien : c'est un **outil de calcul**, comme la cote du bookmaker.
8. **Appliquer la formule fermée à une option américaine** — elle vaut pour les options **européennes** ; l'exercice anticipé demande des méthodes numériques.
9. **Oublier que $\sigma$ est supposée constante** — d'où le *smile* de volatilité, que le modèle ne peut pas expliquer.
10. **Confondre condition finale et condition aux limites** — la condition **finale** est le payoff en $T$ ; les conditions aux **limites** sont le comportement en $S=0$ et $S\to\infty$.

## 📌 Ultimate Review

1. **Les deux chevaux** : la cote $4$-$1$ annule l'espérance sous les **vraies** probabilités ; la cote $5$-$1$ annule le **risque**. Les probabilités implicites sont proportionnelles aux **mises**, pas aux chances.
2. **Payoffs** : forward $S-K$ · call $\max(S-K,0)$ · put $\max(K-S,0)$ · digitale $\mathbf 1_{S>K}$.
3. **Les trois affirmations** : pas d'incertitude sur le prix ; il ne dépend **pas des préférences de risque** ; on obtient prix **et** risques.
4. **Le principe** : *le prix d'une créance dérivée est le prix d'un portefeuille qui **réplique exactement** son payoff*.
5. **Arbre binomial** : $a=\frac{f_1-f_2}{S_1-S_2}$, $b=\frac{S_1f_2-S_2f_1}{(S_1-S_2)B_0e^{rdt}}$, $f_0=aS_0+bB_0$.
6. **Réécriture** : $f_0=e^{-r\,dt}\big(qf_1+(1-q)f_2\big)$ avec $q=\frac{S_0e^{rdt}-S_2}{S_1-S_2}\in(0,1)$, et $S_1q+S_2(1-q)=e^{rdt}S_0$.
7. **Cas continu** : $f_t=e^{-r(T-t)}E_Q[f_T]$, $Q$ **mesure risque-neutre (martingale)**, $S_0=e^{-rt}E_Q[S_t]$.
8. **Dynamique réelle** : $dS=\mu S\,dt+\sigma S\,dW$, $(dS)^2=\sigma^2S^2dt$.
9. **Réplication** : $df=a\,dS+b\,dB$, $dB=rB\,dt$ ⟹ $a=\frac{\partial f}{\partial S}$ (le **delta**) et $brB=\frac{\partial f}{\partial t}+\frac12\sigma^2S^2\frac{\partial^2f}{\partial S^2}$.
10. **EDP de Black-Scholes** : $\frac{\partial f}{\partial t}+\frac12\sigma^2S^2\frac{\partial^2f}{\partial S^2}+rS\frac{\partial f}{\partial S}-rf=0$. Black et Scholes 1973 ; Nobel 1997 à Scholes et Merton.
11. **Ses propriétés** : universelle pour tout dérivé négociable · **aucune dépendance en $\mu$** · fournit la couverture · se transforme en **équation de la chaleur** $\partial u/\partial\tau=\partial^2u/\partial x^2$.
12. **Conditions** — call : $C(S,T)=\max(S-K,0)$, $C(0,t)=0$, $C(\infty,t)\sim S$. Put : $P(S,T)=\max(K-S,0)$, $P(0,t)=Ke^{-r(T-t)}$, $P(\infty,t)=0$.
13. **Formule** : $C=S\,N(d_1)-Ke^{-r(T-t)}N(d_2)$ et $P=Ke^{-r(T-t)}N(-d_2)-S\,N(-d_1)$.
14. **Les $d$** : $d_{1,2}=\frac{\ln(S/K)+(r\pm\sigma^2/2)(T-t)}{\sigma\sqrt{T-t}}$, $d_2=d_1-\sigma\sqrt{T-t}$ ; $N(x)=\frac{1}{\sqrt{2\pi}}\int_{-\infty}^xe^{-u^2/2}du$.
15. **Interprétation** : $N(d_1)$ = **delta**, $N(d_2)$ = **probabilité risque-neutre d'exercice** ; parité $C-P=S-Ke^{-r(T-t)}$.
16. **Sous $Q$** : $dS=rS\,dt+\sigma S\,dW$ — seul $\mu\to r$ change ; densité **log-normale** avec $(r-\sigma^2/2)(T-t)$.
17. **Méthodes numériques** : différences finies · arbres (schéma explicite) · **Monte-Carlo** (seule praticable en grande dimension).

**Formulas to know**

$$q=\frac{S_0e^{r\,dt}-S_2}{S_1-S_2} \qquad f_t=e^{-r(T-t)}E_Q[f_T] \qquad dS=rS\,dt+\sigma S\,dW \text{ sous } Q$$

$$\frac{\partial f}{\partial t}+\frac12\sigma^2S^2\frac{\partial^2f}{\partial S^2}+rS\frac{\partial f}{\partial S}-rf=0 \qquad a=\frac{\partial f}{\partial S}$$

$$C=S\,N(d_1)-Ke^{-r(T-t)}N(d_2) \qquad d_1=\frac{\ln(S/K)+(r+\frac{\sigma^2}{2})(T-t)}{\sigma\sqrt{T-t}} \qquad d_2=d_1-\sigma\sqrt{T-t}$$

**Methods to know** : la construction du portefeuille répliquant binomial ; la réécriture en probabilité risque-neutre ; la dérivation complète de l'EDP en 5 étapes ; le calcul numérique d'un prix de call.

## 🧠 Active Recall

**Basic** — Écrivez l'équation de Black-Scholes et la formule du call européen.

<details><summary>Réponse</summary>

**L'équation :**

$$\frac{\partial f}{\partial t}+\frac12\sigma^2S^2\frac{\partial^2f}{\partial S^2}+rS\frac{\partial f}{\partial S}-rf=0$$

**La formule du call :**

$$C_t=S\,N(d_1)-Ke^{-r(T-t)}N(d_2)$$

$$d_1=\frac{\ln(S/K)+(r+\sigma^2/2)(T-t)}{\sigma\sqrt{T-t}}, \qquad d_2=d_1-\sigma\sqrt{T-t}$$

**Remarquez ce qui n'y est pas : $\mu$.** Ni dans l'équation, ni dans la formule.

</details>

**Understanding** — Qu'est-ce que la mesure risque-neutre, et pourquoi porte-t-elle ce nom ?

<details><summary>Réponse</summary>

C'est la mesure de probabilité $Q$ sous laquelle

$$S_0=e^{-rt}E_Q[S_t] \qquad\text{c'est-à-dire}\qquad dS=rS\,dt+\sigma S\,dW$$

Le prix **actualisé** $e^{-rt}S_t$ y est une **martingale** — d'où son autre nom, mesure martingale.

**Pourquoi « risque-neutre ».** Sous $Q$, l'action rapporte **exactement le taux sans risque**, sans aucune prime : c'est ce qu'exigerait un investisseur **indifférent au risque**.

⚠️ **Mais $Q$ ne décrit pas le monde réel.** Personne ne croit que les actions rapportent $r$. $Q$ est un **outil de calcul** — exactement comme la cote du bookmaker à $5$ contre $1$, qui reflète les mises et non les vraies chances des chevaux. Et par Girsanov (fiche 56), $Q$ est **équivalente** à la mesure réelle : les mêmes scénarios restent possibles, seule leur pondération change.

</details>

**Application** — Vous vendez un call. Combien d'actions devez-vous détenir pour vous couvrir ?

<details><summary>Réponse</summary>

Le nombre d'actions est le **delta**, qui sort directement de la dérivation :

$$a=\frac{\partial C}{\partial S}=N(d_1)$$

Pour l'exemple numérique ($S=K=100$, $r=5\,\%$, $\sigma=20\,\%$, $T-t=1$), $N(d_1)=N(0{,}35)\approx0{,}64$ : il faut détenir environ **$0{,}64$ action** par call vendu.

**Pourquoi ça marche.** Le portefeuille « $-1$ call $+\ 0{,}64$ action » a un terme en $dW$ **nul** : il est localement sans risque. Une variation du prix de l'action affecte le call et la position en actions **de la même façon**, et les deux effets se compensent.

⚠️ **Mais la couverture doit être **réajustée en continu**.** $N(d_1)$ change avec $S$ et avec $t$ — c'est le **gamma** $\partial^2C/\partial S^2$ qui mesure cette vitesse. En pratique, on réajuste à intervalles discrets, ce qui laisse un risque résiduel ; et les coûts de transaction rendent le réajustement continu impossible. C'est l'écart principal entre le modèle et la réalité.

</details>

**Comparison** — EDP contre valorisation risque-neutre : deux routes vers le même prix ?

<details><summary>Réponse</summary>

|  | **Route EDP** | **Route martingale** |
|---|---|---|
| Point de départ | portefeuille **répliquant** | changement de **mesure** |
| Objet à résoudre | $\frac{\partial f}{\partial t}+\frac12\sigma^2S^2\frac{\partial^2f}{\partial S^2}+rS\frac{\partial f}{\partial S}-rf=0$ | $f_t=e^{-r(T-t)}E_Q[f_T]$ |
| Outil | équations aux dérivées partielles | Itô, Girsanov, intégration |
| Ce qu'elle donne en prime | la **couverture** $a=\partial f/\partial S$ | la **loi** de $S_T$ sous $Q$ |
| Bien adaptée à | différences finies, exercice anticipé | Monte-Carlo, grande dimension, payoffs exotiques |

**Elles donnent le même prix**, et c'est le **théorème de Feynman-Kac** qui l'établit : la solution d'une EDP parabolique de cette forme **est** une espérance conditionnelle le long des trajectoires du processus associé.

**Comment choisir.** La route EDP est naturelle quand on veut couvrir ou quand il y a exercice anticipé (option américaine). La route martingale est naturelle en grande dimension ou pour des payoffs dépendants du chemin, où l'on simule directement $S_T$ sous $Q$ et où l'on moyenne le payoff actualisé.

**Le point commun décisif** : dans les deux cas, $\mu$ a disparu — remplacé par $r$ dans la route martingale, annulé par la couverture dans la route EDP. C'est le même fait vu de deux côtés.

</details>

**Exam-style** — Expliquez l'exemple des deux chevaux et faites le lien avec la valorisation d'options.

<details><summary>Réponse</summary>

**Les données.** Deux chevaux, $20\,\%$ et $80\,\%$ de chances. Mises : $10\,000$ dollars sur le premier, $50\,000$ dollars sur le second ; total $60\,000$ dollars.

**Cote $4$ contre $1$.** Si le premier gagne, le bookmaker paye $10\,000\times5=50\,000$ et **gagne $10\,000$ dollars**. Si le second gagne, il paye $50\,000\times1{,}25=62\,500$ et **perd $2\,500$ dollars**. Son espérance de gain :

$$0{,}2\times10\,000+0{,}8\times(-2\,500)=2\,000-2\,000=0$$

**Espérance nulle, mais risque bien réel** — il peut perdre.

**Cote $5$ contre $1$.** Si le premier gagne : $10\,000\times6=60\,000$, il **rend exactement** ce qu'il a collecté. Si le second gagne : $50\,000\times1{,}2=60\,000$, **idem**. Le bookmaker *ne perd ni ne gagne d'argent, quel que soit le cheval qui gagne* : son livre est **sans risque**.

**Les probabilités implicites de la cote $5$-$1$.**

$$\frac{10\,000}{60\,000}=\frac16\approx17\,\%, \qquad \frac{50\,000}{60\,000}=\frac56\approx83\,\%$$

Elles sont **proportionnelles aux mises**, et non aux vraies chances de $20\,\%$ et $80\,\%$.

**Le lien avec les options — point par point.**

| Course | Marché d'options |
|---|---|
| Vraies chances $20/80$ | probabilité réelle $p$, dérive $\mu$ |
| Cote annulant l'**espérance** | prix « actuariel », $K_0=pS_1+(1-p)S_2$ |
| Cote annulant le **risque** | prix de **non-arbitrage**, $K_0=S_0e^{r\,dt}$ |
| Probabilités implicites $\frac16,\frac56$ | probabilité **risque-neutre** $q$ |
| Livre équilibré | portefeuille **répliquant** |

**La leçon centrale.** Un prix « juste » n'est **pas** celui qui rend l'espérance de gain nulle sous les vraies probabilités : c'est celui qui permet de **construire une position sans risque**. Et ce prix ne dépend pas des vraies probabilités — ni pour le bookmaker, ni pour le vendeur d'options.

**Et le pendant financier de l'équilibrage du livre**, c'est la **delta-couverture** : détenir $a=\partial f/\partial S=N(d_1)$ actions par call vendu annule le terme en $dW$, exactement comme la cote $5$-$1$ annule l'exposition du bookmaker aux deux issues.

⚠️ **Où l'analogie s'arrête.** Le bookmaker ajuste sa cote **une fois** ; le vendeur d'option doit réajuster sa couverture **en continu**, parce que le delta change avec $S$ et avec $t$. C'est là qu'entrent le gamma, les coûts de transaction, et tout l'écart entre le modèle et la réalité.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Payoff d'un call européen ? | $\max(S-K,0)$ |
| Payoff d'un put européen ? | $\max(K-S,0)$ |
| Payoff d'une option digitale ? | $1$ si $S>K$, $0$ sinon |
| Le principe de valorisation ? | Le prix du **portefeuille répliquant** |
| Prix à terme sans arbitrage ? | $K_0=S_0e^{r\,dt}$ |
| Delta de réplication binomiale ? | $a=(f_1-f_2)/(S_1-S_2)$ |
| Prix binomial ? | $f_0=e^{-r\,dt}\big(qf_1+(1-q)f_2\big)$ |
| Probabilité risque-neutre binomiale ? | $q=(S_0e^{rdt}-S_2)/(S_1-S_2)$ |
| $q$ dépend-elle de $p$ ? | **Non**, pas du tout |
| Que vérifie $q$ ? | $S_1q+S_2(1-q)=e^{rdt}S_0$ |
| Formule de valorisation continue ? | $f_t=e^{-r(T-t)}E_Q[f_T]$ |
| Autre nom de $Q$ ? | Mesure **martingale** |
| Dynamique sous $Q$ ? | $dS=rS\,dt+\sigma S\,dW$ |
| Dynamique réelle ? | $dS=\mu S\,dt+\sigma S\,dW$ |
| $(dS)^2=?$ | $\sigma^2S^2\,dt$ |
| Équation de Black-Scholes ? | $\frac{\partial f}{\partial t}+\frac12\sigma^2S^2\frac{\partial^2f}{\partial S^2}+rS\frac{\partial f}{\partial S}-rf=0$ |
| Le delta de couverture ? | $a=\partial f/\partial S$ |
| L'EDP dépend-elle de $\mu$ ? | **Non** |
| En quelle équation se transforme-t-elle ? | L'**équation de la chaleur** $\partial u/\partial\tau=\partial^2u/\partial x^2$ |
| Année de l'article ? | **1973** — Black et Scholes |
| Prix Nobel ? | **1997** — Scholes et Merton |
| Conditions aux limites du call ? | $C(0,t)=0$, $C(\infty,t)\sim S$ |
| Conditions aux limites du put ? | $P(0,t)=Ke^{-r(T-t)}$, $P(\infty,t)=0$ |
| Formule du call ? | $S\,N(d_1)-Ke^{-r(T-t)}N(d_2)$ |
| Formule du put ? | $Ke^{-r(T-t)}N(-d_2)-S\,N(-d_1)$ |
| $d_1=?$ | $\frac{\ln(S/K)+(r+\sigma^2/2)(T-t)}{\sigma\sqrt{T-t}}$ |
| Relation entre $d_1$ et $d_2$ ? | $d_2=d_1-\sigma\sqrt{T-t}$ |
| Que représente $N(d_1)$ ? | Le **delta** de l'option |
| Que représente $N(d_2)$ ? | La **probabilité risque-neutre d'exercice** |
| Parité call-put ? | $C-P=S-Ke^{-r(T-t)}$ |
| Densité de $S_T$ sous $Q$ ? | **Log-normale**, de dérive $(r-\sigma^2/2)(T-t)$ |
| Les trois méthodes numériques ? | Différences finies · arbres · **Monte-Carlo** |
| Quand Monte-Carlo s'impose-t-elle ? | Grande dimension, produits **dépendants du chemin** |
