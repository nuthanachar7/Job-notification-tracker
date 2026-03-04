import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { allTestsPassed } from '../utils/testChecklist';

export function ShipPage() {
  const unlocked = useMemo(() => allTestsPassed(), []);

  if (!unlocked) {
    return (
      <section className="test-checklist-page ship-page">
        <h1>Ship</h1>
        <div className="ship-lock card">
          <p className="ship-lock__message">Complete all tests before shipping.</p>
          <Link to="/jt/07-test" className="btn btn-primary">
            Open Test Checklist
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="test-checklist-page ship-page">
      <h1>Ship</h1>
      <p className="context-subtext">All tests passed. Ready to ship.</p>
      <div className="ship-unlocked card">
        <p className="ship-unlocked__message">All 10 tests are complete. You may proceed with deployment.</p>
      </div>
    </section>
  );
}
