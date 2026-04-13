export function truncate(text: string, maxLength: number, ellipsis = '...'): string {
  if ([...text].length <= maxLength) return text
  const limit = maxLength - [...ellipsis].length
  if (limit <= 0) return ellipsis
  const words = text.split(/(\s+)/)
  let result = ''
  for (const w of words) {
    if ([...(result + w)].length > limit) break
    result += w
  }
  const trimmed = result.trimEnd()
  return (trimmed || [...text].slice(0, limit).join('')) + ellipsis
}
