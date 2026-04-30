import '../types.dart';
import 'unicode_data.dart';
import 'normalize_characters.dart';

/// 12-layer deterministic normalization pipeline for Urdu text.
///
/// All layers are on by default except kashida, presentationForms,
/// punctuationTrim, and normalizeCharacters.
String normalize(String text, [NormalizeOptions? options]) {
  if (text.isEmpty) return text;
  final o = options ?? NormalizeOptions.defaults;
  var s = text;

  // 1. NFC
  // Dart strings are already NFC-normalized internally in most cases.
  // For full correctness, we'd need a Unicode normalization library,
  // but Dart's String doesn't expose NFC directly. We handle the common
  // case via the explicit Alif Madda composition below.

  // 2. NBSP → space
  if (o.nbsp) s = s.replaceAll('\u00a0', ' ');

  // 3. Alif Madda composition: ا + ◌ٓ → آ
  if (o.alifMadda) {
    s = s.replaceAll(RegExp('[\u0627\u0671]\u0653'), '\u0622');
  }

  // 4. Numeral normalization → ASCII
  if (o.numerals) {
    final buf = StringBuffer();
    for (final r in s.runes) {
      if ((r >= 0x0660 && r <= 0x0669) || (r >= 0x06f0 && r <= 0x06f9)) {
        buf.write((r & 0xf).toString());
      } else {
        buf.writeCharCode(r);
      }
    }
    s = buf.toString();
  }

  // 5. Strip zero-width characters
  if (o.zeroWidth) {
    final zwSet = zeroWidthChars.toSet();
    final buf = StringBuffer();
    for (final r in s.runes) {
      if (!zwSet.contains(r)) buf.writeCharCode(r);
    }
    s = buf.toString();
  }

  // 6. Strip diacritics
  if (o.diacritics) s = stripRanges(s, diacriticRanges);

  // 7. Strip honorifics
  if (o.honorifics) s = stripRanges(s, honorificRanges);

  // 8. Hamza normalization
  if (o.hamza) {
    s = s.replaceAll('\u0623', '\u0627').replaceAll('\u0624', '\u0648');
  }

  // 9. Kashida removal
  if (o.kashida) s = s.replaceAll('\u0640', '');

  // 10. Presentation forms
  if (o.presentationForms) {
    final buf = StringBuffer();
    for (final r in s.runes) {
      final mapped = presentationFormsMap[r];
      if (mapped != null) {
        buf.write(mapped);
      } else {
        buf.writeCharCode(r);
      }
    }
    s = buf.toString();
  }

  // 11. Punctuation trim
  if (o.punctuationTrim) {
    // Strip leading/trailing non-letter, non-digit characters
    s = s.replaceAll(
        RegExp(r'^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$', unicode: true), '');
  }

  // 12. Character normalization (Arabic → Urdu)
  if (o.normalizeCharacters) s = normalizeCharacters(s);

  return s;
}

/// Strips all characters whose code point falls within any of the given ranges.
String stripRanges(String text, List<(int, int)> ranges) {
  if (text.isEmpty) return text;
  final buf = StringBuffer();
  for (final r in text.runes) {
    if (!ranges.any((range) => r >= range.$1 && r <= range.$2)) {
      buf.writeCharCode(r);
    }
  }
  return buf.toString();
}
