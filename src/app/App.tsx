import { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './store';
import { Layout } from './Layout';
import { Dashboard } from '@/modules/dashboard/Dashboard';
import { Tracks } from '@/modules/tracks/Tracks';
import { Courses } from '@/modules/courses/Courses';
import { CourseView } from '@/modules/courses/CourseView';
import { QcmHome } from '@/modules/quiz/QcmHome';
import { QcmBank } from '@/modules/quiz/QcmBank';
import { Flashcards } from '@/modules/flashcards/Flashcards';
import { Vocab } from '@/modules/vocab/Vocab';
import { Library } from '@/modules/library/Library';
import { Notes } from '@/modules/notes/Notes';
import { Stats } from '@/modules/stats/Stats';
import { Time } from '@/modules/planner/Time';
import { Planner } from '@/modules/planner/Planner';

function Splash() {
  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100dvh' }}>
      <div className="row" style={{ gap: 'var(--s-3)', color: 'var(--text-secondary)' }}>
        <span className="brand__dot" aria-hidden />
        Chargement…
      </div>
    </div>
  );
}

export function App() {
  const loaded = useApp((s) => s.loaded);

  useEffect(() => {
    void useApp.getState().init();
  }, []);

  if (!loaded) return <Splash />;

  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="parcours" element={<Tracks />} />
          <Route path="cours" element={<Courses />} />
          <Route path="cours/:id" element={<CourseView />} />
          <Route path="qcm" element={<QcmHome />} />
          <Route path="qcm/:bank" element={<QcmBank />} />
          <Route path="flashcards" element={<Flashcards />} />
          <Route path="vocabulaire" element={<Vocab />} />
          <Route path="bibliotheque" element={<Library />} />
          <Route path="notes" element={<Notes />} />
          <Route path="stats" element={<Stats />} />
          <Route path="temps" element={<Time />} />
          <Route path="planning" element={<Planner />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
