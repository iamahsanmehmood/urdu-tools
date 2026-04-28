namespace UrduTools.Core.Compound;

/// <summary>
/// Represents a detected compound word span in text.
/// </summary>
public sealed record CompoundSpan(
    string Text,
    string Type,       // "affix" | "izafat" | "lexicon"
    string[] Components,
    int Start,
    int End
);

/// <summary>
/// Result of checking whether two words form a compound.
/// </summary>
public sealed record CompoundMatch(bool Matched, string? Type);
