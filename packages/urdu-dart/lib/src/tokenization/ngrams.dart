/// Generates word-level n-grams from a list of token strings.
List<List<String>> ngrams(List<String> tokens, int n) {
  if (tokens.length < n) return [];
  final result = <List<String>>[];
  for (var i = 0; i <= tokens.length - n; i++) {
    result.add(tokens.sublist(i, i + n));
  }
  return result;
}
