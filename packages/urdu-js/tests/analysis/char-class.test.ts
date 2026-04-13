import { describe, it, expect } from 'vitest'
import { isUrduChar, isUrduText, classifyChar } from '../../src/analysis/char-class.js'

describe('isUrduChar', () => {
  it('پ is Urdu', () => expect(isUrduChar('پ')).toBe(true))
  it('ک is Urdu', () => expect(isUrduChar('ک')).toBe(true))
  it('ے is Urdu', () => expect(isUrduChar('ے')).toBe(true))
  it('ب is not Urdu-specific', () => expect(isUrduChar('ب')).toBe(false))
  it('A is not Urdu', () => expect(isUrduChar('A')).toBe(false))
  it('۱ (urdu numeral) is Urdu', () => expect(isUrduChar('۱')).toBe(true))
})

describe('isUrduText', () => {
  it('empty is false', () => expect(isUrduText('')).toBe(false))
  it('پاکستان is Urdu', () => expect(isUrduText('پاکستان')).toBe(true))
  it('Hello is not Urdu', () => expect(isUrduText('Hello')).toBe(false))
  it('whitespace only is false', () => expect(isUrduText('   ')).toBe(false))
})

describe('classifyChar', () => {
  it('پ → urdu-letter', () => expect(classifyChar('پ')).toBe('urdu-letter'))
  it('ب → arabic-letter', () => expect(classifyChar('ب')).toBe('arabic-letter'))
  it('A → latin', () => expect(classifyChar('A')).toBe('latin'))
  it('1 → numeral', () => expect(classifyChar('1')).toBe('numeral'))
  it('space → whitespace', () => expect(classifyChar(' ')).toBe('whitespace'))
  it('، → punctuation', () => expect(classifyChar('\u060c')).toBe('punctuation'))
  it('diacritic fatha → diacritic', () => expect(classifyChar('\u064e')).toBe('diacritic'))
})
