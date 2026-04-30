import 'package:test/test.dart';
import 'package:urdu_tools/urdu_tools.dart';

void main() {
  group('stripDiacritics', () {
    test('empty', () => expect(stripDiacritics(''), equals('')));
    test('strips fatha', () => expect(stripDiacritics('رَحَم'), equals('رحم')));
    test('strips kasra', () => expect(stripDiacritics('رِحَم'), equals('رحم')));
    test('strips tanween',
        () => expect(stripDiacritics('رُحَمً'), equals('رحم')));
    test('strips shadda',
        () => expect(stripDiacritics('مُحَمَّد'), equals('محمد')));
    test('preserves plain letters',
        () => expect(stripDiacritics('پاکستان'), equals('پاکستان')));
    test('only diacritics -> empty',
        () => expect(stripDiacritics('\u064e\u064f\u0650'), equals('')));
  });

  group('isDiacritic', () {
    test('fatha (U+064E) is diacritic',
        () => expect(isDiacritic(0x064e), isTrue));
    test('shadda (U+0651) is diacritic',
        () => expect(isDiacritic(0x0651), isTrue));
    test('alef (U+0627) is not diacritic',
        () => expect(isDiacritic(0x0627), isFalse));
    test(
        'latin A is not diacritic', () => expect(isDiacritic(0x0041), isFalse));
  });
}
