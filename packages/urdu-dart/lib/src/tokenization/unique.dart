/// Returns unique strings preserving first-occurrence order.
List<String> unique(List<String> tokens) {
  final seen = <String>{};
  return tokens.where((t) => seen.add(t)).toList();
}
