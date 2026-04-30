import 'package:test/test.dart';
import 'package:urdu_tools/urdu_tools.dart';

void main() {
  group('Smoke Tests', () {
    test('Normalization works', () {
      final input =
          '\u0640\u0640\u0640Uc\u0640OO O" O2\u064eU1O" U?UO O O\u0651OU_U,O';
      final output = normalize(input);
      expect(output, isNotEmpty);
      expect(output, isNot(contains('\u0640'))); // tatweel removed
    });

    test('Number to words works', () {
      expect(numberToWords(125), equals('U?U O3U^ O OU_O3'));
    });

    test('Compound detection works', () {
      final spans = detectCompounds('UcOO O" OrO U+U?');
      expect(spans, isNotEmpty);
    });

    test('Roman transliteration works', () {
      expect(toRoman('O OU,O3OO U+'), equals('pakistan'));
    });
  });
}
