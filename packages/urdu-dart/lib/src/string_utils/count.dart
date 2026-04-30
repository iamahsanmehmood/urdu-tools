/// Returns the number of words in the text, splitting on whitespace.
int wordCount(String text) {
  if (text.trim().isEmpty) return 0;
  return text.split(RegExp(r'\s+')).where((p) => p.isNotEmpty).length;
}

/// Returns the exact number of characters (not bytes).
int charCount(String text) => text.runes.length;
