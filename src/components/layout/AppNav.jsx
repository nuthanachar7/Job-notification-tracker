/**
 * Shared top navigation: Dashboard | Saved | Digest | Settings | Proof.
 * Active link = deep red underline. Mobile = hamburger + dropdown.
 */

import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/saved', label: 'Saved' },
  { to: '/digest', label: 'Digest' },
  { to: '/settings', label: 'Settings' },
  { to: '/proof', label: 'Proof' },
];

function NavLinks({ onNavigate }) {
  return (
    <>
      {NAV_LINKS.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          end={false}
          className={({ isActive }) =>
            `topbar__nav-link ${isActive ? 'topbar__nav-link--active' : ''}`
          }
          onClick={onNavigate}
        >
          {label}
        </NavLink>
      ))}
    </>
  );
}

export function AppNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="topbar">
      <NavLink to="/" className="topbar__brand" onClick={closeMenu}>
        Job Notification Tracker
      </NavLink>

      <nav className="topbar__nav" aria-label="Main">
        <NavLinks />
      </nav>

      <button
        type="button"
        className="topbar__hamburger"
        aria-label="Open menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span className="topbar__hamburger-line" />
        <span className="topbar__hamburger-line" />
        <span className="topbar__hamburger-line" />
      </button>

      {menuOpen && (
        <div className="topbar__dropdown" role="dialog" aria-label="Navigation menu">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `topbar__dropdown-link ${isActive ? 'topbar__nav-link--active' : ''}`
            }
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLinks onNavigate={closeMenu} />
        </div>
      )}
    </header>
  );
}
