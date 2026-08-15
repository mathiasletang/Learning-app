import { Suspense, lazy, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from './store';
import { Layout } from './Layout';
import { Dashboard } from '@/modules/dashboard/Dashboard';
import { Subject } from '@/modules/subject/Subject';
import { CourseView } from '@/modules/courses/CourseView';
import { FicheView } from '@/modules/fiches/FicheView';
import { QcmBank } from '@/modules/quiz/QcmBank';
import { Suivi } from '@/modules/suivi/Suivi';

/* Le lexique pèse un méga-octet : les pages qui s'en servent sont chargées à
   la demande. Le service worker les met en cache — rien ne change hors-ligne. */
const English = lazy(() => import('@/modules/english/English').then((m) => ({ default: m.English })));
const GlobalReview = lazy(() =>
  import('@/modules/review/GlobalReview').then((m) => ({ default: m.GlobalReview })),
);

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

function Loading() {
  return <p className="meta">Chargement…</p>;
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
          <Route
            path="reviser"
            element={
              <Suspense fallback={<Loading />}>
                <GlobalReview />
              </Suspense>
            }
          />
          <Route
            path="anglais"
            element={
              <Suspense fallback={<Loading />}>
                <English />
              </Suspense>
            }
          />
          <Route path="maths" element={<Subject id="maths" />} />
          <Route path="cfa" element={<Subject id="cfa" />} />
          <Route path="suivi" element={<Suivi />} />
          {/* Pages « séance » : lancées depuis les matières. */}
          <Route path="cours/:id" element={<CourseView />} />
          <Route path="fiche/:id" element={<FicheView />} />
          <Route path="qcm/:bank" element={<QcmBank />} />
          {/* Anciens chemins — liens et raccourcis déjà posés restent valides. */}
          <Route path="vocabulaire" element={<Navigate to="/anglais" replace />} />
          <Route path="parcours" element={<Navigate to="/maths" replace />} />
          <Route path="cours" element={<Navigate to="/maths?s=documents" replace />} />
          <Route path="bibliotheque" element={<Navigate to="/maths?s=documents" replace />} />
          <Route path="qcm" element={<Navigate to="/maths?s=exercer" replace />} />
          <Route path="flashcards" element={<Navigate to="/reviser" replace />} />
          <Route path="notes" element={<Navigate to="/maths?s=notes" replace />} />
          <Route path="stats" element={<Navigate to="/suivi" replace />} />
          <Route path="temps" element={<Navigate to="/suivi" replace />} />
          <Route path="planning" element={<Navigate to="/suivi" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
