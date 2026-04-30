import 'package:test/test.dart';
import 'package:urdu_tools/urdu_tools.dart';

void main() {
  group('ngrams', () {
    test(
        'bigrams',
        () => expect(
            ngrams(['a', 'b', 'c'], 2),
            equals([
              ['a', 'b'],
              ['b', 'c']
            ])));
    test(
        'trigrams',
        () => expect(
            ngrams(['a', 'b', 'c', 'd'], 3),
            equals([
              ['a', 'b', 'c'],
              ['b', 'c', 'd']
            ])));
    test('n > length -> []', () => expect(ngrams(['a'], 2), equals([])));
    test('n=0 -> []', () => expect(ngrams(['a', 'b'], 0), equals([])));
    test('empty tokens -> []', () => expect(ngrams([], 2), equals([])));
  });

  group('sentences', () {
    test('empty -> []', () => expect(sentences(''), equals([])));
    test('splits on ۔',
        () => expect(sentences('یہ کتاب ہے۔ وہ قلم ہے۔'), hasLength(2)));
    test('splits on ؟',
        () => expect(sentences('کیا حال ہے؟ میں ٹھیک ہوں۔'), hasLength(2)));
    test('does NOT split on ،',
        () => expect(sentences('پاکستان، بھارت، اور چین۔'), hasLength(1)));
    test('does NOT split on ؛',
        () => expect(sentences('ایک سیب؛ دو کیلے۔'), hasLength(1)));
  });

  group('tokenize', () {
    test('empty -> []', () => expect(tokenize(''), equals([])));
    test('single Urdu word', () {
      final t = tokenize('کتاب');
      expect(t, hasLength(1));
      expect(t[0].text, equals('کتاب'));
      expect(t[0].type, equals('urdu-word'));
    });
    test('two words with space', () {
      final words =
          tokenize('کتاب میں').where((t) => t.type != 'whitespace').toList();
      expect(words, hasLength(2));
    });
    test('Latin word classified as latin-word', () {
      expect(tokenize('Hello')[0].type, equals('latin-word'));
    });
    test('numeral classified as numeral', () {
      expect(tokenize('123')[0].type, equals('numeral'));
    });
  });

  group('unique', () {
    test('empty array returns empty array', () {
      expect(unique([]), equals([]));
    });
    test('no duplicates returns same tokens', () {
      expect(unique(['رحم', 'آباد', 'کتاب']), equals(['رحم', 'آباد', 'کتاب']));
    });
    test('exact duplicates are deduplicated', () {
      expect(unique(['رحم', 'رحم', 'آباد']), equals(['رحم', 'آباد']));
    });
    test('diacritic variants are treated as duplicates', () {
      final result = unique(['رُحَمً', 'رحم']);
      expect(result, hasLength(1));
    });
    test('preserves first occurrence of normalized duplicate', () {
      final result = unique(['رُحَمً', 'رحم']);
      expect(result[0], equals('رُحَمً'));
    });
    test('different words kept separate', () {
      expect(unique(['پاکستان', 'ہندوستان']), hasLength(2));
    });
    test('large token list with duplicates', () {
      final tokens = List.filled(100, 'رحم')..add('آباد');
      expect(unique(tokens), hasLength(2));
    });
  });
}
