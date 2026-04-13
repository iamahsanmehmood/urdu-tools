namespace UrduTools.Core.Transliteration;

public static class RomanUrduParser
{
    private static readonly (string Roman, string Urdu)[] Entries =
    [
        ("chh","\u0686\u06BE"),("ch","\u0686"),("gh","\u063A"),("sh","\u0634"),
        ("kh","\u062E"),("zh","\u0698"),("bh","\u0628\u06BE"),("ph","\u067E\u06BE"),
        ("th","\u062A\u06BE"),("Th","\u0679\u06BE"),("jh","\u062C\u06BE"),
        ("dh","\u062F\u06BE"),("Dh","\u0688\u06BE"),
        ("a","\u0627"),("b","\u0628"),("p","\u067E"),("t","\u062A"),
        ("T","\u0679"),("s","\u0633"),("j","\u062C"),("h","\u06C1"),
        ("d","\u062F"),("D","\u0688"),("r","\u0631"),("R","\u0691"),
        ("z","\u0632"),("f","\u0641"),("q","\u0642"),("k","\u06A9"),
        ("g","\u06AF"),("l","\u0644"),("m","\u0645"),("n","\u0646"),
        ("w","\u0648"),("y","\u06CC"),("e","\u06D2"),("i","\u06CC"),("u","\u0648"),
    ];

    public static string FromRoman(string text)
    {
        if (string.IsNullOrEmpty(text)) return text ?? string.Empty;
        var sb = new StringBuilder();
        int i = 0;
        while (i < text.Length)
        {
            if (text[i] == ' ') { sb.Append(' '); i++; continue; }
            bool matched = false;
            foreach (var (roman, urdu) in Entries)
            {
                if (text.AsSpan(i).StartsWith(roman, StringComparison.Ordinal))
                {
                    sb.Append(urdu); i += roman.Length; matched = true; break;
                }
            }
            if (!matched) { sb.Append(text[i]); i++; }
        }
        return sb.ToString();
    }
}
