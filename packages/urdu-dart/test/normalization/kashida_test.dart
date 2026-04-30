import 'package:test/test.dart';
import 'package:urdu_tools/urdu_tools.dart';

void main() {
  group('removeKashida', () {
    test('empty', () => expect(removeKashida(''), equals('')));
    test('removes tatweel',
        () => expect(removeKashida('کـتاب'), equals('کتاب')));
    test('no kashida unchanged',
        () => expect(removeKashida('کتاب'), equals('کتاب')));
    test('only kashida -> empty',
        () => expect(removeKashida('\u0640\u0640\u0640'), equals('')));
    test('multiple kashidas',
        () => expect(removeKashida('کــتاب'), equals('کتاب')));
  });
}
