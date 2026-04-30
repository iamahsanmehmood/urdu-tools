import 'package:test/test.dart';
import 'package:urdu_tools/urdu_tools.dart';

void main() {
  group('fromRoman', () {
    test('empty', () => expect(fromRoman(''), equals('')));
    test('a -> ا', () => expect(fromRoman('a'), equals('\u0627')));
    test('b -> ب', () => expect(fromRoman('b'), equals('\u0628')));
    test('ch -> چ', () => expect(fromRoman('ch'), equals('\u0686')));
    test('sh -> ش', () => expect(fromRoman('sh'), equals('\u0634')));
    test('ay -> ے', () => expect(fromRoman('ay'), equals('\u06d2')));
    test('does not throw on unknown', () {
      expect(() => fromRoman('xyz123'), returnsNormally);
    });
  });

  group('toRoman', () {
    test('empty', () => expect(toRoman(''), equals('')));
    test('ا -> a', () => expect(toRoman('\u0627'), equals('a')));
    test('ب -> b', () => expect(toRoman('\u0628'), equals('b')));
    test('پ -> p', () => expect(toRoman('\u067e'), equals('p')));
    test('چ -> ch', () => expect(toRoman('\u0686'), equals('ch')));
    test('ش -> sh', () => expect(toRoman('\u0634'), equals('sh')));
    test('digraph بھ -> bh',
        () => expect(toRoman('\u0628\u06be'), equals('bh')));
    test('digraph چھ -> chh',
        () => expect(toRoman('\u0686\u06be'), equals('chh')));
    test('non-urdu chars pass through',
        () => expect(toRoman('Hello'), equals('Hello')));
  });
}
