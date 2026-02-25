/**
 * Top Bar: App name (left), Progress Step X / Y (center), Status badge (right).
 */

const STATUS_OPTIONS = ['Not Started', 'In Progress', 'Shipped'];

export function TopBar({ currentStep = 1, totalSteps = 4, status = 'In Progress' }) {
  const statusLabel = STATUS_OPTIONS.includes(status) ? status : 'In Progress';
  const statusClass = status === 'Shipped' ? 'badge badge-success' : 'badge badge-neutral';

  return (
    <header className="topbar">
      <a href="/" className="topbar__brand">
        Job Notification App
      </a>
      <span className="topbar__progress">
        Step {currentStep} / {totalSteps}
      </span>
      <span className="topbar__status">
        <span className={statusClass}>{statusLabel}</span>
      </span>
    </header>
  );
}
