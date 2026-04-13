import { ROMAN_TO_URDU } from './roman-map.js'

export function fromRoman(text: string): string {
  if (!text) return text
  let result = '', i = 0
  while (i < text.length) {
    let matched = false
    for (const [roman, urdu] of ROMAN_TO_URDU) {
      if (text.startsWith(roman, i)) {
        result += urdu; i += roman.length; matched = true; break
      }
    }
    if (!matched) { result += text[i]!; i++ }
  }
  return result
}
