import 'package:test/test.dart';
import 'package:urdu_tools/urdu_tools.dart';

void main() {
  group('normalizePresentationForms', () {
    test('empty string returns empty',
        () => expect(normalizePresentationForms(''), equals('')));
    test('plain Urdu text passes through unchanged',
        () => expect(normalizePresentationForms('پاکستان'), equals('پاکستان')));
    test(
        'presentation form ﻻ (U+FEFB) -> لا',
        () => expect(
            normalizePresentationForms('\ufefb'), equals('\u0644\u0627')));
    test('presentation form ﺎ (U+FE8E) -> ا',
        () => expect(normalizePresentationForms('\ufe8e'), equals('\u0627')));
    test('mixed text: presentation form in sentence is normalized', () {
      final result = normalizePresentationForms('کتاب\ufe8eمیں');
      expect(result, contains('\u0627'));
      expect(result, isNot(contains('\ufe8e')));
    });
    test('characters outside presentation range pass through',
        () => expect(normalizePresentationForms('رحم'), equals('رحم')));
  });
}
