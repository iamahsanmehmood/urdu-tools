namespace UrduTools.Core.Compound;

/// <summary>
/// UAWL (Urdu Affix and Word List) — high-frequency Urdu compound affixes.
/// Source: Jabbar 2016 Appendix A.
/// </summary>
public static class AffixData
{
    /// <summary>Suffix-like affixes — typically the SECOND element of a compound.</summary>
    public static readonly IReadOnlySet<string> SuffixSet = new HashSet<string>
    {
        // Place / location
        "خانہ", "گاہ", "آباد", "ستان", "زار", "کدہ", "سرا",
        // Agent / person
        "پرست", "نشین", "دار", "بان", "گر", "کار", "گزار",
        "ساز", "شناس", "پرداز", "نواز", "فروش", "باز", "بند",
        "مند", "ور", "ناک", "وار", "آمیز", "انگیز", "آسا",
        "گیر", "نما", "پوش", "خیز", "بار", "یاب", "یافتہ",
        "زدہ", "رسان", "طلب", "پسند", "خوار", "خور", "کش",
        "نامہ", "زادہ", "نشان", "پذیر", "پرور", "بیز",
        // Quality / state
        "مندی", "داری", "بانی", "گری", "کاری", "سازی", "بازی", "بندی", "پرستی",
        // Verbal compounds
        "خواہ", "فرما", "آور", "افزا", "شکن", "آرا", "افروز",
        // Nature/quality endings
        "انہ", "آنہ", "گانہ", "وانہ",
    };

    /// <summary>Prefix-like affixes — typically the FIRST element of a compound.</summary>
    public static readonly IReadOnlySet<string> PrefixSet = new HashSet<string>
    {
        // Negation / privation
        "بے", "نا", "لا", "غیر", "بد", "نیم", "کم",
        // Quantity / degree
        "ہم", "خوش", "سر", "دل", "خود", "نو", "ہر",
        // Perso-Arabic
        "باز", "پیش", "فرو", "در", "بر", "شب", "رو",
        "چشم", "دست", "جان", "سنگ", "آب", "گل", "زبان",
    };

    /// <summary>Combined set: both prefixes and suffixes.</summary>
    public static readonly IReadOnlySet<string> AffixSet = new HashSet<string>(
        SuffixSet.Concat(PrefixSet)
    );
}
