# Exercices — Série 0

Remise en route. Cherche d'abord, puis déplie le corrigé.

## Exercice 1

Calculer le gradient de $f(x) = \tfrac{1}{2} x^\top A x - b^\top x$ où $A$ est symétrique.

### Corrigé 1

On a $\nabla f(x) = A x - b$. En effet, la dérivée de la forme quadratique $\tfrac12 x^\top A x$ est $A x$ lorsque $A = A^\top$, et celle de $-b^\top x$ est $-b$.

## Exercice 2

Montrer que la fonction $f(x) = \|x\|_2^2$ est convexe.

### Corrigé 2

Sa hessienne vaut $\nabla^2 f(x) = 2 I \succeq 0$. Une fonction deux fois dérivable dont la hessienne est semi-définie positive partout est **convexe**.
