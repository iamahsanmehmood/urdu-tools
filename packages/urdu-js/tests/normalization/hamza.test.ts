import { describe, it, expect } from 'vitest'
import { normalizeHamza } from '../../src/normalization/hamza.js'

describe('normalizeHamza', () => {
  it('empty', () => expect(normalizeHamza('')).toBe(''))
  it('أ (U+0623) → ا', () => expect(normalizeHamza('\u0623')).toBe('\u0627'))
  it('ؤ (U+0624) → و', () => expect(normalizeHamza('\u0624')).toBe('\u0648'))
  it('isolated hamza (U+0621) unchanged', () => expect(normalizeHamza('\u0621')).toBe('\u0621'))
  it('ئ (U+0626) unchanged', () => expect(normalizeHamza('\u0626')).toBe('\u0626'))
})
