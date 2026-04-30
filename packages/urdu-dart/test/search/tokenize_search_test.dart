import 'package:test/test.dart';
import 'package:urdu_tools/urdu_tools.dart';

void main() {
  group('tokenizeForSearch', () {
    test('empty string returns empty array', () {
      expect(tokenizeForSearch(''), equals([]));
    });
    test('single word returns single token', () {
      expect(tokenizeForSearch('رحم'), equals(['رحم']));
    });
    test('splits on spaces', () {
      final tokens = tokenizeForSearch('رحم اور آباد');
      expect(tokens, hasLength(3));
      expect(tokens, contains('رحم'));
    });
    test('splits on Arabic comma U+060C', () {
      final tokens = tokenizeForSearch('رحم،آباد');
      expect(tokens, hasLength(2));
    });
    test('splits on Arabic semicolon U+061B', () {
      final tokens = tokenizeForSearch('رحم؛آباد');
      expect(tokens, hasLength(2));
    });
    test('strips diacritics from tokens', () {
      final tokens = tokenizeForSearch('رُحَمً');
      expect(tokens[0], equals('رحم'));
    });
    test('filters empty tokens after trimming', () {
      final tokens = tokenizeForSearch('  رحم  ');
      expect(tokens, hasLength(1));
      expect(tokens[0], equals('رحم'));
    });
    test('long sentence tokenizes all words', () {
      final tokens = tokenizeForSearch('پاکستان کی قومی زبان اردو ہے');
      expect(tokens.length, greaterThan(4));
    });
  });
}
