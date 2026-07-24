import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Police auto-hébergée + rendu maths (embarqués, hors-ligne).
import '@fontsource-variable/inter';
import 'katex/dist/katex.min.css';

// Design system + styles globaux.
import './styles/tokens.css';
import './styles/global.css';
import './ui/ui.css';
import './styles/prose.css';
import './app/layout.css';
import './modules/quiz/quiz.css';

import { App } from './app/App';
import { requestPersistence } from './core/db';
import { runMigrationIfNeeded } from './app/migrate';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Filet iOS/iPadOS : demande un stockage persistant (§7.3).
void requestPersistence();

// Migration éventuelle depuis l'ancien prototype (clé localStorage atelier_v4).
void runMigrationIfNeeded();
