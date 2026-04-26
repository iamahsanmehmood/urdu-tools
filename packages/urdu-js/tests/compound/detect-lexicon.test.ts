import { describe, it, expect } from 'vitest'
import { detectCompounds, isCompound, COMPOUND_LEXICON } from '../../src/compound/index.js'
import { detectLexiconCompounds, isInLexicon } from '../../src/compound/detect-lexicon.js'

describe('detectLexiconCompounds', () => {
  it('detects echo compound: رنگ برنگ', () => {
    const spans = detectLexiconCompounds(['رنگ', 'برنگ'])
    expect(spans).toHaveLength(1)
    expect(spans[0]!.type).toBe('lexicon')
    expect(spans[0]!.components).toEqual(['رنگ', 'برنگ'])
  })

  it('detects inflected echo compound: رنگ برنگے', () => {
    const spans = detectLexiconCompounds(['رنگ', 'برنگے'])
    expect(spans).toHaveLength(1)
    expect(spans[0]!.type).toBe('lexicon')
  })

  it('detects synonym pair: محنت مشقت', () => {
    const spans = detectLexiconCompounds(['محنت', 'مشقت'])
    expect(spans).toHaveLength(1)
    expect(spans[0]!.text).toBe('محنت مشقت')
  })

  it('detects time expression: صبح سویرے', () => {
    const spans = detectLexiconCompounds(['صبح', 'سویرے'])
    expect(spans).toHaveLength(1)
    expect(spans[0]!.text).toBe('صبح سویرے')
  })

  it('detects place expression: چاروں طرف', () => {
    const spans = detectLexiconCompounds(['چاروں', 'طرف'])
    expect(spans).toHaveLength(1)
    expect(spans[0]!.text).toBe('چاروں طرف')
  })

  it('detects rhyming compound: چہل پہل', () => {
    const spans = detectLexiconCompounds(['چہل', 'پہل'])
    expect(spans).toHaveLength(1)
  })

  it('detects livelihood compound: روزی روٹی', () => {
    const spans = detectLexiconCompounds(['روزی', 'روٹی'])
    expect(spans).toHaveLength(1)
  })

  it('detects agricultural compound: کھیت کھلیان', () => {
    const spans = detectLexiconCompounds(['کھیت', 'کھلیان'])
    expect(spans).toHaveLength(1)
  })

  it('does not detect non-compound pair', () => {
    const spans = detectLexiconCompounds(['اچھا', 'آدمی'])
    expect(spans).toHaveLength(0)
  })

  it('returns empty for single word', () => {
    expect(detectLexiconCompounds(['پاکستان'])).toEqual([])
  })

  it('returns empty for empty input', () => {
    expect(detectLexiconCompounds([])).toEqual([])
  })

  it('detects compound in sentence context', () => {
    const spans = detectLexiconCompounds(['ان', 'کی', 'چہل', 'پہل', 'اچھی', 'ہے'])
    expect(spans).toHaveLength(1)
    expect(spans[0]!.start).toBe(2)
    expect(spans[0]!.end).toBe(3)
  })

  it('detects multiple compounds in sequence', () => {
    const spans = detectLexiconCompounds(['صبح', 'سویرے', 'دن', 'رات'])
    expect(spans).toHaveLength(2)
  })
})

describe('isInLexicon', () => {
  it('exact match: صبح + سویرے', () => {
    expect(isInLexicon('صبح', 'سویرے')).toBe(true)
  })

  it('stem match with ے ending: رنگ + برنگے', () => {
    expect(isInLexicon('رنگ', 'برنگے')).toBe(true)
  })

  it('no match for non-compound', () => {
    expect(isInLexicon('اچھا', 'لڑکا')).toBe(false)
  })
})

describe('COMPOUND_LEXICON', () => {
  it('has reasonable number of entries', () => {
    expect(COMPOUND_LEXICON.size).toBeGreaterThanOrEqual(30)
  })
})

describe('full orchestrator — user test case', () => {
  const TEXT = 'صبح سویرے جب سورج طلوع ہوتا ہے تو بست و کشاد کائنات کا حسن دیکھنے لائق ہوتا ہے۔ باغوں میں رنگ برنگے اور خوش نما پھول کھلتے ہیں اور ان کی عطر بیز خوشبو چاروں طرف پھیل جاتی ہے۔ پرندوں کی چہل پہل اور ان کی خوش الحانی فضا میں ایک روح پرور سماں باندھ دیتی ہے۔ جو لوگ شب بیداری کے عادی ہیں، وہ اس سحر انگیز وقت کی قدر جانتے ہیں۔ کسان اپنی روزی روٹی کی تلاش میں کھیت کھلیان کا رخ کرتے ہیں اور محنت مشقت سے اپنے امورِ خانہ داری چلاتے ہیں۔ حقیقت یہ ہے کہ قدرت کے یہ نظارے انسان کو فکر و عمل کی دعوت دیتے ہیں۔'

  const spans = detectCompounds(TEXT)
  const detected = spans.map(s => s.text)

  // Expected compounds from the user's ground truth
  it('detects صبح سویرے (lexicon — time expression)', () => {
    expect(detected).toContain('صبح سویرے')
  })

  it('detects بست و کشاد (izafat — vav-e-atf)', () => {
    expect(detected).toContain('بست و کشاد')
  })

  it('detects رنگ برنگے (lexicon — echo compound)', () => {
    expect(detected).toContain('رنگ برنگے')
  })

  it('detects خوش نما (affix — prefix خوش)', () => {
    expect(detected).toContain('خوش نما')
  })

  it('detects عطر بیز (affix — suffix بیز)', () => {
    expect(detected).toContain('عطر بیز')
  })

  it('detects چاروں طرف (lexicon — place expression)', () => {
    expect(detected).toContain('چاروں طرف')
  })

  it('detects چہل پہل (lexicon — rhyming compound)', () => {
    expect(detected).toContain('چہل پہل')
  })

  it('detects خوش الحانی (affix — prefix خوش)', () => {
    expect(detected).toContain('خوش الحانی')
  })

  it('detects روح پرور (affix — suffix پرور)', () => {
    expect(detected).toContain('روح پرور')
  })

  it('detects شب بیداری (affix — prefix شب)', () => {
    expect(detected).toContain('شب بیداری')
  })

  it('detects سحر انگیز (affix — suffix انگیز)', () => {
    expect(detected).toContain('سحر انگیز')
  })

  it('detects روزی روٹی (lexicon — livelihood compound)', () => {
    expect(detected).toContain('روزی روٹی')
  })

  it('detects کھیت کھلیان (lexicon — agriculture compound)', () => {
    expect(detected).toContain('کھیت کھلیان')
  })

  it('detects محنت مشقت (lexicon — synonym pair)', () => {
    expect(detected).toContain('محنت مشقت')
  })

  it('detects فکر و عمل (izafat — vav-e-atf)', () => {
    expect(detected).toContain('فکر و عمل')
  })

  // False positive checks — these should NOT be detected
  it('does NOT detect اور خوش (conjunction + adjective)', () => {
    expect(detected).not.toContain('اور خوش')
  })

  it('does NOT detect نما پھول (wrong direction)', () => {
    expect(detected).not.toContain('نما پھول')
  })

  it('does NOT detect کی خوش (particle + adjective)', () => {
    expect(detected).not.toContain('کی خوش')
  })

  it('does NOT detect لوگ شب (non-compound adjacency)', () => {
    expect(detected).not.toContain('لوگ شب')
  })

  it('does NOT detect داری چلاتے (wrong grouping)', () => {
    expect(detected).not.toContain('داری چلاتے')
  })
})

describe('isCompound with lexicon', () => {
  it('detects lexicon compound: صبح + سویرے', () => {
    const result = isCompound('صبح', 'سویرے')
    expect(result.matched).toBe(true)
    expect(result.type).toBe('lexicon')
  })

  it('detects lexicon compound: محنت + مشقت', () => {
    const result = isCompound('محنت', 'مشقت')
    expect(result.matched).toBe(true)
    expect(result.type).toBe('lexicon')
  })

  it('detects affix before lexicon: خوش + نما', () => {
    // خوش is in PREFIX_SET, so affix takes priority
    const result = isCompound('خوش', 'نما')
    expect(result.matched).toBe(true)
    expect(result.type).toBe('affix')
  })
})

describe('span chaining', () => {
  it('chains overlapping affix + izafat spans: امورِ خانہ داری', () => {
    // امورِ + خانہ via izafat (zer), خانہ + داری via affix (suffix داری)
    // These overlap at خانہ → should merge into [امورِ خانہ داری]
    const spans = detectCompounds('امورِ خانہ داری')
    expect(spans).toHaveLength(1)
    expect(spans[0]!.text).toBe('امورِ خانہ داری')
    expect(spans[0]!.components).toEqual(['امورِ', 'خانہ', 'داری'])
  })
})
