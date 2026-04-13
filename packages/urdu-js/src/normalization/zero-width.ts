export function stripZeroWidth(text: string): string {
  return text.replace(/[\u200c\u200d\u00ad]/g, '')
}
