using System.Text.RegularExpressions;

namespace UrduTools.Core.Compound;

/// <summary>
/// Deterministic Urdu compound word detector.
/// Three-layer pipeline: Affix → Izafat → Lexicon.
/// </summary>
public static class UrduCompoundDetector
{
    private static readonly HashSet<string> StopWords = new()
    {
        // Conjunctions
        "اور", "مگر", "لیکن", "بلکہ", "تاکہ", "تاہم", "چنانچہ",
        // Particles
        "کی", "کا", "کے", "کو", "میں", "سے", "نے", "پر", "تک",
        // Pronouns
        "وہ", "یہ", "ان", "اس", "جو", "جس", "جن", "کس", "کن",
        "اپنا", "اپنے", "اپنی", "ہم",
        // Auxiliaries
        "ہے", "ہیں", "تھا", "تھے", "تھی", "ہو", "ہوا", "ہوتا", "ہوتی", "ہوتے",
        "گا", "گی", "گے",
        // Misc
        "تو", "جب", "اگر", "بھی", "نہ", "نہیں", "پھر",
        "والا", "والے", "والی",
        // Common nouns (prevent ہر + noun false positives)
        "مسلمان", "انسان", "شخص", "آدمی", "بندہ", "عورت", "بچہ",
        "اچھے", "اچھی", "اچھا", "برے", "بری", "برا",
        "ایک", "دو", "تین", "چار",
        // Common verbs
        "کرتے", "کرتی", "کرتا", "کریں", "کیا",
        "لوگ", "لوگوں", "بات", "وقت", "دوست",
    };

    private const char Zer = '\u0650';
    private const char HamzaAbove = '\u0654';
    private const char Hamza = '\u0621';
    private const string Vav = "\u0648";

    /// <summary>
    /// Detect compound words in Urdu text.
    /// </summary>
    public static List<CompoundSpan> DetectCompounds(string text)
    {
        if (string.IsNullOrWhiteSpace(text)) return new();

        var words = text.Split((char[]?)null, StringSplitOptions.RemoveEmptyEntries);
        if (words.Length < 2) return new();

        var allSpans = new List<CompoundSpan>();
        allSpans.AddRange(DetectAffix(words));
        allSpans.AddRange(DetectIzafat(words));
        allSpans.AddRange(DetectLexicon(words));

        return MergeSpans(allSpans, words);
    }

    /// <summary>
    /// Check if two words form a compound.
    /// </summary>
    public static CompoundMatch IsCompound(string w1, string w2)
    {
        if (string.IsNullOrEmpty(w1) || string.IsNullOrEmpty(w2))
            return new(false, null);

        // Layer 1: Affix
        bool w1IsPrefix = AffixData.PrefixSet.Contains(w1);
        bool w2IsSuffix = AffixData.SuffixSet.Contains(w2);
        bool w2IsPrefix = AffixData.PrefixSet.Contains(w2);

        if ((w1IsPrefix && !StopWords.Contains(w2) && !w2IsPrefix) ||
            (w2IsSuffix && !StopWords.Contains(w1)))
            return new(true, "affix");

        // Layer 2: Izafat
        if (EndsWithIzafat(w1) && HasUrduLetters(w2))
            return new(true, "izafat");

        // Layer 3: Lexicon
        if (IsInLexicon(w1, w2))
            return new(true, "lexicon");

        return new(false, null);
    }

    private static List<CompoundSpan> DetectAffix(string[] words)
    {
        var spans = new List<CompoundSpan>();
        for (int i = 0; i < words.Length - 1; i++)
        {
            var w1 = words[i];
            var w2 = words[i + 1];

            bool w1IsPrefix = AffixData.PrefixSet.Contains(w1);
            bool w2IsSuffix = AffixData.SuffixSet.Contains(w2);
            bool w2IsPrefix = AffixData.PrefixSet.Contains(w2);

            if ((w1IsPrefix && !StopWords.Contains(w2) && !w2IsPrefix) ||
                (w2IsSuffix && !StopWords.Contains(w1)))
            {
                spans.Add(new CompoundSpan($"{w1} {w2}", "affix", new[] { w1, w2 }, i, i + 1));
            }
        }
        return spans;
    }

    private static List<CompoundSpan> DetectIzafat(string[] words)
    {
        var spans = new List<CompoundSpan>();
        for (int i = 0; i < words.Length - 1; i++)
        {
            var w1 = words[i];
            var w2 = words[i + 1];

            if (EndsWithIzafat(w1) && HasUrduLetters(w2))
            {
                spans.Add(new CompoundSpan($"{w1} {w2}", "izafat", new[] { w1, w2 }, i, i + 1));
                continue;
            }

            if (w2 == Vav && i + 2 < words.Length)
            {
                var w3 = words[i + 2];
                if (HasUrduLetters(w1) && HasUrduLetters(w3))
                {
                    spans.Add(new CompoundSpan($"{w1} {w2} {w3}", "izafat", new[] { w1, w2, w3 }, i, i + 2));
                    continue;
                }
            }
        }
        return spans;
    }

    private static List<CompoundSpan> DetectLexicon(string[] words)
    {
        var spans = new List<CompoundSpan>();
        for (int i = 0; i < words.Length - 1; i++)
        {
            var matchLen = FindLongestMatch(words, i);
            if (matchLen > 0)
            {
                var components = words[i..(i + matchLen)];
                spans.Add(new CompoundSpan(
                    string.Join(" ", components),
                    "lexicon",
                    components,
                    i,
                    i + matchLen - 1));
            }
        }
        return spans;
    }

    private static int FindLongestMatch(string[] words, int i)
    {
        var w1 = words[i];
        int longest = 0;

        // Repetition compounds
        if (i + 1 < words.Length && w1 == words[i + 1] && w1.Length > 2)
            longest = 2;

        if (LexiconData.CompoundLexicon.TryGetValue(w1, out var tails))
        {
            foreach (var tail in tails)
            {
                var tailWords = tail.Split(' ');
                var matchLen = 1 + tailWords.Length;
                if (matchLen <= longest || i + matchLen > words.Length) continue;

                bool match = true;
                for (int j = 0; j < tailWords.Length; j++)
                {
                    if (words[i + 1 + j] != tailWords[j])
                    {
                        match = false;
                        break;
                    }
                }
                if (match) longest = matchLen;
            }
        }
        return longest;
    }

    private static List<CompoundSpan> MergeSpans(List<CompoundSpan> spans, string[] words)
    {
        if (spans.Count <= 1) return spans;

        var sorted = spans.OrderBy(s => s.Start).ThenByDescending(s => s.End - s.Start).ToList();
        var merged = new List<CompoundSpan> { sorted[0] };

        for (int i = 1; i < sorted.Count; i++)
        {
            var current = sorted[i];
            var last = merged[^1];

            if (current.Start <= last.End)
            {
                var newEnd = Math.Max(last.End, current.End);
                var components = words[last.Start..(newEnd + 1)];
                merged[^1] = new CompoundSpan(
                    string.Join(" ", components),
                    last.Type,
                    components,
                    last.Start,
                    newEnd);
            }
            else
            {
                merged.Add(current);
            }
        }
        return merged;
    }

    private static bool IsInLexicon(string root, string tail)
    {
        if (!LexiconData.CompoundLexicon.TryGetValue(root, out var tails))
            return false;
        if (tails.Contains(tail))
            return true;
        // Try stemming inflectional endings: ے، وں، یں، ی
        foreach (var ending in new[] { "ے", "وں", "یں", "ی" })
        {
            if (tail.EndsWith(ending) && tail.Length > ending.Length)
            {
                var stem = tail[..^ending.Length];
                if (tails.Contains(stem))
                    return true;
            }
        }
        return false;
    }

    private static bool EndsWithIzafat(string word)
    {
        if (string.IsNullOrEmpty(word)) return false;
        var last = word[^1];
        return last == Zer || last == HamzaAbove || last == Hamza;
    }

    private static bool HasUrduLetters(string word) =>
        Regex.IsMatch(word, @"[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]");
}
