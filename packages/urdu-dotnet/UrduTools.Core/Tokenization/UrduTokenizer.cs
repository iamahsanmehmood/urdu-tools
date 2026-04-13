namespace UrduTools.Core.Tokenization;

public enum TokenType { UrduWord, LatinWord, Numeral, Punctuation, Whitespace, Mixed }

public sealed record Token(string Text, TokenType Type);

public static class UrduTokenizer
{
    private static readonly System.Text.RegularExpressions.Regex WhitespaceRe =
        new(@"[\u0020\u00A0\u200B\t\n\r]+", System.Text.RegularExpressions.RegexOptions.Compiled);

    public static IReadOnlyList<Token> Tokenize(string text)
    {
        if (string.IsNullOrEmpty(text)) return Array.Empty<Token>();
        var tokens = new List<Token>();
        foreach (var part in WhitespaceRe.Split(text))
        {
            if (string.IsNullOrEmpty(part)) continue;
            tokens.Add(new Token(part, ClassifyToken(part)));
        }
        return tokens;
    }

    public static IReadOnlyList<string> Sentences(string text)
    {
        if (string.IsNullOrEmpty(text)) return Array.Empty<string>();
        return System.Text.RegularExpressions.Regex.Split(text, @"[\u06D4\u061F\u0021]+")
            .Select(s => s.Trim()).Where(s => !string.IsNullOrEmpty(s)).ToList();
    }

    public static IReadOnlyList<IReadOnlyList<Token>> Ngrams(IReadOnlyList<Token> tokens, int n)
    {
        var result = new List<IReadOnlyList<Token>>();
        for (int i = 0; i <= tokens.Count - n; i++)
            result.Add(tokens.Skip(i).Take(n).ToList());
        return result;
    }

    private static TokenType ClassifyToken(string token)
    {
        bool hasUrdu = false, hasLatin = false, hasNum = false;
        foreach (var r in token.EnumerateRunes())
        {
            var cp = r.Value;
            if (cp >= 0x0600 && cp <= 0x06FF) hasUrdu = true;
            else if ((cp >= 0x0041 && cp <= 0x005A) || (cp >= 0x0061 && cp <= 0x007A)) hasLatin = true;
            else if ((cp >= 0x0030 && cp <= 0x0039) || (cp >= 0x06F0 && cp <= 0x06F9)) hasNum = true;
        }
        if (hasUrdu && !hasLatin) return TokenType.UrduWord;
        if (hasLatin && !hasUrdu) return TokenType.LatinWord;
        if (hasNum && !hasUrdu && !hasLatin) return TokenType.Numeral;
        if (hasUrdu || hasLatin) return TokenType.Mixed;
        return TokenType.Punctuation;
    }
}
