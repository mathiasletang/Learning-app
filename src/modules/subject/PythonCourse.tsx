import { COURS_PYTHON, chapitresPython, urlCoursPython } from '@/core/python';
import { Icon } from '@/ui';

/**
 * Le manuel Python, en tête de la page Code. Un livre de 176 pages ne se
 * transforme pas en fiche : on le laisse en PDF, mais on en publie le
 * sommaire — vingt-quatre portes d'entrée plutôt qu'une seule.
 */
export function PythonCourse() {
  const url = urlCoursPython();
  if (!url) return null;
  const chapitres = chapitresPython();

  return (
    <section className="manuel">
      <div className="manuel__tete">
        <p className="eyebrow">Cours</p>
        <h2 className="manuel__titre">{COURS_PYTHON.titre}</h2>
        <p className="manuel__lead">{COURS_PYTHON.lead}</p>
        <p className="row row--wrap" style={{ gap: 'var(--s-5)', marginTop: 'var(--s-7)' }}>
          <a className="btn btn--primary" href={url} target="_blank" rel="noopener noreferrer">
            <Icon name="external" size={16} /> Ouvrir le cours
          </a>
          <span className="micro tnum">
            {COURS_PYTHON.pages} pages · {chapitres.length} chapitres · PDF
          </span>
        </p>
      </div>

      <div className="manuel__sommaire">
        {COURS_PYTHON.parties.map((partie) => (
          <div className="manuel__partie" key={partie.titre}>
            <p className="eyebrow manuel__partie-titre">{partie.titre}</p>
            {partie.chapitres.map((c) => (
              <a
                key={c.numero}
                className="manuel__chapitre"
                href={urlCoursPython(c.page)}
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
