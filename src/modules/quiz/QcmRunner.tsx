import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Question, QcmMode } from '@/core/types';
import { shuffleOptions, hashSeed } from '@/core/quiz';
import type { AnswerEntry } from '@/app/actions';
import { Button, Icon } from '@/ui';

const LETTERS = ['A', 'B', 'C', 'D'];
const TIMED_SECONDS = 30;

interface Props {
  questions: Question[];
  mode: QcmMode;
  onFinish: (answers: AnswerEntry[], durationSec: number) => void;
  onQuit: () => void;
}

export function QcmRunner({ questions, mode, onFinish, onQuit }: Props) {
  const sessionSeed = useMemo(() => Math.floor(Math.random() * 1e9), []);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMED_SECONDS);
  const answersRef = useRef<AnswerEntry[]>([]);
  const startRef = useRef(Date.now());

  const isTrain = mode === 'train';
  const isTimed = mode === 'timed';
  const q = questions[index];

  const shuffled = useMemo(
    () => shuffleOptions(q.options, q.answer, hashSeed(`${sessionSeed}:${q.id}`)),
    [q.id, q.options, q.answer, sessionSeed],
  );

  const advance = useCallback(
    (displaySelected: number | null) => {
      const correct = displaySelected !== null && displaySelected === shuffled.answer;
      answersRef.current.push({ q, correct });
      if (index + 1 < questions.length) {
        setIndex((i) => i + 1);
        setSelected(null);
        setRevealed(false);
        setTimeLeft(TIMED_SECONDS);
      } else {
        const dur = Math.round((Date.now() - startRef.current) / 1000);
        onFinish(answersRef.current, dur);
      }
    },
    [index, questions.length, q, shuffled.answer, onFinish],
  );

  // Timer du mode chronométré : 30 s / question, avance automatique.
  useEffect(() => {
    if (!isTimed) return;
    if (timeLeft <= 0) {
      advance(selected);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [isTimed, timeLeft, advance, selected]);

  const handleSelect = useCallback(
    (i: number) => {
      if (isTrain && revealed) return;
      setSelected(i);
      if (isTrain) setRevealed(true);
    },
    [isTrain, revealed],
  );

  // Clavier : 1-4 pour choisir, Entrée pour valider/continuer.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= '4') {
        const i = Number(e.key) - 1;
        if (i < shuffled.options.length) handleSelect(i);
      } else if (e.key === 'Enter') {
        if (isTrain && !revealed) return;
        advance(selected);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleSelect, advance, selected, isTrain, revealed, shuffled.options.length]);

  const canAdvance = isTrain ? revealed : true;
  const isLast = index + 1 === questions.length;

  return (
    <div className="qcm-runner">
      <div className="qcm-topline">
        <Button variant="ghost" icon="x" aria-label="Quitter la session" onClick={onQuit} />
        <div
          className="qcm-progress-track"
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={questions.length}
        >
          <div
            className="qcm-progress-fill"
            style={{ width: `${((index + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="meta tnum" style={{ minWidth: 54, textAlign: 'right' }}>
          {index + 1}/{questions.length}
        </span>
        {isTimed && (
          <span
            className={`qcm-timer ${timeLeft <= 5 ? 'qcm-timer--low' : ''}`}
            aria-label={`${timeLeft} secondes restantes`}
          >
            {timeLeft}s
          </span>
        )}
      </div>

      <p className="meta">Question {index + 1}</p>
      <h2 className="qcm-question" dangerouslySetInnerHTML={{ __html: q.question }} />

      <div className="qcm-options" role="group" aria-label="Réponses possibles">
        {shuffled.options.map((opt, i) => {
          const isCorrect = i === shuffled.answer;
          let cls = 'qcm-option';
          let mark: 'check' | 'x' | null = null;
          if (revealed) {
            if (isCorrect) {
              cls += ' qcm-option--correct';
              mark = 'check';
            } else if (selected === i) {
              cls += ' qcm-option--wrong';
              mark = 'x';
            }
          }
          return (
            <button
              key={i}
              type="button"
              className={cls}
              aria-pressed={selected === i}
              disabled={revealed}
              onClick={() => handleSelect(i)}
            >
              <span className="qcm-option__key" aria-hidden>
                {LETTERS[i]}
              </span>
              <span>{opt}</span>
              {mark && (
                <span className={`qcm-option__mark ${isCorrect ? '' : ''}`} aria-hidden>
                  <Icon name={mark} size={20} />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {revealed && isTrain && (
        <div className="qcm-explain">
          <strong>{selected === shuffled.answer ? '✓ Correct' : '✕ À revoir'}</strong>
          <div
            style={{ marginTop: 'var(--s-2)' }}
            dangerouslySetInnerHTML={{ __html: q.explanation }}
          />
        </div>
      )}

      <div className="qcm-actions">
        {!isTrain && !isTimed && (
          <span className="meta" style={{ alignSelf: 'center' }}>
            {mode === 'exam' ? 'Correction à la fin' : ''}
          </span>
        )}
        <span className="spacer" />
        <Button
          variant="primary"
          disabled={!canAdvance}
          onClick={() => advance(selected)}
          iconRight={isLast ? undefined : 'chevronRight'}
        >
          {isLast ? 'Terminer' : 'Suivant'}
        </Button>
      </div>
    </div>
  );
}
