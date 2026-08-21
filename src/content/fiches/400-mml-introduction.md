# Fiche 400 — Mathematics for Machine Learning : introduction et carte du livre

|  |  |
|---|---|
| **Matière** | Maths · Apprentissage automatique |
| **Cours source** | Deisenroth, Faisal & Ong, *Mathematics for Machine Learning*, Cambridge University Press — chapitre 1 « Introduction and Motivation » (p. 11-16) |
| **Difficulté** | Fondamental — le plan de vol des onze fiches suivantes |
| **Temps d'étude estimé** | 30 min |
| **Prérequis** | Aucun |
| **Concepts clés** | Données, modèle, apprentissage, prédicteur contre entraînement, les trois vues d'un vecteur, généralisation, lecture *bottom-up* et *top-down*, les quatre piliers de l'apprentissage automatique, les six fondations mathématiques |
| **Poids à l'examen** | Les **trois concepts au cœur** · l'**ambiguïté du mot « algorithme »** · les **quatre piliers** et les **six fondations** · la distinction **mémoriser / GÉNÉRALISER**. |

## 🎯 Vue d'ensemble

```
LA DÉFINITION D'OUVERTURE
  « L'apprentissage automatique consiste à concevoir des algorithmes qui extraient
    AUTOMATIQUEMENT de l'information précieuse à partir de DONNÉES. »
  L'accent est sur AUTOMATIQUE : des méthodologies GÉNÉRALISTES applicables
  à de nombreux jeux de données, produisant quelque chose de SIGNIFIANT

TROIS CONCEPTS AU CŒUR   DONNÉES · MODÈLE · APPRENTISSAGE

LE RÉSUMÉ EN TROIS LIGNES DU LIVRE
  1. on REPRÉSENTE LES DONNÉES COMME DES VECTEURS
  2. on CHOISIT UN MODÈLE, vue PROBABILISTE ou vue OPTIMISATION
  3. on APPREND par OPTIMISATION NUMÉRIQUE, pour que le modèle marche
     sur des données NON UTILISÉES POUR L'ENTRAÎNEMENT

LES SIX FONDATIONS (partie I)          LES QUATRE PILIERS (partie II)
  ch. 2  algèbre linéaire                 ch. 9  RÉGRESSION
  ch. 3  géométrie analytique             ch. 10 RÉDUCTION DE DIMENSION
  ch. 4  décompositions matricielles      ch. 11 ESTIMATION DE DENSITÉ
  ch. 5  calcul vectoriel                 ch. 12 CLASSIFICATION
  ch. 6  probabilités et distributions   (ch. 8 : le pont — données, modèles, apprentissage)
  ch. 7  optimisation continue

DEUX FAÇONS DE LIRE   BOTTOM-UP (des fondations vers l'avancé)
                      TOP-DOWN (des besoins pratiques vers les prérequis)
```

**La phrase de définition, mot pour mot.** *« **L'apprentissage automatique consiste à concevoir des algorithmes qui extraient AUTOMATIQUEMENT de l'information précieuse à partir de données.** L'accent est mis ici sur **« automatique »** : l'apprentissage automatique s'intéresse à des **méthodologies GÉNÉRALISTES applicables à de nombreux jeux de données**, tout en produisant quelque chose de **SIGNIFIANT**. »*

## 🔴 Concept 1 — Les trois concepts au cœur

$$\boxed{\textbf{DONNÉES}\qquad\textbf{MODÈLE}\qquad\textbf{APPRENTISSAGE}}$$

| Concept | Ce que le livre en dit |
|---|---|
| **DONNÉES** | *« L'apprentissage automatique étant **intrinsèquement PILOTÉ PAR LES DONNÉES**, les données sont à son cœur. Le but est de concevoir des méthodologies généralistes pour en extraire des motifs précieux, **IDÉALEMENT SANS BEAUCOUP D'EXPERTISE SPÉCIFIQUE AU DOMAINE**. »* L'exemple : *un grand corpus de documents, dont on extrait automatiquement **les sujets pertinents partagés** entre documents* |
| **MODÈLE** | *« On conçoit des modèles **typiquement RELIÉS AU PROCESSUS QUI GÉNÈRE les données**. Par exemple, en régression, le modèle décrirait **une fonction qui envoie des entrées sur des sorties à valeurs réelles**. »* |
| **APPRENTISSAGE** | *La paraphrase de **Mitchell (1997)** : **« Un modèle est dit APPRENDRE des données si sa PERFORMANCE sur une tâche donnée S'AMÉLIORE après que les données ont été prises en compte. »*** *« Le but est de trouver de bons modèles qui **GÉNÉRALISENT BIEN à des données encore JAMAIS VUES**. »* |

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi les mathématiques.</span>

⚠️ *« Bien que l'apprentissage automatique ait connu de nombreux succès et que les logiciels soient facilement disponibles, **nous croyons que les FONDATIONS MATHÉMATIQUES sont importantes pour comprendre les PRINCIPES FONDAMENTAUX sur lesquels des systèmes plus compliqués sont bâtis**. Les comprendre facilite : **créer de NOUVELLES solutions**, **comprendre et DÉBOGUER les approches existantes**, et **connaître les HYPOTHÈSES et LIMITES INHÉRENTES** aux méthodologies. »*

</div>

## 🔴 Concept 2 — Trouver des mots pour les intuitions

### 2.1 L'ambiguïté du mot « algorithme »

> ⚠️ *« Un défi auquel nous faisons régulièrement face est que **les concepts et les mots sont GLISSANTS**, et qu'un composant particulier d'un système peut être abstrait en **différents concepts mathématiques**. »*

**Le mot « algorithme d'apprentissage automatique » a AU MOINS deux sens :**

| Sens | Ce que c'est | Nom donné |
|---|---|---|
| **1** | *un système qui **fait des PRÉDICTIONS** à partir de données d'entrée* | un **PRÉDICTEUR** |
| **2** | *un système qui **ADAPTE certains paramètres INTERNES du prédicteur** pour qu'il performe bien sur des données futures non vues* | l'**ENTRAÎNEMENT** (*training*) |

> *« Ce livre **ne résoudra PAS** le problème de l'ambiguïté, mais nous voulons souligner d'emblée que, **selon le contexte, les mêmes expressions peuvent signifier des choses différentes**. »*

### 2.2 Les trois vues d'un vecteur

*« Bien que toutes les données ne soient pas numériques, il est souvent utile de les considérer sous forme de nombres. **Dans ce livre, nous supposons que les données ont déjà été converties en une représentation numérique** appropriée. **Nous pensons donc les données COMME DES VECTEURS.** »*

> ⚠️ ***« Comme autre illustration de la subtilité des mots, il y a (AU MOINS) TROIS façons de penser un vecteur : »***

| Vue | Définition | Discipline |
|---|---|---|
| **1** | un vecteur comme **un TABLEAU DE NOMBRES** | *une vue d'**INFORMATICIEN*** |
| **2** | un vecteur comme **une FLÈCHE avec une direction et une magnitude** | *une vue de **PHYSICIEN*** |
| **3** | un vecteur comme **un OBJET QUI OBÉIT À L'ADDITION ET À LA MISE À L'ÉCHELLE** | *une vue de **MATHÉMATICIEN*** |

⚠️ *Une mise en garde pratique du livre : **« Attention à vérifier si les opérations sur les tableaux effectuent réellement des opérations VECTORIELLES quand on implémente sur ordinateur. »***

### 2.3 Modèle et apprentissage, précisés

| Notion | Formulation du livre |
|---|---|
| **Un bon modèle** | *« une **VERSION SIMPLIFIÉE du VRAI processus (INCONNU) de génération des données**, capturant les aspects pertinents. **Un bon modèle peut alors servir à prédire ce qui se passerait dans le monde réel SANS FAIRE D'EXPÉRIENCES RÉELLES.** »* |
| **Entraîner** | *« utiliser les données disponibles pour **OPTIMISER certains paramètres du modèle par rapport à une FONCTION D'UTILITÉ** qui évalue à quel point le modèle prédit bien les données d'entraînement »* |
| **L'analogie** | *« La plupart des méthodes d'entraînement peuvent être vues comme **GRAVIR UNE COLLINE POUR ATTEINDRE SON SOMMET**. Dans cette analogie, **le sommet correspond à un MAXIMUM d'une mesure de performance désirée.** »* |

> ⚠️ **LE PIÈGE CENTRAL, énoncé dès le chapitre 1.**
>
> ***« En pratique, ce qui nous intéresse est que le modèle performe bien sur des données NON VUES. BIEN PERFORMER SUR DES DONNÉES DÉJÀ VUES (les données d'entraînement) PEUT SEULEMENT SIGNIFIER QU'ON A TROUVÉ UN BON MOYEN DE MÉMORISER LES DONNÉES. Cela peut NE PAS bien généraliser. »***

## 🟠 Concept 3 — Les deux façons de lire le livre

| Stratégie | Principe | Avantage | Inconvénient |
|---|---|---|---|
| ***BOTTOM-UP*** | *bâtir les concepts **du fondamental vers l'avancé** — l'approche préférée dans les domaines techniques comme les mathématiques* | *le lecteur peut **à tout moment s'appuyer sur ce qu'il a déjà appris*** | *« pour un praticien, beaucoup de concepts fondamentaux **ne sont pas particulièrement intéressants EN EUX-MÊMES**, et **le manque de motivation fait que la plupart des définitions sont VITE OUBLIÉES** »* |
| ***TOP-DOWN*** | *descendre **des besoins pratiques vers les prérequis de base*** | *le lecteur sait **à tout moment POURQUOI** il travaille sur un concept, et il y a **un chemin CLAIR** de connaissances requises* | *« la connaissance est bâtie sur des **fondations potentiellement BRANLANTES**, et les lecteurs doivent **retenir un ensemble de mots qu'ils n'ont AUCUN MOYEN DE COMPRENDRE** »* |

**Le choix des auteurs.** *« Nous avons décidé d'écrire ce livre **de façon MODULAIRE**, pour séparer les concepts fondamentaux (mathématiques) des applications, **afin qu'il puisse être lu DES DEUX FAÇONS**. »*

| Partie | Contenu | Couplage entre chapitres |
|---|---|---|
| **PARTIE I** | les fondations mathématiques | *les chapitres **s'appuient surtout sur les précédents**, mais **il est possible d'en sauter un et de travailler à rebours**si nécessaire* |
| **PARTIE II** | les quatre piliers | *les chapitres sont **SEULEMENT FAIBLEMENT COUPLÉS et peuvent être lus DANS N'IMPORTE QUEL ORDRE*** |

> *« Bien sûr, il y a **plus de deux façons** de lire ce livre. **La plupart des lecteurs apprennent en COMBINANT les approches**, bâtissant parfois des compétences de base avant d'attaquer des concepts complexes, mais choisissant aussi les sujets **selon les applications**. »*

## 🔴 Concept 4 — La carte : six fondations, quatre piliers

### 4.1 La figure 1.1 en texte

```
                      APPRENTISSAGE AUTOMATIQUE
   ┌──────────┬────────────────┬──────────────┬────────────────┐
   │RÉGRESSION│  RÉDUCTION DE  │ ESTIMATION   │ CLASSIFICATION │   ← LES QUATRE PILIERS
   │  (ch. 9) │   DIMENSION    │ DE DENSITÉ   │    (ch. 12)    │
   │          │    (ch. 10)    │   (ch. 11)   │                │
   └──────────┴────────────────┴──────────────┴────────────────┘
   ═══════════════════════════════════════════════════════════════
      CALCUL VECTORIEL  ·  ALGÈBRE LINÉAIRE                        ← LES SIX FONDATIONS
      PROBABILITÉS ET DISTRIBUTIONS  ·  GÉOMÉTRIE ANALYTIQUE
      OPTIMISATION  ·  DÉCOMPOSITION MATRICIELLE
```

### 4.2 Pourquoi chaque fondation existe

<details class="details--riche">
<summary>

**Les six fondations, chacune justifiée par un besoin**

</summary>

| Chapitre | Le BESOIN qui la motive | Fiche |
|---|---|---|
| **2 — Algèbre linéaire** | *« Nous représentons **les données numériques comme des VECTEURS** et **une TABLE de telles données comme une MATRICE**. L'étude des vecteurs et des matrices s'appelle l'algèbre linéaire. »* | 401 |
| **3 — Géométrie analytique** | *« Étant donné deux vecteurs représentant deux objets du monde réel, **nous voulons énoncer des choses sur leur SIMILARITÉ**. L'idée : **des vecteurs SIMILAIRES doivent produire des sorties SIMILAIRES** dans notre prédicteur. Pour formaliser cela, il faut des opérations prenant deux vecteurs et **renvoyant une valeur numérique représentant leur similarité**. »* | 402 |
| **4 — Décompositions matricielles** | *« Certaines opérations sur les matrices sont **extrêmement utiles** : elles permettent **une interprétation INTUITIVE des données** et **un apprentissage PLUS EFFICACE**. »* | 403 |
| **5 — Calcul vectoriel** | *« Pour entraîner, on trouve typiquement les paramètres qui **maximisent une mesure de performance**. Beaucoup de techniques d'optimisation exigent **le concept de GRADIENT, qui indique LA DIRECTION dans laquelle chercher une solution**. »* | 404 |
| **6 — Probabilités et distributions** | *« On considère souvent les données comme **des observations BRUITÉES d'un vrai signal sous-jacent**. Cela exige **un langage pour QUANTIFIER ce que "bruit" signifie**. On voudrait aussi des prédicteurs **exprimant une forme d'INCERTITUDE**, par exemple **la CONFIANCE qu'on a dans la valeur prédite** en un point de test particulier. »* | 405 |
| **7 — Optimisation continue** | *trouver les **maxima et minima** des fonctions, en utilisant les gradients du chapitre 5* | 406 |

> ⚠️ **Noter l'ordre logique caché :** le chapitre **5** (gradients) est écrit **avant** le chapitre **7** (optimisation) parce que le second **utilise** le premier — mais le chapitre **6** (probabilités) s'intercale entre les deux dans la numérotation.

</details>

### 4.3 Les quatre piliers

<details class="details--riche">
<summary>

**Les cinq chapitres de la partie II, et ce qui les distingue**

</summary>

*« Les chapitres sont **largement ordonnés par DIFFICULTÉ CROISSANTE**. »*

| Chapitre | Objet | Y a-t-il des ÉTIQUETTES ? | Fiche |
|---|---|---|---|
| **8 — Quand les modèles rencontrent les données** | *« **RÉÉNONCER les trois composants (données, modèles, estimation de paramètres) de façon MATHÉMATIQUE.** En outre, **des lignes directrices pour construire des dispositifs expérimentaux qui PRÉMUNISSENT contre des évaluations TROP OPTIMISTES** »* | — | 407 |
| **9 — Régression linéaire** | *« trouver des fonctions envoyant des entrées $\mathbf x\in\mathbb R^D$ sur des valeurs observées $y\in\mathbb R$, qu'on peut interpréter comme **les ÉTIQUETTES de leurs entrées** ». Ajustement classique par **maximum de vraisemblance et maximum a posteriori**, plus **la régression linéaire BAYÉSIENNE, où l'on INTÈGRE les paramètres au lieu de les optimiser*** | **OUI**, à valeurs **RÉELLES** | 408 |
| **10 — Réduction de dimension (ACP)** | *« trouver une représentation **COMPACTE, de plus BASSE dimension**, de données de haute dimension — souvent **plus facile à analyser** que les données originales »* | **NON** — *« contrairement à la régression, **la réduction de dimension ne s'intéresse QU'À MODÉLISER LES DONNÉES** »* | 409 |
| **11 — Estimation de densité (mélanges gaussiens)** | *« trouver **une LOI DE PROBABILITÉ qui décrit un jeu de données** », avec **un schéma ITÉRATIF** pour trouver les paramètres* | **NON** — *mais **on ne cherche PAS non plus une représentation de basse dimension** : on veut **un MODÈLE DE DENSITÉ**"* | 410 |
| **12 — Classification (SVM)** | *comme la régression, on a des entrées $\mathbf x$ et des étiquettes $y$ — ***mais, contrairement à la régression où les étiquettes étaient RÉELLES, ici LES ÉTIQUETTES SONT DES ENTIERS, ce qui exige un soin PARTICULIER*** | **OUI**, à valeurs **ENTIÈRES** | 411 |

> **Le tableau de discrimination à retenir :**
>
> |  | **avec étiquettes** | **sans étiquette** |
> |---|---|---|
> | **sortie réelle** | **RÉGRESSION** (ch. 9) | — |
> | **sortie entière** | **CLASSIFICATION** (ch. 12) | — |
> | **représentation compacte** | — | **RÉDUCTION DE DIMENSION** (ch. 10) |
> | **loi de probabilité** | — | **ESTIMATION DE DENSITÉ** (ch. 11) |

</details>

### 4.4 Exercices et matériel

| Partie | Ce que le livre fournit |
|---|---|
| **Partie I** | *des exercices **faisables essentiellement au STYLO ET PAPIER*** |
| **Partie II** | *des **tutoriels de programmation (notebooks Jupyter)** pour explorer les propriétés des algorithmes* |

*Le livre est **librement téléchargeable** sur **mml-book.com**, où l'on trouve aussi tutoriels, errata et matériel additionnel.*

## Comment reconnaître le type d'exercice

| Question posée | Réponse à mobiliser |
|---|---|
| « Que signifie qu'un modèle apprend ? » | la paraphrase de **Mitchell** : la **performance s'améliore** après prise en compte des données |
| « Le mot algorithme dans quel sens ? » | **prédicteur** ou **entraînement** — préciser lequel |
| « Qu'est-ce qu'un vecteur ? » | **trois** vues : tableau · flèche · **objet obéissant à l'addition et à l'échelle** |
| « Le modèle marche parfaitement sur l'entraînement » | cela peut n'être que de la **MÉMORISATION** |
| Quelle fondation pour la similarité entre données ? | la **géométrie analytique** (ch. 3) |
| Quelle fondation pour le bruit et l'incertitude ? | les **probabilités** (ch. 6) |
| Quelle fondation pour la direction de recherche ? | le **calcul vectoriel** (ch. 5), via le **gradient** |
| Données sans étiquette, on veut une représentation compacte | la **réduction de dimension** (ch. 10) |
| Données sans étiquette, on veut une loi | l'**estimation de densité** (ch. 11) |
| Étiquettes **entières** | la **classification** (ch. 12) |

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Confondre les deux sens d'« algorithme » | **prédicteur** (qui prédit) contre **entraînement** (qui adapte) |
| N'avoir qu'une seule vue du vecteur | il y en a **trois**, et la vue **mathématique** est celle qui compte pour l'algèbre linéaire |
| Croire qu'une opération sur tableau est une opération vectorielle | **vérifier** — l'avertissement explicite du livre |
| Juger un modèle sur les données d'entraînement | cela peut n'être que de la **MÉMORISATION** |
| Croire les chapitres de la partie II séquentiels | ils sont **faiblement couplés**, lisibles **dans n'importe quel ordre** |
| Croire les chapitres de la partie I strictement séquentiels | on peut **en sauter un et travailler à rebours** |
| Croire que la réduction de dimension utilise des étiquettes | **non** — elle ne modélise **que les données** |
| Confondre réduction de dimension et estimation de densité | l'une cherche une **représentation compacte**, l'autre une **LOI** |
| Croire la classification identique à la régression | les étiquettes sont **ENTIÈRES**, ce qui exige un soin particulier |

## 📌 Ultimate Review

| Élément | Contenu |
|---|---|
| **La définition** | concevoir des algorithmes extrayant **automatiquement** de l'information des données |
| **L'accent** | sur **« AUTOMATIQUE »** : des méthodologies **généralistes** |
| **Les trois concepts au cœur** | **DONNÉES · MODÈLE · APPRENTISSAGE** |
| **L'idéal des données** | extraire des motifs **sans beaucoup d'expertise de domaine** |
| **Ce qu'est un modèle** | une **version SIMPLIFIÉE du vrai processus INCONNU** de génération |
| **Son usage** | prédire **sans faire d'expériences réelles** |
| **La définition de Mitchell (1997)** | la **performance s'AMÉLIORE** après prise en compte des données |
| **Le but** | des modèles qui **GÉNÉRALISENT** à des données **jamais vues** |
| **Pourquoi les maths** | **créer** · **déboguer** · connaître les **hypothèses et limites** |
| **Les deux sens d'« algorithme »** | le **PRÉDICTEUR** · l'**ENTRAÎNEMENT** |
| **Les trois vues d'un vecteur** | **tableau** (informatique) · **flèche** (physique) · **objet additif et échelonnable** (maths) |
| **L'avertissement pratique** | vérifier que les opérations sur tableaux sont bien **vectorielles** |
| **Entraîner** | optimiser des paramètres selon une **fonction d'UTILITÉ** |
| **L'analogie** | **gravir une colline vers son sommet** |
| **Le piège** | bien faire sur l'entraînement peut n'être que **MÉMORISER** |
| **Le résumé en trois lignes** | données **= vecteurs** · modèle **probabiliste ou d'optimisation** · apprentissage **par optimisation numérique** |
| **Bottom-up** | du fondamental vers l'avancé ; **définitions vite oubliées** faute de motivation |
| **Top-down** | des besoins vers les prérequis ; **fondations branlantes** |
| **Le choix des auteurs** | une écriture **MODULAIRE**, lisible des **deux** façons |
| **Partie I** | chapitres **s'appuyant** sur les précédents, mais sauts possibles |
| **Partie II** | chapitres **faiblement couplés**, **n'importe quel ordre** |
| **Les six fondations** | algèbre linéaire · géométrie analytique · décompositions · calcul vectoriel · probabilités · optimisation |
| **Les quatre piliers** | **régression · réduction de dimension · estimation de densité · classification** |
| **Le chapitre pont** | le **8**, qui réénonce les trois composants **mathématiquement** |
| **Ce que le ch. 8 apporte en plus** | des garde-fous contre les évaluations **trop optimistes** |
| **Régression (ch. 9)** | étiquettes **RÉELLES** ; MV, MAP, et **bayésienne** (on **intègre** au lieu d'optimiser) |
| **Réduction de dimension (ch. 10)** | **AUCUNE étiquette** ; représentation **compacte** |
| **Estimation de densité (ch. 11)** | aucune étiquette ; une **LOI**, par **mélanges gaussiens** et schéma **itératif** |
| **Classification (ch. 12)** | étiquettes **ENTIÈRES** ; par **SVM** |
| **L'ordre de la partie II** | par **difficulté croissante** |
| **Exercices partie I** | **stylo et papier** |
| **Exercices partie II** | **notebooks Jupyter** |

## 🧠 Active Recall

1. Donner la définition d'ouverture de l'apprentissage automatique. Où est l'accent ?
2. Citer les trois concepts au cœur de l'apprentissage automatique.
3. Quel est l'idéal poursuivi concernant l'expertise de domaine ? Donner l'exemple du livre.
4. À quoi un modèle est-il typiquement relié ?
5. Énoncer la paraphrase de Mitchell (1997).
6. Quel est le but ultime en matière de données futures ?
7. Citer les trois raisons pour lesquelles les fondations mathématiques importent.
8. Quels sont les deux sens du mot « algorithme d'apprentissage » ? Quels noms leur donne-t-on ?
9. Le livre résout-il cette ambiguïté ?
10. Sous quelle forme le livre suppose-t-il les données ?
11. Citer les trois façons de penser un vecteur, et la discipline associée à chacune.
12. Quel avertissement pratique le livre donne-t-il sur les tableaux ?
13. Qu'est-ce qu'un bon modèle ? Quel est son usage ?
14. Que signifie « entraîner » un modèle ? Par rapport à quoi optimise-t-on ?
15. Quelle analogie décrit la plupart des méthodes d'entraînement ?
16. Quel est le piège de bien performer sur les données d'entraînement ?
17. Donner le résumé en trois lignes des concepts couverts par le livre.
18. Décrire la stratégie *bottom-up*, son avantage et son inconvénient.
19. Décrire la stratégie *top-down*, son avantage et son inconvénient.
20. Quel choix d'écriture les auteurs ont-ils fait, et pourquoi ?
21. Comment les chapitres de la partie I sont-ils couplés ? Et ceux de la partie II ?
22. Citer les six fondations mathématiques.
23. Citer les quatre piliers.
24. Quel besoin motive l'algèbre linéaire ?
25. Quel besoin motive la géométrie analytique ? Énoncer l'idée sur la similarité.
26. Quel besoin motive les décompositions matricielles ?
27. Quel besoin motive le calcul vectoriel ? Que dit le gradient ?
28. Quels deux besoins motivent les probabilités ?
29. Quel est le rôle du chapitre 8 ? Qu'apporte-t-il en plus ?
30. Que cherche la régression linéaire ? Quelles trois méthodes d'ajustement ?
31. Qu'est-ce qui distingue la régression bayésienne des deux autres ?
32. Que cherche la réduction de dimension ? Y a-t-il des étiquettes ?
33. Que cherche l'estimation de densité ? En quoi diffère-t-elle de la réduction de dimension ?
34. Que cherche la classification ? Qu'est-ce qui exige un soin particulier ?
35. Dans quel ordre les chapitres de la partie II sont-ils rangés ?
36. Quelle est la nature des exercices dans chaque partie ?

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| La définition de l'apprentissage automatique ? | Concevoir des algorithmes extrayant **automatiquement** de l'information des **données** |
| Où est l'accent ? | Sur **« AUTOMATIQUE »** |
| Ce que cela implique ? | Des méthodologies **GÉNÉRALISTES** applicables à **beaucoup** de jeux de données |
| Les trois concepts au cœur ? | **DONNÉES · MODÈLE · APPRENTISSAGE** |
| L'idéal sur l'expertise ? | **Sans beaucoup d'expertise de domaine** |
| L'exemple donné ? | Trouver les **sujets partagés** dans un grand corpus |
| À quoi un modèle est-il relié ? | Au **processus qui GÉNÈRE** les données |
| Le modèle en régression ? | Une fonction **entrées → sorties RÉELLES** |
| La définition de Mitchell ? | La **performance s'AMÉLIORE** après prise en compte des données |
| Le but ultime ? | **GÉNÉRALISER** à des données **jamais vues** |
| Trois raisons d'apprendre les maths ? | **Créer** · **déboguer** · connaître **hypothèses et limites** |
| Sens 1 d'« algorithme » ? | Un **PRÉDICTEUR** |
| Sens 2 ? | L'**ENTRAÎNEMENT** |
| Le livre résout-il l'ambiguïté ? | **NON** — il la **signale** |
| Sous quelle forme les données ? | Comme des **VECTEURS** |
| Vue 1 du vecteur ? | Un **TABLEAU de nombres** (informatique) |
| Vue 2 ? | Une **FLÈCHE** avec direction et magnitude (physique) |
| Vue 3 ? | Un **objet obéissant à l'ADDITION et à la MISE À L'ÉCHELLE** (maths) |
| L'avertissement pratique ? | Vérifier que les opérations sur tableaux sont **vectorielles** |
| Qu'est-ce qu'un bon modèle ? | Une **version SIMPLIFIÉE du vrai processus INCONNU** |
| Son usage ? | Prédire **sans expérience réelle** |
| Entraîner, c'est ? | **Optimiser des paramètres** selon une **fonction d'UTILITÉ** |
| L'analogie de l'entraînement ? | **Gravir une colline vers son sommet** |
| Que représente le sommet ? | Un **MAXIMUM** de la mesure de performance |
| Le piège du bon score d'entraînement ? | Ce peut n'être que de la **MÉMORISATION** |
| Ligne 1 du résumé ? | Les données sont des **VECTEURS** |
| Ligne 2 ? | Choisir un modèle, vue **probabiliste** ou **optimisation** |
| Ligne 3 ? | Apprendre par **optimisation NUMÉRIQUE** pour les données **non vues** |
| Bottom-up ? | Du **fondamental vers l'avancé** |
| Son avantage ? | On s'appuie **toujours** sur l'acquis |
| Son inconvénient ? | Définitions **vite oubliées** faute de motivation |
| Top-down ? | Des **besoins pratiques** vers les prérequis |
| Son avantage ? | On sait **toujours POURQUOI** |
| Son inconvénient ? | Fondations **branlantes**, mots incompris |
| Le choix des auteurs ? | Une écriture **MODULAIRE** |
| Couplage en partie I ? | Chapitres **s'appuyant** sur les précédents |
| Couplage en partie II ? | **Faible** — n'importe quel ordre |
| Les six fondations ? | Algèbre linéaire · géométrie analytique · décompositions · calcul vectoriel · probabilités · optimisation |
| Les quatre piliers ? | **Régression · réduction de dimension · estimation de densité · classification** |
| Besoin motivant l'algèbre linéaire ? | Données **= vecteurs**, tables **= matrices** |
| Besoin motivant la géométrie analytique ? | Formaliser la **SIMILARITÉ** |
| L'idée sur la similarité ? | Des vecteurs **similaires** → des sorties **similaires** |
| Besoin motivant les décompositions ? | Interprétation **intuitive** et apprentissage **plus efficace** |
| Besoin motivant le calcul vectoriel ? | Le **GRADIENT** |
| Ce que dit le gradient ? | **LA DIRECTION** dans laquelle chercher |
| Les deux besoins motivant les probabilités ? | Quantifier le **BRUIT** · exprimer l'**INCERTITUDE** |
| Rôle du chapitre 8 ? | **Réénoncer** les trois composants **mathématiquement** |
| Son apport supplémentaire ? | Des garde-fous contre les évaluations **trop optimistes** |
| Régression : les entrées et sorties ? | $\mathbf x\in\mathbb R^D$ vers $y\in\mathbb R$ |
| Ses trois méthodes ? | **MV** · **MAP** · **bayésienne** |
| Ce qui distingue la bayésienne ? | On **INTÈGRE** les paramètres au lieu de les **optimiser** |
| Réduction de dimension : le but ? | Une représentation **COMPACTE, de basse dimension** |
| Y a-t-il des étiquettes ? | **NON** |
| Estimation de densité : le but ? | Une **LOI DE PROBABILITÉ** décrivant les données |
| Le modèle employé ? | Les **mélanges GAUSSIENS** |
| Le schéma de résolution ? | **ITÉRATIF** |
| En quoi diffère-t-elle de l'ACP ? | On ne cherche **PAS** une basse dimension |
| Classification : ce qui la distingue ? | Les étiquettes sont des **ENTIERS** |
| Le modèle employé ? | Les **SVM** |
| Ordre des chapitres de la partie II ? | Par **difficulté CROISSANTE** |
| Exercices de la partie I ? | **Stylo et papier** |
| Exercices de la partie II ? | **Notebooks Jupyter** |
| Où trouver le livre ? | **mml-book.com**, librement téléchargeable |
