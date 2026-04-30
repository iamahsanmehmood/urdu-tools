/// Pads text to the given length.
String pad(String text, int length,
    [String char = ' ', String direction = 'start']) {
  if (text.length >= length) return text;
  final padding = char * (length - text.length);
  return direction == 'end' ? '$text$padding' : '$padding$text';
}
