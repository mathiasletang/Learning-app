import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/core/db';
import { questionsByBank, themesOf } from '@/core/content';
import { BANKS, themeLabel } from '@/core/meta';
import type { SubjectDef } from '@/core/subjects';
import { Gauge, Icon, Reveal } from '@/ui';

const MODE_LABEL: Record<string, string> = {
  train: 'Entraînement',
  exam: 'Examen',
  timed: 'Chronométré',
  review: 'Révision',
};

/**
 * Les banques de questions de la matière, et la reprise en un geste de la
 * dernière séance — même banque, même mode, même thème.
 */
export function SubjectPractice({ def }: { def: SubjectDef }) {
  const sessions = useLiveQuery(() => db.qcmSessions.toArray(), [], []);

  const mine = useMemo(
    () => sessions.filter((s) => def.banks.includes(s.bank)),
    [sessions, def.banks],
  );

  /* La dernière séance de la matière — pour reprendre sans reconfigurer. */
  const last = useMemo(() => {
    if (!mine.length) return null;
    return mine.reduce((a, b) => ((a.id ?? 0) > (b.id ?? 0) ? a : b));
  }, [mine]);

  const lastUrl = last
    ? `/qcm/${last.bank}?mode=${last.mode}${last.theme ? `&theme=${encodeURIComponent(last.theme)}` : ''}`
    : null;

  return (
    <>
      {last && lastUrl && (
        <Reveal>
          <Link to={lastUrl} className="resume-strip">
            <Icon name="play" size={16} />
            <span>
              <strong>Reprendre</strong> — {BANKS[last.bank].title} · {MODE_LABEL[last.mode] ?? last.mode}
              {last.theme ? ` · ${themeLabel(last.bank, last.theme)}` : ''}
            </span>
            <span className="meta tnum" style={{ marginLeft: 'auto' }}>
              {last.score}/{last.total} la dernière fois
            </span>
            <Icon name="arrowRight" size={16} />
          </Link>
        </Reveal>
      )}

      <div className="banklist" style={{ marginTop: last ? 'var(--s-6)' : 0 }}>
        {def.banks.map((b, i) => {
          const meta = BANKS[b];
          const count = questionsByBank(b).length;
          const nThemes = themesOf(b).length;
          const bankSessions = mine.filter((s) => s.bank === b);
          const bTotal = bankSessions.reduce((n, s) => n + s.total, 0);
          const bScore = bankSessions.reduce((n, s) => n + s.score, 0);
          return (
            <Reveal key={b} delay={i * 0.05} y={12}>
              <Link to={`/qcm/${b}`} className="bankrow">
                <span className="bankrow__index">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="bankrow__name" style={{ display: 'block' }}>
                    {meta.title}
                  </span>
                  <span className="micro" style={{ marginTop: 'var(--s-2)', display: 'block' }}>
                    {count} questions · {nThemes} thèmes{meta.lang === 'en' ? ' · English' : ''}
                  </span>
                </span>
                <span className="bankrow__meta">
                  <span className="meta tnum">
                    {bTotal > 0 ? `${Math.round((bScore / bTotal) * 100)}%` : '—'}
                  </span>
                  <span style={{ display: 'block', width: 72, marginTop: 'var(--s-2)' }}>
                    <Gauge value={bTotal > 0 ? bScore / bTotal : 0} colorVar={meta.colorVar} />
                  </span>
                </span>
                <Icon name="arrowRight" size={17} className="bankrow__arrow" />
              </Link>
            </Reveal>
          );
        })}
      </div>
    </>
  );
}
