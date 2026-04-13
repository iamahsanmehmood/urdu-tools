export function reverse(text: string): string {
  if (!text.trim()) return text
  return text.split(/(\s+)/).reverse().join('')
}
