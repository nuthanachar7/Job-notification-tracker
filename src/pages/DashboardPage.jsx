import { useState, useMemo } from 'react';
import { jobs } from '../data/jobs';
import { getSavedJobIds } from '../utils/savedJobs';
import { FilterBar } from '../components/FilterBar';
import { JobCard } from '../components/JobCard';
import { JobViewModal } from '../components/JobViewModal';

function filterAndSortJobs(jobsList, { keyword, location, mode, experience, source, sort }) {
  let result = jobsList.slice();

  const kw = keyword.trim().toLowerCase();
  if (kw) {
    result = result.filter(
      (j) =>
        j.title.toLowerCase().includes(kw) || j.company.toLowerCase().includes(kw)
    );
  }
  if (location && location !== 'All') {
    result = result.filter((j) => j.location === location);
  }
  if (mode && mode !== 'All') {
    result = result.filter((j) => j.mode === mode);
  }
  if (experience && experience !== 'All') {
    result = result.filter((j) => j.experience === experience);
  }
  if (source && source !== 'All') {
    result = result.filter((j) => j.source === source);
  }

  if (sort === 'latest') {
    result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
  } else if (sort === 'oldest') {
    result.sort((a, b) => b.postedDaysAgo - a.postedDaysAgo);
  } else if (sort === 'company') {
    result.sort((a, b) => a.company.localeCompare(b.company));
  }

  return result;
}

export function DashboardPage() {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('All');
  const [mode, setMode] = useState('All');
  const [experience, setExperience] = useState('All');
  const [source, setSource] = useState('All');
  const [sort, setSort] = useState('latest');
  const [modalJob, setModalJob] = useState(null);
  const [savedIds, setSavedIds] = useState(getSavedJobIds);

  const filters = { keyword, location, mode, experience, source, sort };
  const filteredJobs = useMemo(() => filterAndSortJobs(jobs, filters), [filters.keyword, filters.location, filters.mode, filters.experience, filters.source, filters.sort]);

  const refreshSaved = () => setSavedIds(getSavedJobIds());

  return (
    <section className="dashboard-page">
      <h1>Dashboard</h1>
      <p className="context-subtext">Matched job listings. Save ones you want to revisit.</p>

      <FilterBar
        keyword={keyword}
        onKeywordChange={setKeyword}
        location={location}
        onLocationChange={setLocation}
        mode={mode}
        onModeChange={setMode}
        experience={experience}
        onExperienceChange={setExperience}
        source={source}
        onSourceChange={setSource}
        sort={sort}
        onSortChange={setSort}
      />

      {filteredJobs.length === 0 ? (
        <p className="dashboard-page__no-results">No jobs match your search.</p>
      ) : (
        <ul className="dashboard-list" aria-label="Job listings">
          {filteredJobs.map((job) => (
            <li key={job.id}>
              <JobCard job={job} onView={setModalJob} onSaveChange={refreshSaved} savedIds={savedIds} />
            </li>
          ))}
        </ul>
      )}

      <JobViewModal job={modalJob} onClose={() => setModalJob(null)} />
    </section>
  );
}
