import { useMemo, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/core/db';
import { toDayStr } from '@/core/date';
import { isMature } from '@/core/srs';
import type { DeckId, VocabCard } from '@/core/types';
import { allVocabCards, vocabDecks, DECK_ORDER } from '@/core/content';
import { reviewVocab } from '@/app/actions';
import { PageHead } from '@/ui/PageHead';
import { Button, Card, Segmented, Tag, Icon } from '@/ui';
import { SrsReviewer, type ReviewItem, type GradeButton } from '@/modules/review/SrsReviewer';

const GRADES: GradeButton[] = [
  { grade: 0, label: 'Non', tone: 'again' },
  { grade: 3, label: 'À peu près', tone: 'hard' },
  { grade: 4, label: 'Oui', tone: 'good' },
  { grade: 5, label: 'Facile', tone: 'easy' },
];

const NEW_PER_SESSION = 20;
const LIST_CAP = 300;

type View = 'browse' | 'review';

export function Vocab() {
  const decks = vocabDecks();
  const today = toDayStr();
  const [view, setView] = useState<View>('browse');
  const [deck, setDeck] = useState<DeckId | 'all'>('all');
  const [query, setQuery] = useState('');
  const [reviewing, setReviewing] = useState<VocabCard[] | null>(null);

  const srsRows = useLiveQuery(() => db.vocabSrs.toArray(), [], []);
  const srsMap = useMemo(() => new Map(srsRows.map((r) => [r.id, r])), [srsRows]);

  const pool = useMemo(
    () => (deck === 'all' ? allVocabCards() : allVocabCards().filter((c) => c.deck === deck)),
    [deck],
  );

  // File de révision : cartes dues + un quota de cartes neuves.
  const queue = useMemo(() => {
    const dueReview: VocabCard[] = [];
    const fresh: VocabCard[] = [];
    for (const c of pool) {
      const srs = srsMap.get(c.id);
      if (!srs) fresh.push(c);
      else if (srs.due <= today) dueReview.push(c);
    }
    return [...dueReview, ...fresh.slice(0, NEW_PER_SESSION)];
  }, [pool, srsMap, today]);

  const mastered = useMemo(
    () => srsRows.filter((r) => isMature(r)).length,
    [srsRows],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pool;
    return pool.filter((c) => c.t.toLowerCase().includes(q) || c.d.toLowerCase().includes(q));
  }, [pool, query]);

  if (reviewing && reviewing.length > 0) {
    const items: ReviewItem[] = reviewing.map((c) => ({
      id: c.id,
      front: c.t,
      back: c.d,
    }));
    return (
      <SrsReviewer
        items={items}
        grades={GRADES}
        onGrade={(item, g) => reviewVocab(item.id, g)}
        onExit={() => setReviewing(null)}
      />
    );
  }

  const deckChips: { value: DeckId | 'all'; label: string }[] = [
    { value: 'all', label: 'Tous' },
    ...DECK_ORDER.map((d) => ({ value: d, label: `${decks[d].court} (${decks[d].cards.length})` })),
  ];

  return (
    <>
      <PageHead
        title="Vocabulaire"
        subtitle="Anglais — finance, verbes et noms du registre académique (C1-C2)."
        actions={
          <Segmented
            options={[
              { value: 'browse', label: 'Parcourir' },
              { value: 'review', label: 'Réviser' },
            ]}
            value={view}
            onChange={(v) => setView(v as View)}
            ariaLabel="Mode vocabulaire"
          />
        }
      />

      <div className="chips" style={{ marginBottom: 'var(--s-5)' }}>
        {deckChips.map((d) => (
          <button
            key={d.value}
            type="button"
            className="chip"
            aria-pressed={deck === d.value}
            onClick={() => setDeck(d.value)}
          >
            {d.label}
          </button>
        ))}
      </div>

      {view === 'browse' ? (
        <>
          <label className="row" style={{ marginBottom: 'var(--s-4)' }}>
            <span className="sr-only">Rechercher un mot</span>
            <span style={{ position: 'relative', flex: 1 }}>
              <Icon
                name="search"
                size={18}
                className="input-icon"
              />
              <input
                className="input"
                style={{ paddingLeft: 'var(--s-10)' }}
                placeholder="Rechercher un mot ou une définition…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </span>
          </label>
          <p className="meta" style={{ marginBottom: 'var(--s-3)' }}>
            {filtered.length} résultat{filtered.length > 1 ? 's' : ''}
            {filtered.length > LIST_CAP ? ` (${LIST_CAP} affichés)` : ''}
          </p>
          <div className="stack" style={{ gap: 'var(--s-2)' }}>
            {filtered.slice(0, LIST_CAP).map((c) => (
              <Card key={c.id} className="row" style={{ gap: 'var(--s-4)', alignItems: 'baseline' }}>
                <strong style={{ minWidth: 140, flex: 'none' }}>{c.t}</strong>
                <span className="meta" style={{ color: 'var(--text)' }}>
                  {c.d}
                </span>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <>
          <div
            className="grid"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', marginBottom: 'var(--s-6)' }}
          >
            <Card>
              <span className="section-title" style={{ margin: 0 }}>
                À réviser
              </span>
              <strong className="tnum" style={{ fontSize: 'var(--fs-display)', display: 'block' }}>
                {queue.length}
              </strong>
            </Card>
            <Card>
              <span className="section-title" style={{ margin: 0 }}>
                Mots suivis
              </span>
              <strong className="tnum" style={{ fontSize: 'var(--fs-display)', display: 'block' }}>
                {srsRows.length}
              </strong>
            </Card>
            <Card>
              <span className="section-title" style={{ margin: 0 }}>
                Maîtrisés
              </span>
              <strong className="tnum" style={{ fontSize: 'var(--fs-display)', display: 'block' }}>
                {mastered}
              </strong>
            </Card>
          </div>
          {queue.length > 0 ? (
            <Button variant="primary" icon="play" onClick={() => setReviewing(queue)} block>
              Réviser {queue.length} mot{queue.length > 1 ? 's' : ''}
            </Button>
          ) : (
            <Card pad="lg">
              <div className="row" style={{ gap: 'var(--s-3)' }}>
                <Icon name="check" size={22} />
                <div>
                  <strong>Tout est à jour</strong>
                  <p className="meta">Aucun mot à réviser dans ce paquet aujourd'hui.</p>
                </div>
              </div>
            </Card>
          )}
          <div style={{ marginTop: 'var(--s-6)' }}>
            <Tag>Store SRS distinct des flashcards</Tag>
          </div>
        </>
      )}
    </>
  );
}
