using UrduTools.Core.Compound;
using Xunit;

namespace UrduTools.Core.Tests.Compound;

public class CompoundDetectorTests
{
    // ── Layer 1: Affix-based compounds ──

    [Fact] public void DetectsPrefix_BeIzzat() =>
        Assert.True(UrduCompoundDetector.IsCompound("بے", "عزت").Matched);

    [Fact] public void DetectsPrefix_KhushQismat() =>
        Assert.True(UrduCompoundDetector.IsCompound("خوش", "قسمت").Matched);

    [Fact] public void DetectsSuffix_KitabKhana() =>
        Assert.True(UrduCompoundDetector.IsCompound("کتاب", "خانہ").Matched);

    [Fact] public void DetectsSuffix_TaleemYafta() =>
        Assert.True(UrduCompoundDetector.IsCompound("تعلیم", "یافتہ").Matched);

    [Fact] public void AffixType_Correct()
    {
        var r = UrduCompoundDetector.IsCompound("کتاب", "خانہ");
        Assert.Equal("affix", r.Type);
    }

    // ── Layer 2: Izafat compounds ──

    [Fact] public void DetectsZerIzafat()
    {
        var spans = UrduCompoundDetector.DetectCompounds("اخلاقِ حسنہ");
        Assert.Contains(spans, s => s.Text == "اخلاقِ حسنہ" && s.Type == "izafat");
    }

    [Fact] public void DetectsVavEAtf()
    {
        var spans = UrduCompoundDetector.DetectCompounds("علم و عمل");
        Assert.Contains(spans, s => s.Text == "علم و عمل" && s.Type == "izafat");
    }

    // ── Layer 3: Lexicon-based compounds ──

    [Fact] public void DetectsLexicon_TalibIlm() =>
        Assert.True(UrduCompoundDetector.IsCompound("طالب", "علم").Matched);

    [Fact] public void DetectsLexicon_MehnatMashqat()
    {
        var r = UrduCompoundDetector.IsCompound("محنت", "مشقت");
        Assert.True(r.Matched);
        Assert.Equal("lexicon", r.Type);
    }

    [Fact] public void DetectsLexicon_SabrShukr()
    {
        var r = UrduCompoundDetector.IsCompound("صبر", "شکر");
        Assert.True(r.Matched);
        Assert.Equal("lexicon", r.Type);
    }

    [Fact] public void DetectsLexicon_DardDil()
    {
        var r = UrduCompoundDetector.IsCompound("درد", "دل");
        Assert.True(r.Matched);
        Assert.Equal("lexicon", r.Type);
    }

    [Fact] public void DetectsLexicon_DnRaat() =>
        Assert.True(UrduCompoundDetector.IsCompound("دن", "رات").Matched);

    [Fact] public void DetectsLexicon_AmdRaft() =>
        Assert.True(UrduCompoundDetector.IsCompound("آمد", "رفت").Matched);

    // ── False positive guards ──

    [Fact] public void NonCompound_AchhaAdmi()
    {
        var r = UrduCompoundDetector.IsCompound("اچھا", "آدمی");
        Assert.False(r.Matched);
    }

    [Fact] public void NonCompound_HarMusalmaan()
    {
        var r = UrduCompoundDetector.IsCompound("ہر", "مسلمان");
        Assert.False(r.Matched);
    }

    [Fact] public void EmptyStrings_NoMatch()
    {
        Assert.False(UrduCompoundDetector.IsCompound("", "خانہ").Matched);
        Assert.False(UrduCompoundDetector.IsCompound("کتاب", "").Matched);
    }

    // ── Full text detection ──

    [Fact] public void DetectsCompoundsInText()
    {
        var spans = UrduCompoundDetector.DetectCompounds("کتاب خانہ بہت اچھا ہے");
        Assert.NotEmpty(spans);
        Assert.Contains(spans, s => s.Type == "affix");
    }

    [Fact] public void EmptyText_ReturnsEmpty() =>
        Assert.Empty(UrduCompoundDetector.DetectCompounds(""));

    [Fact] public void WhitespaceOnly_ReturnsEmpty() =>
        Assert.Empty(UrduCompoundDetector.DetectCompounds("   "));

    [Fact] public void ParagraphDetection()
    {
        var text = "طالب علم کتاب خانہ میں محنت مشقت سے درد دل کی بات کرتا ہے";
        var spans = UrduCompoundDetector.DetectCompounds(text);
        var detected = spans.Select(s => s.Text).ToList();

        Assert.Contains("طالب علم", detected);
        Assert.Contains("کتاب خانہ", detected);
        Assert.Contains("محنت مشقت", detected);
    }

    // ── Affix priority over lexicon ──

    [Fact] public void AffixTakesPriorityOverLexicon()
    {
        // خوش is a prefix, so affix should win
        var r = UrduCompoundDetector.IsCompound("خوش", "نما");
        Assert.Equal("affix", r.Type);
    }

    // ── Prefix-on-prefix guard ──

    [Fact] public void TwoPrefixes_DoNotMatch()
    {
        // ہم is prefix, بے is prefix → should not form compound
        var r = UrduCompoundDetector.IsCompound("ہم", "بے");
        Assert.False(r.Matched);
    }
}
