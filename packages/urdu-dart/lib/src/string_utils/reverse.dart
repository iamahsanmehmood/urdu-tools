/// Reverses word order (not characters — preserves Arabic shaping).
String reverse(String text) => text.split(' ').reversed.join(' ');
