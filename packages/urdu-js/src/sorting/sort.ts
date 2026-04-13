import { sortKey } from './collation.js'

export function compare(a: string, b: string): number {
  const ka = sortKey(a)
  const kb = sortKey(b)
  return ka < kb ? -1 : ka > kb ? 1 : 0
}

export function sort(words: string[]): string[] {
  return [...words].sort(compare)
}
