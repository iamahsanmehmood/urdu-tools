namespace UrduTools.Core.Numbers;

public enum Gender { Masculine, Feminine }

public sealed class NumberToWordsOptions
{
    public bool Ordinal { get; init; } = false;
    public Gender Gender { get; init; } = Gender.Masculine;
}

public static class NumberToWords
{
    private static readonly string[] Units =
    [
        "صفر","ایک","دو","تین","چار","پانچ","چھ","سات","آٹھ","نو",
        "دس","گیارہ","بارہ","تیرہ","چودہ","پندرہ","سولہ","سترہ","اٹھارہ","انیس",
        "بیس","اکیس","بائیس","تیئس","چوبیس","پچیس","چھبیس","ستائیس","اٹھائیس","انتیس",
        "تیس","اکتیس","بتیس","تینتیس","چونتیس","پینتیس","چھتیس","سینتیس","اڑتیس","انتالیس",
        "چالیس","اکتالیس","بیالیس","تینتالیس","چوالیس","پینتالیس","چھیالیس","سینتالیس","اڑتالیس","انچاس",
        "پچاس","اکاون","باون","ترپن","چوون","پچپن","چھپن","ستاون","اٹھاون","انسٹھ",
        "ساٹھ","اکسٹھ","باسٹھ","تریسٹھ","چونسٹھ","پینسٹھ","چھیاسٹھ","سرسٹھ","اڑسٹھ","انہتر",
        "ستر","اکہتر","بہتر","تہتر","چوہتر","پچھتر","چھہتر","ستتر","اٹھہتر","اناسی",
        "اسی","اکاسی","بیاسی","تراسی","چوراسی","پچاسی","چھیاسی","ستاسی","اٹھاسی","نواسی",
        "نوے","اکانوے","بانوے","ترانوے","چورانوے","پچانوے","چھیانوے","ستانوے","اٹھانوے","ننانوے",
    ];

    private static readonly string[] Hundreds =
    [
        "","ایک سو","دو سو","تین سو","چار سو","پانچ سو",
        "چھ سو","سات سو","آٹھ سو","نو سو",
    ];

    private static readonly (long Value, string Name)[] Groups =
    [
        (1_000_000_000_000_000L, "نیل"),
        (1_000_000_000_000L, "کھرب"),
        (1_000_000_000L, "ارب"),
        (10_000_000L, "کروڑ"),
        (100_000L, "لاکھ"),
        (1_000L, "ہزار"),
    ];

    private static readonly Dictionary<int, (string M, string F)> OrdinalsSpecial = new()
    {
        [1]=("پہلا","پہلی"),[2]=("دوسرا","دوسری"),[3]=("تیسرا","تیسری"),
        [4]=("چوتھا","چوتھی"),[5]=("پانچواں","پانچویں"),[6]=("چھٹا","چھٹی"),
        [7]=("ساتواں","ساتویں"),[8]=("آٹھواں","آٹھویں"),[9]=("نواں","نویں"),
        [10]=("دسواں","دسویں"),
    };

    public static string Convert(long number, NumberToWordsOptions? options = null)
    {
        var opts = options ?? new NumberToWordsOptions();
        if (opts.Ordinal)
        {
            if (number >= 1 && number <= 10 && OrdinalsSpecial.TryGetValue((int)number, out var sp))
                return opts.Gender == Gender.Feminine ? sp.F : sp.M;
            var card = ConvertToWords(number < 0 ? -number : number);
            var suffix = opts.Gender == Gender.Feminine ? "ویں" : "واں";
            return (number < 0 ? "منفی " : "") + card + suffix;
        }
        if (number == 0) return Units[0];
        return (number < 0 ? "منفی " : "") + ConvertToWords(number < 0 ? -number : number);
    }

    private static string ConvertToWords(long n)
    {
        if (n == 0) return "";
        if (n < 100) return Units[n];
        if (n < 1000)
        {
            var h = (int)(n / 100); var r = (int)(n % 100);
            return r == 0 ? Hundreds[h] : Hundreds[h] + " " + Units[r];
        }
        foreach (var (value, name) in Groups)
        {
            if (n >= value)
            {
                var q = n / value; var rem = n % value;
                var qw = ConvertToWords(q) + " " + name;
                return rem == 0 ? qw : qw + " " + ConvertToWords(rem);
            }
        }
        return n.ToString();
    }
}
