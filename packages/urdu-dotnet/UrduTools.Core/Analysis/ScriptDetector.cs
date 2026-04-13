namespace UrduTools.Core.Analysis;

public enum Script { Urdu, Arabic, Persian, Latin, Mixed, Unknown }

public static class ScriptDetector
{
    private static readonly HashSet<int> UrduSpecific = new()
    {
        0x0679, 0x067E, 0x0686, 0x0688, 0x0691, 0x06A9, 0x06AF,
        0x06BA, 0x06BE, 0x06C1, 0x06CC, 0x06D2,
    };

    public static Script Detect(string text)
    {
        if (string.IsNullOrEmpty(text)) return Script.Unknown;
        int total = 0, urduSpecific = 0, arabic = 0, latin = 0;
        foreach (var r in text.EnumerateRunes())
        {
            var cp = r.Value;
            if (cp >= 0x0600 && cp <= 0x06FF) { total++; arabic++; if (UrduSpecific.Contains(cp)) urduSpecific++; }
            else if ((cp >= 0x0041 && cp <= 0x005A) || (cp >= 0x0061 && cp <= 0x007A)) { total++; latin++; }
        }
        if (total == 0) return Script.Unknown;
        if ((double)urduSpecific / total > 0.1) return Script.Urdu;
        if (arabic > 0 && latin > 0) return Script.Mixed;
        if (arabic > 0) return Script.Arabic;
        if (latin > 0) return Script.Latin;
        return Script.Unknown;
    }
}
