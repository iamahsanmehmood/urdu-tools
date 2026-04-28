# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] – 2026-04-28

### Fixed

**@iamahsanmehmood/urdu-tools (TypeScript)**

- Added missing compound lexicon entry `برف باری` (snowfall) — fixes #1
- Added missing compound lexicon entry `اخلاق حسنہ` (good morals) — fixes #2
- 6 new tests for the above compounds (detection, `isInLexicon`, sentence context)

---

## [1.1.0] – 2026-04-26

### Added

**@iamahsanmehmood/urdu-tools (TypeScript)**

- **Compound word detection module** — new `@iamahsanmehmood/urdu-tools/compound` sub-package:
  - `detectCompounds(text, options?)` — greedy longest-match N-gram scanner detecting compound words of arbitrary length using three independent layers
  - `joinCompounds(text, options?)` — joins detected compound components with a configurable binder character (default: ZWNJ U+200C)
  - `splitCompounds(text)` — inverse of `joinCompounds`; replaces ZWNJ/NBSP/WJ binders back to regular spaces
  - `isCompound(w1, w2, options?)` — pair-check API returning `{ matched, type }` for a specific word pair
  - **Layer 1 — Affix (UAWL):** directional matching against 100+ known Urdu prefix/suffix morphemes (خانہ، گاہ، پرست، بے، نا، خوش، شب، غم…)
  - **Layer 2 — Izafat:** detects zer (◌ِ), hamza-above (◌ٔ), and vav-e-atf (و) markers
  - **Layer 3 — Lexicon:** 3,262-root curated compound dictionary built from 5,300+ verified entries; supports N-word tails (not just bigrams)
  - Greedy longest-match guarantees that `انسائیکلوپیڈیا آف اسلام` wins over any shorter 2-word overlap
  - Span chaining merges overlapping detections into larger compounds (e.g., `امورِ خانہ` + `خانہ داری` → `امورِ خانہ داری`)
  - Configurable binder: `'zwnj'` (default) · `'nbsp'` · `'wj'`
  - TypeScript types exported: `CompoundSpan`, `CompoundMatch`, `CompoundOptions`, `CompoundType`
  - Constants exported: `COMPOUND_LEXICON` (Map), `AFFIX_SET`, `PREFIX_SET`, `SUFFIX_SET`
- **Playground UI** — "Join Compounds Before Tokenizing" checkbox added to Tokenization module

### Changed

**@iamahsanmehmood/urdu-tools (TypeScript)**

- `toUrduNumerals()` now accepts `string` in addition to `number | bigint` — enables processing of mixed alphanumeric form input without explicit casting
- `sort()` dropped the boolean `reverse` argument for performance; use native `.reverse()` chaining instead: `sort(arr).reverse()`

### Fixed

**@iamahsanmehmood/urdu-tools (TypeScript)**

- Fixed `normalizeNumerals()` call signature in playground (now explicitly passes target encoding `'ascii'`)
- Fixed `wordsToNumber()` null-return handling in playground
- Fixed `classifyChar()` codepoint parsing in playground UI renderer

### Notes

- **Compound detection is TypeScript/JavaScript only** in this release. The `UrduTools.Core` (.NET) package is version-synced to 1.1.0 with no code changes; compound detection for .NET is planned for a future release.
- 392 tests passing (up from 284) across 38 test files; compound module has 99.86% statement coverage.

---

## [1.0.0] – 2025-04-12

### Added

**@urdu-tools/core (TypeScript)**

- `normalize()` — 12-layer configurable normalization pipeline (NFC, NBSP, Alif Madda, numerals, zero-width, diacritics, honorifics, hamza, kashida, presentation forms, punctuation trim, Arabic→Urdu char mapping)
- `normalizeCharacters()` — maps Arabic look-alike codepoints (ي→ی, ك→ک, ه→ہ) to correct Urdu equivalents
- `fingerprint()` — canonical comparison form combining layers 1–8 for client-side word matching
- `stripDiacritics()`, `stripZeroWidth()`, `normalizeAlif()`, `normalizeHamza()`, `removeKashida()`, `normalizePresentationForms()`
- `match()` — 9-layer progressive string matching (exact → NFC → zero-width → diacritics → alif → honorifics → hamza → punctuation → compound split)
- `getAllNormalizations()` — returns all normalized forms of a word for database lookup strategies
- `fuzzyMatch()` — Levenshtein + LCS hybrid fuzzy matching with 0.5 threshold
- `numberToWords()` — bigint-based South Asian number system (ہزار/لاکھ/کروڑ/ارب/کھرب/نیل) with ordinals and gender agreement
- `wordsToNumber()` — parses Urdu number words back to bigint
- `formatCurrency()` — PKR and INR currency formatting in Urdu words
- `toUrduNumerals()`, `normalizeNumerals()`, `fromUrduNumerals()`
- `tokenize()` — Unicode-aware word tokenization preserving Izafat and ZWNJ
- `sentences()` — Urdu sentence splitting on ۔ ؟ ! (not ، or ؛)
- `ngrams()` — sliding window n-gram generation
- `sort()`, `compare()`, `sortKey()` — canonical 39-letter Urdu alphabetical order
- `toRoman()` — Urdu→Roman FSM with 18 aspirated digraph priority rules
- `fromRoman()` — Roman→Urdu trie-based parser (best-effort, never throws)
- `isUrduChar()`, `getScript()`, `classifyChar()`, `isRTL()`, `getUrduDensity()`
- `reverse()` — word-order reversal (not character reversal)
- `truncate()` — word-boundary aware truncation
- `wordCount()`, `charCount()`, `extractUrdu()`
- `decodeHtmlEntities()` — decodes &rsquo;, &nbsp;, &ldquo;, &rdquo; etc. before normalization
- `decodeInpage()` — InPage v1/v2/v3 binary format decoder
- `detectEncoding()` — UTF-8/UTF-16LE/Windows-1256/InPage encoding detection
- `convertWindows1256ToUnicode()` — Windows-1256 legacy encoding conversion

**UrduTools.Core (C#/.NET 9)**

- All modules above ported to C# with identical API semantics
- `UrduNormalizer.Normalize()`, `DiacriticsHelper`, `AlifHelper`, `HamzaHelper`, `NumeralsHelper`, `Fingerprint`
- `UrduMatcher.Match()`, `UrduMatcher.GetAllNormalizations()`, `FuzzyMatcher`
- `NumberToWords.Convert()`, `CurrencyFormatter.Format()`, `UrduNumerals`
- `UrduTokenizer.Tokenize()`, `UrduTokenizer.Sentences()`, `UrduTokenizer.Ngrams()`, `NgramHelper`
- `UrduComparer : IComparer<string>`, `UrduComparer.Sort()`
- `UrduRomanizer.ToRoman()`, `RomanUrduParser.FromRoman()`
- `CharClassifier.Classify()`, `ScriptDetector.Detect()`, `RtlDetector.IsRtl()`
- `UrduStringUtils` — Reverse, Truncate, WordCount, CharCount, ExtractUrdu
- `HtmlEntityDecoder.Decode()`
