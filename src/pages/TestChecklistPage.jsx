import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  getTestStatus,
  setTestItem,
  clearTestStatus,
} from '../utils/testChecklist';

const CHECKLIST_ITEMS = [
  { id: '1', label: 'Preferences persist after refresh', tooltip: 'Set preferences on Settings, refresh page, confirm form is still filled.' },
  { id: '2', label: 'Match score calculates correctly', tooltip: 'Set role keywords in Settings, open Dashboard, confirm job cards show match %.' },
  { id: '3', label: '"Show only matches" toggle works', tooltip: 'Enable "Show only jobs above my threshold" on Dashboard, confirm list filters by min score.' },
  { id: '4', label: 'Save job persists after refresh', tooltip: 'Save a job on Dashboard, refresh, open Saved page and confirm it appears.' },
  { id: '5', label: 'Apply opens in new tab', tooltip: 'Click Apply on a job card, confirm apply URL opens in a new tab.' },
  { id: '6', label: 'Status update persists after refresh', tooltip: 'Change a job status to Applied/Rejected/Selected, refresh, confirm status is still set.' },
  { id: '7', label: 'Status filter works correctly', tooltip: 'Set Status filter to Applied on Dashboard, confirm only Applied jobs show.' },
  { id: '8', label: 'Digest generates top 10 by score', tooltip: 'Generate digest on Digest page, confirm 10 jobs listed by match score.' },
  { id: '9', label: 'Digest persists for the day', tooltip: 'Generate digest, refresh page, confirm same digest loads without regenerating.' },
  { id: '10', label: 'No console errors on main pages', tooltip: 'Open Dashboard, Saved, Digest, Settings; check browser console for errors.' },
];

export function TestChecklistPage() {
  const [status, setStatus] = useState(getTestStatus);

  const passed = useMemo(() => {
    return Object.values(status).filter(Boolean).length;
  }, [status]);

  const handleToggle = (id, checked) => {
    setTestItem(id, checked);
    setStatus(getTestStatus());
  };

  const handleReset = () => {
    clearTestStatus();
    setStatus(getTestStatus());
  };

  return (
    <section className="test-checklist-page">
      <h1>Test Checklist</h1>
      <p className="context-subtext">Verify all features before shipping.</p>

      <div className="test-summary">
        <p className="test-summary__count">Tests Passed: {passed} / 10</p>
        {passed < 10 && (
          <p className="test-summary__warning">Resolve all issues before shipping.</p>
        )}
      </div>

      <ul className="test-checklist" aria-label="Test checklist">
        {CHECKLIST_ITEMS.map((item) => (
          <li key={item.id} className="test-checklist__item">
            <label className="test-checklist__label">
              <input
                type="checkbox"
                checked={status[item.id] === true}
                onChange={(e) => handleToggle(item.id, e.target.checked)}
                className="test-checklist__input"
              />
              <span className="test-checklist__box" aria-hidden="true" />
              <span className="test-checklist__text">{item.label}</span>
            </label>
            {item.tooltip && (
              <span className="test-checklist__tooltip" title={item.tooltip}>
                How to test
              </span>
            )}
          </li>
        ))}
      </ul>

      <div className="test-checklist__actions">
        <button type="button" className="btn btn-secondary" onClick={handleReset}>
          Reset Test Status
        </button>
        {passed === 10 && (
          <Link to="/jt/08-ship" className="btn btn-primary">
            Proceed to Ship
          </Link>
        )}
      </div>
    </section>
  );
}
