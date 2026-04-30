import 'package:test/test.dart';
import 'package:urdu_tools/urdu_tools.dart';

void main() {
  group('wordCount', () {
    test('empty -> 0', () => expect(wordCount(''), equals(0)));
    test('one word -> 1', () => expect(wordCount('کتاب'), equals(1)));
    test('two words -> 2', () => expect(wordCount('کتاب میں'), equals(2)));
    test('whitespace only -> 0', () => expect(wordCount('   '), equals(0)));
  });

  group('charCount', () {
    test('empty -> 0', () => expect(charCount(''), equals(0)));
    test('basic count', () => expect(charCount('کتاب'), equals(4)));
  });
}
