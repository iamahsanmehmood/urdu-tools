namespace UrduTools.Core.Transliteration;

public static class UrduRomanizer
{
    private static readonly (string Urdu, string Roman)[] Digraphs =
    [
        ("\u0628\u06BE","bh"),("\u067E\u06BE","ph"),("\u062A\u06BE","th"),
        ("\u0679\u06BE","Th"),("\u062C\u06BE","jh"),("\u0686\u06BE","chh"),
        ("\u062F\u06BE","dh"),("\u0688\u06BE","Dh"),("\u06A9\u06BE","kh"),
        ("\u06AF\u06BE","gh"),
    ];

    private static readonly Dictionary<int, string> SingleMap = new()
    {
        [0x0627]="a",[0x0628]="b",[0x067E]="p",[0x062A]="t",[0x0679]="T",
        [0x062B]="s",[0x062C]="j",[0x0686]="ch",[0x062D]="h",[0x062E]="kh",
        [0x062F]="d",[0x0688]="D",[0x0630]="z",[0x0631]="r",[0x0691]="R",
        [0x0632]="z",[0x0698]="zh",[0x0633]="s",[0x0634]="sh",[0x0635]="s",
        [0x0636]="z",[0x0637]="t",[0x0638]="z",[0x0639]="'",[0x063A]="gh",
        [0x0641]="f",[0x0642]="q",[0x06A9]="k",[0x06AF]="g",[0x0644]="l",
        [0x0645]="m",[0x0646]="n",[0x06BA]="n",[0x0648]="w",[0x06C1]="h",
        [0x06BE]="h",[0x06CC]="y",[0x06D2]="e",[0x0621]="",
        [0x064E]="a",[0x0650]="i",[0x064F]="u",
    };

    public static string ToRoman(string text)
    {
        if (string.IsNullOrEmpty(text)) return text ?? string.Empty;
        var sb = new StringBuilder();
        int i = 0;
        while (i < text.Length)
        {
            bool matched = false;
            foreach (var (urdu, roman) in Digraphs)
            {
                if (text.AsSpan(i).StartsWith(urdu))
                {
                    sb.Append(roman); i += urdu.Length; matched = true; break;
                }
            }
            if (!matched)
            {
                var cp = char.ConvertToUtf32(text, i);
                if (SingleMap.TryGetValue(cp, out var r)) sb.Append(r);
                else if (text[i] == ' ') sb.Append(' ');
                else sb.Append(text[i]);
                i += char.IsSurrogatePair(text, i) ? 2 : 1;
            }
        }
        return sb.ToString();
    }
}
