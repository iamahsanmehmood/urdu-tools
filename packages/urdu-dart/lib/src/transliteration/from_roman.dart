import 'roman_map.dart';

/// Transliterates Roman Urdu text back to Urdu script based on a mapping table.
String fromRoman(String text) {
  if (text.isEmpty) return text;
  final buf = StringBuffer();
  var i = 0;
  while (i < text.length) {
    var matched = false;
    for (final entry in romanToUrdu) {
      final roman = entry.$1;
      final urdu = entry.$2;
      if (text.startsWith(roman, i)) {
        buf.write(urdu);
        i += roman.length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      buf.write(text[i]);
      i++;
    }
  }
  return buf.toString();
}
