import 'package:test/test.dart';
import 'package:urdu_tools/urdu_tools.dart';

void main() {
  group('normalizeHamza', () {
    test('empty', () => expect(normalizeHamza(''), equals('')));
    test('أ (U+0623) -> ا',
        () => expect(normalizeHamza('\u0623'), equals('\u0627')));
    test('ؤ  (U+0624) -> و',
        () => expect(normalizeHamza('\u0624'), equals('\u0648')));
    test('isolated hamza (U+0621) unchanged',
        () => expect(normalizeHamza('\u0621'), equals('\u0621')));
    test('ئ (U+0626) unchanged',
        () => expect(normalizeHamza('\u0626'), equals('\u0626')));
  });
}
