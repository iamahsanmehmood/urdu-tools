using UrduTools.Core.Analysis;
using Xunit;

namespace UrduTools.Core.Tests.Analysis;

public class CharClassifierTests
{
    [Fact] public void UrduLetter_Classified() => Assert.Equal(CharClass.UrduLetter, CharClassifier.Classify(0x067E));
    [Fact] public void ArabicLetter_Classified() => Assert.Equal(CharClass.ArabicLetter, CharClassifier.Classify(0x0628));
    [Fact] public void Numeral_Classified() => Assert.Equal(CharClass.Numeral, CharClassifier.Classify(0x06F1));
    [Fact] public void Whitespace_Classified() => Assert.Equal(CharClass.Whitespace, CharClassifier.Classify(0x0020));
    [Fact] public void IsUrduChar_UrduSpecific_True() => Assert.True(CharClassifier.IsUrduChar(0x06CC));
    [Fact] public void IsUrduChar_ArabicOnly_False() => Assert.False(CharClassifier.IsUrduChar(0x0628));
}
