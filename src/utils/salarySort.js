/**
 * Extract numeric value from salaryRange for sorting (e.g. "3–5 LPA" -> 3, "₹30k–₹50k" -> 30).
 */
export function getSalarySortValue(salaryRange) {
  if (!salaryRange || typeof salaryRange !== 'string') return 0;
  const s = salaryRange.trim();
  const lpaMatch = s.match(/^(\d+)\s*[–\-]\s*\d+\s*LPA/i);
  if (lpaMatch) return Number(lpaMatch[1]);
  const numK = s.match(/(\d+)\s*k/i);
  if (numK) return Number(numK[1]);
  const firstNum = s.match(/(\d+)/);
  return firstNum ? Number(firstNum[1]) : 0;
}
