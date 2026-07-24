import { Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/core/db';
import { toDayStr } from '@/core/date';
import { useApp, useLevel } from '@/app/store';
import { allQuestions, getParcours, stepIdsOfTrack } from '@/core/content';
import { BANKS, BANK_ORDER } from '@/core/meta';
import { Card, CardButton, Progress, Ring, Icon, Tag } from '@/ui';
import type { TrackId } from '@/core/types';

function greeting(): string {
  const h = new Date().getHours();
  if (h < 6) return 'Bonne nuit';
  if (h < 12) return 'Bonjour';
  if (h < 18) return 'Bon après-midi';
  return 'Bonsoir';
}

const TRACK_KEYS: TrackId[] = ['opt', 'fin', 'cfa'];

export function Dashboard() {
  const gam = useApp((s) => s.gam);
  const level = useLevel();
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

  const totalScore = sessions.reduce((n, s) => n + s.score, 0);
  const totalAnswered = sessions.reduce((n, s) => n + s.total, 0);
  const accuracy = totalAnswered > 0 ? totalScore / totalAnswered : 0;

  const allSteps = TRACK_KEYS.flatMap((t) => stepIdsOfTrack(t));
  const doneCount = allSteps.filter((id) => doneSteps.has(id)).length;
  const globalProgress = allSteps.length ? doneCount / allSteps.length : 0;

  const goalToday = gam.goalDoneDay === today ? gam.goalDoneToday : 0;
  const goalRatio = dailyGoal > 0 ? Math.min(1, goalToday / dailyGoal) : 0;

  const parcours = getParcours();
  // Prochaine étape non faite (dans l'ordre des parcours).
  let nextStep: { track: TrackId; phaseTitle: string; stepTitle: string } | null = null;
  outer: for (const t of TRACK_KEYS) {
    const track = parcours[t];
    if (!track) continue;
    for (const phase of track.phases) {
      for (const step of phase.steps) {
        if (!doneSteps.has(step.id)) {
          nextStep = { track: t, phaseTitle: phase.t, stepTitle: step.t };
          break outer;
        }
      }
    }
  }

  const totalQuestions = allQuestions().length;
  const dueTotal = (dueCards ?? 0) + (dueVocab ?? 0);

  return (
    <>
      <div className="page-head">
        <p className="meta">{greeting()}, Mathias 👋</p>
        <h1>Niveau {level.level} · {gam.xp} XP</h1>
        <div style={{ maxWidth: 320, marginTop: 'var(--s-3)' }}>
          <Progress value={level.progress} label={`Progression vers le niveau ${level.level + 1}`} />
          <p className="meta tnum" style={{ marginTop: 'var(--s-1)' }}>
            {level.intoLevel} / {level.span} XP vers le niveau {level.level + 1}
          </p>
        </div>
      </div>

      {/* Cartes de synthèse */}
      <div
        className="grid"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', marginBottom: 'var(--s-8)' }}
      >
        <Card>
          <div className="row row--between">
            <span className="section-title" style={{ margin: 0 }}>
              Objectif du jour
            </span>
            <Icon name="target" size={18} />
          </div>
          <div className="row" style={{ marginTop: 'var(--s-3)' }}>
            <Ring value={goalRatio} size={72} stroke={8} label={`${goalToday} sur ${dailyGoal}`}>
              <strong className="tnum">{goalToday}</strong>
            </Ring>
            <div className="stack">
              <strong className="tnum" style={{ fontSize: 'var(--fs-h2)' }}>
                {goalToday}/{dailyGoal}
              </strong>
              <span className="meta">questions aujourd'hui</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="row row--between">
            <span className="section-title" style={{ margin: 0 }}>
              À réviser
            </span>
            <Icon name="cards" size={18} />
          </div>
          <strong className="tnum" style={{ fontSize: 'var(--fs-display)', display: 'block', marginTop: 'var(--s-2)' }}>
            {dueTotal}
          </strong>
          <p className="meta">
            {dueCards ?? 0} flashcard{(dueCards ?? 0) > 1 ? 's' : ''} · {dueVocab ?? 0} mot
            {(dueVocab ?? 0) > 1 ? 's' : ''}
          </p>
          {dueTotal > 0 && (
            <div className="row" style={{ gap: 'var(--s-2)', marginTop: 'var(--s-3)' }}>
              <Link className="btn btn--sm btn--secondary" to="/flashcards">
                Flashcards
              </Link>
              <Link className="btn btn--sm btn--secondary" to="/vocabulaire">
                Vocabulaire
              </Link>
            </div>
          )}
        </Card>

        <Card>
          <div className="row row--between">
            <span className="section-title" style={{ margin: 0 }}>
              Précision QCM
            </span>
            <Icon name="quiz" size={18} />
          </div>
          <strong className="tnum" style={{ fontSize: 'var(--fs-display)', display: 'block', marginTop: 'var(--s-2)' }}>
            {totalAnswered > 0 ? `${Math.round(accuracy * 100)}%` : '—'}
          </strong>
          <p className="meta">{totalAnswered} question{totalAnswered > 1 ? 's' : ''} répondues</p>
        </Card>

        <Card>
          <div className="row row--between">
            <span className="section-title" style={{ margin: 0 }}>
              Progression
            </span>
            <Icon name="tracks" size={18} />
          </div>
          <strong className="tnum" style={{ fontSize: 'var(--fs-display)', display: 'block', marginTop: 'var(--s-2)' }}>
            {Math.round(globalProgress * 100)}%
          </strong>
          <p className="meta">
            {doneCount}/{allSteps.length} étapes de parcours
          </p>
          <div style={{ marginTop: 'var(--s-2)' }}>
            <Progress value={globalProgress} />
          </div>
        </Card>
      </div>

      {/* Reprendre */}
      <section style={{ marginBottom: 'var(--s-8)' }}>
        <h2 style={{ marginBottom: 'var(--s-4)' }}>Reprendre</h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {nextStep ? (
            <Link to="/parcours" style={{ textDecoration: 'none' }}>
              <Card pad="lg" className="card--interactive" style={{ height: '100%' }}>
                <Tag colorVar={BANKS[nextStep.track].colorVar}>{parcours[nextStep.track].titre}</Tag>
                <h3 style={{ marginTop: 'var(--s-3)' }}>{nextStep.stepTitle}</h3>
                <p className="meta">{nextStep.phaseTitle}</p>
                <span className="row" style={{ color: 'var(--accent)', marginTop: 'var(--s-3)', fontWeight: 600 }}>
                  Continuer le parcours <Icon name="chevronRight" size={16} />
                </span>
              </Card>
            </Link>
          ) : (
            <Card pad="lg">
              <h3>Tout est coché 🎉</h3>
              <p className="meta">Tu as terminé toutes les étapes des parcours.</p>
            </Card>
          )}

          <Link to="/qcm" style={{ textDecoration: 'none' }}>
            <Card pad="lg" className="card--interactive" style={{ height: '100%' }}>
              <Tag>QCM</Tag>
              <h3 style={{ marginTop: 'var(--s-3)' }}>S'entraîner</h3>
              <p className="meta">{totalQuestions} questions dans 5 banques</p>
              <span className="row" style={{ color: 'var(--accent)', marginTop: 'var(--s-3)', fontWeight: 600 }}>
                Lancer une session <Icon name="chevronRight" size={16} />
              </span>
            </Card>
          </Link>
        </div>
      </section>

      {/* Aperçu des banques */}
      <section>
        <h2 style={{ marginBottom: 'var(--s-4)' }}>Banques de QCM</h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {BANK_ORDER.map((b) => {
            const meta = BANKS[b];
            const count = allQuestions().filter((q) => q.bank === b).length;
            return (
              <Link key={b} to={`/qcm/${b}`} style={{ textDecoration: 'none' }}>
                <CardButton style={{ height: '100%' }} tabIndex={-1}>
                  <div className="row row--between">
                    <Tag colorVar={meta.colorVar}>{meta.short}</Tag>
                    {meta.lang === 'en' && <span className="meta">EN</span>}
                  </div>
                  <h3 style={{ marginTop: 'var(--s-3)' }}>{meta.title}</h3>
                  <p className="meta tnum">{count} questions</p>
                </CardButton>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
