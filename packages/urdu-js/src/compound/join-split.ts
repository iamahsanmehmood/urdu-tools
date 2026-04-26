/**
 * Compound joining, splitting, and pair-checking.
 *
 * - `joinCompounds(text)` — detects compounds and replaces spaces
 *   between them with the chosen binder character (default: ZWNJ)
 * - `splitCompounds(text)` — replaces binder chars back to regular space
 * - `isCompound(w1, w2)` — checks whether a specific word pair is a compound
 */

import type { CompoundOptions, CompoundMatch } from './compound-types.js'
import { detectCompounds } from './detect.js'
import { PREFIX_SET, SUFFIX_SET } from './affix-data.js'
import { isInLexicon } from './detect-lexicon.js'

// Binder character map
const BINDERS: Record<string, string> = {
  zwnj: '\u200C', // Zero-Width Non-Joiner
  nbsp: '\u00A0', // Non-Breaking Space
  wj:   '\u2060', // Word Joiner
}

/**
 * Join detected compound words by replacing the space between them
 * with a binder character.
 *
 * Default binder: ZWNJ (U+200C) — keeps words visually separate,
 * prevents tokenizers from splitting them.
 *
 * @param text — input Urdu text
 * @param options — detection layers + binder selection
 * @returns text with compound word spaces replaced by binder
 *
 * @example
 * ```typescript
 * joinCompounds('کتاب خانہ اچھا ہے')
 * // → 'کتاب‌خانہ اچھا ہے'  (ZWNJ between کتاب and خانہ)
 * ```
 */
export function joinCompounds(text: string, options?: CompoundOptions): string {
  if (!text || !text.trim()) return text

  const binder = BINDERS[options?.binder ?? 'zwnj'] ?? BINDERS['zwnj']!
  const spans = detectCompounds(text, options)

  if (spans.length === 0) return text

  // Split text into words and whitespace segments
  const parts = text.split(/(\s+)/)
  const wordIndices: number[] = []

  // Map word indices to parts indices
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] && /\S/.test(parts[i]!)) {
      wordIndices.push(i)
    }
  }

  // For each compound span, replace the whitespace between its component words
  // with the binder character
  for (const span of spans) {
    for (let wi = span.start; wi < span.end; wi++) {
      // The whitespace between word[wi] and word[wi+1] is at parts index
      // between wordIndices[wi] and wordIndices[wi+1]
      const partIdx = wordIndices[wi]!
      // The whitespace is the part right after the current word
      const wsIdx = partIdx + 1
      if (wsIdx < parts.length && parts[wsIdx] && /^\s+$/.test(parts[wsIdx]!)) {
        parts[wsIdx] = binder
      }
    }
  }

  return parts.join('')
}

/**
 * Split compound words by replacing binder characters (ZWNJ, NBSP, WJ)
 * with regular spaces.
 *
 * This is the inverse of `joinCompounds()`.
 *
 * @param text — text containing compound binder characters
 * @returns text with binders replaced by regular spaces
 *
 * @example
 * ```typescript
 * splitCompounds('کتاب‌خانہ')
 * // → 'کتاب خانہ'
 * ```
 */
export function splitCompounds(text: string): string {
  if (!text) return text
  // Replace ZWNJ, WJ with space. NBSP → space.
  return text
    .replace(/\u200C/g, ' ')  // ZWNJ → space
    .replace(/\u2060/g, ' ')  // Word Joiner → space
    // Note: NBSP is handled by normalize(), so we also restore it here
    .replace(/\u00A0/g, ' ')  // NBSP → space
}

/**
 * Check whether two adjacent words form a compound.
 *
 * @param w1 — first word
 * @param w2 — second word
 * @param options — which detection layers to check
 * @returns a CompoundMatch with `matched` and `type`
 *
 * @example
 * ```typescript
 * isCompound('کتاب', 'خانہ')
 * // → { matched: true, type: 'affix' }
 *
 * isCompound('اچھا', 'آدمی')
 * // → { matched: false, type: null }
 * ```
 */
export function isCompound(w1: string, w2: string, options?: CompoundOptions): CompoundMatch {
  if (!w1 || !w2) return { matched: false, type: null }

  const opts = {
    affix: true,
    izafat: true,
    lexicon: true,
    ...options,
  }

  // Check affix layer (directional only)
  if (opts.affix) {
    if (PREFIX_SET.has(w1) || SUFFIX_SET.has(w2)) {
      return { matched: true, type: 'affix' }
    }
  }

  // Check izafat layer
  if (opts.izafat) {
    const ZER = '\u0650'
    const HAMZA_ABOVE = '\u0654'
    const HAMZA = '\u0621'

    const lastChar = w1[w1.length - 1]
    if (lastChar === ZER || lastChar === HAMZA_ABOVE || lastChar === HAMZA) {
      return { matched: true, type: 'izafat' }
    }

    // Vav-e-atf: if w1 or w2 is و — but this is typically a 3-token check
    // For pair check, we handle the case where w2 === و loosely
  }

  // Check lexicon layer
  if (opts.lexicon) {
    if (isInLexicon(w1, w2)) {
      return { matched: true, type: 'lexicon' }
    }
  }

  return { matched: false, type: null }
}

