import type { NumberToWordsOptions } from '../types.js'

const UNITS: readonly string[] = [
  'صفر','ایک','دو','تین','چار','پانچ','چھ','سات','آٹھ','نو',
  'دس','گیارہ','بارہ','تیرہ','چودہ','پندرہ','سولہ','سترہ','اٹھارہ','انیس',
  'بیس','اکیس','بائیس','تئیس','چوبیس','پچیس','چھبیس','ستائیس','اٹھائیس','انتیس',
  'تیس','اکتیس','بتیس','تینتیس','چونتیس','پینتیس','چھتیس','سینتیس','اڑتیس','انتالیس',
  'چالیس','اکتالیس','بیالیس','تینتالیس','چوالیس','پینتالیس','چھیالیس','سینتالیس','اڑتالیس','انچاس',
  'پچاس','اکاون','باون','ترپن','چوون','پچپن','چھپن','ستاون','اٹھاون','انسٹھ',
  'ساٹھ','اکسٹھ','باسٹھ','ترسٹھ','چوسٹھ','پینسٹھ','چھیاسٹھ','سڑسٹھ','اڑسٹھ','انہتر',
  'ستر','اکہتر','بہتر','تہتر','چوہتر','پچھتر','چھہتر','ستہتر','اٹھہتر','اناسی',
  'اسی','اکاسی','بیاسی','تراسی','چوراسی','پچاسی','چھیاسی','ستاسی','اٹھاسی','نواسی',
  'نوے','اکانوے','بانوے','ترانوے','چورانوے','پچانوے','چھیانوے','ستانوے','اٹھانوے','ننانوے',
]

const HUNDREDS: readonly string[] = [
  '','ایک سو','دو سو','تین سو','چار سو','پانچ سو',
  'چھ سو','سات سو','آٹھ سو','نو سو',
]

const ORDINALS_SPECIAL = new Map<number, { masculine: string; feminine: string }>([
  [1,  { masculine: 'پہلا',    feminine: 'پہلی'    }],
  [2,  { masculine: 'دوسرا',   feminine: 'دوسری'   }],
  [3,  { masculine: 'تیسرا',   feminine: 'تیسری'   }],
  [4,  { masculine: 'چوتھا',   feminine: 'چوتھی'   }],
  [5,  { masculine: 'پانچواں', feminine: 'پانچویں' }],
  [6,  { masculine: 'چھٹا',    feminine: 'چھٹی'    }],
  [7,  { masculine: 'ساتواں',  feminine: 'ساتویں'  }],
  [8,  { masculine: 'آٹھواں',  feminine: 'آٹھویں'  }],
  [9,  { masculine: 'نواں',    feminine: 'نویں'    }],
  [10, { masculine: 'دسواں',   feminine: 'دسویں'   }],
])

const GROUPS: ReadonlyArray<readonly [bigint, string]> = [
  [1_000_000_000_000_000n, 'نیل'],
  [1_000_000_000_000n, 'کھرب'],
  [1_000_000_000n, 'ارب'],
  [10_000_000n, 'کروڑ'],
  [100_000n, 'لاکھ'],
  [1_000n, 'ہزار'],
]

function convertToWords(n: bigint): string {
  if (n === 0n) return UNITS[0]!
  const parts: string[] = []
  let rem = n
  for (const [div, word] of GROUPS) {
    if (rem >= div) {
      parts.push(`${convertToWords(rem / div)} ${word}`)
      rem = rem % div
    }
  }
  if (rem >= 100n) {
    const h = Number(rem / 100n)
    rem = rem % 100n
    parts.push(HUNDREDS[h] ?? `${UNITS[h]} سو`)
  }
  if (rem > 0n) parts.push(UNITS[Number(rem)]!)
  return parts.join(' ')
}

export function numberToWords(n: bigint | number, options?: NumberToWordsOptions): string {
  const num = typeof n === 'number' ? BigInt(Math.trunc(n)) : n
  const isNeg = num < 0n
  const abs = isNeg ? -num : num

  if (options?.ordinal) {
    const small = Number(abs)
    const sp = ORDINALS_SPECIAL.get(small)
    const w = sp
      ? (options.gender === 'feminine' ? sp.feminine : sp.masculine)
      : convertToWords(abs) + (options.gender === 'feminine' ? 'ویں' : 'واں')
    return isNeg ? `منفی ${w}` : w
  }

  const w = convertToWords(abs)
  return isNeg ? `منفی ${w}` : w
}
