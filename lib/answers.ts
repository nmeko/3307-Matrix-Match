// Digits other keyboards type: Arabic-Indic, Persian, Devanagari and full-width (Chinese/Japanese IMEs).
const DIGIT_SETS = ["٠١٢٣٤٥٦٧٨٩", "۰۱۲۳۴۵۶۷۸۹", "०१२३४५६७८९", "０１２３４５６７８９"]

/** Rewrites any typed answer into plain ASCII: other digit scripts, minus signs, decimal commas, spaces. */
export function normalizeAnswer(raw: string): string {
  let s = raw.normalize("NFKC").trim().toLowerCase()
  for (const set of DIGIT_SETS) s = s.replace(new RegExp(`[${set}]`, "g"), (d) => String(set.indexOf(d)))
  return s
    .replace(/[−‒–—﹣－]/g, "-") // Unicode minus and dashes
    .replace(/[٫]/g, ".") // Arabic decimal separator
    .replace(/\s+/g, "")
}

/** True when a typed answer means the same as the expected one (2 = 2.0 = +2 = ٢ = ２). */
export function answersMatch(typed: string, expected: string): boolean {
  const a = normalizeAnswer(typed)
  const b = normalizeAnswer(expected)
  if (a === b) return true
  const num = (s: string) => (/^[+-]?(\d+([.,]\d*)?|[.,]\d+)$/.test(s) ? Number(s.replace(",", ".")) : NaN)
  const x = num(a)
  return !Number.isNaN(x) && x === num(b)
}
