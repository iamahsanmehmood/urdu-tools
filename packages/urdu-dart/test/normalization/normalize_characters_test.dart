import 'package:test/test.dart';
import 'package:urdu_tools/urdu_tools.dart';

void main() {
  group('normalizeCharacters', () {
    test('empty string returns empty',
        () => expect(normalizeCharacters(''), equals('')));
    test('Arabic ye -> Urdu ye',
        () => expect(normalizeCharacters('\u064a'), equals('\u06cc')));
    test('Arabic kaf -> Urdu kaf',
        () => expect(normalizeCharacters('\u0643'), equals('\u06a9')));
    test('Arabic heh -> Urdu heh goal',
        () => expect(normalizeCharacters('\u0647'), equals('\u06c1')));
    test('converts all three in a word', () {
      expect(normalizeCharacters('\u0647\u064a'), equals('\u06c1\u06cc'));
    });
    test('correct Urdu chars are unchanged', () {
      final word = 'پاکستان';
      expect(normalizeCharacters(word), equals(word));
    });
    test('mixed Arabic+Urdu word: کتاب with Arabic kaf', () {
      expect(normalizeCharacters('\u0643\u062a\u0627\u0628'),
          equals('\u06a9\u062a\u0627\u0628'));
    });
    test('preserves non-Arabic characters', () {
      expect(normalizeCharacters('Hello رحم'), equals('Hello رحم'));
    });
  });
}
