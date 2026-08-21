# Fiche 81 — Titrisation et crise du crédit de 2007

|  |  |
|---|---|
| **Matière** | Maths · Finance de marché |
| **Cours source** | John C. Hull, *Options, Futures, and Other Derivatives*, 8ᵉ éd., Pearson — chapitre 8 « Securitization and the Credit Crisis of 2007 » |
| **Difficulté** | High — peu de formules, mais une **cascade** à savoir calculer parfaitement |
| **Temps d'étude estimé** | 1 h 15 |
| **Prérequis** | Fiches 74, 75, 80 |
| **Concepts clés** | Titrisation, MBS, ABS, véhicule ad hoc, tranches, cascade, ABS CDO, corrélation de défaut, subprime, taux d'appel, prêt sans recours, option de vente gratuite, coûts d'agence, arbitrage réglementaire, spread TED, Bâle I-II-III |
| **Poids à l'examen** | **Propager une perte** à travers l'ABS puis l'ABS CDO (tableau 8.1) · calculer le **seuil 10,25 %** · expliquer pourquoi une **tranche fine BBB** n'est pas une **obligation BBB**. |

## 🎯 Vue d'ensemble

```
TITRISER   prêts → véhicule ad hoc → TRANCHES vendues aux investisseurs
CASCADE    flux : senior → mezzanine → equity      pertes : equity → mezzanine → senior
ABS        80 % senior AAA · 15 % mezzanine BBB · 5 % equity non noté
ABS CDO    on retitrise les MEZZANINES : 65 % senior AAA · 25 % mezz · 10 % equity
           ⇒ 80 % + 65 % × 15 % ≈ 90 % du portefeuille devient « AAA »
FRAGILITÉ  tout repose sur une CORRÉLATION DE DÉFAUT FAIBLE
           — or elle MONTE en période de stress
```

**Ce que le chapitre fait dans un livre sur les dérivés.** *Les dérivés — forwards, futures, swaps, options — servent à **transférer le risque** d'une entité de l'économie à une autre. Avant de passer aux options, nous considérons une autre façon importante de transférer le risque : la **titrisation**.*

## 🔴 Concept 1 — La titrisation et l'ABS

**L'origine.** *Traditionnellement, les banques finançaient leurs prêts principalement par des dépôts. Dans les années 1960, les banques américaines constatèrent qu'elles ne pouvaient pas suivre la demande de crédits immobiliers avec ce type de financement.* D'où le marché des **titres adossés à des créances hypothécaires** (*mortgage-backed security*, **MBS**) : *des portefeuilles de crédits étaient créés, et les flux qu'ils engendraient étaient **empaquetés en titres** vendus à des investisseurs.*

| Date | Étape |
|---|---|
| **1968** | création de la **GNMA** (*Ginnie Mae*), qui **garantit contre rémunération** les intérêts et le principal des crédits éligibles et **crée les titres** vendus aux investisseurs |
| Années 1980 | les techniques sont étendues aux **crédits automobiles** et aux **encours de cartes de crédit**, puis à l'international |
| Ensuite | *les investisseurs deviennent à l'aise avec des situations où ils **n'ont aucune garantie** contre les défauts* |

> **L'effet de bilan, qui est tout l'intérêt.** *Bien que les banques **originent** les crédits, elles ne les gardent **pas à leur bilan**. La titrisation leur permet d'augmenter leurs prêts **plus vite que ne croissent leurs dépôts**.*

⚠️ **Même garanti, un MBS n'est pas sans risque.** *Les investisseurs font face à l'incertitude sur les **remboursements anticipés**. Ceux-ci sont les plus importants **quand les taux sont bas** et que les possibilités de réinvestissement ne sont **pas particulièrement attractives**. Aux débuts des MBS, beaucoup d'investisseurs réalisèrent des rendements inférieurs à ce qu'ils attendaient parce qu'ils n'en tenaient pas compte.*

### 1.1 La structure d'un ABS

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

Un portefeuille d'actifs générateurs de revenus est **vendu par les banques d'origine** à un **véhicule ad hoc** (*special purpose vehicle*, **SPV**), et les flux sont **alloués à des tranches**.

</div>

**L'exemple de référence** — portefeuille de **100 millions** :

| Tranche | Principal | Rendement promis | Notation typique |
|---|---|---|---|
| **Senior** | **80 M** (80 %) | LIBOR **+ 60 pb** | **AAA** |
| **Mezzanine** | **15 M** (15 %) | LIBOR **+ 250 pb** | **BBB** |
| **Equity** | **5 M** (5 %) | LIBOR **+ 2 000 pb** | **non notée** |

⚠️ **La tranche equity a-t-elle la meilleure affaire ?** *Cela **en a l'air**, mais ce n'est pas nécessairement le cas : les paiements d'intérêt et de principal **ne sont pas garantis**. La tranche equity est **plus susceptible de perdre une partie de son principal**, et **moins susceptible de recevoir** les intérêts promis sur son principal restant, que les autres tranches.* Les 2 000 points de base sont le **prix du risque**, pas un cadeau.

### 1.2 La cascade

<div class="callout" data-kind="formel">

<span class="callout__lab">Définition.</span>

*Les flux sont alloués aux tranches en spécifiant une **cascade** (*waterfall*). Une cascade **séparée** s'applique aux paiements d'intérêts et aux remboursements de principal.*

</div>

|  | Ordre |
|---|---|
| **Remboursements de principal** | senior **jusqu'au remboursement intégral**, puis mezzanine **jusqu'au remboursement intégral**, puis seulement equity |
| **Paiements d'intérêts** | senior **jusqu'à son rendement promis** sur son principal restant, puis mezzanine, puis — s'il reste des flux — equity |

$$\boxed{\text{flux : senior}\to\text{mezzanine}\to\text{equity}}\qquad\qquad\boxed{\text{pertes : equity}\to\text{mezzanine}\to\text{senior}}$$

**Les seuils de l'exemple.**

| Perte sur les actifs | Qui la supporte |
|---|---|
| **0 à 5 %** | la tranche **equity** |
| **5 à 20 %** | l'equity est **anéantie**, la **mezzanine** absorbe le reste |
| **au-delà de 20 %** | la mezzanine est anéantie, la **senior** commence à perdre |

> **Les deux lectures d'un ABS — les retenir toutes les deux.** *L'une par la **cascade** : les flux vont d'abord au senior, puis au mezzanine, puis à l'equity. L'autre par les **pertes** : les pertes de principal sont d'abord supportées par l'equity, puis par le mezzanine, puis par le senior.* **Ce sont deux façons de décrire la même priorité, en sens inverse.**

⚠️ **La description est simplifiée.** *En pratique, on crée **plus de trois tranches**, avec un large éventail de notations. Les règles de cascade sont **plus compliquées** que la simple séquence décrite, et sont détaillées dans un document juridique de **plusieurs centaines de pages**. Autre complication : il y a souvent une **surcollatéralisation**, où (a) le principal total des tranches est **inférieur** au principal des actifs sous-jacents et (b) le rendement moyen pondéré promis aux tranches est **inférieur** au rendement moyen pondéré payable sur les actifs.*

## 🔴 Concept 2 — L'ABS CDO : titriser les tranches

**Le problème commercial qui l'a engendré.** *Trouver des investisseurs pour les tranches senior AAA n'était généralement **pas difficile**, parce qu'elles promettaient des rendements très attractifs comparés à ceux des obligations AAA. Les tranches equity étaient typiquement **conservées par l'originateur** ou vendues à un **hedge fund**. **Trouver des investisseurs pour les tranches mezzanine était plus difficile.*** D'où l'idée : faire un **ABS d'ABS**.

> **Le montage.** *De nombreuses tranches mezzanine différentes sont placées dans un portefeuille, et les risques associés aux flux de ce portefeuille sont tranchés **de la même façon** que ceux des actifs initiaux.* Le résultat s'appelle un **ABS CDO** ou **Mezz ABS CDO**.

| Tranche de l'ABS CDO | Part du principal des mezzanines |
|---|---|
| **Senior** | **65 %** — conçue pour être notée **AAA** |
| **Mezzanine** | **25 %** — typiquement **BBB** |
| **Equity** | **10 %** |

$$\boxed{\text{total AAA}=80\,\%+65\,\%\times15\,\%=80+9{,}75=\mathbf{89{,}75\,\%}\approx90\,\%\ \text{du portefeuille initial}}$$

⚠️ ***Cela semble élevé — mais si la titrisation était poussée plus loin, avec un ABS créé à partir des tranches mezzanine d'ABS CDO (et cela est arrivé), le pourcentage serait poussé encore plus haut.***

<details><summary>**Exercice résolu — propager une perte à travers les deux étages (tableau 8.1)**</summary>

**Le protocole général, en 4 étapes.**

1. Perte $L$ sur les actifs sous-jacents.
2. **Perte de la mezzanine de l'ABS**, en pourcentage de **son** principal : $\dfrac{L-5}{15}$ pour $5\le L\le20$ (0 en dessous, 100 % au-delà).
3. Cette perte devient la **perte du portefeuille sous-jacent à l'ABS CDO**. On la propage : equity de l'ABS CDO $0$–$10\,\%$, mezzanine $10$–$35\,\%$, senior $35$–$100\,\%$.
4. Perte de la **senior de l'ABS CDO** $=\dfrac{(\text{perte mezz ABS})-35}{65}$.

**Application détaillée à $L=17\,\%$** — le cas travaillé par Hull. *Étape 1.* Sur les 17 %, **5 %** sont supportés par l'equity de l'ABS et **12 %** par la mezzanine de l'ABS. *Étape 2.* La mezzanine de l'ABS perd $\dfrac{12}{15}=\mathbf{80\,\%}$ de son principal. *Étape 3.* Les **35 premiers pour cent** de cette perte sont absorbés par l'equity (10 %) et la mezzanine (25 %) de l'ABS CDO — **les deux sont anéanties**. *Étape 4.* La senior de l'ABS CDO perd $\dfrac{80-35}{65}=\dfrac{45}{65}=\mathbf{69{,}2\,\%}$ de sa valeur.

**Le tableau complet.**

| Perte sur les actifs | Perte de la **mezz ABS** | Perte **equity ABS CDO** | Perte **mezz ABS CDO** | Perte **senior ABS CDO** |
|---|---|---|---|---|
| **10 %** | 33,3 % | 100,0 % | 93,3 % | **0,0 %** |
| **13 %** | 53,3 % | 100,0 % | 100,0 % | **28,2 %** |
| **17 %** | 80,0 % | 100,0 % | 100,0 % | **69,2 %** |
| **20 %** | 100,0 % | 100,0 % | 100,0 % | **100,0 %** |

**Le seuil de survie des deux tranches AAA.**

- **AAA de l'ABS** : elle reçoit son dû tant que les pertes sont **inférieures à 20 %**, *car toutes les pertes de principal seraient alors absorbées par les tranches plus juniors*.
- **AAA de l'ABS CDO** : elle survit tant que les pertes sont **inférieures à 10,25 %**. *Une perte de 10,25 % signifie que les mezzanines d'ABS absorbent des pertes égales à **5,25 %** du principal de l'ABS ; comme ces tranches représentent **15 %** du principal, elles perdent $5{,}25/15=\mathbf{35\,\%}$ de leur principal. L'equity et la mezzanine de l'ABS CDO sont alors anéanties, mais la senior **survit tout juste intacte**.*

⚠️ **Le chiffre à retenir : 10,25 %, contre 20 %.** Deux titres également notés **AAA**, dont l'un est anéanti par **deux fois moins** de pertes que l'autre. **La notation n'a pas menti sur une probabilité — elle a caché une géométrie.**

</details>

## 🟠 Concept 3 — Le marché immobilier américain

**Le contexte.** L'indice **S&P/Case-Shiller composite-10** (dix plus grandes aires métropolitaines) montre que *vers l'an **2000**, les prix immobiliers ont commencé à monter **bien plus vite** que durant la décennie précédente*. *Le très bas niveau des taux entre **2002 et 2005** fut un facteur contributif important, mais la bulle fut **largement alimentée par les pratiques de prêt**.*

> **Le subprime.** *La période 2000-2006 est caractérisée par une **énorme augmentation** du crédit hypothécaire **subprime** — des crédits considérés comme **nettement plus risqués que la moyenne**. Avant 2000, la plupart des crédits classés subprime étaient des **secondes hypothèques**. Après 2000, cela change : les institutions financières deviennent à l'aise avec la notion de **première hypothèque subprime**.*

### 3.1 Le relâchement des critères d'octroi — un engrenage

*Le relâchement des critères et la croissance du subprime rendirent l'achat possible pour de nombreuses familles jusque-là jugées **pas assez solvables**. Ces familles augmentèrent la demande, et les prix montèrent.*

| Pour le courtier et le prêteur | Conséquence |
|---|---|
| **Plus de prêts** | **plus de profits** |
| **Prix plus élevés** | le prêt est **bien couvert** par le collatéral — *en cas de défaut, la saisie ne conduirait pas à une perte* |

⚠️ **Et c'est là que l'engrenage se referme.** *Leur problème était qu'à mesure que les prix montaient, il devenait plus difficile pour les primo-accédants de s'offrir une maison. **Pour continuer d'attirer de nouveaux entrants, ils devaient trouver le moyen de relâcher encore davantage leurs critères — et c'est exactement ce qu'ils firent.***

| Relâchement | Contenu |
|---|---|
| **Quotité** | le montant prêté **en pourcentage du prix** augmente |
| **ARM** (*adjustable-rate mortgage*) | un **taux d'appel** (*teaser rate*) bas pendant deux ou trois ans, suivi d'un taux **bien plus élevé**. Taux d'appel typique **≈ 6 %**, taux ultérieur typique **LIBOR 6 mois + 6 %** ; *des taux d'appel aussi bas que **1 % ou 2 %** ont été rapportés* |
| **Instruction des dossiers** | *les prêteurs devinrent plus **cavaliers** : le revenu du demandeur et les autres informations du formulaire n'étaient **fréquemment pas vérifiés*** |

⚠️ **Le pari implicite des ARM.** *Si les prix montaient, les prêteurs s'attendaient à ce que l'emprunteur **rembourse par anticipation** et prenne un nouveau crédit à la fin de la période d'appel. Mais les **pénalités de remboursement anticipé**, souvent nulles sur les crédits prime, étaient **assez élevées** sur les subprimes.* Un « 2/28 » est un ARM **fixe 2 ans puis variable 28 ans**.

### 3.2 Titrisation et destruction de l'incitation à sélectionner

> **La question a changé de nature.** *Le comportement des originateurs était influencé par le fait qu'ils savaient que les crédits seraient titrisés. Devant une nouvelle demande, la question n'était pas « **Est-ce un risque de crédit que nous voulons assumer ?** » mais « **Est-ce un crédit sur lequel nous pouvons gagner de l'argent en le vendant à quelqu'un d'autre ?** »*

*Lors de la titrisation, la **seule** information reçue par les acheteurs des produits était la **quotité** (rapport du prêt à la valeur estimée de la maison) et le **score FICO** de l'emprunteur.* Les autres informations *étaient considérées comme non pertinentes et, comme on l'a dit, souvent même pas vérifiées*.

⚠️ **Et ces deux indicateurs étaient eux-mêmes de qualité douteuse.** *Les experts qui déterminaient la valeur d'une maison **succombaient parfois à la pression des prêteurs** pour produire des valeurs élevées. Les emprunteurs potentiels étaient parfois **conseillés** sur les actions à mener pour **améliorer leur score FICO*** — par exemple faire des paiements réguliers sur une nouvelle carte de crédit pendant quelques mois.

**Et le régulateur ?** *Le gouvernement américain essayait depuis les années 1990 d'**étendre l'accession à la propriété** et faisait pression sur les prêteurs pour augmenter les prêts aux ménages à revenus faibles et modérés. Certains législateurs d'États, comme en **Ohio** et en **Géorgie**, s'inquiétaient et voulaient limiter le **prêt prédateur** — mais les tribunaux décidèrent que **les normes nationales devaient prévaloir**.*

**Le vocabulaire de l'époque.** *« **Liar loans** » — parce que les demandeurs, sachant qu'aucune vérification ne serait faite, choisissaient parfois de **mentir** sur le formulaire. « **NINJA** » — *no income, no job, no assets*.*

### 3.3 L'option de vente gratuite — le cœur du mécanisme

> **Le fait juridique.** *Dans de nombreux États américains, les crédits hypothécaires sont **sans recours** : en cas de défaut, le prêteur peut prendre possession de la maison, mais **les autres actifs de l'emprunteur sont hors d'atteinte**.*

$$\boxed{\text{l'emprunteur détient une option de vente américaine GRATUITE}}$$

*Il peut **à tout moment vendre la maison au prêteur pour le principal restant dû**. Cette caractéristique a encouragé l'activité spéculative et fait partie des causes de la bulle de 2000-2006.*

<details><summary>**Le retournement, et l'exercice optimal de l'option**</summary>

*Étape 1 — le déclencheur.* En **2007**, de nombreux emprunteurs découvrent qu'ils **ne peuvent plus payer** quand les taux d'appel prennent fin. *Étape 2 — la boucle de rétroaction.* Cela conduit à des **saisies** et à un **grand nombre de maisons mises sur le marché**, ce qui **fait baisser les prix**. *Étape 3 — le capital négatif.* Ceux qui avaient emprunté 100 % ou presque du prix découvrent qu'ils ont un ***capital négatif***. *Étape 4 — l'exercice.* *Les participants réalisèrent **tardivement** à quel point l'option de vente gratuite pouvait être coûteuse. Avec un capital négatif, la décision **optimale** était d'**échanger la maison contre le principal restant dû**.* La maison est alors vendue par le prêteur — **ce qui accentue la pression baissière**. La boucle se referme.

⚠️ ***Ce serait une erreur de croire que tous les défaillants étaient dans la même situation.*** *Certains étaient **incapables** de payer et souffrirent beaucoup en devant quitter leur logement. Mais beaucoup étaient des **spéculateurs** ayant acheté plusieurs maisons en locatif et qui choisirent d'exercer leurs options — **ce sont leurs locataires qui souffrirent**.*

**Le cas d'école du voisinage.** *Imaginez deux personnes possédant des maisons identiques, côte à côte. Chacune a un crédit de **250 000 dollars**. Chaque maison vaut **200 000** et, en saisie, se vendrait environ **170 000**. Quelle est la stratégie optimale ?* **Chacun doit exercer son option de vente et acheter la maison du voisin.** *(Il existait des moyens de faire cela sans se retrouver avec une mauvaise notation de crédit.)*

</details>

### 3.4 L'ampleur des pertes

⚠️ **Une baisse de 35 % des prix ne produit pas au plus 35 % de perte — elle en produit bien davantage.** *Les maisons en saisie étaient souvent **en mauvais état** et se vendaient pour **une petite fraction** de leur valeur d'avant-crise. En 2008 et 2009, des pertes moyennes atteignant **75 %** furent rapportées dans certaines régions.*

| Indice | Ce qu'il suit | Fin 2007 | Mi-2009 |
|---|---|---|---|
| **ABX** | tranches d'**ABS** notées à l'origine **BBB** | **−80 %** | **−97 %** |
| **TABX** | tranches d'**ABS CDO** notées à l'origine **AAA** | **−80 %** | *essentiellement **sans valeur*** |

**Les victimes nommées.** *UBS, Merrill Lynch et Citigroup* avaient de grosses positions ; *le géant de l'assurance **AIG*** avait vendu la protection sur des tranches d'ABS CDO **originellement notées AAA**. **2008** : Bear Stearns repris par J. P. Morgan Chase · Merrill Lynch par Bank of America · Goldman Sachs et Morgan Stanley, jusque-là banques d'investissement, deviennent des **holdings bancaires** · **Lehman Brothers est laissée faire faillite**.

**La crise du crédit proprement dite.**

|  | 2006 | 2008 |
|---|---|---|
| Capital des banques | **bien capitalisées** | **fortement érodé** par les pertes |
| Accès au crédit | prêts **relativement faciles** à obtenir | *individus et entreprises **solvables** ont du mal à emprunter* |
| Spreads de crédit | **bas** | **considérablement accrus** |

**Deux thermomètres.** Le **spread LIBOR-OIS** atteint **364 pb** en octobre 2008 (fiche 80). Le **spread TED** — *l'excès du LIBOR 3 mois sur le taux du Trésor 3 mois* — vaut **30 à 50 pb** en conditions normales et dépassa **450 pb** en octobre 2008.

## 🔴 Concept 4 — Qu'est-ce qui a mal tourné ?

> ***« Exubérance irrationnelle »*** — l'expression forgée par **Alan Greenspan**, président de la Réserve fédérale, pour décrire le comportement des investisseurs durant le marché haussier des années 1990. *Elle s'applique aussi à la période précédant la crise. Les prêteurs, les investisseurs dans les tranches, et les vendeurs de protection **supposaient que les bons temps dureraient toujours**. Il pouvait y avoir des baisses dans une ou deux régions, mais **la possibilité d'une baisse généralisée était un scénario que la plupart n'envisageaient pas**.*

**La liste des causes, telle que Hull la dresse.**

| Cause | Contenu |
|---|---|
| **Critères d'octroi laxistes** | des originateurs qui ne portaient plus le risque |
| **Produits de transfert** | conçus pour transférer **profitablement** le risque de crédit aux investisseurs |
| **Agences de notation hors de leur domaine** | *elles passèrent de leur métier traditionnel — noter des **obligations**, où elles avaient une grande expérience — à noter des **produits structurés**, relativement nouveaux et pour lesquels il existait **peu de données historiques*** |
| **Opacité** | *produits complexes ; dans bien des cas, investisseurs **et** agences avaient une information **inexacte ou incomplète** sur la qualité des actifs sous-jacents* |
| **Délégation du jugement** | *les investisseurs croyaient avoir trouvé une **machine à sous** et choisirent de **s'en remettre aux agences** plutôt que de se former leur propre opinion* |
| **L'appât du rendement** | *le rendement des produits notés AAA était **élevé** comparé à celui des obligations AAA* |

### 4.1 La corrélation de défaut — la vulnérabilité mathématique

> **Le point central.** *Les produits structurés dépendent **fortement** de la **corrélation de défaut** entre les actifs sous-jacents — la tendance de différents emprunteurs à faire défaut **à peu près en même temps**.*

| Corrélation | Conséquence |
|---|---|
| **Faible** | les tranches AAA sont **extrêmement peu susceptibles** de subir des pertes |
| Qui **augmente** | elles deviennent **plus vulnérables** |
| Les **ABS CDO** | *dépendent **encore plus lourdement** de la corrélation de défaut* |

⚠️ **Et voici le piège.** *Si les crédits présentent une corrélation de défaut **modérée** — comme en temps normal —, il y a très peu de chances d'un taux de défaut global élevé, et les tranches AAA d'ABS **et** d'ABS CDO sont assez sûres. **Cependant, comme beaucoup d'investisseurs l'apprirent à leurs dépens, les corrélations de défaut ont tendance à AUGMENTER en conditions de marché tendues.** Cela rend possibles des taux de défaut très élevés.*

**La corrélation n'est donc pas un paramètre : c'est un régime.** Elle est faible **précisément** dans les scénarios où l'on n'a pas besoin d'elle, et élevée **exactement** quand tout en dépend.

### 4.2 Une tranche notée BBB n'est pas une obligation BBB

**Les critères des agences, littéralement.**

| Agence | Ce qu'elle égalise entre une tranche et une obligation de même note |
|---|---|
| **S&P et Fitch** | la **probabilité** de subir une perte |
| **Moody's** | la **perte espérée** |

> **Le diagnostic.** *Les procédures des agences étaient donc conçues pour faire coïncider **un seul aspect** des distributions de perte des tranches et des obligations. **Mais les autres aspects de ces distributions étaient susceptibles d'être tout à fait différents.***

⚠️ **L'aggravation par la finesse des tranches.** *Les tranches AAA représentaient souvent environ 80 % du principal, mais il n'était pas rare qu'il y ait **15 à 20 autres tranches**, chacune large de **1 % ou 2 %**. **De telles tranches fines vont soit ne subir aucune perte, soit être totalement anéanties.** La chance pour les investisseurs de récupérer une partie de leur principal — comme le font habituellement les porteurs d'obligations — est **faible**.*

*Exemple : une tranche BBB responsable des pertes entre **5 % et 6 %**. Si les pertes sont **inférieures à 5 %**, la tranche est intacte. Si elles dépassent **6 %**, elle est **anéantie**. Ce n'est **que** dans l'intervalle 5-6 % que les investisseurs récupèrent partiellement.*

> **La conclusion, chiffrée.** *Cette différence rend les tranches d'ABS CDO créées à partir de tranches BBB **bien plus risquées** que des CDO créés de façon similaire à partir d'**obligations** BBB. On peut raisonnablement supposer que les pertes sur un portefeuille d'obligations BBB **ne dépasseront pas 25 %** en conditions tendues. **Le tableau 8.1 montre que des pertes de 100 % sur un portefeuille de tranches BBB peuvent survenir relativement facilement** — et c'est encore plus vrai quand les tranches ne font que 1 % ou 2 %.*

### 4.3 L'arbitrage réglementaire et les coûts d'agence

> **L'arbitrage réglementaire — la question qui la révèle.** *La plupart des crédits étaient originés par des banques, et ce furent des banques les principaux investisseurs dans les tranches créées à partir de ces crédits. **Pourquoi une banque titriserait-elle des crédits puis achèterait-elle les produits titrisés qui en sont issus ?*** **Réponse :** *le capital réglementaire exigé pour les **tranches** était **bien inférieur** à celui exigé pour les **crédits eux-mêmes**.*

> **Les coûts d'agence.** *Terme employé par les économistes pour décrire la situation où les incitations sont telles que **les intérêts de deux parties d'une relation d'affaires ne sont pas parfaitement alignés**. Le processus par lequel les crédits étaient originés, titrisés et vendus était malheureusement **truffé** de coûts d'agence.*

| Acteur | Son incitation réelle |
|---|---|
| **Originateur** | faire des prêts **acceptables pour les créateurs de tranches** — pas des prêts sains |
| **Expert immobilier** | **plaire au prêteur** par une valorisation aussi haute que possible, pour minimiser la quotité — *plaire au prêteur amenait plus d'affaires de sa part* |
| **Créateur de tranches** | maximiser le **volume de tranches AAA**, en *trouvant les moyens d'utiliser les critères publiés des agences* |
| **Agence de notation** | *elle était **payée par les émetteurs** des titres qu'elle notait, et **environ la moitié de ses revenus** venait des produits structurés* |

**La rémunération des salariés — le quatrième coût d'agence.** *Elle se répartit en trois catégories : **salaire régulier**, **bonus de fin d'année**, **actions ou options**. Beaucoup d'employés, à tous les niveaux de séniorité et particulièrement les traders, reçoivent l'essentiel de leur rémunération en **bonus de fin d'année** — une forme centrée sur la **performance de court terme**.*

⚠️ **L'asymétrie, énoncée sans détour.** *Si un employé génère d'énormes profits une année et est responsable de pertes sévères l'année suivante, **il recevra un gros bonus la première année et n'aura pas à le rendre la suivante**. Il peut perdre son emploi — mais **même cela n'est pas un désastre : les institutions financières semblent étonnamment disposées à recruter des individus ayant des pertes à leur CV.***

> **L'expérience de pensée qui conclut le chapitre.** *Imaginez que vous soyez, en 2006, l'employé d'une institution financière responsable d'investir dans des ABS CDO créés à partir de crédits hypothécaires. **Vous auriez presque certainement reconnu qu'il y avait une bulle** sur le marché immobilier américain, et vous vous attendriez à ce qu'elle éclate tôt ou tard. **Il est pourtant possible que vous décidiez de continuer vos investissements : si la bulle n'éclatait pas avant fin 2006, vous auriez tout de même un joli bonus à la fin de 2006.***

## 🟢 Concept 5 — Les suites

**Le comité de Bâle.**

| Accord | Date | Contenu |
|---|---|---|
| **Bâle I** | **1988** | règles de capital pour le **risque de crédit** ; modifiées en **1995** pour la compensation (*netting*) ; nouvelle exigence pour le **risque de marché** publiée en **1996**, appliquée en **1998** |
| **Bâle II** | proposé **1999**, appliqué **2007** | changements significatifs du capital pour le risque de crédit, introduction d'une exigence pour le **risque opérationnel** — *appliqué juste avant la crise* |
| **Bâle III** | proposé **fin 2009** | **augmente le montant et la qualité** du capital exigé, et impose des exigences de **liquidité** |

⚠️ **Pourquoi la liquidité entre dans Bâle III.** *Une des leçons de la crise est que **les faillites d'institutions financières sont fréquemment causées par la liquidité**. Elles choisissent souvent des sources de financement **court terme** ; quand le marché s'inquiète — **à tort ou à raison** — de la santé d'une institution, cette source **se tarit**.* (Voir Northern Rock, fiche 77.)

**L'évolution de la VaR.** *La VaR continuera de figurer en bonne place dans les règles du comité, mais celui-ci est devenu **plus conscient de la nécessité de l'estimer sur des données de périodes tendues** plutôt que de conditions normales. Il a aussi mis davantage l'accent sur les **tests de résistance** — examiner comment la banque se comporterait dans des scénarios futurs adverses.*

**Les autres suites.** Obligation d'utiliser des **chambres de compensation** pour certains dérivés OTC — *aux États-Unis, la **CFTC** décide quelles catégories doivent être compensées et régule les chambres*. **Taxes** : en **décembre 2009**, le Royaume-Uni annonce une **« super-taxe »** sur les bonus supérieurs à **25 000 livres** ; dans son budget de **juin 2010**, une taxe sur les **passifs** des banques, et l'examen d'une proposition du FMI de **« taxe sur les activités financières »**. **Législation américaine de 2010** : elle *limite la capacité des banques assurées au niveau fédéral à négocier des dérivés ou à faire du **trading pour compte propre** — ce qui peut conduire à **filialiser** certaines de ces activités*.

## Comment reconnaître le type d'exercice

| Signal | Ce qu'on demande | Outil |
|---|---|---|
| Un pourcentage de perte + des épaisseurs de tranches | **propager la perte** | pertes **du bas vers le haut** : equity, mezz, senior |
| « à partir de quelle perte la tranche X est-elle touchée ? » | **seuil d'attachement** | somme des épaisseurs **en dessous** d'elle |
| Une structure à **deux étages** | **ABS CDO** | convertir la perte en **% du principal de la mezzanine** avant de repropager |
| « quelle part du portefeuille est AAA ? » | **arithmétique du montage** | $80\,\%+65\,\%\times15\,\%$ |
| « pourquoi une tranche BBB n'est-elle pas une obligation BBB ? » | **finesse et distribution** | tout ou rien, un seul moment égalisé |
| Un spread anormal | **thermomètre de stress** | LIBOR-OIS (10 pb → 364) · TED (30-50 pb → 450) |

## Comment résoudre ce type d'exercice

**Protocole cascade à deux étages — 5 étapes.**

1. Écrire les **points d'attachement** de chaque tranche en pourcentage du portefeuille : equity $[0,a]$, mezzanine $[a,b]$, senior $[b,100]$.
2. Perte $L$ → perte de la tranche $[x,y]$ : $\mathbf{0}$ si $L\le x$ ; $\dfrac{L-x}{y-x}$ si $x<L<y$ ; $\mathbf{100\,\%}$ si $L\ge y$.
3. Pour un **ABS CDO** : la perte **en pourcentage du principal de la mezzanine d'ABS** devient la **perte du portefeuille** du second étage.
4. Repropager avec les points d'attachement du second étage.
5. **Contrôler** avec un cas extrême : perte totale de la mezzanine ($L=b$) doit anéantir **toutes** les tranches de l'ABS CDO.

<details><summary>**Exercice résolu — retrouver le seuil de 10,25 % par le calcul inverse**</summary>

**Question.** À partir de quelle perte $L$ sur les actifs la tranche **senior de l'ABS CDO** commence-t-elle à perdre ?

*Étape 1 — écrire la condition.* Elle est touchée dès que la perte de la mezzanine d'ABS dépasse **35 %** (l'épaisseur cumulée de l'equity 10 % et de la mezzanine 25 % de l'ABS CDO). *Étape 2 — traduire en perte d'actifs.*

$$\frac{L-5}{15}=0{,}35\ \Longrightarrow\ L-5=5{,}25\ \Longrightarrow\ L=\mathbf{10{,}25\,\%}$$

*Étape 3 — vérifier par le récit de Hull.* *Une perte de 10,25 % signifie que les mezzanines d'ABS absorbent **5,25 %** du principal de l'ABS ; comme elles font **15 %** du principal, elles perdent $5{,}25/15=\mathbf{35\,\%}$* . *Étape 4 — comparer aux 20 % de la senior d'ABS.* Le rapport est de **1 à 2** : la senior AAA de l'ABS CDO est anéantie par des pertes **deux fois moindres**. *Étape 5 — conclure.* Deux titres **également notés AAA** peuvent avoir des **points d'attachement effectifs** très différents. **La note résume un moment de la distribution, pas la géométrie du produit.**

</details>

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Croire que la tranche equity « a la meilleure affaire » | Ses 2 000 pb rémunèrent le fait qu'elle absorbe **les 5 premiers pour cent** de pertes |
| Faire circuler les pertes dans le même sens que les flux | **Flux** : senior → equity · **pertes** : equity → senior |
| Oublier de convertir en % du principal de la tranche | La mezzanine perd $\frac{L-5}{15}$, **pas** $L-5$ |
| Croire que la senior d'un ABS CDO est aussi sûre que celle d'un ABS | **10,25 %** contre **20 %** — deux fois moins de marge |
| Assimiler une tranche BBB à une obligation BBB | La tranche est **tout ou rien** ; un seul moment de la distribution est égalisé |
| Croire que la corrélation de défaut est un paramètre stable | Elle **augmente en période de stress** — précisément quand tout en dépend |
| Croire qu'une baisse de 35 % des prix coûte au plus 35 % | Pertes moyennes rapportées jusqu'à **75 %** (maisons dégradées) |
| Croire que tous les défaillants étaient des ménages en détresse | Beaucoup étaient des **spéculateurs** exerçant une option rationnellement |
| Voir la titrisation comme la cause unique | Hull liste **six** causes, dont les **coûts d'agence** et l'**arbitrage réglementaire** |
| Confondre spread TED et spread LIBOR-OIS | TED = LIBOR − **Trésor** · LIBOR-OIS = LIBOR − **OIS** |

## 📌 Ultimate Review

**Les deux cascades.** Flux : **senior → mezzanine → equity**. Pertes : **equity → mezzanine → senior**.

**La formule de propagation.** Pour une tranche d'attachement $[x,y]$ et une perte $L$ :

$$\text{perte de la tranche}=\min\!\left(\max\!\left(\frac{L-x}{y-x},0\right),1\right)$$

**La structure de référence.** ABS : **80 / 15 / 5** (AAA / BBB / non notée) · ABS CDO sur les mezzanines : **65 / 25 / 10** · total AAA $\approx\mathbf{90\,\%}$ · seuils de survie des deux AAA : **20 %** et **10,25 %**.

**Le tableau 8.1.** $L=10\to$ senior CDO **0 %** · $L=13\to$ **28,2 %** · $L=17\to$ **69,2 %** · $L=20\to$ **100 %**.

**Les chiffres de la crise.** Taux d'appel typique **6 %**, puis LIBOR + 6 % · ARM « 2/28 » · pertes en saisie jusqu'à **75 %** · ABX BBB **−80 %** fin 2007, **−97 %** mi-2009 · TABX AAA **essentiellement sans valeur** mi-2009 · sauvetage AIG **85 Md** (fiche 75) · LIBOR-OIS **364 pb**, TED **&gt; 450 pb** en octobre 2008 · super-taxe britannique sur les bonus **&gt; 25 000 £** (déc. 2009).

**Les quatre coûts d'agence.** Originateur · expert immobilier · créateur de tranches · **agence de notation payée par l'émetteur** (la moitié de ses revenus venant du structuré). Plus la **rémunération par bonus annuel**, qui ne se rend pas.

**La vulnérabilité mathématique.** Tout repose sur une **corrélation de défaut faible** — *or elle augmente en conditions tendues*.

## 🧠 Active Recall

<details><summary>Pourquoi les banques américaines ont-elles inventé le MBS dans les années 1960 ?</summary>

Parce qu'elles *ne pouvaient plus suivre la demande de crédits immobiliers* avec un financement par **dépôts**. La titrisation permet d'**augmenter les prêts plus vite que ne croissent les dépôts**, puisque les crédits **sortent du bilan**. La **GNMA** (Ginnie Mae), créée en **1968**, garantissait contre rémunération intérêts et principal et créait les titres.

</details>

<details><summary>Décrire les deux cascades d'un ABS et expliquer pourquoi elles vont en sens inverse.</summary>

**Flux** : les remboursements de principal vont au **senior jusqu'à extinction**, puis au **mezzanine**, puis à l'**equity** ; les intérêts vont au senior jusqu'à son rendement promis, puis au mezzanine, puis à l'equity **s'il reste quelque chose**. **Pertes** : elles frappent l'**equity** d'abord, puis le **mezzanine**, puis le **senior**.

Les deux sens sont **la même priorité** vue de deux côtés : être **servi en premier** en flux, c'est être **touché en dernier** en pertes.

</details>

<details><summary>Une perte de 17 % frappe le portefeuille. Que perd la tranche senior de l'ABS CDO ?</summary>

*Étape 1.* 5 % pour l'equity de l'ABS, **12 %** pour sa mezzanine. *Étape 2.* La mezzanine perd $12/15=\mathbf{80\,\%}$ de **son** principal. *Étape 3.* Les 35 premiers pour cent (equity 10 % + mezzanine 25 % de l'ABS CDO) sont anéantis. *Étape 4.* La senior perd $\dfrac{80-35}{65}=\dfrac{45}{65}=\mathbf{69{,}2\,\%}$.

</details>

<details><summary>Pourquoi la senior d'un ABS CDO survit-elle seulement jusqu'à 10,25 % de pertes, contre 20 % pour la senior de l'ABS ?</summary>

Parce qu'elle est protégée par des tranches dont la protection est **mesurée sur un principal 6,7 fois plus petit**. Elle est touchée dès que la mezzanine d'ABS perd 35 % de son principal, soit

$$\frac{L-5}{15}=0{,}35\ \Longrightarrow\ L=\mathbf{10{,}25\,\%}$$

La senior d'ABS, elle, n'est touchée qu'au-delà de **20 %** — l'épaisseur cumulée equity + mezzanine. **Deux titres AAA, deux fois moins de marge pour l'un.**

</details>

<details><summary>Quelle proportion du portefeuille initial devenait « AAA », et pourquoi Hull dit-il que ce n'était pas la limite ?</summary>

$$80\,\%+65\,\%\times15\,\%=80+9{,}75=\mathbf{89{,}75\,\%}\approx90\,\%$$

*Cela semble élevé — mais si la titrisation était poussée plus loin, avec un ABS créé à partir des tranches mezzanine d'ABS CDO (**et cela est arrivé**), le pourcentage serait poussé encore plus haut.* Chaque étage supplémentaire **recycle** la partie mal notée en une nouvelle majorité AAA.

</details>

<details><summary>Expliquer l'engrenage du relâchement des critères d'octroi.</summary>

Plus de prêts → **plus de profits** pour courtiers et prêteurs ; prix plus élevés → le prêt paraît **bien couvert par le collatéral**, *une saisie ne conduirait pas à une perte*. Mais **la hausse des prix rend la maison inabordable pour les primo-accédants**. *Pour continuer d'attirer de nouveaux entrants, ils devaient relâcher encore les critères — et c'est exactement ce qu'ils firent* : quotités plus élevées, **ARM à taux d'appel** (≈ 6 %, parfois 1-2 %, puis LIBOR + 6 %), et instruction des dossiers de plus en plus **cavalière**, revenus **non vérifiés**.

</details>

<details><summary>En quoi la titrisation a-t-elle changé la question posée par le prêteur ?</summary>

*La question n'était plus « **Est-ce un risque de crédit que nous voulons assumer ?** » mais « **Est-ce un crédit sur lequel nous pouvons gagner de l'argent en le vendant à quelqu'un d'autre ?** »* Et ce qui déterminait la revendabilité, c'était seulement la **quotité** et le **score FICO** — deux indicateurs eux-mêmes manipulables : experts sous **pression des prêteurs** pour surévaluer, emprunteurs **conseillés** pour gonfler leur FICO.

</details>

<details><summary>Qu'est-ce que l'« option de vente gratuite » de l'emprunteur américain, et quel rôle a-t-elle joué ?</summary>

Dans de nombreux États les crédits sont **sans recours** : en cas de défaut le prêteur prend la maison, **les autres actifs de l'emprunteur sont hors d'atteinte**. L'emprunteur détient donc une **option de vente américaine gratuite** : il peut à tout moment **vendre la maison au prêteur au prix du principal restant dû**.

Elle a **encouragé la spéculation** et alimenté la bulle. Puis, en capital négatif, l'exercice devint **la décision optimale** — ce qui remit des maisons sur le marché et **accentua la baisse**, dans une boucle auto-entretenue.

</details>

<details><summary>Pourquoi une tranche BBB de 1 % d'épaisseur n'est-elle pas comparable à une obligation BBB ?</summary>

Parce que **les agences n'égalisaient qu'un seul moment** de la distribution : **S&P et Fitch** la **probabilité** de perte, **Moody's** la **perte espérée** — *les autres aspects des distributions étaient susceptibles d'être tout à fait différents*. Et une tranche fine est **tout ou nul** : *elle va soit ne subir aucune perte, soit être totalement anéantie* ; la récupération partielle habituelle d'un obligataire est **improbable**. Conséquence chiffrée : *les pertes sur un portefeuille d'obligations BBB ne dépassent raisonnablement pas **25 %** en conditions tendues, alors que **100 % de pertes sur un portefeuille de tranches BBB peuvent survenir relativement facilement**.*

</details>

<details><summary>Pourquoi une banque titriserait-elle des crédits pour ensuite racheter les tranches produites ?</summary>

Par **arbitrage réglementaire** : *le capital réglementaire exigé pour les **tranches** créées à partir d'un portefeuille de crédits était **bien inférieur** à celui exigé pour les **crédits eux-mêmes***. Le risque économique restait dans la banque ; seule l'exigence de capital diminuait.

</details>

<details><summary>Énumérer les coûts d'agence identifiés par Hull.</summary>

**Originateur** : faire des prêts **vendables**, pas des prêts sains. **Expert immobilier** : **plaire au prêteur** par une valorisation haute — *cela amenait plus d'affaires*. **Créateur de tranches** : maximiser le **volume d'AAA** en exploitant les critères publiés. **Agence de notation** : **payée par l'émetteur**, avec **la moitié de ses revenus** issue du structuré. **Salariés** : rémunérés par **bonus annuel**, donc sur la **performance de court terme** — *un gros bonus la première année, et pas à rendre la suivante*.

</details>

<details><summary>Pourquoi la corrélation de défaut est-elle le talon d'Achille de ces montages ?</summary>

Parce que la sécurité d'une tranche senior repose entièrement sur l'improbabilité que **beaucoup d'emprunteurs fassent défaut en même temps**. Avec une corrélation **modérée** — celle des temps normaux — *il y a très peu de chances d'un taux de défaut global élevé, et les tranches AAA sont assez sûres*. Mais *les corrélations de défaut ont tendance à **augmenter en conditions tendues***, ce qui rend possibles des taux de défaut très élevés. Les **ABS CDO** en dépendent *encore plus lourdement*. Le paramètre est donc **le plus favorable quand on n'en a pas besoin, et le plus défavorable quand tout en dépend**.

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Pourquoi les banques titrisent-elles ? | Pour **prêter plus vite que ne croissent leurs dépôts** |
| Que fait la titrisation au bilan ? | Elle **sort les prêts** du bilan |
| Création de la GNMA ? | **1968** — garantit intérêts et principal contre rémunération |
| Risque résiduel d'un MBS garanti ? | Le **remboursement anticipé** |
| Quand les remboursements anticipés sont-ils les plus forts ? | Quand les **taux sont bas** |
| Qu'est-ce qu'un SPV ? | Le **véhicule ad hoc** qui rachète le portefeuille |
| Structure typique d'un ABS ? | **80 % senior · 15 % mezzanine · 5 % equity** |
| Notations correspondantes ? | **AAA · BBB · non notée** |
| Rendements promis ? | LIBOR **+60 pb · +250 pb · +2 000 pb** |
| Sens de la cascade des **flux** ? | Senior → mezzanine → **equity** |
| Sens de la cascade des **pertes** ? | Equity → mezzanine → **senior** |
| Y a-t-il une seule cascade ? | **Non** — une pour les **intérêts**, une pour le **principal** |
| Longueur du document juridique ? | **Plusieurs centaines de pages** |
| Qu'est-ce que la surcollatéralisation ? | Principal des tranches **&lt; principal des actifs** |
| Qui achetait les tranches equity ? | L'**originateur** ou un **hedge fund** |
| Quelle tranche était difficile à placer ? | La **mezzanine** — d'où l'ABS CDO |
| Structure d'un ABS CDO ? | **65 % senior · 25 % mezzanine · 10 % equity** |
| Part totale notée AAA ? | $80+65\times15\,\%=\mathbf{89{,}75\,\%}$ |
| Seuil de survie de la senior d'ABS ? | **20 %** de pertes |
| Seuil de survie de la senior d'ABS CDO ? | **10,25 %** de pertes |
| Formule de perte d'une tranche $[x,y]$ ? | $\min(\max(\frac{L-x}{y-x},0),1)$ |
| Perte de la senior d'ABS CDO si $L=13\,\%$ ? | **28,2 %** |
| Si $L=17\,\%$ ? | **69,2 %** |
| Si $L=20\,\%$ ? | **100 %** |
| Qu'est-ce qu'un crédit subprime ? | Un crédit **nettement plus risqué que la moyenne** |
| Qu'est-ce qu'un ARM ? | Crédit à **taux d'appel** bas puis taux bien plus élevé |
| Taux d'appel typique ? taux ultérieur ? | **≈ 6 %** · **LIBOR 6 mois + 6 %** |
| Qu'est-ce qu'un « 2/28 » ? | **Fixe 2 ans**, puis **variable 28 ans** |
| Quelles informations recevaient les acheteurs de tranches ? | **Quotité** et **score FICO**, rien d'autre |
| Fourchette du score FICO ? | **300 à 850** |
| « Liar loan » ? « NINJA » ? | Formulaire **mensonger** · *no income, no job, no assets* |
| Que signifie « sans recours » ? | Le prêteur prend la **maison seulement** |
| Que détient alors l'emprunteur ? | Une **option de vente américaine gratuite** |
| Décision optimale en capital négatif ? | **Exercer** : échanger la maison contre le principal dû |
| Pertes moyennes en saisie rapportées ? | Jusqu'à **75 %** |
| Que suit l'indice ABX ? | Les tranches d'**ABS** notées **BBB** |
| Que suit l'indice TABX ? | Les tranches d'**ABS CDO** notées **AAA** |
| Valeur des tranches ABX BBB mi-2009 ? | **−97 %** |
| Qui vendait la protection sur les ABS CDO AAA ? | **AIG** |
| Qu'est-ce que le spread TED ? | LIBOR 3 mois **− taux du Trésor 3 mois** |
| Sa valeur normale ? son pic ? | **30-50 pb** · **&gt; 450 pb** en octobre 2008 |
| Qui a forgé « exubérance irrationnelle » ? | **Alan Greenspan** |
| De quoi dépendent les produits structurés ? | De la **corrélation de défaut** |
| Que fait cette corrélation en période de stress ? | Elle **augmente** |
| Critère de S&P et Fitch ? | Égaliser la **probabilité** de perte |
| Critère de Moody's ? | Égaliser la **perte espérée** |
| Combien de tranches en pratique ? | Souvent **15 à 20** en plus des AAA, de **1-2 %** d'épaisseur |
| Comportement d'une tranche fine ? | **Tout ou rien** |
| Pertes maximales raisonnables sur des obligations BBB ? | Environ **25 %** |
| Qu'est-ce que l'arbitrage réglementaire ? | Moins de **capital** pour les tranches que pour les crédits |
| Part des revenus des agences venant du structuré ? | Environ **la moitié** |
| Défaut de la rémunération par bonus ? | Il **ne se rend pas** l'année des pertes |
| Bâle I ? II ? III ? | **1988** crédit · **1999-2007** crédit + opérationnel · **fin 2009** capital + **liquidité** |
| Ce que Bâle III ajoute de nouveau ? | Des exigences de **liquidité** |
| Comment la VaR doit-elle être estimée depuis ? | Sur des données de **périodes tendues**, avec **stress tests** |
| Super-taxe britannique de décembre 2009 ? | Sur les bonus supérieurs à **25 000 livres** |
