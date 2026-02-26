import { useEffect } from 'react';

/**
 * Modal: full description + skills. Design system. No flashy animation.
 */
export function JobViewModal({ job, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!job) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 id="modal-title" className="modal__title">{job.title}</h2>
          <p className="modal__company">{job.company}</p>
          <button type="button" className="modal__close" aria-label="Close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal__body">
          <p className="modal__description">{job.description}</p>
          <div className="modal__skills">
            <span className="modal__skills-label">Skills:</span>
            <span className="modal__skills-list">{job.skills?.join(', ') || '—'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
