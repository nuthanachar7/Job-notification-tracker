import { useState, useEffect } from 'react';
import { getPreferences, savePreferences } from '../utils/preferences';

const LOCATION_OPTIONS = ['Bangalore', 'Chennai', 'Coimbatore', 'Gurgaon', 'Hyderabad', 'Mumbai', 'Nagpur', 'Noida', 'Pune'];
const MODE_OPTIONS = ['Remote', 'Hybrid', 'Onsite'];
const EXPERIENCE_OPTIONS = ['', 'Fresher', '0-1', '1-3', '3-5'];

export function SettingsPage() {
  const [roleKeywords, setRoleKeywords] = useState('');
  const [preferredLocations, setPreferredLocations] = useState([]);
  const [preferredMode, setPreferredMode] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState('');
  const [skills, setSkills] = useState('');
  const [minMatchScore, setMinMatchScore] = useState(40);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const prefs = getPreferences();
    setRoleKeywords(prefs.roleKeywords);
    setPreferredLocations(prefs.preferredLocations);
    setPreferredMode(prefs.preferredMode);
    setExperienceLevel(prefs.experienceLevel);
    setSkills(prefs.skills);
    setMinMatchScore(prefs.minMatchScore);
  }, []);

  const handleLocationChange = (e) => {
    const opts = e.target.options;
    const selected = [];
    for (let i = 0; i < opts.length; i++) {
      if (opts[i].selected) selected.push(opts[i].value);
    }
    setPreferredLocations(selected);
  };

  const handleModeToggle = (mode) => {
    setPreferredMode((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    savePreferences({
      roleKeywords,
      preferredLocations,
      preferredMode,
      experienceLevel,
      skills,
      minMatchScore,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <section className="page-placeholder settings-page">
      <h1>Settings</h1>
      <p className="context-subtext">Configure your job preferences. Saved automatically to this device.</p>

      <form className="settings-fields" onSubmit={handleSubmit}>
        <div className="settings-field">
          <label className="settings-field__label" htmlFor="role-keywords">
            Role keywords (comma-separated)
          </label>
          <input
            id="role-keywords"
            type="text"
            className="input"
            placeholder="e.g. React, Frontend, SDE Intern"
            value={roleKeywords}
            onChange={(e) => setRoleKeywords(e.target.value)}
          />
        </div>

        <div className="settings-field">
          <label className="settings-field__label" htmlFor="locations">
            Preferred locations (multi-select)
          </label>
          <select
            id="locations"
            className="input"
            multiple
            value={preferredLocations}
            onChange={handleLocationChange}
            aria-label="Preferred locations"
          >
            {LOCATION_OPTIONS.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <span className="text-small text-muted">Hold Ctrl/Cmd to select multiple.</span>
        </div>

        <div className="settings-field">
          <span className="settings-field__label">Preferred mode</span>
          <div className="settings-checkboxes">
            {MODE_OPTIONS.map((m) => (
              <label key={m} className="settings-checkbox">
                <input
                  type="checkbox"
                  checked={preferredMode.includes(m)}
                  onChange={() => handleModeToggle(m)}
                />
                <span>{m}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="settings-field">
          <label className="settings-field__label" htmlFor="experience">
            Experience level
          </label>
          <select
            id="experience"
            className="input"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
          >
            {EXPERIENCE_OPTIONS.map((opt) => (
              <option key={opt || 'any'} value={opt}>
                {opt || 'Any'}
              </option>
            ))}
          </select>
        </div>

        <div className="settings-field">
          <label className="settings-field__label" htmlFor="skills">
            Skills (comma-separated)
          </label>
          <input
            id="skills"
            type="text"
            className="input"
            placeholder="e.g. Java, React, Python"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        <div className="settings-field">
          <label className="settings-field__label" htmlFor="min-score">
            Minimum match score: {minMatchScore}
          </label>
          <input
            id="min-score"
            type="range"
            min="0"
            max="100"
            value={minMatchScore}
            onChange={(e) => setMinMatchScore(Number(e.target.value))}
            className="settings-slider"
          />
        </div>

        <div className="settings-field">
          <button type="submit" className="btn btn-primary">
            Save preferences
          </button>
          {saved && <span className="settings-saved text-small text-muted">Saved.</span>}
        </div>
      </form>
    </section>
  );
}
