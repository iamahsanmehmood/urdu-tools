import { describe, it, expect } from 'vitest'
import { decodeHtmlEntities } from '../../src/string-utils/html-entities.js'

describe('decodeHtmlEntities', () => {
  it('empty string returns empty', () => expect(decodeHtmlEntities('')).toBe(''))
  it('decodes &rsquo; to Izafat apostrophe U+2019', () =>
    expect(decodeHtmlEntities('کتاب&rsquo;خانہ')).toBe('کتاب\u2019خانہ'))
  it('decodes &nbsp; to non-breaking space', () =>
    expect(decodeHtmlEntities('علم&nbsp;ہے')).toBe('علم\u00a0ہے'))
  it('decodes &ldquo; and &rdquo;', () =>
    expect(decodeHtmlEntities('&ldquo;\u0627\u0631\u062f\u0648&rdquo;')).toBe('\u201c\u0627\u0631\u062f\u0648\u201d'))
  it('decodes &lsquo;', () =>
    expect(decodeHtmlEntities("&lsquo;word")).toBe('\u2018word'))
  it('decodes &amp; last (no double-decode)', () =>
    expect(decodeHtmlEntities('&amp;rsquo;')).toBe('&rsquo;'))
  it('decodes &quot;', () =>
    expect(decodeHtmlEntities('say &quot;hello&quot;')).toBe('say "hello"'))
  it('decodes &#39;', () =>
    expect(decodeHtmlEntities("it&#39;s")).toBe("it's"))
  it('no entities → unchanged', () => {
    const clean = 'پاکستان زندہ باد'
    expect(decodeHtmlEntities(clean)).toBe(clean)
  })
  it('multiple entities in one string', () =>
    expect(decodeHtmlEntities('&ldquo;\u0627\u0631\u062f\u0648&rdquo;&nbsp;\u06c1\u06d2'))
      .toBe('\u201c\u0627\u0631\u062f\u0648\u201d\u00a0\u06c1\u06d2'))
})
