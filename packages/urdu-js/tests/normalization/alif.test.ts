import { describe, it, expect } from 'vitest'
import { normalizeAlif } from '../../src/normalization/alif.js'

describe('normalizeAlif', () => {
  it('empty', () => expect(normalizeAlif('')).toBe(''))
  it('آ (U+0622) → ا', () => expect(normalizeAlif('\u0622')).toBe('\u0627'))
  it('أ (U+0623) → ا', () => expect(normalizeAlif('\u0623')).toBe('\u0627'))
  it('إ (U+0625) → ا', () => expect(normalizeAlif('\u0625')).toBe('\u0627'))
  it('alif wasla (U+0671) → ا', () => expect(normalizeAlif('\u0671')).toBe('\u0627'))
  it('plain alef (U+0627) unchanged', () => expect(normalizeAlif('\u0627')).toBe('\u0627'))
  it('word with multiple alif variants', () => expect(normalizeAlif('أحمد')).toBe('احمد'))
})
