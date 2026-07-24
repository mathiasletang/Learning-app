import { useMemo, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/core/db';
import { allDocs, docsByFolder } from '@/core/content';
import { openDocument } from '@/core/open';
import { setDocRead } from '@/app/actions';
import { TRACK_LABEL } from '@/core/meta';
import type { LibDoc, TrackId } from '@/core/types';
import { PageHead } from '@/ui/PageHead';
import { Card, Segmented, Icon, Tag } from '@/ui';
import './library.css';

/** Liste optionnelle de chemins « essentiels » (à remplir depuis le prototype).
    Si vide, on retient automatiquement le document le plus volumineux par source. */
const ESSENTIAL_PATHS: string[] = [];

const TRACK_COLOR: Record<TrackId, string> = {
  opt: '--subj-opt',
  fin: '--subj-fin',
  cfa: '--subj-cfa',
};

type View = 'essentials' | 'sources' | 'search';
type Filter = 'all' | TrackId;

const SEARCH_CAP = 200;

function DocRow({ doc, read, onToggle }: { doc: LibDoc; read: boolean; onToggle: () => void }) {
  return (
    <div className="doc">
      <button
        type="button"
        className="doc__read"
        aria-pressed={read}
        aria-label={read ? `Marquer non lu : ${doc.name}` : `Marquer lu : ${doc.name}`}
        onClick={onToggle}
      >
        <Icon name="check" size={16} />
      </button>
      <div className="doc__main">
        <div className="doc__name">{doc.name}</div>
        <div className="doc__meta tnum">
          {doc.folder} · {doc.pages} p.
        </div>
      </div>
      <div className="doc__actions">
        <Tag colorVar={TRACK_COLOR[doc.track]}>{TRACK_LABEL[doc.track]}</Tag>
        <button
          type="button"
          className="btn btn--ghost btn--icon btn--sm"
          aria-label={`Ouvrir ${doc.name}`}
          onClick={() => openDocument(doc.path)}
        >
          <Icon name="external" size={18} />
        </button>
      </div>
    </div>
  );
}

export function Library() {
  const [view, setView] = useState<View>('essentials');
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  const readRows = useLiveQuery(() => db.docs.filter((d) => d.read).toArray(), [], []);
  const readSet = useMemo(() => new Set(readRows.map((d) => d.path)), [readRows]);

  const matchFilter = (d: LibDoc) => filter === 'all' || d.track === filter;

  const essentials = useMemo(() => {
    if (ESSENTIAL_PATHS.length) {
      const set = new Set(ESSENTIAL_PATHS);
      return allDocs().filter((d) => set.has(d.path));
    }
    // Heuristique : le document le plus volumineux de chaque source.
    const best = new Map<string, LibDoc>();
    for (const d of allDocs()) {
      const cur = best.get(d.folder);
      if (!cur || d.pages > cur.pages) best.set(d.folder, d);
    }
    return [...best.values()];
  }, []);

  const grouped = useMemo(() => docsByFolder(), []);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = allDocs().filter(matchFilter);
    if (!q) return base;
    return base.filter(
      (d) => d.name.toLowerCase().includes(q) || d.folder.toLowerCase().includes(q),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filter]);

  const toggle = (d: LibDoc) => setDocRead(d.path, !readSet.has(d.path));

  const filterChips: { value: Filter; label: string }[] = [
    { value: 'all', label: 'Tous' },
    { value: 'opt', label: 'Optim' },
    { value: 'fin', label: 'Finance' },
    { value: 'cfa', label: 'CFA' },
  ];

  return (
    <>
      <PageHead
        title="Bibliothèque"
        subtitle={`${allDocs().length} documents. Les PDF s'ouvrent dans le lecteur du système.`}
        actions={
          <Segmented
            options={[
              { value: 'essentials', label: 'Essentiels' },
              { value: 'sources', label: 'Sources' },
              { value: 'search', label: 'Recherche' },
            ]}
            value={view}
            onChange={(v) => setView(v as View)}
            ariaLabel="Vue de la bibliothèque"
          />
        }
      />

      {view !== 'sources' && (
        <div className="chips" style={{ marginBottom: 'var(--s-4)' }}>
          {filterChips.map((c) => (
            <button
              key={c.value}
              type="button"
              className="chip"
              aria-pressed={filter === c.value}
              onClick={() => setFilter(c.value)}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      {view === 'essentials' && (
        <Card>
          <div className="section-title">Essentiels ({essentials.filter(matchFilter).length})</div>
          <div className="stack">
            {essentials.filter(matchFilter).map((d) => (
              <DocRow key={d.path} doc={d} read={readSet.has(d.path)} onToggle={() => toggle(d)} />
            ))}
          </div>
        </Card>
      )}

      {view === 'sources' && (
        <div>
          {grouped.map((g) => (
            <details className="source" key={g.folder}>
              <summary>
                <span style={{ flex: 1 }}>{g.folder}</span>
                <span className="meta tnum">{g.docs.length}</span>
              </summary>
              <div className="source__body">
                {g.docs.map((d) => (
                  <DocRow key={d.path} doc={d} read={readSet.has(d.path)} onToggle={() => toggle(d)} />
                ))}
              </div>
            </details>
          ))}
        </div>
      )}

      {view === 'search' && (
        <>
          <label className="row" style={{ marginBottom: 'var(--s-4)' }}>
            <span className="sr-only">Rechercher un document</span>
            <span style={{ position: 'relative', flex: 1 }}>
              <Icon name="search" size={18} className="input-icon" />
              <input
                className="input"
                style={{ paddingLeft: 'var(--s-10)' }}
                placeholder="Rechercher par nom ou dossier…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </span>
          </label>
          <p className="meta" style={{ marginBottom: 'var(--s-3)' }}>
            {searchResults.length} résultat{searchResults.length > 1 ? 's' : ''}
            {searchResults.length > SEARCH_CAP ? ` (${SEARCH_CAP} affichés)` : ''}
          </p>
          <Card>
            <div className="stack">
              {searchResults.slice(0, SEARCH_CAP).map((d) => (
                <DocRow key={d.path} doc={d} read={readSet.has(d.path)} onToggle={() => toggle(d)} />
              ))}
            </div>
          </Card>
        </>
      )}
    </>
  );
}
