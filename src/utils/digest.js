import { computeMatchScore } from './matchScore';

const PREFIX = 'jobTrackerDigest_';

export function getDigestKey(date) {
  const d = date instanceof Date ? date : new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${PREFIX}${y}-${m}-${day}`;
}

export function getDigestForDate(date) {
  try {
    const key = getDigestKey(date);
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

export function saveDigest(date, jobs) {
  const key = getDigestKey(date);
  localStorage.setItem(key, JSON.stringify(jobs));
}

/**
 * Top 10 jobs: sort by matchScore descending, then postedDaysAgo ascending.
 */
export function generateDigest(jobs, preferences) {
  const scored = jobs.map((job) => ({
    ...job,
    matchScore: computeMatchScore(job, preferences),
  }));
  scored.sort((a, b) => {
    const scoreA = a.matchScore ?? 0;
    const scoreB = b.matchScore ?? 0;
    if (scoreB !== scoreA) return scoreB - scoreA;
    const daysA = a.postedDaysAgo ?? 999;
    const daysB = b.postedDaysAgo ?? 999;
    return daysA - daysB;
  });
  return scored.slice(0, 10);
}

export function formatDigestAsPlainText(jobs, date) {
  const d = date instanceof Date ? date : new Date();
  const dateStr = d.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  let out = `Top 10 Jobs For You — 9AM Digest\n${dateStr}\n\n`;
  jobs.forEach((job, i) => {
    out += `${i + 1}. ${job.title} at ${job.company}\n`;
    out += `   Location: ${job.location} | Experience: ${job.experience} | Match: ${job.matchScore ?? 0}%\n`;
    if (job.applyUrl) out += `   Apply: ${job.applyUrl}\n`;
    out += '\n';
  });
  out += 'This digest was generated based on your preferences.';
  return out;
}
