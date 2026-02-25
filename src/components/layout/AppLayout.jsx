/**
 * Layout shell for all routes: shared top nav + main content area.
 */

import { Outlet } from 'react-router-dom';
import { AppNav } from './AppNav';

export function AppLayout() {
  return (
    <div className="app">
      <AppNav />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
