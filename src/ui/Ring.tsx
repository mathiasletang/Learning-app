import type { CSSProperties, ReactNode } from 'react';

interface Props {
  value: number; // 0..1
  size?: number;
  stroke?: number;
  colorVar?: string;
  children?: ReactNode;
  label?: string;
}

/** Anneau de progression SVG (score, objectif…). Accessible via aria-label. */
export function Ring({ value, size = 120, stroke = 10, colorVar, children, label }: Props) {
  const v = Math.max(0, Math.min(1, value));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const style: CSSProperties = {};
  if (colorVar) (style as Record<string, string>)['--_color'] = `var(${colorVar})`;
  return (
    <div className="ring" style={{ position: 'relative', width: size, height: size, ...style }}>
      <svg width={size} height={size} role="img" aria-label={label}>
        <circle
          className="ring__track"
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
        />
        <circle
          className="ring__value"
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={c * (1 - v)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      {children != null && <div className="ring__label">{children}</div>}
    </div>
  );
}
