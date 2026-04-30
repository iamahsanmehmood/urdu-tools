import 'package:test/test.dart';
import 'package:urdu_tools/urdu_tools.dart';

void main() {
  group('compare', () {
    test('a < b', () => expect(compare('اب', 'ب'), lessThan(0)));
    test('a > b', () => expect(compare('ب', 'اب'), greaterThan(0)));
    test('a == b', () => expect(compare('کتاب', 'کتاب'), equals(0)));
    test('empty string handling', () {
      expect(compare('', 'ا'), lessThan(0));
      expect(compare('ا', ''), greaterThan(0));
      expect(compare('', ''), equals(0));
    });
  });

  group('sort', () {
    test('empty list', () => expect(sort([]), isEmpty));
    test('sorts list', () {
      final input = ['خ', 'ب', 'ا', 'پ', 'ت', 'ٹ', 'ث', 'ج', 'چ', 'ح'];
      final expected = ['ا', 'ب', 'پ', 'ت', 'ٹ', 'ث', 'ج', 'چ', 'ح', 'خ'];
      expect(sort(input), equals(expected));
    });
  });
}
