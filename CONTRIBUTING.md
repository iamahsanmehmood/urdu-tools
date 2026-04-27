# Contributing to urdu-tools

**اردو سافٹ ویئر کو بہتر بنانے میں ہمارا ساتھ دیں۔**
Thank you for helping make Urdu software better.

This library is built from real production needs — [HamaariUrdu](https://hamaariurdu.com), [PAL](https://pal.gov.pk), and [DLP](https://dlp.gov.pk) all depend on it. Every contribution, from a single compound word entry to a new module, directly improves Urdu software for millions of users.

---

## Ways to contribute

| Type | Skill needed | Time | Impact |
|------|-------------|------|--------|
| [Add compound words to the lexicon](#adding-compound-words) | Native Urdu speaker or linguist | 5 min per entry | High — directly expands detection coverage |
| [Report a missing compound](#reporting-from-the-playground) | Anyone | 2 min | High — flags gaps for a developer to fix |
| [Report a wrong detection](#reporting-from-the-playground) | Anyone | 2 min | High — prevents false positives corrupting tokenization |
| [File a bug report](#filing-a-bug-report) | Developer | 10 min | High — precise bugs get fixed fast |
| [Request a feature](#requesting-a-feature) | Anyone | 5 min | Medium — helps prioritize the roadmap |
| [Fix a bug or add a function](#code-contributions) | TypeScript or C# developer | varies | High |
| [Improve documentation or tests](#code-contributions) | Anyone who can read code | varies | Medium |

---

## Reporting from the Playground

The [Live Playground](https://iamahsanmehmood.github.io/urdu-tools/) has **built-in compound reporting** — no GitHub account setup needed to try it.

### Report a wrong detection (false positive)

1. Go to the Playground → **Compound Words** → **detectCompounds**
2. Enter the text that produced the wrong result
3. Click **Detect Compounds**
4. Next to any wrongly-detected compound, click **⚑ Wrong**
5. A pre-filled GitHub issue opens — add a brief explanation and submit

### Report a missed compound (false negative)

1. Run **detectCompounds** on your text
2. At the bottom of the result, find **"💡 Missing a compound?"**
3. Type the two words (or phrase) that should have been detected
4. Click **Open Issue →** — a pre-filled GitHub issue opens

### Report from the pair check

1. Go to **isCompound** and enter your word pair
2. If the result is wrong, click the report button below the result:
   - **"⚑ Report: this is NOT a compound"** — for false positives
   - **"💡 Report: this SHOULD be a compound"** — for missed detections

All report buttons generate a structured GitHub issue with your input pre-filled. You just need to add a brief explanation.

---

## Adding compound words

The compound lexicon (`packages/urdu-js/src/compound/lexicon-data.ts`) is the **most impactful area** for community contributions. Every entry you add improves detection accuracy for all users. You do not need programming experience — if you know Urdu, you can contribute.

### What qualifies as a compound entry

A compound (مرکب لفظ) is a fixed multi-word expression that functions as a single semantic unit. The words must always appear together with this specific meaning.

**Good entries:**
- **Synonym compounds:** `محنت مشقت`, `صبر شکر`, `علم ہنر`
- **Echo compounds:** `رنگ برنگ`, `دال دلیا`, `پانی وانی`
- **Fixed collocations:** `درد دل`, `شب و روز`, `آب و ہوا`
- **Multi-word titles / expressions:** `انسائیکلوپیڈیا آف اسلام`, `روز مرہ کی زندگی`
- **Literary compounds:** phrases from classical poetry (Faiz, Ghalib, Iqbal) that appear as fixed units

**Do not add:**
- Random word pairs that happen to appear together (`اچھا آدمی` — just adjective + noun)
- Translation guesses or uncertain pairs
- Words that belong in the **affix layer** instead (if one word is a suffix like `خانہ` or `گاہ`, it's already handled by Layer 1)

### How to add an entry

**Step 1 — Test it in the Playground first**

Go to [detectCompounds](https://iamahsanmehmood.github.io/urdu-tools/) and check the pair is actually missing. If it's already detected (by the affix or izafat layer), no lexicon entry is needed.

**Step 2 — Find the file**

Open `packages/urdu-js/src/compound/lexicon-data.ts`.

The file is a TypeScript `Map` of root word → Set of tails. It's sorted alphabetically by root (first word).

**Step 3 — Add your entry**

The format is:
```typescript
['rootWord', new Set(['tail1', 'tail2', 'multi word tail'])],
```

- **Root** = the first word of the compound
- **Tail** = everything after the first word (can be multiple words for 3+ word compounds)
- If the root already exists, add your tail to the existing `Set`

**Examples:**

Single tail (2-word compound):
```typescript
['محنت', new Set(['مشقت'])],
```

Multiple tails under one root:
```typescript
['علم', new Set(['و ہنر', 'و عمل', 'کیمیا'])],
```

Multi-word tail (3-word compound):
```typescript
['انسائیکلوپیڈیا', new Set(['آف اسلام'])],
```

**Step 4 — Add a test**

Open `packages/urdu-js/tests/compound/detect-lexicon.test.ts` and add:
```typescript
it('detects محنت مشقت', () => {
  const spans = detectCompounds('محنت مشقت کے بغیر کامیابی نہیں')
  expect(spans.some(s => s.text === 'محنت مشقت')).toBe(true)
})
```

**Step 5 — Run tests and submit a PR**

```bash
pnpm --filter @iamahsanmehmood/urdu-tools test
```

All 392+ tests must pass. Then open a PR — use the "Compound lexicon entry" type in the PR checklist.

### Submitting via GitHub Issue instead of a PR

If you're not comfortable with git/code, just [open a Missing Compound issue](https://github.com/iamahsanmehmood/urdu-tools/issues/new?template=compound-missing.yml) with the word pair and a maintainer will add it.

---

## Filing a bug report

Use the [Bug Report issue template](https://github.com/iamahsanmehmood/urdu-tools/issues/new?template=bug_report.yml).

The most useful bugs include:
1. **Exact input** — paste the Urdu string, including invisible characters if needed (`‌` for ZWNJ etc.)
2. **Source of text** — keyboard / TinyMCE / Microsoft Word / database / copy-paste from a website. This matters — different sources produce different byte sequences for visually identical characters.
3. **Expected vs actual output** — both as exact strings
4. **Code to reproduce** — minimum 3 lines

The [Playground](https://iamahsanmehmood.github.io/urdu-tools/) is the fastest way to confirm a bug before filing — if it reproduces there, include the function name and the exact input.

---

## Requesting a feature

Use the [Feature Request issue template](https://github.com/iamahsanmehmood/urdu-tools/issues/new?template=feature_request.yml).

Good feature requests describe the **real problem** you're solving, not just the API you want. "I need `normalizeCharacters()` to also fix Arabic numerals" is more actionable than "add support for numeral normalization."

---

## Code contributions

### Prerequisites

- Node.js 22+ and pnpm 9+
- .NET 9 SDK (for C# changes)
- Git

### Setup

```bash
git clone https://github.com/iamahsanmehmood/urdu-tools.git
cd urdu-tools
pnpm install
```

### Run tests

```bash
# JavaScript — all 392+ tests
pnpm --filter @iamahsanmehmood/urdu-tools test

# JavaScript with coverage report
pnpm --filter @iamahsanmehmood/urdu-tools test:coverage

# .NET — all 85+ tests
dotnet test packages/urdu-dotnet/UrduTools.Core.Tests/UrduTools.Core.Tests.csproj

# Build JS package (must succeed with 0 TypeScript errors)
pnpm --filter @iamahsanmehmood/urdu-tools build
```

### Project structure

```
urdu-tools/
├── packages/
│   ├── urdu-js/                       # @iamahsanmehmood/urdu-tools (TypeScript)
│   │   ├── src/
│   │   │   ├── compound/              # Compound word detection (Layer 1–3)
│   │   │   │   ├── affix-data.ts      # UAWL prefix/suffix sets
│   │   │   │   ├── lexicon-data.ts    # Curated 3,262-root compound dictionary ← contribute here
│   │   │   │   ├── detect-affix.ts    # Layer 1 — affix matching
│   │   │   │   ├── detect-izafat.ts   # Layer 2 — izafat marker detection
│   │   │   │   ├── detect-lexicon.ts  # Layer 3 — lexicon N-gram scanner
│   │   │   │   ├── detect.ts          # Orchestrator + span merging
│   │   │   │   └── join-split.ts      # joinCompounds / splitCompounds / isCompound
│   │   │   ├── normalization/         # 12-layer normalization pipeline
│   │   │   ├── analysis/              # Script detection, char classification
│   │   │   ├── search/                # 9-layer matching, fuzzy match
│   │   │   ├── numbers/               # South Asian number system
│   │   │   ├── tokenization/          # Word, sentence, n-gram tokenization
│   │   │   ├── string-utils/          # Reverse, truncate, HTML entities
│   │   │   ├── encoding/              # InPage, Windows-1256
│   │   │   ├── sorting/               # 39-letter Urdu collation
│   │   │   └── transliteration/       # Urdu ↔ Roman
│   │   └── tests/                     # Mirrors src/ structure exactly
│   └── urdu-dotnet/                   # UrduTools.Core (C#/.NET 9)
│       ├── UrduTools.Core/            # Library — mirrors JS module structure
│       └── UrduTools.Core.Tests/      # xUnit tests
└── playground/                        # Interactive browser playground
    └── src/
        ├── main.ts                    # All playground logic
        └── style.css
```

### Adding a new function

1. **Implement in TypeScript first** (`packages/urdu-js/src/`)
2. **Write tests** in `packages/urdu-js/tests/` — see testing requirements below
3. **Export** from the module's `index.ts` and the package root `src/index.ts`
4. **Port to C#** in `packages/urdu-dotnet/UrduTools.Core/` with identical behaviour and API
5. **Write C# tests** in `packages/urdu-dotnet/UrduTools.Core.Tests/`
6. **Add to the playground** in `playground/src/main.ts` if it's user-facing
7. **Update docs** in `playground/docs/index.html` if public API changed

### TypeScript conventions

- All imports use `.js` extensions (required for Node ESM): `import { x } from './file.js'`
- No `any` — use proper types
- Exported functions must handle empty string input gracefully (`return ''` or `return []`)
- New Unicode constants go in `src/normalization/unicode-data.ts`

### C# conventions

- Namespace matches directory: `UrduTools.Core.Normalization`, `UrduTools.Core.Compound`, etc.
- Static classes only — mirrors the JS functional API
- `string.IsNullOrEmpty()` guard at the top of every public method
- Use `string.EnumerateRunes()` for Unicode-correct iteration (not `foreach char`)
- Use `StringInfo.LengthInTextElements` for grapheme cluster counts

---

## Testing requirements

### Coverage thresholds

- JavaScript: 90% line/branch/function coverage enforced in CI
- C#: xUnit with coverlet — report generated in CI

### Required test cases for every function

| Case | Example |
|------|---------|
| Empty string | `''` |
| Single character | `'ک'` |
| Only diacritics | `'َِ'` |
| Mixed script | `'Hello پاکستان'` |
| Real Urdu word | `'پاکستان'`, `'محبت'`, `'علم'` |
| Real compound word | `'اخلاقِ حسنہ'`, `'کتاب خانہ'` |
| Long text (≥ 50,000 chars) processes under 500ms | performance test |

### Use real Urdu text

Tests must use **real Urdu words** — not placeholders like `"word1"` or `"test"`. Prefer:
- Common words: `علم` (knowledge), `کتاب` (book), `پاکستان`, `محبت` (love), `زندگی` (life)
- Compound phrases: `اخلاقِ حسنہ`, `کتاب خانہ`, `محنت مشقت`
- Names: `احمد`, `فاطمہ`, `محمد`
- Sentences: `پاکستان زندہ باد`, `یہ ایک خوبصورت زبان ہے`

### Key Unicode values for tests

```typescript
// Diacritics
'َ'  // Zabar (Fatha)
'ِ'  // Zer (Kasra) — used in izafat compounds
'ُ'  // Pesh (Damma)
'ّ'  // Shadda
'ٔ'  // Hamza-above — izafat marker

// Invisible characters
'‌'  // ZWNJ (Zero Width Non-Joiner) — compound binder
'‍'  // ZWJ (Zero Width Joiner)
'­'  // Soft Hyphen

// Honorifics
'ؐ'–'ؚ'  // Islamic honorific signs ؐؑؒؓؔ

// Urdu-specific letters
'پ'  // پ Peh
'ک'  // ک Keheh (correct Urdu kaf)
'ی'  // ی Farsi Yeh (correct Urdu ye)
'ے'  // ے Yeh Barree
'ہ'  // ہ Heh Goal (correct Urdu heh)
'ھ'  // ھ Do Chashmi He

// Arabic look-alikes (wrong in Urdu context — test normalization catches these)
'ي'  // ي Arabic ye  → should normalize to U+06CC
'ك'  // ك Arabic kaf → should normalize to U+06A9
'ه'  // ه Arabic heh → should normalize to U+06C1
```

---

## Urdu text code quality rules

### Always use correct Urdu code points (not Arabic look-alikes)

| Character | Correct | Wrong | Why it matters |
|-----------|---------|-------|---------------|
| Ye | ی U+06CC | ي U+064A | Different Unicode points — causes zero search results |
| Kaf | ک U+06A9 | ك U+0643 | Same — looks identical in Naskh fonts |
| Heh | ہ U+06C1 | ه U+0647 | Same — silent database mismatch |

### Validate with the Playground

Before submitting tests or lexicon entries, verify them in the [Live Playground](https://iamahsanmehmood.github.io/urdu-tools/) — it runs the actual library code and shows the exact Unicode codepoints in use.

---

## Pull request process

1. **Fork** and create a branch: `git checkout -b feat/my-change`
2. **Write tests first** if adding a function — describe expected behaviour before implementing
3. Run `pnpm --filter @iamahsanmehmood/urdu-tools test` — all tests must pass
4. Run `pnpm --filter @iamahsanmehmood/urdu-tools build` — zero TypeScript errors
5. If C# was changed: `dotnet test` must pass
6. **Open a PR** using the PR template — one focused change per PR

### PR title format

```
feat: add getCompoundParts() to compound module
fix: normalizeCharacters() now handles medial Arabic kaf
lexicon: add 12 new echo compound entries
docs: add examples for wordsToNumber()
test: add long-text performance cases for sort()
```

---

## Questions?

- **General questions or ideas** → [GitHub Discussions](https://github.com/iamahsanmehmood/urdu-tools/discussions)
- **Bug or wrong output** → [Bug Report issue](https://github.com/iamahsanmehmood/urdu-tools/issues/new?template=bug_report.yml)
- **Missing compound word** → [Missing Compound issue](https://github.com/iamahsanmehmood/urdu-tools/issues/new?template=compound-missing.yml) or use the [Playground report button](https://iamahsanmehmood.github.io/urdu-tools/)
