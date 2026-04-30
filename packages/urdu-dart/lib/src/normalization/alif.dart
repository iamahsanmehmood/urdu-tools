import 'unicode_data.dart';

final RegExp _alifRe = RegExp(
  '[${alifVariants.map((cp) => String.fromCharCode(cp)).join()}]',
);

/// Replaces all alif variants with bare alif (U+0627).
String normalizeAlif(String text) => text.replaceAll(_alifRe, '\u0627');
