import { describe, it, expect } from 'vitest'
import { decodeInpage } from '../../src/encoding/inpage/decoder.js'

describe('decodeInpage v1', () => {
  it('empty buffer → no paragraphs', () => {
    expect(decodeInpage(new Uint8Array([]), 'v1').paragraphs).toHaveLength(0)
  })
  it('decodes alef: 0x04 0x81 → ا', () => {
    expect(decodeInpage(new Uint8Array([0x04, 0x81]), 'v1').paragraphs[0]).toBe('\u0627')
  })
  it('decodes پ: 0x04 0x83 → پ', () => {
    expect(decodeInpage(new Uint8Array([0x04, 0x83]), 'v1').paragraphs[0]).toBe('\u067e')
  })
  it('page break 0x0C creates break index', () => {
    const r = decodeInpage(new Uint8Array([0x04, 0x81, 0x0c, 0x04, 0x82]), 'v1')
    expect(r.pageBreakIndices).toHaveLength(1)
    expect(r.paragraphs).toHaveLength(2)
  })
  it('newline 0x0A splits paragraphs', () => {
    const r = decodeInpage(new Uint8Array([0x04, 0x81, 0x0a, 0x04, 0x82]), 'v1')
    expect(r.paragraphs).toHaveLength(2)
  })
  it('ASCII chars pass through', () => {
    const buf = new Uint8Array([0x48, 0x69]) // "Hi"
    expect(decodeInpage(buf, 'v1').paragraphs[0]).toBe('Hi')
  })
  it('space byte 0x20 is preserved', () => {
    const r = decodeInpage(new Uint8Array([0x04, 0x81, 0x20, 0x04, 0x81]), 'v1')
    expect(r.paragraphs[0]).toBe('\u0627 \u0627')
  })
  it('carriage return 0x0D splits paragraphs', () => {
    const r = decodeInpage(new Uint8Array([0x04, 0x81, 0x0d, 0x04, 0x81]), 'v1')
    expect(r.paragraphs).toHaveLength(2)
  })
  it('unknown byte is skipped without crash', () => {
    const r = decodeInpage(new Uint8Array([0xff, 0x04, 0x81]), 'v1')
    expect(r.paragraphs[0]).toBe('\u0627')
  })
})

describe('decodeInpage v3', () => {
  it('empty buffer → no paragraphs', () => {
    expect(decodeInpage(new Uint8Array([]), 'v3').paragraphs).toHaveLength(0)
  })
  it('decodes UTF-16LE Urdu codepoint', () => {
    // U+0627 (alef) in UTF-16LE = 0x27 0x06
    const r = decodeInpage(new Uint8Array([0x27, 0x06]), 'v3')
    expect(r.paragraphs[0]).toBe('\u0627')
  })
  it('0x000D splits paragraphs in v3', () => {
    // alef + CR + alef in UTF-16LE
    const r = decodeInpage(new Uint8Array([0x27, 0x06, 0x0d, 0x00, 0x28, 0x06]), 'v3')
    expect(r.paragraphs).toHaveLength(2)
  })
  it('0x000C creates page break in v3', () => {
    const r = decodeInpage(new Uint8Array([0x27, 0x06, 0x0c, 0x00, 0x28, 0x06]), 'v3')
    expect(r.pageBreakIndices).toHaveLength(1)
  })
  it('0xFFFF paragraph marker splits in v3', () => {
    const r = decodeInpage(new Uint8Array([0x27, 0x06, 0xff, 0xff, 0x28, 0x06]), 'v3')
    expect(r.paragraphs).toHaveLength(2)
  })
})

describe('decodeInpage auto', () => {
  it('high 0x04 density → v1 decode', () => {
    const buf = new Uint8Array(20).fill(0x04)
    // should not throw, auto-detects v1
    expect(() => decodeInpage(buf, 'auto')).not.toThrow()
  })
  it('low 0x04 density → v3 decode produces Urdu text', () => {
    // UTF-16LE: alef (0x27 0x06) + ba (0x28 0x06)
    const buf = new Uint8Array([0x27, 0x06, 0x28, 0x06])
    expect(decodeInpage(buf, 'auto').paragraphs[0]).toBe('\u0627\u0628')
  })
})
