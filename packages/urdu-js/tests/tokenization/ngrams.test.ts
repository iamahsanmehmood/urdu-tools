import { describe, it, expect } from 'vitest'
import { ngrams } from '../../src/tokenization/ngrams.js'

describe('ngrams', () => {
  it('bigrams', () => expect(ngrams(['a','b','c'], 2)).toEqual([['a','b'],['b','c']]))
  it('trigrams', () => expect(ngrams(['a','b','c','d'], 3)).toEqual([['a','b','c'],['b','c','d']]))
  it('n > length → []', () => expect(ngrams(['a'], 2)).toEqual([]))
  it('n=0 → []', () => expect(ngrams(['a','b'], 0)).toEqual([]))
  it('empty tokens → []', () => expect(ngrams([], 2)).toEqual([]))
})
