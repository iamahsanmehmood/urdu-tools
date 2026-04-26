import { describe, it, expect } from 'vitest'
import { detectIzafatCompounds } from '../../src/compound/detect-izafat.js'
import { detectCompounds } from '../../src/compound/index.js'

describe('detectIzafatCompounds', () => {
  it('detects izafat with zer: کتابِ حسنہ', () => {
    const spans = detectIzafatCompounds(['کتابِ', 'حسنہ'])
    expect(spans).toHaveLength(1)
    expect(spans[0]!.type).toBe('izafat')
    expect(spans[0]!.components).toEqual(['کتابِ', 'حسنہ'])
  })

  it('detects izafat when zer (U+0650) is at end of word', () => {
    const wordWithZer = 'علم\u0650'  // علمِ
    const spans = detectIzafatCompounds([wordWithZer, 'حقیقت'])
    expect(spans).toHaveLength(1)
    expect(spans[0]!.type).toBe('izafat')
  })

  it('detects hamza-above izafat: word ending with ٔ', () => {
    const wordWithHamza = 'بچ\u0654'  // بچّۂ
    const spans = detectIzafatCompounds([wordWithHamza, 'مکتب'])
    expect(spans).toHaveLength(1)
    expect(spans[0]!.type).toBe('izafat')
  })

  it('detects vav-e-atf: علم و عمل', () => {
    const spans = detectIzafatCompounds(['علم', '\u0648', 'عمل'])
    expect(spans).toHaveLength(1)
    expect(spans[0]!.type).toBe('izafat')
    expect(spans[0]!.components).toEqual(['علم', '\u0648', 'عمل'])
    expect(spans[0]!.start).toBe(0)
    expect(spans[0]!.end).toBe(2)
  })

  it('detects vav-e-atf: صبر و شکر', () => {
    const spans = detectIzafatCompounds(['صبر', '\u0648', 'شکر'])
    expect(spans).toHaveLength(1)
    expect(spans[0]!.text).toBe('صبر \u0648 شکر')
  })

  it('does not merge vav-e-atf without following word', () => {
    const spans = detectIzafatCompounds(['علم', '\u0648'])
    expect(spans).toHaveLength(0)
  })

  it('does not merge words without izafat marker', () => {
    const spans = detectIzafatCompounds(['کتاب', 'قلم'])
    expect(spans).toHaveLength(0)
  })

  it('returns empty for single word', () => {
    expect(detectIzafatCompounds(['علم'])).toEqual([])
  })

  it('returns empty for empty list', () => {
    expect(detectIzafatCompounds([])).toEqual([])
  })

  it('detects izafat in longer sentence', () => {
    const wordWithZer = 'کتابِ'  // contains zer
    const spans = detectIzafatCompounds([wordWithZer, 'حسنہ', 'بہت', 'اچھی', 'ہے'])
    expect(spans).toHaveLength(1)
    expect(spans[0]!.start).toBe(0)
    expect(spans[0]!.end).toBe(1)
  })
})

describe('detectCompounds with izafat', () => {
  it('detects izafat compound in running text with zer', () => {
    const text = 'کتابِ حسنہ بہت اچھی ہے'
    const spans = detectCompounds(text, { affix: false, izafat: true })
    expect(spans.length).toBeGreaterThanOrEqual(1)
    expect(spans[0]!.type).toBe('izafat')
  })

  it('detects vav-e-atf in running text', () => {
    const text = 'علم و عمل ضروری ہے'
    const spans = detectCompounds(text, { affix: false, izafat: true })
    expect(spans.length).toBeGreaterThanOrEqual(1)
    expect(spans[0]!.type).toBe('izafat')
  })

  it('izafat disabled returns empty', () => {
    const text = 'کتابِ حسنہ'
    const spans = detectCompounds(text, { affix: false, izafat: false })
    expect(spans).toHaveLength(0)
  })
})
