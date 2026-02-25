/**
 * Proof Footer: Checklist — UI Built, Logic Working, Test Passed, Deployed.
 */

const ITEMS = [
  { id: 'ui', label: 'UI Built' },
  { id: 'logic', label: 'Logic Working' },
  { id: 'test', label: 'Test Passed' },
  { id: 'deployed', label: 'Deployed' },
];

export function ProofFooter({ completedIds = [] }) {
  return (
    <footer className="proof-footer">
      <ul className="proof-footer__list">
        {ITEMS.map(({ id, label }) => (
          <li
            key={id}
            className={`proof-footer__item ${completedIds.includes(id) ? 'proof-footer__item--done' : ''}`}
          >
            {label}
          </li>
        ))}
      </ul>
    </footer>
  );
}
