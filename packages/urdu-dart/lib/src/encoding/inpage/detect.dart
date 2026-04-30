import 'dart:math';
import 'dart:typed_data';
import '../../types.dart';

/// Detects the encoding of a given binary buffer.
Encoding detectEncoding(Uint8List buffer) {
  if (buffer.length >= 2 && buffer[0] == 0xff && buffer[1] == 0xfe)
    return Encoding.utf16le;
  if (buffer.length >= 2 && buffer[0] == 0xfe && buffer[1] == 0xff)
    return Encoding.utf16be;
  if (buffer.length >= 3 &&
      buffer[0] == 0xef &&
      buffer[1] == 0xbb &&
      buffer[2] == 0xbf) return Encoding.utf8;

  final sampleLen = min(512, buffer.length);
  final sample = buffer.sublist(0, sampleLen);

  int inpageCount = 0;
  for (final b in sample) {
    if (b == 0x04) inpageCount++;
  }
  if (inpageCount / max(sample.length, 1) > 0.05) return Encoding.inpageV1v2;

  int urduCount = 0;
  for (var i = 0; i + 1 < sample.length; i += 2) {
    if (sample[i + 1] == 0x06) urduCount++;
  }
  if (urduCount / max(sample.length / 2, 1) > 0.1) return Encoding.inpageV3;

  return Encoding.utf8;
}
