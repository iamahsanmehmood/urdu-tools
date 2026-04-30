import 'package:test/test.dart';
import 'package:urdu_tools/urdu_tools.dart';

void main() {
  group('compare', () {
    test('ا before ب', () => expect(urduCompare('ا', 'ب'), lessThan(0)));
    test('ب before پ', () => expect(urduCompare('ب', 'پ'), lessThan(0)));
    test('ت before ٹ', () => expect(urduCompare('ت', 'ٹ'), lessThan(0)));
    test('ن before ں', () => expect(urduCompare('ن', 'ں'), lessThan(0)));
    test('ہ before ی', () => expect(urduCompare('ہ', 'ی'), lessThan(0)));
    test(
        'equal words -> 0', () => expect(urduCompare('رحم', 'رحم'), equals(0)));
    test('diacritics ignored in comparison',
        () => expect(urduCompare('رُحَمً', 'رحم'), equals(0)));
  });

  group('sort', () {
    test('empty array', () => expect(urduSort([]), equals([])));
    test('single element',
        () => expect(urduSort(['پاکستان']), equals(['پاکستان'])));
    test(
        'basic alphabet order',
        () => expect(
            urduSort(['ی', 'ا', 'ت', 'ب']), equals(['ا', 'ب', 'ت', 'ی'])));
    test('stable for equal keys',
        () => expect(urduSort(['رحم', 'رحم']), equals(['رحم', 'رحم'])));
  });
}
