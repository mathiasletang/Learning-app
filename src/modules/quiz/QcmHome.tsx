import { Link } from 'react-router-dom';
import { BANK_ORDER, BANKS } from '@/core/meta';
import { questionsByBank, themesOf } from '@/core/content';
import { PageHead } from '@/ui/PageHead';
import { CardButton, Tag } from '@/ui';

export function QcmHome() {
  return (
    <>
      <PageHead
        title="QCM"
        subtitle="Cinq banques, quatre modes de jeu. Choisis une banque pour régler ta session."
      />
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        {BANK_ORDER.map((b) => {
          const meta = BANKS[b];
          const count = questionsByBank(b).length;
          const nThemes = themesOf(b).length;
          return (
            <Link key={b} to={`/qcm/${b}`} style={{ textDecoration: 'none' }}>
              <CardButton pad="lg" style={{ height: '100%' }} tabIndex={-1}>
                <div className="row row--between">
                  <Tag colorVar={meta.colorVar}>{meta.short}</Tag>
                  {meta.lang === 'en' && <span className="meta">English</span>}
                </div>
                <h3 style={{ marginTop: 'var(--s-3)' }}>{meta.title}</h3>
                <p className="meta tnum">
                  {count} questions · {nThemes} thèmes
                </p>
              </CardButton>
            </Link>
          );
        })}
      </div>
    </>
  );
}
