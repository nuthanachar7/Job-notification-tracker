import { useState, useMemo } from 'react';
import { jobs } from '../data/jobs';
import { getPreferences, hasPreferencesSet } from '../utils/preferences';
import { getStatusHistory } from '../utils/jobStatus';
import {
  getDigestForDate,
  saveDigest,
  generateDigest,
  formatDigestAsPlainText,
} from '../utils/digest';

const TODAY = new Date();

function formatDigestDate(date) {
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatStatusDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', { dateStyle: 'medium' });
  } catch {
    return '';
  }
}

const jobMap = Object.fromEntries(jobs.map((j) => [j.id, j]));

export function DigestPage() {
  const preferences = useMemo(() => getPreferences(), []);
  const prefsSet = hasPreferencesSet(preferences);

  const [digest, setDigest] = useState(() => getDigestForDate(TODAY));
  const [noMatches, setNoMatches] = useState(false);
  const statusHistory = useMemo(() => getStatusHistory().slice(0, 20), []);

  const handleGenerate = () => {
    const existing = getDigestForDate(TODAY);
    if (existing && existing.length > 0) {
      setDigest(existing);
      setNoMatches(false);
      return;
    }
    const top10 = generateDigest(jobs, preferences);
    if (top10.length === 0) {
      setDigest(null);
      setNoMatches(true);
      return;
    }
    saveDigest(TODAY, top10);
    setDigest(top10);
    setNoMatches(false);
  };

  const handleCopy = () => {
    if (!digest || digest.length === 0) return;
    const text = formatDigestAsPlainText(digest, TODAY);
    navigator.clipboard.writeText(text).catch(() => {});
  };

  const handleEmailDraft = () => {
    if (!digest || digest.length === 0) return;
    const body = formatDigestAsPlainText(digest, TODAY);
    const subject = encodeURIComponent('My 9AM Job Digest');
    const bodyEnc = encodeURIComponent(body);
    window.open(`mailto:?subject=${subject}&body=${bodyEnc}`, '_blank');
  };

  if (!prefsSet) {
    return (
      <section className="digest-page">
        <h1>Digest</h1>
        <div className="digest-block digest-block--message">
          <p className="digest-block__text">Set preferences to generate a personalized digest.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="digest-page">
      <h1>Digest</h1>
      <p className="context-subtext">Your daily 9AM job summary. Generate or view today&apos;s digest below.</p>

      <p className="digest-demo-note">Demo Mode: Daily 9AM trigger simulated manually.</p>

      <button type="button" className="btn btn-primary digest-generate" onClick={handleGenerate}>
        Generate Today&apos;s 9AM Digest (Simulated)
      </button>

      {statusHistory.length > 0 && (
        <div className="digest-card digest-status-updates">
          <h2 className="digest-card__title">Recent Status Updates</h2>
          <ul className="digest-card__list">
            {statusHistory.map((entry, i) => {
              const job = jobMap[entry.jobId];
              return (
                <li key={`${entry.jobId}-${entry.changedAt}-${i}`} className="digest-card__item digest-card__item--status">
                  <div className="digest-card__item-main">
                    <p className="digest-card__item-title digest-card__item-title--small">{job ? job.title : 'Unknown job'}</p>
                    <p className="digest-card__item-company">{job ? job.company : ''}</p>
                    <p className="digest-card__item-meta text-small text-muted">
                      <span className={`badge-status badge-status--${entry.status === 'Not Applied' ? 'neutral' : entry.status.toLowerCase()}`}>{entry.status}</span>
                      {' · '}
                      {formatStatusDate(entry.changedAt)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {noMatches && (
        <div className="digest-block digest-block--message">
          <p className="digest-block__text">No matching roles today. Check again tomorrow.</p>
        </div>
      )}

      {digest && digest.length > 0 && (
        <div className="digest-card">
          <header className="digest-card__header">
            <h2 className="digest-card__title">Top 10 Jobs For You — 9AM Digest</h2>
            <p className="digest-card__date">{formatDigestDate(TODAY)}</p>
          </header>

          <ul className="digest-card__list">
            {digest.map((job) => (
              <li key={job.id} className="digest-card__item">
                <div className="digest-card__item-main">
                  <h3 className="digest-card__item-title">{job.title}</h3>
                  <p className="digest-card__item-company">{job.company}</p>
                  <p className="digest-card__item-meta text-small text-muted">
                    {job.location} · {job.experience} · Match: {job.matchScore ?? 0}%
                  </p>
                </div>
                <a
                  href={job.applyUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary digest-card__apply"
                >
                  Apply
                </a>
              </li>
            ))}
          </ul>

          <footer className="digest-card__footer">
            <p className="digest-card__footer-text">This digest was generated based on your preferences.</p>
          </footer>
        </div>
      )}

      {digest && digest.length > 0 && (
        <div className="digest-actions">
          <button type="button" className="btn btn-secondary" onClick={handleCopy}>
            Copy Digest to Clipboard
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleEmailDraft}>
            Create Email Draft
          </button>
        </div>
      )}
    </section>
  );
}
