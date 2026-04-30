/// Maps visually identical Arabic code points to the correct Urdu code points.
///
/// These three pairs render identically in Naskh fonts but are different Unicode
/// codepoints — a common source of silent search failures in mixed-input systems.
///
/// Mappings:
///   U+064A ي (Arabic ye)  → U+06CC ی (Urdu ye)
///   U+0643 ك (Arabic kaf) → U+06A9 ک (Urdu kaf)
///   U+0647 ه (Arabic heh) → U+06C1 ہ (Urdu heh goal)
String normalizeCharacters(String text) {
  if (text.isEmpty) return text;
  return text
      .replaceAll('\u064a', '\u06cc') // ي → ی
      .replaceAll('\u0643', '\u06a9') // ك → ک
      .replaceAll('\u0647', '\u06c1'); // ه → ہ
}
