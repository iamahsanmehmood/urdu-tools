import { describe, it, expect } from 'vitest'
import { formatCurrency } from '../../src/numbers/currency.js'

describe('formatCurrency', () => {
  it('PKR zero', () => expect(formatCurrency(0, 'PKR')).toBe('صفر روپے'))
  it('PKR whole', () => expect(formatCurrency(100, 'PKR')).toBe('ایک سو روپے'))
  it('PKR with paise', () => expect(formatCurrency(5.50, 'PKR')).toBe('پانچ روپے پچاس پیسے'))
  it('INR whole', () => expect(formatCurrency(1, 'INR')).toBe('ایک روپیہ'))
})
