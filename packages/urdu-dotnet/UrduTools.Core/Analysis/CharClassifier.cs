namespace UrduTools.Core.Analysis;

public enum CharClass { UrduLetter, ArabicLetter, Diacritic, Numeral, Punctuation, Whitespace, Latin, Other }

public static class CharClassifier
{
    private static readonly HashSet<int> UrduSpecific = new()
    {
        0x0679, 0x067E, 0x0686, 0x0688, 0x0691, 0x06A9, 0x06AF,
        0x06BA, 0x06BE, 0x06C1, 0x06CC, 0x06D2,
    };

    public static CharClass Classify(int codePoint)
    {
        if (UrduSpecific.Contains(codePoint)) return CharClass.UrduLetter;
        if (codePoint >= 0x06F0 && codePoint <= 0x06F9) return CharClass.Numeral;
        if (codePoint >= 0x064B && codePoint <= 0x065F || codePoint == 0x0670) return CharClass.Diacritic;
        if (codePoint >= 0x0600 && codePoint <= 0x06FF) return CharClass.ArabicLetter;
        if (codePoint >= 0x0030 && codePoint <= 0x0039) return CharClass.Numeral;
        if (char.IsWhiteSpace(char.ConvertFromUtf32(codePoint), 0)) return CharClass.Whitespace;
        if ((codePoint >= 0x0041 && codePoint <= 0x005A) || (codePoint >= 0x0061 && codePoint <= 0x007A)) return CharClass.Latin;
        return CharClass.Other;
    }

    public static bool IsUrduChar(int codePoint) =>
        UrduSpecific.Contains(codePoint) || (codePoint >= 0x06F0 && codePoint <= 0x06F9);
}
