import 'package:test/test.dart';
import 'package:urdu_tools/urdu_tools.dart';

void main() {
  group('getScript', () {
    test('empty -> unknown',
        () => expect(getScript(''), equals(Script.unknown)));
    test('Urdu text -> urdu',
        () => expect(getScript('پاکستان'), equals(Script.urdu)));
    test('Latin only -> latin',
        () => expect(getScript('Hello World'), equals(Script.latin)));
    test('spaces only -> unknown',
        () => expect(getScript('   '), equals(Script.unknown)));
  });

  group('getUrduDensity', () {
    test('empty -> 0', () => expect(getUrduDensity(''), equals(0)));
    test('pure Urdu > 0',
        () => expect(getUrduDensity('پاکستان'), greaterThan(0)));
    test('pure Latin -> 0', () => expect(getUrduDensity('Hello'), equals(0)));
  });
}
