import '../normalization/normalize.dart';

/// Returns unique strings preserving first-occurrence order, considering normalization.
List<String> unique(List<String> tokens) {
  final seen = <String, String>{};
  for (final t in tokens) {
    final key = normalize(t);
    if (!seen.containsKey(key)) {
      seen[key] = t;
    }
  }
  return seen.values.toList();
}
