import { describe, it, expect } from 'vitest'
import { normalize } from '../../src/normalization/normalize.js'

describe('normalize', () => {
  it('empty string returns empty', () => expect(normalize('')).toBe(''))
  it('NFC: alif + madda sign → آ', () => expect(normalize('\u0627\u0653')).toBe('\u0622'))
  it('NBSP → space', () => expect(normalize('کتاب\u00a0ہے')).toBe('کتاب ہے'))
  it('strips diacritics by default', () => expect(normalize('عِلمٌ')).toBe('علم'))
  it('extended arabic-indic → ASCII', () => expect(normalize('۱۲۳')).toBe('123'))
  it('arabic-indic → ASCII', () => expect(normalize('\u0661\u0662\u0663')).toBe('123'))
  it('strips ZWNJ', () => expect(normalize('علم\u200cہے')).toBe('علمہے'))
  it('strips ZWJ', () => expect(normalize('علم\u200dہے')).toBe('علمہے'))
  it('normalizes hamza-on-alif to alef', () => expect(normalize('\u0623')).toBe('\u0627'))
  it('normalizes hamza-on-wao to wao', () => expect(normalize('\u0624')).toBe('\u0648'))
  it('clean urdu text unchanged', () => expect(normalize('پاکستان')).toBe('پاکستان'))
  it('only diacritics → empty string', () => expect(normalize('\u064e\u0650\u064f')).toBe(''))
  it('mixed script preserves latin', () => expect(normalize('Hello پاکستان')).toBe('Hello پاکستان'))
  it('option: disable diacritics stripping', () => expect(normalize('عِلمٌ', { diacritics: false })).toBe('عِلمٌ'))
  it('option: kashida removal', () => expect(normalize('ک\u0640تاب', { kashida: true })).toBe('کتاب'))
  it('long text processes under 500ms', () => {
    const long = 'پاکستان '.repeat(6250)
    const t0 = performance.now()
    normalize(long)
    expect(performance.now() - t0).toBeLessThan(500)
  })
})
