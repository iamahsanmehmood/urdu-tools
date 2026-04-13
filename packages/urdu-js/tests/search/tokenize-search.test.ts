import { describe, it, expect } from 'vitest'
import { tokenizeForSearch } from '../../src/search/tokenize-search.js'

describe('tokenizeForSearch', () => {
  it('empty string returns empty array', () => {
    expect(tokenizeForSearch('')).toEqual([])
  })
  it('single word returns single token', () => {
    expect(tokenizeForSearch('علم')).toEqual(['علم'])
  })
  it('splits on spaces', () => {
    const tokens = tokenizeForSearch('علم اور ادب')
    expect(tokens).toHaveLength(3)
    expect(tokens).toContain('علم')
  })
  it('splits on Arabic comma U+060C', () => {
    const tokens = tokenizeForSearch('علم،ادب')
    expect(tokens).toHaveLength(2)
  })
  it('splits on Arabic semicolon U+061B', () => {
    const tokens = tokenizeForSearch('علم؛ادب')
    expect(tokens).toHaveLength(2)
  })
  it('strips diacritics from tokens', () => {
    const tokens = tokenizeForSearch('عِلمٌ')
    expect(tokens[0]).toBe('علم')
  })
  it('filters empty tokens after trimming', () => {
    const tokens = tokenizeForSearch('  علم  ')
    expect(tokens).toHaveLength(1)
    expect(tokens[0]).toBe('علم')
  })
  it('long sentence tokenizes all words', () => {
    const tokens = tokenizeForSearch('پاکستان کا قومی ترانہ بہت خوبصورت ہے')
    expect(tokens.length).toBeGreaterThan(4)
  })
})
