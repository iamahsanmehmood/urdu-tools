/// Decodes HTML entities to their Unicode equivalents before Urdu text processing.
///
/// Must be called BEFORE normalize() when text originates from rich text editors.
String decodeHtmlEntities(String text) {
  if (text.isEmpty) return text;
  return text
      .replaceAll('&nbsp;', '\u00a0')
      .replaceAll('&ldquo;', '\u201c')
      .replaceAll('&rdquo;', '\u201d')
      .replaceAll('&lsquo;', '\u2018')
      .replaceAll('&rsquo;', '\u2019')
      .replaceAll('&quot;', '"')
      .replaceAll('&#39;', "'")
      .replaceAll('&amp;', '&'); // must be last
}
