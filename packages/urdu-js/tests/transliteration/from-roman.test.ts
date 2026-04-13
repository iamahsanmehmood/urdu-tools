import { describe, it, expect } from 'vitest'
import { fromRoman } from '../../src/transliteration/from-roman.js'

describe('fromRoman', () => {
  it('empty', () => expect(fromRoman('')).toBe(''))
  it('a → ا', () => expect(fromRoman('a')).toBe('\u0627'))
  it('b → ب', () => expect(fromRoman('b')).toBe('\u0628'))
  it('ch → چ', () => expect(fromRoman('ch')).toBe('\u0686'))
  it('sh → ش', () => expect(fromRoman('sh')).toBe('\u0634'))
  it('ay → ے', () => expect(fromRoman('ay')).toBe('\u06d2'))
  it('does not throw on unknown', () => expect(() => fromRoman('xyz123')).not.toThrow())
})
