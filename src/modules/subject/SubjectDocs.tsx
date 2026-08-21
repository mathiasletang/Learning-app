import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/core/db';
import { allDocs, docsByFolder, getCourses } from '@/core/content';
import { fichesOfSubject, DIFFICULTY_LABEL } from '@/core/fiches';
import { DRIVE_FOLDER_URL } from '@/core/config';
import { setDocRead, openResource } from '@/app/actions';
import { LEVELS, LEVEL_DESC } from '@/core/meta';
import type { SubjectDef } from '@/core/subjects';
import type { FicheMeta } from '@/core/fiches';
import type { LibDoc, Level } from '@/core/types';
import { Icon, Tabs } from '@/ui';
import '@/modules/library/library.css';
import '@/modules/courses/courses.css';

type View = 'levels' | 'search';
type LevelFilter = 'all' | Level;

const SEARCH_CAP = 200;

const METHOD_BLURB: Record<string, string> = {
  guide: "La méthode, l'ordre de travail et ce qu'il faut viser à chaque étape.",
  notations: 'Le code des textes mathématiques, décodé symbole par symbole.',
  s0: 'Dix exercices de diagnostic pour vérifier que les outils sont revenus.',
  s1: 'Ensembles et fonctions convexes — le socle de tout le parcours.',
  s2: 'Lagrangien, dualité et KKT — le mécanisme central, expliqué puis pratiqué.',
};

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
        aria-label={`Ouvrir ${doc.name}`}
        onClick={() => openResource(doc.path)}
      >
        <Icon name="external" size={16} />
      </button>
    </div>
  );
}

function FicheList({ fiches }: { fiches: FicheMeta[] }) {
  return (
    <nav className="toc">
      {fiches.map((f, i) => (
        <Link key={f.id} to={`/fiche/${f.id}`} className="toc__item">
          <span className="toc__num">{String(i + 1).padStart(2, '0')}</span>
          <span>
            <span className="toc__title">{f.title}</span>
            <span className="meta toc__desc">
              {f.chapter} · {DIFFICULTY_LABEL[f.difficulty]} · ≈ {f.minutes} min —{' '}
              {f.concepts.join(', ')}
            </span>
          </span>
          <Icon name="arrowRight" size={18} className="toc__arrow" />
        </Link>
      ))}
    </nav>
  );
}

/**
 * L'index documentaire de la matière : tous ses PDF, rangés par niveau,
 * et — côté Maths — les cinq textes de méthode en tête. Le Parcours reste
 * la route ; ici, on retrouve.
 */
export function SubjectDocs({ def }: { def: SubjectDef }) {
  const [view, setView] = useState<View>('levels');
  const [level, setLevel] = useState<LevelFilter>('all');
  const [query, setQuery] = useState('');
  const [ficheQuery, setFicheQuery] = useState('');

  const readRows = useLiveQuery(() => db.docs.filter((d) => d.read).toArray(), [], []);
  const readSet = useMemo(() => new Set(readRows.map((d) => d.path)), [readRows]);

  const inSubject = useMemo(
    () => allDocs().filter((d) => def.tracks.includes(d.track)),
    [def.tracks],
  );

  const levelSections = useMemo(
    () =>
      LEVELS.map((lv) => ({
        level: lv,
        groups: docsByFolder()
          .map((g) => ({ ...g, docs: g.docs.filter((d) => def.tracks.includes(d.track)) }))
          .filter((g) => g.docs.length > 0 && g.docs[0].level === lv),
      })).filter((s) => s.groups.length > 0),
    [def.tracks],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = inSubject.filter((d) => level === 'all' || d.level === level);
    if (!q) return base;
    return base.filter(
      (d) => d.name.toLowerCase().includes(q) || d.folder.toLowerCase().includes(q),
    );
  }, [inSubject, query, level]);

  const toggle = (d: LibDoc) => setDocRead(d.path, !readSet.has(d.path));
  const courses = def.id === 'maths' ? getCourses() : [];
  const fiches = useMemo(() => fichesOfSubject(def.id), [def.id]);

  const ficheGroups = useMemo(
    () =>
      [...new Set(fiches.map((f) => f.course))].map((course) => ({
        course,
        fiches: fiches.filter((f) => f.course === course),
      })),
    [fiches],
  );

  const ficheResults = useMemo(() => {
    const q = ficheQuery.trim().toLowerCase();
    if (!q) return [];
    return fiches.filter((f) =>
      `${f.title} ${f.chapter} ${f.course} ${f.concepts.join(' ')}`.toLowerCase().includes(q),
    );
  }, [fiches, ficheQuery]);

  return (
    <>
      <div className="subj-tools" style={{ marginBottom: "var(--s-6)" }}>
        <Tabs
          options={[
            { value: 'levels', label: 'Par niveau' },
            { value: 'search', label: 'Recherche' },
          ]}
          value={view}
          onChange={(v) => setView(v as View)}
          ariaLabel="Vue des documents"
        />
        <span className="spacer" />
        <a className="btn btn--secondary" href={DRIVE_FOLDER_URL} target="_blank" rel="noopener noreferrer">
          <Icon name="external" size={16} /> Mon Drive
        </a>
      </div>

      <p className="micro" style={{ marginBottom: 'var(--s-8)' }}>
        {inSubject.length} documents · ouvrir un titre le cherche dans votre Drive.
      </p>

      {/* Les fiches de révision — la version travaillée des cours sources. */}
      {fiches.length > 0 && (
        <section style={{ marginBottom: 'var(--s-12)' }}>
          <div className="section__head">
            <h2>Fiches de révision</h2>
            <span className="micro tnum">
              {fiches.length} fiches · ≈ {Math.round(fiches.reduce((n, f) => n + f.minutes, 0) / 60)} h
            </span>
          </div>

          {/* Au-delà d'une dizaine de fiches, la liste à plat n'est plus une
              liste : on cherche par le titre, ou on ouvre le cours voulu. */}
          <label className="search" style={{ marginBottom: 'var(--s-6)' }}>
            <span className="sr-only">Trouver une fiche</span>
            <span className="search__icon">
              <Icon name="search" size={17} />
            </span>
            <input
              className="field"
              placeholder="Trouver une fiche — titre, concept, cours…"
              value={ficheQuery}
              onChange={(e) => setFicheQuery(e.target.value)}
            />
          </label>

          {ficheQuery.trim() ? (
            <>
              <p className="micro" style={{ marginBottom: 'var(--s-4)' }}>
                {ficheResults.length} fiche{ficheResults.length > 1 ? 's' : ''}
              </p>
              <FicheList fiches={ficheResults} />
            </>
          ) : (
            <div style={{ borderTop: '1px solid var(--hairline)' }}>
              {ficheGroups.map((g) => (
                <details className="source" key={g.course}>
                  <summary>
                    <span className="source__name">{g.course}</span>
                    <span className="micro tnum">{g.fiches.length}</span>
                  </summary>
                  <div className="source__body">
                    <FicheList fiches={g.fiches} />
                  </div>
                </details>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Les textes de méthode — écrits pour être lus dans l'ordre. */}
      {courses.length > 0 && (
        <section style={{ marginBottom: 'var(--s-12)' }}>
          <div className="section__head">
            <h2>Méthode</h2>
            <span className="micro">Cinq textes, dans l'ordre</span>
          </div>
          <nav className="toc">
            {courses.map((c, i) => (
              <Link key={c.id} to={`/cours/${c.id}`} className="toc__item">
                <span className="toc__num">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="toc__title">{c.title}</span>
                  <span className="meta toc__desc">{METHOD_BLURB[c.id] ?? ''}</span>
                </span>
                <Icon name="arrowRight" size={18} className="toc__arrow" />
              </Link>
            ))}
          </nav>
        </section>
      )}

      {view === 'levels' ? (
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
      ) : (
        <>
          <div className="subj-tools">
            <label className="search">
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
          </div>
          <div className="chips" style={{ marginBottom: 'var(--s-6)' }}>
            <button type="button" className="chip" aria-pressed={level === 'all'} onClick={() => setLevel('all')}>
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
                {lv}
              </button>
            ))}
          </div>
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
    </>
  );
}
