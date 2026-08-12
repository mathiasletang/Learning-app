import { useEffect, useMemo, useRef, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/core/db';
import { toDayStr } from '@/core/date';
import { getParcours } from '@/core/content';
import { SUBJECTS, subjectLabel } from '@/core/meta';
import { logTime } from '@/app/actions';
import type { TrackId } from '@/core/types';
import { Button, Gauge, Icon, Reveal } from '@/ui';
import './planner.css';

function clock(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return h > 0
    ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    : `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function TimeSection() {
  const [subject, setSubject] = useState('opt');
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef(0);
  const [mDate, setMDate] = useState(toDayStr());
  const [mMin, setMMin] = useState(45);
  const [mSubject, setMSubject] = useState('opt');

  const logs = useLiveQuery(() => db.timeLogs.reverse().sortBy('date'), [], []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setElapsed(Math.round((Date.now() - startRef.current) / 1000)), 1000);
    return () => clearInterval(id);
  }, [running]);

  function toggle() {
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

  const totals = useMemo(() => {
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
  const tracks = (['opt', 'fin', 'cfa'] as TrackId[]).map((t) => ({
    id: t,
    label: parcours[t].titre,
    target: parcours[t].heures,
    done: (totals.get(t) ?? 0) / 60,
  }));

  const grand = [...totals.values()].reduce((a, b) => a + b, 0) / 60;

  return (
    <>
      <div className="timer">
        <div className="timer__face">
          <span className="eyebrow">{running ? 'En cours' : 'Chronomètre'}</span>
          <p className="timer__digits tnum">{clock(elapsed)}</p>
          <div className="row" style={{ gap: 'var(--s-3)', marginTop: 'var(--s-6)' }}>
            <select
              className="field"
              style={{ maxWidth: 200 }}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              aria-label="Matière de la séance"
              disabled={running}
            >
              {SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
            <Button variant={running ? 'secondary' : 'primary'} icon={running ? 'check' : 'play'} onClick={toggle}>
              {running ? 'Arrêter et noter' : 'Démarrer'}
            </Button>
          </div>
        </div>

        <div className="timer__manual">
          <p className="eyebrow" style={{ marginBottom: 'var(--s-5)' }}>
            Saisie manuelle
          </p>
          <div className="stack" style={{ gap: 'var(--s-4)' }}>
            <input
              type="date"
              className="field"
              value={mDate}
              onChange={(e) => setMDate(e.target.value)}
              aria-label="Date"
            />
            <select
              className="field"
              value={mSubject}
              onChange={(e) => setMSubject(e.target.value)}
              aria-label="Matière"
            >
              {SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
            <input
              type="number"
              min={1}
              className="field tnum"
              value={mMin}
              onChange={(e) => setMMin(Number(e.target.value))}
              aria-label="Minutes"
            />
            <Button variant="secondary" icon="plus" onClick={() => logTime(mDate, mSubject, mMin)}>
              Ajouter
            </Button>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="section__head">
          <h2>Face aux volumes estimés</h2>
          <span className="meta tnum">{grand.toFixed(1)} h au total</span>
        </div>
        {tracks.map((t) => (
          <div className="bar" key={t.id}>
            <span className="bar__label">{t.label}</span>
            <Gauge value={Math.min(1, t.done / t.target)} colorVar={`--m-${t.id}`} thick />
            <span className="bar__value">
              {t.done.toFixed(1)} / {t.target} h
            </span>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="section__head">
          <h2>Journal</h2>
        </div>
        {byDay.length === 0 ? (
          <div className="empty">
            <h3>Aucune séance notée</h3>
            <p className="meta">Lancez le chronomètre au début de votre prochaine session.</p>
          </div>
        ) : (
          <div className="banklist">
            {byDay.map(([day, entries], i) => {
              const total = entries.reduce((n, e) => n + e.minutes, 0);
              return (
                <Reveal key={day} delay={Math.min(i, 8) * 0.04} y={10}>
                  <div className="daylog">
                    <div className="daylog__head">
                      <span className="daylog__date">
                        {new Date(day).toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                        })}
                      </span>
                      <span className="meta tnum">{(total / 60).toFixed(1)} h</span>
                    </div>
                    {entries.map((e) => (
                      <div className="daylog__row" key={e.id}>
                        <span className="meta">{subjectLabel(e.subject)}</span>
                        <span className="micro tnum">{e.minutes} min</span>
                        <button
                          type="button"
                          className="btn btn--ghost btn--icon"
                          aria-label="Supprimer cette entrée"
                          onClick={() => db.timeLogs.delete(e.id)}
                        >
                          <Icon name="trash" size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
