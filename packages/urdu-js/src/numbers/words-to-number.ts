import { numberToWords } from './number-to-words.js'

const WORD_MAP = new Map<string, bigint>()

;(function buildMap() {
  for (let i = 0; i <= 99; i++) WORD_MAP.set(numberToWords(BigInt(i)), BigInt(i))
  for (let i = 1; i <= 9; i++) WORD_MAP.set(numberToWords(BigInt(i * 100)), BigInt(i * 100))
  WORD_MAP.set('سو', 100n)
  WORD_MAP.set('ہزار', 1_000n)
  WORD_MAP.set('لاکھ', 100_000n)
  WORD_MAP.set('کروڑ', 10_000_000n)
  WORD_MAP.set('ارب', 1_000_000_000n)
  WORD_MAP.set('کھرب', 1_000_000_000_000n)
  WORD_MAP.set('نیل', 1_000_000_000_000_000n)
})()

export function wordsToNumber(text: string): bigint | null {
  let t = text.trim()
  let negative = false
  if (t.startsWith('منفی ')) { negative = true; t = t.slice(5).trim() }
  const direct = WORD_MAP.get(t)
  if (direct !== undefined) return negative ? -direct : direct
  const tokens = t.split(/\s+/)
  let total = 0n, current = 0n
  for (const tok of tokens) {
    const val = WORD_MAP.get(tok)
    if (val === undefined) return null
    if (val >= 1_000n) { total += (current || 1n) * val; current = 0n }
    else if (val === 100n) { current = (current || 1n) * 100n }
    else current += val
  }
  total += current
  return negative ? -total : total
}
