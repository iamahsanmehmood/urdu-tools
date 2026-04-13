using UrduTools.Core.Transliteration;
using Xunit;

namespace UrduTools.Core.Tests.Transliteration;

public class UrduRomanizerTests
{
    [Fact] public void EmptyString() => Assert.Equal(string.Empty, UrduRomanizer.ToRoman(string.Empty));
    [Fact] public void Pakistan_HasOutput() => Assert.False(string.IsNullOrEmpty(UrduRomanizer.ToRoman("پاکستان")));
    [Fact] public void Digraph_bh_Recognized() => Assert.Contains("bh", UrduRomanizer.ToRoman("بھ"));
    [Fact] public void FromRoman_EmptyString() => Assert.Equal(string.Empty, RomanUrduParser.FromRoman(string.Empty));
    [Fact] public void FromRoman_NeverThrows()
    {
        var ex = Record.Exception(() => RomanUrduParser.FromRoman("pakistan"));
        Assert.Null(ex);
    }
}
