import { useEffect, useState } from 'react';
import { toDayStr } from '@/core/date';
import { PLAN_SUBJECTS, PRIORITY_LABEL, subjectMeta } from '@/core/planning';
import type { PlanEvent, PlanSubject, Priority, Task } from '@/core/types';
import { createEvent, createTask, deleteEvent, deleteTask, updateEvent, updateTask } from '@/app/actions';
import { Button, Modal } from '@/ui';
import { activityByRoute, activityGroups } from './links';
import { PRIORITY_ORDER } from './shared';

const DURATIONS = [15, 30, 45, 60, 90, 120, 180];

/* ----------------------------- Séance ----------------------------------- */

export function EventForm({
  open,
  onClose,
  event,
  date,
}: {
  open: boolean;
  onClose: () => void;
  /** Séance existante à modifier ; absente, on en crée une. */
  event?: PlanEvent;
  /** Jour proposé à la création. */
  date: string;
}) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState<PlanSubject>('maths');
  const [day, setDay] = useState(date);
  const [start, setStart] = useState('09:00');
  const [minutes, setMinutes] = useState(60);
  const [link, setLink] = useState('');

  /* À l'ouverture, le formulaire se cale sur la séance ou sur des valeurs
     plausibles — on ne retape pas ce que l'application peut deviner. */
  useEffect(() => {
    if (!open) return;
    setTitle(event?.title ?? '');
    setSubject(event?.subject ?? 'maths');
    setDay(event?.date ?? date);
    setStart(event?.start ?? prochaineHeureRonde());
    setMinutes(event?.minutes ?? 60);
    setLink(event?.link ?? '');
  }, [open, event, date]);

  const activity = activityByRoute(link);

  async function submit() {
    const nom = title.trim() || activity?.label || subjectMeta(subject).label;
    const payload = {
      date: day,
      start,
      minutes,
      title: nom,
      subject,
      link: link || undefined,
      linkLabel: activity?.label,
    };
    if (event) await updateEvent(event.id, payload);
    else await createEvent(payload);
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={event ? 'Modifier la séance' : 'Planifier une séance'}
      footer={
        <>
          {event && (
            <Button
              variant="ghost"
              icon="trash"
              onClick={async () => {
                await deleteEvent(event.id);
                onClose();
              }}
            >
              Supprimer
            </Button>
          )}
          <span className="spacer" />
          <Button variant="ghost" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={submit}>
            {event ? 'Enregistrer' : 'Planifier'}
          </Button>
        </>
      }
    >
      <div className="form">
        <label className="form__field">
          <span className="eyebrow">Activité</span>
          <select
            className="field"
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
              const opt = activityByRoute(e.target.value);
              if (opt) {
                setSubject(opt.subject);
                if (!title.trim()) setTitle(opt.label);
              }
            }}
          >
            <option value="">Aucune — séance libre</option>
            {activityGroups().map((g) => (
              <optgroup key={g.group} label={g.group}>
                {g.options.map((o) => (
                  <option key={o.route} value={o.route}>
                    {o.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>

        <label className="form__field">
          <span className="eyebrow">Intitulé</span>
          <input
            className="field"
            value={title}
            placeholder={activity?.label ?? 'Ce que vous travaillez'}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <div className="form__row">
          <label className="form__field">
            <span className="eyebrow">Matière</span>
            <select
              className="field"
              value={subject}
              onChange={(e) => setSubject(e.target.value as PlanSubject)}
            >
              {PLAN_SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <label className="form__field">
            <span className="eyebrow">Jour</span>
            <input className="field" type="date" value={day} onChange={(e) => setDay(e.target.value)} />
          </label>
        </div>

        <div className="form__row">
          <label className="form__field">
            <span className="eyebrow">Début</span>
            <input
              className="field"
              type="time"
              value={start}
              step={300}
              onChange={(e) => setStart(e.target.value)}
            />
          </label>
          <label className="form__field">
            <span className="eyebrow">Durée</span>
            <select
              className="field"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
            >
              {DURATIONS.map((d) => (
                <option key={d} value={d}>
                  {d < 60 ? `${d} min` : d % 60 === 0 ? `${d / 60} h` : `${Math.floor(d / 60)} h ${d % 60}`}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </Modal>
  );
}

/** L'heure ronde qui vient — on planifie rarement pour « il y a dix minutes ». */
function prochaineHeureRonde(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() > 30 ? 60 : 30, 0, 0);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

/* ------------------------------ Tâche ------------------------------------ */

export function TaskForm({
  open,
  onClose,
  task,
  date,
}: {
  open: boolean;
  onClose: () => void;
  task?: Task;
  date: string;
}) {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [priority, setPriority] = useState<Priority>('mid');
  const [due, setDue] = useState(date);
  const [subject, setSubject] = useState<PlanSubject | ''>('');
  const [minutes, setMinutes] = useState<number | ''>('');
  const [repeat, setRepeat] = useState<'' | 'daily' | 'weekly'>('');

  useEffect(() => {
    if (!open) return;
    setTitle(task?.title ?? '');
    setNote(task?.note ?? '');
    setPriority(task?.priority ?? 'mid');
    setDue(task?.due ?? date);
    setSubject(task?.subject ?? '');
    setMinutes(task?.minutes ?? '');
    setRepeat(task?.repeat ?? '');
  }, [open, task, date]);

  async function submit() {
    if (!title.trim()) return;
    const payload = {
      title: title.trim(),
      note: note.trim() || undefined,
      priority,
      due: due || undefined,
      subject: (subject || undefined) as PlanSubject | undefined,
      minutes: minutes === '' ? undefined : Number(minutes),
      repeat: repeat || undefined,
    };
    if (task) await updateTask(task.id, payload);
    else await createTask(payload);
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={task ? 'Modifier la tâche' : 'Nouvelle tâche'}
      footer={
        <>
          {task && (
            <Button
              variant="ghost"
              icon="trash"
              onClick={async () => {
                await deleteTask(task.id);
                onClose();
              }}
            >
              Supprimer
            </Button>
          )}
          <span className="spacer" />
          <Button variant="ghost" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={submit} disabled={!title.trim()}>
            {task ? 'Enregistrer' : 'Créer'}
          </Button>
        </>
      }
    >
      <div className="form">
        <label className="form__field">
          <span className="eyebrow">Tâche</span>
          <input
            className="field"
            value={title}
            autoFocus
            placeholder="Ce qu'il y a à faire"
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
          />
        </label>

        <label className="form__field">
          <span className="eyebrow">Précision</span>
          <textarea
            className="field"
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>

        <div className="form__row">
          <label className="form__field">
            <span className="eyebrow">Priorité</span>
            <select
              className="field"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
            >
              {PRIORITY_ORDER.map((p) => (
                <option key={p} value={p}>
                  {PRIORITY_LABEL[p]}
                </option>
              ))}
            </select>
          </label>
          <label className="form__field">
            <span className="eyebrow">Échéance</span>
            <input className="field" type="date" value={due} onChange={(e) => setDue(e.target.value)} />
          </label>
        </div>

        <div className="form__row">
          <label className="form__field">
            <span className="eyebrow">Matière</span>
            <select
              className="field"
              value={subject}
              onChange={(e) => setSubject(e.target.value as PlanSubject | '')}
            >
              <option value="">Aucune</option>
              {PLAN_SUBJECTS.filter((s) => s.id !== 'autre').map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <label className="form__field">
            <span className="eyebrow">Durée estimée</span>
            <select
              className="field"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value === '' ? '' : Number(e.target.value))}
            >
              <option value="">Inconnue</option>
              {DURATIONS.map((d) => (
                <option key={d} value={d}>
                  {d < 60 ? `${d} min` : d % 60 === 0 ? `${d / 60} h` : `${Math.floor(d / 60)} h ${d % 60}`}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="form__field">
          <span className="eyebrow">Récurrence</span>
          <select
            className="field"
            value={repeat}
            onChange={(e) => setRepeat(e.target.value as '' | 'daily' | 'weekly')}
          >
            <option value="">Une seule fois</option>
            <option value="daily">Chaque jour</option>
            <option value="weekly">Chaque semaine</option>
          </select>
        </label>
      </div>
    </Modal>
  );
}

/* --------------------------- Planifier une tâche ------------------------- */

export function ScheduleForm({
  open,
  onClose,
  task,
  onSchedule,
}: {
  open: boolean;
  onClose: () => void;
  task: Task | null;
  onSchedule: (date: string, start: string, minutes: number) => Promise<void>;
}) {
  const [day, setDay] = useState(toDayStr());
  const [start, setStart] = useState('09:00');
  const [minutes, setMinutes] = useState(60);

  useEffect(() => {
    if (!open || !task) return;
    setDay(task.due ?? toDayStr());
    setStart(prochaineHeureRonde());
    setMinutes(task.minutes ?? 60);
  }, [open, task]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Placer dans le planning"
      footer={
        <>
          <span className="spacer" />
          <Button variant="ghost" onClick={onClose}>
            Annuler
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
              await onSchedule(day, start, minutes);
              onClose();
            }}
          >
            Planifier
          </Button>
        </>
      }
    >
      <p className="meta" style={{ marginBottom: 'var(--s-6)' }}>
        {task?.title}
      </p>
      <div className="form__row">
        <label className="form__field">
          <span className="eyebrow">Jour</span>
          <input className="field" type="date" value={day} onChange={(e) => setDay(e.target.value)} />
        </label>
        <label className="form__field">
          <span className="eyebrow">Début</span>
          <input
            className="field"
            type="time"
            step={300}
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </label>
        <label className="form__field">
          <span className="eyebrow">Durée</span>
          <select className="field" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))}>
            {DURATIONS.map((d) => (
              <option key={d} value={d}>
                {d < 60 ? `${d} min` : d % 60 === 0 ? `${d / 60} h` : `${Math.floor(d / 60)} h ${d % 60}`}
              </option>
            ))}
          </select>
        </label>
      </div>
    </Modal>
  );
}
