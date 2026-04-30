import '../types.dart';
import 'number_to_words.dart';

/// Formats a number as a currency string in Urdu words.
String formatCurrency(double amount, Currency currency) {
  final neg = amount < 0;
  final abs = amount.abs();
  final intPart = abs.truncate();
  final fracPart = ((abs - intPart) * 100).round();

  final intWords = numberToWords(intPart);
  final currWord = currency == Currency.pkr ? 'روپے' : 'روپیہ';
  final paiseWord = currency == Currency.pkr ? 'پیسے' : 'پیسہ';

  var result = '$intWords $currWord';
  if (fracPart > 0) {
    result += ' ${numberToWords(fracPart)} $paiseWord';
  }
  return neg ? 'منفی $result' : result;
}
