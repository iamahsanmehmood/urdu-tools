import type { NumeralTarget } from '../types.js'

export function normalizeNumerals(text: string, target: NumeralTarget): string {
  return text.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, ch => {
    const digit = ch.codePointAt(0)! & 0xf
    if (target === 'ascii') return String(digit)
    if (target === 'arabic-indic') return String.fromCodePoint(0x0660 + digit)
    return String.fromCodePoint(0x06f0 + digit)
  })
}

export function toUrduNumerals(n: number | bigint | string): string {
  return String(n).replace(/[0-9]/g, d => String.fromCodePoint(0x06f0 + Number(d)))
}

export function fromUrduNumerals(text: string): string {
  return text.replace(/[\u06f0-\u06f9]/g, ch => String(ch.codePointAt(0)! - 0x06f0))
}
