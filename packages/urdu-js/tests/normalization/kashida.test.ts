import { describe, it, expect } from 'vitest'
import { removeKashida } from '../../src/normalization/kashida.js'

describe('removeKashida', () => {
  it('empty', () => expect(removeKashida('')).toBe(''))
  it('removes tatweel', () => expect(removeKashida('ک\u0640تاب')).toBe('کتاب'))
  it('no kashida unchanged', () => expect(removeKashida('کتاب')).toBe('کتاب'))
  it('only kashida → empty', () => expect(removeKashida('\u0640\u0640\u0640')).toBe(''))
  it('multiple kashidas', () => expect(removeKashida('ک\u0640\u0640تاب')).toBe('کتاب'))
})
