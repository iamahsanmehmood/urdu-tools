import { describe, it, expect } from 'vitest'
import { reverse } from '../../src/string-utils/reverse.js'

describe('reverse', () => {
  it('empty', () => expect(reverse('')).toBe(''))
  it('single word unchanged', () => expect(reverse('کتاب')).toBe('کتاب'))
  it('reverses word order', () => expect(reverse('ایک دو تین')).toBe('تین دو ایک'))
  it('whitespace only unchanged', () => expect(reverse('   ')).toBe('   '))
})
