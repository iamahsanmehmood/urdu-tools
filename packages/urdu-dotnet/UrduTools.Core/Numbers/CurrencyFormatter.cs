namespace UrduTools.Core.Numbers;

public enum CurrencyCode { PKR, INR }

public static class CurrencyFormatter
{
    public static string Format(decimal amount, CurrencyCode currency = CurrencyCode.PKR)
    {
        var unit = "روپے";
        var subUnit = "پیسے";
        var intPart = (long)Math.Truncate(amount);
        var fracPart = (long)Math.Round((amount - intPart) * 100m);
        var sb = new StringBuilder();
        sb.Append(NumberToWords.Convert(intPart));
        sb.Append(' ').Append(unit);
        if (fracPart > 0)
            sb.Append(' ').Append(NumberToWords.Convert(fracPart)).Append(' ').Append(subUnit);
        return sb.ToString().Trim();
    }
}
