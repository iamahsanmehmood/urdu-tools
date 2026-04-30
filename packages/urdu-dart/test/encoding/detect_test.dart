import 'package:test/test.dart';
import 'dart:typed_data';
import 'package:urdu_tools/urdu_tools.dart';

void main() {
  group('detectEncoding', () {
    test('UTF-16 LE BOM detected', () {
      expect(detectEncoding(Uint8List.fromList([0xff, 0xfe, 0x00, 0x00])),
          equals(Encoding.utf16le));
    });
    test('UTF-16 BE BOM detected', () {
      expect(detectEncoding(Uint8List.fromList([0xfe, 0xff, 0x00, 0x00])),
          equals(Encoding.utf16be));
    });
    test('UTF-8 BOM detected', () {
      expect(detectEncoding(Uint8List.fromList([0xef, 0xbb, 0xbf, 0x61])),
          equals(Encoding.utf8));
    });
    test('high 0x04 density -> inpageV1v2', () {
      final buf = Uint8List(20)..fillRange(0, 20, 0x04);
      expect(detectEncoding(buf), equals(Encoding.inpageV1v2));
    });
    test('high Urdu UTF-16LE density -> inpageV3', () {
      final buf = Uint8List.fromList([
        0x27,
        0x06,
        0x27,
        0x06,
        0x27,
        0x06,
        0x27,
        0x06,
        0x27,
        0x06,
        0x27,
        0x06,
        0x27,
        0x06,
        0x27,
        0x06,
        0x27,
        0x06,
        0x27,
        0x06
      ]);
      expect(detectEncoding(buf), equals(Encoding.inpageV3));
    });
    test('plain ASCII defaults to utf-8', () {
      final buf = Uint8List.fromList([0x48, 0x65, 0x6c, 0x6c, 0x6f]);
      expect(detectEncoding(buf), equals(Encoding.utf8));
    });
    test('empty buffer defaults to utf-8', () {
      expect(detectEncoding(Uint8List(0)), equals(Encoding.utf8));
    });
    test('single-byte buffer defaults to utf-8', () {
      expect(detectEncoding(Uint8List.fromList([0x61])), equals(Encoding.utf8));
    });
  });
}
