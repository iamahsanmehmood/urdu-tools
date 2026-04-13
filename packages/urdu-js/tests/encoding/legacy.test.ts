import { describe, it, expect } from 'vitest'
import { convertWindows1256ToUnicode } from '../../src/encoding/legacy.js'

describe('convertWindows1256ToUnicode', () => {
  it('empty string returns empty', () => {
    expect(convertWindows1256ToUnicode('')).toBe('')
  })
  it('pure ASCII is unchanged', () => {
    expect(convertWindows1256ToUnicode('Hello')).toBe('Hello')
  })
  it('byte 0x81 maps to پ (U+067E)', () => {
    // 0x81 = index 1 in WIN1256_UPPER → 0x067E
    expect(convertWindows1256ToUnicode('\x81')).toBe('\u067e')
  })
  it('byte 0xC1 maps to ء (U+0621)', () => {
    // 0xC1 = 193, index 193-128=65 in WIN1256_UPPER → 0x0621
    expect(convertWindows1256ToUnicode('\xc1')).toBe('\u0621')
  })
  it('byte 0xFF maps to ے (U+06D2)', () => {
    // 0xFF = 255, index 127 → 0x06D2
    expect(convertWindows1256ToUnicode('\xff')).toBe('\u06d2')
  })
  it('mixed ASCII and Win1256 bytes', () => {
    // 'H' (0x48) + hamza (0xC1 → U+0621)
    const result = convertWindows1256ToUnicode('H\xc1')
    expect(result).toBe('H\u0621')
  })
  it('byte 0x80 maps to € (U+20AC)', () => {
    expect(convertWindows1256ToUnicode('\x80')).toBe('\u20ac')
  })
})
