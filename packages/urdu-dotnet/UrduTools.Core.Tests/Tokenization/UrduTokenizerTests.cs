using UrduTools.Core.Tokenization;
using Xunit;

namespace UrduTools.Core.Tests.Tokenization;

public class UrduTokenizerTests
{
    [Fact] public void EmptyString_NoTokens() => Assert.Empty(UrduTokenizer.Tokenize(string.Empty));
    [Fact] public void SingleWord_OneToken() => Assert.Single(UrduTokenizer.Tokenize("پاکستان"));
    [Fact] public void TwoWords_TwoTokens() => Assert.Equal(2, UrduTokenizer.Tokenize("پاکستان زندہ").Count);
    [Fact] public void SentenceSplit_OnFullStop() =>
        Assert.Equal(2, UrduTokenizer.Sentences("پاکستان۔ہندوستان").Count);
    [Fact] public void Ngrams_Count()
    {
        var tokens = UrduTokenizer.Tokenize("ایک دو تین");
        Assert.Equal(2, UrduTokenizer.Ngrams(tokens, 2).Count);
    }
    [Fact] public void UrduWord_CorrectType() =>
        Assert.Equal(TokenType.UrduWord, UrduTokenizer.Tokenize("کتاب")[0].Type);
}
