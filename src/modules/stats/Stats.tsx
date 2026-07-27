import { useMemo } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/core/db';
import { useApp, useLevel } from '@/app/store';
import { toDayStr, addDays } from '@/core/date';
import { BADGES } from '@/core/gamification';
import { BANKS, BANK_ORDER, SUBJECTS, subjectLabel, subjectColorVar } from '@/core/meta';
import type { BankId } from '@/core/types';
import { PageHead, Gauge, Reveal } from '@/ui';
import './stats.css';

function heatLevel(xp: number): 0 | 1 | 2 | 3 | 4 {
  if (xp <= 0) return 0;
  if (xp <= 15) return 1;
  if (xp <= 40) return 2;
  if (xp <= 80) return 3;
  return 4;
}

/** Courbe d'XP sur 14 jours — tracé lissé, sans axes. */
function Spark({ points }: { points: { day: string; xp: number }[] }) {
  const w = 720;
  const h = 120;
  const max = Math.max(1, ...points.map((p) => p.xp));
  const step = points.length > 1 ? w / (points.length - 1) : w;
  const coords = points.map((p, i) => [i * step, h - (p.xp / max) * h] as const);
  const line = coords.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const area = `${line} L${w} ${h} L0 ${h} Z`;
  const last = coords[coords.length - 1];

  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h + 8}`} preserveAspectRatio="none" role="img"
      aria-label="Progression de l'expérience sur quatorze jours">
      <path className="spark__area" d={area} />
      <path className="spark__line" d={line} vectorEffect="non-scaling-stroke" />
      <line className="spark__base" x1={0} y1={h} x2={w} y2={h} vectorEffect="non-scaling-stroke" />
      {last && <circle className="spark__dot" cx={last[0]} cy={last[1]} r={3} />}
    </svg>
  );
}

export function Stats() {
  const gam = useApp((s) => s.gam);
  const level = useLevel();
  const earned = useApp((s) => s.earnedBadges);
  const badgeRows = useLiveQuery(() => db.badges.toArray(), [], []);
  const sessions = useLiveQuery(() => db.qcmSessions.toArray(), [], []);
  const timeLogs = useLiveQuery(() => db.timeLogs.toArray(), [], []);
  const today = toDayStr();

  const badgeDate = useMemo(() => new Map(badgeRows.map((b) => [b.id, b.at])), [badgeRows]);

  const heat = useMemo(() => {
    const start = addDays(today, -181);
    return Array.from({ length: 182 }, (_, i) => {
      const day = addDays(start, i);
      return { day, xp: gam.days[day] ?? 0 };
    });
  }, [today, gam.days]);

  const xp14 = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const day = addDays(today, -(13 - i));
        return { day, xp: gam.days[day] ?? 0 };
      }),
    [today, gam.days],
  );

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

  const bySubject = useMemo(() => {
    const acc = new Map<string, number>();
    for (const t of timeLogs) acc.set(t.subject, (acc.get(t.subject) ?? 0) + t.minutes);
    return acc;
  }, [timeLogs]);
  const maxMin = Math.max(1, ...bySubject.values());

  const activeDays = Object.values(gam.days).filter((x) => x > 0).length;
  const totalHours = [...bySubject.values()].reduce((a, b) => a + b, 0) / 60;
  const answered = sessions.reduce((n, s) => n + s.total, 0);

  return (
    <>
      <PageHead
        eyebrow="Statistiques"
        title="Ce que le travail a laissé."
        display
        lead="Le détail compte moins que la régularité. Ces courbes n'ont qu'un but : montrer si la pratique tient dans la durée."
      />

      <div className="figures">
        <div>
          <span className="figure__value tnum">{level.level}</span>
          <span className="eyebrow figure__label">Niveau</span>
          <span className="micro figure__note tnum">{gam.xp} XP</span>
        </div>
        <div>
          <span className="figure__value tnum">{gam.streak}</span>
          <span className="eyebrow figure__label">Série</span>
          <span className="micro figure__note">jours consécutifs</span>
        </div>
        <div>
          <span className="figure__value tnum">{activeDays}</span>
          <span className="eyebrow figure__label">Jours actifs</span>
        </div>
        <div>
          <span className="figure__value tnum">{totalHours.toFixed(0)} h</span>
          <span className="eyebrow figure__label">Temps cumulé</span>
          <span className="micro figure__note tnum">{answered} questions</span>
        </div>
      </div>

      <section className="section">
        <div className="section__head">
          <h2>Activité</h2>
          <span className="micro">Six derniers mois</span>
        </div>
        <Reveal>
          <div className="heat" role="img" aria-label="Carte d'activité des six derniers mois">
            {heat.map((d) => (
              <div key={d.day} className={`heat__cell h${heatLevel(d.xp)}`} title={`${d.day} · ${d.xp} XP`} />
            ))}
          </div>
          <div className="legend micro" style={{ marginTop: 'var(--s-4)' }}>
            Moins
            {[0, 1, 2, 3, 4].map((l) => (
              <span key={l} className={`legend__cell h${l}`} style={l === 0 ? { background: 'var(--hairline)' } : undefined} />
            ))}
            Plus
          </div>
        </Reveal>
      </section>

      <section className="section">
        <div className="section__head">
          <h2>Expérience acquise</h2>
          <span className="micro">Quatorze jours</span>
        </div>
        <Reveal>
          <Spark points={xp14} />
          <div className="row row--between micro" style={{ marginTop: 'var(--s-3)' }}>
            <span>{xp14[0]?.day.slice(5).replace('-', '/')}</span>
            <span>Aujourd'hui</span>
          </div>
        </Reveal>
      </section>

      <section className="section">
        <div className="section__head">
          <h2>Précision par matière</h2>
        </div>
        {BANK_ORDER.every((b) => !precision.get(b)?.total) ? (
          <p className="meta">Aucune séance de questions pour l'instant.</p>
        ) : (
          BANK_ORDER.map((b) => {
            const a = precision.get(b);
            if (!a?.total) return null;
            const r = a.score / a.total;
            return (
              <div className="bar" key={b}>
                <span className="bar__label">{BANKS[b].title}</span>
                <Gauge value={r} colorVar={BANKS[b].colorVar} thick />
                <span className="bar__value">{Math.round(r * 100)}%</span>
              </div>
            );
          })
        )}
      </section>

      <section className="section">
        <div className="section__head">
          <h2>Temps par matière</h2>
        </div>
        {bySubject.size === 0 ? (
          <p className="meta">Aucune séance chronométrée pour l'instant.</p>
        ) : (
          SUBJECTS.filter((s) => bySubject.has(s.id)).map((s) => {
            const min = bySubject.get(s.id) ?? 0;
            return (
              <div className="bar" key={s.id}>
                <span className="bar__label">{subjectLabel(s.id)}</span>
                <Gauge value={min / maxMin} colorVar={subjectColorVar(s.id)} thick />
                <span className="bar__value">{(min / 60).toFixed(1)} h</span>
              </div>
            );
          })
        )}
      </section>

      <section className="section">
        <div className="section__head">
          <h2>Distinctions</h2>
          <span className="micro tnum">
            {earned.length} / {BADGES.length}
          </span>
        </div>
        <div className="badges">
          {BADGES.map((b, i) => {
            const has = earned.includes(b.id);
            const at = badgeDate.get(b.id);
            return (
              <Reveal key={b.id} delay={Math.min(i, 8) * 0.03} y={10}>
                <div className={`badge ${has ? 'is-earned' : ''}`}>
                  <p className="badge__name">{b.title}</p>
                  <span className="micro badge__desc">{b.desc}</span>
                  {has && at && (
                    <span className="micro badge__desc tnum">
                      {new Date(at).toLocaleDateString('fr-FR')}
                    </span>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
