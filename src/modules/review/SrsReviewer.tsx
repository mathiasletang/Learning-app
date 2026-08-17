import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Grade } from '@/core/srs';
import { Button } from '@/ui';
import './review.css';

export interface ReviewItem {
  id: string;
  front: ReactNode;
  back: ReactNode;
}

export interface GradeButton {
  grade: Grade;
  label: string;
  tone: 'again' | 'hard' | 'good' | 'easy';
}

interface Props {
  items: ReviewItem[];
  grades: GradeButton[];
  onGrade: (item: ReviewItem, grade: Grade) => void | Promise<void>;
  onExit: () => void;
}

export function SrsReviewer({ items, grades, onGrade, onExit }: Props) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const current = items[index];

  const grade = useCallback(
    async (g: Grade) => {
      if (!current) return;
      await onGrade(current, g);
      if (index + 1 < items.length) {
        setIndex((i) => i + 1);
        setFlipped(false);
      } else {
        onExit();
      }
    },
    [current, index, items.length, onGrade, onExit],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        /* La carte et les boutons répondent déjà à ces deux touches : les
           traiter ici aussi retournerait la carte une seconde fois. */
        const el = e.target as HTMLElement | null;
        if (el?.closest?.('button, a, [role="button"]')) return;
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (flipped && e.key >= '1' && e.key <= '4') {
        const g = grades[Number(e.key) - 1];
        if (g) grade(g.grade);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [flipped, grades, grade]);

  if (!current) return null;

  return (
    <div className="srs">
      <div className="srs__bar">
        <Button variant="ghost" icon="x" aria-label="Quitter la révision" onClick={onExit} />
        <div
          className="run__ticks"
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={items.length}
        >
          {items.map((_, i) => (
            <span
              key={i}
              className={`run__tick ${i < index ? 'run__tick--done' : ''} ${i === index ? 'run__tick--now' : ''}`}
            />
          ))}
        </div>
        <span className="meta tnum">
          {index + 1}/{items.length}
        </span>
      </div>

      <div
        className="card-face"
        role="button"
        tabIndex={0}
        aria-label={
          flipped
            ? 'Réponse affichée — appuyer pour revenir à la question'
            : 'Appuyer pour révéler la réponse'
        }
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setFlipped((f) => !f);
          }
        }}
      >
        <span className="eyebrow card-face__side">{flipped ? 'Réponse' : 'Question'}</span>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${current.id}-${flipped}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            {flipped ? (
              <div className="card-face__back">{current.back}</div>
            ) : (
              <div className="card-face__front">{current.front}</div>
            )}
          </motion.div>
        </AnimatePresence>
        <span className="micro card-face__hint">
          {flipped ? 'Appuyer pour revenir à la question' : 'Appuyer pour révéler'}
        </span>
      </div>

      <AnimatePresence>
        {flipped && (
          <motion.div
            className="grades"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {grades.map((g, i) => (
              <button
                key={g.grade}
                type="button"
                className={`grade grade--${g.tone}`}
                onClick={() => grade(g.grade)}
              >
                {g.label}
                <small>{i + 1}</small>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
