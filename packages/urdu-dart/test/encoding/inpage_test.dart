import 'package:test/test.dart';
import 'dart:typed_data';
import 'package:urdu_tools/urdu_tools.dart';

void main() {
  group('decodeInpage v1', () {
    test('empty buffer -> no paragraphs', () {
      expect(decodeInpage(Uint8List(0), InpageVersion.v1).paragraphs, isEmpty);
    });
    test('decodes alef: 0x04 0x81 -> ا', () {
      expect(
          decodeInpage(Uint8List.fromList([0x04, 0x81]), InpageVersion.v1)
              .paragraphs[0],
          equals('\u0627'));
    });
    test('decodes پ: 0x04 0x83 -> پ', () {
      expect(
          decodeInpage(Uint8List.fromList([0x04, 0x83]), InpageVersion.v1)
              .paragraphs[0],
          equals('\u067e'));
    });
    test('page break 0x0C creates break index', () {
      final r = decodeInpage(
          Uint8List.fromList([0x04, 0x81, 0x0c, 0x04, 0x82]), InpageVersion.v1);
      expect(r.pageBreakIndices, hasLength(1));
      expect(r.paragraphs, hasLength(2));
    });
    test('newline 0x0A splits paragraphs', () {
      final r = decodeInpage(
          Uint8List.fromList([0x04, 0x81, 0x0a, 0x04, 0x82]), InpageVersion.v1);
      expect(r.paragraphs, hasLength(2));
    });
    test('ASCII chars pass through', () {
      final buf = Uint8List.fromList([0x48, 0x69]); // "Hi"
      expect(decodeInpage(buf, InpageVersion.v1).paragraphs[0], equals('Hi'));
    });
    test('space byte 0x20 is preserved', () {
      final r = decodeInpage(
          Uint8List.fromList([0x04, 0x81, 0x20, 0x04, 0x81]), InpageVersion.v1);
      expect(r.paragraphs[0], equals('\u0627 \u0627'));
    });
    test('carriage return 0x0D splits paragraphs', () {
      final r = decodeInpage(
          Uint8List.fromList([0x04, 0x81, 0x0d, 0x04, 0x81]), InpageVersion.v1);
      expect(r.paragraphs, hasLength(2));
    });
    test('unknown byte is skipped without crash', () {
      final r = decodeInpage(
          Uint8List.fromList([0xff, 0x04, 0x81]), InpageVersion.v1);
      expect(r.paragraphs[0], equals('\u0627'));
    });
  });

  group('decodeInpage v3', () {
    test('empty buffer -> no paragraphs', () {
      expect(decodeInpage(Uint8List(0), InpageVersion.v3).paragraphs, isEmpty);
    });
    test('decodes UTF-16LE Urdu codepoint', () {
      final r =
          decodeInpage(Uint8List.fromList([0x27, 0x06]), InpageVersion.v3);
      expect(r.paragraphs[0], equals('\u0627'));
    });
    test('0x000D splits paragraphs in v3', () {
      final r = decodeInpage(
          Uint8List.fromList([0x27, 0x06, 0x0d, 0x00, 0x28, 0x06]),
          InpageVersion.v3);
      expect(r.paragraphs, hasLength(2));
    });
    test('0x000C creates page break in v3', () {
      final r = decodeInpage(
          Uint8List.fromList([0x27, 0x06, 0x0c, 0x00, 0x28, 0x06]),
          InpageVersion.v3);
      expect(r.pageBreakIndices, hasLength(1));
    });
    test('0xFFFF paragraph marker splits in v3', () {
      final r = decodeInpage(
          Uint8List.fromList([0x27, 0x06, 0xff, 0xff, 0x28, 0x06]),
          InpageVersion.v3);
      expect(r.paragraphs, hasLength(2));
    });
  });

  group('decodeInpage auto', () {
    test('high 0x04 density -> v1 decode', () {
      final buf = Uint8List(20)..fillRange(0, 20, 0x04);
      expect(() => decodeInpage(buf, InpageVersion.auto), returnsNormally);
    });
    test('low 0x04 density -> v3 decode produces Urdu text', () {
      final buf = Uint8List.fromList([0x27, 0x06, 0x28, 0x06]);
      expect(decodeInpage(buf, InpageVersion.auto).paragraphs[0],
          equals('\u0627\u0628'));
    });
  });
}
