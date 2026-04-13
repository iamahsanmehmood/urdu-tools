import { normalize } from './normalize.js'

/**
 * Produces a canonical comparison fingerprint for an Urdu word.
 * Combines normalization layers 1-8 (NFC + NBSP + Alif Madda + numerals +
 * zero-width + diacritics + honorifics + hamza) plus punctuation trimming.
 *
 * Designed for client-side word-status matching without a DB round-trip.
 * Both the stored word and the displayed word must be fingerprinted to compare.
 *
 * Battle-tested on a 110,000+ word Urdu dictionary (urdu_unicode_playbook.md §3).
 */
export function fingerprint(text: string): string {
  if (!text) return ''
  return normalize(text, {
    nfc: true,
    nbsp: true,
    alifMadda: true,
    numerals: true,
    zeroWidth: true,
    diacritics: true,
    honorifics: true,
    hamza: true,
    kashida: false,
    presentationForms: false,
    punctuationTrim: true,
  }).trim()
}
