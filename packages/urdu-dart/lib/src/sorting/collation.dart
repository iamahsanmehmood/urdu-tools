import '../normalization/diacritics.dart';

const List<int> _urduAlphabet = [
  0x0621,
  0x0627,
  0x0628,
  0x067e,
  0x062a,
  0x0679,
  0x062b,
  0x062c,
  0x0686,
  0x062d,
  0x062e,
  0x062f,
  0x0688,
  0x0630,
  0x0631,
  0x0691,
  0x0632,
  0x0698,
  0x0633,
  0x0634,
  0x0635,
  0x0636,
  0x0637,
  0x0638,
  0x0639,
  0x063a,
  0x0641,
  0x0642,
  0x06a9,
  0x06af,
  0x0644,
  0x0645,
  0x0646,
  0x06ba,
  0x0648,
  0x06c1,
  0x06be,
  0x06cc,
  0x06d2,
];

final Map<int, int> sortOrderMap = {
  for (var i = 0; i < _urduAlphabet.length; i++) _urduAlphabet[i]: i + 1,
};

/// Generates a sort key for a given string based on Urdu lexicographical order.
String sortKey(String word) {
  final clean = stripDiacritics(word);
  final buf = StringBuffer();
  for (final r in clean.runes) {
    final order = sortOrderMap[r] ?? 40;
    buf.write(order.toString().padLeft(2, '0'));
  }
  return buf.toString();
}
