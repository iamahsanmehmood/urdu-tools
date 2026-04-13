namespace UrduTools.Core.Sorting;

public sealed class UrduComparer : IComparer<string>
{
    public static readonly UrduComparer Instance = new();

    public int Compare(string? x, string? y)
    {
        if (x is null && y is null) return 0;
        if (x is null) return -1;
        if (y is null) return 1;
        return string.Compare(UrduCollation.SortKey(x), UrduCollation.SortKey(y), StringComparison.Ordinal);
    }

    public static IOrderedEnumerable<string> Sort(IEnumerable<string> words) =>
        words.OrderBy(w => w, Instance);
}
