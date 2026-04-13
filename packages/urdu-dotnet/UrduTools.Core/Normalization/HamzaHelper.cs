namespace UrduTools.Core.Normalization;

public static class HamzaHelper
{
    public static string NormalizeHamza(string text)
    {
        if (string.IsNullOrEmpty(text)) return text ?? string.Empty;
        return text.Replace('\u0623', '\u0627').Replace('\u0624', '\u0648');
    }
}
