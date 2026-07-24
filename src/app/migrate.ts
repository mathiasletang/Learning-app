/* =========================================================================
   Migration depuis l'ancien prototype (clé localStorage `atelier_v4`).

   Le format exact du prototype sera confirmé sur ATELIER.html. Le mapping
   ci-dessous est défensif : il accepte plusieurs noms de champs plausibles
   (cf. cahier des charges §6.2) et ignore silencieusement ce qu'il ne
   reconnaît pas. Il ne s'exécute qu'une fois.
   ========================================================================= */

import { db, importAll, DEFAULT_PREFS, type ExportBundle } from '@/core/db';
import { toDayStr } from '@/core/date';
import type { Flashcard, Note, SrsState, UserPrefs } from '@/core/types';
import { useApp } from './store';

const LEGACY_KEY = 'atelier_v4';
const MIGRATED_FLAG = 'atelier.migrated.v1';

type AnyObj = Record<string, unknown>;

function asObj(v: unknown): AnyObj | null {
  return v && typeof v === 'object' && !Array.isArray(v) ? (v as AnyObj) : null;
}
function num(v: unknown, d = 0): number {
  return typeof v === 'number' && Number.isFinite(v) ? v : d;
}
function str(v: unknown, d = ''): string {
  return typeof v === 'string' ? v : d;
}
function safeLocal(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function pickSrs(v: unknown, today: string): SrsState {
  const o = asObj(v) ?? {};
  return {
    ef: num(o.ef, 2.5),
    reps: num(o.reps, 0),
    interval: num(o.interval, 0),
    due: str(o.due, today),
    lapses: num(o.lapses, 0),
  };
}

export async function runMigrationIfNeeded(): Promise<void> {
  try {
    if (typeof localStorage === 'undefined') return;
    if (localStorage.getItem(MIGRATED_FLAG)) return;
    const raw = localStorage.getItem(LEGACY_KEY);
    if (!raw) return;

    const parsed: unknown = JSON.parse(raw);

    // Cas A : c'est déjà un export « atelier ».
    const maybeBundle = asObj(parsed);
    if (maybeBundle && maybeBundle.app === 'atelier' && maybeBundle.data) {
      await importAll(parsed as ExportBundle, 'merge');
    } else if (maybeBundle) {
      await migrateLegacy(maybeBundle);
    } else {
      localStorage.setItem(MIGRATED_FLAG, '1');
      return;
    }

    localStorage.setItem(MIGRATED_FLAG, '1');
    await useApp.getState().reloadFromDb();
    await useApp.getState().refreshBadges();
    useApp.getState().pushToast({
      title: 'Progression importée',
      desc: "Depuis l'ancienne version.",
      icon: '📦',
      kind: 'success',
    });
  } catch {
    // Migration silencieuse : ne jamais bloquer le démarrage.
  }
}

async function migrateLegacy(data: AnyObj): Promise<void> {
  const today = toDayStr();

  // Le prototype (atelier_v4) stocke l'état à plat : { qcm, docs, steps, time,
  // cards, notes, vocab, xp, streak, lastDay, days, badges:{}, goal, goalDate,
  // goalDone }. On lit à la racine, avec repli sur un éventuel objet imbriqué.
  const g = asObj(data.gam) ?? asObj(data.gamification) ?? data;
  const days = asObj(g.days) ?? asObj(data.days) ?? {};
  const goal = num(data.goal ?? g.goal, DEFAULT_PREFS.dailyGoal);

  await db.gam.put({
    key: 'gam',
    xp: num(g.xp),
    streak: num(g.streak),
    lastDay: str(g.lastDay ?? g.last_day),
    goalDoneToday: num(g.goalDone ?? g.goal_done),
    goalDoneDay: str(g.goalDate ?? g.goalDoneDay),
    days: Object.fromEntries(Object.entries(days).map(([k, v]) => [k, num(v)])),
    reviewsCount: num(g.reviewsCount),
    goalReachedEver: Boolean(g.goalReachedEver) || num(g.goalDone) >= goal,
  });

  // Préférences : objectif quotidien + thème/repli sidebar (clés localStorage
  // distinctes dans le prototype : atelier_theme, atelier_collapsed).
  const themeRaw = safeLocal('atelier_theme');
  const theme: UserPrefs['theme'] =
    themeRaw === 'light' || themeRaw === 'dark' ? themeRaw : DEFAULT_PREFS.theme;
  await db.prefs.put({
    ...DEFAULT_PREFS,
    theme,
    dailyGoal: goal,
    sidebarCollapsed: safeLocal('atelier_collapsed') === 'true',
  });

  // Étapes cochées
  const steps = asObj(data.steps) ?? asObj(data.step_progress);
  if (steps) {
    await db.steps.bulkPut(
      Object.entries(steps)
        .filter(([, v]) => Boolean(v))
        .map(([stepId]) => ({ stepId, done: true, at: undefined })),
    );
  }

  // Documents lus
  const docs = asObj(data.docs) ?? asObj(data.doc_read);
  if (docs) {
    await db.docs.bulkPut(
      Object.entries(docs)
        .filter(([, v]) => Boolean(v))
        .map(([path]) => ({ path, read: true, at: undefined })),
    );
  }

  // Résultats QCM (qid -> 1|2)
  const qcm = asObj(data.qcm) ?? asObj(data.qcm_results);
  if (qcm) {
    await db.qcmResults.bulkPut(
      Object.entries(qcm).map(([qid, v]) => ({
        qid,
        status: num(v) === 1 ? (1 as const) : (2 as const),
        at: today,
      })),
    );
  }

  // Flashcards (map ou tableau)
  const cardsRaw = data.flashcards ?? data.cards;
  const cardEntries: [string, unknown][] = Array.isArray(cardsRaw)
    ? (cardsRaw as unknown[]).map((c, i) => [str(asObj(c)?.id, `fc:legacy:${i}`), c])
    : asObj(cardsRaw)
      ? Object.entries(asObj(cardsRaw)!)
      : [];
  if (cardEntries.length) {
    const cards: Flashcard[] = cardEntries.map(([id, v]) => {
      const o = asObj(v) ?? {};
      return {
        id,
        front: str(o.front),
        back: str(o.back),
        expl: str(o.expl) || undefined,
        bank: (o.bank as Flashcard['bank']) ?? 'manual',
        createdAt: str(o.createdAt, new Date().toISOString()),
        ...pickSrs(o, today),
      };
    });
    await db.flashcards.bulkPut(cards);
  }

  // Vocab SRS
  const vocab = asObj(data.vocab_srs) ?? asObj(data.vocab);
  if (vocab) {
    await db.vocabSrs.bulkPut(
      Object.entries(vocab).map(([id, v]) => ({ id, ...pickSrs(v, today) })),
    );
  }

  // Notes
  const notesRaw = data.notes;
  if (Array.isArray(notesRaw)) {
    const notes: Note[] = (notesRaw as unknown[]).map((n, i) => {
      const o = asObj(n) ?? {};
      return {
        id: str(o.id, `note:legacy:${i}`),
        title: str(o.title ?? o.titre),
        body: str(o.body ?? o.corps),
        subject: str(o.subject ?? o.matiere, 'gen'),
        updatedAt: str(o.updatedAt ?? o.updated_at, new Date().toISOString()),
      };
    });
    await db.notes.bulkPut(notes);
  }

  // Temps
  const timeRaw = data.time_log ?? data.time;
  if (Array.isArray(timeRaw)) {
    await db.timeLogs.bulkAdd(
      (timeRaw as unknown[]).map((t) => {
        const o = asObj(t) ?? {};
        return {
          date: str(o.date, today),
          subject: str(o.subject ?? o.matiere, 'gen'),
          minutes: num(o.minutes),
        };
      }),
    );
  }

  // Badges (map id->date ou tableau d'ids)
  const badgesRaw = data.badges;
  if (Array.isArray(badgesRaw)) {
    await db.badges.bulkPut((badgesRaw as unknown[]).map((id) => ({ id: str(id), at: today })));
  } else if (asObj(badgesRaw)) {
    await db.badges.bulkPut(
      Object.entries(asObj(badgesRaw)!).map(([id, at]) => ({ id, at: str(at, today) })),
    );
  }
}
