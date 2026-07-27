import { Link } from 'react-router-dom';
import { BANK_ORDER, BANKS } from '@/core/meta';
import { questionsByBank, themesOf, allQuestions } from '@/core/content';
import { PageHead, Icon, Reveal } from '@/ui';
import './quiz.css';

export function QcmHome() {
  return (
    <>
      <PageHead
        eyebrow="Questions"
        title="Cinq banques, une méthode."
        display
        lead={`${allQuestions().length} questions à choix multiple, corrigées et expliquées. Choisissez une banque, puis le cadre de la séance.`}
      />

      <div className="banklist">
        {BANK_ORDER.map((b, i) => {
          const meta = BANKS[b];
          const count = questionsByBank(b).length;
          const nThemes = themesOf(b).length;
          return (
            <Reveal key={b} delay={i * 0.06} y={14}>
              <Link to={`/qcm/${b}`} className="bankrow">
                <span className="bankrow__index">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="bankrow__name" style={{ display: 'block' }}>
                    {meta.title}
                  </span>
                  <span className="micro" style={{ marginTop: 'var(--s-2)', display: 'block' }}>
                    {nThemes} thèmes{meta.lang === 'en' ? ' · English' : ''}
                  </span>
                </span>
                <span className="bankrow__meta meta tnum">{count}</span>
                <Icon name="arrowRight" size={17} className="bankrow__arrow" />
              </Link>
            </Reveal>
          );
        })}
      </div>
    </>
  );
}
