import { Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/core/db';
import { addDays } from '@/core/date';
import {
  dayGoals,
  formatDuration,
  isRunning,
  nextUp,
  sortEvents,
  startsIn,
  subjectMeta,
  tasksForDay,
} from '@/core/planning';
import { rescheduleTask, toggleTask } from '@/app/actions';
import { Icon } from '@/ui';
import { EventActions, EventClock, PriorityMark, SubjectDot, relativeStart, upcoming, useNow } from './shared';
import './planning.css';

/**
 * Le cockpit du jour, posé sur l'accueil : la prochaine séance, ce qui reste
 * de la journée, les tâches ouvertes. C'est un RÉSUMÉ — le détail vit dans
 * la page Planning, et l'accueil ne doit pas devenir un tableau de bord.
 */
export function TodayPanel() {
  const now = useNow();
  const today = now.day;

  const events = useLiveQuery(() => db.events.where('date').equals(today).toArray(), [today], null);
  const tasks = useLiveQuery(() => db.tasks.toArray(), [], null);
  const logs = useLiveQuery(() => db.timeLogs.where('date').equals(today).toArray(), [today], []);

  if (events === null || tasks === null) return null;

  const jour = sortEvents(events);
  const suivante = nextUp(jour, now.minutes);
  /* Comme dans la page Planning : une tâche devenue séance ne se compte pas
     deux fois, sans quoi la journée paraît deux fois plus chargée. */
  const planifiees = new Set(jour.map((e) => e.taskId).filter(Boolean));
  const dayTasks = tasksForDay(tasks, today).filter((t) => !planifiees.has(t.id));
  const ouvertes = dayTasks.filter((t) => !t.doneAt);
  const goals = dayGoals(jour, dayTasks, logs);
  const restantes = upcoming(jour, now.minutes, 3).filter((e) => e.id !== suivante?.id);
  /* Le soir, ou une fois tout coché, on bascule du « à venir » au « bilan ». */
  const bilan = jour.length > 0 && goals.sessions.done === jour.length;

  return (
    <section className="agenda" aria-label="Votre journée">
      <div className="agenda__head">
        <h2 className="eyebrow">Aujourd'hui</h2>
        <Link className="micro agenda__all" to="/planning">
          Voir le planning <Icon name="chevronRight" size={13} />
        </Link>
      </div>

      {suivante ? (
        <div className="agenda__next">
          <span className="eyebrow agenda__label">
            {isRunning(suivante) ? 'Séance en cours' : 'À suivre'}
          </span>
          <h3 className="agenda__title">
            <SubjectDot subject={suivante.subject} />
            {suivante.title}
          </h3>
          <EventClock event={suivante} nowMs={now.ms} />
          {!isRunning(suivante) && (
            <span className="micro agenda__in">
              {suivante.date === today ? relativeStart(startsIn(suivante, now.minutes)) : ''}
            </span>
          )}
          <div className="agenda__go">
            <EventActions event={suivante} compact />
          </div>
        </div>
      ) : (
        <div className="agenda__next agenda__next--empty">
          <h3 className="agenda__title">
            {bilan ? 'Journée bouclée.' : jour.length ? 'Tout est fait.' : 'Rien de prévu.'}
          </h3>
          <p className="meta">
            {bilan || jour.length
              ? `${goals.sessions.done} séance${goals.sessions.done > 1 ? 's' : ''} · ${formatDuration(goals.minutes.done)} étudiées.`
              : 'La journée est libre — posez une séance quand vous saurez par quoi commencer.'}
          </p>
          <Link className="btn btn--secondary" to="/planning">
            Organiser la journée
          </Link>
        </div>
      )}

      {restantes.length > 0 && (
        <ul className="agenda__list">
          {restantes.map((ev) => (
            <li key={ev.id} className="agenda__item">
              <span className="tnum agenda__hour">{ev.start}</span>
              <span
                className="agenda__bullet"
                style={{ background: `var(${subjectMeta(ev.subject).colorVar})` }}
                aria-hidden
              />
              <span className="agenda__name">{ev.title}</span>
              <span className="micro tnum">{formatDuration(ev.minutes)}</span>
            </li>
          ))}
        </ul>
      )}

      {(ouvertes.length > 0 || goals.tasks.done > 0) && (
        <div className="agenda__tasks">
          <div className="agenda__head">
            <h3 className="eyebrow">
              Tâches · {goals.tasks.done} / {goals.tasks.total}
            </h3>
          </div>
          {ouvertes.length === 0 ? (
            <p className="micro">Tout est coché.</p>
          ) : (
            <ul className="agenda__todo">
              {ouvertes.slice(0, 4).map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    className="task__check"
                    role="checkbox"
                    aria-checked={false}
                    aria-label={`Terminer « ${t.title} »`}
                    onClick={() => toggleTask(t)}
                  />
                  <span className="agenda__todoname">
                    <PriorityMark priority={t.priority} />
                    {t.title}
                  </span>
                  {t.due && t.due < today && (
                    <button
                      type="button"
                      className="micro agenda__push"
                      onClick={() => rescheduleTask(t.id, today)}
                    >
                      en retard — reporter à aujourd'hui
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
          {ouvertes.length > 4 && (
            <Link className="micro agenda__all" to="/planning?v=taches">
              {ouvertes.length - 4} de plus
            </Link>
          )}
        </div>
      )}

      {bilan && ouvertes.length > 0 && (
        <p className="micro agenda__rest">
          Il reste {ouvertes.length} tâche{ouvertes.length > 1 ? 's' : ''} — à reporter à{' '}
          <button
            type="button"
            className="agenda__push"
            onClick={() => ouvertes.forEach((t) => rescheduleTask(t.id, addDays(today, 1)))}
          >
            demain
          </button>{' '}
          si la journée est finie.
        </p>
      )}
    </section>
  );
}
