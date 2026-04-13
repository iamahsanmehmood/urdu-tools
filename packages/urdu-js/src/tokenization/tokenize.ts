import type { Token } from '../types.js'
import { classifyChar } from '../analysis/char-class.js'

function classifyTokenType(text: string): Token['type'] {
  if (!text.trim()) return 'whitespace'
  const chars = [...text]
  let urdu = 0, latin = 0, num = 0
  for (const ch of chars) {
    const cls = classifyChar(ch)
    if (cls === 'urdu-letter') urdu++
    else if (cls === 'latin') latin++
    else if (cls === 'numeral') num++
  }
  const total = chars.length
  if (num === total) return 'numeral'
  if (urdu / total >= 0.8) return 'urdu-word'
  if (latin / total >= 0.8) return 'latin-word'
  if (urdu > 0 && latin > 0) return 'mixed'
  return 'urdu-word'
}

export function tokenize(text: string): Token[] {
  if (!text) return []
  return text
    .split(/([\u0020\u00a0\u200b\t\n\r\v]+)/)
    .filter(p => p.length > 0)
    .map(p => ({ text: p, type: classifyTokenType(p) }))
}
