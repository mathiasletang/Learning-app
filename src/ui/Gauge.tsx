import type { CSSProperties } from 'react';

interface Props {
  value: number; // 0..1
  colorVar?: string;
  label?: string;
  thick?: boolean;
  className?: string;
}

/** Jauge : un simple filet qui se remplit. Discrète par principe. */
export function Gauge({ value, colorVar, label, thick, className = '' }: Props) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  const style: CSSProperties = {};
  if (colorVar) (style as Record<string, string>)['--_c'] = `var(${colorVar})`;
  return (
    <div
      className={`gauge ${thick ? 'gauge--thick' : ''} ${className}`}
      style={style}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div className="gauge__fill" style={{ width: `${pct}%` }} />
    </div>
  );
}
