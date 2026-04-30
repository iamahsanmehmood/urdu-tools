import '../types.dart';

const List<String> _units = [
  'صفر',
  'ایک',
  'دو',
  'تین',
  'چار',
  'پانچ',
  'چھ',
  'سات',
  'آٹھ',
  'نو',
  'دس',
  'گیارہ',
  'بارہ',
  'تیرہ',
  'چودہ',
  'پندرہ',
  'سولہ',
  'سترہ',
  'اٹھارہ',
  'انیس',
  'بیس',
  'اکیس',
  'بائیس',
  'تئیس',
  'چوبیس',
  'پچیس',
  'چھبیس',
  'ستائیس',
  'اٹھائیس',
  'انتیس',
  'تیس',
  'اکتیس',
  'بتیس',
  'تینتیس',
  'چونتیس',
  'پینتیس',
  'چھتیس',
  'سینتیس',
  'اڑتیس',
  'انتالیس',
  'چالیس',
  'اکتالیس',
  'بیالیس',
  'تینتالیس',
  'چوالیس',
  'پینتالیس',
  'چھیالیس',
  'سینتالیس',
  'اڑتالیس',
  'انچاس',
  'پچاس',
  'اکاون',
  'باون',
  'ترپن',
  'چوون',
  'پچپن',
  'چھپن',
  'ستاون',
  'اٹھاون',
  'انسٹھ',
  'ساٹھ',
  'اکسٹھ',
  'باسٹھ',
  'ترسٹھ',
  'چوسٹھ',
  'پینسٹھ',
  'چھیاسٹھ',
  'سڑسٹھ',
  'اڑسٹھ',
  'انہتر',
  'ستر',
  'اکہتر',
  'بہتر',
  'تہتر',
  'چوہتر',
  'پچھتر',
  'چھہتر',
  'ستہتر',
  'اٹھہتر',
  'اناسی',
  'اسی',
  'اکاسی',
  'بیاسی',
  'تراسی',
  'چوراسی',
  'پچاسی',
  'چھیاسی',
  'ستاسی',
  'اٹھاسی',
  'نواسی',
  'نوے',
  'اکانوے',
  'بانوے',
  'ترانوے',
  'چورانوے',
  'پچانوے',
  'چھیانوے',
  'ستانوے',
  'اٹھانوے',
  'ننانوے',
];

const List<String> _hundreds = [
  '',
  'ایک سو',
  'دو سو',
  'تین سو',
  'چار سو',
  'پانچ سو',
  'چھ سو',
  'سات سو',
  'آٹھ سو',
  'نو سو',
];

const Map<int, ({String masculine, String feminine})> _ordinalsSpecial = {
  1: (masculine: 'پہلا', feminine: 'پہلی'),
  2: (masculine: 'دوسرا', feminine: 'دوسری'),
  3: (masculine: 'تیسرا', feminine: 'تیسری'),
  4: (masculine: 'چوتھا', feminine: 'چوتھی'),
  5: (masculine: 'پانچواں', feminine: 'پانچویں'),
  6: (masculine: 'چھٹا', feminine: 'چھٹی'),
  7: (masculine: 'ساتواں', feminine: 'ساتویں'),
  8: (masculine: 'آٹھواں', feminine: 'آٹھویں'),
  9: (masculine: 'نواں', feminine: 'نویں'),
  10: (masculine: 'دسواں', feminine: 'دسویں'),
};

const List<(int, String)> _groups = [
  (1000000000000000, 'نیل'),
  (1000000000000, 'کھرب'),
  (1000000000, 'ارب'),
  (10000000, 'کروڑ'),
  (100000, 'لاکھ'),
  (1000, 'ہزار'),
];

String _convertToWords(int n) {
  if (n == 0) return _units[0];
  final parts = <String>[];
  var rem = n;
  for (final group in _groups) {
    final div = group.$1;
    final word = group.$2;
    if (rem >= div) {
      parts.add('${_convertToWords(rem ~/ div)} $word');
      rem = rem % div;
    }
  }
  if (rem >= 100) {
    final h = rem ~/ 100;
    rem = rem % 100;
    parts.add(h < _hundreds.length && _hundreds[h].isNotEmpty
        ? _hundreds[h]
        : '${_units[h]} سو');
  }
  if (rem > 0) {
    parts.add(_units[rem]);
  }
  return parts.join(' ');
}

/// Converts a number to its Urdu textual representation.
String numberToWords(int n, [NumberToWordsOptions? options]) {
  final isNeg = n < 0;
  final abs = isNeg ? -n : n;

  if (options?.ordinal == true) {
    final sp = _ordinalsSpecial[abs];
    final w = sp != null
        ? (options!.gender == Gender.feminine ? sp.feminine : sp.masculine)
        : _convertToWords(abs) +
            (options!.gender == Gender.feminine ? 'ویں' : 'واں');
    return isNeg ? 'منفی $w' : w;
  }

  final w = _convertToWords(abs);
  return isNeg ? 'منفی $w' : w;
}
