import { describe, it, expect } from 'vitest'
import { toUrduNumerals, fromUrduNumerals } from '../../src/numbers/numerals.js'

describe('toUrduNumerals', () => {
  it('0 → ۰', () => expect(toUrduNumerals(0)).toBe('۰'))
  it('9 → ۹', () => expect(toUrduNumerals(9)).toBe('۹'))
  it('123 → ۱۲۳', () => expect(toUrduNumerals(123)).toBe('۱۲۳'))
})

describe('fromUrduNumerals', () => {
  it('empty', () => expect(fromUrduNumerals('')).toBe(''))
  it('۱۲۳ → 123', () => expect(fromUrduNumerals('۱۲۳')).toBe('123'))
  it('mixed text preserved', () => expect(fromUrduNumerals('abc۱')).toBe('abc1'))
})
