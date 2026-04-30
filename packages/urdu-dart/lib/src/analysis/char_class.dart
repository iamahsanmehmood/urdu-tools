import '../types.dart';
import '../normalization/diacritics.dart';

/// Code points unique to Urdu (not shared with Arabic).
const Set<int> urduSpecificSet = {
  0x0679,
  0x067e,
  0x0686,
  0x0688,
  0x0691,
  0x06a9,
  0x06af,
  0x06ba,
  0x06be,
  0x06c1,
  0x06cc,
  0x06d2,
};

/// Returns true if the character is Urdu-specific (not shared Arabic).
bool isUrduChar(String char) {
  final cp = char.runes.first;
  return urduSpecificSet.contains(cp) || (cp >= 0x06f0 && cp <= 0x06f9);
}

/// Returns true if the text is predominantly Urdu.
bool isUrduText(String text, [double threshold = 0.1]) {
  if (text.isEmpty) return false;
  final chars = text.runes.where((r) {
    // Filter out whitespace
    return !(r == 0x0020 ||
        r == 0x00a0 ||
        r == 0x0009 ||
        r == 0x000a ||
        r == 0x000d);
  }).toList();
  if (chars.isEmpty) return false;
  final urduCount = chars
      .where((cp) =>
          urduSpecificSet.contains(cp) || (cp >= 0x06f0 && cp <= 0x06f9))
      .length;
  return urduCount / chars.length >= threshold;
}

/// Classifies a character by its Unicode category.
CharClass classifyChar(String char) {
  final cp = char.runes.first;
  if (urduSpecificSet.contains(cp) || (cp >= 0x06f0 && cp <= 0x06f9)) {
    return CharClass.urduLetter;
  }
  if (isDiacritic(cp)) return CharClass.diacritic;
  if (cp >= 0x0660 && cp <= 0x0669) return CharClass.numeral;
  if (cp == 0x060c || cp == 0x061b || cp == 0x061f || cp == 0x06d4) {
    return CharClass.punctuation;
  }
  if (cp >= 0x0600 && cp <= 0x06ff) return CharClass.arabicLetter;
  if (cp >= 0x0030 && cp <= 0x0039) return CharClass.numeral;
  if ((cp >= 0x0041 && cp <= 0x005a) || (cp >= 0x0061 && cp <= 0x007a)) {
    return CharClass.latin;
  }
  if (cp == 0x0020 ||
      cp == 0x00a0 ||
      cp == 0x200b ||
      cp == 0x0009 ||
      cp == 0x000a ||
      cp == 0x000d) {
    return CharClass.whitespace;
  }
  if ((cp >= 0x0021 && cp <= 0x002f) || (cp >= 0x003a && cp <= 0x0040)) {
    return CharClass.punctuation;
  }
  return CharClass.other;
}
