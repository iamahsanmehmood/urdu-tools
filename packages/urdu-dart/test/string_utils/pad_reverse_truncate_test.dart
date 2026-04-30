import 'package:test/test.dart';
import 'package:urdu_tools/urdu_tools.dart';

void main() {
  group('pad', () {
    test('pads start by default', () {
      expect(pad('رحم', 5), equals('  رحم'));
    });
    test('pads end when direction is end', () {
      expect(pad('رحم', 5, paddingChar: ' ', direction: PadDirection.end),
          equals('رحم  '));
    });
    test('custom padding character', () {
      expect(pad('رحم', 5, paddingChar: '-'), equals('--رحم'));
    });
    test('no padding when length already met', () {
      expect(pad('رحم', 3), equals('رحم'));
    });
    test('no padding when text longer than target', () {
      expect(pad('پاکستان', 3), equals('پاکستان'));
    });
    test('empty string padded to length', () {
      expect(pad('', 3), equals('   '));
    });
    test('counts by codepoints not bytes', () {
      expect(pad('پ', 4), equals('   پ'));
    });
  });

  group('reverse', () {
    test('empty', () => expect(reverse(''), equals('')));
    test(
        'single word unchanged', () => expect(reverse('کتاب'), equals('کتاب')));
    test('reverses word order',
        () => expect(reverse('یہ کیا ہے'), equals('ہے کیا یہ')));
    test('whitespace only unchanged',
        () => expect(reverse('   '), equals('   ')));
  });

  group('truncate', () {
    test('empty', () => expect(truncate('', 5), equals('')));
    test('short text unchanged',
        () => expect(truncate('کتاب', 10), equals('کتاب')));
    test('truncated ends with ...', () {
      final r = truncate('یہ ایک بہت طویل جملہ ہے', 10);
      expect(r.endsWith('...'), isTrue);
      expect(
          r.length,
          lessThanOrEqualTo(
              10)); // .length in Dart works by characters/runes usually for basic cases.
    });
  });
}
