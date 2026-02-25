/**
 * Settings — Placeholder preference fields only. No state, no save logic.
 */
export function SettingsPage() {
  return (
    <section className="page-placeholder settings-page">
      <h1>Settings</h1>
      <p className="context-subtext">Configure your job preferences.</p>

      <div className="settings-fields">
        <div className="settings-field">
          <label className="settings-field__label" htmlFor="role-keywords">
            Role keywords
          </label>
          <input
            id="role-keywords"
            type="text"
            className="input"
            placeholder="e.g. Frontend, React, Full Stack"
            readOnly
            aria-readonly
          />
        </div>

        <div className="settings-field">
          <label className="settings-field__label" htmlFor="locations">
            Preferred locations
          </label>
          <input
            id="locations"
            type="text"
            className="input"
            placeholder="e.g. Bangalore, Remote"
            readOnly
            aria-readonly
          />
        </div>

        <div className="settings-field">
          <label className="settings-field__label" htmlFor="mode">
            Mode
          </label>
          <select id="mode" className="input" disabled aria-disabled>
            <option value="">Remote / Hybrid / Onsite</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="onsite">Onsite</option>
          </select>
        </div>

        <div className="settings-field">
          <label className="settings-field__label" htmlFor="experience">
            Experience level
          </label>
          <select id="experience" className="input" disabled aria-disabled>
            <option value="">Select experience level</option>
            <option value="entry">Entry</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
          </select>
        </div>
      </div>
    </section>
  );
}
