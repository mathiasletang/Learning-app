import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toDayStr } from '@/core/date';
import {
  elapsedMinutes,
  eventEnd,
  formatDuration,
  isRunning,
  subjectMeta,
  toMinutes,
} from '@/core/planning';
import type { PlanEvent, PlanSubject, Priority } from '@/core/types';
import { completeEvent, startEvent } from '@/app/actions';
import { Icon } from '@/ui';
import type { IconName } from '@/ui/Icon';

/** Une matière, une icône — jamais un émoji (voir CLAUDE.md). */
export const SUBJECT_ICON: Record<PlanSubject, IconName> = {
  anglais: 'vocab',
  maths: 'sigma',
  cfa: 'chart',
  code: 'code',
  autre: 'clock',
};

export const PRIORITY_ORDER: Priority[] = ['high', 'mid', 'low'];

/**
 * L'heure courante, rafraîchie toutes les trente secondes.
 * « Commence dans 42 min » ne vaut que si le chiffre descend tout seul.
 */
export function useNow(): { day: string; minutes: number; ms: number } {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  return {
    day: toDayStr(now),
    minutes: now.getHours() * 60 + now.getMinutes(),
    ms: now.getTime(),
  };
}

/** « dans 42 min », « dans 2 h 10 », « il y a 15 min ». */
export function relativeStart(deltaMinutes: number): string {
  if (deltaMinutes >= 0) return `dans ${formatDuration(deltaMinutes)}`;
  return `il y a ${formatDuration(-deltaMinutes)}`;
}

/** Le point coloré de matière — un signe dessiné, pas un caractère. */
export function SubjectDot({ subject }: { subject?: PlanSubject }) {
  return (
    <span
      className="plan__dot"
      style={{ background: `var(${subjectMeta(subject).colorVar})` }}
      aria-hidden
    />
  );
}

export function PriorityMark({ priority }: { priority: Priority }) {
  if (priority === 'low') return null;
  return (
    <span
      className={`plan__prio plan__prio--${priority}`}
      title={priority === 'high' ? 'Priorité haute' : 'Priorité moyenne'}
      aria-label={priority === 'high' ? 'Priorité haute' : 'Priorité moyenne'}
    />
  );
}

/**
 * Les deux commandes d'une séance : la lancer (ce qui démarre le chronomètre
 * et ouvre l'activité visée) et la terminer.
 */
export function EventActions({ event, compact }: { event: PlanEvent; compact?: boolean }) {
  const navigate = useNavigate();
  const meta = subjectMeta(event.subject);

  if (event.doneAt) {
    return (
      <span className="plan__done">
        <Icon name="check" size={15} strokeWidth={2.2} />
        {event.doneMinutes ? formatDuration(event.doneMinutes) : 'Terminée'}
      </span>
    );
  }

  return (
    <span className="plan__actions">
      {isRunning(event) ? (
        <button type="button" className="btn btn--primary" onClick={() => completeEvent(event)}>
          Terminer
        </button>
      ) : (
        <button
          type="button"
          className="btn btn--primary"
          onClick={async () => {
            await startEvent(event.id);
            navigate(event.link ?? meta.route);
          }}
        >
          <Icon name="play" size={16} />
          Commencer
        </button>
      )}
      {!compact && (
        <button
          type="button"
          className="btn btn--ghost btn--icon"
          aria-label="Marquer la séance comme terminée"
          title="Terminer sans chronomètre"
          onClick={() => completeEvent(event)}
        >
          <Icon name="check" size={16} />
        </button>
      )}
    </span>
  );
}

/** La ligne d'heures d'une séance : début, fin, durée, et l'état s'il y en a un. */
export function EventClock({ event, nowMs }: { event: PlanEvent; nowMs: number }) {
  const running = isRunning(event);
  return (
    <span className="micro plan__clock">
      <span className="tnum">
        {event.start} → {eventEnd(event)}
      </span>
      <span aria-hidden> · </span>
      {formatDuration(event.minutes)}
      {running && (
        <>
          <span aria-hidden> · </span>
          <span className="plan__running">
            en cours depuis {formatDuration(elapsedMinutes(event.startedAt!, nowMs))}
          </span>
        </>
      )}
    </span>
  );
}

/** Trie et coupe les séances d'un jour pour un affichage résumé. */
export function upcoming(events: PlanEvent[], nowMinutes: number, max: number): PlanEvent[] {
  const open = events.filter((e) => !e.doneAt);
  const àVenir = open.filter((e) => toMinutes(e.start) + e.minutes >= nowMinutes);
  return (àVenir.length ? àVenir : open).slice(0, max);
}
