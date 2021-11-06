import BigNumber from 'bignumber.js'



// -- RATES --

// Convert annual proportional rates (APR) to annual compound rates (APY).
// Takes the rate and the amount of compoundings per year.
export const toCompoundRate = (r, n = 365) => {
  if (typeof r !== 'number' || isNaN(r)) {
    throw new TypeError('Invalid rate')
  }

  return (1 + r / n) ** n - 1
}

// Convert APY to daily equivalent yield rate.
// Equivalence: (1 + apy) === (1 + daily) ^ 365
export const toDailyRate = apy => {
  if (typeof apy !== 'number' || isNaN(apy)) {
    throw new TypeError('Invalid APY')
  }

  return (1 + apy) ** (1 / 365) - 1
}



// -- NUMBERS --

export const toBigNumber = number => {
  // Is `BigNumber`, but not `Ethers.BigNumber`
  if (BigNumber.isBigNumber(number) && !('_hex' in number)) {
    return number
  }

  return new BigNumber(number.toString())
}

export const toPositiveOrZero = number => {
  number = toBigNumber(number)

  if (number.isNaN() || !number.isGreaterThan(0)) {
    return new BigNumber(0)
  }

  return number
}

// Convert numbers from native integer-only representation
// to _real_ numbers (with decimal precision).
export const toHuman = (integer, decimals) => {
  if (integer  === undefined) throw new TypeError('Missing number')
  if (decimals === undefined) throw new TypeError('Missing decimal precision')

  const bigInt           = toBigNumber(integer)
  const adjustmentFactor = toBigNumber(10).pow(decimals.toString())

  return bigInt.div(adjustmentFactor)
}

// Convert _real_ numbers to native integer-only representation
export const toNative = (number, decimals) => {
  if (number   === undefined) throw new TypeError('Missing number')
  if (decimals === undefined) throw new TypeError('Missing decimal precision')

  const bigNumber        = toBigNumber(number)
  const adjustmentFactor = toBigNumber(10).pow(decimals.toString())

  return bigNumber.times(adjustmentFactor).toFixed(0, BigNumber.ROUND_DOWN)
}
