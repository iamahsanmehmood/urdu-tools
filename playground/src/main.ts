import './style.css'
import {
  normalize, normalizeCharacters, fingerprint,
  stripDiacritics, stripZeroWidth, normalizeAlif, normalizeHamza,
  normalizeNumerals, toUrduNumerals, removeKashida,
  match, fuzzyMatch, getAllNormalizations,
  numberToWords, formatCurrency, wordsToNumber,
  tokenize, sentences, ngrams,
  reverse, truncate, wordCount, charCount, extractUrdu, decodeHtmlEntities, pad,
  sort, compare, sortKey,
  toRoman, fromRoman,
  isUrduChar, getScript, classifyChar, isRTL, getUrduDensity,
  detectEncoding, decodeInpage, convertWindows1256ToUnicode,
} from '@iamahsanmehmood/urdu-tools'

// ─── Utilities ────────────────────────────────────────────────────────────────

const $ = (id: string) => document.getElementById(id) as HTMLElement
const $v = (id: string) => (document.getElementById(id) as HTMLInputElement).value
const $n = (id: string): bigint => { try { return BigInt($v(id).trim() || '0') } catch { return 0n } }
const $checked = (id: string) => (document.getElementById(id) as HTMLInputElement).checked

function esc(s: string) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') }

function toUniEsc(s: string) {
  return Array.from(s).map(c => {
    const cp = c.codePointAt(0)!
    return cp > 127 ? `\\u${cp.toString(16).toUpperCase().padStart(4,'0')}` : c
  }).join('')
}

async function copyText(text: string, btn: HTMLElement) {
  try {
    await navigator.clipboard.writeText(text)
    btn.textContent = '✓ Copied'
    btn.classList.add('copied')
    setTimeout(() => { btn.textContent = '⎘ Copy'; btn.classList.remove('copied') }, 1800)
  } catch { btn.textContent = '✗ Error' }
}

// ─── Result rendering ─────────────────────────────────────────────────────────

type ResultMode = 'urdu' | 'code' | 'raw'

function setResult(id: string, content: string, mode: ResultMode = 'urdu', meta?: string) {
  const box = $(id)
  const cls = mode === 'urdu' ? 'result-urdu' : mode === 'code' ? 'result-code' : 'result-code'
  box.className = 'result-box ok'
  box.innerHTML = `
    <div class="result-top">
      <span class="result-lbl">Output</span>
      <div class="result-actions">
        <button class="copy-btn" id="${id}-copy">⎘ Copy</button>
        <button class="expand-btn" id="${id}-expand">⤢ Expand</button>
      </div>
    </div>
    <div class="result-content">
      <div class="${cls}">${esc(content)}</div>
      ${meta ? `<div class="result-meta">${esc(meta)}</div>` : ''}
    </div>`

  $(`${id}-copy`)?.addEventListener('click', (e) => copyText(content, e.currentTarget as HTMLElement))
  $(`${id}-expand`)?.addEventListener('click', () => showPopup('Output', id, '', content, mode))
}

function setResultHTML(id: string, html: string, raw?: string) {
  const box = $(id)
  box.className = 'result-box ok'
  box.innerHTML = `
    <div class="result-top">
      <span class="result-lbl">Output</span>
      <div class="result-actions">
        ${raw ? `<button class="copy-btn" id="${id}-copy">⎘ Copy</button>` : ''}
      </div>
    </div>
    <div class="result-content">${html}</div>`
  if (raw) $(`${id}-copy`)?.addEventListener('click', (e) => copyText(raw, e.currentTarget as HTMLElement))
}

function setError(id: string, msg: string) {
  const box = $(id)
  box.className = 'result-box err'
  box.innerHTML = `
    <div class="result-top"><span class="result-lbl" style="color:#fb7185">Error</span></div>
    <div class="result-content"><div class="result-err">⚠ ${esc(msg)}</div></div>`
}

function placeholder(id: string) {
  const box = $(id)
  box.className = 'result-box'
  box.innerHTML = `<div class="result-top"><span class="result-lbl">Output</span></div>
    <div class="result-content"><div class="result-placeholder">← Run to see result</div></div>`
}

// ─── Popup ────────────────────────────────────────────────────────────────────

function showPopup(title: string, fn: string, input: string, output: string, mode: ResultMode) {
  document.querySelector('.popup-overlay')?.remove()
  const overlay = document.createElement('div')
  overlay.className = 'popup-overlay'
  const isUrdu = mode === 'urdu'
  overlay.innerHTML = `
    <div class="popup-win">
      <div class="popup-head">
        <div><div class="popup-fn">${esc(fn)}()</div><div class="popup-title">${esc(title)}</div></div>
        <button class="popup-close" id="pc">✕</button>
      </div>
      <div class="popup-body">
        ${input ? `<div class="popup-sec"><div class="popup-sec-lbl">📥 Input</div>
          <div class="${isUrdu ? 'popup-urdu' : 'popup-pre'}" style="${isUrdu ? '' : 'direction:ltr'}">${esc(input)}</div></div>` : ''}
        <div class="popup-sec"><div class="popup-sec-lbl">📤 Output</div>
          ${isUrdu ? `<div class="popup-urdu">${esc(output)}</div>`
                   : `<pre class="popup-pre" style="direction:ltr">${esc(output)}</pre>`}
        </div>
        <div class="popup-sec"><div class="popup-sec-lbl">🔢 Unicode Escapes</div>
          <pre class="popup-pre" style="direction:ltr">${esc(toUniEsc(output))}</pre>
        </div>
        <div class="popup-sec">
          <button class="run-btn" id="pc-copy" style="width:100%;justify-content:center">⎘ Copy Output</button>
        </div>
      </div>
    </div>`
  document.body.appendChild(overlay)
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove() })
  $('pc')?.addEventListener('click', () => overlay.remove())
  $('pc-copy')?.addEventListener('click', async (e) => copyText(output, e.currentTarget as HTMLElement))
}

// ─── Card builder ─────────────────────────────────────────────────────────────

interface CardOpts {
  fn: string
  sig: string
  badge: string
  color: string
  importFn: string
  desc: string
  presets?: { label: string; fields: Record<string, string> }[]
  body: string
  resultId: string
}

function card(o: CardOpts): string {
  const presetsHtml = o.presets?.length
    ? `<div class="presets">
         <span class="preset-label">Try:</span>
         ${o.presets.map((p, i) => `
           <button class="preset-chip" data-preset="${o.resultId}-${i}">
             ${esc(p.label)}
           </button>`).join('')}
       </div>`
    : ''

  return `
    <div class="test-card" id="card-${o.resultId}">
      <div class="card-head">
        <div class="card-head-left">
          <div class="card-fn">${o.fn}()</div>
          <div class="card-sig">${o.sig}</div>
        </div>
        <span class="card-badge" style="background:${o.color}18;color:${o.color};border:1px solid ${o.color}35">${o.badge}</span>
      </div>
      <div class="card-import">
        <span><span class="i-keyword">import</span> { <span class="i-name">${o.importFn}</span> } <span class="i-from">from</span> <span class="i-path">'@iamahsanmehmood/urdu-tools'</span></span>
        <button class="import-copy-btn" data-copy="import { ${o.importFn} } from '@iamahsanmehmood/urdu-tools'">⎘</button>
      </div>
      <div class="card-body">
        <div class="card-desc">${o.desc}</div>
        ${presetsHtml}
        <div class="ctrl-group">
          ${o.body}
        </div>
        <div class="result-box" id="${o.resultId}">
          <div class="result-top"><span class="result-lbl">Output</span></div>
          <div class="result-content"><div class="result-placeholder">← Run to see result</div></div>
        </div>
      </div>
    </div>`
}

function inputRow(id: string, label: string, value: string, type: 'urdu'|'latin'|'num', tag = 'input'): string {
  const cls = type === 'urdu' ? 'urdu-input' : type === 'latin' ? 'latin-input' : 'num-input'
  const safeVal = value.replace(/"/g, '&quot;')
  if (tag === 'textarea')
    return `<div><div class="ctrl-label">${label}</div><textarea id="${id}" class="${cls}" rows="3">${value}</textarea></div>`
  return `<div><div class="ctrl-label">${label}</div><input id="${id}" class="${cls}" value="${safeVal}" /></div>`
}

function runBtn(label: string, id: string): string {
  return `<button class="run-btn" id="${id}">▶ ${label}</button>`
}

// ─── Modules ──────────────────────────────────────────────────────────────────

const MODULES = [
  { id:'normalization',    icon:'🔧', label:'Normalization',    color:'#7c5cfc', count:7 },
  { id:'search',           icon:'🔍', label:'Search & Match',   color:'#4f9cf9', count:3 },
  { id:'numbers',          icon:'🔢', label:'Numbers',          color:'#f59e0b', count:4 },
  { id:'tokenization',     icon:'✂️',  label:'Tokenization',    color:'#22c55e', count:3 },
  { id:'string-utils',     icon:'📝', label:'String Utils',     color:'#14b8a6', count:6 },
  { id:'encoding',         icon:'💾', label:'Encoding',         color:'#fb923c', count:3 },
  { id:'sorting',          icon:'🔤', label:'Sorting',          color:'#6366f1', count:2 },
  { id:'transliteration',  icon:'🔄', label:'Transliteration',  color:'#f43f5e', count:2 },
  { id:'analysis',         icon:'🧬', label:'Analysis',         color:'#a855f7', count:4 },
]

// ─── HTML ─────────────────────────────────────────────────────────────────────

$('app')!.innerHTML = `
  <div id="header">
    <div class="h-left">
      <div class="h-logo">اُ</div>
      <div>
        <div class="h-title">Urdu Tools Playground</div>
        <div class="h-sub">@iamahsanmehmood/urdu-tools · v1.0.0 · 9 Modules</div>
      </div>
    </div>
    <div class="h-right">
      <span class="h-pill">284 Tests · TypeScript · .NET</span>
      <a class="h-link" href="https://github.com/iamahsanmehmood/urdu-tools" target="_blank" rel="noopener">
        <svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
        GitHub
      </a>
      <a class="h-link" href="https://github.com/iamahsanmehmood/urdu-tools#readme" target="_blank" rel="noopener">📖 Docs</a>
    </div>
  </div>

  <div class="layout">
    <div id="sidebar">
      <div class="sb-search-wrap">
        <input class="sb-search" id="sb-search" placeholder="🔍 Filter modules…" />
      </div>
      <div class="sb-section">
        <div class="sb-label">Modules</div>
        ${MODULES.map(m => `
          <button class="mod-btn ${m.id === 'normalization' ? 'active' : ''}" id="nav-${m.id}" data-module="${m.id}">
            <div class="mod-icon" style="background:${m.color}18;color:${m.color}">${m.icon}</div>
            ${m.label}
            <span class="mod-count">${m.count}</span>
          </button>`).join('')}
      </div>
    </div>

    <div id="content">
      ${panelNormalization()}
      ${panelSearch()}
      ${panelNumbers()}
      ${panelTokenization()}
      ${panelStringUtils()}
      ${panelEncoding()}
      ${panelSorting()}
      ${panelTransliteration()}
      ${panelAnalysis()}
    </div>
  </div>`

// ─── Wire events ──────────────────────────────────────────────────────────────

MODULES.forEach(m => $(`nav-${m.id}`)?.addEventListener('click', () => switchModule(m.id)))

$('sb-search')?.addEventListener('input', (e) => {
  const q = (e.target as HTMLInputElement).value.toLowerCase()
  document.querySelectorAll<HTMLElement>('.mod-btn').forEach(btn => {
    btn.style.display = btn.textContent!.toLowerCase().includes(q) ? '' : 'none'
  })
})

document.addEventListener('keydown', e => {
  if ((e.key === 'Enter' && (e.ctrlKey || e.metaKey)) || e.key === 'F5') {
    const active = document.querySelector('.module-panel.active')
    active?.querySelector<HTMLElement>('.run-btn')?.click()
  }
})

// ── Import copy buttons ──
document.querySelectorAll<HTMLElement>('.import-copy-btn').forEach(btn => {
  btn.addEventListener('click', () => copyText(btn.dataset.copy!, btn))
})

// ── Preset chips ──
const PRESETS: Record<string, { label:string; fields:Record<string,string> }[]> = {
  'r-normalize': [
    { label: 'Arabic Confusion', fields: { 'n-text': 'يه ملك وكتاب' } },
    { label: 'With Diacritics',  fields: { 'n-text': 'عِلمٌ وَالعَمَلُ' } },
    { label: 'Zero-Width',       fields: { 'n-text': 'علم\u200cہے یہ\u200dبھی' } },
    { label: 'Honorifics',       fields: { 'n-text': 'محمدﷺ اور اللہﷻ' } },
  ],
  'r-fingerprint': [
    { label: 'Same word',        fields: { 'fp-a':'عِلمٌ', 'fp-b':'عَلم' } },
    { label: 'Arabic/Urdu ي/ی', fields: { 'fp-a':'یہ',    'fp-b':'يه' } },
  ],
  'r-match': [
    { label: 'Diacritic diff',   fields: { 'm-q':'عِلمٌ',  'm-t':'علم' } },
    { label: 'Arabic vs Urdu',   fields: { 'm-q':'يه كتاب','m-t':'یہ کتاب' } },
    { label: 'Hamza variant',    fields: { 'm-q':'أردو',   'm-t':'اردو' } },
  ],
  'r-ntw': [
    { label: '1 Lakh',     fields: { 'ntw-n':'100000' } },
    { label: '1 Crore',    fields: { 'ntw-n':'10000000' } },
    { label: '1 Billion',  fields: { 'ntw-n':'1000000000' } },
    { label: '-42',        fields: { 'ntw-n':'-42' } },
  ],
  'r-tokenize': [
    { label: 'Mixed nums',  fields: { 'tok-t':'پاکستان ایک خوبصورت ملک ہے، جہاں ۱۲ کروڑ لوگ رہتے ہیں۔' } },
    { label: 'English mix', fields: { 'tok-t':'یہ AI پروجیکٹ 2024 میں شروع ہوا۔' } },
  ],
  'r-sort': [
    { label: 'Alphabet', fields: { 'so-words': 'ے،ا،ک،ب،پ،ت،علم،اردو،بہترین،زبان،پاکستان' } },
    { label: 'Cities',   fields: { 'so-words': 'لاہور،کراچی،اسلام آباد،پشاور،کوئٹہ،ملتان' } },
  ],
  'r-to-roman': [
    { label: 'پاکستان', fields: { 'tr-u': 'پاکستان زندہ باد' } },
    { label: 'Aspirated', fields: { 'tr-u': 'بھارت چھوٹا بھائی' } },
  ],
}

document.querySelectorAll<HTMLElement>('.preset-chip').forEach(chip => {
  const key = chip.dataset.preset!
  const [rid, idx] = key.split(/-(\d+)$/)
  const preset = PRESETS[rid!]?.[Number(idx)]
  if (!preset) return
  chip.addEventListener('click', () => {
    Object.entries(preset.fields).forEach(([fid, val]) => {
      const el = document.getElementById(fid) as HTMLInputElement | HTMLTextAreaElement
      if (el) el.value = val
    })
  })
})

// ─── Switch Module ────────────────────────────────────────────────────────────

function switchModule(id: string) {
  document.querySelectorAll('.module-panel').forEach(p => p.classList.remove('active'))
  document.querySelectorAll('.mod-btn').forEach(b => b.classList.remove('active'))
  $(`panel-${id}`)?.classList.add('active')
  $(`nav-${id}`)?.classList.add('active')
}

// ════════════════════════════════════════════════
//  PANEL BUILDERS
// ════════════════════════════════════════════════

function modHeader(tag: string, color: string, icon: string, n: number, title: string, desc: string): string {
  return `
    <div class="mod-header">
      <div class="mod-tag" style="color:${color}">${icon} Module ${n} of 9</div>
      <h1 class="mod-title">${title}</h1>
      <p class="mod-desc">${desc}</p>
    </div>`
}

// ── 1. Normalization ──────────────────────────────────────────────────────────

function panelNormalization(): string {
  return `<div class="module-panel active" id="panel-normalization">
    ${modHeader('normalization','#7c5cfc','🔧',1,'Normalization',
      `12-layer deterministic pipeline — NFC → nbsp → alifMadda → numerals → zeroWidth → diacritics →
       honorifics → hamza → kashida → presentationForms → punctuationTrim → normalizeCharacters.
       Run before every DB write and before every search query.`)}
    <div class="tests-grid">

      ${card({ fn:'normalize', sig:'<span class="t-kw">function</span> normalize(text: <span class="t-type">string</span>, options?: NormalizeOptions): <span class="t-type">string</span>',
        badge:'12-Layer Pipeline', color:'#7c5cfc', importFn:'normalize', resultId:'r-normalize',
        desc:'Deterministic 12-layer pipeline. Pass options to turn layers on/off. Default: NFC + nbsp + alifMadda + numerals + zeroWidth + diacritics + honorifics + hamza.',
        presets: PRESETS['r-normalize'],
        body: `
          ${inputRow('n-text','Urdu Text','عِلمٌ اَور یہ\u200cہے ي ه ك','urdu')}
          <div class="checks-row">
            <label class="ctrl-check"><input type="checkbox" id="n-kashida" checked />kashida</label>
            <label class="ctrl-check"><input type="checkbox" id="n-pres" />presentationForms</label>
            <label class="ctrl-check"><input type="checkbox" id="n-nc" checked />normalizeChars</label>
            <label class="ctrl-check"><input type="checkbox" id="n-pt" />punctuationTrim</label>
          </div>
          ${runBtn('Normalize','btn-normalize')}` })}

      ${card({ fn:'fingerprint', sig:'<span class="t-kw">function</span> fingerprint(text: <span class="t-type">string</span>): <span class="t-type">string</span>',
        badge:'Equality Key', color:'#7c5cfc', importFn:'fingerprint', resultId:'r-fingerprint',
        desc:'Produces a canonical key — عِلمٌ and عَلم yield identical fingerprints. Use instead of === for all Urdu string comparisons.',
        presets: PRESETS['r-fingerprint'],
        body: `
          ${inputRow('fp-a','Text A','عِلمٌ','urdu')}
          ${inputRow('fp-b','Text B','عَلم','urdu')}
          ${runBtn('Compare Fingerprints','btn-fingerprint')}` })}

      ${card({ fn:'stripDiacritics', sig:'<span class="t-kw">function</span> stripDiacritics(text: <span class="t-type">string</span>): <span class="t-type">string</span>',
        badge:'Harakat Layer', color:'#7c5cfc', importFn:'stripDiacritics', resultId:'r-strip-diacritics',
        desc:'Removes all harakat: zabar (فتحہ ◌َ), zer (کسرہ ◌ِ), pesh (ضمہ ◌ُ), tanwin, shadda, sukun. Essential before any search index write.',
        body: `
          ${inputRow('sd-text','Text with diacritics','عِلمٌ وَالعَمَلُ نَبیؐ','urdu')}
          ${runBtn('Strip Diacritics','btn-strip-diacritics')}` })}

      ${card({ fn:'normalizeCharacters', sig:'<span class="t-kw">function</span> normalizeCharacters(text: <span class="t-type">string</span>): <span class="t-type">string</span>',
        badge:'Arabic Fix', color:'#f59e0b', importFn:'normalizeCharacters', resultId:'r-normalize-chars',
        desc:'THE most critical fix: ي (U+064A) → ی (U+06CC), ك (U+0643) → ک (U+06A9), ه (U+0647) → ہ (U+06C1). Searching بھارت with Arabic ه returns zero DB results without this.',
        body: `
          ${inputRow('nc-text','Mixed Arabic/Urdu (paste from Arabic sources)','يه ملك وكتاب','urdu')}
          ${runBtn('Fix Arabic Characters','btn-normalize-chars')}` })}

      ${card({ fn:'stripZeroWidth', sig:'<span class="t-kw">function</span> stripZeroWidth(text: <span class="t-type">string</span>): <span class="t-type">string</span>',
        badge:'Invisible Chars', color:'#22c55e', importFn:'stripZeroWidth', resultId:'r-strip-zw',
        desc:'Removes ZWNJ (U+200C) and ZWJ (U+200D). Without this, "قلم" === "قلم" can return false if one string has an invisible joiner. Try the preset.',
        body: `
          ${inputRow('zw-text','Text with hidden zero-width chars','علم\u200cہے یہ\u200dبھی','urdu')}
          ${runBtn('Strip Zero-Width','btn-strip-zw')}` })}

      ${card({ fn:'normalizeAlif', sig:'<span class="t-kw">function</span> normalizeAlif(text: <span class="t-type">string</span>): <span class="t-type">string</span>',
        badge:'Alif Variants', color:'#14b8a6', importFn:'normalizeAlif', resultId:'r-alif',
        desc:'Consolidates ا + madda (◌ٓ) → آ, and normalizes أ/إ/آ/ٱ variants. Different keyboards produce different code points for the same visual character.',
        body: `
          ${inputRow('alif-text','Text with Alif variants','آب اور أردو إسلام ٱللہ','urdu')}
          ${runBtn('Normalize Alif','btn-alif')}` })}

      ${card({ fn:'normalizeNumerals', sig:'<span class="t-kw">function</span> normalizeNumerals(text: <span class="t-type">string</span>): <span class="t-type">string</span>',
        badge:'Numeral Layer', color:'#f59e0b', importFn:'normalizeNumerals', resultId:'r-numerals',
        desc:'Converts Arabic-Indic (٠-٩) and Extended Arabic-Indic / Urdu (۰-۹) numerals to ASCII (0-9) for consistent numeric parsing.',
        body: `
          ${inputRow('num-text','Text with Arabic/Urdu numerals','قیمت ۱۲۳ اور ٤٥٦ ہے','urdu')}
          ${runBtn('Normalize Numerals','btn-numerals')}` })}
    </div>
  </div>`
}

// ── 2. Search & Match ─────────────────────────────────────────────────────────

function panelSearch(): string {
  return `<div class="module-panel" id="panel-search">
    ${modHeader('search','#4f9cf9','🔍',2,'Search & Matching',
      `9-layer progressive strategy: exact → NFC → stripZeroWidth → stripDiacritics → normalizeAlif →
       stripHonorifics → normalizeHamza → trimPunctuation → compoundSplit. Returns which layer matched,
       so you know exactly why a match succeeded.`)}
    <div class="tests-grid">

      ${card({ fn:'match', sig:'<span class="t-kw">function</span> match(query: <span class="t-type">string</span>, target: <span class="t-type">string</span>): MatchResult | <span class="t-type">null</span>',
        badge:'9-Layer Match', color:'#4f9cf9', importFn:'match', resultId:'r-match',
        desc:'Progressive matcher. Returns layer number + name so you understand why it matched. Layer 1=exact, Layer 3=strip diacritics, Layer 6=hamza normalize, etc.',
        presets: PRESETS['r-match'],
        body: `
          ${inputRow('m-q','Query (what user typed)','عِلمٌ','urdu')}
          ${inputRow('m-t','Target (what is in your DB/index)','علم','urdu')}
          ${runBtn('Match','btn-match')}` })}

      ${card({ fn:'fuzzyMatch', sig:'<span class="t-kw">function</span> fuzzyMatch(query: <span class="t-type">string</span>, candidates: <span class="t-type">string</span>[], threshold?: <span class="t-type">number</span>): <span class="t-type">string</span>[]',
        badge:'Levenshtein+LCS', color:'#4f9cf9', importFn:'fuzzyMatch', resultId:'r-fuzzy',
        desc:'Hybrid Levenshtein + LCS distance, threshold 0–1 (default 0.5). Returns candidates above threshold sorted by score. Best for autocomplete and spell-checking.',
        body: `
          ${inputRow('fm-q','Query','کتاب','urdu')}
          ${inputRow('fm-cands','Candidates (comma separated)','علم، کتابیں، کتب، قلم، کتاب، کتابچہ','urdu')}
          ${runBtn('Fuzzy Match','btn-fuzzy')}` })}

      ${card({ fn:'getAllNormalizations', sig:'<span class="t-kw">function</span> getAllNormalizations(word: <span class="t-type">string</span>): <span class="t-type">string</span>[]',
        badge:'DB Fallback Ladder', color:'#4f9cf9', importFn:'getAllNormalizations', resultId:'r-all-norms',
        desc:'Returns 8 progressively looser forms. Run DB queries against each form in order until one hits. Eliminates the "zero results" problem for almost all Urdu inputs.',
        body: `
          ${inputRow('gn-w','Word to get all forms of','عِلمٌ','urdu')}
          ${runBtn('Get All Forms','btn-all-norms')}` })}
    </div>
  </div>`
}

// ── 3. Numbers ────────────────────────────────────────────────────────────────

function panelNumbers(): string {
  return `<div class="module-panel" id="panel-numbers">
    ${modHeader('numbers','#f59e0b','🔢',3,'Numbers',
      `BigInt throughout — South Asian grouping: ہزار (1K) لاکھ (100K) کروڑ (10M) ارب (1B) کھرب (1T) نیل (10¹⁵).
       Full gender agreement: مذکر/مؤنث. Ordinals. PKR/INR currency with paisa.`)}
    <div class="tests-grid">

      ${card({ fn:'numberToWords', sig:'<span class="t-kw">function</span> numberToWords(n: <span class="t-type">bigint</span>, opts?: WordOpts): <span class="t-type">string</span>',
        badge:'Cardinal / Ordinal', color:'#f59e0b', importFn:'numberToWords', resultId:'r-ntw',
        desc:'BigInt → Urdu words. Gender agreement for ordinals: پہلا/پہلی, دوسرا/دوسری. Handles negatives and numbers up to نیل (10¹⁵).',
        presets: PRESETS['r-ntw'],
        body: `
          ${inputRow('ntw-n','Number (BigInt safe)','10000000','num')}
          <div class="checks-row">
            <label class="ctrl-check"><input type="checkbox" id="ntw-ord" />Ordinal</label>
            <select class="ctrl-select" id="ntw-gender" style="width:auto;margin-top:0">
              <option value="">No gender (default)</option>
              <option value="masculine">Masculine — مذکر</option>
              <option value="feminine">Feminine — مؤنث</option>
            </select>
          </div>
          ${runBtn('Convert to Words','btn-ntw')}` })}

      ${card({ fn:'formatCurrency', sig:'<span class="t-kw">function</span> formatCurrency(amount: <span class="t-type">number</span>, currency: <span class="t-str">"PKR"</span> | <span class="t-str">"INR"</span>): <span class="t-type">string</span>',
        badge:'PKR / INR', color:'#f59e0b', importFn:'formatCurrency', resultId:'r-currency',
        desc:'Formats float as Urdu currency text with paisa. PKR → روپے/پیسے, INR → روپیہ/پیسہ. Handles singular/plural.',
        body: `
          ${inputRow('fc-amt','Amount (with decimal for paisa)','1505.50','num')}
          <select class="ctrl-select" id="fc-cur"><option value="PKR">PKR — پاکستانی روپے</option><option value="INR">INR — بھارتی روپیہ</option></select>
          ${runBtn('Format Currency','btn-currency')}` })}

      ${card({ fn:'wordsToNumber', sig:'<span class="t-kw">function</span> wordsToNumber(text: <span class="t-type">string</span>): <span class="t-type">bigint</span>',
        badge:'Parse Urdu → BigInt', color:'#f59e0b', importFn:'wordsToNumber', resultId:'r-wtn',
        desc:'Inverse of numberToWords. Parses compound Urdu number expressions back to BigInt.',
        body: `
          ${inputRow('wtn-t','Urdu number words','ایک کروڑ پانچ لاکھ','urdu')}
          ${runBtn('Parse → BigInt','btn-wtn')}` })}

      ${card({ fn:'toUrduNumerals', sig:'<span class="t-kw">function</span> toUrduNumerals(text: <span class="t-type">string</span>): <span class="t-type">string</span>',
        badge:'ASCII → ۱۲۳', color:'#f59e0b', importFn:'toUrduNumerals', resultId:'r-urdu-num',
        desc:'Converts ASCII digits to Extended Arabic-Indic numerals (۰-۹). Used in formal Urdu printing, newspaper mastheads, dates.',
        body: `
          ${inputRow('un-t','ASCII number or date','2024-12-25 at 09:30','latin')}
          ${runBtn('To Urdu Numerals','btn-urdu-num')}` })}
    </div>
  </div>`
}

// ── 4. Tokenization ───────────────────────────────────────────────────────────

function panelTokenization(): string {
  return `<div class="module-panel" id="panel-tokenization">
    ${modHeader('tokenization','#22c55e','✂️',4,'Tokenization',
      `ZWNJ-aware splitting preserves compound words. Sentences split on ۔ ؟ ! only — ، (Urdu comma)
       and ؛ (Urdu semicolon) are NOT sentence boundaries. Returns typed tokens for NLP pipelines.`)}
    <div class="tests-grid">

      ${card({ fn:'tokenize', sig:'<span class="t-kw">function</span> tokenize(text: <span class="t-type">string</span>): Token[]',
        badge:'Typed Tokens', color:'#22c55e', importFn:'tokenize', resultId:'r-tokenize',
        desc:'Returns typed token objects: urdu-word, punctuation, numeral, latin, whitespace. Color-coded chips show each type. Handles mixed Urdu+English+Numbers.',
        presets: PRESETS['r-tokenize'],
        body: `
          ${inputRow('tok-t','Urdu text','پاکستان ایک خوبصورت ملک ہے، جہاں ۱۲ کروڑ لوگ رہتے ہیں۔','urdu','textarea')}
          ${runBtn('Tokenize','btn-tokenize')}` })}

      ${card({ fn:'sentences', sig:'<span class="t-kw">function</span> sentences(text: <span class="t-type">string</span>): <span class="t-type">string</span>[]',
        badge:'Sentence Split', color:'#22c55e', importFn:'sentences', resultId:'r-sentences',
        desc:'Splits on ۔ ؟ ! only. The ، (U+060C) Arabic comma and ؛ (U+061B) Arabic semicolon are treated as internal punctuation, never as sentence boundaries.',
        body: `
          ${inputRow('sent-t','Multi-sentence text','پہلا جملہ۔ دوسرا جملہ؟ تیسرا جملہ! چوتھا، پانچواں — یہ ایک ہی ہے۔','urdu','textarea')}
          ${runBtn('Split Sentences','btn-sentences')}` })}

      ${card({ fn:'ngrams', sig:'<span class="t-kw">function</span> ngrams(tokens: <span class="t-type">string</span>[], n: <span class="t-type">number</span>): <span class="t-type">string</span>[][]',
        badge:'ML Feature Extraction', color:'#22c55e', importFn:'ngrams', resultId:'r-ngrams',
        desc:'Sliding window n-grams over tokenized words. n=2 gives bigrams (two consecutive words), n=3 trigrams, etc. Essential for language model training.',
        body: `
          ${inputRow('ng-t','Urdu sentence','ایک دو تین چار پانچ چھ','urdu')}
          ${inputRow('ng-n','N (gram size)','2','num')}
          ${runBtn('Generate N-Grams','btn-ngrams')}` })}
    </div>
  </div>`
}

// ── 5. String Utils ───────────────────────────────────────────────────────────

function panelStringUtils(): string {
  return `<div class="module-panel" id="panel-string-utils">
    ${modHeader('string-utils','#14b8a6','📝',5,'String Utilities',
      `RTL-aware string operations. charCount uses grapheme clusters — عِلم counts as 3, not 4 code units.
       decodeHtmlEntities MUST be called before normalize() for TinyMCE/Quill output.`)}
    <div class="tests-grid">

      ${card({ fn:'reverse', sig:'<span class="t-kw">function</span> reverse(text: <span class="t-type">string</span>): <span class="t-type">string</span>',
        badge:'Word-Order Reverse', color:'#14b8a6', importFn:'reverse', resultId:'r-reverse',
        desc:'Reverses WORD ORDER — each word\'s internal letter sequence is preserved so Arabic shaping stays intact. Not character reversal.',
        body: `
          ${inputRow('rv-t','Urdu sentence','پاکستان ہندوستان ایران چین','urdu')}
          ${runBtn('Reverse Word Order','btn-reverse')}` })}

      ${card({ fn:'truncate', sig:'<span class="t-kw">function</span> truncate(text: <span class="t-type">string</span>, length: <span class="t-type">number</span>, suffix?: <span class="t-type">string</span>): <span class="t-type">string</span>',
        badge:'Smart Truncate', color:'#14b8a6', importFn:'truncate', resultId:'r-truncate',
        desc:'Truncates at word boundaries — never mid-syllable. Default suffix "…". Safe for RTL card titles and previews.',
        body: `
          ${inputRow('tr-t','Long Urdu text','یہ ایک بہت لمبا جملہ ہے جو کہ کافی طویل ہے اور ختم نہیں ہوتا','urdu')}
          ${inputRow('tr-l','Max grapheme length','20','num')}
          ${runBtn('Truncate','btn-truncate')}` })}

      ${card({ fn:'wordCount / charCount', sig:'<span class="t-kw">function</span> wordCount(text): <span class="t-type">number</span> | charCount(text): <span class="t-type">number</span>',
        badge:'Grapheme Counting', color:'#14b8a6', importFn:'wordCount, charCount', resultId:'r-count',
        desc:'wordCount splits by whitespace. charCount counts grapheme clusters — عِلم is 3 clusters even though it\'s 4 code points (ع + ِ + ل + م).',
        body: `
          ${inputRow('cnt-t','Urdu text','عِلم وَالعَمَلُ نَبیؐ','urdu')}
          ${runBtn('Count','btn-count')}` })}

      ${card({ fn:'extractUrdu', sig:'<span class="t-kw">function</span> extractUrdu(text: <span class="t-type">string</span>): <span class="t-type">string</span>[]',
        badge:'Mixed Text Extraction', color:'#14b8a6', importFn:'extractUrdu', resultId:'r-extract',
        desc:'Pulls all Urdu/Arabic script segments from mixed-language text. Returns segments in order of appearance.',
        body: `
          ${inputRow('ex-t','Mixed text (English + Urdu)','The word علم means knowledge and عمل means action','latin')}
          ${runBtn('Extract Urdu','btn-extract')}` })}

      ${card({ fn:'decodeHtmlEntities', sig:'<span class="t-kw">function</span> decodeHtmlEntities(html: <span class="t-type">string</span>): <span class="t-type">string</span>',
        badge:'Editor Output Fix', color:'#14b8a6', importFn:'decodeHtmlEntities', resultId:'r-html-ent',
        desc:'ALWAYS call before normalize() when input comes from TinyMCE/Quill. Editors convert U+2019 Izafat apostrophe → &amp;rsquo; breaking all compound word lookups.',
        body: `
          ${inputRow('he-t','HTML entity text (from editor)','کتاب&rsquo;خانہ علم&nbsp;ہے &amp; مزید &ldquo;اردو&rdquo;','latin')}
          ${runBtn('Decode HTML Entities','btn-html-ent')}` })}

      ${card({ fn:'pad', sig:'<span class="t-kw">function</span> pad(text: <span class="t-type">string</span>, length: <span class="t-type">number</span>, char?: <span class="t-type">string</span>, dir?: <span class="t-str">"start"</span>|<span class="t-str">"end"</span>): <span class="t-type">string</span>',
        badge:'RTL-Safe Padding', color:'#14b8a6', importFn:'pad', resultId:'r-pad',
        desc:'Pads string to given codepoint length. Works correctly with multi-byte Urdu characters. Direction: "start" (default) adds to right in RTL context.',
        body: `
          ${inputRow('pad-t','Urdu text','علم','urdu')}
          ${inputRow('pad-l','Target length','8','num')}
          ${inputRow('pad-c','Pad character',' ','latin')}
          ${runBtn('Pad','btn-pad')}` })}
    </div>
  </div>`
}

// ── 6. Encoding ───────────────────────────────────────────────────────────────

function panelEncoding(): string {
  return `<div class="module-panel" id="panel-encoding">
    ${modHeader('encoding','#fb923c','💾',6,'Encoding',
      `Legacy Urdu encoding support. InPage v1/v2 use 0x04-prefix byte pairs. InPage v3 uses UTF-16LE.
       Windows-1256 (CP1256) is common in older Arabic/Urdu Windows software. All converters produce clean Unicode.`)}
    <div class="tests-grid">

      ${card({ fn:'detectEncoding', sig:'<span class="t-kw">function</span> detectEncoding(buffer: Uint8Array): Encoding',
        badge:'Auto Detection', color:'#fb923c', importFn:'detectEncoding', resultId:'r-detect-enc',
        desc:'Detects: utf-8, utf-16le (BOM), utf-16be (BOM), inpage-v1v2 (0x04 byte density > 5%), inpage-v3 (UTF-16LE with 0x06xx Urdu pairs). Input as hex bytes.',
        body: `
          ${inputRow('de-hex','Hex bytes (space-separated)','FF FE 27 06 28 06','latin')}
          ${runBtn('Detect Encoding','btn-detect-enc')}` })}

      ${card({ fn:'decodeInpage', sig:'<span class="t-kw">function</span> decodeInpage(buffer: Uint8Array, version: InpageVersion): InpageDecodeResult',
        badge:'InPage Binary', color:'#fb923c', importFn:'decodeInpage', resultId:'r-inpage',
        desc:'Decodes InPage binary format to Unicode paragraphs. Version "v1" for classic InPage, "v3" for newer UTF-16LE format, "auto" for automatic detection.',
        body: `
          ${inputRow('ip-hex','Hex bytes (InPage binary)','04 81 20 04 83','latin')}
          <select class="ctrl-select" id="ip-ver">
            <option value="auto">auto — detect version</option>
            <option value="v1">v1 — classic InPage</option>
            <option value="v3">v3 — UTF-16LE InPage</option>
          </select>
          ${runBtn('Decode InPage','btn-inpage')}` })}

      ${card({ fn:'convertWindows1256ToUnicode', sig:'<span class="t-kw">function</span> convertWindows1256ToUnicode(text: <span class="t-type">string</span>): <span class="t-type">string</span>',
        badge:'CP1256 → Unicode', color:'#fb923c', importFn:'convertWindows1256ToUnicode', resultId:'r-win1256',
        desc:'Converts Windows-1256 (CP1256) encoded strings to Unicode. Common in old Arabic/Urdu Windows apps, emails, and legacy databases. Bytes above 0x7F are remapped.',
        body: `
          ${inputRow('w1-text','Win-1256 string (byte values as \\xFF escapes or paste raw)','\\x81\\xc1\\xff','latin')}
          ${runBtn('Convert CP1256 → Unicode','btn-win1256')}` })}
    </div>
  </div>`
}

// ── 7. Sorting ────────────────────────────────────────────────────────────────

function panelSorting(): string {
  return `<div class="module-panel" id="panel-sorting">
    ${modHeader('sorting','#6366f1','🔤',7,'Urdu Sorting',
      `39-letter canonical order: ء ا ب پ ت ٹ ث ج چ ح خ د ڈ ذ ر ڑ ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن ں و ہ ھ ی ے.
       Diacritics stripped before comparison. علم and عِلم sort to the same position.`)}
    <div class="tests-grid">

      ${card({ fn:'sort', sig:'<span class="t-kw">function</span> sort(words: <span class="t-type">string</span>[], reverse?: <span class="t-type">boolean</span>): <span class="t-type">string</span>[]',
        badge:'Urdu Collation', color:'#6366f1', importFn:'sort', resultId:'r-sort',
        desc:'Sorts using the 39-letter canonical Urdu alphabet. Diacritics stripped before key generation — عِلم and علم sort identically.',
        presets: PRESETS['r-sort'],
        body: `
          ${inputRow('so-words','Words (comma or newline separated)','ے،ا،ک،ب،پ،ت،علم،اردو،بہترین،زبان،پاکستان','urdu','textarea')}
          <label class="ctrl-check"><input type="checkbox" id="so-rev" />Reverse order (ے → ء)</label>
          ${runBtn('Sort in Urdu Alphabet Order','btn-sort')}` })}

      ${card({ fn:'compare / sortKey', sig:'<span class="t-kw">function</span> compare(a: <span class="t-type">string</span>, b: <span class="t-type">string</span>): <span class="t-type">number</span>',
        badge:'Collation Compare', color:'#6366f1', importFn:'compare, sortKey', resultId:'r-compare',
        desc:'compare() returns &lt;0 if A comes before B in Urdu alphabet, 0 if equal, &gt;0 if A comes after. sortKey() returns the raw deterministic key string.',
        body: `
          ${inputRow('cmp-a','String A','ب','urdu')}
          ${inputRow('cmp-b','String B','ا','urdu')}
          ${runBtn('Compare','btn-compare')}` })}
    </div>
  </div>`
}

// ── 8. Transliteration ────────────────────────────────────────────────────────

function panelTransliteration(): string {
  return `<div class="module-panel" id="panel-transliteration">
    ${modHeader('transliteration','#f43f5e','🔄',8,'Transliteration',
      `FSM-based Urdu ↔ Roman. 18 aspirated digraphs: بھ→bh, پھ→ph, تھ→th, ٹھ→Th, جھ→jh, چھ→chh,
       دھ→dh, ڈھ→Dh, کھ→kh, گھ→gh + 8 more. Digraph priority: بھارت → "bharat" not "b"+"harat".`)}
    <div class="tests-grid">

      ${card({ fn:'toRoman', sig:'<span class="t-kw">function</span> toRoman(text: <span class="t-type">string</span>): <span class="t-type">string</span>',
        badge:'Urdu → Roman (FSM)', color:'#f43f5e', importFn:'toRoman', resultId:'r-to-roman',
        desc:'Finite-state machine converts with digraph priority: بھارت → "bharat". All 18 aspirated consonants handled correctly. Good for search index aliases.',
        presets: PRESETS['r-to-roman'],
        body: `
          ${inputRow('tr-u','Urdu text','پاکستان زندہ باد بھارت چھوٹا','urdu')}
          ${runBtn('To Roman','btn-to-roman')}` })}

      ${card({ fn:'fromRoman', sig:'<span class="t-kw">function</span> fromRoman(text: <span class="t-type">string</span>): <span class="t-type">string</span>',
        badge:'Roman → Urdu (Trie)', color:'#f43f5e', importFn:'fromRoman', resultId:'r-from-roman',
        desc:'Trie-based best-effort Roman-to-Urdu conversion. NOT round-trip safe (vowels are ambiguous). Best for search autocomplete: "pakistan" → "پاکستان".',
        body: `
          ${inputRow('fr-r','Roman Urdu (phonetic)','pakistan zindabad','latin')}
          ${runBtn('From Roman','btn-from-roman')}` })}
    </div>
  </div>`
}

// ── 9. Analysis ───────────────────────────────────────────────────────────────

function panelAnalysis(): string {
  return `<div class="module-panel" id="panel-analysis">
    ${modHeader('analysis','#a855f7','🧬',9,'Text Analysis',
      `Script detection, RTL directionality, Urdu density scoring, per-character classification.
       Use getUrduDensity() to decide rendering direction for user-generated content.`)}
    <div class="tests-grid">

      ${card({ fn:'getScript / isRTL', sig:'<span class="t-kw">function</span> getScript(text: <span class="t-type">string</span>): ScriptFamily',
        badge:'Script Detection', color:'#a855f7', importFn:'getScript, isRTL', resultId:'r-script',
        desc:'getScript() returns: "urdu" | "arabic" | "latin" | "mixed" | "numeric" | "other". isRTL() returns boolean — use for dynamic dir attribute on user content.',
        body: `
          ${inputRow('sc-t','Text to analyse','یہ AI ٹیکنالوجی 2024 میں بہت آگے گئی۔','urdu')}
          ${runBtn('Analyse Script','btn-script')}` })}

      ${card({ fn:'getUrduDensity', sig:'<span class="t-kw">function</span> getUrduDensity(text: <span class="t-type">string</span>): <span class="t-type">number</span>',
        badge:'Density Score 0–1', color:'#a855f7', importFn:'getUrduDensity', resultId:'r-density',
        desc:'Returns 0–1 ratio of Urdu-specific characters. Use as threshold (> 0.3) to decide RTL rendering. Arabic letters score low — Urdu-specific letters (پ ٹ چ ژ ڈ ڑ گ ں ہ ھ ی ے) score high.',
        body: `
          ${inputRow('dn-t','Text (try pure Urdu vs mixed)','پاکستان ایک اسلامی جمہوری ملک ہے','urdu')}
          ${runBtn('Get Density','btn-density')}` })}

      ${card({ fn:'classifyChar', sig:'<span class="t-kw">function</span> classifyChar(cp: <span class="t-type">number</span>): CharClass',
        badge:'Per-Character', color:'#a855f7', importFn:'classifyChar', resultId:'r-classify',
        desc:'Returns CharClass for each character: UrduLetter, ArabicLetter, Diacritic, Numeral, Punctuation, Latin, Whitespace, Other. Shows a table with codepoints.',
        body: `
          ${inputRow('cl-t','Text to classify character-by-character','علم۱ہے!A','urdu')}
          ${runBtn('Classify Characters','btn-classify')}` })}

      ${card({ fn:'isUrduChar', sig:'<span class="t-kw">function</span> isUrduChar(char: <span class="t-type">string</span>): <span class="t-type">boolean</span>',
        badge:'Single Char Check', color:'#a855f7', importFn:'isUrduChar', resultId:'r-is-urdu',
        desc:'Returns true only for Urdu-specific codepoints (not general Arabic). پ ٹ چ ڈ ژ ڑ گ ں ہ ھ ی ے are Urdu-specific; ب is shared Arabic/Urdu.',
        body: `
          ${inputRow('iu-t','Character to check (single character)','پ','urdu')}
          ${runBtn('Check isUrduChar','btn-is-urdu')}` })}
    </div>
  </div>`
}

// ════════════════════════════════════════════════
//  BUTTON EVENT HANDLERS
// ════════════════════════════════════════════════

function wire(id: string, fn: () => void) {
  document.getElementById(id)?.addEventListener('click', fn)
  // Also trigger on Enter key in related inputs
}

// ── Normalization ──

wire('btn-normalize', () => {
  try {
    const text = $v('n-text')
    const result = normalize(text, {
      kashida: $checked('n-kashida'),
      presentationForms: $checked('n-pres'),
      normalizeCharacters: $checked('n-nc'),
      punctuationTrim: $checked('n-pt'),
    })
    const changed = result !== text
    setResultHTML('r-normalize', `
      <div class="ba-box">
        <div class="ba-side">
          <div class="ba-label">Before</div>
          <div class="ba-val">${esc(text)}</div>
          <div class="result-meta">${toUniEsc(text)}</div>
        </div>
        <div class="ba-arrow">→</div>
        <div class="ba-side">
          <div class="ba-label">After</div>
          <div class="ba-val" style="color:${changed?'var(--green)':'var(--text-2)'}">${esc(result)}</div>
          <div class="result-meta">${toUniEsc(result)}</div>
        </div>
      </div>
      <div class="result-meta" style="margin-top:8px">${changed ? '✓ Text was changed' : '● No change needed'}</div>`, result)
  } catch(e) { setError('r-normalize', String(e)) }
})

wire('btn-fingerprint', () => {
  try {
    const a = $v('fp-a'), b = $v('fp-b')
    const fa = fingerprint(a), fb = fingerprint(b)
    const same = fa === fb
    setResultHTML('r-fingerprint', `
      <div class="cmp-row">
        <div class="cmp-in">${esc(a)}</div><div class="cmp-arr">→</div>
        <div class="cmp-out" style="font-family:var(--font-code);font-size:12px;color:var(--blue)">${esc(fa)}</div>
      </div>
      <div class="cmp-row">
        <div class="cmp-in">${esc(b)}</div><div class="cmp-arr">→</div>
        <div class="cmp-out" style="font-family:var(--font-code);font-size:12px;color:var(--blue)">${esc(fb)}</div>
      </div>
      <div style="margin-top:10px">
        <span class="match-badge ${same?'yes':'no'}">${same ? '✓ Same fingerprint — strings are equal' : '✗ Different fingerprints — strings are not equal'}</span>
      </div>`, a + ' vs ' + b)
  } catch(e) { setError('r-fingerprint', String(e)) }
})

wire('btn-strip-diacritics', () => {
  try {
    const t = $v('sd-text'), r = stripDiacritics(t)
    setResult('r-strip-diacritics', r, 'urdu', `Before: ${toUniEsc(t)} | After: ${toUniEsc(r)}`)
  } catch(e) { setError('r-strip-diacritics', String(e)) }
})

wire('btn-normalize-chars', () => {
  try {
    const t = $v('nc-text'), r = normalizeCharacters(t)
    setResultHTML('r-normalize-chars', `
      <div class="ba-box">
        <div class="ba-side"><div class="ba-label">Before (Arabic)</div><div class="ba-val">${esc(t)}</div><div class="result-meta">${toUniEsc(t)}</div></div>
        <div class="ba-arrow">→</div>
        <div class="ba-side"><div class="ba-label">After (Urdu)</div><div class="ba-val" style="color:var(--green)">${esc(r)}</div><div class="result-meta">${toUniEsc(r)}</div></div>
      </div>`, r)
  } catch(e) { setError('r-normalize-chars', String(e)) }
})

wire('btn-strip-zw', () => {
  try {
    const t = $v('zw-text'), r = stripZeroWidth(t)
    setResult('r-strip-zw', r, 'urdu', `Removed ${t.length - r.length} zero-width char(s) | After: ${toUniEsc(r)}`)
  } catch(e) { setError('r-strip-zw', String(e)) }
})

wire('btn-alif', () => {
  try {
    const t = $v('alif-text'), r = normalizeAlif(t)
    setResult('r-alif', r, 'urdu', `Before: ${toUniEsc(t)} | After: ${toUniEsc(r)}`)
  } catch(e) { setError('r-alif', String(e)) }
})

wire('btn-numerals', () => {
  try {
    const t = $v('num-text'), r = normalizeNumerals(t)
    setResult('r-numerals', r, 'urdu', `Before: ${toUniEsc(t)} | After: ${toUniEsc(r)}`)
  } catch(e) { setError('r-numerals', String(e)) }
})

// ── Search ──

wire('btn-match', () => {
  try {
    const q = $v('m-q'), t = $v('m-t')
    const result = match(q, t)
    if (result) {
      setResultHTML('r-match', `
        <span class="match-badge yes">✓ Matched</span>
        <div class="match-layer">Layer ${result.layer}: <strong>${result.strategy}</strong></div>
        <div class="result-meta" style="margin-top:8px">Query fingerprint: ${toUniEsc(q)} | Target: ${toUniEsc(t)}</div>`, 'matched')
    } else {
      setResultHTML('r-match', `<span class="match-badge no">✗ No match — even after all 9 normalization layers</span>`, 'no match')
    }
  } catch(e) { setError('r-match', String(e)) }
})

wire('btn-fuzzy', () => {
  try {
    const q = $v('fm-q')
    const cands = $v('fm-cands').split(/[,،\n]/).map(s => s.trim()).filter(Boolean)
    const results = fuzzyMatch(q, cands)
    if (!results.length) {
      setResultHTML('r-fuzzy', `<div class="result-placeholder">No candidates above threshold</div>`)
      return
    }
    setResultHTML('r-fuzzy', `
      <div class="word-list">
        ${results.map((w, i) => `
          <div class="word-item">
            <span class="word-item-n">#${i+1}</span>
            <span class="word-item-t">${esc(w)}</span>
          </div>`).join('')}
      </div>`, results.join(', '))
  } catch(e) { setError('r-fuzzy', String(e)) }
})

wire('btn-all-norms', () => {
  try {
    const forms = getAllNormalizations($v('gn-w'))
    setResultHTML('r-all-norms', `
      <div class="norm-ladder">
        ${forms.map((f, i) => `
          <div class="norm-step">
            <span class="norm-step-n">${i+1}</span>
            <span class="norm-step-v">${esc(f)}</span>
            <span class="norm-step-tag">${i===0?'original':i===forms.length-1?'most loose':'layer '+i}</span>
          </div>`).join('')}
      </div>
      <div class="result-meta" style="margin-top:8px">${forms.length} forms — try DB query with each until you get results</div>`, forms.join('\n'))
  } catch(e) { setError('r-all-norms', String(e)) }
})

// ── Numbers ──

wire('btn-ntw', () => {
  try {
    const n = $n('ntw-n')
    const ordinal = $checked('ntw-ord')
    const gender = ($v('ntw-gender') || undefined) as 'masculine'|'feminine'|undefined
    const result = numberToWords(n, { ordinal, gender })
    setResult('r-ntw', result, 'urdu', `Input: ${n.toLocaleString()} | ordinal: ${ordinal} | gender: ${gender||'none'}`)
  } catch(e) { setError('r-ntw', String(e)) }
})

wire('btn-currency', () => {
  try {
    const result = formatCurrency(parseFloat($v('fc-amt')), $v('fc-cur') as 'PKR'|'INR')
    setResult('r-currency', result, 'urdu', `${$v('fc-amt')} ${$v('fc-cur')}`)
  } catch(e) { setError('r-currency', String(e)) }
})

wire('btn-wtn', () => {
  try {
    const result = wordsToNumber($v('wtn-t'))
    setResult('r-wtn', result.toString(), 'code', `Parsed BigInt: ${result.toLocaleString()}`)
  } catch(e) { setError('r-wtn', String(e)) }
})

wire('btn-urdu-num', () => {
  try {
    const result = toUrduNumerals($v('un-t'))
    setResult('r-urdu-num', result, 'urdu', `Before: ${$v('un-t')} | After: ${toUniEsc(result)}`)
  } catch(e) { setError('r-urdu-num', String(e)) }
})

// ── Tokenization ──

wire('btn-tokenize', () => {
  try {
    const tokens = tokenize($v('tok-t'))
    const chips = tokens.map(tok =>
      `<span class="token-chip ${tok.type}" title="${tok.type}: U+${(tok.value.codePointAt(0)||0).toString(16).toUpperCase()}">${esc(tok.value)}</span>`
    ).join('')
    const counts: Record<string,number> = {}
    tokens.forEach(t => { counts[t.type] = (counts[t.type]||0)+1 })
    setResultHTML('r-tokenize', `
      <div class="token-chips">${chips}</div>
      <div class="result-meta" style="margin-top:8px">
        ${Object.entries(counts).map(([t,c])=>`${t}: ${c}`).join(' · ')} · total: ${tokens.length}
      </div>`, tokens.map(t=>t.value).join(' '))
  } catch(e) { setError('r-tokenize', String(e)) }
})

wire('btn-sentences', () => {
  try {
    const sents = sentences($v('sent-t'))
    setResultHTML('r-sentences', `
      <div class="word-list">
        ${sents.map((s,i)=>`<div class="word-item"><span class="word-item-n">#${i+1}</span><span class="word-item-t" style="font-size:14px">${esc(s)}</span></div>`).join('')}
      </div>
      <div class="result-meta" style="margin-top:6px">${sents.length} sentence(s)</div>`, sents.join('\n'))
  } catch(e) { setError('r-sentences', String(e)) }
})

wire('btn-ngrams', () => {
  try {
    const toks = tokenize($v('ng-t')).filter(t=>t.type==='urdu-word').map(t=>t.value)
    const n = Math.max(1, parseInt($v('ng-n'))||2)
    const grams = ngrams(toks, n)
    setResultHTML('r-ngrams', `
      <div class="word-list">
        ${grams.map((g,i)=>`<div class="word-item"><span class="word-item-n">#${i+1}</span><span class="word-item-t" style="font-size:13px">[${g.map(w=>`"${esc(w)}"`).join(', ')}]</span></div>`).join('')}
      </div>
      <div class="result-meta" style="margin-top:6px">${grams.length} ${n}-gram(s) from ${toks.length} tokens</div>`, JSON.stringify(grams))
  } catch(e) { setError('r-ngrams', String(e)) }
})

// ── String Utils ──

wire('btn-reverse', () => {
  try { setResult('r-reverse', reverse($v('rv-t')), 'urdu') }
  catch(e) { setError('r-reverse', String(e)) }
})

wire('btn-truncate', () => {
  try {
    const t = $v('tr-t'), l = parseInt($v('tr-l'))||20
    const r = truncate(t, l)
    setResult('r-truncate', r, 'urdu', `Input: ${[...t].length} graphemes → Output: ${[...r].length} graphemes (limit: ${l})`)
  } catch(e) { setError('r-truncate', String(e)) }
})

wire('btn-count', () => {
  try {
    const t = $v('cnt-t')
    const wc = wordCount(t), cc = charCount(t), ccd = charCount(stripDiacritics(t))
    setResultHTML('r-count', `
      <div class="stats-grid">
        <div class="stat-box"><div class="stat-val">${wc}</div><div class="stat-lbl">Words</div></div>
        <div class="stat-box"><div class="stat-val">${cc}</div><div class="stat-lbl">Graphemes</div></div>
        <div class="stat-box"><div class="stat-val">${ccd}</div><div class="stat-lbl">Base chars</div></div>
        <div class="stat-box"><div class="stat-val">${t.length}</div><div class="stat-lbl">Code units</div></div>
      </div>`, `words:${wc} graphemes:${cc}`)
  } catch(e) { setError('r-count', String(e)) }
})

wire('btn-extract', () => {
  try {
    const segs = extractUrdu($v('ex-t'))
    setResultHTML('r-extract', `
      <div class="word-list">
        ${segs.map((s,i)=>`<div class="word-item"><span class="word-item-n">#${i+1}</span><span class="word-item-t">${esc(s)}</span></div>`).join('')}
      </div>
      <div class="result-meta" style="margin-top:6px">${segs.length} segment(s) extracted</div>`, segs.join(' | '))
  } catch(e) { setError('r-extract', String(e)) }
})

wire('btn-html-ent', () => {
  try {
    const t = $v('he-t'), r = decodeHtmlEntities(t)
    setResultHTML('r-html-ent', `
      <div class="ba-box">
        <div class="ba-side" style="direction:ltr;text-align:left"><div class="ba-label">Before (HTML)</div><div class="ba-val" style="font-family:var(--font-code);font-size:12px;color:var(--text-1)">${esc(t)}</div></div>
        <div class="ba-arrow">→</div>
        <div class="ba-side"><div class="ba-label">After (Unicode)</div><div class="ba-val">${esc(r)}</div><div class="result-meta">${toUniEsc(r)}</div></div>
      </div>`, r)
  } catch(e) { setError('r-html-ent', String(e)) }
})

wire('btn-pad', () => {
  try {
    const t = $v('pad-t'), l = parseInt($v('pad-l'))||8, c = $v('pad-c')||' '
    const r = pad(t, l, c)
    setResultHTML('r-pad', `
      <div class="ba-box">
        <div class="ba-side"><div class="ba-label">Before (${[...t].length} chars)</div><div class="ba-val">${esc(t)}</div></div>
        <div class="ba-arrow">→</div>
        <div class="ba-side"><div class="ba-label">After (${[...r].length} chars)</div><div class="ba-val">${esc(r)}</div></div>
      </div>`, r)
  } catch(e) { setError('r-pad', String(e)) }
})

// ── Encoding ──

wire('btn-detect-enc', () => {
  try {
    const hex = $v('de-hex')
    const bytes = hex.trim().split(/\s+/).map(h => parseInt(h, 16)).filter(n => !isNaN(n))
    const buf = new Uint8Array(bytes)
    const enc = detectEncoding(buf)
    setResultHTML('r-detect-enc', `
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">
        <span class="match-badge yes" style="font-size:14px">📡 ${esc(enc)}</span>
      </div>
      <div class="result-meta">Input: [${bytes.map(b=>'0x'+b.toString(16).toUpperCase().padStart(2,'0')).join(', ')}] (${bytes.length} bytes)</div>`, enc)
  } catch(e) { setError('r-detect-enc', String(e)) }
})

wire('btn-inpage', () => {
  try {
    const hex = $v('ip-hex')
    const bytes = hex.trim().split(/\s+/).map(h => parseInt(h, 16)).filter(n => !isNaN(n))
    const buf = new Uint8Array(bytes)
    const ver = $v('ip-ver') as 'v1'|'v3'|'auto'
    const result = decodeInpage(buf, ver)
    setResultHTML('r-inpage', `
      <div class="word-list">
        ${result.paragraphs.map((p,i)=>`<div class="word-item"><span class="word-item-n">¶${i+1}</span><span class="word-item-t">${esc(p)||'<em style="opacity:0.4">empty</em>'}</span></div>`).join('')}
      </div>
      <div class="result-meta" style="margin-top:6px">${result.paragraphs.length} paragraph(s) · ${result.pageBreakIndices.length} page break(s)</div>`,
      result.paragraphs.join('\n'))
  } catch(e) { setError('r-inpage', String(e)) }
})

wire('btn-win1256', () => {
  try {
    // Parse \xFF style escapes or use raw string
    const raw = $v('w1-text')
    const parsed = raw.replace(/\\x([0-9a-fA-F]{2})/g, (_,h) => String.fromCharCode(parseInt(h,16)))
    const result = convertWindows1256ToUnicode(parsed)
    setResult('r-win1256', result, 'urdu', `Input: "${esc(raw)}" | Unicode: ${toUniEsc(result)}`)
  } catch(e) { setError('r-win1256', String(e)) }
})

// ── Sorting ──

wire('btn-sort', () => {
  try {
    const raw = $v('so-words')
    const words = raw.split(/[,،\n]/).map(s=>s.trim()).filter(Boolean)
    const rev = $checked('so-rev')
    const sorted = sort(words, rev)
    setResultHTML('r-sort', `
      <div class="word-list">
        ${sorted.map((w,i)=>`<div class="word-item"><span class="word-item-n">${i+1}</span><span class="word-item-t">${esc(w)}</span><span class="word-item-n" style="font-size:9px">${esc(toUniEsc(sortKey(w)).slice(0,20))}</span></div>`).join('')}
      </div>
      <div class="result-meta" style="margin-top:6px">${sorted.length} items sorted in ${rev?'reverse':''} Urdu alphabetical order</div>`, sorted.join('، '))
  } catch(e) { setError('r-sort', String(e)) }
})

wire('btn-compare', () => {
  try {
    const a = $v('cmp-a'), b = $v('cmp-b')
    const cmp = compare(a, b)
    const ska = sortKey(a), skb = sortKey(b)
    const label = cmp < 0 ? `"${a}" comes BEFORE "${b}"` : cmp > 0 ? `"${a}" comes AFTER "${b}"` : `"${a}" equals "${b}" in sort order`
    setResultHTML('r-compare', `
      <span class="match-badge ${cmp===0?'yes':'no'}" style="margin-bottom:10px;display:inline-flex">${cmp<0?'← A before B':cmp>0?'→ A after B':'= Equal'}</span>
      <div class="result-meta">${esc(label)}</div>
      <div class="result-meta" style="margin-top:6px">Key A: ${esc(ska)} | Key B: ${esc(skb)}</div>`, label)
  } catch(e) { setError('r-compare', String(e)) }
})

// ── Transliteration ──

wire('btn-to-roman', () => {
  try {
    const t = $v('tr-u'), r = toRoman(t)
    setResultHTML('r-to-roman', `
      <div class="ba-box">
        <div class="ba-side"><div class="ba-label">Urdu</div><div class="ba-val">${esc(t)}</div></div>
        <div class="ba-arrow">→</div>
        <div class="ba-side" style="direction:ltr;text-align:left"><div class="ba-label">Roman</div><div class="ba-val" style="font-family:var(--font-ui);font-size:18px">${esc(r)}</div></div>
      </div>`, r)
  } catch(e) { setError('r-to-roman', String(e)) }
})

wire('btn-from-roman', () => {
  try {
    const t = $v('fr-r'), r = fromRoman(t)
    setResultHTML('r-from-roman', `
      <div class="ba-box">
        <div class="ba-side" style="direction:ltr;text-align:left"><div class="ba-label">Roman</div><div class="ba-val" style="font-family:var(--font-ui);font-size:18px">${esc(t)}</div></div>
        <div class="ba-arrow">→</div>
        <div class="ba-side"><div class="ba-label">Urdu</div><div class="ba-val">${esc(r)}</div></div>
      </div>`, r)
  } catch(e) { setError('r-from-roman', String(e)) }
})

// ── Analysis ──

wire('btn-script', () => {
  try {
    const t = $v('sc-t')
    const sc = getScript(t), rtl = isRTL(t)
    const dens = getUrduDensity(t)
    setResultHTML('r-script', `
      <div class="stats-grid">
        <div class="stat-box"><div class="stat-val">${esc(sc)}</div><div class="stat-lbl">Script</div></div>
        <div class="stat-box"><div class="stat-val">${rtl?'RTL':'LTR'}</div><div class="stat-lbl">Direction</div></div>
        <div class="stat-box"><div class="stat-val">${(dens*100).toFixed(0)}%</div><div class="stat-lbl">Urdu density</div></div>
        <div class="stat-box"><div class="stat-val">${t.length}</div><div class="stat-lbl">Length</div></div>
      </div>
      <div class="density-bar" style="margin-top:10px"><div class="density-fill" style="width:${(dens*100).toFixed(1)}%"></div></div>
      <div class="result-meta" style="margin-top:4px">Urdu density: ${(dens*100).toFixed(1)}% ${dens>0.3?'→ render RTL':'→ render LTR'}</div>`,
      `script:${sc} rtl:${rtl} density:${dens}`)
  } catch(e) { setError('r-script', String(e)) }
})

wire('btn-density', () => {
  try {
    const t = $v('dn-t'), d = getUrduDensity(t)
    const pct = (d*100).toFixed(1)
    setResultHTML('r-density', `
      <div class="stat-box" style="text-align:center;padding:16px">
        <div class="stat-val" style="font-size:36px">${pct}%</div>
        <div class="stat-lbl">Urdu-specific character ratio</div>
      </div>
      <div class="density-bar" style="margin-top:10px"><div class="density-fill" style="width:${pct}%"></div></div>
      <div class="result-meta" style="margin-top:6px">
        Threshold guide: &lt;10% → likely Arabic | 10–30% → mixed | &gt;30% → Urdu
        <br>Recommendation: render <strong>${d>0.1?'RTL':'LTR'}</strong>
      </div>`, `${pct}%`)
  } catch(e) { setError('r-density', String(e)) }
})

wire('btn-classify', () => {
  try {
    const t = $v('cl-t')
    const chars = Array.from(t)
    setResultHTML('r-classify', `
      <table class="char-table">
        <thead><tr><th>Char</th><th>Codepoint</th><th>Class</th><th>Name</th></tr></thead>
        <tbody>
          ${chars.map(c => {
            const cp = c.codePointAt(0)!
            const cls = classifyChar(cp)
            return `<tr>
              <td class="char-glyph">${esc(c)}</td>
              <td>U+${cp.toString(16).toUpperCase().padStart(4,'0')}</td>
              <td><span class="card-badge" style="background:var(--bg-3);color:var(--text-1)">${esc(cls)}</span></td>
              <td style="color:var(--text-2);font-size:10px">${esc(c === ' ' ? 'SPACE' : c)}</td>
            </tr>`}).join('')}
        </tbody>
      </table>`, chars.map(c=>`${c}:${classifyChar(c.codePointAt(0)!)}`).join(' '))
  } catch(e) { setError('r-classify', String(e)) }
})

wire('btn-is-urdu', () => {
  try {
    const t = $v('iu-t')
    const ch = Array.from(t)[0] ?? ''
    if (!ch) { setError('r-is-urdu','Enter at least one character'); return }
    const result = isUrduChar(ch)
    const cp = ch.codePointAt(0)!
    setResultHTML('r-is-urdu', `
      <div style="display:flex;align-items:center;gap:12px">
        <div class="stat-box" style="font-family:var(--font-urdu);font-size:40px;padding:20px 28px">${esc(ch)}</div>
        <div>
          <span class="match-badge ${result?'yes':'no'}">${result ? '✓ Urdu-specific character' : '✗ Not Urdu-specific'}</span>
          <div class="result-meta" style="margin-top:8px">U+${cp.toString(16).toUpperCase().padStart(4,'0')}</div>
          <div class="result-meta">${result ? 'Only exists in Urdu Unicode block (not shared with Arabic)' : 'Shared Arabic/other block character'}</div>
        </div>
      </div>`, `${ch} → ${result}`)
  } catch(e) { setError('r-is-urdu', String(e)) }
})
