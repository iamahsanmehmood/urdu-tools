/**
 * Compound detection orchestrator.
 *
 * Runs enabled detection layers in order:
 *   1. Affix-based (UAWL)
 *   2. Izafat markers (zer / hamza / vav-e-atf)
 *   3. Lexicon (curated compound dictionary)
 *
 * Merges / chains overlapping spans and returns the final list.
 */

import type { CompoundSpan, CompoundOptions } from './compound-types.js'
import { detectAffixCompounds } from './detect-affix.js'
import { detectIzafatCompounds } from './detect-izafat.js'
import { detectLexiconCompounds } from './detect-lexicon.js'

/** Default options: all layers enabled */
const DEFAULTS: Required<Pick<CompoundOptions, 'affix' | 'izafat' | 'lexicon'>> = {
  affix: true,
  izafat: true,
  lexicon: true,
}

/**
 * Extract Urdu content words from text, preserving their positions.
 * Returns both the word list and a map from word-index → original text offset info.
 */
function extractWords(text: string): { words: string[]; segments: { text: string; isWord: boolean }[] } {
  // Split on whitespace, keeping separators
  const parts = text.split(/(\s+)/)
  const words: string[] = []
  const segments: { text: string; isWord: boolean }[] = []

  for (const part of parts) {
    if (!part) continue
    const isWord = /\S/.test(part)
    segments.push({ text: part, isWord })
    if (isWord) words.push(part)
  }

  return { words, segments }
}

/**
 * Merge overlapping compound spans by CHAINING them.
 *
 * When two spans share a word (overlap), they are extended into
 * a single larger span. For example:
 *   - Izafat: "امورِ خانہ" [0,1]
 *   - Affix:  "خانہ داری"  [1,2]
 *   → Merged: "امورِ خانہ داری" [0,2]
 *
 * Non-overlapping spans are kept separate.
 */
function mergeSpans(spans: CompoundSpan[], words: string[]): CompoundSpan[] {
  if (spans.length <= 1) return spans

  // Sort by start, then by span length descending
  const sorted = [...spans].sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start))

  const merged: CompoundSpan[] = [{ ...sorted[0]! }]
  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i]!
    const last = merged[merged.length - 1]!

    // If spans overlap (share at least one word index), chain/extend them
    if (current.start <= last.end) {
      // Extend the span to cover both
      last.end = Math.max(last.end, current.end)
      last.components = words.slice(last.start, last.end + 1)
      last.text = last.components.join(' ')
      // Keep the first span's type (priority: affix > izafat > lexicon)
    } else {
      merged.push({ ...current })
    }
  }

  return merged
}

/**
 * Detect compound words in Urdu text.
 *
 * Returns an array of `CompoundSpan` objects describing each detected
 * compound, including its component words and the detection method used.
 *
 * @param text — input Urdu text
 * @param options — which detection layers to enable
 * @returns array of non-overlapping CompoundSpan objects
 *
 * @example
 * ```typescript
 * detectCompounds('کتاب خانہ بہت اچھا ہے')
 * // → [{ text: 'کتاب خانہ', type: 'affix', components: ['کتاب', 'خانہ'], start: 0, end: 1 }]
 * ```
 */
export function detectCompounds(text: string, options?: CompoundOptions): CompoundSpan[] {
  if (!text || !text.trim()) return []

  const opts = { ...DEFAULTS, ...options }
  const { words } = extractWords(text)

  if (words.length < 2) return []

  const allSpans: CompoundSpan[] = []

  // Layer 1: Affix-based detection (most precise for morphological compounds)
  if (opts.affix) {
    allSpans.push(...detectAffixCompounds(words))
  }

  // Layer 2: Izafat markers (zer / hamza / vav-e-atf)
  if (opts.izafat) {
    allSpans.push(...detectIzafatCompounds(words))
  }

  // Layer 3: Lexicon lookup (echo words, synonym pairs, fixed expressions)
  if (opts.lexicon) {
    allSpans.push(...detectLexiconCompounds(words))
  }

  // Merge overlapping spans — chains them into larger compounds
  return mergeSpans(allSpans, words)
}
