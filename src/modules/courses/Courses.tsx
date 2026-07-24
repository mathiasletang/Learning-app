import { Link } from 'react-router-dom';
import { getCourses } from '@/core/content';
import { PageHead } from '@/ui/PageHead';
import { CardButton, Icon } from '@/ui';

export function Courses() {
  const courses = getCourses();
  return (
    <>
      <PageHead title="Cours" subtitle="Lis les cours dans l'application, formules mathématiques rendues." />
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        {courses.map((c) => (
          <Link key={c.id} to={`/cours/${c.id}`} style={{ textDecoration: 'none' }}>
            <CardButton pad="lg" style={{ height: '100%' }} tabIndex={-1}>
              <Icon name="course" size={22} />
              <h3 style={{ marginTop: 'var(--s-3)' }}>{c.title}</h3>
              <span className="row" style={{ color: 'var(--accent)', marginTop: 'var(--s-2)', fontWeight: 600 }}>
                Ouvrir <Icon name="chevronRight" size={16} />
              </span>
            </CardButton>
          </Link>
        ))}
      </div>
    </>
  );
}
