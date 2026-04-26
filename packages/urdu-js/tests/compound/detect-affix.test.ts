import { describe, it, expect } from 'vitest'
import { detectCompounds, isCompound, AFFIX_SET } from '../../src/compound/index.js'
import { detectAffixCompounds } from '../../src/compound/detect-affix.js'

describe('detectAffixCompounds', () => {
  it('detects suffix-based compound: کتاب خانہ', () => {
    const spans = detectAffixCompounds(['کتاب', 'خانہ'])
    expect(spans).toHaveLength(1)
    expect(spans[0]!.type).toBe('affix')
    expect(spans[0]!.components).toEqual(['کتاب', 'خانہ'])
  })

  it('detects suffix خانہ in longer sentence', () => {
    const spans = detectAffixCompounds(['کتاب', 'خانہ', 'بہت', 'اچھا', 'ہے'])
    expect(spans).toHaveLength(1)
    expect(spans[0]!.start).toBe(0)
    expect(spans[0]!.end).toBe(1)
  })

  it('detects prefix بے compound: بے عزت', () => {
    const spans = detectAffixCompounds(['بے', 'عزت'])
    expect(spans).toHaveLength(1)
    expect(spans[0]!.type).toBe('affix')
    expect(spans[0]!.components).toEqual(['بے', 'عزت'])
  })

  it('detects prefix نا compound: نا کام', () => {
    const spans = detectAffixCompounds(['نا', 'کام'])
    expect(spans).toHaveLength(1)
    expect(spans[0]!.type).toBe('affix')
  })

  it('detects عبادت گاہ (suffix گاہ)', () => {
    const spans = detectAffixCompounds(['عبادت', 'گاہ'])
    expect(spans).toHaveLength(1)
    expect(spans[0]!.text).toBe('عبادت گاہ')
  })

  it('detects بت پرست (suffix پرست)', () => {
    const spans = detectAffixCompounds(['بت', 'پرست'])
    expect(spans).toHaveLength(1)
    expect(spans[0]!.type).toBe('affix')
  })

  it('detects دولت مند (suffix مند)', () => {
    const spans = detectAffixCompounds(['دولت', 'مند'])
    expect(spans).toHaveLength(1)
  })

  it('detects حیرت انگیز (suffix انگیز)', () => {
    const spans = detectAffixCompounds(['حیرت', 'انگیز'])
    expect(spans).toHaveLength(1)
  })

  it('detects کام یاب (suffix یاب)', () => {
    const spans = detectAffixCompounds(['کام', 'یاب'])
    expect(spans).toHaveLength(1)
  })

  it('detects تعلیم یافتہ (suffix یافتہ)', () => {
    const spans = detectAffixCompounds(['تعلیم', 'یافتہ'])
    expect(spans).toHaveLength(1)
  })

  it('detects شہر نشین (suffix نشین)', () => {
    const spans = detectAffixCompounds(['شہر', 'نشین'])
    expect(spans).toHaveLength(1)
  })

  it('detects باغ بان (suffix بان)', () => {
    const spans = detectAffixCompounds(['باغ', 'بان'])
    expect(spans).toHaveLength(1)
  })

  it('detects ہنر کار (suffix کار)', () => {
    const spans = detectAffixCompounds(['ہنر', 'کار'])
    expect(spans).toHaveLength(1)
  })

  it('detects دل کش (suffix کش)', () => {
    const spans = detectAffixCompounds(['دل', 'کش'])
    expect(spans).toHaveLength(1)
  })

  it('detects غم زدہ (suffix زدہ)', () => {
    const spans = detectAffixCompounds(['غم', 'زدہ'])
    expect(spans).toHaveLength(1)
  })

  it('detects prefix خوش compound: خوش قسمت', () => {
    const spans = detectAffixCompounds(['خوش', 'قسمت'])
    expect(spans).toHaveLength(1)
    expect(spans[0]!.type).toBe('affix')
  })

  it('detects prefix ہم compound: ہم وطن', () => {
    const spans = detectAffixCompounds(['ہم', 'وطن'])
    expect(spans).toHaveLength(1)
  })

  it('detects prefix غیر compound: غیر ملکی', () => {
    const spans = detectAffixCompounds(['غیر', 'ملکی'])
    expect(spans).toHaveLength(1)
  })

  it('detects prefix بد compound: بد نام', () => {
    const spans = detectAffixCompounds(['بد', 'نام'])
    expect(spans).toHaveLength(1)
  })

  it('detects multiple compounds in sequence', () => {
    const spans = detectAffixCompounds(['کتاب', 'خانہ', 'کا', 'باغ', 'بان', 'بہت', 'خوش', 'قسمت', 'ہے'])
    expect(spans.length).toBeGreaterThanOrEqual(2)
  })

  it('does not detect non-compound adjacent words', () => {
    const spans = detectAffixCompounds(['اچھا', 'آدمی'])
    expect(spans).toHaveLength(0)
  })

  it('does not detect single word', () => {
    const spans = detectAffixCompounds(['پاکستان'])
    expect(spans).toHaveLength(0)
  })

  it('returns empty for empty input', () => {
    expect(detectAffixCompounds([])).toEqual([])
  })

  it('preserves start/end indices', () => {
    const spans = detectAffixCompounds(['یہ', 'کتاب', 'خانہ', 'ہے'])
    expect(spans).toHaveLength(1)
    expect(spans[0]!.start).toBe(1)
    expect(spans[0]!.end).toBe(2)
  })

  // Verify UAWL set has reasonable size
  it('UAWL affix set has 90+ entries', () => {
    expect(AFFIX_SET.size).toBeGreaterThanOrEqual(90)
  })
})

describe('detectCompounds (full orchestrator)', () => {
  it('detects affix compound in running text', () => {
    const spans = detectCompounds('کتاب خانہ بہت اچھا ہے')
    expect(spans.length).toBeGreaterThanOrEqual(1)
    expect(spans[0]!.type).toBe('affix')
    expect(spans[0]!.components).toContain('خانہ')
  })

  it('detects compound with affix disabled', () => {
    const spans = detectCompounds('کتاب خانہ', { affix: false, izafat: true })
    expect(spans).toHaveLength(0)
  })

  it('returns empty for non-compound text', () => {
    const spans = detectCompounds('یہ ایک جملہ ہے')
    expect(spans).toHaveLength(0)
  })

  it('returns empty for empty string', () => {
    expect(detectCompounds('')).toEqual([])
  })

  it('returns empty for whitespace only', () => {
    expect(detectCompounds('   ')).toEqual([])
  })
})

describe('isCompound (pair check)', () => {
  it('کتاب + خانہ is compound (affix)', () => {
    const result = isCompound('کتاب', 'خانہ')
    expect(result.matched).toBe(true)
    expect(result.type).toBe('affix')
  })

  it('بے + عزت is compound (affix)', () => {
    const result = isCompound('بے', 'عزت')
    expect(result.matched).toBe(true)
    expect(result.type).toBe('affix')
  })

  it('اچھا + آدمی is not compound', () => {
    const result = isCompound('اچھا', 'آدمی')
    expect(result.matched).toBe(false)
    expect(result.type).toBeNull()
  })

  it('empty strings return no match', () => {
    expect(isCompound('', 'خانہ').matched).toBe(false)
    expect(isCompound('کتاب', '').matched).toBe(false)
  })
})
