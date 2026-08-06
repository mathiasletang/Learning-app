import { useMemo, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/core/db';
import { toDayStr } from '@/core/date';
import { isMature } from '@/core/srs';
import type { LexDirection, LexEntry } from '@/core/types';
import {
  lexThemes,
  searchWords,
  shortTheme,
  shuffled,
  wordCount,
  wordsOfTheme,
} from '@/core/lexicon';
import { reviewVocab } from '@/app/actions';
import { Button, Icon, PageHead, Tabs } from '@/ui';
import { SrsReviewer, type ReviewItem, type GradeButton } from '@/modules/review/SrsReviewer';
import { Drill, type DrillMode } from './Drill';
import './english.css';

type View = 'browse' | 'cards' | 'learn' | 'write';

const VIEWS: { value: View; label: string }[] = [
  { value: 'browse', label: 'Parcourir' },
  { value: 'cards', label: 'Cartes' },
  { value: 'learn', label: 'Apprendre' },
  { value: 'write', label: 'Écrire' },
];

const GRADES: GradeButton[] = [
  { grade: 0, label: 'Non', tone: 'again' },
  { grade: 3, label: 'À peu près', tone: 'hard' },
  { grade: 4, label: 'Oui', tone: 'good' },
  { grade: 5, label: 'Facile', tone: 'easy' },
];

const SIZES = [10, 20, 30, 50];
const LIST_CAP = 200;

/** Recto / verso d'une carte, selon le sens choisi. */
function faces(w: LexEntry, dir: LexDirection) {
  const fr = w.f || w.e;
  return dir === 'en-fr'
    ? { front: w.t, back: fr, sub: w.e !== fr ? w.e : '' }
    : { front: fr, back: w.t, sub: w.e };
}

export function English() {
  const themes = lexThemes();
  const today = toDayStr();

  const [view, setView] = useState<View>('browse');
  const [theme, setTheme] = useState<number | 'all'>('all');
  const [dir, setDir] = useState<LexDirection>('en-fr');
  const [query, setQuery] = useState('');
  const [size, setSize] = useState(20);
  const [session, setSession] = useState<LexEntry[] | null>(null);
  const [score, setScore] = useState<{ right: number; total: number } | null>(null);

  const srsRows = useLiveQuery(() => db.vocabSrs.toArray(), [], []);
  const srsMap = useMemo(() => new Map(srsRows.map((r) => [r.id, r])), [srsRows]);

  /* File d'attente : d'abord ce qui est dû, puis des mots jamais vus. */
  const pool = useMemo(() => wordsOfTheme(theme), [theme]);
  const queue = useMemo(() => {
    const due: LexEntry[] = [];
    const fresh: LexEntry[] = [];
    for (const w of pool) {
      const srs = srsMap.get(w.id);
      if (!srs) fresh.push(w);
      else if (srs.due <= today) due.push(w);
    }
    return [...shuffled(due), ...shuffled(fresh)];
  }, [pool, srsMap, today]);

  const seen = useMemo(
    () => pool.reduce((n, w) => (srsMap.has(w.id) ? n + 1 : n), 0),
    [pool, srsMap],
  );
  const mastered = useMemo(
    () => srsRows.filter((r) => r.id.startsWith('w:') && isMature(r)).length,
    [srsRows],
  );
  const dueCount = useMemo(
    () => pool.reduce((n, w) => ((srsMap.get(w.id)?.due ?? '9999') <= today ? n + 1 : n), 0),
    [pool, srsMap, today],
  );

  const results = useMemo(() => searchWords(query, { theme, limit: LIST_CAP }), [query, theme]);

  const start = () => {
    setScore(null);
    setSession(queue.slice(0, size));
  };

  const finish = (stats?: { right: number; total: number }) => {
    setSession(null);
    if (stats && stats.total > 0) setScore(stats);
  };

  /* ------------------------- Séance en cours -------------------------- */

  if (session?.length && view === 'cards') {
    const items: ReviewItem[] = session.map((w) => {
      const { front, back, sub } = faces(w, dir);
      return {
        id: w.id,
        front: (
          <>
            <span className="card-face__term">{front}</span>
            <span className="micro card-face__theme">{shortTheme(w.theme)}</span>
          </>
        ),
        back: (
          <>
            <span className="card-face__term">{back}</span>
            {sub && <span className="card-face__gloss">{sub}</span>}
          </>
        ),
      };
    });
    return (
      <SrsReviewer
        items={items}
        grades={GRADES}
        onGrade={(item, g) => reviewVocab(item.id, g)}
        onExit={() => finish()}
      />
    );
  }

  if (session?.length && (view === 'learn' || view === 'write')) {
    return (
      <Drill
        key={`${view}-${dir}-${theme}-${session[0].id}`}
        words={session}
        mode={view as DrillMode}
        direction={dir}
        onExit={finish}
      />
    );
  }

  /* ------------------------------ Page ------------------------------- */

  const dirLabel = dir === 'en-fr' ? 'Anglais → Français' : 'Français → Anglais';

  return (
    <>
      <PageHead
        eyebrow="Anglais · lexique"
        title="Le mot juste, sans détour."
        display
        lead={
          <>
            {wordCount().toLocaleString('fr-FR')} mots, chacun avec sa définition anglaise et sa
            traduction française. Cherchez-en un, ou lancez une séance de quelques minutes.
          </>
        }
        actions={
          <Tabs
            options={VIEWS}
            value={view}
            onChange={(v) => {
              setView(v as View);
              setScore(null);
            }}
            ariaLabel="Mode d'apprentissage"
          />
        }
      />

      <div className="lex-tools">
        {view === 'browse' ? (
          <label className="search">
            <span className="sr-only">Rechercher un mot</span>
            <span className="search__icon">
              <Icon name="search" size={17} />
            </span>
            <input
              className="field"
              placeholder="Un mot anglais, une traduction, une définition…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
          </label>
        ) : (
          <span className="spacer" />
        )}

        <button
          type="button"
          className="dir"
          onClick={() => setDir((d) => (d === 'en-fr' ? 'fr-en' : 'en-fr'))}
          aria-label={`Sens : ${dirLabel}. Changer.`}
          title="Changer le sens"
        >
          <span className="dir__from">{dir === 'en-fr' ? 'EN' : 'FR'}</span>
          <Icon name="arrowRight" size={15} />
          <span className="dir__to">{dir === 'en-fr' ? 'FR' : 'EN'}</span>
        </button>
      </div>

      <div className="lex-themes" role="group" aria-label="Thèmes">
        <button
          type="button"
          className="chip"
          aria-pressed={theme === 'all'}
          onClick={() => setTheme('all')}
        >
          Tous · {wordCount().toLocaleString('fr-FR')}
        </button>
        {themes.map((t) => (
          <button
            key={t.id}
            type="button"
            className="chip"
            aria-pressed={theme === t.id}
            onClick={() => setTheme(t.id)}
            title={t.label}
          >
            {shortTheme(t.label)} · {t.count}
          </button>
        ))}
      </div>

      {view === 'browse' ? (
        <>
          <p className="micro" style={{ marginBottom: 'var(--s-4)' }}>
            {query.trim()
              ? `${results.length} résultat${results.length > 1 ? 's' : ''}${results.length === LIST_CAP ? ' (les plus proches)' : ''}`
              : `${pool.length.toLocaleString('fr-FR')} mots — ${LIST_CAP} premiers affichés, affinez avec la recherche`}
          </p>

          {results.length === 0 ? (
            <div className="empty">
              <h3>Aucun mot trouvé</h3>
              <p className="meta">
                Essayez une autre orthographe, ou cherchez dans « Tous » les thèmes.
              </p>
            </div>
          ) : (
            <div className="lexlist">
              {results.map((w) => (
                <div className="lexrow" key={w.id}>
                  <div>
                    <span className="lexrow__term">{w.t}</span>
                    {w.f && <span className="lexrow__fr">{w.f}</span>}
                  </div>
                  <p className="lexrow__def">{w.e}</p>
                  <span className="micro lexrow__theme">{shortTheme(w.theme)}</span>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="session-setup">
          {score && (
            <div className="verdict" style={{ marginBottom: 'var(--s-8)' }}>
              <span className="eyebrow verdict__label">Séance terminée</span>
              <p className="verdict__answer tnum">
                {score.right} / {score.total} — {Math.round((score.right / score.total) * 100)} %
              </p>
            </div>
          )}

          <div className="figures">
            <div>
              <span className="figure__value tnum">{dueCount}</span>
              <span className="eyebrow figure__label">À revoir</span>
            </div>
            <div>
              <span className="figure__value tnum">{seen.toLocaleString('fr-FR')}</span>
              <span className="eyebrow figure__label">Déjà vus</span>
            </div>
            <div>
              <span className="figure__value tnum">{mastered.toLocaleString('fr-FR')}</span>
              <span className="eyebrow figure__label">Acquis</span>
            </div>
            <div>
              <span className="figure__value tnum">{pool.length.toLocaleString('fr-FR')}</span>
              <span className="eyebrow figure__label">Dans ce thème</span>
            </div>
          </div>

          <div className="session-setup__block">
            <p className="eyebrow" style={{ marginBottom: 'var(--s-4)' }}>
              Longueur de la séance
            </p>
            <div className="chips">
              {SIZES.map((n) => (
                <button
                  key={n}
                  type="button"
                  className="chip tnum"
                  aria-pressed={size === n}
                  onClick={() => setSize(n)}
                >
                  {n} mots
                </button>
              ))}
            </div>
          </div>

          <div className="session-setup__block">
            <p className="meta" style={{ marginBottom: 'var(--s-5)' }}>
              {view === 'cards' &&
                `Carte recto-verso, ${dirLabel.toLowerCase()}. Vous jugez vous-même.`}
              {view === 'learn' && `Quatre propositions, ${dirLabel.toLowerCase()}. Touches 1 à 4.`}
              {view === 'write' &&
                `Vous tapez la réponse, ${dirLabel.toLowerCase()}. Entrée pour valider.`}
            </p>
            {queue.length ? (
              <Button variant="primary" icon="play" onClick={start}>
                Commencer — {Math.min(size, queue.length)} mots
              </Button>
            ) : (
              <div className="empty">
                <h3>Tout est à jour</h3>
                <p className="meta">Aucun mot de ce thème n'attend d'être revu aujourd'hui.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
