import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/core/db';
import { toDayStr } from '@/core/date';
import {
  elapsedMinutes,
  eventEnd,
  formatDuration,
  isRunning,
  isStudy,
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
  cours: 'school',
  perso: 'heart',
  sport: 'sport',
  rdv: 'meeting',
  autre: 'clock',
};

export const PRIORITY_ORDER: Priority[] = ['high', 'mid', 'low'];

/** Une séance qu'on subit : elle vient de l'emploi du temps, pas de vous. */
export const estFige = (e: PlanEvent) => e.source === 'edt';

/**
 * Toutes les séances d'un jeu unique : les vôtres et les cours de
 * l'université. Deux tables en base — une seule journée à l'écran, sans quoi
 * il faudrait regarder à deux endroits pour savoir si l'après-midi est libre.
 *
 * `day` restreint la lecture à une date : l'accueil n'a que faire de l'année.
 */
export function usePlanEvents(day?: string): PlanEvent[] | null {
  const miennes = useLiveQuery(
    () => (day ? db.events.where('date').equals(day).toArray() : db.events.toArray()),
    [day],
    null,
  );
  const cours = useLiveQuery(
    () => (day ? db.edt.where('date').equals(day).toArray() : db.edt.toArray()),
    [day],
    null,
  );
  return useMemo(
    () => (miennes === null ? null : [...miennes, ...(cours ?? [])]),
    [miennes, cours],
  );
}

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

/** Vrai tant que la fenêtre satisfait la requête média — la grille horaire à
    sept colonnes n'a aucun sens sur un téléphone. */
export function useMediaQuery(query: string): boolean {
  const [ok, setOk] = useState(() => window.matchMedia?.(query).matches ?? false);
  useEffect(() => {
    const mq = window.matchMedia?.(query);
    if (!mq) return;
    const onChange = () => setOk(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return ok;
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

  /* Un cours de l'emploi du temps ne se lance pas, ne se chronomètre pas et ne
     se coche pas : il a lieu, qu'on le veuille ou non. La prochaine
     synchronisation écraserait de toute façon la coche. */
  if (estFige(event)) {
    return (
      <span className="micro plan__origine">
        <Icon name="school" size={14} /> Emploi du temps
      </span>
    );
  }

  if (event.doneAt) {
    return (
      <span className="plan__done">
        <Icon name="check" size={15} strokeWidth={2.2} />
        {event.doneMinutes && isStudy(event.subject)
          ? formatDuration(event.doneMinutes)
          : 'Terminé'}
      </span>
    );
  }

  /* Hors étude — un cours en amphi, un rendez-vous : rien à lancer et rien à
     chronométrer, seulement de quoi le cocher quand c'est passé. */
  if (!isStudy(event.subject)) {
    return (
      <button
        type="button"
        className="btn btn--secondary"
        onClick={() => completeEvent(event)}
      >
        <Icon name="check" size={16} /> Fait
      </button>
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
  /* Le repli montre ce qui traîne — mais un cours passé ne traîne pas, il a
     eu lieu : sans cette exclusion, la journée finirait par ne plus lister
     que des amphis terminés. */
  const restant = open.filter((e) => !estFige(e));
  return (àVenir.length ? àVenir : restant).slice(0, max);
}
