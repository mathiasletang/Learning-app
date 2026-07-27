import type { HTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Pad = 'none' | 'md' | 'lg';

const padClass = (p: Pad) => (p === 'md' ? 'surface--pad' : p === 'lg' ? 'surface--pad-lg' : '');

interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  pad?: Pad;
  quiet?: boolean;
  children: ReactNode;
}

/** Surface au repos : élévation minimale, bordure d'un cheveu. */
export function Surface({ pad = 'md', quiet, className = '', children, ...rest }: SurfaceProps) {
  const cls = ['surface', quiet && 'surface--quiet', padClass(pad), className]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={cls} {...rest}>
      {children}
    </div>
  );
}

interface TileLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/** Carte-lien : l'élévation apparaît au survol, la flèche avance. */
export function TileLink({ to, children, className = '', style }: TileLinkProps) {
  return (
    <Link to={to} className={`tile ${className}`} style={style}>
      {children}
    </Link>
  );
}

interface TileButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function TileButton({ className = '', children, ...rest }: TileButtonProps) {
  return (
    <button type="button" className={`tile ${className}`} {...rest}>
      {children}
    </button>
  );
}
