import { describe, it, expect } from 'vitest'
import { wordCount, charCount } from '../../src/string-utils/count.js'

describe('wordCount', () => {
  it('empty → 0', () => expect(wordCount('')).toBe(0))
  it('one word → 1', () => expect(wordCount('کتاب')).toBe(1))
  it('two words → 2', () => expect(wordCount('کتاب ہے')).toBe(2))
  it('whitespace only → 0', () => expect(wordCount('   ')).toBe(0))
})

describe('charCount', () => {
  it('empty → 0', () => expect(charCount('')).toBe(0))
  it('basic count', () => expect(charCount('کتاب')).toBe(4))
  it('excludeDiacritics', () => expect(charCount('عِلم', { excludeDiacritics: true })).toBe(3))
  it('excludeWhitespace', () => expect(charCount('ک ت', { excludeWhitespace: true })).toBe(2))
})
