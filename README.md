<div align="right">

**اردو ٹولز** · Urdu Tools

</div>

<div align="center">

# urdu-tools

### The only production-quality, zero-dependency Urdu text processing library with deterministic compound word detection.

[![CI – JS](https://github.com/iamahsanmehmood/urdu-tools/actions/workflows/ci-js.yml/badge.svg?branch=main)](https://github.com/iamahsanmehmood/urdu-tools/actions/workflows/ci-js.yml)
[![CI – .NET](https://github.com/iamahsanmehmood/urdu-tools/actions/workflows/ci-dotnet.yml/badge.svg?branch=main)](https://github.com/iamahsanmehmood/urdu-tools/actions/workflows/ci-dotnet.yml)
[![Live Playground](https://img.shields.io/badge/▶_Live_Playground-Try_it_now-7c5cfc?style=flat-square)](https://iamahsanmehmood.github.io/urdu-tools/)
[![Docs](https://img.shields.io/badge/📖_Docs-API_Reference-4f9cf9?style=flat-square)](https://iamahsanmehmood.github.io/urdu-tools/docs/)
[![npm](https://img.shields.io/badge/npm-v1.1.0-blue?style=flat-square)](https://github.com/iamahsanmehmood/urdu-tools/pkgs/npm/urdu-tools)
[![NuGet](https://img.shields.io/badge/nuget-v1.1.0-blue?style=flat-square)](https://github.com/iamahsanmehmood/urdu-tools/pkgs/nuget/UrduTools.Core)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Tests](https://img.shields.io/badge/tests-392_passing-brightgreen?style=flat-square)](#)

**TypeScript · C#/.NET · Zero Dependencies · 392 Tests**

<br/>

[▶ Try the Live Playground](https://iamahsanmehmood.github.io/urdu-tools/) &nbsp;·&nbsp;
[📖 Full API Documentation](https://iamahsanmehmood.github.io/urdu-tools/docs/) &nbsp;·&nbsp;
[📦 npm Package](https://github.com/iamahsanmehmood/urdu-tools/pkgs/npm/urdu-tools) &nbsp;·&nbsp;
[📦 NuGet Package](https://github.com/iamahsanmehmood/urdu-tools/pkgs/nuget/UrduTools.Core)

</div>

---

## 🏆 What makes this different

Every other Urdu NLP library (UrduHack, URDUNLP, etc.) treats compound word detection as a **machine learning problem** — they feed data into statistical models and hope the probabilities align. That means:

- Results change unpredictably between corpus versions
- You cannot explain *why* a pair was or wasn't detected
- Edge cases (literary izafat, 3-word expressions, echo words) fail silently
- No deterministic guarantee across identical inputs

**urdu-tools takes the opposite approach.** Every detection in the compound module is grounded in one of three verifiable, explainable rules: a word matches a known UAWL morpheme, an izafat marker is present in the text, or the pair exists in a curated linguistic lexicon. **The same input always produces the same output, always with a reason.**

This is the first open-source implementation of deterministic, multi-layer, N-gram Urdu compound detection in any language.

---

## Table of Contents

- [The Problem with Urdu Compounds](#-the-problem-with-urdu-compounds)
- [Packages](#packages)
- [Quick Start](#quick-start)
- [Modules](#modules)
  - [🆕 Compound Words (v1.1.0)](#compound-words-v110--new)
  - [Normalization](#normalization)
  - [Search & Matching](#search--matching)
  - [Numbers](#numbers)
  - [Tokenization](#tokenization)
  - [String Utilities](#string-utilities)
  - [Encoding](#encoding-js-only)
  - [Sorting](#sorting)
  - [Transliteration](#transliteration)
  - [Analysis](#analysis)
- [Why this exists](#why-this-exists)
- [The Arabic–Urdu Confusion Problem](#the-arabicurdu-confusion-problem)
- [Research & Academic Credits](#research--academic-credits)
- [API Reference](#api-reference)
- [License](#license)
- [Author](#author)

---

## Used in production

| Project | Type | Uses |
|---------|------|------|
| [HamaariUrdu](https://hamaariurdu.com) | Urdu language learning platform | Normalization, fingerprint, tokenization, search matching, numbers, compound detection |
| [Pakistan Academy of Letters](https://pal.gov.pk) | Government literary institution | Normalization, search, sorting |
| [Digital Library of PAL](https://dlp.gov.pk) | Government digital Urdu archive | Normalization, search, encoding |

---

## What's inside

| Module | Solves |
|--------|--------|
| 🔗 **Compound Words** | `کتاب خانہ` detected as one unit, not split into meaningless pieces |
| 🔤 **Normalization** | 12-layer pipeline — diacritics, ZWNJ, Alif, hamza, honorifics, Arabic look-alikes |
| 🔍 **Search & Match** | 9 progressive layers — finds `عِلمٌ` even when stored as `علم` |
| 🔢 **Numbers** | `bigint`-based South Asian system — ہزار · لاکھ · کروڑ · ارب · کھرب · نیل |
| ✂️ **Tokenization** | Unicode-aware — preserves Izafat apostrophe, treats ZWNJ-bound compounds as one token |
| 🔡 **Sorting** | 39-letter canonical Urdu alphabetical order — no database collation needed |
| 🔀 **Transliteration** | Urdu ↔ Roman with 18 aspirated digraph rules (بھ→bh, چھ→chh …) |
| 🔬 **Analysis** | Script detection, RTL check, Urdu density, character classification |
| 📦 **Encoding** | InPage v1/v2/v3 decoder, Windows-1256 converter, encoding detection |
| 🛠️ **String Utils** | Word-order reverse, grapheme-cluster count, Urdu segment extraction |

---

## Compound detection pipeline

```
Raw text
   │
   ├─► Layer 1 — Affix (UAWL)
   │       100+ known Urdu prefix/suffix morphemes
   │       خانہ گاہ پرست بے نا خوش شب غم …
   │
   ├─► Layer 2 — Izafat
   │       zer mark (◌ِ) · hamza-above (◌ٔ) · vav-e-atf (و)
   │       کتابِ حسنہ · روحِ رواں · علم و عمل
   │
   └─► Layer 3 — Lexicon
           3,262 root entries · N-word tails · greedy longest-match
           محنت مشقت · رنگ برنگ · انسائیکلوپیڈیا آف اسلام
               │
               └─► Span chaining
                       امورِ خانہ  +  خانہ داری  →  امورِ خانہ داری

Output: CompoundSpan[] with text · type · components · start · end
```

---

## 🔥 The Problem with Urdu Compounds

This is the deepest unsolved problem in practical Urdu NLP, and **every tokenizer gets it wrong**.

Urdu مرکب الفاظ (compound words) are multi-word expressions that function as a **single semantic unit** but are written with spaces between their parts. A naive tokenizer sees spaces and splits them. The result is broken meaning:

```
Input:  "اس نے کتاب خانہ بنایا"
                 ↑ ↑
         space between compound components

Wrong:  ['اس', 'نے', 'کتاب', 'خانہ', 'بنایا']
        (5 tokens — "library" is split into "book" + "place")

Right:  ['اس', 'نے', 'کتاب‌خانہ', 'بنایا']
        (4 tokens — "library" is one semantic unit)
```

The consequences ripple into every NLP task downstream:

| Task | What breaks |
|------|-------------|
| **Search** | `کتاب خانہ` doesn't match `کتاب‌خانہ` — zero results |
| **NER** | `امورِ خانہ داری` (household affairs) split into 3 unrelated tokens |
| **Sentiment** | `بے عزت` (disrespectful) vs `بے` + `عزت` — polarity lost |
| **Translation** | `رنگ برنگے` (colorful) translated as "color" + unknown |
| **Word count** | Every compound word inflates the count with phantom tokens |

### Why is this hard?

Urdu compounds span **multiple morphological strategies** simultaneously:

1. **Affix-based** — one word contains a known derivational morpheme:
   `کتاب + خانہ` → library (`خانہ` = place-of suffix)
   `بے + عزت` → disrespectful (`بے` = without prefix)
   `خوش + قسمت` → fortunate (`خوش` = well prefix)

2. **Izafat** — a grammatical linking marker, written or implied:
   `کتابِ حسنہ` (the good book) — zer mark on first word
   `روحِ رواں` (driving spirit) — hamza-above marker
   `علم و عمل` (knowledge and practice) — vav-e-atf connector

3. **Lexical** — neither word is morphologically special; you must know the pair:
   `محنت مشقت` (hard work — synonym compound)
   `رنگ برنگے` (colorful — echo compound)
   `انسائیکلوپیڈیا آف اسلام` (3-word fixed expression)

4. **N-word chains** — compounds of three or more words where each link is independently valid:
   `امورِ خانہ` + `خانہ داری` → `امورِ خانہ داری` (household affairs — 3 words)
   `جہدِ مسلسل` (continuous struggle — izafat + two content words)

No statistical model trained on general text reliably covers all four strategies. **Our rule-based, three-layer engine does.**

---

## Packages

| Package | Language | Install |
|---------|----------|---------|
| [`@iamahsanmehmood/urdu-tools`](packages/urdu-js) | TypeScript / JavaScript | `npm install @iamahsanmehmood/urdu-tools` |
| [`UrduTools.Core`](packages/urdu-dotnet) | C# / .NET 9 | `dotnet add package UrduTools.Core` |

> **Package registry:** GitHub Packages. See the [packages page](https://github.com/iamahsanmehmood/urdu-tools/packages) for authentication setup.

Both packages have **zero runtime dependencies** and identical APIs.

---

## Quick Start

### JavaScript / TypeScript

```bash
npm install @iamahsanmehmood/urdu-tools
```

```typescript
import { normalize, match, numberToWords, sort, toRoman, fingerprint } from '@iamahsanmehmood/urdu-tools'
import { detectCompounds, joinCompounds } from '@iamahsanmehmood/urdu-tools/compound'

// Normalize before storage or search
normalize('عِلمٌ')                    // → 'علم'   (strips diacritics)
normalize('\u0627\u0653')             // → 'آ'     (Alif + Madda → precomposed)
normalize('علم\u200cہے')             // → 'علمہے' (strips invisible ZWNJ)

// Match across 9 normalization layers
match('عِلمٌ', 'علم').matched        // → true (layer: 'strip-diacritics')
match('\u0623حمد', 'احمد').matched   // → true (layer: 'normalize-hamza')

// Numbers with South Asian grouping
numberToWords(10_000_000n)            // → 'ایک کروڑ'
numberToWords(1n, { ordinal: true, gender: 'feminine' }) // → 'پہلی'

// Sort in canonical Urdu alphabetical order
sort(['ے', 'ا', 'ک', 'ب'])           // → ['ا', 'ب', 'ک', 'ے']

// Transliteration
toRoman('پاکستان')                   // → 'pakistan'

// Compound detection (v1.1.0) — the feature no other library has
detectCompounds('کتاب خانہ بہت اچھا ہے')
// → [{ text: 'کتاب خانہ', type: 'affix', components: ['کتاب','خانہ'], start: 0, end: 1 }]

joinCompounds('کتاب خانہ اچھی جگہ ہے')
// → 'کتاب‌خانہ اچھی جگہ ہے'  (ZWNJ binds compound; tokenizer sees one token)
```

### C# / .NET

```bash
dotnet add package UrduTools.Core
```

```csharp
using UrduTools.Core.Normalization;
using UrduTools.Core.Numbers;
using UrduTools.Core.Sorting;
using UrduTools.Core.Search;

// Normalize
UrduNormalizer.Normalize("عِلمٌ");                         // "علم"
UrduNormalizer.Normalize("\u0627\u0653");                   // "آ"

// Match
UrduMatcher.Match("عِلمٌ", "علم").Matched;                 // true

// Numbers
NumberToWords.Convert(10_000_000);                          // "ایک کروڑ"
NumberToWords.Convert(1, new() { Ordinal=true, Gender=Gender.Feminine }); // "پہلی"

// Sort
UrduComparer.Sort(new[]{"ے","ا","ک","ب"}).ToList();        // ["ا","ب","ک","ے"]

// Progressive normalization for DB lookup
foreach (var form in UrduMatcher.GetAllNormalizations(userInput))
{
    var result = await db.LookupAsync(form);
    if (result is not null) return result;
}
```

---

## Modules

---

### Compound Words (v1.1.0) — NEW

> **The first open-source, deterministic, multi-layer N-gram compound word detector for Urdu.** No ML required. No corpus needed. No black box.

```typescript
import {
  detectCompounds,
  joinCompounds,
  splitCompounds,
  isCompound
} from '@iamahsanmehmood/urdu-tools/compound'
```

#### Detection — all three layers working together

```typescript
// Layer 1: Affix (UAWL morpheme matching)
detectCompounds('کتاب خانہ بہت اچھا ہے')
// → [{ text: 'کتاب خانہ', type: 'affix', components: ['کتاب', 'خانہ'], start: 0, end: 1 }]
//   ↑ 'خانہ' is a known place-suffix — pair confirmed as compound

detectCompounds('بے عزت آدمی نہیں چاہیے')
// → [{ text: 'بے عزت', type: 'affix', components: ['بے', 'عزت'], start: 0, end: 1 }]
//   ↑ 'بے' is a known privative prefix

// Layer 2: Izafat (grammatical marker detection)
detectCompounds('علم و عمل ضروری ہے')
// → [{ text: 'علم و عمل', type: 'izafat', components: ['علم', 'و', 'عمل'], start: 0, end: 2 }]
//   ↑ standalone 'و' (vav-e-atf) between two content words

detectCompounds('امورِ خانہ داری چلانا مشکل ہے')
// → [{ text: 'امورِ خانہ داری', type: 'affix', components: ['امورِ','خانہ','داری'], start: 0, end: 2 }]
//   ↑ 3-word compound: izafat (zer on امورِ) chains into خانہ داری (affix)

// Layer 3: Lexicon (curated 3,262-root dictionary)
detectCompounds('رنگ برنگے پھول کھلے ہیں')
// → [{ text: 'رنگ برنگے', type: 'lexicon', components: ['رنگ', 'برنگے'], start: 0, end: 1 }]
//   ↑ echo compound — neither word is an affix; known from curated data

detectCompounds('محنت مشقت کے بغیر کامیابی نہیں')
// → [{ text: 'محنت مشقت', type: 'lexicon', components: ['محنت', 'مشقت'], start: 0, end: 1 }]
//   ↑ synonym compound — two near-synonyms used together as one expression

detectCompounds('انسائیکلوپیڈیا آف اسلام کا حوالہ')
// → [{ text: 'انسائیکلوپیڈیا آف اسلام', type: 'lexicon', ...}]
//   ↑ 3-word fixed title — greedy longest-match beats any shorter 2-word overlap
```

#### Joining — compound-aware tokenization pipeline

```typescript
// The critical downstream use: bind compounds BEFORE tokenizing
import { joinCompounds } from '@iamahsanmehmood/urdu-tools/compound'
import { tokenize } from '@iamahsanmehmood/urdu-tools'

const text = 'کتاب خانہ میں علم و عمل کی کتابیں ہیں'

// Without compound joining — naive tokenizer
tokenize(text)
// → ['کتاب', 'خانہ', 'میں', 'علم', 'و', 'عمل', 'کی', 'کتابیں', 'ہیں']
//    ^^^^^^^^^^^^^^^^ split!   ^^^^^^^^^^^^^^^^^^^ split!

// With compound joining — semantic integrity preserved
const joined = joinCompounds(text)
// → 'کتاب‌خانہ میں علم‌و‌عمل کی کتابیں ہیں'  (ZWNJ between parts)

tokenize(joined)
// → ['کتاب‌خانہ', 'میں', 'علم‌و‌عمل', 'کی', 'کتابیں', 'ہیں']
//    ^^^^^^^^^^^ one token ^^^^^^^^^^^^ one token ✓
```

#### Full API

```typescript
// Join detected compounds with binder character (default: ZWNJ U+200C)
joinCompounds('کتاب خانہ اچھا ہے')
// → 'کتاب‌خانہ اچھا ہے'

joinCompounds('بے عزت آدمی', { binder: 'nbsp' })
// → 'بے\u00A0عزت آدمی'  (non-breaking space)

joinCompounds(text, { binder: 'wj' })
// → Word Joiner (U+2060) — zero-width, never line-breaks

// Split back to regular spaces (inverse of joinCompounds)
splitCompounds('کتاب‌خانہ')   // → 'کتاب خانہ'

// Pair-level check
isCompound('کتاب', 'خانہ')    // → { matched: true,  type: 'affix'   }
isCompound('محنت', 'مشقت')    // → { matched: true,  type: 'lexicon' }
isCompound('اخلاقِ', 'حسنہ')  // → { matched: true,  type: 'izafat' }
isCompound('اچھا', 'آدمی')    // → { matched: false, type: null      }

// Disable individual layers
detectCompounds(text, { affix: false, izafat: true, lexicon: true })
detectCompounds(text, { affix: true,  izafat: false, lexicon: false })
```

#### Detection layer reference

| Layer | Option | Default | Coverage | What it detects |
|-------|--------|---------|----------|----------------|
| 1 — Affix | `affix` | ✅ | ~40% | UAWL morphemes: خانہ، گاہ، پرست، بے، نا، خوش، شب، غم and 100+ more |
| 2 — Izafat | `izafat` | ✅ | ~20% | zer (◌ِ), hamza-above (◌ٔ), vav-e-atf (و) grammatical linkers |
| 3 — Lexicon | `lexicon` | ✅ | ~40% | 3,262-root dictionary: echo words, synonym pairs, fixed collocations, multi-word titles |

**Algorithm:** Greedy longest-match N-gram forward scan. For each token that exists as a root in the lexicon, all known tails are tried sorted by word count (longest first). A 3-word match always beats a 2-word overlap on the same starting position. Overlapping affix and izafat spans are chained via span merging into larger compounds.

**Binder character reference:**

| Binder | Character | Visual | Best for |
|--------|-----------|--------|---------|
| `'zwnj'` | U+200C (default) | invisible | Downstream tokenization — zero visual change |
| `'nbsp'` | U+00A0 | visible space | Display, preserves spacing |
| `'wj'` | U+2060 | invisible | Never line-breaks |

**Exported TypeScript types:**
```typescript
import type { CompoundSpan, CompoundMatch, CompoundOptions, CompoundType } from '@iamahsanmehmood/urdu-tools/compound'
import { COMPOUND_LEXICON, AFFIX_SET, PREFIX_SET, SUFFIX_SET } from '@iamahsanmehmood/urdu-tools/compound'
```

---

### Normalization

The normalization pipeline applies up to 12 layers in deterministic order. All layers are on by default except 9–12.

```typescript
import { normalize, stripDiacritics, normalizeAlif, normalizeHamza,
         normalizeCharacters, fingerprint, stripZeroWidth,
         normalizeNumerals, removeKashida, normalizePresentationForms } from '@iamahsanmehmood/urdu-tools'
```

**Pipeline layers:**

| # | Option | Default | What it does |
|---|--------|---------|-------------|
| 1 | `nfc` | ✅ | Unicode NFC canonical form |
| 2 | `nbsp` | ✅ | U+00A0 non-breaking space → regular space |
| 3 | `alifMadda` | ✅ | `ا\u0653` → `آ` (Alif + Madda sign → precomposed) |
| 4 | `numerals` | ✅ | `٠–٩` and `۰–۹` → ASCII `0–9` |
| 5 | `zeroWidth` | ✅ | Strip ZWNJ (U+200C), ZWJ (U+200D), soft hyphen (U+00AD) |
| 6 | `diacritics` | ✅ | Strip zabar, zer, pesh, shadda, sukun, tanwin |
| 7 | `honorifics` | ✅ | Strip Islamic honorific signs (ؐ ؑ ؒ ؓ ؔ) |
| 8 | `hamza` | ✅ | `أ` → `ا`, `ؤ` → `و` |
| 9 | `kashida` | ❌ | Strip tatweel/kashida U+0640 |
| 10 | `presentationForms` | ❌ | Map U+FB50–FEFF presentation forms to base chars |
| 11 | `punctuationTrim` | ❌ | Strip leading/trailing non-letter characters |
| 12 | `normalizeCharacters` | ❌ | Arabic look-alikes → correct Urdu codepoints |

```typescript
// Full normalization for search indexing
normalize(text, {
  kashida: true,
  presentationForms: true,
  punctuationTrim: true,
  normalizeCharacters: true,   // ي→ی, ك→ک, ه→ہ
})

// Fingerprint: canonical form for comparison (no DB round-trip needed)
fingerprint('عِلمٌ') === fingerprint('عَلم')   // true
fingerprint('نبیؐ') === fingerprint('نبی')     // true (honorific stripped)
fingerprint('علم\u200c') === fingerprint('علم') // true (ZWNJ stripped)
```

---

### Search & Matching

```typescript
import { match, fuzzyMatch, getAllNormalizations } from '@iamahsanmehmood/urdu-tools'
```

**`match(query, target)`** — tries 9 progressively aggressive normalization layers until a match is found:

```typescript
match('عِلمٌ', 'علم')
// → { matched: true, layer: 'strip-diacritics', normalizedQuery: 'علم', normalizedTarget: 'علم' }

match('نبیؐ', 'نبی')
// → { matched: true, layer: 'strip-honorifics', ... }

match('کتاب', 'علم')
// → { matched: false, layer: null, ... }
```

**`getAllNormalizations(word)`** — returns all normalized forms for database lookup:

```typescript
const forms = getAllNormalizations('عِلمٌ')
for (const form of forms) {
  const result = await db.get(form)
  if (result) return result
}
```

**`fuzzyMatch(query, candidates)`** — Levenshtein + LCS hybrid, threshold 0.5:

```typescript
fuzzyMatch('کتاب', ['علم', 'کتاب', 'قلم'])
// → { candidate: 'کتاب', score: 1.0 }

fuzzyMatch('کتاب', ['کتابیں', 'کتب'])
// → { candidate: 'کتابیں', score: ~0.7 }
```

---

### Numbers

Uses **bigint** throughout — South Asian numbers exceed `Number.MAX_SAFE_INTEGER` (پانچ نیل = 5×10¹⁵).

```typescript
import { numberToWords, formatCurrency, toUrduNumerals, wordsToNumber } from '@iamahsanmehmood/urdu-tools'

numberToWords(0n)                      // 'صفر'
numberToWords(100n)                    // 'ایک سو'
numberToWords(1_000n)                  // 'ایک ہزار'
numberToWords(100_000n)                // 'ایک لاکھ'
numberToWords(10_000_000n)             // 'ایک کروڑ'
numberToWords(1_000_000_000n)          // 'ایک ارب'
numberToWords(1_000_000_000_000n)      // 'ایک کھرب'
numberToWords(1_000_000_000_000_000n)  // 'ایک نیل'

// Ordinals with gender agreement
numberToWords(1n, { ordinal: true, gender: 'masculine' })  // 'پہلا'
numberToWords(1n, { ordinal: true, gender: 'feminine' })   // 'پہلی'
numberToWords(11n, { ordinal: true, gender: 'masculine' }) // 'گیارہواں'

// Currency
formatCurrency(505.50, 'PKR')   // 'پانچ سو پانچ روپے پچاس پیسے'
formatCurrency(1000, 'INR')     // 'ایک ہزار روپے'

// Numeral conversion
toUrduNumerals(123)             // '۱۲۳'
normalizeNumerals('۱۲۳', 'ascii') // '123'

// Parse words back to number
wordsToNumber('ایک کروڑ')       // 10_000_000n
wordsToNumber('پانچ سو پانچ')   // 505n
```

**South Asian grouping:**

| Urdu | Value |
|------|-------|
| ہزار | 1,000 |
| لاکھ | 100,000 |
| کروڑ | 10,000,000 |
| ارب | 1,000,000,000 |
| کھرب | 1,000,000,000,000 |
| نیل | 1,000,000,000,000,000 |

---

### Tokenization

```typescript
import { tokenize, sentences, ngrams } from '@iamahsanmehmood/urdu-tools'

tokenize('پاکستان ایک خوبصورت ملک ہے')
// → [
//   { text: 'پاکستان', type: 'urdu-word' },
//   { text: 'ایک', type: 'urdu-word' },
//   { text: 'خوبصورت', type: 'urdu-word' },
//   { text: 'ملک', type: 'urdu-word' },
//   { text: 'ہے', type: 'urdu-word' },
// ]

// Sentence splitting — on ۔ ؟ ! but NOT on ، or ؛
sentences('پہلا جملہ۔ دوسرا جملہ؟ تیسرا جملہ!')
// → ['پہلا جملہ', 'دوسرا جملہ', 'تیسرا جملہ']

// N-grams
const tokens = tokenize('ایک دو تین')
ngrams(tokens, 2)
// → [[{ایک}, {دو}], [{دو}, {تین}]]
```

The tokenizer preserves ZWNJ (U+200C) within words — used by `joinCompounds()` to bind compound components into a single token.

---

### String Utilities

```typescript
import { reverse, truncate, wordCount, charCount,
         extractUrdu, decodeHtmlEntities } from '@iamahsanmehmood/urdu-tools'

// Reverse word order (not characters — preserves Arabic shaping)
reverse('پاکستان ہندوستان')     // 'ہندوستان پاکستان'

// Truncate at word boundary
truncate('یہ ایک بہت لمبا جملہ ہے', 10)  // 'یہ ایک...'

// Count words
wordCount('پاکستان زندہ باد')   // 3

// Count grapheme clusters (correct for combining diacritics)
charCount('عِلم')               // 3  (ع+ِ = 1 cluster, ل, م)

// Extract Urdu/Arabic segments from mixed text
extractUrdu('The word علم means knowledge')
// → ['علم']

// Decode HTML entities BEFORE normalize() — TinyMCE converts U+2019 → &rsquo;
decodeHtmlEntities('کتاب&rsquo;خانہ')   // 'کتاب\u2019خانہ'
decodeHtmlEntities('علم&nbsp;ہے')       // 'علم\u00A0ہے'
```

---

### Encoding (JS only)

Handles InPage (dominant pre-Unicode Urdu DTP tool) and legacy Windows-1256 encoded data.

```typescript
import { decodeInpage, detectEncoding, convertWindows1256ToUnicode } from '@iamahsanmehmood/urdu-tools'

const result = decodeInpage(buffer, 'auto')
// result.paragraphs → string[]
// Versions: 'v1'/'v2' (0x04-prefix byte-pair) | 'v3' (UTF-16LE) | 'auto' (detect)

detectEncoding(buffer)
// → 'utf-8' | 'utf-16le' | 'windows-1256' | 'inpage-v1v2' | 'inpage-v3' | 'unknown'

convertWindows1256ToUnicode(win1256Buffer)
```

---

### Sorting

Canonical 39-letter Urdu alphabet order:
`ء ا ب پ ت ٹ ث ج چ ح خ د ڈ ذ ر ڑ ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن ں و ہ ھ ی ے`

```typescript
import { sort, compare, sortKey } from '@iamahsanmehmood/urdu-tools'

sort(['ے', 'ا', 'ک', 'ب'])        // → ['ا', 'ب', 'ک', 'ے']
sort(['زبان', 'اردو', 'بہترین'])   // → ['اردو', 'بہترین', 'زبان']

compare('ا', 'ب')   // negative (ا before ب)
compare('ے', 'ا')   // positive (ے after ا)

sortKey('پاکستان')  // '030003091102280814'
```

Diacritics are stripped before sort key generation — `عِلم` and `عَلم` sort to the same position.

---

### Transliteration

```typescript
import { toRoman, fromRoman } from '@iamahsanmehmood/urdu-tools'

toRoman('پاکستان')     // 'pakistan'
toRoman('بھارت')       // 'bharat'
toRoman('چھوٹا')       // 'chhota'

// 18 aspirated digraphs: بھ→bh  پھ→ph  تھ→th  ٹھ→Th  جھ→jh  چھ→chh
//                         دھ→dh  ڈھ→Dh  کھ→kh  گھ→gh  (+ 8 more)

fromRoman('pakistan')  // 'پاکستان' (best-effort, never throws)
fromRoman('bharat')    // 'بھارت'
```

---

### Analysis

```typescript
import { isUrduChar, getScript, classifyChar, isRTL, getUrduDensity } from '@iamahsanmehmood/urdu-tools'

isUrduChar('پ')     // true  (U+067E — Urdu-specific)
isUrduChar('ب')     // false (U+0628 — shared with Arabic)
isUrduChar('۱')     // true  (U+06F1 — Urdu numeral)

getScript('پاکستان')          // 'urdu'
getScript('مرحبا')             // 'arabic'
getScript('Hello پاکستان')    // 'mixed'

classifyChar('پ')   // 'urdu-letter'
classifyChar('َ')   // 'diacritic'
classifyChar('۱')   // 'numeral'

isRTL('پاکستان')               // true
getUrduDensity('پاکستان زندہ') // 0.28
```

---

## Why this exists

This library was born directly from building [HamaariUrdu](https://hamaariurdu.com) — an Urdu language platform where getting text processing right is not optional. As development progressed, the same class of failures kept surfacing with no off-the-shelf solution:

- **Search returning zero results** — the database stored `ہے` with Urdu `ہ` (U+06C1), but a user's keyboard typed Arabic `ه` (U+0647). Both look identical on screen. No existing library handled this mapping consistently.
- **String equality silently failing** — a word copied from Microsoft Word contains an invisible ZWNJ (U+200C). `"قلم" === "قلم"` returns false. No warning, no error — just zero matches.
- **TinyMCE destroying Izafat** — the editor silently converts the Izafat apostrophe (U+2019) to `&rsquo;` before saving. Every compound word lookup in the database then fails because the stored form and the searched form no longer match.
- **Numbers overflowing** — Urdu text frequently references لاکھ, کروڑ, ارب figures. These exceed `Number.MAX_SAFE_INTEGER`. JavaScript's native number type loses precision silently.
- **Sorting broken by default** — no database or JavaScript runtime has native Urdu collation. Word lists sorted "alphabetically" come out in the wrong order for Urdu readers.
- **Compound words destroying NLP** — `کتاب خانہ` (library), `خوش قسمت` (fortunate), `امورِ خانہ داری` (household affairs) are each one semantic unit. Every tokenizer split them into meaningless pieces, breaking search, NER, and word count.

None of these had satisfactory solutions in any existing Urdu library. urdu-tools was built to fix them at the API boundary. HamaariUrdu now runs entirely on it — and the same fixes benefited [PAL](https://pal.gov.pk) and [DLP](https://dlp.gov.pk) when they integrated the library for their Urdu text search and archiving systems.

---

## The Arabic–Urdu Confusion Problem

This is the **single most common source of silent failures** in Urdu software. Three character pairs render identically in Naskh fonts but are different Unicode code points:

| Visual | Arabic | Urdu | Common source |
|--------|--------|------|---------------|
| ی | ي U+064A | ی U+06CC | Arabic-layout keyboards, copy-paste from Arabic sites |
| ک | ك U+0643 | ک U+06A9 | Arabic-layout keyboards |
| ہ | ه U+0647 | ہ U+06C1 | Arabic text pasted into Urdu context |

A user searching for `ہے` typed with Arabic `ه` will find **zero results** in a database that stored it with Urdu `ہ`. Both look identical on screen.

**Fix — normalize before storage:**

```typescript
// Enable normalizeCharacters when text comes from untrusted input
normalize(userInput, { normalizeCharacters: true })

// Or use the dedicated function:
normalizeCharacters('ي') // → 'ی'
normalizeCharacters('ك') // → 'ک'
normalizeCharacters('ه') // → 'ہ'
```

```csharp
UrduNormalizer.Normalize(input, new NormalizeOptions { NormalizeCharacters = true });
```

---

## Research & Academic Credits

The compound word detection module was built on a foundation of peer-reviewed Urdu linguistics research. We gratefully acknowledge the following works which directly informed the architecture and data:

---

**Jabbar, A. (2016). "Urdu Compound Words Manufacturing a State of Art."**

The primary reference for the affix-based detection layer. This paper provides the Urdu Affix Word List (UAWL) — the definitive catalog of Urdu derivational morphemes — along with a classification framework for compound formation strategies including *ردیف* (suffix) and *سابقہ* (prefix) attachment. The 100+ affix morphemes in Layer 1 of this library's compound engine (`AFFIX_SET`, `PREFIX_SET`, `SUFFIX_SET`) are drawn from this work.

---

**Rahman, M. "A Linguistic Classification of Urdu Compound Words."**
*(motiururducompounds — Revised)*

Informed the typological distinctions between etymological compound categories — specifically the Perso-Arabic vs. native Urdu origin split and how it affects compound formation patterns. Rahman's classification of compound types by morphosyntactic structure (noun+noun, verb+verb, adjective+noun, vav-e-atf chains) shaped the `CompoundType` taxonomy and the izafat detection heuristics.

---

**"High Performance Stemming Algorithm to Handle Multi-Word Expressions."**

Motivated the decision to bind multi-word compounds *before* tokenization rather than post-process token sequences. This paper demonstrates that semantic integrity in NLP pipelines is best preserved by preventing erroneous splits at the input boundary — the exact motivation for `joinCompounds()` + `tokenize()` pipeline design. It also reinforced the necessity of N-gram (not just bigram) scanning for multi-word expression detection.

---

*Search by title on [Google Scholar](https://scholar.google.com) or [ResearchGate](https://www.researchgate.net) to access these works through your institution or the authors' public profiles.*

---

## API Reference

Full interactive API documentation:

**[📖 urdu-tools.github.io/docs →](https://iamahsanmehmood.github.io/urdu-tools/docs/)**

Covers all 35+ functions with live code examples, type signatures, edge case notes, and playground links.

---

## Contributing

**اردو سافٹ ویئر کو بہتر بنانے میں ہمارا ساتھ دیں۔**

Contributions of any size are welcome — from a single compound word entry to a full new module.

| Want to... | How |
|-----------|-----|
| Add a compound word | [CONTRIBUTING.md → Adding compound words](CONTRIBUTING.md#adding-compound-words) or use the Playground report button |
| Report a missing compound | [Open a Missing Compound issue](https://github.com/iamahsanmehmood/urdu-tools/issues/new?template=compound-missing.yml) |
| Report a wrong detection | [Open a Wrong Detection issue](https://github.com/iamahsanmehmood/urdu-tools/issues/new?template=compound-wrong.yml) |
| Report a bug | [Open a Bug Report](https://github.com/iamahsanmehmood/urdu-tools/issues/new?template=bug_report.yml) |
| Request a feature | [Open a Feature Request](https://github.com/iamahsanmehmood/urdu-tools/issues/new?template=feature_request.yml) |
| Contribute code | See [CONTRIBUTING.md](CONTRIBUTING.md) for full dev setup and requirements |

The compound lexicon is the highest-impact area for non-developer contributions — if you're a native Urdu speaker, adding verified compound pairs directly improves detection for everyone.

---

## License

MIT. See [LICENSE](LICENSE).

---

## Author

<div align="center">

<img src="https://avatars.githubusercontent.com/u/108397884?v=4" width="96" height="96" style="border-radius: 50%;" alt="Ahsan Mehmood"/>

### Ahsan Mehmood

[![GitHub](https://img.shields.io/badge/GitHub-iamahsanmehmood-181717?style=flat-square&logo=github)](https://github.com/iamahsanmehmood)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=flat-square&logo=linkedin)](https://linkedin.com/in/iamahsanmehmood)
[![Dev.to](https://img.shields.io/badge/Dev.to-Articles-0A0A0A?style=flat-square&logo=devdotto)](https://dev.to/iamahsanmehmood)

> *"Urdu deserves the same engineering rigour we give to every other language."*

</div>
