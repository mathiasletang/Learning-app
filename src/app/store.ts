/* =========================================================================
   Store central — Atelier (Zustand)
   Relie IndexedDB (progression) et l'UI. Gère thème, XP, série, objectif,
   badges, toasts et confettis.
   ========================================================================= */

import { create } from 'zustand';
import type { UserPrefs, Gamification } from '@/core/types';
import {
  db,
  getPrefs,
  savePrefs,
  getGam,
  saveGam,
  DEFAULT_PREFS,
  DEFAULT_GAM,
} from '@/core/db';
import { toDayStr, addDays } from '@/core/date';
import {
  DEFAULT_ACCENT,
  DEFAULT_INTENSITY,
  derivePalette,
  isValidHex,
  paletteVars,
} from '@/core/palette';
import {
  levelFromXp,
  evaluateBadges,
  BADGES,
  DAILY_WORD_GOAL,
  type BadgeContext,
} from '@/core/gamification';
import { getParcours } from '@/core/content';

export type ResolvedTheme = 'light' | 'dark';

export interface Toast {
  id: number;
  title: string;
  desc?: string;
  icon?: string;
  kind?: 'badge' | 'info' | 'success';
}

interface AppState {
  loaded: boolean;
  prefs: UserPrefs;
  gam: Gamification;
  earnedBadges: string[];
  resolvedTheme: ResolvedTheme;
  confettiNonce: number;
  toasts: Toast[];

  init: () => Promise<void>;
  reloadFromDb: () => Promise<void>;

  setTheme: (t: UserPrefs['theme']) => Promise<void>;
  /** Couleur d'accent du mode personnalisé — bascule aussi dans ce mode. */
  setAccent: (hex: string) => Promise<void>;
  setAccentIntensity: (v: number) => Promise<void>;
  setCustomBase: (b: NonNullable<UserPrefs['customBase']>) => Promise<void>;
  setDailyGoal: (n: number) => Promise<void>;
  setSidebarCollapsed: (b: boolean) => Promise<void>;
  patchPrefs: (p: Partial<UserPrefs>) => Promise<void>;

  addXp: (amount: number) => Promise<void>;
  registerActivity: () => Promise<void>;
  incReviews: (n: number) => Promise<void>;
  registerQuestionsDone: (count: number) => Promise<void>;
  registerWordsDone: (count: number) => Promise<void>;
  refreshBadges: () => Promise<string[]>;

  fireConfetti: () => void;
  pushToast: (t: Omit<Toast, 'id'>) => void;
  dismissToast: (id: number) => void;
}

/* --------------------------- Helpers de thème --------------------------- */

function systemTheme(): ResolvedTheme {
  return typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * Le fond neutre effectif. Le mode personnalisé ne décide pas du fond : il
 * décide de la couleur d'accent, et suit son propre réglage de fond (le
 * système par défaut). C'est ce qui permet d'avoir sa couleur le soir sans
 * se voir imposer un fond clair.
 */
function resolveTheme(prefs: Pick<UserPrefs, 'theme' | 'customBase'>): ResolvedTheme {
  if (prefs.theme === 'custom') {
    const base = prefs.customBase ?? 'auto';
    return base === 'auto' ? systemTheme() : base;
  }
  return prefs.theme === 'auto' ? systemTheme() : prefs.theme;
}

function applyTheme(resolved: ResolvedTheme) {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = resolved;
  const meta = document.querySelector('meta[name="theme-color"]:not([media])');
  if (meta) meta.setAttribute('content', resolved === 'dark' ? '#101218' : '#f4f5f8');
}

/**
 * Pose (ou retire) les jetons d'accent dérivés de la couleur choisie.
 *
 * Les styles en ligne sur :root l'emportent sur la feuille de style : seuls
 * les jetons --accent-* sont remplacés, tout le neutre — fonds, encres,
 * filets — reste celui de tokens.css. Hors mode personnalisé, on nettoie,
 * et l'application retrouve son indigo sans rien avoir à recharger.
 */
function applyAccent(prefs: UserPrefs, resolved: ResolvedTheme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const both =
    prefs.theme === 'custom'
      ? {
          light: paletteVars(derivePalette(accentOf(prefs), 'light', intensityOf(prefs))),
          dark: paletteVars(derivePalette(accentOf(prefs), 'dark', intensityOf(prefs))),
        }
      : null;

  for (const name of ACCENT_VARS) {
    if (both) root.style.setProperty(name, both[resolved][name]);
    else root.style.removeProperty(name);
  }
  mirrorAccent(both);
}

const accentOf = (p: UserPrefs) => p.accent ?? DEFAULT_ACCENT;
const intensityOf = (p: UserPrefs) => p.accentIntensity ?? DEFAULT_INTENSITY;

const ACCENT_VARS = Object.keys(paletteVars(derivePalette(DEFAULT_ACCENT, 'light')));

/** Miroir du choix brut de thème dans localStorage : c'est ce que lit le script
    anti-flash d'index.html au tout premier paint (Dexie est asynchrone). */
function mirrorThemeChoice(prefs: Pick<UserPrefs, 'theme' | 'customBase'>) {
  try {
    /* Le script d'index.html ne connaît que light | dark | auto : on lui donne
       le fond, pas le mode, pour qu'un thème personnalisé ne le déroute pas. */
    localStorage.setItem(
      'atelier.theme',
      prefs.theme === 'custom' ? (prefs.customBase ?? 'auto') : prefs.theme,
    );
  } catch {
    /* ignore */
  }
}

/**
 * Miroir des jetons dérivés : sans lui, le premier paint serait indigo.
 * Les deux fonds y sont écrits, pour qu'un basculement du système pendant la
 * nuit n'affiche pas une palette calculée pour l'autre.
 */
function mirrorAccent(both: Record<ResolvedTheme, Record<string, string>> | null) {
  try {
    if (both) localStorage.setItem('atelier.accent', JSON.stringify(both));
    else localStorage.removeItem('atelier.accent');
  } catch {
    /* ignore */
  }
}

/** Fond, accent et miroirs : tout ce qu'un changement d'apparence entraîne. */
function applyAppearance(prefs: UserPrefs): ResolvedTheme {
  const resolved = resolveTheme(prefs);
  applyTheme(resolved);
  applyAccent(prefs, resolved);
  mirrorThemeChoice(prefs);
  return resolved;
}

/* ------------------------- Helpers de gamification ---------------------- */

/** Met à jour la série : +1 si actif la veille, remise à 1 sinon. Idempotent le même jour. */
function touchStreak(gam: Gamification, today: string): Gamification {
  if (gam.lastDay === today) return gam;
  const streak = gam.lastDay === addDays(today, -1) ? gam.streak + 1 : 1;
  return { ...gam, streak, lastDay: today };
}

function anyPhaseComplete(doneSteps: Set<string>): boolean {
  const parcours = getParcours();
  for (const track of Object.values(parcours)) {
    for (const phase of track.phases) {
      if (phase.steps.length > 0 && phase.steps.every((s) => doneSteps.has(s.id))) return true;
    }
  }
  return false;
}

async function gatherBadgeContext(gam: Gamification): Promise<BadgeContext> {
  const [sessions, readDocs, notesCount, steps, results] = await Promise.all([
    db.qcmSessions.toArray(),
    db.docs.filter((d) => d.read).toArray(),
    db.notes.count(),
    db.steps.toArray(),
    db.qcmResults.toArray(),
  ]);
  const questionsAnswered = sessions.reduce((n, s) => n + s.total, 0);
  const hadPerfectSession = sessions.some((s) => s.total >= 20 && s.score === s.total);
  const doneSteps = new Set(steps.filter((s) => s.done).map((s) => s.stepId));
  const banks = new Set(results.map((r) => r.qid.split(':')[0]));
  return {
    questionsAnswered,
    hadPerfectSession,
    streak: gam.streak,
    level: levelFromXp(gam.xp).level,
    srsReviews: gam.reviewsCount,
    docsRead: readDocs.length,
    phaseCompleted: anyPhaseComplete(doneSteps),
    notesCount,
    goalReachedEver: gam.goalReachedEver,
    banksCovered: banks.size,
  };
}

let toastId = 1;
let mediaListenerBound = false;

/* -------------------------------- Store --------------------------------- */

export const useApp = create<AppState>((set, get) => {
  async function persistGam(next: Gamification) {
    await saveGam(next);
    set({ gam: next });
  }
  async function commitGam(mut: (g: Gamification) => Gamification): Promise<Gamification> {
    const next = mut(get().gam);
    await persistGam(next);
    return next;
  }

  return {
    loaded: false,
    prefs: DEFAULT_PREFS,
    gam: DEFAULT_GAM,
    earnedBadges: [],
    resolvedTheme: systemTheme(),
    confettiNonce: 0,
    toasts: [],

    async init() {
      let prefs = await getPrefs();
      if (!(await db.prefs.get('prefs'))) {
        prefs = { ...DEFAULT_PREFS };
        await db.prefs.put(prefs);
      }
      let gam = await getGam();
      if (!(await db.gam.get('gam'))) {
        gam = { ...DEFAULT_GAM };
        await db.gam.put(gam);
      }
      const earned = (await db.badges.toArray()).map((b) => b.id);
      const resolved = resolveTheme(prefs);
      applyTheme(resolved);
      applyAccent(prefs, resolved);
      mirrorThemeChoice(prefs);

      // Réagir aux changements système quand le fond suit le système.
      if (!mediaListenerBound && typeof window !== 'undefined' && window.matchMedia) {
        mediaListenerBound = true;
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
          const p = get().prefs;
          if (p.theme === 'auto' || (p.theme === 'custom' && (p.customBase ?? 'auto') === 'auto')) {
            const r = systemTheme();
            applyTheme(r);
            // La palette dérivée dépend du fond : elle se recalcule avec lui.
            applyAccent(p, r);
            set({ resolvedTheme: r });
          }
        });
      }

      set({ prefs, gam, earnedBadges: earned, resolvedTheme: resolved, loaded: true });
    },

    async reloadFromDb() {
      const prefs = await getPrefs();
      const gam = await getGam();
      const earned = (await db.badges.toArray()).map((b) => b.id);
      const resolved = resolveTheme(prefs);
      applyTheme(resolved);
      applyAccent(prefs, resolved);
      mirrorThemeChoice(prefs);
      set({ prefs, gam, earnedBadges: earned, resolvedTheme: resolved });
    },

    async setTheme(t) {
      const prefs = await savePrefs({ theme: t });
      applyAppearance(prefs);
      set({ prefs, resolvedTheme: resolveTheme(prefs) });
    },

    async setAccent(hex) {
      if (!isValidHex(hex)) return;
      const prefs = await savePrefs({ accent: hex, theme: 'custom' });
      applyAppearance(prefs);
      set({ prefs, resolvedTheme: resolveTheme(prefs) });
    },

    async setAccentIntensity(v) {
      const prefs = await savePrefs({ accentIntensity: Math.min(1, Math.max(0, v)) });
      applyAppearance(prefs);
      set({ prefs });
    },

    async setCustomBase(b) {
      const prefs = await savePrefs({ customBase: b });
      applyAppearance(prefs);
      set({ prefs, resolvedTheme: resolveTheme(prefs) });
    },

    async setDailyGoal(n) {
      const prefs = await savePrefs({ dailyGoal: Math.max(1, Math.round(n)) });
      set({ prefs });
    },

    async setSidebarCollapsed(b) {
      const prefs = await savePrefs({ sidebarCollapsed: b });
      set({ prefs });
    },

    async patchPrefs(p) {
      const prefs = await savePrefs(p);
      set({ prefs });
    },

    async addXp(amount) {
      if (amount <= 0) return;
      const t = toDayStr();
      await commitGam((g) => {
        const s = touchStreak(g, t);
        return { ...s, xp: s.xp + amount, days: { ...s.days, [t]: (s.days[t] ?? 0) + amount } };
      });
    },

    async registerActivity() {
      const t = toDayStr();
      if (get().gam.lastDay === t) return;
      await commitGam((g) => touchStreak(g, t));
    },

    async incReviews(n) {
      await commitGam((g) => ({ ...g, reviewsCount: g.reviewsCount + n }));
    },

    async registerQuestionsDone(count) {
      const t = toDayStr();
      const goal = get().prefs.dailyGoal;
      let reachedNow = false;
      await commitGam((g) => {
        const s = touchStreak(g, t);
        const before = s.goalDoneDay === t ? s.goalDoneToday : 0;
        const done = before + count;
        reachedNow = before < goal && done >= goal;
        return {
          ...s,
          goalDoneToday: done,
          goalDoneDay: t,
          goalReachedEver: s.goalReachedEver || done >= goal,
        };
      });
      if (reachedNow) {
        get().fireConfetti();
        get().pushToast({
          title: 'Objectif du jour atteint !',
          desc: `${goal} questions — bravo.`,
          icon: '🎯',
          kind: 'success',
        });
      }
    },

    async registerWordsDone(count) {
      const t = toDayStr();
      let reachedNow = false;
      await commitGam((g) => {
        const s = touchStreak(g, t);
        const before = s.wordsDay === t ? (s.wordsDoneToday ?? 0) : 0;
        const done = before + count;
        reachedNow = before < DAILY_WORD_GOAL && done >= DAILY_WORD_GOAL;
        return { ...s, wordsDoneToday: done, wordsDay: t };
      });
      if (reachedNow) {
        get().pushToast({
          title: 'Objectif vocabulaire atteint',
          desc: `${DAILY_WORD_GOAL} mots travaillés aujourd'hui.`,
          kind: 'success',
        });
      }
    },

    async refreshBadges() {
      const ctx = await gatherBadgeContext(get().gam);
      const earned = evaluateBadges(ctx);
      const existing = new Set(get().earnedBadges);
      const newly = [...earned].filter((id) => !existing.has(id));
      if (newly.length) {
        const now = new Date().toISOString();
        await db.badges.bulkPut(newly.map((id) => ({ id, at: now })));
        set({ earnedBadges: [...earned] });
        for (const id of newly) {
          const def = BADGES.find((b) => b.id === id);
          if (def)
            get().pushToast({ title: `Badge : ${def.title}`, desc: def.desc, icon: def.icon, kind: 'badge' });
        }
      }
      return newly;
    },

    fireConfetti() {
      set((s) => ({ confettiNonce: s.confettiNonce + 1 }));
    },

    pushToast(t) {
      const id = toastId++;
      set((s) => ({ toasts: [...s.toasts, { ...t, id }] }));
      setTimeout(() => get().dismissToast(id), 5000);
    },

    dismissToast(id) {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    },
  };
});

/** Sélecteur pratique : infos de niveau dérivées de l'XP.
    On sélectionne une PRIMITIVE (xp) puis on dérive, sinon Zustand v5 boucle
    (un sélecteur renvoyant un objet neuf casse l'égalité référentielle). */
export function useLevel() {
  const xp = useApp((s) => s.gam.xp);
  return levelFromXp(xp);
}
