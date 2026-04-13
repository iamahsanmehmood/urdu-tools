import { describe, it, expect } from 'vitest'
import { pad } from '../../src/string-utils/pad.js'

describe('pad', () => {
  it('pads start by default', () => {
    expect(pad('علم', 5)).toBe('  علم')
  })
  it('pads end when direction is end', () => {
    expect(pad('علم', 5, ' ', 'end')).toBe('علم  ')
  })
  it('custom padding character', () => {
    expect(pad('علم', 5, '-')).toBe('--علم')
  })
  it('no padding when length already met', () => {
    expect(pad('علم', 3)).toBe('علم')
  })
  it('no padding when text longer than target', () => {
    expect(pad('پاکستان', 3)).toBe('پاکستان')
  })
  it('empty string padded to length', () => {
    expect(pad('', 3)).toBe('   ')
  })
  it('counts by codepoints not bytes', () => {
    // 'پ' is a single codepoint but multi-byte; pad to 4 → 3 spaces + پ
    expect(pad('پ', 4)).toBe('   پ')
  })
})
