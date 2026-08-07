import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/core/db';
import { toDayStr } from '@/core/date';
import { NAV } from './nav';
import { useApp, useLevel } from './store';
import { Icon, Button, Gauge } from '@/ui';
import { ThemeToggle } from './ThemeToggle';
import { ToastHost } from './ToastHost';
import { ConfettiHost } from './ConfettiHost';

function useDueCount() {
  const today = toDayStr();
  const cards = useLiveQuery(() => db.flashcards.where('due').belowOrEqual(today).count(), [today], 0);
  const vocab = useLiveQuery(() => db.vocabSrs.where('due').belowOrEqual(today).count(), [today], 0);
  return { cards: cards ?? 0, vocab: vocab ?? 0 };
}

function Wordmark() {
  return (
    <NavLink to="/" className="wordmark" aria-label="Cours avancés — accueil">
      Cours
      <span>avancés</span>
    </NavLink>
  );
}

function LevelFoot() {
  const level = useLevel();
  const xp = useApp((s) => s.gam.xp);
  return (
    <div className="rail__foot">
      <div className="rail__level">
        <div className="rail__level-line">
          <span className="micro">Niveau {level.level}</span>
          <span className="micro tnum">{xp} XP</span>
        </div>
        <Gauge value={level.progress} label={`Progression vers le niveau ${level.level + 1}`} />
      </div>
      <ThemeToggle />
    </div>
  );
}

export function Layout() {
  const [sheet, setSheet] = useState(false);
  const loc = useLocation();
  const due = useDueCount();

  useEffect(() => setSheet(false), [loc.pathname]);
  useEffect(() => {
    document.body.style.overflow = sheet ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sheet]);

  const badgeFor = (to: string) =>
    to === '/flashcards' ? due.cards : to === '/anglais' ? due.vocab : 0;

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Aller au contenu
      </a>

      <aside className="rail" aria-label="Navigation principale">
        <Wordmark />
        <nav className="rail__nav">
          {NAV.map((group) => (
            <div className="navgroup" key={group.label}>
              <p className="eyebrow navgroup__label">{group.label}</p>
              {group.items.map((item) => {
                const n = badgeFor(item.to);
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) => `navlink ${isActive ? 'is-active' : ''}`}
                  >
                    <Icon name={item.icon} size={16} />
                    {item.label}
                    {n > 0 && <span className="navlink__count tnum">{n}</span>}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>
        <LevelFoot />
      </aside>

      <div className="main">
        <header className="topbar">
          <Button variant="ghost" icon="menu" aria-label="Ouvrir le sommaire" onClick={() => setSheet(true)} />
          <span className="spacer" />
          <NavLink to="/" className="wordmark" style={{ fontSize: '1.0625rem' }}>
            Cours avancés
          </NavLink>
          <span className="spacer" />
          <ThemeToggle />
        </header>

        <main className="content" id="main" tabIndex={-1}>
          <AnimatePresence mode="wait">
            <motion.div
              key={loc.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>
        {sheet && (
          <motion.div
            className="sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <Button
              variant="ghost"
              icon="x"
              aria-label="Fermer le sommaire"
              className="sheet__close"
              onClick={() => setSheet(false)}
            />
            {NAV.map((group, gi) => (
              <div className="sheet__group" key={group.label}>
                <p className="eyebrow sheet__label">{group.label}</p>
                {group.items.map((item, ii) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.05 + gi * 0.05 + ii * 0.035,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) => `sheet__link ${isActive ? 'is-active' : ''}`}
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <ToastHost />
      <ConfettiHost />
    </div>
  );
}
