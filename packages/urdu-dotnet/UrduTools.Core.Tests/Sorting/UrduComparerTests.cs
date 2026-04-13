using UrduTools.Core.Sorting;
using Xunit;

namespace UrduTools.Core.Tests.Sorting;

public class UrduComparerTests
{
    [Fact]
    public void Sort_CorrectOrder()
    {
        var sorted = UrduComparer.Sort(new[] { "ے", "ا", "ک", "ب" }).ToList();
        Assert.Equal("ا", sorted[0]);
        Assert.Equal("ب", sorted[1]);
        Assert.Equal("ک", sorted[2]);
        Assert.Equal("ے", sorted[3]);
    }
    [Fact] public void ABeforeB() => Assert.True(UrduComparer.Instance.Compare("ا", "ب") < 0);
    [Fact] public void SameWord_Zero() => Assert.Equal(0, UrduComparer.Instance.Compare("کتاب", "کتاب"));
}
