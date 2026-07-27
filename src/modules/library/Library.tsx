import { useMemo, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/core/db';
import { allDocs, docsByFolder, levelCounts } from '@/core/content';
import { DRIVE_FOLDER_URL } from '@/core/config';
import { setDocRead, openResource } from '@/app/actions';
import { TRACK_LABEL, LEVELS, LEVEL_DESC } from '@/core/meta';
import type { LibDoc, TrackId, Level } from '@/core/types';
import { PageHead, Icon, Tabs, Tag, Reveal } from '@/ui';
import './library.css';

const TRACK_COLOR: Record<TrackId, string> = {
  opt: '--m-opt',
  fin: '--m-fin',
  cfa: '--m-cfa',
};

type View = 'levels' | 'essentials' | 'sources' | 'search';
type Filter = 'all' | TrackId;
type LevelFilter = 'all' | Level;

const SEARCH_CAP = 200;

function Doc({ doc, read, onToggle }: { doc: LibDoc; read: boolean; onToggle: () => void }) {
  return (
    <div className="doc">
      <button
        type="button"
        className="doc__read"
        aria-pressed={read}
        aria-label={read ? `Marquer non lu : ${doc.name}` : `Marquer lu : ${doc.name}`}
        onClick={onToggle}
      >
        <Icon name="check" size={12} strokeWidth={2} />
      </button>
      <div className="doc__main">
        <p className="doc__name">{doc.name}</p>
        <span className="micro doc__where">{doc.folder}</span>
      </div>
      <span className="doc__level">{doc.level}</span>
      <span className="micro doc__pages">{doc.pages} p.</span>
      <button
        type="button"
        className="doc__open"
        aria-label={`Ouvrir ${doc.name} dans Drive`}
        onClick={() => openResource(doc.path)}
      >
        <Icon name="external" size={16} />
      </button>
    </div>
  );
}

export function Library() {
  const [view, setView] = useState<View>('levels');
  const [filter, setFilter] = useState<Filter>('all');
  const [level, setLevel] = useState<LevelFilter>('all');
  const [query, setQuery] = useState('');
  const counts = useMemo(() => levelCounts(), []);

  const readRows = useLiveQuery(() => db.docs.filter((d) => d.read).toArray(), [], []);
  const readSet = useMemo(() => new Set(readRows.map((d) => d.path)), [readRows]);

  const matches = (d: LibDoc) =>
    (filter === 'all' || d.track === filter) && (level === 'all' || d.level === level);

  /* Essentiels : la pièce maîtresse de chaque fonds. */
  const essentials = useMemo(() => {
    const best = new Map<string, LibDoc>();
    for (const d of allDocs()) {
      const cur = best.get(d.folder);
      if (!cur || d.pages > cur.pages) best.set(d.folder, d);
    }
    return [...best.values()];
  }, []);

  const grouped = useMemo(() => docsByFolder(), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = allDocs().filter(matches);
    if (!q) return base;
    return base.filter((d) => d.name.toLowerCase().includes(q) || d.folder.toLowerCase().includes(q));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filter, level]);

  /* Vue par niveau : les sources d'un niveau, chacune dépliable. */
  const levelSections = useMemo(
    () =>
      LEVELS.map((lv) => ({
        level: lv,
        groups: docsByFolder()
          .map((g) => ({ ...g, docs: g.docs.filter((d) => filter === 'all' || d.track === filter) }))
          .filter((g) => g.docs.length > 0 && g.docs[0].level === lv),
      })).filter((s) => s.groups.length > 0),
    [filter],
  );

  const toggle = (d: LibDoc) => setDocRead(d.path, !readSet.has(d.path));

  const filters: { value: Filter; label: string }[] = [
    { value: 'all', label: 'Tous' },
    { value: 'opt', label: 'Optimisation' },
    { value: 'fin', label: 'Finance' },
    { value: 'cfa', label: 'CFA' },
  ];

  return (
    <>
      <PageHead
        eyebrow="Bibliothèque"
        title="Le fonds documentaire."
        display
        lead={`${allDocs().length} documents, ${grouped.length} sources — MIT, Stanford, UCLA, Dauphine, Schweser. Ouvrir un titre le cherche dans votre Drive.`}
        actions={
          <>
            <a className="btn btn--secondary" href={DRIVE_FOLDER_URL} target="_blank" rel="noopener noreferrer">
              <Icon name="external" size={16} /> Mon Drive
            </a>
            <Tabs
              options={[
                { value: 'levels', label: 'Par niveau' },
                { value: 'essentials', label: 'Essentiels' },
                { value: 'sources', label: 'Toutes les sources' },
                { value: 'search', label: 'Recherche' },
              ]}
              value={view}
              onChange={(v) => setView(v as View)}
              ariaLabel="Vue de la bibliothèque"
            />
          </>
        }
      />

      <div className="filters">
        <div className="chips">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              className="chip"
              aria-pressed={filter === f.value}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {view !== 'levels' && (
          <div className="chips">
            <button
              type="button"
              className="chip"
              aria-pressed={level === 'all'}
              onClick={() => setLevel('all')}
            >
              Tous niveaux
            </button>
            {LEVELS.map((lv) => (
              <button
                key={lv}
                type="button"
                className="chip"
                aria-pressed={level === lv}
                onClick={() => setLevel(lv)}
              >
                {lv} <span className="chip__count">{counts[lv]}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {view === 'levels' && (
        <div>
          {levelSections.map((section) => (
            <section className="levelsec" key={section.level}>
              <header className="levelsec__head">
                <div>
                  <p className="levelsec__badge">{section.level}</p>
                  <p className="meta levelsec__desc">{LEVEL_DESC[section.level]}</p>
                </div>
                <span className="micro tnum">
                  {section.groups.reduce((n, g) => n + g.docs.length, 0)} documents ·{' '}
                  {section.groups.length} sources
                </span>
              </header>

              <div style={{ borderTop: '1px solid var(--hairline)' }}>
                {section.groups.map((g) => (
                  <details className="source" key={g.folder}>
                    <summary>
                      <span className="source__name">{g.docs[0].source}</span>
                      <span className="micro tnum">{g.docs.length}</span>
                    </summary>
                    <div className="source__body">
                      {g.docs.map((d) => (
                        <Doc key={d.path} doc={d} read={readSet.has(d.path)} onToggle={() => toggle(d)} />
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {view === 'essentials' && (
        <>
          <p className="micro" style={{ marginBottom: 'var(--s-5)' }}>
            Une pièce maîtresse par source · {essentials.filter(matches).length} titres
          </p>
          <div className="doclist">
            {essentials.filter(matches).map((d, i) => (
              <Reveal key={d.path} delay={Math.min(i, 10) * 0.03} y={10}>
                <Doc doc={d} read={readSet.has(d.path)} onToggle={() => toggle(d)} />
              </Reveal>
            ))}
          </div>
        </>
      )}

      {view === 'sources' && (
        <div style={{ borderTop: '1px solid var(--hairline)' }}>
          {grouped.map((g) => (
            <details className="source" key={g.folder}>
              <summary>
                <span className="source__name">{g.folder}</span>
                <span className="micro tnum">{g.docs.length}</span>
              </summary>
              <div className="source__body">
                {g.docs.map((d) => (
                  <Doc key={d.path} doc={d} read={readSet.has(d.path)} onToggle={() => toggle(d)} />
                ))}
              </div>
            </details>
          ))}
        </div>
      )}

      {view === 'search' && (
        <>
          <label className="search" style={{ maxWidth: 480, marginBottom: 'var(--s-6)' }}>
            <span className="sr-only">Rechercher un document</span>
            <span className="search__icon">
              <Icon name="search" size={17} />
            </span>
            <input
              className="field"
              placeholder="Titre, auteur, dossier…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <p className="micro" style={{ marginBottom: 'var(--s-5)' }}>
            {results.length} document{results.length > 1 ? 's' : ''}
            {results.length > SEARCH_CAP ? ` — ${SEARCH_CAP} affichés` : ''}
          </p>
          <div className="doclist">
            {results.slice(0, SEARCH_CAP).map((d) => (
              <Doc key={d.path} doc={d} read={readSet.has(d.path)} onToggle={() => toggle(d)} />
            ))}
          </div>
        </>
      )}

      <p className="micro" style={{ marginTop: 'var(--s-10)' }}>
        <Tag colorVar={TRACK_COLOR[filter === 'all' ? 'opt' : filter]}>
          {filter === 'all' ? 'Tous parcours' : TRACK_LABEL[filter]}
        </Tag>
      </p>
    </>
  );
}
