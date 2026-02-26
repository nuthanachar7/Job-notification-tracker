const STORAGE_KEY = 'jobTrackerPreferences';

const DEFAULTS = {
  roleKeywords: '',
  preferredLocations: [],
  preferredMode: [],
  experienceLevel: '',
  skills: '',
  minMatchScore: 40,
};

export function getPreferences() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULTS };
    const p = JSON.parse(raw);
    return {
      roleKeywords: p.roleKeywords != null ? p.roleKeywords : DEFAULTS.roleKeywords,
      preferredLocations: Array.isArray(p.preferredLocations) ? p.preferredLocations : DEFAULTS.preferredLocations,
      preferredMode: Array.isArray(p.preferredMode) ? p.preferredMode : DEFAULTS.preferredMode,
      experienceLevel: p.experienceLevel != null ? p.experienceLevel : DEFAULTS.experienceLevel,
      skills: p.skills != null ? p.skills : DEFAULTS.skills,
      minMatchScore: typeof p.minMatchScore === 'number' ? Math.min(100, Math.max(0, p.minMatchScore)) : DEFAULTS.minMatchScore,
    };
  } catch {
    return { ...DEFAULTS };
  }
}

export function savePreferences(prefs) {
  const out = {
    roleKeywords: prefs.roleKeywords ?? '',
    preferredLocations: prefs.preferredLocations ?? [],
    preferredMode: prefs.preferredMode ?? [],
    experienceLevel: prefs.experienceLevel ?? '',
    skills: prefs.skills ?? '',
    minMatchScore: Math.min(100, Math.max(0, prefs.minMatchScore ?? 40)),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(out));
}

export function hasPreferencesSet(prefs) {
  if (!prefs) return false;
  const r = (prefs.roleKeywords || '').trim().length > 0;
  const l = (prefs.preferredLocations || []).length > 0;
  const m = (prefs.preferredMode || []).length > 0;
  const e = (prefs.experienceLevel || '').length > 0;
  const s = (prefs.skills || '').trim().length > 0;
  return r || l || m || e || s;
}
