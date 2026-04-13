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
})
