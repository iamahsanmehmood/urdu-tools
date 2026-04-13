import { normalize } from '../normalization/normalize.js'

export function tokenizeForSearch(text: string): string[] {
  if (!text) return []
  return normalize(text)
    .split(/[\s\u060c\u061b]+/)
    .map(t => t.trim())
    .filter(t => t.length > 0)
}
