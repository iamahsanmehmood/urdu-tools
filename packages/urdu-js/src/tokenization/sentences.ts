export function sentences(text: string): string[] {
  if (!text) return []
  return text.split(/[\u06d4\u061f!]+/).map(s => s.trim()).filter(s => s.length > 0)
}
