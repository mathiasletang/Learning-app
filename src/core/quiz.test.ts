import { describe, it, expect } from 'vitest';
import {
  mulberry32,
  permutation,
  shuffleOptions,
  estimateDifficulty,
  hashSeed,
} from './quiz';

describe('PRNG déterministe', () => {
  it('même graine ⇒ même suite', () => {
    const a = mulberry32(42);
    const b = mulberry32(42);
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });
  it('graines différentes ⇒ suites différentes', () => {
    const a = mulberry32(1);
    const b = mulberry32(2);
    expect(a()).not.toBe(b());
  });
});

describe('permutation', () => {
  it('est une vraie permutation des indices', () => {
    const p = permutation(4, mulberry32(7));
    expect([...p].sort()).toEqual([0, 1, 2, 3]);
  });
});

describe('mélange des options', () => {
  it('conserve toutes les options et remappe la bonne réponse', () => {
    const options = ['A', 'B', 'C', 'D'];
    const answer = 2; // 'C'
    const r = shuffleOptions(options, answer, 123);
    expect([...r.options].sort()).toEqual(['A', 'B', 'C', 'D']);
    // la bonne réponse pointe toujours sur 'C'
    expect(r.options[r.answer]).toBe('C');
  });

  it('ne modifie pas le tableau d’origine', () => {
    const options = ['A', 'B', 'C', 'D'];
    const copy = [...options];
    shuffleOptions(options, 0, 5);
    expect(options).toEqual(copy);
  });

  it('order remappe correctement vers les indices d’origine', () => {
    const options = ['A', 'B', 'C', 'D'];
    const r = shuffleOptions(options, 1, 999);
    r.order.forEach((orig, displayPos) => {
      expect(r.options[displayPos]).toBe(options[orig]);
    });
  });

  it('déterministe avec graine', () => {
    const r1 = shuffleOptions(['A', 'B', 'C', 'D'], 0, 77);
    const r2 = shuffleOptions(['A', 'B', 'C', 'D'], 0, 77);
    expect(r1.options).toEqual(r2.options);
    expect(r1.answer).toBe(r2.answer);
  });
});

describe('estimation de difficulté', () => {
  it('court (<170) = 1', () => {
    expect(estimateDifficulty('Court ?', ['a', 'b', 'c', 'd'])).toBe(1);
  });
  it('moyen (<260) = 2', () => {
    const q = 'x'.repeat(150);
    const opts = ['y'.repeat(15), 'z'.repeat(15), 'a'.repeat(15), 'b'.repeat(15)];
    expect(estimateDifficulty(q, opts)).toBe(2); // 150 + 60 = 210
  });
  it('long (>=260) = 3', () => {
    const q = 'x'.repeat(300);
    expect(estimateDifficulty(q, ['a', 'b', 'c', 'd'])).toBe(3);
  });
});

describe('hashSeed', () => {
  it('stable et déterministe', () => {
    expect(hashSeed('opt:not:0')).toBe(hashSeed('opt:not:0'));
    expect(hashSeed('opt:not:0')).not.toBe(hashSeed('opt:not:1'));
  });
});
