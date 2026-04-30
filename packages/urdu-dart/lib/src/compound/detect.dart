import '../types.dart';
import 'detect_affix.dart';
import 'detect_izafat.dart';
import 'detect_lexicon.dart';
import 'dart:math';

/// Splits a string by a regex, preserving the matching delimiters in the output list.
List<String> splitWithDelimiters(String input, RegExp regExp) {
  final result = <String>[];
  var start = 0;
  for (final match in regExp.allMatches(input)) {
    if (match.start > start) {
      result.add(input.substring(start, match.start));
    }
    result.add(match.group(0)!);
    start = match.end;
  }
  if (start < input.length) {
    result.add(input.substring(start));
  }
  return result;
}

/// Helper to split text into words while keeping track of indices.
({List<String> words, List<({String text, bool isWord})> segments})
    _extractWords(String text) {
  final parts = splitWithDelimiters(text, RegExp(r'\s+'));
  final words = <String>[];
  final segments = <({String text, bool isWord})>[];

  for (final part in parts) {
    if (part.isEmpty) continue;
    final isWord = RegExp(r'\S').hasMatch(part);
    segments.add((text: part, isWord: isWord));
    if (isWord) words.add(part);
  }

  return (words: words, segments: segments);
}

/// Merge overlapping compound spans by CHAINING them.
List<CompoundSpan> _mergeSpans(List<CompoundSpan> spans, List<String> words) {
  if (spans.length <= 1) return spans;

  // Sort by start ascending, then span length descending
  final sorted = List<CompoundSpan>.from(spans)
    ..sort((a, b) {
      if (a.start != b.start) return a.start.compareTo(b.start);
      return (b.end - b.start).compareTo(a.end - a.start);
    });

  final merged = <CompoundSpan>[
    CompoundSpan(
      text: sorted[0].text,
      type: sorted[0].type,
      components: List.from(sorted[0].components),
      start: sorted[0].start,
      end: sorted[0].end,
    )
  ];

  for (var i = 1; i < sorted.length; i++) {
    final current = sorted[i];
    final last = merged.last;

    if (current.start <= last.end) {
      // Extend the span to cover both
      final newEnd = max(last.end, current.end);
      final newComponents = words.sublist(last.start, newEnd + 1);
      final newText = newComponents.join(' ');

      merged[merged.length - 1] = CompoundSpan(
        text: newText,
        type: last.type,
        components: newComponents,
        start: last.start,
        end: newEnd,
      );
    } else {
      merged.add(CompoundSpan(
        text: current.text,
        type: current.type,
        components: List.from(current.components),
        start: current.start,
        end: current.end,
      ));
    }
  }

  return merged;
}

/// Detects compound words in Urdu text using multiple layers.
List<CompoundSpan> detectCompounds(String text, [CompoundOptions? options]) {
  if (text.trim().isEmpty) return [];

  final opts = options ?? const CompoundOptions();
  final extracted = _extractWords(text);
  final words = extracted.words;

  if (words.length < 2) return [];

  final allSpans = <CompoundSpan>[];

  if (opts.affix) allSpans.addAll(detectAffixCompounds(words));
  if (opts.izafat) allSpans.addAll(detectIzafatCompounds(words));
  if (opts.lexicon) allSpans.addAll(detectLexiconCompounds(words));

  return _mergeSpans(allSpans, words);
}
