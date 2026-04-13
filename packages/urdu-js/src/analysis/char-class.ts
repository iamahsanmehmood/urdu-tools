import type { CharClass } from '../types.js'
import { isDiacritic } from '../normalization/diacritics.js'

export const URDU_SPECIFIC_SET = new Set([
  0x0679, 0x067e, 0x0686, 0x0688, 0x0691,
  0x06a9, 0x06af, 0x06ba, 0x06be, 0x06c1,
  0x06cc, 0x06d2,
])

export function isUrduChar(char: string): boolean {
  const cp = char.codePointAt(0) ?? 0
  return URDU_SPECIFIC_SET.has(cp) || (cp >= 0x06f0 && cp <= 0x06f9)
}

export function isUrduText(text: string, threshold = 0.1): boolean {
  if (!text) return false
  const chars = [...text].filter(c => !/\s/.test(c))
  if (chars.length === 0) return false
  return chars.filter(isUrduChar).length / chars.length >= threshold
}

export function classifyChar(char: string): CharClass {
  const cp = char.codePointAt(0) ?? 0
  if (URDU_SPECIFIC_SET.has(cp) || (cp >= 0x06f0 && cp <= 0x06f9)) return 'urdu-letter'
  if (isDiacritic(cp)) return 'diacritic'
  if (cp >= 0x0660 && cp <= 0x0669) return 'numeral'
  if (cp === 0x060c || cp === 0x061b || cp === 0x061f || cp === 0x06d4) return 'punctuation'
  if (cp >= 0x0600 && cp <= 0x06ff) return 'arabic-letter'
  if (cp >= 0x0030 && cp <= 0x0039) return 'numeral'
  if ((cp >= 0x0041 && cp <= 0x005a) || (cp >= 0x0061 && cp <= 0x007a)) return 'latin'
  if (cp === 0x0020 || cp === 0x00a0 || cp === 0x200b || cp === 0x0009 || cp === 0x000a || cp === 0x000d) return 'whitespace'
  if ((cp >= 0x0021 && cp <= 0x002f) || (cp >= 0x003a && cp <= 0x0040)) return 'punctuation'
  return 'other'
}
