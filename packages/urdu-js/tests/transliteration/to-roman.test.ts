import { describe, it, expect } from 'vitest'
import { toRoman } from '../../src/transliteration/to-roman.js'

describe('toRoman', () => {
  it('empty', () => expect(toRoman('')).toBe(''))
  it('ا → a', () => expect(toRoman('\u0627')).toBe('a'))
  it('ب → b', () => expect(toRoman('\u0628')).toBe('b'))
  it('پ → p', () => expect(toRoman('\u067e')).toBe('p'))
  it('چ → ch', () => expect(toRoman('\u0686')).toBe('ch'))
  it('ش → sh', () => expect(toRoman('\u0634')).toBe('sh'))
  it('digraph بھ → bh', () => expect(toRoman('\u0628\u06be')).toBe('bh'))
  it('digraph چھ → chh', () => expect(toRoman('\u0686\u06be')).toBe('chh'))
  it('non-urdu chars pass through', () => expect(toRoman('Hello')).toBe('Hello'))
})
