namespace UrduTools.Core.Analysis;

public static class RtlDetector
{
    public static bool IsRtl(string text)
    {
        if (string.IsNullOrEmpty(text)) return false;
        foreach (var r in text.EnumerateRunes())
        {
            var cp = r.Value;
            if ((cp >= 0x0590 && cp <= 0x08FF) || (cp >= 0xFB1D && cp <= 0xFEFF)) return true;
            if ((cp >= 0x0041 && cp <= 0x005A) || (cp >= 0x0061 && cp <= 0x007A)) return false;
        }
        return false;
    }
}
