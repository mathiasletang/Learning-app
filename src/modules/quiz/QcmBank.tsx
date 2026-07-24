import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { BankId, QcmMode, Question } from '@/core/types';
import { BANKS } from '@/core/meta';
import { questionsByBank, themesOf } from '@/core/content';
import { failedQuestionIds, finalizeQcm, type AnswerEntry } from '@/app/actions';
import { useApp } from '@/app/store';
import { PageHead } from '@/ui/PageHead';
import { Button, Card, Icon, Segmented, Tag } from '@/ui';
import { QcmRunner } from './QcmRunner';
import { QcmResults } from './QcmResults';
import './quiz.css';

type Size = '10' | '20' | '40' | 'all';
type Phase = 'setup' | 'running' | 'results';

const MODE_OPTS: { value: QcmMode; label: string }[] = [
  { value: 'train', label: 'Entraînement' },
  { value: 'exam', label: 'Examen' },
  { value: 'timed', label: 'Chronométré' },
  { value: 'review', label: 'Révision' },
];

const MODE_DESC: Record<QcmMode, string> = {
  train: 'Correction immédiate avec explication après chaque question.',
  exam: 'Correction affichée seulement à la fin.',
  timed: '30 secondes par question, avance automatique.',
  review: 'Rejoue uniquement les questions déjà ratées.',
};

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
          Retour aux QCM
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
      if (pool.length === 0) {
        pushToast({
          title: 'Aucune question à réviser',
          desc: 'Fais d’abord des sessions : les questions ratées viendront ici.',
          icon: '📭',
        });
        return;
      }
    }
    pool = shuffle(pool);
    if (size !== 'all') pool = pool.slice(0, Number(size));
    if (pool.length === 0) {
      pushToast({ title: 'Aucune question disponible', icon: '📭' });
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
    return (
      <QcmRunner
        questions={questions}
        mode={mode}
        onFinish={onFinish}
        onQuit={() => setPhase('setup')}
      />
    );
  }

  if (phase === 'results') {
    return (
      <QcmResults
        answers={answers}
        xpEarned={xpEarned}
        onRestart={() => start()}
        onHome={() => setPhase('setup')}
      />
    );
  }

  const available =
    theme != null ? (themes.find((t) => t.code === theme)?.count ?? 0) : questionsByBank(bankId).length;

  return (
    <>
      <PageHead
        title={meta.title}
        subtitle={
          <span className="row" style={{ gap: 'var(--s-2)' }}>
            <Tag colorVar={meta.colorVar}>{meta.short}</Tag>
            <span className="tnum">{questionsByBank(bankId).length} questions</span>
            {meta.lang === 'en' && <Tag>English</Tag>}
          </span>
        }
        actions={
          <Link className="btn btn--ghost" to="/qcm">
            <Icon name="arrowLeft" size={18} /> Banques
          </Link>
        }
      />

      <Card pad="lg" style={{ maxWidth: 720 }}>
        <div className="qcm-setup__group">
          <div className="section-title">Mode</div>
          <Segmented options={MODE_OPTS} value={mode} onChange={setMode} ariaLabel="Mode de jeu" />
          <p className="meta" style={{ marginTop: 'var(--s-2)' }}>
            {MODE_DESC[mode]}
          </p>
        </div>

        <div className="qcm-setup__group">
          <div className="section-title">Thème</div>
          <div className="chips">
            <button
              type="button"
              className="chip"
              aria-pressed={theme === null}
              onClick={() => setTheme(null)}
            >
              Tous les thèmes
            </button>
            {themes.map((t) => (
              <button
                key={t.code}
                type="button"
                className="chip"
                aria-pressed={theme === t.code}
                onClick={() => setTheme(t.code)}
              >
                {t.label} <span className="meta tnum">{t.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="qcm-setup__group">
          <div className="section-title">Nombre de questions</div>
          <div className="chips">
            {(['10', '20', '40', 'all'] as Size[]).map((s) => (
              <button
                key={s}
                type="button"
                className="chip"
                aria-pressed={size === s}
                onClick={() => setSize(s)}
              >
                {s === 'all' ? `Tout (${available})` : s}
              </button>
            ))}
          </div>
        </div>

        <Button variant="primary" icon="play" onClick={start} block>
          Commencer
        </Button>
      </Card>
    </>
  );
}
