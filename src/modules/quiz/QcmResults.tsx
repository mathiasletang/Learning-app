import { useState } from 'react';
import { motion } from 'framer-motion';
import type { AnswerEntry } from '@/app/actions';
import { createFlashcardsFromQuestions } from '@/app/actions';
import { useApp } from '@/app/store';
import { Button, Ring, Reveal } from '@/ui';

interface Props {
  answers: AnswerEntry[];
  xpEarned: number;
  onRestart: () => void;
  onHome: () => void;
}

export function QcmResults({ answers, xpEarned, onRestart, onHome }: Props) {
  const score = answers.filter((a) => a.correct).length;
  const total = answers.length;
  const ratio = total ? score / total : 0;
  const errors = answers.filter((a) => !a.correct).map((a) => a.q);
  const pushToast = useApp((s) => s.pushToast);
  const [converted, setConverted] = useState(false);

  const tone = ratio >= 0.8 ? '--positive' : ratio >= 0.5 ? '--accent' : '--negative';
  const verdict =
    ratio === 1
      ? 'Sans faute.'
      : ratio >= 0.8
        ? 'Solide.'
        : ratio >= 0.5
          ? 'En chemin.'
          : 'À reprendre.';

  async function convert() {
    const n = await createFlashcardsFromQuestions(errors);
    setConverted(true);
    pushToast({
      title: n > 0 ? `${n} carte${n > 1 ? 's' : ''} créée${n > 1 ? 's' : ''}` : 'Déjà en flashcards',
      desc: n > 0 ? 'Elles rejoignent votre file de révision.' : undefined,
    });
  }

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      <motion.div
        className="score"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Ring value={ratio} size={124} stroke={2} colorVar={tone} label={`${score} sur ${total}`}>
          <span className="eyebrow">{Math.round(ratio * 100)}%</span>
        </Ring>
        <div>
          <p className="eyebrow">Résultat</p>
          <p className="score__value tnum">
            {score}
            <sub>/{total}</sub>
          </p>
          <h2 style={{ marginTop: 'var(--s-4)' }}>{verdict}</h2>
          <p className="meta tnum" style={{ marginTop: 'var(--s-2)' }}>
            +{xpEarned} XP
          </p>
        </div>
      </motion.div>

      <div className="row row--wrap" style={{ gap: 'var(--s-3)', marginTop: 'var(--s-10)' }}>
        <Button variant="primary" icon="refresh" onClick={onRestart}>
          Rejouer
        </Button>
        {errors.length > 0 && (
          <Button variant="secondary" icon="cards" onClick={convert} disabled={converted}>
            {converted
              ? 'Erreurs converties'
              : `Convertir ${errors.length} erreur${errors.length > 1 ? 's' : ''}`}
          </Button>
        )}
        <span className="spacer" />
        <Button variant="ghost" onClick={onHome}>
          Retour
        </Button>
      </div>

      {errors.length > 0 && (
        <section className="section">
          <div className="section__head">
            <h2>Revue</h2>
            <span className="meta tnum">
              {errors.length} erreur{errors.length > 1 ? 's' : ''}
            </span>
          </div>
          {errors.map((q, i) => (
            <Reveal key={q.id} delay={i * 0.04} y={12}>
              <article className="review">
                <h3 className="review__q" dangerouslySetInnerHTML={{ __html: q.question }} />
                <p className="review__a">{q.options[q.answer]}</p>
                <div className="review__e" dangerouslySetInnerHTML={{ __html: q.explanation }} />
              </article>
            </Reveal>
          ))}
        </section>
      )}
    </div>
  );
}
