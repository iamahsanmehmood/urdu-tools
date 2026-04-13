namespace UrduTools.Core.Normalization;

/// <summary>Options for the Urdu text normalization pipeline.</summary>
public sealed class NormalizeOptions
{
    /// <summary>Apply NFC Unicode normalization (default: true)</summary>
    public bool Nfc { get; init; } = true;
    /// <summary>Replace non-breaking spaces with regular spaces (default: true)</summary>
    public bool Nbsp { get; init; } = true;
    /// <summary>Normalize Alif Madda sequences (default: true)</summary>
    public bool AlifMadda { get; init; } = true;
    /// <summary>Normalize Arabic/Urdu numerals to ASCII digits (default: true)</summary>
    public bool Numerals { get; init; } = true;
    /// <summary>Strip zero-width characters ZWNJ, ZWJ, soft hyphen (default: true)</summary>
    public bool ZeroWidth { get; init; } = true;
    /// <summary>Strip diacritical marks (zabar, zer, pesh, shadda, etc.) (default: true)</summary>
    public bool Diacritics { get; init; } = true;
    /// <summary>Strip Islamic honorific symbols (default: true)</summary>
    public bool Honorifics { get; init; } = true;
    /// <summary>Normalize Hamza variants (default: true)</summary>
    public bool Hamza { get; init; } = true;
    /// <summary>Remove Kashida / Tatweel (default: false)</summary>
    public bool Kashida { get; init; } = false;
    /// <summary>Map Arabic Presentation Forms to base characters (default: false)</summary>
    public bool PresentationForms { get; init; } = false;
    /// <summary>Trim leading/trailing punctuation (default: false)</summary>
    public bool PunctuationTrim { get; init; } = false;
    /// <summary>Map Arabic look-alike codepoints to correct Urdu codepoints (default: false)</summary>
    public bool NormalizeCharacters { get; init; } = false;

    /// <summary>Default options with all common normalization layers enabled.</summary>
    public static NormalizeOptions Default { get; } = new();

    /// <summary>Strict options for search/indexing: all layers including presentation forms and kashida.</summary>
    public static NormalizeOptions ForSearch { get; } = new()
    {
        Kashida = true,
        PresentationForms = true,
        PunctuationTrim = true,
        NormalizeCharacters = true,
    };
}
