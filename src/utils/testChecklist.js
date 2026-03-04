const STORAGE_KEY = 'jobTrackerTestStatus';
const TOTAL_ITEMS = 10;

function safeParse() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const o = JSON.parse(raw);
    return typeof o === 'object' && o !== null ? o : {};
  } catch {
    return {};
  }
}

export function getTestStatus() {
  const map = safeParse();
  const out = {};
  for (let i = 1; i <= TOTAL_ITEMS; i++) {
    const key = String(i);
    out[key] = map[key] === true;
  }
  return out;
}

export function setTestItem(id, checked) {
  const key = String(id);
  if (key === '' || Number(key) < 1 || Number(key) > TOTAL_ITEMS) return;
  const map = safeParse();
  map[key] = checked === true;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function clearTestStatus() {
  localStorage.removeItem(STORAGE_KEY);
}

export function allTestsPassed() {
  const map = safeParse();
  for (let i = 1; i <= TOTAL_ITEMS; i++) {
    if (map[String(i)] !== true) return false;
  }
  return true;
}

export function getPassedCount() {
  const map = safeParse();
  let n = 0;
  for (let i = 1; i <= TOTAL_ITEMS; i++) {
    if (map[String(i)] === true) n++;
  }
  return n;
}
