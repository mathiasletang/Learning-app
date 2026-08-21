# Fiche 47 — Arrêt optimal, ordonnancement et contrôle minimax

|  |  |
|---|---|
| **Matière** | Maths · Optimisation |
| **Cours source** | Bertsekas, *6.231 Dynamic Programming*, MIT OpenCourseWare, automne 2015 — cours 5 |
| **Difficulté** | Fondamental — trois familles de problèmes à structure remarquable |
| **Temps d'étude estimé** | 1 h 45 |
| **Prérequis** | Fiche 44 (algorithme DP), fiche 46 (structure de la politique optimale) |
| **Concepts clés** | Problème d'arrêt, région d'arrêt et de continuation, vente d'actif, seuil décroissant, régions d'arrêt emboîtées, ordonnancement, argument d'échange, politique d'indice, contrôle minimax |
| **Poids à l'examen** | L'**argument d'échange** du problème du quiz est l'exercice type par excellence : court, astucieux, et généralisable. La **structure à seuil** des problèmes d'arrêt en est le pendant en continu. |

## 🎯 Vue d'ensemble

Trois familles où la DP ne se contente pas de calculer : elle **révèle une structure**.

```
ARRÊT OPTIMAL     la politique est une PARTITION de l'espace d'états
                  en région d'ARRÊT et région de CONTINUATION
ORDONNANCEMENT    parfois une POLITIQUE D'INDICE : un nombre par tâche, on trie
MINIMAX           l'aléa n'est plus moyenné mais ADVERSE : min–max au lieu de min–E
```

Dans chaque cas, on gagne beaucoup plus qu'un algorithme : on obtient une **forme** de solution — un seuil, un tri, une règle — qui se calcule en quelques opérations et s'interprète immédiatement.

## 🔴 Concept 1 — Problèmes d'arrêt purs

**Deux commandes seulement.**

- **Arrêter** : encourir un coût d'arrêt **unique**, et passer dans un état d'arrêt **absorbant et sans coût** ;
- **Continuer** : évoluer selon $x_{k+1}=f_k(x_k,w_k)$ en encourant le **coût par étape**.

> **La conséquence structurelle.** *Chaque politique consiste en une partition de l'ensemble des états $x_k$ en deux régions* : la **région d'arrêt**, où l'on s'arrête, et la **région de continuation**, où l'on continue. On ne cherche donc pas une fonction quelconque : on cherche une **frontière**.

C'est ce qui rend ces problèmes si maniables — et si présents en finance (exercice d'une option américaine), en recherche d'emploi, en essais cliniques séquentiels.

## 🔴 Concept 2 — L'exemple de la vente d'un actif

**Le problème.** Une personne possède un actif. Aux instants $k=0,1,\dots,N-1$ elle reçoit une **offre aléatoire** $w_k$. Elle peut :

- **accepter** $w_k$ et placer l'argent à un taux d'intérêt fixe $r$ ;
- **refuser** $w_k$ et attendre $w_{k+1}$.

Elle **doit accepter la dernière offre** $w_{N-1}$.

**Algorithme DP** ($x_k$ : l'offre courante, $T$ : l'état d'arrêt) :

$$J_N(x_N) = \begin{cases} x_N & \text{si } x_N\neq T\\ 0 & \text{si } x_N = T\end{cases}$$

$$J_k(x_k) = \begin{cases} \max\big\{(1+r)^{N-k}x_k,\ \mathbb{E}\{J_{k+1}(w_k)\}\big\} & \text{si } x_k\neq T\\ 0 & \text{si } x_k = T\end{cases}$$

**Comment lire le maximum.** Le premier terme $(1+r)^{N-k}x_k$ est ce que rapporte **accepter maintenant** et placer jusqu'à $N$ ; le second $\mathbb{E}\{J_{k+1}(w_k)\}$ est la valeur espérée de **refuser** et de jouer de façon optimale ensuite.

**La politique optimale est à seuil.**

$$\text{accepter } x_k \text{ si } x_k>\alpha_k, \qquad \text{refuser si } x_k<\alpha_k, \qquad\text{où}\qquad \alpha_k = \frac{\mathbb{E}\{J_{k+1}(w_k)\}}{(1+r)^{N-k}}$$

### Le seuil décroît avec le temps

> **Résultat.** $\alpha_k\geq\alpha_{k+1}$ pour tout $k$ : **on devient de moins en moins exigeant à mesure qu'on s'approche de la fin.**

**Preuve (celle du cours).** Posons, pour $x_k\neq T$,

$$V_k(x_k) = \frac{J_k(x_k)}{(1+r)^{N-k}}$$

la valeur **actualisée à l'instant $k$**. L'algorithme DP devient alors

$$V_N(x_N)=x_N, \qquad V_k(x_k)=\max\Big\{x_k,\ \frac{1}{1+r}\,\mathbb{E}_w\{V_{k+1}(w)\}\Big\}$$

et l'on a $\alpha_k = \mathbb{E}_w\{V_{k+1}(w)\}/(1+r)$. **Il suffit donc de montrer que $V_k(x)\geq V_{k+1}(x)$ pour tous $x$ et $k$.** On part de $V_{N-1}(x)\geq V_N(x)$ — immédiat, puisque $V_{N-1}$ est un maximum dont $x$ est l'un des termes — puis on utilise la **propriété de monotonie de la DP** : si deux fonctions de coût-à-venir sont ordonnées à l'étape $k+1$, leurs images par l'opérateur de Bellman le restent à l'étape $k$. Q.E.D.

> **Le renversement de perspective.** Le changement de variable $V_k = J_k/(1+r)^{N-k}$ élimine le facteur d'actualisation qui dépendait du temps, et transforme une récurrence à coefficients variables en une récurrence **stationnaire**. C'est exactement le geste qui prépare le passage à l'horizon infini.

**Le comportement asymptotique.** *Si $w$ est **bornée**, alors $\alpha_k\to\bar\alpha$ quand $k\to-\infty$.* Cela **suggère qu'en horizon infini la politique optimale est stationnaire** — un seuil unique, indépendant du temps. C'est la porte d'entrée du chapitre sur l'horizon infini.

## 🟠 Concept 3 — Problèmes d'arrêt généraux

**Le cadre.** À l'instant $k$, on peut **arrêter** au coût $t(x_k)$, ou **choisir une commande** $u_k\in U(x_k)$ et continuer :

$$J_N(x_N)=t(x_N)$$

$$J_k(x_k)=\min\Big\{\underbrace{t(x_k)}_{\text{arrêter}},\ \underbrace{\min_{u_k\in U(x_k)}\mathbb{E}\big\{g(x_k,u_k,w_k)+J_{k+1}\big(f(x_k,u_k,w_k)\big)\big\}}_{\text{continuer}}\Big\}$$

**La région d'arrêt à l'instant $k$.** Il est optimal de s'arrêter en $x$ si

$$T_k = \Big\{x \ \Big|\ t(x)\leq \min_{u\in U(x)}\mathbb{E}\big\{g(x,u,w)+J_{k+1}\big(f(x,u,w)\big)\big\}\Big\}$$

**Les régions d'arrêt sont emboîtées.** Puisque $J_{N-1}(x)\leq J_N(x)$, la monotonie de la DP donne $J_k(x)\leq J_{k+1}(x)$ pour tout $k$, d'où

$$T_0\subseteq T_1\subseteq\cdots\subseteq T_k\subseteq T_{k+1}\subseteq\cdots\subseteq T_{N-1}$$

> **La lecture.** Plus on s'approche de l'horizon, **plus la région d'arrêt s'agrandit** : il reste moins d'occasions futures, donc on s'arrête plus volontiers. C'est le même phénomène que le seuil décroissant $\alpha_k$ de la vente d'actif.

**Le cas intéressant.** *Celui où toutes les régions $T_k$ sont **égales** — à $T_{N-1}$, l'ensemble où il vaut mieux s'arrêter que de faire un pas puis s'arrêter.* On peut montrer que c'est le cas si

$$f(x,u,w)\in T_{N-1} \qquad \text{pour tout } x\in T_{N-1},\ u\in U(x),\ w$$

⚠️ La condition dit que **$T_{N-1}$ est absorbante** : une fois dans la région d'arrêt, la dynamique ne peut plus en sortir. Alors la règle « s'arrêter dans $T_{N-1}$ » est optimale **à tout instant**, et la politique devient **stationnaire** — un seul ensemble à calculer au lieu de $N$.

## 🔴 Concept 4 — Problèmes d'ordonnancement

**Le cadre.** On dispose d'un ensemble de tâches à exécuter, l'ordre étant à choisir. **Les coûts dépendent de l'ordre.** Il peut y avoir de l'incertitude stochastique, ainsi que des contraintes de précédence et de disponibilité de ressources.

> *Certains des problèmes combinatoires les plus difficiles sont de ce type* — voyageur de commerce, tournées de véhicules.

**Mais certains problèmes particuliers admettent une méthode de résolution quasi analytique.** Le cours en distingue deux.

| Méthode | Principe | Exige |
|---|---|---|
| **Politique d'indice** | chaque tâche possède un « **indice de coût** » facile à calculer ; il est optimal de choisir celle d'indice minimal | — (problèmes de bandits manchots) |
| **Argument d'échange** | partir d'un ordonnancement, **échanger deux tâches adjacentes** et regarder ce qui se passe | l'existence d'une politique optimale **en boucle ouverte** |

⚠️ **L'argument d'échange n'est pas universel** : il exige qu'une politique optimale **en boucle ouverte** existe, c'est-à-dire que l'ordre puisse être fixé à l'avance sans rien observer (fiche 44). Si l'ordre optimal dépendait de ce qui se produit en cours de route, l'échange n'aurait pas de sens.

### L'exemple du quiz

**Le problème.** Une liste de $N$ questions. Si la question $i$ reçoit une réponse correcte — ce qui arrive avec probabilité $p_i$ — on reçoit la récompense $R_i$ ; sinon **le quiz s'arrête**. Choisir l'ordre des questions pour maximiser la récompense espérée.

**L'argument d'échange, en trois lignes.** Soient $i$ et $j$ les $k$-ième et $(k+1)$-ième questions d'une liste **ordonnée de façon optimale** :

$$L = (i_0,\dots,i_{k-1},\ i,\ j,\ i_{k+2},\dots,i_{N-1})$$

La récompense espérée se décompose en

$$\mathbb{E}\{\text{récompense de } L\} = \mathbb{E}\{\text{récompense de } (i_0,\dots,i_{k-1})\} + p_{i_0}\cdots p_{i_{k-1}}\big(p_iR_i+p_ip_jR_j\big) + p_{i_0}\cdots p_{i_{k-1}}p_ip_j\,\mathbb{E}\{\text{récompense de } (i_{k+2},\dots)\}$$

Considérons maintenant la liste $L'$ où $i$ et $j$ sont **échangées**. Les premier et troisième termes sont **identiques** — le préfixe est le même, et le suffixe est atteint avec la même probabilité $p_ip_j$ dans les deux cas. Comme $L$ est optimale, $\mathbb{E}\{L\}\geq\mathbb{E}\{L'\}$, ce qui se réduit à

$$p_iR_i+p_ip_jR_j \geq p_jR_j+p_jp_iR_i$$

soit, après réarrangement,

$$\boxed{\ \frac{p_iR_i}{1-p_i} \geq \frac{p_jR_j}{1-p_j}\ }$$

> **La règle d'ordonnancement.** Il faut poser les questions **par indice $\dfrac{p_iR_i}{1-p_i}$ décroissant**. C'est une **politique d'indice** : on attribue un nombre à chaque tâche, on trie, et c'est fini — $N\log N$ opérations au lieu des $N!$ ordres possibles.

**Comment lire l'indice.** Le numérateur $p_iR_i$ est le **gain espéré** de la question. Le dénominateur $1-p_i$ est la **probabilité d'interruption** : plus une question risque de tout arrêter, plus elle est pénalisée. On veut donc les questions **rentables** et **sûres** d'abord — et l'indice dose exactement l'arbitrage.

## 🟠 Concept 5 — Contrôle minimax

**Le cadre.** On reprend le problème de base, à ceci près que la perturbation $w_k$, **au lieu d'être aléatoire, est seulement connue pour appartenir à un ensemble donné** $W_k(x_k,u_k)$.

**Le coût à minimiser** devient un **pire cas** :

$$J_\pi(x_0) = \max_{\substack{w_k\in W_k(x_k,\mu_k(x_k))\\ k=0,\dots,N-1}}\Big[g_N(x_N)+\sum_{k=0}^{N-1}g_k\big(x_k,\mu_k(x_k),w_k\big)\Big]$$

**L'algorithme DP** prend la forme

$$J_N(x_N)=g_N(x_N)$$

$$\boxed{\ J_k(x_k)=\min_{u_k\in U(x_k)}\ \max_{w_k\in W_k(x_k,u_k)}\Big[g_k(x_k,u_k,w_k)+J_{k+1}\big(f_k(x_k,u_k,w_k)\big)\Big]\ }$$

> **La seule différence avec le cas stochastique : $\mathbb{E}_{w_k}$ devient $\max_{w_k}$.** Toute la structure — récurrence à rebours, principe d'optimalité, politique en boucle fermée — est **inchangée**. La dérivation de l'algorithme est *similaire à celle du cas stochastique*.

**L'ordre $\min$ puis $\max$ compte autant qu'en stochastique.** On choisit $u_k$ **avant** de connaître $w_k$, et la nature (ou l'adversaire) choisit ensuite le pire $w_k$ **sachant** $u_k$. C'est la même asymétrie qu'à la fiche 44 — et c'est le lien direct avec l'optimisation robuste de la fiche 32, où l'on minimisait déjà un pire cas sur une famille de modèles.

⚠️ **Le minimax est pessimiste par construction.** Il protège contre la pire réalisation, aussi improbable soit-elle. C'est adapté quand l'aléa est réellement adverse (jeux, sûreté) ou quand on ne connaît pas la loi de $w_k$ ; c'est excessivement conservateur quand on la connaît et qu'on peut moyenner.

### Comment résoudre l'exercice type (protocole)

1. **Reconnaître la famille** : deux commandes dont une absorbante $\to$ arrêt ; ordre de tâches $\to$ ordonnancement ; aléa dans un ensemble $\to$ minimax.
2. **Pour un problème d'arrêt** : écrire $J_k = \min\{\text{arrêter},\ \text{continuer}\}$ et identifier la **région d'arrêt** $T_k$.
3. **Chercher la structure à seuil** : si l'état est scalaire et le terme « continuer » indépendant de $x_k$, la règle est « arrêter au-dessus (ou en dessous) d'un seuil ».
4. **Vérifier la monotonie** : $J_k\leq J_{k+1}$ donne $T_k\subseteq T_{k+1}$, donc des seuils monotones en temps.
5. **Tester l'absorption** : si $f(x,u,w)\in T_{N-1}$ pour tout $x\in T_{N-1}$, la politique est **stationnaire**.
6. **Pour un ordonnancement** : vérifier qu'une politique optimale **en boucle ouverte** existe, puis appliquer l'**argument d'échange** sur deux tâches adjacentes.
7. **Lire l'indice** obtenu et trier les tâches selon lui.
8. **Pour un minimax** : remplacer $\mathbb{E}_{w_k}$ par $\max_{w_k\in W_k}$ et dérouler la même récurrence.

### Exercices progressifs

**Niveau 1** — Dans la vente d'actif, pourquoi le seuil $\alpha_k$ décroît-il avec $k$ ?

<details><summary>Correction</summary>

Parce que $\alpha_k = \mathbb{E}_w\{V_{k+1}(w)\}/(1+r)$ et que $V_k(x)\geq V_{k+1}(x)$ pour tout $x$ : la valeur actualisée d'une offre donnée **décroît** quand on s'approche de l'horizon, puisqu'il reste moins d'occasions futures de faire mieux.

**Interprétation.** En début de période on peut se permettre d'être exigeant : il reste beaucoup d'offres à venir. Près de la fin, l'option d'attendre ne vaut presque plus rien, et l'on accepte des offres qu'on aurait refusées plus tôt. À la dernière étape, on accepte **tout**.

</details>

**Niveau 2** — Dans le problème du quiz, deux questions ont $(p_1,R_1)=(0{,}9;\ 10)$ et $(p_2,R_2)=(0{,}5;\ 100)$. Dans quel ordre les poser ?

<details><summary>Correction</summary>

Les indices valent

$$\frac{p_1R_1}{1-p_1} = \frac{0{,}9\times10}{0{,}1}=90, \qquad \frac{p_2R_2}{1-p_2}=\frac{0{,}5\times100}{0{,}5}=100$$

Il faut poser la question **2 d'abord** (indice $100>90$), bien qu'elle soit deux fois moins sûre.

*Vérification directe.* Ordre $(2,1)$ : $0{,}5\times100+0{,}5\times0{,}9\times10 = 50+4{,}5=54{,}5$. Ordre $(1,2)$ : $0{,}9\times10+0{,}9\times0{,}5\times100 = 9+45 = 54$. L'ordre $(2,1)$ est bien meilleur .

*La leçon :* le classement ne se fait ni sur $R_i$ seul, ni sur $p_i$ seul, ni même sur $p_iR_i$ (qui donnerait $9$ contre $50$, même conclusion ici mais pas toujours) — c'est bien $p_iR_i/(1-p_i)$ qui tranche.

</details>

**Niveau 3** — Écrivez la récurrence de contrôle minimax et dites ce qui la distingue du cas stochastique.

<details><summary>Correction</summary>

$$J_N(x_N)=g_N(x_N), \qquad J_k(x_k)=\min_{u_k\in U(x_k)}\max_{w_k\in W_k(x_k,u_k)}\Big[g_k(x_k,u_k,w_k)+J_{k+1}\big(f_k(x_k,u_k,w_k)\big)\Big]$$

**La seule différence** est que $\mathbb{E}_{w_k}$ est remplacé par $\max_{w_k\in W_k(x_k,u_k)}$ : au lieu de moyenner sur la loi de l'aléa, on prend le **pire cas** sur l'ensemble où il vit.

Tout le reste est identique : récurrence à rebours, principe d'optimalité, politique en boucle fermée $\mu_k(x_k)$, et l'ordre $\min$ **puis** $\max$ qui traduit qu'on décide **avant** de subir. On peut d'ailleurs voir le cas stochastique et le cas minimax comme deux instances d'un même schéma, avec deux « opérateurs d'agrégation » différents sur $w_k$.

</details>

**Niveau 4 — type examen** — Démontrez l'emboîtement $T_k\subseteq T_{k+1}$ des régions d'arrêt, et expliquez quand la politique devient stationnaire.

<details><summary>Correction</summary>

**Étape 1 — la monotonie de $J_k$.** À l'avant-dernière étape,

$$J_{N-1}(x)=\min\Big\{t(x),\ \min_u\mathbb{E}\{g+J_N(f)\}\Big\}\leq t(x) = J_N(x)$$

puisque le minimum d'un ensemble contenant $t(x)$ lui est inférieur. Puis, par **monotonie de l'opérateur de Bellman** — si $J_{k+1}\leq J_{k+2}$ ponctuellement, alors leurs images le restent, car $\min$, $\max$ et $\mathbb{E}$ préservent l'ordre — on obtient par récurrence descendante

$$J_k(x)\leq J_{k+1}(x) \qquad \text{pour tout } k \text{ et tout } x$$

**Étape 2 — l'emboîtement.** Par définition,

$$x\in T_k \iff t(x)\leq\min_u\mathbb{E}\big\{g(x,u,w)+J_{k+1}\big(f(x,u,w)\big)\big\}$$

Comme $J_{k+1}\leq J_{k+2}$, le membre de droite pour $k$ est **inférieur ou égal** à celui pour $k+1$. Donc si l'inégalité est vérifiée pour $k$, elle l'est a fortiori pour $k+1$ :

$$T_0\subseteq T_1\subseteq\cdots\subseteq T_{N-1} \qquad\blacksquare$$

**Étape 3 — quand la politique est-elle stationnaire ?** Lorsque toutes les $T_k$ sont **égales** à $T_{N-1}$. Le cours donne une condition suffisante :

$$f(x,u,w)\in T_{N-1} \quad \text{pour tout } x\in T_{N-1},\ u\in U(x),\ w$$

c'est-à-dire que **$T_{N-1}$ est absorbante** pour la dynamique.

**Pourquoi cette condition suffit, intuitivement.** Si l'on est dans $T_{N-1}$, continuer ne peut mener qu'à un état où l'on voudra encore s'arrêter — donc continuer ne fait que retarder l'inévitable en accumulant des coûts. Il est donc optimal de s'arrêter **immédiatement**, à n'importe quel instant : la région d'arrêt ne dépend plus de $k$.

**La portée.** Une politique stationnaire est **une seule règle** au lieu de $N$, calculée une fois. C'est exactement ce qu'on cherchera systématiquement en horizon infini — et l'observation « $\alpha_k\to\bar\alpha$ si $w$ est bornée » du concept 2 en est l'annonce.

</details>

## 🔴 Common mistakes

1. **Chercher une politique compliquée dans un problème d'arrêt** — la solution est une **partition** de l'espace d'états, souvent un simple seuil.
2. **Croire le seuil constant en horizon fini** — $\alpha_k$ **décroît** ; il ne devient constant qu'à l'horizon infini.
3. **Se tromper de sens dans l'emboîtement** — c'est $T_k\subseteq T_{k+1}$ : la région d'arrêt **grandit** quand on approche de la fin.
4. **Appliquer l'argument d'échange sans vérifier l'hypothèse** — il exige l'existence d'une politique optimale **en boucle ouverte**.
5. **Échanger deux tâches non adjacentes** — l'argument ne fonctionne que sur des tâches **voisines**, sinon les termes de préfixe et de suffixe ne se simplifient pas.
6. **Trier sur $p_iR_i$ au lieu de $p_iR_i/(1-p_i)$** — le dénominateur encode le risque d'interruption ; l'oublier donne un ordre faux.
7. **Inverser $\min$ et $\max$ en minimax** — $\min_u\max_w$ signifie « je décide, puis le pire arrive » ; $\max_w\min_u$ donnerait à l'adversaire le désavantage de jouer en premier.
8. **Utiliser le minimax quand on connaît la loi** — il est inutilement pessimiste ; l'espérance est alors le bon critère.

## 📌 Ultimate Review

1. **Arrêt pur** : deux commandes, l'arrêt menant à un état **absorbant sans coût** ; toute politique est une **partition** en région d'arrêt et région de continuation.
2. **Vente d'actif** : $J_k(x_k)=\max\{(1+r)^{N-k}x_k,\ \mathbb{E}\{J_{k+1}(w_k)\}\}$ ; accepter si $x_k>\alpha_k$ avec $\alpha_k=\mathbb{E}\{J_{k+1}(w_k)\}/(1+r)^{N-k}$.
3. Le seuil **décroît** : $\alpha_k\geq\alpha_{k+1}$ — preuve par $V_k=J_k/(1+r)^{N-k}$ et monotonie de la DP.
4. Si $w$ est bornée, $\alpha_k\to\bar\alpha$ : **politique stationnaire** en horizon infini.
5. **Arrêt général** : $J_k=\min\{t(x_k),\ \min_u\mathbb{E}[g+J_{k+1}(f)]\}$ ; région d'arrêt $T_k$.
6. **Emboîtement** $T_0\subseteq\cdots\subseteq T_{N-1}$ ; politique **stationnaire** si $T_{N-1}$ est **absorbante**.
7. **Ordonnancement** : parmi les problèmes combinatoires les plus durs ; deux voies quasi analytiques — **indice** et **argument d'échange** (qui exige une politique optimale en boucle ouverte).
8. **Problème du quiz** : trier par $\dfrac{p_iR_i}{1-p_i}$ **décroissant** — gain espéré divisé par le risque d'interruption.
9. **Minimax** : $\mathbb{E}_{w_k}$ devient $\max_{w_k\in W_k(x_k,u_k)}$ ; tout le reste de la structure DP est inchangé.

**Formulas to know**

$$J_k(x_k)=\max\big\{(1+r)^{N-k}x_k,\ \mathbb{E}\{J_{k+1}(w_k)\}\big\} \qquad \alpha_k=\frac{\mathbb{E}\{J_{k+1}(w_k)\}}{(1+r)^{N-k}}$$

$$T_k=\Big\{x\ \Big|\ t(x)\leq\min_{u}\mathbb{E}\{g+J_{k+1}(f)\}\Big\} \qquad \frac{p_iR_i}{1-p_i}\geq\frac{p_jR_j}{1-p_j}$$

$$J_k(x_k)=\min_{u_k}\max_{w_k\in W_k(x_k,u_k)}\big[g_k+J_{k+1}(f_k)\big]$$

**Methods to know** : le protocole en 8 étapes ; l'argument d'échange sur deux tâches adjacentes ; la preuve de monotonie des seuils et de l'emboîtement des régions d'arrêt.

## 🧠 Active Recall

**Basic** — Quelle forme prend nécessairement une politique dans un problème d'arrêt pur ?

<details><summary>Réponse</summary>

Une **partition** de l'ensemble des états en deux régions : la **région d'arrêt**, où l'on s'arrête, et la **région de continuation**, où l'on continue. On ne cherche donc pas une fonction quelconque mais une **frontière** — souvent, en dimension un, un simple **seuil**.

</details>

**Understanding** — Pourquoi les régions d'arrêt sont-elles emboîtées, et dans quel sens ?

<details><summary>Réponse</summary>

Dans le sens $T_0\subseteq T_1\subseteq\cdots\subseteq T_{N-1}$ : elles **grandissent** avec $k$. La raison est la monotonie $J_k\leq J_{k+1}$, elle-même issue de $J_{N-1}\leq J_N$ et de la monotonie de l'opérateur de Bellman. Comme le coût-à-venir de continuer augmente quand on approche de l'horizon, la condition « il vaut mieux s'arrêter » est satisfaite par de plus en plus d'états.

*Intuitivement :* près de la fin, l'option de continuer vaut de moins en moins cher, donc on s'arrête plus volontiers.

</details>

**Application** — Trois questions de quiz : $(0{,}8;\,5)$, $(0{,}4;\,20)$, $(0{,}6;\,9)$. Quel ordre ?

<details><summary>Réponse</summary>

Indices $p_iR_i/(1-p_i)$ :

$$\frac{0{,}8\times5}{0{,}2}=20, \qquad \frac{0{,}4\times20}{0{,}6}\approx13{,}3, \qquad \frac{0{,}6\times9}{0{,}4}=13{,}5$$

Ordre optimal : **question 1** ($20$), puis **question 3** ($13{,}5$), puis **question 2** ($13{,}3$). Les deux dernières sont très proches, ce qui montre que le critère arbitre finement entre récompense élevée et probabilité de survie.

</details>

**Comparison** — Contrôle stochastique et contrôle minimax : qu'est-ce qui change, qu'est-ce qui reste ?

<details><summary>Réponse</summary>

**Ce qui change** : l'agrégation sur $w_k$. Le stochastique **moyenne** ($\mathbb{E}_{w_k}$, avec une loi connue) ; le minimax prend le **pire cas** ($\max_{w_k\in W_k}$, avec un simple ensemble d'appartenance).

**Ce qui reste** : absolument tout le reste — la récurrence à rebours, le principe d'optimalité, la politique en boucle fermée, et l'ordre $\min_u$ **puis** agrégation sur $w$, qui traduit qu'on décide avant de subir.

</details>

**Exam-style** — Menez l'argument d'échange sur le problème du quiz.

<details><summary>Réponse</summary>

Soit $L=(i_0,\dots,i_{k-1},i,j,i_{k+2},\dots)$ une liste **optimale**, où $i$ et $j$ occupent les positions $k$ et $k+1$. Sa récompense espérée est

$$\mathbb{E}\{L\}=\mathbb{E}\{\text{préfixe}\}+p_{i_0}\cdots p_{i_{k-1}}\big(p_iR_i+p_ip_jR_j\big)+p_{i_0}\cdots p_{i_{k-1}}p_ip_j\,\mathbb{E}\{\text{suffixe}\}$$

Soit $L'$ la même liste avec $i$ et $j$ **échangées**. Les termes de préfixe sont identiques, et les termes de suffixe aussi — le suffixe est atteint avec la probabilité $p_ip_j$ dans les deux ordres. L'optimalité de $L$ donne donc $\mathbb{E}\{L\}\geq\mathbb{E}\{L'\}$, soit

$$p_iR_i+p_ip_jR_j\ \geq\ p_jR_j+p_jp_iR_i$$

En regroupant : $p_iR_i(1-p_j)\geq p_jR_j(1-p_i)$, puis en divisant par $(1-p_i)(1-p_j)>0$ :

$$\frac{p_iR_i}{1-p_i}\geq\frac{p_jR_j}{1-p_j}$$

Toute paire adjacente d'une liste optimale est donc ordonnée par indice décroissant : la liste entière l'est. $\blacksquare$

</details>

## 🃏 Flashcards

| Question | Réponse |
|---|---|
| Les deux commandes d'un problème d'arrêt ? | Arrêter (coût unique, état absorbant sans coût) ou continuer |
| Forme d'une politique d'arrêt ? | Une **partition** : région d'arrêt / région de continuation |
| DP de la vente d'actif ? | $J_k(x_k)=\max\{(1+r)^{N-k}x_k,\ \mathbb{E}\{J_{k+1}(w_k)\}\}$ |
| Seuil d'acceptation ? | $\alpha_k=\mathbb{E}\{J_{k+1}(w_k)\}/(1+r)^{N-k}$ |
| Le seuil est-il constant ? | Non : $\alpha_k\geq\alpha_{k+1}$, il **décroît** |
| Que se passe-t-il si $w$ est bornée ? | $\alpha_k\to\bar\alpha$ : politique stationnaire en horizon infini |
| Sens de l'emboîtement des régions d'arrêt ? | $T_0\subseteq T_1\subseteq\cdots\subseteq T_{N-1}$ |
| Quand la politique d'arrêt est-elle stationnaire ? | Si $T_{N-1}$ est **absorbante** pour la dynamique |
| Les deux voies quasi analytiques en ordonnancement ? | Politique d'**indice** ; **argument d'échange** |
| Que suppose l'argument d'échange ? | L'existence d'une politique optimale en **boucle ouverte** |
| Indice du problème du quiz ? | $p_iR_i/(1-p_i)$, à trier par ordre **décroissant** |
| Comment lire cet indice ? | Gain espéré divisé par le risque d'interruption |
| Que change le contrôle minimax ? | $\mathbb{E}_{w_k}$ devient $\max_{w_k\in W_k(x_k,u_k)}$ |
| Ordre des opérateurs en minimax ? | $\min_u$ **puis** $\max_w$ — on décide avant de subir |
| Quand le minimax est-il justifié ? | Aléa adverse ou loi inconnue ; sinon il est trop pessimiste |
