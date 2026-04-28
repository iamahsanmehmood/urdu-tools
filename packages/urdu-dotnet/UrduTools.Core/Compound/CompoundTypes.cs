namespace UrduTools.Core.Compound;

/// <summary>
/// Represents a detected compound word span in text.
/// </summary>
/// <param name="Text">The merged compound text.</param>
/// <param name="Type">Detection method: "affix", "izafat", or "lexicon".</param>
/// <param name="Components">Individual words that form the compound.</param>
/// <param name="StartWord">Index of the first token in the compound (0-based word index).</param>
/// <param name="EndWord">Index of the last token in the compound (0-based, inclusive word index).</param>
public sealed record CompoundSpan(
    string Text,
    string Type,
    string[] Components,
    int StartWord,
    int EndWord
);

/// <summary>
/// Result of checking whether two words form a compound.
/// </summary>
public sealed record CompoundMatch(bool Matched, string? Type);
