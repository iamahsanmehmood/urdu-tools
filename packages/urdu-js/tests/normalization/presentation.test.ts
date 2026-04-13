import { describe, it, expect } from 'vitest'
import { normalizePresentationForms } from '../../src/normalization/presentation.js'

describe('normalizePresentationForms', () => {
  it('empty string returns empty', () => {
    expect(normalizePresentationForms('')).toBe('')
  })
  it('plain Urdu text passes through unchanged', () => {
    expect(normalizePresentationForms('پاکستان')).toBe('پاکستان')
  })
  it('presentation form ﻻ (U+FEFB) → لا', () => {
    // ARABIC LIGATURE LAM WITH ALEF ISOLATED FORM → lam + alef
    expect(normalizePresentationForms('\ufefb')).toBe('\u0644\u0627')
  })
  it('presentation form ﺎ (U+FE8E) → ا', () => {
    // ARABIC LETTER ALEF FINAL FORM → alef
    expect(normalizePresentationForms('\ufe8e')).toBe('\u0627')
  })
  it('mixed text: presentation form in sentence is normalized', () => {
    const result = normalizePresentationForms('کتاب\ufe8eہے')
    expect(result).toContain('\u0627')
    expect(result).not.toContain('\ufe8e')
  })
  it('characters outside presentation range pass through', () => {
    expect(normalizePresentationForms('علم')).toBe('علم')
  })
})
