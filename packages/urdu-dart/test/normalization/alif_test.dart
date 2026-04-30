import 'package:test/test.dart';
import 'package:urdu_tools/urdu_tools.dart';

void main() {
  group('normalizeAlif', () {
    test('empty', () => expect(normalizeAlif(''), equals('')));
    test('آ (U+0622) -> ا',
        () => expect(normalizeAlif('\u0622'), equals('\u0627')));
    test('أ (U+0623) -> ا',
        () => expect(normalizeAlif('\u0623'), equals('\u0627')));
    test('إ (U+0625) -> ا',
        () => expect(normalizeAlif('\u0625'), equals('\u0627')));
    test('alif wasla (U+0671) -> ا',
        () => expect(normalizeAlif('\u0671'), equals('\u0627')));
    test('plain alef (U+0627) unchanged',
        () => expect(normalizeAlif('\u0627'), equals('\u0627')));
    test('word with multiple alif variants',
        () => expect(normalizeAlif('أحمد'), equals('احمد')));
  });
}
