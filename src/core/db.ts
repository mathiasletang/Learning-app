/* =========================================================================
   Stockage durable — IndexedDB via Dexie (cahier des charges §7.1)
   La progression de l'utilisateur vit ici. Export/import JSON en filet.
   ========================================================================= */

import Dexie, { type Table } from 'dexie';
import type {
  UserPrefs,
  Gamification,
  StepProgress,
  DocRead,
  QcmResult,
  QcmSession,
  Flashcard,
  VocabSrs,
  Note,
  TimeLog,
  Badge,
  PlanEvent,
  Task,
} from './types';
import { toDayStr } from './date';

export const DEFAULT_PREFS: UserPrefs = {
  key: 'prefs',
  theme: 'auto',
  dailyGoal: 20,
  sidebarCollapsed: false,
};

export const DEFAULT_GAM: Gamification = {
  key: 'gam',
  xp: 0,
  streak: 0,
  lastDay: '',
  goalDoneToday: 0,
  goalDoneDay: '',
  days: {},
  reviewsCount: 0,
  goalReachedEver: false,
};

export class AtelierDB extends Dexie {
  prefs!: Table<UserPrefs, string>;
  gam!: Table<Gamification, string>;
  steps!: Table<StepProgress, string>;
  docs!: Table<DocRead, string>;
  qcmResults!: Table<QcmResult, string>;
  qcmSessions!: Table<QcmSession, number>;
  flashcards!: Table<Flashcard, string>;
  vocabSrs!: Table<VocabSrs, string>;
  notes!: Table<Note, string>;
  timeLogs!: Table<TimeLog, number>;
  badges!: Table<Badge, string>;
  events!: Table<PlanEvent, string>;
  tasks!: Table<Task, string>;

  constructor() {
    super('atelier');
    this.version(1).stores({
      prefs: 'key',
      gam: 'key',
      steps: 'stepId',
      docs: 'path',
      qcmResults: 'qid, status',
      qcmSessions: '++id, date, bank',
      flashcards: 'id, due, bank',
      vocabSrs: 'id, due',
      notes: 'id, updatedAt, subject',
      timeLogs: '++id, date, subject',
      badges: 'id',
    });
    /* v2 — le planning et les tâches. Deux tables ajoutées : Dexie conserve
       les données existantes, rien à migrer. */
    this.version(2).stores({
      events: 'id, date, taskId',
      tasks: 'id, due, doneAt',
    });
  }
}

export const db = new AtelierDB();

/* --------------------------- Accès prefs / gam -------------------------- */

export async function getPrefs(): Promise<UserPrefs> {
  const p = await db.prefs.get('prefs');
  return p ?? DEFAULT_PREFS;
}

export async function savePrefs(patch: Partial<UserPrefs>): Promise<UserPrefs> {
  const current = await getPrefs();
  const next = { ...current, ...patch, key: 'prefs' as const };
  await db.prefs.put(next);
  return next;
}

export async function getGam(): Promise<Gamification> {
  const g = await db.gam.get('gam');
  return g ?? DEFAULT_GAM;
}

export async function saveGam(next: Gamification): Promise<void> {
  await db.gam.put({ ...next, key: 'gam' });
}

/* ------------------------------ Export/Import --------------------------- */

export interface ExportBundle {
  app: 'atelier';
  version: number;
  exportedAt: string;
  data: {
    prefs: UserPrefs[];
    gam: Gamification[];
    steps: StepProgress[];
    docs: DocRead[];
    qcmResults: QcmResult[];
    qcmSessions: QcmSession[];
    flashcards: Flashcard[];
    vocabSrs: VocabSrs[];
    notes: Note[];
    timeLogs: TimeLog[];
    badges: Badge[];
    events?: PlanEvent[];
    tasks?: Task[];
  };
}

export async function exportAll(): Promise<ExportBundle> {
  const [prefs, gam, steps, docs, qcmResults, qcmSessions, flashcards, vocabSrs, notes, timeLogs, badges, events, tasks] =
    await Promise.all([
      db.prefs.toArray(),
      db.gam.toArray(),
      db.steps.toArray(),
      db.docs.toArray(),
      db.qcmResults.toArray(),
      db.qcmSessions.toArray(),
      db.flashcards.toArray(),
      db.vocabSrs.toArray(),
      db.notes.toArray(),
      db.timeLogs.toArray(),
      db.badges.toArray(),
      db.events.toArray(),
      db.tasks.toArray(),
    ]);
  return {
    app: 'atelier',
    version: 1,
    exportedAt: new Date().toISOString(),
    data: { prefs, gam, steps, docs, qcmResults, qcmSessions, flashcards, vocabSrs, notes, timeLogs, badges, events, tasks },
  };
}

export async function importAll(bundle: ExportBundle, mode: 'replace' | 'merge' = 'replace'): Promise<void> {
  if (!bundle || bundle.app !== 'atelier' || !bundle.data) {
    throw new Error('Fichier de sauvegarde invalide (format « atelier » attendu).');
  }
  const d = bundle.data;
  await db.transaction(
    'rw',
    [db.prefs, db.gam, db.steps, db.docs, db.qcmResults, db.qcmSessions, db.flashcards, db.vocabSrs, db.notes, db.timeLogs, db.badges, db.events, db.tasks],
    async () => {
      if (mode === 'replace') {
        await Promise.all([
          db.prefs.clear(),
          db.gam.clear(),
          db.steps.clear(),
          db.docs.clear(),
          db.qcmResults.clear(),
          db.qcmSessions.clear(),
          db.flashcards.clear(),
          db.vocabSrs.clear(),
          db.notes.clear(),
          db.timeLogs.clear(),
          db.badges.clear(),
          db.events.clear(),
          db.tasks.clear(),
        ]);
      }
      await Promise.all([
        d.prefs?.length ? db.prefs.bulkPut(d.prefs) : undefined,
        d.gam?.length ? db.gam.bulkPut(d.gam) : undefined,
        d.steps?.length ? db.steps.bulkPut(d.steps) : undefined,
        d.docs?.length ? db.docs.bulkPut(d.docs) : undefined,
        d.qcmResults?.length ? db.qcmResults.bulkPut(d.qcmResults) : undefined,
        // en merge, on laisse Dexie réattribuer les ++id
        d.qcmSessions?.length
          ? db.qcmSessions.bulkPut(mode === 'merge' ? d.qcmSessions.map(({ id: _id, ...s }) => s as QcmSession) : d.qcmSessions)
          : undefined,
        d.flashcards?.length ? db.flashcards.bulkPut(d.flashcards) : undefined,
        d.vocabSrs?.length ? db.vocabSrs.bulkPut(d.vocabSrs) : undefined,
        d.notes?.length ? db.notes.bulkPut(d.notes) : undefined,
        d.timeLogs?.length
          ? db.timeLogs.bulkPut(mode === 'merge' ? d.timeLogs.map(({ id: _id, ...t }) => t as TimeLog) : d.timeLogs)
          : undefined,
        d.badges?.length ? db.badges.bulkPut(d.badges) : undefined,
        d.events?.length ? db.events.bulkPut(d.events) : undefined,
        d.tasks?.length ? db.tasks.bulkPut(d.tasks) : undefined,
      ]);
    },
  );
}

export async function resetAll(): Promise<void> {
  await db.transaction(
    'rw',
    [db.prefs, db.gam, db.steps, db.docs, db.qcmResults, db.qcmSessions, db.flashcards, db.vocabSrs, db.notes, db.timeLogs, db.badges, db.events, db.tasks],
    async () => {
      await Promise.all([
        db.prefs.clear(),
        db.gam.clear(),
        db.steps.clear(),
        db.docs.clear(),
        db.qcmResults.clear(),
        db.qcmSessions.clear(),
        db.flashcards.clear(),
        db.vocabSrs.clear(),
        db.notes.clear(),
        db.timeLogs.clear(),
        db.badges.clear(),
        db.events.clear(),
        db.tasks.clear(),
      ]);
    },
  );
}

/** Demande un stockage persistant (parade à la purge Safari iOS, §7.3). */
export async function requestPersistence(): Promise<boolean> {
  try {
    if (navigator.storage?.persist) {
      const already = await navigator.storage.persisted?.();
      if (already) return true;
      return await navigator.storage.persist();
    }
  } catch {
    /* ignore */
  }
  return false;
}

export function todayStr(): string {
  return toDayStr();
}
