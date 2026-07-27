import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/core/db';
import { toDayStr } from '@/core/date';
import { useApp } from '@/app/store';
import { allQuestions, getParcours, stepIdsOfTrack, allVocabCards } from '@/core/content';
import { BANKS, BANK_ORDER } from '@/core/meta';
import type { TrackId } from '@/core/types';
import { Icon, Tag, Gauge, Reveal } from '@/ui';
import './dashboard.css';

const TRACKS: TrackId[] = ['opt', 'fin', 'cfa'];

function greeting(): string {
  const h = new Date().getHours();
  if (h < 5) return 'Bonne nuit';
  if (h < 12) return 'Bonjour';
  if (h < 18) return 'Bon après-midi';
  return 'Bonsoir';
}

function todayLabel(): string {
  return new Date()
    .toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
    .replace(/^\w/, (c) => c.toUpperCase());
}

function Figure({
  value,
  label,
  note,
  muted,
}: {
  value: string;
  label: string;
  note?: string;
  muted?: boolean;
}) {
  return (
    <div>
      <span className={`figure__value tnum ${muted ? 'figure__value--muted' : ''}`}>{value}</span>
      <span className="eyebrow figure__label">{label}</span>
      {note && <span className="micro figure__note">{note}</span>}
    </div>
  );
}

export function Dashboard() {
  const gam = useApp((s) => s.gam);
  const dailyGoal = useApp((s) => s.prefs.dailyGoal);
  const today = toDayStr();

  const dueCards = useLiveQuery(() => db.flashcards.where('due').belowOrEqual(today).count(), [today], 0);
  const dueVocab = useLiveQuery(() => db.vocabSrs.where('due').belowOrEqual(today).count(), [today], 0);
  const sessions = useLiveQuery(() => db.qcmSessions.toArray(), [], []);
  const doneSteps = useLiveQuery(
    () => db.steps.filter((s) => s.done).toArray().then((r) => new Set(r.map((s) => s.stepId))),
    [],
    new Set<string>(),
  );

  const answered = sessions.reduce((n, s) => n + s.total, 0);
  const correct = sessions.reduce((n, s) => n + s.score, 0);
  const accuracy = answered > 0 ? correct / answered : 0;

  const allSteps = TRACKS.flatMap(stepIdsOfTrack);
  const doneCount = allSteps.filter((id) => doneSteps.has(id)).length;
  const progress = allSteps.length ? doneCount / allSteps.length : 0;

  const goalToday = gam.goalDoneDay === today ? gam.goalDoneToday : 0;
  const due = (dueCards ?? 0) + (dueVocab ?? 0);

  const parcours = getParcours();
  let next: { track: TrackId; phase: string; step: string } | null = null;
  outer: for (const t of TRACKS) {
    for (const phase of parcours[t].phases) {
      for (const step of phase.steps) {
        if (!doneSteps.has(step.id)) {
          next = { track: t, phase: phase.t, step: step.t };
          break outer;
        }
      }
    }
  }

  const totalQ = allQuestions().length;
  const totalV = allVocabCards().length;

  return (
    <>
      {/* ---------------------------- Ouverture --------------------------- */}
      <section className="hero">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {todayLabel()}
        </motion.p>
        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          {greeting()}, Mathias.
          <br />
          <em>Reprenons.</em>
        </motion.h1>
        <motion.p
          className="lead hero__lead"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        >
          Trois parcours, {totalQ} questions et {totalV} mots vous attendent. Une séance courte
          vaut mieux qu'une longue remise à demain.
        </motion.p>
      </section>

      {/* ----------------------------- Chiffres --------------------------- */}
      <Reveal>
        <div className="figures">
          <Figure
            value={`${goalToday}/${dailyGoal}`}
            label="Objectif du jour"
            note={goalToday >= dailyGoal ? 'Atteint' : `${dailyGoal - goalToday} restantes`}
          />
          <Figure
            value={String(due)}
            label="À réviser"
            note={`${dueCards ?? 0} cartes · ${dueVocab ?? 0} mots`}
            muted={due === 0}
          />
          <Figure
            value={answered > 0 ? `${Math.round(accuracy * 100)}%` : '—'}
            label="Précision"
            note={`${answered} question${answered > 1 ? 's' : ''}`}
            muted={answered === 0}
          />
          <Figure
            value={`${Math.round(progress * 100)}%`}
            label="Progression"
            note={`${doneCount} / ${allSteps.length} étapes`}
            muted={doneCount === 0}
          />
        </div>
      </Reveal>

      {/* ---------------------------- Reprendre --------------------------- */}
      <section className="section">
        <div className="section__head">
          <h2>Reprendre</h2>
          <Link className="arrow-link" to="/parcours">
            Tous les parcours <Icon name="arrowRight" size={16} />
          </Link>
        </div>

        <Reveal>
          <div className="resume">
            {next ? (
              <Link to="/parcours" className="tile resume__main">
                <Tag colorVar={`--m-${next.track}`}>{parcours[next.track].titre}</Tag>
                <h3 className="resume__title">{next.step}</h3>
                <p className="meta" style={{ marginTop: 'var(--s-3)' }}>
                  {next.phase}
                </p>
                <div className="resume__foot">
                  <span className="arrow-link">
                    Continuer <Icon name="arrowRight" size={16} />
                  </span>
                </div>
              </Link>
            ) : (
              <div className="tile resume__main">
                <Tag>Parcours</Tag>
                <h3 className="resume__title">Toutes les étapes sont faites.</h3>
                <p className="meta" style={{ marginTop: 'var(--s-3)' }}>
                  Consolidez avec les questions et les révisions.
                </p>
              </div>
            )}

            <div className="resume__side">
              <Link to="/qcm" className="tile">
                <Tag>Questions</Tag>
                <h3 style={{ marginTop: 'var(--s-4)' }}>S'entraîner</h3>
                <p className="meta" style={{ marginTop: 'var(--s-2)' }}>
                  {totalQ} questions, cinq banques, quatre modes.
                </p>
                <span className="arrow-link" style={{ marginTop: 'var(--s-6)' }}>
                  Lancer une séance <Icon name="arrowRight" size={16} />
                </span>
              </Link>

              <Link to={due > 0 ? '/flashcards' : '/vocabulaire'} className="tile">
                <Tag>Mémoire</Tag>
                <h3 style={{ marginTop: 'var(--s-4)' }}>
                  {due > 0 ? `${due} à revoir` : 'Rien à revoir'}
                </h3>
                <p className="meta" style={{ marginTop: 'var(--s-2)' }}>
                  {due > 0
                    ? 'La répétition espacée fixe ce qui vient d’être appris.'
                    : 'Revenez demain, la file se remplira.'}
                </p>
                <span className="arrow-link" style={{ marginTop: 'var(--s-6)' }}>
                  {due > 0 ? 'Réviser' : 'Explorer le vocabulaire'} <Icon name="arrowRight" size={16} />
                </span>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ----------------------------- Banques ---------------------------- */}
      <section className="section">
        <div className="section__head">
          <h2>Banques de questions</h2>
          <span className="meta tnum">{totalQ} au total</span>
        </div>

        <div className="banklist">
          {BANK_ORDER.map((b, i) => {
            const meta = BANKS[b];
            const count = allQuestions().filter((q) => q.bank === b).length;
            const bankSessions = sessions.filter((s) => s.bank === b);
            const bTotal = bankSessions.reduce((n, s) => n + s.total, 0);
            const bScore = bankSessions.reduce((n, s) => n + s.score, 0);
            return (
              <Reveal key={b} delay={i * 0.05} y={12}>
                <Link to={`/qcm/${b}`} className="bankrow">
                  <span className="bankrow__index">{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <span className="bankrow__name" style={{ display: 'block' }}>
                      {meta.title}
                    </span>
                    <span className="micro" style={{ marginTop: 'var(--s-2)', display: 'block' }}>
                      {count} questions{meta.lang === 'en' ? ' · English' : ''}
                    </span>
                  </span>
                  <span className="bankrow__meta">
                    <span className="meta tnum">
                      {bTotal > 0 ? `${Math.round((bScore / bTotal) * 100)}%` : '—'}
                    </span>
                    <span style={{ display: 'block', width: 72, marginTop: 'var(--s-2)' }}>
                      <Gauge value={bTotal > 0 ? bScore / bTotal : 0} colorVar={meta.colorVar} />
                    </span>
                  </span>
                  <Icon name="arrowRight" size={17} className="bankrow__arrow" />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
