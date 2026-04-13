using UrduTools.Core.Normalization;
using Xunit;

namespace UrduTools.Core.Tests.Normalization;

public class AlifTests
{
    [Fact] public void EmptyString() => Assert.Equal(string.Empty, AlifHelper.NormalizeAlifMadda(string.Empty));
    [Fact] public void AlifPlusMadda_ToAlifMadda() => Assert.Equal("\u0622", AlifHelper.NormalizeAlifMadda("\u0627\u0653"));
    [Fact] public void AlifWaslaPlusMadda() => Assert.Equal("\u0622", AlifHelper.NormalizeAlifMadda("\u0671\u0653"));
    [Fact] public void CleanText_Unchanged() => Assert.Equal("پاکستان", AlifHelper.NormalizeAlifMadda("پاکستان"));
    [Fact] public void NormalizeAlif_Variants() =>
        Assert.Equal("\u0627\u0627\u0627", AlifHelper.NormalizeAlif("\u0622\u0623\u0625"));
}
