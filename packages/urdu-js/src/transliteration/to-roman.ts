import { URDU_TO_ROMAN } from './roman-map.js'

export function toRoman(text: string): string {
  if (!text) return text
  let result = '', i = 0
  while (i < text.length) {
    let matched = false
    for (const [urdu, roman] of URDU_TO_ROMAN) {
      if (text.startsWith(urdu, i)) {
        result += roman; i += urdu.length; matched = true; break
      }
    }
    if (!matched) { result += text[i]!; i++ }
  }
  return result
}
