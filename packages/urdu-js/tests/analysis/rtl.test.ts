import { describe, it, expect } from 'vitest'
import { isRTL } from '../../src/analysis/rtl.js'

describe('isRTL', () => {
  it('empty → false', () => expect(isRTL('')).toBe(false))
  it('Urdu is RTL', () => expect(isRTL('پاکستان')).toBe(true))
  it('Arabic is RTL', () => expect(isRTL('مرحبا')).toBe(true))
  it('Latin is LTR', () => expect(isRTL('Hello')).toBe(false))
  it('digits alone → false', () => expect(isRTL('123')).toBe(false))
})
