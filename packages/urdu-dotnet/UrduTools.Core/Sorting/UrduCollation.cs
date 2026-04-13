namespace UrduTools.Core.Sorting;

internal static class UrduCollation
{
    public static readonly int[] Alphabet =
    [
        0x0621, 0x0627, 0x0628, 0x067E, 0x062A, 0x0679, 0x062B, 0x062C,
        0x0686, 0x062D, 0x062E, 0x062F, 0x0688, 0x0630, 0x0631, 0x0691,
        0x0632, 0x0698, 0x0633, 0x0634, 0x0635, 0x0636, 0x0637, 0x0638,
        0x0639, 0x063A, 0x0641, 0x0642, 0x06A9, 0x06AF, 0x0644, 0x0645,
        0x0646, 0x06BA, 0x0648, 0x06C1, 0x06BE, 0x06CC, 0x06D2,
    ];

    public static readonly Dictionary<int, int> SortOrderMap =
        Alphabet.Select((cp, i) => (cp, i)).ToDictionary(t => t.cp, t => t.i);

    public static string SortKey(string word)
    {
        var stripped = Normalization.DiacriticsHelper.StripDiacritics(word);
        var sb = new StringBuilder();
        foreach (var r in stripped.EnumerateRunes())
        {
            var idx = SortOrderMap.TryGetValue(r.Value, out var i) ? i : 99;
            sb.Append(idx.ToString("D2"));
        }
        return sb.ToString();
    }
}
