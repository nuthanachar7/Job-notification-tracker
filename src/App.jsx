import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout';
import {
  LandingPage,
  SettingsPage,
  DashboardPage,
  SavedPage,
  DigestPage,
  ProofPage,
  NotFoundPage,
  TestChecklistPage,
  ShipPage,
} from './pages';

/**
 * Job Notification Tracker — Premium SaaS app skeleton.
 * Routes: /, /dashboard, /saved, /digest, /settings, /proof, /jt/07-test, /jt/08-ship, 404.
 */
function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/digest" element={<DigestPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/proof" element={<ProofPage />} />
        <Route path="/jt/07-test" element={<TestChecklistPage />} />
        <Route path="/jt/08-ship" element={<ShipPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
