/**
 * Filter bar: keyword, location, mode, experience, source, sort.
 * Controlled: parent passes value + onChange for each.
 */
const LOCATIONS = ['All', 'Bangalore', 'Chennai', 'Gurgaon', 'Hyderabad', 'Mumbai', 'Noida', 'Pune', 'Coimbatore', 'Nagpur'];
const MODES = ['All', 'Remote', 'Hybrid', 'Onsite'];
const EXPERIENCES = ['All', 'Fresher', '0-1', '1-3', '3-5'];
const SOURCES = ['All', 'LinkedIn', 'Naukri', 'Indeed'];
const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'company', label: 'Company A–Z' },
];

export function FilterBar({
  keyword,
  onKeywordChange,
  location,
  onLocationChange,
  mode,
  onModeChange,
  experience,
  onExperienceChange,
  source,
  onSourceChange,
  sort,
  onSortChange,
}) {
  return (
    <div className="filter-bar" role="search">
      <input
        type="search"
        className="input filter-bar__keyword"
        placeholder="Search title or company"
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
        aria-label="Keyword search"
      />
      <select className="input filter-bar__select" value={location} onChange={(e) => onLocationChange(e.target.value)} aria-label="Location">
        {LOCATIONS.map((loc) => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
      </select>
      <select className="input filter-bar__select" value={mode} onChange={(e) => onModeChange(e.target.value)} aria-label="Mode">
        {MODES.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      <select className="input filter-bar__select" value={experience} onChange={(e) => onExperienceChange(e.target.value)} aria-label="Experience">
        {EXPERIENCES.map((exp) => (
          <option key={exp} value={exp}>{exp}</option>
        ))}
      </select>
      <select className="input filter-bar__select" value={source} onChange={(e) => onSourceChange(e.target.value)} aria-label="Source">
        {SOURCES.map((src) => (
          <option key={src} value={src}>{src}</option>
        ))}
      </select>
      <select className="input filter-bar__select" value={sort} onChange={(e) => onSortChange(e.target.value)} aria-label="Sort">
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
