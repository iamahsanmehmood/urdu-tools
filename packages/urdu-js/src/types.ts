export type NumeralTarget = 'arabic-indic' | 'extended-arabic-indic' | 'ascii'
export type Script = 'urdu' | 'arabic' | 'persian' | 'latin' | 'mixed' | 'unknown'
export type CharClass =
  | 'urdu-letter'
  | 'arabic-letter'
  | 'diacritic'
  | 'numeral'
  | 'punctuation'
  | 'whitespace'
  | 'latin'
  | 'other'
export type MatchLayer =
  | 'exact'
  | 'nfc'
  | 'strip-zerowidth'
  | 'strip-diacritics'
  | 'normalize-alif'
  | 'strip-honorifics'
  | 'normalize-hamza'
  | 'trim-punctuation'
  | 'compound-split'
export type Gender = 'masculine' | 'feminine'
export type Currency = 'PKR' | 'INR'

export interface NormalizeOptions {
  nfc?: boolean
  nbsp?: boolean
  alifMadda?: boolean
  numerals?: boolean
  zeroWidth?: boolean
  diacritics?: boolean
  honorifics?: boolean
  hamza?: boolean
  kashida?: boolean
  presentationForms?: boolean
  punctuationTrim?: boolean
  normalizeCharacters?: boolean
}

export interface NumberToWordsOptions {
  ordinal?: boolean
  gender?: Gender
}

export interface MatchResult {
  matched: boolean
  layer: MatchLayer | null
  normalizedQuery: string
  normalizedTarget: string
}

export interface Token {
  text: string
  type: 'urdu-word' | 'latin-word' | 'numeral' | 'punctuation' | 'whitespace' | 'mixed'
}

export interface InpageDecodeResult {
  paragraphs: string[]
  pageBreakIndices: number[]
  filteredCount: number
}

export type InpageVersion = 'auto' | 'v1' | 'v2' | 'v3'
export type Encoding =
  | 'utf-8'
  | 'utf-16le'
  | 'utf-16be'
  | 'windows-1256'
  | 'inpage-v1v2'
  | 'inpage-v3'
  | 'unknown'
