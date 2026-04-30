import '../types.dart';
import 'char_class.dart';

/// Returns the fraction of non-whitespace characters that are Urdu-specific.
double getUrduDensity(String text) {
  if (text.isEmpty) return 0;
  final chars = text.runes
      .where((r) => !(r == 0x0020 ||
          r == 0x00a0 ||
          r == 0x0009 ||
          r == 0x000a ||
          r == 0x000d))
      .toList();
  if (chars.isEmpty) return 0;
  final urdu = chars
      .where((cp) =>
          urduSpecificSet.contains(cp) || (cp >= 0x06f0 && cp <= 0x06f9))
      .length;
  return urdu / chars.length;
}

/// Detects the dominant script of the text.
Script getScript(String text) {
  if (text.trim().isEmpty) return Script.unknown;
  final chars = text.runes
      .where((r) => !(r == 0x0020 ||
          r == 0x00a0 ||
          r == 0x0009 ||
          r == 0x000a ||
          r == 0x000d))
      .toList();
  if (chars.isEmpty) return Script.unknown;

  int urdu = 0, arabic = 0, latin = 0;
  for (final cp in chars) {
    if (urduSpecificSet.contains(cp) || (cp >= 0x06f0 && cp <= 0x06f9)) {
      urdu++;
    } else if (cp >= 0x0600 && cp <= 0x06ff) {
      arabic++;
    } else if ((cp >= 0x0041 && cp <= 0x005a) ||
        (cp >= 0x0061 && cp <= 0x007a)) {
      latin++;
    }
  }

  final total = chars.length;
  if (urdu / total >= 0.1 && latin / total >= 0.1) return Script.mixed;
  if (urdu / total >= 0.1) return Script.urdu;
  if (arabic / total >= 0.5) return Script.arabic;
  if (latin / total >= 0.8) return Script.latin;
  if (urdu > 0 || arabic > 0) return Script.arabic;
  return Script.unknown;
}
