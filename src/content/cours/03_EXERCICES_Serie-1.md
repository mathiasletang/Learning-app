# Exercices — Série 1

Ensembles et fonctions convexes.

## Exercice 1

Montrer que l'intersection de deux ensembles convexes est convexe.

### Corrigé 1

Soient $C_1, C_2$ convexes et $x, y \in C_1 \cap C_2$. Pour $\theta \in [0,1]$, $\theta x + (1-\theta) y$ appartient à $C_1$ (convexe) et à $C_2$ (convexe), donc à leur intersection. $\square$

## Exercice 2

La fonction $f(x) = \max(x_1, x_2)$ est-elle convexe ?

### Corrigé 2

Oui : un maximum ponctuel de fonctions convexes (ici linéaires) est convexe. On vérifie l'inégalité $f(\theta x + (1-\theta) y) \leq \theta f(x) + (1-\theta) f(y)$.
