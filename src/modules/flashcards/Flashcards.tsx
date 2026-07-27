import { useMemo, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/core/db';
import { toDayStr } from '@/core/date';
import { isMature } from '@/core/srs';
import type { Flashcard } from '@/core/types';
import { reviewFlashcard, createManualFlashcard, deleteFlashcard } from '@/app/actions';
import { Button, Modal, Gauge, PageHead, Icon, Reveal } from '@/ui';
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
  const mature = useMemo(() => cards.filter(isMature).length, [cards]);
  const byId = useMemo(() => new Map(cards.map((c) => [c.id, c])), [cards]);

  if (reviewing?.length) {
    const items: ReviewItem[] = reviewing.map((c) => ({
      id: c.id,
      front: <span dangerouslySetInnerHTML={{ __html: c.front }} />,
      back: (
        <div>
          <strong dangerouslySetInnerHTML={{ __html: c.back }} />
          {c.expl && <div className="card-face__expl" dangerouslySetInnerHTML={{ __html: c.expl }} />}
        </div>
      ),
    }));
    return (
      <SrsReviewer
        items={items}
        grades={GRADES}
        onGrade={async (item, g) => {
          const card = byId.get(item.id);
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
        eyebrow="Répétition espacée"
        title={due.length ? `${due.length} carte${due.length > 1 ? 's' : ''} à revoir` : 'Mémoire à jour'}
        display
        lead={
          due.length
            ? 'La bonne carte au bon moment : l’algorithme choisit l’instant où vous êtes sur le point d’oublier.'
            : 'Rien n’est dû aujourd’hui. Les cartes reviendront quand l’oubli approchera.'
        }
        actions={
          <Button variant="secondary" icon="plus" onClick={() => setAddOpen(true)}>
            Nouvelle carte
          </Button>
        }
      />

      {due.length > 0 && (
        <Button variant="primary" icon="play" onClick={() => setReviewing(due)}>
          Commencer la révision
        </Button>
      )}

      <section className="section">
        <div className="section__head">
          <h2>État de la mémoire</h2>
          <span className="meta tnum">{cards.length} cartes</span>
        </div>
        <div className="figures">
          <div>
            <span className="figure__value tnum">{due.length}</span>
            <span className="eyebrow figure__label">Dues</span>
          </div>
          <div>
            <span className="figure__value tnum">{cards.length}</span>
            <span className="eyebrow figure__label">Total</span>
          </div>
          <div>
            <span className="figure__value tnum">{mature}</span>
            <span className="eyebrow figure__label">Mémorisées</span>
            <span className="micro figure__note">intervalle ≥ 21 jours</span>
          </div>
          <div>
            <span className="figure__value tnum">
              {cards.length ? `${Math.round((mature / cards.length) * 100)}%` : '—'}
            </span>
            <span className="eyebrow figure__label">Rétention</span>
            <span style={{ display: 'block', marginTop: 'var(--s-3)', maxWidth: 96 }}>
              <Gauge value={cards.length ? mature / cards.length : 0} colorVar="--positive" />
            </span>
          </div>
        </div>
      </section>

      {cards.length > 0 ? (
        <section className="section">
          <div className="section__head">
            <h2>Toutes les cartes</h2>
          </div>
          <div className="banklist">
            {cards.map((c, i) => (
              <Reveal key={c.id} delay={Math.min(i, 8) * 0.03} y={10}>
                <div className="bankrow" style={{ cursor: 'default' }}>
                  <span className="bankrow__index">{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ minWidth: 0 }}>
                    <span
                      style={{ display: 'block', fontWeight: 500 }}
                      dangerouslySetInnerHTML={{ __html: c.front }}
                    />
                    <span
                      className="micro"
                      style={{ display: 'block', marginTop: 'var(--s-2)' }}
                      dangerouslySetInnerHTML={{ __html: c.back }}
                    />
                  </span>
                  <span className="meta tnum">{c.interval} j</span>
                  <button
                    type="button"
                    className="btn btn--ghost btn--icon"
                    aria-label="Supprimer la carte"
                    onClick={() => deleteFlashcard(c.id)}
                  >
                    <Icon name="trash" size={16} />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      ) : (
        <section className="section">
          <div className="empty">
            <h3>Aucune carte pour l'instant</h3>
            <p className="meta">
              Les questions manquées en séance de QCM deviennent des cartes, d'un seul geste.
            </p>
          </div>
        </section>
      )}

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Nouvelle carte"
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
        <label className="stack" style={{ gap: 'var(--s-3)', marginBottom: 'var(--s-6)' }}>
          <span className="eyebrow">Recto — la question</span>
          <textarea className="field" rows={2} value={front} onChange={(e) => setFront(e.target.value)} />
        </label>
        <label className="stack" style={{ gap: 'var(--s-3)' }}>
          <span className="eyebrow">Verso — la réponse</span>
          <textarea className="field" rows={3} value={back} onChange={(e) => setBack(e.target.value)} />
        </label>
      </Modal>
    </>
  );
}
