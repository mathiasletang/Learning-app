import { describe, it, expect } from 'vitest';
import { initialSrs, schedule, isMature, isDue, GRADE, MATURE_INTERVAL } from './srs';

describe('SM-2 — état initial', () => {
  it('démarre à ef=2.5, reps=0, interval=0, lapses=0', () => {
    const s = initialSrs('2026-01-01');
    expect(s).toEqual({ ef: 2.5, reps: 0, interval: 0, due: '2026-01-01', lapses: 0 });
  });
});

describe('SM-2 — note « Encore » (grade < 3)', () => {
  it('réinitialise reps, met interval à 1, incrémente lapses', () => {
    const s = { ef: 2.6, reps: 4, interval: 30, due: '2026-01-01', lapses: 1 };
    const r = schedule(s, GRADE.again, '2026-01-10');
    expect(r.reps).toBe(0);
    expect(r.interval).toBe(1);
    expect(r.lapses).toBe(2);
    expect(r.ef).toBe(2.6); // ef inchangé quand grade < 3
    expect(r.due).toBe('2026-01-11');
  });
});

describe('SM-2 — progression normale', () => {
  it('première réussite (Correct) : interval = 1', () => {
    const r = schedule(initialSrs('2026-01-01'), GRADE.good, '2026-01-01');
    expect(r.reps).toBe(1);
    expect(r.interval).toBe(1);
    expect(r.due).toBe('2026-01-02');
  });

  it('deuxième réussite : interval = 6 (Correct/Facile), 4 (Difficile)', () => {
    const once = schedule(initialSrs('2026-01-01'), GRADE.good, '2026-01-01');
    const good2 = schedule(once, GRADE.good, '2026-01-02');
    expect(good2.reps).toBe(2);
    expect(good2.interval).toBe(6);

    const hard2 = schedule(once, GRADE.hard, '2026-01-02');
    expect(hard2.interval).toBe(4);
  });

  it('troisième réussite : interval = round(interval * ef * facteur)', () => {
    let s = schedule(initialSrs('2026-01-01'), GRADE.good, '2026-01-01'); // reps1, int1
    s = schedule(s, GRADE.good, '2026-01-02'); // reps2, int6, ef mis à jour
    const efAfterTwo = s.ef;
    const s3 = schedule(s, GRADE.good, '2026-01-08'); // reps3
    expect(s3.reps).toBe(3);
    expect(s3.interval).toBe(Math.round(6 * efAfterTwo * 1));
  });

  it('facteur Facile (1.15) > Correct (1) > Difficile (0.8)', () => {
    let base = schedule(initialSrs('2026-01-01'), GRADE.good, '2026-01-01');
    base = schedule(base, GRADE.good, '2026-01-02'); // reps2 int6
    const easy = schedule(base, GRADE.easy, '2026-01-08');
    const good = schedule(base, GRADE.good, '2026-01-08');
    const hard = schedule(base, GRADE.hard, '2026-01-08');
    expect(easy.interval).toBeGreaterThan(good.interval);
    expect(good.interval).toBeGreaterThan(hard.interval);
  });
});

describe('SM-2 — facteur de facilité', () => {
  it('ef ne descend jamais sous 1.3', () => {
    let s = initialSrs('2026-01-01');
    for (let i = 0; i < 20; i++) s = schedule(s, GRADE.hard, '2026-01-01');
    expect(s.ef).toBeGreaterThanOrEqual(1.3);
  });

  it('Facile augmente ef, Difficile le diminue', () => {
    const start = initialSrs('2026-01-01');
    const easy = schedule(start, GRADE.easy, '2026-01-01');
    const hard = schedule(start, GRADE.hard, '2026-01-01');
    expect(easy.ef).toBeGreaterThan(2.5);
    expect(hard.ef).toBeLessThan(2.5);
  });
});

describe('SM-2 — maturité et échéance', () => {
  it('mature si interval >= 21', () => {
    expect(isMature({ ef: 2.5, reps: 5, interval: MATURE_INTERVAL, due: 'x', lapses: 0 })).toBe(
      true,
    );
    expect(isMature({ ef: 2.5, reps: 5, interval: 20, due: 'x', lapses: 0 })).toBe(false);
  });

  it('due si échéance <= aujourd’hui', () => {
    expect(isDue({ ef: 2.5, reps: 1, interval: 1, due: '2026-01-01', lapses: 0 }, '2026-01-05')).toBe(
      true,
    );
    expect(isDue({ ef: 2.5, reps: 1, interval: 1, due: '2026-01-10', lapses: 0 }, '2026-01-05')).toBe(
      false,
    );
  });
});
