namespace UrduTools.Core.Normalization;

public static class NumeralsHelper
{
    public static string NormalizeNumerals(string text)
    {
        if (string.IsNullOrEmpty(text)) return text ?? string.Empty;
        var sb = new StringBuilder(text.Length);
        foreach (var r in text.EnumerateRunes())
        {
            var cp = r.Value;
            if (cp >= 0x0660 && cp <= 0x0669) sb.Append((char)('0' + cp - 0x0660));
            else if (cp >= 0x06F0 && cp <= 0x06F9) sb.Append((char)('0' + cp - 0x06F0));
            else sb.Append(r.ToString());
        }
        return sb.ToString();
    }

    public static string ToUrduNumerals(string asciiDigits)
    {
        var sb = new StringBuilder(asciiDigits.Length);
        foreach (var ch in asciiDigits)
            if (ch >= '0' && ch <= '9') sb.Append((char)(0x06F0 + ch - '0'));
            else sb.Append(ch);
        return sb.ToString();
    }
}
