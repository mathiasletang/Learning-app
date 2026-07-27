import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Polices auto-hébergées + rendu mathématique, embarqués (hors-ligne).
// Titres : Instrument Serif (éditorial). Texte : Manrope (humaniste, doux).
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource-variable/manrope';
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
