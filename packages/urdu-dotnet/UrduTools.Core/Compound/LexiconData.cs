namespace UrduTools.Core.Compound;

/// <summary>
/// Curated compound word lexicon — maps root words to their valid compound tails.
/// This contains the most common and verified Urdu compound words.
/// For the complete lexicon, see the TypeScript source.
/// </summary>
public static class LexiconData
{
    /// <summary>
    /// Compound lexicon: root → set of valid tails.
    /// Includes synonym pairs, echo compounds, fixed collocations, and multi-word titles.
    /// </summary>
    public static readonly IReadOnlyDictionary<string, HashSet<string>> CompoundLexicon =
        new Dictionary<string, HashSet<string>>
        {
            // Synonym / rhyming compounds
            ["کھیل"] = new() { "کود" },
            ["توڑ"] = new() { "پھوڑ" },
            ["جوڑ"] = new() { "توڑ" },
            ["کاٹ"] = new() { "چھانٹ" },
            ["الٹ"] = new() { "پلٹ" },
            ["چال"] = new() { "چلن" },
            ["ناچ"] = new() { "گانا" },
            ["آمد"] = new() { "رفت" },
            ["لاگ"] = new() { "لپیٹ" },
            ["شادی"] = new() { "بیاہ" },
            ["لین"] = new() { "دین" },
            ["میل"] = new() { "جول" },
            ["رہن"] = new() { "سہن" },
            ["دیکھ"] = new() { "بھال" },
            ["سوچ"] = new() { "بچار" },
            ["روک"] = new() { "ٹوک" },
            ["ٹال"] = new() { "مٹول" },
            ["مار"] = new() { "پیٹ" },
            ["لڑائی"] = new() { "جھگڑا" },
            ["دکھ"] = new() { "درد" },
            ["رنگ"] = new() { "روپ", "برنگے", "برنگ" },
            ["ہنسی"] = new() { "مذاق" },

            // Time / repetition
            ["صبح"] = new() { "سویرے", "شام", "صادق", "و شام" },
            ["دن"] = new() { "رات" },
            ["رات"] = new() { "دن" },
            ["آج"] = new() { "کل" },
            ["دھیرے"] = new() { "دھیرے" },
            ["آہستہ"] = new() { "آہستہ" },

            // Place / direction
            ["چاروں"] = new() { "طرف" },
            ["ہر"] = new() { "طرف" },
            ["آس"] = new() { "پاس" },
            ["اندر"] = new() { "باہر" },
            ["اوپر"] = new() { "نیچے" },
            ["آگے"] = new() { "پیچھے" },
            ["دائیں"] = new() { "بائیں" },

            // Titles / institutions
            ["وزیر"] = new() { "اعظم", "اعلی", "خارجہ", "داخلہ", "خزانہ", "تعلیم", "دفاع" },
            ["صدر"] = new() { "مملکت", "نشیں" },
            ["چیف"] = new() { "جسٹس" },
            ["سپریم"] = new() { "کورٹ" },
            ["ہائی"] = new() { "کورٹ", "اسکول" },
            ["اقوام"] = new() { "متحدہ" },
            ["انسائیکلوپیڈیا"] = new() { "آف اسلام" },

            // Common lexical compounds
            ["طالب"] = new() { "علم" },
            ["نظام"] = new() { "شمسی", "اوقات", "ہستی" },
            ["حسن"] = new() { "سلوک", "کاردگی", "انتظام" },
            ["قومی"] = new() { "اسمبلی", "ترانہ", "ترقی", "اتفاق", "زبان", "شاہراہ", "شناخت" },
            ["نیک"] = new() { "نامی", "اعمال", "دل", "سیرت", "نام", "نیت", "کام" },
            ["روز"] = new() { "مرہ" },
            ["چہل"] = new() { "پہل", "قدمی" },
            ["درد"] = new() { "دل", "طفلی", "قولنج" },
            ["محنت"] = new() { "مشقت", "و مشقت" },
            ["صبر"] = new() { "شکر", "و تحمل", "و شکر" },
            ["امن"] = new() { "و سکون" },
            ["تعلیم"] = new() { "یافتہ" },
            ["خیر"] = new() { "مقدم", "خواہ" },
            ["بال"] = new() { "بچے" },
            ["اللہ"] = new() { "تعالیٰ" },

            // New contributions
            ["عزت"] = new() { "وقار", "و عظمت" },
            ["حکمت"] = new() { "عملی" },
            ["نفع"] = new() { "نقصان" },
            ["خرید"] = new() { "فروخت" },
            ["ظلم"] = new() { "زیادتی", "ستم", "و جبر" },
            ["عدل"] = new() { "انصاف", "و انصاف" },
            ["ہاتھ"] = new() { "پاؤں", "پیر" },
            ["سیر"] = new() { "تماشا", "سپاٹا" },
            ["چائے"] = new() { "پانی" },
            ["تہذیب"] = new() { "تمدن", "و تمدن", "و ثقافت" },
        };
}
