import { Link } from 'react-router-dom';
import { getCourses } from '@/core/content';
import { PageHead, Icon, Reveal } from '@/ui';
import './courses.css';

const BLURB: Record<string, string> = {
  guide: "La méthode, l'ordre de travail et ce qu'il faut viser à chaque étape.",
  notations: 'Le code des textes mathématiques, décodé symbole par symbole.',
  s0: 'Dix exercices de diagnostic pour vérifier que les outils sont revenus.',
  s1: 'Ensembles et fonctions convexes — le socle de tout le parcours.',
  s2: 'Lagrangien, dualité et KKT — le mécanisme central, expliqué puis pratiqué.',
};

export function Courses() {
  const courses = getCourses();
  return (
    <>
      <PageHead
        eyebrow="Cours"
        title="Lire, comprendre, refaire."
        display
        lead="Cinq textes écrits pour être lus dans l'ordre. Les formules sont composées, les corrigés se déplient quand vous l'avez décidé."
      />

      <nav className="toc">
        {courses.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.06} y={14}>
            <Link to={`/cours/${c.id}`} className="toc__item">
              <span className="toc__num">{String(i + 1).padStart(2, '0')}</span>
              <span>
                <span className="toc__title">{c.title}</span>
                <span className="meta toc__desc">{BLURB[c.id] ?? ''}</span>
              </span>
              <Icon name="arrowRight" size={18} className="toc__arrow" />
            </Link>
          </Reveal>
        ))}
      </nav>
    </>
  );
}
