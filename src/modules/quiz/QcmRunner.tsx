import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const seed = useMemo(() => Math.floor(Math.random() * 1e9), []);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMED_SECONDS);
  const answers = useRef<AnswerEntry[]>([]);
  const startedAt = useRef(Date.now());

  const isTrain = mode === 'train';
  const isTimed = mode === 'timed';
  const q = questions[index];

  const shuffled = useMemo(
    () => shuffleOptions(q.options, q.answer, hashSeed(`${seed}:${q.id}`)),
    [q.id, q.options, q.answer, seed],
  );

  const advance = useCallback(
    (choice: number | null) => {
      answers.current.push({ q, correct: choice !== null && choice === shuffled.answer });
      if (index + 1 < questions.length) {
        setIndex((i) => i + 1);
        setSelected(null);
        setRevealed(false);
        setTimeLeft(TIMED_SECONDS);
      } else {
        onFinish(answers.current, Math.round((Date.now() - startedAt.current) / 1000));
      }
    },
    [index, questions.length, q, shuffled.answer, onFinish],
  );

  useEffect(() => {
    if (!isTimed) return;
    if (timeLeft <= 0) {
      advance(selected);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [isTimed, timeLeft, advance, selected]);

  const choose = useCallback(
    (i: number) => {
      if (isTrain && revealed) return;
      setSelected(i);
      if (isTrain) setRevealed(true);
    },
    [isTrain, revealed],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= '4') {
        const i = Number(e.key) - 1;
        if (i < shuffled.options.length) choose(i);
      } else if (e.key === 'Enter') {
        if (isTrain && !revealed) return;
        advance(selected);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [choose, advance, selected, isTrain, revealed, shuffled.options.length]);

  const isLast = index + 1 === questions.length;
  const right = selected === shuffled.answer;

  return (
    <div className="run">
      <div className="run__bar">
        <Button variant="ghost" icon="x" aria-label="Quitter la séance" onClick={onQuit} />
        <div
          className="run__ticks"
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={questions.length}
        >
          {questions.map((_, i) => (
            <span
              key={i}
              className={`run__tick ${i < index ? 'run__tick--done' : ''} ${i === index ? 'run__tick--now' : ''}`}
            />
          ))}
        </div>
        <span className="meta tnum">
          {index + 1}/{questions.length}
        </span>
        {isTimed && (
          <span
            className={`run__timer ${timeLeft <= 5 ? 'run__timer--low' : ''}`}
            aria-label={`${timeLeft} secondes restantes`}
          >
            {timeLeft}
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">{q.themeLabel}</p>
          <h2 className="question" dangerouslySetInnerHTML={{ __html: q.question }} />

          <div className="answers" role="group" aria-label="Réponses">
            {shuffled.options.map((opt, i) => {
              const isRight = i === shuffled.answer;
              let cls = 'answer';
              let mark: 'check' | 'x' | null = null;
              if (revealed) {
                if (isRight) {
                  cls += ' answer--right';
                  mark = 'check';
                } else if (selected === i) {
                  cls += ' answer--wrong';
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
                  onClick={() => choose(i)}
                >
                  <span className="answer__key">{LETTERS[i]}</span>
                  <span>{opt}</span>
                  {mark ? (
                    <span className="answer__mark">
                      <Icon name={mark} size={17} strokeWidth={1.8} />
                    </span>
                  ) : (
                    <span />
                  )}
                </button>
              );
            })}
          </div>

          {revealed && isTrain && (
            <motion.div
              className="explain"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="eyebrow explain__verdict" style={{ color: right ? 'var(--positive)' : 'var(--negative)' }}>
                {right ? 'Correct' : 'À revoir'}
              </span>
              <div dangerouslySetInnerHTML={{ __html: q.explanation }} />
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="run__foot">
        {mode === 'exam' && <span className="micro">Correction à la fin de la séance</span>}
        <span className="spacer" />
        <Button
          variant="primary"
          disabled={isTrain ? !revealed : false}
          onClick={() => advance(selected)}
          iconRight={isLast ? undefined : 'arrowRight'}
        >
          {isLast ? 'Terminer' : 'Suivant'}
        </Button>
      </div>
    </div>
  );
}
