import { useMemo, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/core/db';
import { toDayStr } from '@/core/date';
import { isMature } from '@/core/srs';
import type { DeckId, VocabCard } from '@/core/types';
import { allVocabCards, vocabDecks, DECK_ORDER } from '@/core/content';
import { reviewVocab } from '@/app/actions';
import { Button, Icon, PageHead, Tabs, Reveal } from '@/ui';
import { SrsReviewer, type ReviewItem, type GradeButton } from '@/modules/review/SrsReviewer';
import './vocab.css';

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

  const queue = useMemo(() => {
    const dueNow: VocabCard[] = [];
    const fresh: VocabCard[] = [];
    for (const c of pool) {
      const srs = srsMap.get(c.id);
      if (!srs) fresh.push(c);
      else if (srs.due <= today) dueNow.push(c);
    }
    return [...dueNow, ...fresh.slice(0, NEW_PER_SESSION)];
  }, [pool, srsMap, today]);

  const mastered = useMemo(() => srsRows.filter(isMature).length, [srsRows]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pool;
    return pool.filter((c) => c.t.toLowerCase().includes(q) || c.d.toLowerCase().includes(q));
  }, [pool, query]);

  if (reviewing?.length) {
    const items: ReviewItem[] = reviewing.map((c) => ({ id: c.id, front: c.t, back: c.d }));
    return (
      <SrsReviewer
        items={items}
        grades={GRADES}
        onGrade={(item, g) => reviewVocab(item.id, g)}
        onExit={() => setReviewing(null)}
      />
    );
  }

  const chips: { value: DeckId | 'all'; label: string }[] = [
    { value: 'all', label: 'Tous' },
    ...DECK_ORDER.map((d) => ({ value: d, label: `${decks[d].court} · ${decks[d].cards.length}` })),
  ];

  return (
    <>
      <PageHead
        eyebrow="Vocabulaire · English"
        title="Le mot juste."
        display
        lead={`${allVocabCards().length} termes de finance, d'économie et du registre académique. Parcourez-les, ou laissez la répétition espacée les installer.`}
        actions={
          <Tabs
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

      <div className="chips" style={{ marginBottom: 'var(--s-10)' }}>
        {chips.map((c) => (
          <button
            key={c.value}
            type="button"
            className="chip"
            aria-pressed={deck === c.value}
            onClick={() => setDeck(c.value)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {view === 'browse' ? (
        <>
          <label className="search" style={{ maxWidth: 460, marginBottom: 'var(--s-8)' }}>
            <span className="sr-only">Rechercher un mot</span>
            <span className="search__icon">
              <Icon name="search" size={17} />
            </span>
            <input
              className="field"
              placeholder="Rechercher un mot, une définition…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>

          <p className="micro" style={{ marginBottom: 'var(--s-5)' }}>
            {filtered.length} entrée{filtered.length > 1 ? 's' : ''}
            {filtered.length > LIST_CAP ? ` — ${LIST_CAP} affichées` : ''}
          </p>

          <dl className="glossary">
            {filtered.slice(0, LIST_CAP).map((c, i) => (
              <Reveal key={c.id} delay={Math.min(i, 10) * 0.02} y={10}>
                <div className="glossary__row">
                  <dt className="glossary__term">{c.t}</dt>
                  <dd className="glossary__def">{c.d}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </>
      ) : (
        <>
          <div className="figures">
            <div>
              <span className="figure__value tnum">{queue.length}</span>
              <span className="eyebrow figure__label">Dans la file</span>
            </div>
            <div>
              <span className="figure__value tnum">{srsRows.length}</span>
              <span className="eyebrow figure__label">Mots suivis</span>
            </div>
            <div>
              <span className="figure__value tnum">{mastered}</span>
              <span className="eyebrow figure__label">Maîtrisés</span>
            </div>
            <div>
              <span className="figure__value tnum">{pool.length}</span>
              <span className="eyebrow figure__label">Dans ce paquet</span>
            </div>
          </div>

          <div style={{ marginTop: 'var(--s-10)' }}>
            {queue.length ? (
              <Button variant="primary" icon="play" onClick={() => setReviewing(queue)}>
                Réviser {queue.length} mot{queue.length > 1 ? 's' : ''}
              </Button>
            ) : (
              <div className="empty">
                <h3>Tout est à jour</h3>
                <p className="meta">Aucun mot de ce paquet n'attend d'être revu aujourd'hui.</p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
