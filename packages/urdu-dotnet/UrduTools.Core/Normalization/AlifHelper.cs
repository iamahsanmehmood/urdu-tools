namespace UrduTools.Core.Normalization;

public static class AlifHelper
{
    public static string NormalizeAlifMadda(string text)
    {
        if (string.IsNullOrEmpty(text)) return text ?? string.Empty;
        return System.Text.RegularExpressions.Regex.Replace(text, "[\u0627\u0671]\u0653", "\u0622");
    }

    public static string NormalizeAlif(string text)
    {
        if (string.IsNullOrEmpty(text)) return text ?? string.Empty;
        var sb = new StringBuilder(text.Length);
        foreach (var r in text.EnumerateRunes())
        {
            if (Array.IndexOf(UnicodeData.AlifVariants, r.Value) >= 0)
                sb.Append('\u0627');
            else
                sb.Append(r.ToString());
        }
        return sb.ToString();
    }
}
