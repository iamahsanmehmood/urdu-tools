export function pad(text: string, length: number, char = ' ', direction: 'start' | 'end' = 'start'): string {
  const needed = length - [...text].length
  if (needed <= 0) return text
  const padding = char.repeat(needed)
  return direction === 'start' ? padding + text : text + padding
}
