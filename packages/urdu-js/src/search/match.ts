import type { MatchLayer, MatchResult } from '../types.js'
import { normalize } from '../normalization/normalize.js'
import { stripDiacritics } from '../normalization/diacritics.js'
import { stripZeroWidth } from '../normalization/zero-width.js'
import { normalizeAlif } from '../normalization/alif.js'
import { normalizeHamza } from '../normalization/hamza.js'
import { stripRanges } from '../normalization/normalize.js'
import { HONORIFIC_RANGES } from '../normalization/unicode-data.js'

const DEFAULT_STRATEGY: MatchLayer[] = [
  'exact', 'nfc', 'strip-zerowidth', 'strip-diacritics',
  'normalize-alif', 'strip-honorifics', 'normalize-hamza',
  'trim-punctuation', 'compound-split',
]

function applyLayer(text: string, layer: MatchLayer): string {
  switch (layer) {
    case 'exact': return text
    case 'nfc': return text.normalize('NFC')
    case 'strip-zerowidth': return stripZeroWidth(text)
    case 'strip-diacritics': return stripDiacritics(text)
    case 'normalize-alif': return normalizeAlif(text)
    case 'strip-honorifics': return stripRanges(text, HONORIFIC_RANGES)
    case 'normalize-hamza': return normalizeHamza(text)
    case 'trim-punctuation': return text.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '')
    default: return text
  }
}

export function match(
  query: string,
  target: string,
  strategy: MatchLayer[] = DEFAULT_STRATEGY,
): MatchResult {
  let q = query
  let t = target
  for (const layer of strategy) {
    if (layer === 'compound-split') {
      const qParts = q.split(/\s+/)
      const tParts = t.split(/\s+/)
      if (qParts.some(qp => tParts.includes(qp))) {
        return { matched: true, layer, normalizedQuery: q, normalizedTarget: t }
      }
      continue
    }
    q = applyLayer(q, layer)
    t = applyLayer(t, layer)
    if (q === t) return { matched: true, layer, normalizedQuery: q, normalizedTarget: t }
  }
  return { matched: false, layer: null, normalizedQuery: q, normalizedTarget: t }
}

function levenshtein(s: string, t: string): number {
  const m = s.length, n = t.length
  if (m === 0) return n
  if (n === 0) return m
  let prev = Array.from({ length: n + 1 }, (_, i) => i)
  let curr = new Array<number>(n + 1)
  for (let i = 1; i <= m; i++) {
    curr[0] = i
    for (let j = 1; j <= n; j++) {
      const cost = s[i - 1] === t[j - 1] ? 0 : 1
      curr[j] = Math.min(curr[j - 1]! + 1, prev[j]! + 1, prev[j - 1]! + cost)
    }
    ;[prev, curr] = [curr, prev]
  }
  return prev[n]!
}

function lcsLength(s: string, t: string): number {
  const m = s.length, n = t.length
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0))
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i]![j] = s[i - 1] === t[j - 1] ? dp[i - 1]![j - 1]! + 1 : Math.max(dp[i - 1]![j]!, dp[i]![j - 1]!)
  return dp[m]![n]!
}

/**
 * Returns an array of progressively normalized forms of a word.
 * Use this for database lookups: try each form in order, stop at first match.
 * Implements the 9-layer strategy from urdu_unicode_playbook.md §2.
 *
 * @example
 * for (const form of getAllNormalizations(userInput)) {
 *   const result = await db.lookup(form)
 *   if (result) return result
 * }
 */
export function getAllNormalizations(word: string): string[] {
  const forms: string[] = [word]
  const add = (s: string) => { if (s !== forms[forms.length - 1]) forms.push(s) }

  const nfc = word.normalize('NFC')
  add(nfc)
  const noZw = stripZeroWidth(nfc)
  add(noZw)
  const noDia = stripDiacritics(noZw)
  add(noDia)
  const normAlif = normalizeAlif(noDia)
  add(normAlif)
  const noHon = stripRanges(normAlif, HONORIFIC_RANGES)
  add(noHon)
  const normHamza = normalizeHamza(noHon)
  add(normHamza)
  const trimmed = normHamza.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '')
  add(trimmed)

  return forms
}

export function fuzzyMatch(
  query: string,
  candidates: string[],
): { candidate: string; score: number } | null {
  if (!candidates.length) return null
  const normQ = normalize(query)
  let best: { candidate: string; score: number } | null = null
  for (const c of candidates) {
    const normC = normalize(c)
    const maxLen = Math.max(normQ.length, normC.length)
    if (maxLen === 0) continue
    const ed = levenshtein(normQ, normC)
    const lcs = lcsLength(normQ, normC)
    const score = 0.6 * (1 - ed / maxLen) + 0.4 * (lcs / maxLen)
    if (score >= 0.5 && (!best || score > best.score)) best = { candidate: c, score }
  }
  return best
}
