import 'unicode_data.dart';
import 'normalize.dart';

/// Removes all Urdu/Arabic diacritics from text.
String stripDiacritics(String text) => stripRanges(text, diacriticRanges);

/// Returns true if the given code point is a diacritic.
bool isDiacritic(int codePoint) =>
    diacriticRanges.any((r) => codePoint >= r.$1 && codePoint <= r.$2);
