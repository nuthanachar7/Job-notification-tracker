import { jobs } from '../data/jobs';

/**
 * Dashboard — Step 3: Realistic dataset displayed in premium cards.
 */
export function DashboardPage() {
  if (!jobs.length) {
    return (
      <section className="empty-state">
        <h1>Dashboard</h1>
        <p className="empty-state__message">
          No jobs yet. In the next step, you will load a realistic dataset.
        </p>
      </section>
    );
  }

  return (
    <section className="dashboard-page">
      <h1>Dashboard</h1>
      <p className="context-subtext">Matched job listings. Save ones you want to revisit.</p>

      <ul className="dashboard-list" aria-label="Job listings">
        {jobs.map((job) => (
          <li key={job.id} className="job-card card">
            <h3 className="job-card__title">{job.title}</h3>
            <p className="job-card__company">{job.company}</p>
            <p className="job-card__meta text-small text-muted">
              {job.location} · {job.mode} · {job.experience}
            </p>
            <p className="job-card__snippet text-small">{job.snippet}</p>
            <p className="job-card__posted text-small text-muted">Posted {job.posted}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
