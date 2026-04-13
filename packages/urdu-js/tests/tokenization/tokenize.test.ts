import { describe, it, expect } from 'vitest'
import { tokenize } from '../../src/tokenization/tokenize.js'

describe('tokenize', () => {
  it('empty → []', () => expect(tokenize('')).toEqual([]))
  it('single Urdu word', () => {
    const t = tokenize('کتاب')
    expect(t).toHaveLength(1)
    expect(t[0]?.text).toBe('کتاب')
    expect(t[0]?.type).toBe('urdu-word')
  })
  it('two words with space', () => {
    const words = tokenize('کتاب ہے').filter(t => t.type !== 'whitespace')
    expect(words).toHaveLength(2)
  })
  it('Latin word classified as latin-word', () => {
    expect(tokenize('Hello')[0]?.type).toBe('latin-word')
  })
  it('numeral classified as numeral', () => {
    expect(tokenize('123')[0]?.type).toBe('numeral')
  })
})
