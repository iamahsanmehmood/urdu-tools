namespace UrduTools.Core.Normalization;

public static class DiacriticsHelper
{
    public static string StripDiacritics(string text) =>
        UrduNormalizer.StripRanges(text, UnicodeData.DiacriticRanges);

    public static bool IsDiacritic(int codePoint) =>
        UnicodeData.DiacriticRanges.Any(r => codePoint >= r.Lo && codePoint <= r.Hi);
}
