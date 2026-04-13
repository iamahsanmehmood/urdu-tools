/**
 * Decodes HTML entities to their Unicode equivalents before Urdu text processing.
 *
 * Must be called BEFORE normalize() when text originates from rich text editors
 * (TinyMCE, Quill, CKEditor). TinyMCE silently converts the Izafat apostrophe
 * (U+2019 ') to &rsquo;, causing every Izafat compound word lookup to fail.
 *
 * Also handles &nbsp; (which TinyMCE inserts between Urdu words), &ldquo;/&rdquo;
 * (for quoted Urdu phrases), and standard HTML entities.
 *
 * Order matters: &amp; must be decoded LAST to avoid double-decoding.
 * (urdu_unicode_playbook.md §6)
 */
export function decodeHtmlEntities(text: string): string {
  if (!text) return text
  return text
    .replace(/&nbsp;/g, '\u00a0')      // non-breaking space (normalize() converts to space)
    .replace(/&ldquo;/g, '\u201c')     // " left double quote
    .replace(/&rdquo;/g, '\u201d')     // " right double quote
    .replace(/&lsquo;/g, '\u2018')     // ' left single quote
    .replace(/&rsquo;/g, '\u2019')     // ' right single quote / Izafat apostrophe
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')            // must be last
}
