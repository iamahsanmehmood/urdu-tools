import '../types.dart';

/// Normalizes Arabic-Indic and Extended Arabic-Indic numerals.
String normalizeNumerals(String text, NumeralTarget target) {
  final buf = StringBuffer();
  for (final r in text.runes) {
    if ((r >= 0x0660 && r <= 0x0669) || (r >= 0x06f0 && r <= 0x06f9)) {
      final digit = r & 0xf;
      switch (target) {
        case NumeralTarget.ascii:
          buf.write(digit.toString());
        case NumeralTarget.arabicIndic:
          buf.writeCharCode(0x0660 + digit);
        case NumeralTarget.extendedArabicIndic:
          buf.writeCharCode(0x06f0 + digit);
      }
    } else {
      buf.writeCharCode(r);
    }
  }
  return buf.toString();
}

/// Converts ASCII digits or a number to Urdu (Extended Arabic-Indic) numerals.
String toUrduNumerals(Object n) {
  final s = n.toString();
  final buf = StringBuffer();
  for (final c in s.codeUnits) {
    if (c >= 0x30 && c <= 0x39) {
      buf.writeCharCode(0x06f0 + c - 0x30);
    } else {
      buf.writeCharCode(c);
    }
  }
  return buf.toString();
}

/// Converts Urdu (Extended Arabic-Indic) numerals back to ASCII digits.
String fromUrduNumerals(String text) {
  final buf = StringBuffer();
  for (final r in text.runes) {
    if (r >= 0x06f0 && r <= 0x06f9) {
      buf.write((r - 0x06f0).toString());
    } else {
      buf.writeCharCode(r);
    }
  }
  return buf.toString();
}
