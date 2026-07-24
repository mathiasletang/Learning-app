import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCourse } from '@/core/content';
import { renderMarkdown, collapseCorriges } from '@/core/markdown';
import { PageHead } from '@/ui/PageHead';
import { Icon } from '@/ui';

export function CourseView() {
  const { id } = useParams<{ id: string }>();
  const course = id ? getCourse(id) : undefined;

  const html = useMemo(() => {
    if (!course) return '';
    return collapseCorriges(renderMarkdown(course.markdown));
  }, [course]);

  if (!course) {
    return (
      <>
        <PageHead title="Cours introuvable" />
        <Link className="btn btn--secondary" to="/cours">
          Retour aux cours
        </Link>
      </>
    );
  }

  return (
    <>
      <Link
        className="row"
        to="/cours"
        style={{ color: 'var(--text-secondary)', fontWeight: 600, marginBottom: 'var(--s-4)' }}
      >
        <Icon name="arrowLeft" size={18} /> Tous les cours
      </Link>
      <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
