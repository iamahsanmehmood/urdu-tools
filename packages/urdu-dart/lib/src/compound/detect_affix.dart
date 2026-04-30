import '../types.dart';
import 'affix_data.dart';

/// Detects compound words based on affix patterns.
List<CompoundSpan> detectAffixCompounds(List<String> words) {
  if (words.length < 2) return [];
  final spans = <CompoundSpan>[];

  for (var i = 0; i < words.length - 1; i++) {
    final w1 = words[i];
    final w2 = words[i + 1];

    if (prefixSet.contains(w1) || suffixSet.contains(w2)) {
      spans.add(CompoundSpan(
        text: '$w1 $w2',
        type: CompoundType.affix,
        components: [w1, w2],
        start: i,
        end: i + 1,
      ));
      // Skip the next word to avoid overlapping pairs within this layer
      i++;
    }
  }

  return spans;
}
