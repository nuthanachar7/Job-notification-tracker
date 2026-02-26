/**
 * Deterministic match score (cap 100). Exact rules from spec.
 */
export function computeMatchScore(job, preferences) {
  if (!preferences) return 0;
  let score = 0;

  const roleKeywords = (preferences.roleKeywords || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const titleLower = (job.title || '').toLowerCase();
  const descLower = (job.description || '').toLowerCase();

  if (roleKeywords.length > 0) {
    const inTitle = roleKeywords.some((kw) => titleLower.includes(kw));
    if (inTitle) score += 25;
    const inDesc = roleKeywords.some((kw) => descLower.includes(kw));
    if (inDesc) score += 15;
  }

  const preferredLocations = preferences.preferredLocations || [];
  if (preferredLocations.length > 0 && job.location && preferredLocations.includes(job.location)) {
    score += 15;
  }

  const preferredMode = preferences.preferredMode || [];
  if (preferredMode.length > 0 && job.mode && preferredMode.includes(job.mode)) {
    score += 10;
  }

  if (preferences.experienceLevel && job.experience === preferences.experienceLevel) {
    score += 10;
  }

  const userSkills = (preferences.skills || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const jobSkills = (job.skills || []).map((s) => String(s).toLowerCase());
  if (userSkills.length > 0 && jobSkills.some((js) => userSkills.some((us) => js.includes(us) || us.includes(js)))) {
    score += 15;
  }

  if (job.postedDaysAgo != null && job.postedDaysAgo <= 2) {
    score += 5;
  }

  if (job.source === 'LinkedIn') {
    score += 5;
  }

  return Math.min(100, score);
}
