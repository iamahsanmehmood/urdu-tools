using UrduTools.Core.StringUtils;
using Xunit;

namespace UrduTools.Core.Tests.StringUtils;

public class HtmlEntityDecoderTests
{
    [Fact] public void EmptyString() => Assert.Equal(string.Empty, HtmlEntityDecoder.Decode(string.Empty));
    [Fact] public void Rsquo_ToApostrophe() =>
        Assert.Equal("کتاب\u2019خانہ", HtmlEntityDecoder.Decode("کتاب&rsquo;خانہ"));
    [Fact] public void Nbsp_ToNbsp() =>
        Assert.Equal("علم\u00A0ہے", HtmlEntityDecoder.Decode("علم&nbsp;ہے"));
    [Fact] public void DoubleQuotes() =>
        Assert.Equal("\u201C\u0627\u0631\u062F\u0648\u201D", HtmlEntityDecoder.Decode("&ldquo;\u0627\u0631\u062F\u0648&rdquo;"));
    [Fact] public void AmpLast_NoDoubleDecoding() =>
        Assert.Equal("&rsquo;", HtmlEntityDecoder.Decode("&amp;rsquo;"));
    [Fact] public void NoEntities_Unchanged() =>
        Assert.Equal("پاکستان زندہ باد", HtmlEntityDecoder.Decode("پاکستان زندہ باد"));
}
