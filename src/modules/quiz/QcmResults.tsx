import { useState } from 'react';
import type { AnswerEntry } from '@/app/actions';
import { createFlashcardsFromQuestions } from '@/app/actions';
import { useApp } from '@/app/store';
import { Button, Card, Ring, Icon } from '@/ui';

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

  const ringColor = ratio >= 0.8 ? '--good' : ratio >= 0.5 ? '--warn' : '--bad';

  async function convert() {
    const n = await createFlashcardsFromQuestions(errors);
    setConverted(true);
    pushToast({
      title: n > 0 ? `${n} flashcard${n > 1 ? 's' : ''} créée${n > 1 ? 's' : ''}` : 'Déjà en flashcards',
      desc: n > 0 ? 'Retrouve-les dans le module Flashcards.' : undefined,
      icon: '🗂️',
      kind: n > 0 ? 'success' : 'info',
    });
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div className="qcm-result-head">
        <Ring value={ratio} size={128} stroke={12} colorVar={ringColor} label={`${score} sur ${total}`}>
          <div style={{ textAlign: 'center' }}>
            <strong className="tnum" style={{ fontSize: 'var(--fs-display)' }}>
              {score}
            </strong>
            <div className="meta tnum">/ {total}</div>
          </div>
        </Ring>
        <div className="stack" style={{ gap: 'var(--s-1)' }}>
          <h1>{Math.round(ratio * 100)}% de réussite</h1>
          <p className="meta tnum">+{xpEarned} XP gagnés</p>
          {score === total && total > 0 && (
            <p style={{ color: 'var(--good)', fontWeight: 600 }}>Sans-faute, bravo !</p>
          )}
        </div>
      </div>

      <div className="qcm-actions" style={{ marginBottom: 'var(--s-6)' }}>
        <Button variant="primary" icon="refresh" onClick={onRestart}>
          Rejouer
        </Button>
        {errors.length > 0 && (
          <Button variant="secondary" icon="cards" onClick={convert} disabled={converted}>
            {converted ? 'Erreurs converties' : `Convertir ${errors.length} erreur${errors.length > 1 ? 's' : ''} en flashcards`}
          </Button>
        )}
        <span className="spacer" />
        <Button variant="ghost" onClick={onHome}>
          Retour
        </Button>
      </div>

      {errors.length > 0 && (
        <Card pad="lg">
          <h2 style={{ marginBottom: 'var(--s-2)' }}>
            <Icon name="x" size={18} /> Revue des erreurs ({errors.length})
          </h2>
          {errors.map((q) => (
            <div key={q.id} className="qcm-review-item">
              <div dangerouslySetInnerHTML={{ __html: q.question }} />
              <p className="correct" style={{ marginTop: 'var(--s-2)' }}>
                ✓ {q.options[q.answer]}
              </p>
              <div
                className="meta"
                style={{ marginTop: 'var(--s-1)' }}
                dangerouslySetInnerHTML={{ __html: q.explanation }}
              />
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}
