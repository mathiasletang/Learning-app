# Le décodeur de notations

Un aide-mémoire des symboles rencontrés en optimisation et en analyse.

## Vecteurs et matrices

| Symbole | Sens |
|---|---|
| $x \in \mathbb{R}^n$ | vecteur à $n$ composantes |
| $x \succeq 0$ | chaque composante est $\geq 0$ |
| $A \succeq 0$ | matrice **semi-définie positive** |
| $\langle x, y\rangle = x^\top y$ | produit scalaire |
| $\|x\|_2 = \sqrt{x^\top x}$ | norme euclidienne |

## Analyse

- Gradient : $\nabla f(x) = \left(\frac{\partial f}{\partial x_1}, \dots, \frac{\partial f}{\partial x_n}\right)^\top$.
- Hessienne : $\nabla^2 f(x)$, matrice des dérivées secondes.

La formule de Taylor à l'ordre 2 s'écrit :

$$
f(x + h) = f(x) + \nabla f(x)^\top h + \tfrac{1}{2} h^\top \nabla^2 f(x)\, h + o(\|h\|^2).
$$
