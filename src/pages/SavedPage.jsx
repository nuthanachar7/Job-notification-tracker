import { useState, useEffect } from 'react';
import { jobs } from '../data/jobs';
import { getSavedJobIds } from '../utils/savedJobs';
import { JobCard } from '../components/JobCard';
import { JobViewModal } from '../components/JobViewModal';

export function SavedPage() {
  const [savedIds, setSavedIds] = useState(getSavedJobIds);
  const [modalJob, setModalJob] = useState(null);

  useEffect(() => {
    const handler = () => setSavedIds(getSavedJobIds());
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const savedJobs = jobs.filter((j) => savedIds.includes(j.id));

  const refreshSaved = () => setSavedIds(getSavedJobIds());

  if (savedJobs.length === 0) {
    return (
      <section className="empty-state">
        <h1>Saved</h1>
        <p className="empty-state__message">
          Jobs you save will appear here. Save listings from the dashboard to revisit them later.
        </p>
      </section>
    );
  }

  return (
    <section className="dashboard-page">
      <h1>Saved</h1>
      <p className="context-subtext">Jobs you saved for later.</p>

      <ul className="dashboard-list" aria-label="Saved job listings">
        {savedJobs.map((job) => (
          <li key={job.id}>
            <JobCard job={job} onView={setModalJob} onSaveChange={refreshSaved} savedIds={savedIds} />
          </li>
        ))}
      </ul>

      <JobViewModal job={modalJob} onClose={() => setModalJob(null)} />
    </section>
  );
}
