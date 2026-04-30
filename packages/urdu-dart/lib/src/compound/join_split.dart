import '../types.dart';
import 'detect.dart';
import 'affix_data.dart';
import 'detect_lexicon.dart';

const _binders = {
  'zwnj': '\u200C',
  'nbsp': '\u00A0',
  'wj': '\u2060',
};

/// Joins detected compound words by replacing the space between them with a binder.
/// Default binder is ZWNJ.
String joinCompounds(String text,
    {CompoundOptions? options, String binderType = 'zwnj'}) {
  if (text.trim().isEmpty) return text;

  final binder = _binders[binderType] ?? _binders['zwnj']!;
  final spans = detectCompounds(text, options);

  if (spans.isEmpty) return text;

  final parts = splitWithDelimiters(text, RegExp(r'\s+'));
  final wordIndices = <int>[];

  for (var i = 0; i < parts.length; i++) {
    if (parts[i].isNotEmpty && RegExp(r'\S').hasMatch(parts[i])) {
      wordIndices.add(i);
    }
  }

  for (final span in spans) {
    for (var wi = span.start; wi < span.end; wi++) {
      final partIdx = wordIndices[wi];
      final wsIdx = partIdx + 1;
      if (wsIdx < parts.length && RegExp(r'^\s+$').hasMatch(parts[wsIdx])) {
        parts[wsIdx] = binder;
      }
    }
  }

  return parts.join('');
}

/// Splits compound words by replacing binder characters with regular spaces.
String splitCompounds(String text) {
  if (text.isEmpty) return text;
  return text
      .replaceAll('\u200C', ' ')
      .replaceAll('\u2060', ' ')
      .replaceAll('\u00A0', ' ');
}

/// Checks whether two adjacent words form a compound.
CompoundMatch isCompound(String w1, String w2, [CompoundOptions? options]) {
  if (w1.isEmpty || w2.isEmpty) return const CompoundMatch(matched: false);

  final opts = options ?? const CompoundOptions();

  if (opts.affix) {
    if (prefixSet.contains(w1) || suffixSet.contains(w2)) {
      return const CompoundMatch(matched: true, type: CompoundType.affix);
    }
  }

  if (opts.izafat) {
    const zer = '\u0650';
    const hamzaAbove = '\u0654';
    const hamza = '\u0621';

    final lastChar = w1[w1.length - 1];
    if (lastChar == zer || lastChar == hamzaAbove || lastChar == hamza) {
      return const CompoundMatch(matched: true, type: CompoundType.izafat);
    }
  }

  if (opts.lexicon) {
    if (isInLexicon(w1, w2)) {
      return const CompoundMatch(matched: true, type: CompoundType.lexicon);
    }
  }

  return const CompoundMatch(matched: false);
}
