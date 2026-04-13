using UrduTools.Core.Numbers;
using Xunit;

namespace UrduTools.Core.Tests.Numbers;

public class CurrencyFormatterTests
{
    [Fact] public void WholeAmount() => Assert.Equal("پانچ سو روپے", CurrencyFormatter.Format(500m));
    [Fact] public void WithPaise() => Assert.Contains("پیسے", CurrencyFormatter.Format(505.50m));
    [Fact] public void ZeroAmount() => Assert.Equal("صفر روپے", CurrencyFormatter.Format(0m));
}
