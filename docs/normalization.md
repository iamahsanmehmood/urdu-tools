# Urdu Normalization Pipeline

The normalization pipeline applies 12 layers in a fixed order. All layers are on by default except 9–12.

| # | Layer | Default | Description |
|---|-------|---------|-------------|
| 1 | NFC | on | Unicode canonical decomposition/composition |
| 2 | NBSP | on | Non-breaking space (U+00A0) → regular space |
| 3 | Alif Madda | on | `[\u0627\u0671]\u0653` → U+0622 آ |
| 4 | Numerals | on | Arabic-Indic and Extended Arabic-Indic → ASCII digits |
| 5 | Zero-width | on | Strip ZWNJ (U+200C), ZWJ (U+200D), soft hyphen (U+00AD) |
| 6 | Diacritics | on | Strip zabar, zer, pesh, shadda, sukun, etc. |
| 7 | Honorifics | on | Strip Islamic honorific symbols U+0610–U+061A, U+06D6–U+06ED |
| 8 | Hamza | on | U+0623 → U+0627, U+0624 → U+0648 |
| 9 | Kashida | off | Strip tatweel U+0640 |
| 10 | Presentation Forms | off | Map U+FB50–U+FEFF to base characters |
| 11 | Punctuation trim | off | Strip leading/trailing non-letter/non-digit |
| 12 | Char normalize | off | Map Arabic look-alikes to correct Urdu codepoints |

## Fingerprint

`fingerprint()` / `Fingerprint.Compute()` applies layers 1–8 plus punctuation trimming to produce a canonical comparison form. Use it when comparing words from different sources (editor input vs database).

## Search Strategy

`match()` / `UrduMatcher.Match()` progressively applies normalization until a match is found:

1. Exact
2. NFC
3. Strip zero-width
4. Strip diacritics
5. Normalize Alif
6. Strip honorifics
7. Normalize Hamza
8. Trim punctuation
9. Compound word splitting
