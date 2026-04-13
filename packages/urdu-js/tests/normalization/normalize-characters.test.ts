import { describe, it, expect } from 'vitest'
import { normalizeCharacters } from '../../src/normalization/normalize-characters.js'

describe('normalizeCharacters', () => {
  it('empty string returns empty', () => expect(normalizeCharacters('')).toBe(''))
  it('Arabic ye → Urdu ye', () => expect(normalizeCharacters('\u064a')).toBe('\u06cc'))
  it('Arabic kaf → Urdu kaf', () => expect(normalizeCharacters('\u0643')).toBe('\u06a9'))
  it('Arabic heh → Urdu heh goal', () => expect(normalizeCharacters('\u0647')).toBe('\u06c1'))
  it('converts all three in a word', () => {
    // ہے written with Arabic chars: ه (U+0647) + ي (U+064A)
    expect(normalizeCharacters('\u0647\u064a')).toBe('\u06c1\u06cc')
  })
  it('correct Urdu chars are unchanged', () => {
    const word = 'پاکستان'
    expect(normalizeCharacters(word)).toBe(word)
  })
  it('mixed Arabic+Urdu word: کتاب with Arabic kaf', () => {
    // کتاب with U+0643 instead of U+06A9
    expect(normalizeCharacters('\u0643\u062a\u0627\u0628')).toBe('\u06a9\u062a\u0627\u0628')
  })
  it('preserves non-Arabic characters', () => {
    expect(normalizeCharacters('Hello علم')).toBe('Hello علم')
  })
  it('long text processes under 100ms', () => {
    const long = '\u0647\u064a'.repeat(25000)
    const t0 = performance.now()
    normalizeCharacters(long)
    expect(performance.now() - t0).toBeLessThan(100)
  })
})
