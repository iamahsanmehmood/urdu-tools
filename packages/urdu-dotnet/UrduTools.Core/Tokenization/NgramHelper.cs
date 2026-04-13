namespace UrduTools.Core.Tokenization;

public static class NgramHelper
{
    public static IReadOnlyList<string> CharNgrams(string text, int n)
    {
        var si = new StringInfo(text);
        var len = si.LengthInTextElements;
        var result = new List<string>();
        for (int i = 0; i <= len - n; i++)
            result.Add(si.SubstringByTextElements(i, n));
        return result;
    }
}
