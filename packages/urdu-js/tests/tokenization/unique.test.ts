import { describe, it, expect } from 'vitest'
import { unique } from '../../src/tokenization/unique.js'

describe('unique', () => {
  it('empty array returns empty array', () => {
    expect(unique([])).toEqual([])
  })
  it('no duplicates returns same tokens', () => {
    expect(unique(['علم', 'ادب', 'کتاب'])).toEqual(['علم', 'ادب', 'کتاب'])
  })
  it('exact duplicates are deduplicated', () => {
    expect(unique(['علم', 'علم', 'ادب'])).toEqual(['علم', 'ادب'])
  })
  it('diacritic variants are treated as duplicates', () => {
    // عِلمٌ normalizes to علم, same as علم
    const result = unique(['عِلمٌ', 'علم'])
    expect(result).toHaveLength(1)
  })
  it('preserves first occurrence of normalized duplicate', () => {
    const result = unique(['عِلمٌ', 'علم'])
    expect(result[0]).toBe('عِلمٌ')
  })
  it('different words kept separate', () => {
    const result = unique(['پاکستان', 'ہندوستان'])
    expect(result).toHaveLength(2)
  })
  it('large token list with duplicates', () => {
    const tokens = Array(100).fill('علم').concat(['ادب'])
    expect(unique(tokens)).toHaveLength(2)
  })
})
