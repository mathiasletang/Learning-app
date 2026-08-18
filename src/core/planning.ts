/* =========================================================================
   Planning — la logique de la journée, sans une ligne d'interface.

   Le planning n'est pas un agenda : c'est la réponse à « qu'est-ce que je
   fais maintenant ». D'où deux partis pris que ce module tient :

   1. Rien d'artificiel. Les objectifs du jour se déduisent des séances
      posées et du temps réellement enregistré — pas d'un chiffre inventé.
   2. Une tâche et sa séance sont la même chose vue de deux endroits. Ce
      module sait passer de l'une à l'autre ; c'est le reste de
      l'application qui n'a pas à s'en soucier.

   Module PUR, couvert par des tests.
   ========================================================================= */

import { addDays, parseDay, toDayStr } from './date';
import type { PlanEvent, PlanSubject, Priority, Task, TimeLog } from './types';

/* ------------------------------- Matières ------------------------------- */

export interface PlanSubjectMeta {
  id: PlanSubject;
  label: string;
  colorVar: string;
  /** Où l'on travaille cette matière, faute d'activité plus précise. */
  route: string;
  /** Sujet utilisé par les relevés de temps (db.timeLogs). */
  timeSubject: string;
}

export const PLAN_SUBJECTS: PlanSubjectMeta[] = [
  { id: 'anglais', label: 'Anglais', colorVar: '--d-en', route: '/anglais', timeSubject: 'en' },
  { id: 'maths', label: 'Maths', colorVar: '--m-opt', route: '/maths', timeSubject: 'opt' },
  { id: 'cfa', label: 'CFA · Finance', colorVar: '--m-cfa', route: '/cfa', timeSubject: 'cfa' },
  { id: 'code', label: 'Code', colorVar: '--m-code', route: '/code', timeSubject: 'code' },
  { id: 'autre', label: 'Autre', colorVar: '--accent', route: '/', timeSubject: 'gen' },
];

export function subjectMeta(id?: PlanSubject): PlanSubjectMeta {
  return PLAN_SUBJECTS.find((s) => s.id === id) ?? PLAN_SUBJECTS[PLAN_SUBJECTS.length - 1];
}

export const PRIORITY_LABEL: Record<Priority, string> = {
  high: 'Haute',
  mid: 'Moyenne',
  low: 'Basse',
};

/** Ordre de tri : ce qui presse d'abord. */
const PRIORITY_RANK: Record<Priority, number> = { high: 0, mid: 1, low: 2 };

/* --------------------------------- Heures -------------------------------- */

/** « 09:30 » → 570. Une saisie illisible vaut minuit, jamais NaN. */
export function toMinutes(hhmm: string): number {
  const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm.trim());
  if (!m) return 0;
  return Math.min(24 * 60, Number(m[1]) * 60 + Number(m[2]));
}

/** 570 → « 09:30 », en restant dans la journée. */
export function toClock(minutes: number): string {
  const v = Math.max(0, Math.min(24 * 60 - 1, Math.round(minutes)));
  return `${String(Math.floor(v / 60)).padStart(2, '0')}:${String(v % 60).padStart(2, '0')}`;
}

/** Fin d'une séance, en horloge. */
export function eventEnd(ev: Pick<PlanEvent, 'start' | 'minutes'>): string {
  return toClock(toMinutes(ev.start) + ev.minutes);
}

/** « 1 h 30 », « 45 min » — jamais « 90 min ». */
export function formatDuration(minutes: number): string {
  const m = Math.max(0, Math.round(minutes));
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const rest = m % 60;
  return rest === 0 ? `${h} h` : `${h} h ${String(rest).padStart(2, '0')}`;
}

/** Minutes écoulées depuis le début d'une séance lancée. */
export function elapsedMinutes(startedAt: string, now: number = Date.now()): number {
  const t = Date.parse(startedAt);
  if (Number.isNaN(t)) return 0;
  return Math.max(0, Math.round((now - t) / 60000));
}

/* -------------------------------- Journée -------------------------------- */

export function sortEvents(events: PlanEvent[]): PlanEvent[] {
  return [...events].sort((a, b) => toMinutes(a.start) - toMinutes(b.start) || a.createdAt.localeCompare(b.createdAt));
}

export const isDone = (e: PlanEvent) => !!e.doneAt;
export const isRunning = (e: PlanEvent) => !!e.startedAt && !e.doneAt;

/**
 * La prochaine séance : celle qui est en cours s'il y en a une, sinon la
 * première à venir, sinon — la journée étant entamée — la première encore
 * ouverte. On ne renvoie jamais une séance déjà faite.
 */
export function nextUp(events: PlanEvent[], nowMinutes: number): PlanEvent | null {
  const open = sortEvents(events).filter((e) => !isDone(e));
  return (
    open.find(isRunning) ??
    open.find((e) => toMinutes(e.start) + e.minutes >= nowMinutes) ??
    open[0] ??
    null
  );
}

/** Minutes avant le début — négatif si l'heure est déjà passée. */
export function startsIn(ev: PlanEvent, nowMinutes: number): number {
  return toMinutes(ev.start) - nowMinutes;
}

/* --------------------------------- Tâches -------------------------------- */

export const taskDone = (t: Task) => !!t.doneAt;

/** En retard : due hier ou avant, et toujours ouverte. */
export function isOverdue(t: Task, today: string = toDayStr()): boolean {
  return !taskDone(t) && !!t.due && t.due < today;
}

/** Les tâches du jour : dues aujourd'hui, plus tout ce qui traîne. */
export function tasksForDay(tasks: Task[], day: string): Task[] {
  const today = toDayStr();
  return sortTasks(
    tasks.filter((t) => {
      if (t.due === day) return true;
      // Le retard ne se voit que sur la journée en cours, pas dans le passé.
      return day === today && isOverdue(t, today);
    }),
  );
}

/** Ouvertes d'abord, puis priorité, puis échéance, puis création. */
export function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort(
    (a, b) =>
      Number(taskDone(a)) - Number(taskDone(b)) ||
      PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority] ||
      (a.due ?? '9999').localeCompare(b.due ?? '9999') ||
      a.createdAt.localeCompare(b.createdAt),
  );
}

/** L'échéance de l'occurrence suivante d'une tâche récurrente. */
export function nextOccurrence(task: Task, from: string = toDayStr()): string | undefined {
  if (!task.repeat) return undefined;
  const base = task.due && task.due > from ? task.due : from;
  return addDays(base, task.repeat === 'daily' ? 1 : 7);
}

/* -------------------------------- Semaine -------------------------------- */

/** Le lundi de la semaine contenant `day`. */
export function weekStart(day: string): string {
  const d = parseDay(day);
  const shift = (d.getDay() + 6) % 7; // dimanche = 6
  return addDays(day, -shift);
}

/** Les sept jours de la semaine de `day`, du lundi au dimanche. */
export function weekDays(day: string): string[] {
  const start = weekStart(day);
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

/* ------------------------------- Objectifs ------------------------------- */

export interface DayGoals {
  sessions: { done: number; total: number };
  tasks: { done: number; total: number };
  /** Minutes réellement enregistrées / minutes posées au planning. */
  minutes: { done: number; planned: number };
}

/**
 * Les compteurs du jour, tirés des seules données réelles : les séances
 * posées, les tâches dues, et le temps enregistré dans db.timeLogs — celui
 * qu'alimentent aussi bien le planning que le reste de l'application.
 */
export function dayGoals(events: PlanEvent[], tasks: Task[], logs: TimeLog[]): DayGoals {
  const done = events.filter(isDone);
  return {
    sessions: { done: done.length, total: events.length },
    tasks: { done: tasks.filter(taskDone).length, total: tasks.length },
    minutes: {
      done: logs.reduce((n, l) => n + l.minutes, 0),
      planned: events.reduce((n, e) => n + e.minutes, 0),
    },
  };
}

/** Un pourcentage borné, pour les jauges — 0 quand il n'y a rien à faire. */
export function ratio(done: number, total: number): number {
  if (total <= 0) return 0;
  return Math.max(0, Math.min(1, done / total));
}
