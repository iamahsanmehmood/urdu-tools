namespace UrduTools.Core.StringUtils;

public static class UrduStringUtils
{
    public static string Reverse(string text)
    {
        if (string.IsNullOrEmpty(text)) return text ?? string.Empty;
        var words = text.Split(' ', StringSplitOptions.None);
        Array.Reverse(words);
        return string.Join(' ', words);
    }

    public static string Truncate(string text, int maxLength)
    {
        if (string.IsNullOrEmpty(text)) return text ?? string.Empty;
        var si = new StringInfo(text);
        if (si.LengthInTextElements <= maxLength) return text;
        var cut = maxLength - 3;
        while (cut > 0 && si.SubstringByTextElements(cut - 1, 1) != " ") cut--;
        if (cut <= 0) cut = maxLength - 3;
        return si.SubstringByTextElements(0, cut).TrimEnd() + "...";
    }

    public static int WordCount(string text)
    {
        if (string.IsNullOrWhiteSpace(text)) return 0;
        return text.Split(new[] { ' ', '\t', '\n', '\r', '\u00A0', '\u200B' },
            StringSplitOptions.RemoveEmptyEntries).Length;
    }

    public static int CharCount(string text, bool excludeDiacritics = false)
    {
        if (string.IsNullOrEmpty(text)) return 0;
        var s = excludeDiacritics ? Normalization.DiacriticsHelper.StripDiacritics(text) : text;
        return new StringInfo(s).LengthInTextElements;
    }

    public static IReadOnlyList<string> ExtractUrdu(string text)
    {
        if (string.IsNullOrEmpty(text)) return Array.Empty<string>();
        var result = new List<string>();
        var sb = new StringBuilder();
        foreach (var r in text.EnumerateRunes())
        {
            var cp = r.Value;
            bool isUrdu = (cp >= 0x0600 && cp <= 0x06FF) || (cp >= 0x0750 && cp <= 0x077F);
            if (isUrdu) sb.Append(r.ToString());
            else if (sb.Length > 0) { result.Add(sb.ToString()); sb.Clear(); }
        }
        if (sb.Length > 0) result.Add(sb.ToString());
        return result;
    }
}
