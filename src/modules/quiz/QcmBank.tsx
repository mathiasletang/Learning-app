import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { BankId, QcmMode, Question } from '@/core/types';
import { BANKS } from '@/core/meta';
import { questionsByBank, themesOf } from '@/core/content';
import { failedQuestionIds, finalizeQcm, type AnswerEntry } from '@/app/actions';
import { useApp } from '@/app/store';
import { Button, Icon, PageHead, Tag } from '@/ui';
import { QcmRunner } from './QcmRunner';
import { QcmResults } from './QcmResults';
import './quiz.css';

type Size = '10' | '20' | '40' | 'all';
type Phase = 'setup' | 'running' | 'results';

const MODES: { value: QcmMode; name: string; desc: string }[] = [
  { value: 'train', name: 'Entraînement', desc: 'Correction et explication après chaque question.' },
  { value: 'exam', name: 'Examen', desc: 'Aucune correction avant la fin. Conditions réelles.' },
  { value: 'timed', name: 'Chronométré', desc: 'Trente secondes par question, passage automatique.' },
  { value: 'review', name: 'Révision', desc: 'Uniquement les questions déjà manquées.' },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function QcmBank() {
  const { bank } = useParams<{ bank: string }>();
  const pushToast = useApp((s) => s.pushToast);

  const [theme, setTheme] = useState<string | null>(null);
  const [size, setSize] = useState<Size>('20');
  const [mode, setMode] = useState<QcmMode>('train');
  const [phase, setPhase] = useState<Phase>('setup');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<AnswerEntry[]>([]);
  const [xpEarned, setXpEarned] = useState(0);

  const valid = bank && bank in BANKS;
  const bankId = bank as BankId;
  const meta = valid ? BANKS[bankId] : null;
  const themes = useMemo(() => (valid ? themesOf(bankId) : []), [bankId, valid]);

  if (!valid || !meta) {
    return (
      <>
        <PageHead title="Banque introuvable" />
        <Link className="btn btn--secondary" to="/qcm">
          Retour aux questions
        </Link>
      </>
    );
  }

  async function start() {
    let pool = questionsByBank(bankId);
    if (theme) pool = pool.filter((q) => q.theme === theme);
    if (mode === 'review') {
      const failed = await failedQuestionIds();
      pool = pool.filter((q) => failed.has(q.id));
      if (!pool.length) {
        pushToast({
          title: 'Rien à réviser',
          desc: 'Faites d’abord une séance : les questions manquées viendront ici.',
        });
        return;
      }
    }
    pool = shuffle(pool);
    if (size !== 'all') pool = pool.slice(0, Number(size));
    if (!pool.length) {
      pushToast({ title: 'Aucune question disponible' });
      return;
    }
    setQuestions(pool);
    setPhase('running');
  }

  async function onFinish(a: AnswerEntry[], durationSec: number) {
    const xp = await finalizeQcm(bankId, theme, mode, a, durationSec);
    setAnswers(a);
    setXpEarned(xp);
    setPhase('results');
  }

  if (phase === 'running') {
    return <QcmRunner questions={questions} mode={mode} onFinish={onFinish} onQuit={() => setPhase('setup')} />;
  }
  if (phase === 'results') {
    return (
      <QcmResults answers={answers} xpEarned={xpEarned} onRestart={start} onHome={() => setPhase('setup')} />
    );
  }

  const available = theme
    ? (themes.find((t) => t.code === theme)?.count ?? 0)
    : questionsByBank(bankId).length;

  return (
    <>
      <PageHead
        eyebrow="Séance de questions"
        title={meta.title}
        display
        lead={
          <>
            {questionsByBank(bankId).length} questions réparties en {themes.length} thèmes
            {meta.lang === 'en' ? ', en anglais' : ''}. Choisissez votre cadre de travail.
          </>
        }
        actions={
          <Link className="arrow-link" to="/qcm">
            <Icon name="arrowLeft" size={16} /> Toutes les banques
          </Link>
        }
      />

      <div className="setup">
        <div className="setup__block">
          <p className="eyebrow setup__legend">Mode</p>
          <div className="mode-list">
            {MODES.map((m) => (
              <button
                key={m.value}
                type="button"
                className="mode"
                aria-pressed={mode === m.value}
                onClick={() => setMode(m.value)}
              >
                <span className="mode__mark" aria-hidden />
                <span>
                  <span className="mode__name">{m.name}</span>
                  <span className="meta mode__desc" style={{ display: 'block' }}>
                    {m.desc}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="setup__block">
          <p className="eyebrow setup__legend">Thème</p>
          <div className="chips">
            <button type="button" className="chip" aria-pressed={theme === null} onClick={() => setTheme(null)}>
              Tous
            </button>
            {themes.map((t) => (
              <button
                key={t.code}
                type="button"
                className="chip"
                aria-pressed={theme === t.code}
                onClick={() => setTheme(t.code)}
              >
                {t.label} <span className="chip__count">{t.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="setup__block">
          <p className="eyebrow setup__legend">Longueur</p>
          <div className="chips">
            {(['10', '20', '40', 'all'] as Size[]).map((s) => (
              <button
                key={s}
                type="button"
                className="chip"
                aria-pressed={size === s}
                onClick={() => setSize(s)}
              >
                {s === 'all' ? `Tout · ${available}` : `${s} questions`}
              </button>
            ))}
          </div>
        </div>

        <div className="setup__block row" style={{ gap: 'var(--s-4)' }}>
          <Button variant="primary" icon="play" onClick={start}>
            Commencer
          </Button>
          <Tag colorVar={meta.colorVar}>{meta.short}</Tag>
        </div>
      </div>
    </>
  );
}
