import '../types.dart';
import '../analysis/char_class.dart';

String _classifyTokenType(String text) {
  if (text.trim().isEmpty) return 'whitespace';
  final runes = text.runes.toList();
  int urdu = 0, latin = 0, num = 0;
  for (final r in runes) {
    final ch = String.fromCharCode(r);
    final cls = classifyChar(ch);
    if (cls == CharClass.urduLetter) {
      urdu++;
    } else if (cls == CharClass.latin) {
      latin++;
    } else if (cls == CharClass.numeral) {
      num++;
    }
  }
  final total = runes.length;
  if (num == total) return 'numeral';
  if (urdu / total >= 0.8) return 'urdu-word';
  if (latin / total >= 0.8) return 'latin-word';
  if (urdu > 0 && latin > 0) return 'mixed';
  return 'urdu-word';
}

/// Tokenizes Urdu text into a list of tokens.
///
/// Splits on whitespace characters (space, NBSP, ZWSP, tab, newline).
/// Each token includes its text and type classification.
List<Token> tokenize(String text) {
  if (text.isEmpty) return [];
  final parts = text.split(RegExp(r'([\u0020\u00a0\u200b\t\n\r\v]+)'));
  return parts
      .where((p) => p.isNotEmpty)
      .map((p) => Token(text: p, type: _classifyTokenType(p)))
      .toList();
}
