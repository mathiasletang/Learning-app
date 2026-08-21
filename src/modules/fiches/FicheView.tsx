import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { getFiche, fichesOfSubject, ficheMarkdown, DIFFICULTY_LABEL } from '@/core/fiches';
import { SUBJECT_DEFS } from '@/core/subjects';
import { renderMarkdown, decorateFiche } from '@/core/markdown';
import { PageHead, Icon, Tag } from '@/ui';
import '@/modules/courses/courses.css';

/** Lecteur de fiche de révision — Markdown + KaTeX, même confort que les cours. */
export function FicheView() {
  const { id } = useParams<{ id: string }>();
  const fiche = id ? getFiche(id) : undefined;

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  /* Le contenu arrive dans son propre morceau : on l'attend, sans rien
     démonter — la fiche d'identité et le fil de lecture sont déjà là. */
  const [markdown, setMarkdown] = useState('');
  useEffect(() => {
    if (!fiche) return;
    let vivant = true;
    setMarkdown('');
    ficheMarkdown(fiche.file).then((md) => {
      if (vivant) setMarkdown(md);
    });
    return () => {
      vivant = false;
    };
  }, [fiche]);

  const html = useMemo(
    () => (markdown ? decorateFiche(renderMarkdown(markdown)) : ''),
    [markdown],
  );

  if (!fiche) {
    return (
      <>
        <PageHead title="Fiche introuvable" />
        <Link className="btn btn--secondary" to="/maths?s=documents">
          Retour aux documents
        </Link>
      </>
    );
  }

  const subject = SUBJECT_DEFS[fiche.subject];
  const back = `${subject.path}?s=documents`;
  const siblings = fichesOfSubject(fiche.subject);
  const index = siblings.findIndex((f) => f.id === fiche.id);
  const next = index >= 0 ? siblings[index + 1] : undefined;

  return (
    <>
      <div className="readbar" aria-hidden>
        <motion.div className="readbar__fill" style={{ scaleX: progress }} />
      </div>

      <Link className="reader__back" to={back}>
        <Icon name="arrowLeft" size={16} /> Fiches · {subject.label}
      </Link>

      <p className="row row--wrap" style={{ gap: 'var(--s-3)', marginBottom: 'var(--s-8)' }}>
        <Tag colorVar={subject.colorVar}>{fiche.chapter}</Tag>
        <span className="micro">{DIFFICULTY_LABEL[fiche.difficulty]}</span>
        <span className="micro tnum">≈ {fiche.minutes} min</span>
        <span className="micro">{fiche.course}</span>
      </p>

      {html ? (
        <article className="prose prose--fiche" dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <p className="micro" role="status">
          Chargement de la fiche…
        </p>
      )}

      <footer className="reader__foot">
        <Link className="arrow-link" to={back}>
          <Icon name="arrowLeft" size={16} /> Toutes les fiches
        </Link>
        {next && (
          <Link className="arrow-link" to={`/fiche/${next.id}`}>
            Suivante — {next.title} <Icon name="arrowRight" size={16} />
          </Link>
        )}
      </footer>
    </>
  );
}
