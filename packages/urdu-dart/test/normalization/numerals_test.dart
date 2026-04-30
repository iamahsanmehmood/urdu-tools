import 'package:test/test.dart';
import 'package:urdu_tools/urdu_tools.dart';

void main() {
  group('normalizeNumerals', () {
    test(
        'extended arabic-indic -> ascii',
        () => expect(
            normalizeNumerals('۱۲۳', NumeralTarget.ascii), equals('123')));
    test(
        'arabic-indic -> ascii',
        () => expect(normalizeNumerals('\u0661\u0662', NumeralTarget.ascii),
            equals('12')));
    test(
        'ascii unchanged when target is extended-arabic-indic',
        () => expect(
            normalizeNumerals('abc', NumeralTarget.extendedArabicIndic),
            equals('abc')));
    test(
        'mixed numerals -> ascii',
        () => expect(
            normalizeNumerals('1۲\u0663', NumeralTarget.ascii), equals('123')));
    test('empty',
        () => expect(normalizeNumerals('', NumeralTarget.ascii), equals('')));
  });

  group('toUrduNumerals', () {
    test('0 -> ۰', () => expect(toUrduNumerals(0), equals('۰')));
    test('9 -> ۹', () => expect(toUrduNumerals(9), equals('۹')));
    test('123 -> ۱۲۳', () => expect(toUrduNumerals(123), equals('۱۲۳')));
  });

  group('fromUrduNumerals', () {
    test('empty', () => expect(fromUrduNumerals(''), equals('')));
    test('۰ -> 0', () => expect(fromUrduNumerals('۰'), equals('0')));
    test('۱۲۳ -> 123', () => expect(fromUrduNumerals('۱۲۳'), equals('123')));
    test('mixed text', () => expect(fromUrduNumerals('abc۱'), equals('abc1')));
  });
}
