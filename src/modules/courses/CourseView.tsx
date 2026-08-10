import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { getCourse, getCourses } from '@/core/content';
import { renderMarkdown, collapseCorriges } from '@/core/markdown';
import { PageHead, Icon } from '@/ui';
import './courses.css';

export function CourseView() {
  const { id } = useParams<{ id: string }>();
  const course = id ? getCourse(id) : undefined;
  const courses = getCourses();
  const index = courses.findIndex((c) => c.id === id);
  const next = index >= 0 ? courses[index + 1] : undefined;

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const html = useMemo(
    () => (course ? collapseCorriges(renderMarkdown(course.markdown)) : ''),
    [course],
  );

  if (!course) {
    return (
      <>
        <PageHead title="Cours introuvable" />
        <Link className="btn btn--secondary" to="/maths?s=documents">
          Retour aux cours
        </Link>
      </>
    );
  }

  return (
    <>
      <div className="readbar" aria-hidden>
        <motion.div className="readbar__fill" style={{ scaleX: progress }} />
      </div>

      <Link className="reader__back" to="/maths?s=documents">
        <Icon name="arrowLeft" size={16} /> Cours
      </Link>

      <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />

      <footer className="reader__foot">
        <Link className="arrow-link" to="/maths?s=documents">
          <Icon name="arrowLeft" size={16} /> Tous les cours
        </Link>
        {next && (
          <Link className="arrow-link" to={`/cours/${next.id}`}>
            Suivant — {next.title} <Icon name="arrowRight" size={16} />
          </Link>
        )}
      </footer>
    </>
  );
}
