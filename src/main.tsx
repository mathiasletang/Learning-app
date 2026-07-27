import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Police auto-hébergée, embarquée (hors-ligne) : DM Sans pour l'intégralité
// des caractères, chiffres compris. Romain et italique.
import '@fontsource-variable/dm-sans';
import '@fontsource-variable/dm-sans/wght-italic.css';
import 'katex/dist/katex.min.css';

// Système de design, du plus général au plus précis.
import './styles/tokens.css';
import './styles/global.css';
import './ui/ui.css';
import './styles/prose.css';
import './app/layout.css';

import { App } from './app/App';
import { requestPersistence } from './core/db';
import { runMigrationIfNeeded } from './app/migrate';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Stockage durable (parade à la purge de Safari iOS).
void requestPersistence();

// Reprise éventuelle de l'ancienne version.
void runMigrationIfNeeded();
