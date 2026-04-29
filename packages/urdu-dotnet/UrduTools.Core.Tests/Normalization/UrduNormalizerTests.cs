using UrduTools.Core.Normalization;
using Xunit;

namespace UrduTools.Core.Tests.Normalization;

public class UrduNormalizerTests
{
    [Fact] public void EmptyString_ReturnsEmpty() => Assert.Equal(string.Empty, UrduNormalizer.Normalize(string.Empty));
    [Fact] public void NFC_AlifPlusMadda_BecomesAlifMadda() => Assert.Equal("\u0622", UrduNormalizer.Normalize("\u0627\u0653"));
    [Fact] public void NBSP_BecomesRegularSpace() => Assert.Equal("کتاب ہے", UrduNormalizer.Normalize("کتاب\u00A0ہے"));
    [Fact] public void Diacritics_StrippedByDefault() => Assert.Equal("علم", UrduNormalizer.Normalize("عِلمٌ"));
    [Fact] public void ExtendedArabicIndic_ToAscii() => Assert.Equal("123", UrduNormalizer.Normalize("۱۲۳"));
    [Fact] public void ArabicIndic_ToAscii() => Assert.Equal("123", UrduNormalizer.Normalize("\u0661\u0662\u0663"));
    [Fact] public void ZWNJ_Stripped() => Assert.Equal("علمہے", UrduNormalizer.Normalize("علم\u200Cہے"));
    [Fact] public void HamzaOnAlif_ToAlif() => Assert.Equal("\u0627", UrduNormalizer.Normalize("\u0623"));
    [Fact] public void CleanText_Unchanged() => Assert.Equal("پاکستان", UrduNormalizer.Normalize("پاکستان"));
    [Fact] public void Kashida_RemovedWhenEnabled() =>
        Assert.Equal("کتاب", UrduNormalizer.Normalize("ک\u0640تاب", new NormalizeOptions { Kashida = true }));
    [Fact] public void NormalizeCharacters_ArabicYe_ToUrduYe() =>
        Assert.Equal("ی", UrduNormalizer.Normalize("\u064A", new NormalizeOptions { NormalizeCharacters = true }));
    [Fact] public void NormalizeCharacters_ArabicKaf_ToUrduKaf() =>
        Assert.Equal("ک", UrduNormalizer.Normalize("\u0643", new NormalizeOptions { NormalizeCharacters = true }));
    [Fact] public void LongText_Under250ms()
    {
        var text = string.Concat(Enumerable.Repeat("پاکستان ", 6250));
        var sw = System.Diagnostics.Stopwatch.StartNew();
        UrduNormalizer.Normalize(text);
        Assert.True(sw.ElapsedMilliseconds < 250, $"Took {sw.ElapsedMilliseconds}ms");
    }
}
