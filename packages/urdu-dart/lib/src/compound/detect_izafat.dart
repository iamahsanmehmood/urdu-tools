import '../types.dart';

/// Detects compound words formed by Izafat markers.
List<CompoundSpan> detectIzafatCompounds(List<String> words) {
  if (words.length < 2) return [];
  final spans = <CompoundSpan>[];

  const zer = '\u0650';
  const hamzaAbove = '\u0654';
  const hamza = '\u0621';

  var i = 0;
  while (i < words.length - 1) {
    final w1 = words[i];
    final w2 = words[i + 1];

    if (w1.isEmpty) {
      i++;
      continue;
    }

    final lastChar = w1[w1.length - 1];

    // Check for explicit zer, hamza-above, or standalone hamza
    if (lastChar == zer || lastChar == hamzaAbove || lastChar == hamza) {
      spans.add(CompoundSpan(
        text: '$w1 $w2',
        type: CompoundType.izafat,
        components: [w1, w2],
        start: i,
        end: i + 1,
      ));
      i += 2;
      continue;
    }

    // Check for Vav-e-Atf (conjunction 'و') which connects two words
    if (w2 == 'و' && i + 2 < words.length) {
      final w3 = words[i + 2];
      spans.add(CompoundSpan(
        text: '$w1 $w2 $w3',
        type: CompoundType.izafat,
        components: [w1, w2, w3],
        start: i,
        end: i + 2,
      ));
      i += 3;
      continue;
    }

    i++;
  }

  return spans;
}
