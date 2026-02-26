import { getSavedJobIds, saveJobId, removeSavedJobId, isJobSaved } from '../utils/savedJobs';

function postedLabel(daysAgo) {
  if (daysAgo === 0) return 'Today';
  if (daysAgo === 1) return '1 day ago';
  return `${daysAgo} days ago`;
}

export function JobCard({ job, onView, onSaveChange, savedIds }) {
  const saved = savedIds.includes(job.id);

  const handleSave = () => {
    if (saved) {
      removeSavedJobId(job.id);
    } else {
      saveJobId(job.id);
    }
    onSaveChange?.();
  };

  const handleApply = () => {
    if (job.applyUrl) window.open(job.applyUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <article className="job-card card">
      <h3 className="job-card__title">{job.title}</h3>
      <p className="job-card__company">{job.company}</p>
      <p className="job-card__meta text-small text-muted">
        {job.location} · {job.mode} · {job.experience}
      </p>
      <p className="job-card__salary text-small">{job.salaryRange}</p>
      <div className="job-card__badges">
        <span className="badge badge-neutral">{job.source}</span>
        <span className="job-card__posted text-small text-muted">{postedLabel(job.postedDaysAgo)}</span>
      </div>
      <div className="job-card__actions">
        <button type="button" className="btn btn-secondary" onClick={() => onView(job)}>
          View
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleSave}>
          {saved ? 'Saved' : 'Save'}
        </button>
        <button type="button" className="btn btn-primary" onClick={handleApply}>
          Apply
        </button>
      </div>
    </article>
  );
}
