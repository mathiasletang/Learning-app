# Fiche 91 — Smiles de volatilité et surfaces de volatilité

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 19 « Volatility Smiles » |
| **Difficulté** | Must know — ce que les traders font **réellement** avec Black-Scholes |
| **Temps d'étude estimé** | 1 h 15 |
| **Prérequis** | Fiches 83, 87, 89, 90 |
| **Concepts clés** | Volatilité implicite, identité call-put du smile, loi implicite, queues épaisses, smile de change, *skew* action, effet de levier, crashophobie, structure par terme de volatilité, surface de volatilité, delta corrigé du smile, rôle du modèle, smile en présence d'un saut anticipé |
| **Poids à l'examen** | **Pourquoi** le smile est le même pour calls et puts · lire une **surface** par interpolation bilinéaire · relier une **forme de smile** à une **déformation de la loi**. |

## 🎯 Vue d'ensemble

```
CONSTAT     les traders UTILISENT Black-Scholes — mais pas comme ses auteurs l'entendaient :
            ils laissent σ dépendre du STRIKE et de la MATURITÉ
IDENTITÉ    smile(call) = smile(put)  — conséquence directe de la PARITÉ
CHANGE      smile en U      →  loi à DEUX queues épaisses (plus « pointue » au centre)
ACTIONS     skew décroissant →  queue GAUCHE épaisse, queue DROITE mince
CAUSES      change : volatilité non constante + SAUTS
            actions : effet de LEVIER · CRASHOPHOBIE
SURFACE     smile × structure par terme → table (K/S₀ , T) → interpolation bilinéaire
RÔLE        Black-Scholes devient un OUTIL D'INTERPOLATION SOPHISTIQUÉ
```

**Les trois questions du chapitre.** *À quel point les prix de marché sont-ils proches de ceux prédits par Black-Scholes ? Les traders utilisent-ils vraiment le modèle ? Les lois des prix d'actifs sont-elles vraiment log-normales ?* **Réponse :** *les traders **utilisent** le modèle — **mais pas exactement de la façon dont Black, Scholes et Merton l'entendaient**, parce qu'ils laissent **la volatilité utilisée dépendre du prix d'exercice et de la maturité**.*

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

*Un tracé de la **volatilité implicite** d'une option de durée donnée **en fonction de son prix d'exercice** s'appelle un **smile de volatilité**.*

</div>

## 🔴 Concept 1 — Le smile est le même pour les calls et pour les puts

**Le point de départ.** La parité, avec un rendement $q$ :

$$p+S_0e^{-qT}=c+Ke^{-rT}\;\text{(19.1)}$$

> ⚠️ **La propriété qui rend l'argument imparable.** *Une caractéristique clé de la parité est qu'elle repose sur un argument d'absence d'arbitrage **relativement simple**. **Elle n'exige AUCUNE hypothèse sur la loi de probabilité du prix futur** : elle est vraie que la loi soit log-normale ou non.*

<details class="details--riche">
<summary>

**La démonstration en quatre lignes, et sa portée**

</summary>

*Étape 1 — la parité vaut dans le modèle.* Pour une volatilité donnée, $p_{BS}$ et $c_{BS}$ étant les prix Black-Scholes :

$$p_{BS}+S_0e^{-qT}=c_{BS}+Ke^{-rT}$$

*Étape 2 — la parité vaut sur le marché.* En l'absence d'arbitrage, pour les prix de marché $p_{mkt}$ et $c_{mkt}$ :

$$p_{mkt}+S_0e^{-qT}=c_{mkt}+Ke^{-rT}$$

*Étape 3 — soustraire.*

$$\boxed{p_{BS}-p_{mkt}=c_{BS}-c_{mkt}}\;\text{(19.2)}$$

> ***L'erreur de tarification en dollars de Black-Scholes sur un put européen est EXACTEMENT la même que sur le call européen de mêmes strike et maturité.***

*Étape 4 — conclure.* Si la volatilité implicite du put est **22 %**, cela signifie $p_{BS}=p_{mkt}$ à cette volatilité ; par (19.2), $c_{BS}=c_{mkt}$ à la même volatilité. **La volatilité implicite du call est donc aussi 22 %.**

> **La portée du résultat.** *Le smile (relation volatilité-strike à maturité fixée) est **le même** pour calls et puts européens. **La structure par terme** (relation volatilité-maturité à strike fixé) l'est aussi.* **C'est un résultat particulièrement commode : quand on parle d'un smile, on n'a pas à se demander s'il s'agit de calls ou de puts.**

<details><summary>Vérification numérique (exemple 19.1)</summary>

Dollar australien à **0,60**. $r=5\,\%$ (États-Unis), $r_f=10\,\%$ (Australie). Un call européen **1 an**, strike **0,59**, cote **0,0236** — volatilité implicite **14,5 %**.

*Étape 1 — appliquer la parité avec $q=r_f$.*

$$p+0{,}60e^{-0{,}10}=0{,}0236+0{,}59e^{-0{,}05}$$

*Étape 2 — calculer.* $p=0{,}0236+0{,}561225-0{,}542902=\boxed{\mathbf{0{,}0419}}$. *Étape 3 — vérifier.* À ce prix, **la volatilité implicite du put est aussi 14,5 %** — exactement ce que l'analyse prédisait.

</details>

</details>

## 🔴 Concept 2 — Les options de change : un smile en U

**La forme observée.** *La volatilité implicite est **relativement basse à la monnaie** et devient **progressivement plus élevée** à mesure que l'option entre **ou** sort de la monnaie.* C'est un **U** — d'où le nom de « smile ».

**La loi implicite correspondante.** *Elle a des **queues plus épaisses** que la log-normale.* En note : *c'est du **kurtosis** ; en plus d'avoir des queues épaisses, la loi implicite est **plus « pointue »** : **petits ET grands mouvements sont plus probables** qu'avec la log-normale, les mouvements **intermédiaires** moins probables.*

<details class="details--riche">
<summary>

**Pourquoi le smile en U et les queues épaisses sont la même information**

</summary>

**Le raisonnement se fait aux deux extrémités.**

*Extrémité haute.* Un **call très hors la monnaie** de strike élevé $K_2$ ne paie que si le cours dépasse $K_2$. *La probabilité de cela est **plus élevée** pour la loi implicite que pour la log-normale.* On attend donc un **prix relativement élevé**, donc une **volatilité implicite relativement élevée** — **et c'est exactement ce qu'on observe** à droite du smile.

*Extrémité basse.* Un **put très hors la monnaie** de strike bas $K_1$ ne paie que si le cours passe sous $K_1$. *La probabilité est là aussi **plus élevée** pour la loi implicite.* Prix élevé, volatilité implicite élevée — **et c'est ce qu'on observe** à gauche.

> ⚠️ **La règle générale à retenir.** **Là où la loi implicite met PLUS de masse que la log-normale, l'option très hors la monnaie correspondante est CHÈRE — donc la volatilité implicite y est ÉLEVÉE.** Et réciproquement. Toute lecture de smile se fait ainsi, **en raisonnant sur les options les plus hors la monnaie**.

</details>

**La vérification empirique.** *Sur **12 taux de change** et **10 ans** de données quotidiennes : calculer l'écart-type des variations quotidiennes, puis compter combien de fois la variation réelle a dépassé 1, 2, … écarts-types, et comparer à ce que donnerait une loi normale.*

| Dépassement | **Monde réel** | **Modèle log-normal** |
|---|---|---|
| $>1$ écart-type | 25,04 % | **31,73 %** |
| $>2$ | **5,27 %** | 4,55 % |
| $>3$ | **1,34 %** | 0,27 % |
| $>4$ | **0,29 %** | 0,01 % |
| $>5$ | **0,08 %** | 0,00 % |
| $>6$ | **0,03 %** | 0,00 % |

*Les variations dépassent **3 écarts-types 1,34 %** des jours, contre **0,27 %** prédits — cinq fois plus. À 4, 5 et 6 écarts-types, **le modèle log-normal prédit qu'on ne devrait quasiment jamais observer cela**.* *Notez aussi que le **réel dépasse MOINS souvent 1 écart-type** (25,04 contre 31,73) : c'est le **pic central** — la loi est à la fois **plus pointue et à queues plus épaisses**.*

<div class="callout" data-kind="methode">

<span class="callout__lab">Comment on gagnait de l'argent avec cela dans les années 1980.</span>

*Supposez que la plupart des participants croient les taux de change log-normaux : ils utiliseront **la même volatilité** pour toutes les options. Vous venez de faire l'analyse ci-dessus et savez que c'est faux. **Que faire ?**

***Acheter des calls et des puts très hors la monnaie sur une variété de devises, et attendre. Ces options seront relativement bon marché, et PLUS D'ENTRE ELLES finiront dans la monnaie que le modèle log-normal ne le prédit. La valeur actuelle de vos payoffs sera en moyenne bien supérieure au coût des options.***

*Au milieu des années 1980, **quelques traders** connaissaient les queues épaisses du change ; tous les autres jugeaient l'hypothèse log-normale raisonnable. **Les quelques bien informés suivirent cette stratégie — et gagnèrent beaucoup d'argent. À la fin des années 1980, tout le monde avait compris qu'il fallait un smile, et l'occasion disparut.***

</div>

**Les causes.** *Deux conditions pour qu'un prix soit log-normal : **(1)** la volatilité de l'actif est **constante** ; **(2)** le prix change **régulièrement, sans sauts**. **En pratique, aucune des deux n'est satisfaite pour un taux de change** : sa volatilité est loin d'être constante, et **les taux de change présentent fréquemment des sauts** — parfois **en réponse aux actions des banques centrales**. *L'effet des deux est que **les résultats extrêmes deviennent plus probables**.*

⚠️ **Pourquoi le smile s'aplatit quand la maturité augmente.**

| Effet | Sur les **prix** | Sur la **volatilité implicite** |
|---|---|---|
| Volatilité non constante | impact **plus prononcé** avec la maturité | impact **moins prononcé** |
| **Sauts** | impact **moins prononcé** | impact **moins prononcé** |

*Résultat : **le smile devient moins prononcé quand la maturité augmente**.* Note de Hull sur les sauts : *pour des options assez longues, **les sauts se « moyennent »**, si bien que la loi avec sauts devient presque indiscernable de celle sans sauts.*

## 🔴 Concept 3 — Les options sur actions : un *skew*

**La forme observée depuis 1987.** *La volatilité **décroît** quand le strike augmente* — on parle de ***skew*** plutôt que de smile.

$$\boxed{\sigma_{\text{imp}}(\text{strike bas})\ \gg\ \sigma_{\text{imp}}(\text{strike élevé})}$$

*Autrement dit : la volatilité d'un **put très hors la monnaie** ou d'un **call très dans la monnaie** est **significativement plus élevée** que celle d'un **put très dans la monnaie** ou d'un **call très hors la monnaie**.*

**La loi implicite correspondante.** *Elle a une **queue GAUCHE plus épaisse** et une **queue DROITE moins épaisse** que la log-normale.*

<details class="details--riche">
<summary>

**La lecture, aux deux extrémités — et la comparaison avec le change**

</summary>

*Extrémité haute.* Un **call très hors la monnaie** de strike $K_2$ vaut **moins** avec la loi implicite qu'avec la log-normale, *parce qu'il ne paie que si le cours dépasse $K_2$, et que **cette probabilité est plus faible** pour la loi implicite*. Prix bas → **volatilité implicite basse** — c'est bien ce qu'on observe à droite du skew.

*Extrémité basse.* Un **put très hors la monnaie** de strike $K_1$ ne paie que si le cours passe sous $K_1$ ; *cette probabilité est **plus élevée** pour la loi implicite*. Prix élevé → **volatilité implicite élevée** — c'est ce qu'on observe à gauche.

**Le contraste avec le change, en un tableau.**

|  | Queue **gauche** | Queue **droite** | Forme du smile |
|---|---|---|---|
| **Change** | épaisse | **épaisse** | **U** symétrique |
| **Actions** | épaisse | **mince** | ***skew*** décroissant |

**La différence tient entièrement à la queue droite.** Un taux de change peut sauter **dans les deux sens** ; une action, dans l'esprit du marché, **chute** bien plus violemment qu'elle ne monte.

</details>

**Les deux explications.**

| Explication | Mécanisme |
|---|---|
| **Effet de levier** | *Quand la valeur des capitaux propres **baisse**, le **levier de l'entreprise augmente** : les actions deviennent **plus risquées** et leur volatilité **augmente**. Quand elle monte, le levier **diminue**, les actions deviennent **moins risquées**.* → **la volatilité est une fonction décroissante du cours**, exactement le skew observé |
| **Crashophobie** | voir ci-dessous |

> **La crashophobie (Rubinstein).** *Il est intéressant que ce profil **n'existe que depuis le krach d'octobre 1987**. **Avant, les volatilités implicites dépendaient beaucoup moins du strike.** Cela a conduit Mark Rubinstein à suggérer que **les traders sont préoccupés par la possibilité d'un autre krach comme celui d'octobre 1987, et valorisent les options en conséquence**.*
>
> ***Il y a un certain support empirique : les baisses du S&P 500 tendent à s'accompagner d'un RAIDISSEMENT du skew ; quand le S&P monte, le skew tend à s'aplatir.***

## 🟡 Concept 4 — Comment paramétrer le smile

**Le problème.** *La relation dépend du **prix courant** de l'actif. Le point bas du smile de change est habituellement proche du cours courant : **si le cours monte, le smile se déplace vers la droite ; s'il baisse, vers la gauche**.* Idem pour le skew action.

| Abscisse choisie | Motivation |
|---|---|
| $K$ | la définition brute — **instable** |
| $\boxed{K/S_0}$ | *le smile est alors **beaucoup plus stable*** |
| $\boxed{K/F_0}$ | raffinement : *les traders définissent souvent une option « à la monnaie » par $K=F_0$, **pas** $K=S_0$ — **parce que $F_0$, et non $S_0$, est le prix espéré à maturité en monde risque-neutre*** |
| **Le delta** | *permet parfois d'appliquer les smiles à d'autres options que les calls et puts. Une option « à la monnaie » est alors un **call de delta 0,5** ou un **put de delta $-0{,}5$** — les **« options 50-delta »*** |
| $\dfrac{1}{\sqrt T}\ln\dfrac{K}{F_0}$ | *le smile est alors habituellement **beaucoup moins dépendant de la maturité*** |

⚠️ *Recherche de Derman citée en note : cet ajustement est parfois **« collant »** pour les options cotées.*

## 🔴 Concept 5 — Structure par terme et surface de volatilité

**La structure par terme.**

| Situation | Volatilité implicite en fonction de la maturité |
|---|---|
| Volatilités courtes **historiquement basses** | fonction **croissante** — *on anticipe qu'elles **augmenteront*** |
| Volatilités courtes **historiquement hautes** | fonction **décroissante** — *on anticipe qu'elles **diminueront*** |

> **La surface de volatilité** *combine smiles et structure par terme pour **tabuler la volatilité appropriée à n'importe quel strike et n'importe quelle maturité***.

**Une surface pour options de change** (volatilités implicites en %) :

| $K/S_0$ | **0,90** | **0,95** | **1,00** | **1,05** | **1,10** |
|---|---|---|---|---|---|
| **1 mois** | 14,2 | 13,0 | **12,0** | 13,1 | 14,5 |
| **3 mois** | 14,0 | 13,0 | **12,0** | 13,1 | 14,2 |
| **6 mois** | 14,1 | 13,3 | **12,5** | 13,4 | 14,3 |
| **1 an** | 14,7 | 14,0 | **13,5** | 14,0 | 14,8 |
| **2 ans** | 15,0 | 14,4 | **14,0** | 14,5 | 15,1 |
| **5 ans** | 14,8 | 14,6 | **14,4** | 14,7 | 15,0 |

**Comment elle est construite.** *À tout instant, **certaines cases correspondent à des options dont les données de marché sont fiables** : leurs volatilités implicites sont calculées **directement** des prix de marché et entrées dans la table. **Le reste est typiquement déterminé par interpolation.***

⚠️ **Lisez la table en diagonale.** L'écart entre les colonnes extrêmes et la colonne centrale passe de $14{,}5-12{,}0=\mathbf{2{,}5}$ à un mois à $15{,}0-14{,}4=\mathbf{0{,}6}$ à cinq ans : **le smile s'aplatit avec la maturité**, comme le concept 2 le prédisait — *ce qui est observé pour les options de change, et aussi pour la plupart des autres actifs*.

<details class="details--riche">
<summary>

**Exercice résolu — interpoler dans la surface**

</summary>

**Cas 1 — interpolation simple.** Option **9 mois**, $K/S_0=1{,}05$. *Étape 1 — repérer les bornes.* Colonne $1{,}05$ : **13,4** à 6 mois, **14,0** à 1 an. *Étape 2 — interpoler.* 9 mois est **à mi-chemin** entre 6 et 12 mois :

$$\frac{13{,}4+14{,}0}{2}=\boxed{\mathbf{13{,}7\,\%}}$$

*Étape 3 — utiliser.* *C'est la volatilité qu'on entrerait dans la formule de Black-Scholes ou dans un arbre binomial.*

**Cas 2 — interpolation bilinéaire.** Option **1,5 an**, $K/S_0=0{,}925$. *Étape 1 — interpoler d'abord en maturité*, à chaque colonne encadrante (1,5 an est à mi-chemin entre 1 et 2 ans) :

$$K/S_0=0{,}90:\ \frac{14{,}7+15{,}0}{2}=\mathbf{14{,}85}\qquad K/S_0=0{,}95:\ \frac{14{,}0+14{,}4}{2}=\mathbf{14{,}20}$$

*Étape 2 — interpoler ensuite en strike*, 0,925 étant à mi-chemin entre 0,90 et 0,95 :

$$\frac{14{,}85+14{,}20}{2}=\boxed{\mathbf{14{,}525\,\%}}$$

⚠️ **L'ordre des deux interpolations est indifférent** — le résultat bilinéaire est le même. Ce qui compte est de **ne pas oublier la seconde**.

</details>

## 🟠 Concept 6 — Les grecques corrigées du smile, et le rôle du modèle

> **Le problème.** *Le smile **complique** le calcul des grecques.* Supposons que **la relation entre volatilité implicite et $K/S$ reste la même** : quand le prix du sous-jacent change, **la volatilité implicite de l'option change pour refléter sa nouvelle *moneyness***. **Les formules du chapitre 18 ne sont alors plus correctes.**

$$\boxed{\Delta=\frac{\partial c_{BS}}{\partial S}+\frac{\partial c_{BS}}{\partial\sigma_{\text{imp}}}\cdot\frac{\partial\sigma_{\text{imp}}}{\partial S}}$$

<details class="details--riche">
<summary>

**Le signe de la correction pour une option sur action — et une subtilité de cohérence**

</summary>

*Étape 1 — le signe de $\partial\sigma_{\text{imp}}/\partial S$.* Pour une action, **la volatilité est une fonction décroissante de $K/S$** (concept 3). Quand $S$ **augmente**, $K/S$ **diminue**, donc $\sigma_{\text{imp}}$ **augmente** :

$$\frac{\partial\sigma_{\text{imp}}}{\partial S}>0$$

*Étape 2 — le signe du second terme.* $\partial c_{BS}/\partial\sigma_{\text{imp}}$ est le **véga**, toujours **positif**. Le produit est donc **positif**. *Étape 3 — conclure.* ***Le delta est PLUS ÉLEVÉ que celui donné par les hypothèses de Black-Scholes.***

⚠️ **Une inconsistance signalée en note, et elle est instructive.** *Il est intéressant que ce modèle naturel — « la relation volatilité/$(K/S)$ reste la même » — **ne soit intérieurement cohérent que si le smile est PLAT pour toutes les maturités**.* Autrement dit : la règle empirique la plus naturelle est, en toute rigueur, **incompatible avec l'existence même d'un smile**. C'est un rappel utile de ce que ces recettes sont des **approximations de trading**, pas des théorèmes.

**Ce que font les banques.** *Elles cherchent à ce que **leur exposition aux déformations les plus couramment observées de la surface** soit raisonnablement faible. **Une technique pour identifier ces déformations est l'analyse en composantes principales**, discutée au chapitre 21.*

</details>

> **Le rôle du modèle — la question que le chapitre pose sans détour.** *Quelle importance a le modèle de valorisation si les traders sont prêts à utiliser **une volatilité différente pour chaque option** ?*
>
> ***On peut soutenir que le modèle de Black-Scholes-Merton n'est RIEN DE PLUS QU'UN OUTIL D'INTERPOLATION SOPHISTIQUÉ, utilisé par les traders pour s'assurer qu'une option est valorisée de façon cohérente avec les prix de marché des autres options activement traitées.***
>
> *Si les traders abandonnaient Black-Scholes pour un autre modèle plausible, **la surface et la forme du smile changeraient — mais on peut soutenir que les prix en dollars cotés sur le marché ne changeraient pas sensiblement**. Même le delta, calculé comme ci-dessus, **ne change pas beaucoup** quand on change de modèle.*
>
> ⚠️ ***Les modèles ont le plus d'effet sur la valorisation des dérivés quand des dérivés SIMILAIRES ne se traitent PAS activement sur le marché*** — par exemple beaucoup des **exotiques non standard** des chapitres suivants, dont **la valorisation est dépendante du modèle**.

## 🔴 Concept 7 — Le smile quand un saut unique est anticipé

**Le décor.** *Cours **50**. Une annonce importante attendue dans quelques jours devrait **soit augmenter le cours de 8, soit le réduire de 8*** — issue d'une OPA, verdict d'un procès. *La loi du cours dans un mois est alors un **mélange de deux log-normales** : l'une pour la bonne nouvelle, l'autre pour la mauvaise. **La vraie loi est bimodale — certainement pas log-normale.***

*Pour étudier l'effet général, on considère le **cas extrême** où la loi est **binomiale**.*

<details class="details--riche">
<summary>

**Exercice résolu — construire le « frown » de toutes pièces**

</summary>

**Données.** $S_0=50$ ; dans un mois, **58** ou **42**. Taux sans risque **12 %**.

*Étape 1 — les paramètres de l'arbre.*

$$u=\frac{58}{50}=\mathbf{1{,}16}\qquad d=\frac{42}{50}=\mathbf{0{,}84}\qquad a=e^{0{,}12/12}=\mathbf{1{,}0101}$$

$$p=\frac{1{,}0101-0{,}84}{1{,}16-0{,}84}=\frac{0{,}17005}{0{,}32}=\mathbf{0{,}5314}$$

*Étape 2 — valoriser une gamme d'options.* Par exemple pour $K=50$ : payoff haut $=8$, bas $=0$, donc

$$c=e^{-0{,}01}(0{,}5314\times8)=\mathbf{4{,}21}\qquad p=e^{-0{,}01}(0{,}4686\times8)=\mathbf{3{,}71}$$

*Étape 3 — inverser Black-Scholes sur chaque prix.*

| Strike | Call | Put | **Volatilité implicite** |
|---|---|---|---|
| 42 | 8,42 | 0,00 | **0,0 %** |
| 44 | 7,37 | 0,93 | **58,8 %** |
| 46 | 6,31 | 1,86 | **66,6 %** |
| 48 | 5,26 | 2,78 | **69,5 %** |
| **50** | 4,21 | 3,71 | **69,2 %** |
| 52 | 3,16 | 4,64 | **66,1 %** |
| 54 | 2,10 | 5,57 | **60,0 %** |
| 56 | 1,05 | 6,50 | **49,0 %** |
| 58 | 0,00 | 7,42 | **0,0 %** |

*(Les volatilités implicites du put et du call coïncident — concept 1.)*

*Étape 4 — lire la forme.* ***C'est en fait un « frown » (une moue) — l'opposé de ce qu'on observe pour les devises — avec des volatilités qui DÉCLINENT à mesure qu'on s'éloigne de la monnaie dans un sens ou dans l'autre.***

*Étape 5 — la conséquence pratique.* ***La volatilité implicite d'une option de strike 50 SURÉVALUERAIT une option de strike 44 ou 56.***

⚠️ **Pourquoi les strikes 42 et 58 donnent zéro.** À ces strikes, les options sont **exactement à la borne** du support de la loi binomiale : elles n'ont **aucune valeur temps**, donc aucune volatilité positive ne peut reproduire leur prix.

> **La leçon générale.** Une loi **bimodale** (masse concentrée en deux points) produit un smile **inversé**. Une loi à **queues épaisses** produit un smile **en U**. **La forme du smile est une lecture directe de la déformation de la loi implicite** — c'est le message unifiant de tout le chapitre.

</details>

## Comment reconnaître le type d'exercice

| Signal | Ce qu'on demande | Outil |
|---|---|---|
| Un prix de call, on veut le put | **parité** | (19.1), puis **même** volatilité implicite |
| Un smile en **U** | **loi** | queues **épaisses des deux côtés** |
| Un smile **décroissant** | **loi** | queue **gauche épaisse**, **droite mince** |
| Un smile **inversé** (frown) | **loi** | **bimodale** — saut anticipé |
| Une surface et un couple (strike, maturité) | **interpolation** | simple, ou **bilinéaire** |
| « le delta est-il celui de Black-Scholes ? » | **correction** | $+\text{véga}\times\partial\sigma_{\text{imp}}/\partial S$ |
| Des données de dépassements d'écarts-types | **test empirique** | comparer aux fréquences normales |

## Comment résoudre ce type d'exercice

**Protocole lecture d'un smile — 3 étapes.**

1. Se placer sur l'option **la plus hors la monnaie** de chaque côté.
2. Volatilité implicite **élevée** ⟺ option **chère** ⟺ la loi implicite met **plus de masse** dans cette queue que la log-normale.
3. Conclure sur **chaque queue séparément** — c'est la combinaison des deux qui donne la forme.

**Protocole interpolation bilinéaire — 3 étapes.**

1. Identifier les **quatre cases** encadrantes de la surface.
2. Interpoler **en maturité** dans chacune des deux colonnes.
3. Interpoler **en $K/S_0$** entre les deux résultats. *(L'ordre inverse donne la même valeur.)*

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Chercher un smile différent pour les puts | **Identique** — conséquence de la **parité** |
| Croire que la parité suppose la log-normalité | *Elle **n'exige aucune hypothèse** sur la loi* |
| Confondre smile de change et skew action | **U** contre **décroissant** — la différence est la **queue droite** |
| Croire que le réel dépasse toujours plus souvent | *Le réel dépasse **moins** souvent 1 écart-type* (pic central) |
| Croire que le smile s'accentue avec la maturité | Il **s'aplatit** — les sauts se **moyennent** |
| Tracer le smile en fonction de $K$ | Utiliser $K/S_0$ ou $K/F_0$ : **beaucoup plus stable** |
| Définir « à la monnaie » par $K=S_0$ | Les traders prennent souvent $K=F_0$, ou **delta $\pm0{,}5$** |
| Oublier la seconde interpolation | Une case manquante exige un calcul **bilinéaire** |
| Utiliser le delta de Black-Scholes tel quel | Il faut ajouter $\text{véga}\times\partial\sigma_{\text{imp}}/\partial S$ |
| Croire que le choix du modèle change les prix cotés | *Il change la **surface**, pas sensiblement **les prix en dollars*** |
| Croire qu'un saut anticipé donne un smile en U | Il donne un ***frown*** — l'**inverse** |

## 📌 Ultimate Review

**L'identité fondatrice.** $p_{BS}-p_{mkt}=c_{BS}-c_{mkt}$ → **le smile et la structure par terme sont identiques pour calls et puts**.

**Les trois formes et leurs lois.**

| Forme | Loi implicite | Cause | Où |
|---|---|---|---|
| **U** (smile) | deux queues **épaisses**, centre **pointu** | volatilité non constante **+ sauts** | **change** |
| **Décroissante** (skew) | queue gauche **épaisse**, droite **mince** | **levier** · **crashophobie** | **actions**, depuis **1987** |
| **Inversée** (frown) | **bimodale** | **saut unique anticipé** | événement ponctuel |

**La règle de lecture.** *Volatilité implicite élevée sur une option très hors la monnaie ⟺ **la loi implicite met plus de masse dans cette queue** que la log-normale.*

**Les paramétrages.** $K/S_0$ (stable) · $K/F_0$ (« à la monnaie » $=F_0$) · **delta** (options **50-delta**) · $\frac1{\sqrt T}\ln\frac K{F_0}$ (peu dépendant de la maturité).

**La surface.** Smile × structure par terme ; cases fiables **directement du marché**, le reste **interpolé** ; **le smile s'aplatit avec la maturité**.

**Le delta corrigé.** $\Delta=\dfrac{\partial c_{BS}}{\partial S}+\text{véga}\times\dfrac{\partial\sigma_{\text{imp}}}{\partial S}$ ; **plus élevé** que le delta Black-Scholes pour une action.

**Le rôle du modèle.** *Black-Scholes n'est **rien de plus qu'un outil d'interpolation sophistiqué***. **Les modèles comptent vraiment là où des dérivés similaires ne se traitent pas activement.**

**Les chiffres du chapitre.** Exemple 19.1 : $p=\mathbf{0{,}0419}$, volatilité implicite **14,5 %** des deux côtés · dépassements : $>3\sigma$ **1,34 %** contre **0,27 %** · surface : **12,0** à un mois à la monnaie, **14,4** à cinq ans ; interpolations **13,7 %** et **14,525 %** · exemple du saut : $u=1{,}16$, $d=0{,}84$, $p=\mathbf{0{,}5314}$, volatilités de **0 %** aux bornes à **69,5 %** au strike 48.

## 🧠 Active Recall

<details><summary>Pourquoi le smile d'un call européen est-il identique à celui du put de mêmes strike et maturité ?</summary>

Parce que la **parité** vaut **à la fois dans le modèle et sur le marché** :

$$p_{BS}+S_0e^{-qT}=c_{BS}+Ke^{-rT}\qquad p_{mkt}+S_0e^{-qT}=c_{mkt}+Ke^{-rT}$$

En soustrayant : $p_{BS}-p_{mkt}=c_{BS}-c_{mkt}$ — ***l'erreur de tarification en dollars est exactement la même***. Donc la volatilité qui annule l'une annule l'autre.

**Et l'argument est robuste** parce que *la parité repose sur un argument d'absence d'arbitrage simple et **n'exige aucune hypothèse sur la loi de probabilité***.

</details>

<details><summary>À quelle loi correspond un smile en U, et comment le vérifier aux deux extrémités ?</summary>

À une loi à **queues plus épaisses** que la log-normale (et **plus pointue** au centre).

**Extrémité haute** : un call très hors la monnaie de strike $K_2$ ne paie que si $S_T>K_2$ ; cette probabilité est **plus grande** dans la loi implicite → option **chère** → volatilité implicite **élevée** . **Extrémité basse** : un put très hors la monnaie de strike $K_1$ ne paie que si $S_T<K_1$ ; probabilité **plus grande** aussi → volatilité **élevée** . Les deux branches remontent : **U**.

</details>

<details><summary>Que montrent les données sur les variations quotidiennes de change ?</summary>

| Dépassement | Réel | Log-normal |
|---|---|---|
| $>1\sigma$ | **25,04 %** | 31,73 % |
| $>3\sigma$ | **1,34 %** | 0,27 % |
| $>6\sigma$ | **0,03 %** | 0,00 % |

Les mouvements de **3 écarts-types** sont **cinq fois plus fréquents** que prédits, et *le modèle prédit qu'on **ne devrait quasiment jamais** observer 4, 5 ou 6 écarts-types*. Notez aussi que **le réel dépasse MOINS souvent 1 écart-type** : la loi est **pointue au centre et épaisse aux extrémités**.

</details>

<details><summary>Comment gagnait-on de l'argent avec cette information dans les années 1980 ?</summary>

***Acheter des calls et des puts très hors la monnaie sur une variété de devises, et attendre. Ces options sont relativement bon marché, et plus d'entre elles finissent dans la monnaie que le modèle log-normal ne le prédit : la valeur actuelle des payoffs dépasse en moyenne largement le coût des options.***

*Au milieu des années 1980, quelques traders bien informés suivirent cette stratégie **et gagnèrent beaucoup d'argent**. **À la fin des années 1980, tout le monde valorisait avec un smile et l'occasion disparut.***

</details>

<details><summary>Pourquoi les taux de change ne sont-ils pas log-normaux, et pourquoi le smile s'aplatit-il avec la maturité ?</summary>

**Deux conditions** sont requises pour la log-normalité : **volatilité constante** et **absence de sauts**. *En pratique, **aucune des deux** n'est satisfaite : la volatilité d'un taux de change est **loin d'être constante** et les taux **sautent fréquemment** — parfois en réponse aux **banques centrales**.*

**L'aplatissement** : l'impact d'une volatilité non constante sur les **prix** s'accentue avec la maturité mais son impact sur la **volatilité implicite** s'atténue ; l'impact des **sauts** s'atténue sur les deux, car *pour des options assez longues **les sauts se moyennent***.

</details>

<details><summary>En quoi le skew action diffère-t-il du smile de change, et pourquoi ?</summary>

**La différence tient à la queue droite.** Change : queues épaisses **des deux côtés** → **U**. Actions : queue gauche **épaisse**, queue droite **mince** → courbe **décroissante**.

**Deux explications.** **(1) Levier** : *quand les capitaux propres baissent, **le levier augmente**, l'action devient **plus risquée** et sa volatilité **augmente*** — donc $\sigma$ est **décroissante** en $S$. **(2) Crashophobie** : *le profil **n'existe que depuis octobre 1987** ; les traders **craignent un autre krach** et valorisent en conséquence.* Support empirique : *les baisses du S&P **raidissent** le skew, les hausses l'**aplatissent***.

</details>

<details class="details--riche">
<summary>

Pourquoi trace-t-on le smile contre $K/S_0$ plutôt que contre $K$ ?

</summary>

Parce que *le smile **se déplace** avec le cours : si $S_0$ monte, il glisse vers la droite ; s'il baisse, vers la gauche*. En abscisse $K/S_0$, **il est beaucoup plus stable**. Raffinements : $K/F_0$ (*car **$F_0$, et non $S_0$, est le prix espéré à maturité en monde risque-neutre***), le **delta** (options **50-delta**), ou $\frac1{\sqrt T}\ln\frac{K}{F_0}$ qui rend le smile **peu dépendant de la maturité**.

</details>

<details class="details--riche">
<summary>

Dans la surface donnée, quelle volatilité pour une option 9 mois avec $K/S_0=1{,}05$, et pour une 1,5 an avec $K/S_0=0{,}925$ ?

</summary>

**Cas 1 (simple)** : colonne 1,05, entre **13,4** (6 mois) et **14,0** (1 an), 9 mois étant à mi-chemin → $\mathbf{13{,}7\,\%}$.

**Cas 2 (bilinéaire)** : d'abord en maturité, à 1,5 an — colonne 0,90 : $(14{,}7+15{,}0)/2=14{,}85$ ; colonne 0,95 : $(14{,}0+14{,}4)/2=14{,}20$. Puis en strike, 0,925 étant à mi-chemin : $(14{,}85+14{,}20)/2=\mathbf{14{,}525\,\%}$.

</details>

<details><summary>Comment le smile modifie-t-il le delta d'une option sur action ?</summary>

$$\Delta=\frac{\partial c_{BS}}{\partial S}+\underbrace{\frac{\partial c_{BS}}{\partial\sigma_{\text{imp}}}}_{\text{véga}>0}\cdot\frac{\partial\sigma_{\text{imp}}}{\partial S}$$

Pour une action, $\sigma_{\text{imp}}$ **décroît en $K/S$**, donc quand $S$ monte, $K/S$ baisse et $\sigma_{\text{imp}}$ **monte** : $\partial\sigma_{\text{imp}}/\partial S>0$. Le second terme est **positif** : ***le delta est plus élevé que celui de Black-Scholes***.

⚠️ Subtilité de cohérence signalée par Hull : *ce modèle naturel **n'est intérieurement cohérent que si le smile est plat pour toutes les maturités***.

</details>

<details><summary>Quelle est l'importance réelle du modèle de valorisation, selon ce chapitre ?</summary>

***On peut soutenir que Black-Scholes n'est rien de plus qu'un outil d'interpolation sophistiqué, utilisé pour s'assurer qu'une option est valorisée de façon cohérente avec les prix de marché des autres options activement traitées.*** *Changer de modèle plausible **changerait la surface et la forme du smile**, mais **les prix en dollars cotés ne changeraient pas sensiblement** — et même le delta ne changerait pas beaucoup.*

***Les modèles ont le plus d'effet là où des dérivés SIMILAIRES ne se traitent pas activement*** — c'est le cas de nombreux **exotiques non standard**.

</details>

<details><summary>Un saut de ±8 est anticipé sur une action à 50. Quelle forme de smile en résulte ?</summary>

Un ***frown*** — **l'inverse** du smile de change. Avec le cas extrême binomial ($u=1{,}16$, $d=0{,}84$, $p=0{,}5314$), les volatilités implicites valent **0 %** aux strikes 42 et 58, montent à **69,5 %** au strike 48, et redescendent : *les volatilités **déclinent** à mesure qu'on s'éloigne de la monnaie dans un sens ou dans l'autre*.

**Conséquence pratique** : ***la volatilité implicite d'une option de strike 50 surévaluerait une option de strike 44 ou 56.***

**La leçon générale** : une loi **bimodale** donne un smile **inversé**, une loi à **queues épaisses** un smile **en U**. **La forme du smile lit directement la déformation de la loi.**

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Qu'est-ce qu'un smile de volatilité ? | Volatilité implicite **en fonction du strike**, maturité fixée |
| Les traders utilisent-ils Black-Scholes ? | **Oui** — mais avec $\sigma$ **dépendant du strike et de la maturité** |
| Le smile des calls et celui des puts ? | **Identiques** |
| Sur quoi repose cette identité ? | La **parité call-put** |
| L'égalité clé ? | $p_{BS}-p_{mkt}=c_{BS}-c_{mkt}$ |
| La parité suppose-t-elle la log-normalité ? | **Non** — aucune hypothèse sur la loi |
| Forme du smile pour le **change** ? | Un **U** |
| Loi implicite correspondante ? | Queues **épaisses des deux côtés**, centre **pointu** |
| Comment s'appelle cette propriété ? | Le **kurtosis** |
| Fréquence réelle de $>3\sigma$ ? prédite ? | **1,34 %** contre **0,27 %** |
| Fréquence réelle de $>1\sigma$ ? | **25,04 %** — **moins** que les 31,73 % prédits |
| La stratégie gagnante des années 1980 ? | Acheter des options **très hors la monnaie** |
| Les deux conditions de log-normalité ? | Volatilité **constante** · **pas de sauts** |
| Que fait le smile quand la maturité augmente ? | Il **s'aplatit** |
| Pourquoi ? | Les **sauts se moyennent** |
| Forme du smile pour les **actions** ? | **Décroissante** — un ***skew*** |
| Depuis quand ? | Le **krach d'octobre 1987** |
| Loi implicite correspondante ? | Queue **gauche épaisse**, **droite mince** |
| Explication par le levier ? | Cours ↓ → **levier ↑** → volatilité ↑ |
| Qu'est-ce que la crashophobie ? | La crainte d'un **nouveau krach**, intégrée aux prix |
| Qui l'a proposée ? | **Mark Rubinstein** |
| Support empirique ? | Baisse du S&P → skew **plus raide** |
| Pourquoi tracer contre $K/S_0$ ? | Le smile est **beaucoup plus stable** |
| Pourquoi $K/F_0$ ? | $F_0$ est le **prix espéré en monde risque-neutre** |
| Qu'est-ce qu'une option **50-delta** ? | Call de delta **0,5** (ou put de $-0{,}5$) |
| Quelle abscisse rend le smile indépendant de $T$ ? | $\frac1{\sqrt T}\ln(K/F_0)$ |
| Structure par terme si les volatilités courtes sont basses ? | **Croissante** |
| Qu'est-ce qu'une surface de volatilité ? | Smile **×** structure par terme, tabulés |
| Comment remplit-on les cases ? | Marché quand fiable, **interpolation** sinon |
| Volatilité à la monnaie à 1 mois ? à 5 ans ? | **12,0 %** · **14,4 %** |
| Volatilité d'une option 9 mois, $K/S_0=1{,}05$ ? | **13,7 %** |
| Volatilité d'une 1,5 an, $K/S_0=0{,}925$ ? | **14,525 %** |
| Formule du delta corrigé ? | $\frac{\partial c_{BS}}{\partial S}+\text{véga}\times\frac{\partial\sigma_{\text{imp}}}{\partial S}$ |
| Son signe pour une action ? | **Plus élevé** que le delta Black-Scholes |
| Quand ce modèle est-il cohérent ? | Seulement si le smile est **plat** partout |
| Quelle technique identifie les déformations de surface ? | L'**analyse en composantes principales** |
| Que serait Black-Scholes, selon ce chapitre ? | Un **outil d'interpolation sophistiqué** |
| Quand le modèle compte-t-il vraiment ? | Quand des dérivés **similaires ne se traitent pas** |
| Loi si un saut unique est anticipé ? | **Bimodale** — mélange de deux log-normales |
| Forme du smile alors ? | Un ***frown*** — l'**inverse** du U |
| Paramètres de l'exemple binomial ? | $u=1{,}16$, $d=0{,}84$, $p=\mathbf{0{,}5314}$ |
| Volatilité implicite aux strikes 42 et 58 ? | **0 %** |
| Volatilité implicite maximale ? | **69,5 %**, au strike **48** |
| Conséquence pratique ? | Le strike 50 **surévalue** les strikes 44 et 56 |
