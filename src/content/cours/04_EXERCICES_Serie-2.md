# Exercices — Série 2

Dualité et conditions KKT.

## Exercice 1

Écrire le lagrangien du problème $\min\ f(x)$ sous contrainte $g(x) \leq 0$.

### Corrigé 1

Le lagrangien est $L(x, \lambda) = f(x) + \lambda\, g(x)$ avec $\lambda \geq 0$. La fonction duale est $d(\lambda) = \inf_x L(x, \lambda)$.

## Exercice 2

Énoncer les conditions KKT au point $x^\star$.

### Corrigé 2

$$
\nabla f(x^\star) + \lambda^\star \nabla g(x^\star) = 0, \quad
g(x^\star) \leq 0, \quad
\lambda^\star \geq 0, \quad
\lambda^\star g(x^\star) = 0.
$$

La dernière égalité est la **complémentarité**.
