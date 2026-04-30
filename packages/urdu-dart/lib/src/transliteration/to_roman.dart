import 'roman_map.dart';

/// Transliterates Urdu text into Roman Urdu based on a mapping table.
String toRoman(String text) {
  if (text.isEmpty) return text;
  final buf = StringBuffer();
  var i = 0;
  while (i < text.length) {
    var matched = false;
    for (final entry in urduToRoman) {
      final urdu = entry.$1;
      final roman = entry.$2;
      if (text.startsWith(urdu, i)) {
        buf.write(roman);
        i += urdu.length;
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
