import { describe, it, expect } from 'vitest'
import { numberToWords } from '../../src/numbers/number-to-words.js'

describe('numberToWords', () => {
  it('0 → صفر', () => expect(numberToWords(0n)).toBe('صفر'))
  it('1 → ایک', () => expect(numberToWords(1n)).toBe('ایک'))
  it('10 → دس', () => expect(numberToWords(10n)).toBe('دس'))
  it('20 → بیس', () => expect(numberToWords(20n)).toBe('بیس'))
  it('99 → ننانوے', () => expect(numberToWords(99n)).toBe('ننانوے'))
  it('100 → ایک سو', () => expect(numberToWords(100n)).toBe('ایک سو'))
  it('200 → دو سو', () => expect(numberToWords(200n)).toBe('دو سو'))
  it('1000 → ایک ہزار', () => expect(numberToWords(1000n)).toBe('ایک ہزار'))
  it('100000 → ایک لاکھ', () => expect(numberToWords(100_000n)).toBe('ایک لاکھ'))
  it('10000000 → ایک کروڑ', () => expect(numberToWords(10_000_000n)).toBe('ایک کروڑ'))
  it('1000000000 → ایک ارب', () => expect(numberToWords(1_000_000_000n)).toBe('ایک ارب'))
  it('negative → منفی prefix', () => expect(numberToWords(-5n)).toBe('منفی پانچ'))
  it('number input', () => expect(numberToWords(5)).toBe('پانچ'))
  it('ordinal m 1 → پہلا', () => expect(numberToWords(1n, { ordinal: true })).toBe('پہلا'))
  it('ordinal f 1 → پہلی', () => expect(numberToWords(1n, { ordinal: true, gender: 'feminine' })).toBe('پہلی'))
  it('ordinal m 2 → دوسرا', () => expect(numberToWords(2n, { ordinal: true })).toBe('دوسرا'))
  it('ordinal 11 → گیارہواں', () => expect(numberToWords(11n, { ordinal: true })).toBe('گیارہواں'))
})
