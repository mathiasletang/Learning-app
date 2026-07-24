import type { CSSProperties, ReactNode } from 'react';

interface TagProps {
  children: ReactNode;
  variant?: 'default' | 'good' | 'bad';
  /** Variable CSS de couleur de matière (ex. '--subj-opt') → teinte + texte. */
  colorVar?: string;
  tintVar?: string;
  className?: string;
}

export function Tag({ children, variant = 'default', colorVar, tintVar, className = '' }: TagProps) {
  const style: CSSProperties = {};
  const isSubject = Boolean(colorVar);
  if (colorVar) {
    (style as Record<string, string>)['--_color'] = `var(${colorVar})`;
    (style as Record<string, string>)['--_tint'] = tintVar
      ? `var(${tintVar})`
      : `var(${colorVar}-tint)`;
  }
  const cls = [
    'tag',
    isSubject && 'tag--subject',
    variant === 'good' && 'tag--good',
    variant === 'bad' && 'tag--bad',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <span className={cls} style={style}>
      {children}
    </span>
  );
}
