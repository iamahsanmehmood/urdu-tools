<div align="right">

**اردو ٹولز** · Urdu Tools

</div>

# urdu-tools

> Production-quality Urdu text processing — TypeScript and C#/.NET, zero dependencies.
> **v1.1.0** — Compound word detection module with 3,262-entry lexicon and N-gram scanning.

[![CI – JS](https://github.com/iamahsanmehmood/urdu-tools/actions/workflows/ci-js.yml/badge.svg)](https://github.com/iamahsanmehmood/urdu-tools/actions/workflows/ci-js.yml)
[![CI – .NET](https://github.com/iamahsanmehmood/urdu-tools/actions/workflows/ci-dotnet.yml/badge.svg)](https://github.com/iamahsanmehmood/urdu-tools/actions/workflows/ci-dotnet.yml)
[![Live Playground](https://img.shields.io/badge/▶_Live_Playground-Try_it_now-7c5cfc)](https://iamahsanmehmood.github.io/urdu-tools/)
[![Docs](https://img.shields.io/badge/📖_Docs-API_Reference-4f9cf9)](https://iamahsanmehmood.github.io/urdu-tools/docs/)
[![npm](https://img.shields.io/badge/npm-GitHub%20Packages-blue)](https://github.com/iamahsanmehmood/urdu-tools/pkgs/npm/urdu-tools)
[![NuGet](https://img.shields.io/badge/nuget-GitHub%20Packages-blue)](https://github.com/iamahsanmehmood/urdu-tools/pkgs/nuget/UrduTools.Core)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **[▶ Try it live in your browser →](https://iamahsanmehmood.github.io/urdu-tools/)**  
> Interactive playground — test every function with real Urdu text, no install needed.
>
> **[📖 Full API Documentation →](https://iamahsanmehmood.github.io/urdu-tools/docs/)**  
> Complete reference with code examples for all 35+ functions across 10 modules.

Urdu is technically one of the most demanding languages to process correctly in software. Characters from the Arabic block overlap with Urdu code points, invisible zero-width joiners silently break string equality, diacritical marks cause identical-looking words to fail lookups, and the South Asian numbering system exceeds JavaScript's safe integer range. This library was built from real production bugs across four different Urdu software projects and handles all of them.

---

## Packages

| Package | Language | Install |
|---------|----------|---------|
| [`@iamahsanmehmood/urdu-tools`](packages/urdu-js) | TypeScript / JavaScript | `npm install @iamahsanmehmood/urdu-tools` |
| [`UrduTools.Core`](packages/urdu-dotnet) | C# / .NET 9 | `dotnet add package UrduTools.Core` |

> **Package registry:** GitHub Packages. See the [packages page](https://github.com/iamahsanmehmood/urdu-tools/packages) for authentication instructions.

Both packages have **zero runtime dependencies** and identical APIs.

---

## Table of Contents

- [Why this exists](#why-this-exists)
- [Quick start](#quick-start)
- [Modules](#modules)
  - [Normalization](#normalization)
  - [Search & Matching](#search--matching)
  - [Numbers](#numbers)
  - [Tokenization](#tokenization)
  - [Compound Words](#compound-words)
  - [String Utilities](#string-utilities)
  - [Encoding](#encoding-js-only)
  - [Sorting](#sorting)
  - [Transliteration](#transliteration)
  - [Analysis](#analysis)
- [API Reference](#api-reference)
- [The Arabic–Urdu Confusion Problem](#the-arabicurdu-confusion-problem)
- [Contributing](#contributing)
- [License](#license)

---

## Why this exists

Across multiple production Urdu projects, the same bugs kept appearing:

- Searching for **بھارت** returns zero results because the database stored it with Arabic `ه` (U+0647) but the user typed Urdu `ھ` (U+06BE) — visually identical in most fonts.
- A word copied from Microsoft Word contains an invisible **ZWNJ** (U+200C). The string `"قلم"` looks identical to `"قلم"` but `===` returns false.
- TinyMCE silently converts the **Izafat apostrophe** (U+2019) to `&rsquo;`, breaking every compound word lookup.
- `numberToWords(10_000_000_000_000)` overflows `Number.MAX_SAFE_INTEGER`.
- Sorting an Urdu word list alphabetically gives wrong results because databases don't have native Urdu collation.

This library fixes all of these at the API boundary.

---

## Quick start

### JavaScript / TypeScript

```bash
npm install @iamahsanmehmood/urdu-tools
```

```typescript
import { normalize, match, numberToWords, sort, toRoman, fingerprint, decodeHtmlEntities } from '@iamahsanmehmood/urdu-tools'
import { detectCompounds, joinCompounds } from '@iamahsanmehmood/urdu-tools/compound'

// Normalize before storage or search
normalize('عِلمٌ')                    // → 'علم'  (strips diacritics)
normalize('\u0627\u0653')             // → 'آ'    (Alif + Madda → precomposed)
normalize('علم\u200cہے')             // → 'علمہے' (strips ZWNJ)

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

// Fingerprint for client-side comparison (no DB round-trip)
fingerprint('عِلمٌ') === fingerprint('عَلم')  // → true

// Decode HTML entities before normalization (for TinyMCE/Quill output)
decodeHtmlEntities('کتاب&rsquo;خانہ')  // → 'کتاب\u2019خانہ'

// Compound word detection (v1.1.0)
detectCompounds('کتاب خانہ بہت اچھا ہے')
// → [{ text: 'کتاب خانہ', type: 'affix', components: ['کتاب','خانہ'], start: 0, end: 1 }]

joinCompounds('کتاب خانہ اچھی جگہ ہے')
// → 'کتاب‌خانہ اچھی جگہ ہے'  (ZWNJ binds compound for downstream tokenizer)
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

### Normalization

The normalization pipeline applies up to 12 layers in a deterministic order. All layers are on by default except 9–12 (destructive or rarely needed).

```typescript
import { normalize, stripDiacritics, normalizeAlif,
         normalizeHamza, normalizeCharacters, fingerprint,
         stripZeroWidth, normalizeNumerals, removeKashida,
         normalizePresentationForms } from '@iamahsanmehmood/urdu-tools'
```

**Pipeline layers:**

| # | Option | Default | What it does |
|---|--------|---------|-------------|
| 1 | `nfc` | ✅ | Unicode NFC canonical form |
| 2 | `nbsp` | ✅ | `\u00A0` non-breaking space → regular space |
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

// Fingerprint: canonical form for comparison (no DB round-trip)
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

**`getAllNormalizations(word)`** — returns an array of progressively normalized forms for database lookup:

```typescript
// Use this when doing your own DB lookup:
const forms = getAllNormalizations('عِلمٌ')
// → ['عِلمٌ', 'عِلمٌ' (nfc), 'عِلمٌ' (no-zw), 'علم' (no-dia), ...]
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

numberToWords(0n)                                     // 'صفر'
numberToWords(100n)                                   // 'ایک سو'
numberToWords(1_000n)                                 // 'ایک ہزار'
numberToWords(100_000n)                               // 'ایک لاکھ'
numberToWords(10_000_000n)                            // 'ایک کروڑ'
numberToWords(1_000_000_000n)                         // 'ایک ارب'
numberToWords(1_000_000_000_000n)                     // 'ایک کھرب'
numberToWords(1_000_000_000_000_000n)                 // 'ایک نیل'
numberToWords(505n)                                   // 'پانچ سو پانچ'
numberToWords(-7n)                                    // 'منفی سات'

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

**Important:** The tokenizer preserves ZWNJ (U+200C) within words — it is used in Urdu compound words to prevent joining without a space. Izafat apostrophe (U+2019 `'`) is treated as part of the word, not punctuation, to correctly handle `کتابِ حسنہ` as a single lookup unit.

---

### Compound Words

Detects and normalizes Urdu compound words (مرکب الفاظ) using three independent layers: **UAWL affix matching**, **izafat marker detection**, and a **3,262-entry curated lexicon** with greedy longest-match N-gram scanning.

```typescript
import { detectCompounds, joinCompounds, splitCompounds, isCompound } from '@iamahsanmehmood/urdu-tools/compound'

// Detect compound word spans — affix layer
detectCompounds('کتاب خانہ بہت اچھا ہے')
// → [{ text: 'کتاب خانہ', type: 'affix', components: ['کتاب', 'خانہ'], start: 0, end: 1 }]

// Izafat layer (vav-e-atf)
detectCompounds('علم و عمل ضروری ہے')
// → [{ text: 'علم و عمل', type: 'izafat', components: ['علم', 'و', 'عمل'], start: 0, end: 2 }]

// Lexicon layer — echo compound
detectCompounds('رنگ برنگے پھول')
// → [{ text: 'رنگ برنگے', type: 'lexicon', components: ['رنگ', 'برنگے'], start: 0, end: 1 }]

// N-gram: 3-word compound — chained affix + izafat spans
detectCompounds('امورِ خانہ داری چلانا')
// → [{ text: 'امورِ خانہ داری', type: 'affix', components: ['امورِ','خانہ','داری'], start: 0, end: 2 }]

// Join compounds with binder character (default: ZWNJ U+200C)
joinCompounds('کتاب خانہ اچھا ہے')
// → 'کتاب‌خانہ اچھا ہے'  (ZWNJ between components; tokenizer treats as one token)

joinCompounds('بے عزت آدمی', { binder: 'nbsp' })
// → 'بے\u00A0عزت آدمی'

// Split compounds back to regular spaces (inverse of joinCompounds)
splitCompounds('کتاب‌خانہ')   // → 'کتاب خانہ'

// Check a specific word pair
isCompound('کتاب', 'خانہ')    // → { matched: true, type: 'affix' }
isCompound('محنت', 'مشقت')    // → { matched: true, type: 'lexicon' }
isCompound('اچھا', 'آدمی')    // → { matched: false, type: null }

// Disable individual layers
detectCompounds(text, { affix: false, izafat: true, lexicon: true })
```

**Detection layers:**

| Layer | Option | Default | What it detects |
|-------|--------|---------|----------------|
| 1 | `affix` | ✅ | UAWL affix-based (100+ affixes): خانہ، گاہ، پرست، بے، نا، خوش، شب، غم… |
| 2 | `izafat` | ✅ | Izafat markers: zer (◌ِ), hamza-above (◌ٔ), vav-e-atf (و) |
| 3 | `lexicon` | ✅ | 3,262-root curated dictionary — echo words, synonym pairs, fixed collocations |

**Algorithm:** Greedy longest-match N-gram forward scan. When the engine finds a matching root in the lexicon, it tries all known tails sorted by length (longest first). A 3-word match always beats a 2-word overlap. Overlapping affix + izafat spans are chained into a single larger compound.

**Compound types returned:**

| Type | Example | Explanation |
|------|---------|-------------|
| `affix` | کتاب خانہ | Either word matches a known affix (خانہ = place suffix) |
| `izafat` | کتابِ حسنہ | Word ends with zer (kasra) or hamza-above |
| `izafat` | علم و عمل | Standalone و between two Urdu content words |
| `lexicon` | محنت مشقت | Curated compound — synonym pair, echo word, fixed expression |

**Binder characters:**

| Binder | Character | Use case |
|--------|-----------|----------|
| `'zwnj'` | U+200C (default) | Zero-width, no visual change, prevents downstream tokenizer splitting |
| `'nbsp'` | U+00A0 | Non-breaking space, visible space preserved |
| `'wj'` | U+2060 | Word Joiner, zero-width, never line-breaks |

**Compound-aware tokenization pipeline:**

```typescript
import { joinCompounds } from '@iamahsanmehmood/urdu-tools/compound'
import { tokenize } from '@iamahsanmehmood/urdu-tools'

// Without compound joining: "کتاب خانہ" → two tokens
// With compound joining:    "کتاب‌خانہ" → one semantic token
const joined = joinCompounds(text)   // step 1: bind compounds
const tokens = tokenize(joined)      // step 2: tokenize
```

---

### String Utilities

```typescript
import { reverse, truncate, wordCount, charCount,
         extractUrdu, decodeHtmlEntities } from '@iamahsanmehmood/urdu-tools'

// Reverse word order (not characters — preserves RTL Arabic shaping)
reverse('پاکستان ہندوستان')     // 'ہندوستان پاکستان'

// Truncate at word boundary
truncate('یہ ایک بہت لمبا جملہ ہے', 10)  // 'یہ ایک...'

// Count words
wordCount('پاکستان زندہ باد')   // 3

// Count grapheme clusters (correct for combining diacritics)
charCount('عِلم')               // 3  (ع+ِ = 1 cluster, ل, م)
charCount('عِلم', { excludeDiacritics: true })  // also 3 after strip

// Extract Urdu/Arabic segments from mixed text
extractUrdu('The word علم means knowledge')
// → ['علم']

// Decode HTML entities BEFORE normalize() when text comes from a rich text editor
// TinyMCE silently converts U+2019 Izafat apostrophe to &rsquo;
decodeHtmlEntities('کتاب&rsquo;خانہ')  // 'کتاب'خانہ'  (U+2019)
decodeHtmlEntities('علم&nbsp;ہے')      // 'علم\u00A0ہے'
```

---

### Encoding (JS only)

Handles InPage — the dominant pre-Unicode Urdu desktop publishing tool — and legacy Windows-1256 encoded data.

```typescript
import { decodeInpage, detectEncoding, convertWindows1256ToUnicode } from '@iamahsanmehmood/urdu-tools'

// Decode an InPage .inp file buffer
const result = decodeInpage(buffer, 'auto')
// result.paragraphs → string[]
// result.pageBreakIndices → number[]

// Versions:
// 'v1'/'v2' — byte-pair encoding with 0x04 prefix
// 'v3'      — UTF-16LE with 0xFFFFFFFF paragraph markers
// 'auto'    — detects by 0x04 byte density

// Detect encoding of an unknown buffer
detectEncoding(buffer)
// → 'utf-8' | 'utf-16le' | 'windows-1256' | 'inpage-v1v2' | 'inpage-v3' | 'unknown'

// Convert Windows-1256 encoded bytes to Unicode string
convertWindows1256ToUnicode(win1256Buffer)
```

---

### Sorting

Canonical 39-letter Urdu alphabet order: ء ا ب پ ت ٹ ث ج چ ح خ د ڈ ذ ر ڑ ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن ں و ہ ھ ی ے

```typescript
import { sort, compare, sortKey } from '@iamahsanmehmood/urdu-tools'

sort(['ے', 'ا', 'ک', 'ب'])
// → ['ا', 'ب', 'ک', 'ے']

sort(['زبان', 'اردو', 'بہترین'])
// → ['اردو', 'بہترین', 'زبان']

compare('ا', 'ب')   // negative (ا comes before ب)
compare('ے', 'ا')   // positive (ے comes after ا)

sortKey('پاکستان')  // '030003091102280814' (deterministic sort key string)
```

Diacritics are stripped before sort key generation — `عِلم` and `عَلم` sort to the same position.

---

### Transliteration

Best-effort Urdu ↔ Roman conversion. The FSM uses digraph priority so `بھ` → `bh` (not `b` + `h`).

```typescript
import { toRoman, fromRoman } from '@iamahsanmehmood/urdu-tools'

toRoman('پاکستان')     // 'pakistan'
toRoman('بھارت')       // 'bharat'
toRoman('چھوٹا')       // 'chhota'

// 18 aspirated digraphs handled:
// بھ→bh  پھ→ph  تھ→th  ٹھ→Th  جھ→jh  چھ→chh
// دھ→dh  ڈھ→Dh  کھ→kh  گھ→gh  (+ 8 more)

fromRoman('pakistan')  // 'پاکستان' (best-effort)
fromRoman('bharat')    // 'بھارت'
```

`fromRoman()` is trie-based, never throws, and is suitable for search autocomplete — not for round-trip conversion.

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
getScript('Hello World')       // 'latin'

classifyChar('پ')   // 'urdu-letter'
classifyChar('ب')   // 'arabic-letter'
classifyChar('َ')   // 'diacritic'
classifyChar('۱')   // 'numeral'
classifyChar(' ')   // 'whitespace'
classifyChar('A')   // 'latin'

isRTL('پاکستان')   // true
isRTL('Hello')      // false
isRTL('123')        // false (no strong directional char)

getUrduDensity('پاکستان زندہ')  // 0.28 (ratio of Urdu-specific chars)
```

---

## The Arabic–Urdu Confusion Problem

This is the **single most common source of silent failures** in Urdu software. Three character pairs render identically in Naskh fonts but are different Unicode code points:

| Visual | Arabic | Urdu | Common in |
|--------|--------|------|-----------|
| ی | ي U+064A | ی U+06CC | Keyboards, copy-paste from Arabic sites |
| ک | ك U+0643 | ک U+06A9 | Arabic-layout keyboards |
| ہ | ه U+0647 | ہ U+06C1 | Arabic text pasted into Urdu context |

A user searching for `ہے` typed with Arabic `ه` will find **zero results** in a database that stored it with Urdu `ہ`. Both look identical.

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
// or:
UrduNormalizer.NormalizeArabicToUrdu(input);
```

---

## API Reference

Full API documentation is available in the [docs/](docs/) directory:

- [Unicode Ranges](docs/unicode-ranges.md)
- [Normalization Pipeline](docs/normalization.md)
- [Sorting Algorithm](docs/sorting.md)
- [Transliteration](docs/transliteration.md)

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## License

MIT © urdu-tools contributors. See [LICENSE](LICENSE).
