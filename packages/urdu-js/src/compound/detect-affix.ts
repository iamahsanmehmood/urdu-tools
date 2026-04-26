/**
 * Affix-based compound detection (UAWL).
 *
 * Sliding-window pass over adjacent token pairs.
 * Uses DIRECTIONAL matching only:
 *   - PREFIX_SET.has(w1) — first word must be a known prefix
 *   - SUFFIX_SET.has(w2) — second word must be a known suffix
 *
 * This prevents false positives like "اور خوش" (where خوش is a prefix
 * but appears as the second word, not the first).
 *
 * Additionally, common Urdu function words (stop words) are excluded
 * from forming the non-affix side of a compound.
 */

import type { CompoundSpan } from './compound-types.js'
import { PREFIX_SET, SUFFIX_SET } from './affix-data.js'

/**
 * Common Urdu function / stop words that should NEVER form the
 * non-affix partner of a compound. These are particles, conjunctions,
 * pronouns, and auxiliaries that carry no lexical content.
 */
const STOP_WORDS: ReadonlySet<string> = new Set([
  // Conjunctions
  'اور', 'مگر', 'لیکن', 'بلکہ', 'تاکہ', 'تاہم', 'چنانچہ',
  // Particles / postpositions
  'کی', 'کا', 'کے', 'کو', 'میں', 'سے', 'نے', 'پر', 'تک',
  // Pronouns / demonstratives
  'وہ', 'یہ', 'ان', 'اس', 'جو', 'جس', 'جن', 'کس', 'کن',
  'اپنا', 'اپنے', 'اپنی',
  // Auxiliaries / copula
  'ہے', 'ہیں', 'تھا', 'تھے', 'تھی', 'ہو', 'ہوا', 'ہوتا', 'ہوتی', 'ہوتے',
  'گا', 'گی', 'گے',
  // Conditional / temporal / misc
  'تو', 'جب', 'اگر', 'بھی', 'نہ', 'نہیں', 'پھر',
  'والا', 'والے', 'والی',
  // Common verbs that should not be compound partners
  'کرتے', 'کرتی', 'کرتا', 'کریں', 'کیا',
  'چلاتے', 'چلاتی', 'چلاتا',
  'دیتے', 'دیتی', 'دیتا',
  'لیتے', 'لیتی', 'لیتا',
  'آتے', 'آتی', 'آتا',
  'جاتے', 'جاتی', 'جاتا',
])

/**
 * Detect affix-based compounds from a list of word tokens.
 *
 * Uses directional matching:
 * - w1 must be in PREFIX_SET (it's a prefix, so it comes first)
 * - w2 must be in SUFFIX_SET (it's a suffix, so it comes second)
 *
 * @param words — array of Urdu word strings (whitespace/punctuation already stripped)
 * @returns array of CompoundSpan objects for detected compounds
 */
export function detectAffixCompounds(words: string[]): CompoundSpan[] {
  if (words.length < 2) return []

  const spans: CompoundSpan[] = []
  let i = 0

  while (i < words.length - 1) {
    const w1 = words[i]!
    const w2 = words[i + 1]!

    // Directional matching only:
    // - w1 is a known PREFIX → w2 is the compound partner (skip if w2 is a stop word)
    // - w2 is a known SUFFIX → w1 is the compound partner (skip if w1 is a stop word)
    const w1IsPrefix = PREFIX_SET.has(w1)
    const w2IsSuffix = SUFFIX_SET.has(w2)

    const matched =
      (w1IsPrefix && !STOP_WORDS.has(w2)) ||
      (w2IsSuffix && !STOP_WORDS.has(w1))

    if (matched) {
      spans.push({
        start: i,
        end: i + 1,
        text: `${w1} ${w2}`,
        type: 'affix',
        components: [w1, w2],
      })
    }

    // Always advance by 1 — the orchestrator's merge function
    // handles overlapping/chained spans (e.g. خانہ داری after امورِ خانہ)
    i++
  }

  return spans
}
