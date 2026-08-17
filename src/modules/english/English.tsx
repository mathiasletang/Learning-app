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
  wordById,
  wordCount,
  wordsOfTheme,
} from '@/core/lexicon';
import { reviewVocab } from '@/app/actions';
import { useApp } from '@/app/store';
import { Button, Icon, PageHead, Tabs } from '@/ui';
import { SrsReviewer, type ReviewItem, type GradeButton } from '@/modules/review/SrsReviewer';
import { Drill, type DrillMode } from './Drill';
import './english.css';

/* Trois onglets, trois intentions : travailler, corriger, consulter.
   Les trois techniques d'exercice (cartes, choix, écriture) ne sont plus des
   onglets : ce sont des modes au sein d'une même séance d'entraînement. */
type View = 'etudier' | 'erreurs' | 'dico';
type Mode = 'cards' | 'learn' | 'write';

const VIEWS: { value: View; label: string }[] = [
  { value: 'etudier', label: 'Étudier' },
  { value: 'erreurs', label: 'Erreurs' },
  { value: 'dico', label: 'Dictionnaire' },
];

const MODES: { value: Mode; label: string }[] = [
  { value: 'cards', label: 'Cartes' },
  { value: 'learn', label: 'Choix multiples' },
  { value: 'write', label: 'Écrire' },
];

const MODE_HINT: Record<Mode, string> = {
  cards: 'Carte recto-verso — vous jugez vous-même. Le mode des révisions.',
  learn: 'Quatre propositions, touches 1 à 4. Idéal pour découvrir des mots.',
  write: 'Vous tapez la réponse, Entrée pour valider. Le mode le plus exigeant.',
};

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

/** Durée indicative d'une séance : environ six mots à la minute. */
function minutesFor(n: number): number {
  return Math.max(2, Math.round(n / 6));
}

export function English() {
  const themes = lexThemes();
  const today = toDayStr();
  const streak = useApp((s) => s.gam.streak);

  const [view, setView] = useState<View>('etudier');
  const [mode, setMode] = useState<Mode>('cards');
  const [theme, setTheme] = useState<number | 'all'>('all');
  const [dir, setDir] = useState<LexDirection>('en-fr');
  const [query, setQuery] = useState('');
  const [size, setSize] = useState(20);
  const [session, setSession] = useState<{ words: LexEntry[]; mode: Mode } | null>(null);
  const [score, setScore] = useState<{ right: number; total: number } | null>(null);

  const srsRows = useLiveQuery(() => db.vocabSrs.toArray(), [], []);
  const srsMap = useMemo(() => new Map(srsRows.map((r) => [r.id, r])), [srsRows]);

  /* --------- Ce que la mémoire attend, globalement puis par thème --------- */

  const vocabRows = useMemo(() => srsRows.filter((r) => r.id.startsWith('w:')), [srsRows]);
  const globalDue = useMemo(
    () => vocabRows.filter((r) => r.due <= today).length,
    [vocabRows, today],
  );
  const globalSeen = vocabRows.length;
  const globalMastered = useMemo(() => vocabRows.filter((r) => isMature(r)).length, [vocabRows]);

  /* File d'attente du thème choisi : d'abord ce qui est dû, puis du neuf. */
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

  const results = useMemo(() => searchWords(query, { theme, limit: LIST_CAP }), [query, theme]);

  /* Les mots déjà ratés au moins une fois — visibles, donc ciblables. */
  const errorWords = useMemo(() => {
    return srsRows
      .filter((r) => r.id.startsWith('w:') && r.lapses > 0)
      .sort((a, b) => b.lapses - a.lapses || (a.due < b.due ? -1 : 1))
      .map((r) => ({ srs: r, word: wordById(r.id) }))
      .filter((e): e is { srs: (typeof srsRows)[number]; word: LexEntry } => e.word !== undefined);
  }, [srsRows]);

  /* ------ La recommandation du jour : dû, sinon erreurs, sinon du neuf ----- */

  const dueAll = useMemo(
    () =>
      vocabRows
        .filter((r) => r.due <= today)
        .map((r) => wordById(r.id))
        .filter((w): w is LexEntry => w !== undefined),
    [vocabRows, today],
  );

  const reco = useMemo(() => {
    if (dueAll.length > 0) {
      const n = Math.min(20, dueAll.length);
      return {
        kind: 'due' as const,
        title: 'Réviser votre vocabulaire',
        detail: `${dueAll.length.toLocaleString('fr-FR')} mot${dueAll.length > 1 ? 's' : ''} attend${dueAll.length > 1 ? 'ent' : ''} d'être revu${dueAll.length > 1 ? 's' : ''} — la mémoire n'attend pas.`,
        cta: `Réviser ${n} mots · ≈ ${minutesFor(n)} min`,
        start: () => {
          setScore(null);
          setSession({ words: shuffled(dueAll).slice(0, n), mode: 'cards' });
        },
      };
    }
    if (errorWords.length > 0) {
      const n = Math.min(20, errorWords.length);
      return {
        kind: 'errors' as const,
        title: 'Renforcer vos mots fragiles',
        detail: `Rien n'est dû aujourd'hui, mais ${errorWords.length} mot${errorWords.length > 1 ? 's ont' : ' a'} déjà été raté${errorWords.length > 1 ? 's' : ''} — le bon moment pour les consolider.`,
        cta: `Revoir ${n} erreurs · ≈ ${minutesFor(n)} min`,
        start: () => {
          setScore(null);
          setSession({ words: shuffled(errorWords.map((e) => e.word)).slice(0, n), mode: 'cards' });
        },
      };
    }
    const n = 20;
    return {
      kind: 'fresh' as const,
      title: 'Découvrir de nouveaux mots',
      detail:
        globalSeen === 0
          ? 'Votre première séance : vingt mots pour amorcer la répétition espacée.'
          : 'Mémoire à jour, aucune erreur en attente — place à du vocabulaire neuf.',
      cta: `Apprendre ${n} mots · ≈ ${minutesFor(n)} min`,
      start: () => {
        setScore(null);
        setSession({ words: queue.slice(0, n), mode: 'learn' });
      },
    };
  }, [dueAll, errorWords, globalSeen, queue]);

  const startPractice = () => {
    setScore(null);
    setSession({ words: queue.slice(0, size), mode });
  };

  const finish = (stats?: { right: number; total: number }) => {
    setSession(null);
    if (stats && stats.total > 0) setScore(stats);
  };

  /* ------------------------- Séance en cours -------------------------- */

  if (session?.words.length && session.mode === 'cards') {
    const items: ReviewItem[] = session.words.map((w) => {
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

  if (session?.words.length && (session.mode === 'learn' || session.mode === 'write')) {
    return (
      <Drill
        key={`${session.mode}-${dir}-${session.words[0].id}`}
        words={session.words}
        mode={session.mode as DrillMode}
        direction={dir}
        onExit={finish}
      />
    );
  }

  /* ------------------------------ Page ------------------------------- */

  const dirLabel = dir === 'en-fr' ? 'Anglais → Français' : 'Français → Anglais';

  const scope = {
    '--accent': 'var(--d-en)',
    '--accent-wash': 'color-mix(in srgb, var(--d-en) 10%, var(--surface))',
  } as React.CSSProperties;

  return (
    <div style={scope}>
      <PageHead
        eyebrow="Anglais"
        title="Improve your English"
        display
        lead={
          <>
            {wordCount().toLocaleString('fr-FR')} mots de vocabulaire, trois façons de s'exercer,
            et vos erreurs qui ne se perdent plus.
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
            ariaLabel="Sections de la page anglais"
          />
        }
      />

      {view === 'etudier' && (
        <>
          {/* ------------- Niveau 1 : que faire maintenant ? ------------- */}
          {score && (
            <div className="verdict" style={{ marginBottom: 'var(--s-8)' }}>
              <span className="eyebrow verdict__label">Séance terminée</span>
              <p className="verdict__answer tnum">
                {score.right} / {score.total} — {Math.round((score.right / score.total) * 100)} %
              </p>
            </div>
          )}

          <section className="hub-cta" aria-label="Séance recommandée">
            <div className="hub-cta__body">
              <p className="eyebrow">Aujourd'hui</p>
              <h2 className="hub-cta__title">{reco.title}</h2>
              <p className="meta hub-cta__detail">{reco.detail}</p>
            </div>
            <Button variant="primary" icon="play" onClick={reco.start}>
              {reco.cta}
            </Button>
          </section>

          {/* --------------- Niveau 2 : où en suis-je ? ------------------ */}
          <div className="figures hub-figures">
            <div>
              <span className="figure__value tnum">{globalDue.toLocaleString('fr-FR')}</span>
              <span className="eyebrow figure__label">À revoir</span>
            </div>
            <div>
              <span className="figure__value tnum">{globalSeen.toLocaleString('fr-FR')}</span>
              <span className="eyebrow figure__label">Déjà vus</span>
            </div>
            <div>
              <span className="figure__value tnum">{globalMastered.toLocaleString('fr-FR')}</span>
              <span className="eyebrow figure__label">Acquis</span>
            </div>
            <div>
              <span className="figure__value tnum">{streak}</span>
              <span className="eyebrow figure__label">
                Jour{streak > 1 ? 's' : ''} de série
              </span>
            </div>
          </div>

          {/* ------------ Niveau 3 : entraînement sur mesure ------------- */}
          <section className="section" aria-label="S'entraîner">
            <div className="section__head">
              <h2>S'entraîner à ma façon</h2>
              <p className="meta">
                Choisissez la technique, le thème et la longueur — ou laissez la séance du jour
                décider pour vous.
              </p>
            </div>

            <div className="practice">
              <div className="practice__row">
                <div className="chips" role="group" aria-label="Technique d'exercice">
                  {MODES.map((m) => (
                    <button
                      key={m.value}
                      type="button"
                      className="chip"
                      aria-pressed={mode === m.value}
                      onClick={() => setMode(m.value)}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
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

              <p className="meta practice__hint">{MODE_HINT[mode]}</p>

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

              <div className="practice__row practice__row--start">
                <div className="chips" role="group" aria-label="Longueur de la séance">
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
                {queue.length ? (
                  <Button variant="primary" icon="play" onClick={startPractice}>
                    Commencer — {Math.min(size, queue.length)} mots
                  </Button>
                ) : (
                  <p className="meta">Aucun mot dans ce thème n'attend d'être travaillé.</p>
                )}
              </div>
            </div>
          </section>
        </>
      )}

      {view === 'erreurs' &&
        (errorWords.length === 0 ? (
          <div className="empty">
            <h3>Aucune erreur enregistrée</h3>
            <p className="meta">
              Les mots que vous raterez en séance apparaîtront ici, pour les cibler volontairement.
              Commencez par une séance depuis l'onglet Étudier.
            </p>
          </div>
        ) : (
          <>
            <div className="row row--wrap" style={{ gap: 'var(--s-4)', marginBottom: 'var(--s-8)' }}>
              <Button
                variant="primary"
                icon="play"
                onClick={() => {
                  setScore(null);
                  setSession({
                    words: shuffled(errorWords.map((e) => e.word)).slice(0, 50),
                    mode: 'cards',
                  });
                }}
              >
                Revoir mes {Math.min(50, errorWords.length)} erreurs
              </Button>
              <span className="meta">
                {errorWords.length} mot{errorWords.length > 1 ? 's' : ''} raté
                {errorWords.length > 1 ? 's' : ''} au moins une fois, les plus fragiles d'abord.
              </span>
            </div>
            <div className="lexlist">
              {errorWords.slice(0, LIST_CAP).map(({ srs, word: w }) => (
                <div className="lexrow" key={w.id}>
                  <div>
                    <span className="lexrow__term">{w.t}</span>
                    {w.f && <span className="lexrow__fr">{w.f}</span>}
                  </div>
                  <p className="lexrow__def">{w.e}</p>
                  <span className="micro lexrow__theme tnum">
                    {srs.lapses} échec{srs.lapses > 1 ? 's' : ''}
                  </span>
                </div>
              ))}
            </div>
          </>
        ))}

      {view === 'dico' && (
        <>
          <div className="lex-tools">
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
      )}
    </div>
  );
}
