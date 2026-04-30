import 'dart:math';
import 'dart:typed_data';
import '../../types.dart';
import 'char_maps.dart';

InpageVersion _detectVersion(Uint8List buffer) {
  final sampleLen = min(512, buffer.length);
  final sample = buffer.sublist(0, sampleLen);
  var count = 0;
  for (final b in sample) {
    if (b == 0x04) count++;
  }
  return count / max(sample.length, 1) > 0.05
      ? InpageVersion.v1
      : InpageVersion.v3;
}

InpageDecodeResult _decodeV1V2(Uint8List buffer) {
  final paragraphs = <String>[];
  final pageBreakIndices = <int>[];
  final buf = StringBuffer();
  var i = 0;

  while (i < buffer.length) {
    final b = buffer[i];
    if (b == 0x0c) {
      final t = buf.toString().trim();
      if (t.isNotEmpty) {
        paragraphs.add(t);
        buf.clear();
      }
      pageBreakIndices.add(paragraphs.length);
      i++;
    } else if (b == 0x0a || b == 0x0d) {
      final t = buf.toString().trim();
      if (t.isNotEmpty) {
        paragraphs.add(t);
        buf.clear();
      }
      i++;
    } else if (b == 0x04 && i + 1 < buffer.length) {
      final ch = inpageV1V2Map[buffer[i + 1]];
      if (ch != null) buf.write(ch);
      i += 2;
    } else if (b == 0x20) {
      buf.writeCharCode(0x20);
      i++;
    } else if (b >= 0x21 && b <= 0x7e) {
      buf.writeCharCode(b);
      i++;
    } else {
      i++;
    }
  }

  final t = buf.toString().trim();
  if (t.isNotEmpty) paragraphs.add(t);

  return InpageDecodeResult(
    paragraphs: paragraphs,
    pageBreakIndices: pageBreakIndices,
    filteredCount: 0,
  );
}

InpageDecodeResult _decodeV3(Uint8List buffer) {
  final paragraphs = <String>[];
  final pageBreakIndices = <int>[];
  final buf = StringBuffer();

  for (var i = 0; i + 1 < buffer.length; i += 2) {
    final cu = buffer[i] | (buffer[i + 1] << 8);
    if (cu == 0x000c) {
      final t = buf.toString().trim();
      if (t.isNotEmpty) {
        paragraphs.add(t);
        buf.clear();
      }
      pageBreakIndices.add(paragraphs.length);
    } else if (cu == 0x000d || cu == 0x000a || cu == 0xffff) {
      final t = buf.toString().trim();
      if (t.isNotEmpty) {
        paragraphs.add(t);
        buf.clear();
      }
    } else if (cu >= 0x0020) {
      buf.writeCharCode(cu);
    }
  }

  final t = buf.toString().trim();
  if (t.isNotEmpty) paragraphs.add(t);

  return InpageDecodeResult(
    paragraphs: paragraphs,
    pageBreakIndices: pageBreakIndices,
    filteredCount: 0,
  );
}

/// Decodes InPage files (v1-v3) into Unicode paragraphs.
InpageDecodeResult decodeInpage(Uint8List buffer,
    [InpageVersion version = InpageVersion.auto]) {
  final v = version == InpageVersion.auto ? _detectVersion(buffer) : version;
  return v == InpageVersion.v3 ? _decodeV3(buffer) : _decodeV1V2(buffer);
}
