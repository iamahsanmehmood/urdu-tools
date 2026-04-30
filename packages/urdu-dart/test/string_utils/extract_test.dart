import 'package:test/test.dart';
import 'package:urdu_tools/urdu_tools.dart';

void main() {
  group('extractUrdu', () {
    test('empty string returns empty array', () {
      expect(extractUrdu(''), equals([]));
    });
    test('pure Urdu text returns single segment', () {
      expect(extractUrdu('پاکستان'), equals(['پاکستان']));
    });
    test('pure Latin text returns empty array', () {
      expect(extractUrdu('Hello World'), equals([]));
    });
    test('mixed text extracts only Urdu segments', () {
      final segs = extractUrdu('Hello پاکستان World');
      expect(segs, hasLength(1));
      expect(segs[0], equals('پاکستان'));
    });
    test('two Urdu segments separated by Latin', () {
      final segs = extractUrdu('رحم foo آباد');
      expect(segs, hasLength(2));
      expect(segs, contains('رحم'));
      expect(segs, contains('آباد'));
    });
    test('Urdu with trailing Latin produces trimmed segment', () {
      final segs = extractUrdu('کتاب123');
      expect(segs[0], equals('کتاب'));
    });
    test('handles presentation forms range (FB50-FDFF)', () {
      final segs = extractUrdu('\ufe8e'); // ARABIC LETTER ALEF FINAL FORM
      expect(segs, hasLength(1));
    });
  });
}
