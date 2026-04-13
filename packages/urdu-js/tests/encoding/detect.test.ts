import { describe, it, expect } from 'vitest'
import { detectEncoding } from '../../src/encoding/inpage/detect.js'

describe('detectEncoding', () => {
  it('UTF-16 LE BOM detected', () => {
    expect(detectEncoding(new Uint8Array([0xff, 0xfe, 0x00, 0x00]))).toBe('utf-16le')
  })
  it('UTF-16 BE BOM detected', () => {
    expect(detectEncoding(new Uint8Array([0xfe, 0xff, 0x00, 0x00]))).toBe('utf-16be')
  })
  it('UTF-8 BOM detected', () => {
    expect(detectEncoding(new Uint8Array([0xef, 0xbb, 0xbf, 0x61]))).toBe('utf-8')
  })
  it('high 0x04 density → inpage-v1v2', () => {
    // 20 bytes: 12 are 0x04 → density > 0.05
    const buf = new Uint8Array(20).fill(0x04)
    expect(detectEncoding(buf)).toBe('inpage-v1v2')
  })
  it('high Urdu UTF-16LE density → inpage-v3', () => {
    // pairs where second byte is 0x06 (Urdu block)
    const buf = new Uint8Array([0x27, 0x06, 0x27, 0x06, 0x27, 0x06, 0x27, 0x06, 0x27, 0x06,
                                 0x27, 0x06, 0x27, 0x06, 0x27, 0x06, 0x27, 0x06, 0x27, 0x06])
    expect(detectEncoding(buf)).toBe('inpage-v3')
  })
  it('plain ASCII defaults to utf-8', () => {
    const buf = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f])
    expect(detectEncoding(buf)).toBe('utf-8')
  })
  it('empty buffer defaults to utf-8', () => {
    expect(detectEncoding(new Uint8Array([]))).toBe('utf-8')
  })
  it('single-byte buffer defaults to utf-8', () => {
    expect(detectEncoding(new Uint8Array([0x61]))).toBe('utf-8')
  })
})
