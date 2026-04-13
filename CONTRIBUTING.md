# Contributing to urdu-tools

Thank you for helping make Urdu software better. This guide covers everything you need to contribute.

## Table of Contents

- [Development setup](#development-setup)
- [Project structure](#project-structure)
- [Making changes](#making-changes)
- [Testing requirements](#testing-requirements)
- [Urdu text guidelines](#urdu-text-guidelines)
- [Pull request process](#pull-request-process)
- [Reporting bugs](#reporting-bugs)

---

## Development setup

### Prerequisites

- Node.js 22+ and pnpm 9+
- .NET 9 SDK
- Git

### Clone and install

```bash
git clone https://github.com/iamahsanmehmood/urdu-tools.git
cd urdu-tools
pnpm install
```

### Run tests

```bash
# JavaScript
pnpm --filter @urdu-tools/core test

# JavaScript with coverage
pnpm --filter @urdu-tools/core test:coverage

# .NET
dotnet test packages/urdu-dotnet/UrduTools.Core.Tests/UrduTools.Core.Tests.csproj

# Both
pnpm test && dotnet test packages/urdu-dotnet/UrduTools.Core.Tests/UrduTools.Core.Tests.csproj
```

### Build

```bash
pnpm --filter @urdu-tools/core build
dotnet build packages/urdu-dotnet/UrduTools.Core/UrduTools.Core.csproj
```

---

## Project structure

```
urdu-tools/
├── packages/
│   ├── urdu-js/              # @urdu-tools/core TypeScript package
│   │   ├── src/
│   │   │   ├── normalization/   # 12-layer normalization pipeline
│   │   │   ├── analysis/        # Script detection, char classification
│   │   │   ├── search/          # 9-layer matching, fuzzy match
│   │   │   ├── numbers/         # South Asian number system
│   │   │   ├── tokenization/    # Word, sentence, ngram tokenization
│   │   │   ├── string-utils/    # Reverse, truncate, HTML entities
│   │   │   ├── encoding/        # InPage, Windows-1256
│   │   │   ├── sorting/         # 39-letter Urdu collation
│   │   │   └── transliteration/ # Urdu ↔ Roman
│   │   └── tests/            # Mirrors src/ structure
│   └── urdu-dotnet/          # UrduTools.Core C# package (mirrors JS)
│       ├── UrduTools.Core/
│       └── UrduTools.Core.Tests/
└── docs/                     # Module documentation
```

---

## Making changes

### Adding a new function

1. **Add to the JS package first** (`packages/urdu-js/src/`)
2. **Write tests** in `packages/urdu-js/tests/` with real Urdu text
3. **Port to C#** in `packages/urdu-dotnet/UrduTools.Core/` with identical behaviour
4. **Write C# tests** in `packages/urdu-dotnet/UrduTools.Core.Tests/`
5. **Export** from the module's `index.ts` and the package's `src/index.ts`
6. **Update docs** in `docs/` if the change adds new API surface

### TypeScript conventions

- All imports use `.js` extensions (required for Node ESM)
- No `any` — use proper types
- Exported functions must handle empty string input gracefully (return `''` or `[]`)
- New Unicode constants go in `src/normalization/unicode-data.ts`

### C# conventions

- Namespace matches directory: `UrduTools.Core.Normalization`, etc.
- Static classes only (no instances) — mirrors the JS functional API
- `string.IsNullOrEmpty()` guard at the top of every public method
- Use `string.EnumerateRunes()` for Unicode-correct iteration (not `foreach char`)
- Use `StringInfo.LengthInTextElements` for grapheme cluster counts

---

## Testing requirements

Every contribution must meet these standards:

### Coverage

- JavaScript: 90% line/branch/function coverage enforced in CI
- C#: tested with xUnit, coverlet report generated in CI

### Test cases required for every function

Every public function must have tests for:

| Case | Example |
|------|---------|
| Empty string | `''` |
| Single character | `'ک'` |
| Only diacritics | `'\u064E\u0650'` |
| Mixed script | `'Hello پاکستان'` |
| Real Urdu word | `'پاکستان'`, `'محبت'`, `'علم'` |
| Real compound word | `'اخلاقِ حسنہ'` |
| Long text (≥ 50,000 chars) processes under 500ms | |

### Use real Urdu text

Tests must use real Urdu words — not placeholders like `"word1"` or `"test"`. Prefer:
- Common words: `علم` (knowledge), `کتاب` (book), `پاکستان`, `محبت` (love), `زندگی` (life)
- Compound phrases: `اخلاقِ حسنہ`, `کتابِ حسنہ`
- Names: `احمد`, `فاطمہ`, `محمد`
- Sentences: `پاکستان زندہ باد`, `یہ ایک خوبصورت زبان ہے`

---

## Urdu text guidelines

When writing code and tests involving Urdu:

### Use correct Urdu code points (not Arabic look-alikes)

| Character | Correct | Wrong |
|-----------|---------|-------|
| Ye | ی U+06CC | ي U+064A |
| Kaf | ک U+06A9 | ك U+0643 |
| Heh | ہ U+06C1 | ه U+0647 |

### Key Unicode values for tests

```typescript
// Diacritics
'\u064E'  // Zabar (Fatha)
'\u0650'  // Zer (Kasra)
'\u064F'  // Pesh (Damma)
'\u0651'  // Shadda

// Invisible characters
'\u200C'  // ZWNJ (Zero Width Non-Joiner)
'\u200D'  // ZWJ (Zero Width Joiner)
'\u00AD'  // Soft Hyphen

// Honorifics
'\u0610'–'\u061A'  // Islamic signs ؐؑؒؓؔ

// Urdu-specific letters
'\u067E'  // پ Peh
'\u06A9'  // ک Keheh
'\u06CC'  // ی Farsi Yeh
'\u06D2'  // ے Yeh Barree
'\u06C1'  // ہ Heh Goal
'\u06BE'  // ھ Do Chashmi He
```

---

## Pull request process

1. **Fork** the repository and create a branch: `git checkout -b feature/my-feature`
2. **Write tests first** — describe the expected behaviour before implementing
3. **Implement** in JS, then port identically to C#
4. **Run the full test suite** — both JS and .NET must pass
5. **Run the build** — `pnpm build` must succeed without TypeScript errors
6. **Update docs** if you changed or added public API
7. **Open a PR** with a clear description of what the change does and why

### PR title format

```
feat: add getCompoundParts() to tokenization module
fix: normalizeCharacters() now handles medial Arabic kaf
docs: add examples for wordsToNumber()
test: add long-text performance cases for sort()
```

### What makes a good PR

- One focused change per PR
- Tests that fail before the fix and pass after
- Real Urdu text in test cases (not placeholder text)
- Both JS and C# updated together

---

## Reporting bugs

Please open a GitHub issue with:

1. **The input** — exact Urdu string (use Unicode escapes if needed: `'\u0647\u064A'`)
2. **What you expected** — and why
3. **What actually happened** — include the actual output
4. **Context** — where the text came from (keyboard, TinyMCE, Word, database, etc.)

The source of the text matters — characters from different sources can look identical but have different code points.

---

## Questions?

Open a [GitHub Discussion](https://github.com/iamahsanmehmood/urdu-tools/discussions) or file an issue.
