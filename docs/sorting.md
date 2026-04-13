# Urdu Alphabetical Sort Order

The canonical 39-letter Urdu alphabet order used by `sortKey()` / `UrduComparer`:

| Position | Letter | Codepoint |
|----------|--------|-----------|
| 1 | ء | U+0621 |
| 2 | ا | U+0627 |
| 3 | ب | U+0628 |
| 4 | پ | U+067E |
| 5 | ت | U+062A |
| 6 | ٹ | U+0679 |
| 7 | ث | U+062B |
| 8 | ج | U+062C |
| 9 | چ | U+0686 |
| 10 | ح | U+062D |
| 11 | خ | U+062E |
| 12 | د | U+062F |
| 13 | ڈ | U+0688 |
| 14 | ذ | U+0630 |
| 15 | ر | U+0631 |
| 16 | ڑ | U+0691 |
| 17 | ز | U+0632 |
| 18 | ژ | U+0698 |
| 19 | س | U+0633 |
| 20 | ش | U+0634 |
| 21 | ص | U+0635 |
| 22 | ض | U+0636 |
| 23 | ط | U+0637 |
| 24 | ظ | U+0638 |
| 25 | ع | U+0639 |
| 26 | غ | U+063A |
| 27 | ف | U+0641 |
| 28 | ق | U+0642 |
| 29 | ک | U+06A9 |
| 30 | گ | U+06AF |
| 31 | ل | U+0644 |
| 32 | م | U+0645 |
| 33 | ن | U+0646 |
| 34 | ں | U+06BA |
| 35 | و | U+0648 |
| 36 | ہ | U+06C1 |
| 37 | ھ | U+06BE |
| 38 | ی | U+06CC |
| 39 | ے | U+06D2 |

**Note**: Always use `OrderBy()` (stable sort) with `UrduComparer`, never `List.Sort()` (unstable).
