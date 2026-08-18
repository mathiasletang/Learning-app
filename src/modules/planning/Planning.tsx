import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/core/db';
import { addDays, parseDay } from '@/core/date';
import {
  dayGoals,
  formatDuration,
  ratio,
  sortEvents,
  sortTasks,
  tasksForDay,
  weekDays,
} from '@/core/planning';
import type { PlanEvent, Task } from '@/core/types';
import { createTask, scheduleTask } from '@/app/actions';
import { Button, PageHead, Tabs } from '@/ui';
import { EventForm, ScheduleForm, TaskForm } from './forms';
import { DayTimeline, TaskRow, WeekGrid } from './views';
import { useNow } from './shared';
import './planning.css';

type View = 'jour' | 'semaine' | 'taches';

const VIEWS: { value: View; label: string }[] = [
  { value: 'jour', label: 'Jour' },
  { value: 'semaine', label: 'Semaine' },
  { value: 'taches', label: 'Tâches' },
];

function dayLabel(day: string, today: string): string {
  if (day === today) return "Aujourd'hui";
  if (day === addDays(today, 1)) return 'Demain';
  if (day === addDays(today, -1)) return 'Hier';
  return parseDay(day)
    .toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
    .replace(/^\w/, (c) => c.toUpperCase());
}

/**
 * Le planning : une journée en colonne, la semaine en survol, les tâches à
 * côté. Trois vues d'un même jeu de données — pas trois outils.
 */
export function Planning() {
  const [params, setParams] = useSearchParams();
  const now = useNow();
  const today = now.day;

  const raw = params.get('v') as View | null;
  const view: View = raw && VIEWS.some((v) => v.value === raw) ? raw : 'jour';
  const day = params.get('j') || today;

  const setView = (v: View) => setParams(v === 'jour' ? {} : { v }, { replace: false });
  const setDay = (d: string) =>
    setParams(d === today ? { v: 'jour' } : { v: 'jour', j: d }, { replace: false });

  const events = useLiveQuery(() => db.events.toArray(), [], null);
  const tasks = useLiveQuery(() => db.tasks.toArray(), [], null);
  const logs = useLiveQuery(() => db.timeLogs.where('date').equals(day).toArray(), [day], []);

  const [eventForm, setEventForm] = useState<{ open: boolean; event?: PlanEvent }>({ open: false });
  const [taskForm, setTaskForm] = useState<{ open: boolean; task?: Task }>({ open: false });
  const [scheduling, setScheduling] = useState<Task | null>(null);
  const [quick, setQuick] = useState('');

  const dayEvents = useMemo(
    () => sortEvents((events ?? []).filter((e) => e.date === day)),
    [events, day],
  );
  /* Une tâche déjà posée dans la journée n'y figure pas deux fois : elle est
     devenue une séance, et c'est la séance qui la représente. */
  const dayTasks = useMemo(() => {
    const planifiees = new Set(dayEvents.map((e) => e.taskId).filter(Boolean));
    return tasksForDay(tasks ?? [], day).filter((t) => !planifiees.has(t.id));
  }, [tasks, day, dayEvents]);
  const goals = useMemo(() => dayGoals(dayEvents, dayTasks, logs), [dayEvents, dayTasks, logs]);

  if (events === null || tasks === null) return <p className="meta">Chargement…</p>;

  async function addQuick() {
    const titre = quick.trim();
    if (!titre) return;
    await createTask({ title: titre, priority: 'mid', due: day });
    setQuick('');
  }

  return (
    <>
      <PageHead
        eyebrow="Planning"
        title="Votre journée"
        display
        lead="Ce qui est prévu, ce qui reste à faire, et par quoi commencer. Les séances mènent directement au travail."
        actions={<Tabs options={VIEWS} value={view} onChange={setView} ariaLabel="Vues du planning" />}
      />

      {view === 'semaine' ? (
        <WeekGrid
          days={weekDays(day)}
          events={events}
          tasks={tasks}
          today={today}
          onOpenDay={(d) => setDay(d)}
        />
      ) : view === 'taches' ? (
        <section className="section">
          <div className="plan__quick">
            <input
              className="field"
              value={quick}
              placeholder="Ajouter une tâche et appuyer sur Entrée"
              aria-label="Nouvelle tâche"
              onChange={(e) => setQuick(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addQuick()}
            />
            <Button variant="secondary" icon="plus" onClick={addQuick} disabled={!quick.trim()}>
              Ajouter
            </Button>
            <Button variant="ghost" onClick={() => setTaskForm({ open: true })}>
              Avec détails
            </Button>
          </div>

          <AllTasks
            tasks={tasks}
            today={today}
            onEdit={(t) => setTaskForm({ open: true, task: t })}
            onSchedule={(t) => setScheduling(t)}
          />
        </section>
      ) : (
        <>
          <div className="plan__daybar">
            <Button
              variant="ghost"
              icon="arrowLeft"
              aria-label="Jour précédent"
              onClick={() => setDay(addDays(day, -1))}
            />
            <h2 className="plan__dayname">{dayLabel(day, today)}</h2>
            <Button
              variant="ghost"
              icon="arrowRight"
              aria-label="Jour suivant"
              onClick={() => setDay(addDays(day, 1))}
            />
            {day !== today && (
              <Button variant="ghost" onClick={() => setDay(today)}>
                Revenir à aujourd'hui
              </Button>
            )}
            <span className="spacer" />
            <Button variant="primary" icon="plus" onClick={() => setEventForm({ open: true })}>
              Planifier une séance
            </Button>
          </div>

          <Goals goals={goals} />

          <DayTimeline
            events={dayEvents}
            now={now}
            day={day}
            onEdit={(e) => setEventForm({ open: true, event: e })}
            onCreate={() => setEventForm({ open: true })}
          />

          <section className="section">
            <div className="section__head">
              <h2>Tâches du jour</h2>
              <span className="meta tnum">
                {goals.tasks.done} / {goals.tasks.total}
              </span>
            </div>
            <div className="plan__quick">
              <input
                className="field"
                value={quick}
                placeholder="Ajouter une tâche et appuyer sur Entrée"
                aria-label="Nouvelle tâche du jour"
                onChange={(e) => setQuick(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addQuick()}
              />
              <Button variant="secondary" icon="plus" onClick={addQuick} disabled={!quick.trim()}>
                Ajouter
              </Button>
            </div>
            {dayTasks.length === 0 ? (
              <div className="empty">
                <h3>Aucune tâche pour cette journée</h3>
                <p className="meta">Profitez du temps libre, ou notez ce qui traîne.</p>
              </div>
            ) : (
              <ul className="plan__tasks">
                {dayTasks.map((t) => (
                  <TaskRow
                    key={t.id}
                    task={t}
                    today={today}
                    onEdit={() => setTaskForm({ open: true, task: t })}
                    onSchedule={() => setScheduling(t)}
                  />
                ))}
              </ul>
            )}
          </section>
        </>
      )}

      <EventForm
        open={eventForm.open}
        event={eventForm.event}
        date={day}
        onClose={() => setEventForm({ open: false })}
      />
      <TaskForm
        open={taskForm.open}
        task={taskForm.task}
        date={day}
        onClose={() => setTaskForm({ open: false })}
      />
      <ScheduleForm
        open={!!scheduling}
        task={scheduling}
        onClose={() => setScheduling(null)}
        onSchedule={async (d, start, minutes) => {
          if (scheduling) await scheduleTask(scheduling, d, start, minutes);
        }}
      />
    </>
  );
}

/* ------------------------------ Objectifs -------------------------------- */

function Goals({ goals }: { goals: ReturnType<typeof dayGoals> }) {
  if (goals.sessions.total === 0 && goals.tasks.total === 0 && goals.minutes.done === 0) return null;
  const barres = [
    {
      label: 'Séances',
      value: `${goals.sessions.done} / ${goals.sessions.total}`,
      r: ratio(goals.sessions.done, goals.sessions.total),
    },
    {
      label: 'Tâches',
      value: `${goals.tasks.done} / ${goals.tasks.total}`,
      r: ratio(goals.tasks.done, goals.tasks.total),
    },
    {
      label: 'Temps d’étude',
      value: goals.minutes.planned
        ? `${formatDuration(goals.minutes.done)} / ${formatDuration(goals.minutes.planned)}`
        : formatDuration(goals.minutes.done),
      r: ratio(goals.minutes.done, goals.minutes.planned),
    },
  ];
  return (
    <div className="plan__goals">
      {barres.map((b) => (
        <div key={b.label} className="plan__goal">
          <span className="eyebrow">{b.label}</span>
          <span className="plan__bar">
            <span className="plan__fill" style={{ width: `${Math.round(b.r * 100)}%` }} />
          </span>
          <span className="micro tnum">{b.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------- Toutes les tâches ----------------------------- */

function AllTasks({
  tasks,
  today,
  onEdit,
  onSchedule,
}: {
  tasks: Task[];
  today: string;
  onEdit: (t: Task) => void;
  onSchedule: (t: Task) => void;
}) {
  const ouvertes = sortTasks(tasks.filter((t) => !t.doneAt));
  const faites = sortTasks(tasks.filter((t) => t.doneAt)).slice(0, 12);

  if (tasks.length === 0) {
    return (
      <div className="empty">
        <h3>Aucune tâche</h3>
        <p className="meta">
          Notez ce qu'il y a à faire : réviser un chapitre, finir une série d'exercices, rendre un
          dossier. Une tâche peut ensuite se poser dans le planning.
        </p>
      </div>
    );
  }

  return (
    <>
      <ul className="plan__tasks">
        {ouvertes.map((t) => (
          <TaskRow
            key={t.id}
            task={t}
            today={today}
            showDue
            onEdit={() => onEdit(t)}
            onSchedule={() => onSchedule(t)}
          />
        ))}
      </ul>
      {faites.length > 0 && (
        <>
          <div className="section__head" style={{ marginTop: 'var(--s-10)' }}>
            <h2>Terminées</h2>
            <span className="meta tnum">{tasks.filter((t) => t.doneAt).length}</span>
          </div>
          <ul className="plan__tasks">
            {faites.map((t) => (
              <TaskRow
                key={t.id}
                task={t}
                today={today}
                showDue
                onEdit={() => onEdit(t)}
                onSchedule={() => onSchedule(t)}
              />
            ))}
          </ul>
        </>
      )}
    </>
  );
}
