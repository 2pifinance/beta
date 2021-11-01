import BigNumber from 'bignumber.js'

// Convert APY to daily equivalent yield rate.
// Equivalence: (1 + apy) === (1 + daily) ^ 365
export const toDailyRate = apy => {
  if (typeof apy !== 'number' || isNaN(apy)) throw new TypeError('Invalid APY')

  return (1 + apy) ** (1 / 365) - 1
}

// Convert numbers from native integer-only representation
// to _real_ numbers (with decimal precision).
export const toHuman = (integer, decimals) => {
  if (integer  === undefined) throw new TypeError('Missing number')
  if (decimals === undefined) throw new TypeError('Missing decimal precision')

  const bigInt           = new BigNumber(integer.toString())
  const adjustmentFactor = new BigNumber(10).pow(decimals.toString())

  return bigInt.div(adjustmentFactor)
}

// Convert _real_ numbers to native integer-only representation
export const toNative = (number, decimals) => {
  if (number   === undefined) throw new TypeError('Missing number')
  if (decimals === undefined) throw new TypeError('Missing decimal precision')

  const bigNumber        = new BigNumber(number.toString())
  const adjustmentFactor = new BigNumber(10).pow(decimals.toString())

  return bigNumber.times(adjustmentFactor).toFixed(0, BigNumber.ROUND_DOWN)
}
