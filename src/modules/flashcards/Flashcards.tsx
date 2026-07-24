import { useMemo, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/core/db';
import { toDayStr } from '@/core/date';
import { isMature } from '@/core/srs';
import type { Flashcard } from '@/core/types';
import { reviewFlashcard, createManualFlashcard, deleteFlashcard } from '@/app/actions';
import { PageHead } from '@/ui/PageHead';
import { Button, Card, Modal, Progress, Icon } from '@/ui';
import { SrsReviewer, type ReviewItem, type GradeButton } from '@/modules/review/SrsReviewer';

const GRADES: GradeButton[] = [
  { grade: 0, label: 'Encore', tone: 'again' },
  { grade: 3, label: 'Difficile', tone: 'hard' },
  { grade: 4, label: 'Correct', tone: 'good' },
  { grade: 5, label: 'Facile', tone: 'easy' },
];

export function Flashcards() {
  const today = toDayStr();
  const cards = useLiveQuery(() => db.flashcards.toArray(), [], []);
  const [reviewing, setReviewing] = useState<Flashcard[] | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  const due = useMemo(() => cards.filter((c) => c.due <= today), [cards, today]);
  const mature = useMemo(() => cards.filter((c) => isMature(c)).length, [cards]);
  const cardMap = useMemo(() => new Map(cards.map((c) => [c.id, c])), [cards]);

  if (reviewing && reviewing.length > 0) {
    const items: ReviewItem[] = reviewing.map((c) => ({
      id: c.id,
      front: <span dangerouslySetInnerHTML={{ __html: c.front }} />,
      back: (
        <div>
          <strong dangerouslySetInnerHTML={{ __html: c.back }} />
          {c.expl && <div className="flip__expl" dangerouslySetInnerHTML={{ __html: c.expl }} />}
        </div>
      ),
    }));
    return (
      <SrsReviewer
        items={items}
        grades={GRADES}
        onGrade={async (item, g) => {
          const card = cardMap.get(item.id);
          if (card) await reviewFlashcard(card, g);
        }}
        onExit={() => setReviewing(null)}
      />
    );
  }

  async function addCard() {
    if (!front.trim() || !back.trim()) return;
    await createManualFlashcard(front.trim(), back.trim());
    setFront('');
    setBack('');
    setAddOpen(false);
  }

  return (
    <>
      <PageHead
        title="Flashcards"
        subtitle="Répétition espacée (SM-2). Les erreurs de QCM deviennent des cartes."
        actions={
          <Button variant="secondary" icon="plus" onClick={() => setAddOpen(true)}>
            Nouvelle carte
          </Button>
        }
      />

      <div
        className="grid"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', marginBottom: 'var(--s-6)' }}
      >
        <Card>
          <span className="section-title" style={{ margin: 0 }}>
            À réviser
          </span>
          <strong className="tnum" style={{ fontSize: 'var(--fs-display)', display: 'block' }}>
            {due.length}
          </strong>
        </Card>
        <Card>
          <span className="section-title" style={{ margin: 0 }}>
            Total
          </span>
          <strong className="tnum" style={{ fontSize: 'var(--fs-display)', display: 'block' }}>
            {cards.length}
          </strong>
        </Card>
        <Card>
          <span className="section-title" style={{ margin: 0 }}>
            Mémorisées
          </span>
          <strong className="tnum" style={{ fontSize: 'var(--fs-display)', display: 'block' }}>
            {mature}
          </strong>
          <div style={{ marginTop: 'var(--s-2)' }}>
            <Progress value={cards.length ? mature / cards.length : 0} colorVar="--good" />
          </div>
        </Card>
      </div>

      {due.length > 0 ? (
        <Button variant="primary" icon="play" onClick={() => setReviewing(due)} block>
          Réviser {due.length} carte{due.length > 1 ? 's' : ''}
        </Button>
      ) : (
        <Card pad="lg">
          <div className="row" style={{ gap: 'var(--s-3)' }}>
            <Icon name="check" size={22} />
            <div>
              <strong>Rien à réviser aujourd'hui</strong>
              <p className="meta">Reviens demain, ou ajoute des cartes depuis tes erreurs de QCM.</p>
            </div>
          </div>
        </Card>
      )}

      {cards.length > 0 && (
        <section style={{ marginTop: 'var(--s-8)' }}>
          <div className="section-title">Toutes les cartes ({cards.length})</div>
          <div className="stack" style={{ gap: 'var(--s-2)' }}>
            {cards.map((c) => (
              <Card key={c.id} className="row row--between" style={{ gap: 'var(--s-3)' }}>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis' }}
                    dangerouslySetInnerHTML={{ __html: c.front }}
                  />
                  <div className="meta" dangerouslySetInnerHTML={{ __html: c.back }} />
                </div>
                <div className="row" style={{ gap: 'var(--s-2)', flex: 'none' }}>
                  <span className="meta tnum" title="Intervalle en jours">
                    {c.interval}j
                  </span>
                  <Button
                    variant="ghost"
                    icon="trash"
                    aria-label="Supprimer la carte"
                    onClick={() => deleteFlashcard(c.id)}
                  />
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Nouvelle flashcard"
        footer={
          <>
            <span className="spacer" />
            <Button variant="ghost" onClick={() => setAddOpen(false)}>
              Annuler
            </Button>
            <Button variant="primary" onClick={addCard} disabled={!front.trim() || !back.trim()}>
              Créer
            </Button>
          </>
        }
      >
        <label className="stack" style={{ gap: 'var(--s-2)', marginBottom: 'var(--s-4)' }}>
          <span className="section-title" style={{ margin: 0 }}>
            Recto (question)
          </span>
          <textarea
            className="textarea"
            rows={2}
            value={front}
            onChange={(e) => setFront(e.target.value)}
          />
        </label>
        <label className="stack" style={{ gap: 'var(--s-2)' }}>
          <span className="section-title" style={{ margin: 0 }}>
            Verso (réponse)
          </span>
          <textarea
            className="textarea"
            rows={2}
            value={back}
            onChange={(e) => setBack(e.target.value)}
          />
        </label>
      </Modal>
    </>
  );
}
