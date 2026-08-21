# Fiche 407 — Quand les modèles rencontrent les données : risque empirique, MLE, MAP, sélection de modèle

|  |  |
|---|---|
| **Matière** | Maths · Apprentissage automatique |
| **Cours source** | Deisenroth, Faisal & Ong, *Mathematics for Machine Learning*, Cambridge University Press — chapitre 8 « When Models Meet Data » (p. 251-292) |
| **Difficulté** | Intermédiaire — le PONT entre les six fondations et les quatre piliers |
| **Temps d'étude estimé** | 130 min |
| **Prérequis** | Fiche 405 (Bayes, gaussienne, conjugaison) · Fiche 406 (descente de gradient) · Fiche 401 (algèbre linéaire) |
| **Concepts clés** | Donnée tabulaire, exemple, attribut, étiquette, prédicteur comme fonction, prédicteur comme loi de probabilité, trois phases algorithmiques, minimisation du risque empirique, classe d'hypothèses, fonction de perte, risque empirique, risque espéré, surapprentissage, régularisation, régularisateur de Tikhonov, validation croisée à $K$ plis, maximum de vraisemblance, log-vraisemblance négative, maximum a posteriori, sur-ajustement et sous-ajustement, modélisation probabiliste, inférence bayésienne, variables latentes, modèle graphique orienté, notation en plaques, $d$-séparation, sélection de modèle, validation croisée imbriquée, évidence, rasoir d'Occam, facteur de Bayes, paradoxe de Jeffreys-Lindley |
| **Poids à l'examen** | Les **trois phases** (prédiction, entraînement, sélection) · le **risque empirique** $\frac1N\sum\ell(y_n,\hat y_n)$ contre le **risque espéré** $\mathbb E_{x,y}[\ell]$ · la **correspondance perte ↔ vraisemblance** et **régularisation ↔ a priori** · $L(\theta)=-\sum_n\log p(y_n\mid x_n,\theta)$ · la **factorisation** $p(x)=\prod_kp(x_k\mid\text{Pa}_k)$ · l'**évidence** $p(\mathcal D\mid M)=\int p(\mathcal D\mid\theta)p(\theta\mid M)d\theta$ et le **rasoir d'Occam**. |

## 🎯 Vue d'ensemble

```
LE PONT : la partie I (maths) rejoint la partie II (les quatre piliers)

  §8.1 DONNÉES, MODÈLES, APPRENTISSAGE
        DONNÉES tabulaires   N exemples (lignes) × D attributs (colonnes)  →  X ∈ R^(N×D)
        ⚠️ standardiser : moyenne empirique 0, variance empirique 1
        MODÈLE, deux visions :  (a) une FONCTION f : R^D → R
                                (b) une LOI DE PROBABILITÉ (elle exprime l'INCERTITUDE)
        TROIS PHASES   1. PRÉDICTION / inférence   2. ENTRAÎNEMENT   3. SÉLECTION de modèle
  §8.2 MINIMISATION DU RISQUE EMPIRIQUE — la voie NON probabiliste
        4 choix de conception  classe d'hypothèses · perte · régularisation · recherche
        RISQUE EMPIRIQUE   Remp(f,X,y) = (1/N) Σn ℓ(yn, ŷn)
        RISQUE ESPÉRÉ      Rtrue(f) = E_{x,y}[ℓ(y, f(x))]      ← ce qu'on VEUT vraiment
        RÉGULARISATION     min (1/N)‖y − Xθ‖² + λ‖θ‖²          ← contre le SURAPPRENTISSAGE
        VALIDATION CROISÉE à K plis   K−1 morceaux d'entraînement, 1 de validation
  §8.3 ESTIMATION DE PARAMÈTRES — la voie probabiliste
        MLE   L(θ) = −log p(Y|X,θ) = −Σn log p(yn|xn,θ)
              ⚠️ vraisemblance GAUSSIENNE  ⟺  MOINDRES CARRÉS
        MAP   p(θ|x) ∝ p(x|θ) p(θ)          ⚠️ A PRIORI  ⟺  RÉGULARISATION
        AJUSTEMENT   sur-ajustement · sous-ajustement · bon ajustement
  §8.4 MODÉLISATION PROBABILISTE ET INFÉRENCE
        ⚠️ un modèle probabiliste EST la LOI JOINTE p(x,θ) de TOUTES ses variables
        INFÉRENCE BAYÉSIENNE : on garde la loi a posteriori ENTIÈRE, pas un point
        p(x) = ∫ p(x|θ) p(θ) dθ = Eθ[p(x|θ)]
        VARIABLES LATENTES z   p(x|θ) = ∫ p(x|z,θ) p(z) dz     (algorithme EM)
  §8.5 MODÈLES GRAPHIQUES ORIENTÉS (réseaux bayésiens)
        nœuds = variables aléatoires  ·  flèches = probabilités conditionnelles
        p(x) = Π_k p(xk | Pa_k)        Pa_k = les nœuds PARENTS de xk
        PLAQUE = boîte qui répète son contenu N fois  ·  nœud GRISÉ = variable OBSERVÉE
        d-SÉPARATION → lire l'indépendance conditionnelle SUR LE GRAPHE
  §8.6 SÉLECTION DE MODÈLE
        VALIDATION CROISÉE IMBRIQUÉE   boucle interne = choix ; externe = généralisation
        BAYÉSIENNE   p(Mk | D) ∝ p(Mk) p(D | Mk)
        ÉVIDENCE     p(D | Mk) = ∫ p(D | θk) p(θk | Mk) dθk    ← RASOIR D'OCCAM automatique
        FACTEUR DE BAYES   p(D|M1)/p(D|M2)

LES DEUX MONDES, TERME À TERME
  NON PROBABILISTE            PROBABILISTE
  fonction de PERTE      ⟷    VRAISEMBLANCE
  RÉGULARISATION         ⟷    A PRIORI
  min du risque empirique ⟷   max de vraisemblance / MAP
```

> **La question centrale.** *« La question principale de l'apprentissage automatique est : **"Qu'entend-on par de BONS modèles ?"** L'un des principes directeurs est que **de bons modèles doivent bien se comporter sur des données NON VUES**. »*

## 🟠 Concept 1 — Données, modèles, apprentissage (§8.1)

### 1.1 Les données comme vecteurs

**Le format de travail.** Les données sont supposées **TABULAIRES** : chaque **ligne** est un **exemple** (une instance), chaque **colonne** un **attribut**.

| Terme | Synonymes donnés par le livre |
|---|---|
| Un **exemple** $x_n$ | **point de donnée** (*data point*) |
| Un **attribut** | **caractéristique** (*feature*), **covariable** (*covariate*) |
| Une **étiquette** $y_n$ | **cible** (*target*), **variable de réponse**, **annotation** |

**Les notations à fixer :**

$$\boxed{\;N=\text{nombre d'exemples},\quad n=1,\dots,N\qquad D=\text{nombre d'attributs},\quad d=1,\dots,D\;}$$

$$\boxed{\;\text{Jeu de données} : \{(x_1,y_1),\dots,(x_N,y_N)\}\qquad X\in\mathbb R^{N\times D}\;}$$

**L'exemple de la base de données RH.** Le livre part d'une table **non numérique** (nom, genre, diplôme, code postal, âge, salaire) et montre les **choix de conversion** :

- Le **genre** (variable **catégorielle**) peut devenir $\{0,1\}$ **ou** $\{-1,+1\}$.
- *« Il est souvent important d'utiliser la **CONNAISSANCE DU DOMAINE** : savoir que les diplômes universitaires progressent de la licence au master au doctorat, ou réaliser que le code postal n'est pas juste une chaîne de caractères mais **encode une zone de Londres** »* — d'où sa conversion en **latitude et longitude**.
- La colonne **Nom** est **supprimée**, pour deux raisons : *« (1) on ne s'attend pas à ce que l'identifiant soit informatif ; (2) on peut vouloir **ANONYMISER** les données pour protéger la vie privée des employés. »*

> ⚠️ **La règle par défaut.** *« Sans information supplémentaire, on devrait **DÉCALER et METTRE À L'ÉCHELLE toutes les colonnes** du jeu de données de sorte qu'elles aient une **moyenne empirique de 0 et une variance empirique de 1**. »*

> **La chaîne des chapitres.** Représenter les données comme vecteurs $\Rightarrow$ **algèbre linéaire** (ch. 2). Comparer deux vecteurs $\Rightarrow$ **géométrie** (ch. 3). Optimiser le problème résultant $\Rightarrow$ **ch. 7**. Approximation de basse dimension $\Rightarrow$ **ACP** (ch. 10, via ch. 4). Représentation non linéaire de plus haute dimension $\Rightarrow$ **application d'attributs** $\phi(\cdot)$ (§9.2) puis **NOYAU** (§12.4).

### 1.2 Les deux visions du modèle

**Vision A — le PRÉDICTEUR comme FONCTION.**

$$f:\mathbb R^D\to\mathbb R$$

⚠️ Le livre se restreint aux **fonctions LINÉAIRES** :

$$\boxed{\;f(x)=\theta^\top x+\theta_0\;}$$

*« Les fonctions linéaires trouvent un bon équilibre entre la **généralité des problèmes solubles** et la **quantité de mathématiques de fond nécessaire**. »*

**Vision B — le PRÉDICTEUR comme LOI DE PROBABILITÉ.**

> **La motivation.** *« On considère souvent les données comme des **observations BRUITÉES** d'un vrai effet sous-jacent... On aimerait aussi des prédicteurs qui expriment une **sorte d'INCERTITUDE**, par exemple pour quantifier la **CONFIANCE** qu'on a dans la valeur de la prédiction pour un point de test particulier. »*

Le livre se limite aux **lois à paramètres de dimension FINIE**, *« ce qui permet de décrire les modèles probabilistes sans avoir besoin de processus stochastiques ni de mesures aléatoires ».*

### 1.3 Apprendre, c'est trouver des paramètres

> **Les TROIS phases algorithmiques, distinctes :**
>
> 1. **PRÉDICTION** ou **inférence**
> 2. **ENTRAÎNEMENT** ou **estimation de paramètres**
> 3. **RÉGLAGE DES HYPERPARAMÈTRES** ou **sélection de modèle**

| Phase | Ce qui s'y passe |
|---|---|
| **Prédiction** | Les paramètres et le choix de modèle sont **déjà fixés** ; on applique le prédicteur à de nouveaux points. Pour un modèle probabiliste, on parle d'**INFÉRENCE** |
| **Entraînement** | On **ajuste** le modèle sur les données d'entraînement. Deux stratégies : **une estimation ponctuelle** (applicable aux deux types de prédicteurs) ou l'**INFÉRENCE BAYÉSIENNE** ( qui exige un modèle probabiliste) |
| **Sélection** | Choix des **hyperparamètres** et de la structure du modèle |

> ⚠️ **L'avertissement terminologique.** *« Il n'y a **PAS de nommage consensuel** pour les différentes phases algorithmiques. Le mot "**inférence**" est parfois aussi utilisé pour désigner l'**ESTIMATION DE PARAMÈTRES** d'un modèle probabiliste, et plus rarement la **PRÉDICTION** pour des modèles non probabilistes. »*

**Les deux principes correspondants :**

$$\boxed{\;\text{Modèle NON probabiliste}\ \to\ \text{MINIMISATION DU RISQUE EMPIRIQUE (§8.2)}\;}$$

$$\boxed{\;\text{Modèle statistique}\ \to\ \text{MAXIMUM DE VRAISEMBLANCE (§8.3)}\;}$$

> ⚠️ **Le signe moins expliqué.** *« La convention en OPTIMISATION est de **MINIMISER** les objectifs. D'où le **signe MOINS supplémentaire** souvent présent dans les objectifs d'apprentissage automatique. »*

> **L'ABDUCTION.** *« Pour bien se comporter sur des données non vues, il faudra **équilibrer** un bon ajustement aux données d'entraînement et la recherche d'explications "**SIMPLES**" du phénomène. Ce compromis s'obtient par la **RÉGULARISATION** (§8.2.3) ou en ajoutant un **A PRIORI** (§8.3.2). En philosophie, ce n'est considéré ni comme de l'**induction** ni comme de la **déduction**, mais comme de l'**ABDUCTION** — le processus d'inférence vers **la MEILLEURE EXPLICATION**. »*

> ⚠️ **Paramètre contre hyperparamètre.** *« La distinction est **quelque peu ARBITRAIRE**, et surtout guidée par la distinction entre **ce qui peut être NUMÉRIQUEMENT OPTIMISÉ** et **ce qui doit passer par des techniques de RECHERCHE**. »* Autre façon de voir : les **paramètres** sont ceux du modèle probabiliste ; les **hyperparamètres** (paramètres de niveau supérieur) **contrôlent la loi de ces paramètres**.

## 🔴 Concept 2 — Minimisation du risque empirique (§8.2)

> **L'origine.** *« Popularisée à l'origine par la proposition de la **MACHINE À VECTEURS DE SUPPORT** (ch. 12). Mais ses principes généraux sont **largement applicables** et permettent de poser la question de ce qu'est l'apprentissage **SANS construire explicitement de modèles probabilistes**. »*

**Les QUATRE choix de conception :**

| § | Question |
|---|---|
| **8.2.1** | *« Quel est l'**ensemble de FONCTIONS** qu'on autorise pour le prédicteur ? »* |
| **8.2.2** | *« Comment **MESURE-T-ON** la performance du prédicteur sur les données d'entraînement ? »* |
| **8.2.3** | *« Comment construire, **à partir des seules données d'entraînement**, des prédicteurs qui se comportent bien sur des **données de TEST non vues** ? »* |
| **8.2.4** | *« Quelle est la **PROCÉDURE de recherche** dans l'espace des modèles ? »* |

### 2.1 La classe d'hypothèses

On cherche un prédicteur $f(\cdot,\theta):\mathbb R^D\to\mathbb R$ tel que

$$f(x_n,\theta^*)\approx y_n\quad\text{pour tout }n=1,\dots,N$$

en notant $\hat y_n=f(x_n,\theta^*)$.

**Exemple 8.1 — les moindres carrés ordinaires.** L'astuce de notation compacte : **concaténer un attribut unité** $x^{(0)}=1$ à $x_n$, soit $x_n=[1,x_n^{(1)},\dots,x_n^{(D)}]^\top$ et $\theta=[\theta_0,\theta_1,\dots,\theta_D]^\top$ :

$$\boxed{\;f(x_n,\theta)=\theta^\top x_n\quad\Longleftrightarrow\quad f(x_n,\theta)=\theta_0+\sum_{d=1}^{D}\theta_dx_n^{(d)}\;}$$

⚠️ Le prédicteur devient $f:\mathbb R^{D+1}\to\mathbb R$.

> ⚠️ **Le glissement de vocabulaire.** *« Les fonctions **AFFINES** sont souvent appelées **fonctions LINÉAIRES** en apprentissage automatique. »* (Voir la fiche 401 : $\phi(x)=a+\Phi(x)$ n'est linéaire que si $a=0$.)

### 2.2 La fonction de perte et le risque

> **La fonction de perte** $\ell(y_n,\hat y_n)$ prend l'étiquette **vraie** et la **prédiction**, et produit un **nombre NON NÉGATIF** représentant l'erreur commise. *« L'expression "**erreur**" est souvent utilisée pour dire perte. »*

$$\boxed{\;R_{\text{emp}}(f,X,y)=\frac1N\sum_{n=1}^{N}\ell(y_n,\hat y_n)\;}$$

C'est le **RISQUE EMPIRIQUE**, qui dépend de **trois arguments** : le prédicteur $f$ et les données $X$, $y$. Le minimiser est la **MINIMISATION DU RISQUE EMPIRIQUE**.

**Exemple 8.2 — la perte quadratique.** Avec $\ell(y_n,\hat y_n)=(y_n-\hat y_n)^2$ :

$$\min_{\theta\in\mathbb R^D}\frac1N\sum_{n=1}^{N}\big(y_n-f(x_n,\theta)\big)^2\ \overset{f=\theta^\top x_n}{\Longrightarrow}\ \min_{\theta\in\mathbb R^D}\frac1N\sum_{n=1}^{N}\big(y_n-\theta^\top x_n\big)^2$$

$$\boxed{\;\min_{\theta\in\mathbb R^D}\frac1N\lVert y-X\theta\rVert^2\;}$$

C'est le **PROBLÈME DES MOINDRES CARRÉS**, qui a *« une solution analytique en forme fermée, obtenue en résolvant les **ÉQUATIONS NORMALES** »* (§9.2 et fiche 402).

> **Le RISQUE ESPÉRÉ** — ce qu'on veut vraiment :
>
> $$\boxed{\;R_{\text{true}}(f)=\mathbb E_{x,y}\big[\ell\big(y,f(x)\big)\big]\;}$$
>
> *« La notation $R_{\text{true}}$ indique que c'est le **VRAI risque** si l'on avait accès à une **quantité INFINIE de données**. L'espérance porte sur l'ensemble (infini) de toutes les données et étiquettes possibles. »* Autre nom : le **risque de POPULATION**.

**Les deux questions pratiques qui en découlent :** (i) *« Comment changer la procédure d'entraînement pour **BIEN GÉNÉRALISER** ? »* (ii) *« Comment **ESTIMER** le risque espéré à partir de données **FINIES** ? »*

> ⚠️ **Le décalage perte / métrique.** *« En principe, la conception de la fonction de perte devrait correspondre **DIRECTEMENT** à la mesure de performance spécifiée par la tâche. En pratique, il y a **souvent un DÉCALAGE** — dû à la **facilité d'implémentation** ou à l'**efficacité de l'optimisation**. »*

### 2.3 La régularisation

> **L'idée.** *« La régularisation **DÉCOURAGE les solutions COMPLEXES ou EXTRÊMES** d'un problème d'optimisation. »*

$$\boxed{\;\min_\theta\frac1N\lVert y-X\theta\rVert^2+\lambda\lVert\theta\rVert^2\;}$$

| Terme | Nom |
|---|---|
| $\lVert\theta\rVert^2$ | Le **RÉGULARISATEUR** (aussi appelé **terme de PÉNALITÉ**) |
| $\lambda$ | Le **PARAMÈTRE DE RÉGULARISATION** |

> **Le compromis.** *« Le paramètre de régularisation **arbitre** entre minimiser la perte sur l'ensemble d'entraînement et la **MAGNITUDE des paramètres** $\theta$. Il arrive souvent que la magnitude des valeurs des paramètres devienne **relativement GRANDE en cas de SURAPPRENTISSAGE**. »*

> **Les TROIS visages de la même idée** — le livre les relie explicitement :
>
> $$\boxed{\;\text{RÉGULARISATEUR}\ \equiv\ \text{A PRIORI sur les paramètres (§8.3.2)}\ \equiv\ \text{GRANDE MARGE (ch. 12)}\;}$$
>
> Et *« le terme de pénalité **BIAISE le vecteur $\theta$ vers l'ORIGINE** »*.

*L'approche présentée est la **régularisation de TIKHONOV** ; il existe une version contrainte proche, la **régularisation d'IVANOV**. Racine historique : la **résolution de problèmes inverses MAL POSÉS** (Neumaier, 1998).*

### 2.4 La validation croisée

> **Le dilemme.** *« La quantité de données est **LIMITÉE**, et idéalement on utiliserait autant de données que possible pour entraîner. Cela nous obligerait à garder un ensemble de validation **PETIT** — ce qui conduirait alors à une estimation **BRUITÉE (à forte variance)** de la performance prédictive. »*

**La validation croisée à $K$ plis.** *« Elle partitionne les données en $K$ morceaux, dont $K-1$ forment l'ensemble d'entraînement $\mathcal R$, et le dernier sert d'ensemble de validation $\mathcal V$. Elle **itère à travers TOUTES les combinaisons** d'affectations, et la performance des $K$ passages est **MOYENNÉE**. »*

$$\mathcal D=\mathcal R\cup\mathcal V,\qquad\mathcal R\cap\mathcal V=\varnothing$$

$$\boxed{\;\mathbb E_{\mathcal V}\big[R(f,\mathcal V)\big]\approx\frac1K\sum_{k=1}^{K}R\big(f^{(k)},\mathcal V^{(k)}\big)\;}$$

> **Le bon côté du coût.** *« La validation croisée est un problème **EMBARRASSAMMENT PARALLÈLE** : peu d'effort est nécessaire pour le séparer en tâches parallèles. Avec des ressources de calcul suffisantes, elle **ne prend pas plus longtemps qu'une SEULE évaluation de performance**. »*

> ⚠️ **Une remarque de sécurité du livre.** *« Même connaître **seulement la performance** du prédicteur sur l'ensemble de test **FAIT FUITER de l'information** »* (Blum & Hardt, 2015).

> ⚠️ **Le « sans probabilité » est une erreur.** *« Penser à la minimisation du risque empirique comme "**exempte de probabilité**" est **INCORRECT**. Il y a une loi de probabilité inconnue sous-jacente $p(x,y)$ qui gouverne la génération des données. Mais l'approche est **AGNOSTIQUE** quant à ce choix de loi — en contraste avec les approches statistiques standard qui exigent **explicitement** la connaissance de $p(x,y)$. Comme la loi est jointe sur $x$ **et** $y$, les étiquettes peuvent être **NON DÉTERMINISTES** : on n'a **PAS besoin de spécifier la loi du BRUIT** sur les étiquettes. »*

## 🔴 Concept 3 — Estimation de paramètres : MLE et MAP (§8.3)

> **La correspondance annoncée.** *« La **VRAISEMBLANCE** (§8.3.1) est **analogue** au concept de **FONCTION DE PERTE** (§8.2.2). Le concept d'**A PRIORI** (§8.3.2) est **analogue** au concept de **RÉGULARISATION** (§8.2.3). »*

### 3.1 Le maximum de vraisemblance

$$\boxed{\;\mathcal L_x(\theta)=-\log p(x\mid\theta)\;}$$

C'est la **LOG-VRAISEMBLANCE NÉGATIVE**. *« La notation $\mathcal L_x(\theta)$ souligne que **le paramètre $\theta$ VARIE et que la donnée $x$ est FIXÉE**. »*

**Les deux lectures, complémentaires :**

| Vue | Ce que dit $p(x\mid\theta)$ |
|---|---|
| **$\theta$ fixé** | *« Une loi qui modélise l'**INCERTITUDE DES DONNÉES** pour un réglage donné du paramètre. »* |
| **$x$ fixé (observé), $\theta$ varie** | *« Elle nous dit **à quel point un réglage particulier de $\theta$ est PROBABLE** pour les observations $x$. »* |

> ⚠️ **Le piège d'interprétation, signalé mot pour mot.** *« Bien qu'il soit tentant d'interpréter le fait que $\theta$ soit à droite du conditionnement dans $p(y_n\mid x_n,\theta)$ — et donc qu'il faudrait l'interpréter comme **observé et fixé** —, **cette interprétation est INCORRECTE**. La log-vraisemblance négative $L(\theta)$ est une **FONCTION DE $\theta$**. »*

**Exemple 8.4 — la vraisemblance gaussienne.** *« On suppose qu'on peut expliquer notre incertitude d'observation par un **BRUIT GAUSSIEN INDÉPENDANT de moyenne nulle**, $\varepsilon_n\sim\mathcal N(0,\sigma^2)$, et que le modèle linéaire $x_n^\top\theta$ sert à la prédiction »* :

$$p(y_n\mid x_n,\theta)=\mathcal N\big(y_n\mid x_n^\top\theta,\ \sigma^2\big)$$

**L'hypothèse i.i.d.** *« Le mot **INDÉPENDANT** implique que la vraisemblance sur tout le jeu de données **SE FACTORISE** en un produit des vraisemblances individuelles »* :

$$p(\mathcal Y\mid\mathcal X,\theta)=\prod_{n=1}^{N}p(y_n\mid x_n,\theta)$$

*« **IDENTIQUEMENT DISTRIBUÉES** signifie que chaque terme du produit est de **la MÊME loi** et que **tous PARTAGENT les mêmes paramètres**. »*

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi le logarithme.</span>

*« Il est souvent plus facile, du point de vue de l'optimisation, de calculer des fonctions **DÉCOMPOSABLES EN SOMMES** de fonctions plus simples. »*

</div>

$$\boxed{\;L(\theta)=-\log p(\mathcal Y\mid\mathcal X,\theta)=-\sum_{n=1}^{N}\log p(y_n\mid x_n,\theta)\;}$$

> ⚠️ **L'origine du signe moins.** *« Un **ARTEFACT HISTORIQUE** : par convention on veut **MAXIMISER** la vraisemblance, mais la littérature d'optimisation numérique tend à étudier la **MINIMISATION** de fonctions. »*

**Exemple 8.5 — LE RÉSULTAT CENTRAL DU CHAPITRE.** En développant la vraisemblance gaussienne :

$$L(\theta)=-\sum_{n=1}^{N}\log\frac{1}{\sqrt{2\pi\sigma^2}}\exp\left(-\frac{(y_n-x_n^\top\theta)^2}{2\sigma^2}\right)$$

$$\boxed{\;L(\theta)=\underbrace{\frac{1}{2\sigma^2}\sum_{n=1}^{N}(y_n-x_n^\top\theta)^2}_{\text{le problème des MOINDRES CARRÉS}}\ \underbrace{-\ \sum_{n=1}^{N}\log\frac{1}{\sqrt{2\pi\sigma^2}}}_{\text{CONSTANTE si }\sigma\text{ est donné}}\;}$$

> **LA CORRESPONDANCE À RETENIR.**
>
> $$\boxed{\;\text{VRAISEMBLANCE GAUSSIENNE}\ \Longleftrightarrow\ \text{MOINDRES CARRÉS}\;}$$
>
> *« Comme $\sigma$ est donné, le second terme est **CONSTANT**, et minimiser $L(\theta)$ **revient à résoudre le problème des moindres carrés** exprimé dans le premier terme »* — exactement l'équation (8.8) de l'exemple 8.2.

<details><summary>Le détail de la dérivation</summary>

$-\log\prod_n\frac{1}{\sqrt{2\pi\sigma^2}}e^{-(y_n-x_n^\top\theta)^2/(2\sigma^2)}$

$=-\sum_n\left[\log\frac{1}{\sqrt{2\pi\sigma^2}}-\frac{(y_n-x_n^\top\theta)^2}{2\sigma^2}\right]$ (car $\log(ab)=\log a+\log b$)

$=\frac{1}{2\sigma^2}\sum_n(y_n-x_n^\top\theta)^2-N\log\frac{1}{\sqrt{2\pi\sigma^2}}$

⚠️ Le facteur $\frac{1}{2\sigma^2}$ est une **constante positive** : il ne change pas l'argmin. La minimisation de $L(\theta)$ et celle de $\sum_n(y_n-x_n^\top\theta)^2$ ont **exactement la même solution**.

</details>

⚠️ *« Pour d'autres fonctions de vraisemblance — si l'on modélise le bruit par des lois **NON gaussiennes** — l'estimation du maximum de vraisemblance peut **ne pas avoir de solution analytique fermée**. On recourt alors aux **méthodes numériques du chapitre 7**. »*

**Les deux propriétés asymptotiques de $\theta_{\text{ML}}$** (Lehmann & Casella 1998 ; Efron & Hastie 2016) :

1. **CONSISTANCE ASYMPTOTIQUE** : *« l'estimateur converge vers la **vraie valeur** à la limite d'une infinité d'observations, plus une erreur aléatoire **approximativement normale** »*. *« La taille d'échantillon nécessaire peut être **assez GRANDE**. »*
2. La **variance de l'erreur décroît en $1/N$**. *« Surtout dans le régime des "**PETITES**" données, le maximum de vraisemblance peut mener au **SURAPPRENTISSAGE**. »*

### 3.2 Le maximum a posteriori

$$p(\theta\mid x)=\frac{p(x\mid\theta)p(\theta)}{p(x)}\quad\Longrightarrow\quad\boxed{\;p(\theta\mid x)\propto p(x\mid\theta)\,p(\theta)\;}$$

⚠️ *« Comme $p(x)$ **ne dépend pas de $\theta$**, on peut ignorer la valeur du dénominateur pour l'optimisation. »* On minimise alors la **log-a-posteriori NÉGATIVE** : c'est l'**ESTIMATION DU MAXIMUM A POSTERIORI (MAP)**.

**Exemple 8.6 — l'a priori gaussien.** En plus de la vraisemblance gaussienne, *« on suppose que le vecteur de paramètres est distribué comme une gaussienne multivariée de moyenne nulle, $p(\theta)=\mathcal N(0,\Sigma)$. Le **conjugué d'une gaussienne étant une gaussienne** (§6.6.1), on **s'attend donc à ce que l'a posteriori soit aussi une gaussienne**. »*

> **L'effet de l'a priori, vu sur la figure 8.6.** *« L'a priori **BIAISE la PENTE à être MOINS RAIDE** et l'**ORDONNÉE À L'ORIGINE à être plus PROCHE DE ZÉRO**. »* *« Dans cet exemple, le biais qui rapproche l'ordonnée de zéro **AUGMENTE en fait la PENTE**. »*

> **La position du MAP.** *« Le maximum a posteriori peut être considéré comme **faisant le PONT entre les mondes NON PROBABILISTE et PROBABILISTE** : il reconnaît explicitement le besoin d'une loi a priori, **mais il ne produit encore qu'une ESTIMATION PONCTUELLE** des paramètres. »*

### 3.3 L'ajustement de modèle : les trois régimes

**Le cadre.** La paramétrisation définit une **classe de modèles** $M_\theta$. Les données viennent d'un modèle $M^*$ **inconnu**. On part de $M_{\theta_0}$ et on optimise pour approcher $M^*$, la « proximité » étant définie par l'objectif optimisé.

| Régime | Diagnostic |
|---|---|
| **SUR-AJUSTEMENT** (*overfitting*) | *« La classe de modèles est **TROP RICHE** : $M_\theta$ pourrait modéliser des jeux de données bien plus compliqués. »* Exemple : données linéaires, modèle **polynomial de degré 7**. *« Les modèles qui sur-ajustent ont typiquement un **grand NOMBRE DE PARAMÈTRES**... la classe trop flexible **utilise TOUTE sa puissance de modélisation pour réduire l'erreur d'ENTRAÎNEMENT**. Si les données sont bruitées, elle **trouvera donc un signal utile DANS LE BRUIT lui-même** — ce qui causera d'énormes problèmes en prédiction loin des données. »* |
| **SOUS-AJUSTEMENT** (*underfitting*) | *« Le problème OPPOSÉ : la classe $M_\theta$ **n'est PAS assez riche**. »* Exemple : données **sinusoïdales**, modèle **linéaire** |
| **BON AJUSTEMENT** | La classe est **adaptée** à $M^*$ |

## 🟠 Concept 4 — Modélisation probabiliste et inférence (§8.4)

### 4.1 Ce qu'est un modèle probabiliste

> **LA DÉFINITION.** *« En modélisation probabiliste, la **LOI JOINTE $p(x,\theta)$** des variables observées $x$ et des paramètres cachés $\theta$ est **d'importance CENTRALE**. »*

Elle **encapsule** à elle seule :

| Objet | Comment on l'obtient de la jointe |
|---|---|
| **L'a priori et la vraisemblance** | Par la **RÈGLE DU PRODUIT** (§6.3) |
| **La vraisemblance marginale $p(x)$** | En **INTÉGRANT les paramètres** — la **règle de la SOMME** |
| **L'a posteriori** | En **divisant** la jointe par la vraisemblance marginale |

$$\boxed{\;\text{SEULE la loi JOINTE a cette propriété. Un modèle probabiliste EST donc la loi jointe de TOUTES ses variables aléatoires.}\;}$$

### 4.2 L'inférence bayésienne

$$\boxed{\;p(\theta\mid\mathcal X)=\frac{p(\mathcal X\mid\theta)p(\theta)}{p(\mathcal X)},\qquad p(\mathcal X)=\int p(\mathcal X\mid\theta)p(\theta)\,d\theta\;}$$

> **La différence avec MLE/MAP.** *« Dans les deux cas, on obtient une **valeur UNIQUE, la meilleure** pour $\theta$ : le problème algorithmique clé est de résoudre un **problème d'OPTIMISATION**. »* L'inférence bayésienne, elle, *« est **l'apprentissage de la LOI** des variables aléatoires »*.

> ⚠️ **Le coût de l'estimation ponctuelle.** *« Se concentrer uniquement sur une statistique de l'a posteriori conduit à une **PERTE D'INFORMATION**, ce qui peut être **CRITIQUE** dans un système qui utilise la prédiction $p(x\mid\theta^*)$ pour **prendre des DÉCISIONS**. Ces systèmes ont typiquement des **fonctions objectifs DIFFÉRENTES** de la vraisemblance, d'une perte quadratique ou d'une erreur de mauvaise classification. Avoir la **loi a posteriori COMPLÈTE** peut donc être **extrêmement utile et mène à des décisions PLUS ROBUSTES**. »*

**La prédiction bayésienne** — la propagation de l'incertitude :

$$\boxed{\;p(x)=\int p(x\mid\theta)p(\theta)\,d\theta=\mathbb E_\theta\big[p(x\mid\theta)\big]\;}$$

*« L'a posteriori sur les paramètres **PROPAGE l'incertitude des paramètres vers les données**. »*

### 4.3 Les modèles à variables latentes

> **Les variables latentes $z$** *« sont **DIFFÉRENTES des paramètres $\theta$** car elles **ne paramétrisent PAS le modèle explicitement**. »*

**Leurs trois vertus :**

1. Elles peuvent **décrire le processus générateur**, contribuant à l'**INTERPRÉTABILITÉ**.
2. Elles **simplifient souvent la structure** du modèle et permettent des structures **plus simples ET plus riches**.
3. *« La simplification de la structure va souvent de pair avec un **plus PETIT nombre de paramètres**. »*

**L'algorithme dédié :** l'**ESPÉRANCE-MAXIMISATION (EM)** (Dempster *et al.*, 1977).

**Les exemples cités :** **ACP** pour la réduction de dimension (ch. 10), **mélanges gaussiens** pour l'estimation de densité (ch. 11), **modèles de Markov cachés**, **systèmes dynamiques** pour les séries temporelles, **méta-apprentissage**.

**La procédure en deux temps :**

**Étape 1 — la vraisemblance, en marginalisant les latentes :**

$$\boxed{\;p(x\mid\theta)=\int p(x\mid z,\theta)\,p(z)\,dz\;}$$

⚠️ *« La vraisemblance est une fonction **des données et des paramètres**, mais elle est **INDÉPENDANTE des variables latentes**. »*

**Étape 2 — l'estimation ou l'inférence**, exactement comme aux §8.3 et §8.4.2 :

$$p(\theta\mid\mathcal X)=\frac{p(\mathcal X\mid\theta)p(\theta)}{p(\mathcal X)}$$

> ⚠️ **LE DÉFI.** *« Sauf si l'on choisit un a priori **CONJUGUÉ** $p(z)$ pour $p(x\mid z,\theta)$, la **marginalisation n'est PAS ANALYTIQUEMENT TRAITABLE**, et il faut recourir à des **APPROXIMATIONS**. »* Et : *« l'apprentissage dans les modèles à variables latentes est **généralement DIFFICILE**, comme on le verra au chapitre 11. »*

## 🟠 Concept 5 — Les modèles graphiques orientés (§8.5)

### 5.1 La sémantique du graphe

<div class="callout" data-kind="intu">

<span class="callout__lab">Ce que c'est.</span>

*« Une façon **COMPACTE et SUCCINCTE** de spécifier des modèles probabilistes, qui permet de **parser VISUELLEMENT les dépendances** entre variables aléatoires. »*

</div>

$$\boxed{\;\text{NŒUDS}=\text{variables aléatoires}\qquad\text{FLÈCHES}=\text{probabilités conditionnelles}\;}$$

Une flèche de $a$ vers $b$ donne la **probabilité conditionnelle $p(b\mid a)$**. *« Avec des hypothèses supplémentaires, les flèches peuvent indiquer des **relations CAUSALES** (Pearl, 2009). »*

> **La motivation.** *« La loi jointe **en elle-même** peut être assez compliquée et **ne nous dit RIEN des propriétés STRUCTURELLES** du modèle. Par exemple, $p(a,b,c)$ ne nous dit rien sur les **relations d'INDÉPENDANCE**. C'est là qu'interviennent les modèles graphiques. »*

**Les quatre propriétés commodes :**

1. Une façon **simple de VISUALISER** la structure.
2. Ils servent à **concevoir ou motiver de NOUVEAUX modèles** statistiques.
3. *« L'**INSPECTION du graphe SEUL** donne un aperçu de propriétés comme l'**indépendance conditionnelle**. »*
4. *« Des calculs complexes d'inférence et d'apprentissage s'expriment en termes de **MANIPULATIONS GRAPHIQUES**. »*

> ⚠️ **La limite.** *« **Toute loi ne peut PAS être représentée** dans un choix particulier de modèle graphique. »*

### 5.2 Les deux sens de traduction

**De la FACTORISATION vers le GRAPHE (exemple 8.7).** Pour

$$p(a,b,c)=p(c\mid a,b)\,p(b\mid a)\,p(a)$$

la factorisation dit que : $c$ dépend **directement** de $a$ et $b$ ; $b$ dépend directement de $a$ ; $a$ ne dépend **ni de $b$ ni de $c$**.

**La recette :**

1. **Créer un nœud** pour chaque variable aléatoire.
2. Pour chaque loi conditionnelle, **ajouter une flèche** depuis les nœuds **sur lesquels on conditionne**.

⚠️ *« La disposition du graphe **DÉPEND du choix de FACTORISATION** de la loi jointe. »*

**Du GRAPHE vers la FACTORISATION (exemple 8.8).** Deux propriétés :

- *« La loi jointe est le **produit d'un ensemble de conditionnelles, UNE PAR NŒUD** du graphe. »*
- *« Chaque conditionnelle ne dépend **QUE des PARENTS** du nœud correspondant. »*

Pour la figure 8.9(b) :

$$p(x_1,x_2,x_3,x_4,x_5)=p(x_1)\,p(x_5)\,p(x_2\mid x_5)\,p(x_3\mid x_1,x_2)\,p(x_4\mid x_2)$$

$$\boxed{\;p(x)=p(x_1,\dots,x_K)=\prod_{k=1}^{K}p\big(x_k\mid\text{Pa}_k\big)\;}$$

où $\text{Pa}_k$ désigne *« les nœuds **PARENTS** de $x_k$ »*, c'est-à-dire *« les nœuds qui ont des flèches pointant vers $x_k$ »*.

### 5.3 Les conventions graphiques

**L'exemple canonique — le lancer de pièce répété.** Avec $p(x\mid\mu)=\text{Ber}(\mu)$ répété $N$ fois :

$$p(x_1,\dots,x_N\mid\mu)=\prod_{n=1}^{N}p(x_n\mid\mu)$$

*« Le membre de droite est un **produit de lois de Bernoulli** parce que les expériences sont **INDÉPENDANTES** — l'indépendance statistique signifie que la loi **SE FACTORISE**. »*

| Convention | Signification |
|---|---|
| **Nœud GRISÉ / ombré** | Variable **OBSERVÉE** |
| **Nœud blanc** | Variable **latente / non observée** |
| **PLAQUE** (une boîte) | *« Elle **RÉPÈTE tout ce qui est à l'intérieur $N$ fois** »* — les deux graphiques sont **équivalents**, mais la plaque est **plus compacte** |

> **L'HYPER-A-PRIORI.** *« Les modèles graphiques permettent immédiatement de placer un **HYPER-A-PRIORI** sur $\mu$ : une **SECONDE COUCHE de lois a priori sur les paramètres de la première couche** »* — c'est la figure 8.10(c), avec $\alpha$ et $\beta$ au-dessus de $\mu$.

⚠️ Le livre observe : *« le **paramètre UNIQUE $\mu$ est LE MÊME** pour tous les $x_n$, puisque les résultats sont **identiquement distribués**. »*

### 5.4 La $d$-séparation

> **Le but.** Déterminer si l'énoncé $A\perp\!\!\!\perp B\mid C$ (« $A$ est conditionnellement indépendant de $B$ sachant $C$ ») est **impliqué par le graphe orienté acyclique**, pour des ensembles de nœuds $A,B,C$ **disjoints**.

**La procédure.** Considérer **toutes les traînes** (*trails*) — les chemins **ignorant le sens des flèches** — de tout nœud de $A$ vers tout nœud de $B$. Une traîne est **BLOQUÉE** si elle inclut un nœud tel que l'une des conditions suivantes est vraie :

$$\boxed{\;\textbf{1.}\ \text{Les flèches se rencontrent TÊTE-À-QUEUE ou QUEUE-À-QUEUE au nœud, ET le nœud est DANS }C\;}$$

$$\boxed{\;\textbf{2.}\ \text{Les flèches se rencontrent TÊTE-À-TÊTE au nœud, ET NI le nœud NI AUCUN de ses DESCENDANTS n'est dans }C\;}$$

$$\boxed{\;\text{Si TOUTES les traînes sont bloquées, }A\text{ est }d\text{-SÉPARÉ de }B\text{ par }C,\text{ et }A\perp\!\!\!\perp B\mid C\;}$$

⚠️ **Noter l'asymétrie du cas 2** : pour une rencontre **tête-à-tête** (une « collision »), c'est **l'ABSENCE** du nœud et de ses descendants dans $C$ qui bloque — l'inverse des deux autres configurations.

**Exemple 8.9 — la lecture visuelle** sur le graphe $a\to b$, $a\to c$, ... de la figure 8.11 :

$$b\perp\!\!\!\perp d\mid a,c\qquad a\perp\!\!\!\perp c\mid b$$

$$b\not\perp\!\!\!\perp d\mid c\qquad a\not\perp\!\!\!\perp c\mid b,e$$

⚠️ Les **deux dernières lignes montrent la sensibilité** : ajouter $e$ à l'ensemble conditionnant **DÉTRUIT** l'indépendance $a\perp\!\!\!\perp c\mid b$ — signature d'une **collision** dont $e$ est un descendant.

> **Les trois familles de modèles graphiques (figure 8.12) :** les **ORIENTÉS** (réseaux bayésiens), les **NON ORIENTÉS** (champs de Markov aléatoires), et les **GRAPHES DE FACTEURS**.

## 🔴 Concept 6 — La sélection de modèle (§8.6)

### 6.1 Le problème

> **Le dilemme d'expressivité.** *« Un polynôme de degré 1 ne peut décrire que des relations linéaires ; un polynôme de degré 2 peut aussi décrire des relations quadratiques. »* *« Un polynôme $y=a_0+a_1x+a_2x^2$ peut **AUSSI** décrire des fonctions linéaires en posant $a_2=0$ : il est **STRICTEMENT PLUS EXPRESSIF** qu'un polynôme d'ordre 1. »*

<div class="callout" data-kind="intu">

<span class="callout__lab">Pourquoi ne pas toujours prendre le plus flexible.</span>

⚠️ *« À l'entraînement, on ne peut utiliser que l'ensemble d'entraînement pour évaluer la performance. Mais **la performance sur l'ensemble d'entraînement n'est PAS ce qui nous intéresse vraiment**. »*

</div>

### 6.2 La validation croisée imbriquée

**L'idée :** appliquer la validation croisée **UNE FOIS DE PLUS** — pour chaque découpe, effectuer un **autre tour** de validation croisée.

| Boucle | Rôle | Nom de l'ensemble |
|---|---|---|
| **INTERNE** | *« Estimer la performance d'un **choix particulier de MODÈLE ou d'HYPERPARAMÈTRE** »* | **Ensemble de VALIDATION** |
| **EXTERNE** | *« Estimer la performance de **GÉNÉRALISATION** pour le meilleur choix issu de la boucle interne »* | **Ensemble de TEST** |

$$\boxed{\;\mathbb E_{\mathcal V}\big[R(\mathcal V\mid M)\big]\approx\frac1K\sum_{k=1}^{K}R\big(\mathcal V^{(k)}\mid M\big)\;}$$

> **Un bonus.** *« La validation croisée ne donne pas seulement l'erreur de généralisation espérée : on peut aussi obtenir des **statistiques d'ordre SUPÉRIEUR**, par exemple l'**ERREUR-TYPE** »* :
>
> $$\boxed{\;\text{erreur-type}=\frac{\sigma}{\sqrt K}\;}$$
>
> où $K$ est le nombre d'expériences et $\sigma$ l'écart-type du risque de chaque expérience.

### 6.3 La sélection bayésienne et le rasoir d'Occam

> **Le principe commun.** *« Toutes les approches tentent d'**ARBITRER entre COMPLEXITÉ du modèle et AJUSTEMENT aux données**. On suppose que les modèles plus simples sont **moins sujets au surapprentissage**, et l'objectif est donc de trouver **le modèle LE PLUS SIMPLE qui explique raisonnablement bien les données** — c'est le **RASOIR D'OCCAM**. »*

> **LE POINT REMARQUABLE.** *« On pourrait envisager de placer un a priori sur les modèles qui favorise les modèles simples. **CE N'EST PAS NÉCESSAIRE** : un "**RASOIR D'OCCAM AUTOMATIQUE**" est quantitativement **incorporé dans l'application de la probabilité BAYÉSIENNE**. »*

**L'intuition de la figure 8.14** (adaptée de MacKay, 2003) — l'axe horizontal représente **l'espace de tous les jeux de données possibles** $\mathcal D$ :

- Un modèle **SIMPLE** $M_1$ ne peut prédire qu'un **petit nombre** de jeux de données : $p(\mathcal D\mid M_1)$ est **concentrée**.
- Un modèle **PUISSANT** $M_2$ (plus de paramètres libres) prédit une **plus grande variété** de jeux — *« mais cela signifie que $M_2$ **ne prédit PAS aussi bien** les jeux de la région $C$ que $M_1$. »*
- **La contrainte cachée** : *« ces prédictions sont quantifiées par une **loi de probabilité NORMALISÉE sur $\mathcal D$** : elle doit **intégrer/sommer à 1**. »* C'est cette normalisation qui **pénalise automatiquement** la complexité.
- **Conclusion** : *« si le jeu de données tombe dans la région $C$, le modèle **MOINS puissant $M_1$ est le PLUS PROBABLE**. »*

**Le processus génératif hiérarchique.** Pour un ensemble fini de modèles $\mathcal M=\{M_1,\dots,M_K\}$ :

$$M_k\sim p(M),\qquad\theta_k\sim p(\theta\mid M_k),\qquad\mathcal D\sim p(\mathcal D\mid\theta_k)$$

$$\boxed{\;p(M_k\mid\mathcal D)\propto p(M_k)\,p(\mathcal D\mid M_k)\;}$$

> ⚠️ **Le point clé.** *« Cet a posteriori **NE DÉPEND PLUS des paramètres $\theta_k$**, car ils ont été **INTÉGRÉS** dans le cadre bayésien »* :

$$\boxed{\;p(\mathcal D\mid M_k)=\int p(\mathcal D\mid\theta_k)\,p(\theta_k\mid M_k)\,d\theta_k\;}$$

C'est l'**ÉVIDENCE DU MODÈLE** (ou **vraisemblance marginale**), et l'on choisit $M^*=\arg\max_{M_k}p(M_k\mid\mathcal D)$.

> **VRAISEMBLANCE contre VRAISEMBLANCE MARGINALE — la différence décisive.** *« Alors que la **vraisemblance est SUJETTE AU SURAPPRENTISSAGE**, la **vraisemblance MARGINALE ne l'est typiquement PAS**, puisque les paramètres du modèle ont été **MARGINALISÉS** (on n'a plus à les ajuster). De plus, la vraisemblance marginale **incorpore AUTOMATIQUEMENT un compromis** entre complexité du modèle et ajustement aux données — le **rasoir d'Occam**. »*

### 6.4 Les facteurs de Bayes

Pour comparer deux modèles $M_1$ et $M_2$ :

$$\frac{p(M_1\mid\mathcal D)}{p(M_2\mid\mathcal D)}=\underbrace{\frac{p(M_1)}{p(M_2)}}_{\text{RAPPORT A PRIORI}}\cdot\underbrace{\frac{p(\mathcal D\mid M_1)}{p(\mathcal D\mid M_2)}}_{\text{FACTEUR DE BAYES}}$$

| Terme | Ce qu'il mesure |
|---|---|
| **Rapport A POSTERIORI** (*posterior odds*) | Le rapport des a posteriori |
| **Rapport A PRIORI** (*prior odds*) | *« À quel point nos **croyances initiales** favorisent $M_1$ sur $M_2$ »* |
| **FACTEUR DE BAYES** | *« À quel point les données $\mathcal D$ sont **bien PRÉDITES** par $M_1$ comparé à $M_2$ »* |

**Avec un a priori UNIFORME sur les modèles**, le rapport a priori vaut $1$ :

$$\boxed{\;\text{rapport a posteriori}=\frac{p(\mathcal D\mid M_1)}{p(\mathcal D\mid M_2)}\;}$$

$$\boxed{\;\text{Facteur de Bayes}>1\ \Rightarrow\ \text{choisir }M_1\ ;\quad\text{sinon }M_2\;}$$

*« De façon similaire aux statistiques fréquentistes, il existe des **lignes directrices sur la TAILLE du rapport** à considérer avant de parler de "significativité" (Jeffreys, 1961). »*

> ⚠️ **LE PARADOXE DE JEFFREYS-LINDLEY.** *« Le facteur de Bayes **FAVORISE TOUJOURS le modèle PLUS SIMPLE**, puisque la probabilité des données sous un **modèle complexe avec un a priori DIFFUS sera très PETITE** »* (Murphy, 2012). Un **a priori diffus** est un a priori qui **ne favorise aucun modèle** en particulier — **beaucoup de modèles sont a priori plausibles**.

## Comment reconnaître le type d'exercice

| L'énoncé dit... | Le type | La méthode |
|---|---|---|
| « Convertir cette table en format numérique » | **§8.1.1** | Encoder les catégorielles ; utiliser la **connaissance du domaine** ; **standardiser** (moyenne 0, variance 1) ; supprimer les identifiants |
| « Écrire le prédicteur affine » | **Ex. 8.1** | Concaténer $x^{(0)}=1$, écrire $f(x_n,\theta)=\theta^\top x_n$ |
| « Écrire le risque empirique » | **§8.2.2** | $\frac1N\sum_n\ell(y_n,\hat y_n)$ |
| « Quelle est la différence avec le risque espéré ? » | **§8.2.2** | Empirique : **moyenne sur $N$ points**. Espéré : **espérance sur la vraie loi** (infinie) |
| « Le modèle sur-apprend » | **§8.2.3** | Ajouter $\lambda\lVert\theta\rVert^2$ ; les **magnitudes des paramètres deviennent grandes** en surapprentissage |
| « Estimer l'erreur de généralisation » | **§8.2.4** | **Validation croisée à $K$ plis** ; moyenner les $K$ risques empiriques |
| « Écrire la log-vraisemblance négative » | **§8.3.1** | $L(\theta)=-\sum_n\log p(y_n\mid x_n,\theta)$ |
| « Bruit gaussien, modèle linéaire » | **Ex. 8.5** | Le MLE **SE RAMÈNE aux moindres carrés** |
| « On a une connaissance a priori sur $\theta$ » | **§8.3.2** | MAP : $p(\theta\mid x)\propto p(x\mid\theta)p(\theta)$ ; l'a priori **est** la régularisation |
| « Le modèle sur-ajuste ou sous-ajuste ? » | **§8.3.3** | Classe **trop riche** $\Rightarrow$ sur-ajustement ; **pas assez riche** $\Rightarrow$ sous-ajustement |
| « Spécifier un modèle probabiliste » | **§8.4.1** | Donner la **LOI JOINTE** de **toutes** les variables |
| « Faire une prédiction bayésienne » | **§8.4.2** | $p(x)=\int p(x\mid\theta)p(\theta)d\theta$ — **intégrer**, ne pas brancher $\theta^*$ |
| « Le modèle a des variables latentes » | **§8.4.3** | $p(x\mid\theta)=\int p(x\mid z,\theta)p(z)dz$ ; algorithme **EM** |
| « Dessiner le modèle graphique » | **§8.5.1** | Un nœud par variable ; une flèche depuis chaque variable **conditionnante** |
| « Lire la loi jointe sur le graphe » | **Ex. 8.8** | $\prod_kp(x_k\mid\text{Pa}_k)$ |
| « $N$ observations i.i.d. » | **§8.5.1** | Utiliser une **PLAQUE** ; **griser** les nœuds observés |
| « $A$ et $B$ sont-elles indépendantes sachant $C$ ? » | **$d$-séparation** | Examiner **toutes les traînes** ; appliquer les deux règles de blocage |
| « Choisir entre plusieurs modèles » | **§8.6** | Validation croisée **imbriquée** ou **évidence** bayésienne |
| « Comparer deux modèles bayésiennement » | **§8.6.3** | Le **facteur de Bayes** $p(\mathcal D\mid M_1)/p(\mathcal D\mid M_2)$ |

## Comment résoudre : les quatre méthodes pas-à-pas

**Méthode A — Poser un problème de minimisation du risque empirique.**

1. Fixer la **classe d'hypothèses** (affine, polynomiale…) et sa paramétrisation.
2. Choisir la **fonction de perte** $\ell$ ; elle doit **correspondre à la métrique de performance** de la tâche.
3. Écrire $R_{\text{emp}}=\frac1N\sum_n\ell(y_n,f(x_n,\theta))$.
4. Ajouter un **régularisateur** $\lambda\lVert\theta\rVert^2$ si le modèle risque de sur-apprendre.
5. Optimiser (fermé si moindres carrés, sinon ch. 7).
6. **Estimer la généralisation** par validation croisée.

**Méthode B — Dériver un estimateur du maximum de vraisemblance.**

1. Spécifier $p(y_n\mid x_n,\theta)$ — la loi du **bruit**.
2. Invoquer l'**i.i.d.** pour **factoriser** : $\prod_np(y_n\mid x_n,\theta)$.
3. Prendre le **logarithme négatif** : $-\sum_n\log p(y_n\mid x_n,\theta)$.
4. **Développer** et **écarter les constantes** en $\theta$.
5. **Reconnaître** l'objectif classique obtenu (moindres carrés pour un bruit gaussien).
6. Minimiser ; vérifier si une **solution fermée** existe.

**Méthode C — Passer de MLE à MAP.**

1. Choisir un **a priori** $p(\theta)$ ; le prendre **CONJUGUÉ** de la vraisemblance rend l'a posteriori de même forme.
2. Écrire $p(\theta\mid x)\propto p(x\mid\theta)p(\theta)$ — **ignorer $p(x)$**.
3. Prendre le **logarithme négatif** des **deux** termes.
4. Le terme issu de l'a priori **EST** le régularisateur ; l'identifier.
5. Minimiser.
6. **Contrôle qualitatif** : l'a priori doit **biaiser les paramètres vers l'origine**.

**Méthode D — Lire un modèle graphique.**

1. **Lister les nœuds** ; distinguer **observés (grisés)** et **latents (blancs)**.
2. **Dérouler les plaques** mentalement.
3. Pour chaque nœud, identifier ses **PARENTS**.
4. Écrire $p(x)=\prod_kp(x_k\mid\text{Pa}_k)$.
5. Pour une question d'indépendance : lister **toutes les traînes**, tester le **blocage** de chacune.
6. Attention aux **collisions** (tête-à-tête) : elles bloquent **par défaut** et se **débloquent** en conditionnant.

## 🔴 Common mistakes

| Erreur | Correction |
|---|---|
| Oublier de standardiser les colonnes | *« Sans information supplémentaire »*, viser **moyenne 0 et variance 1** |
| Garder un identifiant comme attribut | Non informatif **et** problème de **vie privée** |
| Croire qu'« affine » et « linéaire » sont interchangeables | Le livre le signale : en ML on dit « linéaire » pour « affine » — c'est un **abus** |
| Confondre les trois phases | **Prédiction** (paramètres fixés) · **entraînement** (on les ajuste) · **sélection** (on choisit les hyperparamètres) |
| Croire que « inférence » a un sens unique | *« Pas de nommage consensuel »* — le mot désigne parfois la **prédiction**, parfois l'**estimation de paramètres** |
| Optimiser le risque empirique et s'en satisfaire | Ce qui compte est le **risque ESPÉRÉ** sur des données **non vues** |
| Croire que la MRE est « exempte de probabilité » | **Incorrect** : il y a une $p(x,y)$ sous-jacente ; l'approche y est seulement **AGNOSTIQUE** |
| Concevoir la perte sans regarder la métrique de la tâche | Le décalage est fréquent mais reste un **défaut** |
| Prendre $\lambda$ trop grand | Le prédicteur est **biaisé vers l'origine** et **sous-ajuste** |
| Prendre un ensemble de validation trop petit | Estimation **BRUITÉE, à forte variance** — d'où la validation croisée |
| Croire la validation croisée trop coûteuse | Elle est **EMBARRASSAMMENT PARALLÈLE** |
| Regarder la performance sur le test « juste pour voir » | **Même cela fait fuiter de l'information** (Blum & Hardt, 2015) |
| Interpréter $\theta$ comme observé dans $p(y_n\mid x_n,\theta)$ | *« Cette interprétation est INCORRECTE »* — $L(\theta)$ est une **fonction de $\theta$** |
| Chercher un sens profond au signe moins | C'est un **artefact HISTORIQUE** : on maximise la vraisemblance mais on minimise en optimisation |
| Croire que le MLE a toujours une solution fermée | **Seulement** pour certaines vraisemblances (gaussienne) ; sinon, méthodes **numériques** |
| Faire confiance au MLE sur peu de données | *« Surtout dans le régime des PETITES données, il peut mener au SURAPPRENTISSAGE »* — la variance décroît en $1/N$ |
| Croire que le MAP donne une loi | **NON** : il ne produit encore qu'une **ESTIMATION PONCTUELLE** |
| Croire régularisation et a priori sans rapport | Ce sont **la même idée** dans deux langages |
| Croire qu'un modèle plus flexible est toujours meilleur | Il **utilise sa puissance à trouver du signal DANS LE BRUIT** |
| Spécifier un modèle probabiliste par sa seule vraisemblance | Un modèle probabiliste **EST la LOI JOINTE** de toutes ses variables |
| Prédire avec $p(x\mid\theta^*)$ en contexte bayésien | Prédire avec $\int p(x\mid\theta)p(\theta)d\theta$ — **propager l'incertitude** |
| Confondre paramètres et variables latentes | Les latentes **ne paramétrisent PAS le modèle explicitement** |
| Croire la marginalisation des latentes toujours faisable | **Analytiquement intraitable** sauf a priori **conjugué** |
| Oublier un parent en lisant un graphe | $p(x_k\mid\text{Pa}_k)$ demande **TOUS** les parents |
| Croire que le graphe est unique | *« La disposition dépend du CHOIX de FACTORISATION »* |
| Croire que toute loi a un modèle graphique | **NON** — le livre le signale |
| Appliquer la $d$-séparation en suivant le sens des flèches | On considère les **TRAÎNES** — des chemins **ignorant le sens** |
| Traiter la collision comme les autres configurations | **Tête-à-tête** : bloquée **SI le nœud ET ses descendants sont HORS de $C$** — la règle est **inversée** |
| Sélectionner un modèle sur l'ensemble de test | La sélection se fait sur la **VALIDATION** (boucle interne) ; le test estime la **généralisation** |
| Croire qu'il faut un a priori favorisant la simplicité | **NON** : le rasoir d'Occam est **AUTOMATIQUE** dans l'évidence |
| Confondre vraisemblance et vraisemblance marginale | La marginale **intègre les paramètres** et **ne sur-apprend typiquement pas** |
| Oublier le paradoxe de Jeffreys-Lindley | Avec un a priori **DIFFUS**, le facteur de Bayes favorise **toujours** le modèle simple |

## 📌 Ultimate Review

```
════════ LES SEPT FORMULES À SAVOIR SANS HÉSITER ════════
  1.  RISQUE EMPIRIQUE   Remp(f, X, y) = (1/N) Σn ℓ(yn, ŷn)
  2.  RISQUE ESPÉRÉ      Rtrue(f) = E_{x,y}[ℓ(y, f(x))]
  3.  RÉGULARISÉ         min (1/N)‖y − Xθ‖² + λ‖θ‖²
  4.  LOG-VRAISEMBLANCE NÉGATIVE  L(θ) = −Σn log p(yn | xn, θ)
      ⚠️ bruit GAUSSIEN  ⟹  L(θ) = (1/2σ²) Σn (yn − xnᵀθ)² + const
  5.  MAP                p(θ | x) ∝ p(x | θ) p(θ)
  6.  PRÉDICTION BAYÉSIENNE   p(x) = ∫ p(x|θ) p(θ) dθ = Eθ[p(x|θ)]
      LATENTES                p(x|θ) = ∫ p(x|z,θ) p(z) dz
  7.  GRAPHE             p(x) = Π_k p(xk | Pa_k)
      ÉVIDENCE           p(D | Mk) = ∫ p(D | θk) p(θk | Mk) dθk
      FACTEUR DE BAYES   p(D|M1) / p(D|M2)
═════════════════════════════════════════════════════════
```

**LE TABLEAU DE CORRESPONDANCE — le cœur du chapitre :**

| Monde **NON PROBABILISTE** (§8.2) | Monde **PROBABILISTE** (§8.3-8.4) |
|---|---|
| Fonction de **PERTE** $\ell$ | **VRAISEMBLANCE** $p(y\mid x,\theta)$ |
| **Perte QUADRATIQUE** | **Vraisemblance GAUSSIENNE** |
| **RÉGULARISATEUR** $\lambda\lVert\theta\rVert^2$ | **A PRIORI** $p(\theta)=\mathcal N(0,\Sigma)$ |
| Minimiser le **RISQUE EMPIRIQUE** | Minimiser la **LOG-VRAISEMBLANCE NÉGATIVE** |
| Risque empirique **RÉGULARISÉ** | **MAP** |
| **Validation croisée** pour la généralisation | **ÉVIDENCE** / vraisemblance marginale |
| Estimation **ponctuelle** | **Loi a posteriori COMPLÈTE** (inférence bayésienne) |

**Les trois régimes d'ajustement :**

| Régime | Classe $M_\theta$ | Erreur d'entraînement | Erreur de test |
|---|---|---|---|
| **Sur-ajustement** | **Trop riche** | **Très faible** — le modèle apprend le **bruit** | **Élevée** |
| **Sous-ajustement** | **Pas assez riche** | Élevée | Élevée |
| **Bon ajustement** | Adaptée | Modérée | **Faible** |

**Les trois niveaux de « prendre en compte l'incertitude » :**

| Niveau | Ce qu'on obtient | Coût |
|---|---|---|
| **MLE** | Une **estimation ponctuelle** | Optimisation |
| **MAP** | Une **estimation ponctuelle biaisée par un a priori** | Optimisation |
| **Bayésien complet** | La **LOI a posteriori entière** | **Intégration** (souvent intraitable) |

**Où chaque notion resservira dans le livre :**

| Notion du ch. 8 | Suite |
|---|---|
| Moindres carrés, MLE, MAP | **Régression linéaire** (ch. 9) |
| Application d'attributs $\phi(\cdot)$ | §9.2, puis **NOYAUX** (§12.4) |
| Variables latentes, EM | **ACP** (ch. 10), **mélanges gaussiens** (ch. 11) |
| Modèles graphiques | Chapitres **9, 10 et 11** |
| Régularisation | **GRANDE MARGE** des SVM (ch. 12) |
| Évidence, sélection de modèle | Choix du **degré du polynôme** (§9.3) |

## 🧠 Active Recall

**Données et modèles**

1. Quelle est la question centrale de l'apprentissage automatique ?
2. Quels sont les synonymes d'« attribut » ? d'« étiquette » ?
3. Que valent $N$, $D$ et $X$ ?
4. Quelle règle par défaut le livre donne-t-il sur la mise à l'échelle ?
5. Pourquoi supprimer la colonne Nom ? Deux raisons.
6. Donner les deux visions du modèle.
7. Pourquoi le livre se restreint-il aux fonctions linéaires ?
8. Quelles sont les trois phases algorithmiques ? Quel est l'avertissement terminologique ?
9. Quelles sont les deux stratégies d'entraînement ? Laquelle exige un modèle probabiliste ?
10. D'où vient le signe moins dans les objectifs ?
11. Qu'est-ce que l'abduction ? Pourquoi le mot ici ?
12. Comment distinguer paramètre et hyperparamètre ?

**Minimisation du risque empirique** 13. Citer les quatre choix de conception. 14. Écrire le prédicteur affine avec l'astuce de l'attribut unité. 15. Écrire le risque empirique et le risque espéré. Quelle est la différence essentielle ? 16. Détailler l'exemple 8.2 jusqu'à la forme matricielle. 17. Quelles sont les deux questions pratiques posées par le risque espéré ? 18. Quel décalage le livre signale-t-il entre perte et métrique ? 19. Écrire le problème des moindres carrés régularisé. Nommer les deux termes ajoutés. 20. Quel signe empirique accompagne le surapprentissage ? 21. Citer les trois formes équivalentes de l'idée de régularisation. 22. Décrire la validation croisée à $K$ plis et écrire son estimateur. 23. Pourquoi le coût n'est-il pas un obstacle ? 24. Pourquoi « exempt de probabilité » est-il incorrect ?

**MLE et MAP** 25. Écrire la log-vraisemblance négative. Que souligne la notation ? 26. Donner les deux lectures de $p(x\mid\theta)$. 27. Quel piège d'interprétation le livre signale-t-il ? 28. Écrire la vraisemblance gaussienne de l'exemple 8.4. 29. Que signifient « indépendantes » et « identiquement distribuées » ici ? 30. Dériver l'exemple 8.5. Quelle est la conclusion ? 31. Écrire le MAP. Pourquoi peut-on ignorer $p(x)$ ? 32. Quel a priori choisit l'exemple 8.6 ? Quelle est sa vertu ? 33. Quel effet l'a priori a-t-il sur la pente et l'ordonnée à l'origine ? 34. Quelle est la position intermédiaire du MAP ? 35. Donner les deux propriétés asymptotiques du MLE. 36. Distinguer sur-ajustement, sous-ajustement, bon ajustement.

**Modélisation probabiliste** 37. Qu'est-ce qui spécifie un modèle probabiliste ? 38. Comment obtenir a priori, vraisemblance marginale et a posteriori de la jointe ? 39. Quelle est la différence entre inférence bayésienne et estimation ponctuelle ? 40. Écrire la prédiction bayésienne. 41. Qu'est-ce qu'une variable latente ? En quoi diffère-t-elle d'un paramètre ? 42. Citer trois vertus des variables latentes et trois modèles qui en utilisent. 43. Écrire la vraisemblance marginalisée. Quel est le défi ?

**Modèles graphiques** 44. Que représentent nœuds et flèches ? 45. Citer les quatre propriétés commodes. 46. Donner la recette factorisation → graphe. 47. Donner les deux propriétés graphe → factorisation. Écrire la formule générale. 48. Que signifie un nœud grisé ? une plaque ? 49. Qu'est-ce qu'un hyper-a-priori ? 50. Énoncer les deux règles de blocage de la $d$-séparation. 51. Pourquoi la règle de la collision est-elle inversée ? 52. Citer les trois familles de modèles graphiques.

**Sélection de modèle** 53. Pourquoi un modèle plus expressif n'est-il pas toujours préférable ? 54. Décrire la validation croisée imbriquée. Quel rôle a chaque boucle ? 55. Écrire l'erreur-type. 56. Qu'est-ce que le rasoir d'Occam ? 57. Expliquer la figure 8.14. Quelle contrainte rend le rasoir automatique ? 58. Écrire le processus génératif hiérarchique et l'évidence. 59. Quelle est la différence essentielle entre vraisemblance et vraisemblance marginale ? 60. Écrire le rapport a posteriori et nommer ses deux facteurs. 61. Énoncer le paradoxe de Jeffreys-Lindley. Qu'est-ce qu'un a priori diffus ?

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| La question centrale de l'apprentissage automatique ? | *« **Qu'entend-on par de BONS modèles ?** »* |
| Le principe directeur ? | Bien se comporter sur des **données NON VUES** |
| Synonymes d'attribut ? | **Caractéristique** (*feature*) · **covariable** |
| Synonymes d'étiquette ? | **Cible** · **variable de réponse** · **annotation** |
| Notation du jeu de données ? | $\{(x_1,y_1),\dots,(x_N,y_N)\}$ et $X\in\mathbb R^{N\times D}$ |
| Règle de mise à l'échelle par défaut ? | **Moyenne empirique 0, variance empirique 1** sur chaque colonne |
| Pourquoi supprimer les noms ? | Non **informatifs** · **ANONYMISATION** |
| Les deux visions du modèle ? | Une **FONCTION** $f:\mathbb R^D\to\mathbb R$ · une **LOI DE PROBABILITÉ** |
| Le prédicteur linéaire ? | $f(x)=\theta^\top x+\theta_0$ |
| Pourquoi les fonctions linéaires ? | Bon **équilibre** entre généralité et mathématiques nécessaires |
| Pourquoi la vision probabiliste ? | Pour exprimer l'**INCERTITUDE** et la **CONFIANCE** dans une prédiction |
| Les trois phases ? | **Prédiction/inférence** · **Entraînement** · **Sélection de modèle** |
| L'avertissement terminologique ? | *« Pas de nommage consensuel »* — « inférence » a **plusieurs sens** |
| Les deux stratégies d'entraînement ? | **Estimation ponctuelle** · **Inférence bayésienne** ( modèle probabiliste **requis**) |
| Le principe non probabiliste ? | La **minimisation du RISQUE EMPIRIQUE** |
| Le principe probabiliste ? | Le **MAXIMUM DE VRAISEMBLANCE** |
| D'où vient le signe moins ? | On **MINIMISE** en optimisation, mais on **MAXIMISE** la vraisemblance |
| Qu'est-ce que l'abduction ? | Ni induction ni déduction — l'**inférence vers la MEILLEURE EXPLICATION** |
| Paramètre contre hyperparamètre ? | Ce qui est **numériquement optimisable** contre ce qui exige une **RECHERCHE** |
| Les quatre choix de la MRE ? | **Classe d'hypothèses** · **perte** · **régularisation** · **procédure de recherche** |
| L'astuce de l'attribut unité ? | Concaténer $x^{(0)}=1$ pour écrire l'affine comme $\theta^\top x_n$ |
| « Affine » en ML ? | Souvent appelé « **linéaire** » — abus signalé par le livre |
| Risque empirique ? | $R_{\text{emp}}=\frac1N\sum_n\ell(y_n,\hat y_n)$ |
| Ses trois arguments ? | Le **prédicteur $f$**, les données $X$, $y$ |
| Risque espéré ? | $R_{\text{true}}(f)=\mathbb E_{x,y}[\ell(y,f(x))]$ |
| Son autre nom ? | Le risque de **POPULATION** |
| La différence essentielle ? | Le risque espéré suppose une **quantité INFINIE de données** |
| La perte quadratique en forme matricielle ? | $\min_\theta\frac1N\lVert y-X\theta\rVert^2$ |
| Comment se résout-il ? | Par les **ÉQUATIONS NORMALES**, en forme **fermée** |
| Le décalage signalé ? | La perte devrait correspondre à la **métrique de performance** ; en pratique elle **diverge** |
| Le problème régularisé ? | $\min_\theta\frac1N\lVert y-X\theta\rVert^2+\lambda\lVert\theta\rVert^2$ |
| Les deux noms des termes ? | Le **RÉGULARISATEUR** (ou terme de **pénalité**) · le **paramètre de régularisation** $\lambda$ |
| Que fait le terme de pénalité ? | Il **BIAISE $\theta$ vers l'ORIGINE** |
| Le signe empirique du surapprentissage ? | La **magnitude des paramètres devient GRANDE** |
| Les trois visages de la régularisation ? | **Régularisateur** · **A PRIORI** · **GRANDE MARGE** (SVM) |
| Le nom de cette régularisation ? | La régularisation de **TIKHONOV** (variante contrainte : **IVANOV**) |
| Validation croisée à $K$ plis ? | $K-1$ morceaux d'entraînement, $1$ de validation, **$K$ passages moyennés** |
| Le dilemme qu'elle résout ? | Grand ensemble d'entraînement **contre** grand ensemble de validation |
| Son coût ? | **Embarrassamment PARALLÈLE** — pas plus long qu'une seule évaluation |
| Le risque de regarder le test ? | *« Même connaître la performance sur le test **FAIT FUITER de l'information** »* |
| La MRE est-elle « sans probabilité » ? | **NON** — elle est seulement **AGNOSTIQUE** à $p(x,y)$ |
| Log-vraisemblance négative ? | $\mathcal L_x(\theta)=-\log p(x\mid\theta)$ |
| Ce que souligne la notation $\mathcal L_x(\theta)$ ? | **$\theta$ VARIE, $x$ est FIXÉE** |
| Lecture avec $\theta$ fixé ? | L'**incertitude des DONNÉES** pour ce réglage |
| Lecture avec $x$ fixé ? | **À quel point ce $\theta$ est PROBABLE** pour ces observations |
| Le piège d'interprétation ? | Croire $\theta$ **observé** parce qu'il est à droite du conditionnement — **INCORRECT** |
| La vraisemblance de l'exemple 8.4 ? | $\mathcal N(y_n\mid x_n^\top\theta,\ \sigma^2)$, bruit $\varepsilon_n\sim\mathcal N(0,\sigma^2)$ |
| Que donne « indépendantes » ? | La vraisemblance **SE FACTORISE** en un produit |
| Que donne « identiquement distribuées » ? | Chaque terme est de la **MÊME loi** et **partage les mêmes paramètres** |
| Pourquoi le logarithme ? | Transformer un **PRODUIT en SOMME** — plus facile à optimiser |
| Le résultat de l'exemple 8.5 ? | **Vraisemblance GAUSSIENNE $\Longleftrightarrow$ MOINDRES CARRÉS** |
| La forme obtenue ? | $L(\theta)=\frac{1}{2\sigma^2}\sum_n(y_n-x_n^\top\theta)^2-N\log\frac{1}{\sqrt{2\pi\sigma^2}}$ |
| Pourquoi le second terme disparaît-il ? | Il est **CONSTANT** en $\theta$ (si $\sigma$ est donné) |
| Le MLE a-t-il toujours une solution fermée ? | **NON** — seulement pour certaines vraisemblances |
| Consistance asymptotique ? | Le MLE **converge vers la vraie valeur** à la limite infinie, avec une erreur **approximativement normale** |
| Décroissance de la variance ? | En **$1/N$** |
| Le danger sur peu de données ? | **SURAPPRENTISSAGE** |
| L'estimation MAP ? | $p(\theta\mid x)\propto p(x\mid\theta)p(\theta)$ |
| Pourquoi ignorer $p(x)$ ? | Elle **ne dépend pas de $\theta$** |
| L'a priori de l'exemple 8.6 ? | $p(\theta)=\mathcal N(0,\Sigma)$ — **conjugué**, donc a posteriori **gaussien** |
| Son effet visible ? | **Pente moins raide** · **ordonnée plus proche de zéro** |
| La position du MAP ? | Un **PONT** : il reconnaît l'a priori mais **ne donne qu'une ESTIMATION PONCTUELLE** |
| Sur-ajustement ? | Classe **TROP RICHE** ; elle **trouve du signal DANS LE BRUIT** |
| Sous-ajustement ? | Classe **PAS ASSEZ RICHE** (données sinusoïdales, modèle linéaire) |
| Qu'est-ce qui spécifie un modèle probabiliste ? | La **LOI JOINTE $p(x,\theta)$** de **toutes** ses variables |
| Comment obtenir la vraisemblance marginale ? | En **INTÉGRANT les paramètres** (règle de la **somme**) |
| Comment obtenir l'a posteriori ? | En **divisant la jointe** par la vraisemblance marginale |
| Inférence bayésienne ? | **Apprendre la LOI** des variables, pas une valeur |
| Le coût de l'estimation ponctuelle ? | **Perte d'information** — critique pour la **prise de DÉCISION** |
| La prédiction bayésienne ? | $p(x)=\int p(x\mid\theta)p(\theta)d\theta=\mathbb E_\theta[p(x\mid\theta)]$ |
| Variable latente ? | Une variable qui **NE paramétrise PAS le modèle explicitement** |
| Ses trois vertus ? | **Interprétabilité** du processus générateur · **structures plus simples et plus riches** · **moins de paramètres** |
| L'algorithme dédié ? | L'**ESPÉRANCE-MAXIMISATION (EM)** |
| La vraisemblance marginalisée ? | $p(x\mid\theta)=\int p(x\mid z,\theta)p(z)dz$ |
| Dépend-elle des latentes ? | **NON** — c'est tout l'intérêt |
| Le défi ? | **Analytiquement INTRAITABLE** sauf a priori **CONJUGUÉ** |
| Nœuds et flèches d'un modèle graphique ? | Nœuds = **variables aléatoires** · flèches = **probabilités conditionnelles** |
| Autre nom des modèles orientés ? | Les **RÉSEAUX BAYÉSIENS** |
| Recette factorisation → graphe ? | **1.** un nœud par variable **2.** une flèche depuis chaque variable **conditionnante** |
| Formule graphe → factorisation ? | $p(x)=\prod_{k=1}^{K}p(x_k\mid\text{Pa}_k)$ |
| Que signifie $\text{Pa}_k$ ? | Les nœuds **PARENTS** de $x_k$ — ceux dont les flèches **pointent vers** $x_k$ |
| Le graphe est-il unique ? | **NON** — il dépend du **choix de factorisation** |
| Toute loi a-t-elle un graphe ? | **NON** |
| Nœud grisé ? | Variable **OBSERVÉE** |
| Plaque ? | Une boîte qui **RÉPÈTE son contenu $N$ fois** |
| Hyper-a-priori ? | Une **SECONDE COUCHE** d'a priori sur les paramètres de la première |
| $d$-séparation, règle 1 ? | Flèches **tête-à-queue ou queue-à-queue**, et le nœud **EST DANS $C$** |
| $d$-séparation, règle 2 ? | Flèches **TÊTE-À-TÊTE**, et **NI le nœud NI aucun descendant** n'est dans $C$ |
| Que sont les traînes ? | Des chemins qui **IGNORENT le sens des flèches** |
| Conclusion si toutes les traînes sont bloquées ? | $A\perp\!\!\!\perp B\mid C$ |
| Les trois familles de modèles graphiques ? | **Orientés** (bayésiens) · **non orientés** (champs de Markov) · **graphes de FACTEURS** |
| Un polynôme de degré 2 contient-il les linéaires ? | **OUI** — poser $a_2=0$ ; il est **strictement plus expressif** |
| Validation croisée imbriquée, boucle interne ? | Estimer la performance d'un **choix de modèle / hyperparamètre** — ensemble de **VALIDATION** |
| Boucle externe ? | Estimer la **GÉNÉRALISATION** du meilleur choix — ensemble de **TEST** |
| Erreur-type ? | $\sigma/\sqrt K$ |
| Rasoir d'Occam ? | Chercher le **modèle le plus SIMPLE** qui explique raisonnablement les données |
| Faut-il un a priori favorisant la simplicité ? | **NON** — le rasoir est **AUTOMATIQUE** dans l'évidence bayésienne |
| Pourquoi ? | Parce que $p(\mathcal D\mid M_i)$ doit **INTÉGRER À 1** sur l'espace des jeux de données |
| Le processus génératif hiérarchique ? | $M_k\sim p(M)$, $\theta_k\sim p(\theta\mid M_k)$, $\mathcal D\sim p(\mathcal D\mid\theta_k)$ |
| L'a posteriori sur les modèles ? | $p(M_k\mid\mathcal D)\propto p(M_k)p(\mathcal D\mid M_k)$ |
| L'évidence ? | $p(\mathcal D\mid M_k)=\int p(\mathcal D\mid\theta_k)p(\theta_k\mid M_k)d\theta_k$ |
| Son autre nom ? | La **VRAISEMBLANCE MARGINALE** |
| Vraisemblance contre marginale ? | La vraisemblance **SUR-APPREND** ; la marginale **NON** (paramètres marginalisés) |
| Rapport a posteriori ? | $\dfrac{p(M_1)}{p(M_2)}\cdot\dfrac{p(\mathcal D\mid M_1)}{p(\mathcal D\mid M_2)}$ |
| Ses deux facteurs ? | Le **rapport A PRIORI** · le **FACTEUR DE BAYES** |
| Que mesure le facteur de Bayes ? | À quel point **les données sont PRÉDITES** par $M_1$ comparé à $M_2$ |
| Facteur de Bayes $>1$ ? | On choisit **$M_1$** |
| Paradoxe de Jeffreys-Lindley ? | Avec un a priori **DIFFUS**, le facteur de Bayes **favorise TOUJOURS le modèle simple** |
| A priori diffus ? | Un a priori qui **ne favorise aucun modèle** — beaucoup sont a priori plausibles |
