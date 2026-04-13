import { describe, it, expect } from 'vitest'
import { extractUrdu } from '../../src/string-utils/extract.js'

describe('extractUrdu', () => {
  it('empty string returns empty array', () => {
    expect(extractUrdu('')).toEqual([])
  })
  it('pure Urdu text returns single segment', () => {
    expect(extractUrdu('پاکستان')).toEqual(['پاکستان'])
  })
  it('pure Latin text returns empty array', () => {
    expect(extractUrdu('Hello World')).toEqual([])
  })
  it('mixed text extracts only Urdu segments', () => {
    const segs = extractUrdu('Hello پاکستان World')
    expect(segs).toHaveLength(1)
    expect(segs[0]).toBe('پاکستان')
  })
  it('two Urdu segments separated by Latin', () => {
    const segs = extractUrdu('علم foo ادب')
    expect(segs).toHaveLength(2)
    expect(segs).toContain('علم')
    expect(segs).toContain('ادب')
  })
  it('Urdu with trailing Latin produces trimmed segment', () => {
    const segs = extractUrdu('کتاب123')
    expect(segs[0]).toBe('کتاب')
  })
  it('handles presentation forms range (FB50–FDFF)', () => {
    const segs = extractUrdu('\ufe8e') // ARABIC LETTER ALEF FINAL FORM
    expect(segs).toHaveLength(1)
  })
})
