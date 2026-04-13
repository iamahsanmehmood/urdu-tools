import { stripDiacritics } from '../normalization/diacritics.js'

export function wordCount(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0
}

export function charCount(
  text: string,
  options?: { excludeDiacritics?: boolean; excludeWhitespace?: boolean },
): number {
  let s = text
  if (options?.excludeDiacritics) s = stripDiacritics(s)
  if (options?.excludeWhitespace) s = s.replace(/\s/g, '')
  return [...s].length
}
