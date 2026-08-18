import { Link } from 'react-router-dom';
import { addDays, parseDay } from '@/core/date';
import {
  formatDuration,
  isDone,
  isRunning,
  isOverdue,
  PRIORITY_LABEL,
  sortEvents,
  subjectMeta,
  tasksForDay,
  toMinutes,
} from '@/core/planning';
import type { PlanEvent, Task } from '@/core/types';
import { rescheduleTask, toggleTask } from '@/app/actions';
import { Button, Icon } from '@/ui';
import { EventActions, EventClock, PriorityMark, SubjectDot, useNow } from './shared';

/* ------------------------------- Journée --------------------------------- */

export function DayTimeline({
  events,
  now,
  day,
  onEdit,
  onCreate,
}: {
  events: PlanEvent[];
  now: ReturnType<typeof useNow>;
  day: string;
  onEdit: (e: PlanEvent) => void;
  onCreate: () => void;
}) {
  if (events.length === 0) {
    return (
      <div className="empty">
        <h3>Rien de prévu</h3>
        <p className="meta">
          La journée est libre. Posez une séance : elle vous mènera directement au travail, et le
          temps passé viendra nourrir votre suivi.
        </p>
        <Button variant="secondary" icon="plus" onClick={onCreate}>
          Planifier une séance
        </Button>
      </div>
    );
  }

  const enCours = now.day === day;
  return (
    <ol className="timeline">
      {sortEvents(events).map((ev) => {
        const passe = enCours && toMinutes(ev.start) + ev.minutes < now.minutes && !isDone(ev);
        return (
          <li
            key={ev.id}
            className="timeline__row"
            data-done={isDone(ev)}
            data-running={isRunning(ev)}
          >
            <span className="timeline__hour tnum">{ev.start}</span>
            <span
              className="timeline__mark"
              style={{ background: `var(${subjectMeta(ev.subject).colorVar})` }}
              aria-hidden
            />
            <div className="timeline__card">
              <div className="timeline__head">
                <span className="eyebrow timeline__subject">
                  <SubjectDot subject={ev.subject} />
                  {subjectMeta(ev.subject).label}
                  {passe && <span className="plan__late"> · heure passée</span>}
                </span>
                <button
                  type="button"
                  className="btn btn--ghost btn--icon timeline__edit"
                  aria-label={`Modifier « ${ev.title} »`}
                  onClick={() => onEdit(ev)}
                >
                  <Icon name="settings" size={15} />
                </button>
              </div>

              <h3 className="timeline__title">{ev.title}</h3>
              {ev.link && ev.linkLabel && ev.linkLabel !== ev.title && (
                <Link className="micro timeline__link" to={ev.link}>
                  {ev.linkLabel}
                </Link>
              )}
              <EventClock event={ev} nowMs={now.ms} />
              <div className="timeline__foot">
                <EventActions event={ev} />
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* -------------------------------- Tâche ---------------------------------- */

export function TaskRow({
  task,
  today,
  showDue,
  onEdit,
  onSchedule,
}: {
  task: Task;
  today: string;
  showDue?: boolean;
  onEdit: () => void;
  onSchedule: () => void;
}) {
  const done = !!task.doneAt;
  const retard = isOverdue(task, today);
  return (
    <li className="task" data-done={done}>
      <button
        type="button"
        className="task__check"
        role="checkbox"
        aria-checked={done}
        aria-label={`${done ? 'Rouvrir' : 'Terminer'} « ${task.title} »`}
        onClick={() => toggleTask(task)}
      >
        {done && <Icon name="check" size={14} strokeWidth={2.4} />}
      </button>

      <button type="button" className="task__body" onClick={onEdit}>
        <span className="task__title">
          <PriorityMark priority={task.priority} />
          {task.title}
        </span>
        <span className="micro task__meta">
          {/* Les mentions sont assemblées puis séparées : sans quoi une ligne
              sans échéance se termine par un point médian orphelin. */}
          {taskMeta(task, today, showDue).map((part, i) => (
            <span key={i} className="task__part">
              {i > 0 && <span aria-hidden> · </span>}
              {part}
            </span>
          ))}
          {retard && <span className="plan__late">en retard</span>}
        </span>
      </button>

      {!done && (
        <span className="task__actions">
          {retard && (
            <Button
              variant="ghost"
              onClick={() => rescheduleTask(task.id, today)}
              title="Reporter à aujourd'hui"
            >
              Aujourd'hui
            </Button>
          )}
          <Button variant="ghost" icon="calendar" onClick={onSchedule}>
            Planifier
          </Button>
        </span>
      )}
    </li>
  );
}

/** Les mentions d'une tâche, dans l'ordre, sans les vides. */
function taskMeta(task: Task, today: string, showDue?: boolean) {
  const parts: React.ReactNode[] = [];
  if (task.subject) {
    parts.push(
      <>
        <SubjectDot subject={task.subject} /> {subjectMeta(task.subject).label}
      </>,
    );
  }
  if (task.priority !== 'low') parts.push(`Priorité ${PRIORITY_LABEL[task.priority].toLowerCase()}`);
  if (task.minutes) parts.push(formatDuration(task.minutes));
  if (task.repeat) parts.push(task.repeat === 'daily' ? 'chaque jour' : 'chaque semaine');
  if (showDue && task.due) parts.push(dueLabel(task.due, today));
  return parts;
}

function dueLabel(due: string, today: string): string {
  if (due === today) return "aujourd'hui";
  if (due === addDays(today, 1)) return 'demain';
  if (due === addDays(today, -1)) return 'hier';
  return parseDay(due).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

/* -------------------------------- Semaine -------------------------------- */

export function WeekGrid({
  days,
  events,
  tasks,
  today,
  onOpenDay,
}: {
  days: string[];
  events: PlanEvent[];
  tasks: Task[];
  today: string;
  onOpenDay: (day: string) => void;
}) {
  return (
    <div className="week">
      {days.map((day) => {
        const jour = sortEvents(events.filter((e) => e.date === day));
        const ouvertes = tasksForDay(tasks, day).filter((t) => !t.doneAt).length;
        const d = parseDay(day);
        return (
          <button
            key={day}
            type="button"
            className="week__day"
            data-today={day === today}
            onClick={() => onOpenDay(day)}
          >
            <span className="eyebrow week__name">
              {d.toLocaleDateString('fr-FR', { weekday: 'short' }).replace('.', '')}
              <span className="tnum week__num">{d.getDate()}</span>
            </span>

            {jour.length === 0 && ouvertes === 0 ? (
              <span className="micro week__empty">—</span>
            ) : (
              <>
                {jour.map((ev) => (
                  <span key={ev.id} className="week__event" data-done={isDone(ev)}>
                    <span
                      className="week__bullet"
                      style={{ background: `var(${subjectMeta(ev.subject).colorVar})` }}
                      aria-hidden
                    />
                    <span className="tnum week__time">{ev.start}</span>
                    <span className="week__title">{ev.title}</span>
                  </span>
                ))}
                {ouvertes > 0 && (
                  <span className="micro week__tasks">
                    {ouvertes} tâche{ouvertes > 1 ? 's' : ''}
                  </span>
                )}
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
