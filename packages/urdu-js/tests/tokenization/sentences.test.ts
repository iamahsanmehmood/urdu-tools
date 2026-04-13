import { describe, it, expect } from 'vitest'
import { sentences } from '../../src/tokenization/sentences.js'

describe('sentences', () => {
  it('empty → []', () => expect(sentences('')).toEqual([]))
  it('splits on ۔', () => expect(sentences('یہ کتاب ہے۔ وہ قلم ہے۔')).toHaveLength(2))
  it('splits on ؟', () => expect(sentences('کیا حال ہے؟ ٹھیک۔')).toHaveLength(2))
  it('does NOT split on ،', () => expect(sentences('ایک، دو، تین۔')).toHaveLength(1))
  it('does NOT split on ؛', () => expect(sentences('پہلا؛ دوسرا۔')).toHaveLength(1))
})
