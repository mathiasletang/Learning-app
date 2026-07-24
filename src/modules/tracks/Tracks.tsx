import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/core/db';
import { getParcours } from '@/core/content';
import { parseResource, openDocument, type ResourceKind } from '@/core/open';
import { BANKS } from '@/core/meta';
import { setStepDone } from '@/app/actions';
import type { TrackId } from '@/core/types';
import { PageHead } from '@/ui/PageHead';
import { Card, Progress, Segmented, Icon, Tag } from '@/ui';
import type { IconName } from '@/ui/Icon';
import './tracks.css';

const RES_ICON: Record<ResourceKind, IconName> = {
  course: 'course',
  quiz: 'quiz',
  pdf: 'external',
  page: 'external',
};

function ResourceChip({ res, label }: { res: string; label: string }) {
  const parsed = parseResource(res);
  const icon = <Icon name={RES_ICON[parsed.kind]} size={15} />;
  if (parsed.kind === 'course') {
    return (
      <Link className="resource" to={`/cours/${parsed.target}`}>
        {icon} {label}
      </Link>
    );
  }
  if (parsed.kind === 'quiz') {
    return (
      <Link className="resource" to={`/qcm/${parsed.target}`}>
        {icon} {label}
      </Link>
    );
  }
  return (
    <button type="button" className="resource" onClick={() => openDocument(parsed.target)}>
      {icon} {label}
    </button>
  );
}

const TRACK_KEYS: TrackId[] = ['opt', 'fin', 'cfa'];

export function Tracks() {
  const parcours = getParcours();
  const [track, setTrack] = useState<TrackId>('opt');
  const doneSet = useLiveQuery(
    () => db.steps.filter((s) => s.done).toArray().then((r) => new Set(r.map((s) => s.stepId))),
    [],
    new Set<string>(),
  );

  const current = parcours[track];
  const allStepIds = useMemo(
    () => current.phases.flatMap((p) => p.steps.map((s) => s.id)),
    [current],
  );
  const doneCount = allStepIds.filter((id) => doneSet.has(id)).length;
  const trackProgress = allStepIds.length ? doneCount / allStepIds.length : 0;

  return (
    <>
      <PageHead
        title="Parcours"
        subtitle="Feuilles de route par phases et étapes. Coche une étape pour gagner de l'XP."
        actions={
          <Segmented
            options={TRACK_KEYS.map((t) => ({ value: t, label: parcours[t].court }))}
            value={track}
            onChange={(v) => setTrack(v as TrackId)}
            ariaLabel="Choisir un parcours"
          />
        }
      />

      <Card pad="lg" style={{ marginBottom: 'var(--s-6)' }}>
        <div className="row row--between row--wrap" style={{ gap: 'var(--s-3)' }}>
          <div>
            <Tag colorVar={BANKS[track].colorVar}>{current.titre}</Tag>
            <h2 style={{ marginTop: 'var(--s-2)' }}>{current.cible}</h2>
          </div>
          <div className="stack" style={{ alignItems: 'flex-end' }}>
            <strong className="tnum" style={{ fontSize: 'var(--fs-h1)' }}>
              {Math.round(trackProgress * 100)}%
            </strong>
            <span className="meta tnum">
              {doneCount}/{allStepIds.length} étapes · {current.heures} h estimées
            </span>
          </div>
        </div>
        <div style={{ marginTop: 'var(--s-4)' }}>
          <Progress value={trackProgress} colorVar={BANKS[track].colorVar} />
        </div>
      </Card>

      {current.phases.map((phase) => {
        const total = phase.steps.length;
        const done = phase.steps.filter((s) => doneSet.has(s.id)).length;
        const ratio = total ? done / total : 0;
        return (
          <div className="phase" key={phase.id}>
            <div className="phase__head">
              <div className="phase__title">
                <h3>{phase.t}</h3>
                <span className="meta tnum">
                  {done}/{total} · {phase.h} h
                </span>
              </div>
              {phase.d && <p className="meta" style={{ marginTop: 'var(--s-1)' }}>{phase.d}</p>}
              <div style={{ marginTop: 'var(--s-3)' }}>
                <Progress value={ratio} colorVar={BANKS[track].colorVar} />
              </div>
            </div>
            <div className="phase__body">
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
                      <Icon name="check" size={16} />
                    </button>
                    <div className="step__main">
                      <div className="step__label">{step.t}</div>
                      {step.r && step.r.length > 0 && (
                        <div className="resources">
                          {step.r.map(([res, label], i) => (
                            <ResourceChip key={i} res={res} label={label} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
