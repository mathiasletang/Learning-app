import { useEffect, useRef, type ReactNode } from 'react';
import { Button } from './Button';

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  wide?: boolean;
  footer?: ReactNode;
}

export function Modal({ open, onClose, title, children, wide, footer }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    // focus dans la boîte pour le clavier
    ref.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="modal__backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`modal ${wide ? 'modal--wide' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        ref={ref}
      >
        {title && (
          <div className="row row--between" style={{ marginBottom: 'var(--s-4)' }}>
            <h2>{title}</h2>
            <Button variant="ghost" icon="x" aria-label="Fermer" onClick={onClose} />
          </div>
        )}
        {children}
        {footer && (
          <div className="row row--between" style={{ marginTop: 'var(--s-5)', gap: 'var(--s-3)' }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
