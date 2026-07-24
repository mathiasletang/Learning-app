import { useMemo } from 'react';
import { getParcours } from '@/core/content';
import { useApp } from '@/app/store';
import { BANKS } from '@/core/meta';
import type { TrackId } from '@/core/types';
import { PageHead } from '@/ui/PageHead';
import { Button, Card } from '@/ui';
import { DataZone } from './DataZone';

const TRACKS: TrackId[] = ['opt', 'fin', 'cfa'];

export function Planner() {
  const parcours = getParcours();
  const dailyGoal = useApp((s) => s.prefs.dailyGoal);
  const setDailyGoal = useApp((s) => s.setDailyGoal);

  const months = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
      return d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    });
  }, []);

  // Répartit les phases de chaque parcours sur 6 mois (proportionnel aux heures).
  const plan = useMemo(() => {
    const grid: Record<TrackId, string[][]> = { opt: [], fin: [], cfa: [] };
    for (const t of TRACKS) {
      const track = parcours[t];
      const cells: string[][] = Array.from({ length: 6 }, () => []);
      const total = Math.max(1, track.phases.reduce((n, p) => n + p.h, 0));
      let cum = 0;
      for (const phase of track.phases) {
        const m = Math.min(5, Math.floor((cum / total) * 6));
        cells[m].push(phase.t);
        cum += phase.h;
      }
      grid[t] = cells;
    }
    return grid;
  }, [parcours]);

  return (
    <>
      <PageHead title="Planning" subtitle="Vue indicative sur 6 mois — optimisation, finance et CFA en parallèle." />

      <Card pad="lg" style={{ marginBottom: 'var(--s-6)' }}>
        <div className="section-title">Objectif quotidien</div>
        <div className="row" style={{ gap: 'var(--s-3)' }}>
          <Button
            variant="secondary"
            icon="x"
            aria-label="Diminuer l'objectif"
            onClick={() => setDailyGoal(Math.max(1, dailyGoal - 5))}
          />
          <strong className="tnum" style={{ fontSize: 'var(--fs-h1)', minWidth: 90, textAlign: 'center' }}>
            {dailyGoal}
          </strong>
          <Button
            variant="secondary"
            icon="plus"
            aria-label="Augmenter l'objectif"
            onClick={() => setDailyGoal(dailyGoal + 5)}
          />
          <span className="meta">questions par jour</span>
        </div>
      </Card>

      <Card pad="lg" style={{ marginBottom: 'var(--s-6)', overflowX: 'auto' }}>
        <div className="section-title">Feuille de route</div>
        <table className="prose" style={{ width: '100%', borderCollapse: 'collapse', display: 'table' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: 'var(--s-2)' }}>Mois</th>
              {TRACKS.map((t) => (
                <th key={t} style={{ textAlign: 'left', padding: 'var(--s-2)', color: `var(${BANKS[t].colorVar})` }}>
                  {parcours[t].titre}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {months.map((m, i) => (
              <tr key={m}>
                <td style={{ padding: 'var(--s-2)', fontWeight: 600, textTransform: 'capitalize', whiteSpace: 'nowrap' }}>
                  {m}
                </td>
                {TRACKS.map((t) => (
                  <td key={t} style={{ padding: 'var(--s-2)', verticalAlign: 'top' }}>
                    {plan[t][i].length ? (
                      plan[t][i].map((title, k) => (
                        <div key={k} className="meta" style={{ color: 'var(--text)' }}>
                          {title}
                        </div>
                      ))
                    ) : (
                      <span className="meta">—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <DataZone />
    </>
  );
}
