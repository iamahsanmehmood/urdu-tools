import 'collation.dart';

/// Compares two Urdu strings lexicographically.
int compare(String a, String b) {
  final ka = sortKey(a);
  final kb = sortKey(b);
  return ka.compareTo(kb);
}

/// Sorts a list of Urdu strings lexicographically.
List<String> sort(List<String> words) {
  final copy = List<String>.from(words);
  copy.sort(compare);
  return copy;
}
