import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { jobs } from '../data/jobs';
import { getSavedJobIds } from '../utils/savedJobs';
import { getPreferences, hasPreferencesSet } from '../utils/preferences';
import { computeMatchScore } from '../utils/matchScore';
import { getSalarySortValue } from '../utils/salarySort';
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
    result.sort((a, b) => (a.postedDaysAgo ?? 0) - (b.postedDaysAgo ?? 0));
  } else if (sort === 'oldest') {
    result.sort((a, b) => (b.postedDaysAgo ?? 0) - (a.postedDaysAgo ?? 0));
  } else if (sort === 'company') {
    result.sort((a, b) => (a.company || '').localeCompare(b.company || ''));
  } else if (sort === 'matchScore') {
    result.sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0));
  } else if (sort === 'salary') {
    result.sort((a, b) => getSalarySortValue(b.salaryRange) - getSalarySortValue(a.salaryRange));
  }

  return result;
}

export function DashboardPage() {
  const [preferences] = useState(getPreferences);
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('All');
  const [mode, setMode] = useState('All');
  const [experience, setExperience] = useState('All');
  const [source, setSource] = useState('All');
  const [sort, setSort] = useState('latest');
  const [onlyAboveThreshold, setOnlyAboveThreshold] = useState(false);
  const [modalJob, setModalJob] = useState(null);
  const [savedIds, setSavedIds] = useState(getSavedJobIds);

  const jobsWithScore = useMemo(() => {
    return jobs.map((job) => ({
      ...job,
      matchScore: computeMatchScore(job, preferences),
    }));
  }, [preferences.roleKeywords, preferences.preferredLocations, preferences.preferredMode, preferences.experienceLevel, preferences.skills]);

  const afterThreshold = useMemo(() => {
    if (!onlyAboveThreshold) return jobsWithScore;
    const min = preferences.minMatchScore ?? 40;
    return jobsWithScore.filter((j) => (j.matchScore ?? 0) >= min);
  }, [jobsWithScore, onlyAboveThreshold, preferences.minMatchScore]);

  const filters = { keyword, location, mode, experience, source, sort };
  const filteredJobs = useMemo(
    () => filterAndSortJobs(afterThreshold, filters),
    [afterThreshold, filters.keyword, filters.location, filters.mode, filters.experience, filters.source, filters.sort]
  );

  const refreshSaved = () => setSavedIds(getSavedJobIds());
  const prefsSet = hasPreferencesSet(preferences);

  return (
    <section className="dashboard-page">
      <h1>Dashboard</h1>
      <p className="context-subtext">Matched job listings. Save ones you want to revisit.</p>

      {!prefsSet && (
        <div className="dashboard-banner" role="status">
          Set your preferences to activate intelligent matching.{' '}
          <Link to="/settings" className="dashboard-banner__link">Go to Settings</Link>
        </div>
      )}

      <div className="dashboard-toggle">
        <label className="dashboard-toggle__label">
          <input
            type="checkbox"
            checked={onlyAboveThreshold}
            onChange={(e) => setOnlyAboveThreshold(e.target.checked)}
          />
          <span>Show only jobs above my threshold</span>
        </label>
      </div>

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
        <p className="dashboard-page__no-results">
          No roles match your criteria. Adjust filters or lower threshold.
        </p>
      ) : (
        <ul className="dashboard-list" aria-label="Job listings">
          {filteredJobs.map((job) => (
            <li key={job.id}>
              <JobCard
                job={job}
                matchScore={job.matchScore}
                onView={setModalJob}
                onSaveChange={refreshSaved}
                savedIds={savedIds}
              />
            </li>
          ))}
        </ul>
      )}

      <JobViewModal job={modalJob} onClose={() => setModalJob(null)} />
    </section>
  );
}
