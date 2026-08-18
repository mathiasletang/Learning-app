import { describe, it, expect } from 'vitest';
import {
  dayGoals,
  elapsedMinutes,
  eventEnd,
  formatDuration,
  isOverdue,
  nextOccurrence,
  nextUp,
  ratio,
  sortTasks,
  startsIn,
  tasksForDay,
  toClock,
  toMinutes,
  weekDays,
} from './planning';
import { toDayStr, addDays } from './date';
import type { PlanEvent, Task } from './types';

const TODAY = toDayStr();

function ev(start: string, minutes: number, extra: Partial<PlanEvent> = {}): PlanEvent {
  return {
    id: `e:${start}`,
    date: TODAY,
    start,
    minutes,
    title: `Séance ${start}`,
    createdAt: '2026-01-01T00:00:00.000Z',
    ...extra,
  };
}

function task(title: string, extra: Partial<Task> = {}): Task {
  return {
    id: `t:${title}`,
    title,
    priority: 'mid',
    createdAt: '2026-01-01T00:00:00.000Z',
    ...extra,
  };
}

describe('Planning — les heures', () => {
  it('convertit dans les deux sens et encadre les saisies fantaisistes', () => {
    expect(toMinutes('09:30')).toBe(570);
    expect(toMinutes('9:05')).toBe(545);
    expect(toMinutes('pas une heure')).toBe(0);
    expect(toClock(570)).toBe('09:30');
    expect(toClock(-10)).toBe('00:00');
    expect(toClock(99999)).toBe('23:59');
  });

  it('donne la fin d’une séance et une durée qui se lit', () => {
    expect(eventEnd({ start: '09:00', minutes: 90 })).toBe('10:30');
    expect(formatDuration(45)).toBe('45 min');
    expect(formatDuration(60)).toBe('1 h');
    expect(formatDuration(90)).toBe('1 h 30');
    expect(formatDuration(125)).toBe('2 h 05');
  });

  it('mesure le temps écoulé d’une séance lancée', () => {
    const t0 = Date.parse('2026-08-18T14:00:00.000Z');
    expect(elapsedMinutes('2026-08-18T14:00:00.000Z', t0 + 48 * 60000)).toBe(48);
    expect(elapsedMinutes('pas une date', t0)).toBe(0);
  });
});

describe('Planning — la prochaine séance', () => {
  const journee = [ev('09:00', 90), ev('11:00', 30), ev('14:00', 60)];

  it('propose celle qui vient, jamais une séance faite', () => {
    expect(nextUp(journee, toMinutes('08:00'))?.start).toBe('09:00');
    expect(nextUp(journee, toMinutes('10:45'))?.start).toBe('11:00');
    const avancee = [ev('09:00', 90, { doneAt: 'x' }), ev('11:00', 30)];
    expect(nextUp(avancee, toMinutes('08:00'))?.start).toBe('11:00');
  });

  it('donne la main à la séance en cours, même hors de son créneau', () => {
    const encours = [ev('09:00', 30, { startedAt: '2026-08-18T09:00:00.000Z' }), ev('14:00', 60)];
    expect(nextUp(encours, toMinutes('15:00'))?.start).toBe('09:00');
  });

  it('propose encore la dernière séance ouverte en fin de journée', () => {
    expect(nextUp(journee, toMinutes('23:00'))?.start).toBe('09:00');
    expect(nextUp([], toMinutes('10:00'))).toBeNull();
  });

  it('compte les minutes avant le départ, négatives une fois l’heure passée', () => {
    expect(startsIn(ev('14:00', 60), toMinutes('13:18'))).toBe(42);
    expect(startsIn(ev('09:00', 60), toMinutes('10:00'))).toBe(-60);
  });
});

describe('Planning — les tâches', () => {
  it('remonte les retards sur la journée en cours, et là seulement', () => {
    const hier = task('Chapitre CFA', { due: addDays(TODAY, -1) });
    const aujourdhui = task('Vocabulaire', { due: TODAY });
    const demain = task('Révision', { due: addDays(TODAY, 1) });
    const liste = [hier, aujourdhui, demain];

    expect(isOverdue(hier, TODAY)).toBe(true);
    expect(tasksForDay(liste, TODAY).map((t) => t.title)).toEqual(['Chapitre CFA', 'Vocabulaire']);
    expect(tasksForDay(liste, addDays(TODAY, 1)).map((t) => t.title)).toEqual(['Révision']);
    // Une tâche faite n'est plus en retard.
    expect(isOverdue({ ...hier, doneAt: 'x' }, TODAY)).toBe(false);
  });

  it('classe les ouvertes avant les faites, puis par priorité', () => {
    const ordre = sortTasks([
      task('faite', { priority: 'high', doneAt: 'x' }),
      task('basse', { priority: 'low' }),
      task('haute', { priority: 'high' }),
      task('moyenne', { priority: 'mid' }),
    ]).map((t) => t.title);
    expect(ordre).toEqual(['haute', 'moyenne', 'basse', 'faite']);
  });

  it('reporte une récurrence au jour ou à la semaine suivante', () => {
    expect(nextOccurrence(task('mots', { repeat: 'daily', due: TODAY }), TODAY)).toBe(addDays(TODAY, 1));
    expect(nextOccurrence(task('bilan', { repeat: 'weekly', due: TODAY }), TODAY)).toBe(addDays(TODAY, 7));
    // Sans récurrence, rien ne renaît.
    expect(nextOccurrence(task('ponctuelle', { due: TODAY }), TODAY)).toBeUndefined();
    // Une tâche récurrente en retard repart d'aujourd'hui, pas de son retard.
    expect(nextOccurrence(task('mots', { repeat: 'daily', due: addDays(TODAY, -5) }), TODAY)).toBe(
      addDays(TODAY, 1),
    );
  });
});

describe('Planning — la semaine et les objectifs', () => {
  it('ouvre la semaine un lundi et la ferme un dimanche', () => {
    const jours = weekDays('2026-08-19'); // un mercredi
    expect(jours).toHaveLength(7);
    expect(jours[0]).toBe('2026-08-17'); // lundi
    expect(jours[6]).toBe('2026-08-23'); // dimanche
    // Le dimanche appartient à la semaine qui s'achève, pas à la suivante.
    expect(weekDays('2026-08-23')[0]).toBe('2026-08-17');
  });

  it('ne compte que du réel : séances posées, tâches dues, temps enregistré', () => {
    const events = [ev('09:00', 90, { doneAt: 'x' }), ev('14:00', 60)];
    const tasks = [task('a', { doneAt: 'x' }), task('b'), task('c')];
    const logs = [
      { date: TODAY, subject: 'opt', minutes: 80 },
      { date: TODAY, subject: 'en', minutes: 20 },
    ];
    const g = dayGoals(events, tasks, logs);
    expect(g.sessions).toEqual({ done: 1, total: 2 });
    expect(g.tasks).toEqual({ done: 1, total: 3 });
    expect(g.minutes).toEqual({ done: 100, planned: 150 });

    // Journée vide : aucune jauge ne part à 100 %.
    expect(dayGoals([], [], [])).toEqual({
      sessions: { done: 0, total: 0 },
      tasks: { done: 0, total: 0 },
      minutes: { done: 0, planned: 0 },
    });
    expect(ratio(0, 0)).toBe(0);
    expect(ratio(3, 2)).toBe(1);
  });
});
