import 'package:test/test.dart';
import 'package:urdu_tools/urdu_tools.dart';

void main() {
  group('match', () {
    test('exact match returns matched=true', () {
      expect(match('رحم', 'رحم').matched, isTrue);
    });
    test('no match returns matched=false', () {
      expect(match('رحم', 'کتاب').matched, isFalse);
    });
    test('diacritics layer matches stripped forms', () {
      final r = match('رُحَمً', 'رحم');
      expect(r.matched, isTrue);
      expect(r.layer, equals(MatchLayer.stripDiacritics));
    });
    test('hamza layer normalizes', () {
      final r = match('\u0623حمد', 'احمد');
      expect(r.matched, isTrue);
    });
    test('exact layer is first check', () {
      final r = match('کتاب', 'کتاب');
      expect(r.layer, equals(MatchLayer.exact));
    });
  });

  group('getAllNormalizations', () {
    test('returns at least the original form', () {
      expect(getAllNormalizations('رحم'), isNotEmpty);
    });
    test('first element is always the raw input', () {
      expect(getAllNormalizations('رُحَمً').first, equals('رُحَمً'));
    });
    test('stripped form is included for word with diacritics', () {
      final forms = getAllNormalizations('رُحَمً');
      expect(forms, contains('رحم'));
    });
    test('word with ZWNJ produces form without it', () {
      final forms = getAllNormalizations('رحم\u200cمیں');
      expect(forms.any((f) => !f.contains('\u200c')), isTrue);
    });
    test('clean word returns single form (no duplicates)', () {
      final forms = getAllNormalizations('پاکستان');
      expect(forms, hasLength(1));
    });
  });

  group('fuzzyMatch', () {
    test('finds exact candidate', () {
      final r = fuzzyMatch('کتاب', ['رحم', 'کتاب', 'قلم']);
      expect(r?.candidate, equals('کتاب'));
    });
    test('returns null for empty candidates', () {
      expect(fuzzyMatch('رحم', []), isNull);
    });
    test('returns null when no candidate scores above threshold', () {
      expect(fuzzyMatch('پاکستان', ['hello', 'world']), isNull);
    });
  });
}
