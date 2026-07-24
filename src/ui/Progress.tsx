import type { CSSProperties } from 'react';

interface Props {
  value: number; // 0..1
  colorVar?: string;
  label?: string;
  className?: string;
}

export function Progress({ value, colorVar, label, className = '' }: Props) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  const style: CSSProperties = {};
  if (colorVar) (style as Record<string, string>)['--_color'] = `var(${colorVar})`;
  return (
    <div
      className={`progress ${className}`}
      style={style}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div className="progress__fill" style={{ width: `${pct}%` }} />
    </div>
  );
}
