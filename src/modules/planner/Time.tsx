import { useEffect, useMemo, useRef, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/core/db';
import { toDayStr } from '@/core/date';
import { getParcours } from '@/core/content';
import { SUBJECTS, subjectLabel } from '@/core/meta';
import { logTime } from '@/app/actions';
import type { TrackId } from '@/core/types';
import { PageHead } from '@/ui/PageHead';
import { Button, Card, Icon } from '@/ui';

function fmt(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return `${h > 0 ? h + ':' : ''}${String(m).padStart(h > 0 ? 2 : 1, '0')}:${String(s).padStart(2, '0')}`;
}

export function Time() {
  const [subject, setSubject] = useState('opt');
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef<number>(0);
  const [manualDate, setManualDate] = useState(toDayStr());
  const [manualMin, setManualMin] = useState(30);
  const [manualSubject, setManualSubject] = useState('opt');

  const logs = useLiveQuery(() => db.timeLogs.reverse().sortBy('date'), [], []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setElapsed(Math.round((Date.now() - startRef.current) / 1000)), 1000);
    return () => clearInterval(id);
  }, [running]);

  function startStop() {
    if (running) {
      const minutes = Math.round(elapsed / 60);
      if (minutes > 0) logTime(toDayStr(), subject, minutes);
      setRunning(false);
      setElapsed(0);
    } else {
      startRef.current = Date.now();
      setElapsed(0);
      setRunning(true);
    }
  }

  const totalsBySubject = useMemo(() => {
    const acc = new Map<string, number>();
    for (const l of logs) acc.set(l.subject, (acc.get(l.subject) ?? 0) + l.minutes);
    return acc;
  }, [logs]);

  const byDay = useMemo(() => {
    const map = new Map<string, { subject: string; minutes: number; id: number }[]>();
    for (const l of logs) {
      const arr = map.get(l.date) ?? [];
      arr.push({ subject: l.subject, minutes: l.minutes, id: l.id! });
      map.set(l.date, arr);
    }
    return [...map.entries()].sort((a, b) => (a[0] < b[0] ? 1 : -1));
  }, [logs]);

  const parcours = getParcours();
  const trackHours: { id: TrackId; label: string; target: number; done: number }[] = (
    ['opt', 'fin', 'cfa'] as TrackId[]
  ).map((t) => ({
    id: t,
    label: parcours[t].titre,
    target: parcours[t].heures,
    done: (totalsBySubject.get(t) ?? 0) / 60,
  }));

  return (
    <>
      <PageHead title="Temps de travail" subtitle="Chronomètre de session et saisie manuelle." />

      <div
        className="grid"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginBottom: 'var(--s-6)' }}
      >
        <Card pad="lg">
          <div className="section-title">Chronomètre</div>
          <div
            className="tnum"
            style={{ fontSize: '44px', fontWeight: 800, textAlign: 'center', margin: 'var(--s-3) 0' }}
          >
            {fmt(elapsed)}
          </div>
          <select
            className="select"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            aria-label="Matière du chronomètre"
            style={{ marginBottom: 'var(--s-3)' }}
            disabled={running}
          >
            {SUBJECTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
          <Button variant={running ? 'danger' : 'primary'} icon={running ? 'check' : 'play'} onClick={startStop} block>
            {running ? 'Arrêter et enregistrer' : 'Démarrer'}
          </Button>
        </Card>

        <Card pad="lg">
          <div className="section-title">Saisie manuelle</div>
          <label className="stack" style={{ gap: 'var(--s-1)', marginBottom: 'var(--s-3)' }}>
            <span className="meta">Date</span>
            <input
              type="date"
              className="input"
              value={manualDate}
              onChange={(e) => setManualDate(e.target.value)}
            />
          </label>
          <div className="row" style={{ gap: 'var(--s-3)', marginBottom: 'var(--s-3)' }}>
            <label className="stack" style={{ gap: 'var(--s-1)', flex: 1 }}>
              <span className="meta">Matière</span>
              <select
                className="select"
                value={manualSubject}
                onChange={(e) => setManualSubject(e.target.value)}
              >
                {SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="stack" style={{ gap: 'var(--s-1)', width: 100 }}>
              <span className="meta">Minutes</span>
              <input
                type="number"
                min={1}
                className="input tnum"
                value={manualMin}
                onChange={(e) => setManualMin(Number(e.target.value))}
              />
            </label>
          </div>
          <Button
            variant="secondary"
            icon="plus"
            block
            onClick={() => logTime(manualDate, manualSubject, manualMin)}
          >
            Ajouter
          </Button>
        </Card>
      </div>

      <Card pad="lg" style={{ marginBottom: 'var(--s-6)' }}>
        <div className="section-title">Volume par parcours (vs estimé)</div>
        {trackHours.map((t) => (
          <div key={t.id} className="bar-row">
            <span className="bar-row__label">{t.label}</span>
            <span className="bar-row__track">
              <span
                className="bar-row__fill"
                style={{ width: `${Math.min(100, (t.done / t.target) * 100)}%`, background: 'var(--accent)' }}
              />
            </span>
            <span className="bar-row__value tnum">
              {t.done.toFixed(1)}/{t.target} h
            </span>
          </div>
        ))}
      </Card>

      <section>
        <div className="section-title">Journal</div>
        {byDay.length === 0 && <p className="meta">Aucune session enregistrée.</p>}
        {byDay.map(([day, entries]) => {
          const total = entries.reduce((n, e) => n + e.minutes, 0);
          return (
            <Card key={day} style={{ marginBottom: 'var(--s-2)' }}>
              <div className="row row--between">
                <strong className="tnum">{new Date(day).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}</strong>
                <span className="meta tnum">{(total / 60).toFixed(1)} h</span>
              </div>
              <div className="stack" style={{ gap: 'var(--s-1)', marginTop: 'var(--s-2)' }}>
                {entries.map((e) => (
                  <div key={e.id} className="row row--between meta">
                    <span>{subjectLabel(e.subject)}</span>
                    <span className="row" style={{ gap: 'var(--s-2)' }}>
                      <span className="tnum">{e.minutes} min</span>
                      <button
                        type="button"
                        className="btn btn--ghost btn--icon btn--sm"
                        aria-label="Supprimer cette entrée"
                        onClick={() => db.timeLogs.delete(e.id)}
                      >
                        <Icon name="trash" size={15} />
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </section>
    </>
  );
}
