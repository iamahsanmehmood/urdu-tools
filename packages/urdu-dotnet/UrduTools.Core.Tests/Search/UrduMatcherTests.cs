using UrduTools.Core.Search;
using Xunit;

namespace UrduTools.Core.Tests.Search;

public class UrduMatcherTests
{
    [Fact] public void ExactMatch_Matched() => Assert.True(UrduMatcher.Match("علم", "علم").Matched);
    [Fact] public void DifferentWords_NotMatched() => Assert.False(UrduMatcher.Match("علم", "کتاب").Matched);
    [Fact] public void DiacriticsVariant_Matched() => Assert.True(UrduMatcher.Match("عِلم", "علم").Matched);
    [Fact] public void FuzzyScore_SameWord_High() => Assert.True(FuzzyMatcher.Score("علم", "علم") > 0.9);
    [Fact] public void FuzzyScore_DifferentWords_Low() => Assert.True(FuzzyMatcher.Score("علم", "کتاب") < 0.6);
}
