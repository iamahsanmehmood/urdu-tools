/// Core type definitions for urdu_tools.
///
/// These mirror the TypeScript types in `packages/urdu-js/src/types.ts` using
/// Dart-idiomatic naming and constructs.
library;

// ── Enums ────────────────────────────────────────────────────────────────────

enum NumeralTarget { arabicIndic, extendedArabicIndic, ascii }

enum Script { urdu, arabic, persian, latin, mixed, unknown }

enum CharClass {
  urduLetter,
  arabicLetter,
  diacritic,
  numeral,
  punctuation,
  whitespace,
  latin,
  other,
}

enum MatchLayer {
  exact,
  nfc,
  stripZerowidth,
  stripDiacritics,
  normalizeAlif,
  stripHonorifics,
  normalizeHamza,
  trimPunctuation,
  compoundSplit,
}

enum Gender { masculine, feminine }

enum Currency { pkr, inr }

enum CompoundType { affix, izafat, lexicon }

enum InpageVersion { auto, v1, v2, v3 }

enum Encoding {
  utf8,
  utf16le,
  utf16be,
  windows1256,
  inpageV1v2,
  inpageV3,
  unknown,
}

// ── Options ──────────────────────────────────────────────────────────────────

class NormalizeOptions {
  final bool nfc;
  final bool nbsp;
  final bool alifMadda;
  final bool numerals;
  final bool zeroWidth;
  final bool diacritics;
  final bool honorifics;
  final bool hamza;
  final bool kashida;
  final bool presentationForms;
  final bool punctuationTrim;
  final bool normalizeCharacters;

  const NormalizeOptions({
    this.nfc = true,
    this.nbsp = true,
    this.alifMadda = true,
    this.numerals = true,
    this.zeroWidth = true,
    this.diacritics = true,
    this.honorifics = true,
    this.hamza = true,
    this.kashida = false,
    this.presentationForms = false,
    this.punctuationTrim = false,
    this.normalizeCharacters = false,
  });

  static const NormalizeOptions defaults = NormalizeOptions();

  static const NormalizeOptions forSearch = NormalizeOptions(
    kashida: true,
    presentationForms: true,
    punctuationTrim: true,
    normalizeCharacters: true,
  );
}

class NumberToWordsOptions {
  final bool ordinal;
  final Gender gender;

  const NumberToWordsOptions({
    this.ordinal = false,
    this.gender = Gender.masculine,
  });
}

// ── Result types ─────────────────────────────────────────────────────────────

class MatchResult {
  final bool matched;
  final MatchLayer? layer;
  final String normalizedQuery;
  final String normalizedTarget;

  const MatchResult({
    required this.matched,
    this.layer,
    required this.normalizedQuery,
    required this.normalizedTarget,
  });
}

class Token {
  final String text;
  final String
      type; // 'urdu-word' | 'latin-word' | 'numeral' | 'punctuation' | 'whitespace' | 'mixed'

  const Token({required this.text, required this.type});

  @override
  String toString() => 'Token($text, $type)';

  @override
  bool operator ==(Object other) =>
      other is Token && other.text == text && other.type == type;

  @override
  int get hashCode => Object.hash(text, type);
}

class InpageDecodeResult {
  final List<String> paragraphs;
  final List<int> pageBreakIndices;
  final int filteredCount;

  const InpageDecodeResult({
    required this.paragraphs,
    required this.pageBreakIndices,
    required this.filteredCount,
  });
}

// ── Compound types ───────────────────────────────────────────────────────────

class CompoundSpan {
  final String text;
  final CompoundType type;
  final List<String> components;
  final int start;
  final int end;

  const CompoundSpan({
    required this.text,
    required this.type,
    required this.components,
    required this.start,
    required this.end,
  });

  @override
  String toString() => 'CompoundSpan($text, $type)';
}

class CompoundMatch {
  final bool matched;
  final CompoundType? type;

  const CompoundMatch({required this.matched, this.type});
}

class CompoundOptions {
  final bool affix;
  final bool izafat;
  final bool lexicon;

  const CompoundOptions({
    this.affix = true,
    this.izafat = true,
    this.lexicon = true,
  });
}
