import { describe, it, expect } from 'vitest'
import { fingerprint } from '../../src/normalization/fingerprint.js'

describe('fingerprint', () => {
  it('empty string returns empty', () => expect(fingerprint('')).toBe(''))
  it('same word different diacritics → same fingerprint', () => {
    expect(fingerprint('عِلم')).toBe(fingerprint('عَلم'))
  })
  it('word with ZWNJ matches word without', () => {
    expect(fingerprint('علم\u200cہے')).toBe(fingerprint('علمہے'))
  })
  it('word with honorific matches without', () => {
    expect(fingerprint('نبیؐ')).toBe(fingerprint('نبی'))
  })
  it('hamza-on-alif normalised to alif', () => {
    expect(fingerprint('\u0623\u0644\u0644\u0647')).toBe(fingerprint('\u0627\u0644\u0644\u0647'))
  })
  it('strips leading punctuation', () => {
    expect(fingerprint('۔علم')).toBe(fingerprint('علم'))
  })
  it('strips trailing punctuation', () => {
    expect(fingerprint('علم۔')).toBe(fingerprint('علم'))
  })
  it('deterministic: same input → same output', () => {
    const word = 'پاکستان'
    expect(fingerprint(word)).toBe(fingerprint(word))
  })
  it('returns plain Urdu letters without diacritics', () => {
    expect(fingerprint('عِلمٌ')).toBe('علم')
  })
})
