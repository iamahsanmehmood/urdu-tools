using UrduTools.Core.Analysis;
using Xunit;

namespace UrduTools.Core.Tests.Analysis;

public class ScriptDetectorTests
{
    [Fact] public void EmptyString_Unknown() => Assert.Equal(Script.Unknown, ScriptDetector.Detect(string.Empty));
    [Fact] public void UrduText_Urdu() => Assert.Equal(Script.Urdu, ScriptDetector.Detect("پاکستان"));
    [Fact] public void LatinText_Latin() => Assert.Equal(Script.Latin, ScriptDetector.Detect("Hello"));
    [Fact] public void MixedText_Mixed() => Assert.Equal(Script.Mixed, ScriptDetector.Detect("Hello عالم"));
}
