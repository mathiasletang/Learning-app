import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  actions?: ReactNode;
  /** Titre en très grand format (pages d'entrée). */
  display?: boolean;
}

/**
 * En-tête éditorial : surtitre en petites capitales, titre serif large,
 * chapô en mesure courte. Apparition douce, décalée.
 */
export function PageHead({ eyebrow, title, lead, actions, display }: Props) {
  return (
    <header className="page-head">
      <div className="page-head__main">
        {eyebrow && (
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          className={display ? 'page-head__display' : undefined}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h1>
        {lead && (
          <motion.p
            className="lead"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {lead}
          </motion.p>
        )}
      </div>
      {actions && (
        <motion.div
          className="page-head__actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.18 }}
        >
          {actions}
        </motion.div>
      )}
    </header>
  );
}
