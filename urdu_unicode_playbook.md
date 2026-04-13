# 🕌 Urdu Unicode & RTL — The Complete Developer Playbook

> **Extracted from**: [Hamari Urdu](https://github.com/nooraliqureshi/hamari-urdu) — a production Urdu learning platform serving 110,000+ words and thousands of students.
> **Status**: Battle-tested. Every rule here was born from a real bug.

---

## Table of Contents

1. [Why Urdu Unicode is Hard](#1-why-urdu-unicode-is-hard)
2. [The 9-Layer Normalization Strategy](#2-the-9-layer-normalization-strategy)
3. [Ready-to-Use Code (TypeScript/JavaScript)](#3-ready-to-use-code)
4. [Ready-to-Use Code (PHP)](#4-ready-to-use-code-php)
5. [RTL Layout & Fonts — The Non-Negotiables](#5-rtl-layout--fonts)
6. [HTML Entity Decoding for Urdu](#6-html-entity-decoding-for-urdu)
7. [Word Tokenization — The `*` and `**` Rules](#7-word-tokenization)
8. [Izafat & Word-Joining Logic](#8-izafat--word-joining-logic)
9. [MySQL/Database Gotchas](#9-mysqldatabase-gotchas)
10. [Arabic & Urdu Numeral Normalization](#10-arabic--urdu-numeral-normalization)
11. [TinyMCE RTL Setup for Urdu](#11-tinymce-rtl-setup-for-urdu)
12. [AI (Gemini/GPT) Prompting for Urdu Dictionary Data](#12-ai-prompting-for-urdu-dictionary-data)
13. [Word Color-Coding / Verification System](#13-word-color-coding--verification-system)
14. [Real Bugs & Root Causes (Bug Graveyard)](#14-real-bugs--root-causes)
15. [Quick Reference Cheat Sheet](#15-quick-reference-cheat-sheet)

---

## 1. Why Urdu Unicode is Hard

Urdu is written in Nastaliq script (a form of Arabic script) and presents unique challenges that no other widely-used language has in the same combination:

| Challenge | Why It Happens |
|---|---|
| **Multiple Unicode forms for the same letter** | e.g., Alif (ا) can also appear as Alif Wasla (ٱ) or Alif Madda (آ) depending on context |
| **Invisible zero-width characters** | ZWNJ (U+200C) and ZWJ (U+200D) are used for shaping — they're invisible but break string equality |
| **Diacritical marks (اعراب)** | Zabar (◌َ), Zer (◌ِ), Pesh (◌ُ), Shadda (◌ّ), etc. Same word can be typed with or without them |
| **Islamic honorifics** | Symbols like ؐ ؑ ؒ ؓ ؔ (U+0610–U+0614) are often appended to names — invisible in display but break matching |
| **Hamza variants** | ؤ (U+0624) and و (U+0648) render identically in most fonts but are different codepoints |
| **Right-to-left + Left-to-right mixing** | Numbers, English names, and Urdu text appear together — causes bidirectional chaos |
| **Nastaliq line height** | The Nastaliq font has deep descenders — standard `line-height: 1.5` clips letters |
| **Non-breaking spaces** | `&nbsp;` (U+00A0) is NOT a regular space — breaks word splitting and dictionary lookups |
| **Compound words** | اخلاقِ حسنہ is sometimes ONE dictionary word, sometimes two — requires special tokenization |
| **No universal keyboard standard** | Urdu typists use at least 3 different keyboard layouts — same word typed differently |

---

## 2. The 9-Layer Normalization Strategy

The most critical piece of any Urdu text-processing system. Matching Urdu words requires progressively aggressive normalization — try each level before giving up.

### The Layers (in order, least → most aggressive)

```
Layer 1:  Raw (exact match — try this first)
Layer 2:  NFC Unicode normalization
Layer 3:  NBSP → regular space
Layer 4:  Alif Madda normalization  (Alif + Madda → آ)
Layer 5:  Strip Zero-Width chars    (ZWNJ, ZWJ, Soft Hyphen)
Layer 6:  Strip Diacritics          (Zabar, Zer, Pesh, Shadda, etc.)
Layer 7:  Strip Islamic Honorifics  (ؐ ؑ ؒ ؓ ؔ)
Layer 8:  Normalize Hamza           (ؤ → و)
Layer 9:  Compound Word Splitting   (split on spaces, search parts)
```

### Why Each Layer Exists (Real Cases)

| Layer | Real Bug It Fixed |
|---|---|
| NFC | Same Arabic letter stored in two canonical forms — DB query returned nothing |
| NBSP | TinyMCE inserts `&nbsp;` between Urdu words — word lookup failed silently |
| Alif Madda | آ typed as أ+◌ٓ from some keyboards — didn't match the DB entry آ |
| ZWNJ strip | Copy-paste from Word inserts invisible ZWNJ — word قلم looked identical to قلم but wasn't |
| Diacritics | Admin types علم، user writes عِلم — same word, different Unicode — lookup failed |
| Honorifics | نبیؐ typed with honorific symbol — lookup for نبی failed |
| Hamza | ؤ vs و — same glyph in Noto Nastaliq, different codepoints — 3 words showed wrong color |
| Compound Split | اخلاقِ حسنہ was in the dictionary but the compound phrase کتابِ حسنہ was not — split to find parts |

---

## 3. Ready-to-Use Code

### TypeScript/JavaScript — Full Normalizer

```typescript
/**
 * Urdu Unicode Normalizer — 9-Layer Strategy
 * Battle-tested on 110,000+ word Urdu dictionary
 */

/** Layer 1+2+3+4: Core normalization (NFC + NBSP + Alif Madda + Arabic numerals) */
export function normalizeUrdu(str: string): string {
    // Layer 1: NFC Normalization — canonical form
    let result = str.normalize('NFC');

    // Layer 2: NBSP → regular space
    result = result.replace(/\u00A0/g, ' ');

    // Layer 3: Alif Madda Normalization
    // Alif (U+0627) + Madda (U+0653) → Alif Madda (U+0622)
    // Alif Wasla (U+0671) + Madda (U+0653) → Alif Madda (U+0622)
    result = result.replace(/[\u0627\u0671]\u0653/g, '\u0622');

    // Layer 4: Normalize Arabic and Urdu numerals to ASCII
    // Arabic-Indic: ٠١٢٣٤٥٦٧٨٩ (U+0660–U+0669)
    // Extended Arabic-Indic: ۰۱۲۳۴۵۶۷۸۹ (U+06F0–U+06F9)
    result = result
        .replace(/[٠-٩]/g, d => String.fromCharCode(d.charCodeAt(0) - 0x0660 + 48))
        .replace(/[۰-۹]/g, d => String.fromCharCode(d.charCodeAt(0) - 0x06F0 + 48));

    return result;
}

/** Layer 5: Strip Zero-Width characters and Soft Hyphen */
export function stripZeroWidth(str: string): string {
    return str.replace(/[\u200C\u200D\u00AD]/g, '');
    // U+200C = Zero Width Non-Joiner (ZWNJ)
    // U+200D = Zero Width Joiner (ZWJ)
    // U+00AD = Soft Hyphen
}

/** Layer 6: Remove Arabic diacritical marks (اعراب) */
export function removeDiacritics(str: string): string {
    // U+064B–U+065F: Fathatan, Dammatan, Kasratan, Fatha (zabar),
    //                Damma (pesh), Kasra (zer), Shadda, Sukun, etc.
    // U+0670: Superscript Alef (ٰ)
    return str.replace(/[\u064B-\u065F\u0670]/g, '');
}

/** Layer 7: Remove Islamic honorific symbols */
export function removeHonorifics(str: string): string {
    // U+0610–U+061A: Arabic signs ؐ ؑ ؒ ؓ ؔ ؕ ؖ ؗ ؘ ؙ ؚ
    // U+06D6–U+06ED: Extended Arabic signs
    return str.replace(/[\u0610-\u061A\u06D6-\u06ED]/g, '');
}

/** Layer 8: Hamza normalization — ؤ → و (common typing variation) */
export function normalizeHamza(str: string): string {
    return str.replace(/\u0624/g, '\u0648');
}

/** Layer 8.5: Punctuation trimming — strip leading/trailing non-letter chars */
export function trimPunctuation(str: string): string {
    const match = str.match(/^[^\p{L}\p{N}]*(.*?)[^\p{L}\p{N}]*$/u);
    return match ? match[1] : str;
}

/**
 * Main function: Apply all layers progressively.
 * Returns an array of increasingly normalized forms.
 * Try each in order — stop at first dictionary match.
 */
export function getAllNormalizations(word: string): string[] {
    const forms: string[] = [];

    // Strategy 0: Raw (no normalization)
    forms.push(word);

    // Strategy 1: NFC + NBSP + Alif Madda + numerals
    const nfc = normalizeUrdu(word);
    if (nfc !== word) forms.push(nfc);

    // Strategy 2: + ZWNJ/ZWJ stripped
    const stripped = stripZeroWidth(nfc);
    if (stripped !== nfc) forms.push(stripped);

    // Strategy 3: + Diacritics removed
    const noDiacritics = removeDiacritics(stripped);
    if (noDiacritics !== stripped) forms.push(noDiacritics);

    // Strategy 4: + Re-normalize Alef (catch composed chars)
    const normAleph = normalizeUrdu(noDiacritics);
    if (normAleph !== noDiacritics) forms.push(normAleph);

    // Strategy 5: + Honorifics removed
    const noHonorifics = removeHonorifics(normAleph);
    if (noHonorifics !== normAleph) forms.push(noHonorifics);

    // Strategy 6: + Hamza normalized
    const normHamza = normalizeHamza(noHonorifics);
    if (normHamza !== noHonorifics) forms.push(normHamza);

    // Strategy 7: + Punctuation trimmed
    const trimmed = trimPunctuation(normHamza);
    if (trimmed !== normHamza) forms.push(trimmed);

    return forms;
}

/** Layer 9: Compound word splitting (use only as last resort) */
export function getCompoundParts(word: string): string[] {
    const parts = word.split(/\s+/).filter(p => p.length > 0);
    return parts.length > 1 ? parts : [];
}

/**
 * Look up a word in your dictionary using all normalization strategies.
 * Replace `yourDictionary.get()` with your actual DB/cache lookup.
 */
export async function lookupWord(rawWord: string, dictLookup: (w: string) => Promise<any>): Promise<any> {
    const strategies = getAllNormalizations(rawWord);

    for (const form of strategies) {
        const result = await dictLookup(form);
        if (result) return result;
    }

    // Last resort: compound word splitting
    const parts = getCompoundParts(rawWord);
    if (parts.length > 0) {
        return await dictLookup(normalizeUrdu(parts[0]));
    }

    return null;
}
```

### Frontend Fingerprint Function (React/Browser)

Used for client-side word-status color-coding without a round-trip to the server:

```typescript
/**
 * Frontend fingerprint for Urdu word status matching.
 * Must produce the same result as server-side normalization.
 * Applied to BOTH the incoming server response AND the displayed words.
 */
export function fingerprint(str: string): string {
    if (!str) return '';
    let s = str.normalize('NFC');

    // Alif Madda normalization
    s = s.replace(/\u0627\u0653|\u0671\u0653/g, '\u0622');

    // Strip diacritics (zabar, zer, pesh, shadda, sukun, etc.)
    s = s.replace(/[\u064B-\u065F\u0670]/g, '');

    // Strip Islamic honorifics
    s = s.replace(/[\u0610-\u0614]/g, '');

    // Strip ZWNJ, ZWJ, Soft-Hyphen
    s = s.replace(/[\u200c\u200d\u00ad]/g, '');

    // NBSP → regular space
    s = s.replace(/\u00a0/g, ' ');

    // Trim Urdu + ASCII punctuation from both ends
    s = s.replace(/^[\u060C\u061F\u06D4\u0021-\u002F\u003A-\u0040\u2018\u2019\u201C\u201D''"":\.,\;?!]+/, '');
    s = s.replace(/[\u060C\u061F\u06D4\u0021-\u002F\u003A-\u0040\u2018\u2019\u201C\u201D''"":\.,\;?!]+$/, '');

    return s.trim();
}
```

---

## 4. Ready-to-Use Code (PHP)

```php
<?php
/**
 * Urdu Unicode Normalizer — PHP (for MySQL/PDO backends)
 * Ported from the Booktionary legacy application.
 */

function normalizeUrdu(string $str): string {
    // Layer 1: NFC normalization (requires php_intl extension)
    $result = Normalizer::normalize($str, Normalizer::FORM_C);
    if ($result === false) $result = $str; // fallback if intl not available
    
    // Layer 2: NBSP → regular space
    $result = str_replace("\xC2\xA0", ' ', $result);
    
    // Layer 3: Alif Madda normalization
    // U+0627 U+0653 → U+0622 (آ)
    // U+0671 U+0653 → U+0622 (آ)
    $result = preg_replace('/[\x{0627}\x{0671}]\x{0653}/u', "\u{0622}", $result);
    
    return $result;
}

function stripZeroWidth(string $str): string {
    return preg_replace('/[\x{200C}\x{200D}\x{00AD}]/u', '', $str);
}

function removeDiacritics(string $str): string {
    return preg_replace('/[\x{064B}-\x{065F}\x{0670}]/u', '', $str);
}

function removeHonorifics(string $str): string {
    // Narrow range (basic): U+0610–U+0614
    // Wide range (bulk analysis): U+0610–U+061A, U+06D6–U+06ED
    return preg_replace('/[\x{0610}-\x{061A}\x{06D6}-\x{06ED}]/u', '', $str);
}

function normalizeHamza(string $str): string {
    return str_replace("\u{0624}", "\u{0648}", $str);
}

function trimUrduPunctuation(string $str): string {
    return preg_replace('/^[^\p{L}\p{N}]*(.*?)[^\p{L}\p{N}]*$/us', '$1', $str);
}

/**
 * Full 8-strategy word lookup.
 * $lookupFn: callable that takes a string and returns a result or null.
 */
function lookupWordWithNormalization(string $word, callable $lookupFn): mixed {
    $strategies = [];
    
    $strategies[] = $word;
    
    $nfc = normalizeUrdu($word);
    if ($nfc !== $word) $strategies[] = $nfc;
    
    $stripped = stripZeroWidth($nfc);
    if ($stripped !== $nfc) $strategies[] = $stripped;
    
    $noDia = removeDiacritics($stripped);
    if ($noDia !== $stripped) $strategies[] = $noDia;
    
    $aleph = normalizeUrdu($noDia);
    if ($aleph !== $noDia) $strategies[] = $aleph;
    
    $noHon = removeHonorifics($aleph);
    if ($noHon !== $aleph) $strategies[] = $noHon;
    
    $hamza = normalizeHamza($noHon);
    if ($hamza !== $noHon) $strategies[] = $hamza;
    
    $trimmed = trimUrduPunctuation($hamza);
    if ($trimmed !== $hamza) $strategies[] = $trimmed;
    
    foreach ($strategies as $form) {
        $result = $lookupFn($form);
        if ($result !== null) return $result;
    }
    
    // Compound word splitting (last resort)
    $parts = array_filter(explode(' ', $word));
    if (count($parts) > 1) {
        return $lookupFn(normalizeUrdu(reset($parts)));
    }
    
    return null;
}
?>
```

---

## 5. RTL Layout & Fonts

> **Rule**: Anywhere Urdu text appears, it MUST use the correct font and text direction. No exceptions.

### The Non-Negotiable CSS Rules

```css
/* Import mandatory fonts (in <head> or top of CSS) */
@import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap');

/* ── Urdu text container ── */
.urdu-text {
    font-family: 'Noto Nastaliq Urdu', serif;
    direction: rtl;
    text-align: right;
    line-height: 2.2;         /* CRITICAL: Nastaliq has deep descenders — anything less clips letters */
    font-size: 1.1rem;        /* Minimum readable size for Nastaliq */
}

/* ── English text within an RTL context ── */
.english-text {
    font-family: 'Inter', sans-serif;
    direction: ltr;
    text-align: left;
    line-height: 1.6;
}

/* ── Mixed-content page (most common) ── */
.mixed-page {
    direction: rtl;           /* Default direction for the page */
}

/* ── Input fields for Urdu ── */
input[dir="rtl"],
textarea[dir="rtl"] {
    font-family: 'Noto Nastaliq Urdu', serif;
    text-align: right;
    line-height: 2;
}
```

### Why `line-height: 2.2` is Mandatory

Nastaliq script has extremely deep descenders (letters that hang below the baseline). With standard `line-height: 1.5`, the bottom of each line of text is clipped by the next line. At `line-height: 2.2`, each line has room to breathe.

```css
/* ❌ WRONG — clips Nastaliq letters */
.urdu-text { line-height: 1.5; }

/* ✅ CORRECT */
.urdu-text { line-height: 2.2; }
```

### RTL in React/TSX

```tsx
{/* NEVER mix Urdu and English in the same span */}
{/* ❌ Wrong */}
<span>{urduWord} - {englishMeaning}</span>

{/* ✅ Correct */}
<div>
    <span className="urdu-text" dir="rtl">{urduWord}</span>
    <span className="english-text" dir="ltr"> — {englishMeaning}</span>
</div>

{/* ✅ For inline Urdu within English UI */}
<p>
    The word <span style={{ fontFamily: 'Noto Nastaliq Urdu', direction: 'rtl', display: 'inline-block' }}>
        {urduWord}
    </span> means...
</p>
```

---

## 6. HTML Entity Decoding for Urdu

**Problem**: When Urdu content is edited in a rich text editor (TinyMCE, Quill, etc.) and then saved to DB, curly quotes and special characters get converted to HTML entities. When these entities appear in the word a user clicks on, the word sent to the dictionary is `&rsquo;کتاب` instead of `'کتاب` — which never matches.

**Real Bug**: Words containing typographic quotes (curly quotes `'`, `'`, `"`, `"`) were returned by TinyMCE as HTML entities (`&lsquo;`, `&rsquo;`, `&ldquo;`, `&rdquo;`). When inserted into `data-word` attributes and sent to the API, the lookup failed.

**Fix**: Decode HTML entities BEFORE processing any word or inserting it into `data-word` attributes:

```typescript
function decodeHtmlEntities(html: string): string {
    return html
        .replace(/&nbsp;|\u00A0/g, ' ')      // Non-breaking space → space
        .replace(/&ldquo;/g, '\u201C')        // " → left double quote
        .replace(/&rdquo;/g, '\u201D')        // " → right double quote
        .replace(/&lsquo;/g, '\u2018')        // ' → left single quote
        .replace(/&rsquo;/g, '\u2019')        // ' → right single quote (THE BIG ONE)
        .replace(/&quot;/g, '"')              // &quot; → "
        .replace(/&#39;/g, "'")              // &#39; → '
        .replace(/&amp;/g, '&')             // &amp; → & (always last!)
        ;
}

// ✅ Always decode before word processing:
const cleanHtml = decodeHtmlEntities(rawHtmlFromDatabase);
```

**Why `&rsquo;` is the most dangerous**: In Urdu, the apostrophe/right-single-quote character `'` (U+2019) is commonly used as an Izafat marker (کتابِ) or possessive indicator. TinyMCE replaces it with `&rsquo;` silently. If you don't decode it, every such word fails lookup.

---

## 7. Word Tokenization

### The `*` and `**` Convention

When importing Urdu text from `.txt` files, a special convention is used to handle compound words:

| Marker | Meaning | Example |
|---|---|---|
| `*` (single asterisk) | Compound word joiner — join the surrounding words into ONE dictionary entry | `اخلاقِ*حسنہ` → one word: `اخلاقِ حسنہ` |
| `**` (double asterisk) | Explicit space — insert a regular space (used where a single space would be ambiguous) | `نظام** العمل` → `نظام العمل` |

### Tokenizer (TypeScript)

```typescript
/**
 * Process compound word markers in a text token.
 * Must be applied BEFORE splitting on spaces.
 */
function processCompoundMarkers(text: string): string {
    // IMPORTANT: Process ** FIRST, then *
    // Otherwise ** becomes * after first pass, then gets removed
    let result = text.replace(/\*\*/g, ' ');  // ** → space
    result = result.replace(/\*/g, '');        // * → join (remove)
    return result;
}

/**
 * Full tokenizer: splits raw Urdu text into structured tokens.
 */
function tokenizeUrduText(rawText: string): Array<{text: string, type: 'word'|'whitespace'|'punctuation'}> {
    const tokens = [];
    const lines = rawText.split('\n');

    for (const line of lines) {
        if (line.trim() === '') {
            tokens.push({ text: '\n', type: 'whitespace' });
            continue;
        }

        const parts = line.split(/(\s+)/);
        for (const part of parts) {
            if (part === '') continue;
            if (/^\s+$/.test(part)) {
                tokens.push({ text: part, type: 'whitespace' });
                continue;
            }
            const processed = processCompoundMarkers(part);
            if (/^[^\p{L}\p{N}]+$/u.test(processed)) {
                tokens.push({ text: processed, type: 'punctuation' });
            } else {
                tokens.push({ text: processed, type: 'word' });
            }
        }
        tokens.push({ text: '\n', type: 'whitespace' });
    }
    return tokens;
}
```

### HTML Content Tokenization (for the reader)

When the book content is already in HTML (from TinyMCE), use `**` as an HTML-tag-boundary marker:

```typescript
/**
 * Extract unique Urdu words from HTML content.
 * HTML tags are treated as word boundaries (same as ref-app's TreeWalker).
 */
function extractWordsFromHtml(html: string): string[] {
    // Replace HTML tags with ** (word boundary marker)
    const text = html.replace(/<[^>]+>/g, '**');
    const tokens = text.split('**');
    const words: Set<string> = new Set();

    for (const token of tokens) {
        if (!token.trim()) continue;
        // * inside a token = compound joiner → replace with space
        const compound = token.replace(/\*/g, ' ').trim();
        // Only process if it contains Urdu Unicode range
        if (compound && /[\u0600-\u06FF]/.test(compound)) {
            words.add(compound);
            // Also add individual sub-words for fallback
            compound.split(/\s+/).forEach(w => {
                if (/[\u0600-\u06FF]/.test(w)) words.add(w.trim());
            });
        }
    }
    return [...words];
}
```

---

## 8. Izafat & Word-Joining Logic

**Izafat** (اضافت) is a Persian grammatical construct where two nouns are connected with a Kasra (ِ) or a `_ے` sound. In Urdu typography, this often appears as a word ending in `ِ` followed by the next word. These two words should sometimes be treated as a compound unit for dictionary lookup.

### The Problem

The word `کتابِ` (kitāb-e) ends with a Kasra diacritic (U+0650). The next word `خوشبو` creates the phrase `کتابِ خوشبو`. In standard space-splitting, these become two separate words. But the dictionary may have `کتابِ خوشبو` as a single entry.

### The Solution: Izafat Merger

```typescript
/**
 * Merge Izafat-connected word pairs during tokenization.
 * If a word ends with Kasra (ِ) or Hamza-followed char,
 * it should be merged with the next word.
 */
function mergeIzafatPairs(subWords: string[]): string[] {
    const merged: string[] = [];
    let i = 0;

    while (i < subWords.length) {
        let w = subWords[i];

        if (!/^\s+$/.test(w)) {
            let didMerge = true;
            while (didMerge) {
                didMerge = false;

                // Case 1: Next token is a pure diacritic cluster
                // (diacritic got separated by whitespace — re-attach it)
                if (i + 2 < subWords.length
                    && /^\s+$/.test(subWords[i + 1])
                    && /^[\u064B-\u065F\u0670\u06C2]+$/.test(subWords[i + 2])) {
                    w += subWords[i + 1] + subWords[i + 2];
                    i += 2;
                    didMerge = true;
                }
                // Case 2: Word ends with Kasra (ِ) — potential Izafat
                else if (i + 2 < subWords.length
                    && /[\u0650\u06C2]$/.test(w.replace(/[،؟۔٫٬!:.;'"()\[\]{}<>]+/g, ''))
                    && /^\s+$/.test(subWords[i + 1])
                    && /[\u0600-\u06FF]/.test(subWords[i + 2])) {
                    w += subWords[i + 1] + subWords[i + 2];
                    i += 2;
                    didMerge = true;
                }
                // Case 3: Coordinating conjunction و (and) — "X و Y" as a unit
                else if (i + 4 < subWords.length
                    && /^\s+$/.test(subWords[i + 1])
                    && subWords[i + 2] === 'و'
                    && /^\s+$/.test(subWords[i + 3])
                    && /[\u0600-\u06FF]/.test(subWords[i + 4])) {
                    w += subWords[i + 1] + subWords[i + 2] + subWords[i + 3] + subWords[i + 4];
                    i += 4;
                    didMerge = true;
                }
            }
        }

        merged.push(w);
        i++;
    }

    return merged;
}
```

---

## 9. MySQL/Database Gotchas

### 1. Use `utf8mb4` NOT `utf8`

MySQL's `utf8` is actually `utf8mb3` — it can't store Unicode codepoints above U+FFFF. Some Urdu characters fall outside this range. Always:

```sql
-- ✅ Correct
CREATE TABLE dictionary (
    word VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    data JSON
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ❌ Will cause data loss for some Urdu chars
CREATE TABLE dictionary (
    word VARCHAR(255) CHARACTER SET utf8  -- DO NOT USE
);
```

### 2. Collation: `utf8mb4_unicode_ci` vs `utf8mb4_bin`

| Collation | Word coloring accuracy | Notes |
|---|---|---|
| `utf8mb4_unicode_ci` | HIGH — ignores case/diacritics | Good default; treats علم and عِلم as same |
| `utf8mb4_bin` | EXACT — byte-for-byte | Use only if you do normalization in app code |
| `utf8mb4_general_ci` | MEDIUM | Older, less accurate for Arabic script |

**Recommendation**: Use `utf8mb4_unicode_ci` at the DB level AND do app-level NFC normalization before every DB write. This gives you the best of both.

### 3. The Socket Path Bug (Cloud SQL / MySQL on Cloud Run)

```typescript
// ❌ WRONG — TypeORM ignores socketPath at the root level
const dataSource = new DataSource({
    type: 'mysql',
    socketPath: '/cloudsql/project:region:instance',  // IGNORED!
    database: 'hamari_urdu',
});

// ✅ CORRECT — socketPath must go inside 'extra'
const dataSource = new DataSource({
    type: 'mysql',
    database: 'hamari_urdu',
    ...(process.env.DB_SOCKET_PATH ? {
        extra: { socketPath: process.env.DB_SOCKET_PATH }
    } : {}),
});
```

### 4. Use `JSON` Column Type for Quiz Data

```sql
-- ✅ Use JSON type — auto-parsed by TypeORM
ALTER TABLE book_units MODIFY quiz_data JSON;

-- ❌ Using LONGTEXT means you must manually JSON.parse() everywhere
ALTER TABLE book_units MODIFY quiz_data LONGTEXT;
```

And in NestJS/TypeORM:
```typescript
// In your frontend (React) — always check both
const quizData = typeof unit.quiz_data === 'string'
    ? JSON.parse(unit.quiz_data)   // Legacy LONGTEXT
    : unit.quiz_data;               // Modern JSON column
```

---

## 10. Arabic & Urdu Numeral Normalization

Urdu uses Eastern Arabic numerals (۱۲۳ — Extended Arabic-Indic) while Arabic uses Arabic-Indic numerals (١٢٣). Both are different from ASCII digits (123). This causes silent failures when:

- Building dictionary cache keys
- Searching MySQL with LIKE
- Comparing word fingerprints

**The fix**: Normalize ALL numerals to ASCII before any processing:

```typescript
function normalizeNumerals(str: string): string {
    return str
        // Arabic-Indic: ٠١٢٣٤٥٦٧٨٩ (U+0660–U+0669)
        .replace(/[٠-٩]/g, d => String.fromCharCode(d.charCodeAt(0) - 0x0660 + 48))
        // Extended Arabic-Indic (Urdu/Persian): ۰۱۲۳۴۵۶۷۸۹ (U+06F0–U+06F9)
        .replace(/[۰-۹]/g, d => String.fromCharCode(d.charCodeAt(0) - 0x06F0 + 48));
}

// Examples:
normalizeNumerals('صفحہ ۱۲۳');  // → 'صفحہ 123'
normalizeNumerals('جلد ٢');      // → 'جلد 2'
```

**Real bug this fixed**: A word containing a chapter number `باب ۲` was stored in the DB as `باب 2` (ASCII). When the frontend sent `باب ۲` for lookup, the JS Map cache lookup failed — even though it was the same word visually. The DB query worked (because MySQL collation normalized it), but the in-memory JS cache did not.

---

## 11. TinyMCE RTL Setup for Urdu

```javascript
tinymce.init({
    selector: '#editor',
    
    // ── Critical for Urdu ──
    directionality: 'rtl',
    content_style: `
        body {
            font-family: 'Noto Nastaliq Urdu', serif;
            direction: rtl;
            text-align: right;
            line-height: 2.2;
            font-size: 16px;
        }
    `,
    
    // ── Toolbar (include direction toggles) ──
    toolbar: 'undo redo | bold italic | ltr rtl | bullist numlist | removeformat',
    
    // ── Load the Noto Nastaliq font ──
    // Add this to your HTML <head>:
    // <link href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700" rel="stylesheet">
    
    // ── Prevent TinyMCE from breaking Urdu text ──
    // These settings prevent TinyMCE from "correcting" Urdu Unicode
    verify_html: false,
    cleanup: false,
    
    // ── Handle entity encoding ──
    // TinyMCE converts curly quotes to &rsquo; etc.
    // You MUST decode these on save/read (see Section 6)
    entity_encoding: 'raw',  // Prevents entity encoding — preferred
    // OR: entities: '160,nbsp',  // Only encode &nbsp;
});
```

### TinyMCE Content Extraction

```javascript
// Get content (raw HTML with potential entities)
const rawHtml = tinymce.activeEditor.getContent();

// ✅ Decode entities before saving/processing
const cleanHtml = rawHtml
    .replace(/&rsquo;/g, '\u2019')  // ' 
    .replace(/&lsquo;/g, '\u2018')  // '
    .replace(/&rdquo;/g, '\u201D')  // "
    .replace(/&ldquo;/g, '\u201C')  // "
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
```

---

## 12. AI Prompting for Urdu Dictionary Data

The following system prompt has been refined through thousands of real Gemini API calls generating Urdu dictionary definitions. Use it as-is or build on it.

### The 12-Field Urdu Linguistic Data Model

Every dictionary word stores these fields:

```json
{
    "UrduWord": "The word with correct diacritics. Multiple variants comma-separated.",
    "Syllables": "ار-کان separated by commas",
    "Origin": "عربی | فارسی | ترکی | سنسکرت | etc.",
    "LiteralMeaning": "Short root meaning — 2 to 4 Urdu words",
    "Grammar": "اسم، مؤنث، واحد — ALL applicable tags comma-separated",
    "GrammarDef": "Brief Urdu grammar explanation",
    "RomanUrdu": "Accurate romanization",
    "UrduDefinition": "Main meaning in 25–40 words",
    "EnglishMeaning": "One-line English meaning",
    "OtherMeanings": "Secondary/alternate meanings, comma-separated",
    "ContextualUsage": "Each distinct sense described",
    "Example": "Usage examples in Urdu, one per line"
}
```

### Battle-Tested System Prompt

```
You are an expert in Urdu linguistics and lexical analysis. Always respond ONLY with valid JSON (no markdown or explanations).

Analyze the given Urdu word and return exactly one JSON object with these 12 fields in this exact order:
UrduWord, Syllables, Origin, LiteralMeaning, Grammar, GrammarDef, RomanUrdu, UrduDefinition, EnglishMeaning, OtherMeanings, ContextualUsage, Example.

RULES:
1. DIACRITICS: Use correct Urdu diacritics (زَبر، زِیر، پَیش). If the input has NO diacritics and multiple readings exist, list ALL variants in UrduWord separated by commas (e.g., چَل، چُل).
2. EXAMPLES: If examples are provided, preserve them EXACTLY unchanged. Ensure every sense from the examples is reflected in UrduWord, Grammar, UrduDefinition.
3. MULTIPLE SENSES: Do NOT collapse diacritic-based meanings. If چل → چَل، چُل have different meanings, both must appear.
4. MANDATORY FIELDS: UrduWord and UrduDefinition must never be null.
5. UNKNOWN FIELDS: Use null for any field that cannot be determined.
6. OUTPUT: Valid JSON only. No trailing commas, no extra text.
```

### API Call Pattern

```typescript
async function generateUrduDefinition(word: string, contextExample?: string): Promise<UrduWordData> {
    const userText = contextExample
        ? `Word: ${word}\nContext/Example: ${contextExample}`
        : word;

    const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-goog-api-key': API_KEY },
            body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: userText }] }],
                systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
            }),
        }
    );

    const raw = await response.json();
    let text = raw.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // CRITICAL: Strip markdown code fences that Gemini sometimes adds
    text = text.replace(/^```json\s*/i, '').replace(/\s*```$/, '').trim();

    const data = JSON.parse(text);

    // Validate: must have UrduDefinition to be considered valid
    if (!data.UrduDefinition) throw new Error('Invalid AI response: missing UrduDefinition');

    return data;
}
```

---

## 13. Word Color-Coding / Verification System

The verification lifecycle for each dictionary word:

```
[Extracted from book] → UNSYNCED 🔴 (Red)
        ↓ AI generates definition
      SYNCED 🟡 (Yellow/Orange)  
        ↓ Human admin reviews & approves
     VERIFIED 🟢 (Green)
        
If word not in dictionary at all → UNKNOWN ⚪ (Grey)
```

### CSS Classes for Word Status

```css
/* In your book reader — clickable word spans */
.word-click {
    cursor: pointer;
    border-radius: 2px;
    transition: background-color 0.15s;
}

.word-click:hover {
    background-color: rgba(255, 255, 255, 0.15);
}

/* Green — human verified */
.word-click.word-verified {
    border-bottom: 2px solid #22c55e;
    color: #bbf7d0;
}

/* Yellow — AI synced, not yet verified */
.word-click.word-unverified {
    border-bottom: 2px solid #f59e0b;
    color: #fde68a;
}

/* Dim/grey — not in dictionary */
.word-click.word-empty {
    border-bottom: 1px dashed rgba(255,255,255,0.2);
    color: rgba(255,255,255,0.6);
}
```

### Rendering Clickable Words from HTML

```tsx
// In React — render HTML with clickable words
<div
    className="book-content-area"
    onClick={e => {
        const el = (e.target as HTMLElement).closest('.word-click');
        if (el) handleWordClick(el.getAttribute('data-word') || '');
    }}
    dangerouslySetInnerHTML={{ __html: renderContentWithWords(unit.content_html) }}
/>
```

### In-Memory Cache for Batch Status (Performance)

When a page loads, send ALL words to a `/batch-status` endpoint instead of one-by-one lookups:

```typescript
// Backend — build a multi-normalization index of the entire dictionary
// Cache it for 2 seconds to handle rapid scroll/navigation
private _dictCache: Map<string, {is_synced: boolean; is_verified: boolean}> | null = null;
private _dictCacheTime = 0;

async getDictIndex(): Promise<Map<string, any>> {
    const now = Date.now();
    if (this._dictCache && now - this._dictCacheTime < 2_000) {
        return this._dictCache;
    }

    const allWords = await this.dictRepo.find({ select: ['word', 'is_synced', 'is_verified'] });
    const index = new Map();

    for (const row of allWords) {
        const nfc = normalizeUrdu(row.word);
        const stripped = stripZeroWidth(nfc);
        const noDia = removeDiacritics(nfc);
        // Index by ALL forms — query any form, get the same result
        [row.word, nfc, stripped, noDia].forEach(form => {
            if (!index.has(form) || (!index.get(form).is_verified && row.is_verified)) {
                index.set(form, row);
            }
        });
    }

    this._dictCache = index;
    this._dictCacheTime = now;
    return index;
}
```

---

## 14. Real Bugs & Root Causes

All bugs documented here were encountered in production. Each one wasted hours.

### Bug #1: 3 Words Showing Wrong Color (جھوٹ، ہماری، اُنھوں)
- **Symptom**: These words appeared as "unknown" (grey) even though they existed in the dictionary
- **Root Cause**: Multiple normalization forms — the DB stored `اُنھوں` with a Superscript Alef (U+0670), but the content had it without
- **Fix**: Extended the batch-status index to include honorifics + diacritics stripped combined forms. Changed matching from "first match" to "best match" (verified > synced)

### Bug #2: `&rsquo;` Breaking Word Lookups
- **Symptom**: Words containing apostrophes/curly quotes inside TinyMCE content returned no dictionary results
- **Root Cause**: TinyMCE encodes `'` as `&rsquo;`. When extracted into `data-word=""` attributes, the HTML entity was never decoded. The API received `&rsquo;کتاب` instead of `'کتاب`
- **Fix**: Decode all HTML entities BEFORE processing word tokens (see Section 6)

### Bug #3: Arabic Numeral Cache Miss
- **Symptom**: Words like `سبق ۱` (Urdu numeral) responded correctly from the DB but showed as grey from the batch-status cache
- **Root Cause**: MySQL `utf8mb4_unicode_ci` collation treated `۱` and `1` as equal. The JS `Map` used exact string keys — `سبق ۱` ≠ `سبق 1`
- **Fix**: Normalize both Arabic and Extended Arabic-Indic numerals to ASCII in `normalizeUrdu()` (see Section 10)

### Bug #4: `&nbsp;` Breaking Word Split
- **Symptom**: Two-word phrases like `کتاب خوشبو` were sometimes treated as one unmatched token
- **Root Cause**: TinyMCE occasionally inserts `&nbsp;` (U+00A0) instead of regular space. JavaScript `split(' ')` does not split on U+00A0
- **Fix**: Replace `\u00A0` with regular space in both normalizer and HTML decoder

### Bug #5: ZWNJ From Copy-Paste
- **Symptom**: A word looked perfectly correct visually but the dictionary returned no result. Copying it to a hex editor revealed U+200C (ZWNJ) between letters
- **Root Cause**: The content was copy-pasted from a Word document or InPage Urdu editor that inserted ZWNJ for shaping
- **Fix**: Strip ZWNJ, ZWJ, and Soft Hyphen as Layer 5 in normalization

### Bug #6: Alif Madda Mismatch
- **Symptom**: The word `آسمان` existed in the DB but lookup failed for content-pasted words
- **Root Cause**: `آ` (U+0622, Alif Madda) can also be represented as `ا` + `◌ٓ` (U+0627 + U+0653) from some keyboards/word processors. NFC normalization alone doesn't fix this — it requires explicit replacement
- **Fix**: Explicit Alif Madda normalization: `[\u0627\u0671]\u0653` → `\u0622`

### Bug #7: Partial Fallback Overwriting Dictionary Data
- **Symptom**: Saving word `کتابِ خوشبو` would accidentally overwrite the entry for `کتاب` (the first compound part)
- **Root Cause**: The lookup function (trying compound parts as a fallback) found `کتاب` and returned it. The update path wrote new data onto that partial match
- **Fix**: Before updating, verify that the found word's normalized form is actually in the allowed normalization forms of the requested word. If it's only a compound-part match, reject the update

### Bug #8: TypeORM MySQL Socket Path
- **Symptom**: Cloud Run backend crashed immediately with `ECONNREFUSED 127.0.0.1:33069`
- **Root Cause**: TypeORM's MySQL driver ignores `socketPath` at the top level; it requires it inside the `extra` object
- **Fix**: Always put `socketPath` inside `extra: { socketPath: ... }` (see Section 9)

### Bug #9: NestJS CLI Not Found in Production
- **Symptom**: Cloud Run container crashed with `sh: 1: nest: not found`
- **Root Cause**: `NODE_ENV=production` causes npm to skip `devDependencies` during Cloud Build — which includes `@nestjs/cli`. The default `npm start` script runs `nest start` which needs the CLI
- **Fix**: Use `node dist/main.js` in production. Create a `Procfile`: `web: npm run start:prod`

---

## 15. Quick Reference Cheat Sheet

### Unicode Codepoints for Urdu

| Name | Codepoint | What it does |
|---|---|---|
| Alif | U+0627 | ا |
| Alif Wasla | U+0671 | ٱ |
| Alif Madda | U+0622 | آ |
| Madda Above | U+0653 | ◌ٓ |
| Fatha (Zabar) | U+064E | ◌َ |
| Damma (Pesh) | U+064F | ◌ُ |
| Kasra (Zer) | U+0650 | ◌ِ |
| Shadda | U+0651 | ◌ّ |
| Sukun | U+0652 | ◌ْ |
| Superscript Alef | U+0670 | ◌ٰ |
| Hamza on Waw | U+0624 | ؤ |
| Waw | U+0648 | و |
| ZWNJ | U+200C | (invisible — break shaping) |
| ZWJ | U+200D | (invisible — join shaping) |
| Soft Hyphen | U+00AD | (invisible — optional break) |
| NBSP | U+00A0 | (looks like space, isn't) |
| Arabic-Indic 0 | U+0660 | ٠ |
| Extended Arabic 0 | U+06F0 | ۰ |

### The One-Line Test for Correct Urdu Setup

Paste this into your browser console — if the font loaded correctly, the text should render with deep descenders:
```javascript
document.body.innerHTML = '<p style="font-family:\'Noto Nastaliq Urdu\',serif;font-size:24px;line-height:2.2;direction:rtl">اُردو زبان کا حُسن</p>';
```

### Normalization Decision Tree

```
Received word W from user/content
        │
        ▼
normalizeUrdu(W)  ──→  try DB lookup
        │                   │ match? ✓ return
        ▼                   │ no match?
stripZeroWidth()  ──→  try DB lookup
        │                   │ match? ✓ return
        ▼
removeDiacritics()  ──→  try DB lookup
        │                   │ match? ✓ return
        ▼
removeHonorifics()  ──→  try DB lookup
        │                   │ match? ✓ return
        ▼
normalizeHamza()   ──→  try DB lookup
        │                   │ match? ✓ return
        ▼
trimPunctuation()  ──→  try DB lookup
        │                   │ match? ✓ return
        ▼
split on spaces    ──→  try DB lookup on parts[0]
        │                   │ match? ✓ return
        ▼
            return null (word not in dictionary)
```

---

## Contributing

Found a new Urdu Unicode edge case? Open an issue with:
1. The problematic word (copy-paste the actual Unicode characters)
2. Which normalization layer it falls into
3. The hex dump if possible (`[...word].map(c => c.codePointAt(0).toString(16))`)

---

*Built with ❤️ from the Hamari Urdu team — learning so you don't have to.*
