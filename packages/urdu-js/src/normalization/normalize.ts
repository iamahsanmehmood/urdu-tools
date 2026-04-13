import type { NormalizeOptions } from '../types.js'
import { DIACRITIC_RANGES, HONORIFIC_RANGES, ZERO_WIDTH_CHARS, PRESENTATION_FORMS_MAP } from './unicode-data.js'
import { normalizeCharacters } from './normalize-characters.js'

const DEFAULTS: Required<NormalizeOptions> = {
  nfc: true, nbsp: true, alifMadda: true, numerals: true,
  zeroWidth: true, diacritics: true, honorifics: true, hamza: true,
  kashida: false, presentationForms: false, punctuationTrim: false,
  normalizeCharacters: false,
}

export function normalize(text: string, options?: NormalizeOptions): string {
  if (!text) return text
  const o = options ? { ...DEFAULTS, ...options } : DEFAULTS
  let s = text
  if (o.nfc) s = s.normalize('NFC')
  if (o.nbsp) s = s.replace(/\u00a0/g, ' ')
  if (o.alifMadda) s = s.replace(/[\u0627\u0671]\u0653/g, '\u0622')
  if (o.numerals) s = s.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, d => String(d.codePointAt(0)! & 0xf))
  if (o.zeroWidth) {
    const zwSet = new Set(ZERO_WIDTH_CHARS)
    s = [...s].filter(ch => !zwSet.has(ch.codePointAt(0)!)).join('')
  }
  if (o.diacritics) s = stripRanges(s, DIACRITIC_RANGES)
  if (o.honorifics) s = stripRanges(s, HONORIFIC_RANGES)
  if (o.hamza) s = s.replace(/\u0623/g, '\u0627').replace(/\u0624/g, '\u0648')
  if (o.kashida) s = s.replace(/\u0640/g, '')
  if (o.presentationForms) {
    let r = ''
    for (const ch of s) {
      const cp = ch.codePointAt(0)!
      r += PRESENTATION_FORMS_MAP.get(cp) ?? ch
    }
    s = r
  }
  if (o.punctuationTrim) s = s.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '')
  if (o.normalizeCharacters) s = normalizeCharacters(s)
  return s
}

export function stripRanges(text: string, ranges: readonly [number, number][]): string {
  if (!text) return text
  let result = ''
  for (const ch of text) {
    const cp = ch.codePointAt(0)!
    if (!ranges.some(([lo, hi]) => cp >= lo && cp <= hi)) result += ch
  }
  return result
}
