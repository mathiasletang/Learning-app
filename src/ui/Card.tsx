import type { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  pad?: 'none' | 'md' | 'lg';
  children: ReactNode;
}

export function Card({ pad = 'md', className = '', children, ...rest }: CardProps) {
  const cls = ['card', pad === 'md' && 'card--pad', pad === 'lg' && 'card--pad-lg', className]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={cls} {...rest}>
      {children}
    </div>
  );
}

interface CardButtonProps extends HTMLAttributes<HTMLButtonElement> {
  pad?: 'none' | 'md' | 'lg';
  children: ReactNode;
}

/** Carte cliquable (bouton) — pour listes navigables au tap/clavier. */
export function CardButton({ pad = 'md', className = '', children, ...rest }: CardButtonProps) {
  const cls = [
    'card',
    'card--interactive',
    pad === 'md' && 'card--pad',
    pad === 'lg' && 'card--pad-lg',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
