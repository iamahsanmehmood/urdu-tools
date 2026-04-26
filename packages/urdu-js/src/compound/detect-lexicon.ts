/**
 * Lexicon-based compound detection.
 *
 * Looks up adjacent word pairs in the curated compound lexicon.
 * This catches compounds that affix rules miss: echo words (رنگ برنگے),
 * synonym pairs (محنت مشقت), fixed collocations (چاروں طرف), etc.
 */

import type { CompoundSpan } from './compound-types.js'
import { COMPOUND_LEXICON } from './lexicon-data.js'

/**
 * Strip trailing Urdu inflection markers for fuzzy lexicon matching.
 * Handles common plural/oblique endings: ے، ی، یں، وں، ا
 */
function stemForLookup(word: string): string[] {
  const candidates = [word]
  // Try removing trailing ے (oblique/plural masculine)
  if (word.endsWith('\u06D2')) candidates.push(word.slice(0, -1))
  // Try removing trailing ی (feminine)
  if (word.endsWith('\u06CC')) candidates.push(word.slice(0, -1))
  // Try removing trailing یں (feminine plural)
  if (word.endsWith('\u06CC\u06BA')) candidates.push(word.slice(0, -2))
  // Try removing trailing وں (oblique plural)
  if (word.endsWith('\u0648\u06BA')) candidates.push(word.slice(0, -2))
  return candidates
}

/**
 * Check if (w1, w2) forms the start of a compound in the lexicon.
 * Kept for backward compatibility with pair-checking utilities.
 */
export function isInLexicon(w1: string, w2: string): boolean {
  const w1Forms = stemForLookup(w1)
  const w2Forms = stemForLookup(w2)

  // Algorithmic rule: Iterative repetition compounds (basti basti, nagar nagar, qatra qatra)
  if (w1 === w2 && w1.length > 2) {
    return true
  }

  for (const f1 of w1Forms) {
    const tails = COMPOUND_LEXICON.get(f1)
    if (tails) {
      for (const tail of tails) {
        const tailWords = tail.split(' ')
        for (const f2 of w2Forms) {
          if (tailWords[0] === f2) return true
        }
      }
    }
  }
  return false
}

/**
 * Find the longest compound match from the lexicon starting at index i.
 * Returns the number of words matched (e.g. 2, 3, 4), or 0 if no match.
 */
function findLongestLexiconMatch(words: string[], i: number): number {
  const w1 = words[i]!
  const w2 = words[i + 1]

  let longestMatch = 0

  // Algorithmic rule: Iterative repetition compounds (basti basti)
  if (w2 && w1 === w2 && w1.length > 2) {
    longestMatch = 2
  }

  const w1Forms = stemForLookup(w1)

  for (const f1 of w1Forms) {
    const tails = COMPOUND_LEXICON.get(f1)
    if (tails) {
      for (const tail of tails) {
        const tailWords = tail.split(' ')
        const matchLen = 1 + tailWords.length
        
        // Skip if we already found a longer match or if there aren't enough words left
        if (matchLen <= longestMatch || i + matchLen > words.length) {
          continue
        }

        let match = true
        for (let j = 0; j < tailWords.length; j++) {
          const textWord = words[i + 1 + j]!
          const textWordForms = stemForLookup(textWord)
          if (!textWordForms.includes(tailWords[j]!)) {
            match = false
            break
          }
        }
        
        if (match) {
          longestMatch = matchLen
        }
      }
    }
  }

  return longestMatch
}

/**
 * Detect lexicon-based compounds from a list of word tokens.
 *
 * @param words - array of Urdu word strings
 * @returns array of CompoundSpan objects for detected compounds
 */
export function detectLexiconCompounds(words: string[]): CompoundSpan[] {
  if (words.length < 2) return []

  const spans: CompoundSpan[] = []
  let i = 0

  while (i < words.length - 1) {
    const matchLen = findLongestLexiconMatch(words, i)

    if (matchLen > 0) {
      const components = words.slice(i, i + matchLen)
      spans.push({
        start: i,
        end: i + matchLen - 1, // Fix: in urdu-js orchestrator, 'end' is start + matchLen - 1 for merge logic to correctly compute lengths (wait, in the previous code end: i + 1 for length 2. Actually if start=i and end=i+1, length is end - start + 1 = 2). Yes! 
        text: components.join(' '),
        type: 'lexicon',
        components,
      })
    }

    // Always advance by 1 - the orchestrator's merge function handles overlaps
    // and correctly merges components!
    i++
  }

  return spans
}
