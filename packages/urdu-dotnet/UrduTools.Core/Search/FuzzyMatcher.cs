namespace UrduTools.Core.Search;

public static class FuzzyMatcher
{
    public static double Score(string a, string b)
    {
        if (string.IsNullOrEmpty(a) || string.IsNullOrEmpty(b)) return 0.0;
        int maxLen = Math.Max(a.Length, b.Length);
        if (maxLen == 0) return 1.0;
        int editDist = LevenshteinDistance(a, b);
        double lcsRatio = (double)LcsLength(a, b) / maxLen;
        return 0.6 * (1.0 - (double)editDist / maxLen) + 0.4 * lcsRatio;
    }

    public static (string? Best, double Score) BestMatch(string query, IEnumerable<string> candidates)
    {
        string? best = null; double bestScore = 0.5;
        foreach (var c in candidates)
        {
            var s = Score(query, c);
            if (s > bestScore) { best = c; bestScore = s; }
        }
        return (best, bestScore);
    }

    private static int LevenshteinDistance(string a, string b)
    {
        int m = a.Length, n = b.Length;
        var prev = new int[n + 1]; var curr = new int[n + 1];
        for (int j = 0; j <= n; j++) prev[j] = j;
        for (int i = 1; i <= m; i++)
        {
            curr[0] = i;
            for (int j = 1; j <= n; j++)
                curr[j] = a[i-1] == b[j-1] ? prev[j-1] : 1 + Math.Min(prev[j-1], Math.Min(prev[j], curr[j-1]));
            (prev, curr) = (curr, prev);
        }
        return prev[n];
    }

    private static int LcsLength(string a, string b)
    {
        int m = a.Length, n = b.Length;
        var dp = new int[m+1, n+1];
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++)
                dp[i,j] = a[i-1] == b[j-1] ? dp[i-1,j-1]+1 : Math.Max(dp[i-1,j], dp[i,j-1]);
        return dp[m,n];
    }
}
