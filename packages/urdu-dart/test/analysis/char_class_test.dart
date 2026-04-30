import 'package:test/test.dart';
import 'package:urdu_tools/urdu_tools.dart';

void main() {
  group('isUrduChar', () {
    test('پ is Urdu', () => expect(isUrduChar('پ'), isTrue));
    test('ک is Urdu', () => expect(isUrduChar('ک'), isTrue));
    test('ے is Urdu', () => expect(isUrduChar('ے'), isTrue));
    test('ب is not Urdu-specific', () => expect(isUrduChar('ب'), isFalse));
    test('A is not Urdu', () => expect(isUrduChar('A'), isFalse));
    test('۱ (urdu numeral) is Urdu', () => expect(isUrduChar('۱'), isTrue));
  });

  group('isUrduText', () {
    test('empty is false', () => expect(isUrduText(''), isFalse));
    test('پاکستان is Urdu', () => expect(isUrduText('پاکستان'), isTrue));
    test('Hello is not Urdu', () => expect(isUrduText('Hello'), isFalse));
    test('whitespace only is false', () => expect(isUrduText('   '), isFalse));
  });

  group('classifyChar', () {
    test('پ -> urduLetter',
        () => expect(classifyChar('پ'), equals(CharClass.urduLetter)));
    test('ب -> arabicLetter',
        () => expect(classifyChar('ب'), equals(CharClass.arabicLetter)));
    test(
        'A -> latin', () => expect(classifyChar('A'), equals(CharClass.latin)));
    test('1 -> numeral',
        () => expect(classifyChar('1'), equals(CharClass.numeral)));
    test('space -> whitespace',
        () => expect(classifyChar(' '), equals(CharClass.whitespace)));
    test('، -> punctuation',
        () => expect(classifyChar('\u060c'), equals(CharClass.punctuation)));
    test('diacritic fatha -> diacritic',
        () => expect(classifyChar('\u064e'), equals(CharClass.diacritic)));
  });
}
