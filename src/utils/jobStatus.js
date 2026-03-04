const STATUS_KEY = 'jobTrackerStatus';
const HISTORY_KEY = 'jobTrackerStatusHistory';
const VALID_STATUSES = ['Not Applied', 'Applied', 'Rejected', 'Selected'];
const MAX_HISTORY = 50;

function safeParse(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function getJobStatus(jobId) {
  const map = safeParse(STATUS_KEY, {});
  const s = map[jobId];
  if (VALID_STATUSES.includes(s)) return s;
  return 'Not Applied';
}

export function setJobStatus(jobId, status) {
  if (!jobId || !VALID_STATUSES.includes(status)) return;
  const map = safeParse(STATUS_KEY, {});
  map[jobId] = status;
  localStorage.setItem(STATUS_KEY, JSON.stringify(map));

  const history = safeParse(HISTORY_KEY, []);
  history.unshift({
    jobId,
    status,
    changedAt: new Date().toISOString(),
  });
  const trimmed = history.slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
}

export function getStatusHistory() {
  const history = safeParse(HISTORY_KEY, []);
  return Array.isArray(history) ? history : [];
}
