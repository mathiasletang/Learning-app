import { describe, it, expect, beforeEach } from 'vitest';
import { runMigrationIfNeeded } from './migrate';
import { db, resetAll, getPrefs, getGam } from '@/core/db';

const LEGACY = {
  xp: 250,
  streak: 4,
  lastDay: '2026-07-20',
  days: { '2026-07-20': 40 },
  goal: 25,
  goalDate: '2026-07-20',
  goalDone: 30,
  badges: { first: '2026-01-01', diligent: '2026-02-01' },
  steps: { o0a: true, o0b: 1, o1a: false },
  docs: { 'dossier/fichier.pdf': true },
  qcm: { 'opt:not:0': 2, 'opt:not:1': 1 },
  cards: {
    'fc:opt:not:0': {
      front: 'Q',
      back: 'R',
      expl: 'E',
      bank: 'opt',
      ef: 2.6,
      reps: 3,
      interval: 15,
      due: '2026-08-01',
      lapses: 1,
    },
  },
  vocab: { 'v:finfr:0': { ef: 2.5, reps: 1, interval: 4, due: '2026-07-25', lapses: 0 } },
  notes: [{ id: 'n1', title: 'T', body: 'B', subject: 'opt', updatedAt: '2026-07-01' }],
  time: [{ date: '2026-07-20', subject: 'opt', minutes: 60 }],
};

describe('Migration depuis le prototype (atelier_v4)', () => {
  beforeEach(async () => {
    localStorage.clear();
    await resetAll();
  });

  it('migre fidèlement l’état à plat du prototype', async () => {
    localStorage.setItem('atelier_v4', JSON.stringify(LEGACY));
    localStorage.setItem('atelier_theme', 'dark');
    localStorage.setItem('atelier_collapsed', 'true');

    await runMigrationIfNeeded();

    const gam = await getGam();
    expect(gam.xp).toBe(250);
    expect(gam.streak).toBe(4);
    expect(gam.lastDay).toBe('2026-07-20');
    expect(gam.goalDoneToday).toBe(30);
    expect(gam.goalDoneDay).toBe('2026-07-20');
    expect(gam.days['2026-07-20']).toBe(40);
    expect(gam.goalReachedEver).toBe(true); // 30 >= 25

    const prefs = await getPrefs();
    expect(prefs.dailyGoal).toBe(25);
    expect(prefs.theme).toBe('dark');
    expect(prefs.sidebarCollapsed).toBe(true);

    // étapes : true et 1 conservés, false ignoré
    expect((await db.steps.get('o0a'))?.done).toBe(true);
    expect((await db.steps.get('o0b'))?.done).toBe(true);
    expect(await db.steps.get('o1a')).toBeUndefined();

    expect((await db.docs.get('dossier/fichier.pdf'))?.read).toBe(true);
    expect(await db.qcmResults.count()).toBe(2);

    const card = await db.flashcards.get('fc:opt:not:0');
    expect(card?.interval).toBe(15);
    expect(card?.back).toBe('R');

    expect((await db.vocabSrs.get('v:finfr:0'))?.interval).toBe(4);
    expect(await db.notes.count()).toBe(1);
    expect(await db.timeLogs.count()).toBe(1);
    // Les badges migrés sont conservés (refreshBadges peut en ajouter d'autres).
    const badgeIds = (await db.badges.toArray()).map((b) => b.id);
    expect(badgeIds).toContain('first');
    expect(badgeIds).toContain('diligent');
  });

  it('ne s’exécute qu’une fois (drapeau posé)', async () => {
    localStorage.setItem('atelier_v4', JSON.stringify({ xp: 10 }));
    await runMigrationIfNeeded();
    expect((await getGam()).xp).toBe(10);

    // deuxième passage : même si on change la source, rien ne doit bouger
    localStorage.setItem('atelier_v4', JSON.stringify({ xp: 999 }));
    await runMigrationIfNeeded();
    expect((await getGam()).xp).toBe(10);
  });

  it('ne fait rien sans données héritées', async () => {
    await runMigrationIfNeeded();
    expect((await getGam()).xp).toBe(0);
  });
});
