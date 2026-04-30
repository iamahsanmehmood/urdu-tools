import 'package:test/test.dart';
import 'package:urdu_tools/urdu_tools.dart';

void main() {
  group('decodeHtmlEntities', () {
    test('empty string returns empty',
        () => expect(decodeHtmlEntities(''), equals('')));
    test('decodes &rsquo; to Izafat apostrophe U+2019', () {
      expect(decodeHtmlEntities('کتاب&rsquo;خانہ'), equals('کتاب\u2019خانہ'));
    });
    test('decodes &nbsp; to non-breaking space', () {
      expect(decodeHtmlEntities('رحم&nbsp;میں'), equals('رحم\u00a0میں'));
    });
    test('decodes &ldquo; and &rdquo;', () {
      expect(
          decodeHtmlEntities('&ldquo;اردو&rdquo;'), equals('\u201cاردو\u201d'));
    });
    test('decodes &lsquo;', () {
      expect(decodeHtmlEntities('&lsquo;word'), equals('\u2018word'));
    });
    test('decodes &amp; last (no double-decode)', () {
      expect(decodeHtmlEntities('&amp;rsquo;'), equals('&rsquo;'));
    });
    test('decodes &quot;', () {
      expect(
          decodeHtmlEntities('say &quot;hello&quot;'), equals('say "hello"'));
    });
    test('decodes &#39;', () {
      expect(decodeHtmlEntities('it&#39;s'), equals("it's"));
    });
    test('no entities -> unchanged', () {
      final clean = 'پاکستان زندہ باد';
      expect(decodeHtmlEntities(clean), equals(clean));
    });
    test('multiple entities in one string', () {
      expect(decodeHtmlEntities('&ldquo;اردو&rdquo;&nbsp;ہے'),
          equals('\u201cاردو\u201d\u00a0ہے'));
    });
  });
}
