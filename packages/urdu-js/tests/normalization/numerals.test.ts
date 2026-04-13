import { describe, it, expect } from 'vitest'
import { normalizeNumerals, toUrduNumerals, fromUrduNumerals } from '../../src/normalization/numerals.js'

describe('normalizeNumerals', () => {
  it('extended arabic-indic → ascii', () => expect(normalizeNumerals('۱۲۳', 'ascii')).toBe('123'))
  it('arabic-indic → ascii', () => expect(normalizeNumerals('\u0661\u0662', 'ascii')).toBe('12'))
  it('ascii unchanged when target is extended-arabic-indic', () => expect(normalizeNumerals('abc', 'extended-arabic-indic')).toBe('abc'))
  it('ascii unchanged when target is arabic-indic', () => expect(normalizeNumerals('abc', 'arabic-indic')).toBe('abc'))
  it('mixed numerals → ascii', () => expect(normalizeNumerals('1۲\u0663', 'ascii')).toBe('123'))
  it('empty', () => expect(normalizeNumerals('', 'ascii')).toBe(''))
})

describe('toUrduNumerals', () => {
  it('0 → ۰', () => expect(toUrduNumerals(0)).toBe('۰'))
  it('9 → ۹', () => expect(toUrduNumerals(9)).toBe('۹'))
  it('123 → ۱۲۳', () => expect(toUrduNumerals(123)).toBe('۱۲۳'))
})

describe('fromUrduNumerals', () => {
  it('empty', () => expect(fromUrduNumerals('')).toBe(''))
  it('۰ → 0', () => expect(fromUrduNumerals('۰')).toBe('0'))
  it('۱۲۳ → 123', () => expect(fromUrduNumerals('۱۲۳')).toBe('123'))
  it('mixed text', () => expect(fromUrduNumerals('abc۱')).toBe('abc1'))
})
