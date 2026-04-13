import type { InpageDecodeResult, InpageVersion } from '../../types.js'
import { INPAGE_V1V2_MAP } from './char-maps.js'

export function decodeInpage(buffer: Uint8Array, version: InpageVersion = 'auto'): InpageDecodeResult {
  const v = version === 'auto' ? detectVersion(buffer) : version
  return v === 'v3' ? decodeV3(buffer) : decodeV1V2(buffer)
}

function detectVersion(buffer: Uint8Array): 'v1' | 'v3' {
  const sample = buffer.slice(0, Math.min(512, buffer.length))
  let count = 0
  for (const b of sample) if (b === 0x04) count++
  return count / Math.max(sample.length, 1) > 0.05 ? 'v1' : 'v3'
}

function decodeV1V2(buffer: Uint8Array): InpageDecodeResult {
  const paragraphs: string[] = []
  const pageBreakIndices: number[] = []
  let current = ''
  let i = 0
  while (i < buffer.length) {
    const b = buffer[i]!
    if (b === 0x0c) {
      if (current.trim()) { paragraphs.push(current.trim()); current = '' }
      pageBreakIndices.push(paragraphs.length); i++
    } else if (b === 0x0a || b === 0x0d) {
      if (current.trim()) { paragraphs.push(current.trim()); current = '' }
      i++
    } else if (b === 0x04 && i + 1 < buffer.length) {
      const ch = INPAGE_V1V2_MAP.get(buffer[i + 1]!)
      if (ch) current += ch
      i += 2
    } else if (b === 0x20) {
      current += ' '; i++
    } else if (b >= 0x21 && b <= 0x7e) {
      current += String.fromCharCode(b); i++
    } else { i++ }
  }
  if (current.trim()) paragraphs.push(current.trim())
  return { paragraphs, pageBreakIndices, filteredCount: 0 }
}

function decodeV3(buffer: Uint8Array): InpageDecodeResult {
  const paragraphs: string[] = []
  const pageBreakIndices: number[] = []
  let current = ''
  for (let i = 0; i + 1 < buffer.length; i += 2) {
    const cu = buffer[i]! | (buffer[i + 1]! << 8)
    if (cu === 0x000c) {
      if (current.trim()) { paragraphs.push(current.trim()); current = '' }
      pageBreakIndices.push(paragraphs.length)
    } else if (cu === 0x000d || cu === 0x000a || cu === 0xffff) {
      if (current.trim()) { paragraphs.push(current.trim()); current = '' }
    } else if (cu >= 0x0020) {
      current += String.fromCharCode(cu)
    }
  }
  if (current.trim()) paragraphs.push(current.trim())
  return { paragraphs, pageBreakIndices, filteredCount: 0 }
}
