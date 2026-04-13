namespace UrduTools.Core.Normalization;

public static class Fingerprint
{
    private static readonly NormalizeOptions FingerprintOptions = new()
    {
        Nfc = true, Nbsp = true, AlifMadda = true, Numerals = true,
        ZeroWidth = true, Diacritics = true, Honorifics = true, Hamza = true,
        Kashida = false, PresentationForms = false, PunctuationTrim = true,
        NormalizeCharacters = false,
    };

    public static string Compute(string text)
    {
        if (string.IsNullOrEmpty(text)) return string.Empty;
        return UrduNormalizer.Normalize(text, FingerprintOptions).Trim();
    }
}
