import 'package:test/test.dart';
import 'package:urdu_tools/urdu_tools.dart';

void main() {
  group('isRTL', () {
    test('empty -> false', () => expect(isRTL(''), isFalse));
    test('Urdu is RTL', () => expect(isRTL('پاکستان'), isTrue));
    test('Arabic is RTL', () => expect(isRTL('مرحبا'), isTrue));
    test('Latin is LTR', () => expect(isRTL('Hello'), isFalse));
    test('digits alone -> false', () => expect(isRTL('123'), isFalse));
  });
}
