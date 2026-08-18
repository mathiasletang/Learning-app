import { Link } from 'react-router-dom';
import { addDays, parseDay } from '@/core/date';
import {
  dayRange,
  formatDuration,
  isDone,
  isRunning,
  isOverdue,
  layoutDay,
  PRIORITY_LABEL,
  sameMonth,
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
        const passe =
          enCours && !ev.allDay && toMinutes(ev.start) + ev.minutes < now.minutes && !isDone(ev);
        return (
          <li
            key={ev.id}
            className="timeline__row"
            data-done={isDone(ev)}
            data-running={isRunning(ev)}
          >
            <span className="timeline__hour tnum">{ev.allDay ? 'jour' : ev.start}</span>
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
              {ev.allDay ? (
                <span className="micro plan__clock">Journée entière</span>
              ) : (
                <EventClock event={ev} nowMs={now.ms} />
              )}
              {ev.note && <p className="micro timeline__note">{ev.note}</p>}
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

/* --------------------------- Semaine, en grille -------------------------- */

const PX_PAR_MINUTE = 0.85;

/**
 * La semaine comme un agenda : les heures en marge, sept colonnes, et les
 * séances posées à leur place réelle. Deux séances qui se chevauchent se
 * partagent la largeur.
 */
export function WeekTimeGrid({
  days,
  events,
  today,
  now,
  onOpenDay,
  onEdit,
  onCreate,
}: {
  days: string[];
  events: PlanEvent[];
  today: string;
  now: ReturnType<typeof useNow>;
  onOpenDay: (day: string) => void;
  onEdit: (e: PlanEvent) => void;
  onCreate: (day: string, start: string) => void;
}) {
  const semaine = events.filter((e) => days.includes(e.date));
  const [from, to] = dayRange(semaine);
  const heures = Array.from({ length: to - from }, (_, i) => from + i);
  const hauteur = (to - from) * 60 * PX_PAR_MINUTE;
  const journees = days.map((d) => semaine.filter((e) => e.date === d && e.allDay));
  const aDesJourneesEntieres = journees.some((j) => j.length > 0);

  return (
    <div className="grid">
      <div className="grid__head">
        <span className="grid__gutter" aria-hidden />
        {days.map((day) => {
          const d = parseDay(day);
          return (
            <button
              key={day}
              type="button"
              className="grid__dayname"
              data-today={day === today}
              onClick={() => onOpenDay(day)}
            >
              <span className="eyebrow">
                {d.toLocaleDateString('fr-FR', { weekday: 'short' }).replace('.', '')}
              </span>
              <span className="grid__daynum tnum">{d.getDate()}</span>
            </button>
          );
        })}
      </div>

      {aDesJourneesEntieres && (
        <div className="grid__allday">
          <span className="grid__gutter micro">Journée</span>
          {days.map((day, i) => (
            <div key={day} className="grid__alldaycell">
              {journees[i].map((ev) => (
                <button
                  key={ev.id}
                  type="button"
                  className="grid__band"
                  style={{ '--_c': `var(${subjectMeta(ev.subject).colorVar})` } as React.CSSProperties}
                  onClick={() => onEdit(ev)}
                >
                  {ev.title}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="grid__body" style={{ height: hauteur }}>
        <div className="grid__gutter grid__hours">
          {heures.map((h) => (
            <span key={h} className="micro grid__hour" style={{ top: (h - from) * 60 * PX_PAR_MINUTE }}>
              {String(h).padStart(2, '0')}:00
            </span>
          ))}
        </div>

        {days.map((day) => (
          <div key={day} className="grid__col" data-today={day === today}>
            {heures.map((h) => (
              <button
                key={h}
                type="button"
                className="grid__slot"
                style={{ top: (h - from) * 60 * PX_PAR_MINUTE, height: 60 * PX_PAR_MINUTE }}
                aria-label={`Planifier le ${day} à ${String(h).padStart(2, '0')}:00`}
                onClick={() => onCreate(day, `${String(h).padStart(2, '0')}:00`)}
              />
            ))}

            {layoutDay(semaine.filter((e) => e.date === day)).map(({ event, from: f, to: t, column, columns }) => (
              <button
                key={event.id}
                type="button"
                className="grid__event"
                data-done={isDone(event)}
                data-running={isRunning(event)}
                style={
                  {
                    top: (f - from * 60) * PX_PAR_MINUTE,
                    height: Math.max(18, (t - f) * PX_PAR_MINUTE - 2),
                    left: `calc(${(column / columns) * 100}% + 2px)`,
                    width: `calc(${100 / columns}% - 4px)`,
                    '--_c': `var(${subjectMeta(event.subject).colorVar})`,
                  } as React.CSSProperties
                }
                onClick={() => onEdit(event)}
              >
                <span className="grid__eventtitle">{event.title}</span>
                <span className="grid__eventtime tnum">{event.start}</span>
              </button>
            ))}

            {day === today && now.minutes >= from * 60 && now.minutes <= to * 60 && (
              <span
                className="grid__now"
                style={{ top: (now.minutes - from * 60) * PX_PAR_MINUTE }}
                aria-hidden
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- Mois --------------------------------- */

/** Le mois entier, cinq ou six semaines — la vue d'ensemble. */
export function MonthGrid({
  weeks,
  events,
  tasks,
  today,
  month,
  onOpenDay,
}: {
  weeks: string[][];
  events: PlanEvent[];
  tasks: Task[];
  today: string;
  month: string;
  onOpenDay: (day: string) => void;
}) {
  const JOURS = ['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim'];
  return (
    <div className="month">
      <div className="month__head">
        {JOURS.map((j) => (
          <span key={j} className="eyebrow month__dayname">
            {j}
          </span>
        ))}
      </div>
      {weeks.map((semaine) => (
        <div key={semaine[0]} className="month__week">
          {semaine.map((day) => {
            const jour = sortEvents(events.filter((e) => e.date === day));
            const ouvertes = tasksForDay(tasks, day).filter((t) => !t.doneAt).length;
            return (
              <button
                key={day}
                type="button"
                className="month__cell"
                data-today={day === today}
                data-outside={!sameMonth(day, month)}
                onClick={() => onOpenDay(day)}
              >
                <span className="month__num tnum">{parseDay(day).getDate()}</span>
                {jour.slice(0, 3).map((ev) => (
                  <span
                    key={ev.id}
                    className="month__event"
                    data-done={isDone(ev)}
                    style={{ '--_c': `var(${subjectMeta(ev.subject).colorVar})` } as React.CSSProperties}
                  >
                    <span className="month__bullet" aria-hidden />
                    {!ev.allDay && <span className="tnum month__time">{ev.start}</span>}
                    <span className="month__title">{ev.title}</span>
                  </span>
                ))}
                {jour.length > 3 && <span className="micro month__more">+ {jour.length - 3}</span>}
                {ouvertes > 0 && (
                  <span className="micro month__tasks">
                    {ouvertes} tâche{ouvertes > 1 ? 's' : ''}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
