# Urdu Transliteration

## Urdu → Roman (`toRoman` / `UrduRomanizer.ToRoman`)

Uses a finite state machine with digraph priority. Digraphs are matched before single characters:

| Urdu | Roman |
|------|-------|
| بھ | bh |
| پھ | ph |
| تھ | th |
| ٹھ | Th |
| جھ | jh |
| چھ | chh |
| دھ | dh |
| ڈھ | Dh |
| کھ | kh |
| گھ | gh |

This is best-effort transliteration. Short vowels (zabar, zer, pesh) must be present in the text to be converted; they are usually omitted in written Urdu.

## Roman → Urdu (`fromRoman` / `RomanUrduParser.FromRoman`)

Trie-based longest-prefix matching. Suitable for search/autocomplete hints only — not for precise round-trip conversion. Never throws, always returns a best-guess result.
