# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
