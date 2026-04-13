import { PRESENTATION_FORMS_MAP } from './unicode-data.js'

export function normalizePresentationForms(text: string): string {
  if (!text) return text
  let result = ''
  for (const ch of text) {
    const cp = ch.codePointAt(0)!
    result += PRESENTATION_FORMS_MAP.get(cp) ?? ch
  }
  return result
}
