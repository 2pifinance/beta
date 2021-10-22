import {
  fetchVaultsDataAsync,
  newVaultFetch,
  resetVaults
} from '../features/vaultsSlice'
import { DEFAULT_CHAIN, SUPPORTED_CHAINS } from '../data/constants'

const FETCH_INTERVAL = 30 * 1000

export const constantVaultFetch = (address, chainId, dispatch) => {
  const delay     = address ? FETCH_INTERVAL : FETCH_INTERVAL * 6
  const fetchData = () => {
    const skip      = chainId !== DEFAULT_CHAIN && ! address
    const supported = SUPPORTED_CHAINS.includes(chainId)

    if (skip && supported) {
      return
    }

    if (supported) {
      dispatch(newVaultFetch())
      dispatch(fetchVaultsDataAsync())
    } else {
      dispatch(resetVaults())
    }
  }

  const interval = setInterval(fetchData, delay)

  fetchData()

  return () => clearInterval(interval)
}
