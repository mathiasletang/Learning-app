import { describe, it, expect } from 'vitest';
import {
  xpForCorrect,
  xpForReview,
  xpForMinutes,
  levelIncrement,
  xpToReachLevel,
  levelFromXp,
  evaluateBadges,
  BADGES,
  type BadgeContext,
} from './gamification';
import { GRADE } from './srs';

describe('XP — QCM', () => {
  it('difficulté × 4 en entraînement', () => {
    expect(xpForCorrect(1, 'train')).toBe(4);
    expect(xpForCorrect(2, 'train')).toBe(8);
    expect(xpForCorrect(3, 'train')).toBe(12);
  });
  it('+4 en examen et chrono', () => {
    expect(xpForCorrect(2, 'exam')).toBe(12);
    expect(xpForCorrect(2, 'timed')).toBe(12);
    expect(xpForCorrect(2, 'review')).toBe(8);
  });
});

describe('XP — révision SRS (note ≥ Correct)', () => {
  it('Facile = 6, Correct = 5, en dessous = 0', () => {
    expect(xpForReview(GRADE.easy)).toBe(6);
    expect(xpForReview(GRADE.good)).toBe(5);
    expect(xpForReview(GRADE.hard)).toBe(0);
    expect(xpForReview(GRADE.again)).toBe(0);
  });
});

describe('XP — minutes travaillées', () => {
  it('≈ 1/3 XP, plafonné', () => {
    expect(xpForMinutes(30)).toBe(10);
    expect(xpForMinutes(3)).toBe(1);
    expect(xpForMinutes(2)).toBe(0);
    expect(xpForMinutes(1000, 40)).toBe(40);
  });
});

describe('Niveaux', () => {
  it('incréments 100, 135, 182, 246 (×1.35)', () => {
    expect(levelIncrement(1)).toBe(100);
    expect(levelIncrement(2)).toBe(135);
    expect(levelIncrement(3)).toBe(182);
    expect(levelIncrement(4)).toBe(246);
  });

  it('XP cumulé pour atteindre un niveau', () => {
    expect(xpToReachLevel(1)).toBe(0);
    expect(xpToReachLevel(2)).toBe(100);
    expect(xpToReachLevel(3)).toBe(235);
    expect(xpToReachLevel(4)).toBe(417);
  });

  it('niveau 1 démarre à 0 XP', () => {
    const info = levelFromXp(0);
    expect(info.level).toBe(1);
    expect(info.floor).toBe(0);
    expect(info.next).toBe(100);
    expect(info.progress).toBe(0);
  });

  it('juste avant/après un seuil', () => {
    expect(levelFromXp(99).level).toBe(1);
    expect(levelFromXp(100).level).toBe(2);
    expect(levelFromXp(234).level).toBe(2);
    expect(levelFromXp(235).level).toBe(3);
  });

  it('progress est cohérent (0..1)', () => {
    const info = levelFromXp(150); // niveau 2 : floor 100, next 235
    expect(info.level).toBe(2);
    expect(info.intoLevel).toBe(50);
    expect(info.span).toBe(135);
    expect(info.progress).toBeCloseTo(50 / 135, 5);
  });
});

describe('Badges', () => {
  const base: BadgeContext = {
    questionsAnswered: 0,
    hadPerfectSession: false,
    streak: 0,
    level: 1,
    srsReviews: 0,
    docsRead: 0,
    phaseCompleted: false,
    notesCount: 0,
    goalReachedEver: false,
    banksCovered: 0,
  };

  it('il y a exactement 15 badges', () => {
    expect(BADGES).toHaveLength(15);
    expect(new Set(BADGES.map((b) => b.id)).size).toBe(15);
  });

  it('aucun badge au départ', () => {
    expect(evaluateBadges(base).size).toBe(0);
  });

  it('paliers de questions', () => {
    expect(evaluateBadges({ ...base, questionsAnswered: 1 }).has('first')).toBe(true);
    expect(evaluateBadges({ ...base, questionsAnswered: 50 }).has('diligent')).toBe(true);
    expect(evaluateBadges({ ...base, questionsAnswered: 250 }).has('studious')).toBe(true);
    expect(evaluateBadges({ ...base, questionsAnswered: 500 }).has('erudite')).toBe(true);
  });

  it('séries, niveaux, exploration', () => {
    expect(evaluateBadges({ ...base, streak: 3 }).has('onfire')).toBe(true);
    expect(evaluateBadges({ ...base, streak: 7 }).has('week')).toBe(true);
    expect(evaluateBadges({ ...base, level: 5 }).has('lvl5')).toBe(true);
    expect(evaluateBadges({ ...base, level: 10 }).has('lvl10')).toBe(true);
    expect(evaluateBadges({ ...base, banksCovered: 5 }).has('explorer')).toBe(true);
    expect(evaluateBadges({ ...base, banksCovered: 4 }).has('explorer')).toBe(false);
  });

  it('tous les badges accessibles avec un contexte max', () => {
    const full: BadgeContext = {
      questionsAnswered: 999,
      hadPerfectSession: true,
      streak: 30,
      level: 20,
      srsReviews: 100,
      docsRead: 20,
      phaseCompleted: true,
      notesCount: 5,
      goalReachedEver: true,
      banksCovered: 5,
    };
    expect(evaluateBadges(full).size).toBe(15);
  });
});
