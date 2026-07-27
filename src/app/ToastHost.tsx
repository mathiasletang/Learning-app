import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from './store';

export function ToastHost() {
  const toasts = useApp((s) => s.toasts);
  const dismiss = useApp((s) => s.dismissToast);
  return (
    <div className="toast-host" role="status" aria-live="polite">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.button
            key={t.id}
            type="button"
            className="toast"
            onClick={() => dismiss(t.id)}
            aria-label={`${t.title}. Fermer.`}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            layout
          >
            <span className="stack" style={{ gap: 2 }}>
              <span className="toast__title">{t.title}</span>
              {t.desc && <span className="toast__desc">{t.desc}</span>}
            </span>
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
