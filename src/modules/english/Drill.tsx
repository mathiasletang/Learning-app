import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { LexEntry, LexDirection } from '@/core/types';
import { distractors, fold } from '@/core/lexicon';
import { reviewVocab } from '@/app/actions';
import { Button, Icon } from '@/ui';

export type DrillMode = 'learn' | 'write';

interface Props {
  words: LexEntry[];
  mode: DrillMode;
  direction: LexDirection;
  onExit: (stats: { right: number; total: number }) => void;
}

/** Ce qui est demandé, et ce qu'il faut trouver, selon le sens choisi. */
function sides(w: LexEntry, dir: LexDirection) {
  return dir === 'en-fr'
    ? { prompt: w.t, answer: w.f || w.e, extra: w.e }
    : { prompt: w.f || w.e, answer: w.t, extra: w.e };
}

/** Tolérance de saisie : casse, accents, ponctuation et article initial. */
function matches(input: string, expected: string): boolean {
  const a = fold(input);
  if (!a) return false;
  // Une réponse séparée par des virgules compte si l'une des variantes colle.
  return expected
    .split(/[,;/]/)
    .map((s) => fold(s).replace(/^(to|the|a|an) /, ''))
    .filter(Boolean)
    .some((e) => e === a.replace(/^(to|the|a|an) /, ''));
}

export function Drill({ words, mode, direction, onExit }: Props) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [typed, setTyped] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [right, setRight] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const word = words[index];
  const { prompt, answer, extra } = sides(word, direction);

  /* Quatre propositions, mélangées, stables tant que la question ne change pas. */
  const options = useMemo(() => {
    if (mode !== 'learn') return [];
    const pool = [word, ...distractors(word, 3)];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool;
  }, [word, mode]);

  const isRight = mode === 'learn' ? picked === word.id : revealed && matches(typed, answer);

  const validate = useCallback(
    (choiceId?: string) => {
      if (revealed) return;
      const ok = mode === 'learn' ? choiceId === word.id : matches(typed, answer);
      if (choiceId) setPicked(choiceId);
      setRevealed(true);
      if (ok) setRight((n) => n + 1);
      // Nourrit la répétition espacée : bonne réponse = « Correct », sinon « Encore ».
      void reviewVocab(word.id, ok ? 4 : 0);
    },
    [revealed, mode, word.id, typed, answer],
  );

  const next = useCallback(() => {
    if (index + 1 < words.length) {
      setIndex((i) => i + 1);
      setPicked(null);
      setTyped('');
      setRevealed(false);
      if (mode === 'write') setTimeout(() => inputRef.current?.focus(), 40);
    } else {
      onExit({ right: right + 0, total: words.length });
    }
  }, [index, words.length, mode, onExit, right]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (mode === 'learn' && !revealed && e.key >= '1' && e.key <= '4') {
        const o = options[Number(e.key) - 1];
        if (o) validate(o.id);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (revealed) next();
        else if (mode === 'write') validate();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mode, revealed, options, validate, next]);

  useEffect(() => {
    if (mode === 'write') inputRef.current?.focus();
  }, [mode]);

  return (
    <div className="drill">
      <div className="drill__bar">
        <Button
          variant="ghost"
          icon="x"
          aria-label="Quitter la séance"
          onClick={() => onExit({ right, total: index })}
        />
        <div
          className="run__ticks"
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={words.length}
        >
          {words.map((_, i) => (
            <span
              key={i}
              className={`run__tick ${i < index ? 'run__tick--done' : ''} ${i === index ? 'run__tick--now' : ''}`}
            />
          ))}
        </div>
        <span className="meta tnum">
          {index + 1}/{words.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={word.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="drill__prompt">
            <p className="eyebrow">{direction === 'en-fr' ? 'Anglais' : 'Français'}</p>
            <p className="drill__word">{prompt}</p>
            <p className="meta drill__hint">
              {direction === 'en-fr' ? 'Quelle traduction ?' : 'Quel mot anglais ?'}
            </p>
          </div>

          {mode === 'learn' ? (
            <div className="choices" role="group" aria-label="Propositions">
              {options.map((o, i) => {
                const label = direction === 'en-fr' ? o.f || o.e : o.t;
                let cls = 'choice';
                if (revealed) {
                  if (o.id === word.id) cls += ' choice--right';
                  else if (o.id === picked) cls += ' choice--wrong';
                }
                return (
                  <button
                    key={o.id}
                    type="button"
                    className={cls}
                    disabled={revealed}
                    onClick={() => validate(o.id)}
                  >
                    <span className="choice__key">{i + 1}</span>
                    <span>{label}</span>
                    {revealed && o.id === word.id ? (
                      <Icon name="check" size={17} strokeWidth={1.8} />
                    ) : (
                      <span />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="type-answer">
              <input
                ref={inputRef}
                className="field"
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                placeholder={direction === 'en-fr' ? 'Traduction en français…' : 'Word in English…'}
                disabled={revealed}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                aria-label="Votre réponse"
              />
              {!revealed && (
                <Button variant="primary" onClick={() => validate()}>
                  Vérifier
                </Button>
              )}
            </div>
          )}

          {revealed && (
            <motion.div
              className="verdict"
              style={
                {
                  '--_c': isRight ? 'var(--positive)' : 'var(--negative)',
                } as React.CSSProperties
              }
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
            >
              <span className="eyebrow verdict__label">{isRight ? 'Correct' : 'À revoir'}</span>
              <p className="verdict__answer">{answer}</p>
              {extra && extra !== answer && <p className="verdict__extra">{extra}</p>}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="drill__foot">
        <span className="meta tnum">
          {right} / {index + (revealed ? 1 : 0)} correct
          {right > 1 ? 's' : ''}
        </span>
        <span className="spacer" />
        {revealed && (
          <Button variant="primary" onClick={next} iconRight="arrowRight">
            {index + 1 === words.length ? 'Terminer' : 'Suivant'}
          </Button>
        )}
      </div>
    </div>
  );
}
