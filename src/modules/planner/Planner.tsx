import { useMemo } from 'react';
import { getParcours } from '@/core/content';
import { useApp } from '@/app/store';
import type { TrackId } from '@/core/types';
import { PageHead, Button, Reveal } from '@/ui';
import { DataZone } from './DataZone';
import './planner.css';

const TRACKS: TrackId[] = ['opt', 'fin', 'cfa'];

export function Planner() {
  const parcours = getParcours();
  const dailyGoal = useApp((s) => s.prefs.dailyGoal);
  const setDailyGoal = useApp((s) => s.setDailyGoal);

  const months = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 6 }, (_, i) =>
      new Date(now.getFullYear(), now.getMonth() + i, 1).toLocaleDateString('fr-FR', {
        month: 'long',
        year: 'numeric',
      }),
    );
  }, []);

  /* Répartit les phases sur six mois, au prorata des heures estimées. */
  const plan = useMemo(() => {
    const grid: Record<TrackId, string[][]> = { opt: [], fin: [], cfa: [] };
    for (const t of TRACKS) {
      const cells: string[][] = Array.from({ length: 6 }, () => []);
      const total = Math.max(1, parcours[t].phases.reduce((n, p) => n + p.h, 0));
      let cum = 0;
      for (const phase of parcours[t].phases) {
        cells[Math.min(5, Math.floor((cum / total) * 6))].push(phase.t);
        cum += phase.h;
      }
      grid[t] = cells;
    }
    return grid;
  }, [parcours]);

  return (
    <>
      <PageHead
        eyebrow="Planning"
        title="Six mois, trois fronts."
        display
        lead="Une répartition indicative des phases, au prorata des heures estimées. Elle n'engage à rien : elle donne un cap."
      />

      <section>
        <p className="eyebrow" style={{ marginBottom: 'var(--s-5)' }}>
          Objectif quotidien
        </p>
        <div className="goal">
          <Button
            variant="secondary"
            icon="x"
            aria-label="Diminuer l'objectif"
            onClick={() => setDailyGoal(Math.max(5, dailyGoal - 5))}
          />
          <span className="goal__value">{dailyGoal}</span>
          <Button
            variant="secondary"
            icon="plus"
            aria-label="Augmenter l'objectif"
            onClick={() => setDailyGoal(dailyGoal + 5)}
          />
          <span className="meta">questions par jour</span>
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <h2>Feuille de route</h2>
          <span className="micro">Indicatif</span>
        </div>

        <div className="plan__head">
          <span />
          {TRACKS.map((t) => (
            <span key={t} className="eyebrow">
              {parcours[t].titre}
            </span>
          ))}
        </div>

        <div className="plan">
          {months.map((m, i) => (
            <Reveal key={m} delay={i * 0.05} y={12}>
              <div className="plan__month">
                <span className="plan__label">{m}</span>
                {TRACKS.map((t) => (
                  <div className="plan__cell" key={t} data-track={parcours[t].court}>
                    {plan[t][i].length ? (
                      plan[t][i].map((title, k) => (
                        <span className="plan__item" key={k}>
                          {title}
                        </span>
                      ))
                    ) : (
                      <span className="plan__item" style={{ color: 'var(--ink-3)' }}>
                        —
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <DataZone />
      </section>
    </>
  );
}
