import 'package:test/test.dart';
import 'package:urdu_tools/urdu_tools.dart';

void main() {
  group('convertWindows1256ToUnicode', () {
    test('empty string returns empty', () {
      expect(convertWindows1256ToUnicode(''), equals(''));
    });
    test('pure ASCII is unchanged', () {
      expect(convertWindows1256ToUnicode('Hello'), equals('Hello'));
    });
    test('byte 0x81 maps to پ (U+067E)', () {
      expect(convertWindows1256ToUnicode('\x81'), equals('\u067e'));
    });
    test('byte 0xC1 maps to ء (U+0621)', () {
      expect(convertWindows1256ToUnicode('\xc1'), equals('\u0621'));
    });
    test('byte 0xFF maps to ے (U+06D2)', () {
      expect(convertWindows1256ToUnicode('\xff'), equals('\u06d2'));
    });
    test('mixed ASCII and Win1256 bytes', () {
      final result = convertWindows1256ToUnicode('H\xc1');
      expect(result, equals('H\u0621'));
    });
    test('byte 0x80 maps to € (U+20AC)', () {
      expect(convertWindows1256ToUnicode('\x80'), equals('\u20ac'));
    });
  });
}
