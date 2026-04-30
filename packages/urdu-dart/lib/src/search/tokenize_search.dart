import '../normalization/normalize.dart';

/// Tokenizes text into an array of search-ready terms.
List<String> tokenizeForSearch(String text) {
  if (text.isEmpty) return [];
  return normalize(text)
      .split(RegExp(r'[\s\u060c\u061b]+'))
      .map((t) => t.trim())
      .where((t) => t.isNotEmpty)
      .toList();
}
