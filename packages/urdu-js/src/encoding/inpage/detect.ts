import type { Encoding } from '../../types.js'

export function detectEncoding(buffer: Uint8Array): Encoding {
  if (buffer.length >= 2 && buffer[0] === 0xff && buffer[1] === 0xfe) return 'utf-16le'
  if (buffer.length >= 2 && buffer[0] === 0xfe && buffer[1] === 0xff) return 'utf-16be'
  if (buffer.length >= 3 && buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf) return 'utf-8'
  const sample = buffer.slice(0, Math.min(512, buffer.length))
  let inpageCount = 0
  for (const b of sample) if (b === 0x04) inpageCount++
  if (inpageCount / Math.max(sample.length, 1) > 0.05) return 'inpage-v1v2'
  let urduCount = 0
  for (let i = 0; i + 1 < sample.length; i += 2) if (sample[i + 1] === 0x06) urduCount++
  if (urduCount / Math.max(sample.length / 2, 1) > 0.1) return 'inpage-v3'
  return 'utf-8'
}
