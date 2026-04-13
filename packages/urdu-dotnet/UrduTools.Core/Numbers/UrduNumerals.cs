namespace UrduTools.Core.Numbers;

public static class UrduNumerals
{
    public static string ToUrduNumerals(long number) =>
        Normalization.NumeralsHelper.ToUrduNumerals(number.ToString());

    public static string FromUrduNumerals(string urduDigits) =>
        Normalization.NumeralsHelper.NormalizeNumerals(urduDigits);
}
