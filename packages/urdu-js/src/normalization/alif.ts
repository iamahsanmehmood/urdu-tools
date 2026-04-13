import { ALIF_VARIANTS } from './unicode-data.js'

const ALIF_RE = new RegExp(
  '[' + ALIF_VARIANTS.map(cp => String.fromCodePoint(cp)).join('') + ']',
  'g'
)

export function normalizeAlif(text: string): string {
  return text.replace(ALIF_RE, '\u0627')
}
