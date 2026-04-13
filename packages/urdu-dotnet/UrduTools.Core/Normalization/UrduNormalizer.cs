namespace UrduTools.Core.Normalization;

public static class UrduNormalizer
{
    public static string Normalize(string text, NormalizeOptions? options = null)
    {
        if (string.IsNullOrEmpty(text)) return text ?? string.Empty;
        var o = options ?? NormalizeOptions.Default;
        var s = text;
        if (o.Nfc) s = s.Normalize(NormalizationForm.FormC);
        if (o.Nbsp) s = s.Replace('\u00A0', ' ');
        if (o.AlifMadda) s = AlifHelper.NormalizeAlifMadda(s);
        if (o.Numerals) s = NumeralsHelper.NormalizeNumerals(s);
        if (o.ZeroWidth) s = StripCodePoints(s, UnicodeData.ZeroWidthChars);
        if (o.Diacritics) s = StripRanges(s, UnicodeData.DiacriticRanges);
        if (o.Honorifics) s = StripRanges(s, UnicodeData.HonoricRanges);
        if (o.Hamza) s = HamzaHelper.NormalizeHamza(s);
        if (o.Kashida) s = s.Replace("\u0640", string.Empty);
        if (o.PresentationForms) s = NormalizePresentationForms(s);
        if (o.PunctuationTrim) s = TrimPunctuation(s);
        if (o.NormalizeCharacters) s = NormalizeArabicToUrdu(s);
        return s;
    }

    public static string StripRanges(string text, (int Lo, int Hi)[] ranges)
    {
        if (string.IsNullOrEmpty(text)) return text ?? string.Empty;
        var sb = new StringBuilder(text.Length);
        foreach (var ch in text.EnumerateRunes())
        {
            var cp = ch.Value;
            if (!ranges.Any(r => cp >= r.Lo && cp <= r.Hi))
                sb.Append(ch.ToString());
        }
        return sb.ToString();
    }

    private static string StripCodePoints(string text, int[] codePoints)
    {
        var set = new HashSet<int>(codePoints);
        var sb = new StringBuilder(text.Length);
        foreach (var r in text.EnumerateRunes())
            if (!set.Contains(r.Value)) sb.Append(r.ToString());
        return sb.ToString();
    }

    private static string NormalizePresentationForms(string text)
    {
        var sb = new StringBuilder(text.Length);
        foreach (var r in text.EnumerateRunes())
        {
            if (UnicodeData.PresentationFormsMap.TryGetValue(r.Value, out var mapped))
                sb.Append(mapped);
            else
                sb.Append(r.ToString());
        }
        return sb.ToString();
    }

    private static string TrimPunctuation(string text)
    {
        int start = 0;
        var runes = text.EnumerateRunes().ToList();
        while (start < runes.Count && IsNonLetterNonDigit(runes[start].Value)) start++;
        int end = runes.Count - 1;
        while (end >= start && IsNonLetterNonDigit(runes[end].Value)) end--;
        if (start > end) return string.Empty;
        return string.Concat(runes.Skip(start).Take(end - start + 1).Select(r => r.ToString()));
    }

    private static bool IsNonLetterNonDigit(int cp)
    {
        var s = char.ConvertFromUtf32(cp);
        var cat = CharUnicodeInfo.GetUnicodeCategory(s, 0);
        return cat != UnicodeCategory.OtherLetter
            && cat != UnicodeCategory.LowercaseLetter
            && cat != UnicodeCategory.UppercaseLetter
            && cat != UnicodeCategory.TitlecaseLetter
            && cat != UnicodeCategory.ModifierLetter
            && cat != UnicodeCategory.DecimalDigitNumber
            && cat != UnicodeCategory.LetterNumber
            && cat != UnicodeCategory.OtherNumber;
    }

    public static string NormalizeArabicToUrdu(string text)
    {
        if (string.IsNullOrEmpty(text)) return text ?? string.Empty;
        return text
            .Replace('\u064A', '\u06CC')
            .Replace('\u0643', '\u06A9')
            .Replace('\u0647', '\u06C1');
    }
}
