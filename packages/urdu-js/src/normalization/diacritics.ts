import { DIACRITIC_RANGES } from './unicode-data.js'
import { stripRanges } from './normalize.js'

export function stripDiacritics(text: string): string {
  return stripRanges(text, DIACRITIC_RANGES)
}

export function isDiacritic(codePoint: number): boolean {
  return DIACRITIC_RANGES.some(([lo, hi]) => codePoint >= lo && codePoint <= hi)
}
