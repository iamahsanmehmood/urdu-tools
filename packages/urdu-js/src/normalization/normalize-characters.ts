/**
 * Maps visually identical Arabic code points to the correct Urdu code points.
 * These three pairs render identically in Naskh fonts but are different Unicode
 * codepoints — a common source of silent search failures in mixed-input systems.
 *
 * Disabled by default in normalize() since it changes character identity.
 * Enable explicitly: normalize(text, { normalizeCharacters: true })
 *
 * Mappings (from "compass_artifact" §1 — "the most insidious data quality problem"):
 *   U+064A ي (Arabic ye)  → U+06CC ی (Urdu ye)
 *   U+0643 ك (Arabic kaf) → U+06A9 ک (Urdu kaf)
 *   U+0647 ه (Arabic heh) → U+06C1 ہ (Urdu heh goal)
 */
export function normalizeCharacters(text: string): string {
  if (!text) return text
  return text
    .replace(/\u064a/g, '\u06cc')  // ي → ی
    .replace(/\u0643/g, '\u06a9')  // ك → ک
    .replace(/\u0647/g, '\u06c1')  // ه → ہ
}
