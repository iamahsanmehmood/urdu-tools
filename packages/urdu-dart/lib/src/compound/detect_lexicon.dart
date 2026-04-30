import '../types.dart';
import 'lexicon_data.dart';
import '../normalization/diacritics.dart';

/// Checks if a pair of words is in the compound lexicon.
bool isInLexicon(String w1, String w2) {
  final clean1 = stripDiacritics(w1);
  final clean2 = stripDiacritics(w2);
  return compoundLexicon.contains('$clean1 $clean2');
}

/// Detects compound words based on a lexicon lookup.
List<CompoundSpan> detectLexiconCompounds(List<String> words) {
  if (words.length < 2) return [];
  final spans = <CompoundSpan>[];

  for (var i = 0; i < words.length - 1; i++) {
    final w1 = words[i];
    final w2 = words[i + 1];

    if (isInLexicon(w1, w2)) {
      spans.add(CompoundSpan(
        text: '$w1 $w2',
        type: CompoundType.lexicon,
        components: [w1, w2],
        start: i,
        end: i + 1,
      ));
      i++;
    }
  }

  return spans;
}
