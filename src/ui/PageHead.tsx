import type { ReactNode } from 'react';

interface Props {
  title: string;
  subtitle?: ReactNode;
  actions?: ReactNode;
}

export function PageHead({ title, subtitle, actions }: Props) {
  return (
    <div className="page-head">
      <div className="row row--between row--wrap" style={{ gap: 'var(--s-4)' }}>
        <div style={{ minWidth: 0 }}>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {actions && <div className="row row--wrap">{actions}</div>}
      </div>
    </div>
  );
}
