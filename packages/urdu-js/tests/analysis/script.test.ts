import { describe, it, expect } from 'vitest'
import { getScript, getUrduDensity } from '../../src/analysis/script.js'

describe('getScript', () => {
  it('empty → unknown', () => expect(getScript('')).toBe('unknown'))
  it('Urdu text → urdu', () => expect(getScript('پاکستان')).toBe('urdu'))
  it('Latin only → latin', () => expect(getScript('Hello World')).toBe('latin'))
  it('spaces only → unknown', () => expect(getScript('   ')).toBe('unknown'))
})

describe('getUrduDensity', () => {
  it('empty → 0', () => expect(getUrduDensity('')).toBe(0))
  it('pure Urdu > 0', () => expect(getUrduDensity('پاکستان')).toBeGreaterThan(0))
  it('pure Latin → 0', () => expect(getUrduDensity('Hello')).toBe(0))
})
