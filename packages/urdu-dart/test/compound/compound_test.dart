import 'package:test/test.dart';
import 'package:urdu_tools/urdu_tools.dart';

void main() {
  group('isCompound (Lexicon)', () {
    test('محنت + مشقت', () {
      final r = isCompound('محنت', 'مشقت');
      expect(r.matched, isTrue);
      expect(r.type, equals(CompoundType.lexicon));
    });
    test('not compound', () {
      final r = isCompound('محنت', 'نہیں');
      expect(r.matched, isFalse);
    });
  });

  group('isCompound (Affix)', () {
    test('کتب + خانہ', () {
      final r = isCompound('کتب', 'خانہ');
      expect(r.matched, isTrue);
      expect(r.type, equals(CompoundType.affix));
    });
  });

  group('isCompound (Izafat)', () {
    test('طالبِ + علم', () {
      final r = isCompound('طالبِ', 'علم');
      expect(r.matched, isTrue);
      expect(r.type, equals(CompoundType.izafat));
    });
    test('علمِ + دین', () {
      final r = isCompound('علمِ', 'دین');
      expect(r.matched, isTrue);
      expect(r.type, equals(CompoundType.izafat));
    });
  });

  group('detectCompounds', () {
    test('empty', () {
      expect(detectCompounds(''), isEmpty);
    });
    test('detects multiple compounds in text', () {
      final text = 'یہ کتب خانہ اور طالبِ علم ہے۔';
      final spans = detectCompounds(text);
      expect(spans, hasLength(2));
      expect(spans.any((s) => s.text == 'کتب خانہ'), isTrue);
      expect(spans.any((s) => s.text == 'طالبِ علم'), isTrue);
    });
  });

  group('joinCompounds', () {
    test('joins with ZWNJ by default', () {
      final joined = joinCompounds('کتب خانہ');
      expect(joined, contains('\u200C'));
      expect(joined, equals('کتب\u200Cخانہ'));
    });
    test('joins with NBSP when specified', () {
      final joined = joinCompounds('کتب خانہ', binderType: 'nbsp');
      expect(joined, contains('\u00A0'));
      expect(joined, equals('کتب\u00A0خانہ'));
    });
  });
}
