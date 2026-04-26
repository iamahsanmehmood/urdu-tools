/**
 * UAWL (Urdu Affix and Word List) — high-frequency Urdu compound affixes.
 *
 * Source: Jabbar 2016 Appendix A (768 entries). This initial set contains
 * the ~120 most productive and common affixes. If either word in an adjacent
 * token pair matches an entry in this set, the pair is almost certainly a
 * compound word.
 *
 * The set includes both prefixes (پیش لفظ) and suffixes (لاحقہ) since in
 * Urdu the same morpheme can appear as either component.
 */

// ── Suffix-like affixes ──────────────────────────────────────────────────────
// These typically appear as the SECOND element of a compound.

const SUFFIXES = [
  // Place / location
  'خانہ',    // house/place: کتاب‌خانہ (library)
  'گاہ',     // place: عبادت‌گاہ (place of worship)
  'آباد',    // settlement: اسلام‌آباد
  'ستان',    // land: پاکستان
  'زار',     // place/expanse: گل‌زار (garden)
  'کدہ',     // place: درس‌کدہ (school)
  'سرا',     // inn/place: مسافر‌سرا

  // Agent / person
  'پرست',    // worshipper: بت‌پرست (idol-worshipper)
  'نشین',    // dweller: شہر‌نشین (city dweller)
  'دار',     // holder: دکان‌دار (shopkeeper)
  'بان',     // keeper: باغ‌بان (gardener)
  'گر',      // doer: جادو‌گر (magician)
  'کار',     // worker: ہنر‌کار (craftsman)
  'گزار',    // performer: شکر‌گزار (grateful)
  'ساز',     // maker: ساعت‌ساز (watchmaker)
  'شناس',    // knower: زبان‌شناس (linguist)
  'پرداز',   // one who elaborates: طبع‌پرداز
  'نواز',    // cherisher: غریب‌نواز
  'فروش',    // seller: کتاب‌فروش (bookseller)
  'باز',     // player: کبوتر‌باز (pigeon fancier)
  'بند',     // binder: کمر‌بند (belt)
  'مند',     // possessor: دولت‌مند (wealthy)
  'ور',      // possessor: زور‌ور (powerful)
  'ناک',     // full of: درد‌ناک (painful)
  'وار',     // manner/like: امید‌وار (hopeful)
  'آمیز',    // mixed with: دلکش‌آمیز
  'انگیز',   // arousing: حیرت‌انگیز (surprising)
  'آسا',     // like: برق‌آسا (lightning-like)
  'گیر',     // seizer: دل‌گیر (displeased)
  'نما',     // showing: راہ‌نما (guide)
  'پوش',     // wearing: زرہ‌پوش (armoured)
  'خیز',     // rising: موج‌خیز (wavy)
  'بار',     // bearing: ثمر‌بار (fruitful)
  'یاب',     // finding: کام‌یاب (successful)
  'یافتہ',   // found/attained: تعلیم‌یافتہ (educated)
  'زدہ',     // stricken: غم‌زدہ (grief-stricken)
  'رسان',    // reaching: فریاد‌رسان (helper)
  'طلب',     // seeking: حق‌طلب (rights-seeking)
  'پسند',    // liking: خوش‌پسند (tasteful)
  'خوار',    // eating/despised: غم‌خوار (empathetic)
  'خور',     // eater: رشوت‌خور (bribe-taker)
  'کش',      // drawing: دل‌کش (charming)
  'نامہ',    // letter/document: اخبار‌نامہ (newsletter)
  'زادہ',    // born of: شاہ‌زادہ (prince)
  'نشان',    // mark: نشان
  'پذیر',    // accepting: تغیر‌پذیر (changeable)
  'پرور',    // nourishing: روح‌پرور (soul-nourishing)
  'بیز',     // spreading: عطر‌بیز (fragrant)

  // Quality / state
  'مندی',    // state of possessing
  'داری',    // holding: ذمہ‌داری (responsibility)
  'بانی',    // keeping: نگہ‌بانی (watching)
  'گری',     // doing/craft: جادو‌گری (magic-craft)
  'کاری',    // working: دست‌کاری (handicraft)
  'سازی',    // making: فلم‌سازی (film-making)
  'بازی',    // playing: دھوکہ‌بازی (cheating)
  'بندی',    // binding: درجہ‌بندی (classification)
  'پرستی',   // worship/devotion: بت‌پرستی

  // Verbal compounds (light verb complements)
  'خواہ',    // wishing: خیر‌خواہ (well-wisher)
  'فرما',    // commanding: حکم‌فرما (commander)
  'آور',     // bringing: شور‌آور
  'افزا',    // increasing: جان‌افزا (soul-refreshing)
  'شکن',     // breaker: دل‌شکن (heartbreaker)
  'آرا',     // adorning: جہان‌آرا
  'افروز',   // illuminating: دل‌افروز

  // Nature/quality endings
  'انہ',     // manner: عالمانہ (scholarly)
  'آنہ',     // manner: عاشقانہ (lovingly)
  'گانہ',    // fold: دوگانہ (twofold)
  'وانہ',    // manner: دیوانہ (mad/crazy)
]

// ── Prefix-like affixes ──────────────────────────────────────────────────────
// These typically appear as the FIRST element of a compound.

const PREFIXES = [
  // Negation / privation
  'بے',      // without: بے‌عزت (disrespected)
  'نا',      // not: نا‌کام (unsuccessful)
  'لا',      // not: لا‌علاج (incurable)
  'غیر',     // non-: غیر‌ملکی (foreign)
  'بد',      // bad: بد‌نام (infamous)
  'نیم',     // half: نیم‌جان (half-dead)
  'کم',      // less: کم‌زور (weak)

  // Quantity / degree
  'ہم',      // same/co-: ہم‌وطن (compatriot)
  'خوش',     // good: خوش‌قسمت (fortunate)
  'سر',      // head: سر‌براہ (chief)
  'دل',      // heart: دل‌چسپ (interesting)
  'خود',     // self: خود‌مختار (autonomous)
  'نو',      // new: نو‌جوان (young person)
  'ہر',      // every: ہر‌جگہ (everywhere)

  // Perso-Arabic
  'باز',     // re-/again: باز‌گشت (return)
  'پیش',     // before: پیش‌رفت (progress)
  'فرو',     // down: فرو‌تن (humble)
  'در',      // in: در‌حقیقت (in reality)
  'بر',      // on/upon: بر‌وقت (on time)
  'سر',      // head/chief: سر‌زمین (land)
  'شب',      // night: شب‌خون (night attack)
  'رو',      // face: رو‌برو (face-to-face)
  'چشم',     // eye: چشم‌دید (eyewitness)
  'دست',     // hand: دست‌خط (handwriting)
  'جان',     // life: جان‌نثار (devoted)
  'سنگ',     // stone: سنگ‌دل (stone-hearted)
  'آب',      // water: آب‌شار (waterfall)
  'گل',      // flower: گل‌زار (flower garden)
  'دل',      // heart: دل‌لگی (amusement)
  'زبان',    // tongue/language: زبان‌دان (one who knows a language)
]

/** Complete UAWL affix set for O(1) lookup */
export const AFFIX_SET: ReadonlySet<string> = new Set([...SUFFIXES, ...PREFIXES])

/** Suffix set only (for targeted suffix check) */
export const SUFFIX_SET: ReadonlySet<string> = new Set(SUFFIXES)

/** Prefix set only (for targeted prefix check) */
export const PREFIX_SET: ReadonlySet<string> = new Set(PREFIXES)
