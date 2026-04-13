using UrduTools.Core.Normalization;
using Xunit;

namespace UrduTools.Core.Tests.Normalization;

public class FingerprintTests
{
    [Fact] public void EmptyString() => Assert.Equal(string.Empty, Fingerprint.Compute(string.Empty));
    [Fact] public void DifferentDiacritics_SameFingerprint() =>
        Assert.Equal(Fingerprint.Compute("عِلم"), Fingerprint.Compute("عَلم"));
    [Fact] public void WithZWNJ_MatchesWithout() =>
        Assert.Equal(Fingerprint.Compute("علمہے"), Fingerprint.Compute("علم\u200Cہے"));
    [Fact] public void Honorific_Stripped() =>
        Assert.Equal(Fingerprint.Compute("نبی"), Fingerprint.Compute("نبیؐ"));
    [Fact] public void ReturnsNormalisedWord() => Assert.Equal("علم", Fingerprint.Compute("عِلمٌ"));
    [Fact] public void Deterministic() =>
        Assert.Equal(Fingerprint.Compute("پاکستان"), Fingerprint.Compute("پاکستان"));
}
