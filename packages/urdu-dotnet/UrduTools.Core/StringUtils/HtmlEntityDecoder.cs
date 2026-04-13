namespace UrduTools.Core.StringUtils;

public static class HtmlEntityDecoder
{
    public static string Decode(string text)
    {
        if (string.IsNullOrEmpty(text)) return text ?? string.Empty;
        return text
            .Replace("&nbsp;", "\u00A0")
            .Replace("&ldquo;", "\u201C")
            .Replace("&rdquo;", "\u201D")
            .Replace("&lsquo;", "\u2018")
            .Replace("&rsquo;", "\u2019")
            .Replace("&quot;", "\"")
            .Replace("&#39;", "'")
            .Replace("&amp;", "&");
    }
}
