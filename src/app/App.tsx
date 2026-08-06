import { Suspense, lazy, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from './store';
import { Layout } from './Layout';
import { Dashboard } from '@/modules/dashboard/Dashboard';
import { Tracks } from '@/modules/tracks/Tracks';
import { Courses } from '@/modules/courses/Courses';
import { CourseView } from '@/modules/courses/CourseView';
import { QcmHome } from '@/modules/quiz/QcmHome';
import { QcmBank } from '@/modules/quiz/QcmBank';
import { Flashcards } from '@/modules/flashcards/Flashcards';
/* Le lexique pèse un méga-octet : on ne le charge qu'en entrant dans la page.
   Le service worker le met en cache, donc il reste disponible hors-ligne. */
const English = lazy(() =>
  import('@/modules/english/English').then((m) => ({ default: m.English })),
);
import { Library } from '@/modules/library/Library';
import { Notes } from '@/modules/notes/Notes';
import { Stats } from '@/modules/stats/Stats';
import { Time } from '@/modules/planner/Time';
import { Planner } from '@/modules/planner/Planner';

/** Ouverture : la marque seule, le temps du chargement. */
function Splash() {
  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100dvh' }}>
      <motion.p
        className="wordmark"
        style={{ textAlign: 'center', fontSize: '1.75rem' }}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        Cours
        <span>avancés</span>
      </motion.p>
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
          <Route
            path="anglais"
            element={
              <Suspense fallback={<p className="meta">Chargement du lexique…</p>}>
                <English />
              </Suspense>
            }
          />
          {/* Ancien chemin — les liens et raccourcis déjà posés restent valides. */}
          <Route path="vocabulaire" element={<Navigate to="/anglais" replace />} />
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
