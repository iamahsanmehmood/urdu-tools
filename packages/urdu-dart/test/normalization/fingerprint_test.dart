import 'package:test/test.dart';
import 'package:urdu_tools/urdu_tools.dart';

void main() {
  group('fingerprint', () {
    test('empty string returns empty',
        () => expect(fingerprint(''), equals('')));
    test('same word different diacritics -> same fingerprint', () {
      expect(fingerprint('رُحَم'), equals(fingerprint('رَحَم')));
    });
    test('word with ZWNJ matches word without', () {
      expect(fingerprint('رحم\u200cمیں'), equals(fingerprint('رحممیں')));
    });
    test('word with honorific matches without', () {
      expect(fingerprint('نبیؐ'), equals(fingerprint('نبی')));
    });
    test('hamza-on-alif normalised to alif', () {
      expect(fingerprint('\u0623\u0644\u0644\u0647'),
          equals(fingerprint('\u0627\u0644\u0644\u0647')));
    });
    test('strips leading punctuation', () {
      expect(fingerprint('"رحم'), equals(fingerprint('رحم')));
    });
    test('strips trailing punctuation', () {
      expect(fingerprint('رحم"'), equals(fingerprint('رحم')));
    });
    test('deterministic: same input -> same output', () {
      final word = 'پاکستان';
      expect(fingerprint(word), equals(fingerprint(word)));
    });
    test('returns plain Urdu letters without diacritics', () {
      expect(fingerprint('رُحَمً'), equals('رحم'));
    });
  });
}
