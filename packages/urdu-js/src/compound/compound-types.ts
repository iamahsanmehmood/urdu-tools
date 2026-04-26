/**
 * Compound word detection types.
 *
 * A compound span represents a multi-word semantic unit detected
 * within tokenized text. The `type` field tells you *why* it was
 * detected — affix rule, izafat marker, or lexicon match.
 */

/** Why a compound was detected */
export type CompoundType =
  | 'affix'    // UAWL affix match (خانہ، گاہ، پرست …)
  | 'izafat'   // zer / hamza / vav-e-atf marker
  | 'lexicon'  // curated dictionary (echo, synonym, fixed expressions)

/** A detected compound span within tokenized text */
export interface CompoundSpan {
  /** Index of the first token in the compound (0-based) */
  start: number
  /** Index of the last token in the compound (0-based, inclusive) */
  end: number
  /** The merged compound text */
  text: string
  /** Detection method that identified this compound */
  type: CompoundType
  /** Individual words that form the compound */
  components: string[]
}

/** Result of checking whether two words form a compound */
export interface CompoundMatch {
  /** Whether the pair forms a compound */
  matched: boolean
  /** Detection method, or null if not a compound */
  type: CompoundType | null
}

/** Configuration for compound detection layers */
export interface CompoundOptions {
  /** Enable UAWL affix-based detection (default: true) */
  affix?: boolean
  /** Enable izafat / zer / hamza / vav-e-atf detection (default: true) */
  izafat?: boolean
  /** Enable curated dictionary lookup (default: true) */
  lexicon?: boolean
  /**
   * Character to use when joining compound words.
   * - `'zwnj'` — Zero-Width Non-Joiner U+200C (default)
   * - `'nbsp'` — Non-Breaking Space U+00A0
   * - `'wj'`   — Word Joiner U+2060
   */
  binder?: 'zwnj' | 'nbsp' | 'wj'
}
