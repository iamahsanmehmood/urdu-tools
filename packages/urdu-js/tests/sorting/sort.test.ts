import { describe, it, expect } from 'vitest'
import { sort, compare } from '../../src/sorting/sort.js'

describe('compare', () => {
  it('ا before ب', () => expect(compare('ا', 'ب')).toBeLessThan(0))
  it('ب before پ', () => expect(compare('ب', 'پ')).toBeLessThan(0))
  it('ک before گ', () => expect(compare('ک', 'گ')).toBeLessThan(0))
  it('ن before ں', () => expect(compare('ن', 'ں')).toBeLessThan(0))
  it('ی before ے', () => expect(compare('ی', 'ے')).toBeLessThan(0))
  it('equal words → 0', () => expect(compare('علم', 'علم')).toBe(0))
  it('diacritics ignored in comparison', () => expect(compare('عِلمٌ', 'علم')).toBe(0))
})

describe('sort', () => {
  it('empty array', () => expect(sort([])).toEqual([]))
  it('single element', () => expect(sort(['پاکستان'])).toEqual(['پاکستان']))
  it('basic alphabet order', () => expect(sort(['ے','ا','ک','ب'])).toEqual(['ا','ب','ک','ے']))
  it('stable for equal keys', () => expect(sort(['علم','علم'])).toEqual(['علم','علم']))
})
