/// Returns true if the first strong directional character is RTL.
bool isRTL(String text) {
  for (final r in text.runes) {
    if ((r >= 0x0590 && r <= 0x08ff) ||
        (r >= 0xfb1d && r <= 0xfdff) ||
        (r >= 0xfe70 && r <= 0xfeff)) {
      return true;
    }
    if ((r >= 0x0041 && r <= 0x005a) || (r >= 0x0061 && r <= 0x007a)) {
      return false;
    }
  }
  return false;
}
