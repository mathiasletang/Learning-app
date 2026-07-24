import { useApp } from './store';

export function ToastHost() {
  const toasts = useApp((s) => s.toasts);
  const dismiss = useApp((s) => s.dismissToast);
  if (!toasts.length) return null;
  return (
    <div className="toast-host" role="status" aria-live="polite">
      {toasts.map((t) => (
        <button
          key={t.id}
          type="button"
          className={`toast toast--${t.kind ?? 'info'}`}
          onClick={() => dismiss(t.id)}
          aria-label={`${t.title}. Fermer.`}
        >
          {t.icon && (
            <span className="toast__icon" aria-hidden>
              {t.icon}
            </span>
          )}
          <span className="stack">
            <span className="toast__title">{t.title}</span>
            {t.desc && <span className="toast__desc">{t.desc}</span>}
          </span>
        </button>
      ))}
    </div>
  );
}
