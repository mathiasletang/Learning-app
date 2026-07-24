import { describe, it, expect, beforeEach } from 'vitest';
import { db, exportAll, importAll, resetAll, savePrefs, getPrefs } from './db';

describe('IndexedDB — export / import', () => {
  beforeEach(async () => {
    await resetAll();
  });

  it('exporte puis réimporte fidèlement la progression', async () => {
    await savePrefs({ dailyGoal: 33, theme: 'dark' });
    await db.flashcards.put({
      id: 'fc:x',
      front: 'Q',
      back: 'R',
      bank: 'opt',
      createdAt: 'now',
      ef: 2.5,
      reps: 1,
      interval: 4,
      due: '2026-01-10',
      lapses: 0,
    });
    await db.qcmResults.put({ qid: 'opt:not:0', status: 2, at: '2026-01-01' });

    const bundle = await exportAll();
    expect(bundle.app).toBe('atelier');
    expect(bundle.data.flashcards).toHaveLength(1);

    await resetAll();
    expect(await db.flashcards.count()).toBe(0);

    await importAll(bundle, 'replace');
    expect(await db.flashcards.count()).toBe(1);
    const prefs = await getPrefs();
    expect(prefs.dailyGoal).toBe(33);
    expect(prefs.theme).toBe('dark');
  });

  it('refuse un fichier au format inconnu', async () => {
    // @ts-expect-error test volontaire d'un mauvais format
    await expect(importAll({ foo: 'bar' })).rejects.toThrow();
  });
});
