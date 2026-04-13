export function normalizeHamza(text: string): string {
  return text.replace(/\u0623/g, '\u0627').replace(/\u0624/g, '\u0648')
}
