/// Normalizes hamza: أ → ا, ؤ → و.
String normalizeHamza(String text) =>
    text.replaceAll('\u0623', '\u0627').replaceAll('\u0624', '\u0648');
