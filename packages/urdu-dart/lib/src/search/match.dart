import '../types.dart';
import '../normalization/normalize.dart';
import '../normalization/diacritics.dart';
import '../normalization/zero_width.dart';
import '../normalization/alif.dart';
import '../normalization/hamza.dart';
import '../normalization/unicode_data.dart';
import 'dart:math';

const List<MatchLayer> _defaultStrategy = [
  MatchLayer.exact,
  MatchLayer.nfc,
  MatchLayer.stripZerowidth,
  MatchLayer.stripDiacritics,
  MatchLayer.normalizeAlif,
  MatchLayer.stripHonorifics,
  MatchLayer.normalizeHamza,
  MatchLayer.trimPunctuation,
  MatchLayer.compoundSplit,
];

String _applyLayer(String text, MatchLayer layer) {
  switch (layer) {
    case MatchLayer.exact:
      return text;
    case MatchLayer.nfc:
      // Assuming strings are composed enough or we skip literal NFC
      // and let the next layers do the rest. Dart doesn't have an easy NFC method.
      return text;
    case MatchLayer.stripZerowidth:
      return stripZeroWidth(text);
    case MatchLayer.stripDiacritics:
      return stripDiacritics(text);
    case MatchLayer.normalizeAlif:
      return normalizeAlif(text);
    case MatchLayer.stripHonorifics:
      return stripRanges(text, honorificRanges);
    case MatchLayer.normalizeHamza:
      return normalizeHamza(text);
    case MatchLayer.trimPunctuation:
      return text.replaceAll(
          RegExp(r'^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$', unicode: true), '');
    default:
      return text;
  }
}

/// Matches a query string against a target string using progressive normalization.
MatchResult match(String query, String target,
    [List<MatchLayer> strategy = _defaultStrategy]) {
  var q = query;
  var t = target;
  for (final layer in strategy) {
    if (layer == MatchLayer.compoundSplit) {
      final qParts = q.split(RegExp(r'\s+'));
      final tParts = t.split(RegExp(r'\s+'));
      if (qParts.any((qp) => tParts.contains(qp))) {
        return MatchResult(
            matched: true,
            layer: layer,
            normalizedQuery: q,
            normalizedTarget: t);
      }
      continue;
    }
    q = _applyLayer(q, layer);
    t = _applyLayer(t, layer);
    if (q == t) {
      return MatchResult(
          matched: true, layer: layer, normalizedQuery: q, normalizedTarget: t);
    }
  }
  return MatchResult(
      matched: false, layer: null, normalizedQuery: q, normalizedTarget: t);
}

int _levenshtein(String s, String t) {
  final m = s.length, n = t.length;
  if (m == 0) return n;
  if (n == 0) return m;
  var prev = List<int>.generate(n + 1, (i) => i);
  var curr = List<int>.filled(n + 1, 0);
  for (var i = 1; i <= m; i++) {
    curr[0] = i;
    for (var j = 1; j <= n; j++) {
      final cost = s[i - 1] == t[j - 1] ? 0 : 1;
      curr[j] = min(min(curr[j - 1] + 1, prev[j] + 1), prev[j - 1] + cost);
    }
    final temp = prev;
    prev = curr;
    curr = temp;
  }
  return prev[n];
}

int _lcsLength(String s, String t) {
  final m = s.length, n = t.length;
  final dp = List.generate(m + 1, (_) => List.filled(n + 1, 0));
  for (var i = 1; i <= m; i++) {
    for (var j = 1; j <= n; j++) {
      dp[i][j] = s[i - 1] == t[j - 1]
          ? dp[i - 1][j - 1] + 1
          : max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}

class FuzzyMatchResult {
  final String candidate;
  final double score;

  const FuzzyMatchResult(this.candidate, this.score);
}

/// Returns the best fuzzy match for a query from a list of candidates.
FuzzyMatchResult? fuzzyMatch(String query, List<String> candidates) {
  if (candidates.isEmpty) return null;
  final normQ = normalize(query);
  FuzzyMatchResult? best;
  for (final c in candidates) {
    final normC = normalize(c);
    final maxLen = max(normQ.length, normC.length);
    if (maxLen == 0) continue;
    final ed = _levenshtein(normQ, normC);
    final lcs = _lcsLength(normQ, normC);
    final score = 0.6 * (1 - ed / maxLen) + 0.4 * (lcs / maxLen);
    if (score >= 0.5 && (best == null || score > best.score)) {
      best = FuzzyMatchResult(c, score);
    }
  }
  return best;
}

/// Returns an array of progressively normalized forms of a word.
List<String> getAllNormalizations(String word) {
  final forms = <String>[word];
  void add(String s) {
    if (s != forms.last) forms.add(s);
  }

  // Skipping NFC here since Dart lacks it native; keeping as 'word'
  final nfc = word;
  add(nfc);
  final noZw = stripZeroWidth(nfc);
  add(noZw);
  final noDia = stripDiacritics(noZw);
  add(noDia);
  final normAlif = normalizeAlif(noDia);
  add(normAlif);
  final noHon = stripRanges(normAlif, honorificRanges);
  add(noHon);
  final normHamza = normalizeHamza(noHon);
  add(normHamza);
  final trimmed = normHamza.replaceAll(
      RegExp(r'^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$', unicode: true), '');
  add(trimmed);

  return forms;
}
