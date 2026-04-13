export function removeKashida(text: string): string {
  return text.replace(/\u0640/g, '')
}
