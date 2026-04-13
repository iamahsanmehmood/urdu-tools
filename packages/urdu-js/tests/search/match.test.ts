import { describe, it, expect } from 'vitest'
import { match, fuzzyMatch, getAllNormalizations } from '../../src/search/match.js'

describe('match', () => {
  it('exact match returns matched=true', () => {
    expect(match('علم', 'علم').matched).toBe(true)
  })
  it('no match returns matched=false', () => {
    expect(match('علم', 'کتاب').matched).toBe(false)
  })
  it('diacritics layer matches stripped forms', () => {
    const r = match('عِلمٌ', 'علم')
    expect(r.matched).toBe(true)
    expect(r.layer).toBe('strip-diacritics')
  })
  it('hamza layer normalizes', () => {
    const r = match('\u0623حمد', 'احمد')
    expect(r.matched).toBe(true)
  })
  it('exact layer is first check', () => {
    const r = match('کتاب', 'کتاب')
    expect(r.layer).toBe('exact')
  })
})

describe('getAllNormalizations', () => {
  it('returns at least the original form', () => {
    expect(getAllNormalizations('علم').length).toBeGreaterThan(0)
  })
  it('first element is always the raw input', () => {
    expect(getAllNormalizations('عِلمٌ')[0]).toBe('عِلمٌ')
  })
  it('stripped form is included for word with diacritics', () => {
    const forms = getAllNormalizations('عِلمٌ')
    expect(forms).toContain('علم')
  })
  it('word with ZWNJ produces form without it', () => {
    const forms = getAllNormalizations('علم\u200cہے')
    expect(forms.some(f => !f.includes('\u200c'))).toBe(true)
  })
  it('clean word returns single form (no duplicates)', () => {
    const forms = getAllNormalizations('پاکستان')
    expect(forms.length).toBe(1)
  })
})

describe('fuzzyMatch', () => {
  it('finds exact candidate', () => {
    const r = fuzzyMatch('کتاب', ['علم', 'کتاب', 'قلم'])
    expect(r?.candidate).toBe('کتاب')
  })
  it('returns null for empty candidates', () => {
    expect(fuzzyMatch('علم', [])).toBeNull()
  })
  it('returns null when no candidate scores above threshold', () => {
    expect(fuzzyMatch('پاکستان', ['hello', 'world'])).toBeNull()
  })
})
