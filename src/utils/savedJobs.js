const STORAGE_KEY = 'job-notification-tracker-saved';

export function getSavedJobIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const ids = JSON.parse(raw);
    return Array.isArray(ids) ? ids : [];
  } catch {
    return [];
  }
}

export function saveJobId(id) {
  const ids = getSavedJobIds();
  if (ids.includes(id)) return;
  const next = [...ids, id];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function removeSavedJobId(id) {
  const ids = getSavedJobIds().filter((s) => s !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function isJobSaved(id) {
  return getSavedJobIds().includes(id);
}
