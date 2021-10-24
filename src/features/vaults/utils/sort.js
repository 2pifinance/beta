import BigNumber from 'bignumber.js'
import { useState } from 'react'

export const compareAlphabetically =
  new Intl.Collator('en', { sensitivity: 'base', numeric: true }).compare

export const compareCardinally = (a, b) => {
  if (BigNumber.isBigNumber(a)) return a.comparedTo(b)
  if (a === b)                  return 0

  return (a > b) ? 1 : -1
}

export const sortVaultsBy = (vaults, column, isAscending = true) => {
  const baseFn = (column === 'symbol')
    ? compareAlphabetically
    : compareCardinally

  const compareFn = (isAscending)
    ? (a, b) => baseFn(a[column], b[column])
    : (a, b) => baseFn(b[column], a[column])

  return vaults.sort(compareFn)
}

export const useSort = (column, direction = 'asc') => {
  const [ sort, setSort ] = useState({ column, direction })

  // Get current sort direction for given column
  const sortFor = column => {
    return (column === sort.column) ? sort.direction : undefined
  }

  // Curried setter
  const sortBy = column => direction => {
    setSort({ column, direction })
  }

  return [ sort, sortFor, sortBy ]
}
