namespace UrduTools.Core.Search;

public enum MatchLayer
{
    Exact, Nfc, StripZeroWidth, StripDiacritics, NormalizeAlif,
    StripHonorifics, NormalizeHamza, TrimPunctuation, CompoundSplit
}

public sealed record MatchResult(bool Matched, MatchLayer? Layer, string NormalizedQuery, string NormalizedTarget);

public static class UrduMatcher
{
    public static MatchResult Match(string query, string target)
    {
        var q = query; var t = target;
        foreach (var layer in Enum.GetValues<MatchLayer>())
        {
            q = ApplyLayer(q, layer);
            t = ApplyLayer(t, layer);
            if (string.Equals(q, t, StringComparison.Ordinal))
                return new MatchResult(true, layer, q, t);
        }
        return new MatchResult(false, null, q, t);
    }

    /// <summary>
    /// Returns an array of progressively normalized forms of a word.
    /// Use this for database lookups: try each form in order, stop at first match.
    /// Implements the 9-layer strategy from urdu_unicode_playbook §2.
    /// </summary>
    public static IReadOnlyList<string> GetAllNormalizations(string word)
    {
        var forms = new List<string> { word };
        void Add(string s) { if (s != forms[^1]) forms.Add(s); }

        var nfc = word.Normalize(NormalizationForm.FormC);
        Add(nfc);
        var noZw = Normalization.UrduNormalizer.Normalize(nfc, new Normalization.NormalizeOptions
            { Nfc=false,Nbsp=false,AlifMadda=false,Numerals=false,ZeroWidth=true,Diacritics=false,Honorifics=false,Hamza=false });
        Add(noZw);
        var noDia = Normalization.DiacriticsHelper.StripDiacritics(noZw);
        Add(noDia);
        var normAlif = Normalization.AlifHelper.NormalizeAlif(noDia);
        Add(normAlif);
        var noHon = Normalization.UrduNormalizer.StripRanges(normAlif, Normalization.UnicodeData.HonoricRanges);
        Add(noHon);
        var normHamza = Normalization.HamzaHelper.NormalizeHamza(noHon);
        Add(normHamza);
        var trimmed = normHamza.Trim();
        Add(trimmed);
        return forms;
    }

    private static string ApplyLayer(string s, MatchLayer layer) => layer switch
    {
        MatchLayer.Exact => s,
        MatchLayer.Nfc => s.Normalize(NormalizationForm.FormC),
        MatchLayer.StripZeroWidth => Normalization.UrduNormalizer.Normalize(s, new Normalization.NormalizeOptions
            { Nfc=false,Nbsp=false,AlifMadda=false,Numerals=false,ZeroWidth=true,Diacritics=false,Honorifics=false,Hamza=false }),
        MatchLayer.StripDiacritics => Normalization.DiacriticsHelper.StripDiacritics(s),
        MatchLayer.NormalizeAlif => Normalization.AlifHelper.NormalizeAlif(s),
        MatchLayer.StripHonorifics => Normalization.UrduNormalizer.StripRanges(s, Normalization.UnicodeData.HonoricRanges),
        MatchLayer.NormalizeHamza => Normalization.HamzaHelper.NormalizeHamza(s),
        MatchLayer.TrimPunctuation => s.Trim(),
        MatchLayer.CompoundSplit => s.Split(' ', StringSplitOptions.RemoveEmptyEntries).FirstOrDefault() ?? s,
        _ => s
    };
}
