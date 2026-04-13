import { describe, it, expect } from 'vitest'
import { stripDiacritics, isDiacritic } from '../../src/normalization/diacritics.js'

describe('stripDiacritics', () => {
  it('empty', () => expect(stripDiacritics('')).toBe(''))
  it('strips fatha', () => expect(stripDiacritics('عَلَم')).toBe('علم'))
  it('strips kasra', () => expect(stripDiacritics('عِلم')).toBe('علم'))
  it('strips tanween', () => expect(stripDiacritics('عِلمٌ')).toBe('علم'))
  it('strips shadda', () => expect(stripDiacritics('محمَّد')).toBe('محمد'))
  it('preserves plain letters', () => expect(stripDiacritics('پاکستان')).toBe('پاکستان'))
  it('only diacritics → empty', () => expect(stripDiacritics('\u064e\u064f\u0650')).toBe(''))
})

describe('isDiacritic', () => {
  it('fatha (U+064E) is diacritic', () => expect(isDiacritic(0x064e)).toBe(true))
  it('shadda (U+0651) is diacritic', () => expect(isDiacritic(0x0651)).toBe(true))
  it('alef (U+0627) is not diacritic', () => expect(isDiacritic(0x0627)).toBe(false))
  it('latin A is not diacritic', () => expect(isDiacritic(0x0041)).toBe(false))
})
