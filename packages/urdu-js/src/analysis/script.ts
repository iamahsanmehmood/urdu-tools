import type { Script } from '../types.js'
import { URDU_SPECIFIC_SET } from './char-class.js'

export function getUrduDensity(text: string): number {
  if (!text) return 0
  const chars = [...text].filter(c => !/\s/.test(c))
  if (chars.length === 0) return 0
  const urdu = chars.filter(c => {
    const cp = c.codePointAt(0) ?? 0
    return URDU_SPECIFIC_SET.has(cp) || (cp >= 0x06f0 && cp <= 0x06f9)
  }).length
  return urdu / chars.length
}

export function getScript(text: string): Script {
  if (!text.trim()) return 'unknown'
  const chars = [...text].filter(c => !/\s/.test(c))
  if (chars.length === 0) return 'unknown'
  let urdu = 0, arabic = 0, latin = 0
  for (const ch of chars) {
    const cp = ch.codePointAt(0) ?? 0
    if (URDU_SPECIFIC_SET.has(cp) || (cp >= 0x06f0 && cp <= 0x06f9)) { urdu++; continue }
    if (cp >= 0x0600 && cp <= 0x06ff) { arabic++; continue }
    if ((cp >= 0x0041 && cp <= 0x005a) || (cp >= 0x0061 && cp <= 0x007a)) latin++
  }
  const total = chars.length
  if (urdu / total >= 0.1 && latin / total >= 0.1) return 'mixed'
  if (urdu / total >= 0.1) return 'urdu'
  if (arabic / total >= 0.5) return 'arabic'
  if (latin / total >= 0.8) return 'latin'
  if (urdu > 0 || arabic > 0) return 'arabic'
  return 'unknown'
}
