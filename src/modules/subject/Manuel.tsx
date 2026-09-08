import { MANUELS, chapitresDe, urlManuel } from '@/core/manuels';
import type { SubjectId } from '@/core/subjects';
import { Icon } from '@/ui';

/**
 * Le manuel d'une matière, en tête de ses documents. Un livre ne se
 * transforme pas en fiche : on le laisse en PDF, mais on en publie le
 * sommaire — autant de portes d'entrée que de chapitres, plutôt qu'une seule.
 */
export function Manuel({ subject }: { subject: SubjectId }) {
  const manuel = MANUELS[subject];
  const url = manuel ? urlManuel(manuel) : '';
  if (!manuel || !url) return null;
  const chapitres = chapitresDe(manuel);

  return (
    <section className="manuel">
      <div className="manuel__tete">
        <p className="eyebrow">Cours</p>
        <h2 className="manuel__titre">{manuel.titre}</h2>
        <p className="manuel__lead">{manuel.lead}</p>
        <p className="row row--wrap" style={{ gap: 'var(--s-5)', marginTop: 'var(--s-7)' }}>
          <a className="btn btn--primary" href={url} target="_blank" rel="noopener noreferrer">
            <Icon name="external" size={16} /> Ouvrir le cours
          </a>
          <span className="micro tnum">
            {manuel.pages} pages · {chapitres.length} chapitres · PDF
          </span>
        </p>
      </div>

      <div className="manuel__sommaire" data-colonnes={manuel.parties.length > 1 ? 'deux' : 'une'}>
        {manuel.parties.map((partie) => (
          <div className="manuel__partie" key={partie.titre || 'sommaire'}>
            {partie.titre && <p className="eyebrow manuel__partie-titre">{partie.titre}</p>}
            {partie.chapitres.map((c) => (
              <a
                key={c.numero}
                className="manuel__chapitre"
                href={urlManuel(manuel, c.page)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="manuel__num tnum">{String(c.numero).padStart(2, '0')}</span>
                <span className="manuel__nom">{c.titre}</span>
                <span className="micro tnum manuel__page">p.&nbsp;{c.page}</span>
              </a>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
