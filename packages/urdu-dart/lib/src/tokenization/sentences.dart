/// Splits text into sentences on ۔ ؟ ! but NOT on ، or ؛.
List<String> sentences(String text) {
  if (text.isEmpty) return [];
  return text
      .split(RegExp(r'[\u06d4\u061f!]+'))
      .map((s) => s.trim())
      .where((s) => s.isNotEmpty)
      .toList();
}
