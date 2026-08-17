import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/core/db';
import { getParcours } from '@/core/content';
import { parseResource, type ResourceKind } from '@/core/open';
import { TRACK_COLOR } from '@/core/meta';
import type { SubjectDef } from '@/core/subjects';
import { setStepDone, openResource } from '@/app/actions';
import type { TrackId } from '@/core/types';
import { Gauge, Icon, Tabs, Tag, Reveal } from '@/ui';
import type { IconName } from '@/ui/Icon';
import '@/modules/tracks/tracks.css';

const RES_ICON: Record<ResourceKind, IconName> = {
  course: 'book',
  quiz: 'quiz',
  pdf: 'external',
  page: 'external',
};

function Resource({ res, label }: { res: string; label: string }) {
  const parsed = parseResource(res);
  const icon = <Icon name={RES_ICON[parsed.kind]} size={14} />;
  if (parsed.kind === 'course')
    return (
      <Link className="resource" to={`/cours/${parsed.target}`}>
        {icon} {label}
      </Link>
    );
  if (parsed.kind === 'quiz')
    return (
      <Link className="resource" to={`/qcm/${parsed.target}`}>
        {icon} {label}
      </Link>
    );
  return (
    <button type="button" className="resource" onClick={() => openResource(parsed.target)}>
      {icon} {label}
    </button>
  );
}

/** Les phases préfixées « L3 · », « M1 · », « M2 · » affichent leur niveau. */
function splitLevel(title: string): { level: string | null; rest: string } {
  const m = /^(L3|M1|M2)\s*·\s*(.+)$/.exec(title);
  return m ? { level: m[1], rest: m[2] } : { level: null, rest: title };
}

/** La route de la matière : phases, étapes à cocher, ressources en un geste. */
export function SubjectTrack({ def }: { def: SubjectDef }) {
  const parcours = getParcours();
  const [track, setTrack] = useState<TrackId>(def.tracks[0]);
  const doneSet = useLiveQuery(
    () => db.steps.filter((s) => s.done).toArray().then((r) => new Set(r.map((s) => s.stepId))),
    [],
    new Set<string>(),
  );

  const current = parcours[track];
  const allIds = useMemo(() => current.phases.flatMap((p) => p.steps.map((s) => s.id)), [current]);
  const done = allIds.filter((id) => doneSet.has(id)).length;
  const ratio = allIds.length ? done / allIds.length : 0;

  return (
    <>
      {def.tracks.length > 1 && (
        <div style={{ marginBottom: 'var(--s-8)' }}>
          <Tabs
            options={def.tracks.map((t) => ({ value: t, label: parcours[t].court }))}
            value={track}
            onChange={(v) => setTrack(v as TrackId)}
            ariaLabel="Choisir un parcours"
          />
        </div>
      )}

      <div className="track-hero">
        <div>
          <Tag colorVar={TRACK_COLOR[track]}>{current.titre}</Tag>
          <p className="track-hero__aim">{current.cible}</p>
        </div>
        <div className="track-hero__stat">
          <span className="track-hero__pct tnum">{Math.round(ratio * 100)}%</span>
          <p className="micro" style={{ marginTop: 'var(--s-3)' }}>
            {done} / {allIds.length} étapes · {current.heures} h estimées
          </p>
          <div style={{ marginTop: 'var(--s-4)', minWidth: 160 }}>
            <Gauge value={ratio} colorVar={TRACK_COLOR[track]} thick />
          </div>
        </div>
      </div>

      {current.phases.map((phase, pi) => {
        const total = phase.steps.length;
        const pDone = phase.steps.filter((s) => doneSet.has(s.id)).length;
        const { level, rest } = splitLevel(phase.t);
        const prevLevel = pi > 0 ? splitLevel(current.phases[pi - 1].t).level : null;
        const startsLevel = level !== null && level !== prevLevel;
        return (
          <Reveal key={phase.id} y={16}>
            {startsLevel && (
              <div className="levelmark">
                <span className="levelmark__badge">{level}</span>
                <span className="rule" style={{ flex: 1 }} />
              </div>
            )}
            <section className="phase">
              <header className="phase__head">
                <span className="phase__num">{String(pi + 1).padStart(2, '0')}</span>
                <div>
                  <h2 className="phase__title">{rest}</h2>
                  {phase.d && <p className="meta phase__desc">{phase.d}</p>}
                </div>
                <div className="phase__meter">
                  <span className="micro tnum">
                    {pDone}/{total} · {phase.h} h
                  </span>
                  <Gauge value={total ? pDone / total : 0} colorVar={TRACK_COLOR[track]} />
                </div>
              </header>

              <div className="steps">
                {phase.steps.map((step) => {
                  const isDone = doneSet.has(step.id);
                  return (
                    <div key={step.id} className={`step ${isDone ? 'step--done' : ''}`}>
                      <button
                        type="button"
                        className="step__check"
                        role="checkbox"
                        aria-checked={isDone}
                        aria-label={isDone ? `Décocher : ${step.t}` : `Cocher : ${step.t}`}
                        onClick={() => setStepDone(step.id, !isDone)}
                      >
                        <Icon name="check" size={13} strokeWidth={2} />
                      </button>
                      <div>
                        <p className="step__label">{step.t}</p>
                        {step.r && step.r.length > 0 && (
                          <div className="resources">
                            {step.r.map(([res, label], i) => (
                              <Resource key={i} res={res} label={label} />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </Reveal>
        );
      })}
    </>
  );
}
