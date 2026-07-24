import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { NAV } from './nav';
import { useApp, useLevel } from './store';
import { Icon, Button } from '@/ui';
import { ThemeToggle } from './ThemeToggle';
import { ToastHost } from './ToastHost';
import { ConfettiHost } from './ConfettiHost';

function ProfileMini() {
  const level = useLevel();
  const gam = useApp((s) => s.gam);
  return (
    <div className="profile">
      <div className="profile__row">
        <div className="profile__lvl" aria-hidden>
          {level.level}
        </div>
        <div className="stack" style={{ minWidth: 0 }}>
          <strong style={{ fontSize: 'var(--fs-meta-lg)' }}>Niveau {level.level}</strong>
          <span className="profile__xp tnum">{gam.xp} XP</span>
        </div>
        <span
          className="profile__streak"
          title={`Série de ${gam.streak} jour${gam.streak > 1 ? 's' : ''}`}
        >
          <Icon name="flame" size={16} />
          {gam.streak}
        </span>
      </div>
    </div>
  );
}

export function Layout() {
  const collapsed = useApp((s) => s.prefs.sidebarCollapsed);
  const setCollapsed = useApp((s) => s.setSidebarCollapsed);
  const [drawer, setDrawer] = useState(false);
  const loc = useLocation();

  // Ferme le tiroir à chaque changement de page (mobile/iPad).
  useEffect(() => {
    setDrawer(false);
  }, [loc.pathname]);

  return (
    <div
      className={`app ${collapsed ? 'app--collapsed' : ''}`}
      data-drawer={drawer ? 'open' : 'closed'}
    >
      <a className="skip-link" href="#main">
        Aller au contenu
      </a>

      <div className="drawer-scrim" onClick={() => setDrawer(false)} aria-hidden />

      <aside className="sidebar" aria-label="Navigation principale">
        <div className="brand">
          <span className="brand__dot" aria-hidden />
          Atelier
        </div>
        <ProfileMini />
        <nav className="nav">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
            >
              <Icon name={item.icon} size={19} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar__footer">
          <ThemeToggle />
          <Button
            variant="ghost"
            icon="menu"
            aria-label={collapsed ? 'Afficher la barre latérale' : 'Replier la barre latérale'}
            title="Replier"
            onClick={() => setCollapsed(!collapsed)}
            className="hide-mobile"
          />
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <Button
            variant="ghost"
            icon="menu"
            aria-label="Ouvrir le menu"
            onClick={() => setDrawer(true)}
          />
          <div className="brand" style={{ padding: 0, fontSize: 'var(--fs-h3)' }}>
            <span className="brand__dot" aria-hidden />
            Atelier
          </div>
          <span className="spacer" />
          <ThemeToggle />
        </header>

        <main className="content" id="main" tabIndex={-1}>
          <Outlet />
        </main>
      </div>

      <ToastHost />
      <ConfettiHost />
    </div>
  );
}
