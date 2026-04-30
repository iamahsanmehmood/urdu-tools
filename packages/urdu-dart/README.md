# urdu_tools

A comprehensive, zero-dependency, and strongly-typed Dart library for advanced Urdu text processing. This package is part of the `urdu-tools` ecosystem (supporting TypeScript, C#, and Dart).

It includes modules for:
- Text Normalization (Diacritics, Kashida, Hamza, Zero-Width joiners)
- Text Analysis (RTL detection, Character classification)
- Compound Word Detection (Prefixes, Suffixes, Izafat, Lexicon-based matching)
- Legacy Encoding translation (InPage v1/v3 decoding, Windows-1256 to Unicode)
- Tokenization (Sentences, N-grams, Unique tokens)
- Number System Parsing (Words to numbers, Numbers to words)
- Sorting and Collation (Proper 39-letter Urdu collation)
- Transliteration (Urdu to Roman, Roman to Urdu)

## Installation

Add this to your package's `pubspec.yaml` file:

```yaml
dependencies:
  urdu_tools: ^1.4.2
```

## Quick Start

```dart
import 'package:urdu_tools/urdu_tools.dart';

void main() {
  // 1. Text Normalization
  final uglyText = 'ب\u064Eس\u0651م اﷲ'; // Fatha, Shadda, Allah ligature
  final clean = normalize(uglyText);
  print(clean); // 'بسم اللہ' (Standardized)

  // 2. Number Parsing
  print(wordsToNumber('ایک سو پچیس')); // 125
  print(numberToWords(125)); // 'ایک سو پچیس'

  // 3. Compound Word Detection
  final spans = detectCompounds('یہ کتب خانہ اور طالبِ علم ہے۔');
  for (var span in spans) {
    print('${span.text} [${span.type.name}]'); 
    // کتب خانہ [affix]
    // طالبِ علم [izafat]
  }

  // 4. Tokenization & NLP
  final tokens = tokenize('یہ ایک، جملہ ہے۔');
  print(tokens.map((t) => t.text).toList()); // ['یہ', 'ایک', 'جملہ', 'ہے']

  // 5. InPage Legacy Decoding
  // Decode legacy InPage byte arrays (.inp files) directly to Unicode!
  final legacyBytes = [0x04, 0x83, 0x20]; // [InPage v1 Alef, Peh, Space]
  final decoded = decodeInpage(legacyBytes);
  print(decoded);
}
```

## Features

- **Zero dependencies**: Extremely lightweight. Uses only core `dart:typed_data` for memory efficiency.
- **Strictly Typed**: Extensive enums and data structures for robust, crash-free performance in Flutter apps.
- **Cross-platform parity**: Functionally identical to the TypeScript (`urdu-js`) and C# (`urdu-dotnet`) versions.
- **Tested**: Covered by 120+ unit tests modeling real-world Urdu edge cases.

## Contributing

We welcome contributions! Please note that the compound word lexicon dataset is synchronized across multiple languages. **Please see the main [CONTRIBUTING.md](https://github.com/iamahsanmehmood/urdu-tools/blob/main/CONTRIBUTING.md) guide at the repository root** for rules on submitting changes to the dictionaries.
