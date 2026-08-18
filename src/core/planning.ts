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
  /**
   * Compte-t-il comme du travail ? Un cours en amphi, un rendez-vous ou une
   * séance de sport ont leur place dans la journée, mais pas dans le temps
   * d'étude : gonfler ce chiffre le rendrait inutile.
   */
  study: boolean;
}

export const PLAN_SUBJECTS: PlanSubjectMeta[] = [
  { id: 'anglais', label: 'Anglais', colorVar: '--d-en', route: '/anglais', timeSubject: 'en', study: true },
  { id: 'maths', label: 'Maths', colorVar: '--m-opt', route: '/maths', timeSubject: 'opt', study: true },
  { id: 'cfa', label: 'CFA · Finance', colorVar: '--m-cfa', route: '/cfa', timeSubject: 'cfa', study: true },
  { id: 'code', label: 'Code', colorVar: '--m-code', route: '/code', timeSubject: 'code', study: true },
  { id: 'cours', label: 'Cours et TD', colorVar: '--c-cours', route: '/', timeSubject: 'cours', study: false },
  { id: 'perso', label: 'Personnel', colorVar: '--c-perso', route: '/', timeSubject: 'perso', study: false },
  { id: 'sport', label: 'Sport', colorVar: '--c-sport', route: '/', timeSubject: 'sport', study: false },
  { id: 'rdv', label: 'Rendez-vous', colorVar: '--c-rdv', route: '/', timeSubject: 'rdv', study: false },
  /* Le fourre-tout reste du côté travail : une séance posée sans préciser la
     matière vient de l'application d'étude, pas de la vie courante. Ce qui
     n'est pas du travail se choisit explicitement. */
  { id: 'autre', label: 'Autre travail', colorVar: '--accent', route: '/', timeSubject: 'gen', study: true },
];

/** Les matières, pour ce qui ne concerne que l'étude (tâches, liens). */
export const STUDY_SUBJECTS = PLAN_SUBJECTS.filter((s) => s.study);

/** Une séance d'étude compte dans les objectifs et dans le temps ; pas un rendez-vous. */
export function isStudy(subject?: PlanSubject): boolean {
  return subjectMeta(subject).study;
}

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
  return [...events].sort(
    (a, b) =>
      // Une journée entière n'a pas d'heure : elle passe en tête.
      Number(!!b.allDay) - Number(!!a.allDay) ||
      toMinutes(a.start) - toMinutes(b.start) ||
      a.createdAt.localeCompare(b.createdAt),
  );
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
  /* Les rendez-vous et le sport tiennent leur place dans la journée, pas dans
     les compteurs d'étude. */
  const study = events.filter((e) => isStudy(e.subject));
  const done = study.filter(isDone);
  return {
    sessions: { done: done.length, total: study.length },
    tasks: { done: tasks.filter(taskDone).length, total: tasks.length },
    minutes: {
      done: logs.reduce((n, l) => n + l.minutes, 0),
      planned: study.reduce((n, e) => n + (e.allDay ? 0 : e.minutes), 0),
    },
  };
}

/** Un pourcentage borné, pour les jauges — 0 quand il n'y a rien à faire. */
export function ratio(done: number, total: number): number {
  if (total <= 0) return 0;
  return Math.max(0, Math.min(1, done / total));
}

/* --------------------------------- Mois ---------------------------------- */

/**
 * La grille d'un mois : des semaines entières, du lundi au dimanche, qui
 * débordent sur les mois voisins pour ne jamais laisser de trou. Cinq ou six
 * semaines selon le mois — comme un calendrier mural.
 */
export function monthGrid(day: string): string[][] {
  const d = parseDay(day);
  const premier = toDayStr(new Date(d.getFullYear(), d.getMonth(), 1));
  const dernier = toDayStr(new Date(d.getFullYear(), d.getMonth() + 1, 0));
  const semaines: string[][] = [];
  for (let jour = weekStart(premier); jour <= weekStart(dernier); jour = addDays(jour, 7)) {
    semaines.push(weekDays(jour));
  }
  return semaines;
}

/** Le mois de `day`, décalé de `n` mois — en restant sur le premier du mois. */
export function shiftMonth(day: string, n: number): string {
  const d = parseDay(day);
  return toDayStr(new Date(d.getFullYear(), d.getMonth() + n, 1));
}

export function sameMonth(a: string, b: string): boolean {
  return a.slice(0, 7) === b.slice(0, 7);
}

/* ---------------------------- Grille horaire ----------------------------- */

export interface Slot {
  event: PlanEvent;
  /** Position et hauteur, en minutes depuis minuit. */
  from: number;
  to: number;
  /** Colonne occupée et nombre de colonnes du groupe qui se chevauche. */
  column: number;
  columns: number;
}

/**
 * Place les séances d'une journée dans une grille horaire.
 *
 * Deux séances qui se chevauchent se partagent la largeur, comme dans un
 * agenda : on regroupe les chevauchements en grappes, et chaque séance prend
 * la première colonne libre de sa grappe. Les journées entières n'entrent pas
 * ici — elles se posent en bandeau, au-dessus des heures.
 */
export function layoutDay(events: PlanEvent[]): Slot[] {
  const slots: Slot[] = sortEvents(events.filter((e) => !e.allDay)).map((event) => ({
    event,
    from: toMinutes(event.start),
    // Une séance de zéro minute doit rester saisissable à la souris.
    to: toMinutes(event.start) + Math.max(15, event.minutes),
    column: 0,
    columns: 1,
  }));

  let grappe: Slot[] = [];
  let finDeGrappe = -1;

  const cloreLaGrappe = () => {
    const colonnes = grappe.reduce((n, s) => Math.max(n, s.column + 1), 0);
    for (const s of grappe) s.columns = colonnes;
    grappe = [];
  };

  for (const slot of slots) {
    if (slot.from >= finDeGrappe && grappe.length) cloreLaGrappe();
    // Première colonne dont la dernière séance est terminée.
    const occupees = new Set(grappe.filter((s) => s.to > slot.from).map((s) => s.column));
    let col = 0;
    while (occupees.has(col)) col++;
    slot.column = col;
    grappe.push(slot);
    finDeGrappe = Math.max(finDeGrappe, slot.to);
  }
  if (grappe.length) cloreLaGrappe();

  return slots;
}

/** L'amplitude horaire à afficher : les heures utiles, jamais minuit à minuit. */
export function dayRange(events: PlanEvent[], min = 7, max = 22): [number, number] {
  const slots = layoutDay(events);
  const from = Math.min(min, ...slots.map((s) => Math.floor(s.from / 60)));
  const to = Math.max(max, ...slots.map((s) => Math.ceil(s.to / 60)));
  return [Math.max(0, from), Math.min(24, to)];
}
