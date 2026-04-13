import { describe, it, expect } from 'vitest'
import { truncate } from '../../src/string-utils/truncate.js'

describe('truncate', () => {
  it('empty', () => expect(truncate('', 5)).toBe(''))
  it('short text unchanged', () => expect(truncate('کتاب', 10)).toBe('کتاب'))
  it('truncated ends with ...', () => {
    const r = truncate('یہ ایک لمبا جملہ ہے جو کافی طویل ہے', 10)
    expect(r.endsWith('...')).toBe(true)
    expect([...r].length).toBeLessThanOrEqual(10)
  })
})
