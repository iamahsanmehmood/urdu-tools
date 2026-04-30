/// A comprehensive suite of Urdu text processing tools.
///
/// This package provides utilities for normalization, tokenization, analysis,
/// compound word handling, numbers, string manipulation, encoding detection,
/// sorting, and transliteration for the Urdu language.
library;

export 'src/types.dart';

// Normalization
export 'src/normalization/alif.dart';
export 'src/normalization/diacritics.dart';
export 'src/normalization/fingerprint.dart';
export 'src/normalization/hamza.dart';
export 'src/normalization/kashida.dart';
export 'src/normalization/normalize.dart';
export 'src/normalization/normalize_characters.dart';
export 'src/normalization/numerals.dart';
export 'src/normalization/presentation.dart';
export 'src/normalization/unicode_data.dart';
export 'src/normalization/zero_width.dart';

// Analysis
export 'src/analysis/char_class.dart';
export 'src/analysis/rtl.dart';
export 'src/analysis/script.dart';

// Search
export 'src/search/match.dart';
export 'src/search/tokenize_search.dart';

// Numbers
export 'src/numbers/currency.dart';
export 'src/numbers/number_to_words.dart';
export 'src/numbers/words_to_number.dart';

// Tokenization
export 'src/tokenization/ngrams.dart';
export 'src/tokenization/sentences.dart';
export 'src/tokenization/tokenize.dart';
export 'src/tokenization/unique.dart';

// String Utils
export 'src/string_utils/count.dart';
export 'src/string_utils/extract.dart';
export 'src/string_utils/html_entities.dart';
export 'src/string_utils/pad.dart';
export 'src/string_utils/reverse.dart';
export 'src/string_utils/truncate.dart';

// Encoding
export 'src/encoding/inpage/decoder.dart';
export 'src/encoding/inpage/detect.dart';
export 'src/encoding/legacy.dart';

// Sorting
export 'src/sorting/collation.dart';
export 'src/sorting/sort.dart';

// Transliteration
export 'src/transliteration/from_roman.dart';
export 'src/transliteration/to_roman.dart';

// Compound
export 'src/compound/detect.dart';
export 'src/compound/detect_affix.dart';
export 'src/compound/detect_izafat.dart';
export 'src/compound/detect_lexicon.dart';
export 'src/compound/join_split.dart';
