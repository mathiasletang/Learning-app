import { useMemo } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/core/db';
import { useApp } from '@/app/store';
import { toDayStr, addDays } from '@/core/date';
import { BADGES } from '@/core/gamification';
import { BANKS, BANK_ORDER, SUBJECTS, subjectLabel, subjectColorVar } from '@/core/meta';
import type { BankId } from '@/core/types';
import { PageHead } from '@/ui/PageHead';
import { Card } from '@/ui';
import './stats.css';

function heatLevel(xp: number): 0 | 1 | 2 | 3 | 4 {
  if (xp <= 0) return 0;
  if (xp <= 15) return 1;
  if (xp <= 40) return 2;
  if (xp <= 80) return 3;
  return 4;
}

export function Stats() {
  const gam = useApp((s) => s.gam);
  const earned = useApp((s) => s.earnedBadges);
  const badgeRows = useLiveQuery(() => db.badges.toArray(), [], []);
  const sessions = useLiveQuery(() => db.qcmSessions.toArray(), [], []);
  const timeLogs = useLiveQuery(() => db.timeLogs.toArray(), [], []);
  const today = toDayStr();

  const badgeDate = useMemo(
    () => new Map(badgeRows.map((b) => [b.id, b.at])),
    [badgeRows],
  );

  // Heatmap : 26 semaines (≈ 6 mois), colonnes = semaines.
  const heatDays = useMemo(() => {
    const days: { day: string; xp: number }[] = [];
    // recule jusqu'au lundi il y a ~26 semaines
    const start = addDays(today, -181);
    for (let i = 0; i <= 181; i++) {
      const day = addDays(start, i);
      days.push({ day, xp: gam.days[day] ?? 0 });
    }
    return days;
  }, [today, gam.days]);

  // Courbe d'XP : 14 derniers jours.
  const xp14 = useMemo(() => {
    const arr: { day: string; xp: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const day = addDays(today, -i);
      arr.push({ day, xp: gam.days[day] ?? 0 });
    }
    return arr;
  }, [today, gam.days]);
  const maxXp14 = Math.max(1, ...xp14.map((d) => d.xp));

  // Précision par matière (banque).
  const precision = useMemo(() => {
    const acc = new Map<BankId, { score: number; total: number }>();
    for (const s of sessions) {
      const a = acc.get(s.bank) ?? { score: 0, total: 0 };
      a.score += s.score;
      a.total += s.total;
      acc.set(s.bank, a);
    }
    return acc;
  }, [sessions]);

  // Temps par matière (heures).
  const timeBySubject = useMemo(() => {
    const acc = new Map<string, number>();
    for (const t of timeLogs) acc.set(t.subject, (acc.get(t.subject) ?? 0) + t.minutes);
    return acc;
  }, [timeLogs]);
  const maxMinutes = Math.max(1, ...timeBySubject.values());

  return (
    <>
      <PageHead title="Statistiques" subtitle="Ton activité, ta précision et tes badges." />

      <Card pad="lg" style={{ marginBottom: 'var(--s-5)' }}>
        <div className="section-title">Activité (6 mois)</div>
        <div className="heatmap" role="img" aria-label="Carte d'activité des 6 derniers mois">
          {heatDays.map((d) => (
            <div
              key={d.day}
              className={`heatmap__cell heat-${heatLevel(d.xp)}`}
              title={`${d.day} · ${d.xp} XP`}
            />
          ))}
        </div>
        <div className="legend" style={{ marginTop: 'var(--s-3)' }}>
          Moins
          {[0, 1, 2, 3, 4].map((l) => (
            <span key={l} className={`legend__cell heat-${l}`} />
          ))}
          Plus
        </div>
      </Card>

      <Card pad="lg" style={{ marginBottom: 'var(--s-5)' }}>
        <div className="section-title">XP — 14 derniers jours</div>
        <div className="bars">
          {xp14.map((d) => (
            <div key={d.day} className="bars__col">
              <div
                className="bars__bar"
                style={{ height: `${(d.xp / maxXp14) * 100}%` }}
                title={`${d.day} · ${d.xp} XP`}
              />
              <span className="bars__label">{d.day.slice(8)}</span>
            </div>
          ))}
        </div>
      </Card>

      <div
        className="grid"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginBottom: 'var(--s-5)' }}
      >
        <Card pad="lg">
          <div className="section-title">Précision par matière</div>
          {BANK_ORDER.every((b) => !precision.get(b)) ? (
            <p className="meta">Fais des QCM pour voir ta précision.</p>
          ) : (
            BANK_ORDER.map((b) => {
              const a = precision.get(b);
              if (!a || a.total === 0) return null;
              const ratio = a.score / a.total;
              return (
                <div key={b} className="bar-row">
                  <span className="bar-row__label">{BANKS[b].short}</span>
                  <span className="bar-row__track">
                    <span
                      className="bar-row__fill"
                      style={{ width: `${ratio * 100}%`, background: `var(${BANKS[b].colorVar})` }}
                    />
                  </span>
                  <span className="bar-row__value">{Math.round(ratio * 100)}%</span>
                </div>
              );
            })
          )}
        </Card>

        <Card pad="lg">
          <div className="section-title">Temps par matière</div>
          {timeBySubject.size === 0 ? (
            <p className="meta">Enregistre du temps de travail pour voir la répartition.</p>
          ) : (
            SUBJECTS.filter((s) => timeBySubject.has(s.id)).map((s) => {
              const min = timeBySubject.get(s.id) ?? 0;
              return (
                <div key={s.id} className="bar-row">
                  <span className="bar-row__label">{subjectLabel(s.id)}</span>
                  <span className="bar-row__track">
                    <span
                      className="bar-row__fill"
                      style={{ width: `${(min / maxMinutes) * 100}%`, background: `var(${subjectColorVar(s.id)})` }}
                    />
                  </span>
                  <span className="bar-row__value">
                    {(min / 60).toFixed(1)} h
                  </span>
                </div>
              );
            })
          )}
        </Card>
      </div>

      <Card pad="lg">
        <div className="section-title">
          Badges ({earned.length}/{BADGES.length})
        </div>
        <div className="badge-wall">
          {BADGES.map((b) => {
            const has = earned.includes(b.id);
            const at = badgeDate.get(b.id);
            return (
              <div key={b.id} className={`badge ${has ? 'is-earned' : ''}`}>
                <div className="badge__icon" aria-hidden>
                  {b.icon}
                </div>
                <div className="badge__title">{b.title}</div>
                <div className="badge__desc">{b.desc}</div>
                {has && at && (
                  <div className="meta tnum" style={{ marginTop: 'var(--s-1)' }}>
                    {new Date(at).toLocaleDateString('fr-FR')}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
}
