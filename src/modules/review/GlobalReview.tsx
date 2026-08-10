import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/core/db';
import { toDayStr } from '@/core/date';
import type { Flashcard } from '@/core/types';
import { wordById } from '@/core/lexicon';
import { shortTheme } from '@/core/lexicon-meta';
import { reviewFlashcard, reviewVocab } from '@/app/actions';
import { Icon, PageHead } from '@/ui';
import { SrsReviewer, type ReviewItem, type GradeButton } from './SrsReviewer';

const GRADES: GradeButton[] = [
  { grade: 0, label: 'Non', tone: 'again' },
  { grade: 3, label: 'À peu près', tone: 'hard' },
  { grade: 4, label: 'Oui', tone: 'good' },
  { grade: 5, label: 'Facile', tone: 'easy' },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * La séance du jour : une seule file, cartes et mots mélangés.
 * C'est l'action quotidienne n° 1 — un clic depuis l'accueil, rien à choisir.
 */
export function GlobalReview() {
  const today = toDayStr();
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  const dueCards = useLiveQuery(
    () => db.flashcards.where('due').belowOrEqual(today).toArray(),
    [today],
    null,
  );
  const dueVocabRows = useLiveQuery(
    () => db.vocabSrs.where('due').belowOrEqual(today).toArray(),
    [today],
    null,
  );

  const cardById = useMemo(
    () => new Map((dueCards ?? []).map((c) => [c.id, c] as [string, Flashcard])),
    [dueCards],
  );

  /* La file est figée au premier chargement : réviser une carte ne doit pas
     réordonner ce qui reste. */
  const queue = useMemo<ReviewItem[] | null>(() => {
    if (dueCards === null || dueVocabRows === null) return null;
    const cards: ReviewItem[] = dueCards.map((c) => ({
      id: c.id,
      front: <span dangerouslySetInnerHTML={{ __html: c.front }} />,
      back: (
        <div>
          <strong dangerouslySetInnerHTML={{ __html: c.back }} />
          {c.expl && <div className="card-face__expl" dangerouslySetInnerHTML={{ __html: c.expl }} />}
        </div>
      ),
    }));
    const words: ReviewItem[] = dueVocabRows
      .filter((r) => r.id.startsWith('w:'))
      .map((r) => wordById(r.id))
      .filter((w) => w !== undefined)
      .map((w) => ({
        id: w.id,
        front: (
          <>
            <span className="card-face__term">{w.t}</span>
            <span className="micro card-face__theme">{shortTheme(w.theme)}</span>
          </>
        ),
        back: (
          <>
            <span className="card-face__term">{w.f || w.e}</span>
            {w.e && w.e !== (w.f || w.e) && <span className="card-face__gloss">{w.e}</span>}
          </>
        ),
      }));
    return shuffle([...cards, ...words]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dueCards === null, dueVocabRows === null]);

  if (queue === null) return <p className="meta">Chargement…</p>;

  if (done || queue.length === 0) {
    return (
      <>
        <PageHead
          eyebrow="Révision"
          title={done ? 'Séance terminée.' : 'Mémoire à jour.'}
          display
          lead={
            done
              ? `${count} élément${count > 1 ? 's' : ''} revu${count > 1 ? 's' : ''}. La répétition espacée reprogramme chacun au bon moment.`
              : "Rien n'est dû aujourd'hui. Les cartes et les mots reviendront quand l'oubli approchera."
          }
        />
        <div className="row row--wrap" style={{ gap: 'var(--s-3)' }}>
          <Link to="/" className="btn btn--primary">
            <Icon name="home" size={16} /> Accueil
          </Link>
          <Link to="/anglais" className="btn btn--secondary">
            Apprendre des mots
          </Link>
        </div>
      </>
    );
  }

  return (
    <SrsReviewer
      items={queue}
      grades={GRADES}
      onGrade={async (item, g) => {
        if (item.id.startsWith('w:')) {
          await reviewVocab(item.id, g);
        } else {
          const card = cardById.get(item.id);
          if (card) await reviewFlashcard(card, g);
        }
        setCount((n) => n + 1);
      }}
      onExit={() => setDone(true)}
    />
  );
}
