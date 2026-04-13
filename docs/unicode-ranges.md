# Urdu Unicode Ranges

| Block | Range | Notes |
|-------|-------|-------|
| Arabic | U+0600–U+06FF | Core Urdu and Arabic letters, diacritics, numerals |
| Arabic Supplement | U+0750–U+077F | Additional extended letters |
| Arabic Presentation Forms-A | U+FB50–U+FDFF | Positional/isolated forms — normalize away before storage |
| Arabic Presentation Forms-B | U+FE70–U+FEFF | Additional presentation forms — normalize away before storage |

## Urdu-Specific Letters (not found in Arabic)

| Letter | Codepoint | Name |
|--------|-----------|------|
| ٹ | U+0679 | Teh with ring |
| پ | U+067E | Peh |
| چ | U+0686 | Tcheh |
| ڈ | U+0688 | Ddal |
| ڑ | U+0691 | Rreh |
| ک | U+06A9 | Keheh (Urdu kaf) |
| گ | U+06AF | Gaf |
| ں | U+06BA | Noon ghunna |
| ھ | U+06BE | Heh doachashmee |
| ہ | U+06C1 | Heh goal |
| ی | U+06CC | Farsi yeh (Urdu ye) |
| ے | U+06D2 | Yeh barree |

## Arabic–Urdu Confusable Pairs

These render identically in Naskh fonts but are different codepoints:

| Arabic | Urdu | Visual |
|--------|------|--------|
| ي U+064A | ی U+06CC | Ye |
| ك U+0643 | ک U+06A9 | Kaf |
| ه U+0647 | ہ U+06C1 | Heh |

Use `normalizeCharacters()` / `NormalizeArabicToUrdu()` to fix these.
