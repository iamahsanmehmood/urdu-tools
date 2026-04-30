import 'unicode_data.dart';

/// Converts Arabic Presentation Forms (U+FB50–FEFF) to their base characters.
String normalizePresentationForms(String text) {
  if (text.isEmpty) return text;
  final buf = StringBuffer();
  for (final r in text.runes) {
    final mapped = presentationFormsMap[r];
    if (mapped != null) {
      buf.write(mapped);
    } else {
      buf.writeCharCode(r);
    }
  }
  return buf.toString();
}
