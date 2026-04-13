namespace UrduTools.Core.Normalization;

internal static class UnicodeData
{
    // Ranges [lo, hi] inclusive — code points to strip for diacritics
    public static readonly (int Lo, int Hi)[] DiacriticRanges =
    [
        (0x0610, 0x061A),
        (0x064B, 0x065F),
        (0x0670, 0x0670),
        (0x06D6, 0x06ED),
        (0xFC5E, 0xFC62),
    ];

    // Ranges for Islamic honorific symbols
    public static readonly (int Lo, int Hi)[] HonoricRanges =
    [
        (0x0610, 0x061A),
        (0x06D6, 0x06ED),
    ];

    // Zero-width characters to strip
    public static readonly int[] ZeroWidthChars = [0x200C, 0x200D, 0x00AD];

    // Alif variants that normalise to U+0627
    public static readonly int[] AlifVariants = [0x0622, 0x0623, 0x0625, 0x0671, 0x0672, 0x0673];

    // Arabic Presentation Forms → base character string
    public static readonly Dictionary<int, string> PresentationFormsMap = new()
    {
        [0xFB50] = "\u0671", [0xFB51] = "\u0671",
        [0xFB52] = "\u067B", [0xFB53] = "\u067B", [0xFB54] = "\u067B", [0xFB55] = "\u067B",
        [0xFB56] = "\u067E", [0xFB57] = "\u067E", [0xFB58] = "\u067E", [0xFB59] = "\u067E",
        [0xFB5A] = "\u0680", [0xFB5B] = "\u0680", [0xFB5C] = "\u0680", [0xFB5D] = "\u0680",
        [0xFB5E] = "\u067A", [0xFB5F] = "\u067A", [0xFB60] = "\u067A", [0xFB61] = "\u067A",
        [0xFB62] = "\u067F", [0xFB63] = "\u067F", [0xFB64] = "\u067F", [0xFB65] = "\u067F",
        [0xFB66] = "\u0679", [0xFB67] = "\u0679", [0xFB68] = "\u0679", [0xFB69] = "\u0679",
        [0xFB6A] = "\u06A4", [0xFB6B] = "\u06A4", [0xFB6C] = "\u06A4", [0xFB6D] = "\u06A4",
        [0xFB6E] = "\u06A6", [0xFB6F] = "\u06A6", [0xFB70] = "\u06A6", [0xFB71] = "\u06A6",
        [0xFB7A] = "\u0686", [0xFB7B] = "\u0686", [0xFB7C] = "\u0686", [0xFB7D] = "\u0686",
        [0xFB7E] = "\u0687", [0xFB7F] = "\u0687", [0xFB80] = "\u0687", [0xFB81] = "\u0687",
        [0xFB8A] = "\u0698", [0xFB8B] = "\u0698",
        [0xFB8C] = "\u0691", [0xFB8D] = "\u0691",
        [0xFB8E] = "\u06A9", [0xFB8F] = "\u06A9", [0xFB90] = "\u06A9", [0xFB91] = "\u06A9",
        [0xFB92] = "\u06AF", [0xFB93] = "\u06AF", [0xFB94] = "\u06AF", [0xFB95] = "\u06AF",
        [0xFB9A] = "\u06BA", [0xFB9B] = "\u06BA",
        [0xFBA4] = "\u06C1", [0xFBA5] = "\u06C1",
        [0xFBA6] = "\u06C1", [0xFBA7] = "\u06C1", [0xFBA8] = "\u06C1", [0xFBA9] = "\u06C1",
        [0xFBAA] = "\u06BE", [0xFBAB] = "\u06BE", [0xFBAC] = "\u06BE", [0xFBAD] = "\u06BE",
        [0xFBAE] = "\u06D2", [0xFBAF] = "\u06D2",
        [0xFBB0] = "\u06D3", [0xFBB1] = "\u06D3",
        [0xFE70] = "\u064B", [0xFE71] = "\u064B",
        [0xFE72] = "\u064C", [0xFE74] = "\u064D",
        [0xFE76] = "\u064E", [0xFE77] = "\u064E",
        [0xFE78] = "\u064F", [0xFE79] = "\u064F",
        [0xFE7A] = "\u0650", [0xFE7B] = "\u0650",
        [0xFE7C] = "\u0651", [0xFE7D] = "\u0651",
        [0xFE7E] = "\u0652", [0xFE7F] = "\u0652",
        [0xFE80] = "\u0621",
        [0xFE81] = "\u0622", [0xFE82] = "\u0622",
        [0xFE83] = "\u0623", [0xFE84] = "\u0623",
        [0xFE85] = "\u0624", [0xFE86] = "\u0624",
        [0xFE87] = "\u0625", [0xFE88] = "\u0625",
        [0xFE89] = "\u0626", [0xFE8A] = "\u0626", [0xFE8B] = "\u0626", [0xFE8C] = "\u0626",
        [0xFE8D] = "\u0627", [0xFE8E] = "\u0627",
        [0xFE8F] = "\u0628", [0xFE90] = "\u0628", [0xFE91] = "\u0628", [0xFE92] = "\u0628",
        [0xFE93] = "\u0629", [0xFE94] = "\u0629",
        [0xFE95] = "\u062A", [0xFE96] = "\u062A", [0xFE97] = "\u062A", [0xFE98] = "\u062A",
        [0xFE99] = "\u062B", [0xFE9A] = "\u062B", [0xFE9B] = "\u062B", [0xFE9C] = "\u062B",
        [0xFE9D] = "\u062C", [0xFE9E] = "\u062C", [0xFE9F] = "\u062C", [0xFEA0] = "\u062C",
        [0xFEA1] = "\u062D", [0xFEA2] = "\u062D", [0xFEA3] = "\u062D", [0xFEA4] = "\u062D",
        [0xFEA5] = "\u062E", [0xFEA6] = "\u062E", [0xFEA7] = "\u062E", [0xFEA8] = "\u062E",
        [0xFEA9] = "\u062F", [0xFEAA] = "\u062F",
        [0xFEAB] = "\u0630", [0xFEAC] = "\u0630",
        [0xFEAD] = "\u0631", [0xFEAE] = "\u0631",
        [0xFEAF] = "\u0632", [0xFEB0] = "\u0632",
        [0xFEB1] = "\u0633", [0xFEB2] = "\u0633", [0xFEB3] = "\u0633", [0xFEB4] = "\u0633",
        [0xFEB5] = "\u0634", [0xFEB6] = "\u0634", [0xFEB7] = "\u0634", [0xFEB8] = "\u0634",
        [0xFEB9] = "\u0635", [0xFEBA] = "\u0635", [0xFEBB] = "\u0635", [0xFEBC] = "\u0635",
        [0xFEBD] = "\u0636", [0xFEBE] = "\u0636", [0xFEBF] = "\u0636", [0xFEC0] = "\u0636",
        [0xFEC1] = "\u0637", [0xFEC2] = "\u0637", [0xFEC3] = "\u0637", [0xFEC4] = "\u0637",
        [0xFEC5] = "\u0638", [0xFEC6] = "\u0638", [0xFEC7] = "\u0638", [0xFEC8] = "\u0638",
        [0xFEC9] = "\u0639", [0xFECA] = "\u0639", [0xFECB] = "\u0639", [0xFECC] = "\u0639",
        [0xFECD] = "\u063A", [0xFECE] = "\u063A", [0xFECF] = "\u063A", [0xFED0] = "\u063A",
        [0xFED1] = "\u0641", [0xFED2] = "\u0641", [0xFED3] = "\u0641", [0xFED4] = "\u0641",
        [0xFED5] = "\u0642", [0xFED6] = "\u0642", [0xFED7] = "\u0642", [0xFED8] = "\u0642",
        [0xFED9] = "\u0643", [0xFEDA] = "\u0643", [0xFEDB] = "\u0643", [0xFEDC] = "\u0643",
        [0xFEDD] = "\u0644", [0xFEDE] = "\u0644", [0xFEDF] = "\u0644", [0xFEE0] = "\u0644",
        [0xFEE1] = "\u0645", [0xFEE2] = "\u0645", [0xFEE3] = "\u0645", [0xFEE4] = "\u0645",
        [0xFEE5] = "\u0646", [0xFEE6] = "\u0646", [0xFEE7] = "\u0646", [0xFEE8] = "\u0646",
        [0xFEE9] = "\u0647", [0xFEEA] = "\u0647", [0xFEEB] = "\u0647", [0xFEEC] = "\u0647",
        [0xFEED] = "\u0648", [0xFEEE] = "\u0648",
        [0xFEEF] = "\u0649", [0xFEF0] = "\u0649",
        [0xFEF1] = "\u064A", [0xFEF2] = "\u064A", [0xFEF3] = "\u064A", [0xFEF4] = "\u064A",
    };
}
