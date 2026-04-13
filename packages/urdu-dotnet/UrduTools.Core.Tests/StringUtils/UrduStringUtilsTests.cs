using UrduTools.Core.StringUtils;
using Xunit;

namespace UrduTools.Core.Tests.StringUtils;

public class UrduStringUtilsTests
{
    [Fact] public void Reverse_TwoWords() => Assert.Equal("ہندوستان پاکستان", UrduStringUtils.Reverse("پاکستان ہندوستان"));
    [Fact] public void Truncate_Short_Unchanged() => Assert.Equal("کتاب", UrduStringUtils.Truncate("کتاب", 20));
    [Fact] public void WordCount_Two() => Assert.Equal(2, UrduStringUtils.WordCount("پاکستان زندہ"));
    [Fact] public void CharCount_BaseWord() =>
        Assert.Equal(3, UrduStringUtils.CharCount("علم"));
    [Fact] public void ExtractUrdu_FromMixed()
    {
        var segs = UrduStringUtils.ExtractUrdu("Hello علم world");
        Assert.Single(segs);
        Assert.Equal("علم", segs[0]);
    }
}
