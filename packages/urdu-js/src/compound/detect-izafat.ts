/**
 * Izafat / zer / hamza / vav-e-atf compound detection.
 *
 * Detects three categories of grammatical compound markers:
 *
 * 1. **Zer / Kasra (U+0650):** When a word ends with zer, the next word
 *    is its izafat complement — e.g. کتابِ حسنہ
 *
 * 2. **Hamza-above (U+0654) / Hamza (U+0621):** Signal izafat on
 *    words ending in ہ — e.g. بچّۂ مکتب
 *
 * 3. **Vav-e-atf (و):** A standalone و between two Urdu content words
 *    binds them — e.g. علم و عمل
 */

import type { CompoundSpan } from './compound-types.js'

// Izafat markers at end of a word
const ZER = '\u0650'          // ◌ِ  kasra / zer
const HAMZA_ABOVE = '\u0654'  // ◌ٔ  hamza above
const HAMZA = '\u0621'        // ء   standalone hamza

/** Check if a word ends with an izafat marker (zer or hamza-above) */
function endsWithIzafat(word: string): boolean {
  if (!word) return false
  const last = word[word.length - 1]!
  const secondLast = word.length >= 2 ? word[word.length - 2] : ''
  return (
    last === ZER ||
    last === HAMZA_ABOVE ||
    last === HAMZA ||
    // Handle ۂ sequence (heh + hamza-above)
    (secondLast === '\u06C1' && last === HAMZA_ABOVE) ||
    (secondLast === '\u06BE' && last === HAMZA_ABOVE)
  )
}

/** Check if a token is a standalone vav-e-atf (و) */
function isVavAtf(word: string): boolean {
  return word === '\u0648'  // و
}

/** Minimum Urdu-letter check (basic Arabic + extended ranges) */
function hasUrduLetters(word: string): boolean {
  return /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/.test(word)
}

/**
 * Detect izafat-based compounds from a list of word tokens.
 *
 * @param words — array of Urdu word strings (whitespace/punctuation already stripped)
 * @returns array of CompoundSpan objects for detected compounds
 */
export function detectIzafatCompounds(words: string[]): CompoundSpan[] {
  if (words.length < 2) return []

  const spans: CompoundSpan[] = []
  let i = 0

  while (i < words.length - 1) {
    const w1 = words[i]!
    const w2 = words[i + 1]!

    // ── Case 1: word ends with izafat marker → next word is complement ──
    if (endsWithIzafat(w1) && hasUrduLetters(w2)) {
      spans.push({
        start: i,
        end: i + 1,
        text: `${w1} ${w2}`,
        type: 'izafat',
        components: [w1, w2],
      })
      i++
      continue
    }

    // ── Case 2: standalone و between two Urdu content words ──
    if (isVavAtf(w1) && i > 0 && i + 1 < words.length) {
      // و is the current token — check the one before and after
      // But since we're iterating linearly, we handle it when we see
      // { prev, و, next } by checking w2 === و case:
    }

    // Alternative check: w2 is و and there's a w3
    if (isVavAtf(w2) && i + 2 < words.length) {
      const w3 = words[i + 2]!
      if (hasUrduLetters(w1) && hasUrduLetters(w3)) {
        spans.push({
          start: i,
          end: i + 2,
          text: `${w1} ${w2} ${w3}`,
          type: 'izafat',
          components: [w1, w2, w3],
        })
        i++
        continue
      }
    }

    i++
  }

  return spans
}
