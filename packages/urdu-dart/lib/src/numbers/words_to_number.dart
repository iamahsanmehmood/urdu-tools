import 'number_to_words.dart';

Map<String, int>? _wordMap;

void _buildMap() {
  if (_wordMap != null) return;
  _wordMap = {};
  for (var i = 0; i <= 99; i++) {
    _wordMap![numberToWords(i)] = i;
  }
  for (var i = 1; i <= 9; i++) {
    _wordMap![numberToWords(i * 100)] = i * 100;
  }
  _wordMap!['سو'] = 100;
  _wordMap!['ہزار'] = 1000;
  _wordMap!['لاکھ'] = 100000;
  _wordMap!['کروڑ'] = 10000000;
  _wordMap!['ارب'] = 1000000000;
  _wordMap!['کھرب'] = 1000000000000;
  _wordMap!['نیل'] = 1000000000000000;
}

/// Converts Urdu words representing a number back to an integer.
int? wordsToNumber(String text) {
  _buildMap();
  var t = text.trim();
  var negative = false;
  if (t.startsWith('منفی ')) {
    negative = true;
    t = t.substring(5).trim();
  }

  final direct = _wordMap![t];
  if (direct != null) return negative ? -direct : direct;

  final tokens = t.split(RegExp(r'\s+'));
  int total = 0, current = 0;
  for (final tok in tokens) {
    final val = _wordMap![tok];
    if (val == null) return null;
    if (val >= 1000) {
      total += (current == 0 ? 1 : current) * val;
      current = 0;
    } else if (val == 100) {
      current = (current == 0 ? 1 : current) * 100;
    } else {
      current += val;
    }
  }
  total += current;
  return negative ? -total : total;
}
