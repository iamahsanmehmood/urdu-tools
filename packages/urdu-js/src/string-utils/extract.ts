export function extractUrdu(text: string): string[] {
  const segments: string[] = []
  let current = ''
  for (const ch of text) {
    const cp = ch.codePointAt(0) ?? 0
    const isUrdu =
      (cp >= 0x0600 && cp <= 0x06ff) ||
      (cp >= 0x0750 && cp <= 0x077f) ||
      (cp >= 0xfb50 && cp <= 0xfdff) ||
      (cp >= 0xfe70 && cp <= 0xfeff)
    if (isUrdu) {
      current += ch
    } else if (ch === ' ' && current) {
      current += ch
    } else {
      const t = current.trim()
      if (t) segments.push(t)
      current = ''
    }
  }
  const t = current.trim()
  if (t) segments.push(t)
  return segments
}
