import { useCallback, useEffect, useState, type ReactNode } from 'react';
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
        e.preventDefault();
        if (!flipped) setFlipped(true);
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
      <div className="srs__top">
        <Button variant="ghost" icon="x" aria-label="Quitter la révision" onClick={onExit} />
        <div
          className="qcm-progress-track"
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={items.length}
        >
          <div
            className="qcm-progress-fill"
            style={{ width: `${((index + 1) / items.length) * 100}%` }}
          />
        </div>
        <span className="srs__count meta">
          {index + 1}/{items.length}
        </span>
      </div>

      <div
        className="flip"
        style={{ position: 'relative' }}
        role="button"
        tabIndex={0}
        aria-label={flipped ? 'Réponse affichée' : 'Appuyer pour révéler la réponse'}
        onClick={() => !flipped && setFlipped(true)}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !flipped) {
            e.preventDefault();
            setFlipped(true);
          }
        }}
      >
        <span className="flip__side-label">{flipped ? 'Réponse' : 'Question'}</span>
        {!flipped ? (
          <>
            <div className="flip__front">{current.front}</div>
            <div className="flip__hint">Appuyer pour révéler</div>
          </>
        ) : (
          <div className="flip__back">{current.back}</div>
        )}
      </div>

      {flipped && (
        <div className="srs__grades">
          {grades.map((g, i) => (
            <button
              key={g.grade}
              type="button"
              className={`grade-btn grade-btn--${g.tone}`}
              onClick={() => grade(g.grade)}
            >
              {g.label}
              <small>{i + 1}</small>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
