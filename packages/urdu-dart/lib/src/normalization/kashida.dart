/// Removes tatweel/kashida (U+0640).
String removeKashida(String text) => text.replaceAll('\u0640', '');
