using UrduTools.Core.Normalization;
using Xunit;

namespace UrduTools.Core.Tests.Normalization;

public class DiacriticsTests
{
    [Fact] public void EmptyString() => Assert.Equal(string.Empty, DiacriticsHelper.StripDiacritics(string.Empty));
    [Fact] public void StripZabar() => Assert.Equal("علم", DiacriticsHelper.StripDiacritics("عَلَم"));
    [Fact] public void StripZer() => Assert.Equal("علم", DiacriticsHelper.StripDiacritics("عِلم"));
    [Fact] public void OnlyDiacritics_Empty() => Assert.Equal(string.Empty, DiacriticsHelper.StripDiacritics("\u064E\u0650\u064F"));
    [Fact] public void CleanText_Unchanged() => Assert.Equal("پاکستان", DiacriticsHelper.StripDiacritics("پاکستان"));
    [Fact] public void IsDiacritic_Zabar_True() => Assert.True(DiacriticsHelper.IsDiacritic(0x064E));
    [Fact] public void IsDiacritic_Letter_False() => Assert.False(DiacriticsHelper.IsDiacritic(0x067E));
}
