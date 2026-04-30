import 'package:test/test.dart';
import 'package:urdu_tools/urdu_tools.dart';

void main() {
  group('formatCurrency', () {
    test('PKR zero',
        () => expect(formatCurrency(0, Currency.pkr), equals('صفر روپے')));
    test('PKR whole',
        () => expect(formatCurrency(100, Currency.pkr), equals('ایک سو روپے')));
    test(
        'PKR with paise',
        () => expect(
            formatCurrency(5.50, Currency.pkr), equals('پانچ روپے پچاس پیسے')));
    test('INR whole',
        () => expect(formatCurrency(1, Currency.inr), equals('ایک روپیہ')));
  });

  group('numberToWords', () {
    test('0 -> صفر', () => expect(numberToWords(0), equals('صفر')));
    test('1 -> ایک', () => expect(numberToWords(1), equals('ایک')));
    test('10 -> دس', () => expect(numberToWords(10), equals('دس')));
    test('20 -> بیس', () => expect(numberToWords(20), equals('بیس')));
    test('99 -> ننانوے', () => expect(numberToWords(99), equals('ننانوے')));
    test('100 -> ایک سو', () => expect(numberToWords(100), equals('ایک سو')));
    test('200 -> دو سو', () => expect(numberToWords(200), equals('دو سو')));
    test('1000 -> ایک ہزار',
        () => expect(numberToWords(1000), equals('ایک ہزار')));
    test('100000 -> ایک لاکھ',
        () => expect(numberToWords(100000), equals('ایک لاکھ')));
    test('10000000 -> ایک کروڑ',
        () => expect(numberToWords(10000000), equals('ایک کروڑ')));
    test('1000000000 -> ایک ارب',
        () => expect(numberToWords(1000000000), equals('ایک ارب')));
    test('negative -> منفی prefix',
        () => expect(numberToWords(-5), equals('منفی پانچ')));
    test(
        'ordinal m 1 -> پہلا',
        () => expect(
            numberToWords(1, const NumberToWordsOptions(ordinal: true)),
            equals('پہلا')));
    test(
        'ordinal f 1 -> پہلی',
        () => expect(
            numberToWords(
                1,
                const NumberToWordsOptions(
                    ordinal: true, gender: Gender.feminine)),
            equals('پہلی')));
    test(
        'ordinal m 2 -> دوسرا',
        () => expect(
            numberToWords(2, const NumberToWordsOptions(ordinal: true)),
            equals('دوسرا')));
    test(
        'ordinal 11 -> گیارہواں',
        () => expect(
            numberToWords(11, const NumberToWordsOptions(ordinal: true)),
            equals('گیارہواں')));
  });

  group('wordsToNumber', () {
    test('صفر -> 0', () => expect(wordsToNumber('صفر'), equals(0)));
    test('ایک -> 1', () => expect(wordsToNumber('ایک'), equals(1)));
    test('دس -> 10', () => expect(wordsToNumber('دس'), equals(10)));
    test('ننانوے -> 99', () => expect(wordsToNumber('ننانوے'), equals(99)));
    test('منفی پانچ -> -5',
        () => expect(wordsToNumber('منفی پانچ'), equals(-5)));
    test('unknown -> null', () => expect(wordsToNumber('xyz'), isNull));
    test('empty -> null', () => expect(wordsToNumber(''), isNull));
  });
}
