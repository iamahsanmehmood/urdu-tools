import type { Currency } from '../types.js'
import { numberToWords } from './number-to-words.js'

export function formatCurrency(amount: number, currency: Currency): string {
  const neg = amount < 0
  const abs = Math.abs(amount)
  const intPart = Math.trunc(abs)
  const fracPart = Math.round((abs - intPart) * 100)
  const intWords = numberToWords(BigInt(intPart))
  const currWord = currency === 'PKR' ? 'روپے' : 'روپیہ'
  const paiseWord = currency === 'PKR' ? 'پیسے' : 'پیسہ'
  let result = `${intWords} ${currWord}`
  if (fracPart > 0) result += ` ${numberToWords(BigInt(fracPart))} ${paiseWord}`
  return neg ? `منفی ${result}` : result
}
