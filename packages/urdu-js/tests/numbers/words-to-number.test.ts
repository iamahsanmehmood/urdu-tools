import { describe, it, expect } from 'vitest'
import { wordsToNumber } from '../../src/numbers/words-to-number.js'

describe('wordsToNumber', () => {
  it('صفر → 0n', () => expect(wordsToNumber('صفر')).toBe(0n))
  it('ایک → 1n', () => expect(wordsToNumber('ایک')).toBe(1n))
  it('دس → 10n', () => expect(wordsToNumber('دس')).toBe(10n))
  it('ننانوے → 99n', () => expect(wordsToNumber('ننانوے')).toBe(99n))
  it('منفی پانچ → -5n', () => expect(wordsToNumber('منفی پانچ')).toBe(-5n))
  it('unknown → null', () => expect(wordsToNumber('xyz')).toBeNull())
  it('empty → null', () => expect(wordsToNumber('')).toBeNull())
})
