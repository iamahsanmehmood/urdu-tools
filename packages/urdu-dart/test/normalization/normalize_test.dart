import 'package:test/test.dart';
import 'package:urdu_tools/urdu_tools.dart';

void main() {
  group('normalize', () {
    test('empty string returns empty', () => expect(normalize(''), equals('')));
    test('NFC: alif + madda sign -> آ',
        () => expect(normalize('\u0627\u0653'), equals('\u0622')));
    test('NBSP -> space',
        () => expect(normalize('کتاب\u00a0میں'), equals('کتاب میں')));
    test('strips diacritics by default',
        () => expect(normalize('رُحَمً'), equals('رحم')));
    test('extended arabic-indic -> ASCII',
        () => expect(normalize('۱۲۳'), equals('123')));
    test('arabic-indic -> ASCII',
        () => expect(normalize('\u0661\u0662\u0663'), equals('123')));
    test('strips ZWNJ',
        () => expect(normalize('رحم\u200cمیں'), equals('رحممیں')));
    test('strips ZWJ',
        () => expect(normalize('رحم\u200dمیں'), equals('رحممیں')));
    test('normalizes hamza-on-alif to alef',
        () => expect(normalize('\u0623'), equals('\u0627')));
    test('normalizes hamza-on-wao to wao',
        () => expect(normalize('\u0624'), equals('\u0648')));
    test('clean urdu text unchanged',
        () => expect(normalize('پاکستان'), equals('پاکستان')));
    test('only diacritics -> empty string',
        () => expect(normalize('\u064e\u0650\u064f'), equals('')));
    test('mixed script preserves latin',
        () => expect(normalize('Hello پاکستان'), equals('Hello پاکستان')));
    test(
        'option: disable diacritics stripping',
        () => expect(
            normalize('رُحَمً', const NormalizeOptions(diacritics: false)),
            equals('رُحَمً')));
    test(
        'option: kashida removal',
        () => expect(normalize('کـتاب', const NormalizeOptions(kashida: true)),
            equals('کتاب')));
  });
}
