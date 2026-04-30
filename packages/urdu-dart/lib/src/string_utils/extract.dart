/// Extracts continuous segments of Urdu text.
List<String> extractUrdu(String text) {
  final segments = <String>[];
  final buf = StringBuffer();
  for (final r in text.runes) {
    final isUrdu = (r >= 0x0600 && r <= 0x06ff) ||
        (r >= 0x0750 && r <= 0x077f) ||
        (r >= 0xfb50 && r <= 0xfdff) ||
        (r >= 0xfe70 && r <= 0xfeff);
    if (isUrdu) {
      buf.writeCharCode(r);
    } else if (r == 0x0020 && buf.isNotEmpty) {
      buf.writeCharCode(r);
    } else {
      final t = buf.toString().trim();
      if (t.isNotEmpty) segments.add(t);
      buf.clear();
    }
  }
  final t = buf.toString().trim();
  if (t.isNotEmpty) segments.add(t);
  return segments;
}
