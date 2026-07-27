import type { CSSProperties, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Variable CSS de matière, ex. '--m-opt'. Affiche une pastille colorée. */
  colorVar?: string;
  strong?: boolean;
  className?: string;
}

/** Étiquette éditoriale : petites capitales espacées + pastille discrète. */
export function Tag({ children, colorVar, strong, className = '' }: Props) {
  const style: CSSProperties = {};
  if (colorVar) (style as Record<string, string>)['--_c'] = `var(${colorVar})`;
  return (
    <span className={`tag ${strong ? 'tag--strong' : ''} ${className}`} style={style}>
      {colorVar && <span className="tag__dot" aria-hidden />}
      {children}
    </span>
  );
}
