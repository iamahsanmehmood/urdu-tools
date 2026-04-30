/// Strips ZWNJ (U+200C), ZWJ (U+200D), and soft hyphen (U+00AD).
String stripZeroWidth(String text) =>
    text.replaceAll(RegExp('[\u200c\u200d\u00ad]'), '');
