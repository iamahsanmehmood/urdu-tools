/// Truncates text at the nearest word boundary.
String truncate(String text, int maxLength, [String ellipsis = '...']) {
  if (text.length <= maxLength) return text;
  final sub = text.substring(0, maxLength);
  final lastSpace = sub.lastIndexOf(' ');
  if (lastSpace > 0) return '${sub.substring(0, lastSpace)}$ellipsis';
  return '$sub$ellipsis';
}
