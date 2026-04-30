import '../types.dart';
import 'normalize.dart';

/// Produces a canonical comparison fingerprint for an Urdu word.
///
/// Combines normalization layers 1-8 plus punctuation trimming.
/// Designed for client-side word-status matching without a DB round-trip.
String fingerprint(String text) {
  if (text.isEmpty) return '';
  return normalize(
      text,
      const NormalizeOptions(
        nfc: true,
        nbsp: true,
        alifMadda: true,
        numerals: true,
        zeroWidth: true,
        diacritics: true,
        honorifics: true,
        hamza: true,
        kashida: false,
        presentationForms: false,
        punctuationTrim: true,
      )).trim();
}
