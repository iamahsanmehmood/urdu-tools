import { describe, it, expect } from 'vitest'
import { joinCompounds, splitCompounds, isCompound } from '../../src/compound/index.js'

describe('joinCompounds', () => {
  it('joins affix compound with ZWNJ by default', () => {
    const result = joinCompounds('کتاب خانہ اچھا ہے')
    expect(result).toContain('\u200C')  // ZWNJ present
    expect(result).toContain('کتاب\u200Cخانہ')
  })

  it('joins with NBSP when specified', () => {
    const result = joinCompounds('کتاب خانہ', { binder: 'nbsp' })
    expect(result).toContain('\u00A0')
    expect(result).toBe('کتاب\u00A0خانہ')
  })

  it('joins with Word Joiner when specified', () => {
    const result = joinCompounds('کتاب خانہ', { binder: 'wj' })
    expect(result).toContain('\u2060')
    expect(result).toBe('کتاب\u2060خانہ')
  })

  it('does not modify non-compound text', () => {
    const text = 'یہ ایک جملہ ہے'
    expect(joinCompounds(text)).toBe(text)
  })

  it('returns empty string for empty input', () => {
    expect(joinCompounds('')).toBe('')
  })

  it('returns whitespace-only input unchanged', () => {
    expect(joinCompounds('   ')).toBe('   ')
  })

  it('handles prefix compound بے عزت', () => {
    const result = joinCompounds('بے عزت آدمی')
    expect(result).toContain('بے\u200Cعزت')
  })

  it('preserves non-compound spaces', () => {
    const result = joinCompounds('کتاب خانہ بہت اچھا ہے')
    // Only the space between کتاب and خانہ should be replaced
    const spaces = result.match(/ /g)
    expect(spaces).not.toBeNull()
    // There should still be regular spaces between other words
    expect(result).toContain('اچھا')
    expect(result).toContain('ہے')
  })
})

describe('splitCompounds', () => {
  it('splits ZWNJ back to space', () => {
    expect(splitCompounds('کتاب\u200Cخانہ')).toBe('کتاب خانہ')
  })

  it('splits NBSP back to space', () => {
    expect(splitCompounds('کتاب\u00A0خانہ')).toBe('کتاب خانہ')
  })

  it('splits Word Joiner back to space', () => {
    expect(splitCompounds('کتاب\u2060خانہ')).toBe('کتاب خانہ')
  })

  it('returns empty string for empty input', () => {
    expect(splitCompounds('')).toBe('')
  })

  it('does not modify text without binders', () => {
    const text = 'یہ ایک جملہ ہے'
    expect(splitCompounds(text)).toBe(text)
  })
})

describe('joinCompounds → splitCompounds round-trip', () => {
  it('round-trips for ZWNJ binder', () => {
    const original = 'کتاب خانہ بہت اچھا ہے'
    const joined = joinCompounds(original)
    const split = splitCompounds(joined)
    expect(split).toBe(original)
  })

  it('round-trips for NBSP binder', () => {
    const original = 'باغ بان خوش ہے'
    const joined = joinCompounds(original, { binder: 'nbsp' })
    const split = splitCompounds(joined)
    expect(split).toBe(original)
  })
})

describe('isCompound', () => {
  it('detects affix compound pair', () => {
    const result = isCompound('کتاب', 'خانہ')
    expect(result.matched).toBe(true)
    expect(result.type).toBe('affix')
  })

  it('detects prefix compound pair', () => {
    const result = isCompound('بے', 'عزت')
    expect(result.matched).toBe(true)
    expect(result.type).toBe('affix')
  })

  it('detects izafat with zer', () => {
    const result = isCompound('کتابِ', 'حسنہ')
    expect(result.matched).toBe(true)
    expect(result.type).toBe('izafat')
  })

  it('rejects non-compound pair', () => {
    const result = isCompound('اچھا', 'آدمی')
    expect(result.matched).toBe(false)
    expect(result.type).toBeNull()
  })

  it('rejects with affix disabled', () => {
    const result = isCompound('کتاب', 'خانہ', { affix: false })
    expect(result.matched).toBe(false)
  })
})
