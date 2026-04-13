using UrduTools.Core.Numbers;
using Xunit;

namespace UrduTools.Core.Tests.Numbers;

public class NumberToWordsTests
{
    [Fact] public void Zero() => Assert.Equal("صفر", NumberToWords.Convert(0));
    [Fact] public void One() => Assert.Equal("ایک", NumberToWords.Convert(1));
    [Fact] public void Hundred() => Assert.Equal("ایک سو", NumberToWords.Convert(100));
    [Fact] public void Thousand() => Assert.Equal("ایک ہزار", NumberToWords.Convert(1000));
    [Fact] public void Lakh() => Assert.Equal("ایک لاکھ", NumberToWords.Convert(100_000));
    [Fact] public void Crore() => Assert.Equal("ایک کروڑ", NumberToWords.Convert(10_000_000));
    [Fact] public void Arb() => Assert.Equal("ایک ارب", NumberToWords.Convert(1_000_000_000));
    [Fact] public void Negative_PrefixMunfi() => Assert.StartsWith("منفی", NumberToWords.Convert(-5));
    [Fact] public void Ordinal_First_Masculine() =>
        Assert.Equal("پہلا", NumberToWords.Convert(1, new NumberToWordsOptions { Ordinal = true, Gender = Gender.Masculine }));
    [Fact] public void Ordinal_First_Feminine() =>
        Assert.Equal("پہلی", NumberToWords.Convert(1, new NumberToWordsOptions { Ordinal = true, Gender = Gender.Feminine }));
    [Fact] public void FiveOhFive() => Assert.Equal("پانچ سو پانچ", NumberToWords.Convert(505));
}
