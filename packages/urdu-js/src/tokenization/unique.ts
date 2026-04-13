import { normalize } from '../normalization/normalize.js'

export function unique(tokens: string[]): string[] {
  const seen = new Map<string, string>()
  for (const t of tokens) {
    const key = normalize(t)
    if (!seen.has(key)) seen.set(key, t)
  }
  return [...seen.values()]
}
